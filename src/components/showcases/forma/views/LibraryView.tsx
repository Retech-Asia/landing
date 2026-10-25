"use client";

import { useId, useState, type CSSProperties } from "react";
import { Image as ImageIcon } from "lucide-react";
import { articlePublishInDays, articleStatus, useForma } from "@/lib/showcases/forma/store";
import {
  dateDaysFromNow,
  formatDaysAgo,
  formatLongDate,
  formatPublishIn,
} from "@/lib/showcases/forma/format";
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
 * View 4 — Asset Library (handoff §2B). A covers wall of custom-designed
 * color-and-type editorial cover cards (no photography by design): hue
 * gradients derived from each collection, filterable by collection and
 * effective status. Opening a cover shows asset details in a drawer. All
 * figures derive from the shared store, so simulated status moves in other
 * views recolor and refilter the wall automatically.
 */

interface LibraryCopy {
  title: string;
  subtitle: string;
  allCollections: string;
  allStatuses: string;
  coversCount: string;
  empty: string;
  clearFilters: string;
  openAsset: string;
  close: string;
  kvCollection: string;
  kvStatus: string;
  kvDestination: string;
  kvAuthor: string;
  kvUpdated: string;
  kvPublishDate: string;
  kvSummary: string;
  statusLabels: Record<ArticleStatus, string>;
}

const COPY: Record<DemoLocale, LibraryCopy> = {
  en: {
    title: "Asset Library",
    subtitle:
      "Custom editorial covers for every story: filter by collection or status and open an asset for details.",
    allCollections: "All collections",
    allStatuses: "All statuses",
    coversCount: "covers",
    empty: "No covers match the current filters.",
    clearFilters: "Clear filters",
    openAsset: "Open asset details",
    close: "Close",
    kvCollection: "Collection",
    kvStatus: "Status",
    kvDestination: "Destination",
    kvAuthor: "Author",
    kvUpdated: "Updated",
    kvPublishDate: "Publication date",
    kvSummary: "Summary",
    statusLabels: {
      draft: "Draft",
      in_review: "In review",
      scheduled: "Scheduled",
      published: "Published",
    },
  },
  vi: {
    title: "Thư viện tài nguyên",
    subtitle:
      "Bìa biên tập thiết kế riêng cho từng bài viết: lọc theo bộ sưu tập hoặc trạng thái và mở tài nguyên để xem chi tiết.",
    allCollections: "Tất cả bộ sưu tập",
    allStatuses: "Tất cả trạng thái",
    coversCount: "tấm bìa",
    empty: "Không có tấm bìa nào khớp bộ lọc hiện tại.",
    clearFilters: "Xoá bộ lọc",
    openAsset: "Mở chi tiết tài nguyên",
    close: "Đóng",
    kvCollection: "Bộ sưu tập",
    kvStatus: "Trạng thái",
    kvDestination: "Kênh xuất bản",
    kvAuthor: "Tác giả",
    kvUpdated: "Cập nhật",
    kvPublishDate: "Ngày xuất bản",
    kvSummary: "Tóm tắt",
    statusLabels: {
      draft: "Bản nháp",
      in_review: "Đang duyệt",
      scheduled: "Đã định lịch",
      published: "Đã xuất bản",
    },
  },
};

const STATUS_ORDER: ArticleStatus[] = ["draft", "in_review", "scheduled", "published"];

const STATUS_TONE: Record<ArticleStatus, FsChipTone> = {
  draft: "neutral",
  in_review: "blue",
  scheduled: "accent",
  published: "green",
};

interface CoverMeta {
  hue: number;
  collectionName: string;
  authorName: string;
  authorInitials: string;
}

/** Deep hue tint shared by cover cards and the drawer banner (pure color + type, no photography). */
function coverStyle(hue: number): CSSProperties {
  return {
    background: `linear-gradient(165deg, hsl(${hue} 32% 27%) 0%, hsl(${hue} 36% 16%) 100%)`,
  };
}

function CoverCard({
  article,
  meta,
  status,
  locale,
  t,
  onOpen,
}: {
  article: Article;
  meta: CoverMeta;
  status: ArticleStatus;
  locale: DemoLocale;
  t: LibraryCopy;
  onOpen: () => void;
}) {
  const { hue } = meta;
  return (
    <button
      type="button"
      data-article-id={article.id}
      onClick={onOpen}
      aria-label={`${t.openAsset}: ${article.title[locale]}`}
      className="flex aspect-[3/4] flex-col rounded-xl text-left shadow-[0_1px_3px_rgba(36,39,53,0.10)] transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fs-accent)]"
      style={coverStyle(hue)}
    >
      <div className="flex items-start justify-between gap-2 px-5 pt-5">
        <span
          className="text-[10px] font-semibold uppercase leading-relaxed tracking-[0.18em]"
          style={{ color: `hsl(${hue} 45% 82%)` }}
        >
          {meta.collectionName}
        </span>
        <span
          className="shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest"
          style={{ backgroundColor: `hsl(${hue} 30% 38%)`, color: `hsl(${hue} 30% 96%)` }}
        >
          {t.statusLabels[status]}
        </span>
      </div>
      <div className="mt-auto flex flex-col gap-4 px-5 pb-5">
        <p
          className="font-serif text-xl font-semibold leading-snug"
          style={{ color: `hsl(${hue} 30% 97%)` }}
        >
          {article.title[locale]}
        </p>
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold"
            style={{ borderColor: `hsl(${hue} 30% 62%)`, color: `hsl(${hue} 30% 92%)` }}
          >
            {meta.authorInitials}
          </span>
          <span className="text-xs leading-snug" style={{ color: `hsl(${hue} 25% 86%)` }}>
            {meta.authorName}
          </span>
        </div>
      </div>
    </button>
  );
}

export function LibraryView({ locale }: { locale: "en" | "vi" }) {
  const t = COPY[locale];
  const { state, staffById, collectionById, destinationById } = useForma();
  const [collectionFilter, setCollectionFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const collectionSelectId = useId();
  const statusSelectId = useId();

  // Status filtering uses the effective status, so simulated moves in other
  // views are reflected here.
  const filtered = state.articles.filter((article) => {
    if (collectionFilter !== "all" && article.collectionId !== collectionFilter) return false;
    if (statusFilter !== "all" && articleStatus(state, article) !== statusFilter) return false;
    return true;
  });

  const metaOf = (article: Article): CoverMeta => {
    const collection = collectionById(article.collectionId);
    const author = staffById(article.authorId);
    return {
      hue: collection?.hue ?? 258,
      collectionName: collection?.name[locale] ?? article.collectionId,
      authorName: author?.name ?? "",
      authorInitials: author?.initials ?? "",
    };
  };

  const selected = selectedId ? state.articles.find((a) => a.id === selectedId) : undefined;
  const selectedStatus = selected ? articleStatus(state, selected) : "draft";
  const selectedPublishIn = selected ? articlePublishInDays(state, selected) : 0;
  const selectedCollection = selected ? collectionById(selected.collectionId) : undefined;
  const selectedDestination = selected ? destinationById(selected.destinationId) : undefined;
  const selectedAuthor = selected ? staffById(selected.authorId) : undefined;
  const selectedHue = selectedCollection?.hue ?? 258;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-[var(--fs-ink)]">
          {t.title}
        </h2>
        <p className="text-sm leading-relaxed text-[var(--fs-secondary)]">{t.subtitle}</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1">
            <label
              htmlFor={collectionSelectId}
              className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--fs-secondary)]"
            >
              {t.kvCollection}
            </label>
            <FsSelect
              id={collectionSelectId}
              aria-label={t.kvCollection}
              value={collectionFilter}
              onChange={(event) => setCollectionFilter(event.target.value)}
              className="min-w-[11rem]"
            >
              <option value="all">{t.allCollections}</option>
              {state.collections.map((collection) => (
                <option key={collection.id} value={collection.id}>
                  {collection.name[locale]}
                </option>
              ))}
            </FsSelect>
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor={statusSelectId}
              className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--fs-secondary)]"
            >
              {t.kvStatus}
            </label>
            <FsSelect
              id={statusSelectId}
              aria-label={t.kvStatus}
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="min-w-[11rem]"
            >
              <option value="all">{t.allStatuses}</option>
              {STATUS_ORDER.map((status) => (
                <option key={status} value={status}>
                  {t.statusLabels[status]}
                </option>
              ))}
            </FsSelect>
          </div>
        </div>
        <p className="flex items-center gap-1.5 text-sm tabular-nums text-[var(--fs-secondary)]">
          <ImageIcon size={14} strokeWidth={1.75} aria-hidden="true" />
          {filtered.length} / {state.articles.length} {t.coversCount}
        </p>
      </div>

      {/* Covers wall */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((article) => (
            <CoverCard
              key={article.id}
              article={article}
              meta={metaOf(article)}
              status={articleStatus(state, article)}
              locale={locale}
              t={t}
              onOpen={() => setSelectedId(article.id)}
            />
          ))}
        </div>
      ) : (
        <FsPanel className="flex flex-col items-center gap-4 px-5 py-12 text-center">
          <p className="text-sm text-[var(--fs-secondary)]">{t.empty}</p>
          <FsButton
            type="button"
            variant="ghost"
            onClick={() => {
              setCollectionFilter("all");
              setStatusFilter("all");
            }}
          >
            {t.clearFilters}
          </FsButton>
        </FsPanel>
      )}

      {/* Asset details drawer */}
      <FsDrawer
        open={Boolean(selected)}
        onClose={() => setSelectedId(null)}
        title={selected ? selected.title[locale] : ""}
        closeLabel={t.close}
      >
        {selected && (
          <div className="flex flex-col gap-4">
            <div
              className="flex flex-col justify-between gap-3 rounded-xl px-5 py-4"
              style={coverStyle(selectedHue)}
            >
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: `hsl(${selectedHue} 45% 82%)` }}
              >
                {selectedCollection?.name[locale]}
              </span>
              <p
                className="font-serif text-lg font-semibold leading-snug"
                style={{ color: `hsl(${selectedHue} 30% 97%)` }}
              >
                {selected.title[locale]}
              </p>
            </div>

            <div>
              <FsLabel>{t.kvSummary}</FsLabel>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--fs-ink)]">
                {selected.summary[locale]}
              </p>
            </div>

            <dl className="flex flex-col divide-y divide-[var(--fs-border)]">
              <FsKV label={t.kvCollection}>
                {selectedCollection?.name[locale] ?? selected.collectionId}
              </FsKV>
              <FsKV label={t.kvDestination}>
                {selectedDestination?.name[locale] ?? selected.destinationId}
              </FsKV>
              <FsKV label={t.kvStatus}>
                <FsChip tone={STATUS_TONE[selectedStatus]}>{t.statusLabels[selectedStatus]}</FsChip>
              </FsKV>
              <FsKV label={t.kvAuthor}>
                <span className="flex flex-wrap items-center gap-2">
                  {selectedAuthor && (
                    <FsAvatar initials={selectedAuthor.initials} hue={selectedAuthor.hue} size={24} />
                  )}
                  <span>{selectedAuthor?.name ?? selected.authorId}</span>
                  {selectedAuthor && (
                    <span className="text-xs text-[var(--fs-secondary)]">{selectedAuthor.role}</span>
                  )}
                </span>
              </FsKV>
              <FsKV label={t.kvUpdated}>{formatDaysAgo(selected.updatedDaysAgo, locale)}</FsKV>
              <FsKV label={t.kvPublishDate}>
                {formatLongDate(dateDaysFromNow(selectedPublishIn), locale)}
                <span className="block text-xs text-[var(--fs-secondary)]">
                  {formatPublishIn(selectedPublishIn, locale)}
                </span>
              </FsKV>
            </dl>
          </div>
        )}
      </FsDrawer>
    </div>
  );
}
