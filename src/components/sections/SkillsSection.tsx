"use client";

import dynamic from "next/dynamic";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { siteData } from "@/data/site";
import { useEffect, useState } from "react";

const SkillConstellation = dynamic(
  () =>
    import("@/components/motion/SkillConstellation").then(
      (m) => m.SkillConstellation,
    ),
  { ssr: false },
);

function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);
  return mobile;
}

const GROUP_ACCENTS = [
  "from-[color:var(--color-accent-crimson)]",
  "from-[color:var(--color-accent-steel)]",
  "from-[color:var(--color-accent-steel)]",
  "from-[color:var(--color-accent-crimson)]",
];

export function SkillsSection() {
  const isMobile = useIsMobile();

  return (
    <Section
      id="skills"
      station="Tool Matrix"
      title="Capability Grid"
      subtitle="Clustered modules of tools and systems I rely on for delivery."
    >
      {/* Orbital skill constellation (desktop only) */}
      {!isMobile && (
        <Reveal variant="scale">
          <SkillConstellation groups={siteData.skills} />
        </Reveal>
      )}

      {/* Card fallback (always visible) */}
      <div className={`grid gap-4 md:grid-cols-2 ${!isMobile ? "mt-8" : ""}`}>
        {siteData.skills.map((group, index) => (
          <Reveal key={group.title} delay={index * siteData.theme.motion.stagger} variant={index % 2 === 0 ? "fade-left" : "fade-right"}>
            <TiltCard>
              <article className="hud-panel relative h-full overflow-hidden">
                {/* Top gradient accent bar */}
                <div
                  className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${GROUP_ACCENTS[index % GROUP_ACCENTS.length]} to-transparent`}
                  aria-hidden="true"
                />
                <h3 className="text-2xl font-semibold uppercase tracking-[0.03em] text-[color:var(--color-text)]">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item, iIdx) => (
                    <Reveal key={item} delay={index * siteData.theme.motion.stagger + iIdx * 0.035} variant="scale">
                      <li className="resource-tag">{item}</li>
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
