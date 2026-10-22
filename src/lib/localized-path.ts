import type { Locale } from "@/i18n/routing";
import { caseStudies } from "./case-studies-data";
import { services } from "./services-data";
import { industries } from "./industries-data";

/**
 * Slug translation for locale switching.
 *
 * Case studies, services, and industries carry per-locale slugs
 * (`slug: { en, vi }`), so swapping only the locale prefix on a detail
 * pathname produces a 404 (e.g. /en/case-studies/phan-tich-mining). This
 * helper rewrites the final segment when the entity under a slugged
 * collection has a different slug in the target locale; everything else
 * (blog, careers, static pages) keeps its path verbatim.
 */

type Slugged = { slug: { en: string; vi: string } };

/** Collection segments whose entities have per-locale slugs. */
const SLUGGED_SEGMENTS = new Set(["case-studies", "services", "industries"]);

const slugToSlug: Record<Locale, Record<string, string>> = { en: {}, vi: {} };

for (const entity of [...caseStudies, ...services, ...industries] as Slugged[]) {
  slugToSlug.vi[entity.slug.en] = entity.slug.vi;
  slugToSlug.en[entity.slug.vi] = entity.slug.en;
}

export function localizedPathname(pathname: string, from: Locale, to: Locale): string {
  if (from === to) return pathname;
  const segments = pathname.split("/");
  // [..., collection, slug] — a detail route under a slugged collection.
  if (segments.length >= 3 && SLUGGED_SEGMENTS.has(segments[segments.length - 2])) {
    const slug = segments[segments.length - 1];
    const mapped = slugToSlug[to][slug];
    if (mapped) {
      segments[segments.length - 1] = mapped;
      return segments.join("/");
    }
  }
  return pathname;
}
