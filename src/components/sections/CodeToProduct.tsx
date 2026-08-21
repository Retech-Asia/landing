"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/*  Code-to-Product scene — reusable 3D centerpiece for               */
/*  programming-topic surfaces (Technologies page band).              */
/*                                                                    */
/*  Two floating windows in CSS perspective: a code editor that       */
/*  types a build script, and a live product dashboard. A canvas      */
/*  particle stream "deploys" packets from editor to dashboard.       */
/*  The cursor see-saws the two cards in counter-tilt.                */
/*                                                                    */
/*  LCP-safe: the cards are plain DOM + CSS and render on first       */
/*  paint with static code. JS motion (typing, particles, tilt)       */
/*  arms only when the browser goes idle. Reduced motion renders      */
/*  a static scene with no rAF loop.                                  */
/*                                                                    */
/*  Styles live in globals.css under "Code-to-Product scene".         */
/*  Reusable: pass a className to reposition the stage                */
/*  (ctp-stage--inset is the full-width band variant).                */
/* ------------------------------------------------------------------ */

/* Typed build script. Code stays English in every locale; it is code. */
const CODE_LINES = [
  '<span class="k">import</span> { deploy } <span class="k">from</span> <span class="s">"@retech/cloud"</span>;',
  '',
  '<span class="c">// from idea to production</span>',
  '<span class="k">const</span> product = <span class="f">build</span>({',
  '  cms: <span class="s">"headless"</span>,',
  '  crm: <span class="s">"integrated"</span>,',
  '  ai: <span class="s">"copilot"</span>,',
  '});',
  '',
  '<span class="f">deploy</span>(product, { region: <span class="s">"sg"</span> });',
  '<span class="c">// ✓ live in 4.2s</span>',
];

const MAX_VISIBLE_LINES = 9;
const STATIC_CODE =
  CODE_LINES.slice(0, 6).join("\n") + ' <span class="ctp-caret"></span>';

const isDark = () =>
  typeof document !== "undefined" &&
  document.documentElement.dataset.theme === "dark";

export function CodeToProduct({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const [armed, setArmed] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);

  /* Arm JS motion when idle — cards are already visible pre-JS. */
  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (h: number) => void;
    };
    const idle = w.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1200));
    const handle = idle(() => setArmed(true), { timeout: 2000 });
    return () => {
      const cancel = w.cancelIdleCallback ?? ((h: number) => clearTimeout(h));
      cancel(handle as number);
    };
  }, []);

  /* Typing loop (skipped under reduced motion — static code stays). */
  useEffect(() => {
    if (!armed || reduced || !codeRef.current) return;
    const codeEl = codeRef.current;
    let stopped = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let li = 0;
    let ci = 0;
    const shown: string[] = [];

    const render = (partial?: string) => {
      const lines = partial !== undefined ? [...shown, partial] : [...shown];
      codeEl.innerHTML =
        lines.slice(-MAX_VISIBLE_LINES).join("\n") + ' <span class="ctp-caret"></span>';
    };

    const tick = () => {
      if (stopped) return;
      if (li >= CODE_LINES.length) {
        timer = setTimeout(() => {
          li = 0;
          ci = 0;
          shown.length = 0;
          render();
          tick();
        }, 2600);
        return;
      }
      const plain = CODE_LINES[li].replace(/<[^>]+>/g, "");
      ci++;
      if (ci >= plain.length) {
        shown.push(CODE_LINES[li]);
        li++;
        ci = 0;
        render();
        tick();
        return;
      }
      render(plain.slice(0, ci));
      timer = setTimeout(tick, 34 + Math.random() * 46);
    };

    render();
    tick();
    return () => {
      stopped = true;
      if (timer) clearTimeout(timer);
    };
  }, [armed, reduced]);

  /* Deploy stream (canvas) + cursor see-saw tilt, one rAF loop.
     Skipped under reduced motion — the static pass below draws instead. */
  useEffect(() => {
    if (!armed || reduced || !canvasRef.current || !sceneRef.current) return;
    const canvas = canvasRef.current;
    const scene = sceneRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let sx = 0;
    let sy = 0;
    let tx = 0;
    let ty = 0;

    type Particle = {
      x: number; y: number; vx: number; vy: number;
      w: number; o: number;
    };
    let parts: Particle[] = [];

    const spawn = (): Particle => ({
      x: sx + (Math.random() - 0.5) * 60,
      y: sy + Math.random() * 40,
      vx: (tx - sx) / 90 + (Math.random() - 0.5) * 0.5,
      vy: 1.6 + Math.random() * 2.2,
      w: 0.8 + Math.random() * 1.4,
      o: 0.5 + Math.random() * 0.5,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const c = canvas.getBoundingClientRect();
      const s = scene.getBoundingClientRect();
      sx = s.left - c.left + s.width * 0.3;
      sy = s.top - c.top + s.height * 0.28;
      tx = s.left - c.left + s.width * 0.62;
      ty = s.top - c.top + s.height * 0.62;
      parts = Array.from({ length: 46 }, () => {
        const p = spawn();
        p.y = sy + Math.random() * (ty - sy);
        return p;
      });
    };

    const drawFX = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = isDark() ? "lighter" : "source-over";
      ctx.lineCap = "round";
      for (const p of parts) {
        const px = p.x;
        const py = p.y;
        p.x += p.vx;
        p.y += p.vy;
        if (p.y > ty + 30) Object.assign(p, spawn());
        const t = Math.max(0, Math.min(1, (p.y - sy) / (ty - sy)));
        const fade = Math.min(1, t * 4) * Math.min(1, (1 - t) * 4 + 0.25);
        const a = p.o * fade * (isDark() ? 0.85 : 0.55);
        ctx.strokeStyle = isDark()
          ? `rgba(74,222,128,${a})`
          : `rgba(32,133,53,${a})`;
        ctx.lineWidth = p.w;
        ctx.beginPath();
        ctx.moveTo(px - p.vx * 5, py - p.vy * 5);
        ctx.lineTo(px, py);
        ctx.stroke();
      }
    };

    let mx = 0;
    let my = 0;
    let cmx = 0;
    let cmy = 0;
    const onPointer = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
    };

    let raf = 0;
    const loop = () => {
      cmx += (mx - cmx) * 0.06;
      cmy += (my - cmy) * 0.06;
      if (editorRef.current) {
        editorRef.current.style.transform =
          `rotateY(${14 + cmx * 6}deg) rotateX(${4 - cmy * 4}deg)`;
      }
      if (dashRef.current) {
        dashRef.current.style.transform =
          `rotateY(${-10 - cmx * 6}deg) rotateX(${2 + cmy * 4}deg)`;
      }
      drawFX();
      raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [armed, reduced]);

  /* Reduced motion: one static particle pass, no loop, no tilt. */
  useEffect(() => {
    if (!armed || !reduced || !canvasRef.current || !sceneRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const c = canvas.getBoundingClientRect();
    const s = sceneRef.current.getBoundingClientRect();
    const sx = s.left - c.left + s.width * 0.3;
    const sy = s.top - c.top + s.height * 0.28;
    const tx = s.left - c.left + s.width * 0.62;
    const ty = s.top - c.top + s.height * 0.62;
    const dark = isDark();
    ctx.lineCap = "round";
    ctx.globalCompositeOperation = dark ? "lighter" : "source-over";
    for (let i = 0; i < 46; i++) {
      const t = i / 46;
      const x = sx + (tx - sx) * t + (Math.sin(i * 7.3) * 30);
      const y = sy + (ty - sy) * t;
      const fade = Math.min(1, t * 4) * Math.min(1, (1 - t) * 4 + 0.25);
      const a = (0.5 + (i % 5) / 10) * fade * (dark ? 0.85 : 0.55);
      ctx.strokeStyle = dark ? `rgba(74,222,128,${a})` : `rgba(32,133,53,${a})`;
      ctx.lineWidth = 0.8 + ((i * 37) % 14) / 10;
      ctx.beginPath();
      ctx.moveTo(x - 2, y - 6);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }, [armed, reduced]);

  return (
    <div className={cn("ctp-stage z-[var(--z-base)]", className)} aria-hidden="true">
      <div className="ctp-glow" />
      <canvas ref={canvasRef} className="ctp-canvas" />
      <div className="ctp-scene" ref={sceneRef}>
        <div className="ctp-win ctp-editor" ref={editorRef}>
          <div className="ctp-winbar">
            <i className="ctp-dot" />
            <i className="ctp-dot" />
            <i className="ctp-dot" />
            <span className="ctp-wtitle">build.ts</span>
          </div>
          <div
            ref={codeRef}
            className="ctp-code"
            dangerouslySetInnerHTML={{ __html: STATIC_CODE }}
          />
        </div>

        <div className="ctp-win ctp-dash" ref={dashRef}>
          <div className="ctp-winbar">
            <i className="ctp-dot" />
            <i className="ctp-dot" />
            <i className="ctp-dot" />
            <span className="ctp-wtitle">product &middot; live</span>
          </div>
          <svg viewBox="0 0 400 220" fill="none" preserveAspectRatio="none">
            <rect x="20" y="18" width="104" height="34" rx="10" className="ctp-ink" strokeWidth="1.5" />
            <rect x="32" y="28" width="46" height="7" rx="3.5" className="ctp-ink-fill" />
            <text x="32" y="46" fontFamily="var(--font-mono)" fontSize="13" className="ctp-c-brand" fill="currentColor">
              98.7%
            </text>
            <rect x="140" y="18" width="104" height="34" rx="10" className="ctp-ink" strokeWidth="1.5" />
            <rect x="152" y="28" width="46" height="7" rx="3.5" className="ctp-ink-fill" />
            <text x="152" y="46" fontFamily="var(--font-mono)" fontSize="13" className="ctp-c-cyan" fill="currentColor">
              2.4k
            </text>
            <rect x="260" y="18" width="104" height="34" rx="10" className="ctp-ink" strokeWidth="1.5" />
            <rect x="272" y="28" width="46" height="7" rx="3.5" className="ctp-ink-fill" />
            <text x="272" y="46" fontFamily="var(--font-mono)" fontSize="13" className="ctp-c-violet" fill="currentColor">
              +38%
            </text>

            <rect x="20" y="70" width="210" height="130" rx="12" className="ctp-ink" strokeWidth="1.5" />
            <g className="ctp-c-brand">
              <rect x="38" y="150" width="18" height="34" rx="4" fill="currentColor" opacity="0.85" />
              <rect x="66" y="138" width="18" height="46" rx="4" fill="currentColor" opacity="0.85" />
              <rect x="94" y="156" width="18" height="28" rx="4" fill="currentColor" opacity="0.85" />
              <rect x="122" y="120" width="18" height="64" rx="4" fill="currentColor" opacity="0.85" />
              <rect x="150" y="128" width="18" height="56" rx="4" fill="currentColor" opacity="0.85" />
              <rect x="178" y="104" width="18" height="80" rx="4" fill="currentColor" opacity="0.85" />
            </g>

            <rect x="250" y="70" width="130" height="130" rx="12" className="ctp-ink" strokeWidth="1.5" />
            <circle cx="315" cy="130" r="30" className="ctp-ink" strokeWidth="1.5" />
            <circle cx="315" cy="130" r="18" className="ctp-ink" strokeWidth="1.2" />
            <circle cx="315" cy="130" r="4.5" className="ctp-c-brand" fill="currentColor" />
            <circle cx="315" cy="130" r="10" className="ctp-c-brand" fill="currentColor" opacity="0.25">
              <animate attributeName="r" values="6;22" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.45;0" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="297" cy="114" r="3" className="ctp-c-cyan" fill="currentColor" opacity="0.8" />
            <circle cx="332" cy="146" r="3" className="ctp-c-violet" fill="currentColor" opacity="0.8" />
          </svg>
          <span className="ctp-plabel">shipped product</span>
        </div>
      </div>
    </div>
  );
}
