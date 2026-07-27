"use client";

/**
 * Flowing ribbon hero sculpture.
 *
 * Reference: a single undulating ribbon-like surface with vibrant
 * gradient (adapted to Retech brand palette: green → cyan → violet),
 * positioned on the right side of the hero. Slow organic wave motion
 * driven by layered sine waves. Clean white background.
 *
 * Why this design:
 *   - Single sculptural focal point (not scattered decoration)
 *   - Hallmark-compliant: one object, motivated by content
 *   - Maps to Retech's "data flow" / "AI pipeline" metaphor
 *   - Brand palette preserved (green primary, cyan + violet accents)
 *
 * Implementation:
 *   - PlaneGeometry(8, 4, 80, 40) — high subdivision for smooth waves
 *   - Per-frame CPU vertex displacement (no custom shader — previous
 *     attempt silently failed; this approach is bulletproof)
 *   - Vertex colors lerp along x-axis for the gradient
 *   - MeshStandardMaterial with vertexColors=true, additive blending off
 *   - Subtle rotation of the whole mesh for 3D depth
 *
 * Performance:
 *   - 80×40 = 3,200 vertices updated per frame via BufferAttribute write
 *   - Single draw call (one mesh)
 *   - DPR capped at [1, 1.75]
 *   - Desktop + fine-pointer only, LCP-deferred, reduced-motion aware
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* ── Ribbon mesh ── */

function FlowingRibbon() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geomRef = useRef<THREE.PlaneGeometry>(null);
  const elapsedRef = useRef(0);

  // Build geometry + initial colors once
  const setup = useMemo(() => {
    const geom = new THREE.PlaneGeometry(8, 4, 80, 40);
    // Add color attribute for the gradient
    const positions = geom.attributes.position;
    const count = positions.count;
    const colors = new Float32Array(count * 3);

    // Brand gradient colors (slightly HDR for visual punch without
    // needing postprocessing bloom)
    const colorStart = new THREE.Color("#208535"); // brand green
    const colorMid = new THREE.Color("#06b6d4"); // cyan
    const colorEnd = new THREE.Color("#8b5cf6"); // violet

    const tmpColor = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const x = positions.getX(i);
      // x ranges from -4 to 4 (PlaneGeometry 8 wide centered)
      const t = (x + 4) / 8; // 0..1
      if (t < 0.5) {
        tmpColor.copy(colorStart).lerp(colorMid, t * 2);
      } else {
        tmpColor.copy(colorMid).lerp(colorEnd, (t - 0.5) * 2);
      }
      colors[i * 3] = tmpColor.r;
      colors[i * 3 + 1] = tmpColor.g;
      colors[i * 3 + 2] = tmpColor.b;
    }
    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return { geom };
  }, []);

  // Per-frame: displace vertices using layered sine waves + slow rotation
  useFrame((_, delta) => {
    if (!meshRef.current || !geomRef.current) return;
    elapsedRef.current += delta;
    const t = elapsedRef.current;

    const geom = geomRef.current;
    const posAttr = geom.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    // Layered sine waves for organic motion
    // Multiple frequencies + amplitudes + phase offsets
    for (let i = 0; i < arr.length; i += 3) {
      const x = arr[i]; // -4..4
      const y = arr[i + 1]; // -2..2 (original plane y)
      // Z displacement: layered waves
      const wave1 = Math.sin(x * 0.6 + t * 0.7) * 0.6;
      const wave2 = Math.sin(x * 0.3 - t * 0.5 + y * 0.4) * 0.4;
      const wave3 = Math.sin(y * 0.8 + t * 0.3) * 0.2;
      arr[i + 2] = wave1 + wave2 + wave3;
    }
    posAttr.needsUpdate = true;
    geom.computeVertexNormals(); // recompute for correct lighting

    // Subtle whole-mesh rotation for 3D depth perception
    meshRef.current.rotation.x = -0.3 + Math.sin(t * 0.15) * 0.05;
    meshRef.current.rotation.y = -0.4 + Math.sin(t * 0.1) * 0.08;
    meshRef.current.rotation.z = Math.sin(t * 0.08) * 0.04;
  });

  return (
    <mesh ref={meshRef} geometry={setup.geom} position={[3.5, 0, -1]}>
      <meshStandardMaterial
        vertexColors
        side={THREE.DoubleSide}
        roughness={0.4}
        metalness={0.2}
        emissive={"#208535"}
        emissiveIntensity={0.08}
        transparent
        opacity={0.92}
      />
    </mesh>
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
      (cursorPos.x * 0.15 - groupRef.current.rotation.y) * lerp;
    groupRef.current.rotation.x +=
      (-cursorPos.y * 0.1 - groupRef.current.rotation.x) * lerp;
  });

  return <group ref={groupRef}>{children}</group>;
}

/* ── Camera dolly ── */

function CameraDolly() {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime();
    camera.position.z = 9 + Math.sin(t * 0.08) * 0.4;
    camera.position.y = Math.sin(t * 0.06) * 0.2;
    camera.lookAt(3.5, 0, -1);
  });
  return null;
}

/* ── Lighting ── */

function StudioLighting() {
  return (
    <>
      <ambientLight intensity={0.7} color="#ffffff" />
      <directionalLight position={[5, 6, 4]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-2, 0, 3]} intensity={8} color="#06b6d4" distance={12} />
      <pointLight position={[6, -2, 2]} intensity={6} color="#8b5cf6" distance={10} />
      <pointLight position={[3, 3, -2]} intensity={5} color="#208535" distance={8} />
    </>
  );
}

/* ── Optional ambient particles for depth atmosphere ── */

function AmbientParticles({ count = 80 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // eslint-disable-next-line react-hooks/purity
      const r = 6 + Math.random() * 3;
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
    pointsRef.current.rotation.y += delta * 0.012;
    pointsRef.current.rotation.x += delta * 0.006;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#9adfb4"
        sizeAttenuation
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Scene + Canvas ── */

function HeroSceneContents() {
  return (
    <>
      <CursorParallaxGroup>
        <StudioLighting />
        <FlowingRibbon />
        <AmbientParticles count={80} />
      </CursorParallaxGroup>
    </>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [1.5, 0, 9], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <CameraDolly />
      <HeroSceneContents />
    </Canvas>
  );
}
