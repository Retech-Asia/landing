"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { hasAnalyticsConsent } from "@/lib/analytics";

/**
 * Wrapper that lets us pass a `beforeSend` callback to Vercel Analytics and
 * Speed Insights from a Server Component (layout.tsx). Both underlying
 * components are Client Components, so the callback cannot cross the
 * server/client boundary inline — it must live inside a "use client" file.
 *
 * Consent gate happens here, on the client, so no PII is shipped before
 * the user accepts the cookie banner.
 */
export function ConsentAwareAnalytics() {
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
