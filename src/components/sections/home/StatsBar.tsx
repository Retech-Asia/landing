"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/ui/CountUp";
import { Container } from "@/components/ui/Container";
import { STATS_BAR } from "@/lib/constants";

/* Stagger container: each stat child fades in one after another */
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const statVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function StatsBar() {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden" aria-label="Key metrics">
      {/* Single subtle gradient — previously had 3 layers (gradient + dot
          pattern + 900×500px radial glow) which read as visual noise
          behind what's just 4 numbers in a row. */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand/[0.03] via-accent-cyan/[0.04] to-accent-violet/[0.03]" />

      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-0 relative"
        >
          {STATS_BAR.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={statVariant}
              className="flex flex-col items-center text-center relative"
            >
              {/* Divider lines between stats on desktop */}
              {index > 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-12 w-px bg-gradient-to-b from-transparent via-foreground-muted/15 to-transparent" />
              )}

              <CountUp
                target={stat.value}
                suffix={stat.suffix}
                duration={2000}
                className="text-4xl md:text-5xl font-bold gradient-text-brand"
              />
              <p className="mt-2 text-sm md:text-base font-medium text-foreground-muted">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
