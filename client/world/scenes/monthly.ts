import type { Breakdown } from "@/lib/contracts";
import { swiss } from "@/components/format";
import { theme } from "@/components/theme";
import { clamp, noise, palette, type Box, type Grain, type RGB, type Timing } from "../engine";
import { assignColumns, clusterRadius, columnGrid, packClusters, phyllotaxis, pick, type ColumnGrid } from "../layout";
import { orderParts, partsFromCategories, segment, type Segment, type SegmentSource } from "../segments";
import { MONTHS, Scene, drawGhost, ghostFor, toMonth, type ApplyKind } from "./base";

type Part = Segment & { x: number; y: number; r: number };
type Open = { month: number; parts: Part[]; c: number; region: Box };
type Seg = Segment & { box: Box };
/** A focused column split into coloured segments: slot k of the column → position and segment index. */
type Split = { month: number; segs: Seg[]; pos: { x: number; y: number; s: number }[]; top: number };

/**
 * 12 columns of spending grains (4 per row). A focused month splits its column into coloured segments (its parts,
 * largest at the bottom); a breakdown slides those segments out into part clusters beside it, keeping their colours.
 */
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
  /** Month whose column shows its composition (set by focusing a month, kept while one of its parts is focused). */
  private segMonth: number | null = null;
  private shownSplit: number | null = null;
  private split: Split | null = null;
  private splitAt = 0;

  private get counts() {
    return this.env.facts.monthly_spending_jan_dec.map((v) => Math.max(0, Math.round(v / 100)));
  }

  /** The parts a month's column is made of (the open breakdown's when it is that month). */
  private partsOf(month: number): SegmentSource[] {
    if (this.open?.b.month === month) return orderParts(this.open.b.parts);
    const f = this.env.facts;
    const parts = f.monthly_breakdown_parts?.[String(month)];
    if (parts?.length) return orderParts(parts);
    const cats = f.monthly_breakdown_by_category?.[String(month)];
    return cats ? partsFromCategories(cats) : [];
  }

  /** Parts the focus can name right now: the open breakdown's, else the split column's. */
  private namedParts(): SegmentSource[] | null {
    if (this.open) return this.open.b.parts;
    return this.segMonth ? this.partsOf(this.segMonth) : null;
  }

  targets() {
    const months: (string | number)[] = Array.from({ length: 12 }, (_, i) => i + 1);
    return [...months, ...(this.namedParts() ?? []).map((p) => p.name)];
  }

  openMonth() {
    return this.open?.b.month ?? null;
  }

  protected resolve(target: string | number) {
    const parts = this.namedParts();
    if (parts) {
      const part = pick(parts, target);
      if (part) return part.name;
    }
    return toMonth(target);
  }

  setFocus(target: string | number) {
    const key = this.resolve(target);
    if (key === null) return false;
    if (typeof key === "number") {
      // Focusing another month closes the open column first.
      if (this.open && this.open.b.month !== key) this.open = null;
      this.segMonth = key;
    }
    this.focusKey = key;
    return true;
  }

  clearFocus() {
    this.focusKey = null;
    this.segMonth = this.open?.b.month ?? null;
  }

  setBreakdown(b: Breakdown) {
    if (!toMonth(b.month) || !b.parts.length) return false;
    this.open = { b };
    this.openedAt = performance.now();
    this.segMonth = b.month;
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
    // The composition shows in the column while its month is focused and not opened into clusters.
    const splitMonth = opened ? null : this.segMonth;
    const split = (this.split = splitMonth ? this.layoutSplit(grid, splitMonth) : null);
    const wasSplit = this.shownSplit;
    this.shownSplit = splitMonth;
    const splitting = kind === "update" && splitMonth !== null && wasSplit !== splitMonth && closing !== splitMonth;
    const unsplit = kind === "update" && wasSplit !== null && wasSplit !== splitMonth && opened?.month !== wasSplit ? wasSplit : null;
    if (splitting || (split && closing === splitMonth) || (split && this.splitAt === 0)) this.splitAt = performance.now();
    const colFocus = opened?.month ?? splitMonth;
    const focusPart = typeof this.focusKey === "string" ? this.focusKey : null;
    const r = grid.pitch * 0.38;
    const total = counts.reduce((a, b) => a + b, 0);
    let index = 0;

    this.columns.forEach((column, i) => {
      const month = i + 1;
      const isOpen = opened?.month === month;
      const isSplit = split?.month === month;
      const look = opened ? { dim: isOpen ? 1 : 0.1, lift: 0 } : this.focal(colFocus ? month === colFocus : null);
      let part = 0;
      let inPart = 0;
      column.forEach((g, k) => {
        let pos = grid.slot(i, k, 1, g);
        let grainLook = look;
        let color: RGB = palette.spend;
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
          color = p.color;
          grainLook = this.focal(focusPart ? p.name === focusPart : null);
          // Breakdown: each segment slides out and whirls in around its part's centre, one part after another.
          if (openingNow) t = { dur: 1100 + 300 * noise(g.id, 51), delay: 150 * part + 9 * inPart, spiral: { x: p.x, y: p.y, turn: (part % 2 ? 1 : -1) * 1.2 }, ease: "inOutSine" };
          inPart++;
        } else if (isSplit && split) {
          const at = split.pos[k];
          const seg = split.segs[at.s];
          pos = { x: at.x + g.jx * grid.pitch * 0.09, y: at.y + g.jy * grid.pitch * 0.09 };
          color = seg.color;
          if (focusPart) grainLook = this.focal(seg.name === focusPart);
          // The bar shows what it is made of: segment by segment, bottom up, each swaying out to one side and back.
          if (splitting) {
            const side = at.s % 2 ? 1 : -1;
            t = {
              dur: 850 + 220 * noise(g.id, 53),
              delay: 170 * at.s + 12 * Math.floor(k / 4),
              via: { x: pos.x + side * grid.pitch * 2.4, y: (g.y + pos.y) / 2 },
              ease: "inOutSine"
            };
          }
        }
        if (!t && closing === month) {
          // Collapse: a short rewind back into the column (still coloured while the month is focused), top rows first.
          t = { dur: 760 + 200 * noise(g.id, 52), delay: 320 * (1 - k / Math.max(1, column.length)), bend: 0.05, ease: "outCubic" };
        } else if (!t && unsplit === month) {
          // Back to plain amber: top rows first, a gentle settle.
          t = { dur: 800 + 160 * noise(g.id, 54), delay: 280 * (1 - k / Math.max(1, column.length)), bend: 0.06, ease: "inOutCubic" };
        }
        const slot = { order: (i + k / Math.max(1, column.length)) / 12, group: i, groups: 12, x: pos.x, y: pos.y, base: grid.baseY };
        e.place(g, { ...pos, color, alpha: 0.92, r: gr, ...grainLook }, t ?? this.flight(kind, g, slot, index, total));
        index++;
      });
    });

    // camera
    if (opened) {
      const focused = focusPart ? opened.parts.find((p) => p.name === focusPart) : null;
      if (focused) {
        const span = focused.r * 2.6 + 30;
        this.focusCamera({ x: focused.x - span / 2, y: focused.y - span / 2, w: span, h: span + 14 }, { max: 2.6, min: 1.2 }, focused.color);
      } else {
        // Frame the part clusters with their labels; the emptied column is only an outline now.
        const xs = opened.parts.flatMap((p) => [p.x - p.r, p.x + p.r]);
        const ys = opened.parts.flatMap((p) => [p.y - p.r, p.y + p.r + 20]);
        const box = { x: Math.min(...xs), y: Math.min(...ys), w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) };
        e.frame(box, { pad: 0.14, max: 2.6 });
      }
    } else if (split) {
      const m = split.month;
      const col = { x: grid.colX(m - 1) - 2 * grid.pitch, y: split.top, w: 4 * grid.pitch, h: grid.baseY - split.top };
      // Room for the legend on the open side (left for July-December, like the breakdown).
      const legend = grid.colW * 2.4;
      let box = { x: col.x - grid.colW * 0.5 - (m >= 7 ? legend : 0), y: col.y - 16, w: col.w + grid.colW + legend, h: col.h + 34 };
      if (this.ghosts.has(m)) box = union(box, this.ghostBox(grid, m));
      const seg = focusPart ? split.segs.find((sg) => sg.name === focusPart) : null;
      this.focusCamera(box, { min: 1.15, max: 2.6, pad: 0.1 }, seg?.color ?? palette.spend, true, seg?.box ?? col);
    } else {
      e.home();
    }
  }

  /** Segment slots for a focused column: each part starts on a fresh row, a small gap between parts. */
  private layoutSplit(grid: ColumnGrid, month: number): Split {
    const n = this.columns[month - 1]?.length ?? 0;
    const segs = segment(this.partsOf(month), n);
    const pitch = grid.pitch;
    const gapW = pitch * 0.55;
    const rows = segs.reduce((a, sg) => a + Math.ceil(sg.count / 4), 0);
    const room = grid.baseY - grid.top - 2;
    // Squeeze rows a little when the extra part rows and gaps would not fit under the top.
    const vp = Math.max(pitch * 0.6, Math.min(pitch, (room - gapW * Math.max(0, segs.length - 1)) / Math.max(1, rows)));
    const x0 = grid.colX(month - 1);
    const pos: Split["pos"] = [];
    let before = 0;
    let top = grid.baseY;
    const out: Seg[] = segs.map((sg, s) => {
      const segRows = Math.ceil(sg.count / 4);
      const lift = s * gapW;
      for (let j = 0; j < sg.count; j++) {
        const row = Math.floor(j / 4);
        const inRow = row === segRows - 1 ? sg.count - row * 4 : 4;
        pos.push({ x: x0 + ((j % 4) - (inRow - 1) / 2) * pitch, y: grid.baseY - (before + row + 0.5) * vp - lift, s });
      }
      const bottom = grid.baseY - before * vp - lift;
      before += segRows;
      const segTop = grid.baseY - before * vp - lift;
      if (sg.count > 0) top = Math.min(top, segTop);
      return { ...sg, box: { x: x0 - 2 * pitch, y: segTop, w: 4 * pitch, h: Math.max(bottom - segTop, pitch) } };
    });
    return { month, segs: out, pos, top };
  }

  private layoutOpen(grid: ColumnGrid): Open {
    const e = this.engine;
    const b = this.open!.b;
    const month = b.month;
    const n = this.counts[month - 1];
    // Same parts, order and counts as the split column, so each segment slides out whole.
    const segs = segment(orderParts(b.parts), n);
    const x = grid.colX(month - 1);
    const width = Math.min(e.width * 0.46, grid.colW * 6);
    const gap = grid.colW * 0.8;
    const left = month >= 7;
    const rx = Math.max(grid.margin, Math.min(e.width - grid.margin - width, left ? x - gap - width : x + gap));
    const region = { x: rx, y: grid.top + 4, w: width, h: grid.baseY - grid.top - 16 };
    const packed = packClusters(
      segs.map((sg) => sg.count),
      region,
      { cMax: grid.pitch * 1.1, cMin: grid.pitch * 0.45, labelGap: 24 }
    );
    return {
      month,
      region,
      c: packed.c,
      parts: segs.map((p, i) => ({ ...p, x: packed.circles[i].x, y: packed.circles[i].y, r: packed.circles[i].r }))
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
    const colTop = this.split?.month === month ? this.split.top : grid.columnBox(month - 1, this.counts[month - 1], 1).y;
    const colY = Math.min(colTop, grid.columnBox(month - 1, this.counts[month - 1], 1).y);
    let x = grid.colX(month - 1);
    let y = colY - R - grid.pitch * 0.6;
    if (y - R - 14 < grid.top) {
      // No room above: sit beside the column instead (opposite the legend).
      y = Math.max(grid.top + R + 14, colY + R);
      x += (month >= 7 ? 1 : -1) * (2 * grid.pitch + R + grid.pitch);
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
    const split = this.split;
    const focusMonth = opened?.month ?? split?.month ?? null;
    const focusPart = typeof this.focusKey === "string" ? this.focusKey : null;
    const short = grid.colW * e.cam.s < 26;
    for (let i = 0; i < 12; i++) {
      const month = i + 1;
      const hit = month === focusMonth;
      const faded = focusMonth && !hit ? 0.45 : 1;
      const name = short ? MONTHS[i][0] : MONTHS[i].slice(0, 3);
      const a = this.labelAt(now, i, 12);
      e.label(ctx, name, grid.colX(i), grid.baseY, { color: hit ? theme.paper : theme.faint, alpha: a * faded, dy: 13, weight: hit ? 600 : 400 });
    }
    if (split) {
      e.label(ctx, swiss(spending[split.month - 1]), grid.colX(split.month - 1), split.top, { color: theme.paper, alpha: this.changeAlpha(now, -500), dy: -6, weight: 600 });
      this.drawLegend(ctx, now, split, focusPart);
    }
    if (opened) {
      const pa = Math.min(1, Math.max(0, (now - this.openedAt - (this.engine.reduced ? 300 : 1400)) / 450));
      for (const p of opened.parts) {
        const dim = focusPart && p.name !== focusPart ? 0.4 : 1;
        const strong = p.name === focusPart;
        e.label(ctx, p.name, p.x, p.y + p.r, { color: strong ? theme.paper : theme.soft, alpha: pa * dim, dy: 12, weight: strong ? 600 : 400 });
        e.label(ctx, swiss(p.value), p.x, p.y + p.r, { color: theme.faint, alpha: pa * dim, dy: 25, size: 10 });
      }
    }
    for (const [month, at] of this.ghosts) {
      const spot = this.ghostSpot(grid, month);
      drawGhost(e, ctx, spot.x, spot.y, spot.n, spot.c, now - at, spot.text, opened && opened.month !== month ? 0.2 : 1);
    }
  }

  /** Compact legend beside the split column: colour dot, part name, value; each fades in as its segment settles. */
  private drawLegend(ctx: CanvasRenderingContext2D, now: number, split: Split, focusPart: string | null) {
    const e = this.engine;
    const grid = this.grid!;
    const v = e.view;
    const left = split.month >= 7;
    const [edge] = e.toScreen(grid.colX(split.month - 1) + (left ? -1 : 1) * 2.7 * grid.pitch, 0);
    const dotX = edge + (left ? -8 : 8);
    const textX = dotX + (left ? -8 : 8);
    const settle = e.reduced ? 300 : 650;
    let lastY = Infinity;
    for (let s = 0; s < split.segs.length; s++) {
      const sg = split.segs[s];
      if (sg.count === 0) continue;
      const a = clamp((now - this.splitAt - settle - 170 * s) / 420, 0, 1) * this.labelAlpha(now);
      const [, mid] = e.toScreen(0, sg.box.y + sg.box.h / 2);
      const y = Math.min(mid + 4, lastY - 25); // keep labels apart, stacking upwards like the segments
      lastY = y;
      if (a < 0.01) continue;
      const hit = sg.name === focusPart;
      const dim = focusPart && !hit ? 0.45 : 1;
      ctx.globalAlpha = a * dim;
      ctx.fillStyle = `rgb(${sg.color[0]},${sg.color[1]},${sg.color[2]})`;
      ctx.beginPath();
      ctx.arc(dotX, y - 4, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      // Legend rows are laid out in screen space; e.label takes world coordinates.
      const wx = (textX - e.width / 2) / v.s + v.x;
      const wy = (y - e.height / 2) / v.s + v.y;
      const align = left ? "right" : "left";
      e.label(ctx, sg.name, wx, wy, { color: hit ? theme.paper : theme.soft, alpha: a * dim, align, size: 11, weight: hit ? 600 : 500 });
      e.label(ctx, swiss(sg.value), wx, wy, { color: theme.faint, alpha: a * dim, align, size: 10, dy: 12 });
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
