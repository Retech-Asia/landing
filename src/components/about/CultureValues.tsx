"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import {
  Lightbulb,
  Shield,
  Eye,
  Users,
  TrendingUp,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";

interface ValueItem {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

const values: ValueItem[] = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We integrate AI, machine learning, and modern cloud-native patterns into real products — not just prototypes. When we adopted AI-assisted workflows in 2024, every CMS, CRM, and ERP we shipped afterward benefited from automated content tagging, predictive analytics, and smarter data pipelines.",
    color: "text-brand",
    bgColor: "bg-brand/10",
  },
  {
    icon: Shield,
    title: "Quality",
    description:
      "We do not ship code that has not been reviewed by at least two senior engineers and validated by automated test suites. Our QA process caught 0.3% defect rates across 50+ projects — because one bug in production is one too many for the clients who trust us with their business systems.",
    color: "text-accent-cyan",
    bgColor: "bg-accent-cyan/10",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Great software is built together. We foster open teamwork between our engineers, designers, and your stakeholders to ensure every voice shapes the final product.",
    color: "text-accent-violet",
    bgColor: "bg-accent-violet/10",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "Open communication is the foundation of every partnership. We provide clear timelines, honest progress updates, and direct access to our team throughout every project.",
    color: "text-brand",
    bgColor: "bg-brand/10",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    description:
      "We invest in continuous learning, technical training, and knowledge sharing across the team. Every engineer at Retech has dedicated learning time each week, because we believe that growing our people is the most reliable way to grow our clients' products.",
    color: "text-accent-cyan",
    bgColor: "bg-accent-cyan/10",
  },
  {
    icon: Sparkles,
    title: "Excellence",
    description:
      "We hold ourselves to a high bar — clean architecture, thorough code reviews, automated testing, and proactive communication. Not because a process document says so, but because our engineers genuinely care about the craft of building software that lasts.",
    color: "text-accent-violet",
    bgColor: "bg-accent-violet/10",
  },
];

function AnimatedIcon({
  icon: Icon,
  color,
  bgColor,
}: {
  icon: LucideIcon;
  color: string;
  bgColor: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative w-12 h-12">
      {/* Pulse ring — expands outward when visible */}
      <div
        className={`absolute inset-0 rounded-xl ${bgColor}`}
        style={{
          transform: isInView ? "scale(2)" : "scale(0.8)",
          opacity: isInView ? 0 : 0.6,
          transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />
      {/* Second pulse ring — delayed for layered effect */}
      <div
        className={`absolute inset-0 rounded-xl ${bgColor}`}
        style={{
          transform: isInView ? "scale(2.5)" : "scale(0.8)",
          opacity: isInView ? 0 : 0.4,
          transition: "transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s, opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s",
        }}
      />
      {/* Icon container — bounces in */}
      <div
        className={`relative w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center`}
        style={{
          transform: isInView ? "scale(1)" : "scale(0.6)",
          opacity: isInView ? 1 : 0,
          transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s, opacity 0.5s ease 0.1s",
        }}
      >
        <Icon size={24} className={color} />
      </div>
    </div>
  );
}

export function CultureValues() {
  return (
    <section className="py-20 md:py-28 bg-background-subtle relative overflow-hidden">
      <Container>
        <AnimatedSection>
          <SectionHeader
            title="What Drives Us"
            description="Our core values shape every project we take on and every relationship we build."
          />
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <StaggerItem key={value.title}>
                <Card padding="lg" className="h-full gradient-border">
                  <AnimatedIcon
                    icon={Icon}
                    color={value.color}
                    bgColor={value.bgColor}
                  />
                  <h3 className="text-base font-semibold text-foreground mb-2 mt-4">
                    {value.title}
                  </h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Container>
    </section>
  );
}
