"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { Magnetic } from "@/components/ui/Magnetic";

import { useRef, useState, useCallback } from "react";

/* ── Floating decorative shapes with mouse parallax ── */
function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring following for parallax
  const springX = useSpring(mouseX, { stiffness: 40, damping: 30, mass: 1 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30, mass: 1 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Normalize to -1..1 from center
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Circle — top-left (parallax factor 1) */}
      <motion.div
        style={{ x: useTransform(springX, (v) => v * 12), y: useTransform(springY, (v) => v * 12) }}
        className="absolute top-[12%] left-[8%] w-16 h-16 rounded-full border border-brand/[0.10] animate-geo-1"
      />
      {/* Filled dot — top-right (parallax factor 0.6) */}
      <motion.div
        style={{ x: useTransform(springX, (v) => v * 8), y: useTransform(springY, (v) => v * 8) }}
        className="absolute top-[18%] right-[12%] w-3 h-3 rounded-full bg-accent-cyan/[0.18] animate-geo-2"
      />
      {/* Ring — bottom-right (parallax factor 1.4) */}
      <motion.div
        style={{ x: useTransform(springX, (v) => v * 16), y: useTransform(springY, (v) => v * 16) }}
        className="absolute bottom-[15%] right-[10%] w-20 h-20 rounded-full border border-accent-cyan/[0.08] animate-geo-3"
      />
      {/* Small dot cluster — bottom-left (parallax factor 0.8) */}
      <motion.div
        style={{ x: useTransform(springX, (v) => v * 10), y: useTransform(springY, (v) => v * 10) }}
        className="absolute bottom-[20%] left-[6%] animate-geo-4"
      >
        <div className="w-2 h-2 rounded-full bg-brand/[0.14] mb-3" />
        <div className="w-2 h-2 rounded-full bg-accent-cyan/[0.12] ml-4" />
      </motion.div>
      {/* Mid-size circle — center-left (parallax factor 0.5) */}
      <motion.div
        style={{ x: useTransform(springX, (v) => v * 6), y: useTransform(springY, (v) => v * 6) }}
        className="absolute top-[45%] left-[3%] w-10 h-10 rounded-full border border-accent-violet/[0.08] animate-geo-2"
      />
      {/* Small filled circle — center-right (parallax factor 1.2) */}
      <motion.div
        style={{ x: useTransform(springX, (v) => v * 14), y: useTransform(springY, (v) => v * 14) }}
        className="absolute top-[55%] right-[5%] w-5 h-5 rounded-full bg-brand/[0.10] animate-geo-1"
      />
      {/* Rotating triangle — bottom-left (parallax factor 1.8) */}
      <motion.div
        style={{ x: useTransform(springX, (v) => v * 20), y: useTransform(springY, (v) => v * 20) }}
        className="absolute bottom-[25%] left-[15%] w-12 h-12 md:w-16 md:h-16"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
            <polygon
              points="50,5 95,90 5,90"
              fill="none"
              stroke="rgba(32,133,53,0.08)"
              strokeWidth="2"
            />
          </svg>
        </motion.div>
      </motion.div>
      {/* Rotating diamond — top-right area (parallax factor 2) */}
      <motion.div
        style={{ x: useTransform(springX, (v) => v * 24), y: useTransform(springY, (v) => v * 24) }}
        className="absolute top-[8%] right-[20%] w-10 h-10 md:w-14 md:h-14"
      >
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
            <polygon
              points="50,2 98,50 50,98 2,50"
              fill="none"
              stroke="rgba(6,182,212,0.07)"
              strokeWidth="2"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ── Trust indicators ── */
const trustItems = [
  { label: "Free consultation" },
  { label: "Estimate within 24 hours" },
  { label: "No commitment required" },
];

function TrustIndicators() {
  return (
    <StaggerContainer className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8" staggerDelay={0.1}>
      {trustItems.map((item) => (
        <StaggerItem key={item.label}>
          <div className="flex items-center gap-1.5 text-sm text-foreground-muted">
            <CheckCircle className="w-4 h-4 text-brand shrink-0" />
            <span>{item.label}</span>
          </div>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

/* ── Scroll-triggered split-text reveal ── */
function ScrollSplitText({ text, baseDelay = 0 }: { text: string; baseDelay?: number }) {
  const words = text.split(" ");

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 0.5,
                delay: baseDelay + i * 0.08,
                ease: [0.25, 0.4, 0.25, 1],
              },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ── Main CTA section ── */
export function HomeCTA() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Gradient orb background — brand green + cyan */}
      <GradientBackground variant="cta" />

      {/* Animated gradient mesh background */}
      <AnimatedBackground intensity="subtle" />

      {/* Floating decorative shapes */}
      <FloatingShapes />

      <Container className="relative z-10">
        <AnimatedSection>
          <div className="max-w-2xl mx-auto text-center">
            {/* Animated heading with per-word scroll reveal */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4 text-balance">
              <ScrollSplitText text="Let&apos;s Ship Your Product" />
              <br />
              <span className="relative inline-block">
                <span className="gradient-text">
                  <ScrollSplitText text="— On Time &amp; On Budget" baseDelay={0.25} />
                </span>
                {/* Shimmer overlay */}
                <motion.span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                  animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                    ease: "easeInOut",
                  }}
                  aria-hidden="true"
                />
              </span>
            </h2>

            <p className="text-lg text-foreground-secondary mb-10 max-w-lg mx-auto">
              Get a detailed project plan and estimate within 24 hours. From first call to production deployment — we have done it 50+ times.
            </p>

            {/* CTA buttons — primary + ghost outline */}
            <div className="flex flex-wrap justify-center gap-4 relative">
              {/* Pulsing glow behind primary CTA */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 pointer-events-none" aria-hidden="true">
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: "radial-gradient(ellipse, rgba(32,133,53,0.18) 0%, rgba(6,182,212,0.08) 40%, transparent 70%)",
                    animation: "cta-pulse-glow 3s ease-in-out infinite",
                  }}
                />
              </div>
              <Magnetic strength={5}>
                <Button href="/contact" size="lg">
                  Get Your Free Estimate
                </Button>
              </Magnetic>
              <Magnetic strength={5}>
                <Button href="/case-studies" variant="secondary" size="lg">
                  View Our Work
                </Button>
              </Magnetic>
            </div>

            {/* Trust indicators */}
            <TrustIndicators />
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
