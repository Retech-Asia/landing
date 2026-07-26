"use client";

import dynamic from "next/dynamic";

const CursorSpotlight = dynamic(
  () =>
    import("@/components/ui/CursorSpotlight").then((m) => m.CursorSpotlight),
  { ssr: false },
);

const NoiseOverlay = dynamic(
  () =>
    import("@/components/ui/NoiseOverlay").then((m) => m.NoiseOverlay),
  { ssr: false },
);

const PerformanceMonitor = dynamic(
  () =>
    import("@/components/ui/PerformanceMonitor").then(
      (m) => m.PerformanceMonitor
    ),
  { ssr: false },
);

/**
 * Client-only widgets that require `ssr: false`.
 * Moved into a separate Client Component because Next.js 16
 * does not allow `next/dynamic` with `ssr: false` in Server Components.
 *
 * ChatWidget (floating WhatsApp button) removed — overlapped other CTAs
 * ("Get Free Consultation" was hidden behind it) and was annoying on
 * mobile. WhatsApp now lives in the Navbar, Footer, and Contact page
 * via <WhatsAppButton /> — same destination, contextual placement.
 */
export function ClientOnlyWidgets() {
  return (
    <>
      <CursorSpotlight />
      <NoiseOverlay />
      <PerformanceMonitor />
    </>
  );
}
