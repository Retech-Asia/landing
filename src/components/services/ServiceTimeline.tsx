"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Lightbulb,
  PenTool,
  Code2,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import type { ServiceTimeline } from "@/lib/services-data";

interface ServiceTimelineProps {
  timeline: ServiceTimeline[];
}

const stepIcons: LucideIcon[] = [Lightbulb, PenTool, Code2, Rocket];

const stepColors = [
  { dot: "bg-brand", ring: "ring-brand/25", text: "text-brand", bg: "bg-brand/10", glow: "shadow-brand/20", gradient: "from-brand to-brand-light" },
  { dot: "bg-accent-cyan", ring: "ring-accent-cyan/25", text: "text-accent-cyan", bg: "bg-accent-cyan/10", glow: "shadow-accent-cyan/20", gradient: "from-accent-cyan to-brand" },
  { dot: "bg-accent-violet", ring: "ring-accent-violet/25", text: "text-accent-violet", bg: "bg-accent-violet/10", glow: "shadow-accent-violet/20", gradient: "from-accent-violet to-accent-cyan" },
  { dot: "bg-brand", ring: "ring-brand/25", text: "text-brand", bg: "bg-brand/10", glow: "shadow-brand/20", gradient: "from-brand-light to-accent-cyan" },
];

/* ── Animated vertical line that draws on scroll ────────────── */
function DrawLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="absolute left-5 top-0 bottom-0 w-px" aria-hidden="true">
      {/* Background track */}
      <div className="absolute inset-0 bg-black/[0.06]" />
      {/* Animated fill */}
      <motion.div
        className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-brand via-accent-cyan to-accent-violet origin-top"
        style={{ scaleY }}
      />
    </div>
  );
}

/* ── Desktop zigzag step ────────────────────────────────────── */
function DesktopStep({
  phase,
  index,
  total,
  isLeft,
}: {
  phase: ServiceTimeline;
  index: number;
  total: number;
  isLeft: boolean;
}) {
  const colors = stepColors[index % stepColors.length];
  const StepIcon = stepIcons[index % stepIcons.length];

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 10 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative grid grid-cols-[1fr_40px_1fr] items-center gap-x-6 ${
        index < total - 1 ? "pb-12" : ""
      }`}
    >
      {/* Left content */}
      <div className={`flex ${isLeft ? "justify-end" : ""}`}>
        {isLeft ? (
          <div className="max-w-sm text-right">
            <span
              className={`inline-block text-xs font-semibold uppercase tracking-wider ${colors.text} ${colors.bg} rounded-full px-3 py-1 mb-3`}
            >
              {phase.week}
            </span>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {phase.phase}
            </h3>
            <p className="text-sm text-foreground-secondary leading-relaxed">
              {phase.description}
            </p>
          </div>
        ) : (
          <div />
        )}
      </div>

      {/* Center dot */}
      <div className="flex flex-col items-center">
        <div
          className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${colors.gradient} ring-4 ${colors.ring} shadow-lg ${colors.glow}`}
        >
          <StepIcon size={18} className="text-white" />
        </div>
      </div>

      {/* Right content */}
      <div className={`flex ${isLeft ? "" : "justify-start"}`}>
        {!isLeft ? (
          <div className="max-w-sm">
            <span
              className={`inline-block text-xs font-semibold uppercase tracking-wider ${colors.text} ${colors.bg} rounded-full px-3 py-1 mb-3`}
            >
              {phase.week}
            </span>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {phase.phase}
            </h3>
            <p className="text-sm text-foreground-secondary leading-relaxed">
              {phase.description}
            </p>
          </div>
        ) : (
          <div />
        )}
      </div>
    </motion.div>
  );
}

export function ServiceTimeline({ timeline }: ServiceTimelineProps) {
  return (
    <>
      {/* ── Desktop: alternating zigzag timeline ──────────── */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Central vertical line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-brand via-accent-cyan to-accent-violet/30"
            aria-hidden="true"
          />

          <div className="flex flex-col">
            {timeline.map((phase, i) => (
              <DesktopStep
                key={phase.phase}
                phase={phase}
                index={i}
                total={timeline.length}
                isLeft={i % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile: vertical timeline with animated draw ── */}
      <div className="md:hidden">
        <div className="relative pl-12">
          {/* Scroll-driven animated line */}
          <DrawLine />

          <div className="flex flex-col gap-8">
            {timeline.map((phase, i) => {
              const colors = stepColors[i % stepColors.length];
              const StepIcon = stepIcons[i % stepIcons.length];
              return (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, x: -24, y: 8 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.14,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="relative"
                >
                  {/* Dot with icon */}
                  <div
                    className={`absolute -left-12 top-0 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${colors.gradient} ring-3 ${colors.ring} shadow-lg ${colors.glow} z-10`}
                    style={{ left: "-44px" }}
                  >
                    <StepIcon size={16} className="text-white" />
                  </div>

                  {/* Content card */}
                  <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-shadow duration-300 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)]">
                    <span
                      className={`inline-block text-xs font-semibold uppercase tracking-wider ${colors.text} ${colors.bg} rounded-full px-3 py-1 mb-2`}
                    >
                      {phase.week}
                    </span>
                    <h3 className="text-base font-semibold text-foreground mb-1.5">
                      {phase.phase}
                    </h3>
                    <p className="text-sm text-foreground-secondary leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
