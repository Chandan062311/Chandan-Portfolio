"use client";

import type { PropsWithChildren } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useCallback, useRef } from "react";

interface MagneticButtonProps {
  className?: string;
  strength?: number;
  radius?: number;
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  radius = 60,
}: PropsWithChildren<MagneticButtonProps>) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < radius) {
        x.set(distX * strength);
        y.set(distY * strength);
      }
    },
    [radius, strength, x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`${className} relative`}
      style={{ x: springX, y: springY, position: "relative", zIndex: 1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      {children}
    </motion.div>
  );
}
