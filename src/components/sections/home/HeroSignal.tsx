"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { LitDunes } from "./LitDunes";
import { SignalCanvas } from "./hero-signal/SignalCanvas";

/**
 * "Aurora Signal" hero (2026-10-26 owner correction on Concept II): the
 * approved Horizon Aurora (LitDunes) is RESTORED as the visual foundation,
 * and the signal narrative is layered INTO it instead of replacing it.
 * The stage is dark-cinematic in both site themes (owner-sanctioned);
 * LitDunes runs forceDark so the scene is identical either way.
 *
 * Sequence (progress p across one sticky region; 220vh mobile / 300vh desktop):
 *   0.00-0.06  atmosphere: pure Aurora dunes + dominant headline
 *   0.06-0.16  signal energy (nodes/pulses) emerges out of the terrain
 *   0.16-0.50  energy organizes into connected engineering line-work
 *   0.30-0.62  the whole environment pushes toward AR-1's vanishing point
 *   0.60-0.84  match-cut: AR-1 (the whiteboard = the realized architecture)
 *              blur-to-sharp, cool tint to warm, scale-settle
 *   0.84-1.00  brief photo-only hold, then release into the discovery section
 *
 * Owner corrections applied: the fake product-surface cards were removed
 * ("dummy ... mean nothing") — the product interfaces beat is carried by the
 * AR-1 whiteboard itself; the black dim layer is GONE; the cool tint peaks
 * at 0.22 and fully ramps out; the photo starts at brightness 0.78 /
 * blur 12px and resolves sooner.
 *
 * Implementation note: beat styles are computed from ONE quantized progress
 * state (0.005 steps) instead of per-layer useTransform MotionValues.
 * The MV-chain variant settled at stable but wrong per-layer opacities in
 * this environment (framer-motion 12.39 + React 19.2 interplay); discrete
 * state is deterministic and re-renders a small subtree ~1/frame while
 * scrolling. The canvas and LitDunes keep the raw MotionValue/ref (their
 * RAF loops read them without re-renders).
 *
 * Guards: canvas unmounts after release (GPU freed); AR-1 is lazy (below
 * the LCP frame). prefers-reduced-motion renders the static Aurora +
 * headline end frame — no sticky sequence.
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
    <section
      className="relative overflow-hidden bg-[#0A0A14] py-20 md:py-28"
      aria-label={t("h1Accent")}
    >
      <div className="absolute inset-0">
        <LitDunes forceDark />
      </div>
      {/* Localized dark vignette so the copy reads over the terrain (theme-
          independent: the stage is dark in both themes). */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 30% 36%, rgba(5, 8, 6, 0.55), transparent 72%)",
        }}
        aria-hidden="true"
      />
      <Container>
        <div className="relative max-w-3xl">
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
      </Container>
    </section>
  );
}

export function HeroSignal() {
  const t = useTranslations("home.hero");
  const reduced = useReducedMotion();
  const regionRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef(0);
  const { scrollYProgress } = useScroll({
    target: regionRef,
    offset: ["start start", "end end"],
  });

  // Quantized progress drives every beat style; canvas unmount is a discrete
  // threshold on the raw value. flowRef feeds LitDunes' uFlow without
  // re-renders.
  const [p, setP] = useState(0);
  const [canvasActive, setCanvasActive] = useState(true);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setP(Math.round(v * 200) / 200);
    setCanvasActive(v < 0.64);
    flowRef.current = seg(v, 0.05, 0.3) * (1 - seg(v, 0.55, 0.72));
  });

  if (reduced) return <StaticHero />;

  // Headline: dominant through the atmosphere beat, exits as the signal
  // organizes. The vignette tracks it so the terrain reads clean after.
  const textY = seg(p, 0.14, 0.28) * -70;
  const textOpacity = 1 - seg(p, 0.14, 0.26);

  // Scroll cue: in with the signal, out as the push begins.
  const cueOpacity = seg(p, 0.06, 0.14) * (1 - seg(p, 0.3, 0.38));

  // Environment push: dunes + line-work scale toward the vanishing point.
  const pushSeg = seg(p, 0.3, 0.62);
  const planeScale = 1 + 1.5 * pushSeg;
  const planeY = `${-5 * pushSeg}%`;

  // Signal release on the fully organized line-work — the match-cut lands
  // on AR-1's whiteboard (the "recognizable software architecture").
  const canvasOpacity = 1 - seg(p, 0.5, 0.62);

  // Cinematic exposure dip: the bright wash deepens while the line-work
  // organizes (contrast for the architecture beat), then FULLY clears
  // before the photo resolves. Nothing persists into the discovery scene.
  const dip = 0.5 * seg(p, 0.12, 0.4) * (1 - seg(p, 0.6, 0.78));

  // Match-cut: AR-1 arrives over the converged environment, blur-to-sharp,
  // gently cool to warm, scale settles 1.10 -> 1.00. No black dim layer.
  const ar1Opacity = seg(p, 0.6, 0.78);
  const cutSeg = seg(p, 0.6, 0.84);
  const ar1Scale = 1.1 - 0.1 * seg(p, 0.6, 0.88);
  const ar1Filter = `blur(${(12 * (1 - cutSeg)).toFixed(2)}px) brightness(${(0.78 + 0.22 * cutSeg).toFixed(3)})`;
  const coolTint = 0.22 * (1 - seg(p, 0.62, 0.8));

  return (
    <div ref={regionRef} className="relative h-[220vh] md:h-[300vh]" aria-label={t("h1Accent")}>
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0A0A14]">
        {/* Aurora environment: the restored LitDunes scene with the signal
            volume layered into it; both push toward the vanishing point. */}
        <div
          style={{
            transform: `scale(${planeScale.toFixed(4)}) translateY(${planeY})`,
          }}
          className="absolute inset-0 will-change-transform"
        >
          <LitDunes forceDark flowRef={flowRef} />
          <div style={{ opacity: canvasOpacity }} className="absolute inset-0">
            <SignalCanvas progress={scrollYProgress} active={canvasActive} />
          </div>
        </div>

        {/* Exposure dip (environment only: sits below the photo layer). */}
        <div
          style={{ opacity: dip }}
          className="absolute inset-0 bg-[#06090A]"
          aria-hidden="true"
        />

        {/* Match-cut: AR-1 (lazy: only needed past the LCP frame). */}
        <div style={{ opacity: ar1Opacity }} className="absolute inset-0">
          <div
            style={{ filter: ar1Filter, transform: `scale(${ar1Scale.toFixed(4)})` }}
            className="absolute inset-0 will-change-transform"
          >
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

        {/* Headline + CTAs (atmosphere beat), with a localized vignette that
            keeps the copy readable over the bright wash — exits with it. */}
        <div
          style={{
            opacity: textOpacity,
            background:
              "radial-gradient(ellipse 90% 60% at 30% 36%, rgba(5, 8, 6, 0.55), transparent 72%)",
          }}
          className="absolute inset-0"
          aria-hidden="true"
        />
        <div
          style={{ transform: `translateY(${textY.toFixed(1)}px)`, opacity: textOpacity }}
          className="absolute inset-x-0 top-0 z-10 pt-24 will-change-transform md:pt-28"
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

        {/* Thin mono scroll cue (signal beat). */}
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
