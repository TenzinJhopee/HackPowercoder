/**
 * "Can I afford this?" as a REPLAY of last year, not a forecast: the 2025 private-account balance (relative to the
 * start of the year, opening balance unknown) is replayed with one extra card purchase. A purchase made in a month,
 * before that month's card payment, reaches the private account with that payment (the 23rd) and lowers every later
 * balance. Pure: no I/O, so the server (facts) and the client (backup answers) share it.
 */

export type BalancePoint = { date: string; balance: number };

export interface AffordReplay {
  amount: number;
  month: number;
  /** Day the purchase leaves the private account (the month's card payment). */
  paidOn: string;
  actualLowest: BalancePoint;
  newLowest: BalancePoint;
  /** How far the new lowest point is below the actual one (0 if it is not lower). */
  belowActualLowest: number;
  /** Earliest month from which the same purchase no longer goes below the actual lowest point; null if none. */
  earliestOkMonth: number | null;
}

const round = (value: number) => Math.round(value * 100) / 100;
const pad = (n: number) => String(n).padStart(2, "0");

/** The month's card payment date, or the 23rd when the data has none for that month. */
function paymentDate(year: string, month: number, paymentDates: string[]) {
  return paymentDates.find((d) => d.slice(0, 7) === `${year}-${pad(month)}`) ?? `${year}-${pad(month)}-23`;
}

const lowest = (points: BalancePoint[]) => points.reduce((min, p) => (p.balance < min.balance ? p : min));

/** Lowest balance of last year if the purchase had been made in `month` (1-12). */
function replayLowest(daily: BalancePoint[], amount: number, paidOn: string): BalancePoint {
  return lowest(daily.map((p) => (p.date >= paidOn ? { date: p.date, balance: round(p.balance - amount) } : p)));
}

/** Replays last year's daily balances with one extra purchase of `amount` in `month`. `daily` must not be empty. */
export function replayPurchase(daily: BalancePoint[], amount: number, month: number, paymentDates: string[] = []): AffordReplay {
  const year = daily[0].date.slice(0, 4);
  const actualLowest = lowest(daily);
  const at = (m: number) => replayLowest(daily, amount, paymentDate(year, m, paymentDates));
  const paidOn = paymentDate(year, month, paymentDates);
  const newLowest = replayLowest(daily, amount, paidOn);
  let earliestOkMonth: number | null = null;
  for (let m = 1; m <= 12; m++) {
    if (at(m).balance >= actualLowest.balance) {
      earliestOkMonth = m;
      break;
    }
  }
  return { amount, month, paidOn, actualLowest, newLowest, belowActualLowest: round(Math.max(0, actualLowest.balance - newLowest.balance)), earliestOkMonth };
}

/** Per month: the largest purchase that would not have taken last year's balance below its lowest point. */
export function roomBeforeLowest(daily: BalancePoint[], paymentDates: string[] = []): { month: number; room: number }[] {
  const year = daily[0].date.slice(0, 4);
  const actual = lowest(daily).balance;
  return Array.from({ length: 12 }, (_, i) => {
    const paidOn = paymentDate(year, i + 1, paymentDates);
    const after = daily.filter((p) => p.date >= paidOn);
    return { month: i + 1, room: after.length ? round(Math.max(0, lowest(after).balance - actual)) : 0 };
  });
}

/** Amount in a question: "3,000", "3000", "3'000", "3k", "3.5k". null when there is none. */
export function parseAmount(question: string): number | null {
  const match = question.match(/(\d{1,3}(?:[,'’]\d{3})+|\d+(?:\.\d+)?)\s*(k\b|thousand\b)?/i);
  if (!match) return null;
  const value = Number(match[1].replace(/[,'’]/g, "")) * (match[2] ? 1000 : 1);
  return value > 0 ? value : null;
}

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

/** Month 1-12 named in the question, else the next calendar month after `now`. */
export function parseMonth(question: string, now = new Date()): number {
  const text = question.toLocaleLowerCase("en");
  const named = MONTHS.findIndex((name) => new RegExp(`\\b(${name}|${name.slice(0, 3)})\\b`).test(text));
  return named >= 0 ? named + 1 : (now.getMonth() + 1) % 12 + 1;
}
