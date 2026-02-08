"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { siteData } from "@/data/site";

export function SiteHeader() {
  const sectionIds = useMemo(
    () => siteData.sectionOrder,
    [],
  );
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);
  const ticking = useRef(false);

  const updateState = useCallback(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    setProgress(Math.max(0, Math.min(1, ratio)));

    const activationLine = window.innerHeight * 0.36;
    let nextActive = sectionIds[0];
    for (const sectionId of sectionIds) {
      const node = document.getElementById(sectionId);
      if (!node) continue;
      if (node.getBoundingClientRect().top <= activationLine) {
        nextActive = sectionId;
      }
    }
    setActiveSection(nextActive);
    ticking.current = false;
  }, [sectionIds]);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        rafRef.current = requestAnimationFrame(updateState);
      }
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial scroll position
    updateState();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updateState]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[color:var(--color-background)]/88 backdrop-blur-md">
      <div className="hud-progress-track" aria-hidden>
        <span
          className="hud-progress-fill"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
      <Container>
        <div className="flex h-16 items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <a
              href="#home"
              className="font-heading text-2xl uppercase tracking-[0.18em] text-[color:var(--color-text)] transition-colors duration-300 hover:text-[color:var(--color-accent-crimson)]"
            >
              CS
            </a>
            <p className="hidden truncate text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-accent-steel)] lg:block">
              {siteData.hud.missionLabel}
            </p>
          </div>
          <nav className="hidden gap-4 xl:flex" aria-label="Main navigation">
            <div className="relative flex gap-4">
              {siteData.nav.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={activeSection === item.id ? "page" : undefined}
                  className={`relative text-xs uppercase tracking-[0.18em] transition-colors duration-300 ${
                    activeSection === item.id
                      ? "text-[color:var(--color-accent-crimson)]"
                      : "text-[color:var(--color-muted)] hover:text-[color:var(--color-text)]"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full bg-[color:var(--color-accent-crimson)]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </div>
          </nav>
          {/* Mobile nav with larger touch targets */}
          <nav
            className="max-w-[65vw] overflow-x-auto xl:hidden"
            aria-label="Mobile navigation"
            style={{
              WebkitMaskImage: "linear-gradient(to right, black 85%, transparent 100%)",
              maskImage: "linear-gradient(to right, black 85%, transparent 100%)",
              scrollSnapType: "x mandatory",
            }}
          >
            <ul className="flex gap-2 pr-6">
              {siteData.nav.map((item) => (
                <li key={item.id} style={{ scrollSnapAlign: "start" }}>
                  <a
                    href={`#${item.id}`}
                    aria-current={activeSection === item.id ? "page" : undefined}
                    className={`whitespace-nowrap rounded border px-3 py-2 text-xs uppercase tracking-[0.14em] transition-all duration-300 ${
                      activeSection === item.id
                        ? "border-[color:var(--color-accent-crimson)] text-[color:var(--color-accent-crimson)] shadow-[0_0_10px_-3px_var(--color-accent-glow)]"
                        : "border-white/12 text-[color:var(--color-muted)] hover:text-[color:var(--color-text)]"
                    }`}
                  >
                    {item.label.split(" ")[0]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <a
              href={`mailto:${siteData.email}`}
              className="inline-flex items-center rounded border border-[color:var(--color-accent-crimson)] px-3 py-2.5 text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-text)] transition-all duration-300 hover:bg-[color:var(--color-accent-crimson)]/20 hover:shadow-[0_0_15px_-3px_var(--color-accent-glow)] sm:px-4"
            >
              Contact
            </a>
          </div>
        </div>
      </Container>
    </header>
  );
}
