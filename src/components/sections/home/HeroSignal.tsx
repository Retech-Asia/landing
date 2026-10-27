"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { LitDunes } from "./LitDunes";
import { SignalCanvas } from "./hero-signal/SignalCanvas";
import { DiscoverySection } from "./DiscoverySection";

/**
 * "Aurora Signal" hero + Discovery arrival — ONE coordinated sequence
 * (owner redesign brief 2026-10-27, superseding the declined match-cut).
 *
 * WHY THE PREVIOUS TRANSITION WAS REPLACED (owner, 2026-10-27): the old
 * choreography collapsed the Aurora into a radial-line starburst, pushed the
 * dunes 2.5x into a flat wash, held a long photo-only beat, and handed off
 * to a second, independently-cropped AR-1 rendering in DiscoverySection —
 * a visible duplicate-photo boundary. The fix is structural, not cosmetic:
 *
 * ONE STAGE, ONE PHOTO — the discovery beat lives INSIDE this sticky stage.
 * AR-1 is rendered exactly once: it arrives through a short shared-layer
 * mask reveal whose origin is the whiteboard zone, and its settled frame
 * IS the discovery section (copy included). After release the settled frame
 * scrolls away as one unit into ServicesGallery — there is no second image,
 * no crop jump, no seam.
 *
 * Sequence (progress p across one sticky region; 170vh mobile / 180vh
 * desktop — deliberately short: every 10% of p ≈ 7-8vh of scroll and each
 * beat carries a visible transformation):
 *   0.00-0.10  opening: pure Aurora dunes + headline + CTAs (approved look)
 *   0.10-0.30  transformation: flow-lane line-work rises out of the dunes
 *              and organizes into connected workflow streams bending through
 *              the whiteboard zone; headline exits early (no dead space)
 *   0.30-0.68  photographic reveal: AR-1 emerges from the hub via an
 *              expanding clip-path mask (soft radius), blur-to-sharp, cool
 *              to warm, gentle settle 1.14 -> 1.00; the environment only
 *              breathes (scale 1 -> 1.06, never the 2.5x blow-up)
 *   0.58-0.76  discovery arrival: as the photo becomes recognizable the
 *              "We start with how your business works" copy enters
 *              (number/label, h2, body) with its scrim and settles fully
 *              readable BEFORE release
 *   0.76-1.00  settled discovery frame (photo + copy) — short, then release
 *
 * LAWS carried forward: hero follows the site theme (no forceDark; the
 * exposure dip is theme-branched and fully clears before the photo
 * resolves — nothing dark persists into the discovery scene); first-visit
 * theme default light; AR-1 object position identical to the old
 * DiscoverySection (center 38%); no persistent overlays into the photo.
 *
 * Guards: canvas unmounts after the reveal (GPU freed); AR-1 is lazy;
 * prefers-reduced-motion renders the static Aurora hero + the static
 * DiscoverySection (kept in the tree for exactly this); hero CTAs drop
 * pointer-events once faded (no invisible hotzones mid-transition).
 *
 * Rollback: swap page.tsx back to HeroHybrid + DiscoverySection (both kept).
 */

const AR1 = {
  src: "/images/studio/ar1-discovery-whiteboard.jpg",
  alt: "Engineering workshop wall with business process, system architecture, and user experience sketches",
  blurDataURL:
    "data:image/jpeg;base64,/9j/2wBDABsSFBcUERsXFhceHBsgKEIrKCUlKFE6PTBCYFVlZF9VXVtqeJmBanGQc1tdhbWGkJ6jq62rZ4C8ybqmx5moq6T/2wBDARweHigjKE4rK06kbl1upKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKT/wAARCAAGABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEC/8QAHRAAAgICAwEAAAAAAAAAAAAAAQIAEQQxAxIh0f/EABUBAQEAAAAAAAAAAAAAAAAAAAID/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AiZHM1BQikbNb9+TD5JyH6IiimF3oitREmb//2Q==",
};

/** Start box of the mask reveal: ~30% x 22% centered on the whiteboard
    zone (52% x / 42% y — the old match-cut's hub). */
const CLIP_START = { top: 31, right: 33, bottom: 47, left: 37, radius: 20 };

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

function StaticOpening() {
  const t = useTranslations("home.hero");
  return (
    <>
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
      {/* Reduced motion: the discovery beat renders statically, exactly as
          it did before the sequence existed. */}
      <DiscoverySection />
    </>
  );
}

export function HeroSignal() {
  const tHero = useTranslations("home.hero");
  const tDiscovery = useTranslations("home.discovery");
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
    setCanvasActive(v < 0.62);
    flowRef.current = seg(v, 0.06, 0.26) * (1 - seg(v, 0.42, 0.6));
  });

  if (reduced) return <StaticOpening />;

  // — Opening: headline dominant, quick exit as the lanes rise —
  const textY = seg(p, 0.1, 0.22) * -56;
  const textOpacity = 1 - seg(p, 0.1, 0.2);

  // Scroll cue: in at rest, out as the transformation begins.
  const cueOpacity = seg(p, 0.03, 0.09) * (1 - seg(p, 0.16, 0.24));

  // — Transformation: the environment breathes toward the hub (gentle; the
  // old 2.5x push flattened the dunes into a wash — never again). —
  const breathe = seg(p, 0.12, 0.5);
  const planeScale = 1 + 0.06 * breathe;
  const planeY = `${-2 * breathe}%`;

  // Theme-branched exposure dip: a quiet dim so the light line-work reads in
  // BOTH themes; fully clears before the photo completes (no dark residue
  // in the discovery scene — owner law).
  const dipPeak = dark ? 0.34 : 0.1;
  const dip = dipPeak * seg(p, 0.14, 0.34) * (1 - seg(p, 0.5, 0.7));

  // — Photographic reveal: shared-layer mask expanding from the hub —
  const ar1Opacity = seg(p, 0.3, 0.4);
  const reveal = seg(p, 0.3, 0.68);
  const clip = {
    top: CLIP_START.top + (0 - CLIP_START.top) * reveal,
    right: CLIP_START.right + (0 - CLIP_START.right) * reveal,
    bottom: CLIP_START.bottom + (0 - CLIP_START.bottom) * reveal,
    left: CLIP_START.left + (0 - CLIP_START.left) * reveal,
    radius: CLIP_START.radius * (1 - reveal),
  };
  const clipPath = `inset(${clip.top.toFixed(1)}% ${clip.right.toFixed(1)}% ${clip.bottom.toFixed(1)}% ${clip.left.toFixed(1)}% round ${clip.radius.toFixed(1)}px)`;
  // Inside the mask: blur clears first, then exposure warms, scale settles.
  const ar1Blur = 9 * (1 - seg(p, 0.3, 0.62));
  const ar1Bright = 0.8 + 0.2 * seg(p, 0.3, 0.78);
  const ar1Scale = 1.14 - 0.14 * seg(p, 0.3, 0.72);
  const coolTint = 0.18 * (1 - seg(p, 0.42, 0.72));

  // — Discovery arrival: copy + scrim enter as the photo becomes
  // recognizable and settle fully readable before release. —
  const copyIn = seg(p, 0.58, 0.76);
  const copyY = (1 - copyIn) * 26;
  const scrimOpacity = copyIn;

  return (
    <div ref={regionRef} className="relative h-[170vh] md:h-[180vh]" aria-label={tHero("h1Accent")}>
      <div className="sticky top-0 h-screen overflow-hidden bg-background">
        {/* Aurora environment: the theme-following LitDunes scene with the
            flow-lane signal volume layered into it; both breathe toward the
            hub and are eventually covered by the photo. */}
        <div
          style={{
            transform: `scale(${planeScale.toFixed(4)}) translateY(${planeY})`,
          }}
          className="absolute inset-0 will-change-transform"
        >
          <LitDunes flowRef={flowRef} />
          <div style={{ opacity: 1 - seg(p, 0.44, 0.58) }} className="absolute inset-0">
            <SignalCanvas progress={scrollYProgress} active={canvasActive} />
          </div>
        </div>

        {/* Exposure dip (environment only: sits below the photo layer). */}
        <div
          style={{ opacity: dip }}
          className={dark ? "absolute inset-0 bg-[#06090A]" : "absolute inset-0 bg-[#0A2417]"}
          aria-hidden="true"
        />

        {/* The AR-1 reveal — rendered ONCE. The clip opens from the hub;
            the settled full-bleed frame IS the discovery backdrop. */}
        <div
          style={{ opacity: ar1Opacity, clipPath }}
          className="absolute inset-0 will-change-[clip-path]"
        >
          <div
            style={{
              filter: `blur(${ar1Blur.toFixed(2)}px) brightness(${ar1Bright.toFixed(3)})`,
              transform: `scale(${ar1Scale.toFixed(4)})`,
            }}
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

        {/* Discovery scrim (identical treatment to the old DiscoverySection,
            riding in with the copy so the settled frame matches exactly). */}
        <div
          style={{ opacity: scrimOpacity }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 max-md:from-black/90 max-md:via-black/45"
          aria-hidden="true"
        />

        {/* Discovery copy — the arrival beat. Same layout/tokens as the old
            DiscoverySection: number/label, display h2, body, lower-left. */}
        <div
          style={{
            transform: `translateY(${copyY.toFixed(1)}px)`,
            opacity: copyIn,
          }}
          className="absolute inset-x-0 bottom-0 z-10 will-change-transform"
        >
          <Container className="pb-16 pt-24 md:pb-24">
            <div className="max-w-2xl">
              <p className="font-display text-base text-white/90" aria-hidden="true">
                <span className="font-semibold">{tDiscovery("number")}</span>
                <span className="text-white/60"> {tDiscovery("label")}</span>
              </p>
              <h2 className="mt-4 font-display-title text-3xl leading-[1.15] text-white text-balance md:text-5xl">
                {tDiscovery("title")}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/70 md:text-lg">
                {tDiscovery("body")}
              </p>
            </div>
          </Container>
        </div>

        {/* Hero headline + CTAs (opening beat) with the shared theme-aware
            hero text scrim, both exiting as the lanes rise. Pointer events
            drop once faded so no invisible CTA hotzone rides the transition. */}
        <div
          style={{ opacity: textOpacity }}
          className="absolute inset-0 hero-text-scrim pointer-events-none"
          aria-hidden="true"
        />
        <div
          style={{
            transform: `translateY(${textY.toFixed(1)}px)`,
            opacity: textOpacity,
            pointerEvents: textOpacity <= 0 ? "none" : "auto",
          }}
          className="absolute inset-x-0 top-0 z-10 pt-24 will-change-transform md:pt-28"
        >
          <Container>
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-foreground text-balance md:text-6xl lg:text-7xl">
                {tHero("h1Pre")} {tHero("h1Into")}{" "}
                <em className="font-display italic text-brand">{tHero("h1Accent")}</em>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground-secondary md:text-lg">
                {tHero("standfirst")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact" size="lg" className="font-semibold">
                  {tHero("ctaPrimary")}
                </Button>
                <Button href="/services" variant="ghost" size="lg">
                  {tHero("ctaSecondary")}
                </Button>
              </div>
            </div>
          </Container>
        </div>

        {/* Thin mono scroll cue (opening beat). */}
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
