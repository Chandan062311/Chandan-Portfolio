import type { ThemeTokens } from "@/types/portfolio";

export interface ThemePreset {
  id: string;
  label: string;
  icon: string;
  /** Suffix appended to section art filenames, e.g. "-ocean". Empty string for default/mining. */
  imageSuffix: string;
  colors: ThemeTokens["colors"];
}

export const themePresets: ThemePreset[] = [
  {
    id: "mining",
    label: "Mining",
    icon: "⛏",
    imageSuffix: "",
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
  },
  {
    id: "ocean",
    label: "Deep Sea",
    icon: "🌊",
    imageSuffix: "-ocean",
    colors: {
      background: "#040D14",
      surface: "#0A1A28",
      surfaceStrong: "#122636",
      text: "#E8F4F8",
      muted: "#8BB8CC",
      accentCrimson: "#00BCD4",
      accentSteel: "#26A69A",
      accentGlow: "rgba(0, 188, 212, 0.28)",
    },
  },
  {
    id: "nebula",
    label: "Nebula",
    icon: "🪐",
    imageSuffix: "-nebula",
    colors: {
      background: "#0C0716",
      surface: "#16102A",
      surfaceStrong: "#201838",
      text: "#F0EAFF",
      muted: "#B4A8D4",
      accentCrimson: "#C084FC",
      accentSteel: "#818CF8",
      accentGlow: "rgba(192, 132, 252, 0.28)",
    },
  },
];
