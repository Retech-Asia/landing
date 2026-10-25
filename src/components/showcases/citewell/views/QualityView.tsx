"use client";

import { useState } from "react";
import { BookMarked, ListChecks, MessageSquareQuote, ShieldCheck } from "lucide-react";
import { useCitewell } from "@/lib/showcases/citewell/store";
import type { QualityCase, QualityOutcome } from "@/lib/showcases/citewell/types";
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
 * View 4 — Quality Checks (Wave 2C handoff §2C): deterministic example
 * evaluation cases over the stored corpus. Outcomes are fixed fixtures —
 * pass/flagged never rerun, randomize or call a model. Summary counts derive
 * from the shared store; the details drawer reads the related answer text.
 */

interface QualityCopy {
  title: string;
  subtitle: string;
  statPassed: string;
  statFlagged: string;
  casesTitle: string;
  casesNote: string;
  evaluatesLabel: string;
  expectationLabel: string;
  outcomeDetailLabel: string;
  answerLabel: string;
  declineLabel: string;
  citationsLabel: string;
  outcomeLabels: Record<QualityOutcome, string>;
  details: string;
  detailsAria: (name: string) => string;
  closeDetails: string;
}

const COPY: Record<"en" | "vi", QualityCopy> = {
  en: {
    title: "Quality Checks",
    subtitle:
      "Deterministic evaluation cases over the stored corpus. Outcomes are fixed examples, not live model calls.",
    statPassed: "Checks passed",
    statFlagged: "Flagged for review",
    casesTitle: "Evaluation cases",
    casesNote: "Each check evaluates one stored answer against a fixed expectation.",
    evaluatesLabel: "Evaluates",
    expectationLabel: "Expectation",
    outcomeDetailLabel: "Outcome",
    answerLabel: "Related answer",
    declineLabel: "Decline note",
    citationsLabel: "Cited sources",
    outcomeLabels: {
      pass: "Passed",
      flagged: "Flagged",
    },
    details: "Details",
    detailsAria: (name) => `Details for ${name}`,
    closeDetails: "Close details",
  },
  vi: {
    title: "Kiểm tra chất lượng",
    subtitle:
      "Các trường hợp kiểm tra cố định trên kho tài liệu đã lưu. Kết quả là ví dụ định sẵn, không gọi mô hình thực.",
    statPassed: "Kiểm tra đạt",
    statFlagged: "Được gắn cờ",
    casesTitle: "Các trường hợp kiểm tra",
    casesNote: "Mỗi kiểm tra đánh giá một câu trả lời đã lưu theo một tiêu chuẩn cố định.",
    evaluatesLabel: "Đánh giá câu hỏi",
    expectationLabel: "Tiêu chuẩn",
    outcomeDetailLabel: "Kết quả",
    answerLabel: "Câu trả lời liên quan",
    declineLabel: "Ghi chú từ chối",
    citationsLabel: "Nguồn được trích dẫn",
    outcomeLabels: {
      pass: "Đạt",
      flagged: "Gắn cờ",
    },
    details: "Chi tiết",
    detailsAria: (name) => `Chi tiết: ${name}`,
    closeDetails: "Đóng chi tiết",
  },
};

const OUTCOME_TONE: Record<QualityOutcome, CwChipTone> = {
  pass: "green",
  flagged: "amber",
};

export function QualityView({ locale }: { locale: "en" | "vi" }) {
  const t = COPY[locale];
  const { state, qaById } = useCitewell();
  const [openCaseId, setOpenCaseId] = useState<string | null>(null);

  const passedCount = state.qualityCases.filter((c) => c.outcome === "pass").length;
  const flaggedCount = state.qualityCases.filter((c) => c.outcome === "flagged").length;

  const openCase: QualityCase | undefined = openCaseId
    ? state.qualityCases.find((c) => c.id === openCaseId)
    : undefined;
  const openQa = openCase ? qaById(openCase.qaId) : undefined;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{t.title}</h2>
        <p className="text-sm text-[var(--cw-secondary)]">{t.subtitle}</p>
      </div>

      {/* Summary counts — derived from the fixed fixtures */}
      <div className="grid grid-cols-2 gap-3 sm:max-w-sm">
        <div className="rounded-md border border-[var(--cw-border)] bg-[var(--cw-surface)] px-3.5 py-3">
          <CwLabel>{t.statPassed}</CwLabel>
          <p
            data-quality-passed="true"
            className="mt-1 font-mono text-xl font-semibold tabular-nums text-[var(--cw-ok-text)]"
          >
            {passedCount}
          </p>
        </div>
        <div className="rounded-md border border-[var(--cw-border)] bg-[var(--cw-surface)] px-3.5 py-3">
          <CwLabel>{t.statFlagged}</CwLabel>
          <p
            data-quality-flagged="true"
            className="mt-1 font-mono text-xl font-semibold tabular-nums text-[var(--cw-warn-text)]"
          >
            {flaggedCount}
          </p>
        </div>
      </div>

      {/* Evaluation cases — fixed outcomes, one card per check */}
      <CwPanel>
        <CwPanelHeader
          title={t.casesTitle}
          action={<ShieldCheck size={15} strokeWidth={1.75} aria-hidden="true" className="text-[var(--cw-secondary)]" />}
        />
        <p className="px-4 pb-3 text-xs leading-relaxed text-[var(--cw-secondary)]">{t.casesNote}</p>
        <div className="grid grid-cols-1 gap-3 border-t border-[var(--cw-border)] p-4 lg:grid-cols-2">
          {state.qualityCases.map((qualityCase) => {
            const qa = qaById(qualityCase.qaId);
            return (
              <div
                key={qualityCase.id}
                data-case-id={qualityCase.id}
                data-outcome={qualityCase.outcome}
                className="flex flex-col gap-3 rounded-md border border-[var(--cw-border)] bg-[var(--cw-canvas)] px-3.5 py-3.5"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold leading-relaxed text-[var(--cw-ink)]">
                    {qualityCase.name[locale]}
                  </h3>
                  <CwChip tone={OUTCOME_TONE[qualityCase.outcome]}>
                    {t.outcomeLabels[qualityCase.outcome]}
                  </CwChip>
                </div>

                <div>
                  <CwLabel>{t.evaluatesLabel}</CwLabel>
                  <p className="mt-1 flex items-start gap-1.5 text-sm leading-relaxed text-[var(--cw-ink)]">
                    <MessageSquareQuote size={15} strokeWidth={1.75} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--cw-accent)]" />
                    <span>{qa?.question[locale] ?? qualityCase.qaId}</span>
                  </p>
                </div>

                <div>
                  <CwLabel>{t.expectationLabel}</CwLabel>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--cw-ink)]">
                    {qualityCase.expectation[locale]}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-[var(--cw-secondary)]">{qualityCase.detail[locale]}</p>

                <div className="mt-auto border-t border-[var(--cw-border)] pt-3">
                  <CwButton
                    type="button"
                    variant="ghost"
                    aria-label={t.detailsAria(qualityCase.name[locale])}
                    onClick={() => setOpenCaseId(qualityCase.id)}
                  >
                    <ListChecks size={15} strokeWidth={1.75} aria-hidden="true" />
                    {t.details}
                  </CwButton>
                </div>
              </div>
            );
          })}
        </div>
      </CwPanel>

      {/* Case details drawer — full case plus the related answer text */}
      <CwDrawer
        open={!!openCase}
        onClose={() => setOpenCaseId(null)}
        title={openCase ? openCase.name[locale] : ""}
        closeLabel={t.closeDetails}
      >
        {openCase && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <CwChip tone={OUTCOME_TONE[openCase.outcome]}>{t.outcomeLabels[openCase.outcome]}</CwChip>
            </div>
            <dl className="flex flex-col gap-2.5">
              <CwKV label={t.evaluatesLabel}>{openQa?.question[locale] ?? openCase.qaId}</CwKV>
              <CwKV label={openQa?.kind === "cited" ? t.answerLabel : t.declineLabel}>
                {openQa?.answer?.[locale] ?? openQa?.insufficientNote?.[locale]}
              </CwKV>
              <CwKV label={t.expectationLabel}>{openCase.expectation[locale]}</CwKV>
              <CwKV label={t.outcomeDetailLabel}>{openCase.detail[locale]}</CwKV>
            </dl>
            {openQa?.citations && openQa.citations.length > 0 && (
              <div>
                <CwLabel>{t.citationsLabel}</CwLabel>
                <ul className="mt-1.5 flex flex-col gap-1.5">
                  {openQa.citations.map((citation) => (
                    <li
                      key={`${citation.docId}-${citation.sectionId}`}
                      className="flex items-start gap-1.5 text-xs font-semibold text-[var(--cw-accent)]"
                    >
                      <BookMarked size={14} strokeWidth={1.75} aria-hidden="true" className="mt-0.5 shrink-0" />
                      <span>{citation.locator[locale]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CwDrawer>
    </div>
  );
}
