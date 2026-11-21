import type { Breakdown } from "@/lib/contracts";
import { swiss } from "@/components/format";
import { theme } from "@/components/theme";
import { noise, palette, type Box, type Grain, type Timing } from "../engine";
import { assignColumns, clusterRadius, columnGrid, largestRemainder, packClusters, phyllotaxis, pick, type ColumnGrid } from "../layout";
import { MONTHS, Scene, drawGhost, ghostFor, toMonth, type ApplyKind } from "./base";

type Part = { name: string; value: number; aliases?: string[]; count: number; x: number; y: number; r: number };
type Open = { month: number; parts: Part[]; c: number; region: Box };

/** 12 columns of spending grains (4 per row); a column can open into part clusters beside it. */
export class MonthlyScene extends Scene {
  readonly type = "monthly" as const;
  private columns: Grain[][] = [];
  private grid: ColumnGrid | null = null;
  private open: { b: Breakdown } | null = null;
  private opened: Open | null = null;
  private ghosts = new Map<number, number>();
  private openedAt = 0;
  /** Month whose parts the last layout showed (to tell a breakdown or a collapse from other updates). */
  private shownOpen: number | null = null;

  private get counts() {
    return this.env.facts.monthly_spending_jan_dec.map((v) => Math.max(0, Math.round(v / 100)));
  }

  targets() {
    const months: (string | number)[] = Array.from({ length: 12 }, (_, i) => i + 1);
    return this.open ? [...months, ...this.open.b.parts.map((p) => p.name)] : months;
  }

  openMonth() {
    return this.open?.b.month ?? null;
  }

  protected resolve(target: string | number) {
    if (this.open) {
      const part = pick(this.open.b.parts, target);
      if (part) return part.name;
    }
    return toMonth(target);
  }

  setFocus(target: string | number) {
    const key = this.resolve(target);
    if (key === null) return false;
    // Focusing another month closes the open column first.
    if (typeof key === "number" && this.open && this.open.b.month !== key) this.open = null;
    this.focusKey = key;
    return true;
  }

  clearFocus() {
    this.focusKey = null;
  }

  setBreakdown(b: Breakdown) {
    if (!toMonth(b.month) || !b.parts.length) return false;
    this.open = { b };
    this.openedAt = performance.now();
    if (typeof this.focusKey === "string") this.focusKey = b.month;
    return true;
  }

  clearBreakdown() {
    if (!this.open) return false;
    const month = this.open.b.month;
    this.open = null;
    if (typeof this.focusKey === "string") this.focusKey = month;
    return true;
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
    const maxRows = Math.ceil(Math.max(...counts) / 4);
    const grid = (this.grid = columnGrid(e.width, e.height, maxRows, 0));
    if (kind === "enter" || this.columns.length === 0) {
      const { columns, rest } = assignColumns(e.grains, counts);
      this.columns = columns;
      if (kind === "enter") this.park(rest);
    }
    const opened = (this.opened = this.open ? this.layoutOpen(grid) : null);
    const was = this.shownOpen;
    const openingNow = kind === "update" && opened !== null && opened.month !== was;
    const closing = kind === "update" && was !== null && opened?.month !== was ? was : null;
    this.shownOpen = opened?.month ?? null;
    const focusMonth = typeof this.focusKey === "number" ? this.focusKey : null;
    const focusPart = typeof this.focusKey === "string" ? this.focusKey : null;
    const r = grid.pitch * 0.38;
    const total = counts.reduce((a, b) => a + b, 0);
    let index = 0;

    this.columns.forEach((column, i) => {
      const month = i + 1;
      const isOpen = opened?.month === month;
      const look = opened ? { dim: isOpen ? 1 : 0.1, lift: 0 } : this.focal(focusMonth ? month === focusMonth : null);
      let part = 0;
      let inPart = 0;
      column.forEach((g, k) => {
        let pos = grid.slot(i, k, 1, g);
        let partLook = { dim: 1, lift: 0 };
        let gr = r;
        let t: Timing | null = null;
        if (isOpen && opened) {
          while (part < opened.parts.length - 1 && inPart >= opened.parts[part].count) {
            part++;
            inPart = 0;
          }
          const p = opened.parts[part];
          pos = phyllotaxis(inPart, opened.c, p.x, p.y);
          gr = opened.c * 0.4;
          partLook = this.focal(focusPart ? p.name === focusPart : null);
          // Breakdown: each part whirls in around its own centre, one part after another.
          if (openingNow) t = { dur: 1100 + 300 * noise(g.id, 51), delay: 150 * part + 9 * inPart, spiral: { x: p.x, y: p.y, turn: (part % 2 ? 1 : -1) * 1.2 }, ease: "inOutSine" };
          inPart++;
        } else if (closing === month) {
          // Collapse: a short rewind back into the column, top rows first.
          t = { dur: 760 + 200 * noise(g.id, 52), delay: 320 * (1 - k / Math.max(1, column.length)), bend: 0.05, ease: "outCubic" };
        }
        const slot = { order: (i + k / Math.max(1, column.length)) / 12, group: i, groups: 12, x: pos.x, y: pos.y, base: grid.baseY };
        e.place(g, { ...pos, color: palette.spend, alpha: 0.92, r: gr, dim: look.dim * partLook.dim, lift: look.lift + partLook.lift }, t ?? this.flight(kind, g, slot, index, total));
        index++;
      });
    });

    // camera
    if (opened) {
      const focused = focusPart ? opened.parts.find((p) => p.name === focusPart) : null;
      if (focused) {
        const span = focused.r * 2.6 + 30;
        this.focusCamera({ x: focused.x - span / 2, y: focused.y - span / 2, w: span, h: span + 14 }, { max: 2.6, min: 1.2 }, palette.spend);
      } else {
        // Frame the part clusters with their labels; the emptied column is only an outline now.
        const xs = opened.parts.flatMap((p) => [p.x - p.r, p.x + p.r]);
        const ys = opened.parts.flatMap((p) => [p.y - p.r, p.y + p.r + 20]);
        const box = { x: Math.min(...xs), y: Math.min(...ys), w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) };
        e.frame(box, { pad: 0.14, max: 2.6 });
      }
    } else if (focusMonth) {
      let box = grid.columnBox(focusMonth - 1, counts[focusMonth - 1], 1);
      box = { x: box.x - grid.colW * 0.6, y: box.y - 16, w: box.w + grid.colW * 1.2, h: box.h + 34 };
      if (this.ghosts.has(focusMonth)) box = union(box, this.ghostBox(grid, focusMonth));
      this.focusCamera(box, { min: 1.15, max: 2.6, pad: 0.1 }, palette.spend);
    } else {
      e.home();
    }
  }

  private layoutOpen(grid: ColumnGrid): Open {
    const e = this.engine;
    const b = this.open!.b;
    const month = b.month;
    const n = this.counts[month - 1];
    const counts = largestRemainder(
      b.parts.map((p) => p.value),
      n
    );
    const x = grid.colX(month - 1);
    const width = Math.min(e.width * 0.46, grid.colW * 6);
    const gap = grid.colW * 0.8;
    const left = month >= 7;
    const rx = Math.max(grid.margin, Math.min(e.width - grid.margin - width, left ? x - gap - width : x + gap));
    const region = { x: rx, y: grid.top + 4, w: width, h: grid.baseY - grid.top - 16 };
    const packed = packClusters(counts, region, { cMax: grid.pitch * 1.1, cMin: grid.pitch * 0.45, labelGap: 24 });
    return {
      month,
      region,
      c: packed.c,
      parts: b.parts.map((p, i) => ({ ...p, count: counts[i], x: packed.circles[i].x, y: packed.circles[i].y, r: packed.circles[i].r }))
    };
  }

  private ghostBox(grid: ColumnGrid, month: number): Box {
    const { x, y, R } = this.ghostSpot(grid, month);
    return { x: x - R, y: y - R - 16, w: 2 * R, h: 2 * R + 16 };
  }

  private ghostSpot(grid: ColumnGrid, month: number) {
    const { n, text } = ghostFor(this.env.facts, month);
    const c = grid.pitch;
    const R = clusterRadius(n, c) + c;
    const col = grid.columnBox(month - 1, this.counts[month - 1], 1);
    let x = grid.colX(month - 1);
    let y = col.y - R - grid.pitch * 0.6;
    if (y - R - 14 < grid.top) {
      // No room above: sit beside the column instead.
      y = Math.max(grid.top + R + 14, col.y + R);
      x += (month >= 7 ? -1 : 1) * (2 * grid.pitch + R + grid.pitch);
    }
    return { x, y, R, n, c, text };
  }

  drawUnder(ctx: CanvasRenderingContext2D, now: number) {
    const grid = this.grid;
    const opened = this.opened;
    if (!grid || !opened) return;
    // Dashed outline where the open column was.
    const box = grid.columnBox(opened.month - 1, this.counts[opened.month - 1], 1);
    const alpha = Math.min(1, (now - this.openedAt) / 600) * 0.8;
    this.engine.inWorld(ctx, (unit) => {
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = theme.faint;
      ctx.lineWidth = unit;
      ctx.setLineDash([3 * unit, 3 * unit]);
      const pad = grid.pitch * 0.3;
      roundRect(ctx, box.x - pad, box.y - pad, box.w + pad * 2, box.h + pad, grid.pitch * 0.8);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    });
  }

  drawOver(ctx: CanvasRenderingContext2D, now: number) {
    const grid = this.grid;
    if (!grid) return;
    const e = this.engine;
    const spending = this.env.facts.monthly_spending_jan_dec;
    const opened = this.opened;
    const focusMonth = typeof this.focusKey === "number" ? this.focusKey : opened?.month ?? null;
    const short = grid.colW * e.cam.s < 26;
    for (let i = 0; i < 12; i++) {
      const month = i + 1;
      const hit = month === focusMonth;
      const faded = (opened && !hit) || (focusMonth && !hit) ? 0.45 : 1;
      const name = short ? MONTHS[i][0] : MONTHS[i].slice(0, 3);
      const a = this.labelAt(now, i, 12);
      e.label(ctx, name, grid.colX(i), grid.baseY, { color: hit ? theme.paper : theme.faint, alpha: a * faded, dy: 13, weight: hit ? 600 : 400 });
    }
    if (focusMonth && !opened) {
      const col = grid.columnBox(focusMonth - 1, this.counts[focusMonth - 1], 1);
      e.label(ctx, swiss(spending[focusMonth - 1]), grid.colX(focusMonth - 1), col.y, { color: theme.paper, alpha: this.changeAlpha(now, -500), dy: -6, weight: 600 });
    }
    if (opened) {
      const pa = Math.min(1, Math.max(0, (now - this.openedAt - (this.engine.reduced ? 300 : 1400)) / 450));
      const focusPart = typeof this.focusKey === "string" ? this.focusKey : null;
      for (const p of opened.parts) {
        const dim = focusPart && p.name !== focusPart ? 0.4 : 1;
        const strong = p.name === focusPart;
        e.label(ctx, p.name, p.x, p.y + p.r, { color: strong ? theme.paper : "#a9afbd", alpha: pa * dim, dy: 12, weight: strong ? 600 : 400 });
        e.label(ctx, swiss(p.value), p.x, p.y + p.r, { color: theme.faint, alpha: pa * dim, dy: 25, size: 10 });
      }
    }
    for (const [month, at] of this.ghosts) {
      const spot = this.ghostSpot(grid, month);
      drawGhost(e, ctx, spot.x, spot.y, spot.n, spot.c, now - at, spot.text, opened && opened.month !== month ? 0.2 : 1);
    }
  }
}

function union(a: Box, b: Box): Box {
  const x = Math.min(a.x, b.x);
  const y = Math.min(a.y, b.y);
  return { x, y, w: Math.max(a.x + a.w, b.x + b.w) - x, h: Math.max(a.y + a.h, b.y + b.h) - y };
}

export function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

export { union };
