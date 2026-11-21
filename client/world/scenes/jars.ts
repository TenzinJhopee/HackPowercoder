import { swiss } from "@/components/format";
import { theme } from "@/components/theme";
import { noise, palette, type Box, type Grain } from "../engine";
import { pick } from "../layout";
import { Scene, timing, type ApplyKind } from "./base";

const JARS = [
  { name: "3a", title: "Pillar 3a", aliases: ["pillar", "pillar 3a", "third pillar", "3rd pillar"] },
  { name: "Savings", title: "Savings", aliases: ["saving", "savings account"] }
];
const FILL = 24;

/** Everything flows down a central band; the Pillar 3a and Savings jars beside it stay empty until the offer. */
export class JarsScene extends Scene {
  readonly type = "jars" as const;
  private jars: (Box & { name: string; title: string })[] = [];
  private filledAt = new Map<string, number>();

  targets() {
    return JARS.map((j) => j.name);
  }

  protected resolve(target: string | number) {
    return pick(JARS, target)?.name ?? null;
  }

  fillJar(jar: string) {
    const name = jarName(jar);
    if (!name) return false;
    if (!this.filledAt.has(name)) this.filledAt.set(name, performance.now());
    return true;
  }

  protected layout(kind: ApplyKind) {
    const e = this.engine;
    const { width: w, height: h } = e;
    const jw = Math.min(w * 0.2, 96);
    const jh = Math.min(h * 0.5, 150);
    const bottom = h * 0.86;
    this.jars = JARS.map((j, i) => ({ ...j, x: w * (i === 0 ? 0.22 : 0.78) - jw / 2, y: bottom - jh, w: jw, h: jh }));
    const filled = JARS.filter((j) => this.env.filled.has(j.name));
    for (const j of filled) if (!this.filledAt.has(j.name)) this.filledAt.set(j.name, performance.now());

    // Fill grains: "Left over" grains first (that is the money that could go in), then any.
    const leftover = this.env.categories.findIndex((c) => c.saved);
    const pool = [...e.grains].sort((a, b) => Number(b.category === leftover) - Number(a.category === leftover) || a.id - b.id);
    const inJar = new Map<number, { jar: Box; k: number }>();
    filled.forEach((j, n) => {
      const jar = this.jars.find((x) => x.name === j.name)!;
      pool.slice(n * FILL, (n + 1) * FILL).forEach((g, k) => inJar.set(g.id, { jar, k }));
    });

    const bandW = Math.min(w * 0.16, 80);
    const now = performance.now();
    const total = e.grains.length;
    e.grains.forEach((g, i) => {
      const slot = inJar.get(g.id);
      if (slot) {
        const { jar, k } = slot;
        const pitch = (jar.w * 0.78) / 6;
        const x = jar.x + jar.w / 2 + ((k % 6) - 2.5) * pitch + g.jx * pitch * 0.08;
        const y = jar.y + jar.h - pitch * 0.9 - Math.floor(k / 6) * pitch + g.jy * pitch * 0.08;
        e.place(g, { x, y, color: palette.saved, alpha: 0.95, r: pitch * 0.4, dim: 1 }, { dur: 1300, delay: 60 * k, bend: 0.35 });
        return;
      }
      const top = -8;
      const bottomY = h + 8;
      const motion = {
        kind: "flow" as const,
        x: w / 2 + g.jx * bandW * 0.5,
        spread: 2 + 3 * noise(g.id, 30),
        top,
        bottom: bottomY,
        offset: noise(g.id, 31) * (bottomY - top),
        speed: e.speed(9 + 8 * noise(g.id, 32)),
        since: now
      };
      const current = g.motion?.kind === "flow" && g.motion.speed === motion.speed ? g.motion : motion;
      const span = bottomY - top;
      const y = top + ((((current.offset + current.speed * ((now - current.since) / 1000)) % span) + span) % span);
      e.place(g, { x: motion.x, y, color: palette.spend, alpha: 0.5, r: 1.3, dim: this.focusKey ? 0.5 : 1, motion }, timing(kind, g, i, total));
    });

    const focused = this.jars.find((j) => j.name === this.focusKey);
    if (focused) e.frame({ x: focused.x - focused.w * 0.4, y: focused.y - 30, w: focused.w * 1.8, h: focused.h + 50 }, { min: 1.2, max: 2.4 });
    else e.home();
  }

  drawOver(ctx: CanvasRenderingContext2D, now: number) {
    const e = this.engine;
    const a = this.labelAlpha(now);
    for (const jar of this.jars) {
      const filledAt = this.filledAt.get(jar.name);
      const full = filledAt !== undefined && this.env.filled.has(jar.name);
      const fill = full ? Math.min(1, (now - filledAt) / 1800) : 0;
      const hit = jar.name === this.focusKey;
      const pulse = hit && !e.reduced ? 0.7 + 0.3 * Math.sin(now / 520) : 1;
      e.inWorld(ctx, (unit) => {
        ctx.lineWidth = 1.5 * unit;
        ctx.strokeStyle = full && fill >= 1 ? theme.saved : theme.coral;
        ctx.globalAlpha = (this.focusKey && !hit ? 0.45 : 0.9) * pulse * Math.max(a, 0.25);
        ctx.setLineDash(full && fill >= 1 ? [] : [5 * unit, 4 * unit]);
        jarPath(ctx, jar);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      });
      e.label(ctx, jar.title, jar.x + jar.w / 2, jar.y, { color: theme.paper, alpha: a, dy: -8, weight: hit ? 600 : 400 });
      e.label(ctx, full ? swiss(FILL * 100) : "empty", jar.x + jar.w / 2, jar.y + jar.h, {
        color: full ? theme.saved : theme.coral,
        alpha: a * (full ? fill : 0.8),
        dy: 16,
        size: 10
      });
    }
  }
}

/** An open-topped jar with a slight lip and rounded base. */
function jarPath(ctx: CanvasRenderingContext2D, j: Box) {
  const r = j.w * 0.28;
  const lip = j.w * 0.06;
  ctx.beginPath();
  ctx.moveTo(j.x - lip, j.y);
  ctx.quadraticCurveTo(j.x, j.y, j.x, j.y + lip * 2);
  ctx.lineTo(j.x, j.y + j.h - r);
  ctx.quadraticCurveTo(j.x, j.y + j.h, j.x + r, j.y + j.h);
  ctx.lineTo(j.x + j.w - r, j.y + j.h);
  ctx.quadraticCurveTo(j.x + j.w, j.y + j.h, j.x + j.w, j.y + j.h - r);
  ctx.lineTo(j.x + j.w, j.y + lip * 2);
  ctx.quadraticCurveTo(j.x + j.w, j.y, j.x + j.w + lip, j.y);
}

/** Canonical jar name ("3a" or "Savings") for any spelling, or null. */
export const jarName = (text: string) => pick(JARS, text)?.name ?? null;
