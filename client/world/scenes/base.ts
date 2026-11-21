import type { Breakdown, SceneType } from "@/lib/contracts";
import { swiss } from "@/components/format";
import { theme } from "@/components/theme";
import { FOCUS_SOFTEN, SETTLE, entranceTiming, focal, labelStagger, type Entrance, type FocusStyle, type Slot } from "../choreo";
import { clamp, easeOutCubic, noise, palette, type Box, type Engine, type Grain, type RGB, type SceneLayer, type Timing } from "../engine";
import { clusterRadius, phyllotaxis } from "../layout";

/** The facts.json keys the world reads (plan section 4). */
export type WorldFacts = {
  yearly_income_incl_13th_salary: number;
  year_end_net_vs_start: number;
  without_13th_salary: number;
  categories_yearly_net_of_refunds: Record<string, number>;
  monthly_spending_jan_dec: number[];
  month_end_balance_vs_start_jan_dec: number[];
  gaps?: { id: string; month?: number; usual_amount?: number }[];
  /** Month "1"-"12" → named parts summing to that month's spending ("Other" last). */
  monthly_breakdown_parts?: Record<string, { name: string; value: number; aliases?: string[] }[]>;
  /** Month "1"-"12" → category → net value (fallback when a month has no parts). */
  monthly_breakdown_by_category?: Record<string, Record<string, number>>;
};

export type Category = { name: string; value: number; count: number; saved: boolean; aliases: string[] };

export type SceneEnv = { engine: Engine; facts: WorldFacts; categories: Category[]; filled: Set<string> };

/** enter: grains are (re)assigned to this scene; update: state changed; resize: same state, new geometry. */
export type ApplyKind = "enter" | "update" | "resize";

export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** 1-12 from 9, "9", "September", "sept"; else null. */
export function toMonth(target: string | number): number | null {
  if (typeof target === "number") return Number.isInteger(target) && target >= 1 && target <= 12 ? target : null;
  const t = target.trim().toLowerCase();
  if (/^\d{1,2}$/.test(t)) return toMonth(Number(t));
  if (t.length < 3) return null;
  const i = MONTHS.findIndex((m) => m.toLowerCase().startsWith(t) || t === m.toLowerCase());
  return i >= 0 ? i + 1 : null;
}

/** Calm, staggered flights: 900-1600 ms, cubic in-out, never bounce. */
export function timing(kind: ApplyKind, g: Grain, index = 0, count = 1): Timing {
  if (kind === "resize") return { dur: 420, delay: 0, bend: 0.05 };
  if (kind === "enter") return { dur: 1000 + 550 * noise(g.id, 11), delay: 420 * (index / Math.max(1, count)) + 140 * noise(g.id, 12) };
  return { dur: 1000 + 420 * noise(g.id, 13), delay: 280 * noise(g.id, 14) };
}

/** Typical time until an `enter`/`update` flight has landed (labels fade in after it). */
export const SETTLE_MS = { enter: 1500, update: 1250, resize: 0 } as const;

export abstract class Scene implements SceneLayer {
  abstract readonly type: SceneType;
  focusKey: string | number | null = null;
  protected labelsAt = 0;
  /** When the last state change lands (labels that depend on focus or breakdown fade in after it). */
  protected changedAt = 0;
  protected enteredAt = 0;
  /** How grains arrive on `enter` (set by the world from the scene pair). */
  entrance: Entrance | null = null;
  /** Current focus look (set by the world on every new focus). */
  focusStyle: FocusStyle = "zoom";
  /** A new focus just happened: play its one-shot effects (ripple, carry) on the next layout. */
  focusFx = false;

  constructor(protected env: SceneEnv) {}

  protected get engine(): Engine {
    return this.env.engine;
  }

  abstract targets(): (string | number)[];
  /** Canonical focus key for a target, or null when this scene does not know it. */
  protected abstract resolve(target: string | number): string | number | null;
  /** Declarative: place every grain and the camera for the current state. Grains already headed there do not restart. */
  protected abstract layout(kind: ApplyKind): void;

  apply(kind: ApplyKind): void {
    const now = performance.now();
    const enterMs = this.entrance ? SETTLE[this.entrance.name] : SETTLE_MS.enter;
    const settle = now + (this.engine.reduced ? 300 : kind === "enter" ? enterMs : SETTLE_MS.update);
    if (kind === "enter") {
      this.labelsAt = settle;
      this.enteredAt = now;
      if (this.entrance?.name === "rewind") this.engine.breathe(0.07, 1300);
    }
    if (kind !== "resize") this.changedAt = settle;
    // Focus overlays are re-declared by focusCamera() during layout; anything not re-declared fades out.
    this.engine.spot.aTo = 0;
    this.layout(kind);
    this.focusFx = false;
  }

  /** Entrance choreography on `enter`, the calm default otherwise. */
  protected flight(kind: ApplyKind, g: Grain, slot: Slot, index = 0, count = 1): Timing {
    if (kind === "enter" && this.entrance) return entranceTiming(this.entrance, g, slot, this.engine);
    return timing(kind, g, index, count);
  }

  /** Dim and lift for a focused (hit) or other grain; null when nothing is focused. */
  protected focal(hit: boolean | null) {
    return focal(this.focusStyle, hit);
  }

  /**
   * Frame the focused item in the current look; on a new focus also play its one-shot effect and carry sparks.
   * `fx` = where the effect sits when it differs from the framed box (a segment inside a framed column).
   */
  protected focusCamera(box: Box, opts: { min?: number; max?: number; pad?: number } = {}, color: RGB = palette.paper, carry = true, fx: Box = box): void {
    const e = this.engine;
    const style = this.focusStyle;
    e.frame(box, { ...opts, soften: FOCUS_SOFTEN[style] });
    const x = fx.x + fx.w / 2;
    const y = fx.y + fx.h / 2;
    const R = Math.max(fx.w, fx.h) / 2;
    if (style === "spotlight") {
      e.spot.x = x;
      e.spot.y = y;
      e.spot.r = R * 0.9 + 6;
      e.spot.aTo = 1;
    }
    if (!this.focusFx) return;
    if (style === "ripple") e.startRipple(x, y, R);
    if (carry) e.carry(x, y, R, color);
  }

  /** Label i of n fades in as its grains arrive (follows the entrance order). */
  protected labelAt(now: number, i: number, n: number): number {
    return this.labelAlpha(now, labelStagger(this.entrance, i, n));
  }

  /** Returns false (no-op) for an unknown target. */
  setFocus(target: string | number): boolean {
    const key = this.resolve(target);
    if (key === null) return false;
    this.focusKey = key;
    return true;
  }

  clearFocus(): void {
    this.focusKey = null;
  }

  setBreakdown(_b: Breakdown): boolean {
    return false;
  }
  clearBreakdown(): boolean {
    return false;
  }
  setGhost(_target: string | number): boolean {
    return false;
  }
  fillJar(_jar: string): boolean {
    return false;
  }
  /** Month whose column is broken down (monthly only). */
  openMonth(): number | null {
    return null;
  }

  drawUnder?(ctx: CanvasRenderingContext2D, now: number): void;
  drawOver?(ctx: CanvasRenderingContext2D, now: number): void;

  /** Scene labels (month names, category names): fade in once after the grains first arrive. */
  protected labelAlpha(now: number, delay = 0): number {
    return clamp((now - this.labelsAt - delay) / 450, 0, 1);
  }

  /** Labels that depend on focus or breakdown: fade in after the latest change lands. */
  protected changeAlpha(now: number, delay = 0): number {
    return clamp((now - this.changedAt - delay) / 450, 0, 1);
  }

  /** Grains this scene does not use fade out where they are; the next scene picks them up from there. */
  protected park(grains: Grain[]): void {
    for (const g of grains) this.engine.place(g, { x: g.x, y: g.y, alpha: 0, dim: 1 }, { dur: 700, delay: 120 * noise(g.id, 15) });
  }
}

/**
 * Missing payment: a dashed coral outline holding empty grain rings (plan 6.3, e.g. February health insurance).
 * Opens with an iris: a dashed circle widens from the missing item's spot, then the outline and its rings appear from the
 * centre outward. `age` = ms since the ghost was set; `fade` multiplies everything.
 */
export function drawGhost(engine: Engine, ctx: CanvasRenderingContext2D, x: number, y: number, n: number, c: number, age: number, text: string, fade = 1) {
  if (fade < 0.01 || age < 0) return;
  if (engine.reduced) age += 2000;
  const outer = clusterRadius(n, c) + c * 0.9;
  const iris = clamp(age / 1100, 0, 1);
  const alpha = clamp((age - 450) / 650, 0, 1) * fade;
  engine.inWorld(ctx, (unit) => {
    ctx.strokeStyle = theme.coral;
    ctx.lineWidth = unit;
    if (iris < 1) {
      ctx.globalAlpha = 0.85 * Math.pow(1 - iris, 1.3) * Math.min(1, iris * 8) * fade;
      ctx.setLineDash([4 * unit, 4 * unit]);
      ctx.lineDashOffset = -age * 0.01 * unit;
      ctx.beginPath();
      ctx.arc(x, y, outer * (0.1 + 1.5 * easeOutCubic(iris)), 0, Math.PI * 2);
      ctx.stroke();
      ctx.lineDashOffset = 0;
    }
    if (alpha < 0.01) {
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
      return;
    }
    ctx.globalAlpha = alpha;
    ctx.setLineDash([3 * unit, 3 * unit]);
    ctx.beginPath();
    ctx.arc(x, y, outer, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    for (let k = 0; k < n; k++) {
      const ring = clamp((age - 650 - k * 45) / 300, 0, 1) * fade;
      if (ring < 0.01) break;
      ctx.globalAlpha = ring * 0.75;
      const p = phyllotaxis(k, c, x, y);
      ctx.beginPath();
      ctx.arc(p.x, p.y, c * 0.36, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  });
  engine.label(ctx, text, x, y - outer, { color: theme.coral, alpha, dy: -5, size: 11 });
}

/** Ghost cluster size and label for a month from facts.gaps (falls back to 10 grains). */
export function ghostFor(facts: WorldFacts, month: number): { n: number; text: string } {
  const gap = facts.gaps?.find((g) => g.month === month && g.usual_amount);
  const usual = gap?.usual_amount ?? 1000;
  return { n: Math.max(1, Math.round(usual / 100)), text: `usually ${swiss(usual)}?` };
}
