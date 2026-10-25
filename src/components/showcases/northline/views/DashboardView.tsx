"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, CalendarDays, CheckSquare, Clock } from "lucide-react";
import { useNorthline } from "../store";
import { Avatar, Mono, Panel, PanelHeader, Pill, SegmentedControl, type StageTone } from "../primitives";
import { BarList, TrendChart } from "../charts";
import {
  dateDaysFromNow,
  formatCurrency,
  formatCurrencyCompact,
  formatDaysAgo,
  formatDue,
  formatShortDate,
} from "@/lib/showcases/northline/format";
import { STAGE_ORDER, type Stage } from "@/lib/showcases/northline/types";

/**
 * View 1 — Executive Dashboard (handoff §3.1). Every figure derives from the
 * shared store: pipeline sums come from opportunity records, the activity
 * trend from activity records within the selected range. No hardcoded totals.
 */

type Range = "7" | "30" | "90";

const COPY = {
  en: {
    greeting: "Good morning, Morgan",
    subline: "Here is where your active sales work stands today.",
    rangeLabel: "Activity range",
    kpiPipeline: "Open Pipeline Value",
    kpiActive: "Active Opportunities",
    kpiTasks: "Tasks Due",
    kpiWon: "Won Deals",
    byStage: "Pipeline value by stage",
    trend: "Activity trend",
    tasks: "Upcoming tasks",
    interactions: "Recent interactions",
    followUps: "Prioritized follow-ups",
    overdue: "overdue",
    noTasks: "Nothing due — clear run of play.",
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
    greeting: "Chào buổi sáng, Morgan",
    subline: "Tình trạng công việc bán hàng đang thực hiện của bạn hôm nay.",
    rangeLabel: "Khoảng hoạt động",
    kpiPipeline: "Giá trị cơ hội đang mở",
    kpiActive: "Cơ hội đang hoạt động",
    kpiTasks: "Công việc đến hạn",
    kpiWon: "Thỏa thuận đã chốt",
    byStage: "Giá trị cơ hội theo giai đoạn",
    trend: "Xu hướng hoạt động",
    tasks: "Công việc sắp tới",
    interactions: "Tương tác gần đây",
    followUps: "Cần ưu tiên theo dõi",
    overdue: "quá hạn",
    noTasks: "Không có việc đến hạn.",
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

export function DashboardView({ locale }: { locale: "en" | "vi" }) {
  const t = COPY[locale];
  const { data, teamById } = useNorthline();
  const [range, setRange] = useState<Range>("30");

  // KPIs derive from the shared opportunity records.
  const openOpps = data.opportunities.filter((o) => o.stage !== "won");
  const openPipeline = openOpps.reduce((s, o) => s + o.value, 0);
  const wonDeals = data.opportunities.filter((o) => o.stage === "won").length;
  const dueTasks = data.tasks.filter((tk) => !tk.done && tk.dueInDays <= 0);

  const rangeDays = Number(range);
  const inRange = data.activities.filter((a) => a.daysAgo <= rangeDays);

  // Trend: bucket activities per day across the range (max 12 buckets).
  const trendPoints = useMemo(() => {
    const buckets = Math.min(rangeDays, 12);
    const size = rangeDays / buckets;
    const points = Array.from({ length: buckets }, (_, i) => {
      const from = rangeDays - (i + 1) * size;
      const to = rangeDays - i * size;
      const label =
        rangeDays <= 7
          ? formatShortDate(dateDaysFromNow(-Math.round(to)), locale)
          : locale === "vi" ? `-${Math.round(to)}n` : `-${Math.round(to)}d`;
      const value = inRange.filter((a) => a.daysAgo > from && a.daysAgo <= to).length;
      return { label, value };
    });
    return points;
  }, [inRange, rangeDays, locale]);

  const byStage = STAGE_ORDER.map((stage) => {
    const opps = data.opportunities.filter((o) => o.stage === stage);
    return {
      label: t.stageLabels[stage],
      value: opps.reduce((s, o) => s + o.value, 0),
      count: opps.length,
      stage,
    };
  });

  const upcoming = [...data.tasks]
    .filter((tk) => !tk.done)
    .sort((a, b) => a.dueInDays - b.dueInDays)
    .slice(0, 5);

  const recent = [...data.activities].sort((a, b) => a.daysAgo - b.daysAgo).slice(0, 5);
  const followUps = [...data.leads]
    .filter((l) => l.status !== "unqualified")
    .sort((a, b) => b.estimatedValue - a.estimatedValue)
    .slice(0, 4);

  return (
    <div className="flex flex-col gap-4">
      {/* Header + range control */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{t.greeting}</h2>
          <p className="text-sm text-[var(--nl-muted)]">{t.subline}</p>
        </div>
        <SegmentedControl
          ariaLabel={t.rangeLabel}
          value={range}
          onChange={setRange}
          options={[
            { value: "7", label: locale === "vi" ? "7 ngày" : "7d" },
            { value: "30", label: locale === "vi" ? "30 ngày" : "30d" },
            { value: "90", label: locale === "vi" ? "90 ngày" : "90d" },
          ]}
        />
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard label={t.kpiPipeline} value={formatCurrency(openPipeline)} sub={`${openOpps.length} ${t.kpiActive.toLowerCase()}`} />
        <KpiCard label={t.kpiActive} value={String(openOpps.length)} sub={`${byStage.find((s) => s.stage === "negotiation")?.count ?? 0} ${t.stageLabels.negotiation.toLowerCase()}`} />
        <KpiCard label={t.kpiTasks} value={String(dueTasks.length)} sub={dueTasks.some((tk) => tk.dueInDays < 0) ? t.overdue : formatDue(0, locale)} tone={dueTasks.length > 0 ? "amber" : "neutral"} />
        <KpiCard label={t.kpiWon} value={String(wonDeals)} sub={t.stageLabels.won} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Central column */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <Panel>
            <PanelHeader title={t.byStage} />
            <div className="px-4 py-4">
              <BarList
                rows={byStage.map((s) => ({ label: s.label, value: s.value, count: s.count }))}
                ariaLabel={`${t.byStage}: ${byStage.map((s) => `${s.label} ${formatCurrency(s.value)}`).join(", ")}`}
              />
            </div>
          </Panel>
          <Panel>
            <PanelHeader title={`${t.trend} · ${range}${locale === "vi" ? " ngày" : "d"}`} />
            <div className="px-4 py-4">
              <TrendChart
                points={trendPoints}
                ariaLabel={`${t.trend}: ${inRange.length} ${locale === "vi" ? "hoạt động" : "activities"}`}
              />
            </div>
          </Panel>
          <Panel>
            <PanelHeader
              title={t.tasks}
              action={<CalendarDays size={15} strokeWidth={1.75} className="text-[var(--nl-muted)]" aria-hidden="true" />}
            />
            <ul className="divide-y divide-[var(--nl-border)]">
              {upcoming.map((tk) => {
                const owner = teamById(tk.ownerId);
                return (
                  <li key={tk.id} className="flex items-center gap-3 px-4 py-2.5">
                    <CheckSquare size={15} strokeWidth={1.75} className="shrink-0 text-[var(--nl-muted)]" aria-hidden="true" />
                    <span className="min-w-0 flex-1 truncate text-sm">{tk.title}</span>
                    <Pill tone={tk.dueInDays < 0 ? "danger" : tk.dueInDays === 0 ? "amber" : "muted"}>
                      {formatDue(tk.dueInDays, locale)}
                    </Pill>
                    {owner && <Avatar initials={owner.initials} hue={owner.hue} size={22} />}
                  </li>
                );
              })}
              {upcoming.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-[var(--nl-muted)]">{t.noTasks}</li>
              )}
            </ul>
          </Panel>
        </div>

        {/* Side column */}
        <div className="flex flex-col gap-4">
          <Panel>
            <PanelHeader title={t.interactions} />
            <ul className="divide-y divide-[var(--nl-border)]">
              {recent.map((a) => (
                <li key={a.id} className="flex gap-2.5 px-4 py-2.5">
                  <Clock size={14} strokeWidth={1.75} className="mt-0.5 shrink-0 text-[var(--nl-muted)]" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="truncate text-sm leading-snug">{a.summary}</p>
                    <p className="mt-0.5 text-xs text-[var(--nl-muted)]">
                      {t.activityTypes[a.type]} · {formatDaysAgo(a.daysAgo, locale)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel>
            <PanelHeader title={t.followUps} />
            <ul className="divide-y divide-[var(--nl-border)]">
              {followUps.map((l) => {
                const owner = teamById(l.ownerId);
                return (
                  <li key={l.id} className="flex items-center gap-3 px-4 py-2.5">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{l.name}</p>
                      <p className="truncate text-xs text-[var(--nl-muted)]">{l.nextStep}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Mono className="text-xs font-semibold">{formatCurrencyCompact(l.estimatedValue)}</Mono>
                      {owner && <Avatar initials={owner.initials} hue={owner.hue} size={20} />}
                    </div>
                  </li>
                );
              })}
            </ul>
          </Panel>
          <Panel className="bg-[var(--nl-accent-soft)]">
            <div className="flex items-start gap-2 px-4 py-3">
              <ArrowUpRight size={15} strokeWidth={1.75} className="mt-0.5 shrink-0 text-[var(--nl-accent)]" aria-hidden="true" />
              <p className="text-xs leading-relaxed text-[var(--nl-accent)]">
                {locale === "vi"
                  ? "Giá trị pipeline được tính trực tiếp từ các cơ hội trong Quy trình bán hàng."
                  : "Pipeline value is computed live from the opportunities in the Pipeline view."}
              </p>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function KpiCard({
  label,
  value,
  sub,
  tone = "neutral",
}: {
  label: string;
  value: string;
  sub: string;
  tone?: "neutral" | "amber";
}) {
  return (
    <div className="rounded-xl border border-[var(--nl-border)] bg-[var(--nl-surface)] px-4 py-3.5 shadow-[0_1px_2px_rgba(23,36,49,0.04)]">
      <p className="text-xs font-medium text-[var(--nl-muted)]">{label}</p>
      <p className={`mt-1 font-mono text-2xl font-semibold tabular-nums ${tone === "amber" ? "text-[var(--nl-warn-text)]" : "text-[var(--nl-ink)]"}`}>
        {value}
      </p>
      <p className="mt-0.5 truncate text-xs text-[var(--nl-muted)]">{sub}</p>
    </div>
  );
}
