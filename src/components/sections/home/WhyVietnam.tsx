"use client";

import Image from "next/image";
import {
  DollarSign,
  GraduationCap,
  Clock,
  Globe,
  Landmark,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";

const advantages = [
  {
    key: "cost",
    icon: DollarSign,
    color: "text-brand",
    bg: "bg-brand/10",
  },
  {
    key: "talent",
    icon: GraduationCap,
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/10",
  },
  {
    key: "timezone",
    icon: Clock,
    color: "text-accent-violet",
    bg: "bg-accent-violet/10",
  },
  {
    key: "cultural",
    icon: Globe,
    color: "text-brand",
    bg: "bg-brand/10",
  },
  {
    key: "government",
    icon: Landmark,
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/10",
  },
  {
    key: "scalable",
    icon: Users,
    color: "text-accent-violet",
    bg: "bg-accent-violet/10",
  },
] as const;

const stats = [
  { value: "50K+", key: "graduates" },
  { value: "40-60%", key: "savings" },
  { value: "GMT+7", key: "timezone" },
  { value: "6", key: "asean" },
] as const;

export function WhyVietnam() {
  const t = useTranslations("home.whyVietnam");
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Subtle background accent — single layer only */}
      <div className="absolute inset-0 radial-glow-brand opacity-50" />

      <Container>
        {/* Section header */}
        <SectionHeader
          label={t("label")}
          title={t("title")}
          description={t("description")}
          gradient
        />

        {/* Stats bar */}
        <StaggerContainer
          staggerDelay={0.12}
          className="mb-14 md:mb-18 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8 rounded-2xl bg-card-bg border border-card-border shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]"
        >
          {stats.map((stat, index) => (
            <StaggerItem key={stat.key}>
              <div className="flex flex-col items-center text-center relative">
                {index > 0 && (
                  <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-10 w-px bg-gradient-to-b from-transparent via-foreground-muted/15 to-transparent" />
                )}
                <span className="text-2xl md:text-3xl font-bold gradient-text-brand">
                  {stat.value}
                </span>
                <span className="mt-1 text-sm text-foreground-muted font-medium">
                  {t(`stats.${stat.key}`)}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Advantages grid */}
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.1}
        >
          {advantages.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.key}>
                <div className="card-shimmer h-full rounded-2xl bg-card-bg border border-card-border p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-foreground/10 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5">
                  <div
                    className={`w-11 h-11 rounded-full ${item.bg} flex items-center justify-center mb-4`}
                  >
                    <Icon size={22} className={item.color} />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {t(`advantages.${item.key}.title`)}
                  </h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed">
                    {t(`advantages.${item.key}.description`)}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Vietnam cityscape — adds real location context */}
        <div className="relative h-[200px] md:h-[300px] rounded-2xl overflow-hidden mt-12">
          <Image
            src="/images/stock/vietnam-cityscape.webp"
            alt={t("imageAlt")}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <p className="absolute bottom-4 left-6 text-sm font-medium text-white">
            {t("imageCaption")}
          </p>
        </div>
      </Container>
    </section>
  );
}
