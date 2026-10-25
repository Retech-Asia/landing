"use client";

import { useState } from "react";
import { CalendarDays, Wrench } from "lucide-react";
import { cn } from "@/lib/cn";
import { useRelay } from "@/lib/showcases/relay/store";
import { formatWindow, statusLabel } from "@/lib/showcases/relay/format";
import type { JobStatus, RelayJob } from "@/lib/showcases/relay/types";
import { RfChip } from "../primitives";
import { useRelayNav } from "../nav";

/**
 * View 1 — Today's Schedule (Wave 2D handoff §2D): the technician's day at a
 * glance. Every visit is one tappable card with status, time window and
 * checklist progress derived from the shared store; a view-local technician
 * filter narrows the list. Tapping a card opens the Job screen for that visit.
 */

interface TodayCopy {
  filterLabel: string;
  all: string;
  summary: (visits: number, techs: number) => string;
  empty: string;
  footnote: string;
}

const COPY: Record<"en" | "vi", TodayCopy> = {
  en: {
    filterLabel: "Filter by technician",
    all: "All",
    summary: (visits, techs) => `${visits} visits · ${techs} technicians`,
    empty: "No visits for this technician.",
    footnote: "Simulated schedule for demonstration.",
  },
  vi: {
    filterLabel: "Lọc theo kỹ thuật viên",
    all: "Tất cả",
    summary: (visits, techs) => `${visits} cuộc hẹn · ${techs} kỹ thuật viên`,
    empty: "Không có cuộc hẹn nào của kỹ thuật viên này.",
    footnote: "Lịch mô phỏng để trình diễn.",
  },
};

const STATUS_TONE: Record<JobStatus, "muted" | "accent" | "teal"> = {
  scheduled: "muted",
  "in-progress": "accent",
  complete: "teal",
};

function JobCard({ job, locale }: { job: RelayJob; locale: "en" | "vi" }) {
  const { selectJob, techById } = useRelay();
  const navigate = useRelayNav();
  const tech = techById(job.techId);
  const done = job.checklist.filter((item) => item.done).length;
  const total = job.checklist.length;
  const allDone = total > 0 && done === total;

  return (
    <button
      type="button"
      data-job-id={job.id}
      onClick={() => {
        selectJob(job.id);
        navigate("job");
      }}
      className="rounded-2xl border border-[var(--rf-border)] bg-[var(--rf-surface)] p-4 text-left transition-colors hover:border-[var(--rf-accent)]/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rf-accent)]"
    >
      <span className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--rf-secondary)]">
          {job.id}
        </span>
        <RfChip tone={STATUS_TONE[job.status]}>{statusLabel(job.status, locale)}</RfChip>
      </span>
      <span className="mt-1.5 block text-[15px] font-semibold leading-snug text-[var(--rf-ink)]">
        {job.task[locale]}
      </span>
      <span className="mt-0.5 block text-sm leading-snug text-[var(--rf-secondary)]">
        {job.customer}
      </span>
      <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--rf-secondary)]">
        <span className="inline-flex items-center gap-1">
          <Wrench size={12} strokeWidth={1.75} aria-hidden="true" className="shrink-0" />
          {tech?.name ?? job.techId}
        </span>
        <span className="inline-flex items-center gap-1 tabular-nums">
          <CalendarDays size={12} strokeWidth={1.75} aria-hidden="true" className="shrink-0" />
          {formatWindow(job.startMinutes, job.endMinutes, locale)}
        </span>
      </span>
      <span data-checklist-progress={job.id} className="mt-3 flex items-center gap-2">
        <span className="h-1 flex-1 overflow-hidden rounded-full bg-[var(--rf-border)]">
          <span
            className={cn(
              "block h-full rounded-full",
              allDone ? "bg-[var(--rf-teal)]" : "bg-[var(--rf-accent)]"
            )}
            style={{ width: `${total > 0 ? (done / total) * 100 : 0}%` }}
          />
        </span>
        <span className="text-[11px] font-semibold tabular-nums text-[var(--rf-secondary)]">
          {done}/{total}
        </span>
      </span>
    </button>
  );
}

export function TodayView({ locale }: { locale: "en" | "vi" }) {
  const t = COPY[locale];
  const { state } = useRelay();
  const [techFilter, setTechFilter] = useState<string>("all");

  const sorted = [...state.jobs].sort((a, b) => a.startMinutes - b.startMinutes);
  const visible = techFilter === "all" ? sorted : sorted.filter((job) => job.techId === techFilter);

  return (
    <div className="flex min-h-full flex-col gap-3 p-4">
      <div>
        <h2 className="text-lg font-semibold leading-snug tracking-tight text-[var(--rf-ink)]">
          {locale === "vi" ? "Lịch hôm nay" : "Today's Schedule"}
        </h2>
        <p className="mt-0.5 text-xs text-[var(--rf-secondary)]">
          {t.summary(state.jobs.length, state.techs.length)}
        </p>
      </div>

      <div
        role="group"
        aria-label={t.filterLabel}
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1"
      >
        {[{ id: "all", name: t.all }, ...state.techs].map((option) => {
          const active = techFilter === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => setTechFilter(option.id)}
              className={cn(
                "min-h-[44px] shrink-0 whitespace-nowrap rounded-full border px-4 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rf-accent)]",
                active
                  ? "border-[var(--rf-accent)] bg-[var(--rf-accent)] text-white"
                  : "border-[var(--rf-border)] bg-[var(--rf-surface)] text-[var(--rf-ink)] hover:border-[var(--rf-accent)]/60"
              )}
            >
              {option.name}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3">
        {visible.map((job) => (
          <JobCard key={job.id} job={job} locale={locale} />
        ))}
        {visible.length === 0 && (
          <p className="rounded-2xl border border-[var(--rf-border)] bg-[var(--rf-surface)] p-4 text-sm text-[var(--rf-secondary)]">
            {t.empty}
          </p>
        )}
      </div>

      <p className="mt-auto pt-1 text-[11px] leading-snug text-[var(--rf-secondary)]">
        {t.footnote}
      </p>
    </div>
  );
}
