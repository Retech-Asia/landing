"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Rocket,
  Users,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Container } from "@/components/ui/Container";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { Magnetic } from "@/components/ui/Magnetic";
import { Hero3DBackground } from "@/components/three/Hero3DBackground";
import { STATS } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  Framer Motion variants                                            */
/* ------------------------------------------------------------------ */

/** Staggered entrance for trust badges */
const badgeContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.85 },
  },
};

const badgeItemVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Trust badges data (with icons)                                    */
/* ------------------------------------------------------------------ */

const TRUST_BADGES = [
  { label: "50+ Projects Delivered", icon: Rocket },
  { label: "30+ Expert Engineers", icon: Users },
  { label: "5+ Years of Experience", icon: Calendar },
] as const;

/* ------------------------------------------------------------------ */
/*  Hero component                                                    */
/* ------------------------------------------------------------------ */

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Stats parallax: move slower than scroll (0.6x speed)
  const statsY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  // Scroll indicator: fade opacity based on how far user has scrolled
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Scroll-driven parallax: hero content fades out and translates up
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  // Background orbs parallax: move at slower rate for depth
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const orbY3 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  // Pulsing border opacity cycle
  const pulseBorderOpacity = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1, 0],
  );

  // Prevent hydration mismatch: only render scroll-driven styles after mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Using requestAnimationFrame avoids the synchronous setState-in-effect lint.
    // The mount flag is needed to skip scroll-driven motion styles during SSR.
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const scrollToStats = useCallback(() => {
    // StatsBar is the next <section> sibling after the Hero
    const hero = sectionRef.current;
    if (hero) {
      const next = hero.nextElementSibling;
      if (next) {
        next.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Layer 1: Line grid */}
      <div className="absolute inset-0 grid-pattern pointer-events-none z-0" style={{ opacity: 0.7 }} aria-hidden="true" />

      {/* Layer 2: Dot grid overlay */}
      <div className="absolute inset-0 dot-pattern pointer-events-none z-0" style={{ opacity: 0.4 }} aria-hidden="true" />

      {/* Layer 3: Radial glow spots — breathing pulse + CSS float + scroll parallax */}
      <motion.div
        className="absolute -top-20 -left-40 w-[800px] h-[600px] radial-glow-brand pointer-events-none z-0 animate-float"
        aria-hidden="true"
        style={{ animationDuration: "6s", y: orbY1 }}
      />
      <motion.div
        className="absolute top-1/3 right-0 w-[700px] h-[500px] radial-glow-cyan pointer-events-none z-0 animate-float"
        aria-hidden="true"
        style={{ animationDuration: "7s", animationDelay: "1s", y: orbY2 }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 w-[600px] h-[400px] radial-glow-violet pointer-events-none z-0 animate-float"
        aria-hidden="true"
        style={{ animationDuration: "8s", animationDelay: "2s", y: orbY3 }}
      />

      {/* Layer 3.5: Slow-drifting radial gradient overlay — CSS-only animation */}
      <div
        className="absolute inset-0 pointer-events-none z-0 animate-hero-radial-cycle"
        aria-hidden="true"
      />

      {/* Layer 4: Flowing mesh gradient blobs — dimmed to sit behind the WebGL orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-60" aria-hidden="true">
        {/* Brand green blob — top left area */}
        <div
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full animate-mesh-1"
          style={{
            background: "radial-gradient(circle, rgba(32,133,53,0.05) 0%, transparent 70%)",
            filter: "blur(120px)",
          }}
        />
        {/* Cyan blob — center right area */}
        <div
          className="absolute top-[20%] right-[-5%] w-[50%] h-[50%] rounded-full animate-mesh-2"
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)",
            filter: "blur(150px)",
          }}
        />
        {/* Violet blob — bottom center */}
        <div
          className="absolute bottom-[-10%] left-[20%] w-[55%] h-[45%] rounded-full animate-mesh-3"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)",
            filter: "blur(130px)",
          }}
        />
        {/* Second brand blob — mid-right drift */}
        <div
          className="absolute top-[40%] right-[15%] w-[35%] h-[35%] rounded-full animate-mesh-4"
          style={{
            background: "radial-gradient(circle, rgba(32,133,53,0.03) 0%, transparent 70%)",
            filter: "blur(160px)",
          }}
        />
        {/* Cyan-violet blend — bottom right */}
        <div
          className="absolute bottom-[5%] right-[5%] w-[40%] h-[40%] rounded-full animate-mesh-5"
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.025) 0%, rgba(139,92,246,0.015) 40%, transparent 70%)",
            filter: "blur(140px)",
          }}
        />
      </div>

      {/* Layer 4.5: WebGL 3D orbs — lazy-loaded, respects prefers-reduced-motion */}
      <Hero3DBackground />

      {/* Layer 5: Floating accent lines */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[20%] left-[10%] w-32 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
        <div className="absolute top-[45%] right-[8%] w-40 h-px bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent" />
        <div className="absolute bottom-[30%] left-[20%] w-28 h-px bg-gradient-to-r from-transparent via-accent-violet/20 to-transparent" />
      </div>

      {/* Layer 6: Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Rotating ring — top right */}
        <motion.div
          className="absolute top-[15%] right-[15%] w-24 h-24 md:w-32 md:h-32 rounded-full border border-brand/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        {/* Floating square — bottom left */}
        <motion.div
          className="absolute bottom-[25%] left-[8%] w-16 h-16 md:w-20 md:h-20 rounded-lg border border-accent-cyan/10"
          animate={{ y: [-10, 10, -10], rotate: [0, 45, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Small dot grid — center right */}
        <div className="absolute top-[60%] right-[25%] grid grid-cols-3 gap-2 opacity-[0.04]">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent-violet" />
          ))}
        </div>
        {/* Plus sign — top center */}
        <motion.div
          className="absolute top-[30%] left-[55%] w-6 h-6"
          animate={{ rotate: 90 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-px bg-brand/15" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-px bg-brand/15" />
          </div>
        </motion.div>
      </div>

      {/* Layer 7: Additional floating geometric decorations */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Outlined circle — bottom right, slow drift */}
        <div
          className="absolute bottom-[18%] right-[12%] w-20 h-20 md:w-28 md:h-28 rounded-full border border-accent-violet/[0.04] animate-geo-1"
        />
        {/* Outlined diamond (rotated square) — top left, slow spin */}
        <div
          className="absolute top-[22%] left-[6%] w-12 h-12 md:w-16 md:h-16 rounded-sm border border-brand/[0.04] animate-geo-2"
        />
        {/* Thin diagonal line — mid-left, gentle float */}
        <div
          className="absolute top-[55%] left-[4%] w-24 h-px origin-left animate-geo-3"
          style={{
            background: "linear-gradient(to right, transparent, rgba(6,182,212,0.05), transparent)",
            transform: "rotate(-25deg)",
          }}
        />
        {/* Outlined circle — mid-right, slow drift */}
        <div
          className="absolute top-[35%] right-[6%] w-10 h-10 md:w-14 md:h-14 rounded-full border border-brand/[0.035] animate-geo-4"
        />
      </div>

      {/* Layer 8: Grain/noise texture overlay — SVG filter-based */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="hero-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
        </defs>
      </svg>
      <div
        className="grain-overlay z-[1]"
        aria-hidden="true"
        style={{ filter: "url(#hero-noise)" }}
      />

      {/* Bottom fade to background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-[1] pointer-events-none" />

      {/* ------------------------------------------------------------------ */}
      {/*  Hero content — scroll-driven parallax (client-only to avoid hydration mismatch) */}
      {/* ------------------------------------------------------------------ */}
      <motion.div style={mounted ? { opacity: contentOpacity, y: contentY } : undefined} className="relative z-10 w-full">
        <Container className="py-20 md:py-28">
          {/* Animated pulsing border wrapper */}
          <motion.div
            className="hero-pulse-border relative rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12"
            style={{ opacity: pulseBorderOpacity }}
          >
            <div className="max-w-4xl">
              {/* Headline with animated gradient text */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6 text-balance"
              >
                {"Turning Ideas "}
                <br />
                {"into "}
                <span className="hero-gradient-headline">
                  Solutions
                </span>
              </motion.h1>

              {/* Subtitle — typewriter reveal */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="text-lg md:text-xl text-foreground-secondary leading-relaxed max-w-2xl mb-10"
              >
                <TypewriterText
                  text="Full-cycle software development — from business analysis and design to deployment. Agile methodologies, modern technologies, and AI-driven solutions built for scalability, performance, and user experience."
                  speed={30}
                />
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.45 }}
                className="flex flex-wrap items-center gap-4 mb-10"
              >
                <Magnetic strength={6}>
                  <Button href="/contact" size="lg">
                    Get Free Consultation
                  </Button>
                </Magnetic>
                <Magnetic strength={6}>
                  <Button href="/services" variant="secondary" size="lg">
                    Explore Services
                  </Button>
                </Magnetic>
              </motion.div>

              {/* Trust badges — pill-shaped with icons */}
              <motion.div
                variants={badgeContainerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-3 mb-16"
              >
                {TRUST_BADGES.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <motion.span
                      key={badge.label}
                      variants={badgeItemVariants}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card-bg border border-card-border text-sm text-foreground-muted backdrop-blur-sm"
                    >
                      <Icon className="w-3.5 h-3.5 text-brand flex-shrink-0" aria-hidden="true" />
                      {badge.label}
                    </motion.span>
                  );
                })}
              </motion.div>

              {/* Stats — with parallax scroll effect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                style={{ y: statsY }}
                className="flex flex-wrap gap-6 sm:gap-8 md:gap-12"
              >
                {STATS.map((stat) => (
                  <div key={stat.label} className="text-center sm:text-left">
                    <div className="text-3xl md:text-4xl font-bold gradient-text-brand">
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-sm text-foreground-muted mt-1">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </motion.div>

      {/* Scroll-down indicator */}
      <motion.div
        onClick={scrollToStats}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") scrollToStats(); }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer group px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded-lg"
        style={mounted ? { opacity: indicatorOpacity } : undefined}
        aria-label="Scroll to explore"
      >
        <span className="text-xs tracking-widest uppercase text-foreground-muted/60 group-hover:text-foreground-muted transition-colors">
          Scroll to explore
        </span>
        <span className="block animate-[bounce-chevron_1.8s_ease-in-out_infinite]">
          <ChevronDown className="w-5 h-5 text-foreground-muted/60 group-hover:text-foreground-muted transition-colors" strokeWidth={1.5} />
        </span>
      </motion.div>
    </section>
  );
}
