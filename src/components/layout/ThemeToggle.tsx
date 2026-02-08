"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/layout/ThemeProvider";

export function ThemeToggle() {
  const { current, setTheme, presets } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-8 w-8 items-center justify-center rounded border border-white/12 text-sm transition-all hover:border-[color:var(--color-accent-crimson)]/40 hover:shadow-[0_0_10px_-3px_var(--color-accent-glow)]"
        aria-label="Change theme"
        aria-expanded={open}
      >
        <span aria-hidden="true">{current.icon}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-white/10 shadow-xl shadow-black/40"
            style={{ background: "rgba(8, 12, 18, 0.96)", backdropFilter: "blur(12px)" }}
          >
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  setTheme(preset.id);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-xs uppercase tracking-[0.14em] transition-colors ${
                  current.id === preset.id
                    ? "bg-white/8 text-[color:var(--color-accent-crimson)]"
                    : "text-[color:var(--color-muted)] hover:bg-white/5 hover:text-[color:var(--color-text)]"
                }`}
              >
                <span className="text-base">{preset.icon}</span>
                <span>{preset.label}</span>
                {current.id === preset.id && (
                  <span className="ml-auto inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent-crimson)]" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
