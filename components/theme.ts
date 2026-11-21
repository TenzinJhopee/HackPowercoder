/**
 * Colours shared by canvas drawing (CSS uses the same values through tailwind.config.ts).
 * Light "Luma" theme: grains and labels are drawn on a white stage.
 * Data semantics: amber = spending, coral = only missing/negative, green = only saved/left over.
 * Brand red (#d92e3a) is chrome only (logo, primary button) and is not part of this set.
 */
export const theme = {
  /** Page and stage backgrounds. */
  canvas: "#f6f7f9",
  surface: "#ffffff",
  /** Strong text, labels of the focused item and neutral grains. */
  paper: "#142238",
  /** Names of unfocused items: between paper and faint. */
  soft: "#4a586e",
  /** Secondary text, axis lines and unit labels. */
  faint: "#66748a",
  spend: "#e08d12",
  coral: "#ec615c",
  saved: "#2fa36b",
  /** PostFinance yellow: only the opening logo pile (brand, not data; distinct from spend amber). */
  brand: "#ffcc00"
} as const;
