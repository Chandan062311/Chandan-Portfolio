import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { siteData } from "@/data/site";

const REVEAL_VARIANTS = ["fade-left", "fade-right", "fade-left"] as const;
const BORDER_COLORS = [
  "border-l-[color:var(--color-accent-crimson)]",
  "border-l-[color:var(--color-accent-steel)]",
  "border-l-[color:var(--color-accent-crimson)]",
];

export function AboutSection() {
  return (
    <Section
      id="about"
      station="Surface Brief"
      title="Identity Scan"
      subtitle="Operational principles that guide how I design, build, and iterate."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {siteData.about.map((item, index) => (
          <Reveal key={item} delay={index * siteData.theme.motion.stagger} variant={REVEAL_VARIANTS[index % 3]}>
            <TiltCard>
              <article className={`hud-panel relative h-full overflow-hidden border-l-2 ${BORDER_COLORS[index % 3]}`}>
                {/* Watermark index */}
                <span className="pointer-events-none absolute right-3 top-1 select-none font-heading text-6xl font-bold leading-none text-white/[0.04]">
                  0{index + 1}
                </span>
                <p className="hud-kicker text-sm">
                  0{index + 1}
                </p>
                <p className="mt-3 text-[color:var(--color-text)]">{item}</p>
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
