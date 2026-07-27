# Hero 3D Animation — Premium Upgrade Spec

**Target:** `/src/components/three/HeroScene.tsx` (4 flowing particle streams, ~1030 particles total)
**Goal:** Take the current "still so simple" hero to Stripe-tier polish.
**Constraint:** Must preserve the existing perf contract — deferred mount, desktop-only, reduced-motion fallback, < 16ms frame budget.

---

## 1. What Stripe actually does (reference benchmark)

Stripe's homepage hero is **not a particle system** — it is a **shader-driven mesh gradient**. This is the single most important finding from the research.

### Technique
- A full-screen quad runs a **fragment shader** that blends multiple radial color gradients in screen space.
- Gradients are pushed around by **simplex/Perlin noise** in the shader, producing the slow, organic, fluid motion.
- A subtle **grain/noise pass** sits on top to avoid banding and add filmic texture.
- Tone mapping is **ACES Filmic** with carefully tuned exposure.

### Library
- Custom WebGL (not three.js for the gradient itself). Their [engineering blog post on the Globe](https://stripe.com/blog/globe) notes that they hand-write WebGL when they need it.
- "Recreating STRIPE's Hero Section" tutorials on YouTube confirm the modern reproduction path is **Spline + Next.js** or custom shader.

### Particle counts
- **None.** The "flowing" look is pure noise-driven color field motion.
- Their globe visualization (linked above) uses Three.js for the globe mesh, but the homepage background is a 2D shader effect.

### Postprocessing
- Subtle bloom-like glow comes from **HDR color values + tone mapping**, not an explicit UnrealBloomPass on a 3D scene.
- Film grain is added in-shader.

### Implication for Retech
Retech's current 4-stream particle system is structurally different from Stripe's reference. To reach "Stripe-tier" we have two honest options:

1. **Pivot to a shader-based mesh gradient background** (true Stripe parity, ~2 weeks including design pass).
2. **Keep particles but execute them at a premium tier** (add bloom, soft sprites, gradient color, depth fog, more particles) — this is the path this spec targets because the existing investment in stream curves is worth preserving and the data-flow metaphor is stronger than a pure gradient for an AI/engineering company.

---

## 2. What makes 3D feel premium vs amateur — 11 techniques

Ordered by impact-to-effort ratio. The current Retech hero fails techniques 1, 2, 3, 5, 6, 9.

| # | Technique | Why it reads premium | Amateur failure mode |
|---|------------|----------------------|----------------------|
| 1 | **Bloom postprocessing** (`@react-three/postprocessing`) | Light "leaks" out of bright objects; mimics camera lens response. Single biggest visual jump in production value. | Sharp pixels, no glow, dots look like data not light. |
| 2 | **Soft circular sprite via shader** (`gl_PointCoord` + smoothstep, NOT a hard `discard`) | Edges fade like real bokeh. | Default `pointsMaterial` renders squares — instant "tutorial demo" look. |
| 3 | **Gradient color along the curve** (start color → end color, lerped by `t`) | Adds chromatic depth; feels art-directed. | Single flat hex per stream reads as a debug visualization. |
| 4 | **HDR colors + ACES tone mapping** (color values > 1.0, `renderer.toneMapping = ACESFilmicToneMapping`) | Selective bloom is free — only the bright stuff blooms. Whites stay white, darks stay rich. | Everything blooms uniformly, or nothing does. |
| 5 | **Variable particle sizes** (per-particle `sizeAttenuation` with noise) | Removes the "stamped grid" look. | Identical sizes =很明显 it is a particle system. |
| 6 | **Depth fog** (already present but mistuned — color and range need work) | Atmospheric perspective sells the 3D space. | Flat depth reads as 2D screen-space. |
| 7 | **Camera dolly** (slow `<0.1 unit` Z drift, not parallax-only) | Subtle parallax + z-motion = "alive" scene. | Static camera = 3D screenshot. |
| 8 | **Trail / afterimage** (framebuffer ping-pong or `MotionBlur` effect) | Particles feel like light, not points. | Crisp particles each frame = digital, not photographic. |
| 9 | **Particle count + scale** (~1000–2000 per stream for hero, smaller sizes) | Density sells scale. | 200 particles looks like a scatter plot. |
| 10 | **HDR environment / IBL** (`Environment` from `@react-three/drei`, even a procedural one) | Real reflections on any reflective material later. | Flat ambient = plastic look. |
| 11 | **Per-particle opacity variation + twinkle** (per-particle phase attribute) | Reads as energy/data, not static dots. | Uniform opacity = clearly a particle effect. |

---

## 3. Concrete upgrade spec for Retech's hero

### P0 — must ship (the "premium floor")

These four changes together transform the hero from "obvious particle demo" to "oh, that is nice."

#### P0.1 Add `@react-three/postprocessing` with `Bloom`
- Install: `npm i @react-three/postprocessing postprocessing`
- Wrap `<HeroSceneContents />` in `<EffectComposer>` with `<Bloom>`.
- Use **`mipmapBlur`** (default `true`), **not** `KernelSize` (deprecated).
- Set `luminanceThreshold={1}` so nothing blooms by default — only particles whose color values exceed 1.0 will glow.
- Cost: ~30KB gzipped added to the Three.js chunk. ~0.5ms/frame on desktop GPU. Mobile skipped entirely (existing guard).

#### P0.2 Push stream colors into HDR range
- Replace `color: "#208535"` with `color: new THREE.Color(2.0, 5.0, 1.5)` (or equivalent HDR values ~2–5x normal range).
- This makes the P0.1 bloom **selective for free** — no mask layer needed.
- Tone mapping must be ACES Filmic (see P0.4).

#### P0.3 Replace `pointsMaterial` with custom `ShaderMaterial` for soft circles
- Default points render as **squares**. This is the single biggest "amateur" tell in the current scene.
- Vertex shader: compute `gl_PointSize` with proper distance attenuation + per-particle size attribute.
- Fragment shader: use `gl_PointCoord` with `smoothstep(0.5, 0.35, dist)` for a soft, feathered edge — NOT a hard `discard` which aliases.
- Keep additive blending, `depthWrite: false`.
- Accept per-particle attributes: `aSize`, `aOffset`, `aColorMix` (for gradient lerp).

#### P0.4 Enable ACES tone mapping + sRGB output
- On the `<Canvas>`: add `gl={{ toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}`.
- Confirm `outputColorSpace` is `SRGBColorSpace` (default in r3f v8+).
- Important: when using `@react-three/postprocessing`, tone mapping is applied **inside** the postprocessing pipeline, not on the renderer — set `<EffectComposer>`'s ToneMappingEffect if needed (the default composer handles this).

### P1 — should ship (depth and richness)

#### P1.1 Gradient color along each curve
- Add `startColor` and `endColor` to each `Stream` definition (e.g., green→cyan, cyan→violet).
- In the particle shader, mix between them based on the particle's `t` value along the curve (already tracked as `tValues`).
- This gives each stream internal color progression — significantly more "designed."

#### P1.2 Depth fog tuning
- Current: `<fog args={["#0a0a0a", 6, 16]} />` — near plane 6 is too aggressive given camera at z=8 and most particles at z ∈ [-1, -4].
- Change to `<fog args={["#0a0a0a", 8, 18]} />` and confirm the fog color matches the actual background hex (check `var(--background)` in design-system.md).
- Particles should fade smoothly into background, not abruptly clip.

#### P1.3 Increase particle count + add size variation
- Push `particleCount` per stream:
  - Stream 1 (brand): 350 → 800
  - Stream 2 (cyan): 280 → 600
  - Stream 3 (violet): 220 → 500
  - Stream 4 (accent green): 180 → 400
- Total: 1030 → 2300 particles.
- Add per-particle size variation: in the `positions` useMemo, also create a `sizes` Float32Array with `0.5 + Math.random() * 1.5` multiplier per particle.
- Add per-particle opacity phase: `phase[i] = Math.random() * Math.PI * 2` for shimmer.

#### P1.4 Subtle camera dolly
- Current camera is static at `[1.5, 0, 8]` with cursor parallax on a parent group.
- Add slow `z` oscillation: `camera.position.z = 8 + Math.sin(t * 0.1) * 0.3`.
- Add slow `y` drift: `camera.position.y = Math.sin(t * 0.07) * 0.15`.
- Keep cursor parallax (it is good), just dolly the camera in `<Canvas>`'s default camera via a `useFrame` on a small `<CameraRig>` component.

### P2 — nice to have (polish layer)

#### P2.1 Trail effect via `MotionBlur` or ping-pong framebuffer
- Use `<MotionBlur>` from `@react-three/postprocessing` if available, OR
- Manual approach: render particles to a render target, blend previous frame at `0.85` alpha into the new frame before the bloom pass.
- Cost: +1 render target, +~1ms frame time. Skip on mobile.

#### P2.2 Background gradient mesh
- Add a large plane at `z=-8` with a custom shader material: vertical gradient from `--background` (top) to a slightly tinted variant (bottom).
- Subtle noise-driven movement on the gradient stops for organic motion.
- Replaces the flat CSS background behind the canvas.

#### P2.3 MeshLine ribbons replacing the dim spine `<line>`
- The current `<lineBasicMaterial opacity={0.18}>` is invisible at thin widths (browser line width cap).
- Use `@react-three/drei`'s `<Line>` component or `threejs-meshline` for actual thick, variable-width ribbons along each curve.
- Apply the same HDR gradient color as the particles.
- This gives each stream a "body," not just a point trail.

#### P2.4 Volumetric light cone (optional, advanced)
- A subtle additive cone behind the streams to suggest "light source" rather than free-floating particles.
- Skip if it adds complexity without clear payoff.

---

## 4. Code patterns

### 4.1 Postprocessing setup (P0.1)

```tsx
// HeroScene.tsx
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

function HeroSceneContents() {
  return (
    <>
      <CursorParallaxGroup>
        <BrandLighting />
        {STREAMS.map((stream, i) => (
          <FlowingStream key={i} stream={stream} phaseOffset={i * 0.15} />
        ))}
        <AmbientParticles count={180} />
        <fog attach="fog" args={["#0a0a0a", 8, 18]} />
      </CursorParallaxGroup>

      <EffectComposer disableNormalPass>
        <Bloom
          intensity={1.2}
          luminanceThreshold={1.0}     // HDR-only bloom
          luminanceSmoothing={0.9}
          mipmapBlur                   // modern blur path
          radius={0.7}
        />
        <Vignette eskil={false} offset={0.3} darkness={0.6} />
      </EffectComposer>
    </>
  );
}
```

### 4.2 HDR color in stream definitions (P0.2)

```tsx
const STREAMS: Stream[] = [
  {
    points: [/* ...existing control points... */],
    color: new THREE.Color(0.13, 0.52, 0.21).multiplyScalar(2.5), // 0.13*2.5 ≈ 0.32 → HDR
    // OR explicit linear sRGB components × multiplier:
    // new THREE.Color(2.0, 5.0, 1.5)  // green-leaning, very HDR
    particleCount: 800,
    flowSpeed: 0.12,
    particleSize: 0.06,
    endColor: new THREE.Color(0.02, 0.71, 0.83).multiplyScalar(2.0), // cyan
  },
  // ...
];
```

### 4.3 Soft circular particle shader (P0.3)

```glsl
// vertex shader
attribute float aSize;
attribute float aPhase;
attribute float aColorMix;

uniform float uTime;
uniform float uPixelRatio;

varying float vColorMix;
varying float vAlpha;

void main() {
  vColorMix = aColorMix;

  // Twinkle: per-particle phase + slow time
  vAlpha = 0.65 + 0.35 * sin(uTime * 1.4 + aPhase);

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  float attenuation = 1.0 / -mvPosition.z;

  gl_PointSize = aSize * attenuation * 350.0 * uPixelRatio;
  gl_Position = projectionMatrix * mvPosition;
}
```

```glsl
// fragment shader
uniform vec3 uColorStart;
uniform vec3 uColorEnd;

varying float vColorMix;
varying float vAlpha;

void main() {
  // gl_PointCoord is [0,1] across the point sprite
  vec2 uv = gl_PointCoord - 0.5;
  float dist = length(uv);

  // Soft circular falloff — smoothstep gives feathered edges (no discard!)
  float alpha = smoothstep(0.5, 0.15, dist);

  if (alpha < 0.01) discard;  // early-out only, not the edge mask

  vec3 color = mix(uColorStart, uColorEnd, vColorMix);

  gl_FragColor = vec4(color, alpha * vAlpha);
}
```

```tsx
// React setup
const particleMaterial = useMemo(() => {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.75) },
      uColorStart: { value: stream.color },
      uColorEnd: { value: stream.endColor ?? stream.color },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}, [stream]);

useFrame((_, delta) => {
  particleMaterial.uniforms.uTime.value += delta;
  // ... existing particle position update ...
});

return (
  <points ref={pointsRef} material={particleMaterial}>
    {/* ... */}
  </points>
);
```

### 4.4 Camera dolly rig (P1.4)

```tsx
function CameraRig() {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime();
    camera.position.z = 8 + Math.sin(t * 0.1) * 0.3;
    camera.position.y = Math.sin(t * 0.07) * 0.15;
    camera.lookAt(2, 0, -2);  // gentle re-aim toward stream cluster
  });
  return null;
}

// Inside <Canvas>:
<HeroSceneContents />
<CameraRig />
```

### 4.5 MeshLine ribbon (P2.3, optional)

```tsx
import { Line } from "@react-three/drei";

// Replace the current <line> + lineBasicMaterial with:
<Line
  points={tubePoints}
  lineWidth={2.5}            // in pixels, real width unlike lineBasicMaterial
  transparent
  opacity={0.25}
  vertexColors // if using per-vertex color gradient
  color={stream.color}
  // OR a gradient texture for a real color flow along the ribbon
/>
```

---

## 5. Performance budget

All measurements are estimates based on research and existing perf instrumentation. Verify with Chrome DevTools Performance panel after each P-level change.

### Per-frame cost (desktop, M-series Mac / RTX-class GPU)

| Change | CPU cost | GPU cost | Bundle |
|--------|----------|----------|--------|
| Baseline (current) | ~2.5ms | ~1.2ms | 868KB (existing Three chunk) |
| + Bloom (P0.1) | +0.1ms | +0.4ms | +35KB |
| + Custom shader (P0.3) | -0.3ms (faster than pointsMaterial) | +0.1ms | +2KB inline |
| + Gradient color (P1.1) | +0ms | +0.05ms | +0.5KB |
| + Particle count ×2.2 (P1.3) | +1.5ms | +0.5ms | 0 |
| + Camera dolly (P1.4) | +0.05ms | +0ms | +0.2KB |
| + Trail / MotionBlur (P2.1) | +0.2ms | +1.0ms | +20KB |
| + MeshLine ribbons (P2.3) | +0.3ms | +0.3ms | +15KB |
| **All P0+P1** | **~3.8ms** | **~2.3ms** | **~905KB** |
| **All P0+P1+P2** | **~4.5ms** | **~3.8ms** | **~940KB** |

Target: **<16ms frame budget** (60 FPS). All P0+P1 leaves ~12ms headroom on desktop — comfortable.

### Mobile fallback strategy (already in place, do not regress)

The existing `/src/components/three/Hero3DBackground.tsx` already:
1. Detects `(min-width: 768px) and (pointer: fine)` and skips WebGL entirely on mobile/touch.
2. Defers Three.js mount until `requestIdleCallback` fires.
3. Respects `prefers-reduced-motion` and renders nothing.

**Do not change these guards.** Every P0/P1/P2 addition is desktop-only by inheritance.

Additional mobile-specific recommendations (when mobile WebGL is added later):
- Render EffectComposer at **half resolution** (`<EffectComposer multisampling={0}>`).
- Drop particle count to 30% of desktop (e.g., 250/stream).
- Disable bloom entirely; use HDR colors + tone mapping only.
- Use `dpr={[1, 1]}` instead of `[1, 1.75]`.

### Bundle size

- Current Three.js chunk: 868KB uncompressed, ~210KB gzipped.
- After all upgrades: ~940KB uncompressed, ~235KB gzipped.
- Acceptable given the chunk is **deferred past LCP** by the existing `requestIdleCallback` gate in `Hero3DBackground.tsx`. Confirm the deferred-load behavior still works after upgrades via Lighthouse.

---

## 6. Implementation order (suggested)

1. **P0.1** Bloom + `<EffectComposer>` — biggest visual jump per line of code.
2. **P0.2** HDR colors — needed for P0.1 to actually bloom selectively.
3. **P0.3** Custom particle shader — kills the "square particles" tell.
4. **P0.4** ACES tone mapping — make sure colors read correctly after HDR + bloom.
5. **P1.1** Gradient colors along curve — art-directed payoff.
6. **P1.3** More particles + size variation — density sells scale.
7. **P1.2** Fog tuning — quick fix once new colors are in.
8. **P1.4** Camera dolly — last motion polish.
9. **P2.\*** Only if P0/P1 still does not feel "Stripe-tier."

---

## 7. Sources

- [Stripe Engineering — Interactive Globe blog post](https://stripe.com/blog/globe)
- [Recreating Stripe's Hero with Spline 3D (YouTube)](https://www.youtube.com/watch?v=XV4_GNSXNIQ)
- [A flowing WebGL gradient, deconstructed — Alex Harri](https://alexharri.com/blog/webgl-gradients)
- [Stripe mesh gradient WebGL package — Medium](https://medium.com/design-bootcamp/moving-mesh-gradient-background-with-stripe-mesh-gradient-webgl-package-6dc1c69c4fa2)
- [The Complete Guide to Three.js Post-Processing in 2026](https://threejsroadmap.com/blog/the-complete-guide-to-threejs-post-processing-in-2026)
- [React Postprocessing — Bloom docs (pmnd.rs)](https://react-postprocessing.docs.pmnd.rs/effects/bloom)
- [postprocessing BloomEffect API](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/BloomEffect.js~BloomEffect.html)
- [Selective bloom via emissive intensity (Three.js Forum)](https://discourse.threejs.org/t/pmndrs-post-processing-how-to-get-selective-bloom/58452)
- [Codrops — Dreamy Particle Effect with GPGPU](https://tympanus.net/codrops/2024/12/19/crafting-a-dreamy-particle-effect-with-three-js-and-gpgpu/)
- [Codrops — Building Efficient Three.js Scenes](https://tympanus.net/codrops/2025/02/11/building-efficient-three-js-scenes-optimize-performance-while-maintaining-quality/)
- [Three.js Forum — How to get sharp edge with particles (gl_PointCoord)](https://discourse.threejs.org/t/how-to-get-sharp-edge-with-particles/66346)
- [Three.js Forum — gl_PointSize with size attenuation](https://discourse.threejs.org/t/shadermaterial-depthwrite-with-three-points-and-transparency/30509)
- [Codrops — Animated 3D Ribbons with Three.js](https://tympanus.net/codrops/2021/11/29/animated-3d-ribbons-with-three-js/)
- [Three.js Tone Mapping Overview](https://discourse.threejs.org/t/tone-mapping-overview/75204)
- [Vercel — Build an interactive WebGL experience with Next.js](https://vercel.com/blog/building-an-interactive-webgl-experience-in-next-js)
- [Digital Strategy Force — Three.js mobile performance](https://digitalstrategyforce.com/journal/how-do-you-optimize-threejs-performance-for-mobile-devices/)
- [100 Three.js Performance Tips (2026)](https://www.utsubo.com/blog/threejs-best-practices-100-tips)
