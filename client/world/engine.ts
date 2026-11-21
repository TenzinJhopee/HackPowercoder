import { theme } from "@/components/theme";

/**
 * Grain engine (docs/IMPLEMENTATION_PLAN.md 6.1). One canvas, a fixed set of grains (one per CHF 100) and a camera.
 * Scenes never create or delete grains: they only `place` them, so every scene change is the same grains moving.
 * World coordinates are CSS pixels of the canvas at zoom 1 with the camera centred on the canvas.
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

export const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

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
  motion: Motion | null;
};

export type Place = { x: number; y: number; color?: RGB; alpha?: number; r?: number; dim?: number; motion?: Motion | null };
export type Timing = { dur: number; delay?: number; bend?: number };
export type Box = { x: number; y: number; w: number; h: number };

export interface SceneLayer {
  drawUnder?(ctx: CanvasRenderingContext2D, now: number): void;
  drawOver?(ctx: CanvasRenderingContext2D, now: number): void;
}

const near = (a: number, b: number) => Math.abs(a - b) < 0.5;
const sameColor = (a: RGB, b: RGB) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
const fillOf = (c: readonly number[]) => `rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})`;

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

export class Engine {
  grains: Grain[] = [];
  width = 0;
  height = 0;
  cam = { x: 0, y: 0, s: 1 };
  camTo = { x: 0, y: 0, s: 1 };
  layer: SceneLayer | null = null;
  reduced = false;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private raf = 0;
  private dpr = 1;
  private last = 0;
  private motionQuery: MediaQueryList | null = null;

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
        motion: null
      };
    });
  }

  attach(canvas: HTMLCanvasElement): void {
    if (this.canvas === canvas && this.raf) return;
    this.detach();
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.motionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)") ?? null;
    this.reduced = !!this.motionQuery?.matches;
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
      for (const g of this.grains) {
        g.x = g.sx = g.tx = noise(g.id, 1) * width;
        g.y = g.sy = g.ty = noise(g.id, 2) * height;
      }
    }
    return changed;
  }

  /** Moves a grain from wherever it is now (mid-flight included) along a quadratic bezier. No-op if already headed there. */
  place(g: Grain, p: Place, t: Timing): void {
    const color = p.color ?? g.c1;
    const alpha = p.alpha ?? g.a1;
    const r = p.r ?? g.r1;
    if (p.dim !== undefined) g.dimTo = p.dim;
    const motion = p.motion ?? null;
    const keepMotion = sameMotion(g.motion, motion);
    const samePos = keepMotion && (motion !== null || (near(g.tx, p.x) && near(g.ty, p.y)));
    if (samePos && sameColor(g.c1, color) && Math.abs(g.a1 - alpha) < 0.01 && Math.abs(g.r1 - r) < 0.02) return;
    const now = performance.now();
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
    const bend = (t.bend ?? 0.22) * (noise(g.id, 100 + g.flights) * 2 - 1);
    const dx = p.x - g.x;
    const dy = p.y - g.y;
    g.cx = (g.x + p.x) / 2 - dy * bend;
    g.cy = (g.y + p.y) / 2 + dx * bend;
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

  /** Fit a world box into the view. */
  frame(box: Box, opts: { min?: number; max?: number; pad?: number } = {}): void {
    const pad = opts.pad ?? 0.12;
    const s = Math.min((this.width * (1 - pad)) / Math.max(box.w, 1), (this.height * (1 - pad)) / Math.max(box.h, 1));
    this.lookAt(box.x + box.w / 2, box.y + box.h / 2, clamp(s, opts.min ?? 1, opts.max ?? 2.6));
  }

  home(): void {
    this.lookAt(this.width / 2, this.height / 2, 1);
  }

  toScreen(x: number, y: number): [number, number] {
    const { x: cx, y: cy, s } = this.cam;
    return [(x - cx) * s + this.width / 2, (y - cy) * s + this.height / 2];
  }

  /** Draw in world coordinates; `unit` is one screen pixel in world units (for line widths and dashes). */
  inWorld(ctx: CanvasRenderingContext2D, draw: (unit: number) => void): void {
    const { x, y, s } = this.cam;
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

  private tick(now: number): void {
    const ctx = this.ctx;
    if (!ctx || !this.width) return;
    const dt = Math.min(64, now - this.last);
    this.last = now;
    this.reduced = !!this.motionQuery?.matches;

    // camera
    const k = 1 - Math.exp(-dt / (this.reduced ? 60 : 320));
    this.cam.x += (this.camTo.x - this.cam.x) * k;
    this.cam.y += (this.camTo.y - this.cam.y) * k;
    this.cam.s += (this.camTo.s - this.cam.s) * k;

    // grains
    const kd = 1 - Math.exp(-dt / 260);
    for (const g of this.grains) {
      g.dim += (g.dimTo - g.dim) * kd;
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
        } else {
          const e = easeInOutCubic(p);
          const u = 1 - e;
          g.x = u * u * g.sx + 2 * u * e * g.cx + e * e * tx;
          g.y = u * u * g.sy + 2 * u * e * g.cy + e * e * ty;
          g.a = g.a0 + (g.a1 - g.a0) * e;
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
    const { x: cx, y: cy, s } = this.cam;
    const ox = w / 2 - cx * s;
    const oy = h / 2 - cy * s;
    let fill = "";
    for (const g of this.grains) {
      const a = g.a * g.dim * g.fade;
      if (a < 0.01) continue;
      const r = g.r * s;
      const x = g.x * s + ox;
      const y = g.y * s + oy;
      if (x < -r || y < -r || x > w + r || y > h + r) continue;
      if (g.fill !== fill) ctx.fillStyle = fill = g.fill;
      ctx.globalAlpha = a;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    this.layer?.drawOver?.(ctx, now);
  }
}
