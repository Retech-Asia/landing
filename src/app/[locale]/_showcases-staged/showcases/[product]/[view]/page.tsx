import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { ConceptDemoLabel } from "@/components/showcases/ConceptDemoLabel";
import { ViewPanel } from "@/components/showcases/ShowcaseDemoShell";
import { SHOWCASES, getShowcaseBySlug } from "@/lib/showcases/registry";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/constants";

/**
 * Full-screen single-view exploration route (program brief: "optional
 * full-screen demo exploration route"). Minimal chrome: label + back link +
 * the interactive view. Server-renders the crawlable title + summary; the
 * demo itself mounts client-side via ViewPanel.
 */

interface PageParams {
  params: Promise<{ locale: string; product: string; view: string }>;
}

function resolve({ locale, product, view }: { locale: string; product: string; view: string }) {
  const loc = locale as Locale;
  const showcase = getShowcaseBySlug(product, loc);
  const viewDef = showcase?.views.find((v) => v.id === view);
  return { loc, showcase, viewDef };
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SHOWCASES.flatMap((showcase) =>
      showcase.views.map((view) => ({
        locale,
        product: showcase.slug[locale as Locale],
        view: view.id,
      }))
    )
  );
}

export const dynamicParams = false;

export function generateMetadata({ params }: PageParams): Promise<Metadata> {
  return params.then(async ({ locale, product, view }) => {
    const { loc, showcase, viewDef } = resolve({ locale, product, view });
    if (!showcase || !viewDef) notFound();
    const pageUrl = `${SITE_URL}/${loc}/showcases/${showcase.slug[loc]}/${viewDef.id}`;
    return {
      title: `${showcase.product[loc]} — ${viewDef.title[loc]} | Retech Solutions`,
      description: viewDef.summary[loc],
      alternates: {
        canonical: pageUrl,
        languages: {
          en: `${SITE_URL}/en/showcases/${showcase.slug.en}/${viewDef.id}`,
          vi: `${SITE_URL}/vi/showcases/${showcase.slug.vi}/${viewDef.id}`,
          "x-default": `${SITE_URL}/en/showcases/${showcase.slug.en}/${viewDef.id}`,
        },
      },
      robots: { index: false },
    };
  });
}

export default async function ShowcaseViewPage({
  params,
}: PageParams) {
  const { locale, product, view } = await params;
  setRequestLocale(locale);
  const { loc, showcase, viewDef } = resolve({ locale, product, view });
  if (!showcase || !viewDef) notFound();

  return (
    <Container className="py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href={`/showcases/${showcase.slug[loc]}`}
          className="inline-flex items-center gap-1.5 text-sm text-foreground/60 hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {showcase.product[loc]}
        </Link>
        <ConceptDemoLabel locale={loc} className="max-w-md" />
      </div>
      <header className="mt-6 max-w-3xl">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {viewDef.title[loc]}
        </h1>
        <p className="mt-2 text-foreground/70">{viewDef.summary[loc]}</p>
      </header>
      <div className="mt-8">
        <ViewPanel showcaseId={showcase.id} viewId={viewDef.id} />
      </div>
    </Container>
  );
}
