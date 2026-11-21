"use client";

export type CaptionLine = { words: string[]; cueIndices: number[]; spoken: number };

/** Fixed height of three lines so a growing caption never resizes the stage. */
export function Caption({ line }: { line: CaptionLine | null }) {
  const cues = new Set(line?.cueIndices ?? []);
  return (
    <p
      className="h-[4.5rem] overflow-hidden text-base leading-6 sm:h-[5.25rem] sm:text-lg sm:leading-7"
      aria-live="polite"
    >
      {line?.words.map((word, index) => {
        const spoken = index < line.spoken;
        const color = !spoken ? "text-faint" : cues.has(index) ? "text-spend" : "text-paper";
        return (
          <span key={index} className={`transition-colors duration-150 ${color}`}>
            {word}
            {" "}
          </span>
        );
      })}
    </p>
  );
}
