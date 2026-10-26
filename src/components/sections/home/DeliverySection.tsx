import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassIcon, type GlassIconName } from "@/components/ui/GlassIcon";
import { BLUR_DATA_URL } from "@/lib/image-placeholders";

/**
 * Section 03 — Delivery (visual-experience round, 2026-10-23). Keeps the
 * six-phase checklist and its artifacts (no timeline reversion); adds a
 * full-height contextual photo column so the section stops reading as pure
 * text. Photo: photo-delivery-focus.webp (photography.ts). Static SSR
 * server component — no client JS.
 *
 * Glass kit round (same day): each phase carries its ReTech Glass kit
 * pictogram beside the title (discover → support, positional — the step
 * order is fixed in the messages, titles are localized so string keys
 * would break in VI).
 */

interface DeliveryStep {
  title: string;
  what: string;
  sees: string;
}

const DELIVERY_GLASS: GlassIconName[] = [
  "discover",
  "design",
  "build",
  "test",
  "launch",
  "support",
];

export function DeliverySection() {
  const t = useTranslations("home.delivery");
  const steps = t.raw("steps") as DeliveryStep[];

  return (
    <section className="py-16 md:py-24" aria-label={t("label")}>
      <Container>
        <SectionHeader
          number="04"
          label={t("label")}
          title={t("h2")}
          description={t("lede")}
        />

        <div className="mt-10 grid grid-cols-1 gap-10 md:mt-14 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-14">
          {/* Contextual photo column — engineering work in progress */}
          <div className="relative md:sticky md:top-24 md:self-start">
            <Image
              src="/images/photo/photo-delivery-focus.webp"
              alt="Engineer working across multiple displays during an active build"
              width={1400}
              height={1750}
              sizes="(max-width: 768px) 100vw, 40vw"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="h-[280px] w-full object-cover md:h-auto"
            />
          </div>

          <ol className="border-t border-rule">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="border-b border-rule-soft py-6 md:py-7"
              >
                <div className="grid grid-cols-[44px_1fr] gap-3">
                  <p
                    className="font-display text-sm text-foreground-muted tabular-nums"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <div className="flex items-center gap-3">
                      <GlassIcon name={DELIVERY_GLASS[i] ?? "discover"} size="sm" />
                      <h3 className="font-display-title text-lg leading-snug text-foreground md:text-xl">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                      {step.what}
                    </p>
                    <p className="mt-2 text-sm text-foreground-muted">
                      {t("seesLabel")} {step.sees}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
