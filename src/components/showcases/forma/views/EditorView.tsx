"use client";

import { useState } from "react";
import { BookOpen, CalendarRange, Eye, PenLine, Send } from "lucide-react";
import {
  articlePublishInDays,
  articleStatus,
  hasSavedDraft,
  resolveContent,
  useForma,
} from "@/lib/showcases/forma/store";
import {
  dateDaysFromNow,
  formatLongDate,
  formatPublishIn,
  formatWordCount,
} from "@/lib/showcases/forma/format";
import type { Article, ArticleDraft, ArticleStatus, DemoLocale } from "@/lib/showcases/forma/types";
import {
  FsAvatar,
  FsButton,
  FsChip,
  type FsChipTone,
  FsDrawer,
  FsInput,
  FsKV,
  FsLabel,
  FsPanel,
  FsPanelHeader,
  FsSelect,
  FsTextarea,
} from "../primitives";

/**
 * View 2 — Content Editor (Wave 2B handoff): the demo's main visual
 * highlight, a split workspace with writing controls on the left and a live
 * reader preview on the right. Edits write through the shared store
 * (edit-draft on every change, so drafts survive shell tab switches), saving
 * records an accurate local draft state (save-draft), and publishing or
 * scheduling is a confirm-gated, clearly simulated status move (set-status).
 */

const STATUS_TONE: Record<ArticleStatus, FsChipTone> = {
  draft: "neutral",
  in_review: "amber",
  scheduled: "blue",
  published: "green",
};

/** Deterministic schedule choices, in days from the fixed demo clock. */
const SCHEDULE_CHOICES = [0, 1, 2, 3, 7, 14];

interface EditorCopy {
  title: string;
  subtitle: string;
  pickerLabel: string;
  storyTitle: string;
  titleLabel: string;
  titlePlaceholder: string;
  summaryLabel: string;
  summaryPlaceholder: string;
  saved: string;
  unsaved: string;
  original: string;
  saveDraft: string;
  bodyTitle: string;
  paragraphLabel: string;
  noBody: string;
  metadataTitle: string;
  collectionLabel: string;
  destinationLabel: string;
  publicationTitle: string;
  dateLabel: string;
  sendToReview: string;
  schedule: string;
  publish: string;
  publishNow: string;
  moveToDraft: string;
  scheduleDrawerTitle: string;
  publishDrawerTitle: string;
  scheduleLeadIn: string;
  publishLeadIn: string;
  publishDateLabel: string;
  confirmSchedule: string;
  confirmPublish: string;
  cancel: string;
  close: string;
  previewTitle: string;
  untitled: string;
  words: string;
  statusLabels: Record<ArticleStatus, string>;
}

const COPY: Record<"en" | "vi", EditorCopy> = {
  en: {
    title: "Content Editor",
    subtitle:
      "Shape the story, structure its metadata and check the reader preview before it moves on.",
    pickerLabel: "Select article",
    storyTitle: "Story",
    titleLabel: "Title",
    titlePlaceholder: "Story title",
    summaryLabel: "Summary",
    summaryPlaceholder: "One or two sentences that set up the read",
    saved: "Draft saved",
    unsaved: "Unsaved changes",
    original: "Original copy",
    saveDraft: "Save draft",
    bodyTitle: "Article body",
    paragraphLabel: "Paragraph",
    noBody: "This story has no draft paragraphs yet.",
    metadataTitle: "Metadata",
    collectionLabel: "Collection",
    destinationLabel: "Destination",
    publicationTitle: "Publication",
    dateLabel: "Publication date",
    sendToReview: "Send to review",
    schedule: "Schedule",
    publish: "Publish",
    publishNow: "Publish now",
    moveToDraft: "Move to draft",
    scheduleDrawerTitle: "Schedule publication",
    publishDrawerTitle: "Publish now",
    scheduleLeadIn:
      "Confirm to schedule this story for publication.",
    publishLeadIn:
      "Confirm to mark this story as published.",
    publishDateLabel: "Publish date",
    confirmSchedule: "Confirm scheduling",
    confirmPublish: "Confirm publishing",
    cancel: "Cancel",
    close: "Close",
    previewTitle: "Preview",
    untitled: "Untitled",
    words: "words",
    statusLabels: {
      draft: "Draft",
      in_review: "In review",
      scheduled: "Scheduled",
      published: "Published",
    },
  },
  vi: {
    title: "Trình biên tập",
    subtitle:
      "Chỉnh sửa bài viết, hoàn thiện thông tin cấu trúc và xem trước bản đọc trước khi chuyển bước.",
    pickerLabel: "Chọn bài viết",
    storyTitle: "Bài viết",
    titleLabel: "Tiêu đề",
    titlePlaceholder: "Tiêu đề bài viết",
    summaryLabel: "Tóm tắt",
    summaryPlaceholder: "Một hai câu dẫn dắt người đọc",
    saved: "Đã lưu bản nháp",
    unsaved: "Có thay đổi chưa lưu",
    original: "Bản gốc",
    saveDraft: "Lưu bản nháp",
    bodyTitle: "Nội dung bài viết",
    paragraphLabel: "Đoạn",
    noBody: "Bài viết này chưa có đoạn bản nháp nào.",
    metadataTitle: "Siêu dữ liệu",
    collectionLabel: "Bộ sưu tập",
    destinationLabel: "Nơi xuất bản",
    publicationTitle: "Xuất bản",
    dateLabel: "Ngày xuất bản",
    sendToReview: "Gửi duyệt",
    schedule: "Định lịch",
    publish: "Xuất bản",
    publishNow: "Xuất bản ngay",
    moveToDraft: "Chuyển về bản nháp",
    scheduleDrawerTitle: "Lên lịch xuất bản",
    publishDrawerTitle: "Xuất bản ngay",
    scheduleLeadIn:
      "Xác nhận để lên lịch xuất bản bài viết này.",
    publishLeadIn:
      "Xác nhận để đánh dấu bài viết này đã xuất bản.",
    publishDateLabel: "Ngày xuất bản",
    confirmSchedule: "Xác nhận định lịch",
    confirmPublish: "Xác nhận xuất bản",
    cancel: "Huỷ",
    close: "Đóng",
    previewTitle: "Xem trước",
    untitled: "Chưa có tiêu đề",
    words: "từ",
    statusLabels: {
      draft: "Bản nháp",
      in_review: "Đang duyệt",
      scheduled: "Đã định lịch",
      published: "Đã xuất bản",
    },
  },
};

export function EditorView({ locale }: { locale: "en" | "vi" }) {
  const { state } = useForma();
  const [selectedId, setSelectedId] = useState(state.articles[0]?.id ?? "");
  const article = state.articles.find((a) => a.id === selectedId) ?? state.articles[0];

  if (!article) return null;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-serif text-xl font-semibold tracking-tight">{COPY[locale].title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-[var(--fs-secondary)]">
          {COPY[locale].subtitle}
        </p>
      </div>

      <FsSelect
        aria-label={COPY[locale].pickerLabel}
        value={article.id}
        onChange={(e) => setSelectedId(e.target.value)}
        className="max-w-full"
      >
        {state.articles.map((a) => (
          <option key={a.id} value={a.id}>
            {a.title[locale]} · {COPY[locale].statusLabels[articleStatus(state, a)]}
          </option>
        ))}
      </FsSelect>

      {/* Keyed per article: switching stories starts from that story's saved
          state; typed drafts live in the store so they survive tab switches. */}
      <EditorWorkspace key={article.id} article={article} locale={locale} />
    </div>
  );
}

function EditorWorkspace({ article, locale }: { article: Article; locale: DemoLocale }) {
  const t = COPY[locale];
  const { state, editDraft, saveDraft, setStatus, staffById, collectionById, destinationById } =
    useForma();

  const initial = resolveContent(state, article, locale);
  const [title, setTitle] = useState(initial.title);
  const [summary, setSummary] = useState(initial.summary);
  const [paragraphs, setParagraphs] = useState<string[]>(initial.paragraphs);
  const [collectionId, setCollectionId] = useState(article.collectionId);
  const [destinationId, setDestinationId] = useState(article.destinationId);
  const [scheduleInDays, setScheduleInDays] = useState(7);
  const [confirmMode, setConfirmMode] = useState<null | "scheduled" | "published">(null);
  const [dirty, setDirty] = useState(
    () =>
      Boolean(state.drafts[`${article.id}:${locale}`]) &&
      !hasSavedDraft(state, article.id, locale)
  );

  const status = articleStatus(state, article);
  const saved = hasSavedDraft(state, article.id, locale);
  const author = staffById(article.authorId);
  const collection = collectionById(collectionId);
  const destination = destinationById(destinationId);
  const publishDays = articlePublishInDays(state, article);
  const plannedLabel = `${formatLongDate(dateDaysFromNow(publishDays), locale)} · ${formatPublishIn(
    publishDays,
    locale
  )}`;

  // Every keystroke lands in the store so the working draft survives
  // shell tab switches; the preview reads the same local state.
  const patch = (next: Partial<{ title: string; summary: string; paragraphs: string[] }>) => {
    const draft: ArticleDraft = {
      title: next.title ?? title,
      summary: next.summary ?? summary,
      paragraphs: next.paragraphs ?? paragraphs,
    };
    setTitle(draft.title);
    setSummary(draft.summary);
    setParagraphs(draft.paragraphs);
    setDirty(true);
    editDraft(article.id, locale, draft);
  };

  const onSave = () => {
    saveDraft(article.id, locale);
    setDirty(false);
  };

  const onConfirm = () => {
    if (confirmMode === "scheduled") setStatus(article.id, "scheduled", scheduleInDays);
    if (confirmMode === "published") setStatus(article.id, "published");
    setConfirmMode(null);
  };

  const savedIndicator = dirty ? (
    <FsChip tone="amber">{t.unsaved}</FsChip>
  ) : saved ? (
    <FsChip tone="green">{t.saved}</FsChip>
  ) : (
    <FsChip tone="muted">{t.original}</FsChip>
  );

  return (
    <div data-article-id={article.id} className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* Writing controls */}
      <div className="flex flex-col gap-4 lg:col-span-2">
        <FsPanel>
          <FsPanelHeader
            title={t.storyTitle}
            action={<PenLine size={16} aria-hidden="true" className="text-[var(--fs-secondary)]" />}
          />
          <div className="flex flex-col gap-4 border-t border-[var(--fs-border)] px-5 py-5">
            <div className="flex flex-col gap-1.5">
              <FsLabel>{t.titleLabel}</FsLabel>
              <FsInput
                aria-label={t.titleLabel}
                value={title}
                placeholder={t.titlePlaceholder}
                onChange={(e) => patch({ title: e.target.value })}
                className="font-serif text-base"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <FsLabel>{t.summaryLabel}</FsLabel>
              <FsTextarea
                aria-label={t.summaryLabel}
                rows={3}
                value={summary}
                placeholder={t.summaryPlaceholder}
                onChange={(e) => patch({ summary: e.target.value })}
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--fs-border)] pt-4">
              {savedIndicator}
              <FsButton type="button" variant="ghost" disabled={!dirty} onClick={onSave}>
                <PenLine size={15} aria-hidden="true" />
                {t.saveDraft}
              </FsButton>
            </div>
          </div>
        </FsPanel>

        <FsPanel>
          <FsPanelHeader
            title={t.bodyTitle}
            action={<BookOpen size={16} aria-hidden="true" className="text-[var(--fs-secondary)]" />}
          />
          <div className="flex flex-col gap-5 border-t border-[var(--fs-border)] px-5 py-5">
            {paragraphs.length > 0 ? (
              paragraphs.map((paragraph, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <FsLabel>
                    {t.paragraphLabel} {i + 1}
                  </FsLabel>
                  <FsTextarea
                    aria-label={`${t.paragraphLabel} ${i + 1}`}
                    rows={5}
                    value={paragraph}
                    onChange={(e) =>
                      patch({
                        paragraphs: paragraphs.map((p, idx) => (idx === i ? e.target.value : p)),
                      })
                    }
                  />
                </div>
              ))
            ) : (
              <p className="text-sm leading-relaxed text-[var(--fs-secondary)]">{t.noBody}</p>
            )}
          </div>
        </FsPanel>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FsPanel>
            <FsPanelHeader title={t.metadataTitle} />
            <div className="flex flex-col gap-4 border-t border-[var(--fs-border)] px-5 py-5">
              <div className="flex flex-col gap-1.5">
                <FsLabel>{t.collectionLabel}</FsLabel>
                <FsSelect
                  aria-label={t.collectionLabel}
                  value={collectionId}
                  onChange={(e) => setCollectionId(e.target.value)}
                >
                  {state.collections.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name[locale]}
                    </option>
                  ))}
                </FsSelect>
              </div>
              <div className="flex flex-col gap-1.5">
                <FsLabel>{t.destinationLabel}</FsLabel>
                <FsSelect
                  aria-label={t.destinationLabel}
                  value={destinationId}
                  onChange={(e) => setDestinationId(e.target.value)}
                >
                  {state.destinations.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name[locale]}
                    </option>
                  ))}
                </FsSelect>
              </div>
            </div>
          </FsPanel>

          <FsPanel>
            <FsPanelHeader
              title={t.publicationTitle}
              action={<Send size={16} aria-hidden="true" className="text-[var(--fs-secondary)]" />}
            />
            <div className="flex flex-col gap-4 border-t border-[var(--fs-border)] px-5 py-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <FsChip tone={STATUS_TONE[status]}>{t.statusLabels[status]}</FsChip>
                <span className="text-xs leading-relaxed text-[var(--fs-secondary)]">
                  {t.dateLabel}: {plannedLabel}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {status === "draft" && (
                  <FsButton type="button" variant="primary" onClick={() => setStatus(article.id, "in_review")}>
                    {t.sendToReview}
                  </FsButton>
                )}
                {status === "in_review" && (
                  <>
                    <FsButton
                      type="button"
                      variant="primary"
                      onClick={() => {
                        setScheduleInDays(7);
                        setConfirmMode("scheduled");
                      }}
                    >
                      <CalendarRange size={15} aria-hidden="true" />
                      {t.schedule}
                    </FsButton>
                    <FsButton type="button" variant="ghost" onClick={() => setConfirmMode("published")}>
                      <Send size={15} aria-hidden="true" />
                      {t.publish}
                    </FsButton>
                  </>
                )}
                {status === "scheduled" && (
                  <FsButton type="button" variant="primary" onClick={() => setConfirmMode("published")}>
                    <Send size={15} aria-hidden="true" />
                    {t.publishNow}
                  </FsButton>
                )}
                {(status === "in_review" || status === "scheduled" || status === "published") && (
                  <FsButton type="button" variant="subtle" onClick={() => setStatus(article.id, "draft")}>
                    {t.moveToDraft}
                  </FsButton>
                )}
              </div>
            </div>
          </FsPanel>
        </div>
      </div>

      {/* Live reader preview */}
      <div data-preview="true" data-preview-title={title} className="lg:sticky lg:top-6 lg:self-start">
        <FsPanel>
          <FsPanelHeader
            title={t.previewTitle}
            action={<Eye size={16} aria-hidden="true" className="text-[var(--fs-secondary)]" />}
          />
          <div className="border-t border-[var(--fs-border)] px-5 py-5">
            <FsLabel>{collection?.name[locale]}</FsLabel>
            <h3 className="mt-2.5 font-serif text-2xl font-semibold leading-tight tracking-tight text-[var(--fs-ink)]">
              {title.trim() ? title : t.untitled}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--fs-secondary)]">{summary}</p>
            {author && (
              <div className="mt-4 flex items-center gap-2.5">
                <FsAvatar initials={author.initials} hue={author.hue} size={30} />
                <div>
                  <p className="text-sm font-medium text-[var(--fs-ink)]">{author.name}</p>
                  <p className="text-xs text-[var(--fs-secondary)]">{author.role}</p>
                </div>
              </div>
            )}
            <div className="mt-5 flex flex-col gap-4 border-t border-[var(--fs-border)] pt-5">
              {paragraphs.length > 0 ? (
                paragraphs.map(
                  (paragraph, i) =>
                    paragraph.trim() && (
                      <p
                        key={i}
                        className="font-serif text-[15px] leading-[1.85] text-[var(--fs-ink)]"
                      >
                        {paragraph}
                      </p>
                    )
                )
              ) : (
                <p className="text-sm leading-relaxed text-[var(--fs-secondary)]">{t.noBody}</p>
              )}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[var(--fs-border)] pt-4 text-xs leading-relaxed text-[var(--fs-secondary)]">
              <span>{destination?.name[locale]}</span>
              <span>{plannedLabel}</span>
              <span data-wordcount="true">
                {formatWordCount(paragraphs)} {t.words}
              </span>
              <FsChip tone={STATUS_TONE[status]}>{t.statusLabels[status]}</FsChip>
            </div>
          </div>
        </FsPanel>
      </div>

      {/* Confirm gate for the critical simulated moves */}
      <FsDrawer
        open={confirmMode !== null}
        onClose={() => setConfirmMode(null)}
        title={confirmMode === "scheduled" ? t.scheduleDrawerTitle : t.publishDrawerTitle}
        closeLabel={t.close}
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-relaxed text-[var(--fs-secondary)]">
            {confirmMode === "scheduled" ? t.scheduleLeadIn : t.publishLeadIn}
          </p>
          <dl className="flex flex-col divide-y divide-[var(--fs-border)]">
            <FsKV label={t.storyTitle}>{article.title[locale]}</FsKV>
            <FsKV label={t.destinationLabel}>
              {destination?.name[locale]} · {destination?.cadence[locale]}
            </FsKV>
            {confirmMode === "scheduled" ? (
              <div className="flex flex-col gap-1.5 py-3">
                <FsLabel>{t.publishDateLabel}</FsLabel>
                <FsSelect
                  aria-label={t.publishDateLabel}
                  value={scheduleInDays}
                  onChange={(e) => setScheduleInDays(Number(e.target.value))}
                >
                  {SCHEDULE_CHOICES.map((days) => (
                    <option key={days} value={days}>
                      {formatLongDate(dateDaysFromNow(days), locale)} ·{" "}
                      {formatPublishIn(days, locale)}
                    </option>
                  ))}
                </FsSelect>
              </div>
            ) : (
              <FsKV label={t.dateLabel}>{plannedLabel}</FsKV>
            )}
          </dl>
          <div className="flex flex-wrap gap-2">
            <FsButton type="button" variant="primary" onClick={onConfirm}>
              {confirmMode === "scheduled" ? t.confirmSchedule : t.confirmPublish}
            </FsButton>
            <FsButton type="button" variant="ghost" onClick={() => setConfirmMode(null)}>
              {t.cancel}
            </FsButton>
          </div>
        </div>
      </FsDrawer>
    </div>
  );
}
