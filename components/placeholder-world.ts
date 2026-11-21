import type { Breakdown, SceneType, World } from "@/lib/contracts";

/** What the placeholder canvas draws. The real grain world replaces this whole file's consumer (stage-canvas.tsx). */
export type WorldView = {
  scene: SceneType | null;
  focus: string | number | null;
  breakdown: Breakdown | null;
  ghost: string | number | null;
  filledJars: string[];
  /** performance.now() of the last scene change, for a short fade. */
  changedAt: number;
};

const targetsByScene: Record<SceneType, (string | number)[]> = {
  galaxy: [],
  river: [],
  pools: ["Housing", "Electronics", "Travel", "Health", "Left over"],
  travel: ["USA", "London", "Copenhagen", "Other"],
  jars: ["3a", "Savings"],
  level: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "13"],
  monthly: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
};

/** A World that only records state; stage-canvas.tsx draws it as simple shapes. */
export class PlaceholderWorld implements World {
  view: WorldView = { scene: null, focus: null, breakdown: null, ghost: null, filledJars: [], changedAt: 0 };
  private listeners = new Set<() => void>();

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private set(patch: Partial<WorldView>) {
    this.view = { ...this.view, ...patch };
    this.listeners.forEach((listener) => listener());
  }

  currentScene() {
    return this.view.scene;
  }
  currentFocus() {
    return this.view.focus;
  }
  focusTargets() {
    const { scene, breakdown } = this.view;
    if (breakdown) return breakdown.parts.map((part) => part.name);
    return scene ? targetsByScene[scene] : [];
  }
  enter(scene: SceneType) {
    if (scene === this.view.scene) return;
    this.set({ scene, focus: null, breakdown: null, ghost: null, changedAt: typeof performance !== "undefined" ? performance.now() : 0 });
  }
  focus(target: string | number) {
    this.set({ focus: target });
  }
  unfocus() {
    this.set({ focus: null });
  }
  breakdown(b: Breakdown) {
    this.set({ breakdown: b });
  }
  collapse() {
    this.set({ breakdown: null });
  }
  ghost(target: string | number) {
    this.set({ ghost: target });
  }
  fillJar(jar: string) {
    if (!this.view.filledJars.includes(jar)) this.set({ filledJars: [...this.view.filledJars, jar] });
  }
  /** Not part of World: clear the demo state when the presentation starts over. */
  reset() {
    this.set({ scene: null, focus: null, breakdown: null, ghost: null, filledJars: [] });
  }
}
