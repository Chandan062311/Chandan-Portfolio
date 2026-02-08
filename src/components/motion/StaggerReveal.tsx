"use client";

import type { PropsWithChildren } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface StaggerRevealProps {
  text: string;
  className?: string;
  delay?: number;
  wordClassName?: string;
}

export function StaggerReveal({
  text,
  className = "",
  delay = 0,
  wordClassName = "",
}: StaggerRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className} style={{ display: "inline-flex", flexWrap: "wrap", gap: "0 0.3em" }}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className={wordClassName}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.5,
            ease: [0.19, 1, 0.22, 1],
            delay: delay + i * 0.06,
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

interface AnimatedBorderProps {
  className?: string;
}

export function AnimatedBorder({
  children,
  className = "",
}: PropsWithChildren<AnimatedBorderProps>) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`animated-border-wrapper ${className}`}>
      <div className="animated-border-inner">{children}</div>
    </div>
  );
}
