"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/ui/Magnetic";
import { Link } from "@/i18n/navigation";
// Hero ambient gradient (LatticeField is the historical component name;
// the implementation is now a fragment-shader gradient plane — see
// LatticeField.tsx for the recipe). Four drifting brand color sources,
// right-biased on desktop, full-coverage on mobile. Idle-deferred so it
// never blocks LCP.
import { LatticeField } from "@/components/sections/home/LatticeField";
import { STATS } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  Hero — Stripe-style minimal. Pure typography, no decorative 3D.   */
/*                                                                    */
/*  Previously: 4 layers of background decoration (grid pattern, 3    */
/*  radial glow blobs, animated radial overlay, Three.js orbs).       */
/*  Now: just a subtle grid pattern. Stripe / Vercel / Linear win by  */
/*  restraint. The visual showcase moves to a dedicated section       */
/*  below the hero (ProductShowcase + SuccessStories).                */
/* ------------------------------------------------------------------ */

export function Hero() {
  const t = useTranslations("home.hero");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Hero content: fades and lifts as user scrolls into the next section
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.55], [0, -60]);

  // Prevent hydration mismatch: only render scroll-driven styles after mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Rotating service type — cycles through what we build.
  // Pulled from message catalog so it renders in the active locale.
  const rotatingServices = t.raw("rotatingServices") as string[];
  const [rotatingIndex, setRotatingIndex] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setRotatingIndex((prev) => (prev + 1) % rotatingServices.length);
    }, 2500);
    return () => clearTimeout(timer);
  }, [rotatingIndex, rotatingServices.length]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      {/* Background layers (bottom to top):
          1. LatticeField shader (four drifting brand-colored light sources)
          2. Grid pattern overlay (blend-mode: overlay) — engineering texture
             on top of the gradient, Stripe/Linear-style. Both layers are
             masked so the headline area stays readable. */}
      <LatticeField />
      <div
        className="absolute inset-0 grid-pattern hero-grid-overlay pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Text scrim — responsive gradient that keeps the headline readable
          over the shader. Desktop: left-to-right (dark behind the text
          column, transparent where the shader peaks on the right).
          Mobile: top-to-bottom (dark over the headline area, fading to
          transparent below). */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none hero-text-scrim"
        aria-hidden="true"
      />

      {/* Bottom fade to background — soft transition into StatsBar */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-[1] pointer-events-none"
        aria-hidden="true"
      />

      {/* ------------------------------------------------------------------ */}
      {/*  Hero content                                                       */}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        style={mounted ? { opacity: contentOpacity, y: contentY } : undefined}
        className="relative z-10 w-full"
      >
        <Container className="py-20 md:py-28">
          <div className="hero-content-enter max-w-4xl text-center md:text-left mx-auto">
            {/* SEO H1 — visually hidden. The visible tagline below is the
                brand voice; this h1 gives crawlers an unambiguous primary
                heading that pairs the company name with Vietnam positioning
                and core service keywords. Tagline is aria-hidden so screen
                readers get one clean H1 rather than two competing headings. */}
            <h1 className="sr-only">
              {t("seoH1")}
            </h1>

            {/* Visible tagline — LCP-critical: CSS-only entrance, no JS gate.
                Instrument Serif italic on "Solutions" carries the emphasis
                without gradient text (gradient was a critical AI tell).
                Rendered as a <p> with aria-hidden so it does not compete with
                the SEO H1 above; visual styling is unchanged. */}
            <p
              aria-hidden="true"
              className="text-[2.75rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold tracking-[-0.02em] text-foreground mb-6 text-balance"
            >
              {t("taglinePre")}
              <br />
              {t("taglineInto")}{" "}
              <span className="font-display italic text-brand">{t("taglineAccent")}</span>
            </p>

            {/* Dynamic subtitle with rotating service type. */}
            <div className="mb-10 max-w-2xl">
              <p className="text-lg md:text-xl text-foreground-secondary leading-relaxed mb-2">
                {t("subheadLead")}{" "}
                <span className="inline-block font-semibold align-baseline">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={rotatingIndex}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="inline-block gradient-text-brand whitespace-nowrap"
                    >
                      {rotatingServices[rotatingIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
                {" "}{t("subheadTrail")}
              </p>
              <p className="text-sm md:text-base text-foreground-muted">
                {t("mutedLine")}
              </p>
            </div>

            {/* CTAs — primary brand dominates, secondary is visibly subordinate. */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center md:justify-start gap-3 sm:gap-4 mb-14">
              <Magnetic strength={6}>
                <Button
                  href="/contact"
                  size="lg"
                  className="font-semibold w-full sm:w-auto"
                >
                  {t("ctaPrimary")}
                </Button>
              </Magnetic>
              <Magnetic strength={4}>
                <Button
                  href="/services"
                  variant="secondary"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  {t("ctaSecondary")}
                </Button>
              </Magnetic>
            </div>

            {/* Stats — premium strip with dividers, big number + label rhythm */}
            <div className="flex flex-wrap items-end justify-center md:justify-start gap-x-6 gap-y-6 sm:gap-x-10">
              {STATS.map((stat, i) => (
                <div key={stat.label.en} className="flex items-end">
                  {i > 0 && (
                    <span
                      className="hidden sm:block h-12 w-px bg-gradient-to-b from-transparent via-foreground/15 to-transparent self-center mr-6 sm:mr-10"
                      aria-hidden="true"
                    />
                  )}
                  <div>
                    <div className="text-4xl md:text-5xl font-bold gradient-text-brand leading-none tracking-tight">
                      <AnimatedCounter
                        target={stat.value}
                        suffix={stat.suffix}
                      />
                    </div>
                    <p className="text-sm text-foreground-muted mt-2 tracking-wide">
                      {stat.label[locale as "en" | "vi"]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
