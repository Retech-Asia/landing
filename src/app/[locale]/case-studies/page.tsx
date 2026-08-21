import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { TiltCard } from "@/components/ui/TiltCard";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { caseStudies, flattenCaseStudy } from "@/lib/case-studies-data";
import { BLUR_DATA_URL } from "@/lib/image-placeholders";
import { SITE_URL } from "@/lib/constants";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/page-metadata";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

// Locale-aware chrome strings. Card content comes from the bilingual
// case-studies data via flattenCaseStudy; only page chrome lives here.
function getChrome(locale: string) {
  const isEn = locale === "en";
  return isEn
    ? {
        breadcrumbHome: "Home",
        breadcrumbCurrent: "Case Studies",
        heroTitle: "Case Studies",
        heroLead:
          "Real-world products solving real-world problems. Explore how Retech Solutions helps businesses transform their ideas into powerful digital solutions.",
        readCaseStudy: "Read Case Study",
        ctaTitle: "Ready to Build Something Great?",
        ctaBody:
          "Get a free project estimate within 24 hours. Our team will map out the right approach, timeline, and tech stack for your idea.",
        ctaPrimary: "Get Your Free Estimate",
        ctaSecondary: "Explore Services",
      }
    : {
        breadcrumbHome: "Trang chủ",
        breadcrumbCurrent: "Dự án",
        heroTitle: "Dự án",
        heroLead:
          "Sản phẩm thực tế giải quyết vấn đề thực tế. Khám phá cách Retech Solutions giúp doanh nghiệp biến ý tưởng thành giải pháp số hiệu quả.",
        readCaseStudy: "Đọc Dự án",
        ctaTitle: "Sẵn sàng Xây dựng Sản phẩm Mới?",
        ctaBody:
          "Nhận báo giá dự án miễn phí trong vòng 24 giờ. Đội ngũ của chúng tôi sẽ đề xuất hướng tiếp cận, lộ trình và tech stack phù hợp với ý tưởng của bạn.",
        ctaPrimary: "Nhận Báo giá Miễn phí",
        ctaSecondary: "Khám phá Dịch vụ",
      };
}

function CaseStudyImage({
  src,
  alt,
  width,
  height,
  className,
  sizes,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
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
      loading="lazy"
      sizes={sizes}
    />
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // VI case studies are translated; listing reads flattened locale data
  return buildPageMetadata({ locale, path: "/case-studies", namespace: "pages.caseStudies", viReady: true });
}

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  setRequestLocale(locale);
  const chrome = getChrome(locale);
  const studies = caseStudies.map((cs) => flattenCaseStudy(cs, loc));
  return (
    <>
      {/* Structured Data */}
      <WebPageJsonLd
        title="Case Studies"
        description="Real results from real projects. Explore case studies in healthcare, finance & e-commerce. Custom software on time & budget."
        url={`${SITE_URL}/${locale}/case-studies`}
        type="CollectionPage"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE_URL}/${locale}` },
          { name: "Case Studies", url: `${SITE_URL}/${locale}/case-studies` },
        ]}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <GradientBackground variant="hero" />
        <div className="absolute inset-0 grid-pattern pointer-events-none opacity-40" aria-hidden="true" />
        <div className="absolute inset-0 dot-pattern pointer-events-none opacity-20" aria-hidden="true" />
        <Container className="relative z-10">
          <BreadcrumbNav items={[{ label: chrome.breadcrumbHome, href: "/" }, { label: chrome.breadcrumbCurrent }]} />
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
              {chrome.heroTitle}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-foreground-secondary max-w-3xl leading-relaxed">
              {chrome.heroLead}
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* Case Study Cards */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="space-y-20">
            {studies.map((study, index) => (
              <AnimatedSection
                key={study.id}
                variant={index % 2 === 0 ? "slideRight" : "slideLeft"}
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center`}
                >
                  {/* Project image — single hero, full card width */}
                  <div className={index % 2 !== 0 ? "lg:order-2" : ""}>
                    <div className="group relative h-[280px] md:h-[360px] rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)]">
                      <CaseStudyImage
                        src={study.images.dashboard.src}
                        alt={study.title}
                        width={study.images.dashboard.width}
                        height={study.images.dashboard.height}
                        className="h-full w-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-5">
                        <span className="text-xs font-medium uppercase tracking-wider text-white/90">
                          {study.industry}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <div className={index % 2 !== 0 ? "lg:order-1" : ""}>
                    <p className="text-xs font-medium uppercase tracking-wider text-foreground-muted mb-3">
                      {study.industry}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      {study.title}
                    </h2>
                    <p className="text-foreground-muted font-medium text-sm mb-4">
                      {study.tagline}
                    </p>
                    <p className="text-foreground-secondary leading-relaxed mb-6">
                      {study.description}
                    </p>

                    {/* Quick results */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {study.results.slice(0, 4).map((result) => (
                        <div
                          key={result.metric}
                          className="p-3 rounded-xl bg-background-subtle"
                        >
                          <p className="text-base sm:text-lg font-bold text-foreground">
                            {result.value}
                          </p>
                          <p className="text-xs text-foreground-muted">
                            {result.metric}
                          </p>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/case-studies/${study.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:gap-3 transition-all"
                    >
                      {chrome.readCaseStudy} <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <GradientBackground variant="cta" />
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
                <Button href="/services" variant="secondary" size="lg">
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
