import { getBalanceSeries } from "@/lib/intelligence";
import { groupLabels, necessities, necessityLabels, ruleTags, type MerchantTag } from "@/lib/merchant-tags";
import type { Transaction } from "@/lib/models";
import { getSpendingProfile, type SpendingProfile } from "@/lib/profile";

/**
 * Facts summary: everything the agent may say, computed once and placed in the model's context.
 * The model narrates these figures and refers to insights by id; it never computes or invents numbers.
 */

export interface UserNote {
  /** Insight id or `tag:<merchant>` the answer belongs to. */
  subject: string;
  /** Machine-readable answer, one of the insight's `answers`. */
  answer: string;
  /** The user's own words, for the client file. */
  text: string;
  createdAt: string;
}

export type InsightKind = "what_happened" | "what_is_missing" | "insight" | "advice";
/** assert: say it. ask: never assert, ask the question. resolved: the user already answered. */
export type InsightMode = "assert" | "ask" | "resolved";

export interface Insight {
  id: string;
  kind: InsightKind;
  mode: InsightMode;
  /** Code-written, figure-exact summary; the model may rephrase but not change numbers. */
  summary: string;
  figures: Record<string, number | string>;
  question?: string;
  answers?: string[];
  userAnswer?: string;
  evidence: string[];
}

export interface FactsSummary {
  currency: string;
  periodStart: string;
  periodEnd: string;
  labels: { necessity: typeof necessityLabels; groups: typeof groupLabels };
  income: SpendingProfile["income"];
  spending: SpendingProfile["spending"];
  byNecessity: { necessity: string; label: string; yearly: number; monthly: number; share: number }[];
  topGroups: { group: string; label: string; net: number; necessity: string }[];
  monthlyRoomAfterCompulsory: number;
  levers: {
    adjustable: { merchant: string; yearly: number }[];
    flexibleHabits: { merchant: string; yearly: number; purchases: number }[];
  };
  insights: Insight[];
  openQuestions: { subject: string; question: string; answers: string[] }[];
  notes: { subject: string; answer: string; text: string }[];
  assumptions: string[];
}

/** Swiss pillar 3a maximum for employees with a pension fund, 2025. */
export const PILLAR_3A_LIMIT_2025 = 7258;

const round = (value: number) => Math.round(value * 100) / 100;
const month = (date: string) => date.slice(0, 7);
const median = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};
const chf = (value: number) => `${Math.round(value).toLocaleString("de-CH")} CHF`;

function monthsBetween(start: string, end: string) {
  const months: string[] = [];
  let [year, value] = start.slice(0, 7).split("-").map(Number);
  const last = end.slice(0, 7);
  while (`${year}-${String(value).padStart(2, "0")}` <= last) {
    months.push(`${year}-${String(value).padStart(2, "0")}`);
    value += 1;
    if (value > 12) { value = 1; year += 1; }
  }
  return months;
}

export function buildFacts(transactions: Transaction[], currency: string, tags: MerchantTag[] = ruleTags(), notes: UserNote[] = []): FactsSummary {
  const selected = transactions.filter((t) => t.currency === currency);
  const noteBy = new Map(notes.map((n) => [n.subject, n]));
  const insights: Insight[] = [];
  const add = (insight: Omit<Insight, "mode" | "userAnswer"> & { mode: "assert" | "ask" }) => {
    const note = noteBy.get(insight.id);
    insights.push(note && insight.mode === "ask" ? { ...insight, mode: "resolved", userAnswer: note.answer } : insight);
  };

  // Accounts: the one receiving income is the private account; the one receiving transfers is the card.
  const privateAccount = selected.find((t) => t.type === "income")?.account;
  const cardAccount = selected.find((t) => t.type === "transfer" && t.amount > 0)?.account;
  const expenses = selected.filter((t) => t.type === "expense");
  const refunds = selected.filter((t) => t.type === "refund");

  // The pot shrinks when the user confirms a charge was a duplicate.
  const duplicates = notes.filter((n) => n.subject.startsWith("double_charge:") && n.answer === "duplicate");
  const profileTransactions = duplicates.length
    ? selected.filter((t) => !duplicates.some((d) => d.subject === `double_charge:${t.merchant}:${t.date}` && t.id === findDuplicateId(selected, t.merchant, t.date)))
    : selected;
  const profile = getSpendingProfile(profileTransactions, currency, tags);
  const periodStart = profile.periodStart;
  const periodEnd = profile.periodEnd;

  // 1. Year-end result and how much of it is the extra (13th) salary.
  if (privateAccount) {
    const yearNet = round(selected.filter((t) => t.account === privateAccount).reduce((sum, t) => sum + t.amount, 0));
    const extra = profile.income.aboveBase;
    add({
      id: "year_end_buffer",
      kind: "what_happened",
      mode: "assert",
      summary: `The private account ended the year ${chf(yearNet)} higher than it started. Without the extra salary payment of ${chf(extra)} it would have been ${chf(yearNet - extra)}.`,
      figures: { yearNet, extraSalary: extra, yearNetWithoutExtra: round(yearNet - extra), baseMonthlySalary: profile.income.baseMonthly },
      evidence: selected.filter((t) => t.type === "income").map((t) => t.id)
    });

    // 2. Lowest point of the private account, relative to the start of the year.
    const balance = getBalanceSeries(selected, currency, 0, privateAccount);
    if (balance.lowestMonthEnd && balance.lowestDay && balance.lowestDay.balance < 0) {
      add({
        id: "lowest_balance",
        kind: "what_happened",
        mode: "assert",
        summary: `Measured from the start of the year, the private account was lowest at the end of ${balance.lowestMonthEnd.date.slice(0, 7)} (${chf(balance.lowestMonthEnd.balance)}) and on ${balance.lowestDay.date} (${chf(balance.lowestDay.balance)}).`,
        figures: { lowestMonthEnd: balance.lowestMonthEnd.balance, lowestMonthEndMonth: balance.lowestMonthEnd.date.slice(0, 7), lowestDay: balance.lowestDay.balance, lowestDayDate: balance.lowestDay.date },
        evidence: []
      });
    }
  }

  // 3. Card statements compared with the monthly salary.
  if (cardAccount) {
    const statements = selected.filter((t) => t.account === cardAccount && t.type === "transfer" && t.amount > 0);
    const largest = [...statements].sort((a, b) => b.amount - a.amount)[0];
    if (largest) {
      const aboveSalary = statements.filter((t) => t.amount > profile.income.baseMonthly);
      add({
        id: "statement_shock",
        kind: "what_happened",
        mode: "assert",
        summary: `The largest card statement was ${chf(largest.amount)} in ${month(largest.date)}; ${aboveSalary.length} statement(s) were larger than the monthly salary of ${chf(profile.income.baseMonthly)}.`,
        figures: {
          largestStatement: largest.amount,
          largestStatementMonth: month(largest.date),
          statementsAboveSalary: aboveSalary.length,
          smallestStatement: Math.min(...statements.map((t) => t.amount)),
          baseMonthlySalary: profile.income.baseMonthly
        },
        evidence: statements.map((t) => t.id)
      });
    }
  }

  // 4. A regular obligation that skipped a month.
  const allMonths = monthsBetween(periodStart, periodEnd);
  for (const m of profile.merchants.filter((p) => p.necessity === "compulsory" && p.pattern === "regular")) {
    const paid = expenses.filter((t) => t.merchant === m.merchant);
    const paidMonths = new Set(paid.map((t) => month(t.date)));
    const usual = round(median(paid.map((t) => Math.abs(t.amount))));
    for (const gap of allMonths.filter((value) => !paidMonths.has(value))) {
      add({
        id: `missing_payment:${m.merchant}:${gap}`,
        kind: "what_is_missing",
        mode: "ask",
        summary: `${m.merchant} was paid in ${paidMonths.size} of ${allMonths.length} months, usually ${chf(usual)}; there is no payment in ${gap}.`,
        figures: { merchant: m.merchant, missingMonth: gap, usualAmount: usual, monthsPaid: paidMonths.size },
        question: `I don't see your ${m.merchant} payment for ${gap}. Was it paid from another account?`,
        answers: ["paid_elsewhere", "missed"],
        evidence: paid.map((t) => t.id)
      });
    }
  }

  // 5. Things that never started: retirement (3a) or savings transfers.
  const savingsLike = selected.filter((t) => t.type === "investment" || /\b3a\b|säule|saule|pillar|sparkonto|savings/i.test(`${t.description} ${t.merchant}`));
  if (!savingsLike.length) {
    add({
      id: "no_pillar_3a",
      kind: "what_is_missing",
      mode: "ask",
      summary: `There is no 3a payment or savings transfer in ${periodStart.slice(0, 4)}. The 3a maximum for employees with a pension fund is ${chf(PILLAR_3A_LIMIT_2025)}.`,
      figures: { pillar3aLimit: PILLAR_3A_LIMIT_2025, savingsTransfers: 0 },
      question: "I don't see any 3a or savings payments this year. Do you have a 3a account at another bank?",
      answers: ["has_elsewhere", "none"],
      evidence: []
    });
  }

  // 6. Possible double charge: same merchant, day and amount, twice, never refunded,
  //    and not part of a group booking (another identical pair in the same spending group within 2 days).
  const pairs = new Map<string, Transaction[]>();
  for (const t of expenses) {
    const key = `${t.merchant}|${t.date}|${t.amount}`;
    pairs.set(key, [...(pairs.get(key) ?? []), t]);
  }
  const groupOf = (merchant: string) => tags.find((tag) => tag.merchant === merchant)?.group ?? "other";
  const twoOfAKind = [...pairs.values()].filter((items) => items.length === 2 && Math.abs(items[0].amount) >= 100);
  const days = (a: string, b: string) => Math.abs(Date.parse(a) - Date.parse(b)) / 86_400_000;
  for (const items of twoOfAKind) {
    const [first] = items;
    const amount = Math.abs(first.amount);
    const refunded = refunds.some((r) => r.merchant === first.merchant && Math.abs(r.amount - amount) <= amount * 0.05 && days(r.date, first.date) <= 60);
    const groupBooking = twoOfAKind.some((other) => other !== items && groupOf(other[0].merchant) === groupOf(first.merchant) && days(other[0].date, first.date) <= 2);
    if (refunded || groupBooking) continue;
    add({
      id: `double_charge:${first.merchant}:${first.date}`,
      kind: "insight",
      mode: "ask",
      summary: `${first.merchant} charged ${chf(amount)} twice on ${first.date} and nothing was refunded.`,
      figures: { merchant: first.merchant, date: first.date, amount, charges: 2 },
      question: `${first.merchant} charged you ${amount.toFixed(2)} CHF twice on ${first.date}. Was that two bookings, or should we dispute one?`,
      answers: ["legit", "duplicate"],
      evidence: items.map((t) => t.id)
    });
  }

  // 7. The list misleads: merchants whose refunds cancel most of the purchases.
  for (const m of profile.merchants.filter((p) => p.gross >= 1000 && p.refunds / p.gross >= 0.5)) {
    add({
      id: `refund_heavy:${m.merchant}`,
      kind: "insight",
      mode: "assert",
      summary: `${m.merchant} shows ${chf(m.gross)} in ${m.count} purchases, but ${chf(m.refunds)} came back; the real cost is ${chf(m.net)}.`,
      figures: { merchant: m.merchant, gross: m.gross, refunds: m.refunds, net: m.net, purchases: m.count },
      evidence: [...expenses, ...refunds].filter((t) => t.merchant === m.merchant).map((t) => t.id)
    });
  }

  // 8. Habit change: a frequent merchant that went quiet for the last months.
  const quietAfter = monthsBetween(periodStart, periodEnd).at(-5);
  for (const m of profile.merchants.filter((p) => p.count >= 8)) {
    const last = expenses.filter((t) => t.merchant === m.merchant).map((t) => t.date).sort().at(-1)!;
    if (quietAfter && month(last) < quietAfter) {
      add({
        id: `habit_stopped:${m.merchant}`,
        kind: "insight",
        mode: "assert",
        summary: `${m.count} purchases at ${m.merchant} (${chf(m.net)}) until ${month(last)}, then none.`,
        figures: { merchant: m.merchant, purchases: m.count, net: m.net, lastMonth: month(last) },
        evidence: expenses.filter((t) => t.merchant === m.merchant).map((t) => t.id)
      });
    }
  }

  // 9. The one piece of advice: a monthly pot for big one-off purchases (confirmed by tap, never by voice).
  if (profile.levers.oneOffs.length) {
    add({
      id: "one_off_pot",
      kind: "advice",
      mode: "assert",
      summary: `${profile.levers.oneOffs.length} big one-off purchases cost ${chf(profile.levers.oneOffTotal)} this year. Setting aside ${chf(profile.levers.monthlyPotForOneOffs)} a month would cover them without a statement shock.`,
      figures: { oneOffTotal: profile.levers.oneOffTotal, monthlyPot: profile.levers.monthlyPotForOneOffs, purchases: profile.levers.oneOffs.length },
      evidence: []
    });
  }

  // Uncertain merchant tags become questions too.
  for (const tag of tags.filter((t) => t.askUser)) {
    if (!profile.merchants.some((m) => m.merchant === tag.merchant)) continue;
    add({
      id: `tag:${tag.merchant}`,
      kind: "insight",
      mode: "ask",
      summary: `${tag.merchant} is tagged as ${necessityLabels[tag.necessity]} (${tag.reason}), but this is uncertain.`,
      figures: { merchant: tag.merchant, necessity: tag.necessity },
      question: tag.askUser,
      answers: ["yes", "no"],
      evidence: []
    });
  }

  return {
    currency,
    periodStart,
    periodEnd,
    labels: { necessity: necessityLabels, groups: groupLabels },
    income: profile.income,
    spending: profile.spending,
    byNecessity: necessities.map((necessity) => ({
      necessity,
      label: necessityLabels[necessity],
      yearly: profile.byNecessity[necessity].net,
      monthly: profile.byNecessity[necessity].monthly,
      share: profile.byNecessity[necessity].share
    })),
    topGroups: profile.groups.slice(0, 8).map((g) => ({ group: g.group, label: groupLabels[g.group], net: g.net, necessity: g.necessity })),
    monthlyRoomAfterCompulsory: profile.monthlyRoomAfterCompulsory,
    levers: {
      adjustable: profile.levers.adjustable.map((m) => ({ merchant: m.merchant, yearly: m.net })),
      flexibleHabits: profile.levers.flexibleHabits.map((m) => ({ merchant: m.merchant, yearly: m.net, purchases: m.count }))
    },
    insights,
    openQuestions: insights.filter((i) => i.mode === "ask").map((i) => ({ subject: i.id, question: i.question!, answers: i.answers! })),
    notes: notes.map((n) => ({ subject: n.subject, answer: n.answer, text: n.text })),
    assumptions: [
      ...profile.assumptions,
      "Balances are measured from the start of the period (opening balance unknown, taken as 0).",
      "Insights in mode 'ask' must be asked, never stated as fact; 'resolved' ones use the user's answer."
    ]
  };
}

/** The second of two identical charges; removed from the profile when the user confirms a duplicate. */
function findDuplicateId(transactions: Transaction[], merchant: string, date: string) {
  return transactions.filter((t) => t.type === "expense" && t.merchant === merchant && t.date === date).sort((a, b) => a.id.localeCompare(b.id))[1]?.id;
}

/** Compact JSON for the system prompt (evidence ids dropped to save tokens). */
export function factsForPrompt(facts: FactsSummary) {
  return JSON.stringify({ ...facts, insights: facts.insights.map(({ evidence, ...rest }) => rest) });
}

/** Every number the agent is allowed to say; use it to reject scripts with invented figures. */
export function allowedNumbers(facts: FactsSummary): Set<number> {
  const numbers = new Set<number>();
  const walk = (value: unknown) => {
    if (typeof value === "number") {
      numbers.add(round(value));
      numbers.add(Math.round(value));
      numbers.add(Math.round(Math.abs(value)));
    } else if (Array.isArray(value)) value.forEach(walk);
    else if (value && typeof value === "object") Object.values(value).forEach(walk);
  };
  walk(facts);
  return numbers;
}
