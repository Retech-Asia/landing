"use client";

import { Clock, MapPin, X } from "lucide-react";
import { formatDayLabel, formatTimeLabel, pick } from "@/lib/showcases/care/format";
import { useCare } from "@/lib/showcases/care/store";
import { CcAppointmentCard, CcButton, CcCard, CcChip, CcLabel } from "../primitives";

/**
 * View 4 — Appointments: upcoming and past visits, preparation steps and the
 * reschedule request state (request from the app, clinic confirms) per
 * Blueprint B.
 */

/** Fictional clinic details shown with the visit list. */
function ClinicInfo({ locale }: { locale: "en" | "vi" }) {
  return (
    <div className="text-[13px] leading-relaxed">
      <p className="font-semibold text-[var(--cc-ink)]">
        {locale === "vi" ? "Phòng khám gia đình Riverbend" : "Riverbend Family Clinic"}
      </p>
      <p className="mt-0.5 text-[var(--cc-secondary)]">
        {locale === "vi"
          ? "214 Phố Alder, Suite 3 · (503) 555-0114"
          : "214 Alder Street, Suite 3 · (503) 555-0114"}
      </p>
      <p className="mt-0.5 text-[var(--cc-secondary)]">
        {locale === "vi"
          ? "Thứ Hai đến Thứ Sáu, 8:00 đến 17:00"
          : "Monday to Friday, 8:00 AM to 5:00 PM"}
      </p>
    </div>
  );
}

export function AppointmentsView({ locale }: { locale: "en" | "vi" }) {
  const { upcomingAppointments, pastAppointments, teamMemberById, requestReschedule, cancelReschedule } =
    useCare();
  const upcoming = upcomingAppointments();
  const past = pastAppointments();

  return (
    <div className="flex flex-col gap-3 p-4">
      <div>
        <h2 className="text-lg font-semibold leading-snug tracking-tight text-[var(--cc-ink)]">
          {locale === "vi" ? "Lịch hẹn" : "Appointments"}
        </h2>
        <p className="mt-0.5 text-xs text-[var(--cc-secondary)]">
          {locale === "vi"
            ? `${upcoming.length} lịch sắp tới · ${past.length} lịch đã qua`
            : `${upcoming.length} upcoming · ${past.length} past`}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <CcLabel>{locale === "vi" ? "Sắp tới" : "Upcoming"}</CcLabel>
        {upcoming.map((appointment) => {
          const team = teamMemberById(appointment.careTeamId);
          const request = appointment.rescheduleRequest;
          return (
            <CcAppointmentCard
              key={appointment.id}
              appointment={appointment}
              locale={locale}
              teamName={team?.name ?? ""}
              showPrep
              footer={
                <div className="flex flex-col gap-2">
                  {request ? (
                    <div className="flex items-start justify-between gap-2 rounded-xl bg-[var(--cc-info-bg)] px-3 py-2.5">
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-[var(--cc-info-text)]">
                          {locale === "vi" ? "Đã yêu cầu đổi lịch" : "Reschedule requested"}
                        </p>
                        <p className="mt-0.5 text-xs leading-snug text-[var(--cc-info-text)]">
                          {pick(request.note, locale)}{" "}
                          {locale === "vi" ? "Đề xuất: " : "Suggested: "}
                          {formatDayLabel(request.dayOffset, locale)},{" "}
                          {formatTimeLabel(request.time, locale)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => cancelReschedule(appointment.id)}
                        aria-label={
                          locale === "vi" ? "Rút lại yêu cầu đổi lịch" : "Withdraw reschedule request"
                        }
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--cc-info-text)] transition-colors hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cc-accent)]"
                      >
                        <X size={14} aria-hidden="true" />
                      </button>
                    </div>
                  ) : (
                    <CcButton
                      variant="secondary"
                      onClick={() => requestReschedule(appointment.id)}
                      className="w-full"
                    >
                      <Clock size={14} strokeWidth={1.75} aria-hidden="true" />
                      {locale === "vi" ? "Yêu cầu đổi lịch" : "Request reschedule"}
                    </CcButton>
                  )}
                </div>
              }
            />
          );
        })}
      </div>

      <div className="flex flex-col gap-2">
        <CcLabel>{locale === "vi" ? "Đã qua" : "Past"}</CcLabel>
        {past.map((appointment) => {
          const team = teamMemberById(appointment.careTeamId);
          return (
            <div
              key={appointment.id}
              className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--cc-border)] bg-[var(--cc-mist)] px-3.5 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[var(--cc-ink)]">
                  {pick(appointment.kind, locale)}
                </p>
                <p className="mt-0.5 truncate text-xs text-[var(--cc-secondary)]">
                  {team?.name ?? ""}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-xs tabular-nums text-[var(--cc-secondary)]">
                  {formatDayLabel(appointment.dayOffset, locale)} ·{" "}
                  {formatTimeLabel(appointment.time, locale)}
                </span>
                <CcChip tone="muted">
                  {locale === "vi" ? "Đã xong" : "Completed"}
                </CcChip>
              </div>
            </div>
          );
        })}
      </div>

      <CcCard>
        <div className="flex items-center gap-1.5">
          <MapPin size={13} strokeWidth={1.75} aria-hidden="true" className="text-[var(--cc-secondary)]" />
          <CcLabel>{locale === "vi" ? "Phòng khám" : "Clinic"}</CcLabel>
        </div>
        <div className="mt-2">
          <ClinicInfo locale={locale} />
        </div>
      </CcCard>
    </div>
  );
}
