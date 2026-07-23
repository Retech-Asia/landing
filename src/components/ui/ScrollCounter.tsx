"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/**
 * Scroll-scrubbed number counter.
 *
 * Numbers count up as the user scrolls through the section (not on-view
 * timer). Scroll back up → counts back down. Apple product page style.
 *
 * Performance: useMotionValueEvent fires on scroll frames, setState with
 * a number is a single text-node update. No rAF loop needed.
 *
 * Reduced motion: shows final values immediately.
 */
export function ScrollCounter({
  stats,
  className,
}: {
  stats: readonly { value: number; suffix?: string; label: string }[];
  className?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  return (
    <section ref={sectionRef} className={className}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-0 relative">
        {stats.map((stat, index) => (
          <ScrollNumber
            key={stat.label}
            scrollYProgress={scrollYProgress}
            target={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            startOffset={index * 0.05}
            index={index}
            instant={prefersReducedMotion}
          />
        ))}
      </div>
    </section>
  );
}

function ScrollNumber({
  scrollYProgress,
  target,
  suffix,
  label,
  startOffset,
  index,
  instant,
}: {
  scrollYProgress: MotionValue<number>;
  target: number;
  suffix?: string;
  label: string;
  startOffset: number;
  index: number;
  instant: boolean;
}) {
  const count = useTransform(
    scrollYProgress,
    [startOffset, startOffset + 0.3],
    [0, target]
  );

  const [display, setDisplay] = useState(instant ? target : 0);

  useMotionValueEvent(count, "change", (latest) => {
    setDisplay(Math.round(latest));
  });

  return (
    <div className="flex flex-col items-center text-center relative">
      {index > 0 && (
        <span
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-12 w-px bg-gradient-to-b from-transparent via-foreground-muted/15 to-transparent self-center"
          aria-hidden="true"
        />
      )}
      <div className="text-4xl md:text-5xl font-bold gradient-text-brand leading-none tracking-tight">
        {display}
        {suffix}
      </div>
      <p className="text-xs sm:text-sm text-foreground-muted mt-2 tracking-wide">
        {label}
      </p>
    </div>
  );
}
