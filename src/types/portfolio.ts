export interface MotionRevealPreset {
  duration: number;
  ease: [number, number, number, number];
}

export interface MotionAmbientPulsePreset {
  duration: number;
  intensity: number;
}

export interface ThemeTokens {
  colors: {
    background: string;
    surface: string;
    surfaceStrong: string;
    text: string;
    muted: string;
    accentCrimson: string;
    accentSteel: string;
    accentGlow: string;
  };
  motion: {
    reveal: MotionRevealPreset;
    stagger: number;
    ambientPulse: MotionAmbientPulsePreset;
  };
}

export type SectionId =
  | "home"
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "learning"
  | "contact";

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  highlights: string[];
}

export interface ProjectItem {
  name: string;
  summary: string;
  problem: string;
  decisions: string[];
  outcome: string;
  stack: string[];
  repoUrl: string;
  liveUrl?: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface LearningTopic {
  title: string;
  focus: string;
  cadence: string;
}

export interface ContactLink {
  label: string;
  href: string;
}

export interface SectionArtDefinition {
  src: string;
  alt: string;
  overlayStrength: number;
  focalPosition: string;
  mobileFocalPosition?: string;
}

export type SectionArtMap = Record<SectionId, SectionArtDefinition>;

export interface HudConfig {
  missionLabel: string;
  navStyle: "hud";
}

export interface SiteConfig {
  name: string;
  title: string;
  tagline: string;
  intro: string;
  profileStatement: string;
  heroHighlights: string[];
  availability: string;
  email: string;
  nav: NavItem[];
  sectionOrder: SectionId[];
  sectionArt: SectionArtMap;
  hud: HudConfig;
  themeVariant?: "dome_keeper_inspired";
  about: string[];
  experience: ExperienceItem[];
  skills: SkillGroup[];
  projects: ProjectItem[];
  learningRadar: LearningTopic[];
  contactLinks: ContactLink[];
  theme: ThemeTokens;
}
