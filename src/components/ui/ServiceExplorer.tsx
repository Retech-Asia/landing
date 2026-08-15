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
  Clock,
  UserCircle2,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { cn } from "@/lib/cn";
import { services } from "@/lib/services-data";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ProjectType {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  services: ServiceRecommendation[];
  timeline: string;
  teamSize: string;
}

interface ServiceRecommendation {
  slug: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  reason: string;
}

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const PROJECT_TYPES: ProjectType[] = [
  {
    id: "new-website",
    label: "New Website",
    description: "Launch a modern, responsive website or web platform",
    icon: Globe,
    timeline: "4 - 10 weeks",
    teamSize: "3 - 5 people",
    services: [
      {
        slug: "cms-platforms",
        title: "CMS Platforms",
        subtitle: "Content Management Made Easy",
        icon: Layout,
        reason: "Powers your content publishing and editorial workflows",
      },
      {
        slug: "ui-ux-design",
        title: "UI/UX Design",
        subtitle: "User-Centered Design",
        icon: Palette,
        reason: "Ensures an engaging, conversion-optimized user experience",
      },
      {
        slug: "web-development",
        title: "Web Development",
        subtitle: "Modern Web Applications",
        icon: Globe,
        reason: "Custom front-end and back-end engineering",
      },
    ],
  },
  {
    id: "mobile-app",
    label: "Mobile App",
    description: "Build a cross-platform or native mobile application",
    icon: Users,
    timeline: "8 - 16 weeks",
    teamSize: "4 - 6 people",
    services: [
      {
        slug: "web-development",
        title: "Web Development",
        subtitle: "Modern Web Applications",
        icon: Globe,
        reason: "Cross-platform mobile apps with PWA or React Native",
      },
      {
        slug: "ui-ux-design",
        title: "UI/UX Design",
        subtitle: "User-Centered Design",
        icon: Palette,
        reason: "Mobile-first design with intuitive touch interactions",
      },
      {
        slug: "dedicated-teams",
        title: "Dedicated Teams",
        subtitle: "Your Offshore Development Team",
        icon: UsersRound,
        reason: "Extended team capacity for ongoing mobile development",
      },
    ],
  },
  {
    id: "business-system",
    label: "Business System",
    description: "ERP, CRM, or custom internal tools for your operations",
    icon: BarChart3,
    timeline: "12 - 24 weeks",
    teamSize: "5 - 8 people",
    services: [
      {
        slug: "erp-solutions",
        title: "ERP Solutions",
        subtitle: "Insightful Dashboards",
        icon: BarChart3,
        reason: "Connects departments and streamlines operations",
      },
      {
        slug: "crm-systems",
        title: "CRM Systems",
        subtitle: "Customer-Centric Tools",
        icon: Users,
        reason: "Manages customer relationships and sales pipelines",
      },
      {
        slug: "web-development",
        title: "Web Development",
        subtitle: "Modern Web Applications",
        icon: Globe,
        reason: "Custom dashboards, APIs, and system integrations",
      },
    ],
  },
  {
    id: "design-refresh",
    label: "Design Refresh",
    description: "Modernize your existing product's look and feel",
    icon: Palette,
    timeline: "3 - 8 weeks",
    teamSize: "2 - 4 people",
    services: [
      {
        slug: "ui-ux-design",
        title: "UI/UX Design",
        subtitle: "User-Centered Design",
        icon: Palette,
        reason: "Research-backed redesign with usability testing",
      },
      {
        slug: "web-development",
        title: "Web Development",
        subtitle: "Modern Web Applications",
        icon: Globe,
        reason: "Implements the new design with clean, performant code",
      },
    ],
  },
  {
    id: "team-extension",
    label: "Team Extension",
    description: "Augment your in-house team with offshore talent",
    icon: UsersRound,
    timeline: "2 - 4 weeks to onboard",
    teamSize: "Flexible (1 - 10+ people)",
    services: [
      {
        slug: "dedicated-teams",
        title: "Dedicated Teams",
        subtitle: "Your Offshore Development Team",
        icon: UsersRound,
        reason: "Pre-vetted senior engineers, fully managed",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Locale dictionaries (EN | VI)                                      */
/* ------------------------------------------------------------------ */

// Canonical VI service names/subtitles, reused from services-data (keyed by
// the invariant EN slug) so widget labels stay in sync with service pages.
const SERVICE_VI: Record<string, { title: string; subtitle: string }> =
  Object.fromEntries(
    services.map((s) => [s.slug.en, { title: s.title.vi, subtitle: s.subtitle.vi }]),
  );

// EN slug → VI slug, so links keep VI users on /vi/dich-vu/... pages.
const SLUG_VI: Record<string, string> = Object.fromEntries(
  services.map((s) => [s.slug.en, s.slug.vi]),
);

interface SEStrings {
  step1of2: string;
  question: string;
  subheading: string;
  blueprint: string;
  approach: string;
  recommendedServices: string;
  core: string;
  viewService: string;
  startProject: string;
  startOver: string;
  backToSelection: string;
}

const SE_STRINGS: Record<"en" | "vi", SEStrings> = {
  en: {
    step1of2: "Step 1 of 2",
    question: "What are you building?",
    subheading:
      "Choose a project type and we'll map out the right services, timeline, and team.",
    blueprint: "Your Project Blueprint",
    approach: "Here's our recommended approach for your project.",
    recommendedServices: "Recommended Services",
    core: "Core",
    viewService: "View service",
    startProject: "Start This Project",
    startOver: "Start Over",
    backToSelection: "Back to selection",
  },
  vi: {
    step1of2: "Bước 1 / 2",
    question: "Bạn đang xây dựng gì?",
    subheading:
      "Chọn loại dự án và chúng tôi sẽ gợi ý dịch vụ, thời gian và đội ngũ phù hợp.",
    blueprint: "Kế hoạch Dự án của Bạn",
    approach: "Đây là hướng tiếp cận đề xuất cho dự án của bạn.",
    recommendedServices: "Dịch vụ Đề xuất",
    core: "Cốt lõi",
    viewService: "Xem dịch vụ",
    startProject: "Bắt đầu Dự án Này",
    startOver: "Bắt đầu lại",
    backToSelection: "Quay lại chọn dự án",
  },
};

// VI labels for project types, keyed by stable ids.
const PROJECT_TYPE_VI: Record<
  string,
  { label: string; description: string; timeline: string; teamSize: string }
> = {
  "new-website": {
    label: "Website Mới",
    description: "Ra mắt website hoặc nền tảng web hiện đại, responsive",
    timeline: "4 - 10 tuần",
    teamSize: "3 - 5 người",
  },
  "mobile-app": {
    label: "Ứng dụng Di động",
    description: "Xây dựng ứng dụng di động đa nền tảng hoặc native",
    timeline: "8 - 16 tuần",
    teamSize: "4 - 6 người",
  },
  "business-system": {
    label: "Hệ thống Nghiệp vụ",
    description: "ERP, CRM hoặc công cụ nội bộ tùy chỉnh cho vận hành của bạn",
    timeline: "12 - 24 tuần",
    teamSize: "5 - 8 người",
  },
  "design-refresh": {
    label: "Làm mới Thiết kế",
    description: "Hiện đại hóa giao diện và trải nghiệm sản phẩm hiện có",
    timeline: "3 - 8 tuần",
    teamSize: "2 - 4 người",
  },
  "team-extension": {
    label: "Mở rộng Đội ngũ",
    description: "Bổ sung nhân sự offshore cho đội ngũ nội bộ của bạn",
    timeline: "2 - 4 tuần để onboarding",
    teamSize: "Linh hoạt (1 - 10+ người)",
  },
};

// VI reasons per recommended service, keyed by `${projectId}:${slug}` — the
// same service carries a different reason per project type.
const SERVICE_REASON_VI: Record<string, string> = {
  "new-website:cms-platforms":
    "Nền tảng cho việc xuất bản nội dung và quy trình biên tập",
  "new-website:ui-ux-design":
    "Đảm bảo trải nghiệm người dùng hấp dẫn, tối ưu chuyển đổi",
  "new-website:web-development":
    "Kỹ thuật front-end và back-end theo yêu cầu",
  "mobile-app:web-development":
    "Ứng dụng di động đa nền tảng với PWA hoặc React Native",
  "mobile-app:ui-ux-design":
    "Thiết kế mobile-first với thao tác chạm trực quan",
  "mobile-app:dedicated-teams":
    "Năng lực đội ngũ mở rộng cho phát triển mobile liên tục",
  "business-system:erp-solutions":
    "Kết nối các phòng ban và tinh gọn vận hành",
  "business-system:crm-systems":
    "Quản lý quan hệ khách hàng và pipeline bán hàng",
  "business-system:web-development":
    "Dashboard, API và tích hợp hệ thống theo yêu cầu",
  "design-refresh:ui-ux-design":
    "Thiết kế lại dựa trên nghiên cứu kèm kiểm thử khả năng sử dụng",
  "design-refresh:web-development":
    "Triển khai thiết kế mới với code sạch, hiệu suất cao",
  "team-extension:dedicated-teams":
    "Kỹ sư senior đã qua sàng lọc, được quản lý trọn gói",
};

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const slideVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 80 : -80,
    scale: 0.96,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -80 : 80,
    scale: 0.96,
    transition: { duration: 0.25, ease: "easeIn" as const },
  }),
};

const cardHover = {
  scale: 1.02,
  borderColor: "rgba(32, 133, 53, 0.35)",
  transition: { duration: 0.2 },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ServiceExplorer() {
  const [step, setStep] = useState<0 | 1>(0); // 0 = select project, 1 = summary
  const [selected, setSelected] = useState<ProjectType | null>(null);
  const [direction, setDirection] = useState(1);

  const locale = useLocale();
  const isVi = locale === "vi";
  const t = SE_STRINGS[isVi ? "vi" : "en"];

  // Localized display text (falls back to EN data when VI is unmapped).
  const projectText = (
    p: ProjectType,
  ): { label: string; description: string; timeline: string; teamSize: string } =>
    isVi
      ? PROJECT_TYPE_VI[p.id] ?? {
          label: p.label,
          description: p.description,
          timeline: p.timeline,
          teamSize: p.teamSize,
        }
      : {
          label: p.label,
          description: p.description,
          timeline: p.timeline,
          teamSize: p.teamSize,
        };

  const svcTitle = (slug: string, fallback: string): string =>
    isVi ? SERVICE_VI[slug]?.title ?? fallback : fallback;

  const svcReason = (projectId: string, slug: string, fallback: string): string =>
    isVi ? SERVICE_REASON_VI[`${projectId}:${slug}`] ?? fallback : fallback;

  const pick = useCallback((project: ProjectType) => {
    setSelected(project);
    setDirection(1);
    setStep(1);
  }, []);

  const back = useCallback(() => {
    setDirection(-1);
    setStep(0);
  }, []);

  const restart = useCallback(() => {
    setDirection(-1);
    setSelected(null);
    setStep(0);
  }, []);

  const progress = step === 0 ? 33 : 100;

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
          {/* ---------- Step 1: Project Type Selection ---------- */}
          {step === 0 && (
            <motion.div
              key="select-project"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-brand mb-2">
                {t.step1of2}
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                {t.question}
              </h3>
              <p className="text-sm text-foreground-secondary mb-6">
                {t.subheading}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {PROJECT_TYPES.map((project) => {
                  const Icon = project.icon;
                  return (
                    <motion.button
                      key={project.id}
                      onClick={() => pick(project)}
                      whileHover={cardHover}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "group relative rounded-xl border border-card-border p-5 text-left",
                        "hover:bg-brand/[0.03] hover:border-brand/30",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40",
                        "transition-colors duration-200 cursor-pointer"
                      )}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand/10 text-brand">
                          <Icon size={20} />
                        </div>
                        <ChevronRight
                          size={16}
                          className="text-foreground-muted/40 group-hover:text-brand group-hover:translate-x-0.5 transition-all duration-200 mt-1"
                        />
                      </div>
                      <p className="text-sm font-semibold text-foreground mb-1">
                        {projectText(project).label}
                      </p>
                      <p className="text-xs text-foreground-secondary leading-relaxed">
                        {projectText(project).description}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ---------- Step 2: Summary Card ---------- */}
          {step === 1 && selected && (
            <motion.div
              key="summary"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {/* Header */}
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={20} className="text-brand" />
                <p className="text-xs font-semibold tracking-widest uppercase text-brand">
                  {t.blueprint}
                </p>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                {projectText(selected).label}
              </h3>
              <p className="text-sm text-foreground-secondary mb-6">
                {t.approach}
              </p>

              {/* Timeline & Team badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="inline-flex items-center gap-2 rounded-lg bg-brand/[0.06] border border-brand/10 px-3.5 py-2">
                  <Clock size={15} className="text-brand" />
                  <span className="text-sm font-medium text-foreground">
                    {projectText(selected).timeline}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-lg bg-accent-cyan/[0.06] border border-accent-cyan/10 px-3.5 py-2">
                  <UserCircle2 size={15} className="text-accent-cyan" />
                  <span className="text-sm font-medium text-foreground">
                    {projectText(selected).teamSize}
                  </span>
                </div>
              </div>

              {/* Recommended services flow */}
              <div className="space-y-0">
                {/* Connector label */}
                <p className="text-xs font-semibold tracking-widest uppercase text-foreground-muted mb-3">
                  {t.recommendedServices}
                </p>

                {/* Horizontal flow on desktop, vertical on mobile */}
                <div className="relative">
                  {/* Desktop: horizontal card flow */}
                  <div className="hidden md:flex items-stretch gap-0">
                    {selected.services.map((svc, idx) => {
                      const Icon = svc.icon;
                      const isFirst = idx === 0;
                      const accentColor =
                        idx % 3 === 0
                          ? "brand"
                          : idx % 3 === 1
                          ? "accent-cyan"
                          : "accent-violet";

                      return (
                        <div key={svc.slug} className="flex items-stretch flex-1">
                          {/* Connector arrow */}
                          {idx > 0 && (
                            <div className="flex items-center px-1">
                              <div className="w-4 h-px bg-black/[0.10]" />
                              <ArrowRight size={12} className="text-foreground-muted/40 -ml-0.5" />
                            </div>
                          )}
                          <Link
                            href={`/services/${isVi ? SLUG_VI[svc.slug] ?? svc.slug : svc.slug}`}
                            className="group flex-1 rounded-xl border border-card-border p-4 hover:border-brand/25 hover:bg-brand/[0.02] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
                          >
                            <div className="flex items-center gap-2.5 mb-2">
                              <div
                                className={cn(
                                  "flex items-center justify-center w-8 h-8 rounded-lg shrink-0",
                                  `bg-${accentColor}/10 text-${accentColor}`
                                )}
                              >
                                <Icon size={16} />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-foreground group-hover:text-brand transition-colors truncate">
                                  {svcTitle(svc.slug, svc.title)}
                                  {isFirst && (
                                    <span className="ml-1.5 inline-flex items-center rounded-full bg-brand/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand">
                                      {t.core}
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                            <p className="text-xs text-foreground-secondary leading-relaxed">
                              {svcReason(selected.id, svc.slug, svc.reason)}
                            </p>
                            <div className="mt-2 flex items-center gap-1 text-[11px] font-medium text-foreground-muted group-hover:text-brand transition-colors">
                              {t.viewService}
                              <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mobile: vertical card list */}
                  <div className="md:hidden space-y-3">
                    {selected.services.map((svc, idx) => {
                      const Icon = svc.icon;
                      const isFirst = idx === 0;
                      const accentColor =
                        idx % 3 === 0
                          ? "brand"
                          : idx % 3 === 1
                          ? "accent-cyan"
                          : "accent-violet";

                      return (
                        <Link
                          key={svc.slug}
                          href={`/services/${isVi ? SLUG_VI[svc.slug] ?? svc.slug : svc.slug}`}
                          className="group flex items-start gap-3.5 rounded-xl border border-card-border p-4 hover:border-brand/25 hover:bg-brand/[0.02] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
                        >
                          <div
                            className={cn(
                              "flex items-center justify-center w-9 h-9 rounded-lg shrink-0 mt-0.5",
                              `bg-${accentColor}/10 text-${accentColor}`
                            )}
                          >
                            <Icon size={17} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground group-hover:text-brand transition-colors">
                              {svcTitle(svc.slug, svc.title)}
                              {isFirst && (
                                <span className="ml-1.5 inline-flex items-center rounded-full bg-brand/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand">
                                  {t.core}
                                </span>
                              )}
                            </p>
                            <p className="text-xs text-foreground-secondary leading-relaxed mt-0.5">
                              {svcReason(selected.id, svc.slug, svc.reason)}
                            </p>
                          </div>
                          <ArrowRight
                            size={14}
                            className="text-foreground-muted/40 group-hover:text-brand shrink-0 mt-1 group-hover:translate-x-0.5 transition-all"
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* CTA + back */}
              <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <Link
                  href="/contact"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 cursor-pointer",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    "bg-brand text-white hover:bg-brand-light hover:shadow-[0_4px_20px_rgba(32,133,53,0.25)]",
                    "px-6 py-3 text-sm"
                  )}
                >
                  {t.startProject}
                  <ArrowRight size={16} />
                </Link>
                <button
                  onClick={restart}
                  className="inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded-lg px-3 py-2"
                >
                  <RotateCcw size={14} />
                  {t.startOver}
                </button>
              </div>

              {/* Back to selection */}
              <button
                onClick={back}
                className="mt-3 inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded-lg px-3 py-2"
              >
                <ArrowLeft size={14} />
                {t.backToSelection}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
