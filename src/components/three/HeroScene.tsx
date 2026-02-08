"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { ParticleField } from "./ParticleField";
import { FloatingGrid } from "./FloatingGrid";
import { FloatingShapes } from "./FloatingShapes";

export function HeroScene() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 768px)");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- media query init
    setPrefersReduced(mqMotion.matches);
    setIsMobile(mqMobile.matches);

    const handleMotion = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    const handleMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mqMotion.addEventListener("change", handleMotion);
    mqMobile.addEventListener("change", handleMobile);
    return () => {
      mqMotion.removeEventListener("change", handleMotion);
      mqMobile.removeEventListener("change", handleMobile);
    };
  }, []);

  if (prefersReduced) return null;

  return (
    <div className="three-canvas-layer" aria-hidden="true">
      <Canvas
        dpr={[1, isMobile ? 1 : 1.5]}
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <AdaptiveDpr pixelated />
          <ambientLight intensity={0.3} />
          <ParticleField count={isMobile ? 40 : 90} />
          <FloatingGrid />
          <FloatingShapes />
        </Suspense>
      </Canvas>
    </div>
  );
}
