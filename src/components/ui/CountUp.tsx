"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface CountUpProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({
  target,
  prefix = "",
  suffix = "",
  duration = 2000,
  className,
}: CountUpProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  // Render the target value immediately so the user never sees a stuck "0+"
  // if they screenshot or never scroll past the stats. The count-up animation
  // replays from 0 only when the element first enters the viewport.
  const [displayValue, setDisplayValue] = useState(target);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const rafIdRef = useRef(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setHasAnimated(true);
        observer.disconnect();

        if (prefersReducedMotion) {
          setDisplayValue(target);
          return;
        }

        // Reset to 0 and animate up to target — the user is now watching.
        setDisplayValue(0);
        const startTime = performance.now();

        function step(currentTime: number) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Ease-out cubic: 1 - (1 - t)^3
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = progress >= 1 ? target : Math.floor(eased * target);

          setDisplayValue(current);

          if (progress < 1) {
            rafIdRef.current = requestAnimationFrame(step);
          }
        }

        rafIdRef.current = requestAnimationFrame(step);
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = 0;
      }
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
