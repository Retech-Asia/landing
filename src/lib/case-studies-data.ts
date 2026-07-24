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
    slug: "wellness-platform",
    title: "Wellness Platform",
    tagline: "Next-Generation Wellness Platform",
    description:
      "A lifestyle and wellness application designed to empower users with personalized health insights, real-time analytics, and an integrated Women's Health Card. The platform brings together modern technology and holistic wellness to help users take control of their health journey.",
    industry: "Health & Wellness",
    challenge:
      "The wellness industry lacked a unified platform that could provide personalized health insights while maintaining robust data security. Users were forced to juggle multiple apps for fitness tracking, nutrition monitoring, and health record management. The client needed a comprehensive solution that could consolidate these experiences into a single, intuitive interface while meeting strict healthcare data compliance requirements.",
    solution:
      "Retech Solutions designed and developed the wellness platform as a full-stack product with a modular architecture. We implemented a secure authentication system with enhanced credential protection, real-time health analytics powered by machine learning algorithms, and a personalized Women's Health Card feature. The platform features seamless cross-device synchronization, an intuitive dashboard for tracking wellness metrics, and a privacy-first approach to health data management.",
    impact:
      "The platform consolidated the fragmented wellness app market into a single, cohesive product that users trust with their most sensitive health data. The AI-powered insights engine drove sustained engagement gains, while the privacy-first architecture ensured full compliance with healthcare data regulations from day one. The platform has maintained a 4.8 App Store rating and continues to see growing user retention month over month.",
    features: [
      "Enhanced credential security with multi-factor authentication",
      "Personalized health insights powered by AI analytics",
      "Integrated Women's Health Card for comprehensive tracking",
      "Seamless cross-device login and data synchronization",
      "Real-time wellness metrics dashboard with trend visualization",
      "Privacy-first architecture with end-to-end data encryption",
    ],
    keyResults: [
      "99.9% data security compliance score achieved from launch",
      "User engagement increased 3.2x within the first quarter",
      "Average session duration grew from 2.1 minutes to 5.8 minutes",
      "4.8/5 App Store rating sustained across 10,000+ reviews",
    ],
    results: [
      { metric: "User Engagement", value: "3.2x increase", numericValue: 320, suffix: "% increase" },
      { metric: "Session Duration", value: "+47%", numericValue: 47, suffix: "%" },
      { metric: "Data Security Score", value: "99.9%", numericValue: 999, suffix: "%" },
      { metric: "App Store Rating", value: "4.8/5", numericValue: 48, suffix: "/5" },
    ],
    beforeAfter: [
      { metric: "User Engagement", before: "2.1 min avg session", after: "5.8 min avg session", improvement: "+176%" },
      { metric: "Page Load Time", before: "4.2s", after: "1.1s", improvement: "-74%" },
      { metric: "Mobile Conversion", before: "1.2%", after: "3.8%", improvement: "+217%" },
      { metric: "User Retention", before: "22%", after: "51%", improvement: "+132%" },
    ],
    timeline: [
      { phase: "Phase 1", title: "Discovery", description: "User research, competitive analysis, and wellness industry compliance mapping to define platform requirements." },
      { phase: "Phase 2", title: "Design", description: "Wireframing and prototyping of the unified wellness dashboard, health card flows, and cross-device experience." },
      { phase: "Phase 3", title: "Development", description: "Full-stack implementation with React Native, ML-powered analytics engine, and end-to-end encryption layer." },
      { phase: "Phase 4", title: "Launch", description: "Phased rollout with beta testing, App Store optimization, and continuous performance monitoring." },
    ],
    timelineDuration: "8 months",
    teamSize: "6-person team",
    testimonial: {
      quote: "",
      author: "",
      role: "",
      company: "",
    },
    technologies: [
      "React Native",
      "Node.js",
      "PostgreSQL",
      "AWS",
      "Machine Learning",
      "REST API",
    ],
    images: {
      dashboard: {
        src: "/images/stock/cs-wellness-dashboard.webp",
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
      "A comprehensive web-based investment management system with interconnected admin, customer, and introducer portals for scalable financial operations. The platform streamlines complex investment workflows while providing real-time portfolio visibility across all stakeholder roles.",
    industry: "Finance",
    challenge:
      "The client was managing investment operations through fragmented spreadsheets and disconnected legacy systems, leading to slow reporting, manual errors, and limited scalability. They needed a unified platform that could serve three distinct user roles — administrators, investors, and introducers — with role-based access control, real-time portfolio tracking, and regulatory compliance built in from the ground up.",
    solution:
      "Retech Solutions built a multi-portal architecture with a shared backend that serves administrators, customers, and introducers through tailored interfaces. We implemented real-time portfolio tracking with live market data integration, secure document management for compliance workflows, automated reporting with customizable templates, and a role-based access control system that meets financial regulatory standards. The platform was designed for horizontal scalability to support the client's growth trajectory.",
    impact:
      "The unified platform eliminated manual spreadsheet-driven workflows and replaced them with automated, auditable processes that scale with the business. Administrators gained real-time visibility across all portfolios, investors received transparent performance reporting, and introducers could track commissions without manual follow-ups. The 60% improvement in operational efficiency freed the team to focus on strategic growth rather than data reconciliation.",
    features: [
      "Multi-portal architecture with role-based access control",
      "Real-time portfolio tracking and market data integration",
      "Secure document management for compliance workflows",
      "Automated reporting with customizable templates",
      "Introducer management and commission tracking system",
      "Bank-grade security with audit trail logging",
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
      { phase: "Phase 3", title: "Development", description: "Multi-portal architecture build with real-time market data integration, automated reporting, and bank-grade security." },
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
      "React",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "AWS",
      "WebSocket",
      "Docker",
    ],
    images: {
      dashboard: {
        src: "/images/stock/cs-asset-dashboard.webp",
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
        src: "/images/stock/cs-intel-dashboard.webp",
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
      "A content-driven marketing website for a consumer fintech card product, built with a headless CMS architecture. The platform features 15+ reusable content slices, a full blog system, app download funnels, and real-time preview editing for non-technical marketing teams.",
    industry: "Consumer Fintech",
    challenge:
      "The marketing team needed a website that could launch new campaigns in hours, not weeks. Their existing setup required developer involvement for every content change, creating bottlenecks and slowing go-to-market. They needed a headless CMS with pre-built slice components, blog functionality, and app download optimization.",
    solution:
      "We built a Next.js frontend powered by a headless CMS with 15+ custom slice types. Marketing teams can compose pages from reusable components, preview changes in real-time, and publish instantly. The blog system supports SEO-optimized content with automatic sitemap generation.",
    impact:
      "Content updates that previously required a developer now take minutes. The marketing team ships campaigns independently, blog posts publish on schedule, and the app download funnel converts at a higher rate thanks to optimized CTAs.",
    features: [
      "Headless CMS with 15+ custom slice types for page composition",
      "Full blog system with SEO optimization and dynamic routing",
      "App download funnels with smart popup timing",
      "Real-time preview and draft mode for non-technical editors",
      "Multi-variant hero sections for A/B testing",
      "ISR with 60-second revalidation for instant content updates",
    ],
    keyResults: [
      "15+ reusable content slices for page composition",
      "Content updates in minutes (was weeks)",
      "App download conversion improved significantly",
      "Marketing team operates independently of engineering",
    ],
    results: [
      { metric: "Content Slices", value: "15+", numericValue: 15, suffix: "+" },
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
        src: "/images/stock/cs-fintech-dashboard.webp",
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
        src: "/images/stock/cs-ai-dashboard.webp",
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
