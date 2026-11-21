"use client";

import { useState } from "react";
import type { OpenPoint } from "@/client";

const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

function Check() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0">
      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** One open point. Collapsed: its name and the assumption on one line. Open: the full assumption and the answers. */
function Row({ point, open, onToggle, onAnswer }: { point: OpenPoint; open: boolean; onToggle: () => void; onAnswer: (id: string, subject: string) => void }) {
  const chosen = point.answer !== null ? point.answers.find((a) => a.id === point.answer) : undefined;
  if (chosen) {
    return (
      <li className="flex flex-wrap items-baseline justify-between gap-x-3 py-2 first:pt-0 last:pb-0">
        <p className="text-sm font-medium text-ink">{point.label}</p>
        <p className="flex items-center gap-1.5 text-xs font-medium text-saved-ink">
          <Check />
          {chosen.label}
        </p>
      </li>
    );
  }
  return (
    <li className="py-2 first:pt-0 last:pb-0">
      <button type="button" aria-expanded={open} onClick={onToggle} className={`block w-full rounded-md text-left ${focusRing}`}>
        <span className="flex items-center gap-2 text-sm font-medium text-ink">
          <span aria-hidden className="h-2 w-2 shrink-0 rounded-full border border-faint" />
          {point.label}
        </span>
        <span className={`mt-0.5 block text-xs leading-4 text-soft ${open ? "" : "truncate"}`}>{point.assume}</span>
      </button>
      {open && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {point.answers.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => onAnswer(a.id, point.subject)}
              className={`min-h-8 rounded-full border border-line bg-white px-2.5 py-1 text-left text-xs font-medium text-ink shadow-sm transition-colors hover:border-slate-300 ${focusRing}`}
            >
              {a.label}
            </button>
          ))}
        </div>
      )}
    </li>
  );
}

/**
 * The questions the presentation asked, each with how the advisor works until it is answered. Answering never stops playback.
 * Kept short: only one unanswered point is open at a time, by default the one asked last.
 * Answers are remembered across runs; "Forget my answers" deletes them and turns the points back into open ones.
 */
export function OpenPoints({ points, onAnswer, onForget }: { points: OpenPoint[]; onAnswer: (id: string, subject: string) => void; onForget?: () => void }) {
  // A manual choice holds until the next question is asked (the list grows) or the chosen point is answered.
  const [picked, setPicked] = useState<{ subject: string | null; count: number } | null>(null);
  const unanswered = points.filter((p) => p.answer === null);
  const pickHolds = picked !== null && picked.count === points.length && (picked.subject === null || unanswered.some((p) => p.subject === picked.subject));
  const openSubject = pickHolds ? picked.subject : (unanswered.at(-1)?.subject ?? null);

  return (
    <section aria-label="Open points" className="rounded-2xl border border-line bg-white px-5 py-4 shadow-card">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-faint">What I can&apos;t see in these accounts</p>
        {unanswered.length > 0 && <p className="shrink-0 text-[11px] font-medium text-faint">{unanswered.length} open</p>}
      </div>
      <ul className="mt-2.5 divide-y divide-line">
        {points.map((point) => (
          <Row
            key={point.subject}
            point={point}
            open={point.subject === openSubject}
            onToggle={() => setPicked({ subject: point.subject === openSubject ? null : point.subject, count: points.length })}
            onAnswer={onAnswer}
          />
        ))}
      </ul>
      {onForget && unanswered.length < points.length && (
        <button
          type="button"
          onClick={onForget}
          className={`mt-2.5 rounded-md text-[11px] font-medium text-faint underline-offset-2 transition-colors hover:text-soft hover:underline ${focusRing}`}
        >
          Forget my answers
        </button>
      )}
    </section>
  );
}
