/**
 * Analytics utility for Retech Solutions landing page.
 *
 * All functions check cookie consent before sending data.
 * Consent is managed by `src/lib/cookie-consent.ts` and stored in
 * localStorage under "retech-cookie-consent" with granular category flags.
 *
 * The `hasAnalyticsConsent()` function checks the "analytics" category.
 * The `hasMarketingConsent()` function checks the "marketing" category.
 */

import { hasConsent } from "@/lib/cookie-consent";

// ── Consent helpers ─────────────────────────────────────────────

/**
 * Check whether the user has granted analytics consent.
 * Delegates to the shared cookie-consent utility.
 */
export function hasAnalyticsConsent(): boolean {
  return hasConsent("analytics");
}

/**
 * Check whether the user has granted marketing consent.
 * Useful for ad-related scripts and retargeting pixels.
 */
export function hasMarketingConsent(): boolean {
  return hasConsent("marketing");
}

// ── Internal ────────────────────────────────────────────────────

/**
 * Internal helper — POSTs a JSON payload to the analytics endpoint.
 * Uses `keepalive: true` so the request survives page navigations.
 */
function sendPayload(payload: Record<string, unknown>): void {
  if (!hasAnalyticsConsent()) return;

  const body = JSON.stringify({
    ...payload,
    timestamp: Date.now(),
    path: typeof window !== "undefined" ? window.location.pathname : undefined,
    referrer: typeof document !== "undefined" ? document.referrer || undefined : undefined,
  });

  // --- Send to your own analytics endpoint ---
  fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {
    // Silently swallow errors — analytics should never break the UI.
  });

  // --- Google Analytics 4 integration ---
  // gtag is loaded by <GA4 /> (src/components/ui/GA4.tsx) when
  // NEXT_PUBLIC_GA_MEASUREMENT_ID is set. Consent Mode v2 ensures
  // events are only associated with cookies after the user accepts
  // analytics in the cookie banner.
  if (typeof window !== "undefined" && "gtag" in window) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag("event", payload.event as string, {
      event_category: payload.category,
      event_label: payload.label,
      value: payload.value,
    });
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Track a page view. Call this from Next.js route-change handlers or
 * the WebVitals component.
 */
export function trackPageView(url: string): void {
  if (!hasAnalyticsConsent()) return;

  sendPayload({
    event: "page_view",
    url,
  });
}

/**
 * Track a custom event with optional properties.
 *
 * @example
 * trackEvent("cta_click", { label: "hero_contact", section: "hero" });
 */
export function trackEvent(
  name: string,
  properties?: Record<string, string>
): void {
  if (!hasAnalyticsConsent()) return;

  sendPayload({
    event: name,
    ...properties,
  });
}

/**
 * Track scroll depth milestones (25%, 50%, 75%, 100%).
 *
 * @example
 * trackScrollDepth(50); // user scrolled past 50% of page
 */
export function trackScrollDepth(depth: number): void {
  if (!hasAnalyticsConsent()) return;

  sendPayload({
    event: "scroll_depth",
    category: "engagement",
    label: `${depth}%`,
    value: depth,
  });
}

/**
 * Track time-on-page engagement milestones.
 *
 * @example
 * trackTimeOnPage(30); // user has been on page for 30 seconds
 */
export function trackTimeOnPage(seconds: number): void {
  if (!hasAnalyticsConsent()) return;

  sendPayload({
    event: "time_on_page",
    category: "engagement",
    label: `${seconds}s`,
    value: seconds,
  });
}

/**
 * Track an outbound link click.
 *
 * @example
 * trackOutboundClick("https://github.com/retech-asia");
 */
export function trackOutboundClick(url: string): void {
  if (!hasAnalyticsConsent()) return;

  sendPayload({
    event: "outbound_click",
    category: "outbound",
    label: url,
  });
}
