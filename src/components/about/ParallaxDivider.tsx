"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";

export function ParallaxDivider() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const orbY1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const patternOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.03, 0.06, 0.06, 0.03]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Background gradient card */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90" />

      {/* Pattern overlay */}
      <motion.div
        className="absolute inset-0 grid-pattern pointer-events-none"
        style={{ opacity: patternOpacity }}
        aria-hidden="true"
      />

      {/* Decorative gradient orbs with parallax */}
      <motion.div
        className="absolute -top-20 -left-20 w-[50vw] h-[50vw] rounded-full bg-brand/[0.08] blur-[140px]"
        style={{ y: orbY1 }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute -bottom-20 -right-20 w-[40vw] h-[40vw] rounded-full bg-accent-cyan/[0.06] blur-[120px]"
        style={{ y: orbY2 }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] rounded-full bg-accent-violet/[0.05] blur-[100px]"
        style={{ y: orbY1 }}
        aria-hidden="true"
      />

      {/* Content with parallax */}
      <Container className="relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          style={{ y: textY }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Building the future of{" "}
            <span className="gradient-text">software from Vietnam</span>
          </h2>
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-brand" />
            <span className="h-2 w-2 rounded-full bg-brand" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-brand" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
