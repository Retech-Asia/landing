"use client";

import { hasAnalyticsConsent } from "@/lib/analytics";
import { useReportWebVitals } from "next/web-vitals";
import { useCallback } from "react";

/**
 * Collects Core Web Vitals (TTFB, FCP, LCP, FID, CLS, INP) and
 * optionally sends them to your analytics endpoint.
 *
 * Features:
 * - Respects cookie consent (checks localStorage for analytics permission)
 * - Supports custom metrics (scroll depth, time on page, etc.)
 * - Placeholder for Google Analytics / Vercel Analytics integration
 */
export function WebVitals() {
  const sendMetric = useCallback(
    (metric: { name: string; value: number; rating?: string; delta?: number; navigationType?: string }) => {
      if (process.env.NODE_ENV === "development") {
        console.log(`[Web Vitals] ${metric.name}`, {
          value: Math.round(metric.value),
          unit: metric.name === "CLS" ? "" : "ms",
          rating: metric.rating,
          ...(metric.delta != null ? { delta: Math.round(metric.delta) } : {}),
          ...(metric.navigationType ? { navigationType: metric.navigationType } : {}),
        });
      }

      // Respect cookie consent before sending to analytics.
      if (!hasAnalyticsConsent()) return;

      // ── Google Analytics 4 Web Vitals reporting ────────────────
      // gtag is loaded by <GA4 /> in layout.tsx when
      // NEXT_PUBLIC_GA_MEASUREMENT_ID is set. Consent Mode v2 ensures
      // these events are only cookie-backed after the user accepts.
      if (typeof window !== "undefined" && "gtag" in window) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).gtag("event", metric.name, {
          value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
          metric_id: (metric as { id?: string }).id,
          metric_value: metric.value,
          metric_delta: metric.delta,
          metric_rating: metric.rating,
        });
      }
    },
    []
  );

  useReportWebVitals((metric) => {
    const { name, value, rating, delta, navigationType } = metric;
    sendMetric({ name, value, rating, delta, navigationType });
  });

  // --- Custom metric support ---
  // You can report custom metrics (scroll depth, time on page, etc.)
  // using the static method below. The analytics utility functions
  // in src/lib/analytics.ts handle consent checks independently.

  return null;
}

