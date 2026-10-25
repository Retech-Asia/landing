import type { Locale } from "@/i18n/routing";

/**
 * Product-showcase framework contracts (program brief 2026-10-25,
 * docs/product-showcase-roadmap.md).
 *
 * A showcase is a fictional product UI (concept demonstration, synthetic
 * data) that proves ReTech's application-design capability. Creative
 * direction (product identity, visual composition, copy, sample data) is
 * owned by ChatGPT per the Creative Ownership Update; this module only
 * fixes the technical contract so implementation can start the moment a
 * creative handoff lands.
 */

/** Bilingual string pair — same pattern as services-data.ts. */
export type LocalePair = Record<Locale, string>;

/** One screen inside a showcase (e.g. "dashboard", "leads"). */
export interface ShowcaseViewDef {
  /** Stable key, used in URLs (/showcases/<product>/<view>) and component lookup. */
  id: string;
  /** Crawlable view title (server-rendered, no JS required). */
  title: LocalePair;
  /** 1-2 sentence crawlable summary shown for non-JS users and SEO. */
  summary: LocalePair;
}

/** A registerable product showcase. */
export interface ShowcaseDefinition {
  /** Stable key ("crm"). Never changes after publication (URLs depend on it). */
  id: string;
  /** URL segment per locale, e.g. { en: "atlas-crm", vi: "atlas-crm" }. */
  slug: LocalePair;
  /** Fictional product name (from the ChatGPT creative handoff). */
  product: LocalePair;
  /** One-liner for cards and metadata. */
  tagline: LocalePair;
  /** Crawlable paragraph describing what the demonstration shows. */
  description: LocalePair;
  /** The screens that make up the demo (>= 3 per program standard). */
  views: ShowcaseViewDef[];
  /**
   * Always "concept-demo" — no visible label is rendered for it
   * (owner ruling 2026-10-25: no dummy/sample/concept disclaimers on
   * visitor-facing surfaces). The field exists so a future substantiated
   * showcase type can be added deliberately, not by accident.
   */
  label: "concept-demo";
}
