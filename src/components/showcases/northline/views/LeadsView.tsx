"use client";

import { useId, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useNorthline } from "../store";
import {
  Avatar,
  Drawer,
  KV,
  Mono,
  NlInput,
  NlSelect,
  Panel,
  Pill,
  SortHeader,
  type StageTone,
} from "../primitives";
import { formatCurrency, formatDaysAgo } from "@/lib/showcases/northline/format";
import type { Lead, LeadSource, LeadStatus } from "@/lib/showcases/northline/types";

/**
 * View 2 — Lead management (handoff §3.2). Search, filter, sort, and inspect
 * leads; the drawer owns the sample assignment and status-change mutations.
 * Every count derives from the shared store — no hardcoded totals.
 */

const STATUS_ORDER: LeadStatus[] = ["new", "contacted", "qualified", "unqualified"];
const SOURCE_ORDER: LeadSource[] = ["website", "referral", "linkedin", "event", "outreach", "partner"];

type SortKey =
  | "name"
  | "company"
  | "source"
  | "status"
  | "owner"
  | "value"
  | "lastActivity"
  | "nextStep";
type SortDir = "asc" | "desc";

const COPY = {
  en: {
    title: "Leads",
    subtitle:
      "Search, filter, assign, and organize leads using a data-rich management interface.",
    searchLabel: "Search leads",
    searchPlaceholder: "Search name, company, or email",
    allStatuses: "All statuses",
    allOwners: "All owners",
    allSources: "All sources",
    statusLabel: "Status",
    ownerLabel: "Owner",
    sourceLabel: "Source",
    columns: {
      name: "Name",
      company: "Company",
      source: "Source",
      status: "Status",
      owner: "Owner",
      value: "Estimated Value",
      lastActivity: "Last Activity",
      nextStep: "Next Step",
    } as Record<SortKey, string>,
    statusLabels: {
      new: "New",
      contacted: "Contacted",
      qualified: "Qualified",
      unqualified: "Unqualified",
    } as Record<LeadStatus, string>,
    // Lead status pill tones, picked once for the whole demo.
    statusTones: {
      new: "blue",
      contacted: "teal",
      qualified: "green",
      unqualified: "muted",
    } as Record<LeadStatus, StageTone>,
    sourceLabels: {
      website: "Website",
      referral: "Referral",
      linkedin: "LinkedIn",
      event: "Event",
      outreach: "Outreach",
      partner: "Partner",
    } as Record<LeadSource, string>,
    resultCount: "leads",
    empty: "No leads match the current filters.",
    email: "Email",
    close: "Close",
    openLead: "Open lead details",
  },
  vi: {
    title: "Khách hàng tiềm năng",
    subtitle:
      "Tìm kiếm, lọc, phân công và quản lý khách hàng tiềm năng qua giao diện dữ liệu chi tiết.",
    searchLabel: "Tìm kiếm khách hàng",
    searchPlaceholder: "Tìm theo tên, công ty hoặc email",
    allStatuses: "Tất cả trạng thái",
    allOwners: "Tất cả người phụ trách",
    allSources: "Tất cả nguồn",
    statusLabel: "Trạng thái",
    ownerLabel: "Người phụ trách",
    sourceLabel: "Nguồn",
    columns: {
      name: "Tên",
      company: "Công ty",
      source: "Nguồn",
      status: "Trạng thái",
      owner: "Người phụ trách",
      value: "Giá trị dự kiến",
      lastActivity: "Hoạt động gần nhất",
      nextStep: "Bước tiếp theo",
    } as Record<SortKey, string>,
    statusLabels: {
      new: "Mới",
      contacted: "Đã liên hệ",
      qualified: "Đủ điều kiện",
      unqualified: "Chưa đủ điều kiện",
    } as Record<LeadStatus, string>,
    // Lead status pill tones, picked once for the whole demo.
    statusTones: {
      new: "blue",
      contacted: "teal",
      qualified: "green",
      unqualified: "muted",
    } as Record<LeadStatus, StageTone>,
    sourceLabels: {
      website: "Website",
      referral: "Giới thiệu",
      linkedin: "LinkedIn",
      event: "Sự kiện",
      outreach: "Tiếp cận",
      partner: "Đối tác",
    } as Record<LeadSource, string>,
    resultCount: "khách hàng",
    empty: "Không có khách hàng tiềm năng nào khớp bộ lọc.",
    email: "Email",
    close: "Đóng",
    openLead: "Mở chi tiết khách hàng",
  },
};

export function LeadsView({ locale }: { locale: "en" | "vi" }) {
  const t = COPY[locale];
  const { data, teamById, leadById, assignLead, setLeadStatus } = useNorthline();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | LeadStatus>("all");
  const [ownerFilter, setOwnerFilter] = useState<"all" | string>("all");
  const [sourceFilter, setSourceFilter] = useState<"all" | LeadSource>("all");
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({
    key: "lastActivity",
    dir: "asc",
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const ownerSelectId = useId();
  const statusSelectId = useId();

  const leads = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = data.leads.filter((l) => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (ownerFilter !== "all" && l.ownerId !== ownerFilter) return false;
      if (sourceFilter !== "all" && l.source !== sourceFilter) return false;
      if (
        q &&
        !l.name.toLowerCase().includes(q) &&
        !l.company.toLowerCase().includes(q) &&
        !l.email.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
    const sortValue = (l: Lead): string | number => {
      switch (sort.key) {
        case "name":
          return l.name.toLowerCase();
        case "company":
          return l.company.toLowerCase();
        case "source":
          return l.source;
        case "status":
          return STATUS_ORDER.indexOf(l.status);
        case "owner":
          return (teamById(l.ownerId)?.name ?? "").toLowerCase();
        case "value":
          return l.estimatedValue;
        case "lastActivity":
          return l.lastActivityDaysAgo;
        case "nextStep":
          return l.nextStep.toLowerCase();
      }
    };
    return [...filtered].sort((a, b) => {
      const av = sortValue(a);
      const bv = sortValue(b);
      const cmp =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av).localeCompare(String(bv));
      return sort.dir === "asc" ? cmp : -cmp;
    });
  }, [data.leads, query, statusFilter, ownerFilter, sourceFilter, sort, teamById]);

  const selected = selectedId ? leadById(selectedId) : undefined;

  const toggleSort = (key: SortKey) =>
    setSort((s) =>
      s.key === key
        ? { key, dir: s.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    );

  const sortProps = (key: SortKey) => ({
    label: t.columns[key],
    active: sort.key === key,
    direction: sort.dir,
    onClick: () => toggleSort(key),
  });

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{t.title}</h2>
        <p className="text-sm text-[var(--nl-muted)]">{t.subtitle}</p>
      </div>

      <Panel>
        {/* Search + filters */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[var(--nl-border)] px-4 py-3">
          <div className="relative min-w-[220px] flex-1">
            <Search
              size={14}
              strokeWidth={1.75}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--nl-muted)]"
            />
            <NlInput
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchLabel}
              className="pl-9"
            />
          </div>
          <NlSelect
            aria-label={t.statusLabel}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | LeadStatus)}
            className="min-w-[9.5rem]"
          >
            <option value="all">{t.allStatuses}</option>
            {STATUS_ORDER.map((s) => (
              <option key={s} value={s}>
                {t.statusLabels[s]}
              </option>
            ))}
          </NlSelect>
          <NlSelect
            aria-label={t.ownerLabel}
            value={ownerFilter}
            onChange={(e) => setOwnerFilter(e.target.value)}
            className="min-w-[9.5rem]"
          >
            <option value="all">{t.allOwners}</option>
            {data.team.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </NlSelect>
          <NlSelect
            aria-label={t.sourceLabel}
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value as "all" | LeadSource)}
            className="min-w-[9.5rem]"
          >
            <option value="all">{t.allSources}</option>
            {SOURCE_ORDER.map((s) => (
              <option key={s} value={s}>
                {t.sourceLabels[s]}
              </option>
            ))}
          </NlSelect>
          <span className="ml-auto whitespace-nowrap font-mono text-xs tabular-nums text-[var(--nl-muted)]">
            {leads.length} / {data.leads.length} {t.resultCount}
          </span>
        </div>

        {/* Table (md and up) */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[920px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--nl-border)]">
                <th className="px-4 py-1.5">
                  <SortHeader {...sortProps("name")} />
                </th>
                <th className="px-4 py-1.5">
                  <SortHeader {...sortProps("company")} />
                </th>
                <th className="px-4 py-1.5">
                  <SortHeader {...sortProps("source")} />
                </th>
                <th className="px-4 py-1.5">
                  <SortHeader {...sortProps("status")} />
                </th>
                <th className="px-4 py-1.5">
                  <SortHeader {...sortProps("owner")} />
                </th>
                <th className="px-4 py-1.5">
                  <SortHeader {...sortProps("value")} />
                </th>
                <th className="px-4 py-1.5">
                  <SortHeader {...sortProps("lastActivity")} />
                </th>
                <th className="px-4 py-1.5">
                  <SortHeader {...sortProps("nextStep")} />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--nl-border)]">
              {leads.map((l) => {
                const owner = teamById(l.ownerId);
                return (
                  <tr
                    key={l.id}
                    onClick={() => setSelectedId(l.id)}
                    className="cursor-pointer transition-colors hover:bg-[#F4F8F7]"
                  >
                    <td className="px-4 py-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedId(l.id);
                        }}
                        aria-label={`${t.openLead}: ${l.name}`}
                        className="inline-flex min-h-[44px] max-w-full items-center truncate rounded text-left text-sm font-medium text-[var(--nl-ink)] underline-offset-2 transition-colors hover:text-[var(--nl-accent)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nl-accent)]"
                      >
                        {l.name}
                      </button>
                    </td>
                    <td className="max-w-[12rem] truncate px-4 py-2.5 text-[var(--nl-muted)]">
                      {l.company}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-[var(--nl-muted)]">
                      {t.sourceLabels[l.source]}
                    </td>
                    <td className="px-4 py-2.5">
                      <Pill tone={t.statusTones[l.status]}>{t.statusLabels[l.status]}</Pill>
                    </td>
                    <td className="px-4 py-2.5">
                      {owner && (
                        <span className="inline-flex items-center gap-2">
                          <Avatar initials={owner.initials} hue={owner.hue} size={22} />
                          <span className="truncate">{owner.name}</span>
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5">
                      <Mono className="font-medium">{formatCurrency(l.estimatedValue)}</Mono>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-[var(--nl-muted)]">
                      {formatDaysAgo(l.lastActivityDaysAgo, locale)}
                    </td>
                    <td className="max-w-[14rem] truncate px-4 py-2.5 text-[var(--nl-muted)]">
                      {l.nextStep}
                    </td>
                  </tr>
                );
              })}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-sm text-[var(--nl-muted)]">
                    {t.empty}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Stacked cards (below md) */}
        <ul className="flex flex-col divide-y divide-[var(--nl-border)] md:hidden">
          {leads.map((l) => {
            const owner = teamById(l.ownerId);
            return (
              <li key={l.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(l.id)}
                  className="w-full px-4 py-3 text-left transition-colors hover:bg-[#F4F8F7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nl-accent)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{l.name}</p>
                      <p className="truncate text-xs text-[var(--nl-muted)]">{l.company}</p>
                    </div>
                    <Pill tone={t.statusTones[l.status]}>{t.statusLabels[l.status]}</Pill>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <Mono className="text-sm font-semibold">{formatCurrency(l.estimatedValue)}</Mono>
                    {owner && (
                      <span className="inline-flex min-w-0 items-center gap-1.5 text-xs text-[var(--nl-muted)]">
                        <Avatar initials={owner.initials} hue={owner.hue} size={20} />
                        <span className="truncate">{owner.name}</span>
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 truncate text-xs text-[var(--nl-muted)]">{l.nextStep}</p>
                </button>
              </li>
            );
          })}
          {leads.length === 0 && (
            <li className="px-4 py-8 text-center text-sm text-[var(--nl-muted)]">{t.empty}</li>
          )}
        </ul>
      </Panel>

      {/* Lead detail drawer */}
      <Drawer
        open={!!selected}
        onClose={() => setSelectedId(null)}
        title={selected ? selected.name : ""}
        closeLabel={t.close}
      >
        {selected && (
          <div className="flex flex-col gap-4">
            <dl className="flex flex-col divide-y divide-[var(--nl-border)]">
              <KV label={t.columns.company}>{selected.company}</KV>
              <KV label={t.email}>
                <span className="break-all">{selected.email}</span>
              </KV>
              <KV label={t.columns.source}>
                <Pill tone="neutral">{t.sourceLabels[selected.source]}</Pill>
              </KV>
              <KV label={t.columns.status}>
                <Pill tone={t.statusTones[selected.status]}>
                  {t.statusLabels[selected.status]}
                </Pill>
              </KV>
              <KV label={t.columns.value}>
                <Mono className="font-semibold">{formatCurrency(selected.estimatedValue)}</Mono>
              </KV>
              <KV label={t.columns.lastActivity}>
                {formatDaysAgo(selected.lastActivityDaysAgo, locale)}
              </KV>
              <KV label={t.columns.nextStep}>{selected.nextStep}</KV>
            </dl>
            <div className="flex flex-col gap-3 border-t border-[var(--nl-border)] pt-4">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor={ownerSelectId}
                  className="text-xs font-semibold uppercase tracking-wide text-[var(--nl-muted)]"
                >
                  {t.columns.owner}
                </label>
                <NlSelect
                  id={ownerSelectId}
                  aria-label={t.columns.owner}
                  value={selected.ownerId}
                  onChange={(e) => assignLead(selected.id, e.target.value)}
                >
                  {data.team.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </NlSelect>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor={statusSelectId}
                  className="text-xs font-semibold uppercase tracking-wide text-[var(--nl-muted)]"
                >
                  {t.columns.status}
                </label>
                <NlSelect
                  id={statusSelectId}
                  aria-label={t.columns.status}
                  value={selected.status}
                  onChange={(e) => setLeadStatus(selected.id, e.target.value as LeadStatus)}
                >
                  {STATUS_ORDER.map((s) => (
                    <option key={s} value={s}>
                      {t.statusLabels[s]}
                    </option>
                  ))}
                </NlSelect>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
