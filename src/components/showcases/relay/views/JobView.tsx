"use client";

import { useState } from "react";
import { CalendarDays, Check, ClipboardCheck, CloudOff, MapPin, Wrench } from "lucide-react";
import { cn } from "@/lib/cn";
import { useRelay } from "@/lib/showcases/relay/store";
import { formatWindow, statusLabel } from "@/lib/showcases/relay/format";
import type { ChecklistItem, JobStatus } from "@/lib/showcases/relay/types";
import { RfButton, RfChip, RfLabel, RfPanel } from "../primitives";
import { useRelayNav } from "../nav";

/**
 * View 2 — Job Details (Wave 2D handoff §2D): the selected work order with
 * site details, a two-step status change (critical actions confirm first),
 * and a live checklist. A compact switcher jumps between the day's work
 * orders; the offline hint reflects the shared simulated sync queue.
 */

const DEFAULT_JOB_ID = "RF-2408";

interface JobCopy {
  title: string;
  switcherLabel: string;
  statusTitle: string;
  statusActions: Record<JobStatus, string>;
  confirmWith: (status: string) => string;
  confirm: string;
  cancel: string;
  checklistTitle: string;
  notesLink: string;
  offlineHint: string;
  queueHint: (count: number) => string;
}

const COPY: Record<"en" | "vi", JobCopy> = {
  en: {
    title: "Job Details",
    switcherLabel: "Switch work order",
    statusTitle: "Visit status",
    statusActions: {
      "in-progress": "Start visit",
      complete: "Mark complete",
      scheduled: "Reopen",
    },
    confirmWith: (status) => `Set status to ${status}?`,
    confirm: "Confirm",
    cancel: "Cancel",
    checklistTitle: "Checklist",
    notesLink: "Visit notes",
    offlineHint: "Changes are queued for sync while offline.",
    queueHint: (count) => (count === 1 ? "1 item waiting to sync" : `${count} items waiting to sync`),
  },
  vi: {
    title: "Chi tiết công việc",
    switcherLabel: "Chuyển phiếu công việc",
    statusTitle: "Trạng thái cuộc hẹn",
    statusActions: {
      "in-progress": "Bắt đầu",
      complete: "Hoàn tất",
      scheduled: "Mở lại",
    },
    confirmWith: (status) => `Chuyển sang trạng thái ${status}?`,
    confirm: "Xác nhận",
    cancel: "Huỷ",
    checklistTitle: "Danh sách kiểm tra",
    notesLink: "Ghi chú cuộc hẹn",
    offlineHint: "Các thay đổi được đưa vào hàng đợi đồng bộ khi ngoại tuyến.",
    queueHint: (count) => `${count} mục đang chờ đồng bộ`,
  },
};

/** Action order is fixed: start, complete, reopen. */
const STATUS_ORDER: JobStatus[] = ["in-progress", "complete", "scheduled"];

interface PendingStatus {
  jobId: string;
  status: JobStatus;
}

function ChecklistRow({
  item,
  jobId,
  locale,
  onToggle,
}: {
  item: ChecklistItem;
  jobId: string;
  locale: "en" | "vi";
  onToggle: (jobId: string, itemId: string) => void;
}) {
  return (
    <li>
      <button
        type="button"
        data-checklist-item={item.id}
        aria-pressed={item.done}
        onClick={() => onToggle(jobId, item.id)}
        className="flex min-h-[44px] w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[var(--rf-canvas)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rf-accent)]"
      >
        <span
          aria-hidden="true"
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
            item.done
              ? "border-[var(--rf-teal)] bg-[var(--rf-teal)] text-white"
              : "border-[var(--rf-border)] bg-[var(--rf-surface)] text-transparent"
          )}
        >
          <Check size={12} strokeWidth={1.75} />
        </span>
        <span
          className={cn(
            "text-sm leading-snug",
            item.done ? "text-[var(--rf-secondary)] line-through" : "text-[var(--rf-ink)]"
          )}
        >
          {item.label[locale]}
        </span>
      </button>
    </li>
  );
}

export function JobView({ locale }: { locale: "en" | "vi" }) {
  const t = COPY[locale];
  const { state, selectJob, toggleChecklist, setStatus, techById, jobById } = useRelay();
  const navigate = useRelayNav();
  const [pending, setPending] = useState<PendingStatus | null>(null);

  const job = jobById(state.selectedJobId) ?? jobById(DEFAULT_JOB_ID);
  if (!job) return null;

  const tech = techById(job.techId);
  const doneCount = job.checklist.filter((item) => item.done).length;
  const totalCount = job.checklist.length;
  const activePending = pending && pending.jobId === job.id ? pending : null;

  return (
    <div
      data-selected-job={job.id}
      data-job-detail={job.id}
      className="flex min-h-full flex-col gap-3 p-4"
    >
      <div>
        <RfLabel>{t.title}</RfLabel>
        <h2 className="mt-1 text-lg font-semibold leading-snug tracking-tight text-[var(--rf-ink)]">
          {job.task[locale]}
        </h2>
      </div>

      {/* Compact work-order switcher */}
      <div
        role="group"
        aria-label={t.switcherLabel}
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1"
      >
        {state.jobs.map((option) => {
          const active = option.id === job.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => selectJob(option.id)}
              className={cn(
                "min-h-[44px] shrink-0 whitespace-nowrap rounded-full border px-4 text-[13px] font-semibold tabular-nums transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rf-accent)]",
                active
                  ? "border-[var(--rf-accent)] bg-[var(--rf-accent)] text-white"
                  : "border-[var(--rf-border)] bg-[var(--rf-surface)] text-[var(--rf-ink)] hover:border-[var(--rf-accent)]/60"
              )}
            >
              {option.id}
            </button>
          );
        })}
      </div>

      {/* Site block */}
      <RfPanel className="flex flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[15px] font-semibold leading-snug text-[var(--rf-ink)]">
              {job.site}
            </p>
            <p className="mt-0.5 text-sm leading-snug text-[var(--rf-secondary)]">
              {job.customer}
            </p>
          </div>
          <RfChip tone={job.status === "in-progress" ? "accent" : job.status === "complete" ? "teal" : "muted"}>
            {statusLabel(job.status, locale)}
          </RfChip>
        </div>
        <p className="flex items-start gap-1.5 text-sm leading-snug text-[var(--rf-secondary)]">
          <MapPin size={14} strokeWidth={1.75} aria-hidden="true" className="mt-0.5 shrink-0" />
          {job.address}
        </p>
        {tech && (
          <p className="flex items-start gap-1.5 text-sm leading-snug text-[var(--rf-secondary)]">
            <Wrench size={14} strokeWidth={1.75} aria-hidden="true" className="mt-0.5 shrink-0" />
            <span>
              {tech.name}
              <span className="text-[var(--rf-secondary)]"> · {tech.role[locale]}</span>
            </span>
          </p>
        )}
        <p className="flex items-center gap-1.5 text-sm font-medium tabular-nums text-[var(--rf-ink)]">
          <CalendarDays size={14} strokeWidth={1.75} aria-hidden="true" className="shrink-0" />
          {formatWindow(job.startMinutes, job.endMinutes, locale)}
        </p>
      </RfPanel>

      {/* Status control — critical action, two-step confirm */}
      <div className="flex flex-col gap-2">
        <RfLabel>{t.statusTitle}</RfLabel>
        <div className="grid grid-cols-3 gap-2">
          {STATUS_ORDER.map((next) => (
            <RfButton
              key={next}
              type="button"
              variant="secondary"
              disabled={job.status === next}
              aria-disabled={job.status === next}
              onClick={() => setPending({ jobId: job.id, status: next })}
              className="w-full whitespace-normal px-2 text-[13px] leading-tight"
            >
              {t.statusActions[next]}
            </RfButton>
          ))}
        </div>
        {activePending && (
          <div className="flex flex-col gap-2.5 rounded-2xl border border-[var(--rf-accent)]/40 bg-[var(--rf-accent-tint)] p-3">
            <p className="text-[13px] font-semibold leading-snug text-[var(--rf-ink)]">
              {t.confirmWith(statusLabel(activePending.status, locale))}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <RfButton
                type="button"
                data-confirm-status="true"
                onClick={() => {
                  setStatus(job.id, activePending.status);
                  setPending(null);
                }}
              >
                {t.confirm}
              </RfButton>
              <RfButton type="button" variant="secondary" onClick={() => setPending(null)}>
                {t.cancel}
              </RfButton>
            </div>
          </div>
        )}
      </div>

      {/* Checklist */}
      <RfPanel>
        <div className="flex items-center justify-between gap-2 border-b border-[var(--rf-border)] px-4 py-3">
          <div className="flex items-center gap-2">
            <ClipboardCheck
              size={15}
              strokeWidth={1.75}
              aria-hidden="true"
              className="shrink-0 text-[var(--rf-teal)]"
            />
            <h3 className="text-sm font-semibold text-[var(--rf-ink)]">{t.checklistTitle}</h3>
          </div>
          <span
            data-checklist-progress="true"
            className="text-[11px] font-semibold tabular-nums text-[var(--rf-teal)]"
          >
            {doneCount}/{totalCount}
          </span>
        </div>
        <ul className="divide-y divide-[var(--rf-border)]">
          {job.checklist.map((item) => (
            <ChecklistRow
              key={item.id}
              item={item}
              jobId={job.id}
              locale={locale}
              onToggle={toggleChecklist}
            />
          ))}
        </ul>
      </RfPanel>

      {/* Cross-screen link */}
      <RfButton
        type="button"
        variant="secondary"
        data-open-notes="true"
        onClick={() => navigate("notes")}
      >
        <ClipboardCheck size={15} strokeWidth={1.75} aria-hidden="true" className="shrink-0" />
        {t.notesLink}
      </RfButton>

      {/* Offline hint with live queue count */}
      <div className="flex flex-col gap-0.5 rounded-2xl border border-[var(--rf-border)] bg-[var(--rf-surface)] p-3">
        <p className="flex items-start gap-1.5 text-xs leading-snug text-[var(--rf-secondary)]">
          <CloudOff size={13} strokeWidth={1.75} aria-hidden="true" className="mt-0.5 shrink-0" />
          {t.offlineHint}
        </p>
        <p
          data-rf-queue-hint="true"
          className="pl-[19px] text-[11px] font-semibold tabular-nums text-[var(--rf-accent)]"
        >
          {t.queueHint(state.syncQueue.length)}
        </p>
      </div>
    </div>
  );
}
