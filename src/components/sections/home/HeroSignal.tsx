"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { LitDunes } from "./LitDunes";
import { SignalCanvas } from "./hero-signal/SignalCanvas";

/**
 * "Aurora Signal" hero (Concept II, owner corrections 2026-10-26 round 3).
 *
 * THEME LAW (owner: "the light mode on the hero section is not back, please
 * read back the old code"): the stage follows the site theme exactly like
 * the previous hero (HeroHybrid) did — LitDunes with NO forced dark, the
 * shared `.hero-text-scrim` for copy readability, foreground-token text and
 * the standard Button pair. No forceDark anywhere.
 *
 * EMPTY-TAIL LAW (owner: "the empty page with photo on scrolling down from
 * the hero section is still there"): the match-cut RESOLVES AT the region
 * end — blur-to-sharp completes at p≈0.96 of 300vh, so there is no photo-only
 * hold; the settled warm photo hands off directly into DiscoverySection,
 * which carries the same AR-1 photo with the "We start with how your business
 * works" copy. Brief photo-only travel between the two is inherent and brief.
 *
 * Sequence (progress p across one sticky region; 220vh mobile / 300vh desktop):
 *   0.00-0.06  atmosphere: pure Aurora dunes + dominant headline
 *   0.06-0.16  signal energy (nodes/pulses) emerges out of the terrain
 *   0.16-0.50  energy organizes into connected engineering line-work
 *   0.30-0.66  the whole environment pushes toward AR-1's vanishing point
 *   0.66-0.84  match-cut begins: AR-1 (the whiteboard = the realized
 *              architecture) fades in over the converged environment
 *   0.66-0.96  blur-to-sharp, cool tint to warm, scale-settle — completes
 *              AT the region end (no photo-only tail)
 *   1.00       release into DiscoverySection (same photo + headline)
 *
 * Implementation note: beat styles are computed from ONE quantized progress
 * state (0.005 steps) instead of per-layer useTransform MotionValues.
 * The MV-chain variant settled at stable but wrong per-layer opacities in
 * this environment (framer-motion 12.39 + React 19.2 interplay); discrete
 * state is deterministic and re-renders a small subtree ~1/frame while
 * scrolling. The canvas and LitDunes keep the raw MotionValue/ref (their
 * RAF loops read them without re-renders).
 *
 * The exposure dip (#06090A) is a theme-neutral cinematic dim so the light
 * line-work has ground to read against in BOTH themes; it fully clears
 * before the photo resolves — nothing persists into the discovery scene.
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
    "data:image/jpeg;base64,/9j/2wBDABsSFBcUERsXFhceHBsgKEIrKCUlKFE6PTBCYFVlZF9VXVtqeJmBanGQc1tdhbWGkJ6jq62rZ4C8ybqmx5moq6T/2wBDARweHigjKE4rK06kbl1upKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKT/wAARCAAGABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEC/8QAHRAAAgICAwEAAAAAAAAAAAAAAQIAEQQxAxIh0f/EABUBAQEAAAAAAAAAAAAAAAAAAAID/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AiZHM1BQikbNb9+TD5JyH6IiimF3oitREmb//2Q==",
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
/** Linear 0..1 progress of p across [a, b]. */
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

/** Live data-theme read (same mechanism as LitDunes' theme observer). */
function useIsDarkTheme() {
  return useSyncExternalStore(
    (cb) => {
      const obs = new MutationObserver(cb);
      obs.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
      return () => obs.disconnect();
    },
    () => document.documentElement.hasAttribute("data-theme"),
    () => false,
  );
}

function StaticHero() {
  const t = useTranslations("home.hero");
  return (
    <section
      className="relative overflow-hidden bg-background py-20 md:py-28"
      aria-label={t("h1Accent")}
    >
      <div className="absolute inset-0">
        <LitDunes />
      </div>
      {/* Same theme-aware text scrim as the previous hero. */}
      <div className="absolute inset-0 hero-text-scrim" aria-hidden="true" />
      <Container>
        <div className="relative max-w-3xl">
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-foreground text-balance md:text-6xl">
            {t("h1Pre")} {t("h1Into")}{" "}
            <em className="font-display italic text-brand">{t("h1Accent")}</em>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground-secondary md:text-lg">
            {t("standfirst")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" size="lg" className="font-semibold">
              {t("ctaPrimary")}
            </Button>
            <Button href="/services" variant="ghost" size="lg">
              {t("ctaSecondary")}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function HeroSignal() {
  const t = useTranslations("home.hero");
  const reduced = useReducedMotion();
  const dark = useIsDarkTheme();
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
    setCanvasActive(v < 0.7);
    flowRef.current = seg(v, 0.05, 0.3) * (1 - seg(v, 0.6, 0.78));
  });

  if (reduced) return <StaticHero />;

  // Headline: dominant through the atmosphere beat, exits as the signal
  // organizes. The theme-aware scrim tracks it so the terrain reads clean
  // after.
  const textY = seg(p, 0.14, 0.28) * -70;
  const textOpacity = 1 - seg(p, 0.14, 0.26);

  // Scroll cue: in with the signal, out as the push begins.
  const cueOpacity = seg(p, 0.06, 0.14) * (1 - seg(p, 0.3, 0.38));

  // Environment push: dunes + line-work scale toward the vanishing point.
  const pushSeg = seg(p, 0.3, 0.66);
  const planeScale = 1 + 1.5 * pushSeg;
  const planeY = `${-5 * pushSeg}%`;

  // Signal release on the fully organized line-work — the match-cut lands
  // on AR-1's whiteboard (the "recognizable software architecture").
  const canvasOpacity = 1 - seg(p, 0.56, 0.68);

  // Cinematic exposure dip, theme-branched: dark mode deepens the wash for
  // the architecture beat; light mode only takes a subtle green veil (a
  // near-black wash over the pastel dunes reads as mud — verified capture
  // 2026-10-26 — and the deep-green line-work needs no dark ground). Both
  // fully clear before the photo resolves.
  const dipPeak = dark ? 0.5 : 0.14;
  const dip = dipPeak * seg(p, 0.12, 0.4) * (1 - seg(p, 0.66, 0.82));

  // Match-cut: AR-1 arrives over the converged environment, blur-to-sharp,
  // gently cool to warm, scale settles 1.10 -> 1.00 — completing AT the
  // region end so there is no photo-only hold (owner correction).
  const ar1Opacity = seg(p, 0.66, 0.84);
  const cutSeg = seg(p, 0.66, 0.96);
  const ar1Scale = 1.1 - 0.1 * seg(p, 0.66, 0.97);
  const ar1Filter = `blur(${(12 * (1 - cutSeg)).toFixed(2)}px) brightness(${(0.78 + 0.22 * cutSeg).toFixed(3)})`;
  const coolTint = 0.22 * (1 - seg(p, 0.68, 0.88));

  return (
    <div ref={regionRef} className="relative h-[220vh] md:h-[300vh]" aria-label={t("h1Accent")}>
      <div className="sticky top-0 h-screen overflow-hidden bg-background">
        {/* Aurora environment: the theme-following LitDunes scene with the
            signal volume layered into it; both push toward the vanishing
            point. */}
        <div
          style={{
            transform: `scale(${planeScale.toFixed(4)}) translateY(${planeY})`,
          }}
          className="absolute inset-0 will-change-transform"
        >
          <LitDunes flowRef={flowRef} />
          <div style={{ opacity: canvasOpacity }} className="absolute inset-0">
            <SignalCanvas progress={scrollYProgress} active={canvasActive} />
          </div>
        </div>

        {/* Exposure dip (environment only: sits below the photo layer). */}
        <div
          style={{ opacity: dip }}
          className={dark ? "absolute inset-0 bg-[#06090A]" : "absolute inset-0 bg-[#0A2417]"}
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

        {/* Headline + CTAs (atmosphere beat), with the shared theme-aware
            hero text scrim (same treatment as the previous hero) whose
            opacity exits with the copy. */}
        <div
          style={{ opacity: textOpacity }}
          className="absolute inset-0 hero-text-scrim pointer-events-none"
          aria-hidden="true"
        />
        <div
          style={{ transform: `translateY(${textY.toFixed(1)}px)`, opacity: textOpacity }}
          className="absolute inset-x-0 top-0 z-10 pt-24 will-change-transform md:pt-28"
        >
          <Container>
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-foreground text-balance md:text-6xl lg:text-7xl">
                {t("h1Pre")} {t("h1Into")}{" "}
                <em className="font-display italic text-brand">{t("h1Accent")}</em>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground-secondary md:text-lg">
                {t("standfirst")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact" size="lg" className="font-semibold">
                  {t("ctaPrimary")}
                </Button>
                <Button href="/services" variant="ghost" size="lg">
                  {t("ctaSecondary")}
                </Button>
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
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/45">
            Scroll
          </p>
          <div className="mx-auto mt-2 h-8 w-px bg-foreground/25" />
        </div>
      </div>
    </div>
  );
}
