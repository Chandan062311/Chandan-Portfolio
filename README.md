<div align="center">

# ⛏ Chandan Satwani — Portfolio

**AI Engineer & Data Scientist | GenAI · MLOps**

A single-page engineering portfolio with a Dome Keeper–inspired mining-ops aesthetic,
built to showcase shipped AI projects, interactive demos, and active learning signals.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Three.js](https://img.shields.io/badge/Three.js-r182-000?logo=three.js)](https://threejs.org)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-FF0050?logo=framer&logoColor=white)](https://motion.dev)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployed-000?logo=vercel)](https://chandansatwani.vercel.app)

</div>

---

## ✨ Highlights

| Feature | Details |
|---------|---------|
| **3D Hero Scene** | WebGL particle field, floating shapes & wireframe grid via React Three Fiber |
| **3 Switchable Themes** | Mining ⛏ (amber) · Deep Sea 🌊 (cyan) · Nebula 🪐 (purple) — persisted in localStorage, zero FOUC |
| **Section Backdrops** | 7 AI-generated backgrounds with per-section focal tuning, scan-line overlays & noise layers |
| **Motion System** | Intersection-observer reveals, stagger cascades, tilt cards, magnetic buttons, glitch text — all `prefers-reduced-motion` safe |
| **SVG Skill Constellation** | Interactive force-directed graph replacing WebGL for reliability |
| **Terminal Easter Egg** | 30+ commands, ↑/↓ history, Tab autocomplete, `neofetch`, `matrix`, theme switching, project deep-dives |
| **HUD Nav** | Sticky header with scroll-progress meter, active-section detection, mobile-responsive |
| **Project Case Studies** | Modal drill-down with problem → decisions → outcome storytelling |
| **Data-Driven** | All content lives in a single typed `SiteConfig` with build-time validation guards |
| **SEO & Open Graph** | Dynamic OG image generation, Twitter card meta, structured metadata |

---

## 🖼 Themes

| Mining ⛏ | Deep Sea 🌊 | Nebula 🪐 |
|-----------|-------------|-----------|
| Amber & steel on dark iron | Cyan & teal on midnight ocean | Purple & indigo on cosmic void |

Switch themes via the toggle in the header or type `theme ocean` in the terminal (`Ctrl + ~`).

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/Chandan062311/chandan-portfolio.git
cd chandan-portfolio

# Install
npm install

# Dev server (Turbopack)
npm run dev
# → http://localhost:3000

# Production build
npm run build && npm start
```

### Prerequisites

- **Node.js** ≥ 18.17
- **npm** ≥ 9

---

## 🗂 Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata, theme script
│   ├── page.tsx                # Entry: validates data → renders sections
│   ├── globals.css             # Theme tokens, HUD classes, animations
│   ├── icon.svg                # Browser favicon
│   ├── apple-icon.tsx          # Dynamic Apple Touch icon
│   └── opengraph-image.tsx     # Dynamic OG image (1200×630)
├── components/
│   ├── layout/                 # SiteHeader, Section, SectionBackdrop, ThemeProvider, etc.
│   ├── sections/               # Hero, About, Experience, Projects, Skills, Learning, Contact
│   ├── motion/                 # Reveal, StaggerReveal, TiltCard, MagneticButton, GlitchText, SkillConstellation
│   ├── three/                  # HeroScene, ParticleField, FloatingShapes, FloatingGrid
│   └── shared/                 # Modal, TerminalEasterEgg
├── data/
│   ├── site.ts                 # Single source of truth for all content
│   └── themes.ts               # Theme color definitions
├── lib/
│   └── contentValidation.ts    # Build-time data integrity checks
└── types/
    └── portfolio.ts            # Strict TypeScript contracts
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 (strict mode) |
| UI | React 19, Tailwind CSS v4 |
| 3D | Three.js r182, React Three Fiber 9, Drei 10 |
| Animation | Framer Motion 12 |
| Hosting | Vercel (static export compatible) |
| Linting | ESLint 9 + eslint-config-next |

---

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | ESLint check |

### Type Check

```bash
npx tsc --noEmit
```

> **Note:** On a fresh clone, run `npm run build` once before `npx tsc --noEmit` to generate Next.js type stubs.

---

## 🎮 Terminal Easter Egg

Press **Ctrl + ~** (or **⌘ + ~** on Mac) to open the terminal overlay. A few commands to try:

```
help              — List all commands
neofetch          — System info card
projects          — Project overview
projects rag      — Deep-dive a specific project
theme nebula      — Switch to Nebula theme
fortune           — Random dev wisdom
matrix            — Matrix rain effect
ls / cat / tree   — Simulated file system
coffee            — Essential command
```

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Framework Preset: **Next.js** (auto-detected)
4. Deploy — zero config needed

### Environment Variables

No environment variables are required for the base deployment.

---

## 📝 Content Editing

All portfolio content is centralized in [`src/data/site.ts`](src/data/site.ts):

- **Identity** — name, title, tagline, intro
- **Experience** — work history entries
- **Projects** — top 3 featured cards with case-study details
- **Skills** — grouped by capability cluster
- **Learning Radar** — active research topics
- **Contact** — email, GitHub, LinkedIn, X, YouTube

The validation layer in [`src/lib/contentValidation.ts`](src/lib/contentValidation.ts) enforces required sections, nav coverage, and the top-3 project rule at build time.

---

## ♿ Accessibility

- Keyboard navigation with visible `:focus-visible` rings
- Skip-to-content link
- `prefers-reduced-motion` respected across all animations
- Sufficient text contrast on every backdrop
- Semantic HTML landmarks

---

## 📄 License

This is a personal portfolio project. The codebase is provided as-is for reference and inspiration.

---

<div align="center">

**Built with 🧪 by [Chandan Satwani](https://github.com/Chandan062311)**

</div>
