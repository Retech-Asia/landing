"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { BLUR_DATA_URL } from "@/lib/image-placeholders";

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

/* ── Single hero image with scroll parallax (no side-by-side) ── */
function ProjectImage({ product, index }: { product: typeof products[number]; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div ref={containerRef} className={index % 2 !== 0 ? "lg:order-2" : ""}>
      <motion.div
        style={{ y: imageY }}
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="group relative h-[260px] md:h-[400px] rounded-2xl overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.08)] border border-black/[0.06]"
      >
        <Image
          src={product.dashboard.src}
          alt={`${product.name} — ${product.tagline}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </motion.div>
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

        <div className="space-y-24 md:space-y-32">
          {products.map((product, index) => (
            <AnimatedSection
              key={product.name}
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  index % 2 !== 0 ? "[direction:rtl]" : ""
                }`}
              >
                {/* Text — opacity reveal on scroll (opacity-only so reduced-motion
                    users still see the content even if the animation is skipped) */}
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

                {/* Screenshots — parallax layout */}
                <ProjectImage product={product} index={index} />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
