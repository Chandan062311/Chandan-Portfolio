"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

interface FloatingShapeProps {
  position: [number, number, number];
  color: string;
  speed?: number;
  size?: number;
  type?: "icosahedron" | "octahedron" | "dodecahedron";
}

function FloatingShape({
  position,
  color,
  speed = 0.5,
  size = 0.4,
  type = "icosahedron",
}: FloatingShapeProps) {
  const meshRef = useRef<Mesh>(null);
  // eslint-disable-next-line react-hooks/purity -- stable random seed
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    meshRef.current.rotation.x = t * speed * 0.15;
    meshRef.current.rotation.y = t * speed * 0.25;
    meshRef.current.position.y =
      position[1] + Math.sin(t * speed + phase) * 0.25;
  });

  const Geometry = () => {
    switch (type) {
      case "octahedron":
        return <octahedronGeometry args={[size, 0]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[size, 0]} />;
      default:
        return <icosahedronGeometry args={[size, 0]} />;
    }
  };

  return (
    <mesh ref={meshRef} position={position}>
      <Geometry />
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={0.15}
        toneMapped={false}
      />
    </mesh>
  );
}

export function FloatingShapes() {
  return (
    <group>
      <FloatingShape
        position={[-4, 1.5, -3]}
        color="#D88A2A"
        speed={0.2}
        size={0.5}
        type="icosahedron"
      />
      <FloatingShape
        position={[4.5, -0.5, -2]}
        color="#5FA8A0"
        speed={0.15}
        size={0.35}
        type="octahedron"
      />
      <FloatingShape
        position={[-3, -2, -4]}
        color="#5FA8A0"
        speed={0.25}
        size={0.3}
        type="dodecahedron"
      />
    </group>
  );
}
