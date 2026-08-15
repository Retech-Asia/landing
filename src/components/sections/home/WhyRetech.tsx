"use client";

import { Link } from "@/i18n/navigation";
import { Code, Zap, Brain, ArrowRight, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CompositeSectionBackground } from "@/components/ui/SectionBackground";
import { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";

const iconColors = [
  "text-brand",
  "text-accent-cyan",
  "text-accent-violet",
  "text-brand",
];

const highlights: { key: string; icon: LucideIcon }[] = [
  { key: "aiEngineering", icon: Brain },
  { key: "agile", icon: Zap },
  { key: "aiSolutions", icon: Brain },
  { key: "productionAi", icon: Code },
];

export function WhyRetech() {
  const t = useTranslations("home.whyRetech");
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

        {/* Stats row removed — duplicate of the Hero stats above.
            Was showing 50+/30+/5+ for the third time on the homepage
            (Hero → StatsBar → here). Keeping it caused "stats fatigue". */}

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
          {highlights.map(({ key, icon: Icon }, i) => (
            <StaggerItem key={key}>
              <div className="card-shimmer h-full rounded-2xl bg-card-bg border border-card-border p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-foreground/10 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5">
                <Icon size={24} className={`${iconColors[i]} mb-4`} />
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {t(`items.${key}.description`)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="mt-10 text-center"
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:gap-3 transition-all py-2 -my-2 px-1 -mx-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded-sm"
          >
            {t("learnMore")}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
