import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { CompositeSectionBackground } from "@/components/ui/SectionBackground";
import { FAQJsonLd, BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/constants";
import { faqCategories, allFAQs, flattenFAQItem, flattenFAQCategory } from "@/lib/faq-data";
import { FAQClientPage } from "./faq-client";
import { buildPageMetadata } from "@/lib/page-metadata";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

const PAGE_URL = `${SITE_URL}/faq`;

/* ── Metadata ─────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({ locale, path: "/faq", namespace: "pages.faq" });
}

/* ── Page ──────────────────────────────────────────────────────── */
export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.faq.chrome" });

  // Flatten categories + items to single-locale shape before passing to
  // client component. JSON-LD also gets flattened items.
  const flatCategories = faqCategories.map((c) => flattenFAQCategory(c, loc));
  const flatFAQs = allFAQs.map((i) => flattenFAQItem(i, loc));

  return (
    <>
      {/* ── Structured Data ─────────────────────────────────── */}
      <FAQJsonLd questions={flatFAQs} />
      <BreadcrumbJsonLd
        items={[
          { name: t("breadcrumb.home"), url: SITE_URL },
          { name: t("breadcrumb.faq"), url: PAGE_URL },
        ]}
      />
      <WebPageJsonLd
        title={t("title")}
        description={t("description")}
        url={PAGE_URL}
        type="FAQPage"
      />

      {/* ── Hero Section ────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <CompositeSectionBackground layers={["aurora", "grid-fade"]} grain />
        <Container className="relative">
          <div className="page-hero-enter">
            <BreadcrumbNav
              items={[
                { label: t("breadcrumb.home"), href: "/" },
                { label: t("breadcrumb.faq") },
              ]}
            />
          </div>

          <div className="max-w-3xl page-hero-enter [animation-delay:80ms]">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
              {t("headline")}
            </h1>

            <p className="text-lg text-foreground-secondary leading-relaxed max-w-2xl">
              {t("subhead")}
            </p>
          </div>
        </Container>
      </section>

      {/* ── Interactive FAQ Content (Client Component) ──────── */}
      <FAQClientPage categories={flatCategories} />

      {/* ── CTA Section ─────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 bg-brand-dark overflow-hidden">
        <Container className="relative z-10">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
                {t("ctaTitle")}
              </h2>
              <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
                {t("ctaBody")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  href="/contact"
                  size="lg"
                  className="bg-white text-foreground hover:bg-white/90"
                >
                  <Mail size={18} />
                  {t("ctaPrimary")}
                </Button>
                <Button
                  href="/services"
                  variant="ghost"
                  size="lg"
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  {t("ctaSecondary")}
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
