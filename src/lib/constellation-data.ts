/**
 * Constellation hero data — stars representing real Retech shipped work.
 *
 * Three tiers based on impact × recency:
 *   Tier 1: Flagship AI case studies (most prominent positions)
 *   Tier 2: Other case studies (mid-impact)
 *   Tier 3: Recent AI blog posts (signals ongoing AI work depth)
 *
 * Every tier-3 star MUST connect to at least one other star — no floating
 * orphan posts. Connections encode semantic relationships (tech overlap,
 * shared architecture, topic relevance).
 *
 * Positions are deterministic via hashSeed(star.id) — same output on
 * SSR and client, no hydration mismatch.
 *
 * ViewBox: 0 0 1000 700. Coordinates biased to right side (x > 500)
 * so the constellation sits behind the hero text on the left.
 */

export type StarTier = 1 | 2 | 3;

export type ConstellationStar = {
  id: string;
  tier: StarTier;
  /** Base position in viewBox coords (0-1000, 0-700). Jitter applied at runtime. */
  basePosition: { x: number; y: number };
  /** Short label shown inline next to the star (Tier 1+2 only). */
  shortLabel: string;
  /** Full label for tooltip + aria-label. */
  label: string;
  /** One-line description for tooltip. */
  description: string;
  /** Tech badges shown in tooltip. */
  tech: string[];
  /** Navigation target. */
  href: string;
};

export type ConstellationConnection = {
  from: string;
  to: string;
};

/* ── Stars ── */

export const STARS: ConstellationStar[] = [
  // ── Tier 1: Flagship AI case studies ──
  {
    id: "investment-intelligence",
    tier: 1,
    basePosition: { x: 720, y: 250 },
    shortLabel: "Investment Intelligence",
    label: "Investment Intelligence Platform",
    description:
      "Multi-agent investment research with RAG over SEC filings and analyst debate.",
    tech: ["LangChain", "pgvector", "Claude"],
    href: "/case-studies/investment-intelligence-platform",
  },
  {
    id: "ai-analysis-saas",
    tier: 1,
    basePosition: { x: 820, y: 430 },
    shortLabel: "AI Analysis SaaS",
    label: "AI Analysis SaaS Platform",
    description:
      "Multi-tool AI SaaS: blood-test analyzer, food image AI, and chat sharing one credit system.",
    tech: ["Claude", "Gemini", "Supabase"],
    href: "/case-studies/ai-analysis-saas",
  },

  // ── Tier 2: Other case studies ──
  {
    id: "mining-analytics",
    tier: 2,
    basePosition: { x: 620, y: 390 },
    shortLabel: "Mining Analytics",
    label: "Mining Analytics Platform",
    description:
      "BTC mining operations dashboard with multi-pool ingestion and difficulty projections.",
    tech: ["Next.js", "FastAPI", "Postgres"],
    href: "/case-studies/mining-analytics-platform",
  },
  {
    id: "asset-management",
    tier: 2,
    basePosition: { x: 770, y: 550 },
    shortLabel: "Asset Management",
    label: "Asset Management Platform",
    description:
      "Investment management system with admin, customer, and introducer portals.",
    tech: ["NestJS", "Prisma", "PostgreSQL"],
    href: "/case-studies/asset-management-platform",
  },
  {
    id: "fintech-card",
    tier: 2,
    basePosition: { x: 910, y: 320 },
    shortLabel: "Fintech Card",
    label: "Fintech Card Marketing Platform",
    description:
      "Headless CMS marketing platform for a consumer fintech card product.",
    tech: ["Next.js", "Prismic", "GSAP"],
    href: "/case-studies/fintech-card-marketing",
  },

  // ── Tier 3: Recent AI blog posts (5 max, all must connect) ──
  {
    id: "pgvector-post",
    tier: 3,
    basePosition: { x: 590, y: 180 },
    shortLabel: "pgvector Production",
    label: "Vector Search with pgvector",
    description:
      "Production patterns for pgvector: HNSW vs IVFFlat, 3072-dim embeddings, evaluation in CI.",
    tech: ["pgvector", "Postgres", "HNSW"],
    href: "/blog/pgvector-vector-search-production-patterns-2026",
  },
  {
    id: "rag-post",
    tier: 3,
    basePosition: { x: 660, y: 590 },
    shortLabel: "RAG Best Practices",
    label: "RAG Best Practices in 2026",
    description:
      "Production retrieval-augmented generation: chunking, hybrid search, re-ranking, eval harness.",
    tech: ["LangChain", "pgvector", "Claude"],
    href: "/blog/rag-retrieval-augmented-generation-best-practices-2026",
  },
  {
    id: "agent-frameworks-post",
    tier: 3,
    basePosition: { x: 880, y: 610 },
    shortLabel: "Agent Frameworks",
    label: "AI Agent Frameworks Compared",
    description:
      "LangChain vs LangGraph vs CrewAI for production multi-agent systems.",
    tech: ["LangChain", "LangGraph", "CrewAI"],
    href: "/blog/ai-agent-frameworks-comparison-2026-langchain-langgraph-crewai",
  },
  {
    id: "mcp-post",
    tier: 3,
    basePosition: { x: 950, y: 480 },
    shortLabel: "MCP Production Guide",
    label: "Model Context Protocol in Production",
    description:
      "MCP for tool-augmented LLMs: server design, auth, and production deployment patterns.",
    tech: ["MCP", "Claude", "TypeScript"],
    href: "/blog/model-context-protocol-mcp-production-guide-2026",
  },
  {
    id: "agentic-ai-post",
    tier: 3,
    basePosition: { x: 540, y: 320 },
    shortLabel: "Agentic AI Systems",
    label: "Agentic AI: Autonomous Software Systems",
    description:
      "How autonomous agent architectures are reshaping software design and operations.",
    tech: ["LangGraph", "Multi-agent", "Tooling"],
    href: "/blog/agentic-ai-autonomous-software-systems-2026",
  },
];

/* ── Connections — every star must have at least one edge ── */

export const CONNECTIONS: ConstellationConnection[] = [
  // Flagship AI case studies are tightly linked
  { from: "investment-intelligence", to: "ai-analysis-saas" },

  // Investment Intelligence tech stack → blog posts documenting it
  { from: "investment-intelligence", to: "pgvector-post" },
  { from: "investment-intelligence", to: "rag-post" },
  { from: "investment-intelligence", to: "agent-frameworks-post" },
  { from: "investment-intelligence", to: "agentic-ai-post" },

  // AI Analysis SaaS tech stack → blog posts documenting it
  { from: "ai-analysis-saas", to: "agent-frameworks-post" },
  { from: "ai-analysis-saas", to: "mcp-post" },
  { from: "ai-analysis-saas", to: "agentic-ai-post" },

  // Other case studies — domain relationships
  { from: "mining-analytics", to: "asset-management" }, // both data/analytics
  { from: "asset-management", to: "fintech-card" }, // both fintech vertical
];

/* ── Visual constants per tier ── */

export const TIER_STYLES: Record<
  StarTier,
  {
    coreRadius: number;
    haloRadius: number;
    coreColor: string;
    haloColor: string;
    labelAlwaysVisible: boolean;
    pulseDuration: string;
  }
> = {
  1: {
    coreRadius: 6,
    haloRadius: 14,
    coreColor: "var(--brand)",
    haloColor: "var(--brand)",
    labelAlwaysVisible: true,
    pulseDuration: "3s",
  },
  2: {
    coreRadius: 4,
    haloRadius: 10,
    coreColor: "var(--accent-cyan)",
    haloColor: "var(--accent-cyan)",
    labelAlwaysVisible: true,
    pulseDuration: "4s",
  },
  3: {
    coreRadius: 2.8,
    haloRadius: 7,
    coreColor: "var(--accent-violet)",
    haloColor: "var(--accent-violet)",
    labelAlwaysVisible: false,
    pulseDuration: "5s",
  },
};

/* ── Deterministic jitter — FNV-1a hash of star id ── */

/**
 * Hash a string to a deterministic 0..1 value.
 * Uses FNV-1a for stable output across SSR and client (no hydration mismatch).
 * Result is used as a per-star position offset so stars don't sit on a grid.
 */
export function hashSeed(str: string): number {
  let h = 2166136261; // FNV offset basis
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619); // FNV prime
  }
  return (h >>> 0) / 4294967295; // normalize to 0..1
}

/**
 * Apply deterministic jitter to a star's base position.
 * Jitter range: ±12 px in both x and y. Deterministic per star id.
 */
export function jitterPosition(star: ConstellationStar): { x: number; y: number } {
  const seedX = hashSeed(star.id + ":x");
  const seedY = hashSeed(star.id + ":y");
  return {
    x: star.basePosition.x + (seedX - 0.5) * 24,
    y: star.basePosition.y + (seedY - 0.5) * 24,
  };
}

/* ── Sorted by tier ascending for keyboard nav (DOM/tab order) ── */

export const STARS_SORTED_FOR_KEYBOARD: ConstellationStar[] = [...STARS].sort(
  (a, b) => a.tier - b.tier,
);
