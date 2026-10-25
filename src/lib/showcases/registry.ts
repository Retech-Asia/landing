import type { Locale } from "@/i18n/routing";
import type { ShowcaseDefinition } from "./types";

/**
 * Registered product showcases.
 *
 * INTENTIONALLY EMPTY on 2026-10-25: no ChatGPT creative handoff exists yet,
 * and inventing product identities locally is prohibited by the Creative
 * Ownership Update. Routes under /[locale]/showcases render notFound() while
 * this array is empty, so the framework ships inert (no visible pages, no
 * sitemap impact).
 *
 * When the first creative handoff lands (flagship CRM, Wave 1C):
 *   1. Add the ShowcaseDefinition here (id, per-locale slugs, product name,
 *      tagline, description, views).
 *   2. Register its view components in
 *      src/components/showcases/view-registry.tsx.
 *   3. Wire sitemap entries (EN + VI with hreflang alternates) in
 *      src/app/sitemap.ts and add the ConceptDemoLabel treatment.
 *   4. Link previews from the matching service page (Wave 1 integration).
 */
export const SHOWCASES: ShowcaseDefinition[] = [];

export function getShowcaseBySlug(
  slug: string,
  locale: Locale
): ShowcaseDefinition | undefined {
  return SHOWCASES.find((s) => s.slug[locale] === slug);
}

export function getShowcaseById(id: string): ShowcaseDefinition | undefined {
  return SHOWCASES.find((s) => s.id === id);
}
