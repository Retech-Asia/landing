"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { SignalCanvas } from "./hero-signal/SignalCanvas";
import { SurfacePanels } from "./hero-signal/SurfacePanels";

/**
 * Concept II "Signal to System" hero (owner-approved 2026-10-26) with the
 * cinematic hero-to-discovery transition. Spec: agent/uiux-audit/
 * hallmark-concept2-keyframes-ar1-2026-10-26.md
 *
 * One sticky scroll region, native scroll only (no trapping): outer height
 * 320vh desktop / 240vh mobile (100vh end frame + 220vh / 140vh transition,
 * inside the "about 200vh, adjustable" target). Beats:
 *   0 (p=0)      end frame: H1 + CTA + triptych idle over faint schematic
 *   1 (0-0.28)   surfaces flatten + freeze, text exits up, scroll cue in
 *   2 (0.28-0.62) push in; line-work converges to AR-1's vanishing point
 *   3 (0.62-0.88) match-cut: AR-1 blur-to-sharp + dark-cool to warm ramp
 *   4 (0.88-1)   canvas unmounted, AR-1 sharp; flow releases to discovery
 *
 * Implementation note: beat styles are computed from ONE quantized progress
 * state (0.005 steps) instead of per-layer useTransform MotionValues.
 * The MV-chain variant settled at stable but wrong per-layer opacities in
 * this environment (framer-motion 12.39 + React 19.2 interplay); discrete
 * state is deterministic and re-renders a small subtree ~1/frame while
 * scrolling. The canvas keeps the raw MotionValue (its RAF loop reads it
 * without re-renders and rendered correctly throughout).
 *
 * Guards per correction 7: at most one live surface set and only at rest
 * (idle ticks freeze the moment scrolling starts); canvas RAF pauses when
 * hidden/off-screen and unmounts at beat 4; AR-1 is lazy (below the LCP
 * frame). prefers-reduced-motion renders the static triptych end frame and
 * a hard rule into the discovery section - no sticky sequence.
 *
 * Rollback: swap page.tsx back to HeroHybrid (file kept in the tree).
 */

const AR1 = {
  src: "/images/studio/ar1-discovery-whiteboard.jpg",
  alt: "Engineering workshop wall with business process, system architecture, and user experience sketches",
  blurDataURL:
    "data:image/jpeg;base64,/9j/2wBDABsSFBcUERsXFhceHBsgKEIrKCUlKFE6PTBCYFVlZF9VXVtqeJmBanGQc1tdhbWGkJ6jq62rZ4C8ybqmx5moq6T/2wBDARweHigjKE4rK06kbl1upKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKT/wAARCAAGABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEC/8QAHRAAAgICAwEAAAAAAAAAAAAAAQIAEQQxAxIh0f/EABUBAQEAAAAAAAAAAAAAAAAAAAID/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AiZHM1BQikbNb9+TD5JyH6IiimF3oitREmb//2Q==",
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
/** Linear 0..1 progress of p across [a, b]. */
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

function StaticHero() {
  const t = useTranslations("home.hero");
  return (
    <section className="relative overflow-hidden bg-[#0A0A14] py-20 md:py-28" aria-label={t("h1Accent")}>
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white text-balance md:text-6xl">
            {t("h1Pre")} {t("h1Into")}{" "}
            <em className="font-display italic text-brand">{t("h1Accent")}</em>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
            {t("standfirst")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              {t("ctaPrimary")}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
        <div className="mt-14">
          <SurfacePanels frozen layout="static" />
        </div>
      </Container>
    </section>
  );
}

export function HeroSignal() {
  const t = useTranslations("home.hero");
  const reduced = useReducedMotion();
  const regionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: regionRef,
    offset: ["start start", "end end"],
  });

  // Quantized progress drives every beat style; canvas unmount and surface
  // freeze are discrete thresholds on the raw value.
  const [p, setP] = useState(0);
  const [canvasActive, setCanvasActive] = useState(true);
  const [frozen, setFrozen] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setP(Math.round(v * 200) / 200);
    setCanvasActive(v < 0.88);
    setFrozen(v > 0.02);
  });

  if (reduced) return <StaticHero />;

  // Beat 1: text exit + surface flatten; cue appears.
  const textY = seg(p, 0, 0.22) * -90;
  const textOpacity = 1 - seg(p, 0, 0.16);
  const stageSeg = seg(p, 0, 0.3);
  const stageScale = 1 - 0.14 * stageSeg;
  const stageY = stageSeg * -24;
  const stageOpacity = 1 - seg(p, 0.1, 0.34);
  const dim = 0.45 * seg(p, 0, 0.25);
  const cueOpacity = seg(p, 0.06, 0.16) * (1 - seg(p, 0.5, 0.6));

  // Beat 2: push into the plane (scale toward the vanishing point).
  const pushSeg = seg(p, 0.28, 0.62);
  const planeScale = 1 + 1.6 * pushSeg;
  const planeY = `${-6 * pushSeg}%`;

  // Beat 3: match-cut. AR-1 fades in exactly on the converged line-work
  // (same vanishing point), blur-to-sharp, dark-cool to warm exposure ramp.
  const ar1Opacity = seg(p, 0.62, 0.8);
  const cutSeg = seg(p, 0.62, 0.88);
  const ar1Filter = `blur(${(18 * (1 - cutSeg)).toFixed(2)}px) brightness(${(0.6 + 0.4 * cutSeg).toFixed(3)})`;
  const coolTint = 0.55 * (1 - seg(p, 0.62, 0.9));
  const canvasOpacity = 1 - seg(p, 0.6, 0.72);

  return (
    <div ref={regionRef} className="relative h-[240vh] md:h-[320vh]" aria-label={t("h1Accent")}>
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0A0A14]">
        {/* Signal volume: canvas fades out on the converged line-work, then
            unmounts entirely at beat 4 (GPU released). */}
        <div style={{ opacity: canvasOpacity }} className="absolute inset-0">
          <div
            style={{ transform: `scale(${planeScale.toFixed(4)}) translateY(${planeY})` }}
            className="absolute inset-0"
          >
            <SignalCanvas progress={scrollYProgress} active={canvasActive} />
          </div>
        </div>

        {/* Beat 3: AR-1 match-cut layer (lazy: only needed past the LCP frame). */}
        <div style={{ opacity: ar1Opacity }} className="absolute inset-0">
          <div style={{ filter: ar1Filter }} className="absolute inset-0">
            <Image
              src={AR1.src}
              alt={AR1.alt}
              fill
              sizes="100vw"
              loading="lazy"
              placeholder="blur"
              blurDataURL={AR1.blurDataURL}
              className="object-cover object-[center_38%]"
            />
          </div>
          <div
            style={{ opacity: coolTint }}
            className="absolute inset-0 bg-[#141B2E]/80 mix-blend-multiply"
            aria-hidden="true"
          />
        </div>

        {/* Beat 1 environment dim step. */}
        <div style={{ opacity: dim }} className="absolute inset-0 bg-black" aria-hidden="true" />

        {/* Beat 0 end frame: statement + CTAs + triptych stage. */}
        <div
          style={{ transform: `translateY(${textY.toFixed(1)}px)`, opacity: textOpacity }}
          className="absolute inset-x-0 top-0 z-10 pt-24 md:pt-28 will-change-transform"
        >
          <Container>
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white text-balance md:text-6xl lg:text-7xl">
                {t("h1Pre")} {t("h1Into")}{" "}
                <em className="font-display italic text-brand">{t("h1Accent")}</em>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
                {t("standfirst")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
                >
                  {t("ctaPrimary")}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
                >
                  {t("ctaSecondary")}
                </Link>
              </div>
            </div>
          </Container>
        </div>

        <div
          style={{
            transform: `translateY(${stageY.toFixed(1)}px) scale(${stageScale.toFixed(4)})`,
            opacity: stageOpacity,
          }}
          className="absolute inset-x-0 bottom-10 z-10 flex justify-center px-4 will-change-transform md:bottom-14"
        >
          <SurfacePanels frozen={frozen} layout="stage" />
        </div>

        {/* Thin mono scroll cue (beat 1). */}
        <div
          style={{ opacity: cueOpacity }}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
          aria-hidden="true"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
            Scroll
          </p>
          <div className="mx-auto mt-2 h-8 w-px bg-white/25" />
        </div>
      </div>
    </div>
  );
}
