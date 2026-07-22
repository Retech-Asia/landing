"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import type { Mesh, Group, Points } from "three";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Module-level cursor position — written by a window pointermove    */
/*  listener, read by CursorParallaxGroup. Lives outside React state  */
/*  to avoid re-renders.                                              */
/* ------------------------------------------------------------------ */
const cursorPos = { x: 0, y: 0 };

/* ------------------------------------------------------------------ */
/*  Cursor-following group — adds the "alive" 3D feel                 */
/* ------------------------------------------------------------------ */

/**
 * Wraps the entire scene. Tracks the cursor at the window level (not via
 * R3F's onPointerMove — that would require pointer-events on the canvas,
 * which would trap wheel/tap events). The pointer position is normalised
 * to -1..1 and used to smoothly rotate the group for a parallax response.
 */
function CursorParallaxGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<Group>(null);
  const target = useRef({ x: 0, y: 0 });
  // Track cursor at window level — works even though the canvas itself
  // has pointer-events: none (set on the wrapper).
  if (typeof window !== "undefined" && !(window as Window & { __cursorTracked?: boolean }).__cursorTracked) {
    (window as Window & { __cursorTracked?: boolean }).__cursorTracked = true;
    window.addEventListener(
      "pointermove",
      (e) => {
        // Normalise to -1..1 across the viewport width/height.
        cursorPos.x = (e.clientX / window.innerWidth) * 2 - 1;
        cursorPos.y = (e.clientY / window.innerHeight) * 2 - 1;
      },
      { passive: true },
    );
  }

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    target.current.x = cursorPos.x;
    target.current.y = cursorPos.y;
    // Frame-rate independent lerp
    const lerp = 1 - Math.pow(0.001, delta);
    groupRef.current.rotation.y +=
      (target.current.x * 0.2 - groupRef.current.rotation.y) * lerp;
    groupRef.current.rotation.x +=
      (-target.current.y * 0.14 - groupRef.current.rotation.x) * lerp;
  });

  return <group ref={groupRef}>{children}</group>;
}

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
  distort = 0.3,
  speed = 1.5,
  floatSpeed = 1.2,
  rotationSpeed = 0.06,
  opacity = 0.92,
}: OrbProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * rotationSpeed;
    meshRef.current.rotation.y += delta * rotationSpeed * 0.7;
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={0.12} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {/* High-detail sphere — smoother than icosahedron at the same vertex
            count, no angular artifacts when MeshDistortMaterial pushes verts. */}
        <sphereGeometry args={[1, 96, 96]} />
        <MeshDistortMaterial
          color={color}
          emissive={emissive ?? color}
          emissiveIntensity={0.32}
          roughness={0.4}
          metalness={0.2}
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
  const pointsRef = useRef<Points>(null);

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
    <CursorParallaxGroup>
      <BrandLighting />

      {/* Main brand orb */}
      <Orb
        position={[2.8, 0.4, -1]}
        scale={2.2}
        color="#208535"
        emissive="#186B2B"
        distort={0.32}
        speed={1.2}
        floatSpeed={1.0}
        rotationSpeed={0.05}
        opacity={0.95}
      />

      {/* Cyan orb */}
      <Orb
        position={[-3.8, 1.8, -2]}
        scale={1.1}
        color="#06b6d4"
        emissive="#0e7490"
        distort={0.38}
        speed={1.8}
        floatSpeed={1.4}
        rotationSpeed={0.08}
        opacity={0.85}
      />

      {/* Violet orb */}
      <Orb
        position={[3.4, -2.2, -3]}
        scale={0.85}
        color="#8b5cf6"
        emissive="#6d28d9"
        distort={0.35}
        speed={1.6}
        floatSpeed={1.1}
        rotationSpeed={0.07}
        opacity={0.78}
      />

      <ParticleField count={220} />
      <fog attach="fog" args={["#0a0a0a", 8, 18]} />
    </CursorParallaxGroup>
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
      // Explicit pointer-events: none on the canvas itself. The wrapper
      // already has pointer-events-none, but R3F adds internal divs that
      // may receive events — this guarantees the canvas can never trap
      // wheel/tap events. Cursor parallax is tracked at the window level
      // (see CursorParallaxGroup above), so we don't need pointer events
      // here.
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <HeroSceneContents />
    </Canvas>
  );
}
