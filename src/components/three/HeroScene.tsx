"use client";

/**
 * Neuron network hero visualization.
 *
 * Visible glowing nodes (AI capabilities) connected by edges (data
 * pathways). Particles flow continuously along each edge, with
 * sin-wave bursts that read as "neurons firing" — wave-like surges
 * of activity rather than constant flow.
 *
 * Composition:
 *   - 5 nodes positioned in 3D space (right-side biased)
 *   - 8 curved edges connecting them
 *   - 30 particles per edge, animated along the curve
 *   - Per-edge firing phase (staggered, async)
 *   - Each node has solid core + additive halo + breathing scale
 *
 * Why this design (vs alternatives):
 *   - Visible structure (nodes) + dynamic motion (firing) = both
 *     "complexity" and "alive" feel in one composition
 *   - Neuron metaphor maps directly to Retech's AI-integrated
 *     engineering positioning (multi-agent, RAG, neural pathways)
 *   - Default pointsMaterial (proven working) — no custom shader
 *
 * Performance guards inherited from previous versions:
 *   - Desktop + fine-pointer only
 *   - LCP-deferred via Hero3DBackground wrapper
 *   - Reduced-motion aware (returns null)
 *   - DPR capped at [1, 1.75]
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* ── Node definitions ── */

type NeuronNode = {
  id: string;
  position: [number, number, number];
  color: THREE.Color;
  emissive: THREE.Color;
  radius: number;
  floatSpeed: number;
};

const HDR = 1.8;
const NODES: NeuronNode[] = [
  {
    id: "router",
    position: [2.2, 2.6, -0.5],
    color: new THREE.Color("#208535"),
    emissive: new THREE.Color("#2EA04E").multiplyScalar(HDR),
    radius: 0.32,
    floatSpeed: 1.0,
  },
  {
    id: "rag",
    position: [4.6, 0.6, -1.5],
    color: new THREE.Color("#06b6d4"),
    emissive: new THREE.Color("#22D3EE").multiplyScalar(HDR),
    radius: 0.28,
    floatSpeed: 1.3,
  },
  {
    id: "agent",
    position: [2.6, -2.0, -1.0],
    color: new THREE.Color("#8b5cf6"),
    emissive: new THREE.Color("#A78BFA").multiplyScalar(HDR),
    radius: 0.30,
    floatSpeed: 1.1,
  },
  {
    id: "synth",
    position: [5.0, -1.2, -3.0],
    color: new THREE.Color("#208535"),
    emissive: new THREE.Color("#2EA04E").multiplyScalar(HDR),
    radius: 0.34,
    floatSpeed: 0.9,
  },
  {
    id: "output",
    position: [3.4, 1.8, -3.5],
    color: new THREE.Color("#06b6d4"),
    emissive: new THREE.Color("#22D3EE").multiplyScalar(HDR),
    radius: 0.26,
    floatSpeed: 1.4,
  },
];

type Edge = {
  from: string;
  to: string;
  firePhase: number; // staggered firing
  fireFreq: number; // firing frequency (Hz)
};

const EDGES: Edge[] = [
  { from: "router", to: "rag", firePhase: 0.0, fireFreq: 0.4 },
  { from: "router", to: "agent", firePhase: 0.5, fireFreq: 0.35 },
  { from: "rag", to: "synth", firePhase: 1.2, fireFreq: 0.45 },
  { from: "agent", to: "synth", firePhase: 0.3, fireFreq: 0.5 },
  { from: "synth", to: "output", firePhase: 0.8, fireFreq: 0.4 },
  { from: "router", to: "output", firePhase: 1.5, fireFreq: 0.3 },
  { from: "rag", to: "agent", firePhase: 0.6, fireFreq: 0.55 },
  { from: "agent", to: "output", firePhase: 2.0, fireFreq: 0.4 },
];

function nodeById(id: string): NeuronNode {
  return NODES.find((n) => n.id === id)!;
}

/* ── Circular particle sprite ── */

function createCircleTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2,
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.3, "rgba(255,255,255,0.8)");
  gradient.addColorStop(0.7, "rgba(255,255,255,0.2)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/* ── Visible glowing node ── */

function GlowingNode({ node }: { node: NeuronNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const elapsedRef = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    elapsedRef.current += delta;
    const t = elapsedRef.current;
    // Breathing scale
    const s = 1 + Math.sin(t * node.floatSpeed * 0.5) * 0.06;
    groupRef.current.scale.setScalar(s);
    // Halo opacity pulses
    if (haloRef.current) {
      const haloMat = haloRef.current.material as THREE.MeshBasicMaterial;
      haloMat.opacity = 0.22 + Math.sin(t * node.floatSpeed * 0.8) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={node.position}>
      {/* Solid core */}
      <mesh>
        <sphereGeometry args={[node.radius, 32, 32]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.emissive}
          emissiveIntensity={1.4}
          roughness={0.3}
          metalness={0.3}
        />
      </mesh>
      {/* Additive halo */}
      <mesh ref={haloRef} scale={2.4}>
        <sphereGeometry args={[node.radius, 16, 16]} />
        <meshBasicMaterial
          color={node.emissive}
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Local point light for nearby glow lift */}
      <pointLight color={node.emissive} intensity={2.0} distance={2.5} decay={2} />
    </group>
  );
}

/* ── Edge with flowing particles + neuron firing bursts ── */

function NeuronEdge({
  edge,
  circleTexture,
}: {
  edge: Edge;
  circleTexture: THREE.Texture;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const lineMatRef = useRef<THREE.LineBasicMaterial>(null);
  const PARTICLE_COUNT = 30;

  const fromNode = nodeById(edge.from);
  const toNode = nodeById(edge.to);

  // Build curved path between nodes (quadratic bezier with perpendicular offset)
  const curve = useMemo(() => {
    const start = new THREE.Vector3(...fromNode.position);
    const end = new THREE.Vector3(...toNode.position);
    const mid = start.clone().add(end).multiplyScalar(0.5);
    const dir = end.clone().sub(start);
    const len = dir.length();
    const perp = new THREE.Vector3(-dir.z, 0.3, dir.x).normalize().multiplyScalar(len * 0.15);
    mid.add(perp);
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [fromNode.position, toNode.position]);

  // Initial particle positions + t values
  const { positions, tValues } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const tValues = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      tValues[i] = i / PARTICLE_COUNT;
      const p = curve.getPointAt(tValues[i]);
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    }
    return { positions, tValues };
  }, [curve]);

  // Sampled line points for the dim spine
  const linePoints = useMemo(() => {
    const samples = 24;
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= samples; i++) {
      const p = curve.getPointAt(i / samples);
      pts.push([p.x, p.y, p.z]);
    }
    return pts;
  }, [curve]);

  // Particle color = blend between the two nodes' emissive colors
  const particleColor = useMemo(() => {
    return fromNode.emissive.clone().lerp(toNode.emissive, 0.5);
  }, [fromNode.emissive, toNode.emissive]);

  // Per-frame: advance particles + apply firing burst via material opacity
  useFrame((_, delta) => {
    if (!pointsRef.current || !lineMatRef.current) return;
    const elapsed = (edge as Edge & { _t?: number })._t ?? 0;
    const newT = elapsed + delta;
    (edge as Edge & { _t?: number })._t = newT;

    // Firing intensity: sin wave, clamped to [0, 1], scaled
    // Gives bursts of activity with quiet periods between
    const fireWave = Math.sin(newT * edge.fireFreq * Math.PI * 2 + edge.firePhase);
    const fireIntensity = Math.max(0, fireWave); // 0 during quiet, peaks at 1
    const baseOpacity = 0.3 + fireIntensity * 0.7; // 0.3 baseline, up to 1.0 during fire

    // Update particle positions
    const geom = pointsRef.current.geometry;
    const posAttr = geom.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    // Particles speed up during firing
    const speed = 0.08 + fireIntensity * 0.12;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      tValues[i] = (tValues[i] + delta * speed) % 1;
      const p = curve.getPointAt(tValues[i]);
      arr[i * 3] = p.x;
      arr[i * 3 + 1] = p.y;
      arr[i * 3 + 2] = p.z;
    }
    posAttr.needsUpdate = true;

    // Update opacities — particles brighten during firing
    const pointsMat = pointsRef.current.material as THREE.PointsMaterial;
    pointsMat.opacity = baseOpacity;
    lineMatRef.current.opacity = 0.1 + fireIntensity * 0.25;
  });

  return (
    <group>
      <Line
        points={linePoints}
        color={particleColor}
        lineWidth={1.2}
        transparent
        opacity={0.2}
      >
        <primitive object={new THREE.Object3D()} ref={lineMatRef as never} />
      </Line>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.11}
          map={circleTexture}
          color={particleColor}
          sizeAttenuation
          transparent
          opacity={0.7}
          alphaTest={0.01}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/* ── Ambient particle field ── */

function AmbientParticles({
  circleTexture,
  count = 120,
}: {
  circleTexture: THREE.Texture;
  count?: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // eslint-disable-next-line react-hooks/purity
      const r = 5 + Math.random() * 3;
      // eslint-disable-next-line react-hooks/purity
      const theta = Math.random() * Math.PI * 2;
      // eslint-disable-next-line react-hooks/purity
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta) + 2;
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
        size={0.035}
        map={circleTexture}
        color={new THREE.Color("#9adfb4")}
        sizeAttenuation
        transparent
        opacity={0.4}
        alphaTest={0.01}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Cursor parallax + camera dolly ── */

const cursorPos = { x: 0, y: 0 };

function CursorParallaxGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);

  useMemo(() => {
    if (typeof window === "undefined") return;
    const handler = (e: PointerEvent) => {
      cursorPos.x = (e.clientX / window.innerWidth) * 2 - 1;
      cursorPos.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handler, { passive: true });
    return () => window.removeEventListener("pointermove", handler);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const lerp = 1 - Math.pow(0.001, delta);
    groupRef.current.rotation.y +=
      (cursorPos.x * 0.2 - groupRef.current.rotation.y) * lerp;
    groupRef.current.rotation.x +=
      (-cursorPos.y * 0.14 - groupRef.current.rotation.x) * lerp;
  });

  return <group ref={groupRef}>{children}</group>;
}

function CameraDolly() {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime();
    camera.position.z = 8 + Math.sin(t * 0.1) * 0.3;
    camera.position.y = Math.sin(t * 0.07) * 0.15;
    camera.lookAt(3.2, 0, -2);
  });
  return null;
}

function BrandLighting() {
  return (
    <>
      <ambientLight intensity={0.4} color="#ffffff" />
      <pointLight position={[4, 2, 2]} intensity={18} color="#208535" distance={15} />
      <pointLight position={[5, -1, -2]} intensity={14} color="#06b6d4" distance={12} />
      <pointLight position={[3, -3, -3]} intensity={10} color="#8b5cf6" distance={10} />
    </>
  );
}

/* ── Scene + Canvas ── */

function HeroSceneContents({
  circleTexture,
}: {
  circleTexture: THREE.Texture;
}) {
  return (
    <>
      <CursorParallaxGroup>
        <BrandLighting />
        {NODES.map((node) => (
          <GlowingNode key={node.id} node={node} />
        ))}
        {EDGES.map((edge, i) => (
          <NeuronEdge key={i} edge={edge} circleTexture={circleTexture} />
        ))}
        <AmbientParticles circleTexture={circleTexture} count={120} />
        <fog attach="fog" args={["#0a0a0a", 8, 18]} />
      </CursorParallaxGroup>
    </>
  );
}

export function HeroScene() {
  const circleTexture = useMemo(() => {
    if (typeof document === "undefined") {
      return new THREE.Texture();
    }
    return createCircleTexture();
  }, []);

  return (
    <Canvas
      camera={{ position: [1.5, 0, 8], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <CameraDolly />
      <HeroSceneContents circleTexture={circleTexture} />
    </Canvas>
  );
}
