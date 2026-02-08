import { Container } from "@/components/layout/Container";
import { siteData } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 py-10">
      {/* Subtle top glow */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-px h-px"
        style={{
          background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-accent-steel) 30%, transparent), color-mix(in srgb, var(--color-accent-crimson) 30%, transparent), transparent)",
        }}
      />
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-2">
            <p className="font-heading text-lg uppercase tracking-[0.16em] text-[color:var(--color-text)]">
              {siteData.name}
            </p>
            <p className="text-xs text-muted">
              &copy; {new Date().getFullYear()} &mdash; Built with Next.js + TypeScript
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {siteData.contactLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="text-xs uppercase tracking-[0.14em] text-muted transition-colors duration-300 hover:text-[color:var(--color-accent-crimson)]"
                aria-label={link.label}
              >
                {link.label}
              </a>
            ))}
          </div>

          <p className="text-[10px] uppercase tracking-[0.14em] text-muted opacity-60">
            Dome operations theme &middot; original visual system
          </p>
        </div>
      </Container>
    </footer>
  );
}
