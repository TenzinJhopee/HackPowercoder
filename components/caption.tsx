"use client";

export type CaptionLine = { words: string[]; cueIndices: number[]; spoken: number };

/**
 * Fixed height of three lines so a growing caption never resizes the stage.
 * Before the first line the card chrome is hidden (no empty card) but the space stays reserved.
 */
export function Caption({ line }: { line: CaptionLine | null }) {
  const cues = new Set(line?.cueIndices ?? []);
  const chrome = line ? "border-line bg-white shadow-card" : "border-transparent bg-transparent";
  return (
    <section aria-label="Caption" className={`rounded-2xl border px-5 py-4 transition-colors duration-200 ${chrome}`}>
      <p
        className="h-[4.5rem] overflow-hidden text-base leading-6 sm:h-[5.25rem] sm:text-lg sm:leading-7"
        aria-live="polite"
      >
        {line?.words.map((word, index) => {
          const spoken = index < line.spoken;
          const color = !spoken ? "text-[#a9bcc0]" : cues.has(index) ? "text-spend-ink" : "text-ink";
          return (
            <span key={index} className={`transition-colors duration-150 ${color}`}>
              {word}
              {" "}
            </span>
          );
        })}
      </p>
    </section>
  );
}
