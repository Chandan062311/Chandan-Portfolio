# Project Handover: Chandan Portfolio

Last updated: 2026-02-08

## 1) Project Snapshot

- Project: Single-page portfolio for Chandan Satwani.
- Current visual direction: original Dome Keeper-inspired mining/HUD theme (not franchise-replica).
- Status: V2 thematic scaffold and section-based UI implemented; image assets wired from local PNG files.
- Stack: Next.js App Router + TypeScript + Tailwind CSS v4 + Framer Motion.

## 2) Product Goal

- Present Chandan as a software engineer actively learning AI and shipping public builds.
- Keep strong personality and atmosphere while preserving recruiter-safe readability.
- No backend for v1: contact through email and social links.

## 3) Runtime + Build

- Node scripts:
  - `npm run dev`
  - `npm run lint`
  - `npm run build`
  - `npm run start`
- Build note:
  - `tsconfig.json` includes `.next/types/**/*.ts`.
  - On a clean workspace, run `npm run build` once before `npx tsc --noEmit` if type files are missing.

## 4) Current Architecture

- Entrypoint: `src/app/page.tsx`
  - Validates data with `validateSiteData(siteData)`.
  - Injects theme CSS variables from `siteData.theme`.
  - Renders sections dynamically from `siteData.sectionOrder`.
- Data source of truth: `src/data/site.ts`
  - All content + nav + section order + section backdrop mapping + HUD metadata.
- Typed contracts: `src/types/portfolio.ts`
  - Includes strict section ids and section-art definitions.
- Validation guards: `src/lib/contentValidation.ts`
  - Enforces required sections, nav coverage, HUD config, art metadata, and top-3 project rule.

## 5) Section System (Current Order)

Defined by `siteData.sectionOrder`:

1. `home` -> `HeroTextOnly` (Command Deck)
2. `about` -> `AboutSection` (Surface Brief)
3. `experience` -> `ExperienceSection` (Descent Log)
4. `projects` -> `FeaturedProjectsSection` (Excavation Proof)
5. `skills` -> `SkillsSection` (Tool Matrix)
6. `learning` -> `LearningRadarSection` (Signal Radar)
7. `contact` -> `ContactSection` (Uplink Contact)

Main section wrapper:

- `src/components/layout/Section.tsx`
- Uses `SectionBackdrop` internally for themed background layering.

## 6) Theme and Visual Layer

- Global theme + utilities: `src/app/globals.css`
- Key classes:
  - `.section-shell`, `.section-image-layer`, `.section-overlay-layer`, `.section-noise-layer`
  - `.hud-panel`, `.hud-chip`, `.resource-tag`, `.hud-kicker`
  - `.timeline-track`, `.timeline-node`, `.radar-ping`
  - `.hud-progress-track`, `.hud-progress-fill`
- Motion:
  - Reveal transitions in `src/components/motion/Reveal.tsx`
  - Respects `prefers-reduced-motion`.

## 7) Background Asset Pipeline

### Canonical asset paths used by app

Folder: `public/theme/dome/`

- `hero-command-deck.png`
- `surface-brief.png`
- `descent-log.png`
- `excavation-proof.png`
- `tool-matrix.png`
- `signal-radar.png`
- `uplink-contact.png`

These are mapped in `src/data/site.ts -> sectionArt`.

### Important note

- Raw generated files with names like `Gemini_Generated_Image_*.png` are still present.
- App only uses the canonical filenames listed above.
- You can keep raw files for archive or remove them to reduce repo size/noise.

## 8) Navigation and HUD Behavior

- Header: `src/components/layout/SiteHeader.tsx`
  - Sticky HUD bar.
  - Active section detection by scroll position.
  - Top progress meter based on page scroll ratio.
  - Desktop and compact mobile nav variants.

## 9) Content Model (Current)

`siteData` contains:

- Identity text (`name`, `title`, `intro`, `profileStatement`).
- Mission chips (`heroHighlights`).
- Structured experience entries.
- Top 3 curated project cards (`summary`, `problem`, `decisions`, `outcome`).
- Skills grouped by capability cluster.
- Learning radar topics.
- Contact links.
- Theme tokens and motion tokens.
- Section order + section artwork + HUD metadata.

## 10) Accessibility + Safety Rules

- Keep keyboard focus visibility (`:focus-visible`) and text contrast acceptable on every backdrop.
- Preserve `prefers-reduced-motion` behavior; avoid adding non-essential heavy animation loops.
- Keep design original; do not include copyrighted logos/character art.
- Maintain factual content integrity in `src/data/site.ts` (no fabricated claims).

## 11) Figma and Image Workflow

### Figma MCP flow (when a Figma node is provided)

1. `get_design_context`
2. `get_metadata` only if context is truncated
3. `get_screenshot`
4. Implement with current project conventions/tokens
5. Validate parity against screenshot

### Image generation workflow (if needed later)

- This repo currently expects manual assets in `public/theme/dome/`.
- If using image generation CLI later, use canonical output names above for direct drop-in replacement.

## 12) Known Gaps / Next Improvements

- Fine-grain section polish may still be needed after real-device visual QA.
- Optional cleanup:
  - Remove archived raw PNGs or move them under `public/theme/dome/archive/`.
  - Convert large PNGs to optimized WebP/AVIF for performance once final art is locked.
- If typography should be more premium, replace fallback font stacks with bundled/local fonts that do not require blocked network fetches.

## 13) Quick File Map

- App entry: `src/app/page.tsx`
- Global styles: `src/app/globals.css`
- Data/config: `src/data/site.ts`
- Types: `src/types/portfolio.ts`
- Validation: `src/lib/contentValidation.ts`
- Backdrop engine: `src/components/layout/SectionBackdrop.tsx`
- Section wrapper: `src/components/layout/Section.tsx`
- Header/footer/container: `src/components/layout/*`
- Sections: `src/components/sections/*`
- Motion wrapper: `src/components/motion/Reveal.tsx`

## 14) Validation Checklist (handover baseline)

Run these before merging future UI changes:

1. `npm run lint`
2. `npx tsc --noEmit`
3. `npx next build --webpack`

If all pass, baseline integrity is preserved.
