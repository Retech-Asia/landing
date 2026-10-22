import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Direction B delivery section (RT-08, section 03). Static SSR server
 * component: the six delivery phases as an indexed two-column checklist,
 * each step ending with the concrete artifact the client sees.
 */

interface DeliveryStep {
  title: string;
  what: string;
  sees: string;
}

export function DeliverySection() {
  const t = useTranslations("home.delivery");
  const steps = t.raw("steps") as DeliveryStep[];

  return (
    <section className="py-16 md:py-24" aria-label={t("label")}>
      <Container>
        <SectionHeader
          number="03"
          label={t("label")}
          title={t("h2")}
          description={t("lede")}
        />

        <ol className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
          {steps.map((step, i) => (
            <li key={step.title} className="border-t border-rule-soft py-6 md:py-8">
              <p className="font-display text-sm font-semibold text-foreground" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display-title mt-2 text-lg leading-snug text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                {step.what}
              </p>
              <p className="mt-3 text-sm text-foreground-muted">
                {t("seesLabel")} {step.sees}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
