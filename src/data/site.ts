import type { SiteConfig } from "@/types/portfolio";

export const siteData: SiteConfig = {
  name: "Chandan Satwani",
  title: "AI Engineer & Data Scientist | GenAI · MLOps",
  tagline: "Turning research papers into playable AI experiences — shipped from Chandan AI Labs.",
  intro:
    "I build interactive apps that make Generative AI tangible: gamified RAG pipelines, neuron-level model visualizers, and live multi-agent races — all deployed and open-source.",
  profileStatement:
    "8+ live AI demos, each converting a complex concept into something you can see, play, and understand.",
  heroHighlights: [
    "GenAI & LLM Applications",
    "MLOps & Deployment Pipelines",
    "Interactive AI Education",
  ],
  availability: "AI Engineer at Allegion India — open to collaborations and GenAI consulting.",
  email: "chandansatwani@gmail.com",
  nav: [
    { id: "home", label: "Command Deck" },
    { id: "about", label: "Surface Brief" },
    { id: "experience", label: "Descent Log" },
    { id: "projects", label: "Excavation Proof" },
    { id: "skills", label: "Tool Matrix" },
    { id: "learning", label: "Signal Radar" },
    { id: "contact", label: "Uplink Contact" },
  ],
  sectionOrder: [
    "home",
    "about",
    "experience",
    "projects",
    "skills",
    "learning",
    "contact",
  ],
  sectionArt: {
    home: {
      src: "/theme/dome/hero-command-deck.png",
      alt: "Subterranean command deck atmosphere with mining station silhouettes.",
      overlayStrength: 0.62,
      focalPosition: "50% center",
      mobileFocalPosition: "52% center",
    },
    about: {
      src: "/theme/dome/surface-brief.png",
      alt: "Rocky outpost above a cavern entrance at dusk.",
      overlayStrength: 0.44,
      focalPosition: "52% 44%",
      mobileFocalPosition: "58% 36%",
    },
    experience: {
      src: "/theme/dome/descent-log.png",
      alt: "Vertical cave shaft descent with layered strata and rail silhouettes.",
      overlayStrength: 0.42,
      focalPosition: "center center",
      mobileFocalPosition: "50% center",
    },
    projects: {
      src: "/theme/dome/excavation-proof.png",
      alt: "Mining chamber with modular stations and extracted fragments.",
      overlayStrength: 0.36,
      focalPosition: "center center",
      mobileFocalPosition: "50% center",
    },
    skills: {
      src: "/theme/dome/tool-matrix.png",
      alt: "Compact equipment bay wall with sockets and utility racks.",
      overlayStrength: 0.46,
      focalPosition: "center center",
      mobileFocalPosition: "50% center",
    },
    learning: {
      src: "/theme/dome/signal-radar.png",
      alt: "Dark tactical room ambiance with circular radar motifs.",
      overlayStrength: 0.50,
      focalPosition: "center center",
      mobileFocalPosition: "50% center",
    },
    contact: {
      src: "/theme/dome/uplink-contact.png",
      alt: "Extraction uplink terminal platform with beacon-like glow.",
      overlayStrength: 0.38,
      focalPosition: "center center",
      mobileFocalPosition: "50% center",
    },
  },
  hud: {
    missionLabel: "Mission: Build, Learn, Ship",
    navStyle: "hud",
  },
  themeVariant: "dome_keeper_inspired",
  about: [
    "ML engineer from Bangalore building at Chandan AI Labs — my one-person research-to-product studio. Every project starts with a paper or framework I want to deeply understand, and ends as a deployed, interactive experience.",
    "My approach: take dense AI concepts — RAG orchestration, mechanistic interpretability, confident adaptive decoding — and turn them into gamified Next.js apps powered by live LLM APIs (OpenRouter, DeepSeek). If you can play it, you understand it.",
    "Before going all-in on AI, I shipped full-stack products across Angular, Flutter, Node.js, and AWS. That engineering foundation now fuels faster, more reliable AI prototyping — from idea to Vercel deployment in days, not months.",
  ],
  experience: [
    {
      role: "AI Engineer / Data Scientist",
      company: "Allegion India",
      period: "2024 — Present",
      highlights: [
        "Building and deploying AI/ML solutions for enterprise security and access-control systems.",
        "Applying data science and GenAI techniques to improve product intelligence and operational workflows.",
      ],
    },
    {
      role: "Founder & AI Builder",
      company: "Chandan AI Labs (Side Projects)",
      period: "2025 — Present",
      highlights: [
        "Shipped 8+ interactive AI demos — each turns a research paper into a playable, deployed experience.",
        "Built gamified learning tools (Agentic RAG Arcade, Pydantic Quest) with mission-based XP systems and live LLM mentoring via OpenRouter/DeepSeek.",
        "Created neuron-level model visualizers (DragonHatchling, CALM) and multi-agent orchestration races (Async Think).",
      ],
    },
  ],
  skills: [
    {
      title: "AI / ML Core",
      items: ["Python", "PyTorch", "TensorFlow", "Scikit-learn", "NLP", "LLMs", "RAG", "Prompt Engineering"],
    },
    {
      title: "GenAI Tooling",
      items: ["OpenRouter", "DeepSeek", "LangChain", "Pydantic", "Vector Stores", "Multi-Agent Orchestration"],
    },
    {
      title: "Web & Full-Stack",
      items: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Node.js", "Express", "Angular", "Flutter"],
    },
    {
      title: "Infra & Data",
      items: ["Docker", "AWS", "Firebase", "MongoDB", "MySQL", "Linux", "Git", "Vercel"],
    },
  ],
  projects: [
    {
      name: "Agentic RAG Arcade",
      summary: "Gamified walkthrough of a full RAG pipeline — mission-based learning with XP, vector store simulation, and live LLM mentoring.",
      problem:
        "RAG pipelines are abstract and hard to learn without seeing each stage in action — chunking, embedding, retrieval, generation.",
      decisions: [
        "Designed a mission-based XP system where each stage (chunk → embed → retrieve → generate) is a playable level.",
        "Built a mock vector store with visual similarity search so learners see retrieval mechanics.",
        "Integrated DeepSeek via OpenRouter as a stage-by-stage mentor that coaches through each RAG phase.",
      ],
      outcome:
        "A fully playable educational tool live on Vercel — students interact with every RAG component instead of just reading about it.",
      stack: ["Next.js 14", "TypeScript", "OpenRouter", "DeepSeek", "Tailwind CSS", "Vercel"],
      repoUrl: "https://github.com/Chandan062311/Agentic_rag",
      liveUrl: "https://agentic-rag-csailabs.vercel.app",
    },
    {
      name: "DragonHatchling — Synapse Monitor",
      summary: "Interactive visualizer comparing dense polysemantic transformers with sparse monosemantic 'Baby Dragon Hatchling' neurons.",
      problem:
        "Mechanistic interpretability is opaque — there's no intuitive way to see how superposition works inside transformer neurons.",
      decisions: [
        "Built a neuron activation grid with polysemantic heatmaps showing how single neurons fire for multiple unrelated concepts.",
        "Added concept flash cards and LLM-driven scenario battles to make the BDH sparse-model theory tangible.",
        "Animated activation patterns side-by-side: dense (confused) vs. monosemantic (clean, interpretable).",
      ],
      outcome:
        "An interactive simulator that makes the superposition problem visible and demonstrates why monosemantic neurons matter for AI safety.",
      stack: ["Next.js 14", "TypeScript", "Framer Motion", "Tailwind CSS", "Vercel"],
      repoUrl: "https://github.com/Chandan062311/DragonHatchling",
      liveUrl: "https://dragon-hatchling-csailabs.vercel.app",
    },
    {
      name: "Async Think",
      summary: "Live race visualization of 3 multi-agent LLM orchestration strategies — Sequential, Parallel, and AsyncThink.",
      problem:
        "Comparing sequential, parallel, and async LLM coordination is impossible without side-by-side timing and token-level visibility.",
      decisions: [
        "Races 3 concurrent DeepSeek workers in real-time with animated progress bars and token streaming.",
        "Measures and displays latency metrics so users see exactly why async orchestration outperforms naive approaches.",
        "Designed as a visual 'AI Team-Lead Race' — each strategy is a competing team with live status updates.",
      ],
      outcome:
        "An interactive demo that makes abstract orchestration trade-offs concrete — users watch the race and instantly grasp async advantages.",
      stack: ["Next.js", "TypeScript", "OpenRouter", "DeepSeek", "Tailwind CSS", "Vercel"],
      repoUrl: "https://github.com/Chandan062311/Async_Think",
      liveUrl: "https://async-think-csailabs.vercel.app",
    },
  ],
  learningRadar: [
    {
      title: "Mechanistic Interpretability",
      focus: "Monosemantic neurons, superposition analysis, BDH sparse models — understanding what's happening inside transformers.",
      cadence: "Active",
    },
    {
      title: "Agentic AI Patterns",
      focus: "RAG orchestration, multi-agent coordination, async LLM pipelines — building systems where AI agents collaborate.",
      cadence: "Active",
    },
    {
      title: "Efficient Inference (CALM)",
      focus: "Confident adaptive language modeling, speculative decoding, token-skipping — making LLMs faster without losing quality.",
      cadence: "Weekly",
    },
  ],
  contactLinks: [
    { label: "Email", href: "mailto:chandansatwani@gmail.com" },
    { label: "GitHub", href: "https://github.com/Chandan062311" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/chandan-satwani/",
    },
    { label: "X / Twitter", href: "https://x.com/ChandanAILab" },
    { label: "YouTube", href: "https://www.youtube.com/@ChandanSatwani-ai" },
  ],
  theme: {
    colors: {
      background: "#080B0F",
      surface: "#111720",
      surfaceStrong: "#18212D",
      text: "#F1F5F9",
      muted: "#C1CBD6",
      accentCrimson: "#D88A2A",
      accentSteel: "#5FA8A0",
      accentGlow: "rgba(216, 138, 42, 0.34)",
    },
    motion: {
      reveal: {
        duration: 1.0,
        ease: [0.19, 1, 0.22, 1],
      },
      stagger: 0.18,
      ambientPulse: {
        duration: 5.0,
        intensity: 1.015,
      },
    },
  },
};
