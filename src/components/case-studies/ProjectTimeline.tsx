"use client";

import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";

/**
 * Hallmark · redesign: ruled-timeline · genre: editorial · system: site tokens
 * (docs/design-system.md). Replaces the cyan→violet gradient stepper (off-
 * brand inline hex #06b6d4/#8b5cf6) with the problem-ledger DNA shipped for
 * the industries section: hairline top rules + ghost serif numerals. The
 * absolute-positioned connector lines are gone — each phase cell carries its
 * own top rule at every width, so there is no connector math to break.
 * Copy and phase order unchanged. Motion stays on StaggerContainer
 * (reduced-motion handled by AnimatedSection).
 */
interface TimelinePhase {
  phase: string;
  title: string;
  description: string;
}

interface ProjectTimelineProps {
  phases: TimelinePhase[];
}

export function ProjectTimeline({ phases }: ProjectTimelineProps) {
  return (
    <div data-timeline="true" className="max-w-4xl mx-auto">
      <StaggerContainer
        className="grid grid-cols-1 md:grid-cols-4 gap-x-6"
        staggerDelay={0.15}
      >
        {phases.map((phase, index) => (
          <StaggerItem key={index}>
            <div className="border-t border-rule-soft pt-5 pb-6 md:pb-2">
              <span
                aria-hidden="true"
                className="font-display text-3xl leading-none text-foreground/25 tabular-nums"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                {phase.phase}
              </p>
              <p className="mt-2 text-base font-semibold text-foreground">
                {phase.title}
              </p>
              <p className="mt-2 text-sm text-foreground-secondary leading-relaxed">
                {phase.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
