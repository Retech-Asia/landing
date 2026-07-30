"use client";

/**
 * Hero ambient gradient — fragment-shader plane.
 *
 * Four drifting radial color sources (brand green, cyan, violet, brand
 * light) blended per-pixel as a weighted average. Slow ambient drift via
 * 2-octave simplex noise + FBM turbulence. ACES tonemapped + Bloom +
 * Vignette postprocessing. Reads as atmospheric light, not a graphic.
 *
 * Responsive: right-biased on desktop (mask fades the left edge so text
 * reads cleanly), full-coverage with reduced opacity on mobile.
 *
 * LCP-safe: mount is deferred via requestIdleCallback until the browser
 * is idle (max 2s timeout), so the shader never blocks first paint.
 *
 * Reduced motion: uTime is frozen at a balanced static frame; no rAF
 * advancement.
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/* ── Shaders ── */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;

  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                            + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                             dot(x12.zw, x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 3; i++) {
      v += a * snoise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  float smootherstep(float edge0, float edge1, float x) {
    float t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
  }

  float radialSource(vec2 uv, vec2 center, float radius) {
    float d = distance(uv, center);
    return 1.0 - smootherstep(0.0, radius, d);
  }

  vec3 aces(vec3 x) {
    const float a = 2.51;
    const float b = 0.03;
    const float c = 2.43;
    const float d = 0.59;
    const float e = 0.14;
    return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 aspectUv = vec2(uv.x * aspect, uv.y);
    float t = uTime * 0.05;

    // 4 drifting radial color sources — biased to right side.
    // Start positions tuned so all four colors are visible from frame 1
    // (the original tune had src3/violet starting at y=0.22, hidden in
    // the bottom corner — users saw "only green" for ~15s until violet
    // drifted into the focal area).
    vec2 src1Pos = vec2(
      (0.55 + snoise(vec2(t * 0.5, 0.0)) * 0.15) * aspect,
      0.65 + snoise(vec2(0.0, t * 0.5)) * 0.12
    );
    float src1 = radialSource(aspectUv, src1Pos, 0.6);

    vec2 src2Pos = vec2(
      (0.85 + snoise(vec2(t * 0.4 + 5.0, 0.0)) * 0.12) * aspect,
      0.45 + snoise(vec2(0.0, t * 0.4 + 5.0)) * 0.12
    );
    float src2 = radialSource(aspectUv, src2Pos, 0.55);

    vec2 src3Pos = vec2(
      (0.72 + snoise(vec2(t * 0.6 + 10.0, 0.0)) * 0.13) * aspect,
      0.48 + snoise(vec2(0.0, t * 0.6 + 10.0)) * 0.12
    );
    float src3 = radialSource(aspectUv, src3Pos, 0.55);

    vec2 src4Pos = vec2(
      (0.95 + snoise(vec2(t * 0.7 + 15.0, 0.0)) * 0.08) * aspect,
      0.75 + snoise(vec2(0.0, t * 0.7 + 15.0)) * 0.08
    );
    float src4 = radialSource(aspectUv, src4Pos, 0.35);

    // Subtle FBM distortion
    float distortion = fbm(aspectUv * 1.5 + vec2(t * 0.3, t * 0.2));
    src1 += distortion * 0.05;
    src2 += distortion * 0.05;
    src3 += distortion * 0.05;

    // Brand colors
    vec3 color1 = vec3(0.13, 0.52, 0.21); // brand green
    vec3 color2 = vec3(0.02, 0.71, 0.83); // cyan
    vec3 color3 = vec3(0.55, 0.36, 0.96); // violet
    vec3 color4 = vec3(0.18, 0.63, 0.30); // brand-light

    float totalWeight = src1 + src2 + src3 + src4 + 0.01;
    vec3 color = (color1 * src1 + color2 * src2 + color3 * src3 + color4 * src4) / totalWeight;

    // Edge falloff
    float edgeFalloff = smootherstep(0.0, 0.5, 1.0 - length(uv - vec2(0.65, 0.5)) * 1.4);
    color *= 0.55 + edgeFalloff * 0.45;

    // HDR lift
    color *= 1.15;

    // Barely-perceptible grain
    float grain = fract(sin(dot(uv * uResolution / 128.0, vec2(12.9898, 78.233)) + uTime) * 43758.5453);
    color += (grain - 0.5) * 0.008;

    color = aces(color);
    gl_FragColor = vec4(color, 1.0);
  }
`;

/* ── Scene ── */

function GradientPlane({ freezeTime }: { freezeTime: number | null }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(800, 600) },
    }),
    [],
  );

  useFrame(({ clock, size }) => {
    if (!matRef.current) return;
    // Reduced motion: lock to a fixed moment that shows all four colors
    // (the rebalanced start positions are tuned for this).
    matRef.current.uniforms.uTime.value =
      freezeTime ?? clock.getElapsedTime();
    matRef.current.uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

function GradientScene({ freezeTime }: { freezeTime: number | null }) {
  return (
    <>
      <GradientPlane freezeTime={freezeTime} />
      <EffectComposer enableNormalPass={false}>
        <Bloom intensity={0.35} luminanceThreshold={1.0} mipmapBlur radius={0.5} />
        <Vignette eskil={false} offset={0.2} darkness={0.25} />
      </EffectComposer>
    </>
  );
}

/* ── Main component — wrapper with guards ── */

export function LatticeField() {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(motionMq.matches);
    update();
    motionMq.addEventListener("change", update);
    return () => motionMq.removeEventListener("change", update);
  }, []);

  // Defer mount until idle (LCP protection)
  useEffect(() => {
    const idle =
      (window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      }).requestIdleCallback ??
      ((cb: () => void) => setTimeout(cb, 1200));
    const handle = idle(() => setMounted(true), { timeout: 2000 });
    return () => {
      const cancel =
        (window as Window & { cancelIdleCallback?: (h: number) => void })
          .cancelIdleCallback ??
        ((h: number) => clearTimeout(h));
      cancel(handle as number);
    };
  }, []);

  if (!mounted) return null;

  // Reduced motion: lock uTime so the frame is static at a balanced moment.
  // uTime=10 with the rebalanced start positions shows all four colors.
  const freezeTime = prefersReducedMotion ? 10 : null;

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none lattice-mask"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 1], fov: 50 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <GradientScene freezeTime={freezeTime} />
      </Canvas>
    </div>
  );
}
