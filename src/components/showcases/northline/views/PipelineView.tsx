"use client";

import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNorthline } from "../store";
import {
  Avatar,
  Mono,
  NlSelect,
  Pill,
  SegmentedControl,
  type StageTone,
} from "../primitives";
import { formatCurrency, formatCurrencyCompact } from "@/lib/showcases/northline/format";
import { STAGE_ORDER, type Opportunity, type Stage, type TeamMember } from "@/lib/showcases/northline/types";

/**
 * View 3 — Sales pipeline (handoff §3.3). Kanban columns per stage with
 * derived stage totals; stage movement happens through the accessible
 * per-card stage select (no drag-and-drop). Counts and sums derive from the
 * shared store, so dashboard/leads stay in sync automatically.
 */

const COPY = {
  en: {
    title: "Pipeline",
    subtitle:
      "Follow opportunities through sales stages with clear ownership, deal values, and next actions.",
    stageNav: "Filter by stage",
    moveTo: "Move to",
    nextAction: "Next action",
    emptyStage: "No opportunities in this stage.",
    stageLabels: {
      prospecting: "Prospecting",
      qualified: "Qualified",
      proposal: "Proposal",
      negotiation: "Negotiation",
      won: "Won",
    } as Record<Stage, string>,
    stageTones: {
      prospecting: "neutral",
      qualified: "teal",
      proposal: "blue",
      negotiation: "amber",
      won: "green",
    } as Record<Stage, StageTone>,
  },
  vi: {
    title: "Quy trình bán hàng",
    subtitle:
      "Theo dõi cơ hội kinh doanh qua từng giai đoạn với người phụ trách, giá trị dự kiến và bước tiếp theo.",
    stageNav: "Lọc theo giai đoạn",
    moveTo: "Chuyển sang",
    nextAction: "Bước tiếp theo",
    emptyStage: "Chưa có cơ hội ở giai đoạn này.",
    stageLabels: {
      prospecting: "Tiếp cận",
      qualified: "Đủ điều kiện",
      proposal: "Đề xuất",
      negotiation: "Đàm phán",
      won: "Đã chốt",
    } as Record<Stage, string>,
    stageTones: {
      prospecting: "neutral",
      qualified: "teal",
      proposal: "blue",
      negotiation: "amber",
      won: "green",
    } as Record<Stage, StageTone>,
  },
};

type Copy = (typeof COPY)["en" | "vi"];

export function PipelineView({ locale }: { locale: "en" | "vi" }) {
  const t = COPY[locale];
  const { data, moveOpportunity, accountById, teamById } = useNorthline();
  const [mobileStage, setMobileStage] = useState<Stage>("prospecting");

  const byStage = STAGE_ORDER.map((stage) => ({
    stage,
    opps: data.opportunities.filter((o) => o.stage === stage),
  }));
  const mobileColumn = byStage.find((s) => s.stage === mobileStage);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{t.title}</h2>
        <p className="text-sm text-[var(--nl-muted)]">{t.subtitle}</p>
      </div>

      {/* Kanban board (md and up) */}
      <div className="hidden overflow-x-auto pb-1 md:block">
        <div className="grid min-w-[940px] grid-cols-5 gap-3">
          {byStage.map(({ stage, opps }) => (
            <StageColumn
              key={stage}
              label={t.stageLabels[stage]}
              tone={t.stageTones[stage]}
              opps={opps}
              t={t}
              accountById={accountById}
              teamById={teamById}
              onMove={(opId, next) => moveOpportunity(opId, next)}
            />
          ))}
        </div>
      </div>

      {/* Single-column list with stage navigation (below md) */}
      <div className="flex flex-col gap-3 md:hidden">
        <div className="overflow-x-auto pb-1">
          <SegmentedControl
            ariaLabel={t.stageNav}
            value={mobileStage}
            onChange={setMobileStage}
            options={STAGE_ORDER.map((s) => ({ value: s, label: t.stageLabels[s] }))}
          />
        </div>
        {mobileColumn && (
          <StageColumn
            label={t.stageLabels[mobileColumn.stage]}
            tone={t.stageTones[mobileColumn.stage]}
            opps={mobileColumn.opps}
            t={t}
            accountById={accountById}
            teamById={teamById}
            onMove={(opId, next) => moveOpportunity(opId, next)}
          />
        )}
      </div>
    </div>
  );
}

function StageColumn({
  label,
  tone,
  opps,
  t,
  accountById,
  teamById,
  onMove,
}: {
  label: string;
  tone: StageTone;
  opps: Opportunity[];
  t: Copy;
  accountById: ReturnType<typeof useNorthline>["accountById"];
  teamById: ReturnType<typeof useNorthline>["teamById"];
  onMove: (opportunityId: string, stage: Stage) => void;
}) {
  const total = opps.reduce((s, o) => s + o.value, 0);
  return (
    <div className="flex min-w-0 flex-col rounded-xl border border-[var(--nl-border)] bg-[#FBFCFC]">
      <div className="flex items-center justify-between gap-2 border-b border-[var(--nl-border)] px-3 py-2.5">
        <span className="truncate text-xs font-semibold uppercase tracking-wide text-[var(--nl-ink)]">
          {label}
        </span>
        <Pill tone={tone}>{opps.length}</Pill>
      </div>
      <p className="px-3 pt-2 font-mono text-xs tabular-nums text-[var(--nl-muted)]">
        {formatCurrencyCompact(total)}
      </p>
      <div className="flex flex-1 flex-col gap-2 p-2">
        {opps.map((op) => (
          <OpportunityCard
            key={op.id}
            op={op}
            t={t}
            companyName={accountById(op.accountId)?.company}
            owner={teamById(op.ownerId)}
            onMove={(next) => onMove(op.id, next)}
          />
        ))}
        {opps.length === 0 && (
          <p className="rounded-lg border border-dashed border-[var(--nl-border)] px-3 py-4 text-center text-xs text-[var(--nl-muted)]">
            {t.emptyStage}
          </p>
        )}
      </div>
    </div>
  );
}

function OpportunityCard({
  op,
  t,
  companyName,
  owner,
  onMove,
}: {
  op: Opportunity;
  t: Copy;
  companyName?: string;
  owner?: TeamMember;
  onMove: (stage: Stage) => void;
}) {
  const moveId = useId();
  return (
    <div className="flex flex-col rounded-lg border border-[var(--nl-border)] bg-[var(--nl-surface)] p-3 shadow-[0_1px_2px_rgba(23,36,49,0.04)]">
      {companyName && <p className="truncate text-xs text-[var(--nl-muted)]">{companyName}</p>}
      <p className="mt-0.5 text-sm font-medium leading-snug">{op.title}</p>
      <p className="mt-1.5">
        <Mono className="text-sm font-semibold">{formatCurrency(op.value)}</Mono>
      </p>
      <p className="mt-2 flex items-center gap-1.5 text-xs text-[var(--nl-muted)]">
        <ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" className="shrink-0" />
        <span className="min-w-0 truncate">
          <span className="sr-only">{t.nextAction}: </span>
          {op.nextAction}
        </span>
      </p>
      {owner && (
        <p className="mt-2 flex min-w-0 items-center gap-1.5">
          <Avatar initials={owner.initials} hue={owner.hue} size={20} />
          <span className="truncate text-xs text-[var(--nl-muted)]">{owner.name}</span>
        </p>
      )}
      <div className="mt-3 border-t border-[var(--nl-border)] pt-2.5">
        <label
          htmlFor={moveId}
          className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[var(--nl-muted)]"
        >
          {t.moveTo}
        </label>
        <NlSelect
          id={moveId}
          aria-label={`${t.moveTo}: ${op.title}`}
          value={op.stage}
          onChange={(e) => onMove(e.target.value as Stage)}
          className="w-full text-xs"
        >
          {STAGE_ORDER.map((s) => (
            <option key={s} value={s}>
              {t.stageLabels[s]}
            </option>
          ))}
        </NlSelect>
      </div>
    </div>
  );
}
