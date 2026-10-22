import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/**
 * Direction B closing contact band. Dark ground = bg-brand-dark (the
 * established brand-derived CTA-band surface used site-wide). Owner
 * directive 2026-10-22 retired the former bg-foreground (#1A1A2E) band:
 * large unapproved navy surfaces are out; dark areas derive from the brand
 * system. Static SSR band: no framer-motion, no entrance gates.
 */

const TRUST_KEYS = ["freeConsult", "estimate24h", "noCommit"] as const;

export function HomeCTA() {
  const t = useTranslations("home.finalCta");

  return (
    <section className="bg-brand-dark text-white" aria-label={t("titleLine1")}>
      <Container className="py-16 md:py-24">
        <div className="max-w-2xl">
          <h2 className="font-display-title text-balance text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            {t("titleLine1")}
            <br />
            {t("titleLine2")}
          </h2>

          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/85">
            {t("body")}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {/* Light card button: the green primary vanishes against the
                green band (same treatment as the services CTA band). */}
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="bg-card-bg text-foreground hover:bg-card-bg"
            >
              {t("cta")}
            </Button>
            <Button
              href="/case-studies"
              variant="ghost"
              size="lg"
              className="text-white/80 hover:bg-white/10 hover:text-white"
            >
              {t("secondary")}
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {TRUST_KEYS.map((key) => (
              <li
                key={key}
                className="flex items-center gap-1.5 text-sm text-white/80"
              >
                <CheckCircle className="h-4 w-4 shrink-0 text-white/90" aria-hidden="true" />
                {t(`trust.${key}`)}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
