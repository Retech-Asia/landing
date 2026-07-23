"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  PageTransition                                                     */
/*  - Fade + slide-up on route mount (10px, 300ms)                     */
/*  - Fade-out exit on navigate away                                   */
/*  - Thin top progress bar (brand green -> cyan gradient)             */
/*  - Minimum display time (400ms) to prevent flicker on fast loads    */
/*  - Smooth scroll-to-top on navigation                               */
/*  - Respects prefers-reduced-motion                                  */
/* ------------------------------------------------------------------ */

interface PageTransitionProps {
  children: ReactNode;
}

/** Minimum time (ms) the progress bar stays visible once triggered. */
const MIN_PROGRESS_DISPLAY_MS = 400;

/* ── Top progress bar ─────────────────────────────────────────────── */

function TopProgressBar({ isNavigating }: { isNavigating: boolean }) {
  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          className="fixed inset-x-0 top-0 z-[9999] h-[2px] origin-left pointer-events-none"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{
            scaleX: [0, 0.4, 0.7, 0.9, 1],
            opacity: [1, 1, 1, 1, 0],
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            background:
              "linear-gradient(90deg, #208535 0%, #06b6d4 100%)",
          }}
        />
      )}
    </AnimatePresence>
  );
}

/* ── Main component ───────────────────────────────────────────────── */

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const prevPathname = useRef(pathname);
  const navigateStartRef = useRef(0);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // Skip on first render — no transition needed for the initial page load
    if (prevPathname.current === pathname) return;

    prevPathname.current = pathname;

    const reduced = Boolean(prefersReduced);

    // Scroll to top on route change — native scroll (Lenis removed).
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    }

    // If reduced motion is preferred, skip progress bar + return early.
    if (reduced) return;

    // Record when the navigation started for minimum display time calculation
    navigateStartRef.current = Date.now();

    // Show the progress bar.
    // This is intentional — the navigation progress bar must activate
    // when a route change is detected.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsNavigating(true);

    // Clear progress bar after animation completes, but enforce a minimum
    // display time so fast navigations don't produce a jarring flicker.
    const elapsed = Date.now() - navigateStartRef.current;
    const remaining = Math.max(0, MIN_PROGRESS_DISPLAY_MS - elapsed);
    const timer = setTimeout(() => setIsNavigating(false), Math.max(650, remaining));
    return () => clearTimeout(timer);
  }, [pathname, prefersReduced]);

  /* When the user prefers reduced motion we skip all animations entirely */
  if (prefersReduced) {
    return <>{children}</>;
  }

  return (
    <>
      <TopProgressBar isNavigating={isNavigating} />
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          // initial={false}: skip the entrance animation on first paint.
          // AnimatePresence still runs exit/enter on subsequent client-side
          // route changes. Without this, every page loads with opacity:0 in
          // SSR and stays hidden until Framer Motion hydrates, blowing out
          // LCP on every route.
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
