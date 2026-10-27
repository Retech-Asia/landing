"use client";

import { useState } from "react";
import { ChevronRight, Search, Users } from "lucide-react";
import { cn } from "@/lib/cn";
import { useProperty, nextStage } from "@/lib/showcases/property/store";
import {
  formatCurrencyCompact,
  formatDaysAgo,
  leadSourceLabel,
  leadStageLabel,
} from "@/lib/showcases/property/format";
import type { DemoLocale, LeadStage } from "@/lib/showcases/property/types";
import {
  PsAvatar,
  PsButton,
  PsInput,
  PsPanel,
  PsSelect,
} from "../primitives";

/**
 * View 3 — Lead Pipeline (Blueprint A): kanban across the five stages
 * new, qualifying, viewing, offer, closing. Cards show the lead, budget,
 * linked property and next action; stage advance runs through the shared
 * store so moves persist across view switches.
 */

const STAGES: LeadStage[] = ["new", "qualifying", "viewing", "offer", "closing"];

const COPY = {
  en: {
    searchAria: "Search leads",
    searchPlaceholder: "Search lead or address...",
    agentLabel: "Agent",
    allAgents: "All agents",
    advance: "Advance",
    advanceDone: "In closing",
    budget: "Budget",
    unqualified: "To qualify",
    nextAction: "Next",
    noLeads: "No leads in this stage.",
    empty: "No leads match your search.",
    boardAria: "Lead pipeline board",
  },
  vi: {
    searchAria: "Tìm kiếm khách hàng",
    searchPlaceholder: "Tìm khách hàng hoặc địa chỉ...",
    agentLabel: "Đại lý",
    allAgents: "Tất cả đại lý",
    advance: "Chuyển tiếp",
    advanceDone: "Đang chốt",
    budget: "Ngân sách",
    unqualified: "Chờ xác định",
    nextAction: "Tiếp",
    noLeads: "Không có khách hàng ở giai đoạn này.",
    empty: "Không có khách hàng nào khớp tìm kiếm.",
    boardAria: "Bảng quy trình khách hàng",
  },
} as const;

export function PipelineView({ locale }: { locale: DemoLocale }) {
  const t = COPY[locale];
  const { data, propertyById, agentById, advanceLeadStage } = useProperty();
  const [query, setQuery] = useState("");
  const [agentFilter, setAgentFilter] = useState<"all" | string>("all");

  const q = query.trim().toLowerCase();
  const visible = data.leads.filter((lead) => {
    if (agentFilter !== "all" && lead.ownerId !== agentFilter) return false;
    if (!q) return true;
    const address = lead.propertyIds
      .map((id) => propertyById(id)?.address ?? "")
      .join(" ")
      .toLowerCase();
    return lead.name.toLowerCase().includes(q) || address.includes(q);
  });
  const staged = (stage: LeadStage) => visible.filter((lead) => lead.stage === stage);

  return (
    <div className="flex flex-col gap-4">
      {/* Search + owner filter */}
      <div className="flex flex-wrap items-center gap-2">
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
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            aria-label={t.searchAria}
            className="pl-9"
          />
        </div>
        <PsSelect
          aria-label={t.agentLabel}
          value={agentFilter}
          onChange={(e) => setAgentFilter(e.target.value)}
          className="min-w-[11rem]"
        >
          <option value="all">{t.allAgents}</option>
          {data.agents.map((agent) => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
        </PsSelect>
        <span className="ml-auto whitespace-nowrap font-mono text-xs tabular-nums text-[var(--ps-secondary)]">
          {visible.length} / {data.leads.length}
        </span>
      </div>

      {/* Kanban board */}
      <div
        role="group"
        aria-label={t.boardAria}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      >
        {STAGES.map((stage) => {
          const leads = staged(stage);
          return (
            <PsPanel key={stage} className="flex min-w-0 flex-col bg-[var(--ps-canvas)]">
              <div className="flex items-center justify-between gap-2 border-b border-[var(--ps-border)] px-3 py-2.5">
                <h3 className="flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-wide text-[var(--ps-ink)]">
                  <Users size={13} strokeWidth={1.75} aria-hidden="true" className="text-[var(--ps-secondary)]" />
                  {leadStageLabel(stage, locale)}
                </h3>
                <span className="font-mono text-xs tabular-nums text-[var(--ps-secondary)]">
                  {leads.length}
                </span>
              </div>
              <div className="flex flex-col gap-2 p-2">
                {leads.map((lead) => {
                  const owner = agentById(lead.ownerId);
                  const property = lead.propertyIds.length > 0 ? propertyById(lead.propertyIds[0]) : undefined;
                  const extra = lead.propertyIds.length - 1;
                  return (
                    <article
                      key={lead.id}
                      className="rounded-md border border-[var(--ps-border)] bg-[var(--ps-surface)] p-3 shadow-[0_1px_2px_rgba(38,49,46,0.05)]"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="flex min-w-0 items-center gap-2">
                          {owner && <PsAvatar initials={owner.initials} hue={owner.hue} size={24} />}
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-semibold text-[var(--ps-ink)]">
                              {lead.name}
                            </span>
                            <span className="block text-[11px] text-[var(--ps-secondary)]">
                              {leadSourceLabel(lead.source, locale)} ·{" "}
                              {formatDaysAgo(lead.createdDaysAgo, locale)}
                            </span>
                          </span>
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-[var(--ps-secondary)]">
                        {t.budget}:{" "}
                        <span className="font-medium text-[var(--ps-ink)]">
                          {lead.budgetMax > 0
                            ? `${formatCurrencyCompact(lead.budgetMin)}-${formatCurrencyCompact(lead.budgetMax)}`
                            : t.unqualified}
                        </span>
                      </p>
                      {property && (
                        <p className="mt-1 truncate text-xs text-[var(--ps-secondary)]">
                          {property.address}
                          {extra > 0 ? ` +${extra}` : ""}
                        </p>
                      )}
                      <p className="mt-2 border-t border-[var(--ps-border)] pt-2 text-xs leading-snug text-[var(--ps-ink)]">
                        <span className="font-semibold uppercase tracking-wide text-[var(--ps-secondary)]">
                          {t.nextAction}:
                        </span>{" "}
                        {lead.nextAction}
                      </p>
                      <PsButton
                        variant="subtle"
                        onClick={() => advanceLeadStage(lead.id)}
                        disabled={nextStage(lead.stage) === null}
                        aria-label={`${t.advance}: ${lead.name}`}
                        className={cn("mt-2 w-full px-2 text-xs font-semibold")}
                      >
                        {nextStage(lead.stage) === null ? t.advanceDone : t.advance}
                        <ChevronRight size={13} aria-hidden="true" />
                      </PsButton>
                    </article>
                  );
                })}
                {leads.length === 0 && (
                  <p className="px-2 py-6 text-center text-xs text-[var(--ps-secondary)]">{t.noLeads}</p>
                )}
              </div>
            </PsPanel>
          );
        })}
      </div>

      {visible.length === 0 && (
        <PsPanel className="px-4 py-8 text-center text-sm text-[var(--ps-secondary)]">{t.empty}</PsPanel>
      )}
    </div>
  );
}
