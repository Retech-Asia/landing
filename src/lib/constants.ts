export const SITE_URL = "https://www.retech.asia";
export const SITE_NAME = "Retech Solutions";

// Last content review date for SEO sitemap. Update when the relevant
// content is meaningfully revised. Static pages, services, industries,
// and case studies rarely change — use this stable timestamp instead of
// `new Date()` so crawlers see a consistent lastmod signal across builds.
export const CONTENT_LAST_UPDATED = "2026-08-21";

export const CONTACT = {
  phone: "(+84) 769 294 225",
  phoneHref: "tel:+84769294225",
  email: "retechasia@gmail.com",
  emailHref: "mailto:retechasia@gmail.com",
  address: "288K8 Nam Ky Khoi Nghia, Vo Thi Sau Ward, HCMC, Vietnam",
  mapUrl: "https://maps.app.goo.gl/6NEtFfXAubCPoKj96",
  taxId: "0318655079",
  businessName: "RETECH SOLUTIONS CO., LTD.",
} as const;

/* Owner checkpoint 3 (2026-10-22): the STATS and ABOUT_STATS numeric
   strips are deleted — unverified counts (50+/30+/5+, 6 countries, 24h)
   stop displaying everywhere pending a factual basis. The about page now
   renders a qualitative capability grid instead. HIGHLIGHTS (unused,
   carried the flagged "shipped as standard" and "5+ shipped platforms"
   copy) is deleted in the same round; recoverable from git history. */
