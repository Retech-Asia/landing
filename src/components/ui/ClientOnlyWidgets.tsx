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

const ChatWidget = dynamic(
  () => import("@/components/ui/ChatWidget").then((m) => m.ChatWidget),
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
 */
export function ClientOnlyWidgets() {
  return (
    <>
      <CursorSpotlight />
      <NoiseOverlay />
      <ChatWidget />
      <PerformanceMonitor />
    </>
  );
}
