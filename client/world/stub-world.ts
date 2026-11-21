import type { Breakdown, SceneType, World } from "@/lib/contracts";

export type WorldCall = { method: string; args: unknown[] };

export type StubWorldOptions = {
  /** Focus targets per scene. Default: monthly = months 1-12 (plus open breakdown parts), others none. */
  targets?: Partial<Record<SceneType, (string | number)[]>>;
  /** Shared log, so tests can check ordering against voice and fetch calls. Entries look like "focus:9". */
  log?: string[];
};

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

/** In-memory World that records every call. Used until the grain world exists, and in tests. */
export class StubWorld implements World {
  readonly calls: WorldCall[] = [];
  readonly log: string[];
  scene: SceneType | null = null;
  focused: string | number | null = null;
  openBreakdown: Breakdown | null = null;
  ghosts: (string | number)[] = [];
  filled: string[] = [];
  private readonly targets: Partial<Record<SceneType, (string | number)[]>>;

  constructor(options: StubWorldOptions = {}) {
    this.targets = { monthly: MONTHS, ...options.targets };
    this.log = options.log ?? [];
  }

  private record(method: string, ...args: unknown[]): void {
    this.calls.push({ method, args });
    this.log.push(args.length ? `${method}:${args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(",")}` : method);
  }

  currentScene(): SceneType | null {
    return this.scene;
  }

  currentFocus(): string | number | null {
    return this.focused;
  }

  focusTargets(): (string | number)[] {
    if (!this.scene) return [];
    const base = this.targets[this.scene] ?? [];
    const parts = this.scene === "monthly" && this.openBreakdown ? this.openBreakdown.parts.map((p) => p.name) : [];
    return [...base, ...parts];
  }

  enter(scene: SceneType): void {
    this.record("enter", scene);
    this.scene = scene;
    this.focused = null;
    this.openBreakdown = null;
    this.ghosts = [];
  }

  focus(target: string | number): void {
    this.record("focus", target);
    this.focused = target;
  }

  unfocus(): void {
    this.record("unfocus");
    this.focused = null;
  }

  breakdown(b: Breakdown): void {
    this.record("breakdown", b.month);
    this.openBreakdown = b;
  }

  collapse(): void {
    this.record("collapse");
    this.openBreakdown = null;
  }

  ghost(target: string | number): void {
    this.record("ghost", target);
    this.ghosts.push(target);
  }

  fillJar(jar: string): void {
    this.record("fillJar", jar);
    this.filled.push(jar);
  }
}
