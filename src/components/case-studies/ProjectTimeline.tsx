"use client";

import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";

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
    <div className="relative max-w-4xl mx-auto">
      {/* Horizontal connecting line (desktop) */}
      <div
        className="hidden md:block absolute top-[2.25rem] left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-cyan-400/40 via-violet-400/40 to-cyan-400/40"
        aria-hidden="true"
      />

      {/* Vertical connecting line (mobile) */}
      <div
        className="md:hidden absolute top-0 bottom-0 left-[1.125rem] w-0.5 bg-gradient-to-b from-cyan-400/40 via-violet-400/40 to-cyan-400/40"
        aria-hidden="true"
      />

      <StaggerContainer
        className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6"
        staggerDelay={0.15}
      >
        {phases.map((phase, index) => (
          <StaggerItem key={index}>
            <div className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-0 md:text-center">
              {/* Dot */}
              <div
                className="relative z-10 shrink-0 w-[2.25rem] h-[2.25rem] rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{
                  background:
                    index === 0
                      ? "linear-gradient(135deg, #06b6d4, #8b5cf6)"
                      : index === phases.length - 1
                        ? "linear-gradient(135deg, #8b5cf6, #06b6d4)"
                        : "linear-gradient(135deg, #06b6d4, #8b5cf6)",
                }}
              >
                {index + 1}
              </div>

              {/* Content */}
              <div className="md:mt-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-foreground-muted mb-1">
                  {phase.phase}
                </p>
                <p className="text-base font-bold text-foreground mb-2">
                  {phase.title}
                </p>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {phase.description}
                </p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
