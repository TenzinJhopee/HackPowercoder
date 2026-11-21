"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { BeatQuestion, ConversationMode } from "@/lib/contracts";
import { AFFORD_EXAMPLE } from "@/content/scripts";
import { STARTER_QUESTIONS } from "./welcome";
import { Logo } from "./logo";

const modeText: Record<ConversationMode, string> = {
  idle: "Ready",
  presenting: "Presenting your year",
  listening: "Listening…",
  side: "Answering your question",
  waiting: "Shall we continue?",
  answering: "Waiting for your answer",
  returning: "Picking up where we left off",
  finished: "Finished"
};

const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
const buttonBase = `rounded-lg border border-line bg-white px-3 py-2 text-xs font-semibold text-ink shadow-sm transition-colors hover:border-brand/40 aria-pressed:border-brand aria-pressed:bg-sun-soft ${focusRing}`;
const primaryBase = `bg-brand text-sun shadow-sm shadow-brand/25 transition-colors hover:bg-brand-dark ${focusRing}`;

/** Luma header: logo and wordmark on the left, sound and script toggles on the right. */
export function StatusBar(props: { sound: boolean; scriptOpen: boolean; onSound: () => void; onScript: () => void }) {
  return (
    <header className="sticky top-0 z-20 border-b border-sun-deep bg-sun">
      <div className="mx-auto flex h-[68px] w-full max-w-2xl items-center justify-between gap-2 px-4 md:max-w-3xl md:px-6 lg:max-w-6xl lg:px-8">
        <Logo />
        <div className="flex shrink-0 gap-2">
          <button type="button" className={buttonBase} aria-pressed={props.sound} onClick={props.onSound}>
            {props.sound ? "Sound on" : "Sound off"}
          </button>
          <button type="button" className={buttonBase} aria-pressed={props.scriptOpen} onClick={props.onScript}>
            Script
          </button>
        </div>
      </div>
    </header>
  );
}

/** Current conversation mode (and backup flag) as a small pill above the step bar. */
export function ModeLine({ mode, backup }: { mode: ConversationMode; backup: boolean }) {
  return (
    <p className="flex min-w-0 items-center gap-2 text-sm font-medium text-ink" aria-live="polite">
      <span className="truncate">{modeText[mode]}</span>
      {backup && <span className="shrink-0 rounded-full bg-sun-soft px-2 py-0.5 text-[10px] font-semibold text-faint">backup mode</span>}
    </p>
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
          return <span key={i} className={`h-1 flex-1 rounded-full ${done ? "bg-brand/50" : current ? "bg-brand" : "bg-[#ebe5cf]"}`} />;
        })}
      </div>
      <div className="flex h-1 gap-1">
        {side &&
          Array.from({ length: side.count }, (_, i) => (
            <span key={i} className={`h-1 flex-1 rounded-full ${i < side.index ? "bg-saved/60" : i === side.index ? "bg-saved" : "bg-[#ebe5cf]"}`} />
          ))}
      </div>
    </div>
  );
}

type Chip = { label: string; run: () => void; primary?: boolean };

export function Chips({ mode, canContinue, question, onStart, onSay, onResume, onMore, onAnswer }: { mode: ConversationMode; /** A main beat is paused, so "continue" has something to resume. */ canContinue: boolean; question?: BeatQuestion | null; onStart: () => void; onSay: (text: string) => void; onResume: () => void; onMore: () => void; onAnswer?: (id: string) => void }) {
  const ask = (text: string): Chip => ({ label: text, run: () => onSay(text) });
  const cont: Chip = { label: "OK, let's continue", run: onResume, primary: true };
  // Without a paused presentation "continue" would restart it, so offer other questions instead.
  const more = STARTER_QUESTIONS.map((q) => ask(q.text));
  const walk: Chip = { label: "Walk me through my year", run: onStart, primary: true };
  const chips: Record<ConversationMode, Chip[]> = {
    idle: [{ label: "Start the presentation", run: onStart, primary: true }],
    presenting: [ask("Wait, why is September so high?"), ask("Wait, how can I save money?"), ask("Wait, what am I looking at?")],
    listening: [ask("Why is September so high?"), ask("Why was November high?"), ask("How can I save money?"), ask("What are my spending habits?"), ask(AFFORD_EXAMPLE), ...(canContinue ? [cont] : [])],
    side: canContinue ? [cont] : [],
    waiting: canContinue ? [cont, { label: "One more question", run: onMore }] : [...more, walk],
    answering: (question?.answers ?? []).map((a, i) => ({ label: a.label, run: () => onAnswer?.(a.id), primary: i === 0 })),
    returning: [],
    finished: [{ label: "Start over", run: onStart, primary: true }]
  };
  return (
    <div className="flex min-h-[4.5rem] flex-wrap content-start gap-2">
      {chips[mode].map((chip) => (
        <button
          key={chip.label}
          type="button"
          onClick={chip.run}
          className={
            chip.primary
              ? `rounded-full px-5 py-2.5 text-left text-sm font-semibold ${primaryBase}`
              : `rounded-full border border-line bg-white px-4 py-2 text-left text-sm font-medium text-ink shadow-sm transition-colors hover:border-brand/40 hover:bg-sun-soft ${focusRing}`
          }
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

/** The logo's sound wave: seven rounded bars that move while the microphone listens. */
function Waveform() {
  const bars = [6, 12, 18, 24, 18, 12, 6];
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="currentColor" aria-hidden="true">
      {bars.map((h, i) => (
        <rect key={i} className="wave-bar" x={1.5 + i * 3.4} y={13 - h / 2} width="2" height={h} rx="1" style={{ animationDelay: `${i * 110}ms` }} />
      ))}
    </svg>
  );
}

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
  const small = `h-11 shrink-0 rounded-xl border border-line bg-white px-3 text-sm font-semibold text-ink shadow-sm transition-colors hover:border-brand/40 disabled:opacity-40 ${focusRing}`;
  return (
    <div className="flex items-center gap-2">
      <input
        ref={props.inputRef}
        value={props.text}
        onChange={(event) => props.onText(event.target.value)}
        onKeyDown={onKey}
        placeholder="Ask about what is on screen"
        aria-label="Your question"
        className="h-11 min-w-0 flex-1 rounded-xl border border-line bg-white px-3 text-sm text-ink placeholder:text-muted focus:border-brand focus:outline-none"
      />
      <button
        type="button"
        disabled={!props.micSupported}
        aria-label={props.micActive ? "Listening: release or tap to finish" : "Tap or hold to talk"}
        title={props.micSupported ? "Tap or hold to talk" : "Speech input is not available in this browser"}
        onPointerDown={(event) => {
          event.preventDefault();
          props.onMicDown();
        }}
        onPointerUp={props.onMicUp}
        onPointerLeave={props.onMicUp}
        onPointerCancel={props.onMicUp}
        onContextMenu={(event) => event.preventDefault()}
        className={`flex h-11 w-12 shrink-0 select-none touch-none items-center justify-center rounded-xl shadow-sm transition-colors disabled:opacity-40 ${focusRing} ${props.micActive ? "wave-active bg-sun text-brand ring-2 ring-brand" : "bg-brand text-sun hover:bg-brand-dark"}`}
      >
        <Waveform />
      </button>
      <button type="button" disabled={!canStop} onClick={props.onStop} className={small}>
        Stop
      </button>
      <button type="button" onClick={submit} disabled={!props.text.trim()} className={`h-11 shrink-0 rounded-xl px-4 text-sm font-semibold disabled:opacity-40 ${primaryBase}`}>
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
