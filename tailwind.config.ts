import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // TellHorn brand (from the logo): deep teal and sun yellow
        ink: "#00323d",
        muted: "#6f8c92",
        brand: "#004b5a",
        "brand-dark": "#003642",
        sun: "#ffcc00",
        "sun-deep": "#e6b800",
        "sun-soft": "#fff3bf",
        canvas: "#fbf8ec",
        line: "#e9e3cc",
        // Data colours: same values as components/theme.ts (canvas drawing)
        soft: "#3f6670",
        faint: "#5c7c84",
        spend: "#e08d12",
        coral: "#ec615c",
        saved: "#2fa36b",
        // Darker variants for small text on white (contrast)
        "spend-ink": "#a35d00",
        "coral-ink": "#c9433d",
        "saved-ink": "#1b7a4c"
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
