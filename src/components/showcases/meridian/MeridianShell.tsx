"use client";

import { useState, type ReactNode } from "react";
import { Boxes, ClipboardList, FileCheck2, RotateCcw, Warehouse } from "lucide-react";
import { cn } from "@/lib/cn";
import { MeridianProvider, useMeridian } from "@/lib/showcases/meridian/store";
import { mdVars } from "./primitives";
import { OverviewView } from "./views/OverviewView";
import { PurchasingView } from "./views/PurchasingView";
import { InventoryView } from "./views/InventoryView";
import { ApprovalsView } from "./views/ApprovalsView";

/**
 * Meridian Operations application shell (Wave 2A handoff): precise,
 * enterprise-operations chrome over one in-memory dataset. The product mark
 * is the handoff's original geometric device — three stacked rectangular
 * modules with one offset connector — rendered as inline SVG.
 */

export type MeridianViewId = "overview" | "purchasing" | "inventory" | "approvals";

const NAV: { id: MeridianViewId; en: string; vi: string; icon: typeof Warehouse }[] = [
  { id: "overview", en: "Operations Overview", vi: "Tổng quan vận hành", icon: Warehouse },
  { id: "purchasing", en: "Purchase Orders", vi: "Đơn mua hàng", icon: ClipboardList },
  { id: "inventory", en: "Inventory Control", vi: "Quản lý tồn kho", icon: Boxes },
  { id: "approvals", en: "Approval Center", vi: "Trung tâm phê duyệt", icon: FileCheck2 },
];

/** Handoff product mark: three stacked rectangular modules + offset connector. */
export function MeridianMark({ size = 17 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="currentColor">
      <rect x="3" y="4" width="13" height="4" rx="1" />
      <rect x="3" y="10" width="13" height="4" rx="1" />
      <rect x="3" y="16" width="13" height="4" rx="1" />
      <rect x="18" y="10.5" width="3" height="3" rx="0.75" />
    </svg>
  );
}

function ResetButton({ locale }: { locale: "en" | "vi" }) {
  const { reset } = useMeridian();
  return (
    <button
      onClick={reset}
      className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-[var(--md-border)] bg-[var(--md-surface)] px-3 text-sm font-medium text-[var(--md-secondary)] transition-colors hover:border-[var(--md-accent)] hover:text-[var(--md-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--md-accent)]"
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
  initialView: MeridianViewId;
  navAriaLabel: string;
}) {
  const [active, setActive] = useState<MeridianViewId>(initialView);

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
      className="overflow-hidden rounded-md border border-[var(--md-border)] bg-[var(--md-canvas)] text-[var(--md-ink)]"
    >
      {/* Operations header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--md-border)] bg-[var(--md-surface)] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--md-accent)] text-white"
          >
            <MeridianMark size={17} />
          </span>
          <span className="text-base font-semibold tracking-tight">
            Meridian
            <span className="ml-1.5 text-sm font-medium text-[var(--md-secondary)]">Operations</span>
          </span>
        </div>
        <ResetButton locale={locale} />
      </div>

      {/* Left-aligned operations navigation */}
      <div
        role="tablist"
        aria-label={navAriaLabel}
        onKeyDown={onNavKey}
        className="flex gap-1 overflow-x-auto border-b border-[var(--md-border)] bg-[var(--md-surface)] px-2 py-1.5"
      >
        {NAV.map((n) => {
          const selected = n.id === active;
          const Icon = n.icon;
          return (
            <button
              key={n.id}
              role="tab"
              id={`md-tab-${n.id}`}
              aria-selected={selected}
              aria-controls={`md-panel-${n.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(n.id)}
              className={cn(
                "inline-flex min-h-[44px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--md-accent)]",
                selected
                  ? "bg-[var(--md-accent-soft)] text-[var(--md-accent)]"
                  : "text-[var(--md-secondary)] hover:bg-[var(--md-canvas)] hover:text-[var(--md-ink)]"
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
        id={`md-panel-${active}`}
        aria-labelledby={`md-tab-${active}`}
        tabIndex={-1}
        className="p-3 sm:p-4 lg:p-5"
      >
        {active === "overview" && <OverviewView locale={locale} />}
        {active === "purchasing" && <PurchasingView locale={locale} />}
        {active === "inventory" && <InventoryView locale={locale} />}
        {active === "approvals" && <ApprovalsView locale={locale} />}
      </div>

      {/* Session note — the full disclaimer renders above the app on the page */}
    </div>
  );
}

export function MeridianApp({
  locale,
  initialView = "overview",
}: {
  locale: "en" | "vi";
  initialView?: MeridianViewId;
}) {
  return (
    <div style={mdVars} className="text-[15px] [color-scheme:light]">
      <MeridianProvider>
        <AppInner
          locale={locale}
          initialView={initialView}
          navAriaLabel={locale === "vi" ? "Các màn hình Meridian" : "Meridian views"}
        />
      </MeridianProvider>
    </div>
  );
}

/**
 * Bare demo root for surfaces that mount Meridian views without the app
 * chrome (showcase shell tabs, full-screen view routes): shared store +
 * scoped palette in one wrapper, so `useMeridian()` and `var(--md-*)`
 * resolve on every mount surface. Persists across shell tab switches —
 * approvals and transfers made in one view must stay visible in the others.
 */
export function MeridianDemoRoot({ children }: { children: ReactNode }) {
  return (
    <div style={mdVars} className="text-[15px] [color-scheme:light]">
      <MeridianProvider>{children}</MeridianProvider>
    </div>
  );
}
