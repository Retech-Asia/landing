"use client";

import { BookOpen, Newspaper, PenLine } from "lucide-react";
import { articleStatus, useForma } from "@/lib/showcases/forma/store";
import { formatDaysAgo } from "@/lib/showcases/forma/format";
import type { Article, ArticleStatus } from "@/lib/showcases/forma/types";
import {
  FsAvatar,
  FsChip,
  type FsChipTone,
  FsLabel,
  FsPanel,
  FsPanelHeader,
} from "../primitives";

/**
 * View 1 — Editorial Desk (Wave 2B handoff): content status overview,
 * featured drafts and assignments. Read-only overview: every figure derives
 * from the shared store (simulated status overrides included), dates come
 * from the fixed demo clock, and status moves happen in the Content Editor.
 */

const STATUS_ORDER: ArticleStatus[] = ["draft", "in_review", "scheduled", "published"];

const STATUS_TONE: Record<ArticleStatus, FsChipTone> = {
  draft: "neutral",
  in_review: "amber",
  scheduled: "blue",
  published: "green",
};

interface DeskCopy {
  title: string;
  subtitle: string;
  statusTitle: string;
  stories: string;
  featuredTitle: string;
  featuredNote: string;
  featuredEmpty: string;
  assignmentsTitle: string;
  assignmentsNote: string;
  updated: string;
  statusLabels: Record<ArticleStatus, string>;
  statusNotes: Record<ArticleStatus, string>;
}

const COPY: Record<"en" | "vi", DeskCopy> = {
  en: {
    title: "Editorial Desk",
    subtitle: "Track where every story stands, which drafts are moving, and who is writing.",
    statusTitle: "Content status",
    stories: "stories",
    featuredTitle: "Featured drafts",
    featuredNote: "Review queue and drafts, most recently updated first.",
    featuredEmpty: "No open drafts. Every story is scheduled or published.",
    assignmentsTitle: "Assignments",
    assignmentsNote: "Writer, collection and destination for every story in the issue.",
    updated: "Updated",
    statusLabels: {
      draft: "Draft",
      in_review: "In review",
      scheduled: "Scheduled",
      published: "Published",
    },
    statusNotes: {
      draft: "In the writing phase.",
      in_review: "With the review desk.",
      scheduled: "On the publishing calendar.",
      published: "Live for readers.",
    },
  },
  vi: {
    title: "Bàn biên tập",
    subtitle: "Theo dõi tiến độ từng bài viết, bản nháp đang hoàn thiện và phân công biên soạn.",
    statusTitle: "Tình trạng nội dung",
    stories: "bài viết",
    featuredTitle: "Bản nháp nổi bật",
    featuredNote: "Hàng chờ duyệt và bản nháp, bài cập nhật gần nhất đứng trước.",
    featuredEmpty: "Không còn bản nháp nào. Mọi bài viết đã được định lịch hoặc xuất bản.",
    assignmentsTitle: "Phân công",
    assignmentsNote: "Tác giả, bộ sưu tập và nơi xuất bản của từng bài viết.",
    updated: "Cập nhật",
    statusLabels: {
      draft: "Bản nháp",
      in_review: "Đang duyệt",
      scheduled: "Đã định lịch",
      published: "Đã xuất bản",
    },
    statusNotes: {
      draft: "Đang trong giai đoạn soạn thảo.",
      in_review: "Đang ở bàn duyệt bài.",
      scheduled: "Đã có trên lịch xuất bản.",
      published: "Đã phát hành tới bạn đọc.",
    },
  },
};

function AuthorLine({
  article,
  staffById,
}: {
  article: Article;
  staffById: ReturnType<typeof useForma>["staffById"];
}) {
  const author = staffById(article.authorId);
  if (!author) return null;
  return (
    <span className="flex items-center gap-2">
      <FsAvatar initials={author.initials} hue={author.hue} />
      <span>
        {author.name} · {author.role}
      </span>
    </span>
  );
}

export function DeskView({ locale }: { locale: "en" | "vi" }) {
  const t = COPY[locale];
  const { state, staffById, collectionById, destinationById } = useForma();

  // Status counts honor simulated overrides from the editor and calendar.
  const counts: Record<ArticleStatus, number> = {
    draft: 0,
    in_review: 0,
    scheduled: 0,
    published: 0,
  };
  for (const article of state.articles) {
    counts[articleStatus(state, article)] += 1;
  }

  // Featured drafts: review queue plus open drafts, freshest first.
  const featured = state.articles
    .filter((a) => {
      const status = articleStatus(state, a);
      return status === "draft" || status === "in_review";
    })
    .sort((a, b) => a.updatedDaysAgo - b.updatedDaysAgo);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-serif text-xl font-semibold tracking-tight">{t.title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-[var(--fs-secondary)]">{t.subtitle}</p>
      </div>

      {/* Content status overview — one editorial card per review stage */}
      <div>
        <FsLabel className="mb-2.5">{t.statusTitle}</FsLabel>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {STATUS_ORDER.map((status) => (
            <FsPanel key={status} className="px-4 py-4">
              <FsChip tone={STATUS_TONE[status]}>{t.statusLabels[status]}</FsChip>
              <p className="mt-2.5 font-serif text-3xl font-semibold tabular-nums text-[var(--fs-ink)]">
                {counts[status]}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[var(--fs-secondary)]">
                {t.statusNotes[status]}
              </p>
            </FsPanel>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Featured drafts — stories still moving toward publication */}
        <FsPanel>
          <FsPanelHeader
            title={t.featuredTitle}
            action={<PenLine size={16} aria-hidden="true" className="text-[var(--fs-secondary)]" />}
          />
          <p className="px-5 pb-3 text-xs leading-relaxed text-[var(--fs-secondary)]">
            {t.featuredNote}
          </p>
          <ul className="divide-y divide-[var(--fs-border)] border-t border-[var(--fs-border)]">
            {featured.map((article) => {
              const status = articleStatus(state, article);
              const collection = collectionById(article.collectionId);
              const destination = destinationById(article.destinationId);
              return (
                <li key={article.id} data-article-id={article.id} className="px-5 py-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="font-serif text-lg font-semibold leading-snug tracking-tight text-[var(--fs-ink)]">
                      {article.title[locale]}
                    </h3>
                    <FsChip tone={STATUS_TONE[status]}>{t.statusLabels[status]}</FsChip>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--fs-secondary)]">
                    {article.summary[locale]}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs leading-relaxed text-[var(--fs-secondary)]">
                    <AuthorLine article={article} staffById={staffById} />
                    {collection && <span>{collection.name[locale]}</span>}
                    {destination && <span>{destination.name[locale]}</span>}
                    <span>
                      {t.updated} {formatDaysAgo(article.updatedDaysAgo, locale)}
                    </span>
                  </div>
                </li>
              );
            })}
            {featured.length === 0 && (
              <li className="px-5 py-8 text-center text-sm leading-relaxed text-[var(--fs-secondary)]">
                {t.featuredEmpty}
              </li>
            )}
          </ul>
        </FsPanel>

        {/* Assignments — writer, collection and destination per story */}
        <FsPanel>
          <FsPanelHeader
            title={t.assignmentsTitle}
            action={<BookOpen size={16} aria-hidden="true" className="text-[var(--fs-secondary)]" />}
          />
          <p className="px-5 pb-3 text-xs leading-relaxed text-[var(--fs-secondary)]">
            {t.assignmentsNote}
          </p>
          <ul className="divide-y divide-[var(--fs-border)] border-t border-[var(--fs-border)]">
            {state.articles.map((article) => {
              const author = staffById(article.authorId);
              const collection = collectionById(article.collectionId);
              const destination = destinationById(article.destinationId);
              const status = articleStatus(state, article);
              return (
                <li
                  key={article.id}
                  data-article-id={article.id}
                  className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3.5"
                >
                  <span className="flex min-w-0 items-center gap-2.5 basis-40">
                    {author && <FsAvatar initials={author.initials} hue={author.hue} size={32} />}
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-[var(--fs-ink)]">
                        {author?.name ?? article.authorId}
                      </span>
                      <span className="block text-xs text-[var(--fs-secondary)]">
                        {author?.role}
                      </span>
                    </span>
                  </span>
                  <span className="min-w-0 flex-1 basis-52">
                    <span className="block font-serif text-[15px] font-semibold leading-snug text-[var(--fs-ink)]">
                      {article.title[locale]}
                    </span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-[var(--fs-secondary)]">
                      {collection?.name[locale]} · {destination?.name[locale]} ·{" "}
                      {t.updated.toLowerCase()} {formatDaysAgo(article.updatedDaysAgo, locale)}
                    </span>
                  </span>
                  <FsChip tone={STATUS_TONE[status]}>{t.statusLabels[status]}</FsChip>
                </li>
              );
            })}
          </ul>
        </FsPanel>
      </div>

      <p className="flex items-center gap-2 text-xs text-[var(--fs-secondary)]">
        <Newspaper size={14} aria-hidden="true" />
        {state.articles.length} {t.stories}
      </p>
    </div>
  );
}
