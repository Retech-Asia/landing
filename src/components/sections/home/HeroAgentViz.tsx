"use client";

/**
 * 3D product card stack for the hero.
 *
 * Three real Retech product UIs positioned at different Z depths in a CSS
 * 3D perspective container. Cards float subtly and respond to mouse with
 * parallax rotation. The front card is the Investment Intelligence platform
 * (the AI flagship); mid and back cards add depth context.
 *
 * Why this works for a hero (vs the agent-graph diagram):
 *   - Premium SaaS heroes (Linear, Stripe, Notion, Anthropic) show floating
 *     product UI, not architecture flowcharts. Buyers recognize the product
 *     shape immediately.
 *   - Each card represents a real shipped Retech project, so the hero
 *     shows proof of capability, not abstract claims.
 *   - Depth + parallax + atmosphere = the "expensive" hero feel.
 *
 * Tech:
 *   - Pure CSS 3D transforms (perspective + rotateX/rotateY/translateZ)
 *   - Mouse parallax via useMotionValue + useSpring
 *   - Real UI rendered as HTML/SVG (charts, badges, code, chat)
 *   - No WebGL, no Three.js bundle hit
 *   - Desktop-only; mobile returns null
 *   - Respects prefers-reduced-motion (static stack)
 */

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/* ── Card 1 (front): Investment Intelligence dashboard ── */

function InvestmentIntelCard() {
  return (
    <div className="w-[440px] rounded-2xl bg-white border border-black/[0.08] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25),0_10px_30px_-5px_rgba(0,0,0,0.1)] overflow-hidden">
      {/* Title bar with project name + tech badges */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-black/[0.06] bg-gradient-to-r from-brand/[0.04] to-accent-cyan/[0.03]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
          <span className="text-xs font-semibold text-foreground">
            Investment Intelligence
          </span>
        </div>
        <div className="flex items-center gap-1">
          {["LangChain", "pgvector", "Claude"].map((t) => (
            <span
              key={t}
              className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-foreground/[0.06] text-foreground-secondary"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Body: portfolio chart + multi-agent debate snippet */}
      <div className="p-5">
        {/* Portfolio chart */}
        <div className="mb-4">
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-foreground-muted">
                Portfolio Value · 30D
              </p>
              <p className="text-xl font-bold text-foreground tabular-nums">
                $12.4M
              </p>
            </div>
            <span className="text-xs font-semibold text-brand tabular-nums">
              +18.4%
            </span>
          </div>
          <svg viewBox="0 0 200 50" className="w-full h-12">
            <defs>
              <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#208535" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#208535" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 40 Q 20 38, 30 32 T 60 28 Q 80 24, 100 18 T 140 14 Q 170 10, 200 6 L 200 50 L 0 50 Z"
              fill="url(#chart-fill)"
            />
            <path
              d="M 0 40 Q 20 38, 30 32 T 60 28 Q 80 24, 100 18 T 140 14 Q 170 10, 200 6"
              fill="none"
              stroke="#208535"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Multi-agent debate snippet */}
        <div className="space-y-1.5">
          <p className="text-[10px] uppercase tracking-wider text-foreground-muted mb-1">
            Analyst Debate
          </p>
          {[
            { role: "Bull", color: "text-accent-cyan", text: "R&D spend up 24% QoQ, moat strengthening." },
            { role: "Bear", color: "text-accent-violet", text: "P/E at 5-year high, multiple compression risk." },
            { role: "Synth", color: "text-brand", text: "Thesis: hold with $185 target. Citation: 10-K." },
          ].map((msg) => (
            <div key={msg.role} className="flex items-start gap-2 text-[11px]">
              <span className={`font-semibold shrink-0 ${msg.color}`}>
                {msg.role}:
              </span>
              <span className="text-foreground-secondary leading-tight">
                {msg.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Card 2 (mid): Mining Analytics operational dashboard ── */

function MiningAnalyticsCard() {
  return (
    <div className="w-[340px] rounded-2xl bg-white border border-black/[0.08] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2),0_8px_20px_-5px_rgba(0,0,0,0.08)] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-black/[0.06] bg-gradient-to-r from-accent-cyan/[0.04] to-brand/[0.03]">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
          <span className="text-[11px] font-semibold text-foreground">
            Mining Analytics
          </span>
        </div>
        <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-foreground/[0.06] text-foreground-secondary">
          Live
        </span>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-foreground-muted">
              Hashrate
            </p>
            <p className="text-base font-bold text-foreground tabular-nums">
              1.24 EH/s
            </p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-foreground-muted">
              BTC / Day
            </p>
            <p className="text-base font-bold text-foreground tabular-nums">
              0.0847
            </p>
          </div>
        </div>
        {/* Pool status grid */}
        <div className="space-y-1">
          {[
            { pool: "F2Pool", load: 78 },
            { pool: "ViaBTC", load: 92 },
            { pool: "Binance", load: 64 },
          ].map((p) => (
            <div key={p.pool} className="flex items-center gap-2">
              <span className="text-[10px] font-medium text-foreground-secondary w-14 shrink-0">
                {p.pool}
              </span>
              <div className="flex-1 h-1 rounded-full bg-foreground/[0.06] overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand to-accent-cyan"
                  initial={{ width: 0 }}
                  animate={{ width: `${p.load}%` }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                />
              </div>
              <span className="text-[10px] font-medium text-foreground-muted tabular-nums w-7 text-right">
                {p.load}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Card 3 (back): AI Analysis chat interface ── */

function AIAnalysisCard() {
  return (
    <div className="w-[300px] rounded-2xl bg-white border border-black/[0.08] shadow-[0_15px_30px_-10px_rgba(0,0,0,0.15)] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-black/[0.06]">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-violet animate-pulse" />
          <span className="text-[10px] font-semibold text-foreground">
            AI Analysis
          </span>
        </div>
        <span className="text-[9px] font-medium text-foreground-muted tabular-nums">
          12 credits
        </span>
      </div>
      <div className="p-3 space-y-1.5">
        <p className="text-[9px] uppercase tracking-wider text-foreground-muted">
          Blood panel review
        </p>
        <div className="text-[10px] bg-foreground/[0.04] rounded-lg px-2.5 py-1.5 text-foreground-secondary leading-snug">
          Analyzing CBC results against reference ranges...
        </div>
        <div className="text-[10px] bg-brand/[0.06] border border-brand/15 rounded-lg px-2.5 py-1.5 text-foreground-secondary leading-snug">
          <strong className="text-brand">Claude:</strong> Vitamin D borderline
          low (28 ng/mL). Consider 2000 IU supplement daily. Flagged for MD
          review.
        </div>
      </div>
    </div>
  );
}

/* ── Main component ── */

export function HeroAgentViz() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Mouse parallax — rotation of the whole card stack
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [12, -12]), {
    stiffness: 60,
    damping: 25,
    mass: 1,
  });
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), {
    stiffness: 60,
    damping: 25,
    mass: 1,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || prefersReducedMotion) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY, prefersReducedMotion],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  if (!isDesktop) return null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 z-0 pointer-events-none hidden lg:flex items-center justify-end pr-12"
      style={{
        perspective: "1800px",
        perspectiveOrigin: "75% 50%",
        maskImage:
          "linear-gradient(to right, transparent 0%, transparent 25%, black 50%, black 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, transparent 25%, black 50%, black 100%)",
      }}
      aria-hidden="true"
    >
      <motion.div
        style={
          prefersReducedMotion
            ? { transformStyle: "preserve-3d" }
            : { rotateX, rotateY, transformStyle: "preserve-3d" }
        }
        className="relative"
      >
        {/* Back card: AI Analysis chat — deepest, smallest, top-right */}
        <motion.div
          className="absolute top-[-100px] right-[60px]"
          style={{
            transform: prefersReducedMotion
              ? "translateZ(-180px) rotateY(-12deg)"
              : "translateZ(-180px) rotateY(-12deg)",
            transformStyle: "preserve-3d",
          }}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [0, -10, 0],
                  transition: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.4,
                  },
                }
          }
        >
          <AIAnalysisCard />
        </motion.div>

        {/* Mid card: Mining Analytics — middle depth, bottom-right */}
        <motion.div
          className="absolute top-[60px] right-[-40px]"
          style={{
            transform: "translateZ(-90px) rotateY(-6deg)",
            transformStyle: "preserve-3d",
          }}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [0, -14, 0],
                  transition: {
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.2,
                  },
                }
          }
        >
          <MiningAnalyticsCard />
        </motion.div>

        {/* Front card: Investment Intelligence — closest, largest, center-right */}
        <motion.div
          className="absolute top-[-30px] right-[-100px]"
          style={{
            transform: "translateZ(0)",
            transformStyle: "preserve-3d",
          }}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [0, -8, 0],
                  transition: {
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }
          }
        >
          <InvestmentIntelCard />
        </motion.div>
      </motion.div>
    </div>
  );
}
