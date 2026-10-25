"use client";

import { useState, type ReactNode } from "react";
import { CalendarRange, PenLine, Send } from "lucide-react";
import { cn } from "@/lib/cn";
import { articlePublishInDays, articleStatus, useForma } from "@/lib/showcases/forma/store";
import { dateDaysFromNow, formatLongDate, formatPublishIn } from "@/lib/showcases/forma/format";
import { FORMA_NOW } from "@/lib/showcases/forma/types";
import type { Article, ArticleStatus, DemoLocale } from "@/lib/showcases/forma/types";
import {
  FsAvatar,
  FsButton,
  FsChip,
  FsDrawer,
  FsKV,
  FsLabel,
  FsPanel,
  FsSelect,
  type FsChipTone,
} from "../primitives";

/**
 * View 3 — Publishing Calendar (handoff §2B). Editorial production schedule
 * over the shared store: stories sorted by publish offset and grouped into
 * scheduled upcoming, in-production and recently published. Status changes
 * run through the store `set-status` action; schedule/publish transitions
 * confirm through a drawer (clearly simulated), moves back to draft or
 * review apply instantly. Every date derives from the fixed FORMA_NOW clock.
 */

interface CalendarCopy {
  title: string;
  subtitle: string;
  referenceDate: string;
  statScheduled: string;
  statProduction: string;
  statPublished: string;
  groupScheduled: string;
  groupProduction: string;
  groupPublished: string;
  emptyGroup: string;
  statusLabels: Record<ArticleStatus, string>;
  changeStatus: string;
  overdue: string;
  scheduleTitle: string;
  publishTitle: string;
  closeConfirm: string;
  cancel: string;
  confirmScheduling: string;
  confirmPublishing: string;
  scheduleLeadIn: string;
  publishLeadIn: string;
  kvStory: string;
  kvDate: string;
  kvDestination: string;
}

const COPY: Record<DemoLocale, CalendarCopy> = {
  en: {
    title: "Publishing Calendar",
    subtitle: "Upcoming stories, scheduled dates and status changes.",
    referenceDate: "Reference date",
    statScheduled: "Scheduled",
    statProduction: "In production",
    statPublished: "Published",
    groupScheduled: "Scheduled upcoming",
    groupProduction: "Drafts and review",
    groupPublished: "Recently published",
    emptyGroup: "No stories in this stage.",
    statusLabels: {
      draft: "Draft",
      in_review: "In review",
      scheduled: "Scheduled",
      published: "Published",
    },
    changeStatus: "Change status",
    overdue: "Overdue",
    scheduleTitle: "Schedule story",
    publishTitle: "Publish story",
    closeConfirm: "Close",
    cancel: "Cancel",
    confirmScheduling: "Confirm scheduling",
    confirmPublishing: "Confirm publishing",
    scheduleLeadIn: "Confirm to schedule this story for publication.",
    publishLeadIn: "Confirm to mark this story as published.",
    kvStory: "Story",
    kvDate: "Publication date",
    kvDestination: "Destination",
  },
  vi: {
    title: "Lịch xuất bản",
    subtitle: "Các bài viết sắp xuất bản, ngày định lịch và thay đổi trạng thái.",
    referenceDate: "Ngày tham chiếu",
    statScheduled: "Đã định lịch",
    statProduction: "Đang thực hiện",
    statPublished: "Đã xuất bản",
    groupScheduled: "Sắp xuất bản",
    groupProduction: "Bản nháp và duyệt bài",
    groupPublished: "Mới xuất bản",
    emptyGroup: "Chưa có bài viết ở giai đoạn này.",
    statusLabels: {
      draft: "Bản nháp",
      in_review: "Đang duyệt",
      scheduled: "Đã định lịch",
      published: "Đã xuất bản",
    },
    changeStatus: "Đổi trạng thái",
    overdue: "Trễ hạn",
    scheduleTitle: "Định lịch bài viết",
    publishTitle: "Xuất bản bài viết",
    closeConfirm: "Đóng",
    cancel: "Huỷ",
    confirmScheduling: "Xác nhận định lịch",
    confirmPublishing: "Xác nhận xuất bản",
    scheduleLeadIn: "Xác nhận để lên lịch xuất bản bài viết này.",
    publishLeadIn: "Xác nhận để đánh dấu bài viết này đã xuất bản.",
    kvStory: "Bài viết",
    kvDate: "Ngày xuất bản",
    kvDestination: "Kênh xuất bản",
  },
};

const STATUS_ORDER: ArticleStatus[] = ["draft", "in_review", "scheduled", "published"];

const STATUS_TONE: Record<ArticleStatus, FsChipTone> = {
  draft: "neutral",
  in_review: "blue",
  scheduled: "accent",
  published: "green",
};

interface CalendarEntry {
  article: Article;
  status: ArticleStatus;
  publishInDays: number;
}

function StatBlock({
  icon,
  label,
  value,
  countRef = false,
}: {
  icon: ReactNode;
  label: string;
  value: number;
  countRef?: boolean;
}) {
  return (
    <div className="px-3 first:pl-1 sm:px-5">
      <div className="flex items-center gap-1.5 text-[var(--fs-secondary)]">
        {icon}
        <FsLabel>{label}</FsLabel>
      </div>
      <p
        data-upcoming-count={countRef ? "true" : undefined}
        className="mt-1 font-serif text-2xl font-semibold tabular-nums text-[var(--fs-ink)]"
      >
        {value}
      </p>
    </div>
  );
}

function StoryRow({
  entry,
  locale,
  t,
  onChangeStatus,
}: {
  entry: CalendarEntry;
  locale: DemoLocale;
  t: CalendarCopy;
  onChangeStatus: (next: ArticleStatus) => void;
}) {
  const { staffById, collectionById, destinationById } = useForma();
  const author = staffById(entry.article.authorId);
  const collection = collectionById(entry.article.collectionId);
  const destination = destinationById(entry.article.destinationId);
  const inProduction = entry.status === "draft" || entry.status === "in_review";
  const overdue = entry.status === "scheduled" && entry.publishInDays < 0;
  const credit = [collection?.name[locale], destination?.name[locale], author?.name]
    .filter((part) => Boolean(part))
    .join(", ");

  return (
    <li
      data-article-id={entry.article.id}
      className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:gap-5 sm:px-5"
    >
      <div className="w-32 shrink-0">
        <p
          className={cn(
            "font-serif text-base font-semibold leading-snug",
            inProduction ? "text-[var(--fs-secondary)]" : "text-[var(--fs-ink)]"
          )}
        >
          {formatLongDate(dateDaysFromNow(entry.publishInDays), locale)}
        </p>
        <p
          className={cn(
            "mt-0.5 text-xs",
            overdue ? "font-medium text-[var(--fs-warn-text)]" : "text-[var(--fs-secondary)]"
          )}
        >
          {formatPublishIn(entry.publishInDays, locale)}
        </p>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
          {author && <FsAvatar initials={author.initials} hue={author.hue} />}
          <p className="font-serif text-[15px] font-medium leading-snug text-[var(--fs-ink)]">
            {entry.article.title[locale]}
          </p>
          <FsChip tone={STATUS_TONE[entry.status]}>{t.statusLabels[entry.status]}</FsChip>
          {overdue && <FsChip tone="amber">{t.overdue}</FsChip>}
        </div>
        <p className="mt-1 text-sm leading-relaxed text-[var(--fs-secondary)]">{credit}</p>
      </div>

      <div className="shrink-0 sm:w-44">
        <FsSelect
          aria-label={t.changeStatus}
          value={entry.status}
          onChange={(event) => onChangeStatus(event.target.value as ArticleStatus)}
          className="w-full"
        >
          {STATUS_ORDER.map((status) => (
            <option key={status} value={status}>
              {t.statusLabels[status]}
            </option>
          ))}
        </FsSelect>
      </div>
    </li>
  );
}

function StoryGroup({
  label,
  entries,
  locale,
  t,
  emptyText,
  onChangeStatus,
}: {
  label: string;
  entries: CalendarEntry[];
  locale: DemoLocale;
  t: CalendarCopy;
  emptyText: string;
  onChangeStatus: (articleId: string, current: ArticleStatus, next: ArticleStatus) => void;
}) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-3 px-1">
        <FsLabel>{label}</FsLabel>
        <span className="text-xs tabular-nums text-[var(--fs-secondary)]">{entries.length}</span>
      </div>
      <FsPanel>
        <ul className="divide-y divide-[var(--fs-border)]">
          {entries.map((entry) => (
            <StoryRow
              key={entry.article.id}
              entry={entry}
              locale={locale}
              t={t}
              onChangeStatus={(next) => onChangeStatus(entry.article.id, entry.status, next)}
            />
          ))}
          {entries.length === 0 && (
            <li className="px-5 py-6 text-center text-sm text-[var(--fs-secondary)]">
              {emptyText}
            </li>
          )}
        </ul>
      </FsPanel>
    </section>
  );
}

export function CalendarView({ locale }: { locale: "en" | "vi" }) {
  const t = COPY[locale];
  const { state, setStatus, destinationById } = useForma();
  const [pending, setPending] = useState<{
    articleId: string;
    status: "scheduled" | "published";
  } | null>(null);

  const entries: CalendarEntry[] = state.articles.map((article) => ({
    article,
    status: articleStatus(state, article),
    publishInDays: articlePublishInDays(state, article),
  }));
  const byOffset = (a: CalendarEntry, b: CalendarEntry) => a.publishInDays - b.publishInDays;
  const scheduled = entries.filter((entry) => entry.status === "scheduled").sort(byOffset);
  const production = entries
    .filter((entry) => entry.status === "draft" || entry.status === "in_review")
    .sort(byOffset);
  const published = entries.filter((entry) => entry.status === "published").sort(byOffset);
  const upcomingCount = scheduled.filter((entry) => entry.publishInDays > 0).length;

  const onChangeStatus = (articleId: string, current: ArticleStatus, next: ArticleStatus) => {
    if (next === current) return;
    // Publish/schedule are critical transitions: they confirm through a
    // drawer. Moves back to draft or review apply instantly.
    if (next === "scheduled" || next === "published") {
      setPending({ articleId, status: next });
      return;
    }
    setStatus(articleId, next);
  };

  const pendingEntry = pending
    ? entries.find((entry) => entry.article.id === pending.articleId)
    : undefined;

  const onConfirmStatus = () => {
    if (pending && pendingEntry) {
      setStatus(pending.articleId, pending.status);
    }
    setPending(null);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Heading with the fixed reference date */}
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div>
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-[var(--fs-ink)]">
              {t.title}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-[var(--fs-secondary)]">{t.subtitle}</p>
          </div>
          <div>
            <FsLabel>{t.referenceDate}</FsLabel>
            <p className="mt-0.5 font-serif text-lg font-semibold text-[var(--fs-ink)]">
              {formatLongDate(FORMA_NOW, locale)}
            </p>
          </div>
        </div>
      </div>

      {/* Schedule counts, derived from the shared store */}
      <div className="grid grid-cols-3 divide-x divide-[var(--fs-border)] border-y border-[var(--fs-border)] py-4">
        <StatBlock
          icon={<CalendarRange size={13} strokeWidth={1.75} aria-hidden="true" />}
          label={t.statScheduled}
          value={upcomingCount}
          countRef
        />
        <StatBlock
          icon={<PenLine size={13} strokeWidth={1.75} aria-hidden="true" />}
          label={t.statProduction}
          value={production.length}
        />
        <StatBlock
          icon={<Send size={13} strokeWidth={1.75} aria-hidden="true" />}
          label={t.statPublished}
          value={published.length}
        />
      </div>

      <StoryGroup
        label={t.groupScheduled}
        entries={scheduled}
        locale={locale}
        t={t}
        emptyText={t.emptyGroup}
        onChangeStatus={onChangeStatus}
      />
      <StoryGroup
        label={t.groupProduction}
        entries={production}
        locale={locale}
        t={t}
        emptyText={t.emptyGroup}
        onChangeStatus={onChangeStatus}
      />
      <StoryGroup
        label={t.groupPublished}
        entries={published}
        locale={locale}
        t={t}
        emptyText={t.emptyGroup}
        onChangeStatus={onChangeStatus}
      />

      {/* Confirmation drawer for the critical schedule/publish transitions */}
      <FsDrawer
        open={Boolean(pending && pendingEntry)}
        onClose={() => setPending(null)}
        title={pending?.status === "published" ? t.publishTitle : t.scheduleTitle}
        closeLabel={t.closeConfirm}
      >
        {pending && pendingEntry && (
          <div className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-[var(--fs-secondary)]">
              {pending.status === "published" ? t.publishLeadIn : t.scheduleLeadIn}
            </p>
            <dl className="flex flex-col divide-y divide-[var(--fs-border)]">
              <FsKV label={t.kvStory}>{pendingEntry.article.title[locale]}</FsKV>
              <FsKV label={t.kvDate}>
                {formatLongDate(dateDaysFromNow(pendingEntry.publishInDays), locale)}
                <span className="block text-xs text-[var(--fs-secondary)]">
                  {formatPublishIn(pendingEntry.publishInDays, locale)}
                </span>
              </FsKV>
              <FsKV label={t.kvDestination}>
                {destinationById(pendingEntry.article.destinationId)?.name[locale] ??
                  pendingEntry.article.destinationId}
              </FsKV>
            </dl>
            <div className="flex flex-wrap gap-2">
              <FsButton type="button" variant="primary" onClick={onConfirmStatus}>
                {pending.status === "published" ? t.confirmPublishing : t.confirmScheduling}
              </FsButton>
              <FsButton type="button" variant="ghost" onClick={() => setPending(null)}>
                {t.cancel}
              </FsButton>
            </div>
          </div>
        )}
      </FsDrawer>
    </div>
  );
}
