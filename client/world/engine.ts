import { theme } from "@/components/theme";
import { MIN_HALF_WIDTH, NoteRenderer, wantsNotes } from "./notes";

/**
 * Grain engine (docs/IMPLEMENTATION_PLAN.md 6.1). One canvas, a fixed set of grains (one per CHF 100) and a camera.
 * Scenes never create or delete grains: they only `place` them, so every scene change is the same grains moving.
 * World coordinates are CSS pixels of the canvas at zoom 1 with the camera centred on the canvas.
 *
 * Flights come in two shapes (an `arc`: a quadratic bezier, and a `spiral`: polar sweep around a pivot that settles into
 * the arc) with four calm easings, an optional mid-flight fade (dissolve) and an optional follow-up flight (chains).
 * Focus overlays (spotlight, ripple, lift), carried sparks, a camera breath and the resting drift live here too, all
 * written to preallocated fields so a frame allocates nothing.
 */

export type RGB = readonly [number, number, number];

export const rgb = (hex: string): RGB => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

export const palette = {
  paper: rgb(theme.paper),
  spend: rgb(theme.spend),
  coral: rgb(theme.coral),
  saved: rgb(theme.saved),
  faint: rgb(theme.faint)
} as const;

/** Deterministic noise in [0, 1) per grain and salt: everything visible is seeded (backup video must replay). */
export function noise(id: number, salt = 0): number {
  let h = Math.imul(id ^ 0x5bd1e995, 0x85ebca6b) ^ Math.imul(salt + 0x27d4eb2f, 0xc2b2ae35);
  h ^= h >>> 16;
  h = Math.imul(h, 0x7feb352d);
  h ^= h >>> 15;
  h = Math.imul(h, 0x846ca68b);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

/** Stable integer for any key (seeding effect choices by focus target). */
export function hashKey(key: string | number): number {
  let h = 0x811c9dc5;
  for (const ch of String(key)) h = Math.imul(h ^ ch.codePointAt(0)!, 0x01000193) >>> 0;
  return h;
}

export const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOutCubic = (t: number) => 1 - (1 - t) * (1 - t) * (1 - t);
export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Calm easings only: no overshoot, no bounce. */
export type Ease = "inOutCubic" | "inOutSine" | "outCubic" | "inOutQuad";
const EASES: Ease[] = ["inOutCubic", "inOutSine", "outCubic", "inOutQuad"];
function ease(code: number, t: number): number {
  switch (code) {
    case 1:
      return 0.5 - 0.5 * Math.cos(Math.PI * t);
    case 2:
      return easeOutCubic(t);
    case 3:
      return t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t);
    default:
      return easeInOutCubic(t);
  }
}

export type Motion =
  | { kind: "orbit"; cx: number; cy: number; radius: number; angle: number; speed: number; since: number }
  | { kind: "flow"; x: number; spread: number; top: number; bottom: number; offset: number; speed: number; since: number };

export type Grain = {
  id: number;
  /** Index into the world's category list (the money this grain stands for). */
  category: number;
  /** Stable organic jitter in [-1, 1]. */
  jx: number;
  jy: number;
  // current (written every frame)
  x: number;
  y: number;
  a: number;
  r: number;
  color: [number, number, number];
  fill: string;
  fade: number;
  // flight
  sx: number;
  sy: number;
  cx: number;
  cy: number;
  tx: number;
  ty: number;
  t0: number;
  dur: number;
  moving: boolean;
  flights: number;
  c0: RGB;
  c1: RGB;
  a0: number;
  a1: number;
  r0: number;
  r1: number;
  dim: number;
  dimTo: number;
  /** Focus lift: 1 = raised and brighter, -1 = settled, 0 = rest. */
  lift: number;
  liftTo: number;
  motion: Motion | null;
  // flight shape
  ease: number;
  spiral: boolean;
  px: number;
  py: number;
  pr0: number;
  pr1: number;
  pth0: number;
  pdth: number;
  dip: number;
  next: { place: Place; timing: Timing } | null;
};

export type Place = { x: number; y: number; color?: RGB; alpha?: number; r?: number; dim?: number; lift?: number; motion?: Motion | null };
export type Timing = {
  dur: number;
  delay?: number;
  /** Random sideways bow of the arc (share of the distance). Ignored when `via` is given. */
  bend?: number;
  /** Explicit bezier control point (e.g. above the target: the grain falls in; on the base line: it rises). */
  via?: { x: number; y: number };
  /** Polar sweep around this point, `turn` extra radians, blending into the arc as it lands. */
  spiral?: { x: number; y: number; turn: number };
  ease?: Ease;
  /** Alpha dip mid-flight (0-1): the grain dissolves on the way and condenses on arrival. */
  dip?: number;
  /** Flight that starts when this one lands. */
  then?: { place: Place; timing: Timing };
};
export type Box = { x: number; y: number; w: number; h: number };

export interface SceneLayer {
  drawUnder?(ctx: CanvasRenderingContext2D, now: number): void;
  drawOver?(ctx: CanvasRenderingContext2D, now: number): void;
}

const near = (a: number, b: number) => Math.abs(a - b) < 0.5;
const sameColor = (a: RGB, b: RGB) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
const fillOf = (c: readonly number[]) => `rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})`;
const TAU = Math.PI * 2;
const SPARKS = 9;

function sameMotion(a: Motion | null, b: Motion | null): boolean {
  if (!a || !b) return a === b;
  if (a.kind === "orbit" && b.kind === "orbit") return near(a.cx, b.cx) && near(a.cy, b.cy) && near(a.radius, b.radius);
  if (a.kind === "flow" && b.kind === "flow") return near(a.x, b.x) && near(a.top, b.top) && near(a.bottom, b.bottom);
  return false;
}

const point = { x: 0, y: 0, fade: 1 };
function motionPoint(m: Motion, now: number): typeof point {
  const t = (now - m.since) / 1000;
  if (m.kind === "orbit") {
    const angle = m.angle + m.speed * t;
    point.x = m.cx + Math.cos(angle) * m.radius;
    point.y = m.cy + Math.sin(angle) * m.radius;
    point.fade = 1;
  } else {
    const span = m.bottom - m.top;
    const y = (((m.offset + m.speed * t) % span) + span) % span;
    point.y = m.top + y;
    point.x = m.x + Math.sin(point.y * 0.035 + m.offset) * m.spread;
    point.fade = clamp(Math.min(y, span - y) / (span * 0.12), 0, 1);
  }
  return point;
}

type Spark = { on: boolean; sx: number; sy: number; cx: number; cy: number; ex: number; ey: number; t0: number; dur: number; r: number; fill: string };

export class Engine {
  grains: Grain[] = [];
  width = 0;
  height = 0;
  cam = { x: 0, y: 0, s: 1 };
  camTo = { x: 0, y: 0, s: 1 };
  /** What is drawn this frame: the camera plus the transient breath (zoom out and back). */
  view = { x: 0, y: 0, s: 1 };
  layer: SceneLayer | null = null;
  reduced = false;
  /** Banknote look (notes.ts); null = round dots (`?units=dots`). */
  notes: NoteRenderer | null = new NoteRenderer();
  /** Soft radial vignette around a world point (focus "spotlight"). */
  spot = { x: 0, y: 0, r: 0, a: 0, aTo: 0 };
  /** A ring travelling out through a cluster (focus "ripple"). */
  ripple = { on: false, x: 0, y: 0, R: 0, t0: 0, dur: 1300 };
  private breath = { t0: 0, dur: 0, amount: 0 };
  private sparks: Spark[] = Array.from({ length: SPARKS }, () => ({ on: false, sx: 0, sy: 0, cx: 0, cy: 0, ex: 0, ey: 0, t0: 0, dur: 1, r: 2, fill: "" }));
  private spotGradient: { g: CanvasGradient; x: number; y: number; r: number } | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private raf = 0;
  private dpr = 1;
  private last = 0;
  private motionQuery: MediaQueryList | null = null;
  /** Frame time while a frame is being computed (chained flights start exactly when the previous one lands). */
  private frameNow = -1;

  /** Creates the grains, scattered invisibly over the canvas so the first scene gathers them. */
  createGrains(categories: number[]): void {
    this.grains = categories.map((category, id) => {
      const x = noise(id, 1) * (this.width || 300);
      const y = noise(id, 2) * (this.height || 200);
      return {
        id,
        category,
        jx: noise(id, 3) * 2 - 1,
        jy: noise(id, 4) * 2 - 1,
        x,
        y,
        a: 0,
        r: 1.5,
        color: [...palette.paper] as [number, number, number],
        fill: fillOf(palette.paper),
        fade: 1,
        sx: x,
        sy: y,
        cx: x,
        cy: y,
        tx: x,
        ty: y,
        t0: 0,
        dur: 1,
        moving: false,
        flights: 0,
        c0: palette.paper,
        c1: palette.paper,
        a0: 0,
        a1: 0,
        r0: 1.5,
        r1: 1.5,
        dim: 1,
        dimTo: 1,
        lift: 0,
        liftTo: 0,
        motion: null,
        ease: 0,
        spiral: false,
        px: 0,
        py: 0,
        pr0: 0,
        pr1: 0,
        pth0: 0,
        pdth: 0,
        dip: 0,
        next: null
      };
    });
  }

  attach(canvas: HTMLCanvasElement): void {
    if (this.canvas === canvas && this.raf) return;
    this.detach();
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.spotGradient = null;
    this.motionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)") ?? null;
    this.reduced = !!this.motionQuery?.matches;
    if (!wantsNotes()) this.notes = null;
    this.last = performance.now();
    const loop = (now: number) => {
      this.raf = requestAnimationFrame(loop);
      this.tick(now);
    };
    this.raf = requestAnimationFrame(loop);
  }

  detach(): void {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.canvas = null;
    this.ctx = null;
  }

  /** Returns true when the size changed. */
  resize(width: number, height: number): boolean {
    if (!this.canvas || width <= 0 || height <= 0) return false;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(width * this.dpr);
    this.canvas.height = Math.round(height * this.dpr);
    const first = this.width === 0;
    const changed = width !== this.width || height !== this.height;
    this.width = width;
    this.height = height;
    if (first) {
      this.cam = { x: width / 2, y: height / 2, s: 1 };
      this.camTo = { ...this.cam };
      this.view = { ...this.cam };
      for (const g of this.grains) {
        g.x = g.sx = g.tx = noise(g.id, 1) * width;
        g.y = g.sy = g.ty = noise(g.id, 2) * height;
      }
    }
    return changed;
  }

  /** Moves a grain from wherever it is now (mid-flight included). No-op if already headed there. */
  place(g: Grain, p: Place, t: Timing): void {
    const color = p.color ?? g.c1;
    const alpha = p.alpha ?? g.a1;
    const r = p.r ?? g.r1;
    if (p.dim !== undefined) g.dimTo = p.dim;
    if (p.lift !== undefined) g.liftTo = this.reduced ? 0 : p.lift;
    const motion = p.motion ?? null;
    const keepMotion = sameMotion(g.motion, motion);
    const samePos = keepMotion && (motion !== null || (near(g.tx, p.x) && near(g.ty, p.y)));
    if (samePos && sameColor(g.c1, color) && Math.abs(g.a1 - alpha) < 0.01 && Math.abs(g.r1 - r) < 0.02) return;
    const now = this.frameNow >= 0 ? this.frameNow : performance.now();
    g.sx = g.x;
    g.sy = g.y;
    g.c0 = [g.color[0], g.color[1], g.color[2]];
    g.a0 = g.a;
    g.r0 = g.r;
    g.c1 = color;
    g.a1 = alpha;
    g.r1 = r;
    if (!keepMotion) g.motion = motion;
    g.tx = p.x;
    g.ty = p.y;
    g.t0 = now + (this.reduced ? 0 : t.delay ?? 0);
    g.dur = Math.max(1, t.dur * (this.reduced ? 0.25 : 1));
    g.flights++;
    g.ease = Math.max(0, EASES.indexOf(t.ease ?? "inOutCubic"));
    g.dip = this.reduced ? 0 : t.dip ?? 0;
    g.next = t.then ?? null;
    if (t.via) {
      g.cx = t.via.x;
      g.cy = t.via.y;
    } else {
      const bend = (t.bend ?? 0.22) * (noise(g.id, 100 + g.flights) * 2 - 1);
      const dx = p.x - g.x;
      const dy = p.y - g.y;
      g.cx = (g.x + p.x) / 2 - dy * bend;
      g.cy = (g.y + p.y) / 2 + dx * bend;
    }
    g.spiral = !!t.spiral && !this.reduced;
    if (t.spiral) {
      const { x: px, y: py, turn } = t.spiral;
      g.px = px;
      g.py = py;
      g.pr0 = Math.hypot(g.x - px, g.y - py);
      g.pr1 = Math.hypot(p.x - px, p.y - py);
      g.pth0 = Math.atan2(g.y - py, g.x - px);
      let d = Math.atan2(p.y - py, p.x - px) - g.pth0;
      d = ((((d + Math.PI) % TAU) + TAU) % TAU) - Math.PI;
      g.pdth = d + turn;
    }
    g.moving = true;
  }

  /** Orbit/flow speed, honouring reduced motion (no rotation). */
  speed(value: number): number {
    return this.reduced ? 0 : value;
  }

  /** Point the camera at a world point with zoom `s` (1.0-2.6). At zoom 1 it stays home; zoomed, it may show the night edge. */
  lookAt(x: number, y: number, s: number): void {
    const zoom = clamp(s, 1, 2.6);
    const slack = 1 - 1 / zoom; // how far the centre may move from home, as a share of the half size
    const w2 = this.width / 2;
    const h2 = this.height / 2;
    this.camTo = { x: clamp(x, w2 - w2 * slack * 1.4, w2 + w2 * slack * 1.4), y: clamp(y, h2 - h2 * slack * 1.4, h2 + h2 * slack * 1.4), s: zoom };
  }

  /** Fit a world box into the view. `soften` (0-1) keeps only that share of the zoom above 1. */
  frame(box: Box, opts: { min?: number; max?: number; pad?: number; soften?: number } = {}): void {
    const pad = opts.pad ?? 0.12;
    const s = Math.min((this.width * (1 - pad)) / Math.max(box.w, 1), (this.height * (1 - pad)) / Math.max(box.h, 1));
    const zoom = clamp(s, opts.min ?? 1, opts.max ?? 2.6);
    this.lookAt(box.x + box.w / 2, box.y + box.h / 2, 1 + (zoom - 1) * (opts.soften ?? 1));
  }

  home(): void {
    this.lookAt(this.width / 2, this.height / 2, 1);
  }

  /** The camera pulls back by `amount` and returns (uzaklaşma), over `dur` ms. */
  breathe(amount: number, dur: number): void {
    if (this.reduced) return;
    this.breath.t0 = performance.now();
    this.breath.dur = dur;
    this.breath.amount = amount;
  }

  /** A ring expands from a world point through a cluster of radius R, swelling the grains it passes. */
  startRipple(x: number, y: number, R: number, delay = 250): void {
    if (this.reduced) return;
    const r = this.ripple;
    r.on = true;
    r.x = x;
    r.y = y;
    r.R = Math.max(R, 12);
    r.t0 = performance.now() + delay;
  }

  /** Taşıma: a few sparks leave a world cluster and travel to the top centre of the stage (where the big figure sits). */
  carry(x: number, y: number, R: number, color: RGB, count = 7): void {
    if (this.reduced || !this.width) return;
    const now = performance.now();
    const ex = this.width / 2;
    const ey = this.height * 0.02;
    const fill = fillOf(color);
    let n = 0;
    for (let i = 0; i < SPARKS && n < count; i++) {
      const s = this.sparks[i];
      if (s.on && now < s.t0 + s.dur) continue;
      const a = noise(i + n * 13, Math.round(x + y)) * TAU;
      const d = R * 0.55 * Math.sqrt(noise(n, 77 + Math.round(R)));
      const [sx, sy] = this.toScreen(x + Math.cos(a) * d, y + Math.sin(a) * d);
      s.on = true;
      s.sx = sx;
      s.sy = sy;
      s.ex = ex + (noise(n, 61) - 0.5) * 24;
      s.ey = ey;
      s.cx = sx * 0.55 + ex * 0.45 + (noise(n, 62) - 0.5) * 120;
      s.cy = ey + (sy - ey) * 0.25;
      s.t0 = now + 180 + n * 70;
      s.dur = 1050 + 350 * noise(n, 63);
      s.r = 2 + noise(n, 64);
      s.fill = fill;
      n++;
    }
  }

  toScreen(x: number, y: number): [number, number] {
    const { x: cx, y: cy, s } = this.view;
    return [(x - cx) * s + this.width / 2, (y - cy) * s + this.height / 2];
  }

  /** Draw in world coordinates; `unit` is one screen pixel in world units (for line widths and dashes). */
  inWorld(ctx: CanvasRenderingContext2D, draw: (unit: number) => void): void {
    const { x, y, s } = this.view;
    const d = this.dpr;
    ctx.save();
    ctx.setTransform(d * s, 0, 0, d * s, d * (this.width / 2 - x * s), d * (this.height / 2 - y * s));
    draw(1 / s);
    ctx.restore();
  }

  /** Text at a world point, drawn in screen space so it stays readable at any zoom. */
  label(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    o: { color?: string; alpha?: number; size?: number; weight?: number; align?: CanvasTextAlign; dy?: number; baseline?: CanvasTextBaseline } = {}
  ): void {
    const alpha = o.alpha ?? 1;
    if (alpha < 0.01) return;
    const [sx, sy] = this.toScreen(x, y);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = o.color ?? theme.faint;
    ctx.font = `${o.weight ?? 400} ${o.size ?? 11}px Inter, Arial, sans-serif`;
    ctx.textAlign = o.align ?? "center";
    ctx.textBaseline = o.baseline ?? "alphabetic";
    ctx.fillText(text, sx, sy + (o.dy ?? 0));
    ctx.globalAlpha = 1;
  }

  /** Rest-angle spread for the banknotes of the scene being entered (radians): tidy columns, scattered pools. */
  setScatter(radians: number): void {
    if (this.notes) this.notes.scatterTo = radians;
  }

  private tick(now: number): void {
    const ctx = this.ctx;
    if (!ctx || !this.width) return;
    const dt = Math.min(64, now - this.last);
    this.last = now;
    this.reduced = !!this.motionQuery?.matches;
    const reduced = this.reduced;

    // camera
    const k = 1 - Math.exp(-dt / (reduced ? 60 : 320));
    this.cam.x += (this.camTo.x - this.cam.x) * k;
    this.cam.y += (this.camTo.y - this.cam.y) * k;
    this.cam.s += (this.camTo.s - this.cam.s) * k;
    const b = this.breath;
    const bp = b.dur > 0 ? (now - b.t0) / b.dur : 1;
    const breath = bp > 0 && bp < 1 && !reduced ? b.amount * Math.sin(Math.PI * bp) : 0;
    this.view.x = this.cam.x;
    this.view.y = this.cam.y;
    this.view.s = this.cam.s * (1 - breath);
    this.spot.a += (this.spot.aTo - this.spot.a) * (1 - Math.exp(-dt / 380));

    // grains
    const kd = 1 - Math.exp(-dt / 260);
    for (const g of this.grains) {
      g.dim += (g.dimTo - g.dim) * kd;
      g.lift += (g.liftTo - g.lift) * kd;
      let tx = g.tx;
      let ty = g.ty;
      g.fade = 1;
      if (g.motion) {
        const m = motionPoint(g.motion, now);
        tx = m.x;
        ty = m.y;
        g.fade = m.fade;
      }
      if (g.moving) {
        const p = (now - g.t0) / g.dur;
        if (p <= 0) {
          g.x = g.sx;
          g.y = g.sy;
        } else if (p >= 1) {
          g.moving = false;
          g.x = tx;
          g.y = ty;
          g.a = g.a1;
          g.r = g.r1;
          g.color[0] = g.c1[0];
          g.color[1] = g.c1[1];
          g.color[2] = g.c1[2];
          g.fill = fillOf(g.color);
          if (g.next) {
            const n = g.next;
            g.next = null;
            this.frameNow = now;
            this.place(g, n.place, n.timing);
            this.frameNow = -1;
          }
        } else {
          const e = ease(g.ease, p);
          const u = 1 - e;
          let x = u * u * g.sx + 2 * u * e * g.cx + e * e * tx;
          let y = u * u * g.sy + 2 * u * e * g.cy + e * e * ty;
          if (g.spiral) {
            const th = g.pth0 + g.pdth * e;
            const rr = g.pr0 + (g.pr1 - g.pr0) * e;
            const w = e * e;
            x = (1 - w) * (g.px + Math.cos(th) * rr) + w * x;
            y = (1 - w) * (g.py + Math.sin(th) * rr) + w * y;
          }
          g.x = x;
          g.y = y;
          g.a = (g.a0 + (g.a1 - g.a0) * e) * (1 - g.dip * Math.sin(Math.PI * p));
          g.r = g.r0 + (g.r1 - g.r0) * e;
          if (!sameColor(g.c0, g.c1)) {
            const ce = clamp((e - 0.2) / 0.8, 0, 1);
            g.color[0] = g.c0[0] + (g.c1[0] - g.c0[0]) * ce;
            g.color[1] = g.c0[1] + (g.c1[1] - g.c0[1]) * ce;
            g.color[2] = g.c0[2] + (g.c1[2] - g.c0[2]) * ce;
            g.fill = fillOf(g.color);
          }
        }
      } else if (g.motion) {
        g.x = tx;
        g.y = ty;
      }
    }

    // render
    const { width: w, height: h } = this;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    this.layer?.drawUnder?.(ctx, now);
    const { x: cx, y: cy, s } = this.view;
    const ox = w / 2 - cx * s;
    const oy = h / 2 - cy * s;
    const rp = this.ripple;
    let ringR = -1;
    let ringFade = 0;
    if (rp.on) {
      const q = (now - rp.t0) / rp.dur;
      if (q >= 1 || reduced) rp.on = false;
      else if (q > 0) {
        ringR = rp.R * 1.25 * easeOutCubic(q);
        ringFade = 1 - q;
      }
    }
    const ringW = Math.max(rp.R * 0.12, 3);
    // Resting drift: a very slow breathing of the whole field (~11 s period), tiny amplitude.
    const t1 = now * 0.00057;
    const t2 = now * 0.00049;
    let fill = "";
    const notes = this.notes;
    const base = this.dpr;
    let rotated = false;
    notes?.begin(ctx, this.grains.length, now, dt, base, reduced);
    for (const g of this.grains) {
      let a = g.a * g.dim * g.fade;
      if (a < 0.01) continue;
      let gx = g.x;
      let gy = g.y;
      let gr = g.r;
      if (!reduced && !g.moving && !g.motion) {
        const amp = gr * 0.28;
        gx += Math.sin(t1 + g.jx * 3.1 + g.id * 0.37) * amp;
        gy += Math.cos(t2 + g.jy * 3.1 + g.id * 0.23) * amp;
        a *= 0.94 + 0.06 * Math.sin(t2 * 1.3 + g.id);
      }
      if (g.lift > 0.01 || g.lift < -0.01) {
        gy -= g.lift * (g.lift > 0 ? gr * 2.2 : gr * 0.6);
        if (g.lift > 0) {
          gr *= 1 + 0.2 * g.lift;
          a = Math.min(1, a * (1 + 0.3 * g.lift));
        }
      }
      if (ringR > 0) {
        const dx = gx - rp.x;
        const dy = gy - rp.y;
        const off = (Math.sqrt(dx * dx + dy * dy) - ringR) / ringW;
        if (off > -3 && off < 3) {
          const bump = Math.exp(-off * off) * ringFade;
          gr *= 1 + 0.25 * bump;
          a = Math.min(1, a + 0.25 * bump);
        }
      }
      const r = gr * s;
      const x = gx * s + ox;
      const y = gy * s + oy;
      const hw = notes ? notes.halfWidth(g, r) : 0;
      const reach = Math.max(r, hw);
      if (x < -reach || y < -reach || x > w + reach || y > h + reach) continue;
      if (g.fill !== fill) ctx.fillStyle = fill = g.fill;
      if (notes && hw >= MIN_HALF_WIDTH) {
        notes.draw(ctx, g, x, y, hw, a, s);
        rotated = true;
        continue;
      }
      if (rotated) {
        ctx.setTransform(base, 0, 0, base, 0, 0);
        rotated = false;
      }
      ctx.globalAlpha = a;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, TAU);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (rotated) ctx.setTransform(base, 0, 0, base, 0, 0);
    if (ringR > 0) this.drawRing(ctx, ringR, ringFade);
    if (this.spot.a > 0.01) this.drawSpot(ctx);
    this.drawSparks(ctx, now);
    this.layer?.drawOver?.(ctx, now);
  }

  /** One radial gradient over the whole view, cached while the spot stays put. */
  private drawSpot(ctx: CanvasRenderingContext2D): void {
    const sp = this.spot;
    let cache = this.spotGradient;
    if (!cache || cache.x !== sp.x || cache.y !== sp.y || cache.r !== sp.r) {
      const g = ctx.createRadialGradient(sp.x, sp.y, sp.r * 0.8, sp.x, sp.y, sp.r * 2.6);
      g.addColorStop(0, "rgba(11,13,18,0)");
      g.addColorStop(1, "rgba(11,13,18,0.82)");
      cache = this.spotGradient = { g, x: sp.x, y: sp.y, r: sp.r };
    }
    const grad = cache.g;
    const { x, y, s } = this.view;
    this.inWorld(ctx, () => {
      ctx.globalAlpha = sp.a;
      ctx.fillStyle = grad;
      ctx.fillRect(x - this.width / s, y - this.height / s, (2 * this.width) / s, (2 * this.height) / s);
      ctx.globalAlpha = 1;
    });
  }

  private drawRing(ctx: CanvasRenderingContext2D, R: number, fade: number): void {
    const rp = this.ripple;
    this.inWorld(ctx, (unit) => {
      ctx.globalAlpha = 0.32 * fade;
      ctx.strokeStyle = theme.paper;
      ctx.lineWidth = unit;
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, R, 0, TAU);
      ctx.stroke();
      ctx.globalAlpha = 1;
    });
  }

  private drawSparks(ctx: CanvasRenderingContext2D, now: number): void {
    for (const sp of this.sparks) {
      if (!sp.on) continue;
      const p = (now - sp.t0) / sp.dur;
      if (p >= 1) {
        sp.on = false;
        continue;
      }
      if (p <= 0) continue;
      const e = 0.5 - 0.5 * Math.cos(Math.PI * p);
      const u = 1 - e;
      const x = u * u * sp.sx + 2 * u * e * sp.cx + e * e * sp.ex;
      const y = u * u * sp.sy + 2 * u * e * sp.cy + e * e * sp.ey;
      ctx.globalAlpha = 0.9 * Math.min(1, p * 6) * Math.pow(1 - p, 0.8);
      ctx.fillStyle = sp.fill;
      ctx.beginPath();
      ctx.arc(x, y, sp.r * (1 - 0.5 * e), 0, TAU);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
}
