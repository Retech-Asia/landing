"use client";

import { useState, type ReactNode } from "react";
import {
  ChartNoAxesCombined,
  ContactRound,
  Kanban,
  LayoutDashboard,
  RotateCcw,
  Users,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { NorthlineProvider, useNorthline } from "./store";
import { nlVars } from "./primitives";
import { DashboardView } from "./views/DashboardView";
import { LeadsView } from "./views/LeadsView";
import { PipelineView } from "./views/PipelineView";
import { CustomersView } from "./views/CustomersView";
import { AutomationView } from "./views/AutomationView";

/**
 * Northline CRM application shell (creative handoff §2): professional top
 * workspace header, compact navigation, generous work area. All five views
 * share one in-memory dataset via NorthlineProvider — stage moves in the
 * pipeline reflect on the dashboard, leads, and customer records instantly.
 */

export type NorthlineViewId =
  | "dashboard"
  | "leads"
  | "pipeline"
  | "customers"
  | "automation";

const NAV: { id: NorthlineViewId; en: string; vi: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", en: "Overview", vi: "Tổng quan", icon: LayoutDashboard },
  { id: "leads", en: "Leads", vi: "Khách hàng tiềm năng", icon: Users },
  { id: "pipeline", en: "Pipeline", vi: "Quy trình bán hàng", icon: Kanban },
  { id: "customers", en: "Customer 360°", vi: "Hồ sơ khách hàng 360°", icon: ContactRound },
  { id: "automation", en: "Automation & Insights", vi: "Tự động hóa & Báo cáo", icon: Workflow },
];

function ResetButton({ locale }: { locale: "en" | "vi" }) {
  const { reset } = useNorthline();
  return (
    <button
      onClick={reset}
      className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-[var(--nl-border)] bg-[var(--nl-surface)] px-3 text-sm font-medium text-[var(--nl-muted)] transition-colors hover:border-[var(--nl-accent)] hover:text-[var(--nl-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nl-accent)]"
    >
      <RotateCcw size={15} aria-hidden="true" />
      {locale === "vi" ? "Đặt lại" : "Reset"}
    </button>
  );
}

function AppInner({
  locale,
  initialView,
  navAriaLabel,
}: {
  locale: "en" | "vi";
  initialView: NorthlineViewId;
  navAriaLabel: string;
}) {
  const [active, setActive] = useState<NorthlineViewId>(initialView);

  const onNavKey = (e: React.KeyboardEvent) => {
    const idx = NAV.findIndex((n) => n.id === active);
    if (e.key === "ArrowRight" && idx < NAV.length - 1) {
      e.preventDefault();
      setActive(NAV[idx + 1].id);
    } else if (e.key === "ArrowLeft" && idx > 0) {
      e.preventDefault();
      setActive(NAV[idx - 1].id);
    }
  };

  return (
    <div
      dir="ltr"
      className="overflow-hidden rounded-xl border border-[var(--nl-border)] bg-[var(--nl-canvas)] text-[var(--nl-ink)]"
    >
      {/* Workspace header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--nl-border)] bg-[var(--nl-surface)] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--nl-accent)] text-white"
          >
            <ChartNoAxesCombined size={17} strokeWidth={1.75} />
          </span>
          <span className="text-base font-semibold tracking-tight">
            Northline<span className="ml-1.5 text-sm font-medium text-[var(--nl-muted)]">CRM</span>
          </span>
          <span className="ml-1 hidden rounded-full bg-[var(--nl-accent-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--nl-accent)] sm:inline">
            {locale === "vi" ? "Dữ liệu mẫu" : "Sample data"}
          </span>
        </div>
        <ResetButton locale={locale} />
      </div>

      {/* View navigation */}
      <div
        role="tablist"
        aria-label={navAriaLabel}
        onKeyDown={onNavKey}
        className="flex gap-1 overflow-x-auto border-b border-[var(--nl-border)] bg-[var(--nl-surface)] px-2 py-1.5"
      >
        {NAV.map((n) => {
          const selected = n.id === active;
          const Icon = n.icon;
          return (
            <button
              key={n.id}
              role="tab"
              id={`nl-tab-${n.id}`}
              aria-selected={selected}
              aria-controls={`nl-panel-${n.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(n.id)}
              className={cn(
                "inline-flex min-h-[44px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nl-accent)]",
                selected
                  ? "bg-[var(--nl-accent-soft)] text-[var(--nl-accent)]"
                  : "text-[var(--nl-muted)] hover:bg-[#F0F4F4] hover:text-[var(--nl-ink)]"
              )}
            >
              <Icon size={15} strokeWidth={1.75} aria-hidden="true" />
              {locale === "vi" ? n.vi : n.en}
            </button>
          );
        })}
      </div>

      {/* Active view */}
      <div
        role="tabpanel"
        id={`nl-panel-${active}`}
        aria-labelledby={`nl-tab-${active}`}
        tabIndex={-1}
        className="p-3 sm:p-4 lg:p-5"
      >
        {active === "dashboard" && <DashboardView locale={locale} />}
        {active === "leads" && <LeadsView locale={locale} />}
        {active === "pipeline" && <PipelineView locale={locale} />}
        {active === "customers" && <CustomersView locale={locale} />}
        {active === "automation" && <AutomationView locale={locale} />}
      </div>

      {/* Session note — the full disclaimer renders above the app on the page */}
      <div className="border-t border-[var(--nl-border)] bg-[var(--nl-surface)] px-4 py-2">
        <p className="text-[11px] text-[var(--nl-muted)]">
          {locale === "vi"
            ? "Dữ liệu mẫu — các thay đổi sẽ đặt lại khi tải lại demo."
            : "Sample data — changes reset when the demo reloads."}
        </p>
      </div>
    </div>
  );
}

export function NorthlineApp({
  locale,
  initialView = "dashboard",
}: {
  locale: "en" | "vi";
  initialView?: NorthlineViewId;
}) {
  return (
    <div style={nlVars} className="text-[15px] [color-scheme:light]">
      <NorthlineProvider>
        <AppInner
          locale={locale}
          initialView={initialView}
          navAriaLabel={locale === "vi" ? "Các màn hình Northline" : "Northline views"}
        />
      </NorthlineProvider>
    </div>
  );
}

/**
 * Bare demo root for surfaces that mount Northline views without the app
 * chrome (showcase shell tabs, full-screen view routes): shared store +
 * scoped palette in one wrapper, so `useNorthline()` and `var(--nl-*)`
 * resolve on every mount surface. Persists across shell tab switches —
 * state shared between views lives here, not in the views.
 */
export function NorthlineDemoRoot({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div style={nlVars} className="text-[15px] [color-scheme:light]">
      <NorthlineProvider>{children}</NorthlineProvider>
    </div>
  );
}
