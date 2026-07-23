"use client";

import { useRef } from "react";
import {
  Shield,
  Clock,
  Users,
  TrendingUp,
  Headphones,
  Award,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";

/* ───────────────────────────────────────────
   Value propositions (existing)
   ─────────────────────────────────────────── */

const reasons = [
  {
    icon: Clock,
    title: "On-Time Delivery",
    description:
      "We respect deadlines and deliver projects on schedule with transparent progress tracking throughout.",
    color: "text-brand",
    bg: "bg-brand/10",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description:
      "Rigorous code reviews, automated testing, and QA processes ensure every release meets high standards.",
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/10",
  },
  {
    icon: Users,
    title: "Dedicated Teams",
    description:
      "Our developers integrate seamlessly with your workflow, tools, and processes as an extension of your team.",
    color: "text-accent-violet",
    bg: "bg-accent-violet/10",
  },
  {
    icon: TrendingUp,
    title: "Scalable Solutions",
    description:
      "Architecture designed to grow with your business, from MVP to enterprise-scale applications.",
    color: "text-brand",
    bg: "bg-brand/10",
  },
  {
    icon: Headphones,
    title: "Ongoing Support",
    description:
      "Post-launch support, maintenance, and continuous improvement to keep your product competitive.",
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/10",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description:
      "Years of experience delivering custom software solutions across healthcare, finance, logistics, and more.",
    color: "text-accent-violet",
    bg: "bg-accent-violet/10",
  },
];

/* ───────────────────────────────────────────
   Client Results metrics
   ─────────────────────────────────────────── */

const clientMetrics = [
  {
    value: "94%",
    label: "Projects Delivered On Time",
    icon: Clock,
    accent: "brand" as const,
  },
  {
    value: "4.8/5",
    label: "Client Satisfaction",
    icon: Award,
    accent: "cyan" as const,
  },
  {
    value: "< 24h",
    label: "Average Response Time",
    icon: Headphones,
    accent: "violet" as const,
  },
  {
    value: "6",
    label: "Markets Served",
    icon: TrendingUp,
    accent: "brand" as const,
  },
];

/* ───────────────────────────────────────────
   Real project highlights from case studies
   ─────────────────────────────────────────── */

const projectHighlights = [
  {
    project: "Wellness Platform",
    industry: "Health & Wellness",
    metrics: [
      { label: "User Engagement", value: "3.2x increase" },
      { label: "Data Security Score", value: "99.9%" },
      { label: "App Store Rating", value: "4.8/5" },
    ],
    accent: "brand" as const,
  },
  {
    project: "Asset Management Platform",
    industry: "Finance",
    metrics: [
      { label: "Operational Efficiency", value: "60% improvement" },
      { label: "Data Accuracy", value: "99.7%" },
      { label: "Client Onboarding", value: "4x faster" },
    ],
    accent: "cyan" as const,
  },
];

/* ───────────────────────────────────────────
   Trusted Process QA steps
   ─────────────────────────────────────────── */

const processSteps = [
  {
    step: 1,
    title: "Discovery & Planning",
    description: "Requirements analysis, stakeholder alignment, and project roadmap definition.",
  },
  {
    step: 2,
    title: "Design & Prototyping",
    description: "UX research, wireframing, and interactive prototyping with client validation.",
  },
  {
    step: 3,
    title: "Development & Testing",
    description: "Agile sprints with continuous code review, automated testing, and QA gates.",
  },
  {
    step: 4,
    title: "Launch & Support",
    description: "Staged deployment, performance monitoring, and ongoing maintenance.",
  },
];

/* ───────────────────────────────────────────
   Accent color helpers
   ─────────────────────────────────────────── */

const accentColors = {
  brand: {
    text: "text-brand",
    bg: "bg-brand/10",
    border: "border-brand/20",
    badge: "bg-brand/10 text-brand",
    bar: "bg-brand",
    hoverBg: "group-hover:bg-brand/10",
  },
  cyan: {
    text: "text-accent-cyan",
    bg: "bg-accent-cyan/10",
    border: "border-accent-cyan/20",
    badge: "bg-accent-cyan/10 text-accent-cyan",
    bar: "bg-accent-cyan",
    hoverBg: "group-hover:bg-accent-cyan/10",
  },
  violet: {
    text: "text-accent-violet",
    bg: "bg-accent-violet/10",
    border: "border-accent-violet/20",
    badge: "bg-accent-violet/10 text-accent-violet",
    bar: "bg-accent-violet",
    hoverBg: "group-hover:bg-accent-violet/10",
  },
};

/* ───────────────────────────────────────────
   Animated counter (for numeric stats)
   ─────────────────────────────────────────── */

function AnimatedStat({
  value,
  label,
  icon: Icon,
  accent,
}: {
  value: string;
  label: string;
  icon: LucideIcon;
  accent: "brand" | "cyan" | "violet";
}) {
  const colors = accentColors[accent];

  return (
    <div className="group relative flex flex-col items-center text-center p-6 md:p-8 rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-black/[0.10] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1">
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon size={22} className={colors.text} strokeWidth={2} />
      </div>

      {/* Value */}
      <span className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
        {value}
      </span>

      {/* Label */}
      <span className="mt-1.5 text-sm text-foreground-muted leading-snug">
        {label}
      </span>

      {/* Subtle bottom accent bar */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full ${colors.bar} transition-all duration-300 w-0 group-hover:w-12`}
      />
    </div>
  );
}

/* ───────────────────────────────────────────
   Project highlight card
   ─────────────────────────────────────────── */

function ProjectCard({
  project,
  industry,
  metrics,
  accent,
}: {
  project: string;
  industry: string;
  metrics: { label: string; value: string }[];
  accent: "brand" | "cyan";
}) {
  const colors = accentColors[accent];

  return (
    <div className="group relative h-full rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] p-6 md:p-7 transition-all duration-300 hover:border-black/[0.10] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)]">
      {/* Industry badge */}
      <span
        className={`inline-block text-xs font-medium tracking-widest uppercase ${colors.badge} px-2.5 py-1 rounded-full mb-4`}
      >
        {industry}
      </span>

      {/* Project name */}
      <h4 className="text-lg font-bold text-foreground mb-4">{project}</h4>

      {/* Metrics */}
      <div className="space-y-3">
        {metrics.map((m) => (
          <div key={m.label} className="flex items-center justify-between">
            <span className="text-sm text-foreground-secondary">{m.label}</span>
            <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <CheckCircle2 size={14} className={colors.text} />
              {m.value}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom accent bar */}
      <div
        className={`absolute bottom-0 left-6 right-6 h-0.5 rounded-full ${colors.bar} transition-all duration-300 scale-x-0 group-hover:scale-x-100`}
      />
    </div>
  );
}

/* ───────────────────────────────────────────
   Process step
   ─────────────────────────────────────────── */

function ProcessStep({
  step,
  title,
  description,
  isLast,
}: {
  step: number;
  title: string;
  description: string;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="flex gap-4 md:gap-5">
      {/* Left: step indicator + connector */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-brand/10 border-2 border-brand flex items-center justify-center flex-shrink-0"
        >
          <span className="text-sm font-bold text-brand">{step}</span>
        </motion.div>

        {/* Connector line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="w-px flex-1 bg-gradient-to-b from-brand/30 to-brand/10 my-1.5 origin-top min-h-6"
          />
        )}
      </div>

      {/* Right: content */}
      <div className={`pb-8 ${isLast ? "pb-0" : ""}`}>
        <h4 className="text-base font-semibold text-foreground mb-1">
          {title}
        </h4>
        <p className="text-sm text-foreground-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Main component
   ═══════════════════════════════════════════ */

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] radial-glow-brand pointer-events-none" />

      <Container>
        {/* ── Section Header ── */}
        <SectionHeader
          label="How We Work"
          title="A Collaborative Engineering Partner"
          description="We combine technical excellence with a transparent, collaborative approach to deliver software that drives measurable business results."
        />

        {/* ── Value Proposition Cards ── */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.08}
        >
          {reasons.map((reason) => (
            <StaggerItem key={reason.title}>
              <div className="group card-shimmer h-full rounded-2xl bg-white border border-black/[0.06] p-6 md:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-black/[0.10] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)]">
                <div
                  className={`w-10 h-10 rounded-xl ${reason.bg} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
                >
                  <reason.icon
                    size={20}
                    className={reason.color}
                    strokeWidth={2}
                  />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {reason.title}
                </h3>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* ── Client Results Metrics ── */}
        <AnimatedSection delay={0.2}>
          <div className="mt-20 md:mt-24">
            <div className="text-center mb-10 md:mb-12">
              <p className="text-sm font-medium tracking-widest uppercase text-brand mb-3">
                Client Results
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                Numbers That Speak for Themselves
              </h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {clientMetrics.map((metric) => (
                <AnimatedSection key={metric.label} variant="scale" delay={0.1}>
                  <AnimatedStat {...metric} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Project Highlights block removed — duplicated SuccessStories metrics
            (3.2x engagement, 60% efficiency, etc. were shown in BOTH adjacent
            sections, which reads as padding). SuccessStories section above
            already covers this content with better visual treatment. */}

        {/* ── Trusted Process ── */}
        <AnimatedSection delay={0.2}>
          <div className="mt-20 md:mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left: heading */}
              <div>
                <p className="text-sm font-medium tracking-widest uppercase text-brand mb-3">
                  Trusted Process
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Quality Built Into Every Step
                </h3>
                <p className="text-foreground-secondary leading-relaxed mb-6">
                  Our proven development process ensures predictable
                  outcomes, transparent communication, and rigorous quality
                  assurance from day one through post-launch support.
                </p>

                {/* Summary badges */}
                <div className="flex flex-wrap gap-2">
                  {[
                    "Agile Methodology",
                    "Code Review Gates",
                    "Automated Testing",
                    "CI/CD Pipeline",
                    "Performance Monitoring",
                  ].map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground-secondary bg-background-subtle rounded-full px-3 py-1.5 border border-black/[0.04]"
                    >
                      <CheckCircle2 size={12} className="text-brand" />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: process steps */}
              <div>
                {processSteps.map((step, i) => (
                  <ProcessStep
                    key={step.step}
                    {...step}
                    isLast={i === processSteps.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
