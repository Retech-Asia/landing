"use client";

import { useState, type ReactNode } from "react";
import {
  Building2,
  CalendarDays,
  ClipboardList,
  MessageCircle,
  Pill,
  RotateCcw,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { CareProvider, useCare } from "@/lib/showcases/care/store";
import { formatLongDate } from "@/lib/showcases/care/format";
import { ccVars } from "./primitives";
import { TodayView } from "./views/TodayView";
import { CarePlanView } from "./views/CarePlanView";
import { MedicationsView } from "./views/MedicationsView";
import { AppointmentsView } from "./views/AppointmentsView";
import { MessagesView } from "./views/MessagesView";
import { ClinicView } from "./views/ClinicView";

/**
 * Care Companion application shell (Blueprint B, mobile-first): patient
 * views render as true phone-width panels with hairline frames — no phone
 * bezels or device chrome anywhere (presentation law). The clinic workspace
 * is the one desktop-width view. Demo state persists across view switches
 * because the store lives in the demo root.
 */

export type CareViewId =
  | "today"
  | "care-plan"
  | "medications"
  | "appointments"
  | "messages"
  | "clinic";

const NAV: { id: CareViewId; en: string; vi: string; icon: typeof Sun }[] = [
  { id: "today", en: "Today", vi: "Hôm nay", icon: Sun },
  { id: "care-plan", en: "Care Plan", vi: "Kế hoạch", icon: ClipboardList },
  { id: "medications", en: "Medications", vi: "Thuốc", icon: Pill },
  { id: "appointments", en: "Visits", vi: "Lịch hẹn", icon: CalendarDays },
  { id: "messages", en: "Messages", vi: "Tin nhắn", icon: MessageCircle },
  { id: "clinic", en: "Clinic", vi: "Phòng khám", icon: Building2 },
];

/** Product mark: two overlapping circles (patient + care team) with a spark. */
export function CareMark({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden="true"
    >
      <circle cx="9" cy="10.5" r="5.75" />
      <circle cx="15.5" cy="13.5" r="4.25" />
      <path d="M9 8.6v3.8M7.1 10.5h3.8" strokeLinecap="round" />
    </svg>
  );
}

function ResetButton({ locale }: { locale: "en" | "vi" }) {
  const { reset } = useCare();
  return (
    <button
      type="button"
      onClick={reset}
      aria-label={locale === "vi" ? "Đặt lại demo" : "Reset the demo"}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--cc-border)] bg-[var(--cc-surface)] text-[var(--cc-secondary)] transition-colors hover:border-[var(--cc-accent)] hover:text-[var(--cc-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cc-accent)]"
    >
      <RotateCcw size={15} aria-hidden="true" />
    </button>
  );
}

function AppHeader({
  locale,
  active,
}: {
  locale: "en" | "vi";
  active: CareViewId;
}) {
  const screen = NAV.find((n) => n.id === active) ?? NAV[0];
  return (
    <div className="flex items-center justify-between gap-2 border-b border-[var(--cc-border)] bg-[var(--cc-surface)] px-4 py-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--cc-accent)] text-white"
          >
            <CareMark size={15} />
          </span>
          <span className="truncate text-[15px] font-bold tracking-tight text-[var(--cc-ink)]">
            Care Companion
          </span>
        </div>
        <p className="mt-0.5 text-[11px] text-[var(--cc-secondary)]">
          {formatLongDate(0, locale)} · {locale === "vi" ? screen.vi : screen.en}
        </p>
      </div>
      <ResetButton locale={locale} />
    </div>
  );
}

function ViewNav({
  locale,
  active,
  onNavigate,
}: {
  locale: "en" | "vi";
  active: CareViewId;
  onNavigate: (id: CareViewId) => void;
}) {
  const onNavKey = (e: React.KeyboardEvent) => {
    const idx = NAV.findIndex((n) => n.id === active);
    if (e.key === "ArrowRight" && idx < NAV.length - 1) {
      e.preventDefault();
      onNavigate(NAV[idx + 1].id);
    } else if (e.key === "ArrowLeft" && idx > 0) {
      e.preventDefault();
      onNavigate(NAV[idx - 1].id);
    }
  };
  return (
    <nav
      role="tablist"
      aria-label={locale === "vi" ? "Các màn hình Care Companion" : "Care Companion views"}
      onKeyDown={onNavKey}
      className="grid grid-cols-3 gap-1 border-b border-[var(--cc-border)] bg-[var(--cc-surface)] p-2 sm:grid-cols-6"
    >
      {NAV.map((n) => {
        const selected = n.id === active;
        const Icon = n.icon;
        return (
          <button
            key={n.id}
            type="button"
            role="tab"
            id={`cc-tab-${n.id}`}
            aria-selected={selected}
            aria-controls={`cc-panel-${n.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onNavigate(n.id)}
            className={cn(
              "flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-[10.5px] font-semibold transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--cc-accent)]",
              selected
                ? "bg-[var(--cc-accent-soft)] text-[var(--cc-accent)]"
                : "text-[var(--cc-secondary)] hover:bg-[var(--cc-mist)] hover:text-[var(--cc-ink)]"
            )}
          >
            <Icon size={17} strokeWidth={1.75} aria-hidden="true" />
            {locale === "vi" ? n.vi : n.en}
          </button>
        );
      })}
    </nav>
  );
}

function AppInner({ locale, initialView }: { locale: "en" | "vi"; initialView: CareViewId }) {
  const [active, setActive] = useState<CareViewId>(initialView);
  const isClinic = active === "clinic";
  return (
    <div
      className={cn(
        "mx-auto w-full",
        isClinic ? "max-w-5xl" : "max-w-[420px]"
      )}
    >
      <div className="overflow-hidden rounded-2xl border border-[var(--cc-border)] bg-[var(--cc-surface)] shadow-[0_1px_2px_rgba(31,55,51,0.05)]">
        <AppHeader locale={locale} active={active} />
        <ViewNav locale={locale} active={active} onNavigate={setActive} />
        <div
          role="tabpanel"
          id={`cc-panel-${active}`}
          aria-labelledby={`cc-tab-${active}`}
          tabIndex={-1}
          className="bg-[var(--cc-canvas)]"
        >
          {active === "today" && <TodayView locale={locale} />}
          {active === "care-plan" && <CarePlanView locale={locale} />}
          {active === "medications" && <MedicationsView locale={locale} />}
          {active === "appointments" && <AppointmentsView locale={locale} />}
          {active === "messages" && <MessagesView locale={locale} />}
          {active === "clinic" && <ClinicView locale={locale} />}
        </div>
      </div>
    </div>
  );
}

export function CareApp({
  locale,
  initialView = "today",
}: {
  locale: "en" | "vi";
  initialView?: CareViewId;
}) {
  return (
    <div style={ccVars} className="text-[15px] [color-scheme:light]">
      <CareProvider>
        <AppInner locale={locale} initialView={initialView} />
      </CareProvider>
    </div>
  );
}

/**
 * Bare demo root for the showcase shell: scoped palette + shared store in
 * one wrapper, so `useCare()` and `var(--cc-*)` resolve on every mount
 * surface. `viewId` is accepted for the showcase-shell contract (views there
 * are already switched by the shell tabs); it needs no chrome pinning here
 * because the full-chrome variant is `CareApp`.
 */
export function CareDemoRoot({ children }: { children: ReactNode; viewId?: string }) {
  return (
    <div style={ccVars} className="text-[15px] [color-scheme:light]">
      <CareProvider>{children}</CareProvider>
    </div>
  );
}
