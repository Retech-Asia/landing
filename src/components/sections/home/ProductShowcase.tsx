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
      src: "/images/wellness-dashboard.png",
      width: 1168,
      height: 874,
    },
    mobile: {
      src: "/images/wellness-mobile.png",
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
      src: "/images/asset-mgmt-dashboard.png",
      width: 1168,
      height: 908,
    },
    mobile: {
      src: "/images/asset-mgmt-mobile.png",
      width: 364,
      height: 744,
    },
    href: "/case-studies/asset-management-platform",
  },
];

/* ── Parallax screenshot wrapper with blur-to-sharp reveal ── */
function ParallaxScreenshots({ product, index }: { product: typeof products[number]; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Dashboard moves slower than scroll (parallax effect)
  const dashboardY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  // Mobile overlay moves slightly faster — subtle depth layering
  const mobileY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <div ref={containerRef} className={`${index % 2 !== 0 ? "[direction:ltr]" : ""}`}>
      <div className="relative pb-32 md:pb-20">
        {/* Dashboard — blur-to-sharp reveal + parallax */}
        <motion.div
          style={{ y: dashboardY }}
          className="relative rounded-2xl overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.08)] border border-black/[0.06] bg-white"
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src={product.dashboard.src}
            alt={`${product.name} — ${product.tagline} dashboard interface`}
            width={product.dashboard.width}
            height={product.dashboard.height}
            className="w-full h-auto"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            loading="lazy"
          />
        </motion.div>

        {/* Mobile — parallax + spring bounce entrance */}
        <motion.div
          style={{ y: mobileY }}
          className="absolute bottom-0 right-2 md:bottom-2 md:right-4 w-28 md:w-40 pointer-events-none"
          initial={{ opacity: 0, x: 60, y: 40, scale: 0.8 }}
          whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 12,
            mass: 0.8,
            delay: 0.5,
          }}
        >
          <div className="rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.12),0_20px_48px_rgba(0,0,0,0.08)] border border-black/[0.08] bg-white">
            <Image
              src={product.mobile.src}
              alt={`${product.name} mobile application view`}
              width={product.mobile.width}
              height={product.mobile.height}
              className="w-full h-auto"
              sizes="160px"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              loading="lazy"
            />
          </div>
        </motion.div>
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
                <ParallaxScreenshots product={product} index={index} />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
