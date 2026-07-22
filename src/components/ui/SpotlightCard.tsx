"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Spotlight radius in px. Default 280. */
  radius?: number;
  /** Spotlight color (any CSS color). Default uses brand green at low alpha. */
  color?: string;
  style?: CSSProperties;
}

/**
 * Card with a radial-gradient spotlight that follows the cursor.
 * Uses CSS custom properties (--mx, --my) updated via pointer events —
 * no React re-renders, no animation libraries. GPU-cheap.
 *
 * Skips on reduced-motion and touch.
 */
export function SpotlightCard({
  children,
  className,
  radius = 280,
  color = "rgba(32, 133, 53, 0.10)",
  style,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!ref.current || prefersReducedMotion) return;
    if (e.pointerType === "touch") return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  function handleLeave() {
    if (!ref.current) return;
    // Hide spotlight by moving it off-card
    ref.current.style.setProperty("--mx", "-9999px");
    ref.current.style.setProperty("--my", "-9999px");
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={className}
      style={
        {
          "--mx": "-9999px",
          "--my": "-9999px",
          "--spotlight-radius": `${radius}px`,
          "--spotlight-color": color,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
