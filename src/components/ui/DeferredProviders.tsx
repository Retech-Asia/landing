"use client";

import dynamic from "next/dynamic";

/**
 * Deferred providers: heavy client components that are not needed for initial paint.
 * Uses ssr: false so they never block SSR / hydration.
 * Grouped here to keep layout.tsx as a Server Component.
 *
 * NOTE: ScrollProgress is intentionally NOT mounted here. The navbar already
 * renders its own progress bar (Navbar.tsx ~line 307) which correctly hides
 * when the navbar itself hides on scroll-down. Mounting a second global bar
 * caused overlapping duplicates and a lingering bar when the navbar was off-screen.
 */

const WebVitals = dynamic(
  () => import("@/components/ui/WebVitals").then((m) => m.WebVitals),
  { ssr: false },
);

const ScrollDepthTracker = dynamic(
  () => import("@/components/ui/ScrollDepthTracker").then((m) => m.ScrollDepthTracker),
  { ssr: false },
);

const EngagementTracker = dynamic(
  () => import("@/components/ui/EngagementTracker").then((m) => m.EngagementTracker),
  { ssr: false },
);

const CookieConsent = dynamic(
  () => import("@/components/ui/CookieConsent").then((m) => m.CookieConsent),
  { ssr: false },
);

const BackToTop = dynamic(
  () => import("@/components/ui/BackToTop").then((m) => m.BackToTop),
  { ssr: false },
);

const MobileStickyCTA = dynamic(
  () => import("@/components/ui/MobileStickyCTA").then((m) => m.MobileStickyCTA),
  { ssr: false },
);

export function DeferredProviders() {
  return (
    <>
      <WebVitals />
      <ScrollDepthTracker />
      <EngagementTracker />
      <CookieConsent />
      <BackToTop />
      <MobileStickyCTA />
    </>
  );
}
