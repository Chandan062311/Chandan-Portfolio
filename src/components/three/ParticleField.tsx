"use client";

/* eslint-disable react-hooks/purity -- Three.js particle init uses random seeds */
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  spread?: number;
  colors?: [string, string];
}

export function ParticleField({
  count = 90,
  spread = 14,
  colors = ["#D88A2A", "#5FA8A0"],
}: ParticleFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const positions: Array<{ x: number; y: number; z: number; speed: number; phase: number; size: number }> = [];
    for (let i = 0; i < count; i++) {
      positions.push({
        x: (Math.random() - 0.5) * spread,
        y: (Math.random() - 0.5) * spread,
        z: (Math.random() - 0.5) * spread * 0.6,
        speed: 0.05 + Math.random() * 0.12,
        phase: Math.random() * Math.PI * 2,
        size: 0.015 + Math.random() * 0.025,
      });
    }
    return positions;
  }, [count, spread]);

  const colorArray = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const c1 = new THREE.Color(colors[0]);
    const c2 = new THREE.Color(colors[1]);
    for (let i = 0; i < count; i++) {
      const c = new THREE.Color().lerpColors(c1, c2, Math.random());
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, [count, colors]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      dummy.position.set(
        p.x + Math.sin(t * p.speed + p.phase) * 0.2,
        p.y + Math.cos(t * p.speed * 0.7 + p.phase) * 0.15,
        p.z + Math.sin(t * p.speed * 0.3 + p.phase * 2) * 0.1,
      );
      dummy.scale.setScalar(p.size);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial transparent opacity={0.35} toneMapped={false}>
        <instancedBufferAttribute
          attach="geometry-attributes-color"
          args={[colorArray, 3]}
        />
      </meshBasicMaterial>
    </instancedMesh>
  );
}
