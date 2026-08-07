import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Mail, CheckCircle2, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { GridPattern } from "@/components/ui/GridPattern";
import { TeamCostCalculator } from "@/components/ui/TeamCostCalculator";
import { ROICalculator } from "@/components/ui/ROICalculator";
import { ServiceJsonLd, FAQJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ServiceTimeline } from "@/components/services/ServiceTimeline";
import { ServiceTOC, type TocItem } from "@/components/services/ServiceTOC";
import { AnimatedChecklist } from "@/components/services/AnimatedChecklist";
import { TechBadges } from "@/components/services/TechBadges";
import { services, getServiceBySlug, getFlatService, flattenService, type FlatService } from "@/lib/services-data";
import { caseStudies } from "@/lib/case-studies-data";
import { blogPosts } from "@/lib/blog-data";
import { getTestimonialBySlug } from "@/lib/testimonials-data";
import { SITE_URL } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";

/* ── Static Params ────────────────────────────────────────────── */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    services.map((service) => ({ locale, slug: service.slug[locale] }))
  );
}

/* ── Metadata ─────────────────────────────────────────────────── */
export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug, locale }) => {
    const loc = locale as Locale;
    const service = getFlatService(slug, loc);
    if (!service) {
      return { title: "Service Not Found" };
    }

    const pageUrl = `${SITE_URL}/${locale}/services/${service.slug}`;
    // Look up the raw service to find both locale slugs (the flat projection
    // only exposes the active locale's slug).
    const raw = getServiceBySlug(service.slug, loc);
    const enUrl = `${SITE_URL}/en/services/${raw?.slug.en ?? service.slug}`;
    const viUrl = `${SITE_URL}/vi/services/${raw?.slug.vi ?? service.slug}`;

    return {
      title: service.title,
      description: service.description.length > 155
        ? service.description.slice(0, 152).replace(/\s+\S*$/, "") + "..."
        : service.description,
      alternates: {
        canonical: pageUrl,
        // Both service locale variants exist post-Phase 2 — declare
        // bidirectional hreflang so Google indexes the right version.
        languages: {
          en: enUrl,
          vi: viUrl,
          "x-default": enUrl,
        },
      },
      openGraph: {
        title: `${service.title} | Retech Solutions`,
        description: service.description.length > 155
          ? service.description.slice(0, 152).replace(/\s+\S*$/, "") + "..."
          : service.description,
        url: pageUrl,
        type: "website",
        images: [
          {
            url: `/services/${service.slug}/opengraph-image`,
            width: 1200,
            height: 630,
            alt: `${service.title} - Retech Solutions`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${service.title} | Retech Solutions`,
        description: service.description.length > 155
          ? service.description.slice(0, 152).replace(/\s+\S*$/, "") + "..."
          : service.description,
        images: [`/services/${service.slug}/opengraph-image`],
      },
    };
  });
}

/* ── Checklist items per service ────────────────────────────────
 * Bilingual content (kept inline rather than moved to services-data.ts
 * because it's page-specific UI copy, not data-model content).
 */
const serviceChecklists: Record<string, { en: string[]; vi: string[] }> = {
  "cms-platforms": {
    en: [
      "Custom theme development",
      "Responsive & mobile-first design",
      "Security hardening & audits",
      "SEO setup & optimization",
      "Content workflow configuration",
      "Analytics integration",
      "Performance optimization",
      "Testing & QA",
      "Documentation & training",
      "30-day post-launch support",
    ],
    vi: [
      "Phát triển giao diện tùy chỉnh",
      "Thiết kế responsive mobile-first",
      "Tăng cường bảo mật & audit",
      "Thiết lập & tối ưu SEO",
      "Cấu hình quy trình nội dung",
      "Tích hợp analytics",
      "Tối ưu hiệu suất",
      "Kiểm thử & QA",
      "Tài liệu & đào tạo",
      "30 ngày hỗ trợ sau triển khai",
    ],
  },
  "crm-systems": {
    en: [
      "Custom CRM development",
      "Sales pipeline automation",
      "Data migration & deduplication",
      "Security & compliance audit",
      "Analytics dashboard setup",
      "Third-party integrations",
      "Testing & QA",
      "Documentation & training",
      "User onboarding sessions",
      "30-day post-launch support",
    ],
    vi: [
      "Phát triển CRM tùy chỉnh",
      "Tự động hóa pipeline bán hàng",
      "Di chuyển dữ liệu & khử trùng lặp",
      "Audit bảo mật & tuân thủ",
      "Thiết lập dashboard analytics",
      "Tích hợp bên thứ ba",
      "Kiểm thử & QA",
      "Tài liệu & đào tạo",
      "Phiên onboarding người dùng",
      "30 ngày hỗ trợ sau triển khai",
    ],
  },
  "erp-solutions": {
    en: [
      "Custom ERP modules",
      "Cross-department workflow automation",
      "Data governance & compliance setup",
      "Cloud deployment & scaling",
      "Mobile access configuration",
      "Performance optimization",
      "Testing & QA",
      "Documentation & training",
      "System integration",
      "30-day post-launch support",
    ],
    vi: [
      "Module ERP tùy chỉnh",
      "Tự động hóa quy trình xuyên phòng ban",
      "Thiết lập quản trị dữ liệu & tuân thủ",
      "Triển khai & mở rộng cloud",
      "Cấu hình truy cập mobile",
      "Tối ưu hiệu suất",
      "Kiểm thử & QA",
      "Tài liệu & đào tạo",
      "Tích hợp hệ thống",
      "30 ngày hỗ trợ sau triển khai",
    ],
  },
  "web-development": {
    en: [
      "Full-stack custom development",
      "Responsive & progressive web apps",
      "SEO-friendly architecture",
      "Security-first implementation",
      "Performance optimization",
      "Analytics integration",
      "Testing & QA",
      "Technical documentation",
      "Deployment & CI/CD setup",
      "30-day post-launch support",
    ],
    vi: [
      "Phát triển full-stack tùy chỉnh",
      "Responsive & progressive web apps",
      "Kiến trúc thân thiện SEO",
      "Triển khai bảo mật lên đầu",
      "Tối ưu hiệu suất",
      "Tích hợp analytics",
      "Kiểm thử & QA",
      "Tài liệu kỹ thuật",
      "Triển khai & thiết lập CI/CD",
      "30 ngày hỗ trợ sau triển khai",
    ],
  },
  "ui-ux-design": {
    en: [
      "User research & interviews",
      "Wireframing & prototyping",
      "Visual design & branding",
      "Interactive prototypes",
      "Usability testing",
      "Design system creation",
      "Accessibility audit (WCAG)",
      "Developer handoff package",
      "Iteration rounds",
      "30-day design support",
    ],
    vi: [
      "Nghiên cứu & phỏng vấn người dùng",
      "Wireframe & prototyping",
      "Thiết kế thị giác & branding",
      "Prototype tương tác",
      "Kiểm thử khả năng sử dụng",
      "Tạo design system",
      "Audit khả năng tiếp cận (WCAG)",
      "Gói bàn giao cho developer",
      "Vòng lặp lại",
      "30 ngày hỗ trợ thiết kế",
    ],
  },
  "dedicated-teams": {
    en: [
      "Pre-vetted senior talent",
      "Fully managed HR & payroll",
      "Agile process setup",
      "IP protection & NDAs",
      "Transparent weekly reporting",
      "Timezone-friendly overlap",
      "Infrastructure & equipment",
      "Performance tracking",
      "Team scaling flexibility",
      "Dedicated account manager",
    ],
    vi: [
      "Nhân sự senior đã sàng lọc",
      "HR & payroll được quản lý toàn diện",
      "Thiết lập quy trình agile",
      "Bảo vệ IP & NDA",
      "Báo cáo minh bạch hàng tuần",
      "Chồng lệch múi giờ",
      "Hạ tầng & thiết bị",
      "Theo dõi hiệu suất",
      "Linh hoạt mở rộng đội",
      "Account manager chuyên trách",
    ],
  },
};

/* ── Case study mapping per service ───────────────────────────── */
const serviceCaseStudyMap: Record<string, string[]> = {
  "cms-platforms": ["mining-analytics-platform"],
  "web-development": ["mining-analytics-platform"],
  "ui-ux-design": ["mining-analytics-platform", "asset-management-platform"],
  "crm-systems": ["asset-management-platform"],
  "erp-solutions": ["asset-management-platform"],
  "dedicated-teams": ["mining-analytics-platform", "asset-management-platform"],
};

/* ── Blog post mapping per service ────────────────────────────── */
const serviceBlogMap: Record<string, string[]> = {
  "cms-platforms": ["rise-of-headless-cms-separating-content-from-presentation", "cms-vs-crm-choosing-right-system-business"],
  "crm-systems": ["cms-vs-crm-choosing-right-system-business", "how-ai-transforming-custom-software-development"],
  "erp-solutions": ["erp-modernization-legacy-systems-migration-guide", "cloud-native-erp-microservices-architecture-future"],
  "web-development": ["nextjs-16-server-components-performance-guide", "rise-of-edge-computing-what-it-means-for-web-applications", "state-of-react-server-components-2026"],
  "ui-ux-design": ["building-accessible-websites-practical-guide-2026", "how-choose-right-tech-stack-next-project"],
  "dedicated-teams": ["building-offshore-development-team-practical-guide", "why-vietnam-top-it-outsourcing-destination-2026", "software-development-cost-comparison-vietnam-india-eastern-europe-2026"],
};

/* ── Page Component ───────────────────────────────────────────── */
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  const loc = locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "serviceDetail" });
  const service = getFlatService(slug, loc);

  if (!service) {
    notFound();
  }

  // Cross-reference maps (`serviceChecklists`, `serviceCaseStudyMap`,
  // `serviceBlogMap`) are keyed by invariant EN slug — same as service.id
  // for all services in services-data.ts. Use service.id, not the
  // locale-rendered slug, to look up.
  const lookupKey = service.id;
  const checklistItems = serviceChecklists[lookupKey]?.[loc] ?? [];
  const relatedCaseStudySlugs = serviceCaseStudyMap[lookupKey] ?? [];
  const relatedCaseStudies = caseStudies.filter((cs) =>
    relatedCaseStudySlugs.includes(cs.slug)
  );

  const relatedBlogSlugs = serviceBlogMap[lookupKey] ?? [];
  const relatedBlogPosts = blogPosts.filter((p) =>
    relatedBlogSlugs.includes(p.slug)
  );

  const currentIndex = services.findIndex((s) => s.id === service.id);
  const nextServiceRaw = services[(currentIndex + 1) % services.length];
  const otherServicesRaw = services.filter((s) => s.id !== service.id).slice(0, 3);
  // Flatten for rendering — these get the active locale's strings.
  const nextService: FlatService | null = nextServiceRaw ? flattenService(nextServiceRaw, loc) : null;
  const otherServices: FlatService[] = otherServicesRaw.map((s) => flattenService(s, loc));

  const testimonial = getTestimonialBySlug(slug);

  const pageUrl = `${SITE_URL}/services/${service.slug}`;

  // Build TOC items based on which sections will actually render
  const tocItems: TocItem[] = [
    { id: "overview", label: t("toc.overview") },
    { id: "features", label: t("toc.features") },
  ];
  if (checklistItems.length > 0) {
    tocItems.push({ id: "included", label: t("toc.included") });
  }
  if (testimonial) {
    tocItems.push({ id: "testimonial", label: t("toc.testimonial") });
  }
  tocItems.push({ id: "benefits", label: t("toc.benefits") });
  if (service.processSteps && service.processSteps.length > 0) {
    tocItems.push({ id: "process", label: t("toc.process") });
  }
  if (slug === "dedicated-teams") {
    tocItems.push({ id: "roi-calculator", label: "ROI Calculator" });
    tocItems.push({ id: "engagement-models", label: t("toc.engagementModels") });
  }
  tocItems.push({ id: "technologies", label: t("toc.technologies") });
  tocItems.push({ id: "faq", label: t("toc.faq") });

  return (
    <>
      {/* ── Structured Data ─────────────────────────────────── */}
      <ServiceJsonLd
        name={service.title}
        description={service.longDescription}
        url={pageUrl}
      />
      <FAQJsonLd questions={service.faq} />
      <BreadcrumbJsonLd
        items={[
          { name: t("breadcrumb.home"), url: SITE_URL },
          { name: t("breadcrumb.services"), url: `${SITE_URL}/services` },
          { name: service.title, url: pageUrl },
        ]}
      />

      {/* ── Hero Section ────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        {/* Gradient accent bar at the very top */}
        <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${service.heroAccent}`} aria-hidden="true" />

        <GradientBackground variant="hero" />
        <GridPattern className="opacity-50" />
        <div className="absolute inset-0 dot-pattern pointer-events-none opacity-30" aria-hidden="true" />
        <Container className="relative">
          <AnimatedSection variant="slideUp">
            <BreadcrumbNav
              items={[
                { label: t("breadcrumb.home"), href: "/" },
                { label: t("breadcrumb.services"), href: "/services" },
                { label: service.title },
              ]}
            />
          </AnimatedSection>

          <div className="max-w-3xl relative">
            {/* Mobile TOC disclosure — appears only on <lg screens where
                the sticky sidebar TOC is hidden. Uses native <details> so
                it works without JS and is keyboard/screen-reader accessible.
                Long service pages (this one is ~12700px tall) lose orientation
                on mobile without it. */}
            {tocItems.length > 0 && (
              <details className="lg:hidden group mb-8 rounded-xl border border-foreground/10 bg-card overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer list-none px-4 py-3 text-sm font-medium text-foreground select-none">
                  <span className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider text-foreground-secondary">{t("toc.onThisPage")}</span>
                  </span>
                  <svg
                    className="w-4 h-4 text-foreground-secondary transition-transform duration-200 group-open:rotate-180"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <ul className="px-4 pb-3 pt-1 space-y-1 border-t border-foreground/[0.06]">
                  {tocItems.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="block py-1.5 text-sm text-foreground-secondary hover:text-foreground transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            )}

            {/* Hero is intentionally typographic — no icon, no glow card,
                no decorative background glyph. This matches the
                Stripe/Linear/Vercel hero pattern where the headline carries
                the moment and icons are reserved for feature lists below
                the fold where they aid scannability. The previous
                lucide-in-glow-card read as a generic AI-template element. */}

            <AnimatedSection variant="slideUp" delay={0.06}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-3">
                {service.title}
              </h1>
            </AnimatedSection>

            <AnimatedSection variant="slideUp" delay={0.18}>
              <p className="text-lg font-medium text-foreground-muted mb-4">
                {service.subtitle}
              </p>
              {/* Gradient divider matching service accent */}
              <div className={`h-1 w-24 rounded-full bg-gradient-to-r ${service.heroAccent} mb-0`} />
            </AnimatedSection>

            <AnimatedSection variant="slideUp" delay={0.24}>
              <p className="text-lg text-foreground-secondary leading-relaxed max-w-2xl">
                {service.longDescription}
              </p>
            </AnimatedSection>

            <AnimatedSection variant="slideUp" delay={0.30}>
              <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
                <Button href="/contact" size="lg">
                  <Mail size={18} />
                  {t("hero.ctaConsult")}
                </Button>
                <Button href="/services" variant="secondary" size="lg">
                  <ArrowLeft size={18} />
                  {t("hero.ctaAllServices")}
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* ── Sidebar Layout: Features through FAQ ──────────── */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:flex lg:gap-12 lg:items-stretch">
          {/* Main content */}
          <div className="min-w-0 flex-1">

      {/* ── Overview (visual anchor near hero) ────────────── */}
      <div id="overview" className="scroll-mt-28" />

      {/* ── Features Grid ───────────────────────────────────── */}
      <section id="features" className="relative py-20 md:py-28 scroll-mt-28">
        <Container>
          <AnimatedSection variant="slideUp">
            <SectionHeader
              title={t("features.title", { service: service.title })}
              description={t("features.description")}
            />
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, i) => {
              const FeatureIcon = feature.icon;
              const colorClass = i % 3 === 0 ? "text-brand" : i % 3 === 1 ? "text-accent-cyan" : "text-accent-violet";
              return (
                <StaggerItem key={feature.title}>
                  <div className="rounded-2xl bg-white border border-black/[0.06] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] h-full transition-all duration-300 hover:border-black/[0.10] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5">
                    <FeatureIcon size={20} className={`${colorClass} mb-4`} />
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-foreground-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* Code/development visual strip — adds tangible "this is what we
          build" context between the features grid and the project timeline. */}
      <div className="relative h-[160px] md:h-[220px] overflow-hidden">
        <Image
          src="/images/stock/code-screen.webp"
          alt={t("imageAlts.codeStrip")}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Timeline section removed — was redundant with "How We Work"
          (Process Steps) below. Both covered the same phases (Discovery,
          Design, Build, Deploy). The timelineDuration field in the data
          already surfaces the time estimate in the hero. */}

      {/* ── What's Included Checklist ───────────────────────── */}
      {checklistItems.length > 0 && (
        <section id="included" className="relative py-20 md:py-28 overflow-hidden scroll-mt-28">
          <GradientBackground variant="subtle" />
          <Container className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <AnimatedSection variant="slideUp">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                  {t("included.title")}
                </h2>
                <p className="text-lg text-foreground-secondary leading-relaxed">
                  {t("included.body", { service: service.title.toLowerCase() })}
                </p>
              </AnimatedSection>

              <AnimatedChecklist items={checklistItems} />
            </div>
          </Container>
        </section>
      )}

      {/* ── Testimonial Section ─────────────────────────────── */}
      {testimonial && (
        <section id="testimonial" className="relative py-20 md:py-28 overflow-hidden scroll-mt-28">
          <Container className="relative">
            <AnimatedSection variant="slideUp">
              <div className="max-w-3xl mx-auto">
                <div className="relative rounded-2xl bg-white border border-black/[0.06] p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] border-l-4 border-l-brand">
                  <Quote
                    size={48}
                    className="text-brand/15 mb-4"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <blockquote className="text-lg md:text-xl text-foreground leading-relaxed italic mb-6">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand to-accent-violet flex items-center justify-center text-white font-bold text-sm">
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-foreground-secondary">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* ── Benefits Section ────────────────────────────────── */}
      <section id="benefits" className="relative py-20 md:py-28 overflow-hidden scroll-mt-28">
        <GradientBackground variant="subtle" />
        <Container className="relative">
          <AnimatedSection variant="slideUp">
            <SectionHeader
              title={t("benefits.title", { service: service.title })}
              description={t("benefits.description", { service: service.title.toLowerCase() })}
            />
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.benefits.map((benefit) => {
              return (
                <StaggerItem key={benefit.title}>
                  <div className="p-6 rounded-2xl border border-black/[0.06] bg-white/60 backdrop-blur-sm h-full">
                    <CheckCircle2 size={22} className="text-brand mb-4 shrink-0" />
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-foreground-secondary leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* Second image strip — developer workspace between Benefits and Process */}
      <div className="relative h-[160px] md:h-[220px] overflow-hidden">
        <Image
          src="/images/stock/developer-workspace.webp"
          alt={t("imageAlts.workspaceStrip")}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-background via-background/50 to-transparent" />
      </div>

      {/* ── How We Work (Process Steps) ───────────────────────── */}
      {service.processSteps && service.processSteps.length > 0 && (
        <section id="process" className="relative py-20 md:py-28 overflow-hidden scroll-mt-28">
          <Container>
            <AnimatedSection variant="slideUp">
              <SectionHeader
                title={t("process.title")}
                description={t("process.description")}
              />
            </AnimatedSection>

            <AnimatedSection variant="slideUp" delay={0.1}>
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  {/* Vertical connecting line */}
                  <div className="absolute left-[19px] top-6 bottom-6 w-px bg-gradient-to-b from-brand/30 via-accent-cyan/30 to-accent-violet/30" aria-hidden="true" />

                  <div className="flex flex-col gap-8">
                    {service.processSteps.map((step, i) => {
                      const stepColors = [
                        { dot: "from-brand to-brand-light", ring: "ring-brand/20", text: "text-brand", bg: "bg-brand/10" },
                        { dot: "from-accent-cyan to-brand", ring: "ring-accent-cyan/20", text: "text-accent-cyan", bg: "bg-accent-cyan/10" },
                        { dot: "from-accent-violet to-accent-cyan", ring: "ring-accent-violet/20", text: "text-accent-violet", bg: "bg-accent-violet/10" },
                        { dot: "from-brand-light to-accent-cyan", ring: "ring-brand/20", text: "text-brand", bg: "bg-brand/10" },
                        { dot: "from-accent-cyan to-accent-violet", ring: "ring-accent-cyan/20", text: "text-accent-cyan", bg: "bg-accent-cyan/10" },
                      ];
                      const colors = stepColors[i % stepColors.length];
                      return (
                        <div key={step.step} className="relative flex gap-5">
                          {/* Numbered dot */}
                          <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${colors.dot} ring-4 ${colors.ring} shadow-lg shrink-0`}>
                            <span className="text-sm font-bold text-white">{step.step}</span>
                          </div>

                          {/* Content */}
                          <div className="pt-1.5">
                            <h3 className="text-base font-semibold text-foreground mb-1.5">
                              {step.title}
                            </h3>
                            <p className="text-sm text-foreground-secondary leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* ── Team Cost Calculator (Dedicated Teams only) ────── */}
      {slug === "dedicated-teams" && <TeamCostCalculator />}

      {/* ── ROI Calculator (Dedicated Teams only) ────────── */}
      <div id="roi-calculator" className="scroll-mt-28" />
      {slug === "dedicated-teams" && <ROICalculator />}

      {/* ── Engagement Models (Dedicated Teams only) ────────── */}
      {slug === "dedicated-teams" && (
        <section id="engagement-models" className="relative py-20 md:py-28 scroll-mt-28">
          <Container>
            <AnimatedSection variant="slideUp">
              <SectionHeader
                title={t("engagement.title")}
                description={t("engagement.description")}
              />
            </AnimatedSection>

            {/* Model cards */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: t("engagement.models.staff.title"),
                  description: t("engagement.models.staff.description"),
                  price: t("engagement.models.staff.price"),
                  bestFor: t("engagement.models.staff.bestFor"),
                  featured: false,
                  key: "staff",
                },
                {
                  title: t("engagement.models.team.title"),
                  description: t("engagement.models.team.description"),
                  price: t("engagement.models.team.price"),
                  bestFor: t("engagement.models.team.bestFor"),
                  featured: true,
                  key: "team",
                },
                {
                  title: t("engagement.models.project.title"),
                  description: t("engagement.models.project.description"),
                  price: t("engagement.models.project.price"),
                  bestFor: t("engagement.models.project.bestFor"),
                  featured: false,
                  key: "project",
                },
              ].map((model) => (
                <StaggerItem key={model.key}>
                  <div
                    className={`relative h-full rounded-2xl bg-white border border-black/[0.06] p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-black/[0.10] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 ${
                      model.featured
                        ? "border-t-2 border-t-brand shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03),0_0_24px_rgba(32,133,53,0.08)]"
                        : "border-t-2 border-t-brand/40"
                    }`}
                  >
                    {model.featured && (
                      <span className="inline-block text-xs font-semibold uppercase tracking-wider text-brand bg-brand/10 rounded-full px-3 py-1 mb-4">
                        {t("engagement.mostPopular")}
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      {model.title}
                    </h3>
                    <p className="text-sm text-foreground-secondary leading-relaxed mb-4">
                      {model.description}
                    </p>
                    <p className="text-xs font-medium text-foreground-muted mb-4">
                      {t("engagement.bestForPrefix")} {model.bestFor}
                    </p>
                    <p className="text-sm font-semibold text-brand mt-auto">
                      {model.price}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Feature comparison table */}
            <AnimatedSection variant="slideUp" delay={0.15}>
              <div className="rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] overflow-hidden">
                <div className="px-6 py-4 border-b border-black/[0.06] bg-black/[0.015]">
                  <h3 className="text-base font-semibold text-foreground">
                    {t("engagement.compare.title")}
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-black/[0.08]">
                        <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-foreground-secondary whitespace-nowrap">
                          {t("engagement.compare.featureHeader")}
                        </th>
                        <th className="px-4 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-foreground whitespace-nowrap">
                          {t("engagement.models.staff.title")}
                        </th>
                        <th className="px-4 py-3.5 text-center whitespace-nowrap bg-brand/[0.04]">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
                            {t("engagement.models.team.title")}
                            <span className="text-[10px] bg-brand/10 text-brand px-1.5 py-0.5 rounded-full normal-case">{t("engagement.popular")}</span>
                          </span>
                        </th>
                        <th className="px-4 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-foreground whitespace-nowrap">
                          {t("engagement.models.project.title")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {([
                        [0, true, true, true],
                        [1, true, true, true],
                        [2, false, true, true],
                        [3, true, false, false],
                        [4, true, true, false],
                        [5, false, true, true],
                        [6, false, true, true],
                        [7, false, true, true],
                        [8, true, true, true],
                        [9, true, true, true],
                        [10, false, false, true],
                        [11, false, false, true],
                        [12, false, true, true],
                        [13, false, true, true],
                        [14, true, false, false],
                      ] as [number, boolean, boolean, boolean][]).map((row, rowIdx) => {
                        const labels = t.raw("engagement.comparisonRows") as string[];
                        return (
                        <tr
                          key={row[0]}
                          className="border-b border-black/[0.04] last:border-b-0"
                        >
                          <td className="px-5 py-3 font-medium text-foreground whitespace-nowrap text-sm">
                            {labels[row[0]]}
                          </td>
                          {[row[1], row[2], row[3]].map((isSupported, colIdx) => (
                            <td
                              key={colIdx}
                              className={cn(
                                "px-4 py-3 text-center",
                                // Highlight the "Popular" column (Dedicated Team = colIdx 1)
                                colIdx === 1 && "bg-brand/[0.03]"
                              )}
                            >
                              {isSupported ? (
                                <CheckCircle2 size={16} className="inline-block text-brand" />
                              ) : (
                                <span className="inline-block text-foreground-muted/30 text-sm select-none">
                                  &mdash;
                                </span>
                              )}
                            </td>
                          ))}
                        </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* ── Technologies Section ────────────────────────────── */}
      <section id="technologies" className="relative py-20 md:py-28 scroll-mt-28">
        <Container>
          <AnimatedSection variant="slideUp">
            <SectionHeader
              title={t("technologies.title")}
              description={t("technologies.description")}
            />
          </AnimatedSection>

          <TechBadges technologies={service.technologies} />
        </Container>
      </section>

      {/* ── FAQ Section ─────────────────────────────────────── */}
      <section id="faq" className="relative py-20 md:py-28 overflow-hidden scroll-mt-28">
        <GradientBackground variant="subtle" />
        <Container className="relative">
          <AnimatedSection variant="slideUp">
            <SectionHeader
              title={t("faq.title")}
              description={t("faq.description", { service: service.title.toLowerCase() })}
            />
          </AnimatedSection>

          <AnimatedSection variant="slideUp" delay={0.1}>
            <div className="max-w-3xl mx-auto rounded-2xl bg-white border border-black/[0.06] p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]">
              <Accordion items={service.faq} />
            </div>
          </AnimatedSection>
        </Container>
      </section>

          </div>{/* end main content */}

          {/* ── Sidebar — desktop only ──────────────────────── */}
          <aside className="hidden lg:block w-52 shrink-0">
            <div className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto pr-1 -mr-1">
              <ServiceTOC items={tocItems} />
            </div>
          </aside>
        </div>{/* end sidebar layout container */}
      </div>{/* end sidebar layout wrapper */}

      {/* ── Post-FAQ CTA Banner ─────────────────────────────── */}
      <section className="relative py-16 md:py-20">
        <Container>
          <AnimatedSection variant="slideUp">
            <div className="relative rounded-2xl bg-gradient-to-r from-brand/[0.06] via-accent-cyan/[0.04] to-brand/[0.06] border border-brand/[0.10] p-8 md:p-10 overflow-hidden">
              <div
                className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(32,133,53,0.06) 0%, transparent 70%)",
                }}
                aria-hidden="true"
              />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                    {t("postCta.title")}
                  </h2>
                  <p className="text-sm md:text-base text-foreground-secondary leading-relaxed max-w-lg">
                    {t("postCta.body", { service: service.title.toLowerCase() })}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <Button href="/contact" size="lg">
                    <Mail size={18} />
                    {t("postCta.cta")}
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* ── Related Case Studies ────────────────────────────── */}
      {relatedCaseStudies.length > 0 && (
        <section className="relative py-20 md:py-28">
          <Container>
            <AnimatedSection variant="slideUp">
              <SectionHeader
                title={t("related.caseStudies.title")}
                description={t("related.caseStudies.description")}
              />
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
              {relatedCaseStudies.map((cs) => (
                <StaggerItem key={cs.slug}>
                  <Link
                    href={`/case-studies/${cs.slug}`}
                    className="group block h-full"
                  >
                    <div className="relative h-full rounded-2xl bg-white border border-black/[0.06] p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-brand/15 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5">
                      <span className="inline-block text-xs font-semibold uppercase tracking-wider text-brand bg-brand/10 rounded-full px-3 py-1 mb-4">
                        {cs.industry}
                      </span>
                      <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-brand transition-colors">
                        {cs.title}
                      </h3>
                      <p className="text-sm text-foreground-secondary leading-relaxed mb-5">
                        {cs.tagline}
                      </p>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-2.5 transition-all duration-300">
                        {t("related.caseStudies.viewLink")}
                        <ArrowRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Container>
        </section>
      )}

      {/* ── Related Blog Posts ─────────────────────────────── */}
      {relatedBlogPosts.length > 0 && (
        <section className="relative py-20 md:py-28">
          <Container>
            <AnimatedSection variant="slideUp">
              <SectionHeader
                title={t("related.articles.title")}
                description={t("related.articles.description")}
              />
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {relatedBlogPosts.map((post) => (
                <StaggerItem key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block h-full"
                  >
                    <div className="relative h-full rounded-2xl bg-white border border-black/[0.06] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-black/[0.10] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5">
                      <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent-cyan bg-accent-cyan/10 rounded-full px-3 py-1 mb-4">
                        {post.category}
                      </span>
                      <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-brand transition-colors line-clamp-3">
                        {post.title}
                      </h3>
                      <p className="text-sm text-foreground-secondary leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-2.5 transition-all duration-300">
                        {t("related.articles.readLink")}
                        <ArrowRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <AnimatedSection variant="slideUp" delay={0.2} className="mt-10 text-center">
              <Button href="/blog" variant="secondary">
                {t("related.articles.viewAll")} <ArrowRight size={15} />
              </Button>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* ── Related Services ────────────────────────────────── */}
      <section className="relative py-20 md:py-28">
        <Container>
          <AnimatedSection variant="slideUp">
            <SectionHeader
              title={t("related.services.title")}
              description={t("related.services.description")}
            />
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {otherServices.map((related) => {
              const RelatedIcon = related.icon;
              return (
                <StaggerItem key={related.slug}>
                  <Link
                    href={`/services/${related.slug}`}
                    className="group block h-full"
                  >
                    <div className="relative h-full rounded-2xl bg-white border border-black/[0.06] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-black/[0.10] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5">
                      {/* Top gradient accent bar matching service color */}
                      <div className={`h-1 bg-gradient-to-r ${related.heroAccent}`} aria-hidden="true" />
                      <div className="p-6 md:p-8">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand/10 mb-5">
                          <RelatedIcon size={20} className="text-brand" />
                        </div>

                        <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-brand transition-colors">
                          {related.title}
                        </h3>
                        <p className="text-sm text-foreground-secondary leading-relaxed mb-5 line-clamp-3">
                          {related.description}
                        </p>

                        <div className="flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-2.5 transition-all duration-300">
                          {t("related.services.learnMore")}
                          <ArrowRight
                            size={15}
                            className="transition-transform duration-300 group-hover:translate-x-0.5"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── Next Service ─────────────────────────────────────── */}
      {nextService && (
        <section className="relative py-16 md:py-20 bg-background-subtle">
          <Container>
            <AnimatedSection variant="slideUp">
              <Link
                href={`/services/${nextService.slug}`}
                className="group flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto rounded-2xl bg-white border border-black/[0.06] p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-brand/15 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-center gap-4 text-center sm:text-left">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand/10 shrink-0">
                    {(() => {
                      const NextIcon = nextService.icon;
                      return <NextIcon size={24} className="text-brand" />;
                    })()}
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-foreground-muted mb-1">
                      {t("next.label")}
                    </p>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-brand transition-colors">
                      {nextService.title}
                    </h3>
                    <p className="text-sm text-foreground-secondary mt-1">
                      {nextService.subtitle}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-brand group-hover:gap-3 transition-all duration-300 shrink-0">
                  {t("next.explore")}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </Link>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* ── CTA Section ─────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 bg-brand-dark overflow-hidden">
        <Container className="relative z-10">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
                {t("finalCta.title", { service: service.title })}
              </h2>
              <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
                {t("finalCta.body", { service: service.title.toLowerCase() })}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  href="/contact"
                  size="lg"
                  className="bg-white text-foreground hover:bg-white/90"
                >
                  <Mail size={18} />
                  {t("finalCta.ctaPrimary")}
                </Button>
                <Button
                  href="/services"
                  variant="ghost"
                  size="lg"
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <ArrowLeft size={18} />
                  {t("finalCta.ctaSecondary")}
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
