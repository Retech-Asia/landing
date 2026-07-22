"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// WebGL scene — client-only (Three.js does not SSR).
const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  {
    ssr: false,
    loading: () => null, // Hero already has CSS gradient fallback behind this layer
  },
);

/**
 * Full-bleed WebGL background for the hero section.
 *
 * Behavior:
 * - Lazy-loaded (only mounts when hero is in viewport via dynamic import)
 * - SSR-safe (no WebGL during server render)
 * - Respects prefers-reduced-motion (renders nothing; CSS gradients remain)
 * - Skipped on mobile/touch + small screens (battery + perf + visual clutter)
 * - Sits at z-0 behind all hero content (headline, CTAs, stats)
 */
export function Hero3DBackground() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only mount the WebGL scene on screens ≥ 768px with a fine pointer
    // (i.e. real desktops / laptops with a mouse). Mobile GPUs and touch
    // interfaces don't benefit from the orbs and they hurt battery life.
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (prefersReducedMotion || !isDesktop) return null;

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    >
      <HeroScene />
    </div>
  );
}
