import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { ShowcaseDemoShell } from "@/components/showcases/ShowcaseDemoShell";
import { SHOWCASES, getShowcaseBySlug } from "@/lib/showcases/registry";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/constants";

/**
 * Showcase product page: server-rendered crawlable overview (product,
 * description, every view title + summary) with the interactive demo
 * lazy-mounted client-side via ShowcaseDemoShell (?view= deep links).
 */

interface PageParams {
  params: Promise<{ locale: string; product: string }>;
}

function resolve({ locale, product }: { locale: string; product: string }) {
  const loc = locale as Locale;
  const showcase = getShowcaseBySlug(product, loc);
  return { loc, showcase };
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SHOWCASES.flatMap((showcase) => [
      { locale, product: showcase.slug.en },
      { locale, product: showcase.slug.vi },
    ])
  );
}

export const dynamicParams = false;

export function generateMetadata({ params }: PageParams): Promise<Metadata> {
  return params.then(({ locale, product }) => {
    const { loc, showcase } = resolve({ locale, product });
    if (!showcase) notFound();
    const pageUrl = `${SITE_URL}/${loc}/showcases/${showcase.slug[loc]}`;
    return {
      title: `${showcase.product[loc]} — Concept Demonstration | Retech Solutions`,
      description: showcase.tagline[loc],
      alternates: {
        canonical: pageUrl,
        languages: {
          en: `${SITE_URL}/en/showcases/${showcase.slug.en}`,
          vi: `${SITE_URL}/vi/showcases/${showcase.slug.vi}`,
          "x-default": `${SITE_URL}/en/showcases/${showcase.slug.en}`,
        },
      },
      openGraph: {
        title: `${showcase.product[loc]} — Concept Demonstration | Retech Solutions`,
        description: showcase.tagline[loc],
        url: pageUrl,
        type: "website",
      },
    };
  });
}

export default async function ShowcaseProductPage({
  params,
}: PageParams) {
  const { locale, product } = await params;
  setRequestLocale(locale);
  const { loc, showcase } = resolve({ locale, product });
  if (!showcase) notFound();

  return (
    <Container className="py-16 md:py-24">
      <Link
        href="/showcases"
        className="inline-flex items-center gap-1.5 text-sm text-foreground-muted transition-colors hover:text-brand"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {loc === "vi" ? "Tất cả mô hình" : "All concepts"}
      </Link>
      <div className="mt-8 max-w-3xl">
        <p className="flex flex-wrap items-baseline gap-x-3 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
          <span>{loc === "vi" ? "Mô hình sản phẩm" : "Product concept"}</span>
          <span aria-hidden="true">·</span>
          <span>
            {showcase.views.length}{" "}
            {loc === "vi" ? "màn hình tương tác" : "interactive views"}
          </span>
        </p>
        <h1 className="font-display-title mt-4 text-3xl leading-tight tracking-tight text-foreground md:text-5xl">
          {showcase.product[loc]}
        </h1>
        <p className="mt-3 text-base font-medium text-foreground-muted">
          {showcase.tagline[loc]}
        </p>
        <p className="mt-4 max-w-xl leading-relaxed text-foreground-secondary">
          {showcase.description[loc]}
        </p>
      </div>

      {/* Crawlable view index — server-rendered, no JS required. Numbered
          hairline rows, same language as the homepage concept rows. */}
      <section className="mt-14" aria-label={loc === "vi" ? "Các màn hình" : "Views"}>
        <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
          {loc === "vi" ? "Các màn hình" : "Views"}
        </h2>
        <ol className="mt-4">
          {showcase.views.map((view, i) => (
            <li
              key={view.id}
              className="grid grid-cols-[2rem_1fr] items-baseline gap-x-3 border-t border-rule-soft py-5 md:grid-cols-[2.5rem_240px_1fr] md:gap-x-4"
            >
              <span className="font-display text-xs text-foreground-muted tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-base text-foreground md:text-lg">
                {view.title[loc]}
              </h3>
              <div className="col-span-2 mt-2 md:col-span-1 md:mt-0">
                <p className="text-sm leading-relaxed text-foreground-secondary">
                  {view.summary[loc]}
                </p>
                <Link
                  href={`/showcases/${showcase.slug[loc]}/${view.id}`}
                  className="mt-2 inline-block text-xs font-semibold uppercase tracking-[0.12em] text-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
                >
                  {loc === "vi" ? "Xem toàn màn hình" : "Open full-screen view"}
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14 border-t border-rule pt-10" aria-label={loc === "vi" ? "Bản minh họa tương tác" : "Interactive demonstration"}>
        <ShowcaseDemoShell
          showcaseId={showcase.id}
          locale={loc}
          views={showcase.views.map((v) => ({ id: v.id, title: v.title }))}
        />
      </section>
    </Container>
  );
}
