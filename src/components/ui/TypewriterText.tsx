"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
}

function getReducedMotionSnapshot(): boolean {
  return typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;
}

function subscribeToReducedMotion(callback: () => void): () => void {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

export function TypewriterText({ text, speed = 50, className }: TypewriterTextProps) {
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => false, // server snapshot — assume no reduced motion
  );

  const [displayed, setDisplayed] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTypewriter = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    // When reducedMotion is active, show the full text immediately
    // via requestAnimationFrame to avoid the synchronous-setState-in-effect lint.
    if (reducedMotion) {
      clearTypewriter();
      const raf = requestAnimationFrame(() => setDisplayed(text));
      return () => cancelAnimationFrame(raf);
    }

    // Start typewriter animation — defer initial state reset to avoid
    // synchronous setState-in-effect.
    clearTypewriter();
    let idx = 0;

    // Kick off on the next frame so the reset + first character happen together.
    const raf = requestAnimationFrame(() => {
      setDisplayed("");

      intervalRef.current = setInterval(() => {
        idx += 1;
        if (idx <= text.length) {
          setDisplayed(text.slice(0, idx));
        }
        if (idx >= text.length && intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }, speed);
    });

    return () => {
      cancelAnimationFrame(raf);
      clearTypewriter();
    };
  }, [text, speed, reducedMotion, clearTypewriter]);

  return (
    <span className={className}>
      {reducedMotion ? text : displayed}
      <span
        className="inline-block w-[2px] ml-0.5 align-text-bottom animate-cursor-blink"
        style={{
          height: "1em",
          backgroundColor: "currentColor",
        }}
        aria-hidden="true"
      />
    </span>
  );
}
