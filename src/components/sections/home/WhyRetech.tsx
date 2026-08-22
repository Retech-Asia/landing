"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Cpu, Zap, Sparkles, Code, ArrowRight, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CompositeSectionBackground } from "@/components/ui/SectionBackground";

/**
 * Merged "Why Retech" section. Previously two adjacent sections (WhyRetech
 * card grid + WhyVietnam stats/cards/photo) repeated the same card anatomy
 * three times down the page. Now one split composition:
 * left = Retech differentiators (list rows, not cards),
 * right = the full Vietnam story in one panel (stats, advantages, cityscape).
 */
const highlights: { key: string; icon: LucideIcon; color: string; bg: string }[] = [
  { key: "aiEngineering", icon: Cpu, color: "text-brand", bg: "bg-brand/10" },
  { key: "agile", icon: Zap, color: "text-accent-cyan", bg: "bg-accent-cyan/10" },
  { key: "aiSolutions", icon: Sparkles, color: "text-accent-violet", bg: "bg-accent-violet/10" },
  { key: "productionAi", icon: Code, color: "text-brand", bg: "bg-brand/10" },
];

const vietnamStats = [
  { value: "50K+", key: "graduates" },
  { value: "40-60%", key: "savings" },
  { value: "GMT+7", key: "timezone" },
  { value: "6", key: "asean" },
] as const;

const vietnamAdvantages = [
  "cost",
  "talent",
  "timezone",
  "cultural",
  "government",
  "scalable",
] as const;

export function WhyRetech() {
  const t = useTranslations("home.whyRetech");
  const tVn = useTranslations("home.whyVietnam");

  return (
    <section className="py-20 md:py-28 bg-background-subtle relative overflow-hidden">
      <CompositeSectionBackground layers={["spotlight", "dots"]} grain />
      <Container className="relative z-10">
        <SectionHeader
          label={t("label")}
          title={t("title")}
          description={t("description")}
          gradient
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mt-12 items-start">
          {/* Left: Retech differentiators — list rows, not another card grid */}
          <div className="lg:col-span-5">
            <div className="divide-y divide-card-border">
              {highlights.map(({ key, icon: Icon, color, bg }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
                  className="flex items-start gap-4 py-5 first:pt-0 last:pb-0"
                >
                  <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                    <Icon size={22} className={color} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-1">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="text-sm text-foreground-secondary leading-relaxed">
                      {t(`items.${key}.description`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mt-8"
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:gap-3 transition-all py-2 px-1 -mx-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 rounded-sm"
              >
                {t("learnMore")}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </motion.div>
          </div>

          {/* Right: the Vietnam story in one panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl bg-card-bg border border-card-border p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h3 className="text-xl font-bold text-foreground">{tVn("title")}</h3>
                <span className="text-xs font-medium tracking-widest uppercase text-brand">
                  {tVn("label")}
                </span>
              </div>
              <p className="text-sm text-foreground-secondary leading-relaxed mb-6">
                {tVn("description")}
              </p>

              {/* Stats strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-y border-card-border mb-6">
                {vietnamStats.map((stat) => (
                  <div key={stat.key} className="flex flex-col items-center text-center">
                    <span className="text-2xl md:text-[1.7rem] font-bold gradient-text-brand leading-none">
                      {stat.value}
                    </span>
                    <span className="mt-1.5 text-xs text-foreground-muted font-medium">
                      {tVn(`stats.${stat.key}`)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Advantages — compact two-column list, no cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                {vietnamAdvantages.map((key) => (
                  <div key={key}>
                    <h4 className="text-sm font-semibold text-foreground mb-0.5">
                      {tVn(`advantages.${key}.title`)}
                    </h4>
                    <p className="text-xs text-foreground-secondary leading-relaxed">
                      {tVn(`advantages.${key}.description`)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Cityscape — location context */}
              <div className="relative h-36 md:h-44 rounded-xl overflow-hidden">
                <Image
                  src="/images/stock/vietnam-cityscape.webp"
                  alt={tVn("imageAlt")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <p className="absolute bottom-3 left-4 text-xs font-medium text-white">
                  {tVn("imageCaption")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
