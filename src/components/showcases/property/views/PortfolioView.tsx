"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useProperty } from "@/lib/showcases/property/store";
import {
  formatArea,
  formatCurrency,
  formatCurrencyCompact,
  formatDaysAgo,
  occupancyLabel,
  propertyStatusLabel,
  propertyTypeLabel,
} from "@/lib/showcases/property/format";
import type {
  DemoLocale,
  PropertyStatus,
  PropertyType,
} from "@/lib/showcases/property/types";
import {
  PsButton,
  PsChip,
  PsInput,
  PsKV,
  PsMono,
  PsPanel,
  PsSelect,
  PsSortHeader,
  SchematicTile,
  type PsChipTone,
} from "../primitives";

/**
 * View 2 — Portfolio (Blueprint A): the listing inventory. Search, status,
 * type, agent and price filters, sortable columns, pagination, and a row
 * click that opens the property's condensed detail state inline.
 */

const STATUSES: PropertyStatus[] = ["available", "pending", "offered", "closed"];
const TYPES: PropertyType[] = ["house", "condo", "townhouse", "duplex"];

const PRICE_BANDS = [
  { id: "any", min: 0, max: Number.POSITIVE_INFINITY },
  { id: "under-400", min: 0, max: 400000 },
  { id: "400-700", min: 400000, max: 700000 },
  { id: "700-1000", min: 700000, max: 1000000 },
  { id: "over-1000", min: 1000000, max: Number.POSITIVE_INFINITY },
] as const;

type BandId = (typeof PRICE_BANDS)[number]["id"];

type SortKey = "price" | "beds" | "area" | "listed";
type SortDir = "asc" | "desc";

const STATUS_TONE: Record<PropertyStatus, PsChipTone> = {
  available: "green",
  pending: "amber",
  offered: "blue",
  closed: "neutral",
};

const PAGE_SIZE = 8;

const COPY = {
  en: {
    searchAria: "Search listings",
    searchPlaceholder: "Search address or district...",
    allStatuses: "All statuses",
    allTypes: "All types",
    allAgents: "All agents",
    statusLabel: "Status",
    typeLabel: "Type",
    agentLabel: "Agent",
    priceLabel: "Price band",
    bandLabels: {
      any: "Any price",
      "under-400": "Under $400k",
      "400-700": "$400k to $700k",
      "700-1000": "$700k to $1M",
      "over-1000": "Over $1M",
    } as Record<BandId, string>,
    columns: {
      property: "Property",
      type: "Type",
      beds: "Beds/Baths",
      area: "Area",
      price: "List price",
      status: "Status",
      agent: "Agent",
      listed: "Listed",
    } as Record<string, string>,
    resultCount: "listings",
    empty: "No listings match your filters.",
    view: "View",
    viewAria: "View property record",
    sqft: "sq ft",
    detail: "Record detail",
    close: "Close detail",
    occupancy: "Occupancy",
    documents: "Documents",
    linkedLeads: "Linked leads",
    offers: "Offers",
    page: (current: number, total: number) => `Page ${current} of ${total}`,
    prev: "Previous",
    next: "Next",
  },
  vi: {
    searchAria: "Tìm kiếm bất động sản",
    searchPlaceholder: "Tìm theo địa chỉ hoặc khu vực...",
    allStatuses: "Tất cả trạng thái",
    allTypes: "Tất cả loại hình",
    allAgents: "Tất cả đại lý",
    statusLabel: "Trạng thái",
    typeLabel: "Loại hình",
    agentLabel: "Đại lý",
    priceLabel: "Khoảng giá",
    bandLabels: {
      any: "Mọi mức giá",
      "under-400": "Dưới $400k",
      "400-700": "$400k đến $700k",
      "700-1000": "$700k đến $1M",
      "over-1000": "Trên $1M",
    } as Record<BandId, string>,
    columns: {
      property: "Bất động sản",
      type: "Loại hình",
      beds: "Ngủ/Tắm",
      area: "Diện tích",
      price: "Giá rao",
      status: "Trạng thái",
      agent: "Đại lý",
      listed: "Đăng ngày",
    } as Record<string, string>,
    resultCount: "bất động sản",
    empty: "Không có bất động sản nào khớp bộ lọc.",
    view: "Xem",
    viewAria: "Xem hồ sơ bất động sản",
    sqft: "sq ft",
    detail: "Chi tiết hồ sơ",
    close: "Đóng chi tiết",
    occupancy: "Tình trạng sử dụng",
    documents: "Tài liệu",
    linkedLeads: "Khách hàng liên quan",
    offers: "Đề xuất",
    page: (current: number, total: number) => `Trang ${current} / ${total}`,
    prev: "Trước",
    next: "Sau",
  },
} as const;

export function PortfolioView({ locale }: { locale: DemoLocale }) {
  const t = COPY[locale];
  const { data, propertyById, agentById, leadsForProperty, offersForProperty } = useProperty();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | PropertyStatus>("all");
  const [typeFilter, setTypeFilter] = useState<"all" | PropertyType>("all");
  const [agentFilter, setAgentFilter] = useState<"all" | string>("all");
  const [band, setBand] = useState<BandId>("any");
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({ key: "price", dir: "desc" });
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const bounds = PRICE_BANDS.find((b) => b.id === band) ?? PRICE_BANDS[0];
    const filtered = data.properties.filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (typeFilter !== "all" && p.type !== typeFilter) return false;
      if (agentFilter !== "all" && p.agentId !== agentFilter) return false;
      if (p.listPrice < bounds.min || p.listPrice > bounds.max) return false;
      if (!q) return true;
      return (
        p.address.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
      );
    });
    const sortValue = (price: number, beds: number, area: number, listed: number): number => {
      switch (sort.key) {
        case "price":
          return price;
        case "beds":
          return beds;
        case "area":
          return area;
        case "listed":
          return listed;
      }
    };
    return [...filtered].sort((a, b) => {
      const av = sortValue(a.listPrice, a.beds, a.areaSqft, a.listedDaysAgo);
      const bv = sortValue(b.listPrice, b.beds, b.areaSqft, b.listedDaysAgo);
      return sort.dir === "asc" ? av - bv : bv - av;
    });
  }, [data.properties, query, statusFilter, typeFilter, agentFilter, band, sort]);

  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = rows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const selected = selectedId ? propertyById(selectedId) : undefined;

  const toggleSort = (key: SortKey) =>
    setSort((s) =>
      s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }
    );

  const sortProps = (key: SortKey) => ({
    label: t.columns[key],
    active: sort.key === key,
    direction: sort.dir,
    onClick: () => toggleSort(key),
  });

  const openDetail = (id: string) => setSelectedId((prev) => (prev === id ? null : id));

  return (
    <div className="flex flex-col gap-4">
      <PsPanel>
        {/* Search + filters */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[var(--ps-border)] px-4 py-3">
          <div className="relative min-w-[200px] flex-1">
            <Search
              size={14}
              strokeWidth={1.75}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ps-secondary)]"
            />
            <PsInput
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchAria}
              className="pl-9"
            />
          </div>
          <PsSelect
            aria-label={t.statusLabel}
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as "all" | PropertyStatus);
              setPage(1);
            }}
            className="min-w-[9rem]"
          >
            <option value="all">{t.allStatuses}</option>
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {propertyStatusLabel(status, locale)}
              </option>
            ))}
          </PsSelect>
          <PsSelect
            aria-label={t.typeLabel}
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value as "all" | PropertyType);
              setPage(1);
            }}
            className="min-w-[9rem]"
          >
            <option value="all">{t.allTypes}</option>
            {TYPES.map((type) => (
              <option key={type} value={type}>
                {propertyTypeLabel(type, locale)}
              </option>
            ))}
          </PsSelect>
          <PsSelect
            aria-label={t.agentLabel}
            value={agentFilter}
            onChange={(e) => {
              setAgentFilter(e.target.value);
              setPage(1);
            }}
            className="min-w-[9rem]"
          >
            <option value="all">{t.allAgents}</option>
            {data.agents.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.name}
              </option>
            ))}
          </PsSelect>
          <PsSelect
            aria-label={t.priceLabel}
            value={band}
            onChange={(e) => {
              setBand(e.target.value as BandId);
              setPage(1);
            }}
            className="min-w-[9rem]"
          >
            {PRICE_BANDS.map((b) => (
              <option key={b.id} value={b.id}>
                {t.bandLabels[b.id]}
              </option>
            ))}
          </PsSelect>
          <span className="ml-auto whitespace-nowrap font-mono text-xs tabular-nums text-[var(--ps-secondary)]">
            {rows.length} / {data.properties.length} {t.resultCount}
          </span>
        </div>

        {/* Listing table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--ps-border)]">
                <th scope="col" className="px-4 py-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ps-secondary)]">
                    {t.columns.property}
                  </span>
                </th>
                <th scope="col" className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--ps-secondary)]">
                  {t.columns.type}
                </th>
                <th scope="col" className="px-3 py-1.5">
                  <PsSortHeader {...sortProps("beds")} />
                </th>
                <th scope="col" className="px-3 py-1.5">
                  <PsSortHeader {...sortProps("area")} />
                </th>
                <th scope="col" className="px-3 py-1.5">
                  <PsSortHeader {...sortProps("price")} />
                </th>
                <th scope="col" className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--ps-secondary)]">
                  {t.columns.status}
                </th>
                <th scope="col" className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--ps-secondary)]">
                  {t.columns.agent}
                </th>
                <th scope="col" className="px-3 py-1.5">
                  <PsSortHeader {...sortProps("listed")} />
                </th>
                <th scope="col" className="px-4 py-1.5">
                  <span className="sr-only">{t.view}</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--ps-border)]">
              {pageRows.map((p) => {
                const agent = agentById(p.agentId);
                return (
                  <tr
                    key={p.id}
                    onClick={() => openDetail(p.id)}
                    className="cursor-pointer transition-colors hover:bg-[var(--ps-accent-soft)]/40"
                  >
                    <td className="px-4 py-2.5">
                      <span className="flex items-center gap-3">
                        <SchematicTile
                          index={Number(p.id.slice(2)) % 3}
                          label=""
                          className="hidden h-9 w-12 shrink-0 sm:block"
                        />
                        <span className="min-w-0">
                          <span className="block truncate font-medium text-[var(--ps-ink)]">
                            {p.address}
                          </span>
                          <span className="block text-xs text-[var(--ps-secondary)]">
                            {p.district} · {p.city}
                          </span>
                        </span>
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-[var(--ps-secondary)]">
                      {propertyTypeLabel(p.type, locale)}
                    </td>
                    <td className="px-3 py-2.5 tabular-nums text-[var(--ps-secondary)]">
                      {p.beds} / {p.baths}
                    </td>
                    <td className="px-3 py-2.5 tabular-nums text-[var(--ps-secondary)]">
                      {formatArea(p.areaSqft)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5">
                      <PsMono className="font-medium">{formatCurrency(p.listPrice)}</PsMono>
                    </td>
                    <td className="px-3 py-2.5">
                      <PsChip tone={STATUS_TONE[p.status]}>
                        {propertyStatusLabel(p.status, locale)}
                      </PsChip>
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-[var(--ps-secondary)]">
                      {agent?.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-[var(--ps-secondary)]">
                      {formatDaysAgo(p.listedDaysAgo, locale)}
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <PsButton
                        variant="subtle"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDetail(p.id);
                        }}
                        aria-label={`${t.viewAria} ${p.address}`}
                        className="px-2 font-medium"
                      >
                        {t.view}
                      </PsButton>
                    </td>
                  </tr>
                );
              })}
              {pageRows.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center text-sm text-[var(--ps-secondary)]">
                    {t.empty}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between gap-3 border-t border-[var(--ps-border)] px-4 py-2.5">
          <PsButton
            variant="ghost"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            className="px-3 text-xs"
          >
            {t.prev}
          </PsButton>
          <span className="font-mono text-xs tabular-nums text-[var(--ps-secondary)]">
            {t.page(currentPage, totalPages)}
          </span>
          <PsButton
            variant="ghost"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            className="px-3 text-xs"
          >
            {t.next}
          </PsButton>
        </div>
      </PsPanel>

      {/* Row-click detail state */}
      {selected && (
        <PsPanel>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--ps-border)] px-4 py-2.5">
            <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[var(--ps-ink)]">
              {t.detail} · {selected.address}
            </h3>
            <PsButton variant="subtle" onClick={() => setSelectedId(null)} className="px-2 text-xs">
              {t.close}
            </PsButton>
          </div>
          <div className="grid gap-4 p-4 lg:grid-cols-[14rem_minmax(0,1fr)]">
            <SchematicTile
              index={Number(selected.id.slice(2)) % 3}
              label={selected.district}
              className="aspect-[4/3] w-full"
            />
            <dl className="divide-y divide-[var(--ps-border)]">
              <PsKV label={t.columns.price}>
                <PsMono className="font-medium">{formatCurrency(selected.listPrice)}</PsMono>
              </PsKV>
              <PsKV label={t.columns.beds}>
                {selected.beds} / {selected.baths} · {formatArea(selected.areaSqft)} {t.sqft}
              </PsKV>
              <PsKV label={t.occupancy}>{occupancyLabel(selected.occupancy, locale)}</PsKV>
              <PsKV label={t.documents}>{selected.documents.length}</PsKV>
              <PsKV label={t.linkedLeads}>
                {leadsForProperty(selected.id).length}
                {leadsForProperty(selected.id).length > 0 && (
                  <span className="text-[var(--ps-secondary)]">
                    {" "}
                    · {leadsForProperty(selected.id).map((l) => l.name).join(", ")}
                  </span>
                )}
              </PsKV>
              <PsKV label={t.offers}>
                {offersForProperty(selected.id).length}
                {offersForProperty(selected.id).length > 0 && (
                  <span className="text-[var(--ps-secondary)]">
                    {" "}
                    ·{" "}
                    {offersForProperty(selected.id)
                      .map((o) => `${o.id} (${formatCurrencyCompact(o.amount)})`)
                      .join(", ")}
                  </span>
                )}
              </PsKV>
            </dl>
          </div>
        </PsPanel>
      )}
    </div>
  );
}
