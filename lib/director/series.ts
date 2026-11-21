import { getBalanceSeries } from "@/lib/intelligence";
import type { Transaction } from "@/lib/models";

/**
 * The series the scenes show, computed from transactions (never by the model).
 * Index 0 = January. All values are whole francs.
 */
export const seriesNames = ["monthly_spending", "card_bill"] as const;
export type SeriesName = (typeof seriesNames)[number];

export interface Series {
  year: number;
  /** Net spending per month: expenses minus refunds. */
  monthlySpending: number[];
  /** What was paid from the private account to the credit card per month. */
  cardBill: number[];
  /** Private-account balance at each month end, relative to 1 January. */
  monthEndBalance: number[];
  /** Per month ("1".."12"): the biggest merchants by net spending, largest first. */
  monthlyTopMerchants: Record<string, { name: string; value: number }[]>;
}

const emptyYear = () => Array.from({ length: 12 }, () => 0);
const monthIndex = (date: string) => Number(date.slice(5, 7)) - 1;

export function buildSeries(transactions: Transaction[], currency = "CHF", year?: number): Series {
  const all = transactions.filter((t) => t.currency === currency).sort((a, b) => a.date.localeCompare(b.date));
  const seriesYear = year ?? Number(all[0]?.date.slice(0, 4) ?? new Date().getFullYear());
  const selected = all.filter((t) => t.date.startsWith(`${seriesYear}-`));

  const spending = emptyYear();
  const perMerchant: Map<string, number>[] = Array.from({ length: 12 }, () => new Map());
  for (const t of selected) {
    // Expenses are negative, refunds positive: both reduce to "net spending".
    if (t.type !== "expense" && t.type !== "refund") continue;
    const m = monthIndex(t.date);
    spending[m] -= t.amount;
    perMerchant[m].set(t.merchant, (perMerchant[m].get(t.merchant) ?? 0) - t.amount);
  }

  const privateAccount = selected.find((t) => t.type === "income")?.account;
  const cardAccount = selected.find((t) => t.type === "transfer" && t.amount > 0)?.account;

  const cardBill = emptyYear();
  if (cardAccount) {
    for (const t of selected) if (t.account === cardAccount && t.type === "transfer" && t.amount > 0) cardBill[monthIndex(t.date)] += t.amount;
  }

  // Month-end balances; a month without bookings keeps the previous month's balance.
  const monthEndBalance = emptyYear();
  if (privateAccount) {
    const byMonth = new Map(getBalanceSeries(selected, currency, 0, privateAccount).monthEnd.map((p) => [monthIndex(p.date), p.balance]));
    let last = 0;
    for (let m = 0; m < 12; m += 1) {
      last = byMonth.get(m) ?? last;
      monthEndBalance[m] = Math.round(last);
    }
  }

  const monthlyTopMerchants: Series["monthlyTopMerchants"] = {};
  perMerchant.forEach((merchants, m) => {
    monthlyTopMerchants[String(m + 1)] = [...merchants.entries()]
      .map(([name, value]) => ({ name, value: Math.round(value) }))
      .filter((part) => part.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  });

  return {
    year: seriesYear,
    monthlySpending: spending.map(Math.round),
    cardBill: cardBill.map(Math.round),
    monthEndBalance,
    monthlyTopMerchants
  };
}

/** The `total` tool: sums the chosen months (1-12, duplicates ignored). Returns null for invalid input. */
export function totalOf(series: Series, name: SeriesName, months: number[]): number | null {
  if (!Array.isArray(months) || !months.length) return null;
  const values = name === "monthly_spending" ? series.monthlySpending : name === "card_bill" ? series.cardBill : null;
  if (!values) return null;
  const unique = [...new Set(months)];
  if (unique.some((m) => !Number.isInteger(m) || m < 1 || m > 12)) return null;
  return unique.reduce((sum, m) => sum + values[m - 1], 0);
}

/** Every number the series shows; these may be spoken like facts. */
export function seriesNumbers(series: Series): number[] {
  return [
    ...series.monthlySpending,
    ...series.cardBill,
    ...series.monthEndBalance,
    ...Object.values(series.monthlyTopMerchants).flatMap((parts) => parts.map((p) => p.value))
  ];
}
