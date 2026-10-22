import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IndexRow, IndexRowList } from "@/components/ui/IndexRow";
import { caseStudies } from "@/lib/case-studies-data";

/**
 * Direction B selected work (RT-08, section 02). Static SSR server
 * component: the five case studies as a ruled editorial index. Slugs
 * resolve per locale (case-studies-data keeps localized slug fields);
 * the [slug] route serves both languages, so no dead links.
 */
export function OurWork() {
  const t = useTranslations("home.work");
  const locale = useLocale() as "en" | "vi";

  return (
    <section
      id="work"
      className="border-b border-rule bg-background-subtle py-16 md:py-24"
      aria-label={t("label")}
    >
      <Container>
        <SectionHeader
          number="02"
          label={t("label")}
          title={t("h2")}
          description={t("lede")}
        />

        <IndexRowList>
          {caseStudies.map((cs, i) => (
            <IndexRow
              key={cs.id}
              number={String(i + 1).padStart(2, "0")}
              title={cs.title[locale]}
              description={cs.tagline[locale]}
              meta={cs.industry[locale]}
              href={`/case-studies/${cs.slug[locale]}`}
            />
          ))}
        </IndexRowList>

        <div className="mt-10">
          <Link
            href="/case-studies"
            className="inline-flex items-baseline gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
          >
            {t("viewAll")}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
