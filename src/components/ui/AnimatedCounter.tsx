"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * Animated count-up — used in WhyRetech + case studies.
 *
 * Renders `target` on first paint (no "0+" flash). When scrolled into view,
 * animates from 30% of target up to target. Never shows 0.
 */
export function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  duration = 2000,
  className,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(target);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    if (!isInView) return;

    // Reduced motion: jump straight to target, no animation.
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    // Start from 30% of target — never shows 0.
    const startValue = Math.max(1, Math.floor(target * 0.3));

    controlsRef.current = animate(startValue, target, {
      duration: duration / 1000,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCount(Math.floor(v)),
      onComplete: () => setCount(target),
    });

    return () => controlsRef.current?.stop();
  }, [isInView, target, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
