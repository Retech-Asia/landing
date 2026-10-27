"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

/**
 * Cinematic Engineering Journey — isolated implementation of the approved
 * ChatGPT hero concept (owner contract 2026-10-27). Staging preview only:
 * rendered at /[locale]/hero-journey, noindex; the approved Aurora hero
 * (HeroSignal) stays the production hero until this is visually superior.
 *
 * ENGINEERING COMPLETE / ASSET PENDING: everything except the photographic
 * background is implemented — scene-coordinate registration, responsive
 * cover geometry, layered path rendering, auto-run choreography (no scroll
 * pinning), milestone activation by measured path-length fraction,
 * reduced-motion static end state, visibility lifecycle, a11y. The
 * background currently renders the OWNER-APPROVED ChatGPT REFERENCE as a
 * clearly-labelled stand-in (docs/chatgpt-hero-journey-clean-master-spec:
 * references are NOT shippable assets — baked-in nav/headline). When the
 * clean master arrives, swap SCENE.image + SCENE.w/h and re-fit the five
 * milestone coords to the master's actual trough (scene % kept). No
 * fidelity claim is made beyond "registered against the approved
 * reference".
 *
 * Scene contract (spec §2): all geometry in normalized 0–1000 × 0–1000
 * scene coords; the SVG overlay uses the image's native pixel frame, so
 * background + overlay + HTML milestone labels are pixel-locked under any
 * viewport crop (single cover-sized wrapper).
 */

/** Milestones in scene-percent coords (spec §2: "scene %" — x=7 renders at
 * 7% of the frame width), fitted to the approved references. */
const MILESTONES = [
  { key: "ideas", x: 7, y: 84 },
  { key: "strategy", x: 21, y: 77 },
  { key: "design", x: 36, y: 68 },
  { key: "build", x: 52, y: 60 },
  { key: "deploy", x: 63, y: 51 },
] as const;

/** Path lead-in / continuation beyond the labelled milestones. */
const START = { x: 2.5, y: 91 };
const EXIT = { x: 72, y: 44 };

/** Stand-in frame: the approved reference's native pixel size. */
const SCENE = {
  w: 1891,
  h: 831,
  image: "/images/hero-journey/reference-stand-in.webp",
};

/** Catmull-Rom → cubic bezier through scene points, in viewBox units. */
function buildPathD(): string {
  const toPx = (p: { x: number; y: number }) => ({
    x: (p.x / 100) * SCENE.w,
    y: (p.y / 100) * SCENE.h,
  });
  const pts = [START, ...MILESTONES.map((m) => ({ x: m.x, y: m.y })), EXIT].map(toPx);
  const d: string[] = [`M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d.push(
      `C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
    );
  }
  return d.join(" ");
}

/** Choreography timeline (auto-run, ms). Path draws 0.6s→6.4s, then settles. */
const REVEAL_START = 600;
const DRAW_MS = 5800;
const SETTLE_AT = REVEAL_START + DRAW_MS + 400;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function HeroJourney() {
  const t = useTranslations("home.heroJourney");
  const tHero = useTranslations("home.hero");

  const pathRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const travelerRef = useRef<SVGCircleElement>(null);
  const [fractions, setFractions] = useState<number[] | null>(null);
  const [progress, setProgress] = useState(1); // 0–1 draw progress; 1 = complete
  const [settled, setSettled] = useState(false);
  const [staticMode, setStaticMode] = useState(false);
  const [ready, setReady] = useState(false);

  const pathD = useMemo(() => buildPathD(), []);

  // Derived timeline state (no effect-setState): static modes render the
  // completed journey directly.
  const drawProgress = staticMode ? 1 : progress;
  const isSettled = staticMode || settled;

  // Static mode: reduced-motion (contract: settled end state, no animation)
  // and small screens (contract: mobile renders the completed state).
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");
    const update = () =>
      setStaticMode(mq.matches || mobile.matches || fractions === null);
    update();
    mq.addEventListener("change", update);
    mobile.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      mobile.removeEventListener("change", update);
    };
  }, [fractions]);

  // Measure each milestone's path-length fraction (nearest sample on the
  // traced curve). Fractions drive activation during the reveal.
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    const samples = 600;
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i <= samples; i++) {
      pts.push(path.getPointAtLength((i / samples) * len));
    }
    const toPx = (m: { x: number; y: number }) => ({
      x: (m.x / 100) * SCENE.w,
      y: (m.y / 100) * SCENE.h,
    });
    const fr = MILESTONES.map((m) => {
      const target = toPx(m);
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i <= samples; i++) {
        const dx = pts[i].x - target.x;
        const dy = pts[i].y - target.y;
        const dist = dx * dx + dy * dy;
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      }
      return best / samples;
    });
    setFractions(fr);
  }, []);

  // Auto-run choreography: rAF timeline, visibility-aware, no scroll coupling.
  useEffect(() => {
    if (staticMode || fractions === null) return;
    let raf = 0;
    let elapsedBeforePause = 0;
    let pauseStart: number | null = null;
    const begin = performance.now();

    const tick = (now: number) => {
      const pauseFor =
        pauseStart !== null ? now - pauseStart : 0;
      const elapsed = now - begin - elapsedBeforePause - pauseFor;
      if (elapsed >= SETTLE_AT) {
        setProgress(1);
        setSettled(true);
        return;
      }
      const t = Math.max(0, Math.min(1, (elapsed - REVEAL_START) / DRAW_MS));
      setProgress(easeInOutCubic(t));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onVisibility = () => {
      if (document.hidden) {
        pauseStart = performance.now();
      } else if (pauseStart !== null) {
        elapsedBeforePause += performance.now() - pauseStart;
        pauseStart = null;
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [staticMode, fractions]);

  // Traveling highlight rides the reveal front (path-length driven); core +
  // glow strokes reveal together via dashoffset.
  useEffect(() => {
    const path = pathRef.current;
    const glow = glowRef.current;
    const traveler = travelerRef.current;
    if (!path || !glow || !traveler) return;
    const len = path.getTotalLength();
    const point = path.getPointAtLength(drawProgress * len);
    traveler.setAttribute("cx", point.x.toFixed(1));
    traveler.setAttribute("cy", point.y.toFixed(1));
    const dash = drawProgress * len;
    for (const p of [path, glow]) {
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len - dash}`;
    }
    setReady(true);
  }, [drawProgress]);

  const isActive = (i: number) =>
    isSettled || (fractions !== null && progress >= fractions[i]);

  return (
    <section
      aria-label={tHero("standfirst")}
      className="relative h-svh min-h-[560px] w-full overflow-hidden"
    >
      {/* Scene wrapper — single cover-sized 16:9-ratio box; the image, the
          SVG overlay and the milestone labels live inside it and can never
          descale (registration contract §2). */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "max(100%, calc(100svh * 2.2756))",
          height: "max(100%, calc(100vw / 2.2756))",
          aspectRatio: `${SCENE.w} / ${SCENE.h}`,
        }}
      >
        {/* Layer A — stand-in background (approved reference, replaced by the
            clean master when delivered). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SCENE.image}
          alt=""
          className="absolute inset-0 h-full w-full object-fill"
          draggable={false}
        />

        {/* Layer C+D — traced journey path + milestone nodes (scene-locked). */}
        <svg
          viewBox={`0 0 ${SCENE.w} ${SCENE.h}`}
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="hj-core" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#30AB47" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <filter id="hj-blur" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="10" />
            </filter>
            <filter id="hj-blur-soft" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>
          {/* Layered strokes: diffuse ambient glow → halo → bright core.
              Reveal driven by dashoffset on the shared pathLength. */}
          <path
            ref={glowRef}
            d={pathD}
            fill="none"
            stroke="#30AB47"
            strokeOpacity="0.28"
            strokeWidth="26"
            strokeLinecap="round"
            filter="url(#hj-blur)"
            style={{ opacity: ready ? 1 : 0 }}
          />
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="url(#hj-core)"
            strokeWidth="3.5"
            strokeLinecap="round"
            style={{ opacity: ready ? 1 : 0 }}
          />
          {/* Milestone nodes */}
          {MILESTONES.map((m, i) => {
            const cx = (m.x / 100) * SCENE.w;
            const cy = (m.y / 100) * SCENE.h;
            const active = isActive(i);
            return (
              <g
                key={m.key}
                opacity={active ? 1 : 0}
                style={{ transition: "opacity 600ms ease" }}
              >
                <circle cx={cx} cy={cy} r="16" fill="#30AB47" opacity="0.25" filter="url(#hj-blur-soft)" />
                <circle cx={cx} cy={cy} r="6.5" fill="#0A1A12" stroke="#5FD97A" strokeWidth="2.5" />
              </g>
            );
          })}
          {/* Traveling highlight (reveal front) */}
          {!staticMode && (
            <circle
              ref={travelerRef}
              r="7"
              fill="#CFF7DA"
              opacity={settled ? 0 : 0.95}
              style={{
                transition: "opacity 700ms ease",
                filter: "drop-shadow(0 0 8px rgba(95,217,122,0.9))",
              }}
            />
          )}
        </svg>

        {/* Milestone labels — real HTML, pixel-locked to the scene box. */}
        {MILESTONES.map((m, i) => (
          <div
            key={m.key}
            aria-hidden="true"
            className="absolute"
            style={{
              left: `${m.x}%`,
              top: `${m.y}%`,
              transform: "translate(-50%, 10px)",
              opacity: isActive(i) ? 1 : 0,
              transition: "opacity 600ms ease 120ms, transform 600ms ease 120ms",
              ...(isActive(i) ? {} : { transform: "translate(-50%, 22px)" }),
            }}
          >
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#12351d] [text-shadow:0_1px_2px_rgba(255,255,255,0.55)]">
              {t(m.key)}
            </span>
          </div>
        ))}
      </div>

      {/* Theme-aware legibility scrim: in dark mode the ivory sky cannot
          carry light text, so the left text zone gets a deep-green wash
          (deepens the atmosphere; never covers the workshop). */}
      <div
        aria-hidden="true"
        className="hj-dark-scrim pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(7,18,12,0.9) 0%, rgba(7,18,12,0.72) 30%, rgba(7,18,12,0.28) 52%, rgba(7,18,12,0.04) 68%)",
        }}
      />

      {/* Layer E — the real page UI: headline + standfirst + CTAs. */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-center px-4 pt-16 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <h1 className="font-display-title text-balance text-4xl leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {tHero("h1Pre")}
            <br />
            {tHero("h1Into")}{" "}
            <span className="text-brand">{tHero("h1Accent")}</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-foreground-secondary sm:text-lg">
            {tHero("standfirst")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact" size="lg" className="whitespace-nowrap">
              {tHero("ctaPrimary")}
            </Button>
            <Button
              href="/services"
              variant="ghost"
              size="lg"
              className="whitespace-nowrap"
            >
              {tHero("ctaSecondary")}
            </Button>
          </div>
        </div>
      </div>

      {/* Dependency statement (framing copy, not a placeholder label): the
          background is the approved reference until ChatGPT delivers the
          clean master. */}
      <p className="absolute bottom-4 left-4 z-10 max-w-xs font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-muted">
        {t("note")}
      </p>
    </section>
  );
}
