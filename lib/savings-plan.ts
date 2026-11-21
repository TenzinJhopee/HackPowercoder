/**
 * "How can I save X a month?": concrete cuts from her repeated habits, sized to the target.
 * Only habits she repeats at least twice a month count, and at most half of a habit is cut, so every
 * step is something she could really do. Pure: no I/O, shared by the server (facts) and the client (backup answers).
 */

export interface Habit {
  merchant: string;
  group: string;
  yearly: number;
  purchases: number;
}

export interface Cut {
  merchant: string;
  group: string;
  /** Purchases to skip each month. */
  fewer: number;
  /** Her usual purchases a month, rounded. */
  usualPerMonth: number;
  /** Average price of one purchase, whole francs. */
  each: number;
  /** Saved each month by this cut, whole francs. */
  saves: number;
}

export interface SavingsPlan {
  target: number;
  cuts: Cut[];
  /** Sum of the cuts, a month. */
  monthly: number;
  yearly: number;
  /** The most her repeated habits can give a month under the half-of-a-habit rule. */
  reachable: number;
  /** Target minus what the cuts give (0 when the target is met). */
  shortfall: number;
}

const MIN_PER_MONTH = 2;
/** A purchase cheaper than this is not worth naming as a cut. */
const MIN_EACH = 5;

/** `exclude`: merchants that are no real lever (a habit that already stopped, purchases that were mostly refunded). */
export function savingsPlan(target: number, habits: Habit[], months: number, exclude: string[] = []): SavingsPlan {
  const candidates = habits
    .filter((h) => !exclude.includes(h.merchant) && h.purchases > 0 && months > 0 && h.purchases / months >= MIN_PER_MONTH)
    .map((h) => ({ ...h, perMonth: h.purchases / months, each: h.yearly / h.purchases }))
    .filter((h) => h.each >= MIN_EACH)
    // The dearest single purchase first: fewest changes for the same saving.
    .sort((a, b) => b.each - a.each);

  const limit = (c: { perMonth: number }) => Math.floor(c.perMonth / 2);
  const reachable = candidates.reduce((sum, c) => sum + Math.round(limit(c) * c.each), 0);

  const cuts: Cut[] = [];
  let left = target;
  for (const c of candidates) {
    if (left <= 0) break;
    const fewer = Math.min(limit(c), Math.ceil(left / c.each));
    if (fewer < 1) continue;
    const saves = Math.round(fewer * c.each);
    cuts.push({ merchant: c.merchant, group: c.group, fewer, usualPerMonth: Math.round(c.perMonth), each: Math.round(c.each), saves });
    left -= saves;
  }
  const monthly = cuts.reduce((sum, c) => sum + c.saves, 0);
  return { target, cuts, monthly, yearly: monthly * 12, reachable, shortfall: Math.max(0, target - monthly) };
}
