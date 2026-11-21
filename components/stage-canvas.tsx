"use client";

import { useEffect, useRef } from "react";
import { theme } from "./theme";
import type { PlaceholderWorld, WorldView } from "./placeholder-world";

/**
 * The ONLY component that draws the world. Until the real grain world exists it draws the scene name,
 * focus and breakdown parts as simple shapes. Swap this component (and the World the hook creates) later.
 */
const monthlySpending = [5994, 7063, 6028, 6626, 6435, 10365, 12363, 4565, 14363, 3845, 7390, 3342];
const balance = [-120, -700, -1500, -2300, -3100, -4000, -4700, -5200, -5640, -3000, 500, 8816];
const pools: { name: string; grains: number; color: string; x: number; y: number }[] = [
  { name: "Housing", grains: 225, color: theme.spend, x: 0.22, y: 0.42 },
  { name: "Electronics", grains: 132, color: theme.spend, x: 0.5, y: 0.3 },
  { name: "Travel", grains: 129, color: theme.spend, x: 0.78, y: 0.45 },
  { name: "Health", grains: 123, color: theme.spend, x: 0.38, y: 0.72 },
  { name: "Left over", grains: 88, color: theme.saved, x: 0.72, y: 0.76 }
];
const trips = [
  { name: "USA", grains: 80, x: 0.25, y: 0.5 },
  { name: "London", grains: 30, x: 0.52, y: 0.35 },
  { name: "Copenhagen", grains: 20, x: 0.75, y: 0.55 },
  { name: "Other", grains: 10, x: 0.5, y: 0.78 }
];

const same = (a: string | number | null, b: string | number) => a !== null && String(a).toLowerCase() === String(b).toLowerCase();

function cluster(ctx: CanvasRenderingContext2D, cx: number, cy: number, count: number, r: number, color: string, alpha: number) {
  ctx.fillStyle = color;
  ctx.globalAlpha = alpha;
  for (let k = 0; k < count; k++) {
    const angle = k * 2.39996;
    const dist = r * 1.9 * Math.sqrt(k + 0.5);
    ctx.beginPath();
    ctx.arc(cx + Math.cos(angle) * dist, cy + Math.sin(angle) * dist, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function label(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string = theme.faint, align: CanvasTextAlign = "center") {
  ctx.fillStyle = color;
  ctx.font = "11px Inter, Arial, sans-serif";
  ctx.textAlign = align;
  ctx.fillText(text, x, y);
}

function column(ctx: CanvasRenderingContext2D, x: number, baseY: number, grains: number, pitch: number, color: string, alpha: number, up = true) {
  ctx.fillStyle = color;
  ctx.globalAlpha = alpha;
  for (let k = 0; k < grains; k++) {
    const row = Math.floor(k / 4);
    const col = k % 4;
    const y = up ? baseY - row * pitch : baseY + row * pitch;
    ctx.beginPath();
    ctx.arc(x + (col - 1.5) * pitch, y, pitch * 0.38, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawWorld(ctx: CanvasRenderingContext2D, w: number, h: number, view: WorldView, now: number) {
  ctx.clearRect(0, 0, w, h);
  if (!view.scene) {
    label(ctx, "The whiteboard is empty", w / 2, h / 2);
    return;
  }
  const fade = Math.min(1, (now - view.changedAt) / 400);
  ctx.globalAlpha = fade;
  const { scene, focus, breakdown } = view;
  const unit = Math.min(w / 12, (h - 34) / 38);
  const dim = (match: boolean) => (focus === null || match ? 0.95 : 0.2);

  if (scene === "galaxy") {
    cluster(ctx, w / 2, h / 2, 420, Math.min(w, h) * 0.014, theme.paper, 0.55);
  } else if (scene === "river") {
    for (let wave = 0; wave < 13; wave++) {
      ctx.fillStyle = theme.spend;
      ctx.globalAlpha = fade * 0.6;
      for (let k = 0; k < 24; k++) {
        const t = k / 23;
        const x = w * (0.92 - 0.85 * t) + wave * 3;
        const y = h * (0.12 + 0.7 * t) + Math.sin(t * 6 + wave * 0.5) * 8 + wave * 2.5;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = fade;
  } else if (scene === "pools") {
    for (const p of pools) {
      cluster(ctx, w * p.x, h * p.y, p.grains / 2.2, Math.min(w, h) * 0.011, p.color, dim(same(focus, p.name)));
      label(ctx, p.name, w * p.x, h * p.y + Math.min(w, h) * 0.16, same(focus, p.name) ? theme.paper : theme.faint);
    }
  } else if (scene === "travel") {
    for (const trip of trips) {
      cluster(ctx, w * trip.x, h * trip.y, trip.grains / 1.5, Math.min(w, h) * 0.012, theme.spend, dim(same(focus, trip.name)));
      label(ctx, trip.name, w * trip.x, h * trip.y + Math.min(w, h) * 0.13, same(focus, trip.name) ? theme.paper : theme.faint);
    }
  } else if (scene === "jars") {
    const jars = [
      { name: "Pillar 3a", key: "3a", x: 0.32 },
      { name: "Savings", key: "Savings", x: 0.68 }
    ];
    for (const jar of jars) {
      const jx = w * jar.x - 38;
      const jy = h * 0.4;
      const filled = view.filledJars.includes(jar.key);
      ctx.strokeStyle = filled ? theme.saved : theme.coral;
      ctx.globalAlpha = fade * dim(same(focus, jar.key));
      ctx.lineWidth = 1.5;
      ctx.setLineDash(filled ? [] : [5, 5]);
      ctx.strokeRect(jx, jy, 76, h * 0.45);
      ctx.setLineDash([]);
      if (filled) cluster(ctx, jx + 38, jy + h * 0.45 - 22, 24, 3.2, theme.saved, 0.95);
      label(ctx, jar.name, jx + 38, jy - 8, theme.paper);
    }
    ctx.globalAlpha = fade;
    cluster(ctx, w / 2, h * 0.14, 40, 2.4, theme.spend, 0.6);
  } else if (scene === "level") {
    const baseY = h * 0.45;
    ctx.strokeStyle = theme.faint;
    ctx.globalAlpha = fade * 0.6;
    ctx.beginPath();
    ctx.moveTo(0, baseY);
    ctx.lineTo(w, baseY);
    ctx.stroke();
    balance.forEach((value, i) => {
      const x = (i + 0.5) * (w / 12);
      const grains = Math.round(Math.abs(value) / 100);
      ctx.globalAlpha = fade;
      column(ctx, x, baseY + (value < 0 ? 6 : -6), Math.min(grains, 60), unit * 0.55, value < 0 ? theme.coral : theme.saved, dim(same(focus, i + 1)), value >= 0);
    });
  } else {
    const baseY = h - 22;
    monthlySpending.forEach((value, i) => {
      const x = (i + 0.5) * (w / 12);
      const hit = same(focus, i + 1);
      const open = breakdown?.month === i + 1;
      const alpha = breakdown ? (open ? 0.1 : 0.12) : dim(hit);
      column(ctx, x, baseY, Math.round(value / 100), unit * 0.55, theme.spend, alpha);
      label(ctx, String(i + 1), x, h - 6, hit || open ? theme.paper : theme.faint);
      if (open && breakdown) {
        ctx.strokeStyle = theme.faint;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(x - unit * 1.2, baseY - Math.round(value / 100 / 4) * unit * 0.55 - 4, unit * 2.4, Math.round(value / 100 / 4) * unit * 0.55 + 8);
        ctx.setLineDash([]);
        const left = i >= 6;
        breakdown.parts.slice(0, 5).forEach((part, k) => {
          const side = unit * (3 + (k % 2) * 5);
          const px = Math.min(w * 0.9, Math.max(w * 0.1, left ? x - side : x + side));
          const py = h * 0.18 + k * (h * 0.15);
          const part_focus = same(focus, part.name);
          cluster(ctx, px, py, Math.max(3, Math.round(part.value / 100)), Math.max(2, unit * 0.2), theme.spend, focus === null || part_focus ? 0.95 : 0.3);
          label(ctx, `${part.name}`, px, py + unit * 1.4, part_focus ? theme.paper : theme.faint);
        });
      }
    });
  }

  ctx.globalAlpha = 1;
  label(ctx, `scene: ${scene}${focus !== null ? ` · focus: ${focus}` : ""}${breakdown ? ` · open: month ${breakdown.month}` : ""}${view.ghost !== null ? ` · missing: ${view.ghost}` : ""}`, 8, 14, theme.faint, "left");
}

export function StageCanvas({ world }: { world: PlaceholderWorld }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = 0;
    let height = 0;
    let raf = 0;
    const render = () => {
      raf = 0;
      if (!width || !height) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.scale(dpr, dpr);
      drawWorld(ctx, width, height, world.view, performance.now());
      if (world.view.scene && performance.now() - world.view.changedAt < 450) schedule();
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      schedule();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const off = world.subscribe(schedule);
    resize();
    return () => {
      observer.disconnect();
      off();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [world]);

  return <canvas ref={ref} className="block h-full w-full" role="img" aria-label="Whiteboard showing the current scene" />;
}
