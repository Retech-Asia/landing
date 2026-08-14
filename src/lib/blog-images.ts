/**
 * Maps blog post slugs to topic-relevant thumbnail images.
 *
 * Each of the 34 blog posts has its own unique WebP thumbnail under
 * /public/images/blog/{slug}.webp. Images are curated from Unsplash
 * (free commercial use, no attribution required) with these criteria:
 *
 *   - Dark or muted backgrounds (preserves card layout in dark mode)
 *   - Single focal point, no busy collages
 *   - No "smiling-at-laptop" stock tropes
 *   - Topic-matched to the specific post (not just the category)
 *
 * When adding a new blog post, drop the WebP at
 * /public/images/blog/{slug}.webp and add an entry below.
 *
 * Legacy shared images under /images/stock/blog-*.webp are kept as a
 * fallback for slugs without a dedicated thumbnail.
 */

const BLOG_IMAGES: Record<string, string> = {
  // Vietnam market movers (NAB, NVIDIA, Samsung, FPT/Viettel/VNG, chips) —
  // mapped to existing stock images until dedicated thumbnails are curated.
  "nab-innovation-centre-vietnam-global-bank-tech-hub": "/images/stock/blog-fintech.webp",
  "nvidia-vietnam-expansion-ai-talent-pipeline": "/images/stock/ai-abstract.webp",
  "samsung-rd-vietnam-engineering-quality-standard": "/images/stock/code-screen.webp",
  "fpt-viettel-vng-vietnam-tech-champions-global": "/images/stock/team-collaboration.webp",
  "vietnam-semiconductor-industry-2026-chip-giants-expanding": "/images/stock/blog-circuit.webp",

  // Vietnam / Offshore
  "why-vietnam-top-it-outsourcing-destination-2026": "/images/blog/why-vietnam-top-it-outsourcing-destination-2026.webp",
  "why-vietnam-smart-choice-it-outsourcing-2026": "/images/blog/why-vietnam-smart-choice-it-outsourcing-2026.webp",
  "vietnam-digital-transformation-hub-2025": "/images/blog/vietnam-digital-transformation-hub-2025.webp",
  "building-offshore-development-team-practical-guide": "/images/blog/building-offshore-development-team-practical-guide.webp",
  "evaluate-offshore-software-development-partner-checklist": "/images/blog/evaluate-offshore-software-development-partner-checklist.webp",
  "offshore-software-development-complete-guide-2026": "/images/blog/offshore-software-development-complete-guide-2026.webp",
  "how-build-dedicated-development-team-vietnam": "/images/blog/how-build-dedicated-development-team-vietnam.webp",
  "software-development-cost-comparison-vietnam-india-eastern-europe-2026": "/images/blog/software-development-cost-comparison-vietnam-india-eastern-europe-2026.webp",

  // AI / Machine Learning
  "how-ai-transforming-custom-software-development": "/images/blog/how-ai-transforming-custom-software-development.webp",
  "agentic-ai-autonomous-software-systems-2026": "/images/blog/agentic-ai-autonomous-software-systems-2026.webp",
  "ai-governance-enterprise-software-compliance-2026": "/images/blog/ai-governance-enterprise-software-compliance-2026.webp",
  "how-small-businesses-leverage-ai-without-breaking-bank": "/images/blog/how-small-businesses-leverage-ai-without-breaking-bank.webp",
  "role-of-ai-in-modern-business-software": "/images/blog/role-of-ai-in-modern-business-software.webp",
  "ai-agent-frameworks-comparison-2026-langchain-langgraph-crewai": "/images/blog/ai-agent-frameworks-comparison-2026-langchain-langgraph-crewai.webp",
  "model-context-protocol-mcp-production-guide-2026": "/images/blog/model-context-protocol-mcp-production-guide-2026.webp",
  "llm-pricing-comparison-2026-gpt5-claude-gemini-enterprise-costs": "/images/blog/llm-pricing-comparison-2026-gpt5-claude-gemini-enterprise-costs.webp",
  "rag-retrieval-augmented-generation-best-practices-2026": "/images/blog/rag-retrieval-augmented-generation-best-practices-2026.webp",
  "ai-code-generation-tools-2026-copilot-claude-code-cursor": "/images/blog/ai-code-generation-tools-2026-copilot-claude-code-cursor.webp",
  "pgvector-vector-search-production-patterns-2026": "/images/blog/pgvector-vector-search-production-patterns-2026.webp",

  // CMS / CRM / ERP
  "cms-vs-crm-choosing-right-system-business": "/images/blog/cms-vs-crm-choosing-right-system-business.webp",
  "crm-vs-erp-understanding-differences-choosing-right-system": "/images/blog/crm-vs-erp-understanding-differences-choosing-right-system.webp",
  "erp-modernization-legacy-systems-migration-guide": "/images/blog/erp-modernization-legacy-systems-migration-guide.webp",
  "cloud-native-erp-microservices-architecture-future": "/images/blog/cloud-native-erp-microservices-architecture-future.webp",
  "rise-of-headless-cms-separating-content-from-presentation": "/images/blog/rise-of-headless-cms-separating-content-from-presentation.webp",

  // Tech / Architecture
  "nextjs-16-server-components-performance-guide": "/images/blog/nextjs-16-server-components-performance-guide.webp",
  "why-typescript-became-default-enterprise-development": "/images/blog/why-typescript-became-default-enterprise-development.webp",
  "state-of-react-server-components-2026": "/images/blog/state-of-react-server-components-2026.webp",
  "rise-of-edge-computing-what-it-means-for-web-applications": "/images/blog/rise-of-edge-computing-what-it-means-for-web-applications.webp",
  "how-choose-right-tech-stack-next-project": "/images/blog/how-choose-right-tech-stack-next-project.webp",
  "from-legacy-to-cloud-native-practical-migration-guide": "/images/blog/from-legacy-to-cloud-native-practical-migration-guide.webp",
  "building-scalable-web-applications-technical-deep-dive": "/images/blog/building-scalable-web-applications-technical-deep-dive.webp",

  // Business / Strategy
  "low-code-vs-custom-development-when-to-choose": "/images/blog/low-code-vs-custom-development-when-to-choose.webp",
  "custom-software-vs-off-the-shelf-how-to-choose": "/images/blog/custom-software-vs-off-the-shelf-how-to-choose.webp",
  "ui-ux-design-principles-enterprise-software": "/images/blog/ui-ux-design-principles-enterprise-software.webp",
  "building-accessible-websites-practical-guide-2026": "/images/blog/building-accessible-websites-practical-guide-2026.webp",
};

/**
 * Default fallback if no specific image is mapped.
 * Uses one of the legacy shared stock images so unmapped slugs still render.
 */
const DEFAULT_IMAGE = "/images/stock/blog-business.webp";

/** Get the topic-relevant image for a blog post */
export function getBlogImage(slug: string): string {
  return BLOG_IMAGES[slug] ?? DEFAULT_IMAGE;
}
