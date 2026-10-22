import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

/**
 * Direction B proof strip (RT-08): one compact band directly under the
 * hero. Static server component, no motion, no client JS. The link
 * anchors to the selected-work section (id="work" on OurWork).
 */
export function ProofStrip() {
  const t = useTranslations("home.proof");

  return (
    <section className="bg-background-subtle border-b border-rule-soft">
      <Container>
        <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 py-4 text-center md:flex-nowrap md:justify-between md:text-left">
          <p className="text-sm font-semibold text-foreground">{t("line")}</p>
          <Link
            href="#work"
            className="inline-flex items-baseline gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-foreground-muted underline-offset-4 transition-colors hover:text-brand hover:underline"
          >
            {t("link")}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
