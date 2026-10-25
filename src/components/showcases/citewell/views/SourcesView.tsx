"use client";

import { useMemo, useState } from "react";
import { FileSearch, Search } from "lucide-react";
import { useCitewell } from "@/lib/showcases/citewell/store";
import { dateDaysAgo, formatLongDate, formatVersion } from "@/lib/showcases/citewell/format";
import { CwChip, CwDrawer, CwInput, CwKV, CwPanel, CwPanelHeader, CwSelect } from "../primitives";

/**
 * View 2 — Source Library (Wave 2C handoff §2C): the five fictional internal
 * documents that back every demo answer, with versions, categories, owners and
 * excerpts. Deterministic client-side category filter + title search; opening
 * a document shows its full section list in a drawer.
 */

interface SourcesCopy {
  title: string;
  subtitle: string;
  documentsTitle: string;
  searchAria: string;
  searchPlaceholder: string;
  categoryAria: string;
  allCategories: string;
  resultCount: string;
  empty: string;
  versionLabel: string;
  categoryLabel: string;
  updatedLabel: string;
  ownerLabel: string;
  close: string;
}

const COPY: Record<"en" | "vi", SourcesCopy> = {
  en: {
    title: "Source Library",
    subtitle:
      "Five fictional internal documents back the demo answers. Open a document to read every section and excerpt.",
    documentsTitle: "Documents",
    searchAria: "Search sources",
    searchPlaceholder: "Search by document title…",
    categoryAria: "Category",
    allCategories: "All categories",
    resultCount: "documents",
    empty: "No documents match your filters.",
    versionLabel: "Version",
    categoryLabel: "Category",
    updatedLabel: "Updated",
    ownerLabel: "Owner",
    close: "Close",
  },
  vi: {
    title: "Thư viện nguồn",
    subtitle:
      "Năm tài liệu nội bộ giả lập là nguồn cho các câu trả lời mẫu. Mở một tài liệu để đọc toàn bộ các mục và đoạn trích.",
    documentsTitle: "Tài liệu",
    searchAria: "Tìm kiếm nguồn",
    searchPlaceholder: "Tìm theo tên tài liệu…",
    categoryAria: "Phân loại",
    allCategories: "Tất cả phân loại",
    resultCount: "tài liệu",
    empty: "Không có tài liệu nào khớp bộ lọc.",
    versionLabel: "Phiên bản",
    categoryLabel: "Phân loại",
    updatedLabel: "Cập nhật",
    ownerLabel: "Đơn vị phụ trách",
    close: "Đóng",
  },
};

export function SourcesView({ locale }: { locale: "en" | "vi" }) {
  const t = COPY[locale];
  const { state, docById } = useCitewell();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

  /** Distinct categories in corpus order; value keys on the stable EN string. */
  const categories = useMemo(() => {
    const out: { value: string; label: string }[] = [];
    for (const doc of state.docs) {
      if (!out.some((c) => c.value === doc.category.en)) {
        out.push({ value: doc.category.en, label: doc.category[locale] });
      }
    }
    return out;
  }, [state.docs, locale]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return state.docs.filter((doc) => {
      if (category !== "all" && doc.category.en !== category) return false;
      if (!q) return true;
      return doc.title[locale].toLowerCase().includes(q);
    });
  }, [state.docs, query, category, locale]);

  const selected = selectedDocId ? docById(selectedDocId) : undefined;

  const sectionsCountLabel = (n: number) =>
    locale === "vi" ? `${n} mục` : n === 1 ? "1 section" : `${n} sections`;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-serif text-xl font-semibold tracking-tight">{t.title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-[var(--cw-secondary)]">{t.subtitle}</p>
      </div>

      <CwPanel>
        <CwPanelHeader
          title={t.documentsTitle}
          action={
            <FileSearch
              size={16}
              strokeWidth={1.75}
              aria-hidden="true"
              className="text-[var(--cw-secondary)]"
            />
          }
        />

        {/* Search + category filter */}
        <div className="flex flex-wrap items-center gap-2 border-t border-[var(--cw-border)] px-4 py-3">
          <div className="relative min-w-[220px] flex-1">
            <Search
              size={14}
              strokeWidth={1.75}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--cw-secondary)]"
            />
            <CwInput
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchAria}
              className="pl-9"
            />
          </div>
          <CwSelect
            aria-label={t.categoryAria}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="min-w-[11rem]"
          >
            <option value="all">{t.allCategories}</option>
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </CwSelect>
          <span className="ml-auto whitespace-nowrap text-xs tabular-nums text-[var(--cw-secondary)]">
            {rows.length} / {state.docs.length} {t.resultCount}
          </span>
        </div>

        {/* Document rows */}
        <div className="divide-y divide-[var(--cw-border)] border-t border-[var(--cw-border)]">
          {rows.map((doc) => (
            <button
              key={doc.id}
              type="button"
              data-doc-id={doc.id}
              onClick={() => setSelectedDocId(doc.id)}
              className="flex w-full flex-col items-start gap-2 px-5 py-4 text-left transition-colors hover:bg-[var(--cw-accent-soft)]/50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--cw-accent)]"
            >
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-[var(--cw-ink)]">
                  {doc.title[locale]}
                </span>
                <CwChip tone="neutral">v{doc.version}</CwChip>
                <CwChip tone="muted">{doc.category[locale]}</CwChip>
              </span>
              <span className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--cw-secondary)]">
                <span>{formatVersion(doc.updatedDaysAgo, locale)}</span>
                <span>{doc.owner[locale]}</span>
                <span>{sectionsCountLabel(doc.sections.length)}</span>
              </span>
              <span className="text-sm leading-relaxed text-[var(--cw-secondary)]">
                {doc.sections[0]?.excerpt[locale]}
              </span>
            </button>
          ))}
          {rows.length === 0 && (
            <p className="px-5 py-10 text-center text-sm text-[var(--cw-secondary)]">{t.empty}</p>
          )}
        </div>
      </CwPanel>

      {/* Document detail drawer */}
      <CwDrawer
        open={selected !== undefined}
        onClose={() => setSelectedDocId(null)}
        title={selected ? selected.title[locale] : ""}
        closeLabel={t.close}
      >
        {selected && (
          <div className="flex flex-col gap-4">
            <dl className="flex flex-col divide-y divide-[var(--cw-border)]">
              <CwKV label={t.versionLabel}>v{selected.version}</CwKV>
              <CwKV label={t.categoryLabel}>{selected.category[locale]}</CwKV>
              <CwKV label={t.updatedLabel}>
                {formatLongDate(dateDaysAgo(selected.updatedDaysAgo), locale)}
              </CwKV>
              <CwKV label={t.ownerLabel}>{selected.owner[locale]}</CwKV>
            </dl>
            <div className="flex flex-col gap-3">
              {selected.sections.map((section) => (
                <div
                  key={section.id}
                  data-section-id={section.id}
                  className="flex flex-col gap-1.5 rounded-md border border-[var(--cw-border)] bg-[var(--cw-canvas)] px-4 py-3"
                >
                  <h3 className="text-sm font-semibold text-[var(--cw-ink)]">
                    {section.heading[locale]}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--cw-secondary)]">
                    {section.excerpt[locale]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CwDrawer>
    </div>
  );
}
