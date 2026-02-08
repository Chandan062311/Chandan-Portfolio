"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, useSpring, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/components/layout/ThemeProvider";

export function CursorSpotlight() {
  const prefersReducedMotion = useReducedMotion();
  const { current } = useTheme();
  const [isTouch, setIsTouch] = useState(true); // default true to avoid flash on SSR
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 30, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 30, mass: 0.5 });
  const rafRef = useRef(0);

  useEffect(() => {
    // Detect touch-only devices
    const isHover = window.matchMedia("(hover: hover)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client init
    setIsTouch(!isHover);
    if (!isHover) return;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [mouseX, mouseY]);

  if (prefersReducedMotion || isTouch) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
      style={{
        background: "transparent",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            `radial-gradient(circle, ${current.colors.accentCrimson}12 0%, ${current.colors.accentSteel}08 40%, transparent 70%)`,
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "screen",
        }}
      />
    </motion.div>
  );
}
