"use client";

import { Check, ClipboardCheck, CloudOff, PenLine, RefreshCw, type LucideIcon } from "lucide-react";
import { useRelay } from "@/lib/showcases/relay/store";
import { formatMinutesAgo } from "@/lib/showcases/relay/format";
import type { SyncAction } from "@/lib/showcases/relay/types";
import { RfButton, RfLabel, RfPanel } from "../primitives";

/**
 * Offline Queue (Wave 2D handoff §2D): locally queued actions and the
 * simulated sync state. "Run sync" is a clearly labeled simulation — nothing
 * leaves the device and no network call exists.
 */

interface SyncCopy {
  title: string;
  simulated: string;
  queueTitle: string;
  runSync: string;
  lastSync: string;
  empty: string;
}

const COPY: Record<"en" | "vi", SyncCopy> = {
  en: {
    title: "Offline Queue",
    simulated: "Simulated sync — nothing leaves this device.",
    queueTitle: "Queued actions",
    runSync: "Run simulated sync",
    lastSync: "Last synced",
    empty: "Queue clear — all changes synced.",
  },
  vi: {
    title: "Hàng đợi ngoại tuyến",
    simulated: "Đồng bộ mô phỏng — không có dữ liệu rời thiết bị.",
    queueTitle: "Hành động đang chờ",
    runSync: "Chạy đồng bộ mô phỏng",
    lastSync: "Đồng bộ lần trước",
    empty: "Hàng đợi trống — mọi thay đổi đã đồng bộ.",
  },
};

const KIND_ICONS: Record<SyncAction["kind"], LucideIcon> = {
  checklist: ClipboardCheck,
  note: PenLine,
  status: RefreshCw,
};

export function SyncView({ locale }: { locale: "en" | "vi" }) {
  const t = COPY[locale];
  const { state, runSync } = useRelay();
  const queueEmpty = state.syncQueue.length === 0;

  return (
    <div className="flex min-h-full flex-col gap-3 p-4">
      {/* Header: title + queue count chip (text is exactly the queued count) */}
      <div className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--rf-accent-tint)] text-[var(--rf-accent)]"
        >
          <CloudOff size={17} strokeWidth={1.75} />
        </span>
        <h1 className="min-w-0 break-words text-lg font-bold leading-snug tracking-tight text-[var(--rf-ink)]">
          {t.title}
        </h1>
        <span
          data-queue-count="true"
          className="ml-auto inline-flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full bg-[var(--rf-accent)] px-2 text-xs font-bold text-white"
        >
          {state.syncQueue.length}
        </span>
      </div>

      {/* Visible simulated-data label (handoff: label every simulated feature) */}
      <p className="flex items-start gap-2 rounded-2xl bg-[var(--rf-teal-tint)] px-3.5 py-2.5 text-xs font-semibold leading-relaxed text-[var(--rf-teal)]">
        <CloudOff size={14} strokeWidth={1.75} aria-hidden="true" className="mt-0.5 shrink-0" />
        {t.simulated}
      </p>

      <RfButton
        data-run-sync="true"
        onClick={runSync}
        disabled={queueEmpty}
        aria-disabled={queueEmpty}
        className="w-full"
      >
        <RefreshCw size={16} strokeWidth={1.75} aria-hidden="true" />
        {t.runSync}
      </RfButton>

      <p data-last-sync="true" className="text-xs font-semibold text-[var(--rf-secondary)]">
        {t.lastSync}: {formatMinutesAgo(state.lastSyncedMinutesAgo, locale)}
      </p>

      <section className="flex flex-col gap-2">
        <RfLabel>{t.queueTitle}</RfLabel>
        {queueEmpty ? (
          <RfPanel data-sync-empty="true" className="flex flex-col items-center gap-2 px-4 py-8 text-center">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--rf-ok-bg)] text-[var(--rf-ok-text)]"
            >
              <Check size={20} strokeWidth={1.75} />
            </span>
            <p className="text-sm font-semibold text-[var(--rf-ink)]">{t.empty}</p>
          </RfPanel>
        ) : (
          <RfPanel>
            <ul className="flex flex-col divide-y divide-[var(--rf-border)]">
              {state.syncQueue.map((action) => {
                const Icon = KIND_ICONS[action.kind];
                return (
                  <li key={action.id} data-sync-action={action.id} className="flex items-start gap-3 px-4 py-3">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--rf-teal-tint)] text-[var(--rf-teal)]"
                    >
                      <Icon size={15} strokeWidth={1.75} />
                    </span>
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span className="break-words text-sm font-semibold leading-snug text-[var(--rf-ink)]">
                        {action.label[locale]}
                      </span>
                      <span className="text-[11px] font-medium text-[var(--rf-secondary)]">
                        {formatMinutesAgo(action.minutesAgo, locale)}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </RfPanel>
        )}
      </section>
    </div>
  );
}
