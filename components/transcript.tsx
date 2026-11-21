"use client";

import { useEffect, useRef } from "react";
import type { LineKind } from "@/client/events";

/** The line being spoken right now: how many of its words have been reached, and which are cue words. */
export type CaptionLine = { words: string[]; cueIndices: number[]; spoken: number };

/** One finished item of the conversation. `spoken` < words.length means the advisor was interrupted. */
export type LogEntry =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "advisor"; kind: LineKind; words: string[]; cueIndices: number[]; spoken: number };

/** Short connecting lines ("Let me check.", "Back to the start") read quieter than real answers. */
const QUIET: readonly LineKind[] = ["filler", "bridge", "failure"];

function AdvisorLine({ kind, words, cueIndices, spoken, live }: { kind: LineKind; words: string[]; cueIndices: number[]; spoken: number; live: boolean }) {
  const cues = new Set(cueIndices);
  const quiet = QUIET.includes(kind);
  // A finished line shows only what was actually said, and a dots mark when it was cut short.
  const interrupted = !live && spoken < words.length;
  const shown = live ? words : words.slice(0, Math.max(spoken, 1));
  return (
    <p className={quiet ? "pl-3 text-sm italic leading-6 text-faint" : "border-l-2 border-sun-deep pl-3 text-[15px] leading-6 text-ink sm:text-base sm:leading-7"}>
      {shown.map((word, index) => {
        const reached = !live || index < spoken;
        const color = !reached ? "text-faint/55" : cues.has(index) && !quiet ? "text-spend-ink" : "";
        return (
          <span key={index} className={`transition-colors duration-150 ${color}`}>
            {word}{" "}
          </span>
        );
      })}
      {interrupted && <span className="text-faint">…</span>}
    </p>
  );
}

/**
 * The whole conversation, newest at the bottom, so anything said can be read again. The line being spoken fills in
 * word by word; the view follows it unless she has scrolled up to read earlier.
 */
export function Transcript({ log, line, lineKind }: { log: LogEntry[]; line: CaptionLine | null; lineKind: LineKind | null }) {
  const box = useRef<HTMLDivElement>(null);
  const follow = useRef(true);

  useEffect(() => {
    const el = box.current;
    if (el && follow.current) el.scrollTo({ top: el.scrollHeight });
  }, [log.length, line?.spoken, line?.words]);

  return (
    <section aria-label="Conversation" className="rounded-2xl border border-line bg-surface shadow-card">
      <div
        ref={box}
        role="log"
        aria-live="polite"
        onScroll={(event) => {
          const el = event.currentTarget;
          follow.current = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
        }}
        className="max-h-[17rem] min-h-[7rem] space-y-3 overflow-y-auto px-4 py-4 md:max-h-[22rem] lg:max-h-[min(25rem,44vh)]"
      >
        {log.map((entry) =>
          entry.role === "user" ? (
            <div key={entry.id} className="flex justify-end">
              <p className="max-w-[85%] rounded-2xl rounded-br-md bg-sun px-3.5 py-2 text-sm font-medium leading-5 text-on-sun">{entry.text}</p>
            </div>
          ) : (
            <AdvisorLine key={entry.id} kind={entry.kind} words={entry.words} cueIndices={entry.cueIndices} spoken={entry.spoken} live={false} />
          )
        )}
        {line && lineKind && <AdvisorLine kind={lineKind} words={line.words} cueIndices={line.cueIndices} spoken={line.spoken} live />}
      </div>
    </section>
  );
}
