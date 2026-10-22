import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/**
 * Direction B closing contact band (RT-08). Restyled from the animated
 * gradient CTA to a static dark ink band: no framer-motion, no entrance
 * gates, SSR text only. Keys, hrefs, and the trust indicators carry over
 * from the previous component unchanged; only the chrome changed.
 */

const TRUST_KEYS = ["freeConsult", "estimate24h", "noCommit"] as const;

export function HomeCTA() {
  const t = useTranslations("home.finalCta");

  return (
    <section className="bg-foreground text-background" aria-label={t("titleLine1")}>
      <Container className="py-16 md:py-24">
        <div className="max-w-2xl">
          <h2 className="font-display-title text-balance text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            {t("titleLine1")}
            <br />
            {t("titleLine2")}
          </h2>

          <p className="mt-5 max-w-lg text-lg leading-relaxed text-background/75">
            {t("body")}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact" variant="primary" size="lg">
              {t("cta")}
            </Button>
            {/* Ghost variant restyled inline for contrast on the ink band:
                its default foreground hover tones vanish on dark ground. */}
            <Button
              href="/case-studies"
              variant="ghost"
              size="lg"
              className="text-background/80 hover:bg-background/10 hover:text-background"
            >
              {t("secondary")}
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {TRUST_KEYS.map((key) => (
              <li
                key={key}
                className="flex items-center gap-1.5 text-sm text-background/70"
              >
                <CheckCircle className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                {t(`trust.${key}`)}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
