"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import type { Mesh, Group, Points } from "three";

/* ──────────────────────────────────────────────────────────────────
 *  Custom Float — replaces drei's <Float> (which uses deprecated
 *  THREE.Clock). Uses delta accumulation instead.
 * ────────────────────────────────────────────────────────────────── */

function CustomFloat({
  children,
  speed = 1.2,
  rotationIntensity = 0.12,
  floatIntensity = 0.5,
}: {
  children: React.ReactNode;
  speed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
}) {
  const groupRef = useRef<Group>(null);
  const elapsedRef = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    elapsedRef.current += delta;
    const t = elapsedRef.current * speed;
    groupRef.current.position.y = Math.sin(t) * floatIntensity;
    groupRef.current.rotation.x = Math.cos(t * 0.5) * rotationIntensity;
    groupRef.current.rotation.y = Math.sin(t * 0.3) * rotationIntensity;
  });

  return <group ref={groupRef}>{children}</group>;
}

/* ──────────────────────────────────────────────────────────────────
 *  Cursor parallax — whole scene tilts based on pointer position.
 *  Tracked at window level so canvas can stay pointer-events:none.
 * ────────────────────────────────────────────────────────────────── */

const cursorPos = { x: 0, y: 0 };

function CursorParallaxGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function handlePointerMove(e: PointerEvent) {
      cursorPos.x = (e.clientX / window.innerWidth) * 2 - 1;
      cursorPos.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    target.current.x = cursorPos.x;
    target.current.y = cursorPos.y;
    const lerp = 1 - Math.pow(0.001, delta);
    groupRef.current.rotation.y +=
      (target.current.x * 0.2 - groupRef.current.rotation.y) * lerp;
    groupRef.current.rotation.x +=
      (-target.current.y * 0.14 - groupRef.current.rotation.x) * lerp;
  });

  return <group ref={groupRef}>{children}</group>;
}

/* ──────────────────────────────────────────────────────────────────
 *  Agent entity — what used to be "Orb". Now reads as an AI agent:
 *
 *    - Glowing core sphere (the agent's "consciousness")
 *    - Wireframe icosahedron shell (the agent's "body"/container)
 *    - Two orbiting torus rings at perpendicular axes (atomic, alive)
 *    - Breathing scale (organic, not mechanical)
 *
 *  Each agent has a distinct color + role identity:
 *    green   = primary orchestrator
 *    cyan    = data/analytics specialist
 *    violet  = synthesis/risk specialist
 * ────────────────────────────────────────────────────────────────── */

type AgentProps = {
  position: [number, number, number];
  scale?: number;
  color: string;
  emissive?: string;
  floatSpeed?: number;
  rotationSpeed?: number;
  opacity?: number;
  /** Ring orbit speed — distinct per agent for variety */
  ringSpeed?: number;
};

function AgentEntity({
  position,
  scale = 1,
  color,
  emissive,
  floatSpeed = 1.2,
  rotationSpeed = 0.06,
  opacity = 0.92,
  ringSpeed = 0.4,
}: AgentProps) {
  const coreRef = useRef<Mesh>(null);
  const shellRef = useRef<Mesh>(null);
  const ring1Ref = useRef<Mesh>(null);
  const ring2Ref = useRef<Mesh>(null);
  const elapsedRef = useRef(0);

  useFrame((_, delta) => {
    if (!coreRef.current) return;
    elapsedRef.current += delta;
    const t = elapsedRef.current;

    // Core: slow rotation + breathing scale
    coreRef.current.rotation.x += delta * rotationSpeed;
    coreRef.current.rotation.y += delta * rotationSpeed * 0.7;
    const breathe = 1 + Math.sin(t * floatSpeed * 0.5) * 0.04;
    coreRef.current.scale.setScalar(breathe);

    // Shell: counter-rotates (feels like layers of consciousness)
    if (shellRef.current) {
      shellRef.current.rotation.x -= delta * rotationSpeed * 0.5;
      shellRef.current.rotation.y -= delta * rotationSpeed * 0.35;
    }

    // Rings: orbit at perpendicular axes, different speeds (atomic feel)
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * ringSpeed;
      ring1Ref.current.rotation.x = Math.PI / 2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x += delta * ringSpeed * 0.8;
      ring2Ref.current.rotation.y = Math.PI / 3;
    }
  });

  return (
    <CustomFloat speed={floatSpeed} rotationIntensity={0.12} floatIntensity={0.5}>
      <group position={position} scale={scale}>
        {/* Glowing core sphere */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            color={color}
            emissive={emissive ?? color}
            emissiveIntensity={0.45}
            roughness={0.3}
            metalness={0.35}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Wireframe icosahedron shell — the agent's "body" */}
        <mesh ref={shellRef} scale={1.45}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial
            color={emissive ?? color}
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Orbiting ring 1 — horizontal */}
        <mesh ref={ring1Ref} scale={1.85}>
          <torusGeometry args={[1, 0.025, 16, 64]} />
          <meshBasicMaterial
            color={emissive ?? color}
            transparent
            opacity={0.55}
          />
        </mesh>

        {/* Orbiting ring 2 — angled, counter-rotates */}
        <mesh ref={ring2Ref} scale={2.15}>
          <torusGeometry args={[1, 0.018, 16, 64]} />
          <meshBasicMaterial
            color={emissive ?? color}
            transparent
            opacity={0.35}
          />
        </mesh>
      </group>
    </CustomFloat>
  );
}

/* ──────────────────────────────────────────────────────────────────
 *  Agent connections — animated curves between the 3 agents showing
 *  they're a coordinated network (data flowing between them).
 * ────────────────────────────────────────────────────────────────── */

function AgentConnections({
  agents,
}: {
  agents: { position: [number, number, number]; color: string }[];
}) {
  const groupRef = useRef<Group>(null);
  const elapsedRef = useRef(0);

  // Precompute curve points for each connection (3 pairs for 3 agents)
  const connections = useMemo(() => {
    const pairs: {
      from: [number, number, number];
      to: [number, number, number];
      midColor: string;
    }[] = [];
    for (let i = 0; i < agents.length; i++) {
      for (let j = i + 1; j < agents.length; j++) {
        pairs.push({
          from: agents[i].position,
          to: agents[j].position,
          midColor: agents[i].color,
        });
      }
    }
    return pairs;
  }, [agents]);

  useFrame((_, delta) => {
    elapsedRef.current += delta;
  });

  return (
    <group ref={groupRef}>
      {connections.map((conn, i) => {
        const start = conn.from;
        const end = conn.to;
        // Mid point with slight perpendicular offset for curve
        const mid: [number, number, number] = [
          (start[0] + end[0]) / 2,
          (start[1] + end[1]) / 2 + 0.5,
          (start[2] + end[2]) / 2,
        ];
        return (
          <group key={i}>
            {/* Static dim line */}
            <QuadraticCurve
              start={start}
              mid={mid}
              end={end}
              color={conn.midColor}
              baseOpacity={0.15}
            />
            {/* Animated pulse traveling along the curve */}
            <PulseOnCurve
              start={start}
              mid={mid}
              end={end}
              color={conn.midColor}
              delay={i * 0.7}
              groupRef={groupRef}
              elapsedRef={elapsedRef}
            />
          </group>
        );
      })}
    </group>
  );
}

function QuadraticCurve({
  start,
  mid,
  end,
  color,
  baseOpacity,
}: {
  start: [number, number, number];
  mid: [number, number, number];
  end: [number, number, number];
  color: string;
  baseOpacity: number;
}) {
  // Three.js BufferGeometry with quadratic bezier points
  const points = useMemo(() => {
    const pts: number[] = [];
    const s = start;
    const m = mid;
    const e = end;
    const segments = 32;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = (1 - t) * (1 - t) * s[0] + 2 * (1 - t) * t * m[0] + t * t * e[0];
      const y = (1 - t) * (1 - t) * s[1] + 2 * (1 - t) * t * m[1] + t * t * e[1];
      const z = (1 - t) * (1 - t) * s[2] + 2 * (1 - t) * t * m[2] + t * t * e[2];
      pts.push(x, y, z);
    }
    return new Float32Array(pts);
  }, [start, mid, end]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={baseOpacity} />
    </line>
  );
}

function PulseOnCurve({
  start,
  mid,
  end,
  color,
  delay,
  groupRef,
  elapsedRef,
}: {
  start: [number, number, number];
  mid: [number, number, number];
  end: [number, number, number];
  color: string;
  delay: number;
  groupRef: React.RefObject<Group | null>;
  elapsedRef: React.RefObject<number>;
}) {
  const pulseRef = useRef<Mesh>(null);

  useFrame(() => {
    if (!pulseRef.current || !elapsedRef.current) return;
    const t = ((elapsedRef.current + delay) % 3) / 3; // 0..1 loop
    const s = start;
    const m = mid;
    const e = end;
    const x = (1 - t) * (1 - t) * s[0] + 2 * (1 - t) * t * m[0] + t * t * e[0];
    const y = (1 - t) * (1 - t) * s[1] + 2 * (1 - t) * t * m[1] + t * t * e[1];
    const z = (1 - t) * (1 - t) * s[2] + 2 * (1 - t) * t * m[2] + t * t * e[2];
    pulseRef.current.position.set(x, y, z);
    // Fade at endpoints so the loop is invisible
    const fade = Math.min(t * 6, 1) * Math.min((1 - t) * 6, 1);
    const mat = pulseRef.current.material as { opacity: number } & unknown;
    (mat as { opacity: number }).opacity = 0.9 * fade;
  });

  return (
    <mesh ref={pulseRef}>
      <sphereGeometry args={[0.08, 12, 12]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0}
        blending={2} // AdditiveBlending
        depthWrite={false}
      />
    </mesh>
  );
}

/* ──────────────────────────────────────────────────────────────────
 *  Particle field — depth atmosphere behind the agents
 * ────────────────────────────────────────────────────────────────── */

function ParticleField({ count = 220 }: { count?: number }) {
  const pointsRef = useRef<Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // eslint-disable-next-line react-hooks/purity
      const r = 6 + Math.random() * 4;
      // eslint-disable-next-line react-hooks/purity
      const theta = Math.random() * Math.PI * 2;
      // eslint-disable-next-line react-hooks/purity
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
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#9adfb4"
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  );
}

/* ──────────────────────────────────────────────────────────────────
 *  Brand-tinted lighting rig
 * ────────────────────────────────────────────────────────────────── */

function BrandLighting() {
  return (
    <>
      <ambientLight intensity={0.7} color="#ffffff" />
      <directionalLight position={[5, 6, 4]} intensity={2.2} color="#ffffff" />
      <pointLight position={[-6, -2, -4]} intensity={30} color="#06b6d4" distance={25} />
      <pointLight position={[6, 3, 2]} intensity={25} color="#8b5cf6" distance={22} />
      <pointLight position={[0, -5, 6]} intensity={20} color="#208535" distance={20} />
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────
 *  Scroll-driven camera rig — camera flies forward as user scrolls
 *  past the hero. Maps scrollY over first viewport to camera z 7→4.5.
 * ────────────────────────────────────────────────────────────────── */

function ScrollCameraRig() {
  const { camera } = useThree();
  const targetZ = useRef(7);
  const targetY = useRef(0);

  useEffect(() => {
    let progress = 0;
    const compute = () => {
      progress = Math.min(1, window.scrollY / window.innerHeight);
      targetZ.current = 7 - progress * 2.5;
      targetY.current = -progress * 0.35;
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    return () => window.removeEventListener("scroll", compute);
  }, []);

  useFrame((_, delta) => {
    const lerp = 1 - Math.pow(0.001, delta);
    camera.position.z += (targetZ.current - camera.position.z) * lerp;
    camera.position.y += (targetY.current - camera.position.y) * lerp;
    camera.updateProjectionMatrix();
  });

  return null;
}

/* ──────────────────────────────────────────────────────────────────
 *  Scene composition — 3 agent entities + connections + particle field
 * ────────────────────────────────────────────────────────────────── */

const AGENTS = [
  {
    position: [2.8, 0.4, -1] as [number, number, number],
    scale: 2.2,
    color: "#208535",
    emissive: "#186B2B",
    floatSpeed: 1.0,
    rotationSpeed: 0.05,
    opacity: 0.95,
    ringSpeed: 0.4,
  },
  {
    position: [-3.8, 1.8, -2] as [number, number, number],
    scale: 1.1,
    color: "#06b6d4",
    emissive: "#0e7490",
    floatSpeed: 1.4,
    rotationSpeed: 0.08,
    opacity: 0.85,
    ringSpeed: 0.6,
  },
  {
    position: [3.4, -2.2, -3] as [number, number, number],
    scale: 0.85,
    color: "#8b5cf6",
    emissive: "#6d28d9",
    floatSpeed: 1.1,
    rotationSpeed: 0.07,
    opacity: 0.78,
    ringSpeed: 0.5,
  },
];

function HeroSceneContents() {
  return (
    <CursorParallaxGroup>
      <ScrollCameraRig />
      <BrandLighting />

      {/* 3 agent entities — primary orchestrator (green), data specialist
          (cyan), synthesis specialist (violet) */}
      {AGENTS.map((agent, i) => (
        <AgentEntity key={i} {...agent} />
      ))}

      {/* Curved connections with traveling data pulses */}
      <AgentConnections agents={AGENTS} />

      <ParticleField count={220} />
      <fog attach="fog" args={["#0a0a0a", 8, 18]} />
    </CursorParallaxGroup>
  );
}

/* ──────────────────────────────────────────────────────────────────
 *  Exported canvas wrapper
 * ────────────────────────────────────────────────────────────────── */

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
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <HeroSceneContents />
    </Canvas>
  );
}
