"use client";

/**
 * Multi-agent investment research visualization for the hero.
 *
 * Represents the actual architecture shipped on the Investment Intelligence
 * Platform case study: Query Router → Orchestrator → 4 specialist analysts
 * (Bull/Bear/Tech/Risk) → Synthesizer. Animated dots flow along the edges
 * to show how a query moves through the system.
 *
 * Why this exists:
 *   - Reinforces the AI-emphasis positioning (RAG, multi-agent, LLM orchestration)
 *   - Shows buyers what "multi-agent" actually means instead of claiming it
 *   - Replaces the decorative Three.js orbs removed per Hallmark audit
 *
 * Tech choices:
 *   - Pure SVG + framer-motion (already installed). Zero bundle hit.
 *   - Mouse parallax via useMotionValue + useSpring (GPU-composited transform)
 *   - Lazy-mounted after first paint via parent (next/dynamic)
 *   - Respects prefers-reduced-motion (static SVG, no animation, no parallax)
 *   - Desktop-only (≥ md). Mobile gets the existing CSS gradient background.
 */

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/* ── Architecture (from Investment Intelligence Platform case study) ── */

type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
  role: string;
  accent: "brand" | "cyan" | "violet";
};

const NODES: Node[] = [
  {
    id: "router",
    label: "Query Router",
    x: 50,
    y: 6,
    role: "Classifies each query and routes it through structured, RAG, hybrid, or direct paths.",
    accent: "brand",
  },
  {
    id: "orchestrator",
    label: "Orchestrator",
    x: 50,
    y: 32,
    role: "Coordinates the multi-agent debate. Decides which specialists to invoke per query.",
    accent: "brand",
  },
  {
    id: "bull",
    label: "Bull Analyst",
    x: 13,
    y: 62,
    role: "Argues the upside scenario using RAG-retrieved filings and earnings transcripts.",
    accent: "cyan",
  },
  {
    id: "bear",
    label: "Bear Analyst",
    x: 37,
    y: 72,
    role: "Argues the downside scenario. Required counterweight to the Bull.",
    accent: "violet",
  },
  {
    id: "tech",
    label: "Tech Analyst",
    x: 63,
    y: 72,
    role: "Analyzes the technology moat. Reads 10-Ks for R&D spend and patent activity.",
    accent: "cyan",
  },
  {
    id: "risk",
    label: "Risk Analyst",
    x: 87,
    y: 62,
    role: "Assesses compliance, regulatory, and tail risks. Flags items for human review.",
    accent: "violet",
  },
  {
    id: "synthesizer",
    label: "Synthesizer",
    x: 50,
    y: 95,
    role: "Merges the four specialist outputs into a single investor thesis with citations.",
    accent: "brand",
  },
];

const EDGES: { from: string; to: string }[] = [
  { from: "router", to: "orchestrator" },
  { from: "orchestrator", to: "bull" },
  { from: "orchestrator", to: "bear" },
  { from: "orchestrator", to: "tech" },
  { from: "orchestrator", to: "risk" },
  { from: "bull", to: "synthesizer" },
  { from: "bear", to: "synthesizer" },
  { from: "tech", to: "synthesizer" },
  { from: "risk", to: "synthesizer" },
];

/* ── Visual constants ── */

const ACCENT_COLOR: Record<Node["accent"], string> = {
  brand: "var(--brand)",
  cyan: "var(--accent-cyan)",
  violet: "var(--accent-violet)",
};

const NODE_RADIUS: Record<string, number> = {
  router: 3.2,
  orchestrator: 3.6,
  bull: 2.8,
  bear: 2.8,
  tech: 2.8,
  risk: 2.8,
  synthesizer: 3.4,
};

/* ── Component ── */

export function HeroAgentViz() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Mouse parallax — spring-followed rotation of the whole viz
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [8, -8]), {
    stiffness: 40,
    damping: 30,
    mass: 1,
  });
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [-6, 6]), {
    stiffness: 40,
    damping: 30,
    mass: 1,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || prefersReducedMotion) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY, prefersReducedMotion],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setHoveredNode(null);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 hidden md:block pointer-events-none z-0"
      style={{
        perspective: "1200px",
        maskImage:
          "radial-gradient(ellipse 70% 80% at 75% 50%, black 0%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 80% at 75% 50%, black 0%, transparent 75%)",
      }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[60%] h-[85%]"
        style={
          prefersReducedMotion
            ? undefined
            : { rotateX, rotateY, transformStyle: "preserve-3d" }
        }
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Defs: soft glow filter for nodes */}
          <defs>
            <filter id="agent-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Edges */}
          {EDGES.map((edge) => {
            const from = NODES.find((n) => n.id === edge.from)!;
            const to = NODES.find((n) => n.id === edge.to)!;
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;
            // Slight curve for organic feel
            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const len = Math.sqrt(dx * dx + dy * dy);
            const curve = Math.min(len * 0.1, 3);
            const cx = midX + (-dy / len) * curve;
            const cy = midY + (dx / len) * curve;
            const path = `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
            return (
              <g key={`${edge.from}-${edge.to}`}>
                <path
                  d={path}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={0.25}
                  className="text-foreground-muted/30"
                />
                {/* Traveling dot — represents query flowing through the agent graph.
                    Staggered by edge index so the dot pulse doesn't sync. */}
                {!prefersReducedMotion && (
                  <motion.circle
                    r={0.5}
                    fill="var(--brand)"
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: ["0%", "100%"] }}
                    transition={{
                      duration: 2.4,
                      delay: EDGES.indexOf(edge) * 0.18,
                      repeat: Infinity,
                      repeatDelay: 1.2,
                      ease: "easeInOut",
                    }}
                    style={{
                      offsetPath: `path("${path}")`,
                      offsetRotate: "0deg",
                    }}
                    opacity={0.85}
                  />
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {NODES.map((node, i) => {
            const r = NODE_RADIUS[node.id] ?? 2.8;
            const fill = ACCENT_COLOR[node.accent];
            const isHovered = hoveredNode === node.id;
            return (
              <g
                key={node.id}
                transform={`translate(${node.x} ${node.y})`}
                onPointerEnter={() => setHoveredNode(node.id)}
                onPointerLeave={() => setHoveredNode(null)}
                style={{ pointerEvents: "auto", cursor: "help" }}
              >
                {/* Outer halo — pulses for "live" feel */}
                {!prefersReducedMotion && (
                  <motion.circle
                    r={r + 1.5}
                    fill="none"
                    stroke={fill}
                    strokeWidth={0.15}
                    initial={{ opacity: 0.4, scale: 1 }}
                    animate={{ opacity: [0.4, 0, 0.4], scale: [1, 1.4, 1] }}
                    transition={{
                      duration: 3,
                      delay: i * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ transformOrigin: "center" }}
                  />
                )}
                {/* Solid node */}
                <motion.circle
                  r={r}
                  fill={fill}
                  filter="url(#agent-glow)"
                  animate={
                    isHovered
                      ? { scale: 1.25 }
                      : prefersReducedMotion
                        ? undefined
                        : { scale: [1, 1.06, 1] }
                  }
                  transition={
                    isHovered
                      ? { duration: 0.2 }
                      : {
                          duration: 4,
                          delay: i * 0.3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                  style={{ transformOrigin: "center" }}
                />
                {/* Label */}
                <text
                  x={0}
                  y={r + 3.5}
                  textAnchor="middle"
                  className="fill-foreground-secondary"
                  style={{
                    fontSize: "2.4px",
                    fontWeight: 500,
                    fontFamily: "var(--font-general-sans), system-ui, sans-serif",
                    letterSpacing: "0.02em",
                  }}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover tooltip — shows the agent's role. Pointer-events auto on the
            SVG groups above; this div inherits container pointer-events-none. */}
        {hoveredNode && (
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-[280px] px-4 py-2.5 rounded-lg bg-white border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.08)] pointer-events-none"
            style={{ fontSize: "12px", color: "var(--foreground-secondary)" }}
          >
            <strong style={{ color: "var(--foreground)", fontWeight: 600 }}>
              {NODES.find((n) => n.id === hoveredNode)?.label}
            </strong>
            <p className="mt-0.5 leading-snug">
              {NODES.find((n) => n.id === hoveredNode)?.role}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
