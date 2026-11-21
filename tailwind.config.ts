import type { Config } from "tailwindcss";

/** A colour that follows the active look (light or dark) and still accepts opacity, e.g. bg-brand/50. */
const themed = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // TellHorn brand (from the logo): deep teal and sun yellow. Values live in app/globals.css.
        ink: themed("ink"),
        muted: themed("muted"),
        brand: themed("brand"),
        "brand-dark": themed("brand-dark"),
        "on-brand": themed("on-brand"),
        sun: themed("sun"),
        "sun-deep": themed("sun-deep"),
        "sun-soft": themed("sun-soft"),
        "on-sun": themed("on-sun"),
        canvas: themed("canvas"),
        surface: themed("surface"),
        line: themed("line"),
        // Data colours: same values as components/theme.ts (canvas drawing)
        soft: themed("soft"),
        faint: themed("faint"),
        spend: themed("spend"),
        coral: themed("coral"),
        saved: themed("saved"),
        // Brighter or darker variants for small text (contrast on the current surface)
        "spend-ink": themed("spend-ink"),
        "coral-ink": themed("coral-ink"),
        "saved-ink": themed("saved-ink")
      },
      boxShadow: {
        card: "0 8px 26px rgba(20, 34, 56, 0.045)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
