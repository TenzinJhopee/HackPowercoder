import type { Beat, Breakdown, Cue, Figure, World } from "@/lib/contracts";
import type { EngineEvent, LineKind } from "../events";
import { normalizeWord, splitWords, type Speaker } from "./voice";

/**
 * Word index each cue fires at, in cue order (-1 = not found; fired at the start of the line).
 * Matching is case-insensitive with punctuation and apostrophes stripped; multi-word cues match on their first word.
 * A cue is never the first word, so the search starts at word 1 (falling back to word 0); later cues search after earlier ones.
 */
export function cueWordIndices(say: string, cues: Cue[] = []): number[] {
  const words = splitWords(say).map((w) => normalizeWord(w.word));
  let from = 1;
  return cues.map((cue) => {
    const parts = splitWords(cue.word).map((w) => normalizeWord(w.word)).filter(Boolean);
    if (!parts.length) return -1;
    const find = (start: number) => {
      for (let i = start; i + parts.length <= words.length; i++) {
        if (parts.every((p, k) => words[i + k] === p)) return i;
      }
      return -1;
    };
    const index = [find(from), find(1), find(0)].find((i) => i >= 0) ?? -1;
    if (index >= 0) from = index + 1;
    return index;
  });
}

export type PlayOptions = { kind?: LineKind; beatIndex?: number | null; beatCount?: number | null };

export type PlayerOptions = {
  world: World;
  voice: Speaker;
  emit?: (event: EngineEvent) => void;
};

/** Plays beats against the World and the voice. Owns the `run` token (plan 7.1). */
export class Player {
  readonly world: World;
  readonly voice: Speaker;
  private readonly emit: (event: EngineEvent) => void;
  private run = 0;
  /** The big number currently on screen. */
  figure: Figure | null = null;
  /** Month whose column is broken down, if any (for ScreenContext.openBar). */
  openBar: number | null = null;
  /** Words of the current line reached so far. */
  wordsSpoken = 0;
  /** Text of the last line started. */
  lastLine = "";

  constructor(options: PlayerOptions) {
    this.world = options.world;
    this.voice = options.voice;
    this.emit = options.emit ?? (() => undefined);
  }

  /** Invalidates every running flow and stops the voice now. */
  cancel(): void {
    this.run++;
    this.voice.stop();
  }

  /** Cancels whatever runs and returns a fresh token for a new flow. */
  begin(): number {
    this.cancel();
    return this.run;
  }

  isCurrent(token: number): boolean {
    return token === this.run;
  }

  /** Sets the big number (the UI animates from -> to). */
  setFigure(figure: Figure): void {
    const from = this.figure;
    if (from && from.label === figure.label && from.value === figure.value) return;
    this.figure = figure;
    this.emit({ type: "figure", from, to: figure });
  }

  breakdown(b: Breakdown): void {
    this.world.breakdown(b);
    this.openBar = b.month;
  }

  collapse(): void {
    this.world.collapse();
    this.openBar = null;
  }

  /** Applies a beat's scene setup without speaking (plan 7.1 order). */
  setup(beat: Beat): void {
    const scene = beat.scene;
    if (scene) {
      if (this.world.currentScene() === scene.type) {
        if (scene.focus == null) this.world.unfocus();
      } else {
        this.world.enter(scene.type);
        this.openBar = null;
      }
      const deferred = beat.cues?.some((c) => c.action === "breakdown");
      if (scene.breakdown && !deferred) this.breakdown(scene.breakdown);
      if (scene.focus != null) this.world.focus(scene.focus);
    }
    if (beat.figure) this.setFigure(beat.figure);
    if (beat.offer) this.emit({ type: "offer", beat });
  }

  /** Plays one beat: setup, then speech with cues at their words. Resolves false if `token` went stale. */
  async playBeat(beat: Beat, token: number, options: PlayOptions = {}): Promise<boolean> {
    if (!this.isCurrent(token)) return false;
    this.setup(beat);
    const cues = beat.cues ?? [];
    const at = cueWordIndices(beat.say, cues);
    const byWord = new Map<number, Cue[]>();
    at.forEach((index, i) => byWord.set(Math.max(index, 0), [...(byWord.get(Math.max(index, 0)) ?? []), cues[i]]));
    return this.speakLine(beat.say, token, options, byWord, beat);
  }

  /** Speaks a bare line (bridge, filler, failure) with captions. Resolves false if `token` went stale. */
  speak(text: string, token: number, kind: LineKind): Promise<boolean> {
    return this.speakLine(text, token, { kind });
  }

  private async speakLine(text: string, token: number, options: PlayOptions, cues = new Map<number, Cue[]>(), beat?: Beat): Promise<boolean> {
    if (!this.isCurrent(token)) return false;
    const words = splitWords(text);
    this.lastLine = text;
    this.wordsSpoken = 0;
    this.emit({
      type: "line",
      text,
      words: words.map((w) => w.word),
      cueIndices: Array.from(cues.keys()).sort((a, b) => a - b),
      kind: options.kind ?? "main",
      beatIndex: options.beatIndex ?? null,
      beatCount: options.beatCount ?? null,
    });
    const completed = await this.voice.speak(text, (index, word) => {
      if (!this.isCurrent(token)) return;
      this.wordsSpoken = index + 1;
      const hits = cues.get(index);
      this.emit({ type: "word", index, word, cue: !!hits });
      for (const cue of hits ?? []) this.fire(cue, index, beat);
    });
    const ok = completed && this.isCurrent(token);
    this.emit({ type: "lineEnd", completed: ok });
    return ok;
  }

  private fire(cue: Cue, wordIndex: number, beat?: Beat): void {
    if (cue.action === "breakdown") {
      const b = beat?.scene?.breakdown;
      if (b) this.breakdown(b);
    } else if (cue.action === "ghost") {
      if (cue.target != null) this.world.ghost?.(cue.target);
    } else if (cue.target != null) {
      this.world.focus(cue.target);
    }
    if (cue.figure) this.setFigure(cue.figure);
    this.emit({ type: "cue", cue, wordIndex });
  }
}
