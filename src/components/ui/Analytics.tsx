"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { hasAnalyticsConsent } from "@/lib/analytics";

/**
 * Wrapper for Vercel Analytics + Speed Insights.
 *
 * Only renders in Vercel production — the underlying scripts (/_vercel/insights,
 * /_vercel/speed-insights) only exist on Vercel deployments. On local dev,
 * preview, or non-Vercel hosts, they 404 and pollute the console with errors.
 *
 * Consent gate happens here, on the client, so no PII is shipped before
 * the user accepts the cookie banner.
 */
export function ConsentAwareAnalytics() {
  // Only render on real Vercel deployments (production OR preview).
  // `npm run start` locally also sets NODE_ENV=production but isn't on
  // Vercel, so the scripts 404 and pollute the console. Use VERCEL env
  // var instead — Vercel sets it to "1" on every deployment.
  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production" && process.env.NEXT_PUBLIC_VERCEL_ENV !== "preview") {
    if (!process.env.VERCEL) return null;
  }

  return (
    <>
      <Analytics
        beforeSend={(event) => {
          if (!hasAnalyticsConsent()) return null;
          return event;
        }}
      />
      <SpeedInsights
        beforeSend={(event) => {
          if (!hasAnalyticsConsent()) return null;
          return event;
        }}
      />
    </>
  );
}
