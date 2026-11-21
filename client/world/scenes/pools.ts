import { swiss } from "@/components/format";
import { theme } from "@/components/theme";
import { palette, type Grain } from "../engine";
import { packClusters, phyllotaxis, pick } from "../layout";
import { Scene, type ApplyKind } from "./base";

type Pool = { name: string; value: number; saved: boolean; grains: Grain[]; x: number; y: number; r: number };

/** How much choice she has over spending (fixed = compulsory, adjustable = reducible, flexible = discretionary). */
export const NECESSITY_KEYS = ["Fixed", "Adjustable", "Flexible"] as const;
export type NecessityKey = (typeof NECESSITY_KEYS)[number];

/** Which necessity each spending group belongs to, and the monthly amount per necessity (from /api/facts). */
export type NecessityData = { groups: Record<string, NecessityKey>; monthly: Record<NecessityKey, number> };

/** "fixed", "Fixed costs" -> "Fixed"; else null. */
export function toNecessity(target: string | number): NecessityKey | null {
  if (typeof target !== "string") return null;
  const t = target.trim().toLowerCase();
  return NECESSITY_KEYS.find((k) => t === k.toLowerCase() || t === `${k.toLowerCase()} costs`) ?? null;
}

/** Gathering of the lit groups toward their common centre (fraction of the distance). */
const GATHER = 0.14;

/** One organic cluster per category, packed; "Left over" is green. */
export class PoolsScene extends Scene {
  readonly type = "pools" as const;
  private pools: Pool[] = [];
  private necessity: NecessityData | null = null;
  private lit: { x: number; y: number; w: number; h: number } | null = null;

  /** Set by the world once /api/facts has loaded; without it the necessity targets are unknown. */
  setNecessityData(data: NecessityData | null): void {
    this.necessity = data;
  }

  targets() {
    return [...this.env.categories.map((c) => c.name), ...(this.necessity ? NECESSITY_KEYS : [])];
  }

  protected resolve(target: string | number) {
    const necessity = toNecessity(target);
    if (necessity) return this.necessity ? necessity : null;
    return pick(this.env.categories, target)?.name ?? null;
  }

  /** True when the pool is lit by the current focus (its group, or every group of the focused necessity). */
  private isHit(pool: Pool): boolean {
    const key = this.focusKey;
    if (key === null) return false;
    const necessity = toNecessity(key);
    return necessity ? this.necessity?.groups[pool.name] === necessity : pool.name === key;
  }

  protected layout(kind: ApplyKind) {
    const e = this.engine;
    const cats = this.env.categories;
    const byCat = cats.map(() => [] as Grain[]);
    for (const g of e.grains) byCat[g.category]?.push(g);
    const margin = 10;
    const region = { x: margin, y: margin, w: e.width - margin * 2, h: e.height - margin * 2 };
    const short = Math.min(e.width, e.height);
    const packed = packClusters(
      byCat.map((list) => list.length),
      region,
      { cMax: short * 0.03, cMin: short * 0.012, labelGap: 16 }
    );
    const c = packed.c;
    this.pools = cats.map((cat, i) => ({ name: cat.name, value: cat.value, saved: cat.saved, grains: byCat[i], ...packed.circles[i] }));
    const total = e.grains.length;
    let index = 0;
    const groups = this.pools.length;
    // A necessity focus: the lit groups gather slightly toward each other.
    this.lit = null;
    const lit = this.focusKey !== null && toNecessity(this.focusKey) ? this.pools.filter((p) => this.isHit(p)) : [];
    if (lit.length) {
      const mx = lit.reduce((sum, p) => sum + p.x, 0) / lit.length;
      const my = lit.reduce((sum, p) => sum + p.y, 0) / lit.length;
      for (const p of lit) {
        p.x += (mx - p.x) * GATHER;
        p.y += (my - p.y) * GATHER;
      }
      const x0 = Math.min(...lit.map((p) => p.x - p.r));
      const y0 = Math.min(...lit.map((p) => p.y - p.r));
      this.lit = { x: x0, y: y0, w: Math.max(...lit.map((p) => p.x + p.r)) - x0, h: Math.max(...lit.map((p) => p.y + p.r)) - y0 };
    }
    this.pools.forEach((pool, gi) => {
      const look = this.focal(this.focusKey !== null ? this.isHit(pool) : null);
      // Nearest grains take the inner positions of their cluster (stable on update/resize: same order).
      if (kind === "enter") pool.grains.sort((a, b) => Math.hypot(a.x - pool.x, a.y - pool.y) - Math.hypot(b.x - pool.x, b.y - pool.y) || a.id - b.id);
      else pool.grains.sort((a, b) => (this.rank.get(a.id) ?? 0) - (this.rank.get(b.id) ?? 0));
      const n = pool.grains.length;
      pool.grains.forEach((g, k) => {
        this.rank.set(g.id, k);
        const p = phyllotaxis(k, c, pool.x, pool.y);
        const slot = { order: (gi + k / Math.max(1, n)) / groups, group: gi, groups, x: p.x, y: p.y, cx: pool.x, cy: pool.y };
        e.place(g, { ...p, color: pool.saved ? palette.saved : palette.spend, alpha: 0.9, r: c * 0.4, ...look }, this.flight(kind, g, slot, index++, total));
      });
    });
    const focused = this.pools.find((p) => p.name === this.focusKey);
    if (this.lit) {
      const box = { x: this.lit.x - 12, y: this.lit.y - 28, w: this.lit.w + 24, h: this.lit.h + 52 };
      this.focusCamera(box, { min: 1, max: 1.8 }, palette.spend);
    } else if (focused) {
      const span = focused.r * 2.4 + 24;
      this.focusCamera({ x: focused.x - span / 2, y: focused.y - span / 2, w: span, h: span + 20 }, { min: 1.2, max: 2.6 }, focused.saved ? palette.saved : palette.spend);
    } else e.home();
  }

  private rank = new Map<number, number>();

  drawOver(ctx: CanvasRenderingContext2D, now: number) {
    const e = this.engine;
    this.pools.forEach((p, i) => {
      const a = this.labelAt(now, i, this.pools.length);
      const hit = this.isHit(p);
      if (!hit && p.grains.length < 10) return;
      const dim = this.focusKey !== null && !hit ? 0.4 : 1;
      e.label(ctx, p.name, p.x, p.y + p.r, { color: hit ? theme.paper : p.saved ? theme.saved : theme.soft, alpha: a * dim, dy: 12, weight: hit ? 600 : 400 });
      if (hit || e.cam.s < 1.1) e.label(ctx, swiss(p.value), p.x, p.y + p.r, { color: theme.faint, alpha: a * dim, dy: 24, size: 10 });
    });
    const necessity = this.focusKey !== null ? toNecessity(this.focusKey) : null;
    if (necessity && this.lit && this.necessity) {
      const text = `${necessity} · ${swiss(Math.round(this.necessity.monthly[necessity]))} / month`;
      e.label(ctx, text, this.lit.x + this.lit.w / 2, this.lit.y, { color: theme.paper, alpha: this.changeAlpha(now), dy: -10, size: 13, weight: 600 });
    }
  }
}
