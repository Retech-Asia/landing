import type { MetadataRoute } from "next";
import { services } from "@/lib/services-data";
import { caseStudies } from "@/lib/case-studies-data";
import { blogPosts, BLOG_CATEGORIES } from "@/lib/blog-data";
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
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const, viReady: false },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const, viReady: true },
  { path: "/process", priority: 0.8, changeFrequency: "monthly" as const, viReady: false },
  { path: "/technologies", priority: 0.7, changeFrequency: "monthly" as const, viReady: false },
  { path: "/industries", priority: 0.7, changeFrequency: "monthly" as const, viReady: false },
  { path: "/case-studies", priority: 0.8, changeFrequency: "monthly" as const, viReady: false },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const, viReady: false },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" as const, viReady: false },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const, viReady: false },
  { path: "/careers", priority: 0.7, changeFrequency: "weekly" as const, viReady: false },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const, viReady: false },
  { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" as const, viReady: false },
];

/**
 * Build hreflang alternates block for a route.
 * - Homepage (`path === ""`): include VI because it's translated.
 * - Other routes: VI alternates added only when `viReady` flag is true.
 */
function buildAlternates(path: string, viReady: boolean) {
  const enUrl = `${SITE_URL}/en${path === "" ? "" : path}`;
  const viUrl = `${SITE_URL}/vi${path === "" ? "" : path}`;
  if (viReady) {
    return { languages: { en: enUrl, vi: viUrl, "x-default": enUrl } };
  }
  return { languages: { en: enUrl, "x-default": enUrl } };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${SITE_URL}/en${page.path === "" ? "" : page.path}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    alternates: buildAlternates(page.path, page.viReady),
  }));

  // Vietnamese homepage entry — paired with the EN entry via hreflang.
  const viHomepage: MetadataRoute.Sitemap[number] = {
    url: `${SITE_URL}/vi`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: "weekly",
    priority: 1.0,
    alternates: {
      languages: {
        en: `${SITE_URL}/en`,
        vi: `${SITE_URL}/vi`,
        "x-default": `${SITE_URL}/en`,
      },
    },
  };

  // Vietnamese services listing — paired with /en/services via hreflang.
  const viServicesListing: MetadataRoute.Sitemap[number] = {
    url: `${SITE_URL}/vi/services`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.9,
    alternates: {
      languages: {
        en: `${SITE_URL}/en/services`,
        vi: `${SITE_URL}/vi/services`,
        "x-default": `${SITE_URL}/en/services`,
      },
    },
  };

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

  const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${SITE_URL}/en/case-studies/${study.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    alternates: { languages: { en: `${SITE_URL}/en/case-studies/${study.slug}`, "x-default": `${SITE_URL}/en/case-studies/${study.slug}` } },
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/en/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
    alternates: { languages: { en: `${SITE_URL}/en/blog/${post.slug}`, "x-default": `${SITE_URL}/en/blog/${post.slug}` } },
  }));

  const industryPages: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: `${SITE_URL}/en/industries/${industry.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: { languages: { en: `${SITE_URL}/en/industries/${industry.slug}`, "x-default": `${SITE_URL}/en/industries/${industry.slug}` } },
  }));

  const blogCategoryPages: MetadataRoute.Sitemap = BLOG_CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/en/blog/category/${cat.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority: 0.5,
    alternates: { languages: { en: `${SITE_URL}/en/blog/category/${cat.slug}`, "x-default": `${SITE_URL}/en/blog/category/${cat.slug}` } },
  }));

  return [
    ...staticEntries,
    viHomepage,
    viServicesListing,
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
