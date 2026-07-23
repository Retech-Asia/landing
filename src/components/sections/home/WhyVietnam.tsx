"use client";

import {
  DollarSign,
  GraduationCap,
  Clock,
  Globe,
  Landmark,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";

const advantages = [
  {
    icon: DollarSign,
    title: "Cost Effective",
    description:
      "Save 40-60% compared to Western markets without compromising on quality or expertise.",
    color: "text-brand",
    bg: "bg-brand/10",
  },
  {
    icon: GraduationCap,
    title: "Talented Workforce",
    description:
      "Over 50,000 IT graduates annually from top universities with strong STEM foundations and competitive technical skills.",
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/10",
  },
  {
    icon: Clock,
    title: "Timezone Advantage",
    description:
      "GMT+7 timezone overlaps with both APAC and European business hours for seamless collaboration.",
    color: "text-accent-violet",
    bg: "bg-accent-violet/10",
  },
  {
    icon: Globe,
    title: "Cultural Compatibility",
    description:
      "Strong English proficiency and familiarity with Western business practices and communication styles.",
    color: "text-brand",
    bg: "bg-brand/10",
  },
  {
    icon: Landmark,
    title: "Government Support",
    description:
      "Favorable tax policies for IT outsourcing and a rapidly growing tech ecosystem backed by national strategy.",
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/10",
  },
  {
    icon: Users,
    title: "Scalable Teams",
    description:
      "Quickly scale your development team up or down based on project needs and business demands.",
    color: "text-accent-violet",
    bg: "bg-accent-violet/10",
  },
] as const;

const stats = [
  { value: "50K+", label: "IT Graduates/Year" },
  { value: "40-60%", label: "Cost Savings vs. West" },
  { value: "GMT+7", label: "Timezone (overlaps EU mornings)" },
  { value: "6", label: "ASEAN Neighbor Markets" },
];

export function WhyVietnam() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Subtle background accent — single layer only */}
      <div className="absolute inset-0 radial-glow-brand opacity-50" />

      <Container>
        {/* Section header */}
        <SectionHeader
          label="Why Vietnam"
          title="A Strategic Outsourcing Destination"
          description="Vietnam offers a combination of STEM talent, cost efficiency, and business-friendly policies that make it a competitive outsourcing destination within ASEAN."
          gradient
        />

        {/* Stats bar */}
        <StaggerContainer
          staggerDelay={0.12}
          className="mb-14 md:mb-18 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8 rounded-2xl bg-white/60 border border-black/[0.06] backdrop-blur-sm"
        >
          {stats.map((stat, index) => (
            <StaggerItem key={stat.label}>
              <div className="flex flex-col items-center text-center relative">
                {index > 0 && (
                  <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-10 w-px bg-gradient-to-b from-transparent via-foreground-muted/15 to-transparent" />
                )}
                <span className="text-2xl md:text-3xl font-bold gradient-text-brand">
                  {stat.value}
                </span>
                <span className="mt-1 text-sm text-foreground-muted font-medium">
                  {stat.label}
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
              <StaggerItem key={item.title}>
                <div className="card-shimmer h-full rounded-2xl bg-white border border-black/[0.06] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-black/[0.10] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5">
                  <div
                    className={`w-11 h-11 rounded-full ${item.bg} flex items-center justify-center mb-4`}
                  >
                    <Icon size={22} className={item.color} />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Container>
    </section>
  );
}
