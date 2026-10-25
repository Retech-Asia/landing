"use client";

import type { ButtonHTMLAttributes, ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Relay Field primitives (Wave 2D handoff §2D): friendly, highly usable,
 * mobile-native. Warm canvas, coral accent, teal secondary highlight.
 * All colors flow through the scoped --rf-* variables set by the demo roots.
 */

export const rfVars = {
  "--rf-canvas": "#F8F7F2",
  "--rf-surface": "#FFFFFF",
  "--rf-ink": "#25323A",
  "--rf-secondary": "#5E6E76",
  "--rf-accent": "#D5654F",
  "--rf-accent-tint": "#FAEAE5",
  "--rf-teal": "#237E79",
  "--rf-teal-tint": "#E3F0EE",
  "--rf-border": "#E7E3D8",
  "--rf-ok-bg": "#E3F0EE",
  "--rf-ok-text": "#1D615C",
} as React.CSSProperties;

/** Product mark: two offset rounded rectangles joined by a short connector. */
export function RelayMark({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden="true"
    >
      <rect x="2.5" y="6" width="10" height="12" rx="2.5" />
      <rect x="13.5" y="3" width="8" height="9" rx="2.25" />
      <path d="M12.5 12h1" strokeLinecap="round" />
    </svg>
  );
}

export function RfChip({
  tone = "neutral",
  children,
  className,
}: {
  tone?: "neutral" | "accent" | "teal" | "muted";
  children: ReactNode;
  className?: string;
}) {
  const tones = {
    neutral: "bg-[var(--rf-accent-tint)] text-[var(--rf-accent)]",
    teal: "bg-[var(--rf-teal-tint)] text-[var(--rf-teal)]",
    muted: "bg-[var(--rf-canvas)] text-[var(--rf-secondary)]",
    accent: "bg-[var(--rf-accent)] text-white",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest whitespace-nowrap",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function RfPanel({ children, className, ...rest }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...rest}
      className={cn("rounded-2xl border border-[var(--rf-border)] bg-[var(--rf-surface)]", className)}
    >
      {children}
    </div>
  );
}

export function RfLabel({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <p id={id} className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--rf-secondary)]">
      {children}
    </p>
  );
}

type RfButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

/** Large tap target per the handoff: generous touch areas, rounded-full. */
export function RfButton({ variant = "primary", className, ...props }: RfButtonProps) {
  const variants = {
    primary: "bg-[var(--rf-accent)] text-white hover:brightness-95 disabled:opacity-50",
    secondary:
      "border border-[var(--rf-border)] bg-[var(--rf-surface)] text-[var(--rf-ink)] hover:border-[var(--rf-accent)] hover:text-[var(--rf-accent)] disabled:opacity-50",
    ghost: "text-[var(--rf-teal)] hover:bg-[var(--rf-teal-tint)] disabled:opacity-50",
  } as const;
  return (
    <button
      {...props}
      className={cn(
        "inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full px-4 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rf-accent)] disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
    />
  );
}
