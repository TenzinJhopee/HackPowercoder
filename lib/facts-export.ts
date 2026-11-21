import { cardAccounts, cardBudgetMonthly, cardCycles, cardPayments } from "@/lib/card-cycle";
import { OFFER, PILLAR_3A_LIMIT_2025, buildFacts, type FactsSummary, type Insight } from "@/lib/facts";
import { fallbackTag, ruleTags, spendingGroups, type MerchantTag, type SpendingGroup } from "@/lib/merchant-tags";
import { getBalanceSeries } from "@/lib/intelligence";
import type { Transaction } from "@/lib/models";

/**
 * `public/facts.json` (plan section 4), computed from the transactions. Pure: no I/O, so the export
 * script and the tests share it. Every figure the advisor may say is in this object.
 */

export type BreakdownPart = { name: string; value: number; aliases?: string[] };

export type CardCycleExport = {
  cycle: number;
  start: string;
  payment_date: string | null;
  statement: number | null;
  spent: number;
  budget_left: number;
  crossed_on: string | null;
  /** Running net spend at the end of each day with card activity: [date, cumulative]. */
  cumulative: [string, number][];
};

export interface FactsExport {
  year: number;
  currency: string;
  salary_monthly: number;
  payday: number;
  yearly_income_incl_13th_salary: number;
  year_end_net_vs_start: number;
  without_13th_salary: number;
  total_spending: number;
  categories_yearly_net_of_refunds: Record<string, number>;
  travel_breakdown: { USA_approx: number; London_July: number; Copenhagen_May: number; London_Cologne_April: number; Other: number };
  month_end_balance_vs_start_jan_dec: number[];
  monthly_spending_jan_dec: number[];
  card_bill_jan_dec: number[];
  monthly_breakdown_by_category: Record<string, Record<string, number>>;
  /** Named parts for opening a month's column (sum = the month's spending). */
  monthly_breakdown_parts: Record<string, BreakdownPart[]>;
  notable_items: Record<string, string[]>;
  gaps: { id: string; mode: "ask"; label: string; [key: string]: string | number }[];
  refunds: { total: number; merchants: { merchant: string; bought: number; refunded: number; net: number }[] };
  card_budget_monthly: number;
  card_cycles: CardCycleExport[];
  offer: { product: string; monthly: number; after_one_year: number };
  insights: Omit<Insight, "evidence">[];
  /** Profile figures for savings and habit answers: fixed / adjustable / flexible split and the realistic levers. */
  profile: Pick<FactsSummary, "byNecessity" | "monthlyRoomAfterCompulsory" | "levers">;
  /** Private-account balance at the end of each day with activity, relative to 1 January: [date, balance]. For lib/afford.ts. */
  private_balance_daily: [string, number][];
  card_payment_dates: string[];
  /** What was kept last year and the fixed "Can I afford a 3,000 franc laptop?" example against it (not a forecast). */
  afford_example: FactsSummary["affordability"];
  /** Habits a monthly saving can come from and the fixed 100 franc plan (lib/savings-plan.ts). */
  savings: FactsSummary["savings"] & { months: number };
}

const round = (value: number) => Math.round(value);
const monthOf = (date: string) => Number(date.slice(5, 7));
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const twelve = () => Array.from({ length: 12 }, () => 0);

type PartSpec = { name: string; aliases?: string[]; match: (t: Transaction, group: SpendingGroup) => boolean };

/** Named parts for the months the advisor talks about; other months use their biggest categories. */
const PART_SPECS: Record<number, PartSpec[]> = {
  6: [
    { name: "Bike", aliases: ["bicycle", "veloshop"], match: (_, g) => g === "Bike" },
    { name: "Rent", aliases: ["housing"], match: (_, g) => g === "Housing" },
    { name: "Health insurance", aliases: ["insurance", "health"], match: (_, g) => g === "Health" },
    { name: "Digitec", aliases: ["galaxus", "electronics"], match: (t) => /Digitec|Galaxus/i.test(t.merchant) }
  ],
  7: [
    { name: "Bike", aliases: ["bicycle", "veloshop"], match: (_, g) => g === "Bike" },
    { name: "Rent", aliases: ["housing"], match: (_, g) => g === "Housing" },
    { name: "London trip", aliases: ["london", "travel", "hotel"], match: (_, g) => g === "Travel" },
    { name: "Clothing", aliases: ["clothes", "fashion"], match: (_, g) => g === "Clothing" },
    { name: "Health insurance", aliases: ["insurance", "health"], match: (_, g) => g === "Health" }
  ],
  9: [
    { name: "Plane tickets", aliases: ["flights", "flight", "tickets", "swiss", "plane"], match: (t) => /swiss/i.test(t.merchant) },
    { name: "Apple", aliases: ["iphone", "laptop"], match: (t) => /apple/i.test(t.merchant) },
    { name: "Rent and electricity", aliases: ["rent", "electricity", "housing"], match: (_, g) => g === "Housing" },
    { name: "Health insurance", aliases: ["insurance", "health"], match: (_, g) => g === "Health" }
  ],
  11: [
    { name: "Apple", aliases: ["iphone", "laptop"], match: (t) => /apple/i.test(t.merchant) },
    { name: "Rent", aliases: ["housing"], match: (_, g) => g === "Housing" },
    { name: "Health insurance", aliases: ["insurance", "health"], match: (_, g) => g === "Health" }
  ]
};

const NOTABLE_NAMES: [RegExp, string][] = [[/swiss|lufthansa/i, "plane tickets"], [/apple/i, "Apple"], [/veloshop/i, "bike shop"], [/mondrian/i, "London hotel"]];

function tripOf(t: Transaction): keyof FactsExport["travel_breakdown"] {
  const month = monthOf(t.date);
  if (/Yellowstone|Mandarin/i.test(t.merchant) || (/swiss/i.test(t.merchant) && month === 9)) return "USA_approx";
  if (/Mondrian|WH Smith|La Salle/i.test(t.merchant) && month === 7) return "London_July";
  if (month === 5) return "Copenhagen_May";
  if (month === 4) return "London_Cologne_April";
  return "Other";
}

export function buildFactsExport(transactions: Transaction[], currency = "CHF", tags: MerchantTag[] = ruleTags()): FactsExport {
  const selected = transactions.filter((t) => t.currency === currency);
  const tagMap = new Map(tags.map((tag) => [tag.merchant, tag]));
  const tagFor = (merchant: string) => tagMap.get(merchant) ?? fallbackTag(merchant);
  const { privateAccount } = cardAccounts(selected);
  const spendingTx = selected.filter((t) => t.type === "expense" || t.type === "refund");
  const net = (t: Transaction) => -t.amount; // expense > 0, refund < 0

  // Income and year-end result.
  const incomes = selected.filter((t) => t.type === "income");
  const counts = new Map<number, number>();
  for (const t of incomes) counts.set(t.amount, (counts.get(t.amount) ?? 0) + 1);
  const salary = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? 0;
  const dayCounts = new Map<number, number>();
  for (const t of incomes.filter((i) => i.amount === salary)) {
    const day = Number(t.date.slice(8, 10));
    dayCounts.set(day, (dayCounts.get(day) ?? 0) + 1);
  }
  const payday = [...dayCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? 0;
  const privateTx = selected.filter((t) => t.account === privateAccount);
  const yearNet = privateTx.reduce((sum, t) => sum + t.amount, 0);
  const year = Number((selected.map((t) => t.date).sort()[0] ?? "0000").slice(0, 4));

  // Month-end balance relative to 1 January (private account).
  const monthEnd = twelve();
  let running = 0;
  for (let m = 1; m <= 12; m++) {
    running += privateTx.filter((t) => monthOf(t.date) === m).reduce((sum, t) => sum + t.amount, 0);
    monthEnd[m - 1] = running;
  }

  // Spending per month and per category (net of refunds).
  const monthlyRaw = twelve();
  for (const t of spendingTx) monthlyRaw[monthOf(t.date) - 1] += net(t);
  const categories: Record<string, number> = Object.fromEntries(spendingGroups.map((group) => [group, 0]));
  const byMonthCategory: Record<string, Record<string, number>> = {};
  for (const t of spendingTx) {
    const group = tagFor(t.merchant).group;
    categories[group] += net(t);
    const month = String(monthOf(t.date));
    byMonthCategory[month] ??= {};
    byMonthCategory[month][group] = (byMonthCategory[month][group] ?? 0) + net(t);
  }
  const roundedCategories = Object.fromEntries(Object.entries(categories).filter(([, v]) => round(v) !== 0).map(([k, v]) => [k, round(v)]));
  const monthlyBreakdown = Object.fromEntries(
    Object.entries(byMonthCategory).map(([m, row]) => [m, Object.fromEntries(Object.entries(row).filter(([, v]) => round(v) !== 0).map(([k, v]) => [k, round(v)]))])
  );

  // Named parts for opening a column; "Other" is the remainder so parts sum to the rounded month total.
  const parts: Record<string, BreakdownPart[]> = {};
  for (let m = 1; m <= 12; m++) {
    const total = round(monthlyRaw[m - 1]);
    const items = spendingTx.filter((t) => monthOf(t.date) === m);
    const specs = PART_SPECS[m];
    let result: BreakdownPart[];
    if (specs) {
      const used = new Set<string>();
      result = specs.map((spec) => {
        const matched = items.filter((t) => !used.has(t.id) && spec.match(t, tagFor(t.merchant).group));
        matched.forEach((t) => used.add(t.id));
        return { name: spec.name, value: round(matched.reduce((sum, t) => sum + net(t), 0)), aliases: spec.aliases };
      });
    } else {
      // Biggest categories while they still fit inside the month total (refund-heavy categories can be negative).
      result = [];
      let sum = 0;
      for (const [name, value] of Object.entries(monthlyBreakdown[String(m)] ?? {}).sort((a, b) => b[1] - a[1]).slice(0, 4)) {
        if (value <= 0 || sum + value > total) break;
        result.push({ name, value });
        sum += value;
      }
    }
    result = result.filter((p) => p.value > 0).sort((a, b) => b.value - a.value);
    const other = total - result.reduce((sum, p) => sum + p.value, 0);
    if (other > 0) result.push({ name: "Other", value: other });
    parts[String(m)] = result;
  }

  // Notable single merchants (net of refunds) per month; compulsory payments left out.
  const notable: Record<string, string[]> = {};
  for (let m = 1; m <= 12; m++) {
    const byMerchant = new Map<string, Transaction[]>();
    for (const t of spendingTx.filter((x) => monthOf(x.date) === m && tagFor(x.merchant).necessity !== "compulsory")) {
      byMerchant.set(t.merchant, [...(byMerchant.get(t.merchant) ?? []), t]);
    }
    const lines: string[] = [];
    for (const [merchant, items] of byMerchant) {
      const total = round(items.reduce((sum, t) => sum + net(t), 0));
      if (total < 1000) continue;
      const label = NOTABLE_NAMES.find(([re]) => re.test(merchant))?.[1] ?? merchant;
      const days = new Set(items.map((t) => t.date));
      const when = days.size === 1 ? `${Number([...days][0].slice(8, 10))} ${MONTH_NAMES[m - 1]} ` : "";
      lines.push(`${when}${label} ${total}`);
    }
    if (lines.length) notable[String(m)] = lines;
  }

  // Trips.
  const trips = { USA_approx: 0, London_July: 0, Copenhagen_May: 0, London_Cologne_April: 0, Other: 0 };
  for (const t of spendingTx.filter((x) => tagFor(x.merchant).group === "Travel")) trips[tripOf(t)] += net(t);
  const travel = Object.fromEntries(Object.entries(trips).map(([k, v]) => [k, round(v)])) as FactsExport["travel_breakdown"];
  travel.USA_approx = Math.round(trips.USA_approx / 100) * 100; // "approx": the trip is spread over several bookings

  // Card.
  const cardBill = twelve();
  for (const p of cardPayments(selected)) cardBill[monthOf(p.date) - 1] += p.amount;
  const budget = cardBudgetMonthly(selected);
  const cycles: CardCycleExport[] = cardCycles(selected, budget).map((c) => ({
    cycle: c.cycle,
    start: c.start,
    payment_date: c.paymentDate,
    statement: c.statement,
    spent: c.spent,
    budget_left: c.budgetLeft,
    crossed_on: c.crossedOn,
    cumulative: c.cumulative
  }));

  // Refunds.
  const refundMerchants = new Map<string, { bought: number; refunded: number }>();
  for (const t of spendingTx) {
    const entry = refundMerchants.get(t.merchant) ?? { bought: 0, refunded: 0 };
    if (t.type === "expense") entry.bought += -t.amount;
    else entry.refunded += t.amount;
    refundMerchants.set(t.merchant, entry);
  }
  const refunds = {
    total: round(selected.filter((t) => t.type === "refund").reduce((sum, t) => sum + t.amount, 0)),
    merchants: [...refundMerchants.entries()]
      .filter(([, v]) => v.bought >= 1000 && v.refunded >= 500)
      .map(([merchant, v]) => ({ merchant, bought: round(v.bought), refunded: round(v.refunded), net: round(v.bought - v.refunded) }))
      .sort((a, b) => b.refunded - a.refunded)
  };

  // Insights from the shared facts builder (evidence ids dropped) and gaps.
  const facts = buildFacts(selected, currency, tags);
  const insights = facts.insights.map(({ evidence: _evidence, ...rest }) => rest);
  const gaps: FactsExport["gaps"] = [];
  for (const insight of facts.insights.filter((i) => i.id.startsWith("missing_payment:"))) {
    const f = insight.figures;
    gaps.push({
      id: insight.id,
      mode: "ask",
      label: `${f.merchant} payment missing in ${f.missingMonth}`,
      merchant: String(f.merchant),
      month: Number(String(f.missingMonth).slice(5, 7)),
      usual_amount: Number(f.usualAmount),
      months_paid: Number(f.monthsPaid)
    });
  }
  if (facts.insights.some((i) => i.id === "no_pillar_3a")) {
    gaps.push({ id: "no_pillar_3a", mode: "ask", label: "No pillar 3a payment", yearly_amount: 0, limit: PILLAR_3A_LIMIT_2025 });
    gaps.push({ id: "no_savings", mode: "ask", label: "No savings transfer", yearly_amount: 0 });
  }
  // Same figures as the tax_provision insight in buildFacts.
  const tax = facts.insights.find((i) => i.id === "tax_provision");
  if (tax) {
    gaps.push({ id: "tax_provision", mode: "ask", label: "Tax paid so far", paid: round(Number(tax.figures.taxPaid)), payments: Number(tax.figures.taxPayments) });
  }
  if (facts.insights.some((i) => i.id === "accounts_complete")) {
    gaps.push({ id: "accounts_complete", mode: "ask", label: "No groceries or cash withdrawals" });
  }

  return {
    year,
    currency,
    salary_monthly: round(salary),
    payday,
    yearly_income_incl_13th_salary: round(incomes.reduce((sum, t) => sum + t.amount, 0)),
    year_end_net_vs_start: round(yearNet),
    without_13th_salary: round(yearNet - salary),
    total_spending: round(monthlyRaw.reduce((a, b) => a + b, 0)),
    categories_yearly_net_of_refunds: roundedCategories,
    travel_breakdown: travel,
    month_end_balance_vs_start_jan_dec: monthEnd.map(round),
    monthly_spending_jan_dec: monthlyRaw.map(round),
    card_bill_jan_dec: cardBill.map(round),
    monthly_breakdown_by_category: monthlyBreakdown,
    monthly_breakdown_parts: parts,
    notable_items: notable,
    gaps,
    refunds,
    card_budget_monthly: budget,
    card_cycles: cycles,
    offer: { ...OFFER },
    insights,
    profile: { byNecessity: facts.byNecessity, monthlyRoomAfterCompulsory: facts.monthlyRoomAfterCompulsory, levers: facts.levers },
    private_balance_daily: getBalanceSeries(selected, currency, 0, privateAccount).daily.map((p) => [p.date, p.balance]),
    card_payment_dates: cardPayments(selected).map((p) => p.date),
    afford_example: facts.affordability,
    savings: { ...facts.savings, months: new Set(selected.map((t) => t.date.slice(0, 7))).size }
  };
}
