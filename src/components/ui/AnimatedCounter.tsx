"use client";

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * Renders a stat value directly. No animation.
 *
 * See CountUp.tsx for rationale — count-up animations caused repeated bugs.
 * This component is kept for API compatibility with existing call sites
 * (WhyRetech, case studies) but now just renders the number.
 */
export function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  className,
}: AnimatedCounterProps) {
  return (
    <span className={className}>
      {prefix}
      {target}
      {suffix}
    </span>
  );
}
