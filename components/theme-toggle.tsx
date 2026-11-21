"use client";

import { useEffect, useState } from "react";
import { THEME_EVENT, THEME_STORAGE_KEY, currentTheme, type ThemeName } from "./theme";

/**
 * Light / dark look for projectors. The choice is saved on this device and applied before the first paint
 * (see layout.tsx). The canvas listens for THEME_EVENT and recolours its grains without a reload.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [mode, setMode] = useState<ThemeName>("light");
  useEffect(() => setMode(currentTheme()), []);

  const toggle = () => {
    const next: ThemeName = mode === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private mode or blocked storage: the look still switches for this visit.
    }
    setMode(next);
    window.dispatchEvent(new CustomEvent<ThemeName>(THEME_EVENT, { detail: next }));
  };

  const dark = mode === "dark";
  return (
    <button type="button" className={className} aria-pressed={dark} aria-label={dark ? "Switch to the light look" : "Switch to the dark look, for projectors"} title={dark ? "Light look" : "Dark look (projector)"} onClick={toggle}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {dark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          <path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11z" />
        )}
      </svg>
    </button>
  );
}
