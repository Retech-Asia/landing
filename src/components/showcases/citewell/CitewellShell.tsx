"use client";

import { useState, type ReactNode } from "react";
import { BookMarked, FileSearch, ListChecks, RotateCcw, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/cn";
import { CitewellProvider, useCitewell } from "@/lib/showcases/citewell/store";
import { CitewellMark, cwVars } from "./primitives";
import { AnswersView } from "./views/AnswersView";
import { SourcesView } from "./views/SourcesView";
import { ReviewView } from "./views/ReviewView";
import { QualityView } from "./views/QualityView";

/**
 * Citewell application shell (Wave 2C handoff): credible, analytical,
 * evidence-first chrome over one predefined synthetic corpus. Answers are
 * simulated demonstrations — the demo never suggests a live AI model is
 * generating them. Product mark: two linked quotation marks in a square
 * outline.
 */

export type CitewellViewId = "answers" | "sources" | "review" | "quality";

const NAV: { id: CitewellViewId; en: string; vi: string; icon: typeof BookMarked }[] = [
  { id: "answers", en: "Answer Workspace", vi: "Không gian hỏi đáp", icon: BookMarked },
  { id: "sources", en: "Source Library", vi: "Thư viện nguồn", icon: FileSearch },
  { id: "review", en: "Human Review", vi: "Kiểm duyệt", icon: ListChecks },
  { id: "quality", en: "Quality Checks", vi: "Kiểm tra chất lượng", icon: ShieldCheck },
];

function ResetButton({ locale }: { locale: "en" | "vi" }) {
  const { reset } = useCitewell();
  return (
    <button
      onClick={reset}
      className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-[var(--cw-border)] bg-[var(--cw-surface)] px-3.5 text-sm font-medium text-[var(--cw-secondary)] transition-colors hover:border-[var(--cw-accent)] hover:text-[var(--cw-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cw-accent)]"
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
  initialView: CitewellViewId;
  navAriaLabel: string;
}) {
  const [active, setActive] = useState<CitewellViewId>(initialView);

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
      className="overflow-hidden rounded-xl border border-[var(--cw-border)] bg-[var(--cw-canvas)] text-[var(--cw-ink)]"
    >
      {/* Masthead */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--cw-border)] bg-[var(--cw-surface)] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--cw-accent)] text-[var(--cw-accent)]"
          >
            <CitewellMark size={16} />
          </span>
          <span className="text-lg font-semibold tracking-tight">
            Citewell
            <span className="ml-1.5 text-sm font-medium text-[var(--cw-secondary)]">
              {locale === "vi" ? "Nền tảng tri thức" : "Knowledge workspace"}
            </span>
          </span>
          <span className="ml-1 hidden rounded-md bg-[var(--cw-accent-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--cw-accent)] sm:inline">
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
        className="flex gap-1 overflow-x-auto border-b border-[var(--cw-border)] bg-[var(--cw-surface)] px-2 py-1.5"
      >
        {NAV.map((n) => {
          const selected = n.id === active;
          const Icon = n.icon;
          return (
            <button
              key={n.id}
              role="tab"
              id={`cw-tab-${n.id}`}
              aria-selected={selected}
              aria-controls={`cw-panel-${n.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(n.id)}
              className={cn(
                "inline-flex min-h-[44px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-3.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cw-accent)]",
                selected
                  ? "bg-[var(--cw-accent-soft)] text-[var(--cw-accent)]"
                  : "text-[var(--cw-secondary)] hover:bg-[var(--cw-canvas)] hover:text-[var(--cw-ink)]"
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
        id={`cw-panel-${active}`}
        aria-labelledby={`cw-tab-${active}`}
        tabIndex={-1}
        className="p-3 sm:p-4 lg:p-6"
      >
        {active === "answers" && <AnswersView locale={locale} />}
        {active === "sources" && <SourcesView locale={locale} />}
        {active === "review" && <ReviewView locale={locale} />}
        {active === "quality" && <QualityView locale={locale} />}
      </div>

      {/* Session note — the full simulated-answers disclaimer renders above the app on the page */}
      <div className="border-t border-[var(--cw-border)] bg-[var(--cw-surface)] px-4 py-2">
        <p className="text-[11px] text-[var(--cw-secondary)]">
          {locale === "vi"
            ? "Dữ liệu mẫu — câu trả lời được chuẩn bị sẵn và đặt lại khi tải lại demo."
            : "Sample data — answers are predefined and reset when the demo reloads."}
        </p>
      </div>
    </div>
  );
}

export function CitewellApp({
  locale,
  initialView = "answers",
}: {
  locale: "en" | "vi";
  initialView?: CitewellViewId;
}) {
  return (
    <div style={cwVars} className="text-[15px] [color-scheme:light]">
      <CitewellProvider>
        <AppInner
          locale={locale}
          initialView={initialView}
          navAriaLabel={locale === "vi" ? "Các màn hình Citewell" : "Citewell views"}
        />
      </CitewellProvider>
    </div>
  );
}

/**
 * Bare demo root for surfaces that mount Citewell views without the app
 * chrome (showcase shell tabs, full-screen view routes): shared store +
 * scoped palette in one wrapper, so `useCitewell()` and `var(--cw-*)` resolve
 * on every mount surface. Persists across shell tab switches — review
 * decisions stay alive across views.
 */
export function CitewellDemoRoot({ children }: { children: ReactNode }) {
  return (
    <div style={cwVars} className="text-[15px] [color-scheme:light]">
      <CitewellProvider>{children}</CitewellProvider>
    </div>
  );
}
