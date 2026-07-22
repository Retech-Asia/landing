"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  duration = 2000,
  className,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();
  const rafIdRef = useRef(0);

  useEffect(() => {
    if (!isInView) return;

    // Reduced motion: jump straight to target, no rAF animation.
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    // Small delay before starting the count for a staggered, premium feel
    const delayTimer = setTimeout(() => {
      const startTime = performance.now();

      function step(currentTime: number) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic for smooth deceleration
        const eased = 1 - Math.pow(1 - progress, 3);
        // Land exactly on target at the final frame — without this, an integer
        // floor at eased*target leaves the counter one short of the real value.
        setCount(progress >= 1 ? target : Math.floor(eased * target));

        if (progress < 1) {
          rafIdRef.current = requestAnimationFrame(step);
        }
      }

      rafIdRef.current = requestAnimationFrame(step);
    }, 150);

    return () => {
      clearTimeout(delayTimer);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = 0;
      }
    };
  }, [isInView, target, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
