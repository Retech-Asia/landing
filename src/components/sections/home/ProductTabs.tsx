"use client";

/**
 * Stripe-style tabbed product showcase.
 *
 * Replaces the AI visual strip on the homepage with a tabbed showcase
 * of real Retech work. Auto-rotates every 5s, pauses on hover, switches
 * on tab click. Each tab shows a different product preview (dashboard,
 * analytics, chat interface, multi-agent architecture).
 *
 * Pattern source: stripe.com index page hero showcase.
 * Why this works for Retech:
 *   - Shows real shipped work (proof, not claims)
 *   - Tab interaction = genuine engagement
 *   - Each preview is a real UI shape buyers recognize
 *   - Auto-rotation keeps the section alive without distracting from the hero
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

/* ── Tab definitions ── */

type Tab = {
  id: string;
  label: string;
  category: string;
  href: string;
  render: () => React.ReactNode;
};

const TABS: Tab[] = [
  {
    id: "investment-intelligence",
    label: "Investment Intelligence",
    category: "AI / Finance",
    href: "/case-studies/investment-intelligence-platform",
    render: () => <InvestmentIntelPreview />,
  },
  {
    id: "mining-analytics",
    label: "Mining Analytics",
    category: "Data Platform",
    href: "/case-studies/mining-analytics-platform",
    render: () => <MiningAnalyticsPreview />,
  },
  {
    id: "ai-analysis",
    label: "AI Analysis SaaS",
    category: "Multi-Tool AI",
    href: "/case-studies/ai-analysis-saas",
    render: () => <AIAnalysisPreview />,
  },
  {
    id: "multi-agent",
    label: "Multi-Agent System",
    category: "AI Architecture",
    href: "/blog/agentic-ai-autonomous-software-systems-2026",
    render: () => <MultiAgentPreview />,
  },
];

/* ── Preview components (each = a real Retech product surface) ── */

function PreviewShell({
  title,
  tech,
  children,
}: {
  title: string;
  tech: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-card-bg border border-card-border shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.08)] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-card-border bg-gradient-to-r from-brand/[0.03] to-accent-cyan/[0.02]">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
          <span className="text-xs font-semibold text-foreground">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          {tech.map((t) => (
            <span
              key={t}
              className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-foreground/[0.05] text-foreground-secondary"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function InvestmentIntelPreview() {
  return (
    <PreviewShell title="Investment Intelligence" tech={["LangChain", "pgvector", "Claude"]}>
      <div className="grid grid-cols-2 gap-4">
        {/* Left: portfolio chart */}
        <div>
          <p className="text-[10px] uppercase tracking-wider text-foreground-muted mb-1">
            Portfolio · 30D
          </p>
          <p className="text-xl font-bold text-foreground tabular-nums mb-2">
            $12.4M
          </p>
          <svg viewBox="0 0 200 50" className="w-full h-12">
            <defs>
              <linearGradient id="ii-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#208535" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#208535" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 40 Q 20 38, 30 32 T 60 28 Q 80 24, 100 18 T 140 14 Q 170 10, 200 6 L 200 50 L 0 50 Z"
              fill="url(#ii-fill)"
            />
            <path
              d="M 0 40 Q 20 38, 30 32 T 60 28 Q 80 24, 100 18 T 140 14 Q 170 10, 200 6"
              fill="none"
              stroke="#208535"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <p className="text-xs font-semibold text-brand mt-1 tabular-nums">
            +18.4%
          </p>
        </div>
        {/* Right: agent debate */}
        <div>
          <p className="text-[10px] uppercase tracking-wider text-foreground-muted mb-2">
            Agent Debate
          </p>
          <div className="space-y-1.5">
            {[
              { role: "Bull", color: "text-accent-cyan", text: "R&D up 24% QoQ." },
              { role: "Bear", color: "text-accent-violet", text: "P/E at 5y high." },
              { role: "Synth", color: "text-brand", text: "Hold, $185 target." },
            ].map((m) => (
              <div key={m.role} className="flex items-start gap-2 text-[11px]">
                <span className={`font-semibold shrink-0 ${m.color}`}>{m.role}:</span>
                <span className="text-foreground-secondary leading-tight">{m.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

function MiningAnalyticsPreview() {
  return (
    <PreviewShell title="Mining Analytics" tech={["Next.js", "FastAPI", "Postgres"]}>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-foreground-muted">
            Hashrate
          </p>
          <p className="text-lg font-bold text-foreground tabular-nums">1.24 EH/s</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-foreground-muted">
            BTC/Day
          </p>
          <p className="text-lg font-bold text-foreground tabular-nums">0.0847</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-foreground-muted">
            Uptime
          </p>
          <p className="text-lg font-bold text-foreground tabular-nums">99.94%</p>
        </div>
      </div>
      <div className="space-y-1.5">
        {[
          { pool: "F2Pool", load: 78, color: "from-brand to-accent-cyan" },
          { pool: "ViaBTC", load: 92, color: "from-accent-cyan to-brand" },
          { pool: "Binance", load: 64, color: "from-brand to-accent-cyan" },
        ].map((p) => (
          <div key={p.pool} className="flex items-center gap-3">
            <span className="text-[11px] font-medium text-foreground-secondary w-16 shrink-0">
              {p.pool}
            </span>
            <div className="flex-1 h-1.5 rounded-full bg-foreground/[0.05] overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${p.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${p.load}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </div>
            <span className="text-[11px] font-medium text-foreground-muted tabular-nums w-8 text-right">
              {p.load}%
            </span>
          </div>
        ))}
      </div>
    </PreviewShell>
  );
}

function AIAnalysisPreview() {
  return (
    <PreviewShell title="AI Analysis SaaS" tech={["Claude", "Gemini", "Supabase"]}>
      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-wider text-foreground-muted">
          Blood panel review
        </p>
        <div className="text-[11px] bg-foreground/[0.04] rounded-lg px-3 py-2 text-foreground-secondary">
          User: Vitamin D level 28 ng/mL, magnesium 1.6 mg/dL. Recommendations?
        </div>
        <div className="text-[11px] bg-brand/[0.06] border border-brand/15 rounded-lg px-3 py-2">
          <strong className="text-brand">Claude:</strong> Vitamin D borderline
          low (28 ng/mL, ref 30-100). Suggest 2000 IU D3 daily with K2. Mg
          within range but low-normal — consider 200mg glycinate at night.{" "}
          <span className="text-foreground-muted">Flagged for MD review.</span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-foreground-muted pt-1">
          <span>3 credits used · 12 remaining</span>
          <span className="text-brand">Powered by Claude 3.5 Sonnet</span>
        </div>
      </div>
    </PreviewShell>
  );
}

function MultiAgentPreview() {
  return (
    <PreviewShell title="Multi-Agent Architecture" tech={["LangGraph", "pgvector", "OpenAI"]}>
      <svg viewBox="0 0 400 180" className="w-full h-44">
        <defs>
          <linearGradient id="edge-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#208535" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {/* Edges */}
        {[
          [200, 20, 200, 60],
          [200, 60, 80, 120],
          [200, 60, 160, 130],
          [200, 60, 240, 130],
          [200, 60, 320, 120],
          [80, 120, 200, 160],
          [160, 130, 200, 160],
          [240, 130, 200, 160],
          [320, 120, 200, 160],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="url(#edge-grad)"
            strokeWidth="1.2"
          />
        ))}
        {/* Nodes */}
        {[
          { x: 200, y: 20, label: "Router", color: "#208535" },
          { x: 200, y: 60, label: "Orchestrator", color: "#208535" },
          { x: 80, y: 120, label: "Bull", color: "#06b6d4" },
          { x: 160, y: 130, label: "Bear", color: "#8b5cf6" },
          { x: 240, y: 130, label: "Tech", color: "#06b6d4" },
          { x: 320, y: 120, label: "Risk", color: "#8b5cf6" },
          { x: 200, y: 160, label: "Synthesizer", color: "#208535" },
        ].map((n) => (
          <g key={n.label}>
            <circle cx={n.x} cy={n.y} r="8" fill={n.color} opacity="0.9" />
            <circle
              cx={n.x}
              cy={n.y}
              r="12"
              fill="none"
              stroke={n.color}
              strokeWidth="1"
              opacity="0.3"
            />
            <text
              x={n.x}
              y={n.y + 22}
              textAnchor="middle"
              fontSize="9"
              fill="#3D3D4E"
              fontWeight="500"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </PreviewShell>
  );
}

/* ── Main component ── */

export function ProductTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setActiveTab((prev) => (prev + 1) % TABS.length);
  }, []);

  // Auto-rotate every 5s, pause on hover/focus
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  const activeProduct = TABS[activeTab];

  return (
    <section
      className="py-20 md:py-28 relative"
      aria-label="Product showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <Container>
        {/* Section header */}
        <div className="max-w-2xl mb-10 md:mb-14">
          <p className="text-sm font-medium text-brand mb-3">Real shipped work</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance tracking-tight">
            Products we have shipped for clients
          </h2>
          <p className="text-base md:text-lg text-foreground-secondary leading-relaxed">
            From RAG-powered investment research to multi-tool AI SaaS, these
            are real production systems running today. Click any tab to
            explore.
          </p>
        </div>

        {/* Tab strip */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-card-border pb-3">
          {TABS.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(i)}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 ${
                activeTab === i
                  ? "text-brand bg-brand/[0.06]"
                  : "text-foreground-secondary hover:text-foreground hover:bg-black/[0.03]"
              }`}
            >
              {tab.label}
              {activeTab === i && (
                <motion.div
                  layoutId="active-tab-indicator"
                  className="absolute -bottom-3 left-0 right-0 h-0.5 bg-brand rounded-full"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Active preview with crossfade transition */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-start">
          {/* Left: product info + link */}
          <div>
            <p className="text-xs uppercase tracking-wider text-foreground-muted mb-2">
              {activeProduct.category}
            </p>
            <h3 className="text-2xl font-bold text-foreground mb-3">
              {activeProduct.label}
            </h3>
            <p className="text-sm text-foreground-secondary leading-relaxed mb-5">
              {PRODUCT_DESCRIPTIONS[activeProduct.id]}
            </p>
            <Link
              href={activeProduct.href}
              className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:gap-3 transition-all py-2 -my-2 px-1 -mx-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded-sm"
            >
              View case study <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          {/* Right: live preview */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {activeProduct.render()}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}

/* ── Per-tab descriptions ── */

const PRODUCT_DESCRIPTIONS: Record<string, string> = {
  "investment-intelligence":
    "AI-powered investment research platform. Multi-agent debate over SEC filings, RAG retrieval of earnings transcripts, and a smart query router that picks the right retrieval path per question.",
  "mining-analytics":
    "Full-stack BTC mining operations dashboard. Multi-pool ingestion from F2Pool and ViaBTC, CoinGecko market pricing, and mempool difficulty projections for operators.",
  "ai-analysis":
    "Multi-tool AI SaaS platform. Blood test analyzer, food image nutrition AI, and general chat assistant sharing one auth, one Stripe credit system, and one LLM routing layer.",
  "multi-agent":
    "Multi-agent architecture for production AI. Query router classifies intent, orchestrator invokes the right specialists, synthesizer merges outputs into a single cited thesis.",
};
