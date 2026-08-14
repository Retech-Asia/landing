"use client";

/**
 * Constellation hero visualization.
 *
 * Stars representing real Retech shipped work (case studies + recent AI
 * blog posts), positioned organically by tier with deterministic jitter.
 * Connections between related stars. Hover shows tooltip, click navigates
 * immediately (tooltip is supplementary and never gates the click).
 *
 * Tech: pure SVG + CSS animations + minimal JS for parallax + tooltip.
 * No Three.js. SSR-friendly (SVG renders in initial HTML).
 *
 * Constraints honored:
 *   - Tier 3 stars all connect to at least one other star (no orphans)
 *   - Mobile (< 768px): hidden entirely, clean text-only hero
 *   - Click always navigates immediately, tooltip never gates
 *   - Jitter via hashSeed(id) — deterministic across SSR + client
 *   - DOM/tab order sorted by tier (flagships first)
 *   - Reduced-motion aware
 *   - LCP-safe (decorative, aria-hidden on the SVG, links accessible separately)
 */

import { useEffect, useMemo, useRef, useState } from "react";
import {
  STARS_SORTED_FOR_KEYBOARD,
  CONNECTIONS,
  TIER_STYLES,
  jitterPosition,
  type ConstellationStar,
} from "@/lib/constellation-data";

const VIEWBOX_W = 1000;
const VIEWBOX_H = 700;
const TOOLTIP_DELAY_MS = 200;
const PARALLAX_RANGE_PX = 8;

/* ── Precompute jittered positions once ── */

const STARS_WITH_POSITIONS = STARS_SORTED_FOR_KEYBOARD.map((star) => ({
  star,
  position: jitterPosition(star),
}));

const CONNECTIONS_WITH_POSITIONS = CONNECTIONS.map((conn) => {
  const from = STARS_WITH_POSITIONS.find((s) => s.star.id === conn.from)!;
  const to = STARS_WITH_POSITIONS.find((s) => s.star.id === conn.to)!;
  const midX = (from.position.x + to.position.x) / 2;
  const midY = (from.position.y + to.position.y) / 2;
  // Perpendicular offset for slight curve — deterministic via connection id
  const dx = to.position.x - from.position.x;
  const dy = to.position.y - from.position.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const curveAmount = Math.min(len * 0.1, 25);
  // Use a stable sign based on connection ids so curve direction is deterministic
  const sign = (conn.from.charCodeAt(0) + conn.to.charCodeAt(0)) % 2 === 0 ? 1 : -1;
  const perpX = (-dy / len) * curveAmount * sign;
  const perpY = (dx / len) * curveAmount * sign;
  return {
    id: `${conn.from}::${conn.to}`,
    from: conn.from,
    to: conn.to,
    fromPos: from.position,
    toPos: to.position,
    midPos: { x: midX + perpX, y: midY + perpY },
  };
});

/* ── Main component ── */

export function ConstellationHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredStarId, setHoveredStarId] = useState<string | null>(null);
  const [tooltipReady, setTooltipReady] = useState<string | null>(null);
  const tooltipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Parallax: single rAF loop, updates two CSS variables ──
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointer = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1; // -1..1
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      targetX = x * PARALLAX_RANGE_PX;
      targetY = y * PARALLAX_RANGE_PX;
      if (rafId === null) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const tick = () => {
      // Simple lerp toward target
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      if (containerRef.current) {
        containerRef.current.style.setProperty("--parallax-x", `${currentX.toFixed(2)}px`);
        containerRef.current.style.setProperty("--parallax-y", `${currentY.toFixed(2)}px`);
      }
      // Continue if not settled
      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    };

    window.addEventListener("pointermove", handlePointer, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointer);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // ── Tooltip delay handler ──
  const handleStarEnter = (starId: string) => {
    setHoveredStarId(starId);
    if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
    tooltipTimerRef.current = setTimeout(() => {
      setTooltipReady(starId);
    }, TOOLTIP_DELAY_MS);
  };

  const handleStarLeave = () => {
    setHoveredStarId(null);
    setTooltipReady(null);
    if (tooltipTimerRef.current) {
      clearTimeout(tooltipTimerRef.current);
      tooltipTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
    };
  }, []);

  // ── Tooltip position (in screen coords, computed from SVG bbox) ──
  const tooltipData = useMemo(() => {
    if (!tooltipReady || !svgRef.current) return null;
    const starWithPos = STARS_WITH_POSITIONS.find((s) => s.star.id === tooltipReady);
    if (!starWithPos) return null;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = rect.width / VIEWBOX_W;
    const scaleY = rect.height / VIEWBOX_H;
    return {
      star: starWithPos.star,
      left: starWithPos.position.x * scaleX,
      top: starWithPos.position.y * scaleY,
    };
  }, [tooltipReady]);

  // ── Connected-line brightening: which connections involve the hovered star ──
  const activeConnectionIds = useMemo(() => {
    if (!hoveredStarId) return new Set<string>();
    return new Set(
      CONNECTIONS_WITH_POSITIONS.filter(
        (c) => c.from === hoveredStarId || c.to === hoveredStarId,
      ).map((c) => c.id),
    );
  }, [hoveredStarId]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none hidden md:block"
      aria-hidden="true"
      style={{
        // Mask: fade out left 35% so constellation doesn't compete with headline
        maskImage:
          "linear-gradient(to right, transparent 0%, transparent 30%, black 55%, black 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, transparent 30%, black 55%, black 100%)",
        ["--parallax-x" as string]: "0px",
        ["--parallax-y" as string]: "0px",
      }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        style={{
          transform:
            "translate(var(--parallax-x, 0), var(--parallax-y, 0))",
          transition: "transform 0.2s ease-out",
        }}
      >
        <defs>
          {/* Soft glow filter for stars */}
          <filter id="star-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Connection layer (behind stars) ── */}
        <g className="connections">
          {CONNECTIONS_WITH_POSITIONS.map((conn) => {
            const path = `M ${conn.fromPos.x} ${conn.fromPos.y} Q ${conn.midPos.x} ${conn.midPos.y} ${conn.toPos.x} ${conn.toPos.y}`;
            const isActive = activeConnectionIds.has(conn.id);
            return (
              <path
                key={conn.id}
                d={path}
                fill="none"
                stroke="currentColor"
                strokeWidth={1}
                className={`connection ${isActive ? "connection--active" : ""}`}
                style={{
                  color: "var(--foreground-muted)",
                  opacity: isActive ? 0.6 : 0.15,
                  transition: "opacity 0.2s ease-out",
                }}
              />
            );
          })}
        </g>

        {/* ── Star layer ── */}
        {/* Stars are <a> elements for accessibility. pointer-events on the
            group is auto so hover works; the outer container is pointer-none
            but these <a> children re-enable their own pointer events. */}
        <g className="stars" style={{ pointerEvents: "auto" }}>
          {STARS_WITH_POSITIONS.map(({ star, position }) => {
            const style = TIER_STYLES[star.tier];
            const isHovered = hoveredStarId === star.id;
            return (
              <a
                key={star.id}
                href={star.href}
                aria-label={star.label}
                className="constellation-star"
                style={{ cursor: "pointer" }}
                onMouseEnter={() => handleStarEnter(star.id)}
                onMouseLeave={handleStarLeave}
                onFocus={() => handleStarEnter(star.id)}
                onBlur={handleStarLeave}
              >
                <g
                  transform={`translate(${position.x} ${position.y})`}
                  style={{
                    transition: "transform 0.2s ease-out",
                    transformOrigin: "center",
                  }}
                >
                  {/* Halo — pulsing expand */}
                  <circle
                    r={style.haloRadius}
                    fill={style.haloColor}
                    opacity={0.35}
                    style={{
                      transformOrigin: "center",
                      animation: `star-halo-pulse ${style.pulseDuration} ease-in-out infinite`,
                    }}
                  />
                  {/* Core */}
                  <circle
                    r={style.coreRadius * (isHovered ? 1.25 : 1)}
                    fill={style.coreColor}
                    filter="url(#star-glow)"
                    style={{
                      transformOrigin: "center",
                      transition: "r 0.2s ease-out",
                    }}
                  />
                  {/* Label — always visible for Tier 1+2, hover-only for Tier 3 */}
                  <text
                    y={style.coreRadius + 16}
                    textAnchor="middle"
                    fill="currentColor"
                    className={`star-label star-label--tier-${star.tier}`}
                    style={{
                      color: star.tier === 3 ? "var(--foreground-muted)" : "var(--foreground-secondary)",
                      fontSize: star.tier === 1 ? "13px" : star.tier === 2 ? "11px" : "9px",
                      fontWeight: star.tier === 1 ? 600 : 500,
                      opacity: style.labelAlwaysVisible || isHovered ? 1 : 0,
                      transition: "opacity 0.2s ease-out",
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                  >
                    {star.shortLabel}
                  </text>
                </g>
              </a>
            );
          })}
        </g>
      </svg>

      {/* ── Tooltip (HTML overlay so it can use real fonts + wrap properly) ── */}
      {tooltipData && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            left: tooltipData.left,
            top: tooltipData.top - 12,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div
            className="bg-card-bg border border-card-border rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.10)] px-4 py-3 max-w-[240px]"
            role="tooltip"
          >
            <p className="text-sm font-semibold text-foreground leading-snug">
              {tooltipData.star.label}
            </p>
            <p className="text-xs text-foreground-secondary mt-1 leading-snug">
              {tooltipData.star.description}
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {tooltipData.star.tech.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-brand/[0.06] text-brand"
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-foreground-muted mt-2 italic">
              Click to read more
            </p>
          </div>
          {/* Arrow */}
          <div
            className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-card-bg border-r border-b border-card-border"
            style={{ transform: "translate(-50%, 0) rotate(45deg)" }}
          />
        </div>
      )}
    </div>
  );
}
