"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const SCROLL_THRESHOLD = 400;
const RING_RADIUS = 20;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    function handleScroll() {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          const percent = docHeight > 0 ? scrollTop / docHeight : 0;

          setScrollPercent(Math.min(1, Math.max(0, percent)));
          setVisible(scrollTop > SCROLL_THRESHOLD);
          ticking.current = false;
        });
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const strokeDashoffset = RING_CIRCUMFERENCE * (1 - scrollPercent);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 22,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-36 right-6 z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-brand text-white shadow-[0_4px_14px_rgba(32,133,53,0.35)] transition-all duration-200 hover:bg-brand-dark hover:shadow-[0_6px_20px_rgba(32,133,53,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {/* Circular progress ring */}
          <svg
            className="absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
          >
            {/* Background track */}
            <circle
              cx="24"
              cy="24"
              r={RING_RADIUS}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2.5"
              fill="none"
            />
            {/* Progress arc */}
            <circle
              cx="24"
              cy="24"
              r={RING_RADIUS}
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              style={{
                transition: "stroke-dashoffset 0.15s ease-out",
              }}
            />
          </svg>
          <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
