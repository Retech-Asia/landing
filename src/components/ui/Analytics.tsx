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
  // Only render on Vercel production (not local, not preview)
  if (process.env.NODE_ENV !== "production") return null;

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
