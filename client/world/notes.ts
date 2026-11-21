import type { Grain } from "./engine";

/**
 * Banknote look for the grain world: each unit (CHF 100) is drawn as a small stylised paper note instead of a dot.
 * Not a real banknote: a plain rectangle in the unit's colour (so amber/coral/green/paper keep their meaning) with a
 * thin printed frame and, when large enough, a small round "watermark" window. No artwork, numbers or real designs.
 *
 * Motion on top of the engine's positions (positions themselves are untouched, so every scene and choreography works):
 * - at rest a note lies at a small seeded angle; `scatter` (radians, per scene) decides how tidy that is;
 * - in flight it tilts towards its direction of travel and flutters (one axis foreshortened: turning in the air);
 * - orbiting (galaxy) it sways slowly; in the jars' stream it falls like paper, tilting with its side-to-side swing;
 * - with prefers-reduced-motion: no flutter, no tilt, no sway.
 * Per-note state lives in typed arrays indexed by grain id: drawing a frame allocates nothing.
 */

const TAU = Math.PI * 2;
const HALF_PI = Math.PI / 2;
/** Note half-width as a share of the grain radius, and its aspect (height / width). */
const WIDTH_PER_R = 1.2;
const ASPECT = 0.5;
/** Below this on-screen half-width (5 px wide, 2.5 px high) a note is unreadable: draw the dot instead. */
export const MIN_HALF_WIDTH = 2.5;
/** Notes this close to the minimum are raised to it (neighbours overlap a little, like a loose pile of paper). */
const RAISE_FROM = 1.5;
/** Stream notes (jars) are tiny dots in the dot look; as notes they get this minimum half-width. */
const STREAM_HALF_WIDTH = 2.6;
const FRAME_STYLE = "rgba(11,13,18,0.42)";

/** Rectangles are symmetric under a half turn: shortest angle difference modulo pi. */
const wrapHalf = (d: number) => ((((d + HALF_PI) % Math.PI) + Math.PI) % Math.PI) - HALF_PI;

function seed(id: number, salt: number): number {
  let h = Math.imul(id + 0x9e3779b9, 0x85ebca6b) ^ Math.imul(salt + 0x165667b1, 0xc2b2ae35);
  h ^= h >>> 15;
  h = Math.imul(h, 0x2c1b3c6d);
  h ^= h >>> 12;
  return (h >>> 0) / 4294967296;
}

export class NoteRenderer {
  /** Rest-angle spread the current scene asks for (radians); the drawn spread eases towards it. */
  scatterTo = 0.3;
  private scatter = 0.3;
  private size = 0;
  private rest = new Float32Array(0);
  private phase = new Float32Array(0);
  private freq = new Float32Array(0);
  private rot = new Float32Array(0);
  private lx = new Float32Array(0);
  private ly = new Float32Array(0);
  private vx = new Float32Array(0);
  private vy = new Float32Array(0);
  private seen = new Int32Array(0);
  private frame = 1;
  private now = 0;
  private dt = 16;
  private dpr = 1;
  private reduced = false;

  private ensure(n: number): void {
    if (n <= this.size) return;
    this.size = n;
    this.rest = new Float32Array(n);
    this.phase = new Float32Array(n);
    this.freq = new Float32Array(n);
    this.rot = new Float32Array(n);
    this.lx = new Float32Array(n);
    this.ly = new Float32Array(n);
    this.vx = new Float32Array(n);
    this.vy = new Float32Array(n);
    this.seen = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      this.rest[i] = seed(i, 1) * 2 - 1;
      this.phase[i] = seed(i, 2) * TAU;
      this.freq[i] = 0.8 + 0.4 * seed(i, 3);
    }
  }

  /** Once per frame, before the grains are drawn. */
  begin(ctx: CanvasRenderingContext2D, count: number, now: number, dt: number, dpr: number, reduced: boolean): void {
    this.ensure(count);
    this.frame++;
    this.now = now;
    this.dt = Math.max(1, dt);
    this.dpr = dpr;
    this.reduced = reduced;
    this.scatter += (this.scatterTo - this.scatter) * (1 - Math.exp(-this.dt / 600));
    ctx.strokeStyle = FRAME_STYLE;
    ctx.lineWidth = 0.75;
  }

  /** On-screen half-width of grain `g` drawn with radius `r` (screen px); below MIN_HALF_WIDTH it stays a dot. */
  halfWidth(g: Grain, r: number): number {
    const hw = r * WIDTH_PER_R;
    if (g.motion?.kind === "flow" && hw > 1) return Math.max(hw, STREAM_HALF_WIDTH);
    return hw >= RAISE_FROM && hw < MIN_HALF_WIDTH ? MIN_HALF_WIDTH : hw;
  }

  /** Draws one note centred at screen point (x, y). Leaves a rotated transform behind: the caller resets it. */
  draw(ctx: CanvasRenderingContext2D, g: Grain, x: number, y: number, hw: number, alpha: number, zoom: number): void {
    const id = g.id;
    const now = this.now;
    const dt = this.dt;
    const rest = this.rest[id] * this.scatter;
    // Velocity from the engine's own positions (world units / ms), reset when the note was not drawn last frame.
    if (this.seen[id] !== this.frame - 1) {
      this.lx[id] = g.x;
      this.ly[id] = g.y;
      this.vx[id] = 0;
      this.vy[id] = 0;
      this.rot[id] = rest;
    }
    this.seen[id] = this.frame;
    const kv = 1 - Math.exp(-dt / 90);
    this.vx[id] += ((g.x - this.lx[id]) / dt - this.vx[id]) * kv;
    this.vy[id] += ((g.y - this.ly[id]) / dt - this.vy[id]) * kv;
    this.lx[id] = g.x;
    this.ly[id] = g.y;

    let target = rest;
    let flutter = 0;
    let settle = 260;
    if (!this.reduced) {
      const m = g.motion;
      if (g.moving && now > g.t0) {
        const p = (now - g.t0) / g.dur;
        if (p < 1) {
          const vx = this.vx[id];
          const vy = this.vy[id];
          const speed = Math.sqrt(vx * vx + vy * vy) * zoom; // screen px per ms
          const w = Math.min(1, speed / 0.35) * 0.6;
          if (w > 0.01) target = rest + wrapHalf(Math.atan2(vy, vx) - rest) * w;
          flutter = Math.sin(Math.PI * p);
          settle = 120;
        }
      } else if (m?.kind === "orbit") {
        target = rest + 0.12 * Math.sin(now * 0.0005 + this.phase[id]);
      } else if (m?.kind === "flow") {
        // Same swing as the engine's flow path: x = m.x + sin(y * 0.035 + offset) * spread. Tilt with its slope.
        const slope = Math.cos(g.y * 0.035 + m.offset) * 0.035 * m.spread;
        target = rest * 0.4 + Math.max(-0.5, Math.min(0.5, slope * 2.6));
        flutter = 0.45;
      }
    }
    const rot = (this.rot[id] += wrapHalf(target - this.rot[id]) * (1 - Math.exp(-dt / settle)));

    let angle = rot;
    let fy = 1;
    if (flutter > 0.001) {
      const ph = now * 0.0072 * this.freq[id] + this.phase[id];
      fy = 1 - flutter * 0.62 * (1 - Math.abs(Math.cos(ph)));
      angle += flutter * 0.16 * Math.sin(ph * 0.5 + 1.3);
      alpha *= 0.82 + 0.18 * fy;
    }

    const hh = hw * ASPECT;
    const c = Math.cos(angle) * this.dpr;
    const s = Math.sin(angle) * this.dpr;
    ctx.globalAlpha = alpha;
    ctx.setTransform(c, s, -s * fy, c * fy, x * this.dpr, y * this.dpr);
    ctx.fillRect(-hw, -hh, hw * 2, hh * 2);
    if (hw >= 4) {
      const inset = Math.max(0.9, hw * 0.14);
      ctx.strokeRect(-hw + inset, -hh + inset, (hw - inset) * 2, (hh - inset) * 2);
      if (hw >= 7) {
        ctx.beginPath();
        ctx.arc(hw * 0.45, 0, hh * 0.38, 0, TAU);
        ctx.stroke();
      }
    }
  }
}

/** `?units=dots` keeps the old round grains (for comparison); banknotes are the default. */
export function wantsNotes(): boolean {
  if (typeof window === "undefined") return true;
  return new URLSearchParams(window.location.search).get("units") !== "dots";
}
