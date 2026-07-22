"use client";

interface CountUpProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * Renders a stat value directly. No count-up animation.
 *
 * Previous versions used IntersectionObserver + rAF/framer-motion to animate
 * from 0 to target. This caused repeated bugs (0+ flash, -1 glitch, hydration
 * mismatches) across 4 rounds of fixes. The animation is not worth the
 * complexity — the numbers are factual and don't need to "perform".
 *
 * Premium sites (Vercel, Stripe, Linear) render stats statically. We follow.
 */
export function CountUp({
  target,
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  return (
    <span className={className}>
      {prefix}
      {target}
      {suffix}
    </span>
  );
}
