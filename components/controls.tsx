"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { ConversationMode } from "@/lib/contracts";

const modeText: Record<ConversationMode, string> = {
  idle: "Ready",
  presenting: "Presenting your year",
  listening: "Listening…",
  side: "Answering your question",
  waiting: "Shall we continue?",
  returning: "Picking up where we left off",
  finished: "Finished"
};

const buttonBase = "rounded-full border border-edge px-3 py-1.5 text-xs text-paper transition-colors hover:border-faint focus-visible:outline focus-visible:outline-1 focus-visible:outline-paper";

export function StatusBar(props: { mode: ConversationMode; backup: boolean; sound: boolean; scriptOpen: boolean; onSound: () => void; onScript: () => void }) {
  return (
    <header className="flex items-center justify-between gap-2">
      <p className="min-w-0 truncate text-sm text-paper" aria-live="polite">
        {modeText[props.mode]}
        {props.backup && <span className="ml-2 text-xs text-faint">backup mode</span>}
      </p>
      <div className="flex shrink-0 gap-2">
        <button type="button" className={buttonBase} aria-pressed={props.sound} onClick={props.onSound}>
          {props.sound ? "Sound on" : "Sound off"}
        </button>
        <button type="button" className={buttonBase} aria-pressed={props.scriptOpen} onClick={props.onScript}>
          Script
        </button>
      </div>
    </header>
  );
}

type Step = { index: number; count: number } | null;

/** Amber segments for main beats, green for side answers. */
export function StepBar({ main, side, mode }: { main: Step; side: Step; mode: ConversationMode }) {
  const mainCount = main?.count ?? 8;
  const finished = mode === "finished";
  return (
    <div className="space-y-1.5" aria-hidden="true">
      <div className="flex gap-1">
        {Array.from({ length: mainCount }, (_, i) => {
          const done = finished || (main !== null && i < main.index);
          const current = !finished && main !== null && i === main.index;
          return <span key={i} className={`h-1 flex-1 rounded-full ${done ? "bg-spend/60" : current ? "bg-spend" : "bg-edge"}`} />;
        })}
      </div>
      <div className="flex h-1 gap-1">
        {side &&
          Array.from({ length: side.count }, (_, i) => (
            <span key={i} className={`h-1 flex-1 rounded-full ${i < side.index ? "bg-saved/60" : i === side.index ? "bg-saved" : "bg-edge"}`} />
          ))}
      </div>
    </div>
  );
}

type Chip = { label: string; run: () => void };

export function Chips({ mode, onStart, onSay, onResume, onMore }: { mode: ConversationMode; onStart: () => void; onSay: (text: string) => void; onResume: () => void; onMore: () => void }) {
  const ask = (text: string): Chip => ({ label: text, run: () => onSay(text) });
  const cont: Chip = { label: "OK, let's continue", run: onResume };
  const chips: Record<ConversationMode, Chip[]> = {
    idle: [{ label: "Start the presentation", run: onStart }],
    presenting: [ask("Wait, why is September so high?"), ask("Wait, what am I looking at?")],
    listening: [ask("Why is September so high?"), ask("Why was November high?"), cont],
    side: [cont],
    waiting: [cont, { label: "One more question", run: onMore }],
    returning: [],
    finished: [{ label: "Start over", run: onStart }]
  };
  return (
    <div className="flex min-h-[4.5rem] flex-wrap content-start gap-2">
      {chips[mode].map((chip) => (
        <button
          key={chip.label}
          type="button"
          onClick={chip.run}
          className="rounded-full border border-edge bg-panel px-4 py-2 text-left text-sm text-paper transition-colors hover:border-faint focus-visible:outline focus-visible:outline-1 focus-visible:outline-paper"
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}

type InputProps = {
  mode: ConversationMode;
  micSupported: boolean;
  micActive: boolean;
  text: string;
  onText: (text: string) => void;
  onSubmit: (text: string) => void;
  onStop: () => void;
  onMicDown: () => void;
  onMicUp: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

export function InputRow(props: InputProps) {
  const canStop = props.mode === "presenting" || props.mode === "returning" || props.mode === "side";
  const submit = () => {
    const value = props.text.trim();
    if (!value) return;
    props.onSubmit(value);
    props.onText("");
  };
  const onKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") submit();
  };
  const small = "h-11 shrink-0 rounded-xl border border-edge px-3 text-sm text-paper transition-colors hover:border-faint disabled:opacity-40 focus-visible:outline focus-visible:outline-1 focus-visible:outline-paper";
  return (
    <div className="flex items-center gap-2">
      <input
        ref={props.inputRef}
        value={props.text}
        onChange={(event) => props.onText(event.target.value)}
        onKeyDown={onKey}
        placeholder="Ask about what is on screen"
        aria-label="Your question"
        className="h-11 min-w-0 flex-1 rounded-xl border border-edge bg-panel px-3 text-sm text-paper placeholder:text-faint focus:border-faint focus:outline-none"
      />
      <button
        type="button"
        disabled={!props.micSupported}
        aria-label="Hold to talk"
        title={props.micSupported ? "Hold to talk" : "Speech input is not available in this browser"}
        onPointerDown={(event) => {
          event.preventDefault();
          props.onMicDown();
        }}
        onPointerUp={props.onMicUp}
        onPointerLeave={props.onMicUp}
        onPointerCancel={props.onMicUp}
        onContextMenu={(event) => event.preventDefault()}
        className={`${small} select-none touch-none ${props.micActive ? "border-spend text-spend" : ""}`}
      >
        {props.micActive ? "● Mic" : "Mic"}
      </button>
      <button type="button" disabled={!canStop} onClick={props.onStop} className={small}>
        Stop
      </button>
      <button type="button" onClick={submit} disabled={!props.text.trim()} className={`${small} bg-paper text-night hover:bg-paper/90`}>
        Ask
      </button>
    </div>
  );
}

export function useInputFocus() {
  const ref = useRef<HTMLInputElement>(null);
  const [text, setText] = useState("");
  return { ref, text, setText, focus: () => ref.current?.focus() };
}
