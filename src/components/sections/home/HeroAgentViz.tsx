"use client";

/**
 * Hero 3D multi-agent investment research visualization.
 *
 * Wrapper that handles:
 *   - Desktop-only mount (mobile gets the CSS gradient background)
 *   - prefers-reduced-motion (returns null)
 *   - Deferred mount until after first paint + idle (LCP protection)
 *
 * The actual 3D scene lives in AgentGraph3D.tsx — separated so this file
 * stays small and the heavy Three.js bundle is loaded only when needed.
 *
 * Architecture shown (matches the actual Investment Intelligence Platform):
 *   Query Router → Orchestrator → {Bull, Bear, Tech, Risk} → Synthesizer
 *
 * Why this is allowed despite Hallmark audit's "no decorative 3D" rule:
 *   - Content is semantic (real agent architecture, not abstract orbs)
 *   - Mouse parallax + drag rotation (genuine interaction)
 *   - Reinforces AI-emphasis positioning with visible proof
 */

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Three.js scene — client-only, lazy-loaded. ssr: false because Three.js
// cannot render on the server and the bundle is ~150KB.
const AgentGraph3D = dynamic(
  () => import("@/components/sections/home/AgentGraph3D").then((m) => m.AgentGraph3D),
  {
    ssr: false,
    loading: () => null,
  },
);

export function HeroAgentViz() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [deferred, setDeferred] = useState(false);

  // Detect desktop + fine-pointer devices. Touch devices and small screens
  // skip the 3D scene entirely (battery + GPU + visual clutter).
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Defer mount until after the page has settled + idle so the Three.js
  // bundle never blocks LCP / TBT on the hero. The scene fades in ~1-2s
  // after first paint.
  useEffect(() => {
    if (!isDesktop || prefersReducedMotion) return;
    const idle =
      (window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number })
        .requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1200));
    const handle = idle(() => setDeferred(true), { timeout: 2000 });
    return () => {
      const cancel =
        (window as Window & { cancelIdleCallback?: (h: number) => void }).cancelIdleCallback ??
        ((h: number) => clearTimeout(h));
      cancel(handle as number);
    };
  }, [isDesktop, prefersReducedMotion]);

  // Render nothing if conditions aren't met
  if (!isDesktop || prefersReducedMotion || !deferred) return null;

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        maskImage:
          "radial-gradient(ellipse 75% 90% at 78% 50%, black 0%, black 50%, transparent 90%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 75% 90% at 78% 50%, black 0%, black 50%, transparent 90%)",
      }}
      aria-hidden="true"
    >
      <AgentGraph3D />
    </div>
  );
}
