"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface MagneticProps {
  children: ReactNode;
  /** How strongly the element follows the cursor, in px. Default 8. */
  strength?: number;
  /** Spring stiffness. Default 200. */
  stiffness?: number;
  /** Spring damping. Default 15. */
  damping?: number;
  className?: string;
}

/**
 * Magnetic hover wrapper — child drifts toward the cursor while hovered,
 * springs back on leave. Used on primary CTAs for a premium feel.
 *
 * Skips entirely when prefers-reduced-motion is set, or on touch devices
 * (no fine pointer).
 */
export function Magnetic({
  children,
  strength = 8,
  stiffness = 200,
  damping = 15,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness, damping, mass: 0.1 });
  const sy = useSpring(y, { stiffness, damping, mass: 0.1 });

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!ref.current || prefersReducedMotion) return;
    // Skip on touch / coarse pointers — magnetic only feels right with a mouse.
    if (e.pointerType === "touch") return;

    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    // Normalise by element size so strength feels consistent across button sizes.
    const nx = relX / (rect.width / 2);
    const ny = relY / (rect.height / 2);
    x.set(nx * strength);
    y.set(ny * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onPointerDown={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
