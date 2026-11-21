"use client";

import type { Script, Snapshot } from "@/lib/contracts";

export type PlayingScript = { kind: "main" | "side"; script: Script; source?: string };

export function ScriptPanel({ snapshot, playing }: { snapshot: Snapshot | null; playing: PlayingScript | null }) {
  const block = "max-h-56 overflow-auto whitespace-pre-wrap break-words rounded-lg border border-line bg-canvas p-3 text-xs text-ink";
  return (
    <section aria-label="Script" className="rounded-2xl border border-line bg-surface p-5 shadow-card">
      <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand">Saved snapshot</h2>
      <pre className={`mt-2 ${block}`}>{snapshot ? JSON.stringify(snapshot, null, 2) : "null"}</pre>
      <h2 className="mt-4 text-[11px] font-bold uppercase tracking-[0.15em] text-brand">
        {playing ? `Playing script (${playing.kind}${playing.source ? `, ${playing.source}` : ""})` : "Playing script"}
      </h2>
      <pre className={`mt-2 ${block}`}>{playing ? JSON.stringify(playing.script, null, 2) : "null"}</pre>
    </section>
  );
}
