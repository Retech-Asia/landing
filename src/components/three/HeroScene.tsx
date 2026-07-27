"use client";

/**
 * Stripe-tier flowing data streams (P0 + P1 upgrade).
 *
 * Upgrades from the previous version:
 *   - Custom ShaderMaterial with soft circular particles (no more squares)
 *   - Bloom postprocessing via @react-three/postprocessing (mipmapBlur)
 *   - HDR color values pushed past 1.0 so bloom is selective for free
 *   - ACES Filmic tone mapping
 *   - Per-particle size variation + twinkle phase
 *   - Gradient color along each curve (startColor → endColor)
 *   - Particle count ×2.2 (1030 → 2300)
 *   - Camera dolly (subtle z + y drift, not just cursor parallax)
 *   - Tuned fog range
 *
 * See docs/hero-animation-spec.md for the full research + spec.
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* ──────────────────────────────────────────────────────────────────
 *  Stream definitions — HDR colors, gradient endpoints, higher counts.
 *  All biased to x ≥ 0 (right side).
 * ────────────────────────────────────────────────────────────────── */

type Stream = {
  points: THREE.Vector3[];
  startColor: THREE.Color; // HDR (>1.0 components for selective bloom)
  endColor: THREE.Color;
  particleCount: number;
  flowSpeed: number;
  baseSize: number;
};

// sRGB hex → THREE.Color, then ×HDR multiplier for selective bloom.
// The multiplier pushes bright channel values past 1.0 so the
// luminanceThreshold=1.0 Bloom only catches the particles, not the
// background or text.
const HDR = 2.6;
const streamBrandStart = new THREE.Color("#208535").multiplyScalar(HDR);
const streamBrandEnd = new THREE.Color("#06b6d4").multiplyScalar(HDR * 0.85);
const streamCyanStart = new THREE.Color("#06b6d4").multiplyScalar(HDR);
const streamCyanEnd = new THREE.Color("#8b5cf6").multiplyScalar(HDR * 0.85);
const streamVioletStart = new THREE.Color("#8b5cf6").multiplyScalar(HDR);
const streamVioletEnd = new THREE.Color("#208535").multiplyScalar(HDR * 0.85);
const streamAccentStart = new THREE.Color("#2EA04E").multiplyScalar(HDR * 1.1);
const streamAccentEnd = new THREE.Color("#22D3EE").multiplyScalar(HDR);

const STREAMS: Stream[] = [
  {
    // Primary brand → cyan
    points: [
      new THREE.Vector3(2.5, 3, -2),
      new THREE.Vector3(4, 1.5, -1),
      new THREE.Vector3(3.5, -0.5, -3),
      new THREE.Vector3(5, -2, -2),
      new THREE.Vector3(3, -3.5, -4),
    ],
    startColor: streamBrandStart,
    endColor: streamBrandEnd,
    particleCount: 800,
    flowSpeed: 0.12,
    baseSize: 9.0,
  },
  {
    // Cyan → violet
    points: [
      new THREE.Vector3(1.5, 2.5, -3),
      new THREE.Vector3(3, 0.5, -1.5),
      new THREE.Vector3(4.5, -1, -3.5),
      new THREE.Vector3(2.5, -3, -2),
    ],
    startColor: streamCyanStart,
    endColor: streamCyanEnd,
    particleCount: 600,
    flowSpeed: 0.15,
    baseSize: 8.0,
  },
  {
    // Violet → brand
    points: [
      new THREE.Vector3(2, -1, -1),
      new THREE.Vector3(4, -0.5, -3),
      new THREE.Vector3(5, -2.5, -4),
      new THREE.Vector3(3.5, -4, -2.5),
    ],
    startColor: streamVioletStart,
    endColor: streamVioletEnd,
    particleCount: 500,
    flowSpeed: 0.18,
    baseSize: 7.0,
  },
  {
    // Accent brand-light → cyan (fastest)
    points: [
      new THREE.Vector3(3.5, 3.5, -3),
      new THREE.Vector3(5, 2, -2),
      new THREE.Vector3(4, 0, -4),
    ],
    startColor: streamAccentStart,
    endColor: streamAccentEnd,
    particleCount: 400,
    flowSpeed: 0.22,
    baseSize: 6.0,
  },
];

/* ──────────────────────────────────────────────────────────────────
 *  Custom shaders — soft circular particles + gradient + twinkle.
 * ────────────────────────────────────────────────────────────────── */

const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute float aColorMix;

  uniform float uTime;
  uniform float uPixelRatio;

  varying float vColorMix;
  varying float vAlpha;

  void main() {
    vColorMix = aColorMix;

    // Twinkle: per-particle phase + slow time. Range 0.4-1.0 so particles
    // never fully disappear.
    vAlpha = 0.55 + 0.45 * sin(uTime * 1.2 + aPhase);

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    // Distance attenuation: closer particles render bigger.
    float attenuation = 1.0 / -mvPosition.z;

    gl_PointSize = aSize * attenuation * uPixelRatio;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorStart;
  uniform vec3 uColorEnd;

  varying float vColorMix;
  varying float vAlpha;

  void main() {
    // gl_PointCoord is [0,1] across the point sprite. Center is (0.5, 0.5).
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);

    // Soft circular falloff — smoothstep gives feathered bokeh-like edges.
    // No hard discard (that aliases).
    float alpha = smoothstep(0.5, 0.05, dist);

    if (alpha < 0.01) discard; // early-out only, not the edge mask

    // Gradient color along the curve based on particle's t position
    vec3 color = mix(uColorStart, uColorEnd, vColorMix);

    gl_FragColor = vec4(color, alpha * vAlpha);
  }
`;

/* ──────────────────────────────────────────────────────────────────
 *  Single flowing stream — ShaderMaterial + BufferGeometry + per-frame
 *  particle position updates along the CatmullRomCurve3.
 * ────────────────────────────────────────────────────────────────── */

function FlowingStream({ stream }: { stream: Stream }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Build the curve once
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(stream.points, false, "catmullrom", 0.5),
    [stream.points],
  );

  // Sample initial particle state: positions, t values, sizes, phases, colorMix
  const { positions, tValues, sizes, phases, colorMix } = useMemo(() => {
    const positions = new Float32Array(stream.particleCount * 3);
    const tValues = new Float32Array(stream.particleCount);
    const sizes = new Float32Array(stream.particleCount);
    const phases = new Float32Array(stream.particleCount);
    const colorMix = new Float32Array(stream.particleCount);

    for (let i = 0; i < stream.particleCount; i++) {
      // Stagger initial t position so particles are spread along the curve
      // with slight randomness for organic feel
      tValues[i] = (i + Math.random() * 0.5) / stream.particleCount;
      const p = curve.getPointAt(tValues[i]);
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;

      // Per-particle size variation: 0.5x to 1.8x base size
      sizes[i] = stream.baseSize * (0.5 + Math.random() * 1.3);

      // Random twinkle phase
      phases[i] = Math.random() * Math.PI * 2;

      // Color gradient position — uses the same t as the curve position
      colorMix[i] = tValues[i];
    }
    return { positions, tValues, sizes, phases, colorMix };
  }, [curve, stream.particleCount, stream.baseSize]);

  // Custom ShaderMaterial — soft particles + gradient + twinkle
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: {
          value:
            typeof window !== "undefined"
              ? Math.min(window.devicePixelRatio, 1.75)
              : 1,
        },
        uColorStart: { value: stream.startColor },
        uColorEnd: { value: stream.endColor },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, [stream.startColor, stream.endColor]);

  // Tube path (the dim spine of the stream) — using drei <Line> for real
  // pixel-width lines (browser caps lineBasicMaterial at 1px).
  const tubePoints = useMemo(() => {
    const samples = 64;
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= samples; i++) {
      const p = curve.getPointAt(i / samples);
      pts.push([p.x, p.y, p.z]);
    }
    return pts;
  }, [curve]);

  // Per-frame: advance particle t, resample curve position, advance shader time
  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    material.uniforms.uTime.value += delta;

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
      {/* Dim spine via drei Line (real pixel width, not the 1px cap) */}
      <Line
        points={tubePoints}
        color={stream.startColor}
        lineWidth={1.5}
        transparent
        opacity={0.18}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />

      {/* Particles flowing along the curve — custom shader */}
      <points ref={pointsRef} material={material}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
          <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
          <bufferAttribute attach="attributes-aColorMix" args={[colorMix, 1]} />
        </bufferGeometry>
      </points>
    </group>
  );
}

/* ──────────────────────────────────────────────────────────────────
 *  Ambient particle field — depth atmosphere, biased right.
 * ────────────────────────────────────────────────────────────────── */

function AmbientParticles({ count = 180 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // eslint-disable-next-line react-hooks/purity
      const r = 5 + Math.random() * 4;
      // eslint-disable-next-line react-hooks/purity
      const theta = Math.random() * Math.PI * 2;
      // eslint-disable-next-line react-hooks/purity
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta) + 2;
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi) - 2;
      sizes[i] = 2 + Math.random() * 3;
    }
    return { positions, sizes };
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: {
            value:
              typeof window !== "undefined"
                ? Math.min(window.devicePixelRatio, 1.75)
                : 1,
          },
          uColorStart: { value: new THREE.Color("#9adfb4").multiplyScalar(1.8) },
          uColorEnd: { value: new THREE.Color("#9adfb4").multiplyScalar(1.8) },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    material.uniforms.uTime.value += delta;
    pointsRef.current.rotation.y += delta * 0.015;
    pointsRef.current.rotation.x += delta * 0.008;
  });

  return (
    <points ref={pointsRef} material={material}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        {/* phase and colorMix — initialized once, ambient doesn't really flow */}
        <bufferAttribute
          attach="attributes-aPhase"
          args={[new Float32Array(count).map(() => Math.random() * Math.PI * 2), 1]}
        />
        <bufferAttribute
          attach="attributes-aColorMix"
          args={[new Float32Array(count).fill(0.5), 1]}
        />
      </bufferGeometry>
    </points>
  );
}

/* ──────────────────────────────────────────────────────────────────
 *  Cursor parallax — whole scene tilts based on pointer.
 * ────────────────────────────────────────────────────────────────── */

const cursorPos = { x: 0, y: 0 };

function CursorParallaxGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);

  // Window pointer listener once
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

/* ──────────────────────────────────────────────────────────────────
 *  Camera dolly — slow z + y drift, very subtle. Adds "alive" feel
 *  beyond cursor parallax alone.
 * ────────────────────────────────────────────────────────────────── */

function CameraDolly() {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime();
    camera.position.z = 8 + Math.sin(t * 0.1) * 0.3;
    camera.position.y = Math.sin(t * 0.07) * 0.15;
    camera.lookAt(2.5, 0, -2);
  });
  return null;
}

/* ──────────────────────────────────────────────────────────────────
 *  Brand lighting — point lights in stream colors for local glow.
 * ────────────────────────────────────────────────────────────────── */

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

/* ──────────────────────────────────────────────────────────────────
 *  Scene composition + postprocessing.
 * ────────────────────────────────────────────────────────────────── */

function HeroSceneContents() {
  return (
    <>
      <CursorParallaxGroup>
        <BrandLighting />
        {STREAMS.map((stream, i) => (
          <FlowingStream key={i} stream={stream} />
        ))}
        <AmbientParticles count={180} />
        <fog attach="fog" args={["#0a0a0a", 8, 18]} />
      </CursorParallaxGroup>

      {/* Postprocessing — selective bloom on HDR particles only (threshold=1.0).
          mipmapBlur is the modern path (KernelSize is deprecated). */}
      <EffectComposer enableNormalPass={false}>
        <Bloom
          intensity={1.3}
          luminanceThreshold={1.0}
          luminanceSmoothing={0.9}
          mipmapBlur
          radius={0.7}
        />
        <Vignette eskil={false} offset={0.3} darkness={0.55} />
      </EffectComposer>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────
 *  Canvas wrapper — ACES Filmic tone mapping + sRGB output.
 * ────────────────────────────────────────────────────────────────── */

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [1.5, 0, 8], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <CameraDolly />
      <HeroSceneContents />
    </Canvas>
  );
}
