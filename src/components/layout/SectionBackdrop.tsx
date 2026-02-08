"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type PropsWithChildren } from "react";
import type { SectionArtDefinition, SectionId } from "@/types/portfolio";
import { useTheme } from "@/components/layout/ThemeProvider";

/**
 * Returns theme-specific image path by inserting the theme suffix before the extension.
 * e.g. "/theme/dome/hero-command-deck.png" + "-ocean" → "/theme/dome/hero-command-deck-ocean.png"
 */
function resolveThemedSrc(src: string, suffix: string): string {
  if (!suffix) return src;
  const dotIdx = src.lastIndexOf(".");
  if (dotIdx === -1) return src + suffix;
  return src.slice(0, dotIdx) + suffix + src.slice(dotIdx);
}

type SectionBackdropProps = PropsWithChildren<{
  sectionId: SectionId;
  image: SectionArtDefinition;
  overlay?: number;
  parallax?: boolean;
  priority?: boolean;
  className?: string;
}>;

function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

export function SectionBackdrop({
  sectionId,
  image,
  overlay,
  parallax = false,
  priority = false,
  className,
  children,
}: SectionBackdropProps) {
  const { current: theme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [failedImageSources, setFailedImageSources] = useState<Record<string, true>>({});
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxShift = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  // Scroll-driven section transitions: opacity + scale
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.85, 1],
    prefersReducedMotion ? [1, 1, 1, 1] : [0.2, 1, 1, 0.2],
  );
  const contentScale = useTransform(
    scrollYProgress,
    [0, 0.12, 0.85, 1],
    prefersReducedMotion ? [1, 1, 1, 1] : [0.97, 1, 1, 0.97],
  );

  const overlayStrength = overlay ?? image.overlayStrength;
  const themedSrc = resolveThemedSrc(image.src, theme.imageSuffix);
  const objectPosition =
    isMobile && image.mobileFocalPosition
      ? image.mobileFocalPosition
      : image.focalPosition;
  const imageHidden = !themedSrc || Boolean(failedImageSources[themedSrc]);

  return (
    <div
      ref={sectionRef}
      className={`section-shell section-shell--${sectionId} ${className ?? ""}`.trim()}
    >
      <div className="section-fallback-gradient" />
      {!imageHidden ? (
        <motion.div
          className="section-image-layer"
          style={
            parallax && !prefersReducedMotion
              ? { y: parallaxShift }
              : undefined
          }
        >
          <Image
            src={themedSrc}
            alt={image.alt}
            fill
            priority={priority}
            sizes="100vw"
            className="section-image"
            style={{ objectPosition }}
            onError={() =>
              setFailedImageSources((current) => ({
                ...current,
                [themedSrc]: true,
              }))
            }
          />
        </motion.div>
      ) : null}
      <div
        className="section-overlay-layer"
        style={{ ["--section-overlay-strength" as string]: `${overlayStrength}` }}
      />
      <div className="section-noise-layer" />
      <motion.div
        className="section-content-layer"
        style={{ opacity: contentOpacity, scale: contentScale }}
      >
        {children}
      </motion.div>
    </div>
  );
}
