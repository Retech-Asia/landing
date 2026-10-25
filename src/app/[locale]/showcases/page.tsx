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
 * Showcase index. Inert while the registry is empty (notFound) — the
 * framework ships dark until the first ChatGPT creative handoff lands.
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
    return {
      title: "Product Showcases | Retech Solutions",
      description:
        "Interactive products showing how we design and build business software — CRM, ERP, CMS, and AI interfaces.",
      alternates: {
        canonical: pageUrl,
        languages: {
          en: `${SITE_URL}/en/showcases`,
          vi: `${SITE_URL}/vi/showcases`,
          "x-default": `${SITE_URL}/en/showcases`,
        },
      },
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
    <Container className="py-16">
      <SectionHeader
        label={loc === "vi" ? "Sản phẩm" : "Products"}
        title={loc === "vi" ? "Sản phẩm minh họa" : "Product showcases"}
        description={
          loc === "vi"
            ? "Sản phẩm tương tác thể hiện cách chúng tôi thiết kế và phát triển phần mềm doanh nghiệp."
            : "Interactive products showing how we design and engineer business software."
        }
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {SHOWCASES.map((showcase) => (
          <article key={showcase.id} className="rounded-xl border border-foreground/10 p-6">
            <h2 className="text-xl font-semibold">
              <Link href={`/showcases/${showcase.slug[loc]}`} className="hover:text-brand">
                {showcase.product[loc]}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-foreground/70">{showcase.tagline[loc]}</p>
            <p className="mt-3 text-xs text-foreground/50">
              {showcase.views.length}{" "}
              {loc === "vi" ? "màn hình" : "views"}
            </p>
          </article>
        ))}
      </div>
    </Container>
  );
}
