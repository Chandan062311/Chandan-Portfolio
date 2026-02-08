"use client";

import type { CSSProperties } from "react";
import dynamic from "next/dynamic";
import { Container } from "@/components/layout/Container";
import { SectionBackdrop } from "@/components/layout/SectionBackdrop";
import { Reveal } from "@/components/motion/Reveal";
import { GlitchText } from "@/components/motion/GlitchText";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { siteData } from "@/data/site";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((mod) => mod.HeroScene),
  { ssr: false },
);

function getGitHubUrl(): string {
  const gh = siteData.contactLinks.find((l) => l.href.includes("github.com"));
  return gh?.href ?? "https://github.com";
}

export function HeroTextOnly() {
  return (
    <section id="home" className="anchor-offset relative overflow-hidden">
      <SectionBackdrop
        sectionId="home"
        image={siteData.sectionArt.home}
        priority
        parallax
      >
        {/* 3D WebGL Scene Layer */}
        <HeroScene />

        <Container className="py-24 md:py-32">
          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <Reveal>
              <div className="space-y-5" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.7), 0 0 4px rgba(0,0,0,0.5)' }}>
                <p className="hud-kicker">Command Deck</p>
                <h1 className="section-title gradient-text text-[clamp(3.2rem,12vw,6.1rem)] leading-[0.86] md:text-[7.3rem]">
                  <GlitchText text={siteData.name} delay={0.3} speed={30} />
                </h1>
                <div className="max-w-2xl text-base uppercase tracking-[0.08em] text-[color:var(--color-accent-steel)] md:text-xl">
                  <StaggerReveal text={siteData.title} delay={1.2} />
                </div>
                <div className="max-w-2xl text-[color:var(--color-text)]">
                  <StaggerReveal text={siteData.intro} delay={1.8} />
                </div>
                <p className="max-w-2xl text-sm text-muted md:text-base" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.8)' }}>{siteData.profileStatement}</p>
                <div className="relative z-10 flex flex-wrap gap-3 pt-2">
                  <MagneticButton>
                    <a
                      href="#projects"
                      className="group inline-flex items-center gap-2 rounded-sm border border-[color:var(--color-accent-crimson)] bg-[color:var(--color-accent-crimson)]/22 px-5 py-2.5 text-sm uppercase tracking-[0.16em] text-[color:var(--color-text)] transition-all duration-300 hover:bg-[color:var(--color-accent-crimson)]/34 hover:shadow-[0_0_20px_-4px_var(--color-accent-glow)]"
                    >
                      View Projects
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                  </MagneticButton>
                  <MagneticButton>
                    <a
                      href={getGitHubUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-sm border border-white/20 bg-white/[0.02] px-5 py-2.5 text-sm uppercase tracking-[0.16em] text-[color:var(--color-text)] transition-all duration-300 hover:border-[color:var(--color-accent-crimson)] hover:text-[color:var(--color-accent-crimson)] hover:shadow-[0_0_20px_-4px_var(--color-accent-glow)]"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      Open GitHub
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </Reveal>
            <Reveal delay={siteData.theme.motion.stagger}>
              <div className="space-y-4">
                <aside
                  className="hud-panel ambient-pulse space-y-4 backdrop-blur-md"
                  style={
                    {
                      ["--ambient-duration" as string]: `${siteData.theme.motion.ambientPulse.duration}s`,
                      ["--ambient-intensity" as string]: `${siteData.theme.motion.ambientPulse.intensity}`,
                    } as CSSProperties
                  }
                >
                  <p className="hud-kicker">Mission Status</p>
                  <p className="text-lg font-medium text-[color:var(--color-text)]">{siteData.tagline}</p>
                  <p className="text-sm text-muted">{siteData.availability}</p>
                </aside>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {siteData.heroHighlights.map((highlight, i) => (
                    <Reveal key={highlight} delay={0.6 + i * 0.15} variant="fade-right">
                      <article className="hud-chip">
                        <p className="hud-kicker text-[10px]">Signal</p>
                        <p className="mt-1 text-sm text-[color:var(--color-text)]">{highlight}</p>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Scroll indicator */}
          <div className="mt-12 flex justify-center">
            <div className="scroll-indicator flex flex-col items-center gap-2 text-[color:var(--color-muted)]">
              <span className="text-[9px] uppercase tracking-[0.2em]">Scroll</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
              </svg>
            </div>
          </div>
        </Container>
      </SectionBackdrop>
    </section>
  );
}
