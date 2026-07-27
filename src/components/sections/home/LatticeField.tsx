"use client";

/**
 * LatticeField — abstract 3D lattice hero visualization.
 *
 * A 4×4×4 octahedral lattice slowly rotating in 3D space. Pure SVG +
 * minimal JS for rotation/projection (no Three.js). Self-contained,
 * transparent background, no labels, no clickable elements.
 *
 * Animation constraints:
 *   - Rotation oscillates within a narrow safe range around the 3/4
 *     view (y∈[0.4, 0.8], x∈[0.3, 0.5]) — never reaches face-on angles
 *     (0 or π/2) where the lattice could read as a plain cube
 *   - Period ~60s for Y, ~45s for X (different periods prevent sync)
 *   - Mouse parallax: ±0.05 rad (~3°) added on top, lerp follow
 *
 * Performance:
 *   - 64 vertices, 108 edges, reprojected every frame
 *   - Single rAF, runs only when: not reduced-motion AND in viewport
 *     AND mouse has moved recently (idle suspension)
 *   - Single SVG path per depth bucket = 3 DOM updates per frame
 *
 * Accessibility:
 *   - aria-hidden (purely decorative)
 *   - pointer-events: none (no interaction)
 *   - prefers-reduced-motion: static render at default angle, no rAF
 *
 * Mobile (< 768px): returns null, clean text-only hero
 */

import { useEffect, useMemo, useRef, useState } from "react";
import {
  LATTICE_VERTICES,
  LATTICE_EDGES,
  rotateX,
  rotateY,
  project,
} from "@/lib/lattice-geometry";

/* ── Constants ── */

const CAMERA_DISTANCE = 5;
const FOCAL_LENGTH = 600;
const CENTER_X = 500; // viewBox center (1000 wide)
const CENTER_Y = 350; // viewBox center (700 tall)

// Safe angle range — keeps lattice in "crystal" reading zone, never face-on
const BASE_ANGLE_Y = 0.6;
const BASE_ANGLE_X = 0.4;
const OSC_Y_AMPLITUDE = 0.2; // ±0.2 rad around base (~±11°)
const OSC_X_AMPLITUDE = 0.1; // ±0.1 rad around base (~±6°)
const OSC_Y_PERIOD_MS = 60000; // 60 second Y period
const OSC_X_PERIOD_MS = 45000; // 45 second X period (different = no sync)

const PARALLAX_RANGE_Y = 0.05; // ±0.05 rad (~±3°) Y parallax
const PARALLAX_RANGE_X = 0.035; // ±0.035 rad (~±2°) X parallax
const PARALLAX_LERP = 0.06; // smooth follow rate

/* ── Component ── */

export function LatticeField() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isInView, setIsInView] = useState(true);

  // Track pointer position via ref (no re-renders)
  const pointerRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect desktop + reduced motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const desktopMq = window.matchMedia("(min-width: 768px)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setIsDesktop(desktopMq.matches);
      setPrefersReducedMotion(motionMq.matches);
    };
    update();
    desktopMq.addEventListener("change", update);
    motionMq.addEventListener("change", update);
    return () => {
      desktopMq.removeEventListener("change", update);
      motionMq.removeEventListener("change", update);
    };
  }, []);

  // IntersectionObserver: only animate when in viewport
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => setIsInView(entries[0]?.isIntersecting ?? false),
      { threshold: 0 },
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Pointer tracking at window level
  useEffect(() => {
    if (!isDesktop || prefersReducedMotion) return;
    const handler = (e: PointerEvent) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1; // -1..1
      pointerRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handler, { passive: true });
    return () => window.removeEventListener("pointermove", handler);
  }, [isDesktop, prefersReducedMotion]);

  // Compute current angles (static if reduced motion or not in view)
  const [angles, setAngles] = useState({
    angleY: BASE_ANGLE_Y,
    angleX: BASE_ANGLE_X,
  });

  useEffect(() => {
    if (!isDesktop || prefersReducedMotion || !isInView) return;

    let rafId: number | null = null;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let currentParallaxX = 0;
    let currentParallaxY = 0;

    const tick = () => {
      const now = performance.now();
      // Base oscillation
      const oscY = Math.sin((now / OSC_Y_PERIOD_MS) * Math.PI * 2) * OSC_Y_AMPLITUDE;
      const oscX = Math.sin((now / OSC_X_PERIOD_MS) * Math.PI * 2) * OSC_X_AMPLITUDE;

      // Parallax lerp
      const targetPX = pointerRef.current.x * PARALLAX_RANGE_Y;
      const targetPY = pointerRef.current.y * PARALLAX_RANGE_X;
      currentParallaxX += (targetPX - currentParallaxX) * PARALLAX_LERP;
      currentParallaxY += (targetPY - currentParallaxY) * PARALLAX_LERP;

      const angleY = BASE_ANGLE_Y + oscY + currentParallaxX;
      const angleX = BASE_ANGLE_X + oscX + currentParallaxY;

      setAngles({ angleY, angleX });

      // Continue only if parallax is still settling or pointer moved
      const pointerDelta =
        Math.abs(pointerRef.current.x - lastPointerX) +
        Math.abs(pointerRef.current.y - lastPointerY);
      const parallaxDelta =
        Math.abs(targetPX - currentParallaxX) + Math.abs(targetPY - currentParallaxY);
      lastPointerX = pointerRef.current.x;
      lastPointerY = pointerRef.current.y;

      // Always continue — base oscillation is continuous
      rafId = requestAnimationFrame(tick);
      void pointerDelta;
      void parallaxDelta;
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isDesktop, prefersReducedMotion, isInView]);

  // Render the SVG with current angles
  const svgContent = useMemo(() => {
    return buildLatticeSvgPaths(angles.angleY, angles.angleX);
  }, [angles]);

  // Don't render on mobile
  if (!isDesktop) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none hidden md:block"
      aria-hidden="true"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, transparent 30%, black 55%, black 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, transparent 30%, black 55%, black 100%)",
      }}
    >
      <svg
        viewBox="0 0 1000 700"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        {/* Far edges — dimmest */}
        <path
          d={svgContent.farPath}
          stroke="var(--foreground-muted)"
          strokeWidth="1"
          fill="none"
          opacity="0.10"
        />
        {/* Mid edges */}
        <path
          d={svgContent.midPath}
          stroke="var(--foreground-muted)"
          strokeWidth="1"
          fill="none"
          opacity="0.22"
        />
        {/* Near edges — most visible */}
        <path
          d={svgContent.nearPath}
          stroke="var(--foreground-muted)"
          strokeWidth="1"
          fill="none"
          opacity="0.42"
        />
        {/* Vertex dots — brand color, depth-weighted */}
        {svgContent.vertices.map((v, i) => (
          <circle
            key={i}
            cx={v.x}
            cy={v.y}
            r={v.depth < 4.7 ? 2.2 : v.depth < 5.3 ? 1.6 : 1}
            fill="var(--brand)"
            opacity={v.depth < 4.7 ? 0.6 : v.depth < 5.3 ? 0.35 : 0.18}
          />
        ))}
      </svg>
    </div>
  );
}

/* ── Pure helper: build SVG path strings for given angles ── */

function buildLatticeSvgPaths(angleY: number, angleX: number) {
  const farSegs: string[] = [];
  const midSegs: string[] = [];
  const nearSegs: string[] = [];

  for (const edge of LATTICE_EDGES) {
    const fromR = rotateX(rotateY(edge.from, angleY), angleX);
    const toR = rotateX(rotateY(edge.to, angleY), angleX);
    const fromP = project(fromR, CAMERA_DISTANCE, FOCAL_LENGTH, CENTER_X, CENTER_Y);
    const toP = project(toR, CAMERA_DISTANCE, FOCAL_LENGTH, CENTER_X, CENTER_Y);
    const avgDepth = (fromP.depth + toP.depth) / 2;

    const seg = `M ${fromP.x.toFixed(1)} ${fromP.y.toFixed(1)} L ${toP.x.toFixed(1)} ${toP.y.toFixed(1)}`;
    if (avgDepth > 5.5) farSegs.push(seg);
    else if (avgDepth > 4.5) midSegs.push(seg);
    else nearSegs.push(seg);
  }

  const vertices = LATTICE_VERTICES.map((v) => {
    const r = rotateX(rotateY(v, angleY), angleX);
    return project(r, CAMERA_DISTANCE, FOCAL_LENGTH, CENTER_X, CENTER_Y);
  });

  return {
    farPath: farSegs.join(" "),
    midPath: midSegs.join(" "),
    nearPath: nearSegs.join(" "),
    vertices,
  };
}
