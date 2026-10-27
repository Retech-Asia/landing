"use client";

import { Activity } from "lucide-react";
import { useCare } from "@/lib/showcases/care/store";
import { formatDayLabel, formatLongDate, pick } from "@/lib/showcases/care/format";
import {
  CcAppointmentCard,
  CcCard,
  CcChip,
  CcLabel,
  CcMedicationRow,
  CcProgressRing,
  CcWeekBars,
} from "../primitives";

/**
 * View 1 — Today: the patient's day at a glance (Blueprint B). Next
 * appointment, care-plan progress with a compact weekly chart, the next
 * medication reminder with its take action, and the shared activity log.
 */

export function TodayView({ locale }: { locale: "en" | "vi" }) {
  const {
    data,
    todayAppointment,
    teamMemberById,
    todayDoses,
    planWeekDone,
    planWeekTarget,
    toggleDose,
  } = useCare();

  const appointment = todayAppointment();
  const appointmentTeam = appointment ? teamMemberById(appointment.careTeamId) : undefined;
  const doses = todayDoses();
  const takenCount = doses.filter((entry) => entry.dose.taken).length;
  const nextDose = doses.find((entry) => !entry.dose.taken);
  const weekDone = planWeekDone();
  const weekTarget = planWeekTarget();

  return (
    <div className="flex flex-col gap-3 p-4">
      <div>
        <h2 className="text-lg font-semibold leading-snug tracking-tight text-[var(--cc-ink)]">
          {locale === "vi" ? "Chào buổi sáng," : "Good morning,"} {data.persona.name.split(" ")[0]}
        </h2>
        <p className="mt-0.5 text-xs text-[var(--cc-secondary)]">{formatLongDate(0, locale)}</p>
      </div>

      {appointment && (
        <CcCard className="p-0">
          <div className="flex items-center justify-between gap-2 px-4 pt-3.5">
            <CcLabel>{locale === "vi" ? "Lịch hẹn tiếp theo" : "Next appointment"}</CcLabel>
            <CcChip tone="muted">{formatDayLabel(appointment.dayOffset, locale)}</CcChip>
          </div>
          <div className="p-3 pt-2">
            <CcAppointmentCard
              appointment={appointment}
              locale={locale}
              teamName={appointmentTeam?.name ?? ""}
            />
          </div>
        </CcCard>
      )}

      <CcCard>
        <div className="flex items-center justify-between gap-2">
          <CcLabel>{locale === "vi" ? "Kế hoạch chăm sóc" : "Care plan"}</CcLabel>
          <CcChip tone="neutral">
            {locale === "vi"
              ? `Tuần ${data.plan.weekOf}/${data.plan.totalWeeks}`
              : `Week ${data.plan.weekOf} of ${data.plan.totalWeeks}`}
          </CcChip>
        </div>
        <div className="mt-3 flex items-center gap-4">
          <CcProgressRing
            value={weekDone}
            max={weekTarget}
            ariaLabel={
              locale === "vi"
                ? `Tiến độ tuần này: ${weekDone} trên ${weekTarget} ghi nhận`
                : `This week: ${weekDone} of ${weekTarget} check-ins`
            }
          >
            <span className="text-base font-bold tabular-nums text-[var(--cc-ink)]">{weekDone}</span>
            <span className="text-[10px] font-medium text-[var(--cc-secondary)]">/ {weekTarget}</span>
          </CcProgressRing>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[var(--cc-ink)]">{pick(data.plan.name, locale)}</p>
            <p className="mt-0.5 text-xs leading-snug text-[var(--cc-secondary)]">
              {locale === "vi"
                ? `${weekDone} trên ${weekTarget} ghi nhận tuần này`
                : `${weekDone} of ${weekTarget} check-ins this week`}
            </p>
          </div>
        </div>
        <CcWeekBars
          past={data.plan.weekHistory}
          todayValue={weekDone}
          max={Math.max(weekTarget, ...data.plan.weekHistory, 1)}
          locale={locale}
          ariaLabel={locale === "vi" ? "Ghi nhận 7 ngày qua" : "Check-ins over the last 7 days"}
          className="mt-3"
        />
      </CcCard>

      <CcCard>
        <div className="flex items-center justify-between gap-2">
          <CcLabel>{locale === "vi" ? "Nhắc thuốc" : "Medication reminder"}</CcLabel>
          <CcChip tone={nextDose ? "accent" : "neutral"}>
            {nextDose
              ? locale === "vi"
                ? "Sắp tới"
                : "Upcoming"
              : locale === "vi"
                ? "Đủ hôm nay"
                : "All done today"}
          </CcChip>
        </div>
        {nextDose ? (
          <div className="mt-3 flex flex-col gap-2">
            <CcMedicationRow
              medication={nextDose.medication}
              dose={nextDose.dose}
              locale={locale}
              onToggle={() => toggleDose(nextDose.medication.id, nextDose.dose.id)}
            />
            <p className="text-xs text-[var(--cc-secondary)]">
              {locale === "vi"
                ? `${doses.length - takenCount} trên ${doses.length} liều còn lại hôm nay`
                : `${doses.length - takenCount} of ${doses.length} doses left today`}
            </p>
          </div>
        ) : (
          <p className="mt-3 rounded-2xl border border-[var(--cc-border)] bg-[var(--cc-mist)] p-3 text-sm text-[var(--cc-secondary)]">
            {locale === "vi"
              ? "Bạn đã uống đủ thuốc hôm nay. Hẹn gặp lại vào buổi sáng mai."
              : "Every dose is taken for today. See you again tomorrow morning."}
          </p>
        )}
      </CcCard>

      <CcCard>
        <div className="flex items-center gap-1.5">
          <Activity size={13} strokeWidth={1.75} aria-hidden="true" className="text-[var(--cc-secondary)]" />
          <CcLabel>{locale === "vi" ? "Hoạt động gần đây" : "Recent activity"}</CcLabel>
        </div>
        {data.activity.length === 0 ? (
          <p className="mt-2 text-xs text-[var(--cc-secondary)]">
            {locale === "vi"
              ? "Chưa có hoạt động nào trong phiên này."
              : "Nothing logged in this session yet."}
          </p>
        ) : (
          <ul className="mt-2 flex flex-col gap-1.5">
            {data.activity.slice(0, 4).map((entry) => (
              <li
                key={entry.id}
                className="flex items-start gap-2 rounded-xl bg-[var(--cc-mist)] px-3 py-2 text-[13px] leading-snug text-[var(--cc-ink)]"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--cc-accent)]"
                />
                {pick(entry.summary, locale)}
              </li>
            ))}
          </ul>
        )}
      </CcCard>
    </div>
  );
}
