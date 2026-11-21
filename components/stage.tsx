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

  const tone = change && change.to.value < 0 ? "text-coral" : "text-paper";
  return (
    <div className="min-h-[5.25rem]">
      <p className="min-h-[1.25rem] text-xs uppercase tracking-wide text-faint">{change?.to.label ?? " "}</p>
      <p className={`text-5xl font-semibold tabular-nums leading-tight sm:text-6xl ${tone}`} aria-live="off">
        {shown === null ? "–" : swiss(shown)}
      </p>
    </div>
  );
}

export function Stage({ world, figure, pausedAt }: { world: GrainWorld; figure: FigureChange | null; pausedAt: string | null }) {
  return (
    <section aria-label="Stage" className="rounded-2xl border border-edge bg-panel p-4">
      <FigureCounter change={figure} />
      <div className="mt-2 h-60 w-full overflow-hidden rounded-xl bg-night sm:h-80">
        <StageCanvas world={world} />
      </div>
      <div className="mt-3 flex min-h-[1.75rem] items-center justify-between gap-3">
        <p className="text-xs text-faint">1 grain = CHF 100</p>
        {pausedAt && <span className="rounded-full bg-saved/15 px-3 py-1 text-xs font-medium text-saved">{`↩ Paused at ${pausedAt}`}</span>}
      </div>
    </section>
  );
}
