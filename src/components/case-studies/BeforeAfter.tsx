"use client";

import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import type { BeforeAfterMetric } from "@/lib/case-studies-data";

interface BeforeAfterProps {
  data: BeforeAfterMetric[];
}

function parseNumericValue(val: string): number {
  const match = val.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

function ImprovementBadge({ improvement }: { improvement: string }) {
  const isPositive = improvement.startsWith("+");

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
        isPositive
          ? "bg-emerald-500/10 text-emerald-400"
          : "bg-blue-500/10 text-blue-400"
      }`}
    >
      {isPositive ? (
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
        >
          <path d="M5 1.5L8.5 6H1.5L5 1.5Z" fill="currentColor" />
        </svg>
      ) : (
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
        >
          <path d="M5 8.5L1.5 4H8.5L5 8.5Z" fill="currentColor" />
        </svg>
      )}
      {improvement}
    </span>
  );
}

function ComparisonBar({
  before,
  after,
}: {
  before: string;
  after: string;
}) {
  const beforeVal = parseNumericValue(before);
  const afterVal = parseNumericValue(after);
  const maxVal = Math.max(beforeVal, afterVal);

  if (maxVal === 0) return null;

  const beforePct = Math.max(4, (beforeVal / maxVal) * 100);
  const afterPct = Math.max(4, (afterVal / maxVal) * 100);

  return (
    <div className="mt-4 space-y-1.5">
      <div className="flex items-center gap-2">
        <div
          className="h-1.5 rounded-full bg-red-500/20"
          style={{ width: `${beforePct}%` }}
          aria-hidden="true"
        />
      </div>
      <div className="flex items-center gap-2">
        <div
          className="h-1.5 rounded-full bg-emerald-500/30"
          style={{ width: `${afterPct}%` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

function MetricComparisonCard({
  item,
}: {
  item: BeforeAfterMetric;
}) {
  return (
    <StaggerItem>
      <div
        className="relative overflow-hidden rounded-2xl border border-white/[0.08] p-6"
        style={{
          background:
            "linear-gradient(135deg, rgba(6,182,212,0.04) 0%, rgba(139,92,246,0.04) 100%)",
        }}
      >
        {/* Metric name */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold text-foreground">
            {item.metric}
          </h3>
          <ImprovementBadge improvement={item.improvement} />
        </div>

        {/* Before / After columns */}
        <div className="grid grid-cols-2 gap-4">
          {/* Before */}
          <div>
            <p className="text-[11px] uppercase tracking-wider text-red-400/70 font-medium mb-1.5">
              Before
            </p>
            <p className="text-base md:text-lg font-bold text-red-300/80">
              {item.before}
            </p>
          </div>

          {/* After */}
          <div>
            <p className="text-[11px] uppercase tracking-wider text-emerald-400/70 font-medium mb-1.5">
              After
            </p>
            <p className="text-base md:text-lg font-bold text-emerald-400">
              {item.after}
            </p>
          </div>
        </div>

        {/* Visual bar comparison */}
        <ComparisonBar before={item.before} after={item.after} />
      </div>
    </StaggerItem>
  );
}

export function BeforeAfter({ data }: BeforeAfterProps) {
  return (
    <StaggerContainer
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      staggerDelay={0.1}
    >
      {data.map((item, index) => (
        <MetricComparisonCard key={index} item={item} />
      ))}
    </StaggerContainer>
  );
}
