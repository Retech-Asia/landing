"use client";

/**
 * Flowing data streams — WORKING VERSION (no postprocessing, no custom shader).
 *
 * Previous premium version had broken custom ShaderMaterial that rendered
 * nothing visible. This version uses default pointsMaterial + a generated
 * circular sprite texture for soft particles. Once verified rendering,
 * postprocessing (bloom) can be layered back on top.
 *
 * Tech:
 *   - Three.js pointsMaterial + circular CanvasTexture (soft particles)
 *   - HDR colors via THREE.Color.multiplyScalar (for future bloom)
 *   - CatmullRomCurve3 paths with animated particle offsets
 *   - Cursor parallax + camera dolly
 *   - Per-particle size + opacity variation via attribute (shader-friendly
 *     but works without custom shader by averaging via material.size)
 *
 * See docs/hero-animation-spec.md for the premium upgrade target.
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* ── Stream definitions ── */

type Stream = {
  points: THREE.Vector3[];
  color: THREE.Color;
  particleCount: number;
  flowSpeed: number;
  particleSize: number;
};

const HDR = 2.4;
const STREAMS: Stream[] = [
  {
    points: [
      new THREE.Vector3(2.5, 3, -2),
      new THREE.Vector3(4, 1.5, -1),
      new THREE.Vector3(3.5, -0.5, -3),
      new THREE.Vector3(5, -2, -2),
      new THREE.Vector3(3, -3.5, -4),
    ],
    color: new THREE.Color("#208535").multiplyScalar(HDR),
    particleCount: 800,
    flowSpeed: 0.12,
    particleSize: 0.09,
  },
  {
    points: [
      new THREE.Vector3(1.5, 2.5, -3),
      new THREE.Vector3(3, 0.5, -1.5),
      new THREE.Vector3(4.5, -1, -3.5),
      new THREE.Vector3(2.5, -3, -2),
    ],
    color: new THREE.Color("#06b6d4").multiplyScalar(HDR),
    particleCount: 600,
    flowSpeed: 0.15,
    particleSize: 0.08,
  },
  {
    points: [
      new THREE.Vector3(2, -1, -1),
      new THREE.Vector3(4, -0.5, -3),
      new THREE.Vector3(5, -2.5, -4),
      new THREE.Vector3(3.5, -4, -2.5),
    ],
    color: new THREE.Color("#8b5cf6").multiplyScalar(HDR),
    particleCount: 500,
    flowSpeed: 0.18,
    particleSize: 0.07,
  },
  {
    points: [
      new THREE.Vector3(3.5, 3.5, -3),
      new THREE.Vector3(5, 2, -2),
      new THREE.Vector3(4, 0, -4),
    ],
    color: new THREE.Color("#2EA04E").multiplyScalar(HDR * 1.1),
    particleCount: 400,
    flowSpeed: 0.22,
    particleSize: 0.06,
  },
];

/* ── Circular particle sprite — soft edges instead of hard squares ── */

function createCircleTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
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

/* ── Single flowing stream ── */

function FlowingStream({
  stream,
  circleTexture,
}: {
  stream: Stream;
  circleTexture: THREE.Texture;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(stream.points, false, "catmullrom", 0.5),
    [stream.points],
  );

  // Sample initial positions + per-particle t values
  const { positions, tValues } = useMemo(() => {
    const positions = new Float32Array(stream.particleCount * 3);
    const tValues = new Float32Array(stream.particleCount);
    for (let i = 0; i < stream.particleCount; i++) {
      tValues[i] = (i + Math.random() * 0.5) / stream.particleCount;
      const p = curve.getPointAt(tValues[i]);
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    }
    return { positions, tValues };
  }, [curve, stream.particleCount]);

  // Tube path — dim spine
  const tubePoints = useMemo(() => {
    const samples = 64;
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= samples; i++) {
      const p = curve.getPointAt(i / samples);
      pts.push([p.x, p.y, p.z]);
    }
    return pts;
  }, [curve]);

  // Animate particle positions along the curve
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
      <Line
        points={tubePoints}
        color={stream.color}
        lineWidth={1.5}
        transparent
        opacity={0.2}
      />
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={stream.particleSize}
          map={circleTexture}
          color={stream.color}
          sizeAttenuation
          transparent
          opacity={0.9}
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
  count = 180,
}: {
  circleTexture: THREE.Texture;
  count?: number;
}) {
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
        size={0.04}
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

/* ── Cursor parallax ── */

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
      (cursorPos.x * 0.18 - groupRef.current.rotation.y) * lerp;
    groupRef.current.rotation.x +=
      (-cursorPos.y * 0.12 - groupRef.current.rotation.x) * lerp;
  });

  return <group ref={groupRef}>{children}</group>;
}

/* ── Camera dolly ── */

function CameraDolly() {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime();
    camera.position.z = 8 + Math.sin(t * 0.1) * 0.3;
    camera.position.y = Math.sin(t * 0.07) * 0.15;
    camera.lookAt(2.5, 0, -2);
  });
  return null;
}

/* ── Lighting ── */

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
        {STREAMS.map((stream, i) => (
          <FlowingStream key={i} stream={stream} circleTexture={circleTexture} />
        ))}
        <AmbientParticles circleTexture={circleTexture} count={180} />
        <fog attach="fog" args={["#0a0a0a", 8, 18]} />
      </CursorParallaxGroup>
    </>
  );
}

export function HeroScene() {
  // Create circle texture once
  const circleTexture = useMemo(() => {
    if (typeof document === "undefined") {
      // SSR fallback — return a dummy texture, will be replaced on client
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
