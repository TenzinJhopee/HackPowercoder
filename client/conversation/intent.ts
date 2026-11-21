import type { Intent } from "@/lib/contracts";
import { normalizeWord } from "../player/voice";

const MONTH_NAMES = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const MONTH_SHORT: Record<string, number> = { jan: 1, feb: 2, mar: 3, apr: 4, jun: 6, jul: 7, aug: 8, sep: 9, sept: 9, oct: 10, nov: 11, dec: 12 };

/** "May" counts as the month only with a preposition before it, a possessive, or a day/year number next to it. */
const MAY_AS_MONTH = [
  /\b(in|of|during|since|until|till|through|last|early|late|mid|end of|start of)\s+may\b/,
  /\bmay'?s\b(?!\s+i\b)/,
  /\bmay\s+\d{1,4}(st|nd|rd|th)?\b/,
  /\b\d{1,2}(st|nd|rd|th)?\s+(of\s+)?may\b/,
];

const lower = (text: string) => text.toLocaleLowerCase("en").replace(/[’‘]/g, "'");

/** Month 1-12 mentioned in the text, or null. "May I ask" is not May. */
export function monthIn(text: string): number | null {
  const t = lower(text);
  for (let i = 0; i < MONTH_NAMES.length; i++) {
    if (i === 4) {
      if (MAY_AS_MONTH.some((r) => r.test(t)) && !/^may\s+(i|we)\b/.test(t)) return 5;
      continue;
    }
    if (new RegExp(`\\b${MONTH_NAMES[i]}\\b`).test(t)) return i + 1;
  }
  for (const [short, month] of Object.entries(MONTH_SHORT)) {
    if (new RegExp(`\\b${short}\\b\\.?`).test(t)) return month;
  }
  return null;
}

/** "this month", "that bar", "this one", ... : the user means what is focused now. */
export function refersToCurrent(text: string): boolean {
  return /\b(this|that)\s+(month|bar|column|one|category|part|pool|jar)\b/.test(lower(text));
}

/**
 * The focus target the text names, from the targets the current scene can focus.
 * Months match by name (numeric targets 1-12); strings match as whole words after normalising (plural "s" allowed).
 * "this month / that bar" returns `current`. Longest string match wins.
 */
export function targetIn(text: string, targets: (string | number)[], current: string | number | null = null): string | number | null {
  const month = monthIn(text);
  if (month !== null && targets.includes(month)) return month;
  const words = text.split(/\s+/).map(normalizeWord).filter(Boolean);
  let best: string | number | null = null;
  let bestLength = 0;
  for (const target of targets) {
    if (typeof target === "number" && target >= 1 && target <= 12) continue;
    const parts = String(target).split(/\s+/).map(normalizeWord).filter(Boolean);
    if (!parts.length) continue;
    for (let i = 0; i + parts.length <= words.length; i++) {
      const match = parts.every((p, k) => {
        const w = words[i + k];
        return w === p || (k === parts.length - 1 && (w === p + "s" || w + "s" === p));
      });
      if (match && parts.join(" ").length > bestLength) {
        best = target;
        bestLength = parts.join(" ").length;
      }
    }
  }
  if (best !== null) return best;
  if (current !== null && refersToCurrent(text)) return current;
  return null;
}

/** Plan 8.3: rules first. `targets` = the current scene's focus targets (categories count as a question). */
export function classify(text: string, targets: (string | number)[] = []): Intent {
  const t = lower(text).trim().replace(/[.!,;]+$/, "");
  const categoryIn = targets.some((x) => typeof x === "string") && targetIn(t, targets.filter((x) => typeof x === "string")) !== null;
  const isQuestion = /\?/.test(t) || monthIn(t) !== null || categoryIn || /\b(why|how|what|which|when|explain)\b/.test(t);
  if (!isQuestion && /\b(continue|go on|carry on|ok|okay|sure|got it|yes|resume|keep going)\b/.test(t)) return "continue";
  if (!isQuestion && /(one more|another question|i have a question|^wait|^stop$|hold on)/.test(t)) return "wait";
  if (!isQuestion && /^(enough|end|quit|that'?s all|finish)/.test(t)) return "end";
  return "question";
}
