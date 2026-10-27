"use client";

import type { TaskKind } from "@/lib/showcases/care/types";
import { pick } from "@/lib/showcases/care/format";
import { useCare } from "@/lib/showcases/care/store";
import {
  BookOpen,
  Check,
  Footprints,
  GlassWater,
  HeartPulse,
} from "lucide-react";
import {
  CcButton,
  CcCard,
  CcChip,
  CcLabel,
  CcProgressRing,
  CcWeekBars,
} from "../primitives";

/**
 * View 2 — Care plan: task check-ins (store-backed toggles) and weekly
 * progress with the compact chart shared by views 1-3 (Blueprint B).
 */

const KIND_META: Record<TaskKind, { icon: typeof Footprints; en: string; vi: string }> = {
  movement: { icon: Footprints, en: "Movement", vi: "Vận động" },
  habit: { icon: GlassWater, en: "Habit", vi: "Thói quen" },
  wellbeing: { icon: HeartPulse, en: "Wellbeing", vi: "Sức khỏe tinh thần" },
  learning: { icon: BookOpen, en: "Learning", vi: "Tìm hiểu" },
};

export function CarePlanView({ locale }: { locale: "en" | "vi" }) {
  const { data, toggleTask, planWeekDone, planWeekTarget } = useCare();
  const weekDone = planWeekDone();
  const weekTarget = planWeekTarget();

  return (
    <div className="flex flex-col gap-3 p-4">
      <CcCard>
        <div className="flex items-start gap-4">
          <CcProgressRing
            value={weekDone}
            max={weekTarget}
            ariaLabel={
              locale === "vi"
                ? `Tiến độ tuần này: ${weekDone} trên ${weekTarget} ghi nhận`
                : `This week: ${weekDone} of ${weekTarget} check-ins`
            }
          >
            <span className="text-base font-bold tabular-nums text-[var(--cc-ink)]">
              {weekTarget > 0 ? Math.round((weekDone / weekTarget) * 100) : 0}%
            </span>
          </CcProgressRing>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold leading-snug tracking-tight text-[var(--cc-ink)]">
                {pick(data.plan.name, locale)}
              </h2>
            </div>
            <p className="mt-0.5 text-xs leading-snug text-[var(--cc-secondary)]">
              {pick(data.plan.focus, locale)}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <CcChip tone="neutral">
                {locale === "vi"
                  ? `Tuần ${data.plan.weekOf}/${data.plan.totalWeeks}`
                  : `Week ${data.plan.weekOf} of ${data.plan.totalWeeks}`}
              </CcChip>
              <CcChip tone="muted">
                {locale === "vi"
                  ? `${data.plan.tasks.length} nhiệm vụ`
                  : `${data.plan.tasks.length} tasks`}
              </CcChip>
            </div>
          </div>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--cc-mist)]">
          <div
            className="h-full rounded-full bg-[var(--cc-accent)] transition-[width] duration-500"
            style={{
              width: `${weekTarget > 0 ? Math.min(100, (weekDone / weekTarget) * 100) : 0}%`,
            }}
          />
        </div>
        <p className="mt-1.5 text-xs text-[var(--cc-secondary)]">
          {locale === "vi"
            ? `${weekDone} trên ${weekTarget} ghi nhận tuần này`
            : `${weekDone} of ${weekTarget} check-ins this week`}
        </p>
        <CcWeekBars
          past={data.plan.weekHistory}
          todayValue={weekDone}
          max={Math.max(weekTarget, ...data.plan.weekHistory, 1)}
          locale={locale}
          ariaLabel={locale === "vi" ? "Ghi nhận 7 ngày qua" : "Check-ins over the last 7 days"}
          className="mt-3"
        />
      </CcCard>

      <div className="flex flex-col gap-2">
        <CcLabel>{locale === "vi" ? "Nhiệm vụ hằng ngày" : "Daily tasks"}</CcLabel>
        {data.plan.tasks.map((task) => {
          const meta = KIND_META[task.kind];
          const Icon = meta.icon;
          const weekCount = task.weekBase + (task.checkedToday ? 1 : 0);
          return (
            <div
              key={task.id}
              className="flex items-start gap-3 rounded-2xl border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3.5"
            >
              <span
                aria-hidden="true"
                className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--cc-accent-soft)] text-[var(--cc-accent)]"
              >
                <Icon size={15} strokeWidth={1.75} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-snug text-[var(--cc-ink)]">
                  {pick(task.title, locale)}
                </p>
                <p className="mt-0.5 text-xs leading-snug text-[var(--cc-secondary)]">
                  {pick(task.detail, locale)}
                </p>
                <p className="mt-1.5 text-[11px] font-semibold text-[var(--cc-secondary)]">
                  {locale === "vi"
                    ? `${weekCount}/${task.perWeek} tuần này · ${meta.vi}`
                    : `${weekCount}/${task.perWeek} this week · ${meta.en}`}
                </p>
              </div>
              <CcButton
                variant={task.checkedToday ? "secondary" : "primary"}
                aria-pressed={task.checkedToday}
                onClick={() => toggleTask(task.id)}
                className="shrink-0 px-3"
              >
                {task.checkedToday && <Check size={14} strokeWidth={2.25} aria-hidden="true" />}
                {task.checkedToday
                  ? locale === "vi"
                    ? "Đã xong"
                    : "Done today"
                  : locale === "vi"
                    ? "Ghi nhận"
                    : "Check in"}
              </CcButton>
            </div>
          );
        })}
      </div>
    </div>
  );
}
