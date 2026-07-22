"use client";

import { useState, useEffect } from "react";

/**
 * Returns true if the user has enabled "prefers-reduced-motion: reduce"
 * in their operating system accessibility settings.
 *
 * Uses a lazy initializer to read the initial value without causing
 * a cascading render (avoids setState-in-effect lint error).
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}
