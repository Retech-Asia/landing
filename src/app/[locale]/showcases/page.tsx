import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SHOWCASES } from "@/lib/showcases/registry";
import { LEAD_PREVIEW } from "@/lib/showcases/previews";
import type { ShowcaseDefinition } from "@/lib/showcases/types";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/constants";

/**
 * Concept index — image-led editorial (2026-10-27 owner direction): large
 * previews of the actual interactive interfaces lead each card; the product
 * UI is the first thing visitors see. Copy stays verbatim from the registry;
 * honest "Product concept" labelling preserved. Nav terminology law:
 * "Product Concepts"/"Mô hình sản phẩm". Locale-aware metadata.
 *
 * Captures are real functional views rendered from this repo's own showcase
 * registry (no stock imagery), captured at DPR-2 and cropped to the top of
 * each dashboard — the strongest first-sight proof available without
 * inventing client results.
 */

/** Owner-directed ordering: Property Studio + Care Companion lead. */
const ORDER = ["property", "care", "erp", "mobile", "ai", "crm", "cms"];

const ordered = ORDER.map((id) => SHOWCASES.find((s) => s.id === id)).filter(
  (s): s is ShowcaseDefinition => Boolean(s)
);

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
      <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
        {ordered.map((showcase, i) => (
          <article key={showcase.id}>
            <Link href={`/showcases/${showcase.slug[loc]}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden border border-rule-soft bg-card-bg">
                <Image
                  src={LEAD_PREVIEW[showcase.id]}
                  alt={
                    loc === "vi"
                      ? `Giao diện ${showcase.product[loc]}`
                      : `${showcase.product[loc]} interface preview`
                  }
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-3 left-3 bg-black/55 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {loc === "vi" ? "Xem bản minh họa tương tác" : "Open interactive demo"}
                </span>
              </div>
            </Link>
            <Link href={`/showcases/${showcase.slug[loc]}`} className="group block">
              <p className="mt-5 flex flex-wrap items-baseline gap-x-3 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
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
            </Link>
          </article>
        ))}
      </div>
    </Container>
  );
}
