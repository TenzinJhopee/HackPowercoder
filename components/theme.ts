/**
 * Colours shared by canvas drawing (CSS uses the same values through tailwind.config.ts).
 * TellHorn brand: sun yellow (#ffcc00) and deep teal (#004b5a), taken from the logo.
 * Brand colours are chrome only (header, buttons, progress, neutral grains); data keeps its own meaning:
 * amber = spending, coral = only missing/negative, green = only saved/left over.
 * The stage stays white so every grain colour reads clearly.
 */
export const theme = {
  /** Page background: warm paper that sits well next to the brand yellow. */
  canvas: "#fbf8ec",
  surface: "#ffffff",
  /** Strong text, labels of the focused item and neutral grains: the brand teal. */
  paper: "#004b5a",
  /** Names of unfocused items: between paper and faint. */
  soft: "#3f6670",
  /** Secondary text, axis lines and unit labels. */
  faint: "#5c7c84",
  spend: "#e08d12",
  coral: "#ec615c",
  saved: "#2fa36b",
  /** Brand chrome (not used for data). */
  sun: "#ffcc00"
} as const;
