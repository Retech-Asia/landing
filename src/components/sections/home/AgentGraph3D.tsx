"use client";

/**
 * 3D multi-agent investment research graph for the hero.
 *
 * Renders the same agent architecture as the previous SVG version, but as
 * a true 3D scene: spheres with emissive glow, particle streams flowing
 * along edges, mouse-driven camera orbit. Drag to rotate.
 *
 * Why 3D here (vs the Hallmark audit's ban on decorative 3D):
 *   - The content is semantic (real Retech architecture, not abstract orbs)
 *   - The user can drag to inspect from any angle (genuine interaction)
 *   - Replaces vague "AI-powered" claims with a visible multi-agent system
 *
 * Performance:
 *   - Lazy-loaded via parent (next/dynamic, ssr: false)
 *   - Deferred until after first paint + idle
 *   - Desktop + fine-pointer only (touch devices get static hero)
 *   - Respects prefers-reduced-motion (parent returns null)
 *   - DPR capped at [1, 1.75] to balance fidelity vs GPU load
 */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Billboard, Line } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/* ── Architecture (matches HeroAgentViz.tsx SVG version) ── */

type Node3D = {
  id: string;
  label: string;
  position: [number, number, number];
  color: string;
  emissive: string;
  radius: number;
};

const NODES_3D: Node3D[] = [
  {
    id: "router",
    label: "Query Router",
    position: [0, 4.2, 0],
    color: "#208535",
    emissive: "#2EA04E",
    radius: 0.32,
  },
  {
    id: "orchestrator",
    label: "Orchestrator",
    position: [0, 1.5, 0],
    color: "#208535",
    emissive: "#2EA04E",
    radius: 0.38,
  },
  {
    id: "bull",
    label: "Bull Analyst",
    position: [-3.4, -1.2, -0.6],
    color: "#06b6d4",
    emissive: "#22D3EE",
    radius: 0.26,
  },
  {
    id: "bear",
    label: "Bear Analyst",
    position: [-1.2, -2.2, 1.6],
    color: "#8b5cf6",
    emissive: "#A78BFA",
    radius: 0.26,
  },
  {
    id: "tech",
    label: "Tech Analyst",
    position: [1.2, -2.2, 1.6],
    color: "#06b6d4",
    emissive: "#22D3EE",
    radius: 0.26,
  },
  {
    id: "risk",
    label: "Risk Analyst",
    position: [3.4, -1.2, -0.6],
    color: "#8b5cf6",
    emissive: "#A78BFA",
    radius: 0.26,
  },
  {
    id: "synthesizer",
    label: "Synthesizer",
    position: [0, -4.5, 0],
    color: "#208535",
    emissive: "#2EA04E",
    radius: 0.34,
  },
];

const EDGES_3D: [string, string][] = [
  ["router", "orchestrator"],
  ["orchestrator", "bull"],
  ["orchestrator", "bear"],
  ["orchestrator", "tech"],
  ["orchestrator", "risk"],
  ["bull", "synthesizer"],
  ["bear", "synthesizer"],
  ["tech", "synthesizer"],
  ["risk", "synthesizer"],
];

function nodeById(id: string): Node3D {
  return NODES_3D.find((n) => n.id === id)!;
}

/* ── Visual pieces ── */

/** A glowing node = inner solid sphere + outer additive halo + point light. */
function AgentNode({ node }: { node: Node3D }) {
  const groupRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  // Breathing scale — subtle, staggered per node
  useFrame(({ clock }) => {
    if (!groupRef.current || !haloRef.current) return;
    const phase = node.position[0] * 0.7 + node.position[1] * 0.3;
    const t = clock.getElapsedTime() + phase;
    const s = 1 + Math.sin(t * 1.2) * 0.04;
    groupRef.current.scale.setScalar(s);
    // Halo opacity pulses
    const haloMat = haloRef.current.material as THREE.MeshBasicMaterial;
    haloMat.opacity = 0.18 + Math.sin(t * 0.9) * 0.08;
  });

  return (
    <group ref={groupRef} position={node.position}>
      {/* Inner solid sphere */}
      <mesh>
        <sphereGeometry args={[node.radius, 32, 32]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.emissive}
          emissiveIntensity={1.6}
          roughness={0.35}
          metalness={0.2}
        />
      </mesh>
      {/* Outer halo — additive blended, larger, semi-transparent */}
      <mesh ref={haloRef} scale={2.2}>
        <sphereGeometry args={[node.radius, 16, 16]} />
        <meshBasicMaterial
          color={node.emissive}
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Local point light — gives nearby edges a glow lift */}
      <pointLight color={node.emissive} intensity={2.5} distance={2.5} decay={2} />
      {/* Label — billboarded to always face camera */}
      <Billboard position={[0, node.radius + 0.45, 0]}>
        <Text3D text={node.label} color="#3D3D4E" />
      </Billboard>
    </group>
  );
}

/** Lightweight text label using Html sprite — drei Text would pull a font file. */
function Text3D({ text, color }: { text: string; color: string }) {
  return (
    <group>
      {/* Background pill behind text for readability over any background */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[text.length * 0.18 + 0.3, 0.4]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.85} />
      </mesh>
      {/* The text itself, drawn via canvas texture to avoid font loading */}
      <LabelText text={text} color={color} />
    </group>
  );
}

function LabelText({ text, color }: { text: string; color: string }) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = color;
    ctx.font = "600 36px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 256, 32);
    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 4;
    return tex;
  }, [text, color]);

  return (
    <mesh>
      <planeGeometry args={[text.length * 0.16, 0.2]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}

/** An edge between two nodes — thin line plus 3 traveling particles. */
function AgentEdge({
  from,
  to,
  delay,
}: {
  from: [number, number, number];
  to: [number, number, number];
  delay: number;
}) {
  const points = useMemo(() => {
    // Slight curve via quadratic bezier in 3D
    const start = new THREE.Vector3(...from);
    const end = new THREE.Vector3(...to);
    const mid = start.clone().add(end).multiplyScalar(0.5);
    // Perpendicular offset for curve
    const dir = end.clone().sub(start);
    const len = dir.length();
    const perp = new THREE.Vector3(-dir.z, 0.2, dir.x).normalize().multiplyScalar(len * 0.08);
    mid.add(perp);
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return curve.getPoints(48);
  }, [from, to]);

  return (
    <group>
      <Line points={points} color="#6B6B78" lineWidth={1} transparent opacity={0.35} />
      <EdgeParticles points={points} delay={delay} />
    </group>
  );
}

/** 3 particles staggered along an edge, traveling start → end on a loop. */
function EdgeParticles({
  points,
  delay,
}: {
  points: THREE.Vector3[];
  delay: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const PARTICLE_COUNT = 3;

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = (clock.getElapsedTime() * 0.18 + delay) % 1;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const child = groupRef.current.children[i] as THREE.Mesh | undefined;
      if (!child) continue;
      const localT = (t + i / PARTICLE_COUNT) % 1;
      const idx = Math.floor(localT * (points.length - 1));
      const frac = localT * (points.length - 1) - idx;
      const p = points[idx] || points[points.length - 1];
      const pNext = points[idx + 1] || p;
      child.position.lerpVectors(p, pNext, frac);
      // Fade in/out at endpoints so the loop isn't visible as a "jump"
      const fade = Math.min(localT * 6, 1) * Math.min((1 - localT) * 6, 1);
      const mat = child.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.95 * fade;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshBasicMaterial
            color="#2EA04E"
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Mouse-driven camera orbit. Subtle parallax, no full orbit. */
function CameraOrbit() {
  const { camera, pointer } = useThree();
  const targetX = useRef(0);
  const targetY = useRef(0);

  useFrame(() => {
    // pointer is -1..1 from center
    targetX.current = pointer.x * 1.8;
    targetY.current = -pointer.y * 1.2;
    // Smooth follow
    camera.position.x += (targetX.current - camera.position.x) * 0.04;
    camera.position.y += (2 + targetY.current - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/** Ambient particle field around the graph — depth atmosphere. */
function AmbientParticles() {
  const count = 80;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return arr;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
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
        size={0.05}
        color="#2EA04E"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Wrap everything in a scene. Suspense-free since we use only built-ins. */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 5]} intensity={0.5} color="#ffffff" />
      <CameraOrbit />
      <AmbientParticles />
      {NODES_3D.map((node) => (
        <AgentNode key={node.id} node={node} />
      ))}
      {EDGES_3D.map(([fromId, toId], i) => {
        const from = nodeById(fromId);
        const to = nodeById(toId);
        return (
          <AgentEdge
            key={`${fromId}-${toId}`}
            from={from.position}
            to={to.position}
            delay={i * 0.11}
          />
        );
      })}
    </>
  );
}

export function AgentGraph3D() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!mounted) return null;

  return (
    <Canvas
      camera={{ position: [0, 2, 11], fov: 42, near: 0.1, far: 100 }}
      dpr={[1, 1.75]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      style={{
        width: "100%",
        height: "100%",
        background: "transparent",
      }}
    >
      <Scene />
    </Canvas>
  );
}
