"use client";

import { useState, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { CalendarDays, ClipboardCheck, CloudOff, MapPin, RotateCcw } from "lucide-react";
import { cn } from "@/lib/cn";
import { RelayProvider, useRelay } from "@/lib/showcases/relay/store";
import { formatToday, statusBarClock } from "@/lib/showcases/relay/format";
import { RelayMark, rfVars, RfLabel } from "./primitives";
import { RelayNavContext as NavContext, type RelayViewId } from "./nav";
import { TodayView } from "./views/TodayView";
import { JobView } from "./views/JobView";
import { NotesView } from "./views/NotesView";
import { SyncView } from "./views/SyncView";

/**
 * Relay Field application shell (Wave 2D handoff §2D): friendly, highly
 * usable, mobile-native. Desktop renders a multi-screen gallery with one
 * active interactive phone; small screens use the available width naturally
 * (no phone nested inside a phone). Simulated surfaces (offline queue, photo
 * placeholders) are labeled — there is no GPS, camera or network behaviour.
 */

export type { RelayViewId };

const SCREENS: {
  id: RelayViewId;
  nav: { en: string; vi: string };
  title: { en: string; vi: string };
  blurb: { en: string; vi: string };
  icon: typeof CalendarDays;
}[] = [
  {
    id: "today",
    nav: { en: "Today", vi: "Hôm nay" },
    title: { en: "Today's Schedule", vi: "Lịch hôm nay" },
    blurb: { en: "Technician schedule and upcoming visits", vi: "Lịch kỹ thuật viên và các cuộc hẹn sắp tới" },
    icon: CalendarDays,
  },
  {
    id: "job",
    nav: { en: "Job", vi: "Công việc" },
    title: { en: "Job Details", vi: "Chi tiết công việc" },
    blurb: { en: "Customer site details, checklist and visit progress", vi: "Thông tin khách hàng, danh sách kiểm tra và tiến độ" },
    icon: MapPin,
  },
  {
    id: "notes",
    nav: { en: "Notes", vi: "Ghi chú" },
    title: { en: "Visit Notes", vi: "Ghi chú công việc" },
    blurb: { en: "Structured notes and photo attachment placeholders", vi: "Ghi chú có cấu trúc và ảnh đính kèm" },
    icon: ClipboardCheck,
  },
  {
    id: "sync",
    nav: { en: "Sync", vi: "Đồng bộ" },
    title: { en: "Offline Queue", vi: "Hàng đợi ngoại tuyến" },
    blurb: { en: "Locally queued actions and sync state", vi: "Hành động chờ đồng bộ và trạng thái" },
    icon: CloudOff,
  },
];

function ResetButton({ locale }: { locale: "en" | "vi" }) {
  const { reset } = useRelay();
  return (
    <button
      onClick={reset}
      aria-label={locale === "vi" ? "Đặt lại demo" : "Reset the demo"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--rf-border)] bg-[var(--rf-surface)] text-[var(--rf-secondary)] transition-colors hover:border-[var(--rf-accent)] hover:text-[var(--rf-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rf-accent)]"
    >
      <RotateCcw size={15} aria-hidden="true" />
    </button>
  );
}

function AppHeader({ locale, active }: { locale: "en" | "vi"; active: RelayViewId }) {
  const { state } = useRelay();
  const screen = SCREENS.find((s) => s.id === active) ?? SCREENS[0];
  return (
    <div className="border-b border-[var(--rf-border)] bg-[var(--rf-surface)] px-4 py-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--rf-accent)] text-white"
          >
            <RelayMark size={15} />
          </span>
          <span className="text-[15px] font-bold tracking-tight text-[var(--rf-ink)]">Relay Field</span>
        </div>
        <div className="flex items-center gap-2">
          {state.syncQueue.length > 0 && (
            <span
              data-rf-queue-badge="true"
              className="inline-flex items-center gap-1 rounded-full bg-[var(--rf-accent-tint)] px-2 py-0.5 text-[10px] font-semibold text-[var(--rf-accent)]"
            >
              <CloudOff size={11} aria-hidden="true" />
              {state.syncQueue.length}
            </span>
          )}
          <ResetButton locale={locale} />
        </div>
      </div>
      <div className="mt-1 flex items-center justify-between gap-2">
        <p className="text-[11px] font-medium text-[var(--rf-secondary)]">{formatToday(locale)}</p>
        <p className="text-[11px] font-semibold text-[var(--rf-teal)]">
          {locale === "vi" ? screen.title.vi : screen.title.en}
        </p>
      </div>
    </div>
  );
}

function BottomNav({
  locale,
  active,
  onNavigate,
}: {
  locale: "en" | "vi";
  active: RelayViewId;
  onNavigate: (id: RelayViewId) => void;
}) {
  const onNavKey = (e: React.KeyboardEvent) => {
    const idx = SCREENS.findIndex((s) => s.id === active);
    if (e.key === "ArrowRight" && idx < SCREENS.length - 1) {
      e.preventDefault();
      onNavigate(SCREENS[idx + 1].id);
    } else if (e.key === "ArrowLeft" && idx > 0) {
      e.preventDefault();
      onNavigate(SCREENS[idx - 1].id);
    }
  };
  return (
    <nav
      aria-label={locale === "vi" ? "Các màn hình Relay Field" : "Relay Field screens"}
      onKeyDown={onNavKey}
      className="grid grid-cols-4 border-t border-[var(--rf-border)] bg-[var(--rf-surface)]"
    >
      {SCREENS.map((s) => {
        const selected = s.id === active;
        const Icon = s.icon;
        return (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={selected}
            data-rf-nav={s.id}
            aria-label={locale === "vi" ? s.title.vi : s.title.en}
            onClick={() => onNavigate(s.id)}
            className={cn(
              "flex min-h-[56px] flex-col items-center justify-center gap-0.5 px-1 text-[10px] font-semibold transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rf-accent)]",
              selected ? "text-[var(--rf-accent)]" : "text-[var(--rf-secondary)] hover:text-[var(--rf-ink)]"
            )}
          >
            <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
            {locale === "vi" ? s.nav.vi : s.nav.en}
          </button>
        );
      })}
    </nav>
  );
}

/** Desktop-only screen index beside the phone (handoff: multi-screen gallery). */
function ScreenRail({
  locale,
  active,
  onNavigate,
}: {
  locale: "en" | "vi";
  active: RelayViewId;
  onNavigate: (id: RelayViewId) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <RfLabel>{locale === "vi" ? "Màn hình ứng dụng" : "App screens"}</RfLabel>
      {SCREENS.map((s) => {
        const selected = s.id === active;
        const Icon = s.icon;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onNavigate(s.id)}
            aria-current={selected ? "true" : undefined}
            data-rf-rail={s.id}
            className={cn(
              "rounded-2xl border px-3.5 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rf-accent)]",
              selected
                ? "border-[var(--rf-accent)] bg-[var(--rf-accent-tint)]"
                : "border-[var(--rf-border)] bg-[var(--rf-surface)] hover:border-[var(--rf-accent)]/50"
            )}
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-[var(--rf-ink)]">
              <Icon
                size={15}
                strokeWidth={1.75}
                className={selected ? "text-[var(--rf-accent)]" : "text-[var(--rf-secondary)]"}
                aria-hidden="true"
              />
              {locale === "vi" ? s.title.vi : s.title.en}
            </span>
            <span className="mt-1 block text-xs leading-snug text-[var(--rf-secondary)]">
              {locale === "vi" ? s.blurb.vi : s.blurb.en}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function Chrome({
  locale,
  active,
  onNavigate,
  children,
}: {
  locale: "en" | "vi";
  active: RelayViewId;
  onNavigate: (id: RelayViewId) => void;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-stretch gap-6 md:flex-row md:items-center md:justify-center md:gap-10">
      <div className="hidden md:block md:w-64 md:shrink-0">
        <ScreenRail locale={locale} active={active} onNavigate={onNavigate} />
      </div>
      <div className="mx-auto w-full max-w-md md:mx-0 md:h-[720px] md:w-[380px] md:shrink-0">
        <div className="flex h-full flex-col overflow-hidden bg-[var(--rf-surface)] max-md:min-h-[560px] md:rounded-[2.4rem] md:border-[10px] md:border-[var(--rf-ink)] md:shadow-[0_24px_48px_-24px_rgba(37,50,58,0.35)]">
          {/* Status bar (fixed demo clock) */}
          <div className="flex items-center justify-between bg-[var(--rf-ink)] px-5 py-1.5 text-[11px] font-semibold text-white">
            <span data-rf-clock="true">{statusBarClock(locale)}</span>
            <span className="flex items-center gap-1" aria-hidden="true">
              <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor">
                <rect x="0" y="6" width="2.4" height="4" rx="0.6" />
                <rect x="3.6" y="4" width="2.4" height="6" rx="0.6" />
                <rect x="7.2" y="2" width="2.4" height="8" rx="0.6" />
                <rect x="10.8" y="0" width="2.4" height="10" rx="0.6" opacity="0.4" />
              </svg>
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="0.6" y="0.6" width="15" height="8.8" rx="2.4" />
                <rect x="2.2" y="2.2" width="10" height="5.6" rx="1.2" fill="currentColor" stroke="none" />
                <path d="M17.4 3.4v3.2" strokeLinecap="round" />
              </svg>
            </span>
          </div>
          <AppHeader locale={locale} active={active} />
          {/* Screen content — views fill the phone between header and nav */}
          <div
            className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-[var(--rf-canvas)]"
            data-rf-screen="true"
          >
            {children}
          </div>
          <BottomNav locale={locale} active={active} onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}

function AppInner({ locale, initialView }: { locale: "en" | "vi"; initialView: RelayViewId }) {
  const [active, setActive] = useState<RelayViewId>(initialView);
  return (
    <NavContext.Provider value={setActive}>
      <Chrome locale={locale} active={active} onNavigate={setActive}>
        {active === "today" && <TodayView locale={locale} />}
        {active === "job" && <JobView locale={locale} />}
        {active === "notes" && <NotesView locale={locale} />}
        {active === "sync" && <SyncView locale={locale} />}
      </Chrome>
    </NavContext.Provider>
  );
}

export function RelayApp({
  locale,
  initialView = "today",
}: {
  locale: "en" | "vi";
  initialView?: RelayViewId;
}) {
  return (
    <div style={rfVars} className="text-[15px] [color-scheme:light]">
      <RelayProvider>
        <AppInner locale={locale} initialView={initialView} />
      </RelayProvider>
    </div>
  );
}

function DemoRootInner({ children, fixedView }: { children: ReactNode; fixedView?: RelayViewId }) {
  const router = useRouter();
  const locale = useLocale() as "en" | "vi";
  const searchParams = useSearchParams();
  // Detail page: the showcase shell owns the active view via ?view=.
  // Full-screen [view] route: the route's view id pins the chrome; bottom-nav
  // taps walk between full-screen views instead of mutating ?view=.
  const param = searchParams.get("view");
  const active: RelayViewId =
    fixedView ?? (SCREENS.some((s) => s.id === param) ? (param as RelayViewId) : "today");
  const navigate = (id: RelayViewId) =>
    fixedView
      ? router.replace(`/${locale}/showcases/relay-field/${id}`, { scroll: false })
      : router.replace(`?view=${id}`, { scroll: false });
  return (
    <NavContext.Provider value={navigate}>
      <Chrome locale={locale} active={active} onNavigate={navigate}>
        {children}
      </Chrome>
    </NavContext.Provider>
  );
}

/**
 * Bare demo root for the showcase shell + full-screen view routes: shared
 * store + scoped palette + the phone chrome. On the detail page navigation
 * updates ?view= so the shell's tabs and the phone's bottom nav stay in sync;
 * standalone (full-screen [view] route) receives viewId and walks the
 * ../<view> routes instead. Demo state persists across screen switches
 * because the root never unmounts.
 */
export function RelayDemoRoot({ children, viewId }: { children: ReactNode; viewId?: string }) {
  const fixedView = SCREENS.some((s) => s.id === viewId) ? (viewId as RelayViewId) : undefined;
  return (
    <div style={rfVars} className="text-[15px] [color-scheme:light]">
      <RelayProvider>
        <DemoRootInner fixedView={fixedView}>{children}</DemoRootInner>
      </RelayProvider>
    </div>
  );
}
