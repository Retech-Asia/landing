"use client";

import { Container } from "@/components/ui/Container";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax for decorative elements at different speeds
  const shapeY1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const shapeY2 = useTransform(scrollYProgress, [0, 1], [25, -25]);
  const shapeY3 = useTransform(scrollYProgress, [0, 1], [55, -55]);

  return (
    <section ref={sectionRef} className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
      <GradientBackground variant="hero" />
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-50" aria-hidden="true" />
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-25" aria-hidden="true" />

      {/* Decorative floating shapes with parallax */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Large slow-spinning ring — top right */}
        <motion.div
          className="absolute top-[20%] right-[10%] w-20 h-20 rounded-full border border-brand/[0.08] animate-spin"
          style={{ y: shapeY1, animationDuration: '50s' }}
        />
        {/* Small floating square — bottom left */}
        <motion.div
          className="absolute bottom-[30%] left-[5%] w-12 h-12 rounded-lg border border-accent-cyan/[0.08] animate-float-slow"
          style={{ y: shapeY2 }}
        />
        {/* Small floating circle — middle right */}
        <motion.div
          className="absolute top-[60%] right-[25%] w-8 h-8 rounded-full border border-accent-violet/[0.06] animate-float-slow"
          style={{ y: shapeY3, animationDelay: '-3s', animationDuration: '8s' }}
        />
        {/* Medium floating circle — top left */}
        <motion.div
          className="absolute top-[15%] left-[20%] w-16 h-16 rounded-full border border-brand/[0.05] animate-float-slow"
          style={{ y: shapeY2, animationDelay: '-5s', animationDuration: '12s' }}
        />
      </div>

      <Container className="relative z-10">
        <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "About" }]} />
        <AnimatedSection>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance">
            About Retech Solutions
          </h1>
          <p className="text-lg md:text-xl text-foreground-secondary max-w-3xl leading-relaxed">
            We provide full-cycle software development services — from business
            analysis and design through development, testing, and deployment for
            solutions across web and mobile applications.
          </p>
        </AnimatedSection>
      </Container>
    </section>
  );
}
