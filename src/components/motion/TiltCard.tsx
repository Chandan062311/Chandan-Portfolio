"use client";

import type { PropsWithChildren } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useCallback } from "react";

interface TiltCardProps {
  className?: string;
  tiltMax?: number;
  perspective?: number;
}

export function TiltCard({
  children,
  className = "",
  tiltMax = 8,
  perspective = 800,
}: PropsWithChildren<TiltCardProps>) {
  const prefersReducedMotion = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const tiltX = -(mouseY / (rect.height / 2)) * tiltMax;
      const tiltY = (mouseX / (rect.width / 2)) * tiltMax;

      rotateX.set(tiltX);
      rotateY.set(tiltY);
    },
    [rotateX, rotateY, tiltMax],
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div style={{ perspective: `${perspective}px` }}>
      <motion.div
        className={className}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{
          boxShadow: "0 0 0 1px color-mix(in srgb, var(--color-accent-crimson) 20%, transparent), 0 0 30px -8px var(--color-accent-glow), 0 30px 60px -20px rgba(0, 0, 0, 0.5)",
        }}
        transition={{ boxShadow: { duration: 0.3 } }}
      >
        <div style={{ transform: "translateZ(0)" }}>{children}</div>
      </motion.div>
    </div>
  );
}
