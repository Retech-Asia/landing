"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Dev-only floating performance monitor.
 * Toggle with Ctrl+Shift+P.
 * Shows FPS, DOM node count, and image count in real time.
 * Only renders when NODE_ENV === "development".
 */
export function PerformanceMonitor() {
  const [visible, setVisible] = useState(false);
  const [fps, setFps] = useState(0);
  const [domNodes, setDomNodes] = useState(0);
  const [imageCount, setImageCount] = useState(0);
  const frameCount = useRef(0);
  const lastTime = useRef(0);
  const rafId = useRef<number>(0);
  const isLooping = useRef(false);

  // Keyboard shortcut: Ctrl+Shift+P
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey && e.shiftKey && e.key === "P") {
        e.preventDefault();
        setVisible((prev) => !prev);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // FPS counter loop — started/stopped via the visible ref
  useEffect(() => {
    if (!visible) {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = 0;
        isLooping.current = false;
      }
      return;
    }

    // Reset counters on open
    frameCount.current = 0;
    lastTime.current = performance.now();
    isLooping.current = true;

    function measureLoop() {
      if (!isLooping.current) return;

      frameCount.current += 1;
      const now = performance.now();
      const elapsed = now - lastTime.current;

      if (elapsed >= 1000) {
        const currentFps = Math.round((frameCount.current * 1000) / elapsed);
        setFps(currentFps);
        frameCount.current = 0;
        lastTime.current = now;

        // Update DOM stats once per second (cheap queries)
        setDomNodes(document.querySelectorAll("*").length);
        setImageCount(document.querySelectorAll("img").length);
      }

      rafId.current = requestAnimationFrame(measureLoop);
    }

    rafId.current = requestAnimationFrame(measureLoop);

    return () => {
      isLooping.current = false;
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = 0;
      }
    };
  }, [visible]);

  // Don't render anything in production
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  if (!visible) {
    return (
      <div
        className="fixed bottom-4 left-4 z-[9999] flex items-center gap-1.5 rounded-lg bg-black/75 px-2.5 py-1.5 font-mono text-[10px] text-white/60 backdrop-blur-sm select-none"
        title="Ctrl+Shift+P to expand"
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
        Dev
      </div>
    );
  }

  const fpsColor =
    fps >= 55
      ? "text-green-400"
      : fps >= 30
        ? "text-yellow-400"
        : "text-red-400";

  return (
    <div className="fixed bottom-4 left-4 z-[9999] w-52 rounded-xl bg-black/85 p-3 font-mono text-[11px] text-white/80 shadow-2xl backdrop-blur-md select-none">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-white/50 text-[10px] uppercase tracking-wider">
          Performance
        </span>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="text-white/40 hover:text-white/80 transition-colors cursor-pointer"
          aria-label="Hide performance monitor"
        >
          &#x2715;
        </button>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-white/50">FPS</span>
          <span className={`tabular-nums font-semibold ${fpsColor}`}>
            {fps}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/50">DOM Nodes</span>
          <span className="tabular-nums text-white/70">{domNodes.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/50">Images</span>
          <span className="tabular-nums text-white/70">{imageCount}</span>
        </div>
      </div>

      <div className="mt-2 border-t border-white/10 pt-2 text-[9px] text-white/30">
        Ctrl+Shift+P to toggle
      </div>
    </div>
  );
}
