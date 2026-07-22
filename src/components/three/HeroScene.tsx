"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import type { Mesh } from "three";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Distorted orb — the core hero element                             */
/* ------------------------------------------------------------------ */

type OrbProps = {
  position: [number, number, number];
  scale?: number;
  color: string;
  emissive?: string;
  distort?: number;
  speed?: number;
  floatSpeed?: number;
  rotationSpeed?: number;
  opacity?: number;
};

function Orb({
  position,
  scale = 1,
  color,
  emissive,
  distort = 0.4,
  speed = 1.5,
  floatSpeed = 1.2,
  rotationSpeed = 0.08,
  opacity = 0.92,
}: OrbProps) {
  const meshRef = useRef<Mesh>(null);

  // Subtle per-frame rotation — the "alive" feel without being distracting.
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * rotationSpeed;
    meshRef.current.rotation.y += delta * rotationSpeed * 0.7;
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={0.15} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 32]} />
        <MeshDistortMaterial
          color={color}
          emissive={emissive ?? color}
          emissiveIntensity={0.35}
          roughness={0.45}
          metalness={0.15}
          distort={distort}
          speed={speed}
          transparent
          opacity={opacity}
        />
      </mesh>
    </Float>
  );
}

/* ------------------------------------------------------------------ */
/*  Particle field — gives depth & airiness behind the orbs           */
/* ------------------------------------------------------------------ */

function ParticleField({ count = 220 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Pseudo-random distribution on a sphere shell — stable across renders.
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x += delta * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#9adfb4"
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/*  Lighting rig — brand-tinted, no shadows (perf)                    */
/* ------------------------------------------------------------------ */

function BrandLighting() {
  return (
    <>
      <ambientLight intensity={0.7} color="#ffffff" />
      <directionalLight
        position={[5, 6, 4]}
        intensity={2.2}
        color="#ffffff"
      />
      <pointLight
        position={[-6, -2, -4]}
        intensity={30}
        color="#06b6d4"
        distance={25}
      />
      <pointLight
        position={[6, 3, 2]}
        intensity={25}
        color="#8b5cf6"
        distance={22}
      />
      <pointLight
        position={[0, -5, 6]}
        intensity={20}
        color="#208535"
        distance={20}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene composition                                                 */
/* ------------------------------------------------------------------ */

function HeroSceneContents() {
  return (
    <>
      <BrandLighting />

      {/* Main brand orb — large, center-right, behind headline */}
      <Orb
        position={[2.8, 0.4, -1]}
        scale={2.2}
        color="#208535"
        emissive="#186B2B"
        distort={0.45}
        speed={1.2}
        floatSpeed={1.0}
        rotationSpeed={0.06}
        opacity={0.95}
      />

      {/* Cyan orb — smaller, top-left */}
      <Orb
        position={[-3.8, 1.8, -2]}
        scale={1.1}
        color="#06b6d4"
        emissive="#0e7490"
        distort={0.55}
        speed={1.8}
        floatSpeed={1.4}
        rotationSpeed={0.10}
        opacity={0.85}
      />

      {/* Violet orb — smaller, bottom-right, partial visibility */}
      <Orb
        position={[3.4, -2.2, -3]}
        scale={0.85}
        color="#8b5cf6"
        emissive="#6d28d9"
        distort={0.5}
        speed={1.6}
        floatSpeed={1.1}
        rotationSpeed={0.09}
        opacity={0.78}
      />

      {/* Particle backdrop for depth */}
      <ParticleField count={220} />

      <fog attach="fog" args={["#0a0a0a", 8, 18]} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Exported canvas wrapper                                           */
/* ------------------------------------------------------------------ */

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <HeroSceneContents />
    </Canvas>
  );
}
