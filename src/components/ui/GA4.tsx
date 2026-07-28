"use client";

import Script from "next/script";
import { useEffect } from "react";
import { readConsent } from "@/lib/cookie-consent";

/**
 * Google Analytics 4 loader with Consent Mode v2.
 *
 * Behavior:
 * - No-op when NEXT_PUBLIC_GA_MEASUREMENT_ID is not set (local dev, or if
 *   the env var is removed). The component renders nothing and gtag is
 *   never loaded — zero runtime cost.
 * - When the env var is set, gtag.js loads once on first interaction.
 *   Default consent is `denied` for analytics/ad storage, so GA4 receives
 *   only cookieless, consent-mode pings until the user accepts the banner.
 * - On consent grant, `gtag('consent', 'update', ...)` flips
 *   `analytics_storage` to `granted` and GA4 starts writing cookies.
 *
 * Same-tab reactivity: CookieConsent dispatches a `retech:consent-change`
 * CustomEvent on save (the native `storage` event only fires cross-tab).
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/** Push the gtag consent update for the current stored preferences. */
function syncConsent() {
  if (typeof window === "undefined" || !("gtag" in window)) return;
  const record = readConsent();
  const granted = record?.analytics === true;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: record?.marketing === true ? "granted" : "denied",
  });
}

export function GA4() {
  useEffect(() => {
    // No-op when GA4 isn't configured — keeps local dev and any env
    // without the env var completely free of GA overhead.
    if (!GA_ID) return;

    // Sync consent state on mount — picks up the case where the user
    // already accepted on a previous visit.
    syncConsent();

    // React to same-tab consent changes from the CookieConsent banner.
    const onChange = () => syncConsent();
    window.addEventListener("retech:consent-change", onChange);
    // React to cross-tab consent changes (e.g. user accepted in another tab).
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("retech:consent-change", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  // Render nothing if GA4 isn't configured.
  if (!GA_ID) return null;

  // Inline bootstrap MUST execute before gtag.js so that the default
  // consent state is in place before any tags fire. next/script with
  // strategy="beforeInteractive" would move this to <head> automatically,
  // but `beforeInteractive` only works in the root layout's <head> — using
  // afterInteractive here still satisfies ordering because gtag.js is
  // loaded as a separate <Script> below with the same strategy, and the
  // bootstrap is registered synchronously before it.
  return (
    <>
      <Script id="ga4-consent-default" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            functionality_storage: 'granted',
            security_storage: 'granted',
            wait_for_update: 500
          });
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: true });
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
