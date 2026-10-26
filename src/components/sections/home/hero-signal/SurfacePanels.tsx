"use client";

import { useEffect, useState } from "react";
import { opportunities } from "@/lib/showcases/northline/fixtures";
import { RELAY_JOBS } from "@/lib/showcases/relay/fixtures";

/**
 * Concept II hero evidence: three compact product surfaces (CRM pipeline
 * board, operations dashboard, mobile field screen) built from the
 * deterministic showcase fixtures. All fictional -> mono "Product concept"
 * label on every panel. Data ticks are idle-only and freeze the moment the
 * user scrolls (Beat 1 law: no live interface past the first beat).
 */

const STAGES = ["qualified", "proposal", "negotiation"] as const;
const STAGE_LABEL: Record<(typeof STAGES)[number], string> = {
  qualified: "Qualified",
  proposal: "Proposal",
  negotiation: "Negotiation",
};

function PipelineBoard({ frozen }: { frozen: boolean }) {
  // Deterministic: pick two opportunities per stage from the fixtures.
  const columns = STAGES.map((stage) =>
    opportunities.filter((o) => o.stage === stage).slice(0, 2),
  );
  const [boost, setBoost] = useState(0);

  useEffect(() => {
    if (frozen) return;
    const id = setInterval(() => setBoost((b) => (b + 1) % 3), 2600);
    return () => clearInterval(id);
  }, [frozen]);

  return (
    <div className="grid grid-cols-3 gap-2 md:gap-3">
      {columns.map((cards, ci) => (
        <div key={ci} className="min-w-0">
          <p className="mb-1.5 font-mono text-[9px] uppercase tracking-wider text-white/40 md:text-[10px]">
            {STAGE_LABEL[STAGES[ci]]}
          </p>
          <div className="space-y-1.5 md:space-y-2">
            {cards.map((o, i) => {
              const hot = boost === ci && i === 0;
              return (
                <div
                  key={o.id}
                  className={`rounded border px-2 py-1.5 transition-colors duration-500 md:px-2.5 md:py-2 ${
                    hot
                      ? "border-brand/60 bg-brand/10"
                      : "border-white/10 bg-white/[0.04]"
                  }`}
                >
                  <p className="truncate text-[10px] font-medium text-white/85 md:text-[11px]">
                    {o.title}
                  </p>
                  <p className="mt-0.5 font-mono text-[9px] text-white/45 md:text-[10px]">
                    ${Math.round(o.value / 1000)}K
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function OpsDashboard({ frozen }: { frozen: boolean }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (frozen) return;
    const id = setInterval(() => setTick((t) => t + 1), 3400);
    return () => clearInterval(id);
  }, [frozen]);

  const sla = (96.2 + ((tick % 3) * 0.1)).toFixed(1);
  const spark = "0,14 12,11 24,12 36,8 48,9 60,5 72,6 84,3";

  return (
    <div className="grid grid-cols-3 gap-2 md:gap-3">
      <div>
        <p className="font-mono text-[9px] uppercase tracking-wider text-white/40 md:text-[10px]">
          Open jobs
        </p>
        <p className="mt-1 font-mono text-lg font-semibold text-white md:text-xl">
          {128 + (tick % 3)}
        </p>
      </div>
      <div>
        <p className="font-mono text-[9px] uppercase tracking-wider text-white/40 md:text-[10px]">
          SLA 30d
        </p>
        <p className="mt-1 font-mono text-lg font-semibold text-white md:text-xl">
          {sla}%
        </p>
      </div>
      <div>
        <p className="font-mono text-[9px] uppercase tracking-wider text-white/40 md:text-[10px]">
          Utilization
        </p>
        <p className="mt-1 font-mono text-lg font-semibold text-white md:text-xl">
          84%
        </p>
      </div>
      <div className="col-span-3 mt-1">
        <svg viewBox="0 0 84 16" className="h-6 w-full" aria-hidden="true">
          <polyline
            points={spark}
            fill="none"
            stroke="var(--brand)"
            strokeWidth="1.4"
          />
        </svg>
      </div>
    </div>
  );
}

function FieldScreen() {
  const job = RELAY_JOBS[0];
  return (
    <div className="rounded-lg border border-white/15 bg-black/30 p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-[11px] font-medium text-white/90 md:text-xs">
          {job.customer}
        </p>
        <span className="shrink-0 rounded-sm bg-brand/20 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-brand md:text-[9px]">
          {job.status}
        </span>
      </div>
      <p className="mt-0.5 truncate font-mono text-[9px] text-white/45 md:text-[10px]">
        {job.site}
      </p>
      <ul className="mt-2 space-y-1">
        {job.checklist.slice(0, 2).map((c) => (
          <li key={c.id} className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full border border-brand/70" />
            <span className="truncate text-[9px] text-white/60 md:text-[10px]">
              {c.label.en}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ConceptLabel() {
  return (
    <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35 md:text-[9px]">
      Product concept
    </p>
  );
}

export function SurfacePanels({
  frozen,
  layout,
}: {
  frozen: boolean;
  layout: "stage" | "static";
}) {
  if (layout === "static") {
    return (
      <div className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-md border border-white/10 bg-white/[0.03] p-3">
          <ConceptLabel />
          <div className="mt-2">
            <PipelineBoard frozen />
          </div>
        </div>
        <div className="rounded-md border border-white/10 bg-white/[0.03] p-3">
          <ConceptLabel />
          <div className="mt-2">
            <OpsDashboard frozen />
          </div>
        </div>
        <div className="rounded-md border border-white/10 bg-white/[0.03] p-3">
          <ConceptLabel />
          <div className="mt-2">
            <FieldScreen />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3 md:gap-4"
      style={{ perspective: "1200px" }}
    >
      <div
        className="rounded-md border border-white/10 bg-white/[0.03] p-3 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)] md:p-4"
        style={{ transform: "rotateY(6deg) rotateX(2deg)" }}
      >
        <ConceptLabel />
        <p className="mb-2 mt-1 font-mono text-[10px] tracking-wide text-white/55 md:text-[11px]">
          Northline CRM
        </p>
        <PipelineBoard frozen={frozen} />
      </div>
      <div
        className="rounded-md border border-white/10 bg-white/[0.03] p-3 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)] md:p-4 sm:mt-6"
        style={{ transform: "rotateY(0deg)" }}
      >
        <ConceptLabel />
        <p className="mb-2 mt-1 font-mono text-[10px] tracking-wide text-white/55 md:text-[11px]">
          Operations dashboard
        </p>
        <OpsDashboard frozen={frozen} />
      </div>
      <div
        className="rounded-md border border-white/10 bg-white/[0.03] p-3 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)] md:p-4 sm:mt-12"
        style={{ transform: "rotateY(-6deg) rotateX(2deg)" }}
      >
        <ConceptLabel />
        <p className="mb-2 mt-1 font-mono text-[10px] tracking-wide text-white/55 md:text-[11px]">
          Relay Field
        </p>
        <FieldScreen />
      </div>
    </div>
  );
}
