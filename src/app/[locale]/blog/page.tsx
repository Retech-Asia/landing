import { Suspense } from "react";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { CompositeSectionBackground } from "@/components/ui/SectionBackground";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { BlogListSkeleton } from "@/components/ui/Skeleton";
import { blogPosts } from "@/lib/blog-data";
import { services } from "@/lib/services-data";
import { SITE_URL } from "@/lib/constants";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";

import { BlogListing } from "./BlogListing";
import { buildPageMetadata } from "@/lib/page-metadata";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({ locale, path: "/blog", namespace: "pages.blog" });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const isVi = loc === "vi";
  const chrome = isVi
    ? {
        home: "Trang chủ",
        heroTitle: "Insights & Tài nguyên",
        heroLead:
          "Cập nhật xu hướng mới nhất về IT outsourcing, phát triển phần mềm và chuyển đổi số từ đội ngũ chuyên gia của chúng tôi.",
        servicesTitle: "Dịch vụ của chúng tôi",
        servicesBody:
          "Từ nền tảng CMS đến hệ thống ERP doanh nghiệp, chúng tôi bàn giao giải pháp phần mềm trọn gói phù hợp với doanh nghiệp của bạn.",
        viewAllServices: "Xem tất cả dịch vụ",
        caseStudiesTitle: "Dự án Tiêu biểu",
        caseStudiesBody:
          "Xem kết quả thực tế từ các dự án của chúng tôi trong các ngành y tế, tài chính và thương mại điện tử.",
        exploreCaseStudies: "Khám phá dự án của chúng tôi",
      }
    : {
        home: "Home",
        heroTitle: "Insights & Resources",
        heroLead:
          "Stay up to date with the latest trends in IT outsourcing, software development, and digital transformation from our team of experts.",
        servicesTitle: "Our Services",
        servicesBody:
          "From CMS platforms to enterprise ERP systems, we deliver end-to-end software solutions tailored to your business.",
        viewAllServices: "View all services",
        caseStudiesTitle: "Case Studies",
        caseStudiesBody:
          "See real results from our projects across healthcare, finance, and e-commerce industries.",
        exploreCaseStudies: "Explore our case studies",
      };
  const pick = <T,>(l: { en: T; vi: T }) => (isVi ? l.vi : l.en);
  return (
    <>
      {/* Structured Data */}
      <WebPageJsonLd
        title="Blog"
        description="Expert insights on IT outsourcing, software development & AI trends. Practical guides on CMS, CRM, ERP solutions from Vietnam."
        url={`${SITE_URL}/${locale}/blog`}
        type="CollectionPage"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE_URL}/${locale}` },
          { name: "Blog", url: `${SITE_URL}/${locale}/blog` },
        ]}
      />

      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        {/* Premium background: aurora mesh + grid fade (replaces old blur orbs) */}
        <CompositeSectionBackground layers={["aurora", "grid-fade"]} grain />

      <Container className="relative z-10">
        <BreadcrumbNav
          items={[
            { label: chrome.home, href: "/" },
            { label: "Blog" },
          ]}
        />

        <div className="page-hero-enter">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance text-center mx-auto">
            {chrome.heroTitle}
          </h1>
          <p className="mt-4 text-lg text-foreground-secondary leading-relaxed max-w-3xl text-center mx-auto">
            {chrome.heroLead}
          </p>
        </div>

        <Suspense fallback={<BlogListSkeleton />}>
          <BlogListing posts={blogPosts} />
        </Suspense>

        {/* Cross-link to Services and Case Studies */}
        <AnimatedSection variant="slideUp" delay={0.2} className="mt-16 pt-12 border-t border-card-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                {chrome.servicesTitle}
              </h2>
              <p className="text-sm text-foreground-secondary leading-relaxed mb-5">
                {chrome.servicesBody}
              </p>
              <ul className="space-y-2.5">
                {services.slice(0, 4).map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/services/${pick(service.slug)}`}
                      className="group inline-flex items-center gap-2 text-sm text-foreground-secondary hover:text-brand transition-colors"
                    >
                      <ArrowRight size={14} className="text-brand" aria-hidden="true" />
                      {pick(service.title)}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand mt-4 hover:gap-2.5 transition-all"
              >
                {chrome.viewAllServices}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                {chrome.caseStudiesTitle}
              </h2>
              <p className="text-sm text-foreground-secondary leading-relaxed mb-5">
                {chrome.caseStudiesBody}
              </p>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:gap-2.5 transition-all"
              >
                {chrome.exploreCaseStudies}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </AnimatedSection>

      </Container>
    </section>
    </>
  );
}
