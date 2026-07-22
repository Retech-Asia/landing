"use client";

import { hasAnalyticsConsent, trackScrollDepth } from "@/lib/analytics";
import { useEffect, useRef } from "react";

/**
 * Tracks how far down the page a user scrolls and reports milestones
 * at 25%, 50%, 75%, and 100% depth.
 *
 * Only runs in production and when analytics consent has been granted.
 */
export function ScrollDepthTracker() {
  const reportedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Only run in production with analytics consent.
    if (process.env.NODE_ENV !== "production") return;
    if (!hasAnalyticsConsent()) return;

    const reported = reportedRef.current;
    const milestones = [25, 50, 75, 100];

    function handleScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      for (const milestone of milestones) {
        if (scrollPercent >= milestone && !reported.has(milestone)) {
          reported.add(milestone);
          trackScrollDepth(milestone);
        }
      }
    }

    // Throttle scroll handler to at most once per 200ms.
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    // Check initial scroll position (user may have refreshed mid-page).
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
