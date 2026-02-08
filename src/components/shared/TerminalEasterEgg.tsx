"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/data/site";

interface TerminalLine {
  type: "input" | "output" | "error" | "system" | "ascii" | "success";
  text: string;
}

/* ─── ASCII art ─── */

const ASCII_BANNER = `
 ██████╗██╗  ██╗ █████╗ ███╗   ██╗
██╔════╝██║  ██║██╔══██╗████╗  ██║
██║     ███████║███████║██╔██╗ ██║
██║     ██╔══██║██╔══██║██║╚██╗██║
╚██████╗██║  ██║██║  ██║██║ ╚████║
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝`;

const COFFEE_ART = `
    ( (
     ) )
  .........
  |       |]
  \\       /
   \`-----'`;


/* ─── Command registry ─── */

const ALL_COMMANDS = [
  "help", "whoami", "about", "skills", "projects", "experience",
  "contact", "status", "clear", "exit", "theme", "themes", "repo",
  "coffee", "neofetch", "date", "uptime", "ping", "echo",
  "history", "banner", "matrix", "fortune", "weather", "ls",
  "cat", "open", "sudo", "blog", "learning", "stack", "certifications",
  "linkedin", "github", "email", "social", "resume", "tree", "man",
];

const FORTUNES = [
  "The best way to predict the future is to build it.",
  "AI is the new electricity. — Andrew Ng",
  "Talk is cheap. Show me the code. — Linus Torvalds",
  "First, solve the problem. Then, write the code.",
  "Simplicity is the soul of efficiency.",
  "The only way to do great work is to love what you do.",
  "Ship it. Fix it. Ship it again.",
  "In the middle of difficulty lies opportunity. — Einstein",
  "Make it work, make it right, make it fast.",
  "The best error message is the one that never shows up.",
  "An AI model is only as good as the data you feed it.",
  "Debug the process, not just the code.",
];

const FILE_TREE = `
├── about/
│   ├── background.md
│   ├── philosophy.md
│   └── goals.md
├── experience/
│   ├── allegion-india.md
│   └── chandan-ai-labs.md
├── projects/
│   ├── agentic-rag-arcade/
│   ├── dragon-hatchling/
│   └── async-think/
├── skills/
│   ├── ai-ml-core.json
│   ├── genai-tooling.json
│   ├── web-fullstack.json
│   └── infra-data.json
├── learning/
│   ├── mechanistic-interpretability.md
│   ├── agentic-ai-patterns.md
│   └── calm-inference.md
└── contact.json`;

const MAN_PAGES: Record<string, string> = {
  help: "help — Display list of available commands.\n  Usage: help",
  whoami: "whoami — Print identity and current role.\n  Usage: whoami",
  about: "about — Display bio / about paragraphs.\n  Usage: about",
  skills: "skills — List skill groups with items.\n  Usage: skills",
  projects: "projects — Show featured project cards.\n  Usage: projects [name]\n  Example: projects rag",
  experience: "experience — Show work experience timeline.\n  Usage: experience",
  contact: "contact — Display contact links.\n  Usage: contact",
  status: "status — System diagnostics.\n  Usage: status",
  theme: "theme — Switch portfolio theme.\n  Usage: theme <mining|ocean|nebula>",
  themes: "themes — List available themes.\n  Usage: themes",
  repo: "repo — Open a project GitHub repo.\n  Usage: repo <project-name>",
  coffee: "coffee — Brew some ASCII coffee.\n  Usage: coffee",
  neofetch: "neofetch — System information display.\n  Usage: neofetch",
  fortune: "fortune — Random developer wisdom.\n  Usage: fortune",
  matrix: "matrix — Activate the Matrix.\n  Usage: matrix",
  tree: "tree — Show portfolio file tree.\n  Usage: tree",
  ls: "ls — List current directory contents.\n  Usage: ls [section]",
  cat: "cat — Read a section's content.\n  Usage: cat <section>\n  Sections: about, skills, projects, experience, contact, learning",
  open: "open — Open a URL in new tab.\n  Usage: open <project-name|github|linkedin|email>",
  echo: "echo — Print text to terminal.\n  Usage: echo <text>",
  ping: "ping — Ping a service.\n  Usage: ping <target>",
  social: "social — List all social links.\n  Usage: social",
  stack: "stack — Show full technology stack.\n  Usage: stack",
  banner: "banner — Show the welcome banner.\n  Usage: banner",
  history: "history — Show command history.\n  Usage: history",
  clear: "clear — Clear the terminal screen.\n  Usage: clear",
  exit: "exit — Close the terminal.\n  Usage: exit",
};

/* ─── Command processor ─── */

function processCommand(
  input: string,
  commandHistory: string[],
  setThemeFn?: (id: string) => void,
): TerminalLine[] {
  const trimmed = input.trim();
  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1).join(" ").toLowerCase();

  if (!cmd) return [];

  switch (cmd) {
    case "help":
      return [
        { type: "system", text: "╔══════════════════════════════════════════╗" },
        { type: "system", text: "║     CHANDAN OS — COMMAND REFERENCE       ║" },
        { type: "system", text: "╠══════════════════════════════════════════╣" },
        { type: "output", text: "║  NAVIGATION                              ║" },
        { type: "output", text: "║  whoami      → Identity & current role    ║" },
        { type: "output", text: "║  about       → Bio & background           ║" },
        { type: "output", text: "║  experience  → Work timeline              ║" },
        { type: "output", text: "║  projects    → Featured builds            ║" },
        { type: "output", text: "║  skills      → Skill matrix               ║" },
        { type: "output", text: "║  learning    → Active learning radar      ║" },
        { type: "output", text: "║  contact     → Contact links              ║" },
        { type: "output", text: "║  social      → All social profiles        ║" },
        { type: "output", text: "║                                           ║" },
        { type: "output", text: "║  TOOLS                                    ║" },
        { type: "output", text: "║  status      → System diagnostics         ║" },
        { type: "output", text: "║  neofetch    → System info display        ║" },
        { type: "output", text: "║  stack       → Full tech stack            ║" },
        { type: "output", text: "║  theme       → Switch theme (try it!)     ║" },
        { type: "output", text: "║  themes      → List available themes      ║" },
        { type: "output", text: "║                                           ║" },
        { type: "output", text: "║  FILE SYSTEM                              ║" },
        { type: "output", text: "║  ls          → List directory             ║" },
        { type: "output", text: "║  cat         → Read section content       ║" },
        { type: "output", text: "║  tree        → Portfolio structure        ║" },
        { type: "output", text: "║                                           ║" },
        { type: "output", text: "║  FUN                                      ║" },
        { type: "output", text: "║  fortune     → Developer wisdom           ║" },
        { type: "output", text: "║  coffee      → Brew some ☕               ║" },
        { type: "output", text: "║  matrix      → Enter the Matrix           ║" },
        { type: "output", text: "║  banner      → Show welcome art           ║" },
        { type: "output", text: "║  weather     → Current conditions         ║" },
        { type: "output", text: "║                                           ║" },
        { type: "output", text: "║  ACTIONS                                  ║" },
        { type: "output", text: "║  open        → Open URL (github, etc)     ║" },
        { type: "output", text: "║  repo        → Open project repo          ║" },
        { type: "output", text: "║  ping        → Ping a service             ║" },
        { type: "output", text: "║  echo        → Print text                 ║" },
        { type: "output", text: "║  man         → Manual for a command       ║" },
        { type: "output", text: "║  history     → Command history            ║" },
        { type: "output", text: "║  clear       → Clear screen               ║" },
        { type: "output", text: "║  exit        → Close terminal             ║" },
        { type: "system", text: "╚══════════════════════════════════════════╝" },
        { type: "output", text: "\n  Tip: Use ↑/↓ arrows for command history, Tab for autocomplete." },
      ];

    case "whoami":
      return [
        { type: "system", text: "┌─ Identity ────────────────────────────────" },
        { type: "output", text: `│  Name:     ${siteData.name}` },
        { type: "output", text: `│  Role:     ${siteData.title}` },
        { type: "output", text: `│  Email:    ${siteData.email}` },
        { type: "output", text: `│  Status:   ${siteData.availability}` },
        { type: "output", text: `│  Location: Bangalore, India` },
        { type: "output", text: `│  Lab:      Chandan AI Labs` },
        { type: "system", text: "└────────────────────────────────────────────" },
      ];

    case "about":
      return [
        { type: "system", text: "─── About ───────────────────────────────────" },
        ...siteData.about.map((line, i) => ({
          type: "output" as const,
          text: `\n  [${i + 1}] ${line}`,
        })),
        { type: "system", text: "\n─────────────────────────────────────────────" },
      ];

    case "skills":
      return [
        { type: "system", text: "─── Skill Matrix ────────────────────────────" },
        ...siteData.skills.flatMap((group) => [
          { type: "system" as const, text: `\n  ┌ ${group.title}` },
          { type: "output" as const, text: `  │ ${group.items.join(" · ")}` },
          { type: "system" as const, text: "  └─────────────────────" },
        ]),
      ];

    case "projects": {
      if (args) {
        const match = siteData.projects.find(
          (p) => p.name.toLowerCase().includes(args)
        );
        if (!match) {
          return [{ type: "error", text: `Project not found: "${args}". Try: projects` }];
        }
        return [
          { type: "system", text: `\n╔══ ${match.name.toUpperCase()} ══════════════════════════` },
          { type: "output", text: `║ ${match.summary}` },
          { type: "system", text: "║" },
          { type: "output", text: `║ Problem:  ${match.problem}` },
          { type: "system", text: "║" },
          { type: "output", text: "║ Decisions:" },
          ...match.decisions.map((d, i) => ({
            type: "output" as const,
            text: `║   ${i + 1}. ${d}`,
          })),
          { type: "system", text: "║" },
          { type: "success", text: `║ Outcome: ${match.outcome}` },
          { type: "output", text: `║ Stack:   ${match.stack.join(" · ")}` },
          { type: "output", text: `║ Repo:    ${match.repoUrl}` },
          ...(match.liveUrl ? [{ type: "output" as const, text: `║ Live:    ${match.liveUrl}` }] : []),
          { type: "system", text: "╚═══════════════════════════════════════════" },
        ];
      }
      return [
        { type: "system", text: "─── Featured Projects ───────────────────────" },
        ...siteData.projects.flatMap((p, i) => [
          { type: "system" as const, text: `\n  [${i + 1}] ${p.name}` },
          { type: "output" as const, text: `      ${p.summary}` },
          { type: "output" as const, text: `      Stack: ${p.stack.join(" · ")}` },
          ...(p.liveUrl ? [{ type: "success" as const, text: `      Live:  ${p.liveUrl}` }] : []),
        ]),
        { type: "output", text: "\n  Tip: 'projects <name>' for full case study" },
      ];
    }

    case "experience":
      return [
        { type: "system", text: "─── Experience Timeline ─────────────────────" },
        ...siteData.experience.flatMap((exp) => [
          { type: "system" as const, text: `\n  ┌─ ${exp.role}` },
          { type: "output" as const, text: `  │  ${exp.company} · ${exp.period}` },
          { type: "system" as const, text: "  │" },
          ...exp.highlights.map((h) => ({
            type: "output" as const,
            text: `  │  ▸ ${h}`,
          })),
          { type: "system" as const, text: "  └──────────────────────────────" },
        ]),
      ];

    case "contact":
      return [
        { type: "system", text: "─── Contact ─────────────────────────────────" },
        ...siteData.contactLinks.map((link) => ({
          type: "output" as const,
          text: `  ${link.label.padEnd(14)} ${link.href}`,
        })),
        { type: "output", text: "\n  Tip: 'open <label>' to open in browser" },
      ];

    case "social":
      return [
        { type: "system", text: "─── Social Profiles ─────────────────────────" },
        ...siteData.contactLinks
          .filter((l) => !l.href.startsWith("mailto:"))
          .map((link) => ({
            type: "output" as const,
            text: `  ${link.label.padEnd(14)} → ${link.href}`,
          })),
        { type: "system", text: "─────────────────────────────────────────────" },
      ];

    case "learning":
      return [
        { type: "system", text: "─── Learning Radar ──────────────────────────" },
        ...siteData.learningRadar.flatMap((topic) => [
          { type: "system" as const, text: `\n  ◉ ${topic.title}  [${topic.cadence}]` },
          { type: "output" as const, text: `    ${topic.focus}` },
        ]),
        { type: "system", text: "\n─────────────────────────────────────────────" },
      ];

    case "status": {
      const uptime = Math.floor(performance.now() / 1000);
      const hrs = Math.floor(uptime / 3600);
      const mins = Math.floor((uptime % 3600) / 60);
      const secs = uptime % 60;
      const uptimeStr = `${hrs}h ${mins}m ${secs}s`;
      return [
        { type: "system", text: "┌─ SYSTEM DIAGNOSTICS ───────────────────────" },
        { type: "output", text: `│  Uptime .......... ${uptimeStr}` },
        { type: "output", text: `│  Mission ......... ${siteData.hud.missionLabel}` },
        { type: "output", text: `│  Sections ........ ${siteData.sectionOrder.length} active` },
        { type: "output", text: `│  Projects ........ ${siteData.projects.length} deployed` },
        { type: "output", text: `│  Skills .......... ${siteData.skills.reduce((a, g) => a + g.items.length, 0)} indexed` },
        { type: "output", text: `│  Learning ........ ${siteData.learningRadar.length} active signals` },
        { type: "output", text: `│  Contacts ........ ${siteData.contactLinks.length} channels` },
        { type: "success", text: "│  Reactor ......... ONLINE ●" },
        { type: "success", text: "│  AI Core ......... OPERATIONAL ●" },
        { type: "success", text: "│  Build Status .... PASSING ✓" },
        { type: "system", text: "└────────────────────────────────────────────" },
      ];
    }

    case "neofetch": {
      const uptime = Math.floor(performance.now() / 1000);
      const mins = Math.floor(uptime / 60);
      const ua = typeof navigator !== "undefined" ? navigator.userAgent : "unknown";
      const browser = ua.includes("Firefox") ? "Firefox" : ua.includes("Chrome") ? "Chrome" : ua.includes("Safari") ? "Safari" : "Unknown";
      return [
        { type: "ascii", text: ASCII_BANNER },
        { type: "system", text: "────────────────────────────────────────" },
        { type: "output", text: `  OS:        Chandan OS v2.0` },
        { type: "output", text: `  Host:      ${siteData.name}` },
        { type: "output", text: `  Role:      ${siteData.title}` },
        { type: "output", text: `  Kernel:    Next.js + React + TypeScript` },
        { type: "output", text: `  Shell:     portfolio-sh 2.0` },
        { type: "output", text: `  Browser:   ${browser}` },
        { type: "output", text: `  Uptime:    ${mins}m` },
        { type: "output", text: `  Packages:  Framer Motion, Three.js, Tailwind` },
        { type: "output", text: `  Theme:     HUD / Mining Ops` },
        { type: "output", text: `  Terminal:  ChandanTerm v2.0` },
        { type: "output", text: `  CPU:       GenAI-powered` },
        { type: "output", text: `  Memory:    38 repos indexed` },
        { type: "system", text: "────────────────────────────────────────" },
        { type: "output", text: "  ● ● ● ● ● ● ● ●" },
      ];
    }

    case "stack":
      return [
        { type: "system", text: "─── Full Technology Stack ───────────────────" },
        { type: "system", text: "\n  [AI / ML]" },
        { type: "output", text: "  Python · PyTorch · TensorFlow · Scikit-learn" },
        { type: "output", text: "  NLP · LLMs · RAG · Prompt Engineering" },
        { type: "system", text: "\n  [GenAI]" },
        { type: "output", text: "  OpenRouter · DeepSeek · LangChain · Pydantic" },
        { type: "output", text: "  Vector Stores · Multi-Agent Orchestration" },
        { type: "system", text: "\n  [Frontend]" },
        { type: "output", text: "  Next.js · React · TypeScript · Tailwind CSS" },
        { type: "output", text: "  Framer Motion · Three.js · Angular · Flutter" },
        { type: "system", text: "\n  [Backend]" },
        { type: "output", text: "  Node.js · Express · REST APIs · GraphQL" },
        { type: "system", text: "\n  [Infra]" },
        { type: "output", text: "  Docker · AWS · Firebase · Vercel" },
        { type: "output", text: "  MongoDB · MySQL · Linux · Git" },
        { type: "system", text: "\n─────────────────────────────────────────────" },
      ];

    case "themes":
      return [
        { type: "system", text: "─── Available Themes ────────────────────────" },
        { type: "output", text: "  mining   ⛏  Amber HUD / Underground Ops" },
        { type: "output", text: "  ocean    🌊  Cyan Deep Sea / Bioluminescent" },
        { type: "output", text: "  nebula   🪐  Purple Cosmic / Stardust" },
        { type: "output", text: "\n  Usage: theme <name>" },
      ];

    case "theme":
      if (!args) {
        return [{ type: "output", text: "Usage: theme <mining|ocean|nebula>" }];
      }
      if (["mining", "ocean", "nebula"].includes(args)) {
        if (setThemeFn) setThemeFn(args);
        return [{ type: "success", text: `Theme switched to: ${args} ✓` }];
      }
      return [{ type: "error", text: `Unknown theme: "${args}". Available: mining, ocean, nebula` }];

    case "repo": {
      if (!args) {
        return [{ type: "output", text: "Usage: repo <project-name>\n  Example: repo rag" }];
      }
      const project = siteData.projects.find((p) => p.name.toLowerCase().includes(args));
      if (project) {
        window.open(project.repoUrl, "_blank");
        return [{ type: "success", text: `Opening ${project.name} repository... ↗` }];
      }
      return [{ type: "error", text: `Project not found: "${args}"` }];
    }

    case "open": {
      if (!args) {
        return [{ type: "output", text: "Usage: open <github|linkedin|email|youtube|x|project-name>" }];
      }
      // Try contact links first
      const link = siteData.contactLinks.find(
        (l) => l.label.toLowerCase().includes(args) || l.href.toLowerCase().includes(args)
      );
      if (link) {
        if (link.href.startsWith("mailto:")) {
          window.open(link.href);
        } else {
          window.open(link.href, "_blank");
        }
        return [{ type: "success", text: `Opening ${link.label}... ↗` }];
      }
      // Try project live URLs
      const proj = siteData.projects.find((p) => p.name.toLowerCase().includes(args));
      if (proj?.liveUrl) {
        window.open(proj.liveUrl, "_blank");
        return [{ type: "success", text: `Opening ${proj.name} live demo... ↗` }];
      }
      return [{ type: "error", text: `Not found: "${args}"` }];
    }

    case "fortune":
      return [
        { type: "system", text: "\n  ╭──────────────────────────────────────╮" },
        { type: "output", text: `  │  ${FORTUNES[Math.floor(Math.random() * FORTUNES.length)]}` },
        { type: "system", text: "  ╰──────────────────────────────────────╯\n" },
      ];

    case "coffee":
      return [
        { type: "ascii", text: COFFEE_ART },
        { type: "success", text: "  Brewing... ☕ Ready." },
        { type: "output", text: "  Take a break. You've earned it.\n" },
      ];

    case "weather":
      return [
        { type: "system", text: "─── Weather Report ──────────────────────────" },
        { type: "output", text: "  Location:    Bangalore, IN" },
        { type: "output", text: "  Condition:   ⛅ Partly cloudy" },
        { type: "output", text: "  Temperature: 26°C (feels like 28°C)" },
        { type: "output", text: "  Wind:        12 km/h NE" },
        { type: "output", text: "  Humidity:    62%" },
        { type: "output", text: "  UV Index:    Moderate" },
        { type: "system", text: "\n  (simulated — not a live feed)" },
      ];

    case "matrix":
      return [
        { type: "system", text: "  Wake up, Neo..." },
        { type: "output", text: "  The Matrix has you..." },
        { type: "system", text: "  Follow the white rabbit." },
        { type: "ascii", text: "  01001000 01100101 01101100 01101100 01101111" },
        { type: "output", text: "\n  ▓▓▒▒░░ ENTERING THE MATRIX ░░▒▒▓▓" },
        { type: "system", text: "  ... just kidding. But nice taste. 🐇\n" },
      ];

    case "ping": {
      if (!args) {
        return [{ type: "output", text: "Usage: ping <target>\n  Example: ping github" }];
      }
      const latency = Math.floor(Math.random() * 40 + 10);
      return [
        { type: "output", text: `PING ${args} (127.0.0.1): 56 data bytes` },
        { type: "output", text: `64 bytes: icmp_seq=0 ttl=64 time=${latency}ms` },
        { type: "output", text: `64 bytes: icmp_seq=1 ttl=64 time=${latency + Math.floor(Math.random() * 10)}ms` },
        { type: "output", text: `64 bytes: icmp_seq=2 ttl=64 time=${latency + Math.floor(Math.random() * 15)}ms` },
        { type: "success", text: `\n--- ${args} ping statistics ---` },
        { type: "output", text: `3 packets transmitted, 3 received, 0% packet loss` },
      ];
    }

    case "echo":
      return [{ type: "output", text: parts.slice(1).join(" ") || "" }];

    case "date":
      return [{ type: "output", text: `  ${new Date().toString()}` }];

    case "uptime": {
      const sec = Math.floor(performance.now() / 1000);
      const h = Math.floor(sec / 3600);
      const m = Math.floor((sec % 3600) / 60);
      const s = sec % 60;
      return [{ type: "output", text: `  up ${h}h ${m}m ${s}s` }];
    }

    case "history":
      if (commandHistory.length === 0) {
        return [{ type: "output", text: "  No commands in history yet." }];
      }
      return commandHistory.map((cmd, i) => ({
        type: "output" as const,
        text: `  ${String(i + 1).padStart(4)}  ${cmd}`,
      }));

    case "banner":
      return [
        { type: "ascii", text: ASCII_BANNER },
        { type: "system", text: "  CHANDAN OS v2.0 — Portfolio Terminal" },
        { type: "output", text: "  Type 'help' for available commands.\n" },
      ];

    case "tree":
      return [
        { type: "system", text: "  ~/portfolio" },
        { type: "output", text: FILE_TREE },
      ];

    case "ls": {
      const sections: Record<string, string[]> = {
        "": ["about/", "experience/", "projects/", "skills/", "learning/", "contact.json", "README.md"],
        projects: siteData.projects.map((p) => p.name.toLowerCase().replace(/\s+/g, "-") + "/"),
        skills: siteData.skills.map((s) => s.title.toLowerCase().replace(/\s+/g, "-") + ".json"),
        experience: siteData.experience.map((e) => e.company.toLowerCase().replace(/\s+/g, "-") + ".md"),
        learning: siteData.learningRadar.map((l) => l.title.toLowerCase().replace(/\s+/g, "-") + ".md"),
        about: ["background.md", "philosophy.md", "goals.md"],
        contact: ["email", "github", "linkedin", "x-twitter", "youtube"],
      };
      const dir = args || "";
      const contents = sections[dir];
      if (!contents) {
        return [{ type: "error", text: `ls: ${args}: No such directory` }];
      }
      return [
        { type: "system", text: `  ${dir || "~/"} :` },
        ...contents.map((item) => ({
          type: "output" as const,
          text: `  ${item.endsWith("/") ? "📁" : "📄"} ${item}`,
        })),
      ];
    }

    case "cat": {
      if (!args) {
        return [{ type: "output", text: "Usage: cat <about|skills|projects|experience|contact|learning>" }];
      }
      if (args === "about") {
        return siteData.about.map((line) => ({ type: "output" as const, text: `  ${line}` }));
      }
      if (args === "skills") {
        return siteData.skills.flatMap((g) => [
          { type: "system" as const, text: `  [${g.title}]` },
          { type: "output" as const, text: `  ${g.items.join(", ")}` },
        ]);
      }
      if (args === "projects") {
        return siteData.projects.map((p) => ({
          type: "output" as const,
          text: `  ${p.name} — ${p.summary}`,
        }));
      }
      if (args === "experience") {
        return siteData.experience.map((e) => ({
          type: "output" as const,
          text: `  ${e.role} @ ${e.company} (${e.period})`,
        }));
      }
      if (args === "contact") {
        return siteData.contactLinks.map((l) => ({
          type: "output" as const,
          text: `  ${l.label}: ${l.href}`,
        }));
      }
      if (args === "learning") {
        return siteData.learningRadar.map((l) => ({
          type: "output" as const,
          text: `  ${l.title} [${l.cadence}] — ${l.focus}`,
        }));
      }
      return [{ type: "error", text: `cat: ${args}: No such file` }];
    }

    case "man": {
      if (!args) {
        return [{ type: "output", text: "Usage: man <command>\n  Example: man projects" }];
      }
      const page = MAN_PAGES[args];
      if (page) {
        return [
          { type: "system", text: `\n  MANUAL: ${args.toUpperCase()}` },
          { type: "output", text: `  ${page.replace(/\n/g, "\n  ")}` },
          { type: "system", text: "" },
        ];
      }
      return [{ type: "error", text: `No manual entry for '${args}'` }];
    }

    case "sudo":
      return [
        { type: "error", text: "  Nice try. 😏" },
        { type: "output", text: "  This incident will be reported." },
      ];

    case "github":
      window.open("https://github.com/Chandan062311", "_blank");
      return [{ type: "success", text: "Opening GitHub profile... ↗" }];

    case "linkedin":
      window.open("https://www.linkedin.com/in/chandan-satwani/", "_blank");
      return [{ type: "success", text: "Opening LinkedIn profile... ↗" }];

    case "email":
      window.open("mailto:chandansatwani@gmail.com");
      return [{ type: "success", text: "Opening email client... ↗" }];

    case "blog":
      return [{ type: "output", text: "  Blog coming soon... Stay tuned! 🚧" }];

    case "resume":
    case "cv":
      return [{ type: "output", text: "  Resume available on request — reach out via contact links." }];

    case "certifications":
    case "certs":
      return [{ type: "output", text: "  Certifications section coming soon! Check LinkedIn for current certs." }];

    case "pwd":
      return [{ type: "output", text: "  ~/portfolio" }];

    case "cd":
      return [{ type: "output", text: "  There's no escape. You're in the portfolio now. 🗂️" }];

    case "rm":
      return [{ type: "error", text: "  rm: permission denied. Nice try though. 🔒" }];

    case "vim":
    case "nano":
    case "vi":
      return [{ type: "output", text: `  ${cmd}: this terminal is read-only. Use VS Code instead. 😄` }];

    case "npm":
    case "yarn":
    case "pnpm":
      return [{ type: "output", text: `  ${cmd}: packages are managed behind the scenes. 📦` }];

    case "hello":
    case "hi":
    case "hey":
      return [{ type: "output", text: `  Hey there! 👋 Welcome to Chandan's terminal. Type 'help' to explore.` }];

    case "clear":
      return [];

    case "exit":
    case "quit":
    case "q":
      return [{ type: "system", text: "__EXIT__" }];

    default:
      return [
        { type: "error", text: `  command not found: ${cmd}` },
        { type: "output", text: `  Type 'help' for available commands, or 'man <cmd>' for details.` },
      ];
  }
}

/* ─── Component ─── */

export function TerminalEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [ready, setReady] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [tabMatches, setTabMatches] = useState<string[]>([]);
  const [tabIdx, setTabIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // We need the theme setter — get it from the DOM event approach
  const themeSetterRef = useRef<((id: string) => void) | null>(null);

  useEffect(() => {
    // Listen for theme setter registration
    const handler = (e: CustomEvent) => {
      themeSetterRef.current = e.detail;
    };
    window.addEventListener("register-theme-setter" as string, handler as EventListener);
    // Dispatch a request for the theme setter
    window.dispatchEvent(new CustomEvent("request-theme-setter"));
    return () => window.removeEventListener("register-theme-setter" as string, handler as EventListener);
  }, []);

  // Boot sequence
  useEffect(() => {
    if (isOpen && !ready) {
      const bootLines: TerminalLine[] = [
        { type: "ascii", text: ASCII_BANNER },
        { type: "system", text: "  CHANDAN OS v2.0 — Portfolio Terminal" },
        { type: "output", text: "  Type 'help' for commands · ↑↓ history · Tab autocomplete\n" },
      ];
      // eslint-disable-next-line react-hooks/set-state-in-effect -- boot sequence
      setLines(bootLines);
      setReady(true);
    }
  }, [isOpen, ready]);

  // Toggle with backtick
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "`" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        if ((e.target as HTMLElement).isContentEditable) return;
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus on open
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  // Handle key navigation (history + tab completion)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Arrow up — previous command
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (commandHistory.length === 0) return;
        const newIdx = historyIdx < commandHistory.length - 1 ? historyIdx + 1 : historyIdx;
        setHistoryIdx(newIdx);
        setInput(commandHistory[commandHistory.length - 1 - newIdx]);
        setTabMatches([]);
      }

      // Arrow down — next command
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIdx <= 0) {
          setHistoryIdx(-1);
          setInput("");
          return;
        }
        const newIdx = historyIdx - 1;
        setHistoryIdx(newIdx);
        setInput(commandHistory[commandHistory.length - 1 - newIdx]);
        setTabMatches([]);
      }

      // Tab — autocomplete
      if (e.key === "Tab") {
        e.preventDefault();
        const partial = input.trim().toLowerCase();
        if (!partial) return;

        if (tabMatches.length > 0) {
          // Cycle through matches
          const nextIdx = (tabIdx + 1) % tabMatches.length;
          setTabIdx(nextIdx);
          setInput(tabMatches[nextIdx]);
        } else {
          // Find matches
          const matches = ALL_COMMANDS.filter((c) => c.startsWith(partial));
          if (matches.length === 1) {
            setInput(matches[0]);
          } else if (matches.length > 1) {
            setTabMatches(matches);
            setTabIdx(0);
            setInput(matches[0]);
            setLines((prev) => [
              ...prev,
              { type: "system", text: `  Matches: ${matches.join(", ")}` },
            ]);
          }
        }
      }

      // Any other key resets tab state
      if (e.key !== "Tab") {
        setTabMatches([]);
        setTabIdx(0);
      }
    },
    [commandHistory, historyIdx, input, tabMatches, tabIdx],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = input.trim();

      if (trimmed) {
        setCommandHistory((prev) => [...prev, trimmed]);
        setHistoryIdx(-1);
      }

      const result = processCommand(input, commandHistory, themeSetterRef.current ?? undefined);

      if (trimmed.toLowerCase() === "clear") {
        setLines([]);
        setInput("");
        return;
      }

      if (result.some((r) => r.text === "__EXIT__")) {
        setIsOpen(false);
        setInput("");
        return;
      }

      setLines((prev) => [
        ...prev,
        { type: "input", text: `$ ${input}` },
        ...result,
      ]);
      setInput("");
    },
    [input, commandHistory],
  );

  return (
    <>
      {/* Visible trigger button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-[100] flex h-10 w-10 items-center justify-center rounded-lg border border-white/12 bg-[color:var(--color-surface)]/90 font-mono text-sm text-[color:var(--color-accent-crimson)] shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-[color:var(--color-accent-crimson)]/40 hover:shadow-[0_0_15px_-3px_var(--color-accent-glow)]"
          aria-label="Open terminal"
          title="Open terminal (or press ` key)"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", damping: 26, stiffness: 340 }}
            className="fixed bottom-4 right-4 z-[110] w-[min(580px,calc(100vw-2rem))] overflow-hidden rounded-xl border border-[color:var(--color-accent-crimson)]/20 font-mono text-sm shadow-2xl shadow-black/60"
            style={{ background: "rgba(4, 8, 14, 0.97)" }}
          >
            {/* Title bar */}
            <div className="flex items-center justify-between border-b border-white/8 px-4 py-2">
              <div className="flex items-center gap-2.5">
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="h-3 w-3 rounded-full bg-red-500/80 transition-colors hover:bg-red-400"
                    aria-label="Close terminal"
                  />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <span className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[11px] tracking-[0.14em] text-white/40">
                  chandan@portfolio:~
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                  v2.0
                </span>
              </div>
            </div>

            {/* Scanline overlay */}
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,128,0.012) 2px, rgba(0,255,128,0.012) 4px)",
              }}
            />

            {/* Output */}
            <div
              ref={scrollRef}
              className="max-h-[420px] overflow-y-auto px-4 py-3"
              style={{ scrollbarWidth: "thin", scrollbarColor: "color-mix(in srgb, var(--color-accent-crimson) 25%, transparent) transparent" }}
            >
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={`whitespace-pre-wrap leading-relaxed ${
                    line.type === "input"
                      ? "text-[color:var(--color-accent-crimson)]/90"
                      : line.type === "error"
                      ? "text-red-400/90"
                      : line.type === "system"
                      ? "text-teal-400/70"
                      : line.type === "ascii"
                      ? "text-[color:var(--color-accent-crimson)]/60"
                      : line.type === "success"
                      ? "text-emerald-400/85"
                      : "text-slate-300/80"
                  }`}
                >
                  {line.text}
                </div>
              ))}
            </div>

            {/* Input line */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center border-t border-white/6 px-4 py-2.5"
            >
              <span className="mr-2 text-[color:var(--color-accent-crimson)]/60">❯</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-slate-200 caret-[color:var(--color-accent-crimson)] outline-none placeholder:text-white/15"
                placeholder="type a command..."
                autoComplete="off"
                spellCheck={false}
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
