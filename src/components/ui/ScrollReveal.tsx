"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { type ReactNode, useRef } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  /** Parallax speed factor. Higher = more offset. Default 0.1 */
  speed?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  speed = 0.1,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 80, speed * -80]);

  // Subtle opacity ramp: starts at 0.6 when entering viewport, reaches 1 at
  // the midpoint, then fades back to 0.6 as it exits. Keeps the parallax
  // effect perceptible without being distracting.
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, opacity }}>{children}</motion.div>
    </div>
  );
}
