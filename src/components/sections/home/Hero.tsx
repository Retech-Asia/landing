"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/ui/Magnetic";
import { Hero3DBackground } from "@/components/three/Hero3DBackground";
import { STATS } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  Framer Motion variants                                            */
/* ------------------------------------------------------------------ */

// LCP-critical: every text element in the hero renders VISIBLE on SSR.
// We do NOT use Framer Motion's initial="hidden" + animate="visible" here
// because that requires client JS to hydrate before any hero text paints,
// which on throttled mobile networks blows out LCP (was 4.5s → now ~1s).
//
// Entrance polish is delivered by a single CSS keyframe on the container
// (.hero-content-enter in globals.css). Framer Motion is still used below
// for scroll-driven parallax (which doesn't gate first paint).
const itemVariants = {
  hidden: {},
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

/* ------------------------------------------------------------------ */
/*  Hero component                                                    */
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
      {/* Layer 1: Subtle line grid — the only background decoration we keep.
          Removed: dot pattern, 5 mesh blobs, 3 floating accent lines, 6
          geometric outlines (rotating ring, square, dot grid, plus sign,
          outlined circles, diamond, diagonal line), SVG noise overlay.
          Stripe/Vercel/Linear win by restraint, not by adding more layers. */}
      <div
        className="absolute inset-0 grid-pattern pointer-events-none z-0"
        style={{ opacity: 0.5 }}
        aria-hidden="true"
      />

      {/* Layer 2: Three radial glow spots — brand palette, breathing pulse */}
      <div
        className="absolute -top-20 -left-40 w-[700px] h-[550px] radial-glow-brand pointer-events-none z-0 animate-float"
        aria-hidden="true"
        style={{ animationDuration: "7s" }}
      />
      <div
        className="absolute top-1/3 -right-20 w-[600px] h-[450px] radial-glow-cyan pointer-events-none z-0 animate-float"
        aria-hidden="true"
        style={{ animationDuration: "9s", animationDelay: "1.5s" }}
      />
      <div
        className="absolute -bottom-20 left-1/4 w-[500px] h-[350px] radial-glow-violet pointer-events-none z-0 animate-float"
        aria-hidden="true"
        style={{ animationDuration: "11s", animationDelay: "3s" }}
      />

      {/* Layer 3: Slow-drifting radial gradient overlay — ties brand colors */}
      <div
        className="absolute inset-0 pointer-events-none z-0 animate-hero-radial-cycle"
        aria-hidden="true"
      />

      {/* Layer 4: WebGL 3D orbs — lazy-loaded, respects prefers-reduced-motion */}
      <Hero3DBackground />

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
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="hero-content-enter max-w-4xl"
          >
            {/* Headline — LCP-critical: CSS-only entrance, no JS gate. */}
            <motion.h1
              variants={itemVariants}
              className="text-[2.75rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold tracking-[-0.02em] text-foreground mb-6 text-balance"
            >
              Turning Ideas
              <br />
              into{" "}
              <span className="hero-gradient-headline">Solutions</span>
            </motion.h1>

            {/* Dynamic subtitle with rotating service type.
                No em dashes (AI telltale). No buzzword lists. Just clean,
                human copy with a rotating word that keeps the hero alive. */}
            <div className="mb-10 max-w-2xl">
              <p className="text-lg md:text-xl text-foreground-secondary leading-relaxed mb-2">
                We build{" "}
                <span
                  className="relative inline-block overflow-hidden align-baseline"
                  style={{ height: "1em", lineHeight: "1em", verticalAlign: "baseline" }}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={rotatingIndex}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-0 whitespace-nowrap font-semibold gradient-text-brand"
                      style={{ lineHeight: "1em", top: "-3px" }}
                    >
                      {rotatingServices[rotatingIndex]}
                    </motion.span>
                  </AnimatePresence>
                  {/* Invisible spacer — reserves width for the longest phrase */}
                  <span className="invisible font-semibold whitespace-nowrap" style={{ lineHeight: "1em" }}>
                    {rotatingServices.reduce((a, b) => a.length > b.length ? a : b)}
                  </span>
                </span>
                {" "}your business can rely on.
              </p>
              <p className="text-sm md:text-base text-foreground-muted">
                Vietnam-based engineering team. Global delivery.
              </p>
            </div>

            {/* CTAs — primary brand dominates, secondary is visibly subordinate.
                On mobile (<sm) buttons stack full-width for proper tap targets. */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mb-14"
            >
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
            </motion.div>

            {/* Stats — premium strip with dividers, big number + label rhythm */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-end gap-x-8 gap-y-6 sm:gap-x-12"
            >
              {STATS.map((stat, i) => (
                <div key={stat.label} className="flex items-end gap-8 sm:gap-12">
                  {i > 0 && (
                    <span
                      className="hidden sm:block h-12 w-px bg-gradient-to-b from-transparent via-foreground/15 to-transparent self-center"
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
            </motion.div>
          </motion.div>
        </Container>
      </motion.div>

      {/* Scroll-down indicator removed — was template chrome occupying
          premium above-the-fold space. Users know how to scroll. */}
    </section>
  );
}
