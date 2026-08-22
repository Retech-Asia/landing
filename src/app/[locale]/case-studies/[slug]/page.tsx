import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Layers,
  AlertTriangle,
  Sparkles,
  Clock,
  Users,
  Wrench,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { TiltCard } from "@/components/ui/TiltCard";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { caseStudies, getCaseStudy, getFlatCaseStudy, flattenCaseStudy, type FlatCaseStudy } from "@/lib/case-studies-data";
import { services } from "@/lib/services-data";
import { blogPosts } from "@/lib/blog-data";
import { getBlogMeta } from "@/lib/blog-i18n";
import { BLUR_DATA_URL } from "@/lib/image-placeholders";
import {
  WebPageJsonLd,
  BreadcrumbJsonLd,
  CaseStudyJsonLd,
} from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/constants";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { AnimatedMetrics } from "@/components/case-studies/AnimatedMetrics";
import { BeforeAfter } from "@/components/case-studies/BeforeAfter";
import { ProjectTimeline } from "@/components/case-studies/ProjectTimeline";
import {
  HeroParallaxSection,
  TechPillsStagger,
  TestimonialCard,
  BeforeAfterDivider,
} from "./CaseStudyClientComponents";

// Locale-aware chrome strings. Case study content comes from the
// bilingual data via getFlatCaseStudy; only page chrome lives here.
function getChrome(locale: string) {
  const isEn = locale === "en";
  return isEn
    ? {
        storyTitle: "The Story Behind the Build",
        storyLead: (title: string) =>
          `From problem to lasting impact: how we approached ${title} end to end.`,
        challengeTitle: "The Challenge",
        solutionTitle: "Our Solution",
        impactTitle: "The Impact",
        keyResultsTitle: "Key Results",
        keyResultsLead: (title: string) =>
          `Concrete outcomes that made the difference for ${title}.`,
        projectDetailsTitle: "Project Details",
        timelineLabel: "Timeline",
        teamSizeLabel: "Team Size",
        technologiesLabel: "Technologies",
        coreTools: (count: number) => `${count} core tools`,
        whatWeBuilt: "What We Built",
        projectTimelineTitle: "Project Timeline",
        projectTimelineLead:
          "From initial discovery to successful launch: our proven delivery process.",
        measurableImpact: "Measurable Impact",
        beforeAfterTitle: "Before & After",
        beforeAfterLead: (title: string) =>
          `A clear picture of how ${title} improved after our collaboration.`,
        outcomesLabel: "Outcomes",
        keyResultsDelivered: "Key Results Delivered",
        builtWith: "Built With",
        relatedServicesTitle: "Services Used in This Project",
        relatedServicesDescription:
          "The expertise behind this successful delivery.",
        learnMore: "Learn More",
        viewCaseStudy: "View Case Study",
        readMoreTitle: "Read More",
        readMoreDescription: "Articles and insights related to this project.",
        readArticle: "Read Article",
        viewAllArticles: "View All Articles",
        ctaTitle: "Want Results Like These?",
        ctaBody:
          "Get a free project estimate within 24 hours. Tell us about your vision and we will map out the right solution, team, and timeline.",
        ctaPrimary: "Get Your Free Estimate",
        ctaSecondary: "All Case Studies",
      }
    : {
        storyTitle: "Câu chuyện Phía sau Sản phẩm",
        storyLead: (title: string) =>
          `Từ vấn đề đến tác động lâu dài: cách chúng tôi tiếp cận ${title} từ đầu đến cuối.`,
        challengeTitle: "Thách thức",
        solutionTitle: "Giải pháp",
        impactTitle: "Tác động",
        keyResultsTitle: "Kết quả Chính",
        keyResultsLead: (title: string) =>
          `Những kết quả cụ thể tạo nên khác biệt cho ${title}.`,
        projectDetailsTitle: "Thông tin Dự án",
        timelineLabel: "Thời gian",
        teamSizeLabel: "Quy mô Đội ngũ",
        technologiesLabel: "Công nghệ",
        coreTools: (count: number) => `${count} công cụ chính`,
        whatWeBuilt: "Chúng tôi đã Xây dựng",
        projectTimelineTitle: "Lộ trình Dự án",
        projectTimelineLead:
          "Từ khám phá ban đầu đến ra mắt thành công: quy trình bàn giao đã được kiểm chứng của chúng tôi.",
        measurableImpact: "Kết quả Đo lường được",
        beforeAfterTitle: "Trước & Sau",
        beforeAfterLead: (title: string) =>
          `Bức tranh rõ ràng về cách ${title} cải thiện sau khi hợp tác với chúng tôi.`,
        outcomesLabel: "Kết quả",
        keyResultsDelivered: "Kết quả đã Đạt được",
        builtWith: "Xây dựng bằng",
        relatedServicesTitle: "Dịch vụ trong Dự án này",
        relatedServicesDescription:
          "Chuyên môn đứng sau lần bàn giao thành công này.",
        learnMore: "Tìm hiểu thêm",
        viewCaseStudy: "Xem Dự án",
        readMoreTitle: "Đọc thêm",
        readMoreDescription:
          "Các bài viết và chia sẻ liên quan đến dự án này.",
        readArticle: "Đọc Bài viết",
        viewAllArticles: "Xem Tất cả Bài viết",
        ctaTitle: "Muốn Có Kết quả Như Vậy?",
        ctaBody:
          "Nhận báo giá dự án miễn phí trong vòng 24 giờ. Hãy chia sẻ tầm nhìn của bạn và chúng tôi sẽ đề xuất giải pháp, đội ngũ và lộ trình phù hợp.",
        ctaPrimary: "Nhận Báo giá Miễn phí",
        ctaSecondary: "Tất cả Dự án",
      };
}

/* ── Case study to services mapping ─────────────────────────── */
const caseStudyServiceMap: Record<string, string[]> = {
  "mining-analytics-platform": ["web-development", "ui-ux-design", "dedicated-teams"],
  "asset-management-platform": ["crm-systems", "erp-solutions", "ui-ux-design", "dedicated-teams"],
};

/* ── Case study to blog posts mapping ─────────────────────── */
const caseStudyBlogMap: Record<string, string[]> = {
  "mining-analytics-platform": ["nextjs-16-server-components-performance-guide", "why-typescript-became-default-enterprise-development"],
  "asset-management-platform": ["erp-modernization-legacy-systems-migration-guide", "cloud-native-erp-microservices-architecture-future", "cms-vs-crm-choosing-right-system-business"],
};

function CaseStudyImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (!src) {
    return (
      <div
        className={`relative rounded-lg bg-gradient-to-br from-cyan-500/20 via-violet-500/20 to-cyan-500/10 flex items-center justify-center ${className ?? ""}`}
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10 rounded-lg" />
        <div className="relative text-foreground-muted/40 text-sm font-medium tracking-wide uppercase">
          {alt.split(" \u2014 ")[0]}
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      sizes={sizes}
    />
  );
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    caseStudies.map((study) => ({ locale, slug: study.slug[locale] }))
  );
}

// All valid locale+slug combos are enumerated above — anything else 404s
// statically. Without this, unknown slugs render on demand and notFound()
// streams after the 200 headers (soft-404, bad for SEO).
export const dynamicParams = false;

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug, locale }) => {
    const loc = locale as Locale;
    const study = getFlatCaseStudy(slug, loc);
    if (!study) {
      // Throw before metadata resolves (not just in the page body) —
      // otherwise headers stream with 200 and the not-found page renders
      // under a 200 status.
      notFound();
    }

    const pageUrl = `${SITE_URL}/${locale}/case-studies/${study.slug}`;
    const raw = getCaseStudy(study.slug, loc);
    const enUrl = `${SITE_URL}/en/case-studies/${raw?.slug.en ?? study.slug}`;
    const viUrl = `${SITE_URL}/vi/case-studies/${raw?.slug.vi ?? study.slug}`;
    // OG image routes live under /[locale]/... and are statically generated
    // per locale — reference the current locale's variant so the URL resolves.
    const ogImageUrl = `/${locale}/case-studies/${study.slug}/opengraph-image`;

    // Locale-aware title — VI keeps "Dự án" (matches the VI listing page
    // "Dự án Thực tế") instead of the English "Case Study" suffix.
    const pageTitle = loc === "vi"
      ? `${study.title} | Dự án`
      : `${study.title} Case Study`;
    const ogTitle = loc === "vi"
      ? `${study.title} | Retech Solutions`
      : `${study.title} Case Study | Retech Solutions`;

    return {
      title: pageTitle,
      description: study.description.length > 155
        ? study.description.slice(0, 152).replace(/\s+\S*$/, "") + "..."
        : study.description,
      alternates: {
        canonical: pageUrl,
        languages: {
          en: enUrl,
          vi: viUrl,
          "x-default": enUrl,
        },
      },
      openGraph: {
        title: ogTitle,
        description: study.description.length > 155
          ? study.description.slice(0, 152).replace(/\s+\S*$/, "") + "..."
          : study.description,
        url: pageUrl,
        // "article" enables rich social cards (author, publish date, etc.)
        // — case studies are time-published content, not landing pages.
        type: "article",
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: `${study.title} Case Study - Retech Solutions`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: ogTitle,
        description: study.description.length > 155
          ? study.description.slice(0, 152).replace(/\s+\S*$/, "") + "..."
          : study.description,
        images: [ogImageUrl],
      },
    };
  });
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  const loc = locale as Locale;
  setRequestLocale(locale);
  const chrome = getChrome(locale);
  const study = getFlatCaseStudy(slug, loc);

  if (!study) {
    notFound();
  }

  const relatedStudyRaw = caseStudies.find((cs) => cs.id !== study.id);
  const relatedStudy: FlatCaseStudy | null = relatedStudyRaw
    ? flattenCaseStudy(relatedStudyRaw, loc)
    : null;
  const relatedServiceSlugs = caseStudyServiceMap[study.id] ?? [];
  const relatedServices = services.filter((s) =>
    relatedServiceSlugs.includes(s.slug.en)
  );
  const relatedBlogSlugs = caseStudyBlogMap[study.id] ?? [];
  const relatedBlogs = blogPosts.filter((p) =>
    relatedBlogSlugs.includes(p.slug)
  );
  const pageUrl = `${SITE_URL}/${locale}/case-studies/${study.slug}`;

  return (
    <>
      {/* Structured Data */}
      <WebPageJsonLd
        title={
          loc === "vi" ? `${study.title} | Dự án` : `${study.title} Case Study`
        }
        description={study.description}
        url={pageUrl}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE_URL}/${locale}` },
          { name: "Case Studies", url: `${SITE_URL}/${locale}/case-studies` },
          { name: study.title, url: pageUrl },
        ]}
      />
      <CaseStudyJsonLd study={study} url={pageUrl} />

      {/* Hero with Parallax */}
      <HeroParallaxSection
        industry={study.industry}
        title={study.title}
        tagline={study.tagline}
        description={study.description}
        locale={locale}
      />

      {/* Project hero image — full-width, single image, no side-by-side */}
      <section className="relative">
        <div className="relative h-[300px] md:h-[480px] overflow-hidden">
          <Image
            src={study.images.dashboard.src}
            alt={study.title}
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0">
            <Container>
              <div className="pb-8">
                <span className="inline-block px-3 py-1 rounded-full bg-brand/15 border border-brand/20 text-xs font-medium text-brand-dark tracking-wide mb-3">
                  {study.industry}
                </span>
                <p className="text-sm md:text-base text-foreground-secondary max-w-2xl">
                  {study.tagline}
                </p>
              </div>
            </Container>
          </div>
        </div>
      </section>

      {/* Challenge → Solution → Impact Narrative */}
      <section className="py-20 md:py-28 bg-background-subtle overflow-hidden">
        <Container>
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {chrome.storyTitle}
              </h2>
              <p className="mt-3 text-foreground-secondary max-w-2xl mx-auto">
                {chrome.storyLead(study.title)}
              </p>
            </div>
          </AnimatedSection>

          <div className="relative max-w-5xl mx-auto">
            {/* Vertical connector line (desktop) */}
            <div
              className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-amber-500/30 via-brand/30 to-accent-cyan/30"
              aria-hidden="true"
            />

            {/* Challenge */}
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-8 lg:mb-0">
              <AnimatedSection variant="slideRight" className="lg:py-8">
                <Card hover={false} padding="lg" className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/10 shrink-0">
                      <AlertTriangle size={20} className="text-amber-600" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      {chrome.challengeTitle}
                    </h3>
                  </div>
                  <p className="text-foreground-secondary leading-relaxed">
                    {study.challenge}
                  </p>
                </Card>
              </AnimatedSection>

              {/* Connector dot (desktop) */}
              <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10" aria-hidden="true">
                <div className="w-4 h-4 rounded-full bg-amber-500/40 border-2 border-white shadow-sm" />
              </div>

              <div className="hidden lg:block" />
            </div>

            {/* Arrow connector */}
            <div className="flex justify-center my-2 lg:my-0" aria-hidden="true">
              <div className="w-px h-6 lg:h-8 bg-gradient-to-b from-amber-500/20 to-brand/30" />
            </div>

            {/* Solution */}
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-8 lg:mb-0">
              <div className="hidden lg:block" />

              {/* Connector dot (desktop) */}
              <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10" aria-hidden="true">
                <div className="w-4 h-4 rounded-full bg-brand/40 border-2 border-white shadow-sm" />
              </div>

              <AnimatedSection variant="slideLeft" className="lg:py-8">
                <Card hover={false} padding="lg" className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand/10 shrink-0">
                      <Layers size={20} className="text-brand" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      {chrome.solutionTitle}
                    </h3>
                  </div>
                  <p className="text-foreground-secondary leading-relaxed">
                    {study.solution}
                  </p>
                </Card>
              </AnimatedSection>
            </div>

            {/* Arrow connector */}
            <div className="flex justify-center my-2 lg:my-0" aria-hidden="true">
              <div className="w-px h-6 lg:h-8 bg-gradient-to-b from-brand/30 to-accent-cyan/20" />
            </div>

            {/* Impact */}
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
              <AnimatedSection variant="slideRight" className="lg:py-8">
                <Card hover={false} padding="lg" className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent-cyan/10 shrink-0">
                      <Sparkles size={20} className="text-accent-cyan" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      {chrome.impactTitle}
                    </h3>
                  </div>
                  <p className="text-foreground-secondary leading-relaxed">
                    {study.impact}
                  </p>
                </Card>
              </AnimatedSection>

              {/* Connector dot (desktop) */}
              <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10" aria-hidden="true">
                <div className="w-4 h-4 rounded-full bg-accent-cyan/40 border-2 border-white shadow-sm" />
              </div>

              <div className="hidden lg:block" />
            </div>
          </div>
        </Container>
      </section>

      {/* Key Results Highlight Row */}
      <section className="py-20 md:py-28">
        <Container>
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {chrome.keyResultsTitle}
              </h2>
              <p className="mt-3 text-foreground-secondary max-w-2xl mx-auto">
                {chrome.keyResultsLead(study.title)}
              </p>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {study.keyResults.map((result, index) => (
              <StaggerItem key={index}>
                <Card hover={false} padding="lg" className="h-full text-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand/10 mx-auto mb-4">
                    <CheckCircle2 size={20} className="text-brand" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-foreground-secondary leading-relaxed">
                    {result}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Project Details Sidebar */}
      <section className="py-20 md:py-28 bg-background-subtle">
        <Container>
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {chrome.projectDetailsTitle}
              </h2>
            </div>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6" staggerDelay={0.12}>
              <StaggerItem>
                <Card hover={false} padding="lg" className="h-full text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand/10 mx-auto mb-4">
                    <Clock size={22} className="text-brand" aria-hidden="true" />
                  </div>
                  <p className="text-[11px] uppercase tracking-wider text-foreground-muted font-semibold mb-1">
                    {chrome.timelineLabel}
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    {study.timelineDuration}
                  </p>
                </Card>
              </StaggerItem>

              <StaggerItem>
                <Card hover={false} padding="lg" className="h-full text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent-violet/10 mx-auto mb-4">
                    <Users size={22} className="text-accent-violet" aria-hidden="true" />
                  </div>
                  <p className="text-[11px] uppercase tracking-wider text-foreground-muted font-semibold mb-1">
                    {chrome.teamSizeLabel}
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    {study.teamSize}
                  </p>
                </Card>
              </StaggerItem>

              <StaggerItem>
                <Card hover={false} padding="lg" className="h-full text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent-cyan/10 mx-auto mb-4">
                    <Wrench size={22} className="text-accent-cyan" aria-hidden="true" />
                  </div>
                  <p className="text-[11px] uppercase tracking-wider text-foreground-muted font-semibold mb-1">
                    {chrome.technologiesLabel}
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    {chrome.coreTools(study.technologies.length)}
                  </p>
                </Card>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28">
        <Container>
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {chrome.whatWeBuilt}
              </h2>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
            {study.features.map((feature, index) => (
              <StaggerItem key={index}>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-background-subtle border border-card-border">
                  <span className="mt-0.5 shrink-0" aria-hidden="true">
                    <CheckCircle2 size={16} className="text-brand" />
                  </span>
                  <p className="text-sm text-foreground-secondary leading-relaxed">
                    {feature}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Project Timeline */}
      <section className="py-20 md:py-28">
        <Container>
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {chrome.projectTimelineTitle}
              </h2>
              <p className="mt-3 text-foreground-secondary max-w-2xl mx-auto">
                {chrome.projectTimelineLead}
              </p>
            </div>
          </AnimatedSection>

          <ProjectTimeline phases={study.timeline} />
        </Container>
      </section>

      {/* Results */}
      <section className="py-20 md:py-28 bg-background-subtle">
        <Container>
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {chrome.measurableImpact}
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedMetrics results={study.results} />
        </Container>
      </section>

      {/* Before / After */}
      <section className="py-20 md:py-28">
        <Container>
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {chrome.beforeAfterTitle}
              </h2>
              <p className="mt-3 text-foreground-secondary max-w-2xl mx-auto">
                {chrome.beforeAfterLead(study.title)}
              </p>
            </div>
          </AnimatedSection>

          <BeforeAfter data={study.beforeAfter} />
          <BeforeAfterDivider />
        </Container>
      </section>

      {/* Testimonial — only render when a real quote exists. Otherwise fall
          through to the Key Outcomes block below so the page still has a
          closing proof section. */}
      {study.testimonial.quote ? (
        <section className="py-20 md:py-28">
          <Container>
            <TestimonialCard testimonial={study.testimonial} />
          </Container>
        </section>
      ) : (
        study.keyResults.length > 0 && (
          <section className="py-20 md:py-28 bg-background-subtle">
            <Container>
              <AnimatedSection>
                <div className="text-center mb-12">
                  <p className="text-xs font-medium uppercase tracking-wider text-brand mb-3">
                    {chrome.outcomesLabel}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    {chrome.keyResultsDelivered}
                  </h2>
                </div>
              </AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {study.keyResults.map((result, i) => (
                  <AnimatedSection key={result} variant="slideUp" delay={i * 0.08}>
                    <div className="flex items-start gap-3 p-5 rounded-xl bg-card-bg border border-card-border shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-brand/10 text-brand flex items-center justify-center mt-0.5">
                        <CheckCircle2 size={16} strokeWidth={2.5} />
                      </div>
                      <p className="text-base text-foreground-secondary leading-relaxed">
                        {result}
                      </p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </Container>
          </section>
        )
      )}

      {/* Technologies */}
      <section className="py-20 md:py-28">
        <Container>
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {chrome.builtWith}
              </h2>
            </div>
          </AnimatedSection>

          <TechPillsStagger technologies={study.technologies} />
        </Container>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-20 md:py-28 bg-background-subtle">
          <Container>
            <AnimatedSection variant="slideUp">
              <SectionHeader
                title={chrome.relatedServicesTitle}
                description={chrome.relatedServicesDescription}
              />
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {relatedServices.map((service) => {
                const ServiceIcon = service.icon;
                return (
                  <StaggerItem key={service.id}>
                    <Link
                      href={`/services/${service.slug[loc]}`}
                      className="group block h-full"
                    >
                      <div className="relative h-full rounded-2xl bg-card-bg border border-card-border p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-brand/15 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5">
                        <ServiceIcon size={22} className="text-brand mb-4" />
                        <h3 className="text-base font-bold text-foreground mb-1 group-hover:text-brand transition-colors">
                          {service.title[loc]}
                        </h3>
                        <p className="text-sm text-foreground-secondary leading-relaxed mb-4">
                          {service.description[loc]}
                        </p>
                        <div className="flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-2.5 transition-all duration-300">
                          {chrome.learnMore}
                          <ArrowRight
                            size={15}
                            className="transition-transform duration-300 group-hover:translate-x-0.5"
                          />
                        </div>
                      </div>
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </Container>
        </section>
      )}

      {/* Related Case Study */}
      {relatedStudy && (
        <section className="py-20 md:py-28 bg-background-subtle">
          <Container>
            <AnimatedSection>
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  {relatedStudy.title}
                </h2>
                <p className="mt-3 text-foreground-secondary">
                  {relatedStudy.tagline}
                </p>
              </div>
              <div className="flex justify-center">
                <Button href={`/case-studies/${relatedStudy.slug}`} size="lg">
                  {chrome.viewCaseStudy} <ArrowRight size={16} aria-hidden="true" />
                </Button>
              </div>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* Related Blog Posts */}
      {relatedBlogs.length > 0 && (
        <section className="py-20 md:py-28">
          <Container>
            <AnimatedSection variant="slideUp">
              <SectionHeader
                title={chrome.readMoreTitle}
                description={chrome.readMoreDescription}
              />
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              {relatedBlogs.map((post) => {
                // Locale-aware link + copy — raw post.slug/post.title would
                // 404 on /vi for translated posts (their VI URLs use VI slugs).
                const meta = getBlogMeta(post, loc);
                return (
                <StaggerItem key={post.slug}>
                  <Link
                    href={`/blog/${meta.slug}`}
                    className="group block h-full"
                  >
                    <div className="relative h-full rounded-2xl bg-card-bg border border-card-border p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-brand/15 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5">
                      <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent-cyan bg-accent-cyan/10 rounded-full px-3 py-1 mb-4">
                        {meta.category}
                      </span>
                      <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-brand transition-colors line-clamp-3">
                        {meta.title}
                      </h3>
                      <p className="text-sm text-foreground-secondary leading-relaxed mb-4 line-clamp-3">
                        {meta.excerpt}
                      </p>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-2.5 transition-all duration-300">
                        {chrome.readArticle}
                        <ArrowRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
                );
              })}
            </StaggerContainer>

            <AnimatedSection variant="slideUp" delay={0.2} className="mt-10 text-center">
              <Button href="/blog" variant="secondary">
                {chrome.viewAllArticles} <ArrowRight size={15} />
              </Button>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* CTA with enhanced gradient */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] via-transparent to-violet-500/[0.04]" aria-hidden="true" />
        <GradientBackground variant="cta" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/40" aria-hidden="true" />
        <Container className="relative z-10">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {chrome.ctaTitle}
              </h2>
              <p className="text-lg text-foreground-secondary mb-8">
                {chrome.ctaBody}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href="/contact" size="lg">
                  {chrome.ctaPrimary}
                </Button>
                <Button href="/case-studies" variant="secondary" size="lg">
                  <ArrowLeft size={16} aria-hidden="true" />
                  {chrome.ctaSecondary}
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
