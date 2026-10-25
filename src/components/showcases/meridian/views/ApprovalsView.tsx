"use client";

import { useMemo, useState, type ReactNode } from "react";
import { CheckCircle2, FileCheck2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { poAmount, useMeridian } from "@/lib/showcases/meridian/store";
import { formatCurrency, formatDaysAgo } from "@/lib/showcases/meridian/format";
import type { ApprovalRecord, ApprovalState } from "@/lib/showcases/meridian/types";
import {
  MdAvatar,
  MdButton,
  MdDrawer,
  MdKV,
  MdMono,
  MdPanel,
  MdPanelHeader,
  StatusChip,
  type MdChipTone,
} from "../primitives";

/**
 * View 4 — Approval Center (handoff §2A). Approval inbox ordered pending
 * first (longest waiting first), then decided records newest decision first.
 * Approve/reject run through a confirmation drawer; decisions flow through
 * the shared store, which updates the connected purchase order, appends
 * decision history, and records the event. No local state management.
 */

interface ApprovalsCopy {
  title: string;
  subtitle: string;
  kpiPending: string;
  kpiApproved: string;
  kpiRejected: string;
  kpiPendingValue: string;
  inboxTitle: string;
  empty: string;
  stateLabels: Record<ApprovalState, string>;
  requester: string;
  poLabel: string;
  amountLabel: string;
  reasonLabel: string;
  metaWaiting: string;
  metaDecided: string;
  waiting: (days: number) => string;
  approve: string;
  reject: string;
  approveTitle: string;
  rejectTitle: string;
  closeConfirmation: string;
  confirmApproval: string;
  confirmRejection: string;
  cancel: string;
  approveLeadIn: string;
  rejectLeadIn: string;
  historyTitle: string;
  historyLine: (action: "approved" | "rejected", actor: string) => string;
}

const COPY: Record<"en" | "vi", ApprovalsCopy> = {
  en: {
    title: "Approval Center",
    subtitle:
      "Review purchase requests, record decisions with confirmation, and keep order history auditable.",
    kpiPending: "Pending",
    kpiApproved: "Approved",
    kpiRejected: "Rejected",
    kpiPendingValue: "Pending value",
    inboxTitle: "Approval inbox",
    empty: "No approval records.",
    stateLabels: {
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
    },
    requester: "Requester",
    poLabel: "Purchase order",
    amountLabel: "Amount",
    reasonLabel: "Reason",
    metaWaiting: "Requested",
    metaDecided: "Decided",
    waiting: (days) => (days === 1 ? "Waiting 1 day" : `Waiting ${days} days`),
    approve: "Approve",
    reject: "Reject",
    approveTitle: "Approve",
    rejectTitle: "Reject",
    closeConfirmation: "Close confirmation",
    confirmApproval: "Confirm approval",
    confirmRejection: "Confirm rejection",
    cancel: "Cancel",
    approveLeadIn:
      "Confirm to approve this purchase request. The connected order will be marked approved.",
    rejectLeadIn:
      "Confirm to reject this purchase request. The connected order will be marked rejected.",
    historyTitle: "Decision history",
    historyLine: (action, actor) =>
      `${action === "approved" ? "Approved" : "Rejected"} by ${actor}`,
  },
  vi: {
    title: "Trung tâm phê duyệt",
    subtitle:
      "Xem xét yêu cầu mua hàng, ghi nhận quyết định qua bước xác nhận và lưu dấu vết lịch sử đơn hàng.",
    kpiPending: "Đang chờ",
    kpiApproved: "Đã duyệt",
    kpiRejected: "Đã từ chối",
    kpiPendingValue: "Giá trị chờ duyệt",
    inboxTitle: "Hộp phê duyệt",
    empty: "Không có yêu cầu phê duyệt nào.",
    stateLabels: {
      pending: "Chờ duyệt",
      approved: "Đã duyệt",
      rejected: "Đã từ chối",
    },
    requester: "Người yêu cầu",
    poLabel: "Đơn mua hàng",
    amountLabel: "Giá trị",
    reasonLabel: "Lý do",
    metaWaiting: "Đã yêu cầu",
    metaDecided: "Thời điểm quyết định",
    waiting: (days) => `Chờ ${days} ngày`,
    approve: "Duyệt",
    reject: "Từ chối",
    approveTitle: "Duyệt",
    rejectTitle: "Từ chối",
    closeConfirmation: "Đóng xác nhận",
    confirmApproval: "Xác nhận duyệt",
    confirmRejection: "Xác nhận từ chối",
    cancel: "Huỷ",
    approveLeadIn:
      "Xác nhận để duyệt yêu cầu mua hàng này. Đơn hàng liên quan sẽ được đánh dấu là đã duyệt.",
    rejectLeadIn:
      "Xác nhận để từ chối yêu cầu mua hàng này. Đơn hàng liên quan sẽ bị đánh dấu là từ chối.",
    historyTitle: "Lịch sử quyết định",
    historyLine: (action, actor) =>
      `${actor} đã ${action === "approved" ? "duyệt" : "từ chối"}`,
  },
};

const STATE_TONE: Record<ApprovalState, MdChipTone> = {
  pending: "amber",
  approved: "green",
  rejected: "red",
};

function KpiCard({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: "neutral" | "amber";
}) {
  return (
    <div className="rounded-md border border-[var(--md-border)] bg-[var(--md-surface)] px-3.5 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--md-secondary)]">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 font-mono text-xl font-semibold tabular-nums",
          tone === "amber" ? "text-[var(--md-warn-text)]" : "text-[var(--md-ink)]"
        )}
      >
        {value}
      </p>
    </div>
  );
}

function MetaCell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--md-secondary)]">
        {label}
      </p>
      <div className="mt-0.5 text-sm">{children}</div>
    </div>
  );
}

export function ApprovalsView({ locale }: { locale: "en" | "vi" }) {
  const t = COPY[locale];
  const { data, decideApproval, staffById, poByNumber } = useMeridian();
  const [confirm, setConfirm] = useState<{ id: string; decision: "approved" | "rejected" } | null>(
    null
  );

  const amountOf = (approval: ApprovalRecord): number => {
    const po = poByNumber(approval.poNumber);
    return po ? poAmount(po) : 0;
  };

  // Pending first (longest waiting first), then decided, newest decision first.
  const ordered = useMemo(() => {
    const lastDecisionDays = (a: ApprovalRecord) =>
      a.history.length > 0 ? a.history[a.history.length - 1].daysAgo : a.waitingDays;
    return [...data.approvals].sort((a, b) => {
      if (a.state === "pending" && b.state !== "pending") return -1;
      if (b.state === "pending" && a.state !== "pending") return 1;
      if (a.state === "pending" && b.state === "pending") return b.waitingDays - a.waitingDays;
      return lastDecisionDays(a) - lastDecisionDays(b);
    });
  }, [data.approvals]);

  const pendingCount = data.approvals.filter((a) => a.state === "pending").length;
  const approvedCount = data.approvals.filter((a) => a.state === "approved").length;
  const rejectedCount = data.approvals.filter((a) => a.state === "rejected").length;
  const pendingValue = data.approvals.reduce((sum, a) => {
    if (a.state !== "pending") return sum;
    return sum + amountOf(a);
  }, 0);

  // The confirmation drawer always reflects live store state; it closes
  // itself if the record is no longer pending.
  const confirmRequest = confirm ? data.approvals.find((a) => a.id === confirm.id) : undefined;
  const activeConfirm =
    confirmRequest && confirmRequest.state === "pending" ? confirm : null;
  const confirmAmount = confirmRequest ? amountOf(confirmRequest) : 0;

  const onConfirm = () => {
    if (activeConfirm && confirmRequest && confirmRequest.state === "pending") {
      decideApproval(confirmRequest.id, activeConfirm.decision);
    }
    setConfirm(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{t.title}</h2>
        <p className="text-sm text-[var(--md-secondary)]">{t.subtitle}</p>
      </div>

      {/* Summary strip — derived from the approval records */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard label={t.kpiPending} value={String(pendingCount)} tone={pendingCount > 0 ? "amber" : "neutral"} />
        <KpiCard label={t.kpiApproved} value={String(approvedCount)} />
        <KpiCard label={t.kpiRejected} value={String(rejectedCount)} />
        <KpiCard label={t.kpiPendingValue} value={formatCurrency(pendingValue)} />
      </div>

      {/* Approval inbox */}
      <MdPanel>
        <MdPanelHeader
          title={t.inboxTitle}
          action={<FileCheck2 size={15} strokeWidth={1.75} aria-hidden="true" className="text-[var(--md-secondary)]" />}
        />
        <ul className="divide-y divide-[var(--md-border)]">
          {ordered.map((approval) => {
            const requester = staffById(approval.requestedById);
            const amount = amountOf(approval);
            const lastDecision = approval.history[approval.history.length - 1];
            const isPending = approval.state === "pending";
            return (
              <li key={approval.id} className="flex flex-col gap-3 px-4 py-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    {requester && <MdAvatar initials={requester.initials} hue={requester.hue} />}
                    <div>
                      <p className="text-sm font-medium">{requester?.name ?? approval.requestedById}</p>
                      {requester && (
                        <p className="text-xs text-[var(--md-secondary)]">{requester.role}</p>
                      )}
                    </div>
                  </div>
                  <StatusChip tone={STATE_TONE[approval.state]}>{t.stateLabels[approval.state]}</StatusChip>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
                  <MetaCell label={t.poLabel}>
                    <MdMono className="font-semibold">{approval.poNumber}</MdMono>
                  </MetaCell>
                  <MetaCell label={t.amountLabel}>
                    <MdMono className="font-semibold">{formatCurrency(amount)}</MdMono>
                  </MetaCell>
                  <MetaCell label={isPending ? t.metaWaiting : t.metaDecided}>
                    {isPending ? (
                      <span className="font-medium text-[var(--md-warn-text)]">
                        {t.waiting(approval.waitingDays)}
                      </span>
                    ) : (
                      <span className="text-[var(--md-secondary)]">
                        {formatDaysAgo(lastDecision?.daysAgo ?? 0, locale)}
                      </span>
                    )}
                  </MetaCell>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--md-secondary)]">
                    {t.reasonLabel}
                  </p>
                  <p className="mt-0.5 text-sm">{approval.reason}</p>
                </div>

                {isPending ? (
                  <div className="flex flex-wrap gap-2 border-t border-[var(--md-border)] pt-3">
                    <MdButton
                      type="button"
                      variant="primary"
                      onClick={() => setConfirm({ id: approval.id, decision: "approved" })}
                    >
                      <CheckCircle2 size={15} strokeWidth={1.75} aria-hidden="true" />
                      {t.approve}
                    </MdButton>
                    <MdButton
                      type="button"
                      variant="danger"
                      onClick={() => setConfirm({ id: approval.id, decision: "rejected" })}
                    >
                      {t.reject}
                    </MdButton>
                  </div>
                ) : (
                  <div className="border-t border-[var(--md-border)] pt-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--md-secondary)]">
                      {t.historyTitle}
                    </p>
                    <ul className="mt-1.5 flex flex-col gap-1.5">
                      {approval.history.map((h, i) => {
                        const actor = staffById(h.actorId);
                        return (
                          <li key={i} className="text-sm">
                            <span>{t.historyLine(h.action, actor?.name ?? h.actorId)}</span>
                            <span className="ml-2 text-xs text-[var(--md-secondary)]">
                              {formatDaysAgo(h.daysAgo, locale)}
                            </span>
                            {h.note && (
                              <span className="mt-0.5 block text-sm italic text-[var(--md-secondary)]">
                                {h.note}
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
          {ordered.length === 0 && (
            <li className="px-4 py-8 text-center text-sm text-[var(--md-secondary)]">{t.empty}</li>
          )}
        </ul>
      </MdPanel>

      {/* Decision confirmation drawer */}
      <MdDrawer
        open={!!activeConfirm && !!confirmRequest}
        onClose={() => setConfirm(null)}
        title={
          activeConfirm && confirmRequest
            ? `${activeConfirm.decision === "approved" ? t.approveTitle : t.rejectTitle} ${confirmRequest.poNumber}`
            : ""
        }
        closeLabel={t.closeConfirmation}
      >
        {activeConfirm && confirmRequest && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-[var(--md-secondary)]">
              {activeConfirm.decision === "approved" ? t.approveLeadIn : t.rejectLeadIn}
            </p>
            <dl className="flex flex-col divide-y divide-[var(--md-border)]">
              <MdKV label={t.requester}>
                {staffById(confirmRequest.requestedById)?.name ?? confirmRequest.requestedById}
              </MdKV>
              <MdKV label={t.poLabel}>
                <MdMono className="font-medium">{confirmRequest.poNumber}</MdMono>
              </MdKV>
              <MdKV label={t.amountLabel}>
                <MdMono className="font-semibold">{formatCurrency(confirmAmount)}</MdMono>
              </MdKV>
              <MdKV label={t.reasonLabel}>{confirmRequest.reason}</MdKV>
            </dl>
            <div className="flex flex-wrap gap-2">
              <MdButton
                type="button"
                variant={activeConfirm.decision === "approved" ? "primary" : "danger"}
                onClick={onConfirm}
              >
                {activeConfirm.decision === "approved" ? t.confirmApproval : t.confirmRejection}
              </MdButton>
              <MdButton type="button" variant="ghost" onClick={() => setConfirm(null)}>
                {t.cancel}
              </MdButton>
            </div>
          </div>
        )}
      </MdDrawer>
    </div>
  );
}
