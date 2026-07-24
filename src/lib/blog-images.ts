/**
 * Maps blog post slugs to topic-relevant stock images.
 * Replaces the generic OG screenshots that looked like "dummy pages".
 *
 * Each image was selected to match the actual topic of the post —
 * not just the category. Images are from Unsplash (free commercial use).
 */

const BLOG_IMAGES: Record<string, string> = {
  // Vietnam / Offshore
  "why-vietnam-top-it-outsourcing-destination-2026": "/images/stock/blog-vietnam-outsourcing.webp",
  "why-vietnam-smart-choice-it-outsourcing-2026": "/images/stock/blog-vietnam-outsourcing.webp",
  "vietnam-digital-transformation-hub-2025": "/images/stock/blog-vietnam-outsourcing.webp",
  "building-offshore-development-team-practical-guide": "/images/stock/blog-team-coding.webp",
  "evaluate-offshore-software-development-partner-checklist": "/images/stock/blog-team-coding.webp",
  "offshore-software-development-complete-guide-2026": "/images/stock/blog-team-coding.webp",
  "how-build-dedicated-development-team-vietnam": "/images/stock/blog-team-coding.webp",
  "software-development-cost-comparison-vietnam-india-eastern-europe-2026": "/images/stock/blog-vietnam-outsourcing.webp",

  // AI / Machine Learning
  "how-ai-transforming-custom-software-development": "/images/stock/blog-ai-software.webp",
  "agentic-ai-autonomous-software-systems-2026": "/images/stock/blog-ai-software.webp",
  "ai-governance-enterprise-software-compliance-2026": "/images/stock/blog-circuit.webp",
  "how-small-businesses-leverage-ai-without-breaking-bank": "/images/stock/blog-startup.webp",
  "role-of-ai-in-modern-business-software": "/images/stock/blog-ai-software.webp",

  // CMS / CRM / ERP
  "cms-vs-crm-choosing-right-system-business": "/images/stock/blog-analytics.webp",
  "crm-vs-erp-understanding-differences-choosing-right-system": "/images/stock/blog-enterprise.webp",
  "erp-modernization-legacy-systems-migration-guide": "/images/stock/blog-enterprise.webp",
  "cloud-native-erp-microservices-architecture-future": "/images/stock/blog-cloud.webp",
  "rise-of-headless-cms-separating-content-from-presentation": "/images/stock/blog-circuit.webp",

  // Tech / Architecture
  "nextjs-16-server-components-performance-guide": "/images/stock/blog-circuit.webp",
  "why-typescript-became-default-enterprise-development": "/images/stock/blog-team-coding.webp",
  "state-of-react-server-components-2026": "/images/stock/blog-circuit.webp",
  "rise-of-edge-computing-what-it-means-for-web-applications": "/images/stock/blog-cloud.webp",
  "how-choose-right-tech-stack-next-project": "/images/stock/blog-team-coding.webp",
  "from-legacy-to-cloud-native-practical-migration-guide": "/images/stock/blog-cloud.webp",
  "building-scalable-web-applications-technical-deep-dive": "/images/stock/blog-analytics.webp",

  // Business / Strategy
  "low-code-vs-custom-development-when-to-choose": "/images/stock/blog-business.webp",
  "custom-software-vs-off-the-shelf-how-to-choose": "/images/stock/blog-business.webp",
  "ui-ux-design-principles-enterprise-software": "/images/stock/blog-startup.webp",
  "building-accessible-websites-practical-guide-2026": "/images/stock/blog-startup.webp",
};

/** Default fallback if no specific image is mapped */
const DEFAULT_IMAGE = "/images/stock/blog-business.webp";

/** Get the topic-relevant image for a blog post */
export function getBlogImage(slug: string): string {
  return BLOG_IMAGES[slug] ?? DEFAULT_IMAGE;
}
