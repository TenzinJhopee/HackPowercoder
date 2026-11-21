import type { EngineEvent } from "@/client/events";
import type { Keepsake } from "@/lib/savings-plan";

/**
 * The savings slip that stays on screen. `revealed` counts the side beats spoken so far
 * (beat i shows cut i; the beat after the last cut shows the total). `live` while its answer plays.
 */
export type KeptSlip = { keepsake: Keepsake; revealed: number; live: boolean };

/** Everything on the slip: every cut plus the total line. */
export const slipLines = (keepsake: Keepsake) => keepsake.plan.cuts.length + 1;

/** Only the engine and the user's close touch the slip; a new savings answer replaces it. */
export function keepReducer(slip: KeptSlip | null, event: EngineEvent): KeptSlip | null {
  if (event.type === "keep") return { keepsake: event.keepsake, revealed: 0, live: true };
  if (!slip?.live) return slip;
  if (event.type === "line" && event.kind === "side" && event.beatIndex !== null) {
    return { ...slip, revealed: Math.max(slip.revealed, Math.min(event.beatIndex + 1, slipLines(slip.keepsake))) };
  }
  // The answer ended or was cut short: show the whole plan, it is hers to keep.
  if (event.type === "mode" && event.previous === "side") return { ...slip, revealed: slipLines(slip.keepsake), live: false };
  return slip;
}
