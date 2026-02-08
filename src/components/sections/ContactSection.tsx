"use client";

import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { GlitchText } from "@/components/motion/GlitchText";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { AnimatedBorder } from "@/components/motion/StaggerReveal";
import { siteData } from "@/data/site";

/* Inline SVG icons for contact links */
const LINK_ICONS: Record<string, React.ReactNode> = {
  email: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  github: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  ),
  linkedin: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  x: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  youtube: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12z" />
    </svg>
  ),
};

function getLinkIcon(href: string, label: string): React.ReactNode {
  if (href.startsWith("mailto:")) return LINK_ICONS.email;
  const lower = label.toLowerCase();
  if (lower.includes("github")) return LINK_ICONS.github;
  if (lower.includes("linkedin")) return LINK_ICONS.linkedin;
  if (lower.includes("x") || href.includes("x.com")) return LINK_ICONS.x;
  if (lower.includes("youtube")) return LINK_ICONS.youtube;
  return null;
}

export function ContactSection() {
  return (
    <Section
      id="contact"
      station="Uplink Contact"
      title="Transmission Link"
      subtitle="For collaborations, roles, and product builds, open a direct channel."
    >
      <Reveal variant="scale">
        <AnimatedBorder>
          <article className="hud-panel steel-border relative overflow-hidden">
            {/* Beacon pulse background */}
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 opacity-20" aria-hidden="true">
              <span className="beacon" />
            </div>

            <GlitchText
              text="Let's Connect"
              as="p"
              className="text-2xl font-semibold uppercase tracking-[0.03em] text-[color:var(--color-text)] md:text-4xl"
              delay={0.2}
            />
            <Reveal delay={0.3} variant="fade-up">
              <p className="mt-3 max-w-3xl text-muted">{siteData.availability}</p>
            </Reveal>
            <div className="mt-6 flex flex-wrap gap-3">
              {siteData.contactLinks.map((link, idx) => (
                <Reveal key={link.href} delay={0.4 + idx * 0.1} variant="scale">
                  <MagneticButton>
                    <a
                      href={link.href}
                      target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      className="inline-flex items-center gap-2 rounded border border-white/20 bg-white/[0.02] px-5 py-2.5 text-xs uppercase tracking-[0.16em] text-[color:var(--color-text)] transition-all hover:border-[color:var(--color-accent-crimson)] hover:text-[color:var(--color-accent-crimson)] hover:shadow-[0_0_20px_rgba(216,138,42,0.15)]"
                    >
                      {getLinkIcon(link.href, link.label)}
                      {link.label}
                    </a>
                  </MagneticButton>
                </Reveal>
              ))}
            </div>
          </article>
        </AnimatedBorder>
      </Reveal>
    </Section>
  );
}
