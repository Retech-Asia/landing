import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { GradientBackground } from "@/components/ui/GradientBackground";
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
        coversNote:
          "The covers below are contextual photography, not product captures; each case-study page captions its own product imagery.",
        ctaTitle: "Ready to Build Something Great?",
        ctaBody:
          "Get a free project estimate. Our team will map out the right approach, timeline, and tech stack for your idea.",
        ctaPrimary: "Discuss Your Project",
        ctaSecondary: "Explore Services",
      }
    : {
        breadcrumbHome: "Trang chủ",
        breadcrumbCurrent: "Dự án",
        heroTitle: "Dự án",
        heroLead:
          "Sản phẩm thực tế giải quyết vấn đề thực tế. Khám phá cách Retech Solutions giúp doanh nghiệp biến ý tưởng thành giải pháp số hiệu quả.",
        readCaseStudy: "Đọc Dự án",
        coversNote:
          "Ảnh bìa dưới đây là hình ảnh bối cảnh, không phải ảnh sản phẩm; trang từng dự án luôn chú thích rõ ảnh sản phẩm.",
        ctaTitle: "Sẵn sàng Xây dựng Sản phẩm Mới?",
        ctaBody:
          "Nhận báo giá dự án miễn phí. Đội ngũ của chúng tôi sẽ đề xuất hướng tiếp cận, lộ trình và tech stack phù hợp với ý tưởng của bạn.",
        ctaPrimary: "Thảo luận dự án",
        ctaSecondary: "Khám phá Dịch vụ",
      };
}

/**
 * Contextual covers per study (visual-experience round, 2026-10-23).
 * Same identity map as the homepage OurWork section — the cover is the
 * project's identity across surfaces (intentional reuse, see
 * src/lib/photography.ts). Product captures stay on the detail pages,
 * captioned as illustrative.
 */
const COVERS: Record<string, { src: string; alt: string }> = {
  "mining-analytics-platform": {
    src: "/images/photo/photo-work-mining.webp",
    alt: "Server racks with cabling in a dark operations room",
  },
  "asset-management-platform": {
    src: "/images/photo/photo-work-asset.webp",
    alt: "Residential building facade with lit windows at dusk",
  },
  "investment-intelligence-platform": {
    src: "/images/photo/photo-work-invest.webp",
    alt: "Market chart with trend overlay on a trading screen",
  },
  "fintech-card-marketing": {
    src: "/images/photo/photo-work-fintech.webp",
    alt: "Payment card used at a laptop during an online checkout",
  },
  "ai-analysis-saas": {
    src: "/images/photo/photo-work-ai-analysis.webp",
    alt: "Analyst reviewing charts and graphs on a laptop",
  },
};

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

      {/* Case Study Cards — editorial rhythm: lead study full-width
          cinematic, the rest as varied asymmetric rows. Covers are
          contextual photography; the note below the hero keeps the
          product-imagery governance visible. */}
      <section className="py-20 md:py-28">
        <Container>
          <p className="mb-12 max-w-3xl text-xs leading-relaxed text-foreground-muted">
            {chrome.coversNote}
          </p>
          <div className="space-y-20 md:space-y-28">
            {studies.map((study, index) => {
              const cover = COVERS[study.id];
              const isLead = index === 0;
              const flip = index % 2 === 1;

              if (isLead) {
                return (
                  <AnimatedSection key={study.id}>
                    <Link
                      href={`/case-studies/${study.slug}`}
                      className="group block focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-brand"
                      aria-label={`${study.title} — ${study.industry}`}
                    >
                      <div className="relative overflow-hidden">
                        <Image
                          src={cover.src}
                          alt={cover.alt}
                          width={2000}
                          height={1125}
                          sizes="100vw"
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                          className="h-[240px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100 md:h-[520px]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                          <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/80">
                            {study.industry}
                          </p>
                          <h2 className="font-display-title mt-2 max-w-3xl text-2xl leading-tight text-white md:text-4xl">
                            {study.title}
                          </h2>
                          <p className="mt-2 max-w-2xl text-sm text-white/85 md:text-base">
                            {study.tagline}
                          </p>
                        </div>
                      </div>
                      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground-secondary">
                        {study.summary}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-brand group-hover:gap-3 transition-all">
                        {chrome.readCaseStudy} <ArrowRight size={16} aria-hidden="true" />
                      </span>
                    </Link>
                  </AnimatedSection>
                );
              }

              return (
                <AnimatedSection
                  key={study.id}
                  variant={flip ? "slideLeft" : "slideRight"}
                >
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="group grid grid-cols-1 items-center gap-8 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-brand lg:grid-cols-12 lg:gap-12"
                    aria-label={`${study.title} — ${study.industry}`}
                  >
                    <div
                      className={`relative overflow-hidden lg:col-span-7 ${
                        flip ? "lg:order-2" : ""
                      }`}
                    >
                      <Image
                        src={cover.src}
                        alt={cover.alt}
                        width={2000}
                        height={1125}
                        sizes="(max-width: 768px) 100vw, 58vw"
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                        className="h-[220px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100 md:h-[360px]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                      <span className="absolute bottom-4 left-5 text-xs font-medium uppercase tracking-[0.14em] text-white/90">
                        {study.industry}
                      </span>
                    </div>

                    <div className={flip ? "lg:order-1 lg:col-span-5" : "lg:col-span-5"}>
                      <h2 className="font-display-title text-2xl leading-tight text-foreground transition-colors group-hover:text-brand md:text-3xl">
                        {study.title}
                      </h2>
                      <p className="mt-1 text-sm font-medium text-foreground-muted">
                        {study.tagline}
                      </p>
                      <p className="mt-4 leading-relaxed text-foreground-secondary">
                        {study.summary}
                      </p>

                      {/* Verified technologies (owner arc: verified tech over
                          vanity metrics; the former stat grid carried numbers
                          with no record behind it). */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        {study.technologies.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full bg-background-subtle border border-card-border text-xs font-medium text-foreground-secondary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand group-hover:gap-3 transition-all">
                        {chrome.readCaseStudy} <ArrowRight size={16} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
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
