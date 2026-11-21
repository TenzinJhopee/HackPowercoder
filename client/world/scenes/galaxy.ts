import { noise, palette } from "../engine";
import { GOLDEN_ANGLE } from "../layout";
import { Scene, type ApplyKind } from "./base";

/** Opening scene: the year's income as one slowly rotating phyllotaxis disc of paper grains. */
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
    const R = Math.min(e.width, e.height) * 0.44;
    const c = R / Math.sqrt(n + 0.5);
    if (kind === "enter" || this.order.length === 0) {
      // Grains nearest the centre take the inner positions, so the disc gathers without crossing paths.
      this.order = e.grains
        .map((g) => g.id)
        .sort((a, b) => {
          const ga = e.grains[a];
          const gb = e.grains[b];
          return Math.hypot(ga.x - cx, ga.y - cy) - Math.hypot(gb.x - cx, gb.y - cy) || a - b;
        });
      this.park(this.order.slice(n).map((id) => e.grains[id]));
    }
    const now = performance.now();
    this.order.slice(0, n).forEach((id, k) => {
      const g = e.grains[id];
      const radius = c * (Math.sqrt(k + 0.5) + g.jx * 0.12);
      // Slight differential rotation: the outer rim drifts a little slower, like a real disc.
      const speed = e.speed(0.045 * (1 - 0.35 * (radius / R)));
      const current = g.motion?.kind === "orbit" ? g.motion : null;
      const angle = current ? current.angle + current.speed * ((now - current.since) / 1000) : k * GOLDEN_ANGLE + g.jy * 0.04;
      const motion = { kind: "orbit" as const, cx, cy, radius, angle, speed, since: now };
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      this.engine.place(
        g,
        {
          x,
          y,
          color: palette.paper,
          alpha: 0.4 + 0.45 * noise(g.id, 20),
          r: c * 0.42,
          dim: 1,
          motion
        },
        this.flight(kind, g, { order: k / n, group: 0, groups: 1, x, y, cx, cy }, k, n)
      );
    });
    e.home();
  }
}
