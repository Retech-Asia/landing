"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Testimonial } from "@/lib/case-studies-data";

/* -------------------------------------------------------------------------- */
/*  1. Hero Parallax Section                                                  */
/* -------------------------------------------------------------------------- */

interface HeroParallaxSectionProps {
  industry: string;
  title: string;
  tagline: string;
  description: string;
}

export function HeroParallaxSection({
  industry,
  title,
  tagline,
  description,
}: HeroParallaxSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Background orbs move slower (parallax)
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const orbY3 = useTransform(scrollYProgress, [0, 1], [0, 60]);
  // Grid/dot patterns move at a different rate
  const patternY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  // Content moves at normal speed (no transform = no parallax)
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section
      ref={sectionRef}
      className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden"
    >
      {/* Parallax gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          style={{ y: orbY1 }}
          className="absolute -top-40 -left-40 w-[60vw] h-[60vw] rounded-full bg-brand/[0.04] blur-[140px]"
        />
        <motion.div
          style={{ y: orbY2 }}
          className="absolute -bottom-20 -right-20 w-[50vw] h-[50vw] rounded-full bg-accent-cyan/[0.03] blur-[160px]"
        />
        <motion.div
          style={{ y: orbY3 }}
          className="absolute top-1/3 right-1/4 w-[40vw] h-[40vw] rounded-full bg-accent-violet/[0.02] blur-[120px]"
        />
      </div>

      {/* Parallax grid/dot patterns */}
      <motion.div
        style={{ y: patternY }}
        className="absolute inset-0 grid-pattern pointer-events-none opacity-40"
        aria-hidden="true"
      />
      <motion.div
        style={{ y: patternY }}
        className="absolute inset-0 dot-pattern pointer-events-none opacity-20"
        aria-hidden="true"
      />

      {/* Content with subtle counter-parallax */}
      <Container className="relative z-10">
        <motion.div style={{ y: contentY }}>
          <AnimatedSection>
            <BreadcrumbNav
              items={[
                { label: "Home", href: "/" },
                { label: "Case Studies", href: "/case-studies" },
                { label: title },
              ]}
            />
            <p className="text-xs font-medium uppercase tracking-wider text-foreground-muted mb-4 mt-4">
              {industry}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-foreground-muted font-medium mb-6">
              {tagline}
            </p>
            <p className="text-lg text-foreground-secondary max-w-3xl leading-relaxed">
              {description}
            </p>
          </AnimatedSection>
        </motion.div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  2. Technology Pills Stagger                                               */
/* -------------------------------------------------------------------------- */

interface TechPillsStaggerProps {
  technologies: string[];
}

export function TechPillsStagger({ technologies }: TechPillsStaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.07 } },
      }}
      className="flex flex-wrap justify-center gap-3"
    >
      {technologies.map((tech) => (
        <motion.span
          key={tech}
          variants={{
            hidden: { opacity: 0, scale: 0.8, y: 12 },
            visible: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { duration: 0.35, ease: "easeOut" },
            },
          }}
        >
          <Badge variant="outline" className="text-sm px-4 py-2">
            {tech}
          </Badge>
        </motion.span>
      ))}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  3. Testimonial Card with Decorative Quote                                 */
/* -------------------------------------------------------------------------- */

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <AnimatedSection>
      <div className="max-w-3xl mx-auto">
        <Card hover={false} padding="none" className="relative overflow-hidden">
          {/* Large decorative quote mark behind text */}
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="absolute top-4 right-6 md:top-2 md:right-10 select-none pointer-events-none"
            style={{ fontSize: "10rem", lineHeight: 1 }}
            aria-hidden="true"
          >
            <span className="bg-gradient-to-br from-brand/10 to-accent-violet/10 bg-clip-text text-transparent font-serif">
              {"\u201C"}
            </span>
          </motion.span>

          <div className="border-l-4 border-brand p-8 md:p-10 relative z-10">
            {/* Small quote icon */}
            <svg
              width={32}
              height={32}
              viewBox="0 0 24 24"
              fill="none"
              className="text-brand/30 mb-4"
              aria-hidden="true"
            >
              <path
                d="M10 8C10 5.79 8.21 4 6 4C3.79 4 2 5.79 2 8C2 10.21 3.79 12 6 12C6.34 12 6.67 11.96 6.99 11.89C6.94 13.49 6.52 15.06 5.53 16.53C4.9 17.45 4.1 18.27 3.12 18.97L4.88 21.03C6.15 20.13 7.2 19.1 8.03 17.93C9.6 15.73 10.01 13.27 10 11.41V8ZM22 8C22 5.79 20.21 4 18 4C15.79 4 14 5.79 14 8C14 10.21 15.79 12 18 12C18.34 12 18.67 11.96 18.99 11.89C18.94 13.49 18.52 15.06 17.53 16.53C16.9 17.45 16.1 18.27 15.12 18.97L16.88 21.03C18.15 20.13 19.2 19.1 20.03 17.93C21.6 15.73 22.01 13.27 22 11.41V8Z"
                fill="currentColor"
              />
            </svg>

            <blockquote className="text-lg md:text-xl text-foreground-secondary italic leading-relaxed mb-6">
              {testimonial.quote}
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-black/[0.06]" aria-hidden="true" />
            </div>
            <div className="mt-4">
              <p className="text-base font-bold text-foreground">
                {testimonial.author}
              </p>
              <p className="text-sm text-foreground-muted">
                {testimonial.role}, {testimonial.company}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </AnimatedSection>
  );
}

/* -------------------------------------------------------------------------- */
/*  4. Before/After Divider (animated visual separator)                       */
/* -------------------------------------------------------------------------- */

export function BeforeAfterDivider() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
      }}
      className="mt-12 flex items-center justify-center gap-4"
    >
      <motion.div
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          visible: { scaleX: 1, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
        }}
        className="h-px w-24 md:w-32 bg-gradient-to-r from-transparent via-brand/30 to-brand/60 origin-left"
      />
      <motion.div
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
        }}
        className="w-2 h-2 rounded-full bg-brand/60 shrink-0"
      />
      <motion.div
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          visible: { scaleX: 1, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
        }}
        className="h-px w-24 md:w-32 bg-gradient-to-l from-transparent via-brand/30 to-brand/60 origin-right"
      />
    </motion.div>
  );
}
