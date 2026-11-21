import { GOLDEN_ANGLE } from "./layout";

/**
 * The PostFinance mark as geometry (no image asset): a bold plus cut by a diagonal gap into two interlocking hooks.
 * Unit coordinates, centre (0, 0), y down, the plus spanning about -1..1. The upper hook is the top arm turning into the
 * left arm, the lower hook the bottom arm turning into the right arm; each hook has a rounded concave inner corner.
 * Pure functions, no canvas.
 */

/** Half the thickness of each arm. */
const W = 0.36;
/** Half the length of the horizontal arms (the mark is slightly taller than wide). */
const HX = 0.95;
/** Radius of the rounded concave corner inside each hook. */
const FILLET = 0.32;
/** Half the width of the diagonal gap between the hooks. */
export const LOGO_GAP = 0.04;
/** Sideways bow of the gap (a soft S, like the mark's cut). */
const BOW = 0.045;
const L = W * Math.SQRT2;

/** Signed offset from the gap's centre line (negative = upper hook side); the gap runs from (W, -W) to (-W, W). */
function gapOffset(x: number, y: number): number {
  const u = (x - y) / Math.SQRT2;
  const v = (x + y) / Math.SQRT2;
  const centre = Math.abs(u) < L ? BOW * Math.sin((Math.PI * u) / L) : 0;
  return v - centre;
}

/** True inside the plus with its two rounded hook corners, ignoring the gap. */
function inPlus(x: number, y: number): boolean {
  if (Math.abs(x) <= W && Math.abs(y) <= 1) return true;
  if (Math.abs(y) <= W && Math.abs(x) <= HX) return true;
  // Concave fillets at the hooks' inner corners: upper-left (-W, -W) and lower-right (W, W).
  for (const s of [-1, 1]) {
    const dx = s * x - W;
    const dy = s * y - W;
    if (dx >= 0 && dx <= FILLET && dy >= 0 && dy <= FILLET && Math.hypot(FILLET - dx, FILLET - dy) >= FILLET) return true;
  }
  return false;
}

/** True inside the diagonal gap that separates the two hooks. */
export function inLogoGap(x: number, y: number): boolean {
  return Math.abs(x) <= W + LOGO_GAP && Math.abs(y) <= W + LOGO_GAP && Math.abs(gapOffset(x, y)) < LOGO_GAP;
}

/** True inside the mark's silhouette (gap excluded). */
export function inLogo(x: number, y: number): boolean {
  return inPlus(x, y) && !inLogoGap(x, y);
}

const RING = Array.from({ length: 12 }, (_, i) => [Math.cos((i * Math.PI) / 6), Math.sin((i * Math.PI) / 6)] as const);

/** Inside with at least `m` of room all around (sampled on a ring), so a note wandering by up to `m` stays inside. */
function insideBy(x: number, y: number, m: number): boolean {
  if (!inLogo(x, y)) return false;
  for (const [cx, cy] of RING) if (!inLogo(x + cx * m, y + cy * m)) return false;
  return true;
}

function sunflower(c: number, room: number, max: number): { x: number; y: number }[] {
  const out: { x: number; y: number }[] = [];
  const reach = Math.hypot(HX, 1) + c;
  for (let k = 0; out.length <= max; k++) {
    const r = c * Math.sqrt(k + 0.5);
    if (r > reach) break;
    const x = Math.cos(k * GOLDEN_ANGLE) * r;
    const y = Math.sin(k * GOLDEN_ANGLE) * r;
    if (insideBy(x, y, room * c)) out.push({ x, y });
  }
  return out;
}

export type LogoPoints = { points: { x: number; y: number }[]; c: number };

/**
 * `n` evenly spread points inside the mark (unit coordinates), nearest the centre first: a sunflower spiral clipped to
 * the silhouette, its spacing `c` searched so exactly `n` fall inside. Every point keeps `room * c` of clearance from the
 * edge and the gap. Memoised per (n, room).
 */
export function logoPoints(n: number, room = 0.5): LogoPoints {
  const key = `${n}:${room}`;
  const hit = cache.get(key);
  if (hit) return hit;
  let lo = 0.001;
  let hi = 0.5;
  let best = sunflower(hi, room, n);
  let bestC = hi;
  for (let i = 0; i < 40 && best.length !== n; i++) {
    const c = (lo + hi) / 2;
    const pts = sunflower(c, room, n);
    if (pts.length >= n) {
      lo = c;
      best = pts;
      bestC = c;
    } else hi = c;
  }
  if (best.length < n) best = sunflower(lo, room, n);
  const result = { points: best.slice(0, n), c: bestC };
  cache.set(key, result);
  return result;
}

const cache = new Map<string, LogoPoints>();
