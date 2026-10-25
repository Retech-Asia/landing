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
    <Container className="py-16">
      <Link
        href="/showcases"
        className="inline-flex items-center gap-1.5 text-sm text-foreground/60 hover:text-brand"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {loc === "vi" ? "Tất cả sản phẩm minh họa" : "All showcases"}
      </Link>
      <div className="mt-6 max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {showcase.product[loc]}
        </h1>
        <p className="mt-3 text-lg text-foreground/70">{showcase.tagline[loc]}</p>
        <p className="mt-4 leading-relaxed text-foreground/70">
          {showcase.description[loc]}
        </p>
      </div>

      {/* Crawlable view index — server-rendered, no JS required. */}
      <section className="mt-12" aria-label={loc === "vi" ? "Các màn hình" : "Views"}>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground/50">
          {loc === "vi" ? "Các màn hình" : "Views"}
        </h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {showcase.views.map((view) => (
            <li key={view.id} className="rounded-xl border border-foreground/10 p-5">
              <h3 className="font-semibold">{view.title[loc]}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground/70">
                {view.summary[loc]}
              </p>
              <Link
                href={`/showcases/${showcase.slug[loc]}/${view.id}`}
                className="mt-3 inline-block text-sm font-medium text-brand hover:underline"
              >
                {loc === "vi" ? "Xem toàn màn hình" : "Open full-screen view"}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-label={loc === "vi" ? "Bản minh họa tương tác" : "Interactive demonstration"}>
        <ShowcaseDemoShell
          showcaseId={showcase.id}
          locale={loc}
          views={showcase.views.map((v) => ({ id: v.id, title: v.title }))}
        />
      </section>
    </Container>
  );
}
