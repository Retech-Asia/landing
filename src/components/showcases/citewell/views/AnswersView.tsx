"use client";

import { useState } from "react";
import { BookMarked, MessageSquareQuote, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/cn";
import { reviewStatus, useCitewell } from "@/lib/showcases/citewell/store";
import { dateDaysAgo, formatDaysAgo, formatLongDate } from "@/lib/showcases/citewell/format";
import type { Citation, ReviewStatus } from "@/lib/showcases/citewell/types";
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
 * View 1 — Answer Workspace (Wave 2C handoff §2C): a split-pane evidence
 * workspace, not a chatbot. Curated questions on the left; on the right the
 * predefined answer with its citations. Clicking a citation opens the source
 * excerpt with the cited passage highlighted. The insufficient pair declines
 * instead of manufacturing an answer, and every answer pane carries a
 * persistent simulated-answer indicator (answers are predefined demos).
 */

const REVIEW_TONE: Record<ReviewStatus, CwChipTone> = {
  pending: "amber",
  approved: "green",
  rejected: "red",
};

/** Snapshot of one citation, resolved to the active locale at open time. */
interface CitationFocus {
  docId: string;
  sectionId: string;
  passage: string;
  locator: string;
}

interface AnswerCopy {
  title: string;
  subtitle: string;
  questionsTitle: string;
  answerTitle: string;
  askedLabel: string;
  citationsTitle: string;
  citationLabel: string;
  declinedChip: string;
  declineTitle: string;
  reviewLabels: Record<ReviewStatus, string>;
  versionLabel: string;
  categoryLabel: string;
  updatedLabel: string;
  ownerLabel: string;
  excerptLabel: string;
  highlightNote: string;
  close: string;
}

const COPY: Record<"en" | "vi", AnswerCopy> = {
  en: {
    title: "Answer Workspace",
    subtitle:
      "Curated questions with predefined, cited answers. Open a citation to read the exact source passage.",
    questionsTitle: "Questions",
    answerTitle: "Answer",
    askedLabel: "Asked",
    citationsTitle: "Citations",
    citationLabel: "Citation",
    declinedChip: "Declined",
    declineTitle: "No answer suggested",
    reviewLabels: {
      pending: "Review pending",
      approved: "Review approved",
      rejected: "Review rejected",
    },
    versionLabel: "Version",
    categoryLabel: "Category",
    updatedLabel: "Updated",
    ownerLabel: "Owner",
    excerptLabel: "Source excerpt",
    highlightNote: "The highlighted passage is the exact evidence behind this citation.",
    close: "Close",
  },
  vi: {
    title: "Không gian hỏi đáp",
    subtitle:
      "Các câu hỏi được tuyển chọn cùng câu trả lời chuẩn bị sẵn kèm trích dẫn. Mở một trích dẫn để đọc đúng đoạn nguồn.",
    questionsTitle: "Câu hỏi",
    answerTitle: "Câu trả lời",
    askedLabel: "Hỏi",
    citationsTitle: "Trích dẫn",
    citationLabel: "Trích dẫn",
    declinedChip: "Từ chối",
    declineTitle: "Không gợi ý câu trả lời",
    reviewLabels: {
      pending: "Chờ kiểm duyệt",
      approved: "Đã phê duyệt",
      rejected: "Bị từ chối",
    },
    versionLabel: "Phiên bản",
    categoryLabel: "Phân loại",
    updatedLabel: "Cập nhật",
    ownerLabel: "Đơn vị phụ trách",
    excerptLabel: "Đoạn trích nguồn",
    highlightNote: "Đoạn được đánh dấu chính là căn cứ nguồn cho trích dẫn này.",
    close: "Đóng",
  },
};

/**
 * Renders the section excerpt with the cited passage wrapped in a visible
 * <mark>. The passage is a verbatim substring of the excerpt; if it is absent
 * for any reason the excerpt renders unhighlighted instead of crashing.
 */
function CitedExcerpt({ excerpt, passage }: { excerpt: string; passage: string }) {
  const index = passage ? excerpt.indexOf(passage) : -1;
  if (index === -1) return <>{excerpt}</>;
  return (
    <>
      {excerpt.slice(0, index)}
      <mark
        data-highlight="true"
        className="bg-[var(--cw-warn-bg)] px-0.5 font-medium text-[var(--cw-warn-text)]"
      >
        {excerpt.slice(index, index + passage.length)}
      </mark>
      {excerpt.slice(index + passage.length)}
    </>
  );
}

export function AnswersView({ locale }: { locale: "en" | "vi" }) {
  const t = COPY[locale];
  const { state, docById, sectionById } = useCitewell();
  const [selectedId, setSelectedId] = useState(state.qaPairs[0]?.id ?? "");
  const [focus, setFocus] = useState<CitationFocus | null>(null);

  const qa = state.qaPairs.find((q) => q.id === selectedId) ?? state.qaPairs[0];
  if (!qa) return null;

  const status = reviewStatus(state, qa.id);
  const citations = qa.kind === "cited" ? (qa.citations ?? []) : [];

  const citationsCountLabel = (n: number) =>
    locale === "vi" ? `${n} trích dẫn` : n === 1 ? "1 citation" : `${n} citations`;

  const openCitation = (citation: Citation) =>
    setFocus({
      docId: citation.docId,
      sectionId: citation.sectionId,
      passage: citation.passage[locale],
      locator: citation.locator[locale],
    });

  const focusDoc = focus ? docById(focus.docId) : undefined;
  const focusSection = focus ? sectionById(focus.docId, focus.sectionId) : undefined;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-serif text-xl font-semibold tracking-tight">{t.title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-[var(--cw-secondary)]">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Curated question list */}
        <CwPanel className="self-start">
          <CwPanelHeader
            title={t.questionsTitle}
            action={
              <span className="flex items-center gap-2">
                <CwChip tone="muted">{state.qaPairs.length}</CwChip>
                <MessageSquareQuote
                  size={16}
                  strokeWidth={1.75}
                  aria-hidden="true"
                  className="text-[var(--cw-secondary)]"
                />
              </span>
            }
          />
          <ul className="divide-y divide-[var(--cw-border)] border-t border-[var(--cw-border)]">
            {state.qaPairs.map((item) => {
              const selected = item.id === qa.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    data-qa-id={item.id}
                    aria-current={selected ? "true" : undefined}
                    onClick={() => setSelectedId(item.id)}
                    className={cn(
                      "flex w-full flex-col gap-1.5 px-4 py-3.5 text-left transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--cw-accent)]",
                      selected ? "bg-[var(--cw-accent-soft)]" : "hover:bg-[var(--cw-canvas)]"
                    )}
                  >
                    <span
                      className={cn(
                        "text-sm font-medium leading-relaxed",
                        selected ? "text-[var(--cw-accent)]" : "text-[var(--cw-ink)]"
                      )}
                    >
                      {item.question[locale]}
                    </span>
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-[var(--cw-secondary)]">
                        {t.askedLabel} {formatDaysAgo(item.askedDaysAgo, locale)}
                      </span>
                      {item.kind === "cited" ? (
                        <CwChip tone="muted">
                          {citationsCountLabel(item.citations?.length ?? 0)}
                        </CwChip>
                      ) : (
                        <CwChip tone="amber">{t.declinedChip}</CwChip>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </CwPanel>

        {/* Selected answer + citations */}
        <div data-answer-pane="true" className="flex flex-col gap-4 lg:col-span-2">
          <CwPanel>
            <CwPanelHeader title={t.answerTitle} />
            <div className="flex flex-col gap-4 border-t border-[var(--cw-border)] px-5 py-5">
              <h3 className="text-lg font-semibold leading-snug text-[var(--cw-ink)]">
                {qa.question[locale]}
              </h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[var(--cw-secondary)]">
                <span>
                  {t.askedLabel} {formatDaysAgo(qa.askedDaysAgo, locale)}
                </span>
                <CwChip tone={REVIEW_TONE[status]}>{t.reviewLabels[status]}</CwChip>
              </div>

              {qa.kind === "cited" && qa.answer ? (
                <p className="text-[15px] leading-relaxed text-[var(--cw-ink)]">
                  {qa.answer[locale]}
                </p>
              ) : (
                <div
                  data-insufficient="true"
                  className="flex flex-col gap-2 rounded-md border border-[var(--cw-error-text)]/40 bg-[var(--cw-error-bg)] px-4 py-4"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck
                      size={16}
                      strokeWidth={1.75}
                      aria-hidden="true"
                      className="shrink-0 text-[var(--cw-error-text)]"
                    />
                    <p className="text-sm font-semibold text-[var(--cw-error-text)]">
                      {t.declineTitle}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--cw-ink)]">
                    {qa.insufficientNote?.[locale]}
                  </p>
                </div>
              )}
            </div>
          </CwPanel>

          {citations.length > 0 && (
            <CwPanel>
              <CwPanelHeader
                title={t.citationsTitle}
                action={
                  <BookMarked
                    size={16}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className="text-[var(--cw-secondary)]"
                  />
                }
              />
              <div className="flex flex-col gap-2.5 border-t border-[var(--cw-border)] px-5 py-5">
                {citations.map((citation, i) => (
                  <CwButton
                    key={`${citation.docId}-${citation.sectionId}-${i}`}
                    type="button"
                    variant="ghost"
                    onClick={() => openCitation(citation)}
                    className="w-full justify-start text-left"
                  >
                    <BookMarked
                      size={15}
                      strokeWidth={1.75}
                      aria-hidden="true"
                      className="shrink-0 text-[var(--cw-accent)]"
                    />
                    <span className="flex flex-col items-start gap-0.5 py-0.5">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--cw-secondary)]">
                        {t.citationLabel}
                      </span>
                      <span className="text-sm leading-snug text-[var(--cw-ink)]">
                        {citation.locator[locale]}
                      </span>
                    </span>
                  </CwButton>
                ))}
              </div>
            </CwPanel>
          )}
        </div>
      </div>

      {/* Source excerpt drawer for the opened citation */}
      <CwDrawer
        open={focus !== null}
        onClose={() => setFocus(null)}
        title={focusDoc ? focusDoc.title[locale] : ""}
        closeLabel={t.close}
      >
        {focus && focusDoc && focusSection && (
          <div className="flex flex-col gap-4">
            <dl className="flex flex-col divide-y divide-[var(--cw-border)]">
              <CwKV label={t.versionLabel}>v{focusDoc.version}</CwKV>
              <CwKV label={t.categoryLabel}>{focusDoc.category[locale]}</CwKV>
              <CwKV label={t.updatedLabel}>
                {formatLongDate(dateDaysAgo(focusDoc.updatedDaysAgo), locale)}
              </CwKV>
              <CwKV label={t.ownerLabel}>{focusDoc.owner[locale]}</CwKV>
              <CwKV label={t.citationLabel}>{focus.locator}</CwKV>
            </dl>
            <div className="flex flex-col gap-2">
              <CwLabel>{t.excerptLabel}</CwLabel>
              <h3 className="text-sm font-semibold text-[var(--cw-ink)]">
                {focusSection.heading[locale]}
              </h3>
              <p className="text-[15px] leading-relaxed text-[var(--cw-ink)]">
                <CitedExcerpt excerpt={focusSection.excerpt[locale]} passage={focus.passage} />
              </p>
              <p className="text-xs leading-relaxed text-[var(--cw-secondary)]">
                {t.highlightNote}
              </p>
            </div>
          </div>
        )}
      </CwDrawer>
    </div>
  );
}
