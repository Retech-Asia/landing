import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { caseStudies, flattenCaseStudy } from "@/lib/case-studies-data";
import { BLUR_DATA_URL } from "@/lib/image-placeholders";

/**
 * Section 02 — Selected work (visual-experience round, 2026-10-23).
 * Replaces the five identical ruled rows with an editorial rhythm:
 * the first study as a full-width cinematic cover, the remaining four as
 * varied asymmetric rows (7/5 and 5/7). Covers are contextual photography
 * (public/images/photo/, provenance in photography.ts) — the coversNote
 * keeps that honest; product captures stay captioned on the detail pages.
 * All facts (titles, taglines, industries, tech) come from the verified
 * case-studies data. Hover treatments are CSS-only; reduced-motion disables
 * the image scale.
 */

/** Study id → contextual cover (distinct per project domain). */
const COVERS: Record<string, { src: string; alt: string }> = {
  "mining-analytics-platform": {
    src: "/images/photo/photo-work-mining.webp",
    alt: "Server racks with cabling in a dark operations room",
  },
  "asset-management-platform": {
    src: "/images/photo/photo-work-asset.webp",
    alt: "Residential building facade with lit windows at dusk",
  },
  "investment-intelligence-platform": {
    src: "/images/photo/photo-work-invest.webp",
    alt: "Market chart with trend overlay on a trading screen",
  },
  "fintech-card-marketing": {
    src: "/images/photo/photo-work-fintech.webp",
    alt: "Payment card used at a laptop during an online checkout",
  },
  "ai-analysis-saas": {
    src: "/images/photo/photo-work-ai-analysis.webp",
    alt: "Analyst reviewing charts and graphs on a laptop",
  },
};

export function OurWork() {
  const t = useTranslations("home.work");
  const locale = useLocale() as "en" | "vi";
  const studies = caseStudies.map((cs) => flattenCaseStudy(cs, locale));
  const [first, ...rest] = studies;

  return (
    <section
      id="work"
      className="border-b border-rule bg-background-subtle py-16 md:py-24"
      aria-label={t("label")}
    >
      <Container>
        <SectionHeader
          number="03"
          label={t("label")}
          title={t("h2")}
          description={t("lede")}
        />
        <p className="mt-4 max-w-3xl text-xs leading-relaxed text-foreground-muted">
          {t("coversNote")}
        </p>

        {/* Lead study — full-width cinematic cover */}
        <CoverLink
          study={first}
          className="group mt-10 block md:mt-14"
        >
          <div className="relative overflow-hidden">
            <Image
              src={COVERS[first.id].src}
              alt={COVERS[first.id].alt}
              width={2000}
              height={1125}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="h-[240px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100 md:h-[520px]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/75 motion-reduce:transition-none"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/80">
                {first.industry}
              </p>
              <h3 className="font-display-title mt-2 max-w-2xl text-2xl leading-tight text-white md:text-4xl">
                {first.title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
                {first.tagline}
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground-secondary">
            {first.summary}
          </p>
        </CoverLink>

        {/* Remaining studies — varied asymmetric editorial rows */}
        <div className="mt-14 space-y-14 md:mt-20 md:space-y-20">
          {rest.map((study, i) => {
            const cover = COVERS[study.id];
            const flip = i % 2 === 1;
            return (
              <CoverLink
                key={study.id}
                study={study}
                className="group grid grid-cols-1 items-center gap-6 md:grid-cols-12 md:gap-10"
              >
                <div
                  className={`relative overflow-hidden md:col-span-7 ${
                    flip ? "md:order-2" : ""
                  }`}
                >
                  <Image
                    src={cover.src}
                    alt={cover.alt}
                    width={2000}
                    height={1125}
                    sizes="(max-width: 768px) 100vw, 58vw"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="h-[220px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100 md:h-[340px]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent md:from-black/35"
                    aria-hidden="true"
                  />
                </div>
                <div className={flip ? "md:order-1 md:col-span-5" : "md:col-span-5"}>
                  <p className="font-display text-sm text-foreground-muted tabular-nums">
                    {String(i + 2).padStart(2, "0")}
                  </p>
                  <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-foreground-muted">
                    {study.industry}
                  </p>
                  <h3 className="font-display-title mt-2 text-2xl leading-tight text-foreground transition-colors group-hover:text-brand md:text-3xl">
                    {study.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-foreground-muted">
                    {study.tagline}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-foreground-secondary">
                    {study.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {study.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-card-border bg-background px-3 py-1 text-xs font-medium text-foreground-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </CoverLink>
            );
          })}
        </div>

        <div className="mt-12 border-t border-rule pt-8">
          <Link
            href="/case-studies"
            className="inline-flex items-baseline gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
          >
            {t("viewAll")}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}

/**
 * Whole-composition link wrapper. The visible challenge/description text is
 * inside the accessible name via aria-labelledby on the heading — screen
 * readers get title + industry, not the full paragraph run.
 */
function CoverLink({
  study,
  className,
  children,
}: {
  study: { id: string; slug: string; title: string; industry: string };
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className={`block rounded-none focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-brand ${className ?? ""}`}
      aria-label={`${study.title} — ${study.industry}`}
    >
      {children}
    </Link>
  );
}
