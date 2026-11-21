/**
 * "Can I afford this?" measured against what she KEPT last year, not a forecast: the private account's year net, how
 * much of it was the extra (13th) salary, and the ordinary surplus without it. A second, optional measure replays last
 * year's daily balance with one extra card purchase, to say how low the balance would have gone before December.
 * Pure: no I/O, so the server (facts) and the client (backup answers) share it.
 */

export type BalancePoint = { date: string; balance: number };

/** What the private account kept last year. */
export interface SurplusInputs {
  /** Year-end balance minus the start (extra salary included). */
  yearNet: number;
  /** The extra (13th) salary paid in December. */
  extraSalary: number;
  /** Months in the period (12 for a full year). */
  months: number;
}

/** 1 = within the ordinary surplus; 2 = covered only with the extra salary; 3 = above the whole year net. */
export type AffordTier = 1 | 2 | 3;

export interface AffordMeasure {
  amount: number;
  tier: AffordTier;
  /** Year net without the extra salary. */
  ordinarySurplus: number;
  /** Ordinary surplus per month; may be zero or negative. */
  monthlySurplus: number;
  /** The amount in whole ordinary months of surplus; null when an ordinary month kept nothing. */
  monthsOfSurplus: number | null;
  /** Year net left after the purchase (0 when it exceeds the year net). */
  leftOfYearNet: number;
  /** How far the amount exceeds the year net (0 when it does not). */
  aboveYearNet: number;
}

const round = (value: number) => Math.round(value * 100) / 100;
const pad = (n: number) => String(n).padStart(2, "0");

/** Places `amount` against what was kept last year. */
export function measureAgainstSurplus(amount: number, { yearNet, extraSalary, months }: SurplusInputs): AffordMeasure {
  const ordinarySurplus = round(yearNet - extraSalary);
  const monthlySurplus = months > 0 ? round(ordinarySurplus / months) : 0;
  const tier: AffordTier = amount <= ordinarySurplus ? 1 : amount <= yearNet ? 2 : 3;
  return {
    amount,
    tier,
    ordinarySurplus,
    monthlySurplus,
    monthsOfSurplus: monthlySurplus > 0 ? Math.round(amount / monthlySurplus) : null,
    leftOfYearNet: round(Math.max(0, yearNet - amount)),
    aboveYearNet: round(Math.max(0, amount - yearNet))
  };
}

export interface AffordReplay {
  amount: number;
  month: number;
  /** Day the purchase leaves the private account (the month's card payment). */
  paidOn: string;
  /** Lowest balance of the year with the purchase, relative to the start. */
  newLowest: BalancePoint;
}

/** The month's card payment date, or the 23rd when the data has none for that month. */
function paymentDate(year: string, month: number, paymentDates: string[]) {
  return paymentDates.find((d) => d.slice(0, 7) === `${year}-${pad(month)}`) ?? `${year}-${pad(month)}-23`;
}

const lowest = (points: BalancePoint[]) => points.reduce((min, p) => (p.balance < min.balance ? p : min));

/** Replays last year's daily balances with one extra purchase of `amount` in `month` (1-12). `daily` must not be empty. */
export function replayPurchase(daily: BalancePoint[], amount: number, month: number, paymentDates: string[] = []): AffordReplay {
  const paidOn = paymentDate(daily[0].date.slice(0, 4), month, paymentDates);
  const newLowest = lowest(daily.map((p) => (p.date >= paidOn ? { date: p.date, balance: round(p.balance - amount) } : p)));
  return { amount, month, paidOn, newLowest };
}

/** Amount in a question: "3,000", "3000", "3'000", "3k", "3.5k". null when there is none. */
export function parseAmount(question: string): number | null {
  const match = question.match(/(\d{1,3}(?:[,'’]\d{3})+|\d+(?:\.\d+)?)\s*(k\b|thousand\b)?/i);
  if (!match) return null;
  const value = Number(match[1].replace(/[,'’]/g, "")) * (match[2] ? 1000 : 1);
  return value > 0 ? value : null;
}

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

/** "may" is also a verb ("May I buy...", "it may be"), so it counts as the month only after a word like "in" or "next". */
const MAY_AS_MONTH = /\b(in|by|on|this|next|last|until|till|before|after|during|from|of|early|mid|late|end)\s+may\b/;

/** Month 1-12 named in the question; null when none is named. */
export function parseMonth(question: string): number | null {
  const text = question.toLocaleLowerCase("en");
  const named = MONTHS.findIndex((name) =>
    name === "may" ? MAY_AS_MONTH.test(text) : new RegExp(`\\b(${name}|${name.slice(0, 3)})\\b`).test(text)
  );
  return named >= 0 ? named + 1 : null;
}
