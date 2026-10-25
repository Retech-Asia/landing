/**
 * Forma Studio — editorial CMS concept demo data contracts (Wave 2B creative
 * handoff). Fictional independent editorial publisher: articles, editorial
 * staff, collections, review stages, media covers, publication planning.
 * All copy is bilingual (EN + approved VI translations); the demo clock is
 * fixed for hydration-safe, test-stable rendering.
 */

/** Demo clock anchor — fixed for hydration-safe, test-stable rendering. */
export const FORMA_NOW = new Date("2026-10-26T09:00:00");

export type DemoLocale = "en" | "vi";

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  hue: number;
}

export interface Collection {
  id: string;
  /** Bilingual — collections are editorial branding. */
  name: { en: string; vi: string };
  /** Deterministic cover-pair used by asset-library cover cards. */
  hue: number;
}

export type ArticleStatus = "draft" | "in_review" | "scheduled" | "published";

export interface ArticleBody {
  /** Editable paragraphs, bilingual. */
  en: string[];
  vi: string[];
}

export interface Article {
  id: string;
  title: { en: string; vi: string };
  summary: { en: string; vi: string };
  /** Present for the first three seed articles (handoff: "a few editable paragraphs"). */
  body?: ArticleBody;
  authorId: string;
  collectionId: string;
  status: ArticleStatus;
  /** Article age in days before FORMA_NOW. */
  updatedDaysAgo: number;
  /** Scheduled day offset from FORMA_NOW (0 = today); meaningful for scheduled/published. */
  publishInDays: number;
  destinationId: string;
}

export interface PublicationDestination {
  id: string;
  name: { en: string; vi: string };
  cadence: { en: string; vi: string };
}

export interface EditorialEvent {
  id: string;
  summary: { en: string; vi: string };
  daysAgo: number;
}

export interface FormaData {
  staff: StaffMember[];
  collections: Collection[];
  destinations: PublicationDestination[];
  articles: Article[];
  events: EditorialEvent[];
}

/** A saved local draft for one article — keyed by article id in the store. */
export interface ArticleDraft {
  title: string;
  summary: string;
  paragraphs: string[];
}
