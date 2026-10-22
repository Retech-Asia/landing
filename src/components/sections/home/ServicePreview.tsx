import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IndexRow, IndexRowList } from "@/components/ui/IndexRow";
import { localizeServiceHref } from "@/lib/services-data";

/**
 * Direction B capabilities section (RT-08, section 01). Static SSR server
 * component: no motion, no client JS. A featured CRM block (the pillar
 * service) followed by the ruled capability index. Only capabilities with
 * a shipped page carry a href; the rest stay static rows until their
 * service pages ship (RT-08 sequence), so no dead links.
 */

interface ScopeItem {
  label: string;
  text: string;
}

interface CapabilityRow {
  title: string;
  what: string;
  fits: string;
}

export function ServicePreview() {
  const t = useTranslations("home.capabilities");
  const locale = useLocale() as "en" | "vi";

  const scope = t.raw("featured.scope") as ScopeItem[];
  const rows = t.raw("rows") as CapabilityRow[];

  // Row hrefs: only pages that exist today. Row 1 (web development) is
  // live; rows 2 to 5 have no page yet and render as static rows.
  const rowHrefs: (string | undefined)[] = [
    localizeServiceHref("/services/web-development", locale),
    undefined,
    undefined,
    undefined,
    undefined,
  ];

  return (
    <section className="py-16 md:py-24" aria-label={t("label")}>
      <Container>
        <SectionHeader
          number="01"
          label={t("label")}
          title={t("h2")}
          description={t("lede")}
        />

        {/* Featured block: the CRM pillar. Left = what it is and who it
            fits; right = scope as a ruled mini-index. */}
        <div className="mb-12 border border-rule-soft p-6 md:mb-16 md:grid md:grid-cols-2 md:gap-10 md:p-10">
          <div>
            <h3 className="font-display-title text-xl leading-snug text-foreground md:text-2xl">
              {t("featured.title")}
            </h3>
            <p className="mt-4 leading-relaxed text-foreground-secondary">
              {t("featured.what")}
            </p>
            <p className="mt-4 italic text-foreground-muted">
              {t("featured.fits")}
            </p>
          </div>
          <ul className="mt-8 border-t border-rule-soft md:mt-0">
            {scope.map((item) => (
              <li
                key={item.label}
                className="border-b border-rule-soft py-4 md:py-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-foreground">
                  {item.label}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-foreground-secondary">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <IndexRowList>
          {rows.map((row, i) => (
            <IndexRow
              key={row.title}
              number={`1.${i + 1}`}
              title={row.title}
              description={row.what}
              href={rowHrefs[i]}
            >
              {/* Fits line in the meta slot: reset the slot's uppercase
                  nowrap so the sentence wraps instead of overflowing. */}
              <span className="mt-1 block whitespace-normal normal-case tracking-normal text-foreground-muted md:text-right">
                {row.fits}
              </span>
            </IndexRow>
          ))}
        </IndexRowList>
      </Container>
    </section>
  );
}
