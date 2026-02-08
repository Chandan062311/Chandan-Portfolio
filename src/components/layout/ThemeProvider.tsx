"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { themePresets, type ThemePreset } from "@/data/themes";

interface ThemeContextValue {
  current: ThemePreset;
  setTheme: (id: string) => void;
  presets: ThemePreset[];
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "chandan-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<ThemePreset>(themePresets[0]);

  // Load saved preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const found = themePresets.find((p) => p.id === saved);
        // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage hydration
        if (found) setCurrent(found);
      }
    } catch {
      // SSR / localStorage unavailable
    }
  }, []);

  // Apply CSS variables to document root
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-background", current.colors.background);
    root.style.setProperty("--color-surface", current.colors.surface);
    root.style.setProperty("--color-surface-strong", current.colors.surfaceStrong);
    root.style.setProperty("--color-text", current.colors.text);
    root.style.setProperty("--color-muted", current.colors.muted);
    root.style.setProperty("--color-accent-crimson", current.colors.accentCrimson);
    root.style.setProperty("--color-accent-steel", current.colors.accentSteel);
    root.style.setProperty("--color-accent-glow", current.colors.accentGlow);
  }, [current]);

  const setTheme = useCallback((id: string) => {
    const found = themePresets.find((p) => p.id === id);
    if (!found) return;

    const apply = () => {
      setCurrent(found);
      try {
        localStorage.setItem(STORAGE_KEY, id);
      } catch {
        // ignore
      }
    };

    // Use View Transition API for smooth theme switching when available
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(apply);
    } else {
      apply();
    }
  }, []);

  // Expose theme setter for terminal command integration
  useEffect(() => {
    const handler = () => {
      window.dispatchEvent(new CustomEvent("register-theme-setter", { detail: setTheme }));
    };
    window.addEventListener("request-theme-setter", handler);
    // Also fire immediately so terminal picks it up if already mounted
    window.dispatchEvent(new CustomEvent("register-theme-setter", { detail: setTheme }));
    return () => window.removeEventListener("request-theme-setter", handler);
  }, [setTheme]);

  return (
    <ThemeContext.Provider value={{ current, setTheme, presets: themePresets }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
