"use client";

import type { ReactNode } from "react";
import { AFFORD_EXAMPLE } from "@/content/scripts";

/** What she can ask the advisor; each is answered from her own bookings. Shared with the follow-up chips. */
export const STARTER_QUESTIONS = [
  { text: "How can I save money?", hint: "Where to cut, honestly", icon: "save" },
  { text: "What are my spending habits?", hint: "The patterns in your year", icon: "habits" },
  { text: "Why is September so high?", hint: "The tallest month, opened up", icon: "month" },
  { text: AFFORD_EXAMPLE, hint: "Replays last year with it", icon: "buy" }
] as const;

type IconName = (typeof STARTER_QUESTIONS)[number]["icon"];

const icons: Record<IconName, ReactNode> = {
  save: (
    <>
      <path d="M12 3v18" />
      <path d="M17 7.5c0-1.9-2.2-3-5-3s-5 1.1-5 3 2 2.6 5 3.2 5 1.3 5 3.3-2.2 3-5 3-5-1.1-5-3" />
    </>
  ),
  habits: (
    <>
      <path d="M4 20V10" />
      <path d="M10 20V4" />
      <path d="M16 20v-7" />
      <path d="M22 20H2" />
    </>
  ),
  month: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17" />
      <path d="M8 3v4M16 3v4" />
    </>
  ),
  buy: (
    <>
      <path d="M6 7h14l-1.6 8.2a2 2 0 0 1-2 1.6H9.4a2 2 0 0 1-2-1.6L5.5 4H3" />
      <circle cx="10" cy="20" r="1.2" />
      <circle cx="17" cy="20" r="1.2" />
    </>
  )
};

function Icon({ name }: { name: IconName }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

/**
 * First screen: the conversation comes first. Pick a question, ask by voice or text, or let the advisor walk
 * through the year. Replaces the empty caption and the single start button while nothing has been said.
 */
export function Welcome({ onSay, onStart }: { onSay: (text: string) => void; onStart: () => void }) {
  return (
    <section aria-label="Welcome" className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-ink md:text-[1.7rem]">What would you like to know?</h1>
        <p className="mt-1.5 text-sm leading-6 text-soft">Ask by voice or text. I answer from your own bookings, and every number comes from your data.</p>
      </div>

      <ul className="grid gap-2.5 sm:grid-cols-2">
        {STARTER_QUESTIONS.map((question) => (
          <li key={question.text}>
            <button
              type="button"
              onClick={() => onSay(question.text)}
              className={`group flex h-full w-full items-start gap-3 rounded-2xl border border-line bg-surface p-3.5 text-left shadow-card transition-colors hover:border-brand/40 hover:bg-sun-soft ${focusRing}`}
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sun text-on-sun transition-transform group-hover:scale-105">
                <Icon name={question.icon} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold leading-5 text-ink">{question.text}</span>
                <span className="mt-0.5 block text-xs leading-4 text-faint">{question.hint}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <button
          type="button"
          onClick={onStart}
          className={`rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-on-brand shadow-sm shadow-brand/25 transition-colors hover:bg-brand-dark ${focusRing}`}
        >
          Walk me through my year
        </button>
        <p className="text-xs text-faint">or tap the microphone and just ask</p>
      </div>
    </section>
  );
}
