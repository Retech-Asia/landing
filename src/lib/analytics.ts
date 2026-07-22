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
  // Replace "/api/analytics" with your real endpoint when ready.
  fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {
    // Silently swallow errors — analytics should never break the UI.
  });

  // --- Google Analytics 4 integration placeholder ---
  // To enable GA4:
  // 1. Install gtag.js via <Script> in layout.tsx (load conditionally)
  // 2. Uncomment the block below and replace GA_MEASUREMENT_ID.
  //
  // if (typeof window !== "undefined" && "gtag" in window) {
  //   window.gtag("event", payload.event as string, {
  //     event_category: payload.category,
  //     event_label: payload.label,
  //     value: payload.value,
  //   });
  // }

  // --- Vercel Analytics integration placeholder ---
  // If you install @vercel/analytics, uncomment:
  //
  // import { track } from "@vercel/analytics";
  // track(payload.event as string, payload as Record<string, string>);
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

  // --- GA4 page view placeholder ---
  // if (typeof window !== "undefined" && "gtag" in window) {
  //   window.gtag("config", "GA_MEASUREMENT_ID", { page_path: url });
  // }

  // --- Vercel Analytics placeholder ---
  // import { track } from "@vercel/analytics";
  // track("page_view", { url });
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

  // --- GA4 custom event placeholder ---
  // if (typeof window !== "undefined" && "gtag" in window) {
  //   window.gtag("event", name, properties);
  // }

  // --- Vercel Analytics placeholder ---
  // import { track } from "@vercel/analytics";
  // track(name, properties ?? {});
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

  // --- GA4 scroll event placeholder ---
  // if (typeof window !== "undefined" && "gtag" in window) {
  //   window.gtag("event", "scroll", {
  //     event_category: "engagement",
  //     event_label: `${depth}%`,
  //     value: depth,
  //   });
  // }
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
