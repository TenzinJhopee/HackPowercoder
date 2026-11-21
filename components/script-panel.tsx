"use client";

import type { Script, Snapshot } from "@/lib/contracts";

export type PlayingScript = { kind: "main" | "side"; script: Script; source?: string };

export function ScriptPanel({ snapshot, playing }: { snapshot: Snapshot | null; playing: PlayingScript | null }) {
  const block = "max-h-56 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-night p-3 text-xs text-paper";
  return (
    <section aria-label="Script" className="rounded-2xl border border-edge bg-panel p-4">
      <h2 className="text-xs uppercase tracking-wide text-faint">Saved snapshot</h2>
      <pre className={`mt-2 ${block}`}>{snapshot ? JSON.stringify(snapshot, null, 2) : "null"}</pre>
      <h2 className="mt-4 text-xs uppercase tracking-wide text-faint">
        {playing ? `Playing script (${playing.kind}${playing.source ? `, ${playing.source}` : ""})` : "Playing script"}
      </h2>
      <pre className={`mt-2 ${block}`}>{playing ? JSON.stringify(playing.script, null, 2) : "null"}</pre>
    </section>
  );
}
