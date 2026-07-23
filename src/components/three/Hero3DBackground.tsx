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
 * - **Deferred until after first paint + idle** so the 868KB Three.js chunk
 *   never blocks LCP/TBT. The orbs appear ~1s after the page settles,
 *   giving the hero text time to paint first.
 * - SSR-safe (no WebGL during server render)
 * - Respects prefers-reduced-motion (renders nothing; CSS gradients remain)
 * - Skipped on mobile/touch + small screens (battery + perf + visual clutter)
 * - Sits at z-0 behind all hero content (headline, CTAs, stats)
 */
export function Hero3DBackground() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [deferred, setDeferred] = useState(false);

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

  useEffect(() => {
    if (!isDesktop) return;
    // Defer Three.js mount until the page is idle. This is the single
    // biggest perf win on the site — the 868KB chunk was previously
    // competing with LCP for main-thread time on desktop.
    const ric =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback
        : (cb: () => void) => window.setTimeout(cb, 1200);
    const handle = ric(() => setDeferred(true));
    return () => {
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(handle as number);
      } else {
        window.clearTimeout(handle as number);
      }
    };
  }, [isDesktop]);

  if (prefersReducedMotion || !isDesktop || !deferred) return null;

  return (
    // pointer-events-none on the wrapper so the canvas never traps wheel/tap
    // events. Cursor parallax is tracked via a window-level pointermove
    // listener inside HeroScene (see CursorParallaxGroup), not via R3F's
    // onPointerMove (which would require pointer-events here).
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    >
      <HeroScene />
    </div>
  );
}

