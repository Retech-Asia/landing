type Category = "Industry Insights" | "Guides" | "Technology";

const CATEGORY_LABELS: Record<Category, string> = {
  "Industry Insights": "Industry Insights",
  Guides: "Guide",
  Technology: "Technology",
};

interface BlogHeroProps {
  category: string;
  readTime?: string;
}

/**
 * Category meta plate for blog post detail pages.
 *
 * Visual-only (no title — the H1 above already covers it). Quiet neutral
 * plate with typographic chips (2026-10-27 visual-refinement round: the
 * category gradient wash, radial glows, ghosted category icon and floating
 * geometric shapes are retired with the decorative language).
 */
export function BlogHero({ category, readTime }: BlogHeroProps) {
  const label = CATEGORY_LABELS[category as Category] ?? category;

  return (
    <div
      className="relative w-full aspect-[16/7] md:aspect-[16/6] lg:aspect-[2.4/1] rounded-2xl overflow-hidden border border-card-border bg-background-subtle mb-10 md:mb-14"
      aria-hidden="true"
    >
      {/* Category badge + read time chip */}
      <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-card-bg border border-card-border text-xs font-semibold text-foreground">
          {label}
        </span>
        {readTime && (
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-card-bg border border-card-border text-xs font-medium text-foreground-secondary">
            {readTime}
          </span>
        )}
      </div>
    </div>
  );
}
