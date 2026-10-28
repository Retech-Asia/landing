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
 * ASSET STATUS (2026-10-28): background = ChatGPT clean desktop master
 * DRAFT v1 (1672×941 — below production resolution). Integrated as a
 * composition/animation test only per owner direction; milestones and the
 * nine terrain waypoints are re-registered to THIS master's actual hills.
 * The production-resolution master and the independently composed mobile
 * background remain outstanding; final asset approval is a separate owner
 * review. Not a fidelity claim beyond "registered against master draft v1".
 *
 * Scene contract (spec §2): all geometry in normalized 0–1000 × 0–1000
 * scene coords; the SVG overlay uses the image's native pixel frame, so
 * background + overlay + HTML milestone labels are pixel-locked under any
 * viewport crop (single cover-sized wrapper).
 */

/** Milestones in scene-percent coords (spec §2: "scene %" — x=7 renders at
 * 7% of the frame width), registered to master draft v1's hills: Ideas on
 * the left networked slope, Strategy its crest, Design the misty saddle,
 * Build the bright mound flank, Deploy the crest shoulder. */
const MILESTONES = [
  { key: "ideas", x: 10, y: 72 },
  { key: "strategy", x: 26, y: 59 },
  { key: "design", x: 44, y: 58 },
  { key: "build", x: 62, y: 48 },
  { key: "deploy", x: 75, y: 47 },
] as const;

/** Path lead-in / continuation: enters from the lower-left foliage and
 * finishes walking into the workshop deck zone (upper right). */
const START = { x: 4, y: 86 };
const EXIT = { x: 86, y: 52 };

/** Terrain-following intermediate waypoints (scene %) between the labelled
 * milestones — traced from master draft v1 (5%-grid overlay): the route
 * sags into the foliage gap, runs the left hill crest, dips through the
 * misty saddle, then climbs and wraps the bright mound before the deck. */
const CURVE = [
  { x: 15, y: 78 }, // sag below Ideas into the foliage gap
  { x: 20, y: 66 }, // climb the left slope
  { x: 32, y: 56 }, // run the left hill crest (highest of the first hill)
  { x: 38, y: 62 }, // dip toward the misty saddle
  { x: 49, y: 62 }, // second sag in the saddle's mist zone
  { x: 55, y: 56 }, // climb the bright mound's skirt
  { x: 68, y: 43 }, // mound crest, densest network lines
  { x: 81, y: 50 }, // descend toward the workshop deck
] as const;

/** Full render order: lead-in, milestone, two terrain points, next
 * milestone, …, mound crest point, exit. */
const ROUTE: ReadonlyArray<{ x: number; y: number }> = [
  START,
  MILESTONES[0],
  CURVE[0],
  CURVE[1],
  MILESTONES[1],
  CURVE[2],
  CURVE[3],
  MILESTONES[2],
  CURVE[4],
  CURVE[5],
  MILESTONES[3],
  CURVE[6],
  MILESTONES[4],
  CURVE[7],
  EXIT,
];

/** Scene frame: master draft v1's native pixel size (1672×941). */
const SCENE = {
  w: 1672,
  h: 941,
  image: "/images/hero-journey/master-desktop-v1.webp",
};

/** Cover-fit ratio derived from the scene, so master swaps never leave a
 * stale hardcoded ratio behind. */
const SCENE_AR = (SCENE.w / SCENE.h).toFixed(4);

/** Catmull-Rom → cubic bezier through scene points, in viewBox units. */
function buildPathD(): string {
  const toPx = (p: { x: number; y: number }) => ({
    x: (p.x / 100) * SCENE.w,
    y: (p.y / 100) * SCENE.h,
  });
  const pts = ROUTE.map(toPx);
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

/** Comet tail length behind the traveling energy highlight (viewBox units). */
const COMET_TAIL = 110;

export function HeroJourney() {
  const t = useTranslations("home.heroJourney");
  const tHero = useTranslations("home.hero");

  const pathRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const poolRef = useRef<SVGPathElement>(null);
  const cometRef = useRef<SVGPathElement>(null);
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

  // Traveling highlight rides the reveal front (path-length driven); every
  // luminous layer reveals via dashoffset. The comet is a short bright
  // segment whose LEADING edge tracks the reveal front (dasharray math:
  // offset = COMET_TAIL - dash keeps the segment ending at the front).
  useEffect(() => {
    const path = pathRef.current;
    const glow = glowRef.current;
    const pool = poolRef.current;
    const comet = cometRef.current;
    const traveler = travelerRef.current;
    if (!path || !glow || !pool || !comet || !traveler) return;
    const len = path.getTotalLength();
    const point = path.getPointAtLength(drawProgress * len);
    traveler.setAttribute("cx", point.x.toFixed(1));
    traveler.setAttribute("cy", point.y.toFixed(1));
    const dash = drawProgress * len;
    for (const p of [path, glow, pool]) {
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len - dash}`;
    }
    comet.style.strokeDasharray = `${COMET_TAIL} ${len}`;
    comet.style.strokeDashoffset = `${COMET_TAIL - dash}`;
    setReady(true);
  }, [drawProgress]);

  const isActive = (i: number) =>
    isSettled || (fractions !== null && progress >= fractions[i]);

  return (
    <section
      aria-label={tHero("standfirst")}
      className="relative h-svh min-h-[560px] w-full overflow-hidden"
    >
      {/* Scene wrapper — single cover-sized box at the scene's aspect ratio;
          the image, the SVG overlay and the milestone labels live inside it
          and can never descale (registration contract §2). */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: `max(100%, calc(100svh * ${SCENE_AR}))`,
          height: `max(100%, calc(100vw / ${SCENE_AR}))`,
          aspectRatio: `${SCENE.w} / ${SCENE.h}`,
        }}
      >
        {/* Layer A — clean master draft v1 background (composition test;
            production-resolution master outstanding). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SCENE.image}
          alt=""
          className="absolute inset-0 h-full w-full object-fill"
          draggable={false}
        />

        {/* Layer A.5 — theme-aware legibility washes, UNDER the path layer:
            they carry the left text zone (headline/standfirst/CTAs and the
            milestone labels) but never dim the luminous route. */}
        <div
          aria-hidden="true"
          className="hj-scrim-light pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(243,238,224,0.88) 0%, rgba(243,238,224,0.62) 28%, rgba(243,238,224,0.18) 52%, rgba(243,238,224,0) 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="hj-scrim-dark pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(7,18,12,0.9) 0%, rgba(7,18,12,0.72) 30%, rgba(7,18,12,0.28) 52%, rgba(7,18,12,0.04) 68%)",
          }}
        />

        {/* Layer C+D — traced journey path + milestone nodes (scene-locked). */}
        <svg
          viewBox={`0 0 ${SCENE.w} ${SCENE.h}`}
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="hj-core" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#2FBF59" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
            <filter id="hj-blur" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="10" />
            </filter>
            <filter id="hj-blur-wide" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="17" />
            </filter>
            <filter id="hj-blur-soft" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
            <filter id="hj-blur-fine" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2.5" />
            </filter>
          </defs>
          {/* Layered luminous route — ambient terrain pool → halo → bright
              core. Pool + halo render with screen blending so the light
              sits IN the landscape (illuminates hills) instead of floating
              over it. Reveal driven by dashoffset on the shared pathLength. */}
          <g style={{ mixBlendMode: "screen" }} opacity={ready ? 1 : 0}>
            <path
              ref={poolRef}
              d={pathD}
              fill="none"
              stroke="#2FBF59"
              strokeOpacity="0.12"
              strokeWidth="54"
              strokeLinecap="round"
              filter="url(#hj-blur-wide)"
            />
            <path
              ref={glowRef}
              d={pathD}
              fill="none"
              stroke="url(#hj-core)"
              strokeOpacity="0.42"
              strokeWidth="13"
              strokeLinecap="round"
              filter="url(#hj-blur)"
            />
          </g>
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="url(#hj-core)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ opacity: ready ? 1 : 0 }}
          />
          {/* Comet: bright energy segment riding the reveal front; fades in
              the settled end state (static/reduced-motion never shows it). */}
          <g
            style={{
              mixBlendMode: "screen",
              opacity: ready && !isSettled ? 1 : 0,
              transition: "opacity 700ms ease",
            }}
          >
            <path
              ref={cometRef}
              d={pathD}
              fill="none"
              stroke="#D9FFE6"
              strokeOpacity="0.85"
              strokeWidth="5.5"
              strokeLinecap="round"
              filter="url(#hj-blur-fine)"
            />
          </g>
          {/* Milestone nodes — halo + white-cored ring + one-shot activation
              pulse (suppressed in static/reduced-motion mode). */}
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
                <circle cx={cx} cy={cy} r="18" fill="#30AB47" opacity="0.3" filter="url(#hj-blur-soft)" />
                {active && !staticMode && !isSettled && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r="8"
                    fill="none"
                    stroke="#6FF08C"
                    strokeWidth="2"
                    className="hj-pulse"
                  />
                )}
                <circle cx={cx} cy={cy} r="7.5" fill="#0A1A12" stroke="#6FF08C" strokeWidth="2.5" />
                <circle cx={cx} cy={cy} r="2.2" fill="#FFFFFF" />
              </g>
            );
          })}
          {/* Traveling energy spark (reveal front) — screen-blended so it
              reads as emitted light, gently pulsing while it rides. */}
          {!staticMode && (
            <g
              style={{
                mixBlendMode: "screen",
                opacity: settled ? 0 : 1,
                transition: "opacity 700ms ease",
              }}
            >
              <circle
                ref={travelerRef}
                r="7"
                fill="#EAFFF2"
                className="hj-spark"
                style={{ filter: "drop-shadow(0 0 10px rgba(140,255,180,0.95))" }}
              />
            </g>
          )}
        </svg>

        {/* Milestone labels — real HTML, pixel-locked to the scene box.
            Dark chip + light type so the stage reads on any terrain. */}
        {MILESTONES.map((m, i) => (
          <div
            key={m.key}
            aria-hidden="true"
            className="absolute"
            style={{
              left: `${m.x}%`,
              top: `${m.y}%`,
              transform: "translate(-50%, 12px)",
              opacity: isActive(i) ? 1 : 0,
              transition: "opacity 600ms ease 120ms, transform 600ms ease 120ms",
              ...(isActive(i) ? {} : { transform: "translate(-50%, 26px)" }),
            }}
          >
            <span className="inline-block border border-white/15 bg-[#07120C]/75 px-2 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E3F4E8] shadow-[0_2px_10px_rgba(4,12,7,0.45)] backdrop-blur-[2px]">
              {t(m.key)}
            </span>
          </div>
        ))}
      </div>

      {/* Layer E — the real page UI: headline + standfirst + CTAs. Positioned
          high in the clear-sky zone; the whole luminous route (incl. glow
          spill) stays below the text/CTA safe area at every animation stage. */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-start px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8">
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
    </section>
  );
}
