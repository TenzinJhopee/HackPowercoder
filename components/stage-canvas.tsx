"use client";

import { useEffect, useRef, useState } from "react";
import type { GrainWorld } from "@/client/world/grain-world";
import type { Engine } from "@/client/world/engine";

const DOUBLE_TAP_MS = 320;
const TAP_SLOP = 8;

/**
 * Hosts the grain world's canvas. The engine draws every frame; a resize re-lays out the scene (focus kept).
 * Hand zoom/pan: ctrl/cmd + wheel (and trackpad pinch) zooms around the pointer, drag pans, two fingers pinch.
 * A plain wheel is left to the page so a tall page still scrolls over the stage.
 */
export function StageCanvas({ world }: { world: GrainWorld }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [zoomed, setZoomed] = useState(false);
  // The engine is private to GrainWorld; the hand view lives on it so every scene's camera call can reset it.
  const engine = (world as unknown as { engine: Engine }).engine;

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

    engine.onUserChange = setZoomed;
    const pointers = new Map<number, { x: number; y: number }>();
    let pinch = 0;
    let lastTap = 0;
    let downAt = { x: 0, y: 0 };
    const local = (e: { clientX: number; clientY: number }) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const spread = () => {
      const [a, b] = [...pointers.values()];
      return { d: Math.hypot(a.x - b.x, a.y - b.y), x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    };

    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const p = local(e);
      const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      engine.zoomUser(Math.exp(-dy * 0.0022), p.x, p.y);
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      canvas.setPointerCapture(e.pointerId);
      const p = local(e);
      pointers.set(e.pointerId, p);
      if (pointers.size === 1) downAt = p;
      if (pointers.size === 2) pinch = spread().d;
    };
    const onMove = (e: PointerEvent) => {
      const prev = pointers.get(e.pointerId);
      if (!prev) return;
      const p = local(e);
      if (pointers.size >= 2) {
        const before = spread();
        pointers.set(e.pointerId, p);
        const after = spread();
        engine.panUser(after.x - before.x, after.y - before.y);
        if (pinch > 0 && after.d > 0) engine.zoomUser(after.d / pinch, after.x, after.y);
        pinch = after.d;
      } else {
        pointers.set(e.pointerId, p);
        engine.panUser(p.x - prev.x, p.y - prev.y);
      }
    };
    const onUp = (e: PointerEvent) => {
      const p = pointers.get(e.pointerId);
      if (!p) return;
      pointers.delete(e.pointerId);
      pinch = 0;
      if (e.type !== "pointerup" || pointers.size > 0 || e.pointerType === "mouse") return;
      // Double tap (touch/pen); a mouse uses dblclick.
      if (Math.hypot(p.x - downAt.x, p.y - downAt.y) > TAP_SLOP) return;
      const now = performance.now();
      if (now - lastTap < DOUBLE_TAP_MS) {
        engine.resetUser();
        lastTap = 0;
      } else lastTap = now;
    };
    const onDouble = () => engine.resetUser();

    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("dblclick", onDouble);
    return () => {
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("dblclick", onDouble);
      if (engine.onUserChange === setZoomed) engine.onUserChange = null;
      engine.resetUser(true);
      observer.disconnect();
      world.detach();
    };
  }, [world, engine]);

  return (
    <div className="relative h-full w-full">
      <canvas
        ref={ref}
        className={`block h-full w-full select-none ${zoomed ? "touch-none cursor-grab active:cursor-grabbing" : "touch-pan-y"}`}
        role="img"
        aria-label="Whiteboard: grains of CHF 100 arranged for the current scene. Drag to pan, pinch or Ctrl + scroll to zoom."
      />
      <button
        type="button"
        onClick={() => engine.resetUser()}
        aria-label="Reset view"
        aria-hidden={!zoomed}
        tabIndex={zoomed ? 0 : -1}
        className={`absolute right-2 top-2 inline-flex min-h-11 items-center gap-1.5 rounded-full border border-black/5 bg-white/90 px-4 text-xs font-semibold text-ink shadow-[0_4px_16px_rgba(20,34,56,0.12)] backdrop-blur transition-[opacity,transform] duration-500 ease-out hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none ${
          zoomed ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 text-faint" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3.5 7.5V3.5h4M16.5 12.5v4h-4M3.5 3.5l4.5 4.5M16.5 16.5L12 12" />
        </svg>
        Reset view
      </button>
    </div>
  );
}
