/**
 * Colours shared by canvas drawing (CSS uses the same values through the --c-* variables in app/globals.css).
 * TellHorn brand: sun yellow (#ffcc00) and deep teal (#004b5a), taken from the logo.
 * Brand colours are chrome only (header, buttons, progress, neutral grains); data keeps its own meaning:
 * amber = spending, coral = only missing/negative, green = only saved/left over.
 *
 * Two looks: "light" (white stage, teal grains) and "dark" (deep teal stage, cream grains) for projectors.
 * `theme` is mutable on purpose: the canvas reads it every frame, so switching the look needs no reload
 * (client/world/skin.ts applies a look to everything that was derived from it).
 */

export type ThemeName = "light" | "dark";

export interface Theme {
  /** Page background. */
  canvas: string;
  /** Cards and the stage. */
  surface: string;
  /** Strong text, labels of the focused item and neutral grains. */
  paper: string;
  /** Names of unfocused items: between paper and faint. */
  soft: string;
  /** Secondary text, axis lines and unit labels. */
  faint: string;
  spend: string;
  coral: string;
  saved: string;
  /** Brand chrome (not used for data). */
  sun: string;
  /** The brand yellow of the opening logo pile (not data; distinct from the spend amber). */
  brand: string;
}

export const THEMES: Record<ThemeName, Theme> = {
  light: {
    canvas: "#fbf8ec",
    surface: "#ffffff",
    paper: "#004b5a",
    soft: "#3f6670",
    faint: "#5c7c84",
    spend: "#e08d12",
    coral: "#ec615c",
    saved: "#2fa36b",
    sun: "#ffcc00",
    brand: "#ffcc00"
  },
  dark: {
    canvas: "#00262e",
    surface: "#00323d",
    paper: "#f3efdc",
    soft: "#b5cdd1",
    faint: "#8fb0b6",
    spend: "#f0a43a",
    coral: "#ff7a73",
    saved: "#43c48a",
    sun: "#ffcc00",
    brand: "#ffcc00"
  }
};

export const theme: Theme = { ...THEMES.light };

export const THEME_STORAGE_KEY = "tellhorn-theme";
/** Fired on `window` after the look changed, so the canvas can redraw its grains in the new colours. */
export const THEME_EVENT = "tellhorn-theme";

/** The saved look; light when nothing is saved or storage is blocked. */
export function readTheme(): ThemeName {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function currentTheme(): ThemeName {
  return typeof document !== "undefined" && document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}
