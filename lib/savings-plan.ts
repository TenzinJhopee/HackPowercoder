/**
 * "How can I save X a month?": concrete changes sized to the target. Cancelling an optional subscription comes
 * first (one decision, the full amount), then cuts from her repeated habits. Only habits she repeats at least twice
 * a month count, and at most half of a habit is cut, so every step is something she could really do.
 * Pure: no I/O, shared by the server (facts) and the client (backup answers).
 */

export interface Habit {
  merchant: string;
  group: string;
  yearly: number;
  purchases: number;
}

/** An active recurring payment tagged `lever: cancel` (lib/merchant-tags.ts): dropping it saves the full amount. */
export interface Cancellable {
  merchant: string;
  /** How it is called in speech. */
  name: string;
  group: string;
  /** Saved each month by cancelling, whole francs. */
  savesMonthly: number;
  /** Saved in a year by cancelling (monthly amount × 12, rounded once). */
  savesYearly: number;
}

/** An active recurring payment tagged `lever: switch`: a cheaper provider or plan is the lever; no saving is known. */
export interface Switchable {
  merchant: string;
  name: string;
  group: string;
  /** What it costs each month, whole francs. */
  costsMonthly: number;
  /** The generic way to a cheaper option ("comparing insurers"); never a named provider. */
  how: string;
}

export interface Cut {
  /** "cancel": drop the subscription (fewer = usualPerMonth = 1); "habit": skip some of a repeated purchase. */
  kind: "cancel" | "habit";
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
  /** The most cancellations plus her repeated habits (under the half-of-a-habit rule) can give a month. */
  reachable: number;
  /** Target minus what the cuts give (0 when the target is met). */
  shortfall: number;
}

/** A plan that stays on screen after it is spoken; `names[i]` is how cut i is called (plural, from PURCHASE_NAMES). */
export interface Keepsake {
  kind: "savings";
  plan: SavingsPlan;
  names: string[];
}

const MIN_PER_MONTH = 2;
/** A purchase cheaper than this is not worth naming as a cut. */
const MIN_EACH = 5;

/**
 * `exclude`: merchants that are no real lever (a habit that already stopped, purchases that were mostly refunded).
 * `cancellable`: subscriptions she could drop; used before habit cuts, largest first, and never cut as a habit too.
 */
export function savingsPlan(target: number, habits: Habit[], months: number, exclude: string[] = [], cancellable: Cancellable[] = []): SavingsPlan {
  const subscriptions = cancellable.filter((c) => c.savesMonthly > 0 && !exclude.includes(c.merchant)).sort((a, b) => b.savesMonthly - a.savesMonthly);
  const cancelled = new Set(subscriptions.map((c) => c.merchant));
  const candidates = habits
    .filter((h) => !exclude.includes(h.merchant) && !cancelled.has(h.merchant) && h.purchases > 0 && months > 0 && h.purchases / months >= MIN_PER_MONTH)
    .map((h) => ({ ...h, perMonth: h.purchases / months, each: h.yearly / h.purchases }))
    .filter((h) => h.each >= MIN_EACH)
    // The dearest single purchase first: fewest changes for the same saving.
    .sort((a, b) => b.each - a.each);

  const limit = (c: { perMonth: number }) => Math.floor(c.perMonth / 2);
  const reachable =
    subscriptions.reduce((sum, c) => sum + c.savesMonthly, 0) + candidates.reduce((sum, c) => sum + Math.round(limit(c) * c.each), 0);

  const cuts: Cut[] = [];
  let left = target;
  for (const c of subscriptions) {
    if (left <= 0) break;
    cuts.push({ kind: "cancel", merchant: c.merchant, group: c.group, fewer: 1, usualPerMonth: 1, each: c.savesMonthly, saves: c.savesMonthly });
    left -= c.savesMonthly;
  }
  for (const c of candidates) {
    if (left <= 0) break;
    const fewer = Math.min(limit(c), Math.ceil(left / c.each));
    if (fewer < 1) continue;
    const saves = Math.round(fewer * c.each);
    cuts.push({ kind: "habit", merchant: c.merchant, group: c.group, fewer, usualPerMonth: Math.round(c.perMonth), each: Math.round(c.each), saves });
    left -= saves;
  }
  const monthly = cuts.reduce((sum, c) => sum + c.saves, 0);
  return { target, cuts, monthly, yearly: monthly * 12, reachable, shortfall: Math.max(0, target - monthly) };
}
