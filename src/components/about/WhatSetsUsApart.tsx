"use client";

import {
  Code2,
  Zap,
  DollarSign,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";

interface Differentiator {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

const differentiators: Differentiator[] = [
  {
    icon: Code2,
    title: "Technical Excellence",
    description:
      "Our engineers bring deep expertise in modern stacks — React, Next.js, Node.js, Python, and cloud-native architectures. Every solution is built on proven best practices with clean, maintainable code.",
    color: "text-brand",
    bgColor: "bg-brand/10",
  },
  {
    icon: Zap,
    title: "Agile Approach",
    description:
      "Short sprints, continuous delivery, and transparent progress tracking. We adapt to changing requirements quickly, keeping your project on track and your stakeholders informed at every step.",
    color: "text-accent-cyan",
    bgColor: "bg-accent-cyan/10",
  },
  {
    icon: DollarSign,
    title: "Cost Efficiency",
    description:
      "Vietnam-based operations mean competitive rates without compromising quality. We deliver enterprise-grade solutions at a fraction of the cost of onshore or Western European development teams.",
    color: "text-accent-violet",
    bgColor: "bg-accent-violet/10",
  },
  {
    icon: HeartHandshake,
    title: "Cultural Alignment",
    description:
      "We understand Western business culture and communication styles. Fluent English proficiency, overlapping working hours, and a collaborative mindset ensure seamless integration with your team.",
    color: "text-brand",
    bgColor: "bg-brand/10",
  },
];

export function WhatSetsUsApart() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <Container>
        <AnimatedSection>
          <SectionHeader
            label="Why Retech"
            title="What Sets Us Apart"
            description="Four pillars that define how we work and why our clients stay with us for the long haul."
          />
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <div className="group relative h-full rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] hover:border-brand/15 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 p-6 md:p-8">
                  {/* Number badge */}
                  <div className="absolute top-6 right-6 md:top-8 md:right-8">
                    <span className="text-xs font-bold text-foreground-muted/40">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-11 h-11 rounded-xl ${item.bgColor} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon size={20} className={item.color} strokeWidth={2} />
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
