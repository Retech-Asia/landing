import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Direction B AI approach section (RT-08, section 04). Static SSR server
 * component: two lettered blocks separating how we build with AI from
 * what goes into the client's product.
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
        <SectionHeader number="04" label={t("label")} title={t("h2")} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {blocks.map((block, i) => (
            <div key={block.title} className="border border-rule-soft p-6 md:p-8">
              <p className="font-display text-lg font-semibold text-foreground" aria-hidden="true">
                {BLOCK_LETTERS[i]}
              </p>
              <h3 className="font-display-title mt-3 text-xl leading-snug text-foreground">
                {block.title}
              </h3>
              <p className="mt-3 leading-relaxed text-foreground-secondary">
                {block.body}
              </p>
              <p className="mt-4 text-sm italic text-foreground-muted">
                {block.note}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
