/**
 * Shared contracts (docs/IMPLEMENTATION_PLAN.md sections 3-4). Frozen: change only with the whole team.
 * Imported by the server (director, validation), the client engine (player, conversation) and scripts.
 */

// ---------- 3.1 Script ----------

/** The big number on screen. */
export type Figure = { label: string; value: number };

export type SceneType = "galaxy" | "river" | "pools" | "travel" | "jars" | "level" | "monthly";
export const sceneTypes: readonly SceneType[] = ["galaxy", "river", "pools", "travel", "jars", "level", "monthly"];

export type Cue = {
  /** Must appear verbatim in `say`, never as its first word. */
  word: string;
  /** Scene-specific: category name, month 1-12, part name, "3a", "13". */
  target?: string | number;
  /** "breakdown": open the current month's column into parts. "ghost": show a missing payment as an empty outline. */
  action?: "breakdown" | "ghost";
  /** The big number changes at this word. */
  figure?: Figure;
};

export type Breakdown = { month: number; parts: { name: string; value: number; aliases?: string[] }[] };

export type Beat = {
  /** One sentence, max 18 words. Speech says "francs"; captions write 14,363. */
  say: string;
  scene?: { type: SceneType; focus?: string | number; breakdown?: Breakdown };
  figure?: Figure;
  /** Max 2 per beat. */
  cues?: Cue[];
  /** Show the touch-to-confirm offer card. Money moves are never confirmed by voice. */
  offer?: boolean;
  /** Main beats only: said when resuming at this beat after an interruption. */
  bridge?: string;
  /** Main beats only: the line asks the user; the conversation waits in `answering` until one of these is chosen. */
  question?: BeatQuestion;
};

/** `subject` is the facts insight id the answer is saved under (POST /api/notes). */
export type BeatQuestion = { subject: string; answers: BeatAnswer[] };
/** `id` is the machine answer saved in notes; `kind` matches spoken "yes"/"no" replies; `skipOffer` skips the offer beat. */
export type BeatAnswer = { id: string; label: string; kind: "yes" | "no"; skipOffer?: boolean };

export type Script = Beat[];

// ---------- 3.2 World (implemented by the grain world, owner 2) ----------

/** What the player and the conversation engine need from the visual world. A stub implements it until the real scenes land. */
export interface World {
  currentScene(): SceneType | null;
  currentFocus(): string | number | null;
  /** Names the current scene can focus (category names, months 1-12, part names); used by the fast path. */
  focusTargets(): (string | number)[];
  enter(scene: SceneType): void;
  focus(target: string | number): void;
  unfocus(): void;
  breakdown(b: Breakdown): void;
  collapse(): void;
  /** Missing payment shown as an empty dashed outline (e.g. February health insurance). */
  ghost?(target: string | number): void;
  /** After touch-confirming the offer. */
  fillJar?(jar: string): void;
}

// ---------- 3.3 Conversation states ----------

export type ConversationMode = "idle" | "presenting" | "listening" | "side" | "waiting" | "answering" | "returning" | "finished";
export type Intent = "continue" | "wait" | "end" | "question";

// ---------- 3.4 Snapshot ----------

export type Snapshot = {
  scene: SceneType;
  focus: string | number | null;
  figure: Figure;
  /** Which main beat was interrupted. */
  mainIndex: number;
  /** Its text, sent to the director as context. */
  sentence: string;
  wordsSpoken: number;
};

// ---------- Voice ----------

export type WordTiming = { word: string; start: number; end: number; charStart: number; charEnd: number };

/** `POST /api/voice/speak {text}` response; also the format of pre-generated `public/voice/{key}.json`. */
export type SpeechPayload = { audioBase64?: string; mimeType?: "audio/mpeg"; words: WordTiming[] };

/** Pre-generated audio for prepared lines: `public/voice/manifest.json` maps audioKey(text) → files. */
export type VoiceManifest = Record<string, { text: string; audio: string; timings: string }>;

/** Stable key for a spoken line (FNV-1a over the trimmed text). Client and pregen script must use this. */
export function audioKey(text: string): string {
  let hash = 0x811c9dc5;
  for (const char of text.trim()) {
    hash ^= char.codePointAt(0)!;
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}

// ---------- Director ----------

/** What is on screen when the user asks; sent to the director. */
export type ScreenContext = {
  scene: SceneType;
  focus: string | number | null;
  lastSentence: string;
  /** The data the current scene shows (e.g. the 12 monthly values). */
  visible?: unknown;
  /** Month whose column is broken down, if any. */
  openBar: number | null;
};

export type DirectorRequest = { question: string; screen: ScreenContext; mode: "side" | "answer" };
export type DirectorResponse = { script: Script; source: "model" | "prepared" | "fallback"; error?: string };

/** Spoken when the director fails; then the conversation goes to `waiting`. */
export const DIRECTOR_FAILURE_LINE = "I could not put an answer together right now.";
/** Spoken while the director is working; rotated so the same one is never heard twice in a row. */
export const FILLER_LINES = [
  "Good question, give me a second.",
  "Hmm, let me look into that for you.",
  "Let me look at your numbers.",
  "Right, let me pull that up.",
  "Let me see what your year says about that."
] as const;
export const FILLER_LINE = FILLER_LINES[0];
/** Spoken on resume when the interrupted beat has no bridge. */
export const DEFAULT_BRIDGE = "Where were we.";
