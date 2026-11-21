import { sceneTypes, type Beat, type Breakdown, type Cue, type Figure, type Script, type SceneType } from "@/lib/contracts";

/**
 * Never trust the model's JSON (docs/IMPLEMENTATION_PLAN.md 9.3), plus a number check:
 * every figure the advisor says or shows must come from code.
 */

export const MAX_BEATS = 5;
export const MAX_SAY_CHARS = 260;
export const MAX_CUES = 2;
const MAX_PARTS = 5;
const MAX_TEXT = 60;

export interface ValidationContext {
  /** The scene on screen; the first beat is forced into it. */
  currentScene: SceneType;
  /** `allowedNumbers(facts)` plus the series values. */
  allowed: Set<number>;
  /** Net spending per month (index 0 = January); the breakdown ceiling. */
  monthTotals: number[];
  /** Results of `total` tool calls made while answering. */
  toolResults?: Iterable<number>;
  /** False when she already has a 3a account elsewhere: no offer card then. Default true. */
  allowOffer?: boolean;
  /** The only amounts a sentence may call a saving or a cut: her own target from the question and the offer amounts. Default none. */
  savingsAllowed?: Iterable<number>;
}

export type ValidationResult = { ok: true; script: Script; dropped: string[] } | { ok: false; error: string };

// ---------- numbers ----------

const NUMBER_PATTERN = /\d{1,3}(?:[,'’]\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?/g;
const MONTH_NAMES = /^\s*(january|february|march|april|may|june|july|august|september|october|november|december)\b/i;
const MONTH_BEFORE = /\b(january|february|march|april|may|june|july|august|september|october|november|december)\s+$/i;
const ORDINAL = /^(st|nd|rd|th)\b/i;

/** Numbers in a text with thousands separators (, ') removed. Day-of-month ("18 September", "September 18") and ordinals are skipped. */
export function extractNumbers(text: string): number[] {
  const found: number[] = [];
  for (const match of text.matchAll(NUMBER_PATTERN)) {
    const value = Number(match[0].replace(/[,'’]/g, ""));
    if (!Number.isFinite(value)) continue;
    const start = match.index ?? 0;
    const rest = text.slice(start + match[0].length);
    const before = text.slice(0, start);
    const isDay =
      Number.isInteger(value) && value >= 1 && value <= 31 && !match[0].includes(",") && (MONTH_NAMES.test(rest) || ORDINAL.test(rest) || MONTH_BEFORE.test(before));
    if (!isDay) found.push(value);
  }
  return found;
}

const round2 = (value: number) => Math.round(value * 100) / 100;

/** Savings and cuts are never computed by the model: a stated amount must be her own target or the offer. */
const SAVE_VERB = /\b(?:sav(?:e|es|ed|ing|ings))\s+(?:(?:about|around|roughly|nearly|up to|another|an extra|a further|only|just|at least|almost)\s+)*(?:chf\s+)?(\d{1,3}(?:[,'’]\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?)/gi;
const CUT_BY = /\b(?:cut(?:ting|s)?|trim(?:ming|s)?|reduc(?:e|es|ing)|lower(?:ing|s)?)\b[^.?!]{0,40}?\bby\s+(?:about\s+|around\s+|up to\s+)?(\d{1,3}(?:[,'’]\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?)/gi;
const SAVED_AMOUNT = /(\d{1,3}(?:[,'’]\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?)\s*(?:francs?\s+)?(?:a month\s+|per month\s+|a year\s+)?(?:in\s+|of\s+)?(?:savings?|saved)\b/gi;

/** Amounts a sentence presents as a saving or a cut ("could save 73", "cut it by 300", "40 francs in savings"). */
export function savingsAmounts(text: string): number[] {
  const found: number[] = [];
  for (const pattern of [SAVE_VERB, CUT_BY, SAVED_AMOUNT]) {
    for (const match of text.matchAll(pattern)) {
      const value = Number(match[1].replace(/[,'’]/g, ""));
      if (Number.isFinite(value)) found.push(value);
    }
  }
  return found;
}

/**
 * Allowed set plus the spoken-rounding tolerance: only amounts of 1,000 and more may be rounded to the nearest 100
 * ("about 4,400"). Smaller amounts must match exactly, so a coincidental small number cannot pass.
 */
function buildAllowed(ctx: ValidationContext) {
  const set = new Set<number>(ctx.allowed);
  for (const value of ctx.toolResults ?? []) set.add(value);
  const rounded = new Set<number>();
  for (const value of set) {
    if (Math.abs(value) >= 1000) rounded.add(Math.round(value / 100) * 100);
  }
  return { exact: set, rounded };
}

type AllowedNumbers = ReturnType<typeof buildAllowed>;

function isAllowedNumber(value: number, allowed: AllowedNumbers) {
  if (value === 0) return true;
  if (Number.isInteger(value) && value >= 1 && value <= 12) return true; // month numbers
  if (Number.isInteger(value) && value >= 1900 && value <= 2100) return true; // years
  if (allowed.exact.has(value) || allowed.exact.has(round2(value))) return true;
  if (value < 1000) return false;
  return allowed.exact.has(Math.round(value)) || allowed.rounded.has(value) || allowed.rounded.has(Math.round(value));
}

// ---------- helpers ----------

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const cleanText = (value: unknown, max = MAX_TEXT) => (typeof value === "string" ? value.trim().slice(0, max) : "");

function truncateSay(text: string) {
  const say = text.trim();
  if (say.length <= MAX_SAY_CHARS) return say;
  const cut = say.slice(0, MAX_SAY_CHARS);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > MAX_SAY_CHARS / 2 ? cut.slice(0, lastSpace) : cut).trimEnd();
}

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** The cue word must be in `say` and not its first word. */
function cueWordInSay(word: string, say: string) {
  const pattern = new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegExp(word)}(?![\\p{L}\\p{N}])`, "giu");
  for (const match of say.matchAll(pattern)) if ((match.index ?? 0) > 0) return true;
  return false;
}

function validTarget(value: unknown): string | number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) return value.trim().slice(0, MAX_TEXT);
  return undefined;
}

function readFigure(value: unknown): Figure | undefined {
  if (!isRecord(value)) return undefined;
  const label = cleanText(value.label, 80);
  if (!label || typeof value.value !== "number" || !Number.isFinite(value.value)) return undefined;
  return { label, value: value.value };
}

// ---------- breakdown ----------

/** Returns the cleaned breakdown, `undefined` when it must be dropped, or "invented" when a value is not from code. */
function readBreakdown(raw: unknown, ctx: ValidationContext, allowed: AllowedNumbers): Breakdown | undefined | "invented" {
  if (!isRecord(raw)) return undefined;
  const month = raw.month;
  if (typeof month !== "number" || !Number.isInteger(month) || month < 1 || month > 12) return undefined;
  const total = ctx.monthTotals[month - 1];
  if (!Array.isArray(raw.parts) || !total || total <= 0) return undefined;

  const parts: Breakdown["parts"] = [];
  for (const entry of raw.parts) {
    if (!isRecord(entry)) continue;
    const name = cleanText(entry.name);
    if (!name || typeof entry.value !== "number" || !Number.isFinite(entry.value) || entry.value <= 0) continue;
    if (!isAllowedNumber(entry.value, allowed)) return "invented";
    const aliases = Array.isArray(entry.aliases)
      ? entry.aliases.map((alias) => cleanText(alias, 30)).filter((alias) => alias.length >= 3).slice(0, 4)
      : [];
    parts.push({ name, value: Math.round(entry.value), ...(aliases.length ? { aliases } : {}) });
  }
  if (!parts.length) return undefined;
  parts.splice(MAX_PARTS);

  const sum = () => parts.reduce((s, p) => s + p.value, 0);
  if (sum() > total * 1.03) return undefined;
  // "Other" takes the remainder; make room if the list is already full.
  let remainder = total - sum();
  if (remainder >= 100 && parts.length >= MAX_PARTS) {
    parts.pop();
    remainder = total - sum();
  }
  if (remainder >= 100) parts.push({ name: "Other", value: Math.round(remainder) });
  return { month, parts };
}

// ---------- beat ----------

type BeatResult = { beat: Beat } | { reason: string };

function readBeat(raw: unknown, ctx: ValidationContext, allowed: AllowedNumbers, savingsAllowed: Set<number>): BeatResult {
  if (!isRecord(raw)) return { reason: "not an object" };
  if (typeof raw.say !== "string" || !raw.say.trim()) return { reason: "no say" };
  const say = truncateSay(raw.say);

  const invented = extractNumbers(say).find((n) => !isAllowedNumber(n, allowed));
  if (invented !== undefined) return { reason: `invented number ${invented} in say` };
  const saving = savingsAmounts(say).find((n) => !savingsAllowed.has(n));
  if (saving !== undefined) return { reason: `invented savings amount ${saving} in say` };

  const beat: Beat = { say };

  if (raw.figure !== undefined) {
    const figure = readFigure(raw.figure);
    if (figure) {
      if (!isAllowedNumber(figure.value, allowed)) return { reason: `invented figure ${figure.value}` };
      beat.figure = figure;
    }
  }

  if (isRecord(raw.scene)) {
    const known = typeof raw.scene.type === "string" && (sceneTypes as readonly string[]).includes(raw.scene.type);
    const scene: NonNullable<Beat["scene"]> = { type: known ? (raw.scene.type as SceneType) : ctx.currentScene };
    const focus = validTarget(raw.scene.focus);
    if (focus !== undefined) scene.focus = focus;
    if (raw.scene.breakdown !== undefined) {
      const breakdown = readBreakdown(raw.scene.breakdown, ctx, allowed);
      if (breakdown === "invented") return { reason: "invented number in breakdown" };
      if (breakdown) scene.breakdown = breakdown;
    }
    beat.scene = scene;
  }

  if (Array.isArray(raw.cues)) {
    const cues: Cue[] = [];
    for (const entry of raw.cues) {
      if (!isRecord(entry)) continue;
      const word = cleanText(entry.word, 40);
      if (!word || !cueWordInSay(word, say) || cues.some((c) => c.word.toLowerCase() === word.toLowerCase())) continue;
      const cue: Cue = { word };
      const target = validTarget(entry.target);
      if (target !== undefined) cue.target = target;
      if (entry.action === "breakdown" || entry.action === "ghost") cue.action = entry.action;
      if (entry.figure !== undefined) {
        const figure = readFigure(entry.figure);
        if (figure) {
          if (!isAllowedNumber(figure.value, allowed)) return { reason: `invented figure ${figure.value} in cue` };
          cue.figure = figure;
        }
      }
      cues.push(cue);
      if (cues.length === MAX_CUES) break;
    }
    if (cues.length) beat.cues = cues;
  }

  if (raw.offer === true) beat.offer = true;
  return { beat };
}

// ---------- script ----------

export function validateScript(raw: unknown, ctx: ValidationContext): ValidationResult {
  const list = Array.isArray(raw) ? raw : isRecord(raw) && Array.isArray(raw.script) ? raw.script : undefined;
  if (!list) return { ok: false, error: "no_script" };

  const allowed = buildAllowed(ctx);
  const savingsAllowed = new Set(ctx.savingsAllowed ?? []);
  const script: Beat[] = [];
  const dropped: string[] = [];
  for (const entry of list) {
    if (script.length >= MAX_BEATS) break;
    const result = readBeat(entry, ctx, allowed, savingsAllowed);
    if ("reason" in result) dropped.push(result.reason);
    else script.push(result.beat);
  }
  if (!script.length) return { ok: false, error: dropped.length ? `all_beats_invalid: ${dropped.join("; ")}` : "empty_script" };

  // The offer card is the one pillar 3a option: only the last beat may carry it, and only when it says so.
  script.forEach((beat, index) => {
    if (beat.offer && !(ctx.allowOffer !== false && index === script.length - 1 && /\b3a\b/i.test(beat.say))) delete beat.offer;
  });

  // The first beat stays on the scene she is looking at.
  const first = script[0];
  if (!first.scene) first.scene = { type: ctx.currentScene };
  else if (first.scene.type !== ctx.currentScene) first.scene = { type: ctx.currentScene };

  return { ok: true, script, dropped };
}
