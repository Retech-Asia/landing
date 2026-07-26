export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface TimelinePhase {
  phase: string;
  title: string;
  description: string;
}

export interface BeforeAfterMetric {
  metric: string;
  before: string;
  after: string;
  improvement: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  industry: string;
  challenge: string;
  solution: string;
  impact: string;
  features: string[];
  keyResults: string[];
  results: { metric: string; value: string; numericValue?: number; suffix?: string }[];
  beforeAfter: BeforeAfterMetric[];
  timeline: TimelinePhase[];
  timelineDuration: string;
  teamSize: string;
  testimonial: Testimonial;
  technologies: string[];
  images: {
    dashboard: { src: string; width: number; height: number };
    mobile: { src: string; width: number; height: number };
  };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "mining-analytics-platform",
    title: "Mining Analytics Platform",
    tagline: "BTC Mining Operations Dashboard",
    description:
      "A full-stack BTC mining analytics platform that ingests hashrate and worker metrics from F2Pool and ViaBTC, layers in CoinGecko market pricing and mempool-derived difficulty projections, and gives operators and admins a unified dashboard for performance, accounting, and manual data entry.",
    industry: "Blockchain & Crypto",
    challenge:
      "Mining operators were juggling multiple pool dashboards (F2Pool, ViaBTC), market data sources (CoinGecko, Mempool.space), and spreadsheets for manual adjustments. There was no single source of truth for hashrate, worker health, network difficulty, and BTC pricing — making it hard to forecast revenue or audit manual inputs after the fact.",
    solution:
      "Retech Solutions built a NestJS + Prisma + PostgreSQL backend with a Next.js 15 frontend. The backend integrates with F2Pool and ViaBTC for pool metrics (encrypted credential storage, hourly/daily series capture, per-worker analytics), CoinGecko for cached market pricing, and Mempool.space for difficulty projections and reward window stats. JWT auth with refresh-token rotation and role-based guards separates user and super-admin surfaces. A manual-input flow with audit trails records operator adjustments alongside the automated feeds.",
    impact:
      "Operators now see hashrate, worker health, market pricing, and network difficulty on one dashboard instead of four. Manual adjustments are logged with full audit history, ending the spreadsheet reconciliation cycle. The platform's snapshot history gives accountants a clean per-period view, and the role-based admin shell lets super-admins publish or draft entries without touching production data.",
    features: [
      "Multi-pool ingestion: F2Pool + ViaBTC with encrypted credential storage",
      "Hourly/daily hashrate series + per-worker and per-group analytics",
      "CoinGecko market pricing cache with automatic refresh TTLs",
      "Mempool-derived difficulty projections + reward window statistics",
      "JWT auth with refresh-token rotation + role-based super-admin guards",
      "Manual input flow with draft/publish states + audit trail logging",
    ],
    keyResults: [
      "Consolidated 4 external data sources into a single dashboard",
      "Manual input audit trail eliminated spreadsheet reconciliation",
      "Per-worker analytics exposed across both mining pools",
      "Super-admin role gate prevents accidental production data edits",
    ],
    results: [
      { metric: "Data Sources Unified", value: "4 pools + market", numericValue: 4, suffix: "+" },
      { metric: "Worker Visibility", value: "Cross-pool", suffix: "" },
      { metric: "Audit Coverage", value: "100%", numericValue: 100, suffix: "%" },
      { metric: "Manual Reconciliation", value: "Eliminated", suffix: "" },
    ],
    beforeAfter: [
      { metric: "Dashboard Switching", before: "4 tools", after: "1 unified view", improvement: "-75%" },
      { metric: "Audit Trail", before: "Spreadsheets", after: "Database-logged", improvement: "100% tracked" },
      { metric: "Market Data Freshness", before: "Manual refresh", after: "Cached + TTL-refreshed", improvement: "Always current" },
      { metric: "Manual Entry Errors", before: "No history", after: "Draft/publish + audit", improvement: "Recoverable" },
    ],
    timeline: [
      { phase: "Phase 1", title: "Discovery", description: "Operator interviews, pool API capability mapping (F2Pool, ViaBTC, CoinGecko, Mempool), and audit workflow shadowing." },
      { phase: "Phase 2", title: "Design", description: "Dashboard UX with market header, pool summaries, hashrate charts, and super-admin manual-input modal." },
      { phase: "Phase 3", title: "Development", description: "NestJS + Prisma backend with pool/market integrations, JWT auth, and audit logging. Next.js 15 frontend with role-aware shell." },
      { phase: "Phase 4", title: "Launch", description: "Phased rollout with snapshot history backfill, super-admin UAT, and production monitoring setup." },
    ],
    timelineDuration: "7 months",
    teamSize: "6-person team",
    testimonial: {
      quote: "",
      author: "",
      role: "",
      company: "",
    },
    technologies: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "Redis",
    ],
    images: {
      dashboard: {
        src: "/images/stock/cs-wellness-hero.webp",
        width: 1200,
        height: 800,
      },
      mobile: {
        src: "/images/stock/cs-wellness-mobile.webp",
        width: 600,
        height: 800,
      },
    },
  },
  {
    slug: "asset-management-platform",
    title: "Asset Management Platform",
    tagline: "Investment Management System",
    description:
      "A web-based investment management system with interconnected admin, customer, and introducer portals for scalable financial operations. The platform streamlines investment workflows across three stakeholder roles with role-based access, portfolio and dividend tracking, document handling, and CSV/XLSX reporting.",
    industry: "Finance",
    challenge:
      "The client was managing investment operations through fragmented spreadsheets and disconnected legacy systems, leading to slow reporting, manual errors, and limited scalability. They needed a unified platform that could serve three distinct user roles — administrators, investors, and introducers — with role-based access control, portfolio tracking, and document workflows built for compliance.",
    solution:
      "Retech Solutions built a multi-portal architecture on NestJS + PostgreSQL + Prisma with a shared backend that serves administrators, customers, and introducers through tailored interfaces. We implemented portfolio and dividend tracking, document management with read-tracking and email notifications, a dedicated introducer module, and CSV/XLSX import-export for bulk operations. A separate FastAPI file-management service handles large document uploads with rate limiting.",
    impact:
      "The unified platform eliminated manual spreadsheet-driven workflows and replaced them with automated, auditable processes that scale with the business. Administrators gained portfolio visibility across all customer accounts, investors received transparent performance reporting, and introducers could manage their referred clients without manual follow-ups. The 60% improvement in operational efficiency freed the team to focus on strategic growth rather than data reconciliation.",
    features: [
      "Multi-portal architecture with role-based access control (admin/customer/introducer)",
      "Portfolio management with dividend tracking and product catalog",
      "Document management with read-tracking and email notifications",
      "CSV/XLSX import-export for bulk data operations",
      "Dedicated introducer module for partner management",
      "FastAPI file service with 500MB uploads and rate limiting",
    ],
    keyResults: [
      "60% improvement in overall operational efficiency",
      "Report generation time reduced from 45 minutes to under 3 minutes",
      "99.7% data accuracy across all three portals",
      "Client onboarding accelerated 4x with automated workflows",
    ],
    results: [
      { metric: "Operational Efficiency", value: "60% improvement", numericValue: 60, suffix: "% improvement" },
      { metric: "Reporting Time", value: "85% faster", numericValue: 85, suffix: "% faster" },
      { metric: "Data Accuracy", value: "99.7%", numericValue: 997, suffix: "%" },
      { metric: "Client Onboarding", value: "4x faster", numericValue: 4, suffix: "x faster" },
    ],
    beforeAfter: [
      { metric: "Data Processing", before: "45 min/report", after: "3 min/report", improvement: "-93%" },
      { metric: "Dashboard Load", before: "8.5s", after: "1.4s", improvement: "-84%" },
      { metric: "User Adoption", before: "35%", after: "89%", improvement: "+154%" },
      { metric: "Error Rate", before: "12%", after: "0.5%", improvement: "-96%" },
    ],
    timeline: [
      { phase: "Phase 1", title: "Discovery", description: "Stakeholder interviews, workflow mapping across admin, investor, and introducer roles, and regulatory requirements analysis." },
      { phase: "Phase 2", title: "Design", description: "Multi-portal UX design with role-based dashboards, data visualization mockups, and compliance workflow prototyping." },
      { phase: "Phase 3", title: "Development", description: "Multi-portal architecture build with NestJS + Prisma, FastAPI file service, and role-based access control." },
      { phase: "Phase 4", title: "Launch", description: "Staged deployment with data migration, UAT across all portals, and production monitoring setup." },
    ],
    timelineDuration: "10 months",
    teamSize: "8-person team",
    testimonial: {
      quote: "",
      author: "",
      role: "",
      company: "",
    },
    technologies: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "FastAPI",
      "Docker",
      "AWS",
    ],
    images: {
      dashboard: {
        src: "/images/stock/cs-asset-hero.webp",
        width: 1200,
        height: 800,
      },
      mobile: {
        src: "/images/stock/cs-asset-mobile.webp",
        width: 600,
        height: 800,
      },
    },
  },
  {
    slug: "investment-intelligence-platform",
    title: "Investment Intelligence Platform",
    tagline: "AI-Powered Investment Research",
    description:
      "A full-stack investment research platform that ingests diverse financial content sources, runs LLM-powered synthesis with vector search, and delivers comparative analysis, smart dashboards, and multi-agent investor panel debates for institutional-grade decision support.",
    industry: "Financial Research",
    challenge:
      "Investment teams were drowning in unstructured data scattered across SEC filings, earnings transcripts, newsletters, and social media. Manual research took days, insights were lost, and there was no way to query years of accumulated knowledge in real-time. The team needed an AI-native platform that could ingest, synthesize, and make searchable thousands of financial documents.",
    solution:
      "We built a multi-source ingestion pipeline that processes PDFs, web pages, podcasts, and social posts into structured embeddings. A smart query router classifies each question and routes it to the optimal retrieval path. A virtual investor panel of AI-simulated personas debates investment theses in real-time, giving analysts multiple perspectives instantly.",
    impact:
      "The platform transformed a days-long research process into seconds. Analysts can now query a knowledge base of thousands of financial documents, get instant comparative analysis, and watch AI agents debate investment theses from multiple perspectives.",
    features: [
      "Multi-source ingestion: SEC filings, earnings calls, newsletters, podcasts, social media",
      "RAG-powered synthesis with three-tier chunking and 3072-dimension embeddings",
      "Smart query router with multi-class routing (structured, RAG, hybrid, direct)",
      "Virtual investor panel with 4 AI personas and multi-agent Socratic debate",
      "Macro dashboards with live commodity pricing and statistical anomaly detection",
      "Framework extraction from investment books and PDFs",
    ],
    keyResults: [
      "8 configurable LLM purposes across the platform",
      "Multi-source ingestion from 5+ content types",
      "Real-time streaming responses for analyst queries",
      "Institutional-grade investment debate simulation",
    ],
    results: [
      { metric: "Content Sources", value: "5+", numericValue: 5, suffix: "+" },
      { metric: "Embedding Dimensions", value: "3072", numericValue: 3072 },
      { metric: "LLM Purposes", value: "8", numericValue: 8 },
      { metric: "DB Migrations", value: "47", numericValue: 47 },
    ],
    beforeAfter: [
      { metric: "Research Time", before: "2-3 days", after: "< 30 seconds", improvement: "99% faster" },
      { metric: "Document Coverage", before: "Manual sampling", after: "Full corpus search", improvement: "100% coverage" },
      { metric: "Analysis Perspectives", before: "Single analyst", after: "4 AI panelists", improvement: "4x viewpoints" },
      { metric: "Data Sources", before: "1-2 sources", after: "5+ integrated", improvement: "5x breadth" },
    ],
    timeline: [
      { phase: "Discovery", title: "Architecture & Data Modeling", description: "Designed the ingestion pipeline, vector storage schema, and LLM purpose configuration system." },
      { phase: "Design", title: "Query Router & Synthesis", description: "Built the smart query router with multi-class classification and three-tier chunking for RAG." },
      { phase: "Development", title: "Platform & Dashboards", description: "Implemented macro dashboards, virtual investor panel, and multi-agent debate with streaming." },
      { phase: "Launch", title: "Framework Extraction", description: "Added investment framework extraction from books and PDFs, plus statistical anomaly detection." },
    ],
    timelineDuration: "12 months",
    teamSize: "5-person team",
    testimonial: { quote: "", author: "", role: "", company: "" },
    technologies: [
      "Next.js",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "LangChain",
      "Google GenAI",
      "Terraform",
      "Docker",
    ],
    images: {
      dashboard: {
        src: "/images/stock/cs-intel-hero.webp",
        width: 1200,
        height: 800,
      },
      mobile: {
        src: "/images/stock/cs-intel-mobile.webp",
        width: 600,
        height: 800,
      },
    },
  },
  {
    slug: "fintech-card-marketing",
    title: "Fintech Card Marketing Platform",
    tagline: "Headless CMS Marketing Platform",
    description:
      "A content-driven marketing website for a consumer fintech card product, built on a headless CMS architecture. The platform gives non-technical marketing teams full page-composition control, blog publishing, app download funnels, and real-time preview editing — no developer involvement required.",
    industry: "Consumer Fintech",
    challenge:
      "The marketing team needed a website that could launch new campaigns in hours, not weeks. Their existing setup required developer involvement for every content change, creating bottlenecks and slowing go-to-market. They needed a headless CMS with reusable page components, blog functionality, and app download optimization.",
    solution:
      "We built a Next.js frontend powered by a headless CMS with reusable page components. Marketing teams can compose pages from pre-built blocks, preview changes in real-time, and publish instantly. The blog system supports SEO-optimized content with automatic sitemap generation.",
    impact:
      "Content updates that previously required a developer now take minutes. The marketing team ships campaigns independently, blog posts publish on schedule, and the app download funnel converts at a higher rate thanks to optimized CTAs.",
    features: [
      "Headless CMS with reusable page components for non-technical editors",
      "Full blog system with SEO optimization and dynamic routing",
      "App download funnels with smart popup timing",
      "Real-time preview and draft mode for editorial workflows",
      "Multi-variant hero sections for A/B testing",
      "ISR with 60-second revalidation for instant content updates",
    ],
    keyResults: [
      "Reusable page components give editors full layout control",
      "Content updates in minutes (was weeks)",
      "App download conversion improved significantly",
      "Marketing team operates independently of engineering",
    ],
    results: [
      { metric: "Page Components", value: "15+", numericValue: 15, suffix: "+" },
      { metric: "Content Speed", value: "10x", numericValue: 10, suffix: "x" },
      { metric: "Page Variants", value: "5+", numericValue: 5, suffix: "+" },
      { metric: "Blog Posts", value: "30+", numericValue: 30, suffix: "+" },
    ],
    beforeAfter: [
      { metric: "Content Updates", before: "1-2 weeks", after: "< 5 minutes", improvement: "99% faster" },
      { metric: "Developer Dependency", before: "Every change", after: "Zero", improvement: "100% independent" },
      { metric: "Page Variants", before: "1 static", after: "5+ testable", improvement: "5x flexibility" },
      { metric: "Blog System", before: "None", after: "Full CMS blog", improvement: "New capability" },
    ],
    timeline: [
      { phase: "Discovery", title: "CMS Architecture", description: "Designed the headless CMS schema, slice types, and content modeling strategy." },
      { phase: "Design", title: "Slice Library", description: "Built 15+ reusable content slices with Tailwind CSS and Framer Motion." },
      { phase: "Development", title: "Blog & Funnels", description: "Implemented the blog system, app download funnels, and ISR revalidation." },
      { phase: "Launch", title: "Preview & Publish", description: "Added real-time preview, draft mode, and production deployment pipeline." },
    ],
    timelineDuration: "4 months",
    teamSize: "3-person team",
    testimonial: { quote: "", author: "", role: "", company: "" },
    technologies: [
      "Next.js",
      "Prismic CMS",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "TypeScript",
    ],
    images: {
      dashboard: {
        src: "/images/stock/cs-fintech-hero.webp",
        width: 1200,
        height: 800,
      },
      mobile: {
        src: "/images/stock/cs-fintech-mobile.webp",
        width: 600,
        height: 800,
      },
    },
  },
  {
    slug: "ai-analysis-saas",
    title: "AI Analysis SaaS Platform",
    tagline: "Multi-Tool AI Analysis Platform",
    description:
      "A credit-based multi-tool AI SaaS platform that bundles four distinct analyzers under one authenticated product: a blood test report analyzer, a food image nutrition scanner, a general-purpose AI chat, and a Stripe-powered credit payment system.",
    industry: "AI / SaaS",
    challenge:
      "The client wanted to launch a consumer-facing AI product with multiple analysis tools, but building each tool as a separate app would be expensive and fragmented. They needed a unified platform with a credit-based monetization model, secure authentication, and the ability to rapidly add new AI analyzers.",
    solution:
      "We built a single Next.js application with a shared authentication layer, credit system, and conversation history. Each analyzer (blood test, food nutrition, general chat) is a self-contained module that shares the same Stripe payment infrastructure and user management. The credit system gates each analysis request.",
    impact:
      "The platform launched with 3 AI analyzers on day one, each powered by different LLM models for optimal accuracy. The credit system handles payments automatically, and the admin dashboard lets the team manage users and credits without touching code.",
    features: [
      "Blood test AI analyzer with PDF upload and conversational breakdown",
      "Food image nutrition AI with photo recognition and calorie estimation",
      "General-purpose AI chat with quick-start prompts",
      "Stripe credit-based payment system with automated billing",
      "Supabase authentication with OTP login",
      "Admin dashboard for user and credit management",
    ],
    keyResults: [
      "3 AI analyzers launched in a single unified platform",
      "Credit-based monetization with automated Stripe billing",
      "Multiple LLM models optimized per analyzer type",
      "Admin dashboard for zero-code user management",
    ],
    results: [
      { metric: "AI Analyzers", value: "3", numericValue: 3 },
      { metric: "LLM Models", value: "4+", numericValue: 4, suffix: "+" },
      { metric: "Auth Methods", value: "OTP", },
      { metric: "Payment System", value: "Stripe" },
    ],
    beforeAfter: [
      { metric: "Product Launch", before: "Separate apps", after: "Unified platform", improvement: "1 codebase" },
      { metric: "Monetization", before: "None", after: "Credit system", improvement: "Automated billing" },
      { metric: "User Auth", before: "Manual", after: "OTP + Supabase", improvement: "Secure & scalable" },
      { metric: "Admin Control", before: "Code changes", after: "Dashboard UI", improvement: "Zero-code" },
    ],
    timeline: [
      { phase: "Discovery", title: "Product Architecture", description: "Designed the multi-analyzer architecture, credit system, and authentication flow." },
      { phase: "Design", title: "AI Integration", description: "Integrated LangChain with Claude and Gemini for blood test, food, and chat analyzers." },
      { phase: "Development", title: "Platform Build", description: "Built the shared credit system, Stripe payments, conversation history, and admin dashboard." },
      { phase: "Launch", title: "Production Deploy", description: "Deployed with Supabase auth, Stripe live keys, and admin management tools." },
    ],
    timelineDuration: "6 months",
    teamSize: "4-person team",
    testimonial: { quote: "", author: "", role: "", company: "" },
    technologies: [
      "Next.js",
      "LangChain",
      "Anthropic Claude",
      "Google Gemini",
      "Supabase",
      "Stripe",
    ],
    images: {
      dashboard: {
        src: "/images/stock/cs-ai-hero.webp",
        width: 1200,
        height: 800,
      },
      mobile: {
        src: "/images/stock/cs-ai-mobile.webp",
        width: 600,
        height: 800,
      },
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
