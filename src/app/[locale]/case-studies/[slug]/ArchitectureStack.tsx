import type { ArchitectureLayer } from "@/lib/case-studies-data";
import type { Locale } from "@/i18n/routing";

/**
 * "Built With" replacement (owner P1 directive, 2026-10-23): a layered stack
 * presentation instead of raw technology pills. Every item carries a one-line
 * role sourced from the study's own narrative; the data lives in
 * case-studies-data.ts (the inventory of record). Technologies not attributed
 * to a layer (e.g. TypeScript) surface as a stack-wide cross-cutting line so
 * the full inventory stays visible.
 *
 * Server component, CSS-only — no client JS, safe under reduced motion.
 * Connector dots are decorative #30AB47 accents (decorative-only law); no
 * text sits on the brand color. Text-only names — no fabricated provider
 * logos (trademark-safe).
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
    <div className="max-w-3xl mx-auto">
      {layers.map((layer, li) => (
        <div key={layer.label.en}>
          {li > 0 && (
            <div aria-hidden="true" className="flex flex-col items-center">
              <span className="h-4 w-px bg-rule-soft" />
              <span className="my-0.5 h-1.5 w-1.5 rounded-full bg-brand/70" />
              <span className="h-4 w-px bg-rule-soft" />
            </div>
          )}
          <div className="rounded-2xl bg-card-bg border border-card-border p-5 md:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]">
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-foreground-muted mb-4">
              {layer.label[locale]}
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {layer.items.map((item) => (
                <li key={item.name} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[0.4rem] h-2 w-2 flex-shrink-0 rounded-full bg-brand"
                  />
                  <div className="min-w-0">
                    <span className="block font-semibold text-foreground">{item.name}</span>
                    <span className="block text-sm leading-relaxed text-foreground-secondary">
                      {item.role[locale]}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      {stackWide.length > 0 && (
        <p className="mt-6 text-center text-sm text-foreground-muted">
          {crossCuttingLabel}: {stackWide.join(" · ")}
        </p>
      )}
    </div>
  );
}
