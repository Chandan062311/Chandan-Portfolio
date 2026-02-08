import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { siteData } from "@/data/site";

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      station="Descent Log"
      title="Growth Timeline"
      subtitle="Milestones from the build tunnels: how capability improved across each cycle."
    >
      <div className="timeline-track space-y-5 pl-6">
        {siteData.experience.map((item, index) => (
          <Reveal
            key={`${item.company}-${item.role}`}
            delay={index * siteData.theme.motion.stagger}
            variant={index % 2 === 0 ? "fade-left" : "fade-right"}
          >
            <TiltCard>
              <article className="hud-panel relative overflow-hidden border-l-2 border-l-[color:var(--color-accent-crimson)]">
                <div className="timeline-node timeline-node-glow" />

                {/* Watermark year */}
                <span className="pointer-events-none absolute right-3 top-1 select-none font-heading text-5xl font-bold leading-none text-white/[0.04]">
                  {item.period.split(/[–\-]/)[0]?.trim()}
                </span>

                <div className="flex flex-col justify-between gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-[color:var(--color-text)]">
                      {item.role}
                    </h3>
                    <p className="text-muted">{item.company}</p>
                  </div>
                  <p className="text-sm uppercase tracking-[0.16em] text-[color:var(--color-accent-crimson)]">
                    {item.period}
                  </p>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-[color:var(--color-text)]">
                  {item.highlights.map((highlight, hIdx) => (
                    <Reveal key={highlight} delay={index * siteData.theme.motion.stagger + hIdx * 0.06} variant="fade-up">
                      <li className="flex gap-3">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-accent-crimson)]" />
                        <span>{highlight}</span>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
