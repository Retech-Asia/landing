"use client";

import { ScrollCounter } from "@/components/ui/ScrollCounter";
import { Container } from "@/components/ui/Container";
import { STATS_BAR } from "@/lib/constants";

/**
 * StatsBar — now uses scroll-scrubbed counters.
 *
 * Numbers count up as the user scrolls through the section (not on-view
 * timer). Scroll back up → counts back down. Apple product page style.
 *
 * Performance: useMotionValueEvent fires per scroll frame, setState with
 * a number is a single text-node update. GPU-composited.
 */
export function StatsBar() {
  return (
    <div className="relative overflow-hidden" aria-label="Key metrics">
      {/* Single subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand/[0.03] via-accent-cyan/[0.04] to-accent-violet/[0.03]" />

      <Container className="relative z-10 py-16 md:py-20">
        <ScrollCounter stats={[...STATS_BAR]} />
      </Container>
    </div>
  );
}
