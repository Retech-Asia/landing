"use client";

import { useMemo, useState } from "react";
import { ChevronUp, Info, Play } from "lucide-react";
import { useNorthline } from "../store";
import { KV, Mono, NlButton, Panel, PanelHeader, Pill, type StageTone } from "../primitives";
import { BarList, DonutChart } from "../charts";
import { formatCurrency, formatDaysAgo } from "@/lib/showcases/northline/format";
import { STAGE_ORDER, type ActivityType, type Stage } from "@/lib/showcases/northline/types";

/**
 * View 5 — Automation & Reporting (handoff §3.5). Rule records with a
 * toggleable simulated trigger walkthrough (nothing is ever sent), plus
 * operational reporting derived live from the shared dataset: pipeline value
 * by stage and activity distribution. No email, webhook, or integration runs.
 */

const ACTIVITY_COLORS: Record<ActivityType, string> = {
  call: "#167D72",
  email: "#0369A1",
  meeting: "#92400E",
  note: "#64748B",
  stage: "#15803D",
};

const ACTIVITY_ORDER: ActivityType[] = ["call", "email", "meeting", "note", "stage"];

const COPY = {
  en: {
    title: "Automation & Insights",
    summary:
      "Examine rule-based workflows, simulated triggers, and operational reporting without connecting to real external systems.",
    disclosure:
      "Everything on this screen is sample simulation. No emails, webhooks, or external systems are ever triggered.",
    rulesTitle: "Automation rules",
    statusActive: "Active",
    statusPaused: "Paused",
    trigger: "Trigger",
    action: "Action",
    runsMonth: "runs/mo",
    lastRun: "Last run",
    runPreview: "Run preview",
    hidePreview: "Hide preview",
    simNote: "Simulated preview — nothing was sent.",
    reporting: "Reporting",
    reportingNote: "Computed live from the sample dataset in this session.",
    pipelineByStage: "Pipeline value by stage",
    activityDistribution: "Activity distribution",
    donutCenter: "total",
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
    activityTypes: {
      call: "Call",
      email: "Email",
      meeting: "Meeting",
      note: "Note",
      stage: "Stage change",
    } as Record<string, string>,
  },
  vi: {
    title: "Tự động hóa & Báo cáo",
    summary:
      "Khám phá quy trình tự động, điều kiện kích hoạt mô phỏng và báo cáo vận hành mà không kết nối hệ thống thật.",
    disclosure:
      "Mọi thứ trên màn hình này chỉ là mô phỏng mẫu. Không có email, webhook hay hệ thống bên ngoài nào được kích hoạt.",
    rulesTitle: "Quy trình tự động",
    statusActive: "Đang chạy",
    statusPaused: "Tạm dừng",
    trigger: "Kích hoạt",
    action: "Hành động",
    runsMonth: "lần/tháng",
    lastRun: "Chạy gần nhất",
    runPreview: "Chạy mô phỏng",
    hidePreview: "Ẩn mô phỏng",
    simNote: "Mô phỏng — không có gì được gửi đi.",
    reporting: "Báo cáo",
    reportingNote: "Tính trực tiếp từ dữ liệu mẫu trong phiên xem này.",
    pipelineByStage: "Giá trị cơ hội theo giai đoạn",
    activityDistribution: "Phân bố hoạt động",
    donutCenter: "tổng",
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
    activityTypes: {
      call: "Cuộc gọi",
      email: "Email",
      meeting: "Cuộc họp",
      note: "Ghi chú",
      stage: "Chuyển giai đoạn",
    } as Record<string, string>,
  },
};

export function AutomationView({ locale }: { locale: "en" | "vi" }) {
  const t = COPY[locale];
  const { data } = useNorthline();

  // Only one simulated preview open at a time.
  const [openPreviewId, setOpenPreviewId] = useState<string | null>(null);

  // Pipeline value by stage — same derivation as the dashboard.
  const byStage = useMemo(
    () =>
      STAGE_ORDER.map((stage) => {
        const opps = data.opportunities.filter((o) => o.stage === stage);
        return {
          label: t.stageLabels[stage],
          value: opps.reduce((s, o) => s + o.value, 0),
          count: opps.length,
        };
      }),
    [data.opportunities, t.stageLabels]
  );

  const activitySlices = useMemo(
    () =>
      ACTIVITY_ORDER.map((type) => ({
        label: t.activityTypes[type],
        value: data.activities.filter((a) => a.type === type).length,
        color: ACTIVITY_COLORS[type],
      })),
    [data.activities, t.activityTypes]
  );

  return (
    <div className="flex flex-col gap-4">
      {/* View header */}
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{t.title}</h2>
        <p className="text-sm text-[var(--nl-muted)]">{t.summary}</p>
      </div>

      {/* Simulation disclosure */}
      <Panel className="bg-[var(--nl-accent-soft)]">
        <div className="flex items-start gap-2 px-4 py-3">
          <Info size={15} strokeWidth={1.75} className="mt-0.5 shrink-0 text-[var(--nl-accent)]" aria-hidden="true" />
          <p className="text-xs leading-relaxed text-[var(--nl-accent)]">{t.disclosure}</p>
        </div>
      </Panel>

      {/* Automation rules */}
      <h3 className="text-sm font-semibold text-[var(--nl-ink)]">{t.rulesTitle}</h3>
      <div className="flex flex-col gap-4">
        {data.rules.map((rule) => {
          const isOpen = openPreviewId === rule.id;
          return (
            <Panel key={rule.id}>
              <PanelHeader
                title={rule.name}
                action={
                  <Pill tone={rule.status === "active" ? "teal" : "muted"}>
                    {rule.status === "active" ? t.statusActive : t.statusPaused}
                  </Pill>
                }
              />
              <div className="flex flex-col gap-3 px-4 py-4">
                <p className="text-sm leading-relaxed text-[var(--nl-muted)]">{rule.description}</p>
                <dl className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                  <KV label={t.trigger}>{rule.trigger}</KV>
                  <KV label={t.action}>{rule.action}</KV>
                </dl>
                <p className="text-xs text-[var(--nl-muted)]">
                  <Mono className="font-semibold">{rule.runsPerMonth}</Mono> {t.runsMonth} ·{" "}
                  {t.lastRun} {formatDaysAgo(rule.lastRunDaysAgo, locale)}
                </p>
                <div>
                  <NlButton
                    variant="ghost"
                    aria-expanded={isOpen}
                    onClick={() => setOpenPreviewId(isOpen ? null : rule.id)}
                  >
                    {isOpen ? (
                      <ChevronUp size={14} strokeWidth={1.75} aria-hidden="true" />
                    ) : (
                      <Play size={14} strokeWidth={1.75} aria-hidden="true" />
                    )}
                    {isOpen ? t.hidePreview : t.runPreview}
                  </NlButton>
                </div>
                {isOpen && (
                  <div className="rounded-lg border border-[var(--nl-border)] bg-[var(--nl-canvas)] px-3 py-3">
                    <p className="text-sm font-medium text-[var(--nl-ink)]">{rule.preview.title}</p>
                    <ol className="mt-2 flex flex-col gap-1.5">
                      {rule.preview.steps.map((step, i) => (
                        <li key={step} className="flex gap-2 text-sm leading-snug text-[var(--nl-ink)]">
                          <span className="shrink-0 font-mono tabular-nums text-[var(--nl-muted)]">
                            {i + 1}.
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-[var(--nl-accent)]">
                      <Info size={13} strokeWidth={1.75} aria-hidden="true" />
                      {t.simNote}
                    </p>
                  </div>
                )}
              </div>
            </Panel>
          );
        })}
      </div>

      {/* Reporting */}
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold text-[var(--nl-ink)]">{t.reporting}</h3>
        <p className="text-xs text-[var(--nl-muted)]">{t.reportingNote}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel>
          <PanelHeader title={t.pipelineByStage} />
          <div className="px-4 py-4">
            <BarList
              rows={byStage.map((s) => ({ label: s.label, value: s.value, count: s.count }))}
              ariaLabel={`${t.pipelineByStage}: ${byStage
                .map((s) => `${s.label} ${formatCurrency(s.value)}`)
                .join(", ")}`}
            />
          </div>
        </Panel>
        <Panel>
          <PanelHeader title={t.activityDistribution} />
          <div className="px-4 py-4">
            <DonutChart
              slices={activitySlices}
              centerLabel={t.donutCenter}
              ariaLabel={`${t.activityDistribution}: ${activitySlices
                .map((s) => `${s.label} ${s.value}`)
                .join(", ")}`}
            />
          </div>
        </Panel>
      </div>
    </div>
  );
}
