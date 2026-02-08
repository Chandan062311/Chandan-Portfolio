import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CursorSpotlight } from "@/components/layout/CursorSpotlight";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { TerminalEasterEgg } from "@/components/shared/TerminalEasterEgg";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { HeroTextOnly } from "@/components/sections/HeroTextOnly";
import { LearningRadarSection } from "@/components/sections/LearningRadarSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { siteData } from "@/data/site";
import { validateSiteData } from "@/lib/contentValidation";
import type { SectionId } from "@/types/portfolio";
import type { ReactNode } from "react";

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
