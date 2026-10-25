/**
 * Citewell (Applied AI showcase, Wave 2C) data contracts. All content is a
 * predefined, simulated demonstration over a fictional document corpus — the
 * demo must never suggest a live AI model is generating answers (handoff §2C).
 */

export type DemoLocale = "en" | "vi";

/** Fixed reference clock so every rendered date is deterministic. */
export const CITEWELL_NOW = new Date("2026-10-26T09:00:00+07:00");

export type ReviewStatus = "pending" | "approved" | "rejected";

export interface DocSection {
  id: string;
  heading: { en: string; vi: string };
  /** The fictional source excerpt. Cited passages must appear verbatim here. */
  excerpt: { en: string; vi: string };
}

export interface SourceDoc {
  id: string;
  title: { en: string; vi: string };
  version: string;
  category: { en: string; vi: string };
  updatedDaysAgo: number;
  owner: { en: string; vi: string };
  sections: DocSection[];
}

/** A citation points at one section and names the exact supporting passage. */
export interface Citation {
  docId: string;
  sectionId: string;
  passage: { en: string; vi: string };
  locator: { en: string; vi: string };
}

export interface QAPair {
  id: string;
  question: { en: string; vi: string };
  /** "cited" answers carry predefined copy + citations; "insufficient"
   *  answers correctly decline — the corpus does not contain the answer. */
  kind: "cited" | "insufficient";
  answer?: { en: string; vi: string };
  citations?: Citation[];
  insufficientNote?: { en: string; vi: string };
  askedDaysAgo: number;
}

export interface ReviewItem {
  qaId: string;
  reason: { en: string; vi: string };
  priority: "high" | "normal";
  requestedDaysAgo: number;
}

export type QualityOutcome = "pass" | "flagged";

export interface QualityCase {
  id: string;
  name: { en: string; vi: string };
  qaId: string;
  expectation: { en: string; vi: string };
  outcome: QualityOutcome;
  detail: { en: string; vi: string };
}

export interface CitewellEvent {
  id: string;
  summary: { en: string; vi: string };
  daysAgo: number;
}

export interface CitewellData {
  docs: SourceDoc[];
  qaPairs: QAPair[];
  reviewQueue: ReviewItem[];
  qualityCases: QualityCase[];
  events: CitewellEvent[];
}

export interface CitewellState extends CitewellData {
  /** Simulated human-review decisions keyed by QA pair id. */
  reviewDecisions: Record<string, { status: ReviewStatus; daysAgo: number }>;
}
