"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function NoiseOverlay() {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <>
      <svg className="hidden" aria-hidden="true">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
      </svg>
      <div
        className="pointer-events-none fixed inset-0 z-[45] opacity-[0.015] mix-blend-multiply"
        style={{ filter: "url(#noise)" }}
        aria-hidden="true"
      />
    </>
  );
}
