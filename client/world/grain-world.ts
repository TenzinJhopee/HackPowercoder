import type { Breakdown, SceneType, World } from "@/lib/contracts";
import { Engine } from "./engine";
import type { ApplyKind, Category, Scene, SceneEnv, WorldFacts } from "./scenes/base";
import { GalaxyScene } from "./scenes/galaxy";
import { JarsScene, jarName } from "./scenes/jars";
import { LevelScene } from "./scenes/level";
import { MonthlyScene } from "./scenes/monthly";
import { PoolsScene } from "./scenes/pools";

const ALIASES: Record<string, string[]> = {
  Housing: ["rent", "electricity", "flat", "apartment", "bkw"],
  Electronics: ["apple", "digitec", "galaxus", "phone", "computer"],
  Travel: ["trip", "trips", "flight", "flights", "plane", "holiday", "holidays", "hotel"],
  Health: ["insurance", "krankenkasse", "doctor"],
  Bike: ["bicycle", "veloshop"],
  "Online shopping": ["amazon", "online"],
  Clothing: ["clothes", "fashion"],
  Transport: ["train", "sbb", "fuel"],
  "Food and drink": ["food", "restaurant", "restaurants", "drink", "drinks"],
  Tax: ["taxes"],
  "Left over": ["left", "saved", "leftover"]
};

const LEFT_OVER = "Left over";

/**
 * The real World (plan section 6): one set of grains, one per CHF 100, rearranged by scenes without cuts.
 * Scenes are declarative: each state change re-places every grain; grains already headed to their spot keep flying.
 * Scenes without their own layout yet (river, travel) borrow pools.
 */
export class GrainWorld implements World {
  private engine = new Engine();
  private env: SceneEnv | null = null;
  private filled = new Set<string>();
  private type: SceneType | null = null;
  private scene: Scene | null = null;
  private entered = false;
  private loading: Promise<void> | null = null;

  currentScene(): SceneType | null {
    return this.type;
  }

  currentFocus(): string | number | null {
    return this.scene?.focusKey ?? null;
  }

  focusTargets(): (string | number)[] {
    return this.scene?.targets() ?? [];
  }

  /** Month whose column is open (for the director's screen context); not part of World. */
  openMonth(): number | null {
    return this.scene?.openMonth() ?? null;
  }

  enter(type: SceneType): void {
    this.type = type;
    this.scene = this.env ? this.make(type, this.env) : null;
    this.entered = false;
    this.run("enter");
  }

  focus(target: string | number): void {
    if (this.scene?.setFocus(target)) this.run("update");
  }

  unfocus(): void {
    if (!this.scene || this.scene.focusKey === null) return;
    this.scene.clearFocus();
    this.run("update");
  }

  breakdown(b: Breakdown): void {
    if (this.scene?.setBreakdown(b)) this.run("update");
  }

  collapse(): void {
    if (this.scene?.clearBreakdown()) this.run("update");
  }

  ghost(target: string | number): void {
    if (this.scene?.setGhost(target)) this.run("update");
  }

  fillJar(jar: string): void {
    const name = jarName(jar);
    if (!name) return;
    this.filled.add(name);
    if (this.scene?.fillJar(name)) this.run("update");
  }

  /** Not part of World: clear demo state (filled jars, focus, breakdown) when the presentation starts over. No cut. */
  reset(): void {
    this.filled.clear();
    if (this.type) this.enter(this.type);
  }

  /** Host the engine on a canvas (stage-canvas.tsx). Loads facts.json once. */
  attach(canvas: HTMLCanvasElement): void {
    this.engine.attach(canvas);
    void this.load();
  }

  detach(): void {
    this.engine.detach();
  }

  /** Called by the resize observer: re-lays out the current scene, keeping focus and breakdown. */
  resize(width: number, height: number): void {
    const changed = this.engine.resize(width, height);
    if (!this.entered) this.run("enter");
    else if (changed) this.run("resize");
  }

  /** Same as resize without a size change (World users may call it after layout shifts). */
  relayout(): void {
    this.run("resize");
  }

  private load(): Promise<void> {
    this.loading ??= fetch("/facts.json")
      .then((res) => {
        if (!res.ok) throw new Error(`facts.json: ${res.status}`);
        return res.json() as Promise<WorldFacts>;
      })
      .then((facts) => {
        const categories = toCategories(facts);
        const grains: number[] = [];
        categories.forEach((c, i) => {
          for (let k = 0; k < c.count; k++) grains.push(i);
        });
        this.engine.createGrains(grains);
        this.env = { engine: this.engine, facts, categories, filled: this.filled };
        if (this.type && !this.scene) this.scene = this.make(this.type, this.env);
        this.run("enter");
      })
      .catch((error) => {
        this.loading = null;
        console.warn("Grain world: could not load facts.json", error);
      });
    return this.loading;
  }

  private make(type: SceneType, env: SceneEnv): Scene {
    switch (type) {
      case "galaxy":
        return new GalaxyScene(env);
      case "monthly":
        return new MonthlyScene(env);
      case "level":
        return new LevelScene(env);
      case "jars":
        return new JarsScene(env);
      default:
        return new PoolsScene(env);
    }
  }

  private run(kind: ApplyKind): void {
    const scene = this.scene;
    if (!scene || !this.env || this.engine.width === 0) return;
    if (!this.entered) {
      kind = "enter";
      this.entered = true;
    }
    this.engine.layer = scene;
    scene.apply(kind);
  }
}

function toCategories(facts: WorldFacts): Category[] {
  const spending = Object.entries(facts.categories_yearly_net_of_refunds)
    .map(([name, value]) => ({ name, value, count: Math.round(value / 100), saved: false, aliases: ALIASES[name] ?? [] }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.value - a.value);
  const left = facts.year_end_net_vs_start;
  return [...spending, { name: LEFT_OVER, value: left, count: Math.max(0, Math.round(left / 100)), saved: true, aliases: ALIASES[LEFT_OVER] }];
}
