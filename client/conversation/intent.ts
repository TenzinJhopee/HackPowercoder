import type { BeatAnswer, Intent } from "@/lib/contracts";
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

const CONTINUE_START = /^(continue|go on|go ahead|carry on|ok|okay|sure|got it|yes|yeah|yep|yup|resume|keep going|next|alright|all right|fine|let'?s (continue|go on|move on|keep going))\b/;
const CONTINUE_SHORT = /\b(continue|go on|go ahead|carry on|keep going|resume|next|move on)\b/;
/** Unmistakable "go on" words count anywhere once no question was found: "thanks, that's clear, go on". */
const CONTINUE_ANY = /\b(continue|go on|carry on|keep going|move on|resume|proceed)\b/;
const WAIT_START = /^(wait|stop|pause|hold on|hang on|one more|another question|(i have|i've got|quick|a quick) (a )?(quick )?question|can i ask( you)?( something| a question)?|just a (moment|second|sec|minute)|one (moment|second|sec|minute)|a (moment|second|sec))\b/;
const WAIT_SHORT = /\b(wait|stop|pause|hold on|hang on)\b/;
const END_START = /^(enough|end|quit|that'?s all|that'?s it|finish|i'?m done|we'?re done|bye|goodbye)\b/;
const END_ANY = /\b(that'?s all|i'?m done|we'?re done|goodbye|bye for now)\b/;
/** Polite acknowledgements; an utterance made only of these means "go on". */
const ACK = /^(thanks|thank you|thanks a lot|great|perfect|good|nice|cool|got it|ok|okay|alright|all right|clear|that'?s clear|understood|i see|makes sense|that makes sense|fine|that'?s fine|no that'?s fine|yes please|sounds good|right|sure)$/;
/** Openers that carry no intent of their own: "one second, why ...", "sorry, ...", "okay so ...". */
const LEADING_FILLER = /^((um+|uh+|erm|hmm+|hey|so|well|sorry|excuse me|one second|one sec|just a second|okay so|ok so|right so|oh)[\s,.!-]+)+/;

/** The utterance without leading fillers (or unchanged if nothing else is left). */
export function stripFiller(text: string): string {
  const rest = text.replace(LEADING_FILLER, "").trim();
  return rest || text;
}

/**
 * Plan 8.3: rules first. `targets` = the current scene's focus targets (categories count as a question).
 * Leading fillers ("one second", "sorry", "um") are dropped first, so they never decide the intent alone.
 * Continue / wait / end words count when they open the utterance, or anywhere in a short one (4 words or fewer),
 * so "I'm not sure about this" stays a question.
 */
export function classify(text: string, targets: (string | number)[] = []): Intent {
  const full = lower(text).trim().replace(/[.!,;]+$/, "");
  const t = stripFiller(full);
  const categoryIn = targets.some((x) => typeof x === "string") && targetIn(t, targets.filter((x) => typeof x === "string")) !== null;
  const isQuestion = /\?/.test(t) || monthIn(t) !== null || categoryIn || /\b(why|how|what|which|when|explain)\b/.test(t);
  if (isQuestion) return "question";
  const short = t.split(/\s+/).filter(Boolean).length <= 4;
  if (WAIT_START.test(t) || (short && WAIT_SHORT.test(t)) || /\b(one more|another|a quick) question\b/.test(t)) return "wait";
  if (t !== full && WAIT_START.test(full)) return "wait"; // "one second" alone
  if (END_START.test(t) || END_ANY.test(t)) return "end";
  if (CONTINUE_START.test(t) || (short && CONTINUE_SHORT.test(t)) || CONTINUE_ANY.test(t)) return "continue";
  const parts = t.split(/\s*(?:,|\band\b|\bthen\b)\s*/).filter(Boolean);
  if (parts.length && parts.every((p) => ACK.test(p))) return "continue";
  return "question";
}

/** Reply to a question beat: the answer whose label it is, else a yes/no style match. null = not an answer. */
export function matchAnswer(text: string, answers: BeatAnswer[]): BeatAnswer | null {
  const t = stripFiller(lower(text).trim().replace(/[.!?,;]+$/, ""));
  if (/\b(wait|hold on|hang on|one second|just a (second|moment))\b/.test(t)) return null;
  const exact = answers.find((a) => lower(a.label) === t || a.id === t);
  if (exact) return exact;
  const no = /^(no|nope|nah|not really|never|none|i don'?t|i do not|it wasn'?t|it was not|i haven'?t|i have not)\b/.test(t);
  const yes =
    /^(yes|yeah|yep|yup|sure|correct|right|exactly|indeed|of course|i do|it was|i have)\b/.test(t) ||
    /\b(elsewhere|another (bank|account)|other (bank|account)|different (bank|account)|separate account)\b/.test(t);
  const kind = no ? "no" : yes ? "yes" : null;
  return kind ? (answers.find((a) => a.kind === kind) ?? null) : null;
}
