"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/cn";
import { useProperty } from "@/lib/showcases/property/store";
import {
  formatArea,
  formatCurrency,
  formatDaysAgo,
  propertyStatusLabel,
} from "@/lib/showcases/property/format";
import type { DemoLocale, PropertyStatus } from "@/lib/showcases/property/types";
import {
  PsChip,
  PsKV,
  PsMono,
  PsPanel,
  PsPanelHeader,
  type PsChipTone,
} from "../primitives";

/**
 * View 4 — Map View (Blueprint A): a schematic district map drawn entirely
 * in code. Five authored district blocks sit behind normalized pins from
 * fixture coordinates; pins color by listing status and reveal price +
 * address on hover, tap or keyboard focus. No external tile or map API.
 */

const STATUS_PIN: Record<PropertyStatus, string> = {
  available: "#2F6B52",
  pending: "#C08A2D",
  offered: "#3A6D96",
  closed: "#8A938E",
};

const STATUS_TONE: Record<PropertyStatus, PsChipTone> = {
  available: "green",
  pending: "amber",
  offered: "blue",
  closed: "neutral",
};

const STATUSES: PropertyStatus[] = ["available", "pending", "offered", "closed"];

/** District blocks in map units (viewBox 0 0 100 62). */
const DISTRICTS = [
  { name: "Laurelhurst", x: 8, y: 4, w: 28, h: 24.5 },
  { name: "Alberta", x: 56, y: 3.1, w: 22, h: 20.5 },
  { name: "Sellwood", x: 40, y: 29.8, w: 18, h: 18.6 },
  { name: "Montavilla", x: 26, y: 42.2, w: 24, h: 18.6 },
  { name: "St. Johns", x: 2, y: 38.4, w: 24, h: 21.2 },
];

const COPY = {
  en: {
    legend: "Status legend",
    filterLabel: "Filter by status",
    all: "All statuses",
    pinAria: (address: string, price: string) => `${address}, ${price}`,
    detail: "Listing detail",
    price: "List price",
    beds: "Beds/Baths",
    area: "Floor area",
    agent: "Agent",
    listed: "Listed",
    linkedLeads: "Linked leads",
    hint: "Hover, tap or focus a pin for price and address.",
  },
  vi: {
    legend: "Chú thích trạng thái",
    filterLabel: "Lọc theo trạng thái",
    all: "Tất cả trạng thái",
    pinAria: (address: string, price: string) => `${address}, ${price}`,
    detail: "Chi tiết bất động sản",
    price: "Giá rao",
    beds: "Ngủ/Tắm",
    area: "Diện tích sàn",
    agent: "Đại lý",
    listed: "Đăng ngày",
    linkedLeads: "Khách hàng liên quan",
    hint: "Di chuột, chạm hoặc chọn chân vịt để xem giá và địa chỉ.",
  },
} as const;

export function MapView({ locale }: { locale: DemoLocale }) {
  const t = COPY[locale];
  const { data, agentById, leadsForProperty } = useProperty();
  const [statusFilter, setStatusFilter] = useState<"all" | PropertyStatus>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const pins = data.properties.filter(
    (p) => statusFilter === "all" || p.status === statusFilter
  );
  const selected = pins.find((p) => p.id === selectedId) ?? null;

  return (
    <div className="flex flex-col gap-4">
      {/* Legend + status filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ps-secondary)]">
          {t.legend}:
        </span>
        {STATUSES.map((status) => (
          <span key={status} className="inline-flex items-center gap-1.5 text-xs text-[var(--ps-secondary)]">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: STATUS_PIN[status] }}
            />
            {propertyStatusLabel(status, locale)}
          </span>
        ))}
        <div role="group" aria-label={t.filterLabel} className="ml-auto flex flex-wrap gap-1.5">
          <button
            type="button"
            aria-pressed={statusFilter === "all"}
            onClick={() => setStatusFilter("all")}
            className={cn(
              "min-h-[44px] rounded-full border px-3 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ps-accent)]",
              statusFilter === "all"
                ? "border-[var(--ps-accent)] bg-[var(--ps-accent)] text-white"
                : "border-[var(--ps-border)] bg-[var(--ps-surface)] text-[var(--ps-ink)] hover:border-[var(--ps-accent)]"
            )}
          >
            {t.all}
          </button>
          {STATUSES.map((status) => {
            const active = statusFilter === status;
            return (
              <button
                key={status}
                type="button"
                aria-pressed={active}
                onClick={() => setStatusFilter(active ? "all" : status)}
                className={cn(
                  "min-h-[44px] rounded-full border px-3 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ps-accent)]",
                  active
                    ? "border-[var(--ps-accent)] bg-[var(--ps-accent)] text-white"
                    : "border-[var(--ps-border)] bg-[var(--ps-surface)] text-[var(--ps-ink)] hover:border-[var(--ps-accent)]"
                )}
              >
                {propertyStatusLabel(status, locale)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Schematic map */}
      <PsPanel className="overflow-hidden">
        <div className="relative w-full" style={{ aspectRatio: "100 / 62" }}>
            {/* District grid — decorative; pins carry the data */}
            <svg
              viewBox="0 0 100 62"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full"
            >
              <rect x="0" y="0" width="100" height="62" fill="#EFF2ED" />
              {[16, 32, 48, 64, 80].map((x) => (
                <line key={`v${x}`} x1={x} y1="0" x2={x} y2="62" stroke="#DDE3DB" strokeWidth="0.4" strokeDasharray="1.6 1.2" />
              ))}
              {[14, 28, 42, 56].map((y) => (
                <line key={`h${y}`} x1="0" y1={y} x2="100" y2={y} stroke="#DDE3DB" strokeWidth="0.4" strokeDasharray="1.6 1.2" />
              ))}
              {DISTRICTS.map((d) => (
                <g key={d.name}>
                  <rect
                    x={d.x}
                    y={d.y}
                    width={d.w}
                    height={d.h}
                    rx="1.6"
                    fill="#FFFFFF"
                    stroke="#C9D2C8"
                    strokeWidth="0.45"
                  />
                  <text
                    x={d.x + 1.4}
                    y={d.y + 2.6}
                    fontSize="2.2"
                    fontWeight="600"
                    fill="#66756F"
                  >
                    {d.name}
                  </text>
                </g>
              ))}
              <path
                d="M0 34 C14 32, 24 36, 38 33.5"
                fill="none"
                stroke="#B9CBDA"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
            </svg>

            {/* Listing pins — normalized from fixture coordinates */}
            {pins.map((p) => {
              const isActive = selectedId === p.id;
              return (
                <div
                  key={p.id}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${p.mapX * 100}%`, top: `${p.mapY * 100}%` }}
                >
                  <button
                    type="button"
                    aria-pressed={isActive}
                    aria-label={t.pinAria(p.address, formatCurrency(p.listPrice))}
                    onClick={() => setSelectedId(isActive ? null : p.id)}
                    className="relative flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ps-accent)]"
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "block h-3.5 w-3.5 rounded-full border-2 border-white shadow-[0_1px_2px_rgba(38,49,46,0.35)] transition-transform group-hover:scale-125",
                        isActive && "scale-125 ring-2 ring-[var(--ps-accent)] ring-offset-1"
                      )}
                      style={{ backgroundColor: STATUS_PIN[p.status] }}
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 hidden -translate-x-1/2 whitespace-nowrap rounded bg-[var(--ps-ink)] px-2 py-1 text-[11px] font-medium text-white shadow-md group-hover:block group-focus-visible:block"
                    >
                      {p.address} · {formatCurrency(p.listPrice)}
                    </span>
                  </button>
                </div>
              );
            })}
        </div>
        <p className="flex items-center gap-1.5 border-t border-[var(--ps-border)] px-4 py-2 text-xs text-[var(--ps-secondary)]">
          <MapPin size={12} strokeWidth={1.75} aria-hidden="true" />
          {t.hint}
        </p>
      </PsPanel>

      {/* Selected pin detail */}
      {selected && (
        <PsPanel>
          <PsPanelHeader
            title={`${t.detail} · ${selected.address}`}
            action={
              <PsChip tone={STATUS_TONE[selected.status]}>
                {propertyStatusLabel(selected.status, locale)}
              </PsChip>
            }
          />
          <dl className="grid gap-x-6 px-4 py-1 sm:grid-cols-2">
            <PsKV label={t.price}>
              <PsMono className="font-medium">{formatCurrency(selected.listPrice)}</PsMono>
            </PsKV>
            <PsKV label={t.beds}>
              {selected.beds} / {selected.baths}
            </PsKV>
            <PsKV label={t.area}>
              {formatArea(selected.areaSqft)} sq ft
            </PsKV>
            <PsKV label={t.agent}>{agentById(selected.agentId)?.name}</PsKV>
            <PsKV label={t.listed}>{formatDaysAgo(selected.listedDaysAgo, locale)}</PsKV>
            <PsKV label={t.linkedLeads}>{leadsForProperty(selected.id).length}</PsKV>
          </dl>
        </PsPanel>
      )}
    </div>
  );
}
