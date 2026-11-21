import { BACKUP_NO_ANSWER_LINE, CLOSING_LINES, INVITE_LINES, OFFER_CONFIRMED_LINE, REENTRY_LINES } from "@/content/scripts";
import {
  DEFAULT_BRIDGE,
  DIRECTOR_FAILURE_LINE,
  FILLER_LINES,
  type ConversationMode,
  type DirectorRequest,
  type DirectorResponse,
  type Figure,
  type Intent,
  type ScreenContext,
  type Script,
  type Snapshot,
  type World,
} from "@/lib/contracts";
import type { Keepsake } from "@/lib/savings-plan";
import { Emitter, type EngineListener } from "../events";
import { Player } from "../player/player";
import { isBackupMode, type Speaker } from "../player/voice";
import { classify, matchAnswer, targetIn } from "./intent";

/** `script` may be built from the question (e.g. the amount in "Can I afford ...?"); no network either way. */
export type PreparedAnswer = {
  match: (question: string) => boolean;
  script: Script | ((question: string) => Script);
  /** Something that stays on screen after the answer (emitted as a "keep" event). */
  keep?: (question: string) => Keepsake | null;
  /** Short reactions spoken before the answer, rotated. */
  lead?: readonly string[];
};

export type ConversationOptions = {
  world: World;
  voice: Speaker;
  main: Script;
  prepared?: PreparedAnswer[];
  /** Default: `?backup=1` in the URL. Backup never calls the director. */
  backup?: boolean;
  fetch?: typeof fetch;
  /** Default "/api/director". */
  directorUrl?: string;
  /** Answers to question beats are saved here. Default "/api/notes". */
  notesUrl?: string;
  /** Director timeout in ms. Default 12000. */
  directorTimeoutMs?: number;
  /** The data the current scene shows, sent as ScreenContext.visible. */
  visible?: () => unknown;
};

const isScript = (value: unknown): value is Script =>
  Array.isArray(value) && value.length > 0 && value.every((b) => b && typeof b === "object" && typeof (b as { say?: unknown }).say === "string" && (b as { say: string }).say.trim() !== "");

/** The conversation state machine (plan 3.3, 8.1, 8.2). UI calls these without awaiting; tests may await. */
export class Conversation {
  readonly player: Player;
  readonly world: World;
  readonly main: Script;
  readonly backup: boolean;
  private readonly prepared: PreparedAnswer[];
  private readonly fetcher: typeof fetch;
  private readonly directorUrl: string;
  private readonly notesUrl: string;
  private readonly directorTimeoutMs: number;
  private readonly visible?: () => unknown;
  private readonly events = new Emitter();
  private directorAbort: AbortController | null = null;

  mode: ConversationMode = "idle";
  /** Saved at interruption; one level deep. */
  snapshot: Snapshot | null = null;
  /** The main beat playing (or last played). */
  mainIndex = 0;
  /** The main script played to its end (a later "continue" has nothing to resume). */
  private mainDone = false;
  /** Main beat index whose question waits for an answer (mode `answering`). */
  private asking: number | null = null;
  /** The user already has what the offer is for: offer beats are skipped. */
  private skipOffer = false;
  /** The offer card was tapped while a line played: say the confirmation once that flow ends. */
  private confirmPending = false;
  /** Next filler line; rotates so consecutive questions sound different. */
  private fillerIndex = 0;
  /** Rotation position per fixed line list (lead-ins, closings, re-entries, invitations). */
  private readonly turns = new Map<readonly string[], number>();

  constructor(options: ConversationOptions) {
    this.world = options.world;
    this.main = options.main;
    this.prepared = options.prepared ?? [];
    this.backup = options.backup ?? isBackupMode();
    this.fetcher = options.fetch ?? ((input, init) => fetch(input, init));
    this.directorUrl = options.directorUrl ?? "/api/director";
    this.notesUrl = options.notesUrl ?? "/api/notes";
    this.directorTimeoutMs = options.directorTimeoutMs ?? 12000;
    this.visible = options.visible;
    this.player = new Player({ world: options.world, voice: options.voice, emit: this.events.emit });
  }

  /** Subscribe to engine events (captions, figure, offer, mode, snapshot). Returns unsubscribe. */
  on(listener: EngineListener): () => void {
    return this.events.on(listener);
  }

  /** Start (or start over) the main script from beat 1. */
  start(): Promise<void> {
    this.setSnapshot(null);
    this.setAsking(null);
    this.skipOffer = false;
    return this.playMain(0);
  }

  /** Answer chip or matched reply to a question beat: save it (best effort), then continue the main script. */
  answer(id: string): Promise<void> {
    const index = this.asking;
    const question = index !== null ? this.main[index]?.question : undefined;
    const chosen = question?.answers.find((a) => a.id === id);
    if (index === null || !question || !chosen) return Promise.resolve();
    this.setAsking(null);
    if (chosen.skipOffer) this.skipOffer = true;
    void this.fetcher(this.notesUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject: question.subject, answer: chosen.id, text: chosen.label }),
    }).catch(() => undefined);
    return this.playMain(index + 1);
  }

  /**
   * Stop button / mic pressed / "wait": fade the voice out and listen. `invite` (the Stop button only, never the mic)
   * adds a very short "Yes?". In `listening` it just silences that invitation, so nothing talks over the mic.
   */
  interrupt(invite = false): void {
    if (this.mode === "listening") {
      this.player.cancel();
      return;
    }
    if (this.mode === "presenting" || this.mode === "returning") this.setSnapshot(this.takeSnapshot());
    if (this.mode === "presenting" || this.mode === "returning" || this.mode === "side") {
      this.cancel(true);
      this.setMode("listening");
      if (invite) {
        const my = this.player.begin();
        void this.player.speak(this.pick(INVITE_LINES), my, "filler");
      }
    }
  }

  /** Any typed or transcribed input: classify and act. Returns the intent it acted on. */
  input(text: string): Intent {
    const asked = this.mode === "answering" && this.asking !== null ? this.main[this.asking]?.question : undefined;
    const reply = asked ? matchAnswer(text, asked.answers) : null;
    if (reply) {
      void this.answer(reply.id);
      return "continue";
    }
    const intent = classify(text, this.world.focusTargets());
    if (intent === "continue") void this.resume();
    else if (intent === "wait") this.interrupt();
    else if (intent === "end") this.end();
    else void this.ask(text);
    return intent;
  }

  /** Side answer (plan 8.2). Ends in `waiting` unless interrupted. */
  async ask(question: string): Promise<void> {
    this.interrupt();
    const my = this.player.begin();
    this.setMode("side");

    // Fast path, before any network call.
    const target = targetIn(question, this.world.focusTargets(), this.world.currentFocus());
    if (target !== null && target !== this.world.currentFocus()) this.world.focus(target);

    const prepared = this.prepared.find((p) => {
      try {
        return p.match(question);
      } catch {
        return false;
      }
    });
    const preparedScript = prepared && (typeof prepared.script === "function" ? prepared.script(question) : prepared.script);
    if (preparedScript) {
      this.events.emit({ type: "script", kind: "side", script: preparedScript, source: "prepared" });
      const keepsake = prepared?.keep?.(question);
      if (keepsake) this.events.emit({ type: "keep", keepsake });
      // A person reacts first: a short lead-in that names the topic, while the zoom above already runs.
      if (prepared?.lead?.length && !(await this.player.speak(this.pick(prepared.lead), my, "filler"))) return;
      if (!(await this.playSide(preparedScript, my))) return;
      return this.finishSide(my, preparedScript);
    }

    if (this.backup) {
      if (!(await this.player.speak(BACKUP_NO_ANSWER_LINE, my, "failure"))) return;
      return this.finishSide(my);
    }

    const request: DirectorRequest = { question, screen: this.screen(), mode: "side" };
    const answer = this.callDirector(request);
    if (!(await this.player.speak(FILLER_LINES[this.fillerIndex++ % FILLER_LINES.length], my, "filler"))) return;
    const response = await answer;
    if (!this.player.isCurrent(my)) return;
    if (!response || !isScript(response.script)) {
      if (response?.error) this.events.emit({ type: "error", message: response.error });
      if (!(await this.player.speak(DIRECTOR_FAILURE_LINE, my, "failure"))) return;
      return this.finishSide(my);
    }
    this.events.emit({ type: "script", kind: "side", script: response.script, source: response.source });
    if (!(await this.playSide(response.script, my))) return;
    return this.finishSide(my, response.script);
  }

  /** "OK, let's continue": restore the snapshot, speak the bridge, replay the interrupted beat. */
  async resume(): Promise<void> {
    const s = this.snapshot;
    if (!s && this.asking !== null) {
      // "Continue" without an answer: move past the question.
      const next = this.asking + 1;
      this.setAsking(null);
      return this.playMain(next);
    }
    if (!s) {
      if (this.mainDone) return this.setMode("finished");
      return this.playMain(this.mode === "idle" ? 0 : this.mainIndex);
    }
    const my = this.player.begin();
    this.setSnapshot(null);
    this.mainIndex = s.mainIndex;
    this.setMode("returning");
    this.restore(s);
    // Re-entry, then the beat's bridge as a short recap, then on with the presentation.
    if (!(await this.player.speak(this.pick(REENTRY_LINES), my, "bridge"))) return;
    const beat = this.main[s.mainIndex];
    if (!(await this.player.speak(beat?.bridge ?? DEFAULT_BRIDGE, my, "bridge"))) return;
    // Heard nearly to its end: go on with the next beat instead of repeating it (question and offer beats replay).
    const words = beat ? beat.say.split(/\s+/).filter(Boolean).length : 0;
    const heard = beat && !beat.question && !beat.offer && words > 0 && s.wordsSpoken >= words - 2;
    return this.playMain(heard ? s.mainIndex + 1 : s.mainIndex, my);
  }

  /** "That's all": stop everything. */
  end(): void {
    this.cancel();
    this.setSnapshot(null);
    this.setAsking(null);
    this.setMode("finished");
  }

  /** The offer card was touch-confirmed (never by voice). */
  confirmOffer(jar: string, figure?: Figure): void {
    this.world.fillJar?.(jar);
    if (figure) this.player.setFigure(figure);
    // Spoken only when nothing else is talking, so it never cuts into a line.
    if (this.mode === "finished" || this.mode === "waiting" || this.mode === "listening" || this.mode === "idle") {
      const my = this.player.begin();
      void this.player.speak(OFFER_CONFIRMED_LINE, my, "side");
    } else {
      this.confirmPending = true;
    }
  }

  /** Says the offer confirmation that was tapped while a line was playing. False if `my` went stale. */
  private async sayConfirmed(my: number): Promise<boolean> {
    if (!this.confirmPending) return this.player.isCurrent(my);
    this.confirmPending = false;
    return this.player.speak(OFFER_CONFIRMED_LINE, my, "side");
  }

  /** What the director is told about the screen. */
  screen(): ScreenContext {
    return {
      scene: this.world.currentScene() ?? this.snapshot?.scene ?? this.main[this.mainIndex]?.scene?.type ?? "galaxy",
      focus: this.world.currentFocus(),
      lastSentence: this.snapshot?.sentence ?? this.player.lastLine,
      visible: this.visible?.(),
      openBar: this.player.openBar,
    };
  }

  // ---------- internals ----------

  private async playMain(from: number, token?: number): Promise<void> {
    const my = token !== undefined && this.player.isCurrent(token) ? token : this.player.begin();
    this.setMode("presenting");
    this.mainDone = false;
    if (from === 0) this.events.emit({ type: "script", kind: "main", script: this.main });
    for (let i = from; i < this.main.length; i++) {
      const beat = this.main[i];
      if (beat.offer && this.skipOffer) continue;
      this.mainIndex = i;
      const ok = await this.player.playBeat(beat, my, { kind: "main", beatIndex: i, beatCount: this.main.length });
      if (!ok) return;
      if (beat.question) {
        this.setAsking(i);
        this.setMode("answering");
        return;
      }
    }
    if (!(await this.sayConfirmed(my))) return;
    this.mainDone = true;
    this.setMode("finished");
  }

  private async playSide(script: Script, my: number): Promise<boolean> {
    for (let i = 0; i < script.length; i++) {
      if (script[i].offer && this.skipOffer) continue;
      const ok = await this.player.playBeat(script[i], my, { kind: "side", beatIndex: i, beatCount: script.length });
      if (!ok) return false;
    }
    return true;
  }

  /** Ends a side answer: hands the choice back out loud (unless it ended asking, or with the offer), then waits. */
  private async finishSide(my: number, script?: Script): Promise<void> {
    if (!(await this.sayConfirmed(my))) return;
    const last = script ? [...script].reverse().find((b) => !(b.offer && this.skipOffer)) : undefined;
    const handedBack = !!last && (last.offer || /\?\s*$/.test(last.say));
    const nothingLeft = !this.snapshot && this.asking === null && this.mainDone;
    if (!handedBack && !nothingLeft && !(await this.player.speak(this.pick(CLOSING_LINES), my, "bridge"))) return;
    this.setMode("waiting");
  }

  /** Next line of a rotating list, so the same one is not heard twice in a row. */
  private pick(lines: readonly string[]): string {
    const i = this.turns.get(lines) ?? 0;
    this.turns.set(lines, i + 1);
    return lines[i % lines.length];
  }

  private setAsking(index: number | null): void {
    if (index === this.asking) return;
    this.asking = index;
    this.events.emit({ type: "question", question: index !== null ? (this.main[index]?.question ?? null) : null });
  }

  private async callDirector(request: DirectorRequest): Promise<DirectorResponse | null> {
    const abort = new AbortController();
    this.directorAbort = abort;
    const timer = setTimeout(() => abort.abort(), this.directorTimeoutMs);
    try {
      const res = await this.fetcher(this.directorUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
        signal: abort.signal,
      });
      if (!res.ok) return null;
      return (await res.json()) as DirectorResponse;
    } catch {
      return null;
    } finally {
      clearTimeout(timer);
      if (this.directorAbort === abort) this.directorAbort = null;
    }
  }

  private cancel(soft = false): void {
    this.player.cancel(soft);
    this.directorAbort?.abort();
    this.directorAbort = null;
  }

  private takeSnapshot(): Snapshot {
    const beat = this.main[this.mainIndex];
    return {
      scene: this.world.currentScene() ?? beat?.scene?.type ?? "galaxy",
      focus: this.world.currentFocus(),
      figure: this.player.figure ?? { label: "", value: 0 },
      mainIndex: this.mainIndex,
      sentence: beat?.say ?? "",
      // Only counts when the beat itself was playing (not a re-entry or bridge line).
      wordsSpoken: this.mode === "presenting" && this.player.lastLine === beat?.say ? this.player.wordsSpoken : 0,
    };
  }

  /** Plan 8.1: scene, collapse breakdown, focus, figure. */
  private restore(s: Snapshot): void {
    if (this.world.currentScene() !== s.scene) this.world.enter(s.scene);
    else this.player.collapse();
    this.player.openBar = null;
    if (s.focus != null) this.world.focus(s.focus);
    else this.world.unfocus();
    if (s.figure.label || s.figure.value) this.player.setFigure(s.figure);
  }

  private setMode(mode: ConversationMode): void {
    if (mode === this.mode) return;
    const previous = this.mode;
    this.mode = mode;
    this.events.emit({ type: "mode", mode, previous });
  }

  private setSnapshot(snapshot: Snapshot | null): void {
    if (snapshot === this.snapshot) return;
    this.snapshot = snapshot;
    this.events.emit({ type: "snapshot", snapshot });
  }
}
