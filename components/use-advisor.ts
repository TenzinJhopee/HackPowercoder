"use client";

/**
 * ALL engine wiring lives in this file. The UI shell only reads what this hook returns.
 * The world is the grain world (client/world); <StageCanvas> in stage.tsx hosts its canvas.
 */

import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Conversation, Voice, isBackupMode, type EngineEvent, type VoiceStatus } from "@/client";
import type { Beat, BeatQuestion, ConversationMode, Figure, Snapshot } from "@/lib/contracts";
import type { LineKind } from "@/client/events";
import { MAIN, SIDE_ANSWERS } from "@/content/scripts";
import { GrainWorld } from "@/client/world/grain-world";
import { applySkin } from "@/client/world/skin";
import { THEME_EVENT, currentTheme, type ThemeName } from "./theme";
import type { CaptionLine } from "./caption";
import type { PlayingScript } from "./script-panel";
import type { FigureChange } from "./stage";

export const OFFER_JAR = "3a";
export const OFFER_FIGURE: Figure = { label: "In pillar 3a after one year", value: 2400 };
const OPENING_FIGURE: Figure = { label: "Income in 2025", value: 97032 };

type Step = { index: number; count: number };

type State = {
  mode: ConversationMode;
  line: CaptionLine | null;
  lineKind: LineKind | null;
  main: Step | null;
  side: Step | null;
  figure: FigureChange;
  snapshot: Snapshot | null;
  playing: PlayingScript | null;
  offer: Beat | null;
  offerConfirmed: boolean;
  question: BeatQuestion | null;
  error: string | null;
};

const initialState: State = {
  mode: "idle",
  line: null,
  lineKind: null,
  main: null,
  side: null,
  figure: { seq: 0, from: null, to: OPENING_FIGURE },
  snapshot: null,
  playing: null,
  offer: null,
  offerConfirmed: false,
  question: null,
  error: null
};

type Action = { type: "engine"; event: EngineEvent } | { type: "confirmed" } | { type: "reset" };

function reducer(state: State, action: Action): State {
  if (action.type === "reset") return { ...initialState, figure: { seq: state.figure.seq + 1, from: null, to: OPENING_FIGURE } };
  if (action.type === "confirmed") return { ...state, offerConfirmed: true };
  const event = action.event;
  switch (event.type) {
    case "line": {
      const step = event.beatIndex !== null && event.beatCount !== null ? { index: event.beatIndex, count: event.beatCount } : null;
      return {
        ...state,
        line: { words: event.words, cueIndices: event.cueIndices, spoken: 0 },
        lineKind: event.kind,
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

  // The canvas keeps its own colours: apply the saved look once, then follow the toggle (no reload, grains recolour in place).
  useEffect(() => {
    world.recolor(applySkin(currentTheme()));
    const onTheme = (event: Event) => world.recolor(applySkin((event as CustomEvent<ThemeName>).detail));
    window.addEventListener(THEME_EVENT, onTheme);
    return () => window.removeEventListener(THEME_EVENT, onTheme);
  }, [world]);

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
  const interrupt = useCallback(() => engine.current?.interrupt(), []);
  /** Any typed, spoken or chip text; the engine classifies it (continue / wait / end / question). */
  const say = useCallback((text: string) => void engine.current?.input(text), []);
  const resume = useCallback(() => void engine.current?.resume(), []);
  const answer = useCallback((id: string) => void engine.current?.answer(id), []);
  const confirmOffer = useCallback(() => {
    engine.current?.confirmOffer(OFFER_JAR, OFFER_FIGURE);
    dispatch({ type: "confirmed" });
  }, []);
  const setSound = useCallback((on: boolean) => {
    setSoundState(on);
    voice.current?.setMuted(!on);
  }, []);

  return {
    mode: state.mode,
    line: state.line,
    lineKind: state.lineKind,
    figure: state.figure,
    mainStep: state.main,
    sideStep: state.side,
    snapshot: state.snapshot,
    playing: state.playing,
    offer: state.offer,
    offerConfirmed: state.offerConfirmed,
    question: state.question,
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
    setSound
  };
}

export type Advisor = ReturnType<typeof useAdvisor>;
