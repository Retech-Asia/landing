import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SHOWCASES } from "@/lib/showcases/registry";

/**
 * Product concepts (owner decision 2026-10-26): the homepage's featured
 * section swaps the five delivered case studies for original SME-oriented
 * product concepts. All copy comes verbatim from the approved Wave 1
 * registry (src/lib/showcases/registry.ts) — no invented marketing.
 *
 * Featured set (owner approval 2026-10-27): Property Studio (desktop-first
 * property CRM) and Care Companion (mobile-first healthcare) are the two
 * flagships in slots 1-2, followed by the live concepts Meridian Operations
 * (enterprise operations) and Relay Field (logistics/field service).
 *
 * The delivered-work record stays available: the closing line links to
 * /case-studies (all case-study URLs, content and SEO untouched).
 * Rollback: restore the OurWork import in page.tsx (file kept in tree).
 */

/** Featured slugs, in approved priority order (flagships first, 10/27). */
const FEATURED = [
  "property-studio",
  "care-companion",
  "meridian-operations",
  "relay-field",
] as const;

type Locale = "en" | "vi";

export function ProductConcepts() {
  const t = useTranslations("home.concepts");
  const locale = useLocale() as Locale;

  const featured = FEATURED.map((slug) =>
    SHOWCASES.find((s) => s.slug[locale] === slug),
  ).filter((s) => s !== undefined);

  return (
    <section id="concepts" className="scroll-mt-20 border-b border-rule py-16 md:py-24" aria-label={t("h2")}>
      <Container>
        <SectionHeader
          number="03"
          label={t("label")}
          title={t("h2")}
          description={t("lede")}
          align="left"
        />

        <div className="mt-4">
          {featured.map((showcase) => (
            <ConceptRow key={showcase.slug.en} showcase={showcase} locale={locale} />
          ))}
        </div>

        {/* Delivered-work hand-off (owner ruling: keep a separate, clearly
            identified link; case-study pages unchanged). */}
        <div className="mt-12 border-t border-rule pt-8">
          <Link
            href="/case-studies"
            className="inline-flex items-baseline gap-2 text-sm font-semibold text-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
          >
            {t("delivered")}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

function ConceptRow({
  showcase,
  locale,
}: {
  showcase: (typeof SHOWCASES)[number];
  locale: Locale;
}) {
  const t = useTranslations("home.concepts");

  return (
    <div className="grid grid-cols-1 gap-6 border-t border-rule py-10 md:grid-cols-12 md:gap-10 md:py-14">
      <div className="md:col-span-5">
        <p className="flex flex-wrap items-baseline gap-x-3 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
          <span>{t("badge")}</span>
          <span aria-hidden="true">·</span>
          <span>{t("viewCount", { count: showcase.views.length })}</span>
        </p>
        <h3 className="font-display-title mt-4 text-3xl leading-tight text-foreground md:text-4xl">
          {showcase.product[locale]}
        </h3>
        <p className="mt-2 text-sm font-medium text-foreground-muted">
          {showcase.tagline[locale]}
        </p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground-secondary md:text-base">
          {showcase.description[locale]}
        </p>
        <Link
          href={`/showcases/${showcase.slug[locale]}`}
          className="mt-6 inline-flex items-baseline gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
        >
          {t("explore")}
          <ArrowRight size={13} aria-hidden="true" />
        </Link>
      </div>

      {/* Factual view index from the registry — tells the product story
          through its actual screens, no promotional copy. */}
      <ol className="md:col-span-7">
        {showcase.views.map((view, i) => (
          <li
            key={view.id}
            className="grid grid-cols-[2rem_1fr] items-baseline gap-x-3 border-t border-rule-soft py-3 first:border-t-0 md:grid-cols-[2.5rem_220px_1fr] md:gap-x-4"
          >
            <span className="font-display text-xs text-foreground-muted tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-sm text-foreground md:text-[15px]">
              {view.title[locale]}
            </span>
            <span className="col-span-2 mt-1 text-xs leading-relaxed text-foreground-secondary md:col-span-1 md:mt-0">
              {view.summary[locale]}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
