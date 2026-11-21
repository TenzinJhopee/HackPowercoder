import { fallbackTag, necessities, ruleTags, type MerchantTag, type Necessity, type SpendingGroup } from "@/lib/merchant-tags";
import type { Transaction } from "@/lib/models";

/**
 * Spending profile: necessity (from merchant tags) × pattern (computed from the transactions).
 * Every figure here is computed; the agent only narrates it.
 */
export const patterns = ["regular", "frequent_small", "one_off_big", "occasional"] as const;
export type Pattern = (typeof patterns)[number];

export const PATTERN_RULES = {
  regularMinMonths: 9,
  regularMaxPerMonth: 1.5,
  frequentMinCount: 20,
  frequentMaxMedian: 50,
  oneOffMinDayTotal: 1000
} as const;

export interface MerchantProfile {
  merchant: string;
  necessity: Necessity;
  group: SpendingGroup;
  pattern: Pattern;
  gross: number;
  refunds: number;
  net: number;
  count: number;
  monthsActive: number;
}

export interface OneOffPurchase {
  merchant: string;
  date: string;
  necessity: Necessity;
  group: SpendingGroup;
  total: number;
  count: number;
}

export interface SpendingProfile {
  currency: string;
  periodStart: string;
  periodEnd: string;
  months: number;
  income: { total: number; payments: number; baseMonthly: number; aboveBase: number };
  spending: { gross: number; refunds: number; net: number };
  byNecessity: Record<Necessity, { net: number; monthly: number; share: number }>;
  byPattern: Record<Pattern, { net: number }>;
  matrix: { necessity: Necessity; pattern: Pattern; net: number }[];
  groups: { group: SpendingGroup; net: number; count: number; necessity: Necessity }[];
  merchants: MerchantProfile[];
  /** Base monthly income minus average monthly compulsory spending. */
  monthlyRoomAfterCompulsory: number;
  levers: {
    /** Reducible spending that repeats: a small cut is realistic. */
    adjustable: MerchantProfile[];
    /** Big single-day purchases: plan for them instead of cutting. */
    oneOffs: OneOffPurchase[];
    oneOffTotal: number;
    /** Monthly amount to set aside to cover the year's discretionary one-offs. */
    monthlyPotForOneOffs: number;
    /** Repeated flexible habits (not one-offs). */
    flexibleHabits: MerchantProfile[];
  };
  unreviewedMerchants: string[];
  assumptions: string[];
}

const round = (value: number) => Math.round(value * 100) / 100;
const month = (date: string) => date.slice(0, 7);
const median = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

export function getSpendingProfile(transactions: Transaction[], currency: string, tags: MerchantTag[] = ruleTags()): SpendingProfile {
  const selected = transactions.filter((t) => t.currency === currency);
  const expenses = selected.filter((t) => t.type === "expense");
  const refunds = selected.filter((t) => t.type === "refund");
  const incomes = selected.filter((t) => t.type === "income");
  const tagByMerchant = new Map(tags.map((tag) => [tag.merchant, tag]));
  const tagFor = (merchant: string) => tagByMerchant.get(merchant) ?? fallbackTag(merchant);

  const dates = selected.map((t) => t.date).sort();
  const months = new Set(selected.map((t) => month(t.date))).size || 1;

  // Pattern per expense transaction.
  const byMerchant = new Map<string, Transaction[]>();
  for (const t of expenses) byMerchant.set(t.merchant, [...(byMerchant.get(t.merchant) ?? []), t]);
  const patternOf = new Map<string, Pattern>();
  const oneOffs: OneOffPurchase[] = [];
  for (const [merchant, items] of byMerchant) {
    const monthsActive = new Set(items.map((t) => month(t.date))).size;
    const amounts = items.map((t) => Math.abs(t.amount));
    let merchantPattern: Pattern | undefined;
    if (monthsActive >= PATTERN_RULES.regularMinMonths && items.length <= monthsActive * PATTERN_RULES.regularMaxPerMonth) merchantPattern = "regular";
    else if (items.length >= PATTERN_RULES.frequentMinCount && median(amounts) <= PATTERN_RULES.frequentMaxMedian) merchantPattern = "frequent_small";
    if (merchantPattern) {
      for (const t of items) patternOf.set(t.id, merchantPattern);
      continue;
    }
    const byDay = new Map<string, Transaction[]>();
    for (const t of items) byDay.set(t.date, [...(byDay.get(t.date) ?? []), t]);
    for (const [date, dayItems] of byDay) {
      const total = dayItems.reduce((sum, t) => sum + Math.abs(t.amount), 0);
      const pattern: Pattern = total >= PATTERN_RULES.oneOffMinDayTotal ? "one_off_big" : "occasional";
      for (const t of dayItems) patternOf.set(t.id, pattern);
      if (pattern === "one_off_big") {
        const tag = tagFor(merchant);
        oneOffs.push({ merchant, date, necessity: tag.necessity, group: tag.group, total: round(total), count: dayItems.length });
      }
    }
  }

  // Merchant summaries; refunds go to the merchant's dominant pattern.
  const merchantNames = new Set([...expenses, ...refunds].map((t) => t.merchant));
  const merchants: MerchantProfile[] = [...merchantNames].map((merchant) => {
    const items = byMerchant.get(merchant) ?? [];
    const gross = items.reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const refunded = refunds.filter((t) => t.merchant === merchant).reduce((sum, t) => sum + t.amount, 0);
    const patternTotals = new Map<Pattern, number>();
    for (const t of items) patternTotals.set(patternOf.get(t.id)!, (patternTotals.get(patternOf.get(t.id)!) ?? 0) + Math.abs(t.amount));
    const pattern = [...patternTotals.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "occasional";
    const tag = tagFor(merchant);
    return {
      merchant,
      necessity: tag.necessity,
      group: tag.group,
      pattern,
      gross: round(gross),
      refunds: round(refunded),
      net: round(gross - refunded),
      count: items.length,
      monthsActive: new Set(items.map((t) => month(t.date))).size
    };
  }).sort((a, b) => b.net - a.net);

  // Net amounts per necessity × pattern (expenses by their own pattern, refunds by merchant's dominant pattern).
  const cell = new Map<string, number>();
  const add = (necessity: Necessity, pattern: Pattern, value: number) => cell.set(`${necessity}|${pattern}`, (cell.get(`${necessity}|${pattern}`) ?? 0) + value);
  for (const t of expenses) add(tagFor(t.merchant).necessity, patternOf.get(t.id)!, Math.abs(t.amount));
  const merchantPattern = new Map(merchants.map((m) => [m.merchant, m.pattern]));
  for (const t of refunds) add(tagFor(t.merchant).necessity, merchantPattern.get(t.merchant) ?? "occasional", -t.amount);
  const matrix = necessities.flatMap((necessity) => patterns.map((pattern) => ({ necessity, pattern, net: round(cell.get(`${necessity}|${pattern}`) ?? 0) })));

  const gross = expenses.reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const refundTotal = refunds.reduce((sum, t) => sum + t.amount, 0);
  const net = gross - refundTotal;
  const byNecessity = Object.fromEntries(necessities.map((necessity) => {
    const value = matrix.filter((c) => c.necessity === necessity).reduce((sum, c) => sum + c.net, 0);
    return [necessity, { net: round(value), monthly: round(value / months), share: net ? round(value / net) : 0 }];
  })) as SpendingProfile["byNecessity"];
  const byPattern = Object.fromEntries(patterns.map((pattern) => [pattern, { net: round(matrix.filter((c) => c.pattern === pattern).reduce((sum, c) => sum + c.net, 0)) }])) as SpendingProfile["byPattern"];

  const groupMap = new Map<SpendingGroup, { net: number; count: number; byNecessity: Map<Necessity, number> }>();
  for (const m of merchants) {
    const entry = groupMap.get(m.group) ?? { net: 0, count: 0, byNecessity: new Map() };
    entry.net += m.net;
    entry.count += m.count;
    entry.byNecessity.set(m.necessity, (entry.byNecessity.get(m.necessity) ?? 0) + m.net);
    groupMap.set(m.group, entry);
  }
  const groups = [...groupMap.entries()].map(([group, entry]) => ({
    group,
    net: round(entry.net),
    count: entry.count,
    necessity: [...entry.byNecessity.entries()].sort((a, b) => b[1] - a[1])[0][0]
  })).sort((a, b) => b.net - a.net);

  // Income: the most common payment amount is the base salary; anything above (e.g. a 13th salary) is reported separately.
  const incomeTotal = incomes.reduce((sum, t) => sum + t.amount, 0);
  const amountCounts = new Map<number, number>();
  for (const t of incomes) amountCounts.set(t.amount, (amountCounts.get(t.amount) ?? 0) + 1);
  const baseMonthly = [...amountCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? 0;

  const discretionaryOneOffs = oneOffs.filter((o) => o.necessity === "discretionary").sort((a, b) => b.total - a.total);
  const oneOffTotal = discretionaryOneOffs.reduce((sum, o) => sum + o.total, 0);

  return {
    currency,
    periodStart: dates[0] ?? "",
    periodEnd: dates.at(-1) ?? "",
    months,
    income: { total: round(incomeTotal), payments: incomes.length, baseMonthly: round(baseMonthly), aboveBase: round(incomeTotal - baseMonthly * months) },
    spending: { gross: round(gross), refunds: round(refundTotal), net: round(net) },
    byNecessity,
    byPattern,
    matrix,
    groups,
    merchants,
    monthlyRoomAfterCompulsory: round(baseMonthly - byNecessity.compulsory.monthly),
    levers: {
      adjustable: merchants.filter((m) => m.necessity === "reducible" && (m.pattern === "regular" || m.pattern === "frequent_small")),
      oneOffs: discretionaryOneOffs,
      oneOffTotal: round(oneOffTotal),
      monthlyPotForOneOffs: round(oneOffTotal / months),
      flexibleHabits: merchants.filter((m) => m.necessity === "discretionary" && m.pattern !== "one_off_big" && m.count >= 6).slice(0, 6)
    },
    unreviewedMerchants: merchants.filter((m) => tagFor(m.merchant).source === "fallback").map((m) => m.merchant),
    assumptions: [
      "Necessity comes from reviewed merchant tags; untagged merchants count as flexible and are listed as unreviewed.",
      `Regular: active in at least ${PATTERN_RULES.regularMinMonths} months, about once a month. Frequent small: at least ${PATTERN_RULES.frequentMinCount} purchases with a median of at most ${PATTERN_RULES.frequentMaxMedian}. One-off big: one merchant, one day, at least ${PATTERN_RULES.oneOffMinDayTotal}.`,
      "Refunds reduce the merchant they came from. Transfers between own accounts are excluded.",
      "Base monthly income is the most common income payment; payments above it are reported separately."
    ]
  };
}
