import type { Beat, Cue, Figure, SceneType } from "@/lib/contracts";
import { ruleTags, spendingGroups, type MerchantTag } from "@/lib/merchant-tags";
import { extractNumbers, MAX_CUES } from "./validate";

/**
 * Deterministic staging after validation: every beat must change something visible versus the one before it.
 * It only ever adds a figure (a number the sentence already says), a focus (what the sentence names) and a cue on that
 * word, so nothing here can introduce a number or a claim that is not in the validated sentence.
 */

export interface StagingContext {
  /** The scene she is looking at; the first beat is never moved out of it. */
  currentScene: SceneType;
  currentFocus?: string | number | null;
  /** Merchant tags (a merchant maps to its pools group). The seeded rules are always included. */
  tags: MerchantTag[];
  /** Numbers from her question (her own target): not picked as the big figure while a fact number exists. */
  userNumbers?: number[];
}

type State = { type: SceneType; focus: string | number | null };
type Candidate = { index: number; word: string; state: State; priority: number; /** False when the only mention opens the sentence: a cue word may not be first. */ cue: boolean };

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const NECESSITY: Record<string, string> = { fixed: "Fixed", adjustable: "Adjustable", flexible: "Flexible" };
/** Words that name a pools group without its exact label. */
const GROUP_ALIASES: Record<string, string> = {
  clothes: "Clothing", trips: "Travel", flights: "Travel", holidays: "Travel", restaurants: "Food and drink", food: "Food and drink",
  bicycle: "Bike", cycling: "Bike", phone: "Electronics", computers: "Electronics", rent: "Housing", insurance: "Health", taxes: "Tax"
};
const START = "(?<![\\p{L}\\p{N}])";
const END = "(?![\\p{L}\\p{N}])";

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const sameState = (a: State, b: State) => a.type === b.type && String(a.focus ?? "").toLowerCase() === String(b.focus ?? "").toLowerCase();

/** A word as a regex; an umlaut also matches its plain spellings ("Füssli" finds "Fuessli" and "Fussli"). */
function wordRegex(text: string): RegExp {
  const body = escapeRegExp(text)
    .replace(/ü/gi, "(?:ü|ue|u)")
    .replace(/ö/gi, "(?:ö|oe|o)")
    .replace(/ä/gi, "(?:ä|ae|a)");
  return new RegExp(`${START}${body}${END}`, "iu");
}

function wordAt(say: string, text: string): { index: number; text: string } | null {
  const match = wordRegex(text).exec(say);
  return match ? { index: match.index, text: match[0] } : null;
}

function stateOf(beat: Beat, before: State): State {
  if (!beat.scene) return before;
  return { type: beat.scene.type, focus: beat.scene.focus ?? null };
}

const mentions = (say: string, focus: string | number | null) => typeof focus === "string" && !!focus && wordRegex(focus).test(say);

/** The word for a place named in the sentence: one word, ideally the merchant's first; `cue` is false when it opens the sentence. */
function cueWord(say: string, name: string): { index: number; text: string; cue: boolean } | null {
  const words = name.split(/\s+/).filter((w) => w.length >= 3);
  let opening: { index: number; text: string; cue: boolean } | null = null;
  for (const word of [words[0], words[words.length - 1]]) {
    const hit = word ? wordAt(say, word) : null;
    if (!hit) continue;
    if (say.slice(0, hit.index).trim()) return { ...hit, cue: true };
    opening ??= { ...hit, cue: false };
  }
  return opening;
}

/** Everything in a sentence that can become a focus; merchants, necessities, groups and months first, in order of appearance. */
function candidates(say: string, tags: MerchantTag[]): Candidate[] {
  const found: Candidate[] = [];
  const add = (hit: { index: number; text: string; cue: boolean } | null, state: State, priority = 1) => {
    if (hit) found.push({ index: hit.index, word: hit.text, state, priority, cue: hit.cue });
  };

  for (const [word, key] of Object.entries(NECESSITY)) add(cueWord(say, word), { type: "pools", focus: key });
  for (const tag of tags) {
    if (tag.merchant.length >= 4 && wordAt(say, tag.merchant)) add(cueWord(say, tag.merchant), { type: "pools", focus: tag.group });
  }
  for (const group of spendingGroups) if (group !== "Other") add(cueWord(say, group), { type: "pools", focus: group });
  for (const [word, group] of Object.entries(GROUP_ALIASES)) add(cueWord(say, word), { type: "pools", focus: group });
  MONTHS.forEach((name, i) => add(cueWord(say, name), { type: "monthly", focus: i + 1 }));
  add(cueWord(say, "left"), { type: "pools", focus: "Left over" }, 2);
  return found.sort((a, b) => a.priority - b.priority || a.index - b.index);
}

// ---------- figure ----------

function labelFor(say: string, at: number, length: number, userNumbers: number[], value: number, tags: MerchantTag[]): string {
  const clause = say.slice(Math.max(0, say.lastIndexOf(",", at - 1) + 1, at - 70), at);
  const window = `${clause} ${say.slice(at + length, at + length + 30)}`;
  const lower = window.toLowerCase();
  const suffix = /\b(year|yearly|annual|annually)\b/.test(lower) ? "this year" : "/ month";

  if (/\bleft\b|\bafter (your )?fixed\b|\broom\b/.test(lower)) return "Left after fixed costs";
  const necessity = Object.keys(NECESSITY).find((word) => new RegExp(`\\b${word}\\b`).test(clause.toLowerCase()));
  if (necessity) return `${NECESSITY[necessity]} costs ${suffix}`;
  if (/\b3a\b|\bpillar\b/.test(lower)) return /\byear\b/.test(lower) ? "Pillar 3a after a year" : "Pillar 3a / month";
  // The merchant or group named closest to the number is what the number is about.
  const here = clause.length;
  // A name after the number counts a little further away than one before it ("Clothing was 4,597 and online shopping ...").
  const away = (index: number) => Math.abs(index - here) + (index > here ? 6 : 0);
  const named: { label: string; distance: number }[] = [];
  for (const tag of tags) {
    const hit = tag.merchant.length >= 4 ? wordRegex(tag.merchant).exec(window) : null;
    if (hit) named.push({ label: hit[0].replace(/^./, (c) => c.toUpperCase()), distance: away(hit.index) });
  }
  for (const g of spendingGroups) {
    const at = g === "Other" ? -1 : lower.indexOf(g.toLowerCase());
    if (at >= 0) named.push({ label: g, distance: away(at) });
  }
  for (const [word, g] of Object.entries(GROUP_ALIASES)) {
    const hit = wordRegex(word).exec(window);
    if (hit) named.push({ label: g, distance: away(hit.index) });
  }
  named.sort((x, y) => x.distance - y.distance);
  if (named.length) return `${named[0].label} this year`;
  if (userNumbers.includes(value)) return "Your goal / month";
  return suffix === "this year" ? "This year" : "Amount";
}

function deriveFigure(say: string, userNumbers: number[], tags: MerchantTag[]): Figure | undefined {
  const data = new Set(extractNumbers(say));
  const numbers = [...say.matchAll(/\d{1,3}(?:[,'’]\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?/g)]
    .map((m) => ({ value: Number(m[0].replace(/[,'’]/g, "")), at: m.index ?? 0, length: m[0].length }))
    .filter((n) => data.has(n.value) && n.value > 12 && !(n.value >= 1900 && n.value <= 2100));
  const pick = numbers.find((n) => !userNumbers.includes(n.value)) ?? numbers[0];
  return pick ? { label: labelFor(say, pick.at, pick.length, userNumbers, pick.value, tags), value: pick.value } : undefined;
}

// ---------- script ----------

export function stageScript(script: Beat[], ctx: StagingContext): Beat[] {
  const tags = [...ruleTags(), ...ctx.tags];
  const userNumbers = ctx.userNumbers ?? [];
  const screen: State = { type: ctx.currentScene, focus: ctx.currentFocus ?? null };
  let before = screen;

  return script.map((original, index) => {
    const beat: Beat = { ...original, ...(original.scene ? { scene: { ...original.scene } } : {}), ...(original.cues ? { cues: [...original.cues] } : {}) };

    if (!beat.figure) {
      const figure = deriveFigure(beat.say, userNumbers, tags);
      if (figure) beat.figure = figure;
    }

    let state = stateOf(beat, before);
    // The model tends to paste the screen it was given into every beat: that is not a choice of its own.
    const pasted = index > 0 && !!beat.scene && sameState(state, screen) && !mentions(beat.say, state.focus);
    if ((sameState(state, before) || pasted) && !beat.offer) {
      // The first beat stays in the scene she is looking at; later beats may go anywhere.
      const pick = candidates(beat.say, tags).find((c) => !sameState(c.state, before) && (index > 0 || c.state.type === ctx.currentScene));
      if (pick) {
        beat.scene = { type: pick.state.type, ...(pick.state.focus !== null ? { focus: pick.state.focus } : {}) };
        const cues = beat.cues ?? [];
        if (pick.cue && cues.length < MAX_CUES && !cues.some((c) => c.word.toLowerCase() === pick.word.toLowerCase())) {
          const cue: Cue = { word: pick.word, ...(pick.state.focus !== null ? { target: pick.state.focus } : {}) };
          beat.cues = [...cues, cue];
        }
        state = pick.state;
      } else if (index > 0 && sameState(state, before) && before.type !== "galaxy") {
        // Nothing in the sentence names a place to look at: a calm overview instead of repeating the last view.
        beat.scene = { type: "galaxy" };
        state = { type: "galaxy", focus: null };
      }
    }
    // A focus the sentence names gets a cue on its word, so the screen reacts when it is spoken.
    if (!beat.cues?.length && !beat.offer && state.focus !== null) {
      const named = candidates(beat.say, tags).find((c) => c.cue && sameState(c.state, state));
      if (named) beat.cues = [{ word: named.word, target: state.focus }];
    }
    before = state;
    return beat;
  });
}
