import type { ArchitectureLayer } from "@/lib/case-studies-data";
import type { Locale } from "@/i18n/routing";

/**
 * Hallmark · redesign: stack-manifest · genre: editorial · system: site tokens
 * (docs/design-system.md). Replaces the stacked per-layer cards + connector
 * dots with a single manifest panel in the problem-ledger DNA: one rounded
 * bordered surface, hairline `divide-y` rows, each row split into a fixed
 * layer-label rail and the technology inventory. Technologies not attributed
 * to a layer (e.g. TypeScript) surface as a stack-wide footer row inside the
 * same panel so the full inventory stays visible.
 *
 * Every item still carries a one-line role sourced from the study's own
 * narrative; the data lives in case-studies-data.ts (the inventory of record).
 *
 * Server component, CSS-only — no client JS, safe under reduced motion.
 * Text-only names — no fabricated provider logos (trademark-safe).
 */
interface ArchitectureStackProps {
  layers: ArchitectureLayer[];
  technologies: string[];
  locale: Locale;
  crossCuttingLabel: string;
}

export function ArchitectureStack({
  layers,
  technologies,
  locale,
  crossCuttingLabel,
}: ArchitectureStackProps) {
  const covered = new Set(layers.flatMap((l) => l.items.map((i) => i.name)));
  const stackWide = technologies.filter((t) => !covered.has(t));

  return (
    <div
      data-stack-manifest="true"
      className="max-w-3xl mx-auto rounded-2xl bg-card-bg border border-card-border shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] divide-y divide-rule-soft"
    >
      {layers.map((layer) => (
        <div
          key={layer.label.en}
          className="md:grid md:grid-cols-[9rem_minmax(0,1fr)]"
        >
          <h3 className="px-5 pt-4 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-foreground-muted md:px-6 md:pt-6">
            {layer.label[locale]}
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 sm:gap-y-4 px-5 pb-5 pt-2 sm:pt-3 md:px-6 md:pb-6 md:pt-6">
            {layer.items.map((item) => (
              <li key={item.name} className="min-w-0">
                <span className="block font-semibold text-foreground">
                  {item.name}
                </span>
                <span className="block text-sm leading-relaxed text-foreground-secondary">
                  {item.role[locale]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {stackWide.length > 0 && (
        <div className="md:grid md:grid-cols-[9rem_minmax(0,1fr)]">
          <h3 className="px-5 pt-4 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-foreground-muted md:px-6 md:pt-6">
            {crossCuttingLabel}
          </h3>
          <p className="px-5 pb-5 pt-1 text-sm leading-relaxed text-foreground-secondary md:px-6 md:pb-6 md:pt-6">
            {stackWide.join(" · ")}
          </p>
        </div>
      )}
    </div>
  );
}
