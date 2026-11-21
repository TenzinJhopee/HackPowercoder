import {
  DEFAULT_BRIDGE,
  DIRECTOR_FAILURE_LINE,
  FILLER_LINE,
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
import { Emitter, type EngineListener } from "../events";
import { Player } from "../player/player";
import { isBackupMode, type Speaker } from "../player/voice";
import { classify, targetIn } from "./intent";

export type PreparedAnswer = { match: (question: string) => boolean; script: Script };

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

  constructor(options: ConversationOptions) {
    this.world = options.world;
    this.main = options.main;
    this.prepared = options.prepared ?? [];
    this.backup = options.backup ?? isBackupMode();
    this.fetcher = options.fetch ?? ((input, init) => fetch(input, init));
    this.directorUrl = options.directorUrl ?? "/api/director";
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
    return this.playMain(0);
  }

  /** Stop button / mic pressed / "wait": stop now and listen. */
  interrupt(): void {
    if (this.mode === "presenting" || this.mode === "returning") this.setSnapshot(this.takeSnapshot());
    if (this.mode === "presenting" || this.mode === "returning" || this.mode === "side") {
      this.cancel();
      this.setMode("listening");
    }
  }

  /** Any typed or transcribed input: classify and act. Returns the intent it acted on. */
  input(text: string): Intent {
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
    if (prepared) {
      this.events.emit({ type: "script", kind: "side", script: prepared.script, source: "prepared" });
      if (!(await this.playSide(prepared.script, my))) return;
      return this.finishSide(my);
    }

    if (this.backup) {
      if (!(await this.player.speak(DIRECTOR_FAILURE_LINE, my, "failure"))) return;
      return this.finishSide(my);
    }

    const request: DirectorRequest = { question, screen: this.screen(), mode: "side" };
    const answer = this.callDirector(request);
    if (!(await this.player.speak(FILLER_LINE, my, "filler"))) return;
    const response = await answer;
    if (!this.player.isCurrent(my)) return;
    if (!response || !isScript(response.script)) {
      if (response?.error) this.events.emit({ type: "error", message: response.error });
      if (!(await this.player.speak(DIRECTOR_FAILURE_LINE, my, "failure"))) return;
      return this.finishSide(my);
    }
    this.events.emit({ type: "script", kind: "side", script: response.script, source: response.source });
    if (!(await this.playSide(response.script, my))) return;
    this.finishSide(my);
  }

  /** "OK, let's continue": restore the snapshot, speak the bridge, replay the interrupted beat. */
  async resume(): Promise<void> {
    const s = this.snapshot;
    if (!s) {
      if (this.mainDone) return this.setMode("finished");
      return this.playMain(this.mode === "idle" ? 0 : this.mainIndex);
    }
    const my = this.player.begin();
    this.setSnapshot(null);
    this.mainIndex = s.mainIndex;
    this.setMode("returning");
    this.restore(s);
    const bridge = this.main[s.mainIndex]?.bridge ?? DEFAULT_BRIDGE;
    if (!(await this.player.speak(bridge, my, "bridge"))) return;
    return this.playMain(s.mainIndex, my);
  }

  /** "That's all": stop everything. */
  end(): void {
    this.cancel();
    this.setSnapshot(null);
    this.setMode("finished");
  }

  /** The offer card was touch-confirmed (never by voice). */
  confirmOffer(jar: string, figure?: Figure): void {
    this.world.fillJar?.(jar);
    if (figure) this.player.setFigure(figure);
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
      this.mainIndex = i;
      const ok = await this.player.playBeat(this.main[i], my, { kind: "main", beatIndex: i, beatCount: this.main.length });
      if (!ok) return;
    }
    if (!this.player.isCurrent(my)) return;
    this.mainDone = true;
    this.setMode("finished");
  }

  private async playSide(script: Script, my: number): Promise<boolean> {
    for (let i = 0; i < script.length; i++) {
      const ok = await this.player.playBeat(script[i], my, { kind: "side", beatIndex: i, beatCount: script.length });
      if (!ok) return false;
    }
    return true;
  }

  private finishSide(my: number): void {
    if (this.player.isCurrent(my)) this.setMode("waiting");
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

  private cancel(): void {
    this.player.cancel();
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
      wordsSpoken: this.player.wordsSpoken,
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
