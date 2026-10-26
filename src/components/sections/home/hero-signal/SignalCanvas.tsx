"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";

/**
 * Concept II signal volume, rendered as ONE 2D canvas (deliberately not R3F:
 * the visual is line-work converging to a vanishing point, and a single 2D
 * canvas hits the approved look at a fraction of the GPU cost per the
 * performance guard in the keyframes spec).
 *
 * Beat mapping (progress p arrives via MotionValue, read in RAF, no re-renders):
 *  - idle (p ~ 0): idea-nodes drift; faint schematic grid behind.
 *  - beat 1-2 (0.05 < p < 0.62): nodes converge along connection lines toward
 *    the vanishing point (52% x, 42% y - AR-1's whiteboard wall center);
 *    green pulses travel the lines and accelerate; clutter fades.
 *  - beat 3 (p > 0.62): the canvas fades out exactly on the converged
 *    line-work (the parent matches AR-1 in on the same point).
 *
 * Budget: ~90 nodes, ~26 lines, 7 pulses. RAF pauses when `active` is false
 * (off-screen or unmounted after beat 3) or document hidden.
 */

const NODES = 90;
const LINES = 26;
const PULSES = 7;
/** AR-1 vanishing point in canvas-relative coordinates. */
const VP = { x: 0.52, y: 0.42 };

type NodeT = { x: number; y: number; vx: number; vy: number; r: number; line: number; t: number };

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

    // Seeded PRNG: deterministic layout across renders (no hydration churn -
    // canvas draws only, but determinism keeps the visual stable).
    let seed = 7;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    // Connection lines: radiate from the vanishing point outward.
    const lines = Array.from({ length: LINES }, (_, i) => {
      const a = (i / LINES) * Math.PI * 2 + rand() * 0.22;
      const len = 0.32 + rand() * 0.62;
      return { a, len, width: 0.5 + rand() * 0.7 };
    });

    // Idea-nodes: each belongs to a line and drifts around its start.
    const nodes: NodeT[] = Array.from({ length: NODES }, () => {
      const line = Math.floor(rand() * LINES);
      const t = 0.05 + rand() * 0.5; // position along the line (0 = far end)
      return {
        x: rand(),
        y: rand(),
        vx: (rand() - 0.5) * 0.00035,
        vy: (rand() - 0.5) * 0.00028,
        r: 0.8 + rand() * 1.6,
        line,
        t,
      };
    });

    const pulses = Array.from({ length: PULSES }, () => ({
      line: Math.floor(rand() * LINES),
      t: rand(),
      speed: 0.0016 + rand() * 0.0022,
    }));

    const pointOn = (li: number, t: number): [number, number] => {
      const l = lines[li];
      // Start far out, converge to VP as t -> 1.
      const sx = VP.x + Math.cos(l.a) * l.len;
      const sy = VP.y + Math.sin(l.a) * l.len * 0.72;
      return [sx + (VP.x - sx) * t, sy + (VP.y - sy) * t];
    };

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

      // Beat interpolation.
      const converge = Math.min(1, Math.max(0, (p - 0.05) / 0.5)); // 0.05..0.55
      const clutter = 1 - Math.min(1, Math.max(0, (p - 0.2) / 0.35)); // fades 0.2..0.55
      const pulseBoost = 1 + converge * 2.2;

      ctx.clearRect(0, 0, w, h);

      // Schematic plane: faint grid, denser near VP, falls away with converge.
      const gridA = 0.05 * (1 - converge * 0.85);
      if (gridA > 0.004) {
        ctx.strokeStyle = `rgba(148, 190, 210, ${gridA})`;
        ctx.lineWidth = 0.5;
        const step = 72;
        ctx.beginPath();
        for (let gx = (VP.x * w) % step; gx < w; gx += step) {
          ctx.moveTo(gx, 0);
          ctx.lineTo(gx, h);
        }
        for (let gy = (VP.y * h) % step; gy < h; gy += step) {
          ctx.moveTo(0, gy);
          ctx.lineTo(w, gy);
        }
        ctx.stroke();
      }

      // Connection lines drawing themselves toward the VP.
      for (let i = 0; i < lines.length; i++) {
        const drawn = Math.min(1, converge * 1.15 + lines[i].width * 0.04);
        if (drawn <= 0.02) continue;
        const [x1, y1] = pointOn(i, 1 - drawn);
        const [x2, y2] = pointOn(i, 1);
        // Restrained schematic at full converge: the match-cut lands on a
        // quiet line skeleton, not a starburst.
        const alpha = 0.15 + 0.16 * converge;
        ctx.strokeStyle = `rgba(48, 171, 71, ${alpha})`;
        ctx.lineWidth = lines[i].width * (0.55 + converge * 0.45);
        ctx.beginPath();
        ctx.moveTo(x1 * w, y1 * h);
        ctx.lineTo(x2 * w, y2 * h);
        ctx.stroke();
      }

      // Idea-nodes drifting, then captured along their line.
      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
        const captured = Math.min(1, Math.max(0, (p - 0.08 - n.t * 0.1) / 0.35));
        const [lx, ly] = pointOn(n.line, n.t + captured * (1 - n.t));
        const cx = n.x * (1 - captured) + lx * captured;
        const cy = n.y * (1 - captured) + ly * captured;
        const a = (0.5 - n.t * 0.25) * clutter + captured * 0.5;
        if (a <= 0.01) continue;
        ctx.fillStyle =
          n.r > 1.6
            ? `rgba(103, 210, 228, ${a * 0.75})`
            : `rgba(148, 190, 210, ${a * 0.5})`;
        ctx.beginPath();
        ctx.arc(cx * w, cy * h, n.r * (1 - captured * 0.4), 0, Math.PI * 2);
        ctx.fill();
      }

      // Green pulses traveling the lines (accelerate with converge).
      for (const pulse of pulses) {
        pulse.t += pulse.speed * pulseBoost * dt;
        if (pulse.t > 1) {
          pulse.t = 0;
          pulse.line = Math.floor(rand() * LINES);
        }
        const t = converge > 0 ? pulse.t * (0.55 + 0.45 * converge) : pulse.t * 0.55;
        const [px, py] = pointOn(pulse.line, t);
        const a = 0.32 + 0.28 * converge;
        const g = ctx.createRadialGradient(px * w, py * h, 0, px * w, py * h, 7);
        g.addColorStop(0, `rgba(48, 171, 71, ${a})`);
        g.addColorStop(1, "rgba(48, 171, 71, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px * w, py * h, 7, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
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
