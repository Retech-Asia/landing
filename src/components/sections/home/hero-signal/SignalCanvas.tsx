"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";

/**
 * Concept II signal volume, rendered as ONE 2D canvas (deliberately not R3F:
 * the visual is flowing line-work, and a single 2D canvas hits the approved
 * look at a fraction of the GPU cost per the performance guard in the
 * keyframes spec).
 *
 * FLOW-LANE REWRITE (2026-10-27): the previous geometry radiated lines from
 * the vanishing point outward — on the light dunes that read as a flat
 * radial-line placeholder (owner declined the transition partly on this).
 * The line-work is now HORIZONTAL WORKFLOW LANES: streams that follow the
 * dunes' own flow language, gain structure, and bend gently through the
 * whiteboard zone (the AR-1 architecture wall) as they organize. No spokes,
 * no starburst, no schematic grid screen.
 *
 * Beat mapping (progress p arrives via MotionValue, read in RAF, no
 * re-renders; windows match HeroSignal's 2026-10-27 timeline):
 *  - 0.00-0.10: hidden — pure LitDunes atmosphere + headline.
 *  - 0.10-0.20: emerge — flow lanes fade in over the terrain.
 *  - 0.14-0.44: organize — lane wobble damps, lanes bend through the hub
 *    (AR-1's whiteboard zone ~52% x / 40% y), nodes settle onto the lanes,
 *    pulses accelerate: "ideas become connected workflows".
 *  - 0.44-0.58: release — line-work fades as the masked photo reveal takes
 *    over (the parent expands the AR-1 clip from the same hub).
 *
 * Budget: 9 lanes, 54 nodes, 6 pulses. RAF pauses when `active` is false or
 * the document is hidden.
 *
 * Theme: palette branches per-frame off the data-theme attribute — mint
 * strokes over the dark scene, deep-green schematic strokes over the light
 * dunes (brand-family, reads like pencil line-work on paper).
 */

const LANES = 9;
const NODES = 54;
const PULSES = 6;
/** AR-1 whiteboard zone in canvas-relative coordinates (mask origin). */
const HUB = { x: 0.52, y: 0.4 };

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
/** Linear 0..1 progress of p across [a, b]. */
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

type LaneT = {
  baseY: number;
  amp: number;
  freq: number;
  phase: number;
  bend: number;
};

export function SignalCanvas({
  progress,
  active,
}: {
  progress: MotionValue<number>;
  active: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const unsub = progress.on("change", (v) => {
      progressRef.current = v;
    });
    return unsub;
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Seeded PRNG: deterministic layout (canvas draws only, determinism
    // keeps the visual stable across restarts).
    let seed = 11;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    // Flow lanes: stacked like the dune bands (upper third → lower fifth).
    // `bend` scales how strongly a lane eases through the hub band: lanes
    // near the hub's height bend more, so the family reads as streams
    // converging on the architecture wall — not spokes around a point.
    const lanes: LaneT[] = Array.from({ length: LANES }, (_, i) => {
      const baseY = 0.26 + 0.58 * (i / (LANES - 1));
      return {
        baseY,
        amp: 0.03 + rand() * 0.05,
        freq: 1.1 + rand() * 1.5,
        phase: rand() * Math.PI * 2,
        bend: 1 / (1 + Math.abs(baseY - HUB.y) * 2.4),
      };
    });

    // Lane point at x with the organization state applied: wobble damps and
    // a Gaussian bend carries the lane through the hub.
    const lanePoint = (l: LaneT, x: number, organize: number): [number, number] => {
      const wobble = l.amp * (1 - 0.75 * organize) * Math.sin(x * l.freq * Math.PI * 2 + l.phase);
      const gauss = Math.exp(-((x - HUB.x) ** 2) / (2 * 0.16 ** 2));
      const pull = (HUB.y - l.baseY) * 0.5 * l.bend * organize * gauss;
      return [x, l.baseY + wobble + pull];
    };

    // Process-step nodes: each belongs to a lane; a small residual jitter
    // collapses onto the lane as organization rises.
    const nodes = Array.from({ length: NODES }, () => ({
      lane: Math.floor(rand() * LANES),
      s: 0.06 + rand() * 0.88,
      jx: (rand() - 0.5) * 0.05,
      jy: (rand() - 0.5) * 0.05,
      r: 0.8 + rand() * 1.6,
    }));

    const pulses = Array.from({ length: PULSES }, () => ({
      lane: Math.floor(rand() * LANES),
      s: rand(),
      speed: 0.0012 + rand() * 0.0018,
    }));

    // Theme tracking: same mechanism as LitDunes (data-theme on <html>).
    let dark = document.documentElement.getAttribute("data-theme") === "dark";
    const themeObserver = new MutationObserver(() => {
      dark = document.documentElement.getAttribute("data-theme") === "dark";
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const STEPS = 48;

    let last = performance.now();
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!activeRef.current || document.hidden) {
        last = now;
        return;
      }
      const dt = Math.min(50, now - last);
      last = now;
      const p = progressRef.current;

      // Beat interpolation (windows — see header).
      const master = seg(p, 0.1, 0.2) * (1 - seg(p, 0.44, 0.58));
      const organize = seg(p, 0.14, 0.44);

      ctx.clearRect(0, 0, w, h);
      if (master <= 0.01) return;

      // Flow lanes: soft glow underlay + core stroke (deep green over the
      // light dunes / mint over the dark wash). Presence firms up as the
      // lanes organize.
      const laneAlpha = master * (0.4 + 0.45 * organize);
      for (const l of lanes) {
        ctx.beginPath();
        for (let i = 0; i <= STEPS; i++) {
          const x = -0.04 + (i / STEPS) * 1.08;
          const [px, py] = lanePoint(l, x, organize);
          if (i === 0) ctx.moveTo(px * w, py * h);
          else ctx.lineTo(px * w, py * h);
        }
        ctx.strokeStyle = dark
          ? `rgba(134, 239, 190, ${laneAlpha * 0.3})`
          : `rgba(16, 94, 66, ${laneAlpha * 0.22})`;
        ctx.lineWidth = 2.6;
        ctx.stroke();
        ctx.strokeStyle = dark
          ? `rgba(224, 255, 234, ${laneAlpha * 0.75})`
          : `rgba(12, 74, 52, ${laneAlpha * 0.7})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      // Process-step nodes settling onto their lanes.
      for (const n of nodes) {
        const l = lanes[n.lane];
        const [lx, ly] = lanePoint(l, n.s, organize);
        const cx = (lx + n.jx * (1 - organize)) * w;
        const cy = (ly + n.jy * (1 - organize)) * h;
        const a = master * (0.32 + 0.4 * organize);
        ctx.fillStyle = dark
          ? n.r > 1.6
            ? `rgba(103, 210, 228, ${a * 0.8})`
            : `rgba(148, 190, 210, ${a * 0.55})`
          : n.r > 1.6
            ? `rgba(13, 110, 92, ${a * 0.8})`
            : `rgba(40, 100, 85, ${a * 0.55})`;
        ctx.beginPath();
        ctx.arc(cx, cy, n.r * (0.85 + 0.35 * organize), 0, Math.PI * 2);
        ctx.fill();
      }

      // Green pulses traveling the lanes (accelerate with organization).
      for (const pulse of pulses) {
        pulse.s += pulse.speed * (1 + organize * 2.2) * dt;
        if (pulse.s > 1) {
          pulse.s = 0;
          pulse.lane = Math.floor(rand() * LANES);
        }
        const l = lanes[pulse.lane];
        const [px, py] = lanePoint(l, pulse.s, organize);
        const a = master * (0.45 + 0.4 * organize);
        const g = ctx.createRadialGradient(px * w, py * h, 0, px * w, py * h, 9);
        g.addColorStop(0, dark ? `rgba(72, 187, 92, ${a})` : `rgba(32, 133, 53, ${a})`);
        g.addColorStop(1, dark ? "rgba(72, 187, 92, 0)" : "rgba(32, 133, 53, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px * w, py * h, 9, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
