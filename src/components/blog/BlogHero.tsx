"use client";

import { motion } from "framer-motion";
import { TrendingUp, BookOpen, Cpu, type LucideIcon } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Category = "Industry Insights" | "Guides" | "Technology";

interface CategoryTheme {
  icon: LucideIcon;
  label: string;
  /** Primary gradient stops (left → right) */
  gradient: string;
  /** Background pattern tint */
  glow: string;
  /** Accent icon colour */
  iconColor: string;
  /** Decorative shape fill */
  shapeFill: string;
}

const CATEGORY_THEMES: Record<Category, CategoryTheme> = {
  "Industry Insights": {
    icon: TrendingUp,
    label: "Industry Insights",
    gradient: "from-brand/30 via-brand/10 to-transparent",
    glow: "rgba(32, 133, 53, 0.18)",
    iconColor: "text-brand",
    shapeFill: "rgba(32, 133, 53, 0.12)",
  },
  Guides: {
    icon: BookOpen,
    label: "Guide",
    gradient: "from-accent-cyan/30 via-accent-cyan/10 to-transparent",
    glow: "rgba(6, 182, 212, 0.18)",
    iconColor: "text-accent-cyan",
    shapeFill: "rgba(6, 182, 212, 0.12)",
  },
  Technology: {
    icon: Cpu,
    label: "Technology",
    gradient: "from-accent-violet/30 via-accent-violet/10 to-transparent",
    glow: "rgba(139, 92, 246, 0.18)",
    iconColor: "text-accent-violet",
    shapeFill: "rgba(139, 92, 246, 0.12)",
  },
};

interface BlogHeroProps {
  category: string;
  readTime?: string;
}

/**
 * Category-themed hero banner for blog post detail pages.
 *
 * Visual-only (no title — the H1 above already covers it). Layered:
 *   1. Brand gradient base
 *   2. Grid pattern overlay
 *   3. Two radial glow spots (category-tinted)
 *   4. Large ghosted category icon (rotated, low opacity)
 *   5. Floating geometric shapes
 *   6. Category badge + read-time chip
 *
 * Respects prefers-reduced-motion (static layout, no animation).
 */
export function BlogHero({ category, readTime }: BlogHeroProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const theme = CATEGORY_THEMES[category as Category] ?? CATEGORY_THEMES.Technology;
  const Icon = theme.icon;

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-full aspect-[16/7] md:aspect-[16/6] lg:aspect-[2.4/1] rounded-2xl overflow-hidden border border-black/[0.06] mb-10 md:mb-14"
      aria-hidden="true"
    >
      {/* Layer 1: Base gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`} />

      {/* Layer 2: Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Layer 3: Radial glow spots */}
      <div
        className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full blur-3xl"
        style={{ background: theme.glow }}
      />
      <div
        className="absolute -bottom-32 -left-20 w-[380px] h-[380px] rounded-full blur-3xl"
        style={{ background: theme.glow, opacity: 0.7 }}
      />

      {/* Layer 4: Ghosted category icon (huge, rotated) */}
      <motion.div
        className="absolute top-1/2 right-[8%] -translate-y-1/2"
        animate={prefersReducedMotion ? undefined : { rotate: [0, 5, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative">
          <Icon
            size={220}
            strokeWidth={0.8}
            className="opacity-[0.12]"
            aria-hidden="true"
          />
        </div>
      </motion.div>

      {/* Layer 5: Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Rotating ring — top left */}
        <motion.div
          className="absolute top-[15%] left-[10%] w-20 h-20 rounded-full border border-black/[0.08]"
          animate={prefersReducedMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        {/* Floating square — bottom left */}
        <motion.div
          className="absolute bottom-[20%] left-[18%] w-12 h-12 rounded-md border border-black/[0.08]"
          animate={
            prefersReducedMotion
              ? undefined
              : { y: [-8, 8, -8], rotate: [0, 45, 0] }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Dot grid — center */}
        <div
          className="absolute top-[60%] left-[40%] grid grid-cols-3 gap-1.5 opacity-[0.15]"
          aria-hidden="true"
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full"
              style={{ background: theme.shapeFill }}
            />
          ))}
        </div>
        {/* Plus sign — bottom right */}
        <motion.div
          className="absolute bottom-[25%] right-[20%] w-5 h-5"
          animate={prefersReducedMotion ? undefined : { rotate: 90 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-px bg-black/10" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-px bg-black/10" />
          </div>
        </motion.div>
      </div>

      {/* Layer 6: Category badge + read time chip — visible meta */}
      <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center gap-3 z-10">
        <span
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-xs font-semibold shadow-sm ${theme.iconColor}`}
        >
          <Icon size={14} strokeWidth={2.5} />
          {theme.label}
        </span>
        {readTime && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm text-xs font-medium text-foreground-secondary shadow-sm">
            {readTime}
          </span>
        )}
      </div>

      {/* Bottom subtle fade to background — helps blend into the page */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
    </motion.div>
  );
}
