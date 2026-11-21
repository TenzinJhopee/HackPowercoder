import { THEMES, theme, type ThemeName } from "@/components/theme";
import { palette, setRgb, type RGB } from "./engine";
import { applySegmentColors, segmentColors } from "./segments";

/**
 * Applies a look (light or dark) to everything the canvas derived from the theme: the shared `theme` strings,
 * the palette entries and the segment hues. Returns [from, to] pairs of every colour that changed,
 * so the grains already on screen can be recoloured in place (GrainWorld.recolor).
 */
const PALETTE_KEYS = ["paper", "spend", "coral", "saved", "faint"] as const;

const copy = (c: RGB): RGB => [c[0], c[1], c[2]];

export function applySkin(name: ThemeName): [RGB, RGB][] {
  const entries = (): RGB[] => [...PALETTE_KEYS.map((key) => palette[key]), ...segmentColors()];
  const before = entries().map(copy);

  Object.assign(theme, THEMES[name]);
  for (const key of PALETTE_KEYS) setRgb(palette[key], theme[key]);
  applySegmentColors(name === "dark");

  const after = entries().map(copy);
  return before.map((from, i): [RGB, RGB] => [from, after[i]]).filter(([from, to]) => from[0] !== to[0] || from[1] !== to[1] || from[2] !== to[2]);
}
