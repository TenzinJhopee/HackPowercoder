"use client";

/**
 * The brand moment as a small animation: an arrow flies in and pierces an apple, which wobbles (William Tell).
 * `loop` repeats it, for waiting; otherwise it plays once and the arrow stays. Colours follow the current look.
 * Reduced motion shows the finished picture without movement (see globals.css).
 */
export function AppleHit({ size = 56, loop = false, className = "" }: { size?: number; loop?: boolean; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="" aria-hidden="true" className={`${loop ? "ah-loop" : "ah-once"} text-ink ${className}`}>
      {/* the apple: two lobes and a leaf */}
      <g className="ah-apple">
        <path
          d="M30 20 C33 12 50 14 47 33 C45 46 38 52 30 49 C22 52 15 46 13 33 C10 14 27 12 30 20 Z"
          className="fill-current"
        />
        <ellipse cx="35" cy="13.5" rx="6.5" ry="3.2" transform="rotate(-28 35 13.5)" className="fill-saved" />
      </g>
      {/* the arrow, drawn with a gap around it so it reads across the apple */}
      <g className="ah-arrow">
        <line x1="60" y1="8" x2="26" y2="42" strokeWidth="8" strokeLinecap="round" className="stroke-surface" />
        <line x1="60" y1="8" x2="26" y2="42" strokeWidth="3.4" strokeLinecap="round" className="stroke-current" />
        <path d="M16 52 L31 41 L27 37 Z" strokeWidth="2.6" strokeLinejoin="round" className="fill-current stroke-surface" />
        <path d="M45 23 L58 12 L60 17 Z M50 28 L63 17 L58 12 Z" className="fill-sun stroke-current" strokeWidth="1.2" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
