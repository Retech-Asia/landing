"use client";

import { useState, type ReactNode } from "react";
import { Building2, ClipboardList, Home, Map, RotateCcw, Smartphone } from "lucide-react";
import { cn } from "@/lib/cn";
import { PropertyProvider, useProperty } from "@/lib/showcases/property/store";
import { psVars } from "./primitives";
import { PropertyDetailView } from "./views/PropertyDetailView";
import { PortfolioView } from "./views/PortfolioView";
import { PipelineView } from "./views/PipelineView";
import { MapView } from "./views/MapView";
import { CompanionView } from "./views/CompanionView";

/**
 * Property Studio application shell (Blueprint A handoff): calm,
 * desktop-first real-estate CRM chrome over one in-memory dataset. The
 * product mark is the handoff's geometric device — a gabled roofline over
 * an open doorway — rendered as inline SVG.
 */

export type PropertyViewId = "property" | "portfolio" | "pipeline" | "map" | "companion";

const NAV: { id: PropertyViewId; en: string; vi: string; icon: typeof Home }[] = [
  { id: "property", en: "Property Detail", vi: "Chi tiết bất động sản", icon: Home },
  { id: "portfolio", en: "Portfolio", vi: "Danh mục", icon: Building2 },
  { id: "pipeline", en: "Lead Pipeline", vi: "Quy trình khách hàng", icon: ClipboardList },
  { id: "map", en: "Map View", vi: "Bản đồ", icon: Map },
  { id: "companion", en: "Agent Companion", vi: "Trợ lý hiện trường", icon: Smartphone },
];

/** Handoff product mark: gabled roofline over an open doorway. */
export function PropertyMark({ size = 17 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v10h13V10" />
      <path d="M10 20v-6h4v6" />
    </svg>
  );
}

function ResetButton({ locale }: { locale: "en" | "vi" }) {
  const { reset } = useProperty();
  return (
    <button
      onClick={reset}
      className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-[var(--ps-border)] bg-[var(--ps-surface)] px-3 text-sm font-medium text-[var(--ps-secondary)] transition-colors hover:border-[var(--ps-accent)] hover:text-[var(--ps-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ps-accent)]"
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
  initialView: PropertyViewId;
  navAriaLabel: string;
}) {
  const [active, setActive] = useState<PropertyViewId>(initialView);

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
      className="overflow-hidden rounded-md border border-[var(--ps-border)] bg-[var(--ps-canvas)] text-[var(--ps-ink)]"
    >
      {/* Workspace header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--ps-border)] bg-[var(--ps-surface)] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--ps-accent)] text-white"
          >
            <PropertyMark size={17} />
          </span>
          <span className="text-base font-semibold tracking-tight">
            Property
            <span className="ml-1.5 text-sm font-medium text-[var(--ps-secondary)]">Studio</span>
          </span>
        </div>
        <ResetButton locale={locale} />
      </div>

      {/* Left-aligned workspace navigation */}
      <div
        role="tablist"
        aria-label={navAriaLabel}
        onKeyDown={onNavKey}
        className="flex gap-1 overflow-x-auto border-b border-[var(--ps-border)] bg-[var(--ps-surface)] px-2 py-1.5"
      >
        {NAV.map((n) => {
          const selected = n.id === active;
          const Icon = n.icon;
          return (
            <button
              key={n.id}
              role="tab"
              id={`ps-tab-${n.id}`}
              aria-selected={selected}
              aria-controls={`ps-panel-${n.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(n.id)}
              className={cn(
                "inline-flex min-h-[44px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ps-accent)]",
                selected
                  ? "bg-[var(--ps-accent-soft)] text-[var(--ps-accent)]"
                  : "text-[var(--ps-secondary)] hover:bg-[var(--ps-canvas)] hover:text-[var(--ps-ink)]"
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
        id={`ps-panel-${active}`}
        aria-labelledby={`ps-tab-${active}`}
        tabIndex={-1}
        className="p-3 sm:p-4 lg:p-5"
      >
        {active === "property" && <PropertyDetailView locale={locale} />}
        {active === "portfolio" && <PortfolioView locale={locale} />}
        {active === "pipeline" && <PipelineView locale={locale} />}
        {active === "map" && <MapView locale={locale} />}
        {active === "companion" && <CompanionView locale={locale} />}
      </div>

      {/* Session note — the full disclaimer renders above the app on the page */}
    </div>
  );
}

export function PropertyApp({
  locale,
  initialView = "property",
}: {
  locale: "en" | "vi";
  initialView?: PropertyViewId;
}) {
  return (
    <div style={psVars} className="text-[15px] [color-scheme:light]">
      <PropertyProvider>
        <AppInner
          locale={locale}
          initialView={initialView}
          navAriaLabel={locale === "vi" ? "Các màn hình Property Studio" : "Property Studio views"}
        />
      </PropertyProvider>
    </div>
  );
}

/**
 * Bare demo root for surfaces that mount Property Studio views without the
 * app chrome (showcase shell tabs, full-screen view routes): shared store +
 * scoped palette in one wrapper, so `useProperty()` and `var(--ps-*)`
 * resolve on every mount surface. Persists across shell tab switches —
 * stage moves, check-ins and captured leads made in one view must stay
 * visible in the others.
 */
export function PropertyDemoRoot({ children }: { children: ReactNode }) {
  return (
    <div style={psVars} className="text-[15px] [color-scheme:light]">
      <PropertyProvider>{children}</PropertyProvider>
    </div>
  );
}
