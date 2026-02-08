import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { siteData } from "@/data/site";

const CADENCE_COLORS: Record<string, string> = {
  active: "bg-[color:var(--color-accent-crimson)]/20 text-[color:var(--color-accent-crimson)]",
  weekly: "bg-[color:var(--color-accent-steel)]/20 text-[color:var(--color-accent-steel)]",
  continuous: "bg-[color:var(--color-accent-steel)]/20 text-[color:var(--color-accent-steel)]",
};

function getCadenceKey(cadence: string): string {
  const lower = cadence.toLowerCase();
  if (lower.includes("active")) return "active";
  if (lower.includes("weekly")) return "weekly";
  if (lower.includes("continuous") || lower.includes("ongoing")) return "continuous";
  return "continuous";
}

export function LearningRadarSection() {
  return (
    <Section
      id="learning"
      station="Signal Radar"
      title="Active Learning Signals"
      subtitle="Topics currently tracked, tested, and integrated into my build loops."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {siteData.learningRadar.map((topic, index) => (
          <Reveal key={topic.title} delay={index * siteData.theme.motion.stagger} variant="blur">
            <TiltCard>
              <article className="hud-panel relative h-full overflow-hidden">
                {/* Cadence badge */}
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 font-heading text-[10px] font-semibold uppercase tracking-widest ${CADENCE_COLORS[getCadenceKey(topic.cadence)]}`}
                >
                  {topic.cadence}
                </span>
                <h3 className="mt-3 text-2xl font-semibold uppercase tracking-[0.03em] text-[color:var(--color-text)]">
                  {topic.title}
                </h3>
                <p className="mt-3 text-sm text-muted">{topic.focus}</p>

                {/* Radar rings */}
                <div className="relative mt-5 flex h-10 items-center justify-center" aria-hidden="true">
                  <span className="beacon" />
                  {[0, 1, 2].map((ring) => (
                    <span
                      key={ring}
                      className="absolute h-6 w-6 rounded-full border border-[color:var(--color-accent-crimson)]/20"
                      style={{
                        animation: `radarRingExpand 2.4s ease-out ${ring * 0.6}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
