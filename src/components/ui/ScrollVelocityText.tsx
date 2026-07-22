"use client";

import { motion } from "framer-motion";

interface ScrollVelocityTextProps {
  /** Text items to display */
  items?: string[];
  /** Additional CSS classes */
  className?: string;
  /** Direction: "forward" scrolls left-to-right content, "reverse" the opposite */
  direction?: "forward" | "reverse";
  /** Visual style variant */
  variant?: "gradient" | "outline" | "solid";
  /** Speed multiplier — higher is faster */
  speed?: number;
}

/**
 * Premium infinite marquee for service/technology tags.
 *
 * Design notes:
 *  - Two rows can be stacked (one forward, one reverse) for a cinematic
 *    "moving text" effect
 *  - `variant="outline"` gives a transparent / stroked look for visual
 *    contrast when stacking two rows
 *  - All variants use the brand gradient + drop-shadow for a glassy feel
 *  - Respects prefers-reduced-motion via the global MotionConfig wrapper
 */
export function ScrollVelocityText({
  items = [
    "CMS Development",
    "CRM Solutions",
    "ERP Systems",
    "AI Integration",
    "Web Applications",
    "Mobile Development",
  ],
  className,
  direction = "forward",
  variant = "gradient",
  speed = 1,
}: ScrollVelocityTextProps) {
  // Duplicate the items enough times to cover the viewport at any width.
  // 6 copies is enough for 4K screens.
  const loop = [...items, ...items, ...items, ...items, ...items, ...items];

  const variantClass =
    variant === "outline"
      ? "text-transparent [-webkit-text-stroke:1.5px_rgba(32,133,53,0.35)]"
      : variant === "solid"
        ? "text-foreground"
        : "gradient-text-brand";

  // Animation distance = half the loop width (since we duplicated twice).
  // Direction determines whether it moves left or right.
  const animateX =
    direction === "forward"
      ? ["0%", "-50%"]
      : ["-50%", "0%"];

  return (
    <div
      className={`relative overflow-hidden py-6 md:py-10 ${className ?? ""}`}
      aria-hidden="true"
    >
      {/* Soft background tint with a subtle gradient line at top + bottom */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand/[0.015] via-accent-cyan/[0.02] to-accent-violet/[0.015]" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-foreground/[0.05] to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-foreground/[0.05] to-transparent" />

      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-20 md:w-40 bg-gradient-to-r from-background to-transparent" />
      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-20 md:w-40 bg-gradient-to-l from-background to-transparent" />

      <motion.div
        className="flex whitespace-nowrap will-change-transform"
        animate={{ x: animateX }}
        transition={{
          duration: 40 / speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight px-6 md:px-10 shrink-0 flex items-center gap-6 md:gap-10 ${variantClass}`}
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
          >
            {item}
            <span
              className="inline-block w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-gradient-to-br from-brand to-accent-cyan opacity-50 shrink-0"
              aria-hidden="true"
            />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
