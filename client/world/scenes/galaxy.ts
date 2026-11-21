import { noise, palette } from "../engine";
import { logoPoints } from "../logo";
import { Scene, type ApplyKind } from "./base";

/** Room (in sunflower spacings) each note keeps from the mark's edge and gap; it wanders within most of it. */
const ROOM = 0.7;
const WANDER = 0.6;

/** Opening scene: the year's income as paper notes filling the PostFinance mark, each note wandering gently in place. */
export class GalaxyScene extends Scene {
  readonly type = "galaxy" as const;
  private order: number[] = [];

  targets() {
    return [];
  }

  protected resolve() {
    return null;
  }

  protected layout(kind: ApplyKind) {
    const e = this.engine;
    const n = Math.min(e.grains.length, Math.round(this.env.facts.yearly_income_incl_13th_salary / 100));
    const cx = e.width / 2;
    const cy = e.height / 2;
    const min = Math.min(e.width, e.height);
    // Unit size of the mark: about as tall as the old disc was wide.
    const S = min * 0.46;
    // Note size as before (the disc's spacing).
    const r = ((min * 0.44) / Math.sqrt(n + 0.5)) * 0.42;
    const { points, c } = logoPoints(n, ROOM);
    const slots = points.map((p) => ({ x: cx + p.x * S, y: cy + p.y * S }));
    if (kind === "enter" || this.order.length === 0) {
      // Already standing in this mark (idle screen → Start): every note keeps its slot, so nothing moves.
      // Otherwise grains nearest the centre take the inner slots (points come centre first): no crossing paths.
      this.order =
        this.kept(slots) ??
        e.grains
          .map((g) => g.id)
          .sort((a, b) => {
            const ga = e.grains[a];
            const gb = e.grains[b];
            return Math.hypot(ga.x - cx, ga.y - cy) - Math.hypot(gb.x - cx, gb.y - cy) || a - b;
          });
      this.park(this.order.slice(n).map((id) => e.grains[id]));
    }
    const amp = c * S * WANDER;
    this.order.slice(0, n).forEach((id, k) => {
      const g = e.grains[id];
      const { x, y } = slots[k];
      const motion = {
        kind: "wander" as const,
        x,
        y,
        amp,
        phase: noise(g.id, 21) * Math.PI * 2,
        // Calm: one slow loop every 9-16 s; held still under reduced motion.
        speed: e.speed(0.4 + 0.3 * noise(g.id, 22)),
        since: 0
      };
      this.engine.place(
        g,
        { x, y, color: palette.paper, alpha: 0.4 + 0.45 * noise(g.id, 20), r, dim: 1, motion },
        this.flight(kind, g, { order: k / n, group: 0, groups: 1, x, y, cx, cy }, k, n)
      );
    });
    e.home();
  }

  /** Grain order when every slot is already held by a note wandering there; null otherwise. */
  private kept(slots: { x: number; y: number }[]): number[] | null {
    const key = (x: number, y: number) => `${x.toFixed(1)},${y.toFixed(1)}`;
    const index = new Map(slots.map((p, k) => [key(p.x, p.y), k]));
    const order: number[] = new Array(slots.length);
    const rest: number[] = [];
    let held = 0;
    for (const g of this.engine.grains) {
      const k = g.motion?.kind === "wander" ? index.get(key(g.motion.x, g.motion.y)) : undefined;
      if (k !== undefined && order[k] === undefined) {
        order[k] = g.id;
        held++;
      } else rest.push(g.id);
    }
    return held === slots.length ? [...order, ...rest] : null;
  }
}
