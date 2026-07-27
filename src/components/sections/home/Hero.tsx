"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/ui/Magnetic";
// Hero3DBackground swapped for ConstellationHero — SVG stars representing
// real shipped Retech work (case studies + recent AI blog posts), with
// connections showing semantic relationships. No Three.js.
import { ConstellationHero } from "@/components/sections/home/ConstellationHero";
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
  // Starts after 1.5s (lets headline settle), cycles every 2.5s.
  const rotatingServices = [
    "CMS platforms",
    "CRM systems",
    "ERP solutions",
    "AI products",
    "web apps",
  ];
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
      {/* Background: subtle grid pattern (low opacity). */}
      <div
        className="absolute inset-0 grid-pattern pointer-events-none z-0"
        style={{ opacity: 0.4 }}
        aria-hidden="true"
      />

      {/* Constellation of shipped work — stars on right side representing
          real Retech case studies + recent AI blog posts. Connections
          show semantic relationships. Hover any star for a tooltip,
          click to navigate. Desktop-only (mobile gets clean text hero).
          Replaces the previous 3D orbs scene. */}
      <ConstellationHero />

      {/* Text scrim — left-to-right gradient that darkens the left portion
          of the hero so the headline stays readable over any star halo. */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, var(--background) 0%, var(--background) 30%, transparent 60%)",
        }}
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
          <div className="hero-content-enter max-w-4xl">
            {/* Headline — LCP-critical: CSS-only entrance, no JS gate.
                Instrument Serif italic on "Solutions" carries the emphasis
                without gradient text (gradient was a critical AI tell). */}
            <h1
              className="text-[2.75rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold tracking-[-0.02em] text-foreground mb-6 text-balance"
            >
              Turning Ideas
              <br />
              into{" "}
              <span className="italic text-brand">Solutions</span>
            </h1>

            {/* Dynamic subtitle with rotating service type. */}
            <div className="mb-10 max-w-2xl">
              <p className="text-lg md:text-xl text-foreground-secondary leading-relaxed mb-2">
                We build{" "}
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
                {" "}your business can rely on.
              </p>
              <p className="text-sm md:text-base text-foreground-muted">
                AI-integrated engineering for web, mobile, and cloud products.
                Shipped from Vietnam to teams worldwide.
              </p>
            </div>

            {/* CTAs — primary brand dominates, secondary is visibly subordinate. */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mb-14">
              <Magnetic strength={6}>
                <Button
                  href="/contact"
                  size="lg"
                  className="font-semibold w-full sm:w-auto"
                >
                  Get Free Consultation
                </Button>
              </Magnetic>
              <Magnetic strength={4}>
                <Button
                  href="/services"
                  variant="secondary"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  Explore Services
                </Button>
              </Magnetic>
            </div>

            {/* Stats — premium strip with dividers, big number + label rhythm */}
            <div className="flex flex-wrap items-end gap-x-6 gap-y-6 sm:gap-x-10">
              {STATS.map((stat, i) => (
                <div key={stat.label} className="flex items-end">
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
                    <p className="text-xs sm:text-sm text-foreground-muted mt-2 tracking-wide">
                      {stat.label}
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
