"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { BeatQuestion, ConversationMode } from "@/lib/contracts";
import { AFFORD_EXAMPLE, SAVE_EXAMPLE } from "@/content/scripts";
import { STARTER_QUESTIONS } from "./welcome";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

const modeText: Record<ConversationMode, string> = {
  idle: "Ready",
  presenting: "Presenting your year",
  listening: "Listening…",
  side: "Answering your question",
  waiting: "Shall we continue?",
  answering: "Answer if you like",
  returning: "Picking up where we left off",
  finished: "Finished"
};

const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
const buttonBase = `rounded-lg border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink shadow-sm transition-colors hover:border-brand/40 aria-pressed:border-brand aria-pressed:bg-sun-soft ${focusRing}`;
const primaryBase = `bg-brand text-on-brand shadow-sm shadow-brand/25 transition-colors hover:bg-brand-dark ${focusRing}`;

/** Header: logo and wordmark on the left, the light/dark switch on the right. */
export function StatusBar() {
  return (
    <header className="sticky top-0 z-20 border-b border-sun-deep bg-sun">
      <div className="mx-auto flex h-[68px] w-full max-w-2xl items-center justify-between gap-2 px-4 md:max-w-3xl md:px-6 lg:max-w-6xl lg:px-8">
        <Logo />
        <div className="flex shrink-0 gap-2">
          <ThemeToggle className={`${buttonBase} flex items-center justify-center px-2.5`} />
        </div>
      </div>
    </header>
  );
}

type Step = { index: number; count: number } | null;

/** The dot in front of the status: what kind of moment this is. */
const modeDot: Partial<Record<ConversationMode, string>> = {
  presenting: "bg-brand",
  returning: "bg-brand",
  side: "bg-saved",
  listening: "bg-coral",
  answering: "bg-sun-deep"
};

/**
 * Where we are, in one small pill: what is happening and, while a script is playing, the step as a fraction
 * ("Presenting your year 2/10", "Answering your question 1/3"). Lives in the stage footer, so it takes no room above.
 */
export function ProgressPill({ mode, backup, main, side }: { mode: ConversationMode; backup: boolean; main: Step; side: Step }) {
  const step = mode === "side" ? side : mode === "presenting" || mode === "returning" || mode === "answering" ? main : null;
  return (
    <p className="inline-flex min-w-0 max-w-full items-center gap-2 rounded-full bg-sun-soft px-3 py-1 text-xs font-medium text-ink" aria-live="polite">
      <span aria-hidden="true" className={`h-1.5 w-1.5 shrink-0 rounded-full ${modeDot[mode] ?? "bg-faint"}`} />
      <span className="truncate">{modeText[mode]}</span>
      {step && <span className="shrink-0 font-semibold tabular-nums text-brand">{`${step.index + 1}/${step.count}`}</span>}
      {backup && <span className="shrink-0 text-faint">{"\u00b7 backup"}</span>}
    </p>
  );
}

/** An action is something to press now (continue, answer, start); a question is a suggestion for the menu. */
type Chip = { label: string; run: () => void; kind: "action" | "question"; primary?: boolean };

/**
 * Suggested questions in one drop-down instead of a column of buttons: a single small button, the list opens
 * upwards over the conversation, closes on a choice, a click outside or Escape.
 */
function QuestionMenu({ questions }: { questions: Chip[] }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={`flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink shadow-sm transition-colors hover:border-brand/40 hover:bg-sun-soft ${focusRing}`}
      >
        <span>Suggested questions</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="m6 15 6-6 6 6" />
        </svg>
      </button>
      {open && (
        <ul role="menu" className="absolute bottom-full left-0 z-30 mb-2 max-h-72 w-[min(24rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-line bg-surface p-1.5 shadow-xl shadow-ink/10">
          {questions.map((question) => (
            <li key={question.label} role="none">
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  question.run();
                }}
                className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-ink transition-colors hover:bg-sun-soft focus-visible:bg-sun-soft focus-visible:outline-none"
              >
                {question.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Chips({ mode, canContinue, question, onStart, onSay, onResume, onMore, onAnswer }: { mode: ConversationMode; /** A main beat is paused, so "continue" has something to resume. */ canContinue: boolean; question?: BeatQuestion | null; onStart: () => void; onSay: (text: string) => void; onResume: () => void; onMore: () => void; onAnswer?: (id: string) => void }) {
  const ask = (text: string): Chip => ({ label: text, run: () => onSay(text), kind: "question" });
  const action = (label: string, run: () => void, primary = false): Chip => ({ label, run, kind: "action", primary });
  const cont = action("OK, let's continue", onResume, true);
  // Without a paused presentation "continue" would restart it, so offer other questions instead.
  const more = STARTER_QUESTIONS.map((q) => ask(q.text));
  const walk = action("Walk me through my year", onStart, true);
  const chips: Record<ConversationMode, Chip[]> = {
    idle: [action("Start the presentation", onStart, true)],
    presenting: [ask("Wait, why is September so high?"), ask("Wait, how can I save money?"), ask("Wait, what am I looking at?")],
    listening: [ask("Why is September so high?"), ask("Why was November high?"), ask(SAVE_EXAMPLE), ask("What are my spending habits?"), ask(AFFORD_EXAMPLE), ...(canContinue ? [cont] : [])],
    side: canContinue ? [cont] : [],
    waiting: canContinue ? [cont, action("One more question", onMore)] : [...more, walk],
    answering: (question?.answers ?? []).map((a, i) => action(a.label, () => onAnswer?.(a.id), i === 0)),
    returning: [],
    finished: [action("Start over", onStart, true)]
  };
  const list = chips[mode];
  const questions = list.filter((chip) => chip.kind === "question");
  const actions = list.filter((chip) => chip.kind === "action");
  if (!list.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-2 md:shrink-0">
      {questions.length > 0 && <QuestionMenu key={mode} questions={questions} />}
      {actions.map((chip) => (
        <button
          key={chip.label}
          type="button"
          onClick={chip.run}
          className={
            chip.primary
              ? `rounded-full px-5 py-2.5 text-left text-sm font-semibold ${primaryBase}`
              : `rounded-full border border-line bg-surface px-4 py-2 text-left text-sm font-medium text-ink shadow-sm transition-colors hover:border-brand/40 hover:bg-sun-soft ${focusRing}`
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
  const small = `h-11 shrink-0 rounded-xl border border-line bg-surface px-3 text-sm font-semibold text-ink shadow-sm transition-colors hover:border-brand/40 disabled:opacity-40 ${focusRing}`;
  return (
    <div className="flex items-center gap-2">
      <input
        ref={props.inputRef}
        value={props.text}
        onChange={(event) => props.onText(event.target.value)}
        onKeyDown={onKey}
        placeholder="Ask about what is on screen"
        aria-label="Your question"
        className="h-11 min-w-0 flex-1 rounded-xl border border-line bg-surface px-3 text-sm text-ink placeholder:text-muted focus:border-brand focus:outline-none"
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
        className={`flex h-11 w-12 shrink-0 select-none touch-none items-center justify-center rounded-xl shadow-sm transition-colors disabled:opacity-40 ${focusRing} ${props.micActive ? "wave-active bg-sun text-on-sun ring-2 ring-brand" : "bg-brand text-on-brand hover:bg-brand-dark"}`}
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
