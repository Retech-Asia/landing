"use client";

import {
  trackEvent,
  trackOutboundClick,
  trackTimeOnPage,
} from "@/lib/analytics";
import { locales } from "@/i18n/routing";
import { useEffect, useRef } from "react";

/**
 * Matches contact CTA hrefs in any locale variant: "/contact", "/en/contact",
 * "/vi/contact". Rendered hrefs are locale-prefixed (next-intl Link), so an
 * exact "/contact" comparison never matched (RT-03 F5).
 */
const CONTACT_HREF_RE = new RegExp(`^/(?:(${locales.join("|")})/)?contact/?$`);

/**
 * Tracks user engagement metrics:
 * - Time on page (reports at 30s, 60s, 120s, 300s intervals)
 * - CTA clicks (links targeting the contact page in any locale)
 * - Outbound link clicks
 *
 * Runs in production only. Consent is enforced at send time (every track*
 * call re-checks analytics consent before POSTing), so listeners stay bound
 * and clicks that happen AFTER the visitor accepts cookies are still
 * measured; sends stop when consent is absent or revoked.
 */
export function EngagementTracker() {
  const timeReportedRef = useRef(new Set<number>());

  useEffect(() => {
    // Only run in production. Consent is NOT checked here on purpose:
    // the effect runs once at mount, and gating it on a cookie decision
    // that usually happens later would permanently disable tracking for
    // visitors who accept after load.
    if (process.env.NODE_ENV !== "production") return;

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

      // CTA click tracking: any anchor whose href is the contact page in
      // the active locale (covers direct anchor clicks, buttons nested in
      // anchors, and icon children via closest()).
      const anchor =
        target.tagName === "A"
          ? (target as HTMLAnchorElement)
          : target.closest("a");
      const isCTA = anchor
        ? CONTACT_HREF_RE.test(anchor.getAttribute("href") ?? "")
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
