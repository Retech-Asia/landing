"use client";

import { MotionConfig } from "framer-motion";
import { type ReactNode } from "react";

/**
 * Wraps the app in framer-motion's <MotionConfig reducedMotion="user">.
 *
 * With `reducedMotion="user"`, every motion component automatically respects
 * the OS-level prefers-reduced-motion setting — no need to add
 * usePrefersReducedMotion to each component individually.
 *
 * This is the WCAG 2.3.3 fix at the root, applied to the entire tree.
 */
export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
