"use client";

import { useEffect, useState } from "react";
import { opportunities } from "@/lib/showcases/northline/fixtures";
import { RELAY_JOBS } from "@/lib/showcases/relay/fixtures";

/**
 * Concept II hero evidence: product surfaces built from the deterministic
 * showcase fixtures. All fictional -> mono "Product concept" label on every
 * panel. Data ticks are idle-only and freeze the moment the user scrolls.
 *
 * Aurora integration (2026-10-26 owner correction): the stage carries TWO
 * screen-like surfaces (CRM pipeline board, field-service mobile screen) —
 * the operations metric dashboard was retired as "generic floating dashboard
 * metrics". Panels are borderless glass (no card chrome) and EMERGE
 * progressively via the scroll-driven `emerge` 0..1 (staggered windows),
 * rather than being permanently visible from the first frame.
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
                  className={`rounded bg-white/[0.04] px-2 py-1.5 transition-colors duration-500 md:px-2.5 md:py-2 ${
                    hot ? "bg-brand/15" : ""
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

function FieldScreen() {
  const job = RELAY_JOBS[0];
  return (
    <div className="rounded-lg bg-white/[0.04] p-3">
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

/** Per-panel emergence style from the global emerge progress (0..1). */
function panelStyle(emerge: number, from: number, to: number) {
  const e = Math.min(1, Math.max(0, (emerge - from) / (to - from)));
  return {
    opacity: e,
    transform: `translateY(${((1 - e) * 40).toFixed(1)}px) scale(${(0.96 + 0.04 * e).toFixed(4)})`,
  };
}

export function SurfacePanels({
  frozen,
  layout,
  emerge = 1,
}: {
  frozen: boolean;
  layout: "stage" | "static";
  /** Scroll-driven emergence 0..1; 1 = fully shown (static fallback). */
  emerge?: number;
}) {
  const glass =
    "rounded-xl bg-[#0E1626]/70 shadow-[0_40px_90px_-32px_rgba(0,0,0,0.9)] backdrop-blur-md";

  if (layout === "static") {
    return (
      <div className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-[1.35fr_1fr]">
        <div className={`${glass} p-3 md:p-4`}>
          <ConceptLabel />
          <p className="mb-2 mt-1 font-mono text-[10px] tracking-wide text-white/55 md:text-[11px]">
            Northline CRM
          </p>
          <PipelineBoard frozen />
        </div>
        <div className={`${glass} p-3 md:p-4`}>
          <ConceptLabel />
          <p className="mb-2 mt-1 font-mono text-[10px] tracking-wide text-white/55 md:text-[11px]">
            Relay Field
          </p>
          <FieldScreen />
        </div>
      </div>
    );
  }

  return (
    <div
      className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-[1.35fr_1fr] md:gap-5"
      style={{ perspective: "1200px" }}
    >
      <div
        className={`${glass} p-3 will-change-transform md:p-4`}
        style={{
          ...panelStyle(emerge, 0, 0.55),
          transform: `${panelStyle(emerge, 0, 0.55).transform} rotateY(5deg) rotateX(2deg)`,
        }}
      >
        <ConceptLabel />
        <p className="mb-2 mt-1 font-mono text-[10px] tracking-wide text-white/55 md:text-[11px]">
          Northline CRM
        </p>
        <PipelineBoard frozen={frozen} />
      </div>
      <div
        className={`${glass} p-3 will-change-transform md:p-4 sm:mt-10`}
        style={{
          ...panelStyle(emerge, 0.4, 1),
          transform: `${panelStyle(emerge, 0.4, 1).transform} rotateY(-5deg) rotateX(2deg)`,
        }}
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
