"use client";

import { motion } from "framer-motion";
import {
  Layout,
  Users,
  BarChart3,
  Globe,
  Palette,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "cms-platforms": Layout,
  "crm-systems": Users,
  "erp-solutions": BarChart3,
  "web-development": Globe,
  "ui-ux-design": Palette,
  "dedicated-teams": UsersRound,
};

interface ServiceHeroIconProps {
  slug: string;
  color?: string;
  className?: string;
}

/**
 * Animated hero icon with pulsing glow ring, rendered as a large decorative
 * element in the service detail hero section.
 */
export function ServiceHeroIcon({
  slug,
  color = "brand",
  className = "",
}: ServiceHeroIconProps) {
  const Icon = iconMap[slug];

  const colorMap: Record<string, { ring: string; glow: string; icon: string }> = {
    brand: {
      ring: "bg-brand/20",
      glow: "shadow-[0_0_40px_rgba(32,133,53,0.15),0_0_80px_rgba(32,133,53,0.08)]",
      icon: "text-brand",
    },
    "accent-cyan": {
      ring: "bg-accent-cyan/20",
      glow: "shadow-[0_0_40px_rgba(6,182,212,0.15),0_0_80px_rgba(6,182,212,0.08)]",
      icon: "text-accent-cyan",
    },
    "accent-violet": {
      ring: "bg-accent-violet/20",
      glow: "shadow-[0_0_40px_rgba(139,92,246,0.15),0_0_80px_rgba(139,92,246,0.08)]",
      icon: "text-accent-violet",
    },
  };

  const palette = colorMap[color] ?? colorMap.brand;

  if (!Icon) return null;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Outer pulsing ring */}
      <motion.div
        className={`absolute inset-0 rounded-3xl ${palette.ring}`}
        animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.2, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Inner glow container */}
      <motion.div
        className={`relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-white to-background-subtle border border-black/[0.06] ${palette.glow}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <Icon size={32} className={palette.icon} strokeWidth={1.8} />
      </motion.div>
    </div>
  );
}
