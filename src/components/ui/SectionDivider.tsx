"use client";

import { motion } from "framer-motion";

type SectionDividerVariant = "gradient" | "subtle";

interface SectionDividerProps {
  /** Visual style of the divider.
   *  "gradient" — brand-colored gradient line with a glowing center dot (default).
   *  "subtle"   — minimal thin gray line for lighter separation. */
  variant?: SectionDividerVariant;
}

export function SectionDivider({ variant = "gradient" }: SectionDividerProps) {
  if (variant === "subtle") {
    return (
      <motion.div
        initial={{ opacity: 0, scaleX: 0.3 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-7xl px-6"
      >
        <div className="h-px bg-black/[0.06]" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto max-w-7xl px-6 py-12"
    >
      {/* Gradient line: brand green → teal accent, low opacity */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand/25 to-transparent" />

      {/* Animated center dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative flex items-center justify-center">
          {/* Outer glow — subtle continuous pulse */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.3, 1] }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
            className="absolute h-3 w-3 rounded-full bg-brand/25 blur-sm"
          />
          {/* Inner dot */}
          <div className="h-1.5 w-1.5 rounded-full bg-brand/60" />
        </div>
      </motion.div>
    </motion.div>
  );
}
