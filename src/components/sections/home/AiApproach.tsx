import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Section 04 — AI approach (visual-experience round, 2026-10-23). Same two
 * lettered blocks (how we build with AI vs AI in the product), recomposed
 * as an asymmetric editorial spread: oversized watermark letters, top rules,
 * 5/7 column proportions — a typographic identity distinct from the
 * photographic sections around it. Static SSR server component.
 */

interface AiBlock {
  title: string;
  body: string;
  note: string;
}

const BLOCK_LETTERS = ["a", "b"];

export function AiApproach() {
  const t = useTranslations("home.ai");
  const blocks = t.raw("blocks") as AiBlock[];

  return (
    <section
      className="border-b border-rule bg-background-subtle py-16 md:py-24"
      aria-label={t("label")}
    >
      <Container>
        <SectionHeader number="05" label={t("label")} title={t("h2")} />

        <div className="mt-10 grid grid-cols-1 gap-10 md:mt-14 md:grid-cols-12 md:gap-14">
          {blocks.map((block, i) => (
            <div
              key={block.title}
              className={`relative border-t border-rule pt-8 md:pt-10 ${
                i === 0 ? "md:col-span-5" : "md:col-span-7"
              }`}
            >
              <p
                className="font-display-title pointer-events-none absolute -top-2 right-0 select-none text-7xl leading-none text-rule-soft md:text-8xl"
                aria-hidden="true"
              >
                {BLOCK_LETTERS[i]}
              </p>
              <h3 className="font-display-title relative max-w-sm text-xl leading-snug text-foreground md:text-2xl">
                {block.title}
              </h3>
              <p className="relative mt-4 max-w-xl leading-relaxed text-foreground-secondary">
                {block.body}
              </p>
              <p className="relative mt-5 border-l-2 border-brand pl-4 text-sm italic text-foreground-muted">
                {block.note}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
