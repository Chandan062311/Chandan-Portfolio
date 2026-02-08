import type { PropsWithChildren } from "react";
import { Container } from "@/components/layout/Container";
import { SectionBackdrop } from "@/components/layout/SectionBackdrop";
import { siteData } from "@/data/site";
import type { SectionId } from "@/types/portfolio";

type SectionProps = PropsWithChildren<{
  id: SectionId;
  station: string;
  title: string;
  subtitle?: string;
}>;

export function Section({ id, station, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="anchor-offset">
      <SectionBackdrop sectionId={id} image={siteData.sectionArt[id]} parallax>
        <Container className="py-20 md:py-24">
          <div className="section-frame mb-10 max-w-4xl space-y-3">
            <p className="hud-kicker">{station}</p>
            <h2 className="section-title text-4xl md:text-6xl">{title}</h2>
            {subtitle ? <p className="max-w-3xl text-muted">{subtitle}</p> : null}
          </div>
          {children}
        </Container>
      </SectionBackdrop>
    </section>
  );
}
