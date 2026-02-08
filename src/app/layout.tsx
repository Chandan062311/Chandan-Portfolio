import type { Metadata } from "next";
import { Rajdhani, Space_Grotesk } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chandan Satwani | AI Engineer & Data Scientist",
  description:
    "Portfolio of Chandan Satwani — AI Engineer & Data Scientist building interactive GenAI apps, gamified RAG pipelines, and live model visualizers. 8+ shipped demos, all open-source.",
  metadataBase: new URL("https://chandansatwani.vercel.app"),
  keywords: [
    "Chandan Satwani",
    "AI Engineer",
    "Data Scientist",
    "GenAI",
    "LLM",
    "MLOps",
    "Portfolio",
    "Machine Learning",
    "RAG",
  ],
  authors: [{ name: "Chandan Satwani" }],
  creator: "Chandan Satwani",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Chandan Satwani | AI Engineer & Data Scientist",
    description:
      "Interactive GenAI apps, gamified RAG pipelines, and live model visualizers — all shipped and open-source.",
    siteName: "Chandan Satwani Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chandan Satwani | AI Engineer & Data Scientist",
    description:
      "Interactive GenAI apps, gamified RAG pipelines, and live model visualizers — all shipped and open-source.",
    creator: "@ChandanSatwani",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rajdhani.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        {/* Blocking theme script to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("chandan-theme");if(t){var m={"mining":{"--color-background":"#080B0F","--color-surface":"#111720","--color-surface-strong":"#18212D","--color-text":"#F1F5F9","--color-muted":"#C1CBD6","--color-accent-crimson":"#D88A2A","--color-accent-steel":"#5FA8A0","--color-accent-glow":"rgba(216,138,42,0.34)"},"ocean":{"--color-background":"#040D14","--color-surface":"#0A1A28","--color-surface-strong":"#122636","--color-text":"#E8F4F8","--color-muted":"#8BB8CC","--color-accent-crimson":"#00BCD4","--color-accent-steel":"#26A69A","--color-accent-glow":"rgba(0,188,212,0.28)"},"nebula":{"--color-background":"#0C0716","--color-surface":"#16102A","--color-surface-strong":"#201838","--color-text":"#F0EAFF","--color-muted":"#B4A8D4","--color-accent-crimson":"#C084FC","--color-accent-steel":"#818CF8","--color-accent-glow":"rgba(192,132,252,0.28)"}};var c=m[t];if(c){var r=document.documentElement;for(var k in c)r.style.setProperty(k,c[k])}}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {/* Skip to content link for keyboard/screen reader users */}
        <a
          href="#main-content"
          className="fixed left-2 top-2 z-[200] -translate-y-full rounded border border-[color:var(--color-accent-crimson)] bg-[color:var(--color-background)] px-4 py-2 text-sm text-[color:var(--color-text)] transition-transform duration-200 focus:translate-y-0"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
