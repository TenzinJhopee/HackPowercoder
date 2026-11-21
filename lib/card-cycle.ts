import type { Transaction } from "@/lib/models";

/**
 * Card cycle: the card statement equals the net card spending since the previous card payment.
 * Monthly card budget = base salary minus the average monthly spending on the private account
 * (card payments excluded). For any date we can say how much was spent in the current cycle,
 * how much budget is left, and on which day the budget was crossed.
 */

export interface CardCycle {
  /** 1-based; the last cycle may be open (no payment yet). */
  cycle: number;
  /** Day after the previous card payment (or the first day of the data). */
  start: string;
  /** Card payment date that closes the cycle; null while the cycle is open. */
  paymentDate: string | null;
  /** Amount paid to the card (the statement); null while open. */
  statement: number | null;
  /** Net card spending in the whole cycle (expenses minus refunds). */
  spent: number;
  budgetLeft: number;
  /** Day on which the running spend first exceeded the budget; null if never. */
  crossedOn: string | null;
  /** Running net spend at the end of each day with card activity: [date, cumulative]. */
  cumulative: [string, number][];
}

export interface CardStatus {
  asOf: string;
  cycle: number;
  spent: number;
  budget: number;
  budgetLeft: number;
  crossedOn: string | null;
  /** Date of the card payment that closes this cycle, if known. */
  paymentDate: string | null;
}

const round = (value: number) => Math.round(value);
const roundCents = (value: number) => Math.round(value * 100) / 100;

/** The account receiving income is the private account; the one receiving the card payment is the card. */
export function cardAccounts(transactions: Transaction[]) {
  const privateAccount = transactions.find((t) => t.type === "income")?.account;
  const cardAccount = transactions.find((t) => t.type === "transfer" && t.amount > 0)?.account;
  return { privateAccount, cardAccount };
}

export function cardPayments(transactions: Transaction[]) {
  const { privateAccount } = cardAccounts(transactions);
  return transactions
    .filter((t) => t.type === "transfer" && t.amount < 0 && t.account === privateAccount)
    .map((t) => ({ date: t.date, amount: roundCents(-t.amount) }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Base salary (most common income payment) minus average monthly private spending net of refunds, card payments excluded. */
export function cardBudgetMonthly(transactions: Transaction[]): number {
  const { privateAccount } = cardAccounts(transactions);
  const incomes = transactions.filter((t) => t.type === "income");
  const counts = new Map<number, number>();
  for (const t of incomes) counts.set(t.amount, (counts.get(t.amount) ?? 0) + 1);
  const baseSalary = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? 0;
  const spending = transactions.filter((t) => t.account === privateAccount && (t.type === "expense" || t.type === "refund")).reduce((sum, t) => sum - t.amount, 0);
  const months = new Set(transactions.map((t) => t.date.slice(0, 7))).size || 1;
  return round(baseSalary - spending / months);
}

function cardSpending(transactions: Transaction[]) {
  const { cardAccount } = cardAccounts(transactions);
  return transactions
    .filter((t) => t.account === cardAccount && (t.type === "expense" || t.type === "refund"))
    .sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
}

/** Cycles: (previous payment, this payment]; a final open cycle exists only if there is spending after the last payment. */
export function cardCycles(transactions: Transaction[], budget = cardBudgetMonthly(transactions)): CardCycle[] {
  const payments = cardPayments(transactions);
  const spending = cardSpending(transactions);
  const firstDate = transactions.map((t) => t.date).sort()[0] ?? "";
  const cycles: CardCycle[] = [];
  let previous = "";
  const build = (paymentDate: string | null, statement: number | null) => {
    const items = spending.filter((t) => t.date > previous && (paymentDate === null || t.date <= paymentDate));
    let running = 0;
    let crossedOn: string | null = null;
    const cumulative: [string, number][] = [];
    for (const t of items) {
      running -= t.amount;
      if (crossedOn === null && running > budget) crossedOn = t.date;
      if (cumulative.at(-1)?.[0] === t.date) cumulative[cumulative.length - 1][1] = round(running);
      else cumulative.push([t.date, round(running)]);
    }
    if (paymentDate === null && !items.length) return;
    cycles.push({
      cycle: cycles.length + 1,
      start: previous ? nextDay(previous) : firstDate,
      paymentDate,
      statement: statement === null ? null : round(statement),
      spent: round(running),
      budgetLeft: round(budget - running),
      crossedOn,
      cumulative
    });
  };
  for (const payment of payments) {
    build(payment.date, payment.amount);
    previous = payment.date;
  }
  build(null, null);
  return cycles;
}

/** Live view for any date: spend so far in the cycle that contains `asOf`. */
export function cardStatusAsOf(transactions: Transaction[], asOf: string, budget = cardBudgetMonthly(transactions)): CardStatus {
  const payments = cardPayments(transactions);
  const closing = payments.find((p) => p.date >= asOf);
  const previous = [...payments].reverse().find((p) => p.date < asOf)?.date ?? "";
  const cycle = payments.filter((p) => p.date < asOf).length + 1;
  let running = 0;
  let crossedOn: string | null = null;
  for (const t of cardSpending(transactions)) {
    if (t.date <= previous || t.date > asOf) continue;
    running -= t.amount;
    if (crossedOn === null && running > budget) crossedOn = t.date;
  }
  return { asOf, cycle, spent: round(running), budget, budgetLeft: round(budget - running), crossedOn, paymentDate: closing?.date ?? null };
}

function nextDay(date: string) {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}
