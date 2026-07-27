"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

/* ──────────────────────────────────────────────────────────────────
 *  Stripe-style flowing data streams.
 *
 *  Multiple curved splines flow through 3D space on the right side of
 *  the hero. Each stream has hundreds of particles flowing along its
 *  curve with additive blending, creating the "data moving through AI
 *  pipelines" feeling. Replaces the orb-based agent entities — same
 *  brand palette, more dynamic, more Stripe.
 *
 *  Each stream = a CatmullRomCurve3 + N particles sampled along it.
 *  Particles' offset along the curve animates over time, making them
 *  appear to flow.
 * ────────────────────────────────────────────────────────────────── */

type Stream = {
  /** Control points for the CatmullRomCurve3 in 3D space */
  points: THREE.Vector3[];
  color: string;
  particleCount: number;
  flowSpeed: number;
  particleSize: number;
};

/* ── Stream definitions — all biased to the right side (x ≥ 0) ── */

const STREAMS: Stream[] = [
  {
    // Primary brand stream — biggest, top-right
    points: [
      new THREE.Vector3(2.5, 3, -2),
      new THREE.Vector3(4, 1.5, -1),
      new THREE.Vector3(3.5, -0.5, -3),
      new THREE.Vector3(5, -2, -2),
      new THREE.Vector3(3, -3.5, -4),
    ],
    color: "#208535",
    particleCount: 350,
    flowSpeed: 0.12,
    particleSize: 0.06,
  },
  {
    // Cyan stream — middle, flowing diagonally
    points: [
      new THREE.Vector3(1.5, 2.5, -3),
      new THREE.Vector3(3, 0.5, -1.5),
      new THREE.Vector3(4.5, -1, -3.5),
      new THREE.Vector3(2.5, -3, -2),
    ],
    color: "#06b6d4",
    particleCount: 280,
    flowSpeed: 0.15,
    particleSize: 0.05,
  },
  {
    // Violet stream — lower, deepest
    points: [
      new THREE.Vector3(2, -1, -1),
      new THREE.Vector3(4, -0.5, -3),
      new THREE.Vector3(5, -2.5, -4),
      new THREE.Vector3(3.5, -4, -2.5),
    ],
    color: "#8b5cf6",
    particleCount: 220,
    flowSpeed: 0.18,
    particleSize: 0.045,
  },
  {
    // Smaller accent stream — top, fastest
    points: [
      new THREE.Vector3(3.5, 3.5, -3),
      new THREE.Vector3(5, 2, -2),
      new THREE.Vector3(4, 0, -4),
    ],
    color: "#2EA04E",
    particleCount: 180,
    flowSpeed: 0.22,
    particleSize: 0.04,
  },
];

/* ── Single flowing stream ── */

function FlowingStream({ stream, phaseOffset = 0 }: { stream: Stream; phaseOffset?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const tubeRef = useRef<THREE.Line>(null);

  // Build the curve once
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(stream.points, false, "catmullrom", 0.5),
    [stream.points],
  );

  // Sample particle positions along the curve. Each particle has a `t`
  // (0..1) position along the curve that we animate via the offset
  // uniform pushed through useFrame.
  const { positions, tValues } = useMemo(() => {
    const pos = new Float32Array(stream.particleCount * 3);
    const t = new Float32Array(stream.particleCount);
    for (let i = 0; i < stream.particleCount; i++) {
      // Stagger initial t position so particles are spread along the curve
      t[i] = i / stream.particleCount;
      const p = curve.getPointAt(t[i]);
      pos[i * 3] = p.x;
      pos[i * 3 + 1] = p.y;
      pos[i * 3 + 2] = p.z;
    }
    return { positions: pos, tValues: t };
  }, [curve, stream.particleCount]);

  // Tube path — the dim "spine" of the stream
  const tubePoints = useMemo(() => {
    const samples = 80;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= samples; i++) {
      pts.push(curve.getPointAt(i / samples));
    }
    return pts;
  }, [curve]);

  // Animate: each frame, advance every particle's t position by flowSpeed
  // * delta, wrapping at 1. Then re-sample the curve for the new position.
  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const geom = pointsRef.current.geometry;
    const posAttr = geom.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < stream.particleCount; i++) {
      tValues[i] = (tValues[i] + delta * stream.flowSpeed) % 1;
      const p = curve.getPointAt(tValues[i]);
      arr[i * 3] = p.x;
      arr[i * 3 + 1] = p.y;
      arr[i * 3 + 2] = p.z;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <group>
      {/* Dim spine line showing the curve path */}
      <line ref={tubeRef as never}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(tubePoints.flatMap((p) => [p.x, p.y, p.z])), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={stream.color}
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </line>

      {/* Particles flowing along the curve */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={stream.particleSize}
          color={stream.color}
          sizeAttenuation
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/* ── Ambient particle field — depth atmosphere behind streams ── */

function AmbientParticles({ count = 180 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // eslint-disable-next-line react-hooks/purity
      const r = 5 + Math.random() * 4;
      // eslint-disable-next-line react-hooks/purity
      const theta = Math.random() * Math.PI * 2;
      // eslint-disable-next-line react-hooks/purity
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta) + 2; // bias right
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi) - 2;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.015;
    pointsRef.current.rotation.x += delta * 0.008;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#9adfb4"
        sizeAttenuation
        transparent
        opacity={0.4}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Cursor parallax — whole scene tilts based on pointer ── */

const cursorPos = { x: 0, y: 0 };

function CursorParallaxGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const lerp = 1 - Math.pow(0.001, delta);
    groupRef.current.rotation.y += (cursorPos.x * 0.2 - groupRef.current.rotation.y) * lerp;
    groupRef.current.rotation.x += (-cursorPos.y * 0.14 - groupRef.current.rotation.x) * lerp;
  });

  // Set up window pointermove listener once
  useMemo(() => {
    if (typeof window === "undefined") return;
    const handler = (e: PointerEvent) => {
      cursorPos.x = (e.clientX / window.innerWidth) * 2 - 1;
      cursorPos.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handler, { passive: true });
    return () => window.removeEventListener("pointermove", handler);
  }, []);

  return <group ref={groupRef}>{children}</group>;
}

/* ── Brand lighting ── */

function BrandLighting() {
  return (
    <>
      <ambientLight intensity={0.6} color="#ffffff" />
      <pointLight position={[4, 2, 2]} intensity={20} color="#208535" distance={15} />
      <pointLight position={[5, -1, -2]} intensity={15} color="#06b6d4" distance={12} />
      <pointLight position={[3, -3, -3]} intensity={12} color="#8b5cf6" distance={10} />
    </>
  );
}

/* ── Scene composition ── */

function HeroSceneContents() {
  return (
    <CursorParallaxGroup>
      <BrandLighting />
      {STREAMS.map((stream, i) => (
        <FlowingStream key={i} stream={stream} phaseOffset={i * 0.15} />
      ))}
      <AmbientParticles count={180} />
      <fog attach="fog" args={["#0a0a0a", 6, 16]} />
    </CursorParallaxGroup>
  );
}

/* ── Canvas wrapper ── */

export function HeroScene() {
  return (
    <Canvas
      // Camera shifted right + back so the right-side stream cluster frames
      // well against the hero text on the left.
      camera={{ position: [1.5, 0, 8], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <HeroSceneContents />
    </Canvas>
  );
}
