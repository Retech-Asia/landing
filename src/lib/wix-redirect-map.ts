/**
 * Wix → Next.js URL redirect map.
 *
 * Source: https://www.retech.asia/sitemap.xml (+ child sitemaps) captured
 * 2026-07-20. These are the only URLs Google has currently indexed from the
 * Wix site; redirecting them protects ranking during the Wix → Vercel cutover.
 *
 * Static exact-match redirects live in next.config.ts -> redirects().
 * Dynamic / pattern-based redirects (case study slugs) can move here if the
 * list grows.
 *
 * Last reviewed: 2026-07-20
 */

export type WixRedirect = {
  /** Legacy Wix path (lowercase, no trailing slash). */
  source: string;
  /** New Next.js destination path. */
  destination: string;
  /** Whether the destination is a permanent (308) redirect. */
  permanent: boolean;
  /** Notes for future maintainers. */
  note?: string;
};

/**
 * Wix sitemap inventory (2026-07-20):
 *   /                                         -> /            (no redirect)
 *   /about-us                                 -> /about
 *   /book-online                              -> /contact
 *   /blog                                     -> /blog        (no redirect)
 *   /privacy-policy                           -> /privacy-policy (no redirect)
 *   /accessibility-statement                  -> /            (no new page yet)
 *   /blank                                    -> /            (Wix template page)
 *   /portfolio-collections/my-portfolio                  -> /case-studies
 *   /portfolio-collections/my-portfolio/project-title-N -> /case-studies
 *
 * NOTE: project-title-N slugs are Wix template defaults. Jay should map each
 * indexed project to its real case-study slug once the new case studies are
 * finalized. Until then we route them to /case-studies so they don't 404.
 */
export const WIX_REDIRECTS: WixRedirect[] = [
  { source: "/about-us", destination: "/about", permanent: true },
  { source: "/book-online", destination: "/contact", permanent: true },
  { source: "/accessibility-statement", destination: "/", permanent: true, note: "No equivalent page yet; route home until we publish one" },
  { source: "/blank", destination: "/", permanent: true, note: "Wix template page, never user-facing" },
  {
    source: "/portfolio-collections/my-portfolio",
    destination: "/case-studies",
    permanent: true,
  },
  {
    source: "/portfolio-collections/my-portfolio/project-title-1",
    destination: "/case-studies",
    permanent: true,
    note: "Map to specific case-study slug once confirmed",
  },
  {
    source: "/portfolio-collections/my-portfolio/project-title-2",
    destination: "/case-studies",
    permanent: true,
    note: "Map to specific case-study slug once confirmed",
  },
  {
    source: "/portfolio-collections/my-portfolio/project-title-3",
    destination: "/case-studies",
    permanent: true,
    note: "Map to specific case-study slug once confirmed",
  },
  {
    source: "/portfolio-collections/my-portfolio/project-title-4",
    destination: "/case-studies",
    permanent: true,
    note: "Map to specific case-study slug once confirmed",
  },
  {
    source: "/portfolio-collections/my-portfolio/project-title-5",
    destination: "/case-studies",
    permanent: true,
    note: "Map to specific case-study slug once confirmed",
  },
  {
    source: "/portfolio-collections/my-portfolio/project-title-6",
    destination: "/case-studies",
    permanent: true,
    note: "Map to specific case-study slug once confirmed",
  },
];

/**
 * Internal slug redirects — case study renames.
 *
 * 2026-07-20: Scrubbed client brand names from case study slugs/titles.
 * Old slugs redirected to new ones so any internal links or stale indexes
 * keep resolving. Safe to remove after 6+ months of stable traffic.
 */
export const INTERNAL_REDIRECTS: WixRedirect[] = [
  { source: "/case-studies/signsbeat", destination: "/case-studies/wellness-platform", permanent: true },
  { source: "/case-studies/dune-asset-management", destination: "/case-studies/asset-management-platform", permanent: true },
];
