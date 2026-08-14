"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const products = [
  {
    name: "Mining Analytics Platform",
    tagline: "BTC Mining Operations Dashboard",
    description:
      "A full-stack BTC mining analytics platform unifying F2Pool + ViaBTC hashrate data, CoinGecko market pricing, and mempool difficulty projections into one operator dashboard.",
    features: [
      "Multi-pool ingestion (F2Pool + ViaBTC)",
      "CoinGecko + Mempool difficulty projections",
      "JWT auth with refresh rotation",
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
    href: "/case-studies/mining-analytics-platform",
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

export function ProductShowcase() {
  return (
    <section className="py-20 md:py-28" aria-label="Our products">
      <Container>
        <AnimatedSection>
          <SectionHeader
            title="Built by Retech Solutions"
            description="Real-world products solving real-world problems, from health tech to financial services."
          />
        </AnimatedSection>

        {/* Alternating text/image layout — clean editorial pattern, works
            on all viewports. Replaces the previous sticky-stack design
            whose scroll-cover transition read as a visual bug (cards
            overlapping at the same bounding box mid-transition). */}
        <div className="space-y-24 md:space-y-32 mt-16 md:mt-20">
          {products.map((product, index) => (
            <AnimatedSection key={product.name}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                {/* Text column */}
                <motion.div
                  className={index % 2 !== 0 ? "md:order-2" : ""}
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

                {/* Image column */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`group relative h-[260px] md:h-[420px] rounded-2xl overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.04),0_24px_60px_rgba(0,0,0,0.12)] border border-card-border ${
                    index % 2 !== 0 ? "md:order-1" : ""
                  }`}
                >
                  <Image
                    src={product.dashboard.src}
                    alt={`${product.name}: ${product.tagline}`}
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
      </Container>
    </section>
  );
}
