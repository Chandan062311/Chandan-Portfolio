"use client";

import type { PropsWithChildren } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { siteData } from "@/data/site";

type RevealVariant = "fade-up" | "fade-left" | "fade-right" | "scale" | "blur";

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  distance?: number;
  scaleFrom?: number;
  variant?: RevealVariant;
}>;

function getVariantInitial(variant: RevealVariant, distance: number, scaleFrom: number) {
  switch (variant) {
    case "fade-left":
      return { opacity: 0, x: -distance, scale: scaleFrom };
    case "fade-right":
      return { opacity: 0, x: distance, scale: scaleFrom };
    case "scale":
      return { opacity: 0, scale: 0.85 };
    case "blur":
      return { opacity: 0, y: distance * 0.5, filter: "blur(10px)" };
    case "fade-up":
    default:
      return { opacity: 0, y: distance, scale: scaleFrom };
  }
}

function getVariantAnimate(variant: RevealVariant) {
  switch (variant) {
    case "fade-left":
    case "fade-right":
      return { opacity: 1, x: 0, scale: 1 };
    case "scale":
      return { opacity: 1, scale: 1 };
    case "blur":
      return { opacity: 1, y: 0, filter: "blur(0px)" };
    case "fade-up":
    default:
      return { opacity: 1, y: 0, scale: 1 };
  }
}

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 20,
  scaleFrom = 0.985,
  variant = "fade-up",
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={getVariantInitial(variant, distance, scaleFrom)}
      whileInView={getVariantAnimate(variant)}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: siteData.theme.motion.reveal.duration,
        ease: siteData.theme.motion.reveal.ease,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
