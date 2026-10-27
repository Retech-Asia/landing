"use client";

import { motion } from "framer-motion";
import { TechLogo, hasTechMark } from "@/components/ui/TechLogo";

interface TechBadgesProps {
  technologies: string[];
}

/**
 * Tech chips on service detail pages. Round 3 (2026-10-27): the colored
 * dots are replaced by authentic official logos (simple-icons, brand
 * colors) — the owner ruled plain-text pills unfinished; logos communicate
 * technical information so the decorative-icon ban does not apply. Names
 * without an official icon (REST APIs etc.) fall back to the quiet dot.
 */
export function TechBadges({ technologies }: TechBadgesProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
      {technologies.map((tech, i) => (
        <motion.span
          key={tech}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: i * 0.04, ease: "easeOut" }}
          className="relative group inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-foreground-secondary rounded-xl border border-card-border bg-card-bg backdrop-blur-sm transition-all duration-200 hover:border-brand/30 hover:text-brand hover:shadow-[0_0_12px_rgba(32,133,53,0.08)] cursor-default select-none"
        >
          <TechLogo name={tech} size={16} />
          {!hasTechMark(tech) && (
            <span
              className="w-1.5 h-1.5 rounded-full bg-brand/60 group-hover:bg-brand transition-colors"
              aria-hidden="true"
            />
          )}
          {tech}
        </motion.span>
      ))}
    </div>
  );
}
