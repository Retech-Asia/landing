"use client";

import { useState } from "react";
import { CalendarCheck, Check, ClipboardList, UserPlus } from "lucide-react";
import { cn } from "@/lib/cn";
import { useProperty } from "@/lib/showcases/property/store";
import {
  appointmentStatusLabel,
  formatArea,
  formatCurrency,
  formatShortDate,
  formatTimeFromOffset,
  occupancyLabel,
  propertyStatusLabel,
} from "@/lib/showcases/property/format";
import { PROPERTY_NOW, type Appointment, type DemoLocale } from "@/lib/showcases/property/types";
import {
  PsAvatar,
  PsButton,
  PsChip,
  PsInput,
  PsSelect,
  PsPhonePanel,
} from "../primitives";

/**
 * View 5 — Agent Companion (Blueprint A): the on-site sheet in a
 * phone-width panel (hairline frame, no device bezel). Today's appointments
 * for the signed-in agent, property facts for the selected appointment,
 * quick lead capture, and appointment check-in.
 */

/** The companion is one agent's on-site sheet; Priya runs today's tour loop. */
const ON_DUTY_AGENT_ID = "ag-priya";

const STATUS_TONE = {
  scheduled: "blue",
  checked_in: "accent",
  completed: "green",
  no_show: "red",
} as const;

const COPY = {
  en: {
    onSite: "On-site sheet",
    todayLabel: "Today",
    appointments: "Today's appointments",
    propertyFacts: "Property facts",
    listPrice: "List price",
    specs: "Specs",
    occupancy: "Occupancy",
    visitor: "Visitor",
    checkIn: "Check in",
    checkedIn: "Checked in",
    completed: "Completed",
    noAppointment: "Select an appointment to see property facts.",
    capture: "Quick lead capture",
    nameLabel: "Name",
    namePlaceholder: "Visitor name",
    interestLabel: "Interested in",
    interestPlaceholder: "Select a property",
    submit: "Save lead",
    saved: "Lead saved to the pipeline.",
    errName: "Enter the visitor's name.",
    errInterest: "Select the property they asked about.",
    activity: "Recent activity",
    noAppointments: "No appointments left today.",
  },
  vi: {
    onSite: "Phiếu hiện trường",
    todayLabel: "Hôm nay",
    appointments: "Lịch hẹn hôm nay",
    propertyFacts: "Thông tin bất động sản",
    listPrice: "Giá rao",
    specs: "Thông số",
    occupancy: "Tình trạng sử dụng",
    visitor: "Khách tham quan",
    checkIn: "Xác nhận có mặt",
    checkedIn: "Đã xác nhận",
    completed: "Hoàn tất",
    noAppointment: "Chọn một lịch hẹn để xem thông tin bất động sản.",
    capture: "Ghi nhận khách hàng nhanh",
    nameLabel: "Tên",
    namePlaceholder: "Tên khách tham quan",
    interestLabel: "Quan tâm",
    interestPlaceholder: "Chọn bất động sản",
    submit: "Lưu khách hàng",
    saved: "Đã lưu vào quy trình khách hàng.",
    errName: "Nhập tên khách tham quan.",
    errInterest: "Chọn bất động sản khách quan tâm.",
    activity: "Hoạt động gần đây",
    noAppointments: "Hôm nay không còn lịch hẹn.",
  },
} as const;

export function CompanionView({ locale }: { locale: DemoLocale }) {
  const t = COPY[locale];
  const { data, agentById, propertyById, leadById, checkInAppointment, captureLead } = useProperty();
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>("A-405");
  const [visitorName, setVisitorName] = useState("");
  const [interestId, setInterestId] = useState("");
  const [errors, setErrors] = useState<{ name?: string; interest?: string }>({});
  const [saved, setSaved] = useState(false);

  const agent = agentById(ON_DUTY_AGENT_ID);
  const appointments = data.appointments
    .filter((a) => a.agentId === ON_DUTY_AGENT_ID)
    .sort((a, b) => a.offsetMinutes - b.offsetMinutes);
  const selected: Appointment | null =
    appointments.find((a) => a.id === selectedAppointmentId) ?? null;
  const selectedProperty = selected ? propertyById(selected.propertyId) : undefined;
  const selectedLead = selected ? leadById(selected.leadId) : undefined;

  const submitCapture = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: { name?: string; interest?: string } = {};
    if (!visitorName.trim()) nextErrors.name = t.errName;
    if (!interestId) nextErrors.interest = t.errInterest;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSaved(false);
      return;
    }
    captureLead(visitorName, interestId);
    setVisitorName("");
    setInterestId("");
    setSaved(true);
  };

  return (
    <PsPhonePanel title={t.onSite}>
      {/* On-site header */}
      <div className="flex items-center justify-between gap-3 border-b border-[var(--ps-border)] px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          {agent && <PsAvatar initials={agent.initials} hue={agent.hue} size={34} />}
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ps-secondary)]">
              {t.onSite}
            </p>
            <p className="truncate text-sm font-semibold text-[var(--ps-ink)]">{agent?.name}</p>
          </div>
        </div>
        <span className="shrink-0 text-xs text-[var(--ps-secondary)]">
          {t.todayLabel} · {formatShortDate(PROPERTY_NOW, locale)}
        </span>
      </div>

      {/* Today's appointments */}
      <div className="border-b border-[var(--ps-border)] px-4 py-3">
        <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[var(--ps-ink)]">
          {t.appointments}
        </h3>
        <ul className="mt-2 flex flex-col gap-2">
          {appointments.map((appointment) => {
            const property = propertyById(appointment.propertyId);
            const lead = leadById(appointment.leadId);
            const isActive = appointment.id === selectedAppointmentId;
            return (
              <li key={appointment.id}>
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelectedAppointmentId(appointment.id)}
                  className={cn(
                    "min-h-[44px] w-full rounded-md border px-3 py-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ps-accent)]",
                    isActive
                      ? "border-[var(--ps-accent)] bg-[var(--ps-accent-soft)]"
                      : "border-[var(--ps-border)] bg-[var(--ps-surface)] hover:border-[var(--ps-accent)]/60"
                  )}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-semibold tabular-nums text-[var(--ps-ink)]">
                      {formatTimeFromOffset(appointment.offsetMinutes, locale)}
                    </span>
                    <PsChip tone={STATUS_TONE[appointment.state]}>
                      {appointmentStatusLabel(appointment.state, locale)}
                    </PsChip>
                  </span>
                  <span className="mt-0.5 block truncate text-sm font-medium text-[var(--ps-ink)]">
                    {property?.address ?? appointment.propertyId}
                  </span>
                  <span className="block truncate text-xs text-[var(--ps-secondary)]">
                    {lead?.name ?? appointment.leadId}
                  </span>
                </button>
              </li>
            );
          })}
          {appointments.length === 0 && (
            <li className="py-4 text-center text-sm text-[var(--ps-secondary)]">{t.noAppointments}</li>
          )}
        </ul>
      </div>

      {/* Property facts for the selected appointment */}
      <div className="border-b border-[var(--ps-border)] px-4 py-3">
        <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[var(--ps-ink)]">
          {t.propertyFacts}
        </h3>
        {selected && selectedProperty ? (
          <div className="mt-2">
            <p className="text-sm font-semibold leading-snug text-[var(--ps-ink)]">
              {selectedProperty.address}
            </p>
            <p className="mt-1 flex items-center justify-between gap-2">
              <span className="text-base font-semibold tabular-nums text-[var(--ps-ink)]">
                {formatCurrency(selectedProperty.listPrice)}
              </span>
              <PsChip tone="muted">{propertyStatusLabel(selectedProperty.status, locale)}</PsChip>
            </p>
            <dl className="mt-2 space-y-1 text-xs text-[var(--ps-secondary)]">
              <div className="flex justify-between gap-2">
                <dt>{t.specs}</dt>
                <dd className="text-right text-[var(--ps-ink)]">
                  {selectedProperty.beds} bd · {selectedProperty.baths} ba ·{" "}
                  {formatArea(selectedProperty.areaSqft)} sq ft
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt>{t.occupancy}</dt>
                <dd className="text-right text-[var(--ps-ink)]">
                  {occupancyLabel(selectedProperty.occupancy, locale)}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt>{t.visitor}</dt>
                <dd className="text-right text-[var(--ps-ink)]">{selectedLead?.name}</dd>
              </div>
            </dl>
            {selected.state === "scheduled" ? (
              <PsButton
                variant="primary"
                onClick={() => checkInAppointment(selected.id)}
                className="mt-3 w-full text-sm"
              >
                <CalendarCheck size={15} aria-hidden="true" />
                {t.checkIn}
              </PsButton>
            ) : (
              <p className="mt-3 inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-md bg-[var(--ps-ok-bg)] text-sm font-medium text-[var(--ps-ok-text)]">
                <Check size={15} aria-hidden="true" />
                {selected.state === "checked_in" ? t.checkedIn : t.completed}
              </p>
            )}
          </div>
        ) : (
          <p className="mt-2 text-sm text-[var(--ps-secondary)]">{t.noAppointment}</p>
        )}
      </div>

      {/* Quick lead capture */}
      <div className="border-b border-[var(--ps-border)] px-4 py-3">
        <h3 className="flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-wide text-[var(--ps-ink)]">
          <UserPlus size={14} strokeWidth={1.75} aria-hidden="true" />
          {t.capture}
        </h3>
        <form onSubmit={submitCapture} noValidate className="mt-2 flex flex-col gap-2">
          <div>
            <label htmlFor="ps-capture-name" className="text-xs font-medium text-[var(--ps-secondary)]">
              {t.nameLabel}
            </label>
            <PsInput
              id="ps-capture-name"
              value={visitorName}
              onChange={(e) => {
                setVisitorName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder={t.namePlaceholder}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "ps-capture-name-error" : undefined}
              className="mt-1"
            />
            {errors.name && (
              <p id="ps-capture-name-error" className="mt-1 text-xs font-medium text-[var(--ps-error-text)]">
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="ps-capture-interest" className="text-xs font-medium text-[var(--ps-secondary)]">
              {t.interestLabel}
            </label>
            <PsSelect
              id="ps-capture-interest"
              value={interestId}
              onChange={(e) => {
                setInterestId(e.target.value);
                if (errors.interest) setErrors((prev) => ({ ...prev, interest: undefined }));
              }}
              aria-invalid={errors.interest ? true : undefined}
              aria-describedby={errors.interest ? "ps-capture-interest-error" : undefined}
              className="mt-1"
            >
              <option value="">{t.interestPlaceholder}</option>
              {data.properties.map((property) => (
                <option key={property.id} value={property.id}>
                  {property.address}
                </option>
              ))}
            </PsSelect>
            {errors.interest && (
              <p id="ps-capture-interest-error" className="mt-1 text-xs font-medium text-[var(--ps-error-text)]">
                {errors.interest}
              </p>
            )}
          </div>
          <PsButton type="submit" variant="primary" className="w-full text-sm">
            <ClipboardList size={15} aria-hidden="true" />
            {t.submit}
          </PsButton>
          {saved && (
            <p role="status" className="text-xs font-medium text-[var(--ps-ok-text)]">
              {t.saved}
            </p>
          )}
        </form>
      </div>

      {/* Recent activity */}
      <div className="px-4 py-3">
        <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[var(--ps-ink)]">
          {t.activity}
        </h3>
        <ul className="mt-2 flex flex-col gap-1.5">
          {data.activity.slice(0, 5).map((event) => (
            <li key={event.id} className="flex items-start gap-2 text-xs leading-snug">
              <span
                aria-hidden="true"
                className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ps-accent)]"
              />
              <span className="text-[var(--ps-ink)]">{event.summary}</span>
            </li>
          ))}
        </ul>
      </div>
    </PsPhonePanel>
  );
}
