"use client";

import { motion, useScroll, useTransform, useReducedMotion, useMotionTemplate } from "framer-motion";

/**
 * Scroll-linked gradient hue shift — ambient background layer.
 *
 * Mounts a fixed full-viewport gradient behind all content. As the user
 * scrolls, the hue drifts subtly (0→25deg) creating a "living" feel
 * without distracting from content.
 *
 * Performance: filter:hue-rotate() on a fixed -z-10 layer is GPU-composited.
 * No layout thrash, no repaints on content layers.
 *
 * Reduced motion: renders a static gradient with no hue animation.
 */
export function ScrollGradientShift() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion() ?? false;

  const hue = useTransform(scrollYProgress, [0, 1], [0, 25]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [0, 0.5, 0.5, 0]
  );

  // Compose the hue-rotate filter string from the motion value
  const filter = useMotionTemplate`hue-rotate(${hue}deg)`;

  if (prefersReducedMotion) {
    return (
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(32,133,53,0.04), transparent 50%), radial-gradient(circle at 80% 80%, rgba(139,92,246,0.04), transparent 50%)",
        }}
      />
    );
  }

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, rgba(32,133,53,0.06), transparent 50%), radial-gradient(circle at 80% 80%, rgba(139,92,246,0.06), transparent 50%), radial-gradient(circle at 50% 50%, rgba(6,182,212,0.03), transparent 60%)",
        filter,
        opacity,
      }}
    />
  );
}
