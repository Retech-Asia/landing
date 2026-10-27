import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SHOWCASES } from "@/lib/showcases/registry";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/constants";

/**
 * Concept index — editorial presentation (2026-10-27 consolidation round):
 * the registry-driven concept cards follow the homepage ConceptRow language
 * (mono "Product concept" badge + view count, display-title product name,
 * hairline rows). Copy stays verbatim from the registry; honest labelling
 * preserved. Nav terminology law: "Product Concepts"/"Mô hình sản phẩm".
 * Locale-aware metadata (previously EN-only on the VI page).
 */
export function generateStaticParams() {
  // Route only exists once a showcase is registered; empty registry = no
  // static params = statically 404s via dynamicParams below.
  return routing.locales.flatMap((locale) =>
    SHOWCASES.map(() => ({ locale }))
  );
}

export const dynamicParams = false;

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return params.then(({ locale }) => {
    if (SHOWCASES.length === 0) notFound();
    const loc = locale as Locale;
    const pageUrl = `${SITE_URL}/${loc}/showcases`;
    const title =
      loc === "vi"
        ? "Mô hình sản phẩm | Retech Solutions"
        : "Product Concepts | Retech Solutions";
    const description =
      loc === "vi"
        ? "Các sản phẩm tương tác thể hiện cách chúng tôi thiết kế và phát triển phần mềm doanh nghiệp — CRM, ERP, CMS và giao diện AI."
        : "Interactive products showing how we design and build business software — CRM, ERP, CMS, and AI interfaces.";
    return {
      title,
      description,
      alternates: {
        canonical: pageUrl,
        languages: {
          en: `${SITE_URL}/en/showcases`,
          vi: `${SITE_URL}/vi/showcases`,
          "x-default": `${SITE_URL}/en/showcases`,
        },
      },
      openGraph: { title, description, url: pageUrl, type: "website" },
    };
  });
}

export default async function ShowcasesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (SHOWCASES.length === 0) notFound();
  const loc = locale as Locale;

  return (
    <Container className="py-16 md:py-24">
      <SectionHeader
        heading="h1"
        label={loc === "vi" ? "Mô hình" : "Concepts"}
        title={loc === "vi" ? "Mô hình sản phẩm" : "Product Concepts"}
        description={
          loc === "vi"
            ? "Khám phá những trải nghiệm phần mềm được thiết kế tỉ mỉ xoay quanh quy trình kinh doanh thực tế."
            : "Explore thoughtfully designed software experiences built around real business workflows."
        }
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {SHOWCASES.map((showcase, i) => (
          <article key={showcase.id} className="border-t border-rule pt-5">
            <Link
              href={`/showcases/${showcase.slug[loc]}`}
              className="group block"
            >
              <p className="flex flex-wrap items-baseline gap-x-3 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span aria-hidden="true">·</span>
                <span>{loc === "vi" ? "Mô hình sản phẩm" : "Product concept"}</span>
                <span aria-hidden="true">·</span>
                <span>
                  {showcase.views.length}{" "}
                  {loc === "vi" ? "màn hình tương tác" : "interactive views"}
                </span>
              </p>
              <h2 className="font-display-title mt-3 text-2xl leading-tight text-foreground transition-colors group-hover:text-brand md:text-3xl">
                {showcase.product[loc]}
              </h2>
              <p className="mt-2 text-sm font-medium text-foreground-muted">
                {showcase.tagline[loc]}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                {showcase.description[loc]}
              </p>
            </Link>
          </article>
        ))}
      </div>
    </Container>
  );
}
