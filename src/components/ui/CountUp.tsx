"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface CountUpProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * Animated count-up for stats.
 *
 * Key design choice: NEVER shows 0. The element renders `target` immediately
 * on first paint (SSR + hydration). When the user scrolls it into view, the
 * count-up animation runs FROM `Math.max(1, target * 0.3)` TO `target` —
 * starting at 30% means the user always sees a meaningful number, never a
 * brief "0+" flash before the animation kicks in.
 *
 * The animation uses framer-motion's `animate()` (rAF under the hood, GPU-
 * friendly, automatically respects prefers-reduced-motion via the global
 * MotionConfig wrapper).
 */
export function CountUp({
  target,
  prefix = "",
  suffix = "",
  duration = 2000,
  className,
}: CountUpProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [displayValue, setDisplayValue] = useState(target);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setHasAnimated(true);
        observer.disconnect();

        // Reduced motion: jump straight to target, no animation.
        if (prefersReducedMotion) {
          setDisplayValue(target);
          return;
        }

        // Start from 30% of target so the user sees a meaningful number
        // immediately. Avoids the "0+" flash that previous versions had
        // when setDisplayValue(0) ran before the first rAF callback.
        const startValue = Math.max(1, Math.floor(target * 0.3));

        controlsRef.current = animate(startValue, target, {
          duration: duration / 1000,
          ease: [0.16, 1, 0.3, 1], // ease-out cubic
          onUpdate: (v) => {
            setDisplayValue(progress(v, target) >= 1 ? target : Math.floor(v));
          },
          onComplete: () => {
            // Guarantee we land exactly on target (avoid off-by-one from
            // Math.floor at the final frame).
            setDisplayValue(target);
          },
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      controlsRef.current?.stop();
    };
  }, [target, duration, hasAnimated, prefersReducedMotion]);

  return (
    <span ref={elementRef} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

/** Helper: returns 1 if value reached target, 0 otherwise. */
function progress(value: number, target: number): number {
  return value >= target ? 1 : 0;
}
