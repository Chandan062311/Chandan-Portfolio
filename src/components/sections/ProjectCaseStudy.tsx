"use client";

import { Reveal } from "@/components/motion/Reveal";
import type { ProjectItem } from "@/types/portfolio";

export function ProjectCaseStudy({ project }: { project: ProjectItem }) {
  return (
    <div className="space-y-6 p-4 sm:space-y-8 sm:p-6 md:p-10">
      {/* Header */}
      <div className="space-y-3 border-b border-white/8 pb-8">
        <p className="hud-kicker text-[10px] tracking-[0.2em]">Case Study</p>
        <h2 className="font-heading text-2xl font-bold uppercase tracking-[0.04em] text-[color:var(--color-text)] md:text-3xl">
          {project.name}
        </h2>
        <p className="leading-relaxed text-[color:var(--color-muted)]">{project.summary}</p>
      </div>

      {/* Problem */}
      <Reveal variant="fade-left">
        <div className="rounded-xl border border-[color:var(--color-accent-crimson)]/15 bg-[color:var(--color-accent-crimson)]/[0.03] p-4 sm:p-6">
          <p className="hud-kicker mb-3 text-[10px] tracking-[0.2em]">The Problem</p>
          <p className="leading-relaxed text-[color:var(--color-text)]">{project.problem}</p>
        </div>
      </Reveal>

      {/* Decisions */}
      <Reveal variant="fade-right" delay={0.1}>
        <div className="space-y-4">
          <p className="hud-kicker text-[10px] tracking-[0.2em]">Build Decisions</p>
          <div className="space-y-3">
            {project.decisions.map((decision, i) => (
              <Reveal key={decision} delay={0.15 + i * 0.08} variant="fade-up">
                <div className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-3 sm:gap-4 sm:p-5">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-accent-steel)]/30 font-heading text-xs font-bold text-[color:var(--color-accent-steel)]">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-[color:var(--color-text)]">{decision}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Outcome */}
      <Reveal variant="scale" delay={0.3}>
        <div className="rounded-xl border border-[color:var(--color-accent-steel)]/20 bg-[color:var(--color-accent-steel)]/[0.05] p-4 sm:p-6">
          <p className="hud-kicker mb-3 text-[10px] tracking-[0.2em]" style={{ color: "var(--color-accent-steel)" }}>
            Outcome
          </p>
          <p className="leading-relaxed text-[color:var(--color-text)]">{project.outcome}</p>
        </div>
      </Reveal>

      {/* Tech stack */}
      <div className="space-y-3">
        <p className="hud-kicker text-[10px] tracking-[0.2em]">Tech Stack</p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span key={tech} className="resource-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-3 border-t border-white/8 pt-6">
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-5 py-3 text-xs uppercase tracking-[0.16em] text-[color:var(--color-text)] transition-all hover:border-[color:var(--color-accent-crimson)] hover:text-[color:var(--color-accent-crimson)]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
          </svg>
          View Repository
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-lg border border-[color:var(--color-accent-crimson)] bg-[color:var(--color-accent-crimson)]/15 px-5 py-3 text-xs uppercase tracking-[0.16em] text-[color:var(--color-text)] transition-all hover:bg-[color:var(--color-accent-crimson)]/25"
          >
            Live Demo
            <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </a>
        )}
      </div>
    </div>
  );
}
