"use client";

import { useMemo, useState } from "react";
import { Bath, BedDouble, CalendarCheck, ChevronRight, FileText, MapPin, Ruler } from "lucide-react";
import { cn } from "@/lib/cn";
import { useProperty } from "@/lib/showcases/property/store";
import {
  appointmentStatusLabel,
  formatArea,
  formatCurrency,
  formatCurrencyCompact,
  formatDaysAgo,
  formatTimeFromOffset,
  leadStageLabel,
  occupancyLabel,
  offerStatusLabel,
  propertyStatusLabel,
  propertyTypeLabel,
} from "@/lib/showcases/property/format";
import type {
  AppointmentState,
  DemoLocale,
  OfferState,
  PropertyStatus,
} from "@/lib/showcases/property/types";
import {
  PsButton,
  PsChip,
  PsKV,
  PsMono,
  PsPanel,
  PsPanelHeader,
  PsPhonePanel,
  PsSelect,
  PsStat,
  SchematicTile,
  type PsChipTone,
} from "../primitives";

/**
 * View 1 — Property Detail (Blueprint A hero view): one connected property
 * record. Gallery strip (schematic tiles only, no photography), specs,
 * price and status, location, documents, linked leads and offers, plus a
 * phone-width companion panel showing the same record condensed.
 */

const ROOM_LABELS: Record<DemoLocale, string[]> = {
  en: ["Exterior", "Living room", "Kitchen", "Primary suite", "Bath", "Dining", "Bedroom", "Patio", "Floor plan", "Garden"],
  vi: ["Ngoài trời", "Phòng khách", "Nhà bếp", "Phòng chính", "Phòng tắm", "Phòng ăn", "Phòng ngủ", "Sân", "Mặt bằng", "Vườn"],
};

const STATUS_TONE: Record<PropertyStatus, PsChipTone> = {
  available: "green",
  pending: "amber",
  offered: "blue",
  closed: "neutral",
};

const APPOINTMENT_TONE: Record<AppointmentState, PsChipTone> = {
  scheduled: "blue",
  checked_in: "accent",
  completed: "green",
  no_show: "red",
};

const OFFER_TONE: Record<OfferState, PsChipTone> = {
  draft: "neutral",
  sent: "blue",
  accepted: "green",
  declined: "red",
};

const COPY = {
  en: {
    pickerLabel: "Select property",
    listed: (days: number) => `Listed ${formatDaysAgo(days, "en").toLowerCase()}`,
    specs: "Specifications",
    beds: "Beds",
    baths: "Baths",
    area: "Floor area",
    lot: "Lot",
    year: "Year built",
    parking: "Parking",
    hoa: "HOA fee",
    perMonth: "/mo",
    sqft: "sq ft",
    none: "None",
    location: "Location",
    district: "District",
    city: "City",
    mapRef: "Map reference",
    documents: "Documents",
    updated: (days: number) => `Updated ${formatDaysAgo(days, "en").toLowerCase()}`,
    linkedLeads: "Linked leads",
    offers: "Offers",
    budget: "Budget",
    nextAction: "Next action",
    advance: "Advance",
    advanceDone: "In closing",
    offerStateLabel: "Offer state",
    noLeads: "No leads linked to this property yet.",
    noOffers: "No offers on this property yet.",
    companion: "Agent companion",
    nextAppointment: "Next appointment",
    noAppointment: "No appointment today.",
    checkIn: "Check in",
    checkedIn: "Checked in",
    leadsCount: (n: number) => `${n} leads`,
    offersCount: (n: number) => `${n} offers`,
  },
  vi: {
    pickerLabel: "Chọn bất động sản",
    listed: (days: number) => `Đăng ${formatDaysAgo(days, "vi").toLowerCase()}`,
    specs: "Thông số",
    beds: "Phòng ngủ",
    baths: "Phòng tắm",
    area: "Diện tích sàn",
    lot: "Lô đất",
    year: "Năm xây dựng",
    parking: "Chỗ để xe",
    hoa: "Phí quản lý",
    perMonth: "/tháng",
    sqft: "sq ft",
    none: "Không",
    location: "Vị trí",
    district: "Khu vực",
    city: "Thành phố",
    mapRef: "Tọa độ bản đồ",
    documents: "Tài liệu",
    updated: (days: number) => `Cập nhật ${formatDaysAgo(days, "vi").toLowerCase()}`,
    linkedLeads: "Khách hàng liên quan",
    offers: "Đề xuất",
    budget: "Ngân sách",
    nextAction: "Bước tiếp theo",
    advance: "Chuyển tiếp",
    advanceDone: "Đang chốt",
    offerStateLabel: "Trạng thái đề xuất",
    noLeads: "Chưa có khách hàng liên quan đến bất động sản này.",
    noOffers: "Chưa có đề xuất cho bất động sản này.",
    companion: "Trợ lý hiện trường",
    nextAppointment: "Lịch hẹn tiếp theo",
    noAppointment: "Hôm nay không có lịch hẹn.",
    checkIn: "Xác nhận có mặt",
    checkedIn: "Đã xác nhận",
    leadsCount: (n: number) => `${n} khách hàng`,
    offersCount: (n: number) => `${n} đề xuất`,
  },
} as const;

const OFFER_STATES: OfferState[] = ["draft", "sent", "accepted", "declined"];

export function PropertyDetailView({ locale }: { locale: DemoLocale }) {
  const t = COPY[locale];
  const {
    data,
    propertyById,
    agentById,
    offersForProperty,
    leadsForProperty,
    appointmentsForProperty,
    advanceLeadStage,
    setOfferState,
    checkInAppointment,
  } = useProperty();
  const [selectedId, setSelectedId] = useState("P-101");

  const property = propertyById(selectedId) ?? data.properties[0];
  const agent = agentById(property.agentId);
  const linkedLeads = leadsForProperty(property.id);
  const offers = offersForProperty(property.id);
  const appointments = useMemo(
    () => [...appointmentsForProperty(property.id)].sort((a, b) => a.offsetMinutes - b.offsetMinutes),
    [appointmentsForProperty, property.id]
  );
  const upcoming = appointments.find((a) => a.state === "scheduled") ?? null;
  const rooms = ROOM_LABELS[locale];

  return (
    <div className="flex flex-col gap-4">
      {/* Property picker */}
      <div className="flex flex-wrap items-center gap-2">
        <PsSelect
          aria-label={t.pickerLabel}
          value={property.id}
          onChange={(e) => setSelectedId(e.target.value)}
          className="max-w-full sm:max-w-sm"
        >
          {data.properties.map((p) => (
            <option key={p.id} value={p.id}>
              {p.address} · {p.district}
            </option>
          ))}
        </PsSelect>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_22rem]">
        {/* Record column */}
        <div className="flex min-w-0 flex-col gap-4">
          {/* Header */}
          <PsPanel className="px-4 py-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-xl font-semibold tracking-tight text-[var(--ps-ink)]">
                  {property.address}
                </h2>
                <p className="mt-0.5 flex items-center gap-1.5 text-sm text-[var(--ps-secondary)]">
                  <MapPin size={13} strokeWidth={1.75} aria-hidden="true" />
                  {property.district} · {property.city} · {t.listed(property.listedDaysAgo)}
                </p>
              </div>
              <div className="flex flex-col items-start gap-1.5 sm:items-end">
                <p className="text-2xl font-semibold tabular-nums leading-none text-[var(--ps-ink)]">
                  {formatCurrency(property.listPrice)}
                </p>
                <div className="flex flex-wrap items-center gap-1.5">
                  <PsChip tone={STATUS_TONE[property.status]}>
                    {propertyStatusLabel(property.status, locale)}
                  </PsChip>
                  <PsChip tone="muted">{occupancyLabel(property.occupancy, locale)}</PsChip>
                </div>
              </div>
            </div>
            {agent && (
              <p className="mt-3 border-t border-[var(--ps-border)] pt-3 text-sm text-[var(--ps-secondary)]">
                {locale === "vi" ? "Đại lý phụ trách" : "Listing agent"}:{" "}
                <span className="font-medium text-[var(--ps-ink)]">{agent.name}</span> · {agent.role}
              </p>
            )}
          </PsPanel>

          {/* Gallery strip — schematic tiles, no photography */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {Array.from({ length: property.gallery.tiles }, (_, i) => (
              <SchematicTile
                key={`${property.id}-tile-${i}`}
                index={i}
                label={rooms[i % rooms.length]}
                className="aspect-[4/3]"
              />
            ))}
          </div>

          {/* Specs */}
          <PsPanel>
            <PsPanelHeader title={t.specs} />
            <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-4">
              <PsStat
                label={t.beds}
                value={property.beds}
                icon={<BedDouble size={12} strokeWidth={1.75} aria-hidden="true" />}
              />
              <PsStat
                label={t.baths}
                value={property.baths}
                icon={<Bath size={12} strokeWidth={1.75} aria-hidden="true" />}
              />
              <PsStat
                label={t.area}
                value={formatArea(property.areaSqft)}
                hint={t.sqft}
                icon={<Ruler size={12} strokeWidth={1.75} aria-hidden="true" />}
              />
              <PsStat
                label={t.lot}
                value={property.lotSqft > 0 ? formatArea(property.lotSqft) : t.none}
                hint={property.lotSqft > 0 ? t.sqft : undefined}
              />
              <PsStat label={t.year} value={property.yearBuilt} />
              <PsStat label={t.parking} value={property.parking} />
              <PsStat
                label={t.hoa}
                value={property.hoaMonthly > 0 ? formatCurrency(property.hoaMonthly) : t.none}
                hint={property.hoaMonthly > 0 ? t.perMonth : undefined}
              />
              <PsStat label={locale === "vi" ? "Loại hình" : "Type"} value={propertyTypeLabel(property.type, locale)} />
            </div>
          </PsPanel>

          {/* Location + documents */}
          <div className="grid gap-4 lg:grid-cols-2">
            <PsPanel>
              <PsPanelHeader title={t.location} />
              <dl className="divide-y divide-[var(--ps-border)] px-4 py-1">
                <PsKV label={t.district}>{property.district}</PsKV>
                <PsKV label={t.city}>{property.city}</PsKV>
                <PsKV label={t.mapRef}>
                  <PsMono className="text-[13px]">
                    {property.mapX.toFixed(2)} / {property.mapY.toFixed(2)}
                  </PsMono>
                </PsKV>
                <PsKV label={locale === "vi" ? "Mô tả" : "Notes"}>{property.summary}</PsKV>
              </dl>
            </PsPanel>
            <PsPanel>
              <PsPanelHeader
                title={t.documents}
                action={
                  <span className="font-mono text-xs tabular-nums text-[var(--ps-secondary)]">
                    {property.documents.length}
                  </span>
                }
              />
              <ul className="divide-y divide-[var(--ps-border)]">
                {property.documents.map((doc) => (
                  <li key={doc.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                    <span className="flex min-w-0 items-center gap-2 text-sm text-[var(--ps-ink)]">
                      <FileText size={14} strokeWidth={1.75} aria-hidden="true" className="shrink-0 text-[var(--ps-secondary)]" />
                      <span className="truncate">{doc.name}</span>
                    </span>
                    <span className="shrink-0 text-xs text-[var(--ps-secondary)]">
                      {t.updated(doc.updatedAtDaysAgo)}
                    </span>
                  </li>
                ))}
                {property.documents.length === 0 && (
                  <li className="px-4 py-6 text-center text-sm text-[var(--ps-secondary)]">
                    {locale === "vi" ? "Chưa có tài liệu." : "No documents yet."}
                  </li>
                )}
              </ul>
            </PsPanel>
          </div>

          {/* Linked leads + offers */}
          <div className="grid gap-4 lg:grid-cols-2">
            <PsPanel>
              <PsPanelHeader
                title={t.linkedLeads}
                action={
                  <span className="font-mono text-xs tabular-nums text-[var(--ps-secondary)]">
                    {linkedLeads.length}
                  </span>
                }
              />
              <ul className="divide-y divide-[var(--ps-border)]">
                {linkedLeads.map((lead) => (
                  <li key={lead.id} className="px-4 py-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-medium text-[var(--ps-ink)]">{lead.name}</span>
                      <PsChip tone="accent">{leadStageLabel(lead.stage, locale)}</PsChip>
                    </div>
                    <p className="mt-1 text-xs text-[var(--ps-secondary)]">
                      {t.budget}: {formatCurrencyCompact(lead.budgetMin)}-{formatCurrencyCompact(lead.budgetMax)}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                      <p className="min-w-0 flex-1 text-xs text-[var(--ps-secondary)]">
                        {t.nextAction}: {lead.nextAction}
                      </p>
                      <PsButton
                        variant="subtle"
                        onClick={() => advanceLeadStage(lead.id)}
                        disabled={lead.stage === "closing"}
                        className="px-2 text-xs font-semibold"
                      >
                        {lead.stage === "closing" ? t.advanceDone : t.advance}
                        <ChevronRight size={13} aria-hidden="true" />
                      </PsButton>
                    </div>
                  </li>
                ))}
                {linkedLeads.length === 0 && (
                  <li className="px-4 py-6 text-center text-sm text-[var(--ps-secondary)]">{t.noLeads}</li>
                )}
              </ul>
            </PsPanel>
            <PsPanel>
              <PsPanelHeader
                title={t.offers}
                action={
                  <span className="font-mono text-xs tabular-nums text-[var(--ps-secondary)]">
                    {offers.length}
                  </span>
                }
              />
              <ul className="divide-y divide-[var(--ps-border)]">
                {offers.map((offer) => {
                  const lead = data.leads.find((l) => l.id === offer.leadId);
                  return (
                    <li key={offer.id} className="px-4 py-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-sm font-medium text-[var(--ps-ink)]">
                          <PsMono className="mr-1.5 text-xs">{offer.id}</PsMono>
                          {formatCurrency(offer.amount)}
                        </span>
                        <PsChip tone={OFFER_TONE[offer.state]}>
                          {offerStatusLabel(offer.state, locale)}
                        </PsChip>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                        <p className="min-w-0 flex-1 text-xs text-[var(--ps-secondary)]">
                          {lead?.name ?? offer.leadId} · {formatDaysAgo(offer.daysAgo, locale)} ·{" "}
                          {locale === "vi" ? "giao điều kiện" : "contingency"} {offer.contingencyDays}{" "}
                          {locale === "vi" ? "ngày" : "days"}
                        </p>
                        <PsSelect
                          aria-label={`${t.offerStateLabel} ${offer.id}`}
                          value={offer.state}
                          onChange={(e) => setOfferState(offer.id, e.target.value as OfferState)}
                          className="h-9 min-h-[44px] w-36 py-1 text-xs"
                        >
                          {OFFER_STATES.map((state) => (
                            <option key={state} value={state}>
                              {offerStatusLabel(state, locale)}
                            </option>
                          ))}
                        </PsSelect>
                      </div>
                    </li>
                  );
                })}
                {offers.length === 0 && (
                  <li className="px-4 py-6 text-center text-sm text-[var(--ps-secondary)]">{t.noOffers}</li>
                )}
              </ul>
            </PsPanel>
          </div>
        </div>

        {/* Phone-width companion panel — same record, condensed */}
        <PsPhonePanel title={t.companion} className="h-fit xl:sticky xl:top-4">
          <div className="border-b border-[var(--ps-border)] px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ps-secondary)]">
              {t.companion}
            </p>
            <h3 className="mt-1 text-base font-semibold leading-snug text-[var(--ps-ink)]">
              {property.address}
            </h3>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <span className="text-lg font-semibold tabular-nums text-[var(--ps-ink)]">
                {formatCurrency(property.listPrice)}
              </span>
              <PsChip tone={STATUS_TONE[property.status]}>{property.status}</PsChip>
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-[var(--ps-border)] border-b border-[var(--ps-border)] text-center">
            <div className="px-2 py-2.5">
              <p className="text-sm font-semibold tabular-nums text-[var(--ps-ink)]">{property.beds}</p>
              <p className="text-[10px] uppercase tracking-wider text-[var(--ps-secondary)]">{t.beds}</p>
            </div>
            <div className="px-2 py-2.5">
              <p className="text-sm font-semibold tabular-nums text-[var(--ps-ink)]">{property.baths}</p>
              <p className="text-[10px] uppercase tracking-wider text-[var(--ps-secondary)]">{t.baths}</p>
            </div>
            <div className="px-2 py-2.5">
              <p className="text-sm font-semibold tabular-nums text-[var(--ps-ink)]">
                {formatCurrencyCompact(property.areaSqft)}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-[var(--ps-secondary)]">{t.sqft}</p>
            </div>
          </div>
          <div className="border-b border-[var(--ps-border)] px-4 py-3">
            <p className="flex items-center justify-between gap-2 text-xs text-[var(--ps-secondary)]">
              <span>{property.district}</span>
              <span>{occupancyLabel(property.occupancy, locale)}</span>
            </p>
            <p className="mt-1.5 flex items-center gap-3 text-xs text-[var(--ps-secondary)]">
              <span>{t.leadsCount(linkedLeads.length)}</span>
              <span>{t.offersCount(offers.length)}</span>
            </p>
          </div>
          <div className="px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ps-secondary)]">
              {t.nextAppointment}
            </p>
            {upcoming ? (
              <div className="mt-2">
                <p className="flex items-center justify-between gap-2 text-sm text-[var(--ps-ink)]">
                  <span className="font-medium tabular-nums">
                    {formatTimeFromOffset(upcoming.offsetMinutes, locale)}
                  </span>
                  <PsChip tone={APPOINTMENT_TONE[upcoming.state]}>
                    {appointmentStatusLabel(upcoming.state, locale)}
                  </PsChip>
                </p>
                <p className="mt-1 text-xs text-[var(--ps-secondary)]">
                  {data.leads.find((l) => l.id === upcoming.leadId)?.name ?? upcoming.leadId}
                </p>
                <PsButton
                  variant="primary"
                  onClick={() => checkInAppointment(upcoming.id)}
                  disabled={upcoming.state !== "scheduled"}
                  className={cn("mt-2 w-full text-xs")}
                >
                  <CalendarCheck size={14} aria-hidden="true" />
                  {upcoming.state === "scheduled" ? t.checkIn : t.checkedIn}
                </PsButton>
              </div>
            ) : (
              <p className="mt-2 text-sm text-[var(--ps-secondary)]">{t.noAppointment}</p>
            )}
          </div>
        </PsPhonePanel>
      </div>
    </div>
  );
}
