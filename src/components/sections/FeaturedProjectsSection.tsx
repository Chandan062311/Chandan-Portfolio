"use client";

import { useState } from "react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { AnimatedBorder } from "@/components/motion/StaggerReveal";
import { Modal } from "@/components/shared/Modal";
import { ProjectCaseStudy } from "@/components/sections/ProjectCaseStudy";
import { siteData } from "@/data/site";
import type { ProjectItem } from "@/types/portfolio";

export function FeaturedProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <Section
      id="projects"
      station="Excavation Proof"
      title="Build Core"
      subtitle="Top three extraction zones: problem, decisions, and outcomes from shipped work."
    >
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {siteData.projects.map((project, index) => (
          <Reveal key={project.name} delay={index * siteData.theme.motion.stagger} variant="scale">
            <TiltCard>
              <AnimatedBorder>
                <article
                  className="hud-panel h-full cursor-pointer border-l-2 border-l-[color:var(--color-accent-crimson)]"
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                  aria-label={`View ${project.name} case study`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-semibold uppercase tracking-[0.03em] text-[color:var(--color-text)]">
                      {project.name}
                    </h3>
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-[color:var(--color-accent-crimson)] transition-colors hover:text-[color:var(--color-text)]"
                      aria-label={`${project.name} repository`}
                    >
                      {/* GitHub icon */}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
                      </svg>
                      Repo
                    </a>
                  </div>
                  <p className="mt-3 text-sm text-[color:var(--color-text)]">{project.summary}</p>

                  <div className="mt-4 space-y-3 text-sm">
                    <div>
                      <p className="hud-kicker text-xs">Problem</p>
                      <p className="mt-1 text-muted">{project.problem}</p>
                    </div>
                    <div>
                      <p className="hud-kicker text-xs">Build Decisions</p>
                      <ul className="mt-1 space-y-1.5 text-muted">
                        {project.decisions.map((decision) => (
                          <li key={decision} className="flex gap-2">
                            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-accent-crimson)]" />
                            <span>{decision}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <p className="mt-4 rounded border border-[color:var(--color-accent-steel)]/20 bg-[color:var(--color-accent-steel)]/[0.04] px-3 py-2 text-sm text-muted">
                    <span className="font-heading text-xs font-semibold uppercase tracking-widest text-[color:var(--color-accent-steel)]">Outcome </span>
                    {project.outcome}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tech, tIdx) => (
                      <Reveal key={tech} delay={index * siteData.theme.motion.stagger + tIdx * 0.04} variant="scale">
                        <li className="resource-tag">{tech}</li>
                      </Reveal>
                    ))}
                  </ul>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="group mt-5 inline-flex items-center gap-1.5 text-sm uppercase tracking-[0.14em] text-[color:var(--color-text)] underline decoration-[color:var(--color-accent-crimson)] decoration-2 underline-offset-4 transition-colors hover:text-[color:var(--color-accent-crimson)]"
                    >
                      Live Demo
                      <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                    </a>
                  ) : null}

                  <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
                    Click for full case study →
                  </p>
                </article>
              </AnimatedBorder>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && <ProjectCaseStudy project={selectedProject} />}
      </Modal>
    </Section>
  );
}
