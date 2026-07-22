"use client";

import {
  hasAnalyticsConsent,
  trackEvent,
  trackOutboundClick,
  trackTimeOnPage,
} from "@/lib/analytics";
import { useEffect, useRef } from "react";

/**
 * Tracks user engagement metrics:
 * - Time on page (reports at 30s, 60s, 120s, 300s intervals)
 * - CTA button clicks (links/buttons targeting "/contact")
 * - Outbound link clicks
 *
 * Only runs in production and when analytics consent has been granted.
 */
export function EngagementTracker() {
  const timeReportedRef = useRef(new Set<number>());

  useEffect(() => {
    // Only run in production with analytics consent.
    if (process.env.NODE_ENV !== "production") return;
    if (!hasAnalyticsConsent()) return;

    // ---- Time-on-page tracking ----
    const timeMilestones = [30, 60, 120, 300]; // seconds
    const reported = timeReportedRef.current;
    const startTime = Date.now();

    const timeInterval = setInterval(() => {
      const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);
      for (const milestone of timeMilestones) {
        if (elapsedSeconds >= milestone && !reported.has(milestone)) {
          reported.add(milestone);
          trackTimeOnPage(milestone);
        }
      }
      // Stop checking once all milestones have been reported.
      if (reported.size === timeMilestones.length) {
        clearInterval(timeInterval);
      }
    }, 5000); // Check every 5 seconds.

    // ---- Click tracking ----
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest(
        "a, button"
      ) as HTMLElement | null;
      if (!target) return;

      // CTA click tracking: buttons or links targeting "/contact".
      const isCTA =
        target.tagName === "A"
          ? (target as HTMLAnchorElement).getAttribute("href") === "/contact"
          : target.tagName === "BUTTON"
            ? target.closest('a[href="/contact"]') !== null
            : false;

      if (isCTA) {
        trackEvent("cta_click", {
          label: target.textContent?.trim().slice(0, 80) ?? "unknown",
          tag: target.tagName.toLowerCase(),
          path: window.location.pathname,
        });
      }

      // Outbound link tracking.
      if (target.tagName === "A") {
        const href = (target as HTMLAnchorElement).href;
        if (href) {
          try {
            const url = new URL(href, window.location.origin);
            if (url.hostname !== window.location.hostname) {
              trackOutboundClick(href);
            }
          } catch {
            // Invalid URL — ignore.
          }
        }
      }
    }

    document.addEventListener("click", handleClick, true);

    return () => {
      clearInterval(timeInterval);
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  return null;
}
