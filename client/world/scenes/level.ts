import { swiss } from "@/components/format";
import { theme } from "@/components/theme";
import { palette, type Grain } from "../engine";
import { assignColumns, clusterRadius, columnGrid, phyllotaxis, type ColumnGrid } from "../layout";
import { MONTHS, Scene, drawGhost, ghostFor, timing, toMonth, type ApplyKind } from "./base";
import { union } from "./monthly";

/** Month-end balance vs 1 January: green above the line, coral below; December's 13th salary in paper colour. */
export class LevelScene extends Scene {
  readonly type = "level" as const;
  private columns: Grain[][] = [];
  private grid: ColumnGrid | null = null;
  private ghosts = new Map<number, number>();
  private thirteenth: { x: number; y: number; c: number; n: number } | null = null;

  private get values() {
    return this.env.facts.month_end_balance_vs_start_jan_dec;
  }
  private get counts() {
    return this.values.map((v) => Math.round(Math.abs(v) / 100));
  }
  /** Grains of December that are the 13th salary (the rest is what is left without it). */
  private get paperCount() {
    const dec = this.counts[11];
    return this.values[11] > 0 ? Math.max(0, dec - Math.max(0, Math.round(this.env.facts.without_13th_salary / 100))) : 0;
  }

  targets() {
    return [...Array.from({ length: 12 }, (_, i) => i + 1), "13"];
  }

  protected resolve(target: string | number) {
    const t = String(target).trim().toLowerCase();
    if (t === "13" || t.includes("13th") || t.includes("thirteenth")) return "13";
    return toMonth(target);
  }

  setGhost(target: string | number) {
    const month = toMonth(target);
    if (!month) return false;
    this.ghosts.set(month, performance.now());
    return true;
  }

  protected layout(kind: ApplyKind) {
    const e = this.engine;
    const counts = this.counts;
    const up = Math.max(1, ...counts.filter((_, i) => this.values[i] > 0).map((n) => Math.ceil(n / 4)));
    const down = Math.max(1, ...counts.filter((_, i) => this.values[i] < 0).map((n) => Math.ceil(n / 4)));
    const grid = (this.grid = columnGrid(e.width, e.height, up, down));
    if (kind === "enter" || this.columns.length === 0) {
      const { columns, rest } = assignColumns(e.grains, counts);
      this.columns = columns;
      if (kind === "enter") this.park(rest);
    }
    const focus = this.focusKey;
    const out = focus === "13";
    const paper = this.paperCount;
    const green = counts[11] - paper;
    const c = grid.pitch;
    // Where the 13th salary flies to: the empty space above the line over the autumn months.
    this.thirteenth = { x: grid.colX(9), y: grid.baseY - Math.max(clusterRadius(paper, c) + 8, (up * grid.pitch) / 2), c, n: paper };
    const r = grid.pitch * 0.38;
    const total = counts.reduce((a, b) => a + b, 0);
    let index = 0;
    this.columns.forEach((column, i) => {
      const value = this.values[i];
      const dir = value >= 0 ? 1 : -1;
      const month = i + 1;
      const dim = typeof focus === "number" ? (month === focus ? 1 : 0.32) : out ? (month === 12 ? 1 : 0.32) : 1;
      column.forEach((g, k) => {
        const isPaper = month === 12 && k >= green;
        let pos = grid.slot(i, k, dir, g);
        if (isPaper && out) pos = phyllotaxis(k - green, c, this.thirteenth!.x, this.thirteenth!.y);
        const color = isPaper ? palette.paper : dir > 0 ? palette.saved : palette.coral;
        e.place(g, { ...pos, color, alpha: 0.92, r, dim }, timing(kind, g, index++, total));
      });
    });

    if (typeof focus === "number") {
      const n = counts[focus - 1];
      const dir = this.values[focus - 1] >= 0 ? 1 : -1;
      const box = grid.columnBox(focus - 1, n, dir);
      let framed = { x: box.x - grid.colW * 0.6, y: box.y - 18, w: box.w + grid.colW * 1.2, h: box.h + 36 };
      if (this.ghosts.has(focus)) framed = union(framed, this.ghostBox(grid, focus));
      e.frame(framed, { min: 1.15, max: 2.6 });
    } else if (out && this.thirteenth) {
      const dec = grid.columnBox(11, counts[11], 1);
      const R = clusterRadius(paper, c);
      const t = this.thirteenth;
      e.frame(union(dec, { x: t.x - R, y: t.y - R - 18, w: 2 * R, h: 2 * R + 36 }), { pad: 0.1 });
    } else {
      e.home();
    }
  }

  private ghostSpot(grid: ColumnGrid, month: number) {
    const { n, text } = ghostFor(this.env.facts, month);
    const c = grid.pitch;
    const R = clusterRadius(n, c) + c;
    const dir = this.values[month - 1] >= 0 ? 1 : -1;
    const box = grid.columnBox(month - 1, this.counts[month - 1], dir);
    const y = dir > 0 ? box.y - R - c : box.y + box.h + R + c;
    return { x: grid.colX(month - 1), y, R, n, c, text };
  }

  private ghostBox(grid: ColumnGrid, month: number) {
    const s = this.ghostSpot(grid, month);
    return { x: s.x - s.R, y: s.y - s.R - 16, w: 2 * s.R, h: 2 * s.R + 16 };
  }

  drawUnder(ctx: CanvasRenderingContext2D) {
    const grid = this.grid;
    if (!grid) return;
    const e = this.engine;
    e.inWorld(ctx, (unit) => {
      ctx.globalAlpha = 0.6;
      ctx.strokeStyle = theme.faint;
      ctx.lineWidth = unit;
      ctx.beginPath();
      ctx.moveTo(grid.margin * 0.5, grid.baseY);
      ctx.lineTo(e.width - grid.margin * 0.5, grid.baseY);
      ctx.stroke();
      ctx.globalAlpha = 1;
    });
  }

  drawOver(ctx: CanvasRenderingContext2D, now: number) {
    const grid = this.grid;
    if (!grid) return;
    const e = this.engine;
    const a = this.labelAlpha(now);
    const focus = this.focusKey;
    const focusMonth = typeof focus === "number" ? focus : focus === "13" ? 12 : null;
    const short = grid.colW * e.cam.s < 26;
    e.label(ctx, "Start of year", grid.margin * 0.5, grid.baseY, { alpha: a * 0.9, dy: 13, align: "left", size: 10 });
    for (let i = 0; i < 12; i++) {
      const month = i + 1;
      const hit = month === focusMonth;
      const name = short ? MONTHS[i][0] : MONTHS[i].slice(0, 3);
      e.label(ctx, name, grid.colX(i), grid.labelY, { color: hit ? theme.paper : theme.faint, alpha: a * (focusMonth && !hit ? 0.45 : 1), weight: hit ? 600 : 400 });
    }
    if (typeof focus === "number") {
      const value = this.values[focus - 1];
      const dir = value >= 0 ? 1 : -1;
      const box = grid.columnBox(focus - 1, this.counts[focus - 1], dir);
      const y = dir > 0 ? box.y : box.y + box.h;
      e.label(ctx, swiss(value), grid.colX(focus - 1), y, { color: value < 0 ? theme.coral : theme.saved, alpha: this.changeAlpha(now, -500), dy: dir > 0 ? -6 : 14, weight: 600 });
    }
    if (focus === "13" && this.thirteenth) {
      const t = this.thirteenth;
      const R = clusterRadius(t.n, t.c);
      const salary = this.values[11] - this.env.facts.without_13th_salary;
      const ta = this.changeAlpha(now);
      e.label(ctx, "13th salary", t.x, t.y + R, { color: theme.paper, alpha: ta, dy: 13, weight: 600 });
      e.label(ctx, swiss(salary), t.x, t.y + R, { alpha: ta, dy: 26, size: 10 });
    }
    for (const [month, at] of this.ghosts) {
      const s = this.ghostSpot(grid, month);
      drawGhost(e, ctx, s.x, s.y, s.n, s.c, Math.min(1, Math.max(0, (now - at) / 700)), s.text);
    }
  }
}
