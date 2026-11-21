"use client";

import type { LineKind } from "@/client/events";
import type { ConversationMode } from "@/lib/contracts";
import { keyPhrase, splitFigures } from "@/lib/takeaway";
import type { CaptionLine } from "./caption";

const kicker: Partial<Record<ConversationMode, string>> = {
  presenting: "Your year",
  returning: "Your year",
  side: "Your answer",
  waiting: "Your answer",
  answering: "A question for you"
};

/** Only real content gets a banner: not "Let me check.", the bridge back, or the failure line. */
const SHOWN_KINDS: readonly LineKind[] = ["main", "side"];

/**
 * The gist of the sentence being spoken, on a yellow plaque under the big number. It appears whole as the sentence
 * starts (the caption reveals the sentence word by word) and is replaced by the next one. The space is always
 * reserved, so nothing jumps when it appears.
 */
export function Takeaway({ line, kind, mode }: { line: CaptionLine | null; kind: LineKind | null; mode: ConversationMode }) {
  const visible = line !== null && kind !== null && SHOWN_KINDS.includes(kind);
  const phrase = visible ? keyPhrase(line.words.join(" ")) : "";
  return (
    <div className="mt-3 min-h-[2.5rem]" aria-live="polite">
      {phrase && (
        // Re-keyed on the sentence so the plaque slides in again for every step.
        <p key={phrase} className="takeaway-in inline-flex max-w-full items-center gap-2.5 rounded-full border border-sun-deep/50 bg-sun-soft py-1.5 pl-1.5 pr-4">
          <span className="shrink-0 rounded-full bg-sun px-2.5 py-1 text-[10px] font-bold uppercase leading-none tracking-[0.14em] text-brand">{kicker[mode] ?? "Now"}</span>
          <span className="min-w-0 truncate text-sm font-semibold text-ink">
            {splitFigures(phrase).map((part, index) =>
              part.figure ? (
                <span key={index} className="rounded bg-sun/60 px-1 tabular-nums text-brand">
                  {part.text}
                </span>
              ) : (
                <span key={index}>{part.text}</span>
              )
            )}
          </span>
        </p>
      )}
    </div>
  );
}
