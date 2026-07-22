"use client";

import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const SCROLL_THRESHOLD = 8;

/**
 * Reading progress bar for blog post pages.
 *
 * A 3 px gradient bar (brand green → cyan) fixed below the navbar that fills
 * left-to-right as the user scrolls through the article.
 *
 * Hides in sync with the navbar: when the user scrolls down past 80px the bar
 * fades out (otherwise it would float at the top of the viewport with nothing
 * anchoring it). Reappears on scroll-up along with the navbar.
 */
export function ReadingProgress() {
  const { scrollY, scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const delta = latest - lastScrollY.current;
    if (Math.abs(delta) >= SCROLL_THRESHOLD) {
      // Hide when scrolling down past 80px; show otherwise. Matches Navbar logic.
      setVisible(!(delta > 0 && latest > 80));
      lastScrollY.current = latest;
    }
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed top-16 left-0 right-0 z-40 h-[3px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Glow layer — softer, wider halo behind the bar */}
          <motion.div
            className="absolute inset-y-0 left-0"
            style={{
              width,
              background:
                "linear-gradient(90deg, color-mix(in srgb, var(--brand) 35%, transparent), color-mix(in srgb, var(--accent-cyan) 35%, transparent))",
              filter: "blur(4px)",
            }}
            aria-hidden="true"
          />
          {/* Core gradient bar */}
          <motion.div
            role="progressbar"
            aria-label="Reading progress"
            aria-valuemin={0}
            aria-valuemax={100}
            className="absolute inset-y-0 left-0 will-change-transform"
            style={{
              width,
              background: "linear-gradient(90deg, var(--brand), var(--accent-cyan))",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
