import type { SceneType } from "@/lib/contracts";
import { hashKey, noise, type Engine, type Grain, type Timing } from "./engine";

/**
 * Effect atlas (pfagent.md 7): scene changes are choreographies chosen by the (from → to) pair, focuses rotate between
 * four looks. Each choreography differs in delay ordering, path shape and duration profile, not only in timing.
 * Everything is seeded: the same sequence of World calls always plays the same motion (backup recording).
 */

export type ChoreoName =
  /** First gathering into the galaxy: inner grains first, a slow swirl around the disc centre. */
  | "gather"
  /** galaxy → monthly: the disc unwinds into a spiral, then grains rain into the columns month by month. */
  | "unwind-rain"
  /** → monthly from elsewhere: grains arc up and fall into the columns, left to right, bottom rows first. */
  | "rain"
  /** → pools: grains dissolve on the way and whirl into their category, one category after another. */
  | "swirl"
  /** → level (time flow): grains dip to the start-of-year line and rise, January first, the line drawn as time passes. */
  | "rise"
  /** → jars: everything is poured from the top into the central stream, highest grains first. */
  | "pour"
  /** Back to a scene already seen: reverse order, quick start that slows down, a slight zoom out (rewind). */
  | "rewind";

export type FocusStyle = "zoom" | "spotlight" | "ripple" | "lift";

export type Entrance = { name: ChoreoName; pivot: { x: number; y: number } | null };

/** Where a grain is going in the new scene, and its place in the scene's natural order. */
export type Slot = {
  /** 0..1: the scene's natural order (monthly: by month then row; pools: by category; jars: by height now). */
  order: number;
  /** Column or category index, and how many there are. */
  group: number;
  groups: number;
  x: number;
  y: number;
  /** Cluster centre (pools/galaxy swirl pivot). */
  cx?: number;
  cy?: number;
  /** Start-of-year line (level rise). */
  base?: number;
};

/** When the entrance has landed (labels fade in after it). */
export const SETTLE: Record<ChoreoName, number> = {
  gather: 1700,
  "unwind-rain": 2300,
  rain: 1900,
  swirl: 2000,
  rise: 2000,
  pour: 2100,
  rewind: 1150
};

export function entranceTiming(entrance: Entrance, g: Grain, s: Slot, e: Engine): Timing {
  const n1 = noise(g.id, 41);
  const n2 = noise(g.id, 42);
  switch (entrance.name) {
    case "gather":
      return {
        dur: 1300 + 450 * n1,
        delay: 520 * s.order + 160 * n2,
        spiral: { x: s.cx ?? e.width / 2, y: s.cy ?? e.height / 2, turn: 0.9 },
        ease: "inOutSine"
      };
    case "unwind-rain":
    case "rain": {
      const fall = { x: s.x + (n1 - 0.5) * 6, y: Math.min(g.y, s.y) - e.height * 0.32 };
      const pivot = entrance.name === "unwind-rain" ? entrance.pivot ?? { x: e.width / 2, y: e.height / 2 } : null;
      return {
        dur: 950 + 300 * n1 + (pivot ? 300 : 0),
        delay: 1050 * s.order + 70 * n2,
        via: fall,
        spiral: pivot ? { x: pivot.x, y: pivot.y, turn: 1.5 } : undefined,
        ease: "inOutQuad"
      };
    }
    case "swirl":
      return {
        dur: 1250 + 450 * n1,
        delay: (760 * s.group) / Math.max(1, s.groups) + 280 * n2,
        spiral: { x: s.cx ?? s.x, y: s.cy ?? s.y, turn: (s.group % 2 ? 1 : -1) * (1.1 + 0.4 * noise(s.group, 43)) },
        ease: "inOutSine",
        dip: 0.5
      };
    case "rise":
      return {
        dur: 780 + 220 * n1,
        delay: 1150 * s.order + 40 * n2,
        via: { x: s.x, y: s.base ?? s.y },
        ease: "inOutCubic"
      };
    case "pour":
      return {
        dur: 1250 + 350 * n1,
        delay: 950 * s.order + 120 * n2,
        via: { x: e.width / 2 + (n1 - 0.5) * e.width * 0.08, y: -e.height * 0.12 },
        ease: "inOutSine"
      };
    case "rewind":
      return { dur: 700 + 200 * n1, delay: 600 * (1 - s.order) + 60 * n2, bend: 0.05, ease: "outCubic" };
  }
}

/** Label reveal offset (ms, relative to settle) for column/label i of n: follows the order the grains arrive in. */
export function labelStagger(entrance: Entrance | null, i: number, n: number): number {
  if (!entrance || n <= 1) return 0;
  const f = i / (n - 1);
  switch (entrance.name) {
    case "rain":
    case "unwind-rain":
    case "rise":
      return -1000 * (1 - f);
    case "swirl":
      return -700 * (1 - f);
    case "rewind":
      return -500 * f;
    default:
      return 0;
  }
}

/** Choreography for a scene change: rewind to a scene already seen, else the destination's own; never twice in a row. */
export function pickChoreo(from: SceneType | null, to: SceneType, seen: ReadonlySet<SceneType>, last: ChoreoName | null): ChoreoName {
  const own: ChoreoName =
    to === "galaxy" ? "gather" : to === "monthly" ? (from === "galaxy" ? "unwind-rain" : "rain") : to === "level" ? "rise" : to === "jars" ? "pour" : "swirl";
  const candidates: ChoreoName[] = from !== null && from !== to && seen.has(to) ? ["rewind", own] : [own];
  return candidates.find((c) => c !== last) ?? candidates[0];
}

const STYLES: FocusStyle[] = ["zoom", "spotlight", "ripple", "lift"];

/** Seeded by focus count and target, never the same look twice in a row. */
export function pickFocusStyle(key: string | number, count: number, last: FocusStyle | null, reduced: boolean): FocusStyle {
  const pool = (reduced ? STYLES.slice(0, 2) : STYLES).filter((s) => s !== last);
  return pool[Math.floor(noise(hashKey(key), 900 + count) * pool.length)];
}

/** Dim and lift for a grain while something is focused (hit = part of the focused item); null = nothing focused. */
export function focal(style: FocusStyle, hit: boolean | null): { dim: number; lift: number } {
  if (hit === null) return { dim: 1, lift: 0 };
  if (hit) return { dim: 1, lift: style === "lift" ? 1 : 0 };
  switch (style) {
    case "spotlight":
      return { dim: 0.85, lift: 0 };
    case "ripple":
      return { dim: 0.5, lift: 0 };
    case "lift":
      return { dim: 0.45, lift: -1 };
    default:
      return { dim: 0.32, lift: 0 };
  }
}

/** How much of the full focus zoom each look keeps. */
export const FOCUS_SOFTEN: Record<FocusStyle, number> = { zoom: 1, spotlight: 0.5, ripple: 0.8, lift: 0.65 };
