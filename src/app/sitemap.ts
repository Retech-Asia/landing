import type { MetadataRoute } from "next";
import { services } from "@/lib/services-data";
import { caseStudies } from "@/lib/case-studies-data";
import { blogPosts, BLOG_CATEGORIES } from "@/lib/blog-data";
import { blogViMeta } from "@/lib/blog-i18n";
import { industries } from "@/lib/industries-data";
import { SITE_URL, CONTENT_LAST_UPDATED } from "@/lib/constants";
import { routing } from "@/i18n/routing";

// Stable lastModified timestamp — see CONTENT_LAST_UPDATED in constants.ts.
// Avoids the anti-pattern of every build emitting `new Date()` and marking
// every URL as freshly modified, which flattens the freshness signal.
const CONTENT_LAST_MODIFIED = new Date(CONTENT_LAST_UPDATED);

/**
 * Bilingual sitemap.
 *
 * Phase 1 strategy:
 *   - Homepage gets full hreflang alternates (en, vi, x-default) because
 *     the Vietnamese homepage is shipped.
 *   - Every other route currently ships English-only content. We advertise
 *     `/en/...` URLs only (no VI versions yet) so search engines don't
 *     index English content under a `/vi/...` URL. When a route gets its
 *     Vietnamese translation in a later phase, add its VI URL here AND
 *     cross-link alternates between the EN and VI entries.
 *
 * Note on `alternates.languages`: Google requires bidirectional hreflang.
 * If we declare `vi` on an English page that has no real Vietnamese
 * equivalent, Google ignores the tag (and may downgrade trust). So we
 * only declare `vi` where VI content actually renders.
 */
const staticPages = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const, viReady: true },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const, viReady: true },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const, viReady: true },
  { path: "/process", priority: 0.8, changeFrequency: "monthly" as const, viReady: true },
  { path: "/technologies", priority: 0.7, changeFrequency: "monthly" as const, viReady: true },
  { path: "/industries", priority: 0.7, changeFrequency: "monthly" as const, viReady: true },
  { path: "/case-studies", priority: 0.8, changeFrequency: "monthly" as const, viReady: true },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const, viReady: true },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" as const, viReady: true },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const, viReady: true },
  { path: "/careers", priority: 0.7, changeFrequency: "weekly" as const, viReady: true },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const, viReady: true },
  { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" as const, viReady: true },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Emit EN + VI <url> entries per static page (each URL needs its own
  // sitemap entry; alternates cross-link them via hreflang).
  const staticEntries: MetadataRoute.Sitemap = staticPages.flatMap((page) => {
    const path = page.path === "" ? "" : page.path;
    const enUrl = `${SITE_URL}/en${path}`;
    const viUrl = `${SITE_URL}/vi${path}`;
    const languages = page.viReady
      ? { en: enUrl, vi: viUrl, "x-default": enUrl }
      : { en: enUrl, "x-default": enUrl };
    return [
      {
        url: enUrl,
        lastModified: CONTENT_LAST_MODIFIED,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages },
      },
      ...(page.viReady
        ? [
            {
              url: viUrl,
              lastModified: CONTENT_LAST_MODIFIED,
              changeFrequency: page.changeFrequency,
              priority: page.priority,
              alternates: { languages },
            },
          ]
        : []),
    ];
  });

  const servicePages: MetadataRoute.Sitemap = services.flatMap((service) => {
    const enUrl = `${SITE_URL}/en/services/${service.slug.en}`;
    const viUrl = `${SITE_URL}/vi/services/${service.slug.vi}`;
    return [
      {
        url: enUrl,
        lastModified: CONTENT_LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: { languages: { en: enUrl, vi: viUrl, "x-default": enUrl } },
      },
      {
        url: viUrl,
        lastModified: CONTENT_LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: { languages: { en: enUrl, vi: viUrl, "x-default": enUrl } },
      },
    ];
  });

  const caseStudyPages: MetadataRoute.Sitemap = caseStudies.flatMap((study) => {
    const enUrl = `${SITE_URL}/en/case-studies/${study.slug.en}`;
    const viUrl = `${SITE_URL}/vi/case-studies/${study.slug.vi}`;
    return [
      {
        url: enUrl,
        lastModified: CONTENT_LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: { languages: { en: enUrl, vi: viUrl, "x-default": enUrl } },
      },
      {
        url: viUrl,
        lastModified: CONTENT_LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: { languages: { en: enUrl, vi: viUrl, "x-default": enUrl } },
      },
    ];
  });

  const blogPages: MetadataRoute.Sitemap = blogPosts.flatMap((post) => {
    const enUrl = `${SITE_URL}/en/blog/${post.slug}`;
    const viMeta = blogViMeta[post.slug];
    const viUrl = viMeta ? `${SITE_URL}/vi/blog/${viMeta.slug}` : null;
    const lastModified = new Date(post.updatedAt ?? post.date);
    // VI entry + hreflang only when a VI translation actually renders —
    // falling back to the EN slug would advertise English content under a
    // /vi URL (violates the bidirectional-hreflang policy above).
    const languages = viUrl
      ? { en: enUrl, vi: viUrl, "x-default": enUrl }
      : { en: enUrl, "x-default": enUrl };
    return [
      {
        url: enUrl,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: { languages },
      },
      ...(viUrl
        ? [
            {
              url: viUrl,
              lastModified,
              changeFrequency: "monthly" as const,
              priority: 0.6,
              alternates: { languages },
            },
          ]
        : []),
    ];
  });

  const industryPages: MetadataRoute.Sitemap = industries.flatMap((industry) => {
    const enUrl = `${SITE_URL}/en/industries/${industry.slug.en}`;
    const viUrl = `${SITE_URL}/vi/industries/${industry.slug.vi}`;
    return [
      {
        url: enUrl,
        lastModified: CONTENT_LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: { languages: { en: enUrl, vi: viUrl, "x-default": enUrl } },
      },
      {
        url: viUrl,
        lastModified: CONTENT_LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: { languages: { en: enUrl, vi: viUrl, "x-default": enUrl } },
      },
    ];
  });

  // Category slugs are shared across locales (EN slugs serve both), so emit
  // EN + VI entries with bidirectional hreflang.
  const blogCategoryPages: MetadataRoute.Sitemap = BLOG_CATEGORIES.flatMap((cat) => {
    const enUrl = `${SITE_URL}/en/blog/category/${cat.slug}`;
    const viUrl = `${SITE_URL}/vi/blog/category/${cat.slug}`;
    const languages = { en: enUrl, vi: viUrl, "x-default": enUrl };
    return [
      {
        url: enUrl,
        lastModified: CONTENT_LAST_MODIFIED,
        changeFrequency: "weekly" as const,
        priority: 0.5,
        alternates: { languages },
      },
      {
        url: viUrl,
        lastModified: CONTENT_LAST_MODIFIED,
        changeFrequency: "weekly" as const,
        priority: 0.5,
        alternates: { languages },
      },
    ];
  });

  return [
    ...staticEntries,
    ...servicePages,
    ...caseStudyPages,
    ...blogPages,
    ...industryPages,
    ...blogCategoryPages,
  ];
}

// Ensure `routing` is referenced for future per-locale iteration; avoids
// an "unused import" lint error if we forget to wire it for later phases.
void routing;
