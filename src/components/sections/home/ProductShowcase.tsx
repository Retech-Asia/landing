"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const products = [
  {
    name: "Wellness Platform",
    tagline: "Next-Generation Wellness Platform",
    description:
      "A lifestyle and wellness application designed to empower users with personalized health insights, real-time analytics, and an integrated Women's Health Card.",
    features: [
      "Enhanced credential security",
      "Seamless login experiences",
      "Real-time health analytics",
    ],
    dashboard: {
      src: "/images/stock/cs-wellness-dashboard.webp",
      width: 1168,
      height: 874,
    },
    mobile: {
      src: "/images/stock/cs-wellness-mobile.webp",
      width: 364,
      height: 744,
    },
    href: "/case-studies/wellness-platform",
  },
  {
    name: "Asset Management Platform",
    tagline: "Investment Management System",
    description:
      "A comprehensive web-based investment management system with interconnected admin, customer, and introducer portals for scalable financial operations.",
    features: [
      "Multi-portal architecture",
      "Secure data handling",
      "Real-time portfolio tracking",
    ],
    dashboard: {
      src: "/images/stock/cs-asset-dashboard.webp",
      width: 1168,
      height: 908,
    },
    mobile: {
      src: "/images/stock/cs-asset-mobile.webp",
      width: 364,
      height: 744,
    },
    href: "/case-studies/asset-management-platform",
  },
];

/* ── Mobile / tablet layout — alternating text/image rows (no pinning).
    Kept as a separate component so the sticky-stack branch can be
    desktop-only without duplicating content markup. ── */
function FlatList() {
  return (
    <div className="space-y-24 md:space-y-32 lg:hidden">
      {products.map((product, index) => (
        <AnimatedSection key={product.name}>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${
              index % 2 !== 0 ? "[direction:rtl]" : ""
            }`}
          >
            <motion.div
              className={index % 2 !== 0 ? "[direction:ltr]" : ""}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {product.name}
              </h3>
              <p className="text-foreground-muted font-medium text-sm mb-4">
                {product.tagline}
              </p>
              <p className="text-foreground-secondary leading-relaxed mb-6">
                {product.description}
              </p>
              <ul className="space-y-3 mb-8">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm text-foreground-secondary"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full border border-brand/30 shrink-0" aria-hidden="true">
                      <Check size={12} className="text-brand" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={product.href}
                className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:gap-3 transition-all py-2 -my-2 px-1 -mx-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded-sm"
              >
                View Case Study <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`group relative h-[260px] md:h-[400px] rounded-2xl overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.08)] border border-black/[0.06] ${index % 2 !== 0 ? "md:order-2" : ""}`}
            >
              <Image
                src={product.dashboard.src}
                alt={`${product.name} — ${product.tagline}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </motion.div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}

/* ── Desktop sticky-stack (Apple product-page style). The outer section
    reserves 1 viewport of scroll real estate per card beyond the first; the
    inner sticky container pins at top:0 while cards transition through
    3D transforms driven by scrollYProgress. ── */
function StickyStack() {
  // N cards × 80vh of scroll each (minus first card which is visible on enter)
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Two cards: card 0 visible from progress 0, card 1 takes over at progress 0.5.
  // Card 0 recedes (scale, opacity, brightness) over [0, 0.5].
  // Card 1 enters from y=80vh, rotateX=12deg → 0, opacity 0 → 1 over [0.5, 1].
  // Card 0 transform ranges
  const card0Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.94, 0.88]);
  const card0Opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0.25]);
  const card0Filter = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["brightness(1)", "brightness(0.85)", "brightness(0.7)"],
  );
  // Card 1 transform ranges
  const card1Y = useTransform(scrollYProgress, [0.4, 0.85, 1], ["100%", "0%", "0%"]);
  const card1RotateX = useTransform(scrollYProgress, [0.4, 0.85, 1], [12, 0, 0]);
  const card1Opacity = useTransform(scrollYProgress, [0.4, 0.6, 1], [0, 1, 1]);
  const card1Scale = useTransform(scrollYProgress, [0.4, 0.85, 1], [0.92, 1, 1]);

  const card0Style = { scale: card0Scale, opacity: card0Opacity, filter: card0Filter };
  const card1Style = {
    y: card1Y,
    rotateX: card1RotateX,
    opacity: card1Opacity,
    scale: card1Scale,
    transformOrigin: "50% 100%",
  };

  return (
    // Outer reserves scroll height: 1 initial viewport + (N-1) × 80vh transitions.
    // For 2 cards → 100vh + 80vh = 180vh total. Tailwind h-[180vh].
    <div ref={sectionRef} className="hidden lg:block h-[180vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <Container>
          {/* Explicit height on the relative wrapper so the absolute-positioned
              cards (absolute inset-0) have a bounding box. Without this, the
              cards collapse to 0×0 and the section renders as empty space. */}
          <div className="relative h-[480px]" style={{ perspective: "1500px" }}>
            {products.map((product, i) => (
              <motion.div
                key={product.name}
                style={
                  i === 0
                    ? { ...card0Style, transformStyle: "preserve-3d" }
                    : { ...card1Style, transformStyle: "preserve-3d" }
                }
                className={i === 0 ? "absolute inset-0" : "absolute inset-0"}
              >
                <div className="grid grid-cols-2 gap-16 items-center">
                  {/* Text column */}
                  <div>
                    <h3 className="text-3xl font-bold text-foreground mb-2">
                      {product.name}
                    </h3>
                    <p className="text-foreground-muted font-medium text-sm mb-4">
                      {product.tagline}
                    </p>
                    <p className="text-foreground-secondary leading-relaxed mb-6">
                      {product.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {product.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-3 text-sm text-foreground-secondary"
                        >
                          <span className="flex items-center justify-center w-5 h-5 rounded-full border border-brand/30 shrink-0" aria-hidden="true">
                            <Check size={12} className="text-brand" />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={product.href}
                      className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:gap-3 transition-all py-2 -my-2 px-1 -mx-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded-sm"
                    >
                      View Case Study <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                  {/* Image column */}
                  <div className="group relative h-[420px] rounded-2xl overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.04),0_24px_60px_rgba(0,0,0,0.12)] border border-black/[0.06]" style={{ transform: "translateZ(40px)" }}>
                    <Image
                      src={product.dashboard.src}
                      alt={`${product.name} — ${product.tagline}`}
                      fill
                      sizes="50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}

export function ProductShowcase() {
  return (
    <section className="py-20 md:py-28" aria-label="Our products">
      <Container>
        <AnimatedSection>
          <SectionHeader
            title="Built by Retech Solutions"
            description="Real-world products solving real-world problems — from health tech to financial services."
          />
        </AnimatedSection>
      </Container>

      {/* Mobile/tablet: alternating flat list. Desktop (lg+): sticky-stack. */}
      <FlatList />
      <StickyStack />
    </section>
  );
}
