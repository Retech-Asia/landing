"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Layout,
  Users,
  BarChart3,
  Globe,
  Palette,
  UsersRound,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { cn } from "@/lib/cn";
import { services } from "@/lib/services-data";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface QuizOption {
  label: string;
  /** Slugs of recommended services keyed by this option */
  slugs: string[];
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

interface ServiceBrief {
  slug: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const QUESTIONS: QuizQuestion[] = [
  {
    id: "project",
    question: "What best describes your project?",
    options: [
      { label: "Website", slugs: ["cms-platforms", "web-development", "ui-ux-design"] },
      { label: "Internal Tool", slugs: ["crm-systems", "erp-solutions", "web-development"] },
      { label: "Mobile App", slugs: ["web-development", "ui-ux-design", "dedicated-teams"] },
      { label: "Business System", slugs: ["erp-solutions", "crm-systems"] },
      { label: "Design Refresh", slugs: ["ui-ux-design", "web-development"] },
      { label: "Team Extension", slugs: ["dedicated-teams"] },
    ],
  },
  {
    id: "goal",
    question: "What's your primary goal?",
    options: [
      { label: "Attract Customers", slugs: ["cms-platforms", "ui-ux-design", "web-development"] },
      { label: "Streamline Operations", slugs: ["erp-solutions", "crm-systems"] },
      { label: "Manage Data", slugs: ["erp-solutions", "crm-systems", "web-development"] },
      { label: "Improve UX", slugs: ["ui-ux-design", "web-development"] },
      { label: "Scale Development", slugs: ["dedicated-teams", "web-development"] },
    ],
  },
  {
    id: "timeline",
    question: "What's your timeline?",
    options: [
      { label: "ASAP", slugs: ["dedicated-teams", "cms-platforms"] },
      { label: "1\u20133 months", slugs: ["cms-platforms", "ui-ux-design", "web-development"] },
      { label: "3\u20136 months", slugs: ["crm-systems", "web-development", "erp-solutions"] },
      { label: "6+ months", slugs: ["erp-solutions", "dedicated-teams", "crm-systems"] },
    ],
  },
];

const SERVICES: ServiceBrief[] = [
  { slug: "cms-platforms", title: "CMS Platforms", subtitle: "Content Management Made Easy", icon: Layout },
  { slug: "crm-systems", title: "CRM Systems", subtitle: "Customer-Centric Tools", icon: Users },
  { slug: "erp-solutions", title: "ERP Solutions", subtitle: "Insightful Dashboards", icon: BarChart3 },
  { slug: "web-development", title: "Web Development", subtitle: "Modern Web Applications", icon: Globe },
  { slug: "ui-ux-design", title: "UI/UX Design", subtitle: "User-Centered Design", icon: Palette },
  { slug: "dedicated-teams", title: "Dedicated Teams", subtitle: "Your Offshore Development Team", icon: UsersRound },
];

/* ------------------------------------------------------------------ */
/*  Locale dictionaries (EN | VI)                                      */
/* ------------------------------------------------------------------ */

// Canonical VI service names/subtitles, reused from services-data (keyed by
// the invariant EN slug) so quiz results match the service pages exactly.
const SERVICE_VI: Record<string, { title: string; subtitle: string }> =
  Object.fromEntries(
    services.map((s) => [s.slug.en, { title: s.title.vi, subtitle: s.subtitle.vi }]),
  );

// EN slug → VI slug, so links keep VI users on /vi/dich-vu/... pages.
const SLUG_VI: Record<string, string> = Object.fromEntries(
  services.map((s) => [s.slug.en, s.slug.vi]),
);

interface SQStrings {
  stepOf: (n: number) => string;
  back: string;
  recommendedForYou: string;
  suggestHeading: string;
  matchBody: string;
  topPick: string;
  startOver: string;
}

const SQ_STRINGS: Record<"en" | "vi", SQStrings> = {
  en: {
    stepOf: (n) => `Step ${n} of 3`,
    back: "Back",
    recommendedForYou: "Recommended For You",
    suggestHeading: "Based on your answers, we suggest:",
    matchBody: "Here are the services that best match your project needs.",
    topPick: "Top Pick",
    startOver: "Start Over",
  },
  vi: {
    stepOf: (n) => `Bước ${n} / 3`,
    back: "Quay lại",
    recommendedForYou: "Đề xuất Dành cho Bạn",
    suggestHeading: "Dựa trên câu trả lời của bạn, chúng tôi gợi ý:",
    matchBody: "Đây là các dịch vụ phù hợp nhất với nhu cầu dự án của bạn.",
    topPick: "Gợi ý Hàng đầu",
    startOver: "Bắt đầu lại",
  },
};

// VI question text and option labels, keyed by stable question ids and the
// invariant EN option labels. Option slugs (recommendation logic) stay EN.
const QUESTION_VI: Record<string, { question: string; options: Record<string, string> }> = {
  project: {
    question: "Điều nào mô tả dự án của bạn tốt nhất?",
    options: {
      "Website": "Website",
      "Internal Tool": "Công cụ Nội bộ",
      "Mobile App": "Ứng dụng Di động",
      "Business System": "Hệ thống Nghiệp vụ",
      "Design Refresh": "Làm mới Thiết kế",
      "Team Extension": "Mở rộng Đội ngũ",
    },
  },
  goal: {
    question: "Mục tiêu chính của bạn là gì?",
    options: {
      "Attract Customers": "Thu hút Khách hàng",
      "Streamline Operations": "Tinh gọn Vận hành",
      "Manage Data": "Quản lý Dữ liệu",
      "Improve UX": "Cải thiện UX",
      "Scale Development": "Mở rộng Phát triển",
    },
  },
  timeline: {
    question: "Thời gian triển khai của bạn?",
    options: {
      "ASAP": "Càng sớm càng tốt",
      "1–3 months": "1–3 tháng",
      "3–6 months": "3–6 tháng",
      "6+ months": "6+ tháng",
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const stepVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ServiceQuiz() {
  const [step, setStep] = useState(0);           // 0,1,2 = questions; 3 = results
  const [answers, setAnswers] = useState<number[]>([]);
  const [direction, setDirection] = useState(1);

  const locale = useLocale();
  const isVi = locale === "vi";
  const t = SQ_STRINGS[isVi ? "vi" : "en"];

  // Localized question/option display text (falls back to EN when unmapped).
  const questionText = (q: QuizQuestion): string =>
    isVi ? QUESTION_VI[q.id]?.question ?? q.question : q.question;

  const optionText = (q: QuizQuestion, label: string): string =>
    isVi ? QUESTION_VI[q.id]?.options[label] ?? label : label;

  const svcTitle = (slug: string, fallback: string): string =>
    isVi ? SERVICE_VI[slug]?.title ?? fallback : fallback;

  const svcSubtitle = (slug: string, fallback: string): string =>
    isVi ? SERVICE_VI[slug]?.subtitle ?? fallback : fallback;

  /* Select an option on the current step */
  const pick = useCallback(
    (optionIndex: number) => {
      const next = [...answers, optionIndex];
      setAnswers(next);
      setDirection(1);
      setStep((s) => s + 1);
    },
    [answers],
  );

  /* Go back one step */
  const back = useCallback(() => {
    setDirection(-1);
    setAnswers((a) => a.slice(0, -1));
    setStep((s) => Math.max(0, s - 1));
  }, []);

  /* Restart */
  const restart = useCallback(() => {
    setDirection(-1);
    setAnswers([]);
    setStep(0);
  }, []);

  /* Compute recommendations by counting slug frequency across all answers */
  const recommendations = (() => {
    if (step < 3) return [];
    const counts: Record<string, number> = {};
    answers.forEach((optIdx, qIdx) => {
      const slugs = QUESTIONS[qIdx].options[optIdx].slugs;
      slugs.forEach((s) => {
        counts[s] = (counts[s] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([slug]) => SERVICES.find((s) => s.slug === slug)!)
      .filter(Boolean);
  })();

  /* Progress percentage */
  const progress = step >= 3 ? 100 : Math.round(((step + 1) / 3) * 100);

  return (
    <div className="relative rounded-2xl bg-card-bg border border-card-border shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] overflow-hidden">
      {/* Progress bar */}
      <div className="h-1 bg-black/[0.04]">
        <motion.div
          className="h-full bg-gradient-to-r from-brand to-accent-cyan origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <div className="p-6 md:p-10">
        <AnimatePresence mode="wait" custom={direction}>
          {/* ---------- Questions ---------- */}
          {step < 3 && (
            <motion.div
              key={`q-${step}`}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Step indicator */}
              <p className="text-xs font-semibold tracking-widest uppercase text-brand mb-2">
                {t.stepOf(step + 1)}
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">
                {questionText(QUESTIONS[step])}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {QUESTIONS[step].options.map((opt, i) => (
                  <button
                    key={opt.label}
                    onClick={() => pick(i)}
                    className={cn(
                      "group relative rounded-xl border border-card-border px-4 py-3.5 text-sm font-medium text-foreground-secondary",
                      "hover:border-brand/40 hover:text-foreground hover:bg-brand/[0.04]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40",
                      "transition-all duration-200 cursor-pointer text-center"
                    )}
                  >
                    {optionText(QUESTIONS[step], opt.label)}
                  </button>
                ))}
              </div>

              {/* Back button */}
              {step > 0 && (
                <button
                  onClick={back}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded-lg px-3 py-2"
                >
                  <ArrowLeft size={14} />
                  {t.back}
                </button>
              )}
            </motion.div>
          )}

          {/* ---------- Results ---------- */}
          {step >= 3 && recommendations.length > 0 && (
            <motion.div
              key="results"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={20} className="text-brand" />
                <p className="text-xs font-semibold tracking-widest uppercase text-brand">
                  {t.recommendedForYou}
                </p>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                {t.suggestHeading}
              </h3>
              <p className="text-sm text-foreground-secondary mb-6">
                {t.matchBody}
              </p>

              <div className="space-y-3">
                {recommendations.map((svc, idx) => {
                  const Icon = svc.icon;
                  return (
                    <Link
                      key={svc.slug}
                      href={`/services/${isVi ? SLUG_VI[svc.slug] ?? svc.slug : svc.slug}`}
                      className="group flex items-center gap-4 rounded-xl border border-card-border p-4 hover:border-brand/30 hover:bg-brand/[0.02] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center w-10 h-10 rounded-lg shrink-0",
                          idx === 0
                            ? "bg-brand/10 text-brand"
                            : idx === 1
                            ? "bg-accent-cyan/10 text-accent-cyan"
                            : "bg-accent-violet/10 text-accent-violet"
                        )}
                      >
                        <Icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground group-hover:text-brand transition-colors">
                          {svcTitle(svc.slug, svc.title)}
                          {idx === 0 && (
                            <span className="ml-2 inline-flex items-center rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand">
                              {t.topPick}
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-foreground-secondary">
                          {svcSubtitle(svc.slug, svc.subtitle)}
                        </p>
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-foreground-muted group-hover:text-brand transition-colors shrink-0"
                      />
                    </Link>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center gap-4">
                <button
                  onClick={restart}
                  className="inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded-lg px-3 py-2"
                >
                  <RotateCcw size={14} />
                  {t.startOver}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
