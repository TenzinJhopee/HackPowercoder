import type { Keepsake } from "@/lib/savings-plan";
import type { Beat, BeatAnswer, BeatQuestion, ConversationMode, Cue, DirectorResponse, Figure, Script, Snapshot } from "@/lib/contracts";

/** What a spoken line is, for the step bar and caption colour. */
export type LineKind = "main" | "side" | "bridge" | "filler" | "failure";

/** A question the presentation asked: stays on screen with its assumption until answered. `answer` is the chosen answer id. */
export type OpenPoint = { subject: string; label: string; assume: string; answers: BeatAnswer[]; answer: string | null };

/** Everything the UI shell needs to draw. Emitted by the player and the conversation. */
export type EngineEvent =
  /** A new line starts: render one caption span per word (grey), cue words get amber when spoken. */
  | { type: "line"; text: string; words: string[]; cueIndices: number[]; kind: LineKind; beatIndex: number | null; beatCount: number | null }
  /** Word `index` of the current line has been reached (turn it paper colour). `cue` = it carries a cue (amber). */
  | { type: "word"; index: number; word: string; cue: boolean }
  /** The current line stopped: `completed` false means it was interrupted. */
  | { type: "lineEnd"; completed: boolean }
  /** Big number: animate `from` -> `to` (~1.1 s, ease-out cubic). `from` is null on the first figure. */
  | { type: "figure"; from: Figure | null; to: Figure }
  /** Show the touch-to-confirm offer card. */
  | { type: "offer"; beat: Beat }
  /** A cue fired (for the script panel / debugging). */
  | { type: "cue"; cue: Cue; wordIndex: number }
  | { type: "mode"; mode: ConversationMode; previous: ConversationMode }
  /** The saved snapshot changed (null when cleared). Drives "Paused at 3/8". */
  | { type: "snapshot"; snapshot: Snapshot | null }
  /** A script started playing (for the script panel). */
  | { type: "script"; kind: "main" | "side"; script: Script; source?: DirectorResponse["source"] }
  /** A main beat asked the user (show its answers as chips); null when it is answered or dropped. */
  | { type: "question"; question: BeatQuestion | null }
  /** Every question asked so far (in order), answered or not; empty after a start over. */
  | { type: "openPoints"; points: OpenPoint[] }
  /** A prepared answer leaves something to keep (the savings slip). Emitted after its "script"; its side beats reveal it line by line. */
  | { type: "keep"; keepsake: Keepsake }
  | { type: "error"; message: string };

export type EngineListener = (event: EngineEvent) => void;

export class Emitter {
  private listeners = new Set<EngineListener>();

  on(listener: EngineListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  emit = (event: EngineEvent): void => {
    for (const listener of Array.from(this.listeners)) {
      try {
        listener(event);
      } catch (reason) {
        console.error("Engine listener failed", reason);
      }
    }
  };
}
