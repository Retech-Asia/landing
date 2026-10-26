import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Section 05 — Engagement (visual-experience round, 2026-10-23). The three
 * engagement shapes as parallel decision columns (letter, title, body)
 * instead of stacked ruled rows, the cost-driver note beneath, and a clear
 * conversion line pointing at /contact. Static SSR server component.
 */

interface EngagementRow {
  title: string;
  body: string;
}

const ROW_LETTERS = ["a", "b", "c"];

export function Engagement() {
  const t = useTranslations("home.engagement");
  const rows = t.raw("rows") as EngagementRow[];

  return (
    <section className="py-16 md:py-24" aria-label={t("label")}>
      <Container>
        <SectionHeader
          number="06"
          label={t("label")}
          title={t("h2")}
        />

        <div className="mt-10 grid grid-cols-1 gap-px border border-rule-soft bg-rule-soft md:mt-14 md:grid-cols-3">
          {rows.map((row, i) => (
            <div key={row.title} className="bg-background p-6 md:p-8">
              <p
                className="font-display-title text-lg font-semibold text-brand"
                aria-hidden="true"
              >
                {ROW_LETTERS[i]}
              </p>
              <h3 className="font-display-title mt-3 text-xl leading-snug text-foreground">
                {row.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                {row.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:mt-12 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-7">
            <h3 className="font-display-title text-xl leading-snug text-foreground md:text-2xl">
              {t("driversTitle")}
            </h3>
            <p className="mt-3 leading-relaxed text-foreground-secondary">
              {t("drivers")}
            </p>
          </div>
          <div className="flex items-end border-t border-rule pt-6 md:col-span-5 md:border-t-0 md:pt-0">
            <Link
              href="/contact"
              className="inline-flex items-baseline gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
            >
              {t("ctaLine")}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
