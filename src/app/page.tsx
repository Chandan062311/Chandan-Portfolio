import dynamic from "next/dynamic";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CursorSpotlight } from "@/components/layout/CursorSpotlight";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { TerminalEasterEgg } from "@/components/shared/TerminalEasterEgg";
import { HeroTextOnly } from "@/components/sections/HeroTextOnly";
import { siteData } from "@/data/site";
import { validateSiteData } from "@/lib/contentValidation";
import type { SectionId } from "@/types/portfolio";
import type { ReactNode } from "react";

/* Lazy-load below-fold sections for smaller initial JS bundle */
const AboutSection = dynamic(() => import("@/components/sections/AboutSection").then(m => m.AboutSection));
const ExperienceSection = dynamic(() => import("@/components/sections/ExperienceSection").then(m => m.ExperienceSection));
const FeaturedProjectsSection = dynamic(() => import("@/components/sections/FeaturedProjectsSection").then(m => m.FeaturedProjectsSection));
const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection").then(m => m.SkillsSection));
const LearningRadarSection = dynamic(() => import("@/components/sections/LearningRadarSection").then(m => m.LearningRadarSection));
const ContactSection = dynamic(() => import("@/components/sections/ContactSection").then(m => m.ContactSection));

export default function Home() {
  if (process.env.NODE_ENV === "development") {
    validateSiteData(siteData);
  }
  const sections: Record<SectionId, ReactNode> = {
    home: <HeroTextOnly />,
    about: <AboutSection />,
    experience: <ExperienceSection />,
    projects: <FeaturedProjectsSection />,
    skills: <SkillsSection />,
    learning: <LearningRadarSection />,
    contact: <ContactSection />,
  };

  return (
    <ThemeProvider>
      <div
        className="theme-dome min-h-screen bg-[color:var(--color-background)] text-[color:var(--color-text)]"
      >
        <CursorSpotlight />
        <SiteHeader />
        <main id="main-content" className="space-y-0">
          {siteData.sectionOrder.map((sectionId) => (
            <div key={sectionId}>{sections[sectionId]}</div>
          ))}
        </main>
        <SiteFooter />
        <TerminalEasterEgg />
      </div>
    </ThemeProvider>
  );
}
