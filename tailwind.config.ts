import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Luma chrome (from the first prototype)
        ink: "#142238",
        muted: "#728096",
        brand: "#d92e3a",
        canvas: "#f6f7f9",
        line: "#e9edf1",
        // Data colours: same values as components/theme.ts (canvas drawing)
        soft: "#4a586e",
        faint: "#66748a",
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
