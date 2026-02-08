import type { SiteConfig } from "@/types/portfolio";

export function validateSiteData(config: SiteConfig): void {
  const expectedSections = [
    "home",
    "about",
    "experience",
    "projects",
    "skills",
    "learning",
    "contact",
  ] as const;

  if (!config.name.trim()) {
    throw new Error("Missing required field: name");
  }

  if (!config.title.trim()) {
    throw new Error("Missing required field: title");
  }

  if (!config.email.includes("@")) {
    throw new Error("Missing or invalid required field: email");
  }

  if (!config.nav.length) {
    throw new Error("Navigation must include at least one item");
  }

  if (config.hud.navStyle !== "hud") {
    throw new Error("HUD navigation style must be set to `hud`");
  }

  if (!config.hud.missionLabel.trim()) {
    throw new Error("HUD mission label is required");
  }

  if (config.sectionOrder.length !== expectedSections.length) {
    throw new Error("Section order must contain exactly 7 sections");
  }

  const orderSet = new Set(config.sectionOrder);
  if (orderSet.size !== expectedSections.length) {
    throw new Error("Section order contains duplicate items");
  }

  for (const sectionId of expectedSections) {
    if (!orderSet.has(sectionId)) {
      throw new Error(`Section order is missing required section: ${sectionId}`);
    }

    const art = config.sectionArt[sectionId];
    if (!art?.src?.trim()) {
      throw new Error(`Missing section art src for: ${sectionId}`);
    }
    if (!art?.alt?.trim()) {
      throw new Error(`Missing section art alt for: ${sectionId}`);
    }
    if (art.overlayStrength < 0 || art.overlayStrength > 1) {
      throw new Error(`Section art overlayStrength must be between 0 and 1 for: ${sectionId}`);
    }
  }

  const navSet = new Set(config.nav.map((item) => item.id));
  for (const sectionId of expectedSections) {
    if (!navSet.has(sectionId)) {
      throw new Error(`Navigation is missing required section link: ${sectionId}`);
    }
  }

  if (!config.projects.length) {
    throw new Error("At least one featured project is required");
  }

  if (config.projects.length > 3) {
    throw new Error("V2 expects only top 3 curated featured projects");
  }

  if (!config.learningRadar.length) {
    throw new Error("Learning radar requires at least one active topic");
  }

  const hasGithub = config.contactLinks.some((link) =>
    link.href.includes("github.com"),
  );

  if (!hasGithub) {
    throw new Error("Contact links must include a GitHub profile");
  }
}
