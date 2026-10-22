import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IndexRow, IndexRowList } from "@/components/ui/IndexRow";

/**
 * Direction B engagement section (RT-08, section 05). Static SSR server
 * component: the three engagement shapes as a lettered ruled index, then
 * the cost-driver note set apart under a hairline.
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
          number="05"
          label={t("label")}
          title={t("h2")}
        />

        <IndexRowList>
          {rows.map((row, i) => (
            <IndexRow
              key={row.title}
              number={ROW_LETTERS[i]}
              title={row.title}
              description={row.body}
            />
          ))}
        </IndexRowList>

        <div className="mt-8 max-w-3xl border-t border-rule pt-8">
          <h3 className="font-display-title text-xl leading-snug text-foreground md:text-2xl">
            {t("driversTitle")}
          </h3>
          <p className="mt-3 leading-relaxed text-foreground-secondary">
            {t("drivers")}
          </p>
        </div>
      </Container>
    </section>
  );
}
