import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PageHero } from "@/components/ui/PageHero";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { SITE_URL } from "@/lib/constants";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";
import { ArrowRight } from "lucide-react";
import { TechListing } from "./TechListing";
import { CodeBracketIcon } from "@/components/ui/AnimatedIcons";
import { buildPageMetadata } from "@/lib/page-metadata";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({ locale, path: "/technologies", namespace: "pages.technologies" });
}

// Resolve chrome strings by locale. Inline tech data (descriptions,
// service tags) is localized inside TechListing via the same EN | VI
// pattern. JSON-LD strings stay English.
function getChrome(locale: string) {
  const isEn = locale === "en";
  return isEn
    ? {
        heroTitle: "Our Technology Stack",
        heroDescription:
          "We build with modern, proven technologies chosen for reliability, scalability, and developer productivity. Every tool in our stack is selected to solve real problems and deliver lasting value.",
        breadcrumbHome: "Home",
        breadcrumbCurrent: "Technologies",
        heroImageAlt: "Cloud infrastructure and data center technology",
        ctaTitle: "Have a Project in Mind?",
        ctaBody:
          "We will help you choose the right technology stack for your specific requirements and build it to production quality.",
        ctaPrimary: "Start a Conversation",
        ctaSecondary: "Our Services",
      }
    : {
        heroTitle: "Tech Stack của chúng tôi",
        heroDescription:
          "Chúng tôi xây dựng sản phẩm với các công nghệ hiện đại, đã được kiểm chứng — được lựa chọn vì độ tin cậy, khả năng mở rộng và năng suất của đội ngũ phát triển. Mỗi công cụ trong Tech Stack đều được chọn để giải quyết vấn đề thực tế và mang lại giá trị lâu dài.",
        breadcrumbHome: "Trang chủ",
        breadcrumbCurrent: "Công nghệ",
        heroImageAlt: "Hạ tầng cloud và công nghệ trung tâm dữ liệu",
        ctaTitle: "Bạn đang ấp ủ một dự án?",
        ctaBody:
          "Chúng tôi sẽ giúp bạn lựa chọn technology stack phù hợp với yêu cầu cụ thể của dự án và xây dựng đạt chất lượng production.",
        ctaPrimary: "Bắt đầu Trò chuyện",
        ctaSecondary: "Dịch vụ của chúng tôi",
      };
}

export default async function TechnologiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const chrome = getChrome(locale);
  return (
    <>
      {/* Structured Data */}
      <WebPageJsonLd
        title="Technologies"
        description="React, Next.js, Node.js, Python, AWS & more. Modern tech stack for scalable software."
        url={`${SITE_URL}/${locale}/technologies`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE_URL}/${locale}` },
          { name: "Technologies", url: `${SITE_URL}/${locale}/technologies` },
        ]}
      />

      {/* Hero */}
      <PageHero
        title={chrome.heroTitle}
        description={chrome.heroDescription}
        breadcrumbs={[
          { label: chrome.breadcrumbHome, href: "/" },
          { label: chrome.breadcrumbCurrent },
        ]}
      >
        <div className="mt-6">
          <CodeBracketIcon size={52} />
        </div>
      </PageHero>

      {/* Cloud infrastructure visual strip */}
      <div className="relative h-[200px] md:h-[280px] overflow-hidden">
        <Image
          src="/images/stock/cloud-tech.webp"
          alt={chrome.heroImageAlt}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Interactive tech listing with filters, flow diagram, and cards */}
      <Container>
        <TechListing locale={locale} />
      </Container>

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
                  {chrome.ctaSecondary} <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
