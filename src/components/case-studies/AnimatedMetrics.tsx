"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";

interface MetricResult {
  metric: string;
  value: string;
  numericValue?: number;
  suffix?: string;
}

interface AnimatedMetricsProps {
  results: MetricResult[];
}

function MetricCard({ result, index }: { result: MetricResult; index: number }) {
  const hasNumeric = result.numericValue !== undefined;
  // Derive display prefix from the value string (e.g. "+", "3.2", etc.)
  const prefix = hasNumeric
    ? result.value.replace(/[\d.]/g, "").replace(result.suffix || "", "").trim()
    : "";

  return (
    <StaggerItem>
      <div
        className="relative overflow-hidden rounded-2xl border border-white/[0.08] p-6 md:p-8 text-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(6,182,212,0.06) 0%, rgba(139,92,246,0.06) 100%)",
        }}
      >
        {/* Number */}
        <p className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
          {hasNumeric ? (
            <>
              {prefix}
              <AnimatedCounter
                target={result.numericValue!}
                suffix={result.suffix || ""}
                duration={1800 + index * 200}
              />
            </>
          ) : (
            result.value
          )}
        </p>

        {/* Divider */}
        <div className="mx-auto mb-3 h-px w-12 bg-gradient-to-r from-cyan-400/50 to-violet-400/50" />

        {/* Label */}
        <p className="text-sm text-foreground-secondary font-medium">
          {result.metric}
        </p>
      </div>
    </StaggerItem>
  );
}

export function AnimatedMetrics({ results }: AnimatedMetricsProps) {
  return (
    <StaggerContainer
      className="grid grid-cols-2 lg:grid-cols-4 gap-6"
      staggerDelay={0.12}
    >
      {results.map((result, index) => (
        <MetricCard key={index} result={result} index={index} />
      ))}
    </StaggerContainer>
  );
}
