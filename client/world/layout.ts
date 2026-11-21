import type { Box, Grain } from "./engine";

/** Layout helpers (docs/IMPLEMENTATION_PLAN.md 6.2). Pure functions, no canvas. */

export const GOLDEN_ANGLE = 2.39996;

/** Phyllotaxis point k of a cluster: angle = k * 2.39996, r = c * sqrt(k + 0.5). */
export function phyllotaxis(k: number, c: number, cx: number, cy: number): { x: number; y: number } {
  const angle = k * GOLDEN_ANGLE;
  const r = c * Math.sqrt(k + 0.5);
  return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
}

export const clusterRadius = (n: number, c: number) => c * Math.sqrt(Math.max(n, 1) + 0.5);

/** Integer shares of `total` proportional to `values` (negatives count as 0), summing exactly to `total`. */
export function largestRemainder(values: number[], total: number): number[] {
  const clean = values.map((v) => Math.max(0, v));
  const sum = clean.reduce((a, b) => a + b, 0);
  if (sum <= 0 || total <= 0) return values.map(() => 0);
  const exact = clean.map((v) => (v / sum) * total);
  const counts = exact.map(Math.floor);
  let left = total - counts.reduce((a, b) => a + b, 0);
  const order = exact.map((v, i) => ({ i, rest: v - Math.floor(v) })).sort((a, b) => b.rest - a.rest || a.i - b.i);
  for (let k = 0; left > 0; k = (k + 1) % order.length, left--) counts[order[k].i]++;
  return counts;
}

export type Named = { name: string; aliases?: string[] };

/**
 * Case-insensitive match of `text` against names and aliases, both ways ("Health insurance" finds "Health", "rent" finds
 * "Rent and electricity"). Exact matches win. Aliases shorter than 3 letters are ignored (the "ev" in "devam" bug).
 */
export function pick<T extends Named>(list: readonly T[], text: string | number): T | null {
  const q = String(text).trim().toLowerCase();
  if (!q) return null;
  const names = (item: T) => [item.name, ...(item.aliases ?? []).filter((a) => a.length >= 3)].map((n) => n.toLowerCase());
  return (
    list.find((item) => names(item).includes(q)) ??
    list.find((item) => names(item).some((n) => q.includes(n) || (q.length >= 3 && n.includes(q)))) ??
    null
  );
}

export type Packed = { c: number; circles: { x: number; y: number; r: number }[] };

/**
 * Greedy circle packing of phyllotaxis clusters (sizes `counts`) with room for a label under each, then fit into
 * `region` by lowering the spacing `c` from `cMax` to `cMin` until the bounding box fits (scaled down as a last resort).
 */
export function packClusters(counts: number[], region: Box, opts: { cMax: number; cMin: number; labelGap: number; pad?: number }): Packed {
  const steps = 10;
  let best: { c: number; centres: { x: number; y: number }[]; box: Box } | null = null;
  for (let step = 0; step <= steps; step++) {
    const c = opts.cMax - ((opts.cMax - opts.cMin) * step) / steps;
    const result = packOnce(counts, c, opts.labelGap, opts.pad ?? c * 1.2, region.w / Math.max(region.h, 1));
    best = { c, ...result };
    if (result.box.w <= region.w && result.box.h <= region.h) break;
  }
  const { c, centres, box } = best!;
  const scale = Math.min(1, region.w / Math.max(box.w, 1), region.h / Math.max(box.h, 1));
  const ox = region.x + region.w / 2;
  const oy = region.y + region.h / 2;
  const bx = box.x + box.w / 2;
  const by = box.y + box.h / 2;
  return {
    c: c * scale,
    circles: centres.map((p, i) => ({
      x: ox + (p.x - bx) * scale,
      y: oy + (p.y - by) * scale,
      r: clusterRadius(counts[i], c * scale)
    }))
  };
}

function packOnce(counts: number[], c: number, labelGap: number, pad: number, aspect: number) {
  // Footprint = cluster circle grown downwards by the label gap.
  const foot = counts.map((n) => clusterRadius(n, c) + labelGap / 2);
  const order = counts.map((_, i) => i).sort((a, b) => foot[b] - foot[a] || a - b);
  const placed: { i: number; x: number; y: number }[] = [];
  const ax = Math.sqrt(Math.max(0.3, Math.min(aspect, 4)));
  const ay = 1 / ax;
  const step = Math.max(c * 0.6, 0.5);
  for (const i of order) {
    let x = 0;
    let y = 0;
    for (let t = 0; t < 6000; t++) {
      const angle = t * 0.45;
      const rad = step * t * 0.12;
      x = Math.cos(angle) * rad * ax;
      y = Math.sin(angle) * rad * ay;
      const ok = placed.every((p) => Math.hypot(p.x - x, p.y - y) >= foot[p.i] + foot[i] + pad);
      if (ok) break;
    }
    placed.push({ i, x, y });
  }
  const centres = counts.map(() => ({ x: 0, y: 0 }));
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const p of placed) {
    // footprint centre sits labelGap/2 below the cluster centre
    const cy = p.y - labelGap / 2;
    centres[p.i] = { x: p.x, y: cy };
    const r = clusterRadius(counts[p.i], c);
    minX = Math.min(minX, p.x - r);
    maxX = Math.max(maxX, p.x + r);
    minY = Math.min(minY, cy - r);
    maxY = Math.max(maxY, cy + r + labelGap);
  }
  return { centres, box: { x: minX, y: minY, w: maxX - minX, h: maxY - minY } };
}

/** Column grid for 12 months, 4 grains per row; `rowsUp` above the base line, `rowsDown` below it. */
export function columnGrid(width: number, height: number, rowsUp: number, rowsDown: number) {
  const top = 16;
  const bottom = 22;
  const gap = rowsDown > 0 ? 6 : 0;
  const margin = Math.max(8, width * 0.03);
  const colW = (width - margin * 2) / 12;
  const pitch = Math.max(1.5, Math.min((colW * 0.8) / 4, (height - top - bottom - gap) / Math.max(rowsUp + rowsDown, 1)));
  const used = (rowsUp + rowsDown) * pitch + gap;
  const plotTop = top + Math.max(0, height - top - bottom - used) * (rowsDown > 0 ? 0.5 : 1);
  const baseY = plotTop + rowsUp * pitch + gap / 2;
  const colX = (i: number) => margin + colW * (i + 0.5);
  /** Slot k of column i; dir 1 = up from the base line, -1 = down. */
  const slot = (i: number, k: number, dir: 1 | -1, g?: Grain) => {
    const row = Math.floor(k / 4);
    const jitter = g ? pitch * 0.09 : 0;
    return {
      x: colX(i) + ((k % 4) - 1.5) * pitch + (g ? g.jx * jitter : 0),
      y: baseY - dir * ((row + 0.5) * pitch + gap / 2) + (g ? g.jy * jitter : 0)
    };
  };
  /** World box of column i holding n grains. */
  const columnBox = (i: number, n: number, dir: 1 | -1): Box => {
    const rows = Math.max(1, Math.ceil(n / 4));
    const h = rows * pitch + gap / 2;
    return { x: colX(i) - 2 * pitch, y: dir > 0 ? baseY - h : baseY, w: 4 * pitch, h };
  };
  return { top, bottom, margin, colW, pitch, baseY, plotTop, colX, slot, columnBox, labelY: height - 7 };
}

export type ColumnGrid = ReturnType<typeof columnGrid>;

/**
 * Chooses grains for 12 columns from where they are now: visible grains first, spread evenly by x, left to right, then
 * bottom-up inside each column, so flights stay short and do not cross the whole board.
 */
export function assignColumns(grains: Grain[], counts: number[]): { columns: Grain[][]; rest: Grain[] } {
  const need = counts.reduce((a, b) => a + b, 0);
  const visible = grains.filter((g) => g.a1 > 0.02);
  const hidden = grains.filter((g) => g.a1 <= 0.02);
  const pool = visible.length >= need ? visible : visible.concat(hidden.slice(0, need - visible.length));
  pool.sort((a, b) => a.x - b.x || a.id - b.id);
  const chosen: Grain[] = [];
  const used = new Set<number>();
  for (let i = 0; i < need && i < pool.length; i++) {
    const g = pool[Math.floor((i * pool.length) / need)];
    chosen.push(g);
    used.add(g.id);
  }
  const columns: Grain[][] = [];
  let offset = 0;
  for (const n of counts) {
    const chunk = chosen.slice(offset, offset + n).sort((a, b) => b.y - a.y || a.x - b.x);
    for (let k = 0; k < chunk.length; k += 4) {
      const row = chunk.slice(k, k + 4).sort((a, b) => a.x - b.x);
      chunk.splice(k, row.length, ...row);
    }
    columns.push(chunk);
    offset += n;
  }
  return { columns, rest: grains.filter((g) => !used.has(g.id)) };
}
