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

      // ── Google Analytics 4 integration ──────────────────────────
      // To enable GA4 Web Vitals reporting, add the following scripts
      // to src/app/layout.tsx <head> section. They should only load
      // AFTER the user grants analytics consent (see CookieConsent):
      //
      //   import Script from "next/script";
      //
      //   <Script
      //     src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
      //     strategy="afterInteractive"
      //   />
      //   <Script id="gtag-init" strategy="afterInteractive">
      //     {`
      //       window.dataLayer = window.dataLayer || [];
      //       function gtag(){dataLayer.push(arguments);}
      //       gtag('js', new Date());
      //       gtag('config', 'G-XXXXXXXXXX', {
      //         send_page_view: false
      //       });
      //     `}
      //   </Script>
      //
      // Then uncomment below to send Web Vitals events to GA4:
      //
      // if (typeof window !== "undefined" && "gtag" in window) {
      //   window.gtag("event", metric.name, {
      //     value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      //     metric_id: (metric as any).id,
      //     metric_value: metric.value,
      //     metric_delta: metric.delta,
      //     metric_rating: metric.rating,
      //   });
      // }

      // ── Custom analytics endpoint ───────────────────────────────
      // Replace "/api/analytics/web-vitals" with your real endpoint.
      // Example:
      // fetch("/api/analytics/web-vitals", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     name: metric.name,
      //     value: metric.value,
      //     rating: metric.rating,
      //     delta: metric.delta,
      //     navigationType: metric.navigationType,
      //     path: window.location.pathname,
      //     timestamp: Date.now(),
      //   }),
      //   keepalive: true,
      // }).catch(() => {});
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

