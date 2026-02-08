"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingGridProps {
  size?: number;
  divisions?: number;
  color?: string;
}

export function FloatingGrid({
  size = 20,
  divisions = 20,
  color = "#5FA8A0",
}: FloatingGridProps) {
  const groupRef = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const half = size / 2;
    const step = size / divisions;

    // Create grid lines
    for (let i = 0; i <= divisions; i++) {
      const pos = -half + i * step;
      // X-axis lines
      positions.push(-half, 0, pos, half, 0, pos);
      // Z-axis lines
      positions.push(pos, 0, -half, pos, 0, half);
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    return geometry;
  }, [size, divisions]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.position.y = -4 + Math.sin(t * 0.1) * 0.08;
    groupRef.current.rotation.x = -Math.PI / 2.5 + Math.sin(t * 0.08) * 0.01;
  });

  return (
    <group ref={groupRef} position={[0, -4, -2]}>
      <lineSegments geometry={lines}>
        <lineBasicMaterial color={color} transparent opacity={0.08} />
      </lineSegments>
    </group>
  );
}
