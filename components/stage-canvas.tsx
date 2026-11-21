"use client";

import { useEffect, useRef } from "react";
import type { GrainWorld } from "@/client/world/grain-world";

/** Hosts the grain world's canvas. The engine draws every frame; a resize re-lays out the scene (focus kept). */
export function StageCanvas({ world }: { world: GrainWorld }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    world.attach(canvas);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      world.resize(rect.width, rect.height);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    return () => {
      observer.disconnect();
      world.detach();
    };
  }, [world]);

  return <canvas ref={ref} className="block h-full w-full" role="img" aria-label="Whiteboard: grains of CHF 100 arranged for the current scene" />;
}
