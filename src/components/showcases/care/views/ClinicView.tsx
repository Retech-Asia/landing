"use client";

import { CalendarDays, ClipboardList, LayoutTemplate, Users } from "lucide-react";
import { formatDayLabel, formatTimeLabel, pick } from "@/lib/showcases/care/format";
import { useCare } from "@/lib/showcases/care/store";
import {
  CcAvatar,
  CcCard,
  CcChip,
} from "../primitives";

/**
 * View 6 — Clinic workspace (Blueprint B): the care team's desktop console —
 * today's patient roster, the day's schedule and the care-plan templates the
 * team assigns. The one desktop-width view in the demo.
 */

function SectionHeader({
  icon: Icon,
  title,
  meta,
}: {
  icon: typeof Users;
  title: string;
  meta: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[var(--cc-border)] px-4 py-3">
      <span className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-[var(--cc-ink)]">
        <Icon size={14} strokeWidth={1.75} aria-hidden="true" className="text-[var(--cc-accent)]" />
        {title}
      </span>
      <span className="text-xs text-[var(--cc-secondary)]">{meta}</span>
    </div>
  );
}

export function ClinicView({ locale }: { locale: "en" | "vi" }) {
  const { data, patientById, teamMemberById } = useCare();

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold leading-snug tracking-tight text-[var(--cc-ink)]">
            {locale === "vi" ? "Hôm nay tại phòng khám" : "Today at the clinic"}
          </h2>
          <p className="mt-0.5 text-xs text-[var(--cc-secondary)]">
            {locale === "vi"
              ? `Phòng khám gia đình Riverbend · ${data.roster.length} bệnh nhân · ${data.schedule.length} lịch hẹn`
              : `Riverbend Family Clinic · ${data.roster.length} patients · ${data.schedule.length} visits`}
          </p>
        </div>
        <CcChip tone="neutral">
          {locale === "vi" ? "Không gian phòng khám" : "Clinic workspace"}
        </CcChip>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <CcCard className="p-0">
          <SectionHeader
            icon={Users}
            title={locale === "vi" ? "Bệnh nhân hôm nay" : "Today's patients"}
            meta={locale === "vi" ? `${data.roster.length} người` : `${data.roster.length} people`}
          />
          <ul className="divide-y divide-[var(--cc-border)]">
            {data.roster.map((patient) => (
              <li key={patient.id} className="flex items-center gap-3 px-4 py-3">
                <CcAvatar initials={patient.initials} hue={patient.hue} size={34} />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 truncate text-sm font-semibold text-[var(--cc-ink)]">
                    {patient.name}
                    {patient.isPrimary && (
                      <CcChip tone="accent">
                        {locale === "vi" ? "Chính" : "Primary"}
                      </CcChip>
                    )}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-[var(--cc-secondary)]">
                    {pick(patient.program, locale)}
                  </p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="h-1 w-24 overflow-hidden rounded-full bg-[var(--cc-mist)]">
                      <span
                        className="block h-full rounded-full bg-[var(--cc-accent)]"
                        style={{
                          width: `${
                            patient.tasksTotal > 0
                              ? Math.min(100, (patient.tasksDone / patient.tasksTotal) * 100)
                              : 0
                          }%`,
                        }}
                      />
                    </span>
                    <span className="text-[11px] font-semibold tabular-nums text-[var(--cc-secondary)]">
                      {patient.tasksDone}/{patient.tasksTotal}
                    </span>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--cc-secondary)]">
                    {locale === "vi" ? "Tiếp theo" : "Next"}
                  </p>
                  <p className="text-xs font-semibold tabular-nums text-[var(--cc-ink)]">
                    {formatDayLabel(patient.nextVisitDayOffset, locale)}{" "}
                    {formatTimeLabel(patient.nextVisitTime, locale)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </CcCard>

        <CcCard className="p-0">
          <SectionHeader
            icon={CalendarDays}
            title={locale === "vi" ? "Lịch làm việc" : "Schedule"}
            meta={
              locale === "vi"
                ? `${data.schedule.length} lịch hẹn`
                : `${data.schedule.length} visits`
            }
          />
          <ul className="divide-y divide-[var(--cc-border)]">
            {data.schedule.map((slot) => {
              const patient = patientById(slot.patientId);
              const team = teamMemberById(slot.careTeamId);
              return (
                <li key={slot.id} className="flex items-center gap-3 px-4 py-3">
                  <span className="w-14 shrink-0 text-sm font-semibold tabular-nums text-[var(--cc-secondary)]">
                    {formatTimeLabel(slot.time, locale)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[var(--cc-ink)]">
                      {patient?.name ?? slot.patientId}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-[var(--cc-secondary)]">
                      {pick(slot.kind, locale)} · {team?.name ?? ""}
                    </p>
                  </div>
                  <CcChip tone={slot.mode === "video" ? "blue" : "muted"}>
                    {slot.mode === "video"
                      ? locale === "vi"
                        ? "Video"
                        : "Video"
                      : locale === "vi"
                        ? "Trực tiếp"
                        : "In person"}
                  </CcChip>
                </li>
              );
            })}
          </ul>
        </CcCard>
      </div>

      <CcCard className="p-0">
        <SectionHeader
          icon={LayoutTemplate}
          title={locale === "vi" ? "Mẫu kế hoạch chăm sóc" : "Care-plan templates"}
          meta={
            locale === "vi"
              ? `${data.templates.length} mẫu`
              : `${data.templates.length} templates`
          }
        />
        <div className="grid gap-3 p-4 sm:grid-cols-3">
          {data.templates.map((template) => (
            <div
              key={template.id}
              className="rounded-2xl border border-[var(--cc-border)] bg-[var(--cc-canvas)] p-3.5"
            >
              <p className="flex items-center gap-1.5 text-sm font-semibold text-[var(--cc-ink)]">
                <ClipboardList size={13} strokeWidth={1.75} aria-hidden="true" className="text-[var(--cc-accent)]" />
                {pick(template.name, locale)}
              </p>
              <p className="mt-1 text-xs leading-snug text-[var(--cc-secondary)]">
                {pick(template.focus, locale)}
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--cc-secondary)]">
                {locale === "vi"
                  ? `${template.tasks} nhiệm vụ · ${template.weeks} tuần · ${template.enrolled} đang theo`
                  : `${template.tasks} tasks · ${template.weeks} weeks · ${template.enrolled} enrolled`}
              </p>
            </div>
          ))}
        </div>
      </CcCard>
    </div>
  );
}
