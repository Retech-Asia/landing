"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

/**
 * Dynamically loaded PageTransition wrapper.
 * NOT using ssr: false so that children still render during SSR for SEO/FCP.
 * The framer-motion code splits into a separate chunk loaded on hydration.
 */

const PageTransition = dynamic(
  () => import("@/components/ui/PageTransition").then((m) => m.PageTransition),
);

export function DeferredPageTransition({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
