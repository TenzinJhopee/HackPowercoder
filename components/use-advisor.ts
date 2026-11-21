"use client";

/**
 * ALL engine wiring lives in this file. The UI shell only reads what this hook returns.
 * The world is the grain world (client/world); <StageCanvas> in stage.tsx hosts its canvas.
 */

import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Conversation, Voice, isBackupMode, type EngineEvent, type OpenPoint, type VoiceStatus } from "@/client";
import type { Beat, BeatQuestion, ConversationMode, Figure, Snapshot } from "@/lib/contracts";
import { MAIN, SIDE_ANSWERS } from "@/content/scripts";
import { GrainWorld } from "@/client/world/grain-world";
import type { CaptionLine } from "./caption";
import { keepReducer, type KeptSlip } from "./keepsake";
import type { PlayingScript } from "./script-panel";
import type { FigureChange } from "./stage";

export const OFFER_JAR = "3a";
export const OFFER_FIGURE: Figure = { label: "In pillar 3a after one year", value: 2400 };
const OPENING_FIGURE: Figure = { label: "Income in 2025", value: 97032 };

type Step = { index: number; count: number };

type State = {
  mode: ConversationMode;
  line: CaptionLine | null;
  main: Step | null;
  side: Step | null;
  figure: FigureChange;
  snapshot: Snapshot | null;
  playing: PlayingScript | null;
  offer: Beat | null;
  offerConfirmed: boolean;
  question: BeatQuestion | null;
  /** Questions asked so far, with their assumptions; stay to the end, cleared on start over. */
  points: OpenPoint[];
  /** The savings slip: stays until the user closes it or starts over. */
  slip: KeptSlip | null;
  error: string | null;
};

const initialState: State = {
  mode: "idle",
  line: null,
  main: null,
  side: null,
  figure: { seq: 0, from: null, to: OPENING_FIGURE },
  snapshot: null,
  playing: null,
  offer: null,
  offerConfirmed: false,
  question: null,
  points: [],
  slip: null,
  error: null
};

type Action = { type: "engine"; event: EngineEvent } | { type: "confirmed" } | { type: "closeSlip" } | { type: "reset" };

function reducer(state: State, action: Action): State {
  if (action.type === "reset") return { ...initialState, figure: { seq: state.figure.seq + 1, from: null, to: OPENING_FIGURE } };
  if (action.type === "confirmed") return { ...state, offerConfirmed: true };
  if (action.type === "closeSlip") return { ...state, slip: null };
  const event = action.event;
  const slip = keepReducer(state.slip, event);
  if (slip !== state.slip) state = { ...state, slip };
  switch (event.type) {
    case "line": {
      const step = event.beatIndex !== null && event.beatCount !== null ? { index: event.beatIndex, count: event.beatCount } : null;
      return {
        ...state,
        line: { words: event.words, cueIndices: event.cueIndices, spoken: 0 },
        main: event.kind === "main" && step ? step : state.main,
        side: event.kind === "side" && step ? step : event.kind === "main" ? null : state.side
      };
    }
    case "word":
      return state.line ? { ...state, line: { ...state.line, spoken: event.index + 1 } } : state;
    case "lineEnd":
      return event.completed && state.line ? { ...state, line: { ...state.line, spoken: state.line.words.length } } : state;
    case "figure":
      return { ...state, figure: { seq: state.figure.seq + 1, from: event.from, to: event.to } };
    case "offer":
      return { ...state, offer: event.beat, offerConfirmed: false };
    case "mode":
      return { ...state, mode: event.mode };
    case "snapshot":
      return { ...state, snapshot: event.snapshot };
    case "script":
      return { ...state, playing: { kind: event.kind, script: event.script, source: event.source } };
    case "question":
      return { ...state, question: event.question };
    case "openPoints":
      return { ...state, points: event.points };
    case "error":
      return { ...state, error: event.message };
    default:
      return state;
  }
}

export function useAdvisor() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [backup, setBackup] = useState<boolean | null>(null);
  const [sound, setSoundState] = useState(true);
  const [voiceLine, setVoiceLine] = useState("Voice: checking…");
  const [online, setOnline] = useState(true);
  const world = useMemo(() => new GrainWorld(), []);
  const engine = useRef<Conversation | null>(null);
  const voice = useRef<Voice | null>(null);

  useEffect(() => {
    setBackup(isBackupMode());
    setOnline(navigator.onLine);
    const update = () => setOnline(navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  useEffect(() => {
    if (backup === null) return;
    const speaker = new Voice({
      backup,
      onStatus: (_status: VoiceStatus) => setVoiceLine(speaker.statusLine())
    });
    const conversation = new Conversation({ world, voice: speaker, main: MAIN, prepared: SIDE_ANSWERS, backup });
    engine.current = conversation;
    voice.current = speaker;
    world.enter("galaxy");
    setVoiceLine(speaker.statusLine());
    const off = conversation.on((event) => dispatch({ type: "engine", event }));
    void speaker.preload(MAIN.map((beat) => beat.say)).then(() => setVoiceLine(speaker.statusLine()), () => undefined);
    return () => {
      off();
      conversation.end();
      engine.current = null;
      voice.current = null;
    };
  }, [backup, world]);

  const start = useCallback(() => {
    // Synchronously inside the tap: unlock audio and speech for iOS Safari before any await.
    voice.current?.unlock();
    world.reset();
    dispatch({ type: "reset" });
    void engine.current?.start();
  }, [world]);
  /** `invite`: the Stop button (never the mic) may say a short "Yes?". */
  const interrupt = useCallback((invite?: boolean) => engine.current?.interrupt(invite === true), []);
  /** Any typed, spoken or chip text; the engine classifies it (continue / wait / end / question). */
  const say = useCallback((text: string) => void engine.current?.input(text), []);
  const resume = useCallback(() => void engine.current?.resume(), []);
  /** Without `subject`: the question being asked now. With it: any open point, recorded without touching playback. */
  const answer = useCallback((id: string, subject?: string) => void engine.current?.answer(id, subject), []);
  const confirmOffer = useCallback(() => {
    engine.current?.confirmOffer(OFFER_JAR, OFFER_FIGURE);
    dispatch({ type: "confirmed" });
  }, []);
  const closeSlip = useCallback(() => dispatch({ type: "closeSlip" }), []);
  const setSound = useCallback((on: boolean) => {
    setSoundState(on);
    voice.current?.setMuted(!on);
  }, []);

  return {
    mode: state.mode,
    line: state.line,
    figure: state.figure,
    mainStep: state.main,
    sideStep: state.side,
    snapshot: state.snapshot,
    playing: state.playing,
    offer: state.offer,
    offerConfirmed: state.offerConfirmed,
    question: state.question,
    points: state.points,
    slip: state.slip,
    error: state.error,
    world,
    sound,
    availability: { backup: backup === true, live: backup === false && online, voiceLine },
    start,
    interrupt,
    say,
    resume,
    answer,
    confirmOffer,
    closeSlip,
    setSound
  };
}

export type Advisor = ReturnType<typeof useAdvisor>;
