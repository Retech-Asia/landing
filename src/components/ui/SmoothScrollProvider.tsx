"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

const LENIS_OPTIONS = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  touchMultiplier: 1.5,
  wheelMultiplier: 1,
};

/**
 * Returns true if the user has enabled prefers-reduced-motion. Used to decide
 * whether to start Lenis at all — under reduced motion, native browser scroll
 * (which is instant) is preferred over smooth-javascript scroll.
 */
function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Active Lenis instance (or null). Other components — e.g. PageTransition —
 * read this to call lenis.scrollTo(0) on route change. window.scrollTo()
 * does NOT work when Lenis is hijacking scroll, which is why this is needed.
 */
let activeLenis: Lenis | null = null;

export function getLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  return activeLenis;
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef(0);
  const aliveRef = useRef(true);

  useEffect(() => {
    aliveRef.current = true;

    // Reduced-motion: skip Lenis entirely. Native browser scroll is instant
    // and respects the user's OS-level accessibility setting. Installing Lenis
    // would force smooth-javascript scroll on someone who explicitly opted out.
    if (prefersReducedMotion()) {
      return () => {
        aliveRef.current = false;
      };
    }

    // Touch / mobile: skip Lenis entirely. Native iOS/Android touch scroll is
    // already butter-smooth at the OS level. Lenis hijacks touchmove events
    // and re-implements scroll via JS, which on mobile introduces:
    //   - input lag (~16ms+ per frame)
    //   - fighting with browser momentum scroll
    //   - broken pull-to-refresh in some browsers
    //   - worse accessibility for screen-reader swipe gestures
    // Mobile users get a noticeably better feel with native scroll.
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      return () => {
        aliveRef.current = false;
      };
    }

    function startLenis() {
      const lenis = new Lenis({ ...LENIS_OPTIONS });
      lenisRef.current = lenis;
      activeLenis = lenis;

      function raf(time: number) {
        if (!aliveRef.current) return;
        lenis.raf(time);
        rafIdRef.current = requestAnimationFrame(raf);
      }
      rafIdRef.current = requestAnimationFrame(raf);
    }

    function stopLenis() {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = 0;
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      activeLenis = null;
    }

    startLenis();

    // --- Stuck-scroll watchdog ---
    // If the user scrolls (wheel/touch) but the scroll position does not
    // change for several consecutive events, Lenis may be stuck.  In that
    // case we destroy and re-create the instance.
    let stuckCount = 0;
    const STUCK_THRESHOLD = 6;
    let lastScrollY = window.scrollY;

    function checkStuck(e: WheelEvent | TouchEvent) {
      if (!aliveRef.current) return;

      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastScrollY);
      const inputDelta =
        e instanceof WheelEvent ? Math.abs(e.deltaY) : 0;

      // Only count as "stuck" if the user gave significant input
      // but scroll position barely moved.
      if (inputDelta > 30 && delta < 1) {
        stuckCount++;
      } else {
        stuckCount = 0;
      }

      lastScrollY = currentY;

      if (stuckCount >= STUCK_THRESHOLD) {
        // Reset Lenis — stop the old instance and start a fresh one
        stopLenis();
        startLenis();
        stuckCount = 0;
      }
    }

    window.addEventListener("wheel", checkStuck, { passive: true });
    window.addEventListener("touchmove", checkStuck, { passive: true });

    return () => {
      aliveRef.current = false;
      stopLenis();
      window.removeEventListener("wheel", checkStuck);
      window.removeEventListener("touchmove", checkStuck);
    };
  }, []);

  return <>{children}</>;
}
