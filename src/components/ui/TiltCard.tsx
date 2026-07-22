"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees. Default 8. */
  maxRotate?: number;
  style?: CSSProperties;
}

/**
 * 3D tilt-on-hover card. Tracks the cursor and rotates the card in 3D space
 * using rotateX/rotateY. Uses framer-motion springs for smooth return-to-zero.
 *
 * Skips entirely on reduced-motion or touch pointers.
 */
export function TiltCard({
  children,
  className,
  maxRotate = 8,
  style,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const px = useMotionValue(0.5); // 0..1 across width
  const py = useMotionValue(0.5); // 0..1 across height
  const sx = useSpring(px, { stiffness: 200, damping: 20 });
  const sy = useSpring(py, { stiffness: 200, damping: 20 });

  const rotateY = useTransform(sx, [0, 1], [-maxRotate, maxRotate]);
  const rotateX = useTransform(sy, [0, 1], [maxRotate, -maxRotate]);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!ref.current || prefersReducedMotion) return;
    if (e.pointerType === "touch") return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 800,
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
