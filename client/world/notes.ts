import { theme } from "@/components/theme";
import type { Grain } from "./engine";

/**
 * Banknote look for the grain world: each unit (CHF 100) is drawn as a small stylised paper note instead of a dot.
 * Not a real banknote: only the block layout and palettes of the Swiss notes are echoed (a body colour, a deeper block
 * at the left, a band low across the middle, a pale strip at the right end). No text, numerals, artwork, cross,
 * globe, security patterns or signatures. Each unit colour maps to one note's palette so the meaning stays readable:
 * paper/neutral = the 100 (blue), amber spending = the 10 (yellow/orange), coral missing = the 20 (red),
 * green saved = the 50 (yellow-green). In-between colours (mid-flight) blend the palettes; colours far from every
 * anchor fall back to the same layout tinted in their own colour.
 * Each look is a small sprite cached per quantised colour (colours interpolate in flight) and drawn with drawImage;
 * below DETAIL_FROM half-width a simpler sprite (body + band) is used.
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
/** Below this half-width only the body and the band are drawn (simpler, crisper sprite). */
const DETAIL_FROM = 4;
const SPRITE_W = 64;
const SMALL_W = 16;
/** New sprites made per frame (a colour transition fills the cache over a few frames; misses draw a plain rect). */
const NEW_PER_FRAME = 24;
const MAX_SPRITES = 1536;
/** Colours within this RGB distance of an anchor colour blend towards that note's palette. */
const REACH = 110;
const hex = (h: string) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)] as const;
/** Note palettes, softened a little for the calm light stage: [body, deep block, band start, band end, strip]. */
type Palette = readonly (readonly number[])[];
const NOTES: readonly { at: readonly number[]; pal: Palette }[] = [
  // 100: blue body, deeper blue block, yellow-to-orange band, pale blue-white strip.
  { at: hex(theme.paper), pal: [[64, 136, 194], [40, 94, 150], [240, 184, 72], [232, 116, 60], [226, 235, 240]] },
  // 10: yellow/orange body, warm orange block and band ending grey-blue, pale cream strip.
  { at: hex(theme.spend), pal: [[238, 164, 36], [220, 112, 28], [242, 128, 44], [150, 162, 180], [250, 238, 206]] },
  // 20: red/coral body, deeper red block, pink-to-violet band, pale pink strip.
  { at: hex(theme.coral), pal: [[234, 94, 86], [204, 56, 60], [246, 168, 176], [150, 110, 190], [250, 228, 226]] },
  // 50: yellow-green body, deeper green block, pale green to red-orange band, pale green strip.
  { at: hex(theme.saved), pal: [[118, 178, 70], [64, 136, 72], [200, 230, 152], [232, 98, 60], [232, 242, 214]] }
];
const EDGE_STYLE = "rgba(11,13,18,0.3)";
/** Colours within this RGB distance of `theme.brand` (PostFinance yellow) get a teal edge, so yellow reads on white. */
const BRAND_REACH = 70;
const BRAND = [
  parseInt(theme.brand.slice(1, 3), 16),
  parseInt(theme.brand.slice(3, 5), 16),
  parseInt(theme.brand.slice(5, 7), 16)
] as const;

type Col = readonly number[];
const mixTo = (a: Col, b: Col, t: number, out: number[]) => {
  out[0] = a[0] + (b[0] - a[0]) * t;
  out[1] = a[1] + (b[1] - a[1]) * t;
  out[2] = a[2] + (b[2] - a[2]) * t;
  return out;
};
const css = (c: Col) => `rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})`;
const WHITE = [255, 255, 255] as const;
const BLACK = [0, 0, 0] as const;

/** One note sprite: block colours blended from the nearby notes' palettes, the rest the unit's own colour tinted. */
function paintNote(r: number, g: number, b: number, small: boolean): HTMLCanvasElement {
  const W = small ? SMALL_W : SPRITE_W;
  const H = W / 2;
  const cv = document.createElement("canvas");
  cv.width = W;
  cv.height = H;
  const x = cv.getContext("2d");
  if (!x) return cv;
  const c = [r, g, b];
  const w = NOTES.map((n) => Math.max(0, 1 - Math.sqrt((r - n.at[0]) ** 2 + (g - n.at[1]) ** 2 + (b - n.at[2]) ** 2) / REACH));
  const sum = w.reduce((a, v) => a + v, 0);
  if (sum > 1) for (let i = 0; i < w.length; i++) w[i] /= sum;
  const own = Math.max(0, 1 - sum);
  /** Colour of block `k`: the tinted fallback weighted by `own`, plus each palette by its weight. */
  const col = (tint: Col, k: number) => {
    const o = [tint[0] * own, tint[1] * own, tint[2] * own];
    for (let i = 0; i < NOTES.length; i++) {
      const pc = NOTES[i].pal[k];
      o[0] += pc[0] * w[i];
      o[1] += pc[1] * w[i];
      o[2] += pc[2] * w[i];
    }
    return css(o);
  };
  const t = [0, 0, 0];
  const db = Math.sqrt((r - BRAND[0]) ** 2 + (g - BRAND[1]) ** 2 + (b - BRAND[2]) ** 2);
  const q = Math.max(0, Math.min(1, 1 - db / BRAND_REACH));
  /** Teal (#004B5A) outline fading in near brand yellow; on the small sprite it is the only edge. */
  const brandEdge = (w: number) => {
    if (q <= 0) return;
    x.strokeStyle = `rgba(0,75,90,${(0.5 * q).toFixed(3)})`;
    x.lineWidth = w;
    x.strokeRect(w / 2, w / 2, W - w, H - w);
  };
  const block = (fill: string, x0: number, y0: number, x1: number, y1: number) => {
    x.fillStyle = fill;
    x.fillRect(x0 * W, y0 * H, (x1 - x0) * W, (y1 - y0) * H);
  };
  block(col(c, 0), 0, 0, 1, 1);
  if (small) {
    block(col(mixTo(c, WHITE, 0.4, t), 2), 0.34, 0.56, 0.78, 0.9);
    brandEdge(1);
    return cv;
  }
  block(col(mixTo(c, BLACK, 0.2, t), 1), 0, 0.56, 0.31, 1);
  const band = x.createLinearGradient(0.34 * W, 0, 0.78 * W, 0);
  band.addColorStop(0, col(mixTo(c, WHITE, 0.45, t), 2));
  band.addColorStop(1, col(mixTo(c, WHITE, 0.25, t), 3));
  x.fillStyle = band;
  x.fillRect(0.34 * W, 0.56 * H, 0.44 * W, 0.34 * H);
  block(col(mixTo(c, WHITE, 0.72, t), 4), 0.79, 0, 1, 1);
  x.strokeStyle = EDGE_STYLE;
  x.lineWidth = 1;
  x.strokeRect(0.5, 0.5, W - 1, H - 1);
  brandEdge(2);
  return cv;
}

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
  private sprites = new Map<number, HTMLCanvasElement>();
  private made = 0;

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
    this.made = 0;
    ctx.imageSmoothingEnabled = true;
  }

  /** Cached sprite for colour `c` (quantised to 5 bits per channel); null when this frame's budget is spent. */
  private sprite(c: Col, small: boolean): HTMLCanvasElement | null {
    const r = Math.max(0, Math.min(255, c[0])) >> 3;
    const g = Math.max(0, Math.min(255, c[1])) >> 3;
    const b = Math.max(0, Math.min(255, c[2])) >> 3;
    const key = ((r << 10) | (g << 5) | b) * 2 + (small ? 1 : 0);
    const hit = this.sprites.get(key);
    if (hit) return hit;
    if (this.made >= NEW_PER_FRAME || typeof document === "undefined") return null;
    this.made++;
    if (this.sprites.size >= MAX_SPRITES) this.sprites.clear();
    const img = paintNote((r << 3) + 4, (g << 3) + 4, (b << 3) + 4, small);
    this.sprites.set(key, img);
    return img;
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
      } else if (m?.kind === "orbit" || m?.kind === "wander") {
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
    const img = this.sprite(g.color, hw < DETAIL_FROM);
    if (img) ctx.drawImage(img, -hw, -hh, hw * 2, hh * 2);
    else ctx.fillRect(-hw, -hh, hw * 2, hh * 2);
  }
}

/** `?units=dots` keeps the old round grains (for comparison); banknotes are the default. */
export function wantsNotes(): boolean {
  if (typeof window === "undefined") return true;
  return new URLSearchParams(window.location.search).get("units") !== "dots";
}
