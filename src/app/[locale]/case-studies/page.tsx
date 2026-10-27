import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { caseStudies, flattenCaseStudy } from "@/lib/case-studies-data";
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
          "An archive of delivered projects. Our public portfolio is presented as product concepts; detailed case notes are shared on request.",
        readCaseStudy: "Read case study",
        archiveNote:
          "Project summaries are kept brief here; full references are provided during conversations.",
        conceptsLine: "For a picture of what we build, explore the public product concepts:",
        conceptsLink: "View product concepts",
        ctaTitle: "Ready to Build Something Great?",
        ctaBody:
          "Share your project requirements to receive an initial cost estimate.",
        ctaPrimary: "Discuss Your Project",
        ctaSecondary: "Explore Services",
      }
    : {
        breadcrumbHome: "Trang chủ",
        breadcrumbCurrent: "Dự án",
        heroTitle: "Dự án",
        heroLead:
          "Kho lưu trữ các dự án đã triển khai. Portfolio công khai của chúng tôi được trình bày dưới dạng product concepts; hồ sơ chi tiết được cung cấp theo yêu cầu.",
        readCaseStudy: "Đọc dự án",
        archiveNote:
          "Tóm tắt dự án ở đây được giữ ngắn gọn; thông tin tham chiếu đầy đủ được cung cấp trong buổi trao đổi.",
        ctaTitle: "Sẵn sàng Xây dựng Sản phẩm Mới?",
        ctaBody:
          "Chia sẻ thông tin dự án để nhận ước tính chi phí ban đầu.",
        ctaPrimary: "Trao đổi về dự án",
        ctaSecondary: "Khám phá Dịch vụ",
      };
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
        description="An archive of software projects delivered by Retech Solutions."
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
            {chrome.heroTitle}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-foreground-secondary max-w-3xl leading-relaxed">
            {chrome.heroLead}
          </p>
        </Container>
      </section>

      {/* Archive list (2026-10-27, owner portfolio direction): the five
          legacy projects are no longer prominently marketed — this quiet
          typographic index preserves the internal links to their detail
          URLs (SEO-safe interim state) while the concept-led portfolio
          lives on /showcases and the homepage. Nav-terminology and URL
          migration await an owner-approved proposal. */}
      <section className="pb-20 md:pb-28" aria-label={chrome.breadcrumbCurrent}>
        <Container>
          <p className="max-w-3xl text-xs leading-relaxed text-foreground-muted border-t border-rule pt-4">
            {chrome.archiveNote}
          </p>
          <ul className="mt-10 border-t border-rule">
            {studies.map((study) => (
              <li key={study.id} className="border-b border-rule-soft">
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="group grid grid-cols-1 gap-2 py-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand md:grid-cols-[140px_1fr_auto] md:items-baseline md:gap-6"
                  aria-label={`${study.title} — ${study.industry}`}
                >
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-foreground-muted">
                    {study.industry}
                  </p>
                  <div>
                    <h2 className="font-display-title text-xl leading-snug text-foreground transition-colors group-hover:text-brand md:text-2xl">
                      {study.title}
                    </h2>
                    <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-foreground-secondary">
                      {study.summary}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-2.5 transition-all">
                    {chrome.readCaseStudy}
                    <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-foreground-secondary">
            {chrome.conceptsLine}{" "}
            <Link
              href="/showcases"
              className="font-medium text-brand underline-offset-4 hover:underline"
            >
              {chrome.conceptsLink}
            </Link>
          </p>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <GradientBackground variant="cta" />
        <Container className="relative z-10">
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
        </Container>
      </section>
    </>
  );
}
