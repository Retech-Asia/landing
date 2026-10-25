"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { buildFormaSeed } from "./fixtures";
import type { Article, ArticleDraft, ArticleStatus, DemoLocale, FormaData } from "./types";

/**
 * Shared demo state for the four Forma Studio views. In-memory only: editor
 * edits accumulate as per-locale local drafts, saving records an accurate
 * local draft state, status moves (schedule/publish) are clearly simulated,
 * and every mutation lands in the editorial event history. Reset/reload
 * returns to seed.
 */

export type FormaAction =
  | { type: "edit-draft"; articleId: string; locale: DemoLocale; draft: ArticleDraft }
  | { type: "save-draft"; articleId: string; locale: DemoLocale }
  | { type: "set-status"; articleId: string; status: ArticleStatus; publishInDays?: number }
  | { type: "reset" };

export interface FormaState extends FormaData {
  /** Local (unpublished) edits keyed by `${articleId}:${locale}`. */
  drafts: Record<string, ArticleDraft>;
  /** Locales whose draft has been saved locally, keyed like `drafts`. */
  savedDrafts: Record<string, true>;
  /** Simulated status overrides keyed by article id. */
  statusOverrides: Record<string, { status: ArticleStatus; publishInDays: number }>;
}

let eventCounter = 0;
function nextEventId(): string {
  eventCounter += 1;
  return `ev-local-${eventCounter}`;
}

const draftKey = (articleId: string, locale: DemoLocale) => `${articleId}:${locale}`;

function buildFormaState(): FormaState {
  return { ...buildFormaSeed(), drafts: {}, savedDrafts: {}, statusOverrides: {} };
}

/** Status resolution honors simulated overrides (calendar, desk, editor). */
export function articleStatus(state: FormaState, article: Article): ArticleStatus {
  return state.statusOverrides[article.id]?.status ?? article.status;
}

export function articlePublishInDays(state: FormaState, article: Article): number {
  return state.statusOverrides[article.id]?.publishInDays ?? article.publishInDays;
}

/**
 * What the editor shows for one article + locale: the local draft when one
 * exists, otherwise the seed content. Articles without seed body paragraphs
 * resolve to an empty paragraph list — the editor starts from blank copy.
 */
export function resolveContent(
  state: FormaState,
  article: Article,
  locale: DemoLocale
): Required<ArticleDraft> {
  const draft = state.drafts[draftKey(article.id, locale)];
  if (draft) return { title: draft.title, summary: draft.summary, paragraphs: draft.paragraphs };
  return {
    title: article.title[locale],
    summary: article.summary[locale],
    paragraphs: article.body ? [...article.body[locale]] : [],
  };
}

export function hasSavedDraft(state: FormaState, articleId: string, locale: DemoLocale): boolean {
  return Boolean(state.savedDrafts[draftKey(articleId, locale)]);
}

const STATUS_EVENT: Record<ArticleStatus, { en: string; vi: string }> = {
  draft: { en: "moved back to draft", vi: "chuyển về bản nháp" },
  in_review: { en: "moved into review", vi: "chuyển sang hạng duyệt" },
  scheduled: { en: "scheduled for publication", vi: "được lên lịch xuất bản" },
  published: { en: "marked as published", vi: "đánh dấu đã xuất bản" },
};

function reducer(state: FormaState, action: FormaAction): FormaState {
  switch (action.type) {
    case "edit-draft": {
      return {
        ...state,
        drafts: {
          ...state.drafts,
          [draftKey(action.articleId, action.locale)]: action.draft,
        },
      };
    }
    case "save-draft": {
      const article = state.articles.find((a) => a.id === action.articleId);
      if (!article) return state;
      const key = draftKey(action.articleId, action.locale);
      return {
        ...state,
        savedDrafts: { ...state.savedDrafts, [key]: true },
        events: [
          {
            id: nextEventId(),
            summary: {
              en: `Draft saved locally: ${article.title.en}`,
              vi: `Đã lưu bản nháp cục bộ: ${article.title.vi}`,
            },
            daysAgo: 0,
          },
          ...state.events,
        ],
      };
    }
    case "set-status": {
      const article = state.articles.find((a) => a.id === action.articleId);
      if (!article) return state;
      const publishInDays = action.publishInDays ?? articlePublishInDays(state, article);
      return {
        ...state,
        statusOverrides: {
          ...state.statusOverrides,
          [action.articleId]: { status: action.status, publishInDays },
        },
        events: [
          {
            id: nextEventId(),
            summary: {
              en: `${article.title.en} ${STATUS_EVENT[action.status].en}`,
              vi: `${article.title.vi} ${STATUS_EVENT[action.status].vi}`,
            },
            daysAgo: 0,
          },
          ...state.events,
        ],
      };
    }
    case "reset":
      return buildFormaState();
  }
}

export interface FormaStore {
  state: FormaState;
  editDraft: (articleId: string, locale: DemoLocale, draft: ArticleDraft) => void;
  saveDraft: (articleId: string, locale: DemoLocale) => void;
  setStatus: (articleId: string, status: ArticleStatus, publishInDays?: number) => void;
  reset: () => void;
  staffById: (id: string) => FormaState["staff"][number] | undefined;
  collectionById: (id: string) => FormaState["collections"][number] | undefined;
  destinationById: (id: string) => FormaState["destinations"][number] | undefined;
  articleById: (id: string) => Article | undefined;
}

const FormaContext = createContext<FormaStore | null>(null);

export function FormaProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, buildFormaState);

  const editDraft = useCallback(
    (articleId: string, locale: DemoLocale, draft: ArticleDraft) =>
      dispatch({ type: "edit-draft", articleId, locale, draft }),
    []
  );
  const saveDraft = useCallback(
    (articleId: string, locale: DemoLocale) =>
      dispatch({ type: "save-draft", articleId, locale }),
    []
  );
  const setStatus = useCallback(
    (articleId: string, status: ArticleStatus, publishInDays?: number) =>
      dispatch({ type: "set-status", articleId, status, publishInDays }),
    []
  );
  const reset = useCallback(() => dispatch({ type: "reset" }), []);

  const store = useMemo<FormaStore>(
    () => ({
      state,
      editDraft,
      saveDraft,
      setStatus,
      reset,
      staffById: (id) => state.staff.find((s) => s.id === id),
      collectionById: (id) => state.collections.find((c) => c.id === id),
      destinationById: (id) => state.destinations.find((d) => d.id === id),
      articleById: (id) => state.articles.find((a) => a.id === id),
    }),
    [state, editDraft, saveDraft, setStatus, reset]
  );

  return <FormaContext.Provider value={store}>{children}</FormaContext.Provider>;
}

export function useForma(): FormaStore {
  const store = useContext(FormaContext);
  if (!store) throw new Error("useForma must be used inside FormaProvider");
  return store;
}
