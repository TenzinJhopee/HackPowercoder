import { theme } from "@/components/theme";
import { palette, rgb, type RGB } from "./engine";
import { largestRemainder } from "./layout";

/**
 * A month's composition: the parts its column splits into when the advisor talks about it (largest at the bottom,
 * "Other" on top), each with a calm categorical colour.
 *
 * Palette (validated with the dataviz validator, all pairs, OKLab ΔE×100): amber stays the spending family and goes to
 * Housing/Rent; sky blue, indigo and orchid carry the other named categories; two neutrals carry Health insurance
 * (strong) and Other (soft). Coral and green are not used: they mean missing/negative and saved.
 *   light stage (#ffffff): #e08d12 #549de5 #2b519c #ae60a0 → worst CVD 10.6, normal 19.1 (amber/sky need labels: shown)
 *   dark stage  (#0b0d12): #e8a33d #4d97de #4d5aac #b466a6 → worst CVD 8.6, normal 17.1
 * Colour follows the entity (Travel is always sky, Bike always orchid, Electronics always indigo); categories without a
 * fixed hue take the first free one in that month.
 */

export type SegmentSource = { name: string; value: number; aliases?: string[] };
export type Segment = SegmentSource & { count: number; color: RGB };

const luminance = (hex: string) => {
  const [r, g, b] = rgb(hex);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
};
/** Light text means a dark stage (the original night theme); the Luma theme has dark text on white. */
const darkStage = luminance(theme.paper) > 0.5;

const SKY = rgb(darkStage ? "#4d97de" : "#549de5");
const INDIGO = rgb(darkStage ? "#4d5aac" : "#2b519c");
const ORCHID = rgb(darkStage ? "#b466a6" : "#ae60a0");
const STEEL = rgb(darkStage ? "#a3aab8" : "#7d889b");
const MIST = rgb(darkStage ? "#5b6271" : "#bcc3ce");

type Entity = "Housing" | "Travel" | "Electronics" | "Bike" | "Health" | "Other" | null;
const FIXED: Record<Exclude<Entity, null>, RGB> = { Housing: palette.spend, Travel: SKY, Electronics: INDIGO, Bike: ORCHID, Health: STEEL, Other: MIST };
const FREE: RGB[] = [INDIGO, SKY, ORCHID, palette.spend];
const WORDS: [Exclude<Entity, null>, RegExp][] = [
  ["Other", /^other$/],
  ["Housing", /hous|rent|electric|flat|apartment/],
  ["Travel", /travel|trip|flight|plane|ticket|hotel|london|holiday/],
  ["Electronics", /electronic|apple|digitec|galaxus|iphone|laptop|phone|computer/],
  ["Bike", /bike|bicycle|velo/],
  ["Health", /health|insurance|krankenkasse|doctor/]
];

function entityOf(s: SegmentSource): Entity {
  const names = [s.name, ...(s.aliases ?? [])].map((n) => n.toLowerCase());
  for (const [entity, re] of WORDS) if (names.some((n) => re.test(n))) return entity;
  return null;
}

/** Colours for one month's parts: fixed hues first, then the first free hue for the rest. */
function colorsFor(parts: SegmentSource[]): RGB[] {
  const out: (RGB | null)[] = parts.map(() => null);
  const used = new Set<RGB>();
  parts.forEach((p, i) => {
    const e = entityOf(p);
    const c = e ? FIXED[e] : null;
    if (c && !used.has(c)) {
      out[i] = c;
      used.add(c);
    }
  });
  parts.forEach((_, i) => {
    if (out[i]) return;
    const c = FREE.find((x) => !used.has(x)) ?? MIST;
    out[i] = c;
    used.add(c);
  });
  return out as RGB[];
}

/** Named parts by value (largest first = bottom of the column), "Other" last (top). Negative values count as 0. */
export function orderParts(parts: SegmentSource[]): SegmentSource[] {
  const isOther = (p: SegmentSource) => p.name.toLowerCase() === "other";
  return [...parts.filter((p) => !isOther(p)).sort((a, b) => b.value - a.value), ...parts.filter(isOther)];
}

/** Parts from a category map: the 5 largest positive categories, the rest folded into "Other". */
export function partsFromCategories(categories: Record<string, number>): SegmentSource[] {
  const list = Object.entries(categories)
    .filter(([name, v]) => v > 0 && name.toLowerCase() !== "other")
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
  const rest = list.slice(5).reduce((s, p) => s + p.value, 0) + Math.max(0, categories.Other ?? 0);
  return rest > 0 ? [...list.slice(0, 5), { name: "Other", value: rest }] : list.slice(0, 5);
}

/** Segments in stacking order with grain counts summing exactly to `n`. */
export function segment(parts: SegmentSource[], n: number): Segment[] {
  const colors = colorsFor(parts);
  const counts = largestRemainder(
    parts.map((p) => p.value),
    n
  );
  return parts.map((p, i) => ({ ...p, count: counts[i], color: colors[i] }));
}
