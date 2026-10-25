"use client";

import { useState } from "react";
import {
  BookMarked,
  CheckCheck,
  FileSearch,
  ListChecks,
  MessageSquareQuote,
} from "lucide-react";
import { reviewStatus, useCitewell } from "@/lib/showcases/citewell/store";
import { dateDaysAgo, formatDaysAgo, formatLongDate } from "@/lib/showcases/citewell/format";
import type { ReviewItem, ReviewStatus } from "@/lib/showcases/citewell/types";
import {
  CwButton,
  CwChip,
  type CwChipTone,
  CwDrawer,
  CwKV,
  CwLabel,
  CwPanel,
  CwPanelHeader,
} from "../primitives";

/**
 * View 3 — Human Review (Wave 2C handoff §2C): the pending answer queue with
 * supporting evidence, confirm-gated approve/reject, and the decision history.
 * This is the proof that a human stays in the loop: every decision is
 * dispatched through the shared store, lands in the event feed, and moves the
 * answer out of the pending list. Dates render from the fixed demo clock; no
 * live model is involved anywhere.
 */

type Decision = Exclude<ReviewStatus, "pending">;

interface ReviewCopy {
  title: string;
  subtitle: string;
  statPending: string;
  statDecided: string;
  pendingTitle: string;
  pendingEmpty: string;
  historyTitle: string;
  historyEmpty: string;
  questionLabel: string;
  answerLabel: string;
  declineLabel: string;
  reasonLabel: string;
  citationsLabel: string;
  requestedLabel: string;
  decidedLabel: string;
  priorityLabels: Record<ReviewItem["priority"], string>;
  statusLabels: Record<ReviewStatus, string>;
  viewEvidence: string;
  evidenceTitle: string;
  closeEvidence: string;
  approve: string;
  reject: string;
  approveTitle: string;
  rejectTitle: string;
  closeConfirm: string;
  confirmApproval: string;
  confirmRejection: string;
  cancel: string;
  approveLeadIn: string;
  rejectLeadIn: string;
}

const COPY: Record<"en" | "vi", ReviewCopy> = {
  en: {
    title: "Human Review",
    subtitle:
      "Check each answer against its cited sources, then record an approve or reject decision.",
    statPending: "Pending review",
    statDecided: "Decisions recorded",
    pendingTitle: "Pending answers",
    pendingEmpty: "No answers waiting for review. Every queued answer has a recorded decision.",
    historyTitle: "Decision history",
    historyEmpty: "No decisions recorded yet.",
    questionLabel: "Question",
    answerLabel: "Predefined answer",
    declineLabel: "Decline note",
    reasonLabel: "Review reason",
    citationsLabel: "Citations",
    requestedLabel: "Requested",
    decidedLabel: "Decided",
    priorityLabels: {
      high: "High priority",
      normal: "Normal",
    },
    statusLabels: {
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
    },
    viewEvidence: "View evidence",
    evidenceTitle: "Source evidence",
    closeEvidence: "Close evidence",
    approve: "Approve",
    reject: "Reject",
    approveTitle: "Approve answer",
    rejectTitle: "Reject answer",
    closeConfirm: "Close confirmation",
    confirmApproval: "Confirm approval",
    confirmRejection: "Confirm rejection",
    cancel: "Cancel",
    approveLeadIn:
      "Confirm to approve this answer. The decision is recorded in the review history and the event feed.",
    rejectLeadIn:
      "Confirm to reject this answer. The decision is recorded in the review history and the event feed.",
  },
  vi: {
    title: "Kiểm duyệt",
    subtitle:
      "Đối chiếu từng câu trả lời với nguồn được trích dẫn, sau đó ghi nhận quyết định phê duyệt hoặc từ chối.",
    statPending: "Đang chờ kiểm duyệt",
    statDecided: "Quyết định đã ghi nhận",
    pendingTitle: "Câu trả lời chờ duyệt",
    pendingEmpty: "Không còn câu trả lời nào chờ kiểm duyệt. Mọi câu trả lời trong hàng chờ đều đã có quyết định.",
    historyTitle: "Lịch sử quyết định",
    historyEmpty: "Chưa có quyết định nào được ghi nhận.",
    questionLabel: "Câu hỏi",
    answerLabel: "Câu trả lời mẫu",
    declineLabel: "Ghi chú từ chối",
    reasonLabel: "Lý do kiểm duyệt",
    citationsLabel: "Trích dẫn",
    requestedLabel: "Ngày yêu cầu",
    decidedLabel: "Quyết định",
    priorityLabels: {
      high: "Ưu tiên cao",
      normal: "Thông thường",
    },
    statusLabels: {
      pending: "Chờ duyệt",
      approved: "Đã phê duyệt",
      rejected: "Bị từ chối",
    },
    viewEvidence: "Xem bằng chứng",
    evidenceTitle: "Bằng chứng nguồn",
    closeEvidence: "Đóng bằng chứng",
    approve: "Phê duyệt",
    reject: "Từ chối",
    approveTitle: "Phê duyệt câu trả lời",
    rejectTitle: "Từ chối câu trả lời",
    closeConfirm: "Đóng xác nhận",
    confirmApproval: "Xác nhận phê duyệt",
    confirmRejection: "Xác nhận từ chối",
    cancel: "Huỷ",
    approveLeadIn:
      "Xác nhận để phê duyệt câu trả lời này. Quyết định được ghi vào lịch sử kiểm duyệt và dòng sự kiện.",
    rejectLeadIn:
      "Xác nhận để từ chối câu trả lời này. Quyết định được ghi vào lịch sử kiểm duyệt và dòng sự kiện.",
  },
};

const STATUS_TONE: Record<ReviewStatus, CwChipTone> = {
  pending: "amber",
  approved: "green",
  rejected: "red",
};

const PRIORITY_TONE: Record<ReviewItem["priority"], CwChipTone> = {
  high: "amber",
  normal: "muted",
};

export function ReviewView({ locale }: { locale: "en" | "vi" }) {
  const t = COPY[locale];
  const { state, reviewDecide, qaById, docById, sectionById } = useCitewell();
  const [confirm, setConfirm] = useState<{ qaId: string; decision: Decision } | null>(null);
  const [evidenceQaId, setEvidenceQaId] = useState<string | null>(null);

  // Pending = queue entries without a recorded decision. High priority first,
  // then longest waiting first.
  const pending = [...state.reviewQueue]
    .filter((item) => reviewStatus(state, item.qaId) === "pending")
    .sort((a, b) => {
      if (a.priority !== b.priority) return a.priority === "high" ? -1 : 1;
      return b.requestedDaysAgo - a.requestedDaysAgo;
    });

  // Decided answers leave the queue and land here, newest decision first.
  // Seeded decisions carry their original daysAgo; in-session decisions are 0.
  const history = Object.entries(state.reviewDecisions)
    .map(([qaId, decision]) => ({ qaId, decision, qa: qaById(qaId) }))
    .filter((entry) => entry.qa !== undefined)
    .sort((a, b) => a.decision.daysAgo - b.decision.daysAgo);

  const confirmQa = confirm ? qaById(confirm.qaId) : undefined;
  const evidenceQa = evidenceQaId ? qaById(evidenceQaId) : undefined;

  const onConfirm = () => {
    if (confirm && confirmQa) {
      reviewDecide(confirm.qaId, confirm.decision);
    }
    setConfirm(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{t.title}</h2>
        <p className="text-sm text-[var(--cw-secondary)]">{t.subtitle}</p>
      </div>

      {/* Summary strip — derived from live store state */}
      <div className="grid grid-cols-2 gap-3 sm:max-w-sm">
        <div className="rounded-md border border-[var(--cw-border)] bg-[var(--cw-surface)] px-3.5 py-3">
          <CwLabel>{t.statPending}</CwLabel>
          <p
            data-pending-count="true"
            className="mt-1 font-mono text-xl font-semibold tabular-nums text-[var(--cw-warn-text)]"
          >
            {pending.length}
          </p>
        </div>
        <div className="rounded-md border border-[var(--cw-border)] bg-[var(--cw-surface)] px-3.5 py-3">
          <CwLabel>{t.statDecided}</CwLabel>
          <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-[var(--cw-ink)]">
            {history.length}
          </p>
        </div>
      </div>

      {/* Pending review queue */}
      <CwPanel>
        <CwPanelHeader
          title={t.pendingTitle}
          action={<ListChecks size={15} strokeWidth={1.75} aria-hidden="true" className="text-[var(--cw-secondary)]" />}
        />
        <ul className="divide-y divide-[var(--cw-border)] border-t border-[var(--cw-border)]">
          {pending.map((item) => {
            const qa = qaById(item.qaId);
            if (!qa) return null;
            return (
              <li key={item.qaId} data-review-qa-id={item.qaId} className="flex flex-col gap-3 px-4 py-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="flex items-start gap-1.5 text-sm font-semibold leading-relaxed text-[var(--cw-ink)]">
                    <MessageSquareQuote size={15} strokeWidth={1.75} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--cw-accent)]" />
                    <span>{qa.question[locale]}</span>
                  </p>
                  <CwChip tone={PRIORITY_TONE[item.priority]}>{t.priorityLabels[item.priority]}</CwChip>
                </div>
                <p className="text-xs text-[var(--cw-secondary)]">
                  {t.requestedLabel} {formatLongDate(dateDaysAgo(item.requestedDaysAgo), locale)}
                </p>

                <div>
                  <CwLabel>{qa.kind === "cited" ? t.answerLabel : t.declineLabel}</CwLabel>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--cw-ink)]">
                    {qa.answer?.[locale] ?? qa.insufficientNote?.[locale]}
                  </p>
                </div>

                <div>
                  <CwLabel>{t.reasonLabel}</CwLabel>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--cw-ink)]">{item.reason[locale]}</p>
                </div>

                {qa.citations && qa.citations.length > 0 && (
                  <div>
                    <CwLabel>{t.citationsLabel}</CwLabel>
                    <ul className="mt-1.5 flex flex-col gap-2">
                      {qa.citations.map((citation) => (
                        <li
                          key={`${citation.docId}-${citation.sectionId}`}
                          className="rounded-md border border-[var(--cw-border)] bg-[var(--cw-canvas)] px-3 py-2.5"
                        >
                          <p className="flex items-start gap-1.5 text-xs font-semibold text-[var(--cw-accent)]">
                            <BookMarked size={14} strokeWidth={1.75} aria-hidden="true" className="mt-0.5 shrink-0" />
                            <span>{citation.locator[locale]}</span>
                          </p>
                          <p className="mt-1 text-sm italic leading-relaxed text-[var(--cw-secondary)]">
                            &ldquo;{citation.passage[locale]}&rdquo;
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 border-t border-[var(--cw-border)] pt-3">
                  <CwButton
                    type="button"
                    variant="primary"
                    onClick={() => setConfirm({ qaId: item.qaId, decision: "approved" })}
                  >
                    {t.approve}
                  </CwButton>
                  <CwButton
                    type="button"
                    variant="danger"
                    onClick={() => setConfirm({ qaId: item.qaId, decision: "rejected" })}
                  >
                    {t.reject}
                  </CwButton>
                  <CwButton
                    type="button"
                    variant="ghost"
                    aria-label={t.viewEvidence}
                    onClick={() => setEvidenceQaId(item.qaId)}
                    className="sm:ml-auto"
                  >
                    <FileSearch size={15} strokeWidth={1.75} aria-hidden="true" />
                    {t.viewEvidence}
                  </CwButton>
                </div>
              </li>
            );
          })}
          {pending.length === 0 && (
            <li className="px-4 py-8 text-center text-sm text-[var(--cw-secondary)]">{t.pendingEmpty}</li>
          )}
        </ul>
      </CwPanel>

      {/* Decision history */}
      <CwPanel>
        <CwPanelHeader
          title={t.historyTitle}
          action={<CheckCheck size={15} strokeWidth={1.75} aria-hidden="true" className="text-[var(--cw-secondary)]" />}
        />
        <ul className="divide-y divide-[var(--cw-border)] border-t border-[var(--cw-border)]">
          {history.map(({ qaId, decision, qa }) => (
            <li key={qaId} data-decision-qa-id={qaId} className="flex flex-col gap-1.5 px-4 py-3.5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="text-sm font-medium leading-relaxed text-[var(--cw-ink)]">{qa!.question[locale]}</p>
                <CwChip tone={STATUS_TONE[decision.status]}>{t.statusLabels[decision.status]}</CwChip>
              </div>
              <p className="text-xs text-[var(--cw-secondary)]">
                {t.decidedLabel} {formatDaysAgo(decision.daysAgo, locale)}
              </p>
            </li>
          ))}
          {history.length === 0 && (
            <li className="px-4 py-8 text-center text-sm text-[var(--cw-secondary)]">{t.historyEmpty}</li>
          )}
        </ul>
      </CwPanel>

      {/* Approve/reject confirmation drawer — the only mutations in this view */}
      <CwDrawer
        open={!!confirm && !!confirmQa}
        onClose={() => setConfirm(null)}
        title={confirm ? (confirm.decision === "approved" ? t.approveTitle : t.rejectTitle) : ""}
        closeLabel={t.closeConfirm}
      >
        {confirm && confirmQa && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-[var(--cw-secondary)]">
              {confirm.decision === "approved" ? t.approveLeadIn : t.rejectLeadIn}
            </p>
            <dl className="flex flex-col gap-2.5">
              <CwKV label={t.questionLabel}>{confirmQa.question[locale]}</CwKV>
              <CwKV label={confirmQa.kind === "cited" ? t.answerLabel : t.declineLabel}>
                {confirmQa.answer?.[locale] ?? confirmQa.insufficientNote?.[locale]}
              </CwKV>
            </dl>
            <div className="flex flex-wrap gap-2">
              <CwButton
                type="button"
                variant={confirm.decision === "approved" ? "primary" : "danger"}
                onClick={onConfirm}
              >
                {confirm.decision === "approved" ? t.confirmApproval : t.confirmRejection}
              </CwButton>
              <CwButton type="button" variant="ghost" onClick={() => setConfirm(null)}>
                {t.cancel}
              </CwButton>
            </div>
          </div>
        )}
      </CwDrawer>

      {/* Evidence drawer — cited section excerpts, matched passage highlighted */}
      <CwDrawer
        open={!!evidenceQa}
        onClose={() => setEvidenceQaId(null)}
        title={t.evidenceTitle}
        closeLabel={t.closeEvidence}
      >
        {evidenceQa && (
          <div className="flex flex-col gap-4">
            <div>
              <CwLabel>{t.questionLabel}</CwLabel>
              <p className="mt-1 text-sm font-medium leading-relaxed text-[var(--cw-ink)]">
                {evidenceQa.question[locale]}
              </p>
            </div>
            <div>
              <CwLabel>{evidenceQa.kind === "cited" ? t.answerLabel : t.declineLabel}</CwLabel>
              <p className="mt-1 text-sm leading-relaxed text-[var(--cw-ink)]">
                {evidenceQa.answer?.[locale] ?? evidenceQa.insufficientNote?.[locale]}
              </p>
            </div>
            {(evidenceQa.citations ?? []).map((citation) => {
              const doc = docById(citation.docId);
              const section = doc ? sectionById(doc.id, citation.sectionId) : undefined;
              const excerpt = section?.excerpt[locale] ?? "";
              const passage = citation.passage[locale];
              const at = excerpt.indexOf(passage);
              return (
                <div
                  key={`${citation.docId}-${citation.sectionId}`}
                  className="rounded-md border border-[var(--cw-border)] bg-[var(--cw-canvas)] px-3 py-3"
                >
                  <p className="flex items-start gap-1.5 text-xs font-semibold text-[var(--cw-accent)]">
                    <BookMarked size={14} strokeWidth={1.75} aria-hidden="true" className="mt-0.5 shrink-0" />
                    <span>{citation.locator[locale]}</span>
                  </p>
                  {section && <CwLabel className="mt-2">{section.heading[locale]}</CwLabel>}
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--cw-ink)]">
                    {at === -1 ? (
                      excerpt
                    ) : (
                      <>
                        {excerpt.slice(0, at)}
                        <mark
                          data-highlight="true"
                          className="rounded-sm bg-[var(--cw-accent-soft)] px-0.5 font-medium text-[var(--cw-accent)]"
                        >
                          {passage}
                        </mark>
                        {excerpt.slice(at + passage.length)}
                      </>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </CwDrawer>
    </div>
  );
}
