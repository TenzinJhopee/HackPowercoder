import { swiss } from "@/components/format";
import { theme } from "@/components/theme";
import { palette, type Grain } from "../engine";
import { packClusters, phyllotaxis, pick } from "../layout";
import { Scene, type ApplyKind } from "./base";

type Pool = { name: string; value: number; saved: boolean; grains: Grain[]; x: number; y: number; r: number };

/** One organic cluster per category, packed; "Left over" is green. */
export class PoolsScene extends Scene {
  readonly type = "pools" as const;
  private pools: Pool[] = [];

  targets() {
    return this.env.categories.map((c) => c.name);
  }

  protected resolve(target: string | number) {
    return pick(this.env.categories, target)?.name ?? null;
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
    this.pools.forEach((pool, gi) => {
      const look = this.focal(this.focusKey ? this.focusKey === pool.name : null);
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
    if (focused) {
      const span = focused.r * 2.4 + 24;
      this.focusCamera({ x: focused.x - span / 2, y: focused.y - span / 2, w: span, h: span + 20 }, { min: 1.2, max: 2.6 }, focused.saved ? palette.saved : palette.spend);
    } else e.home();
  }

  private rank = new Map<number, number>();

  drawOver(ctx: CanvasRenderingContext2D, now: number) {
    const e = this.engine;
    this.pools.forEach((p, i) => {
      const a = this.labelAt(now, i, this.pools.length);
      const hit = p.name === this.focusKey;
      if (!hit && p.grains.length < 10) return;
      const dim = this.focusKey && !hit ? 0.4 : 1;
      e.label(ctx, p.name, p.x, p.y + p.r, { color: hit ? theme.paper : p.saved ? theme.saved : theme.soft, alpha: a * dim, dy: 12, weight: hit ? 600 : 400 });
      if (hit || e.cam.s < 1.1) e.label(ctx, swiss(p.value), p.x, p.y + p.r, { color: theme.faint, alpha: a * dim, dy: 24, size: 10 });
    });
  }
}
