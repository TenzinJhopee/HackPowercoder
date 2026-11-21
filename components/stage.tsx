"use client";

import { useEffect, useRef, useState } from "react";
import type { Figure } from "@/lib/contracts";
import { swiss } from "./format";
import type { GrainWorld } from "@/client/world/grain-world";
import { StageCanvas } from "./stage-canvas";

export type FigureChange = { seq: number; from: Figure | null; to: Figure };

const DURATION_MS = 1100;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/** Big number: animates old -> new in ~1.1 s, ease-out cubic. */
function FigureCounter({ change }: { change: FigureChange | null }) {
  const [shown, setShown] = useState<number | null>(change ? change.to.value : null);
  const current = useRef<number | null>(shown);

  useEffect(() => {
    if (!change) {
      current.current = null;
      setShown(null);
      return;
    }
    const from = change.from?.value ?? current.current ?? change.to.value;
    const to = change.to.value;
    const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced || from === to) {
      current.current = to;
      setShown(to);
      return;
    }
    const startedAt = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startedAt) / DURATION_MS);
      const value = from + (to - from) * easeOutCubic(t);
      current.current = value;
      setShown(value);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [change]);

  const negative = change !== null && change.to.value < 0;
  const tone = negative ? "text-coral-ink" : "text-ink";
  // Re-keyed on every change so the marker sweep, the label and the landing thump play again.
  const seq = change?.seq ?? 0;
  return (
    <div className="min-h-[5.25rem] lg:min-h-[7.25rem]">
      <p key={`label-${seq}`} className="fig-label min-h-[1.25rem] text-[11px] font-bold uppercase tracking-[0.15em] text-faint">
        {change?.to.label ?? " "}
      </p>
      <p key={`number-${seq}`} className={`fig-pop text-5xl font-semibold tabular-nums leading-tight sm:text-6xl lg:text-7xl ${tone}`} aria-live="off">
        <span className="relative inline-block">
          {shown !== null && <span aria-hidden="true" className={`fig-marker absolute inset-x-0 -bottom-[0.05em] h-[0.12em] rounded-full ${negative ? "bg-coral/45" : "bg-sun"}`} />}
          <span className="relative">{shown === null ? "\u2013" : swiss(shown)}</span>
        </span>
      </p>
    </div>
  );
}

export function Stage({ world, figure, pausedAt }: { world: GrainWorld; figure: FigureChange | null; pausedAt: string | null }) {
  return (
    <section aria-label="Stage" className="rounded-2xl border border-line bg-surface p-5 shadow-card md:flex md:h-full md:min-h-0 md:flex-col md:p-5">
      <FigureCounter change={figure} />
      <div className="mt-2 h-60 w-full overflow-hidden sm:h-80 md:h-auto md:min-h-0 md:flex-1">
        <StageCanvas world={world} />
      </div>
      <div className="mt-3 flex min-h-[1.75rem] shrink-0 items-center justify-between gap-3">
        <p className="text-xs text-faint">1 grain = CHF 100</p>
        {pausedAt && <span className="rounded-full bg-saved/10 px-3 py-1 text-xs font-medium text-saved-ink">{`↩ Paused at ${pausedAt}`}</span>}
      </div>
    </section>
  );
}
