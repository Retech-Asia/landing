"use client";

import { useState, type ReactNode } from "react";
import { BookOpen, CalendarRange, Newspaper, PenLine, RotateCcw } from "lucide-react";
import { cn } from "@/lib/cn";
import { FormaProvider, useForma } from "@/lib/showcases/forma/store";
import { fsVars, FormaMark } from "./primitives";
import { DeskView } from "./views/DeskView";
import { EditorView } from "./views/EditorView";
import { CalendarView } from "./views/CalendarView";
import { LibraryView } from "./views/LibraryView";

/**
 * Forma Studio application shell (Wave 2B handoff): editorial, spacious,
 * typography-forward chrome over one in-memory dataset. Product mark is the
 * handoff's geometric F (two horizontal bars, one vertical spine).
 */

export type FormaViewId = "desk" | "editor" | "calendar" | "library";

const NAV: { id: FormaViewId; en: string; vi: string; icon: typeof Newspaper }[] = [
  { id: "desk", en: "Editorial Desk", vi: "Bàn biên tập", icon: Newspaper },
  { id: "editor", en: "Content Editor", vi: "Trình biên tập", icon: PenLine },
  { id: "calendar", en: "Publishing Calendar", vi: "Lịch xuất bản", icon: CalendarRange },
  { id: "library", en: "Asset Library", vi: "Thư viện tài nguyên", icon: BookOpen },
];

function ResetButton({ locale }: { locale: "en" | "vi" }) {
  const { reset } = useForma();
  return (
    <button
      onClick={reset}
      className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-[var(--fs-border)] bg-[var(--fs-surface)] px-3.5 text-sm font-medium text-[var(--fs-secondary)] transition-colors hover:border-[var(--fs-accent)] hover:text-[var(--fs-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fs-accent)]"
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
  initialView: FormaViewId;
  navAriaLabel: string;
}) {
  const [active, setActive] = useState<FormaViewId>(initialView);

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
      className="overflow-hidden rounded-xl border border-[var(--fs-border)] bg-[var(--fs-canvas)] text-[var(--fs-ink)]"
    >
      {/* Masthead */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--fs-border)] bg-[var(--fs-surface)] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--fs-accent)] text-white"
          >
            <FormaMark size={16} />
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight">
            Forma<span className="ml-1.5 text-sm font-medium text-[var(--fs-secondary)]">Studio</span>
          </span>
          <span className="ml-1 hidden rounded-full bg-[var(--fs-accent-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--fs-accent)] sm:inline">
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
        className="flex gap-1 overflow-x-auto border-b border-[var(--fs-border)] bg-[var(--fs-surface)] px-2 py-1.5"
      >
        {NAV.map((n) => {
          const selected = n.id === active;
          const Icon = n.icon;
          return (
            <button
              key={n.id}
              role="tab"
              id={`fs-tab-${n.id}`}
              aria-selected={selected}
              aria-controls={`fs-panel-${n.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(n.id)}
              className={cn(
                "inline-flex min-h-[44px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fs-accent)]",
                selected
                  ? "bg-[var(--fs-accent-soft)] text-[var(--fs-accent)]"
                  : "text-[var(--fs-secondary)] hover:bg-[var(--fs-canvas)] hover:text-[var(--fs-ink)]"
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
        id={`fs-panel-${active}`}
        aria-labelledby={`fs-tab-${active}`}
        tabIndex={-1}
        className="p-3 sm:p-4 lg:p-6"
      >
        {active === "desk" && <DeskView locale={locale} />}
        {active === "editor" && <EditorView locale={locale} />}
        {active === "calendar" && <CalendarView locale={locale} />}
        {active === "library" && <LibraryView locale={locale} />}
      </div>

      {/* Session note — the full disclaimer renders above the app on the page */}
      <div className="border-t border-[var(--fs-border)] bg-[var(--fs-surface)] px-4 py-2">
        <p className="text-[11px] text-[var(--fs-secondary)]">
          {locale === "vi"
            ? "Dữ liệu mẫu — các thay đổi sẽ đặt lại khi tải lại demo."
            : "Sample data — changes reset when the demo reloads."}
        </p>
      </div>
    </div>
  );
}

export function FormaApp({
  locale,
  initialView = "desk",
}: {
  locale: "en" | "vi";
  initialView?: FormaViewId;
}) {
  return (
    <div style={fsVars} className="text-[15px] [color-scheme:light]">
      <FormaProvider>
        <AppInner
          locale={locale}
          initialView={initialView}
          navAriaLabel={locale === "vi" ? "Các màn hình Forma" : "Forma views"}
        />
      </FormaProvider>
    </div>
  );
}

/**
 * Bare demo root for surfaces that mount Forma views without the app
 * chrome (showcase shell tabs, full-screen view routes): shared store +
 * scoped palette in one wrapper, so `useForma()` and `var(--fs-*)` resolve
 * on every mount surface. Persists across shell tab switches — editor drafts
 * and simulated status moves stay alive across views.
 */
export function FormaDemoRoot({ children }: { children: ReactNode }) {
  return (
    <div style={fsVars} className="text-[15px] [color-scheme:light]">
      <FormaProvider>{children}</FormaProvider>
    </div>
  );
}
