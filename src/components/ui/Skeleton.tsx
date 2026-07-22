import { cn } from "@/lib/cn";

/* ---------------------------------------------------------------------------
   Skeleton — a single shimmer placeholder block.
   Supports variant-based sizing, circle mode, and custom className overrides.

   The shimmer animation is driven by the `.skeleton-shimmer` CSS class in
   globals.css which already respects `prefers-reduced-motion: reduce` by
   disabling the animation entirely.
   --------------------------------------------------------------------------- */

type SkeletonVariant = "text" | "heading" | "avatar" | "card" | "image" | "circle";

interface SkeletonProps {
  className?: string;
  variant?: SkeletonVariant;
  /** Renders a perfect circle (requires width/height via className). */
  circle?: boolean;
  style?: React.CSSProperties;
}

const variantClasses: Record<SkeletonVariant, string> = {
  text: "h-4 rounded-md",
  heading: "h-8 md:h-10 rounded-lg",
  avatar: "h-10 w-10 rounded-full",
  card: "h-48 rounded-2xl",
  image: "h-64 rounded-xl",
  circle: "rounded-full",
};

export function Skeleton({ className, variant, circle, style }: SkeletonProps) {
  return (
    <div
      className={cn(
        "skeleton-shimmer",
        variant ? variantClasses[variant] : "h-4 rounded-md",
        circle && "rounded-full",
        className,
      )}
      style={style}
      aria-hidden="true"
    />
  );
}

/* ---------------------------------------------------------------------------
   Composed skeleton layouts — one per page route.
   Each mirrors the actual page grid structure and content shape.
   --------------------------------------------------------------------------- */

/** Section heading skeleton — a label line + large title + description */
function SectionHeadingSkeleton({
  align = "center",
  showLabel,
}: {
  align?: "center" | "left";
  className?: string;
  showLabel?: boolean;
}) {
  return (
    <div
      className={`mb-12 md:mb-16 ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      {showLabel && (
        <Skeleton className="h-3 w-24 rounded-full mx-auto mb-4" />
      )}
      <Skeleton
        className={`h-9 md:h-11 w-64 md:w-80 rounded-lg ${
          align === "center" ? "mx-auto" : ""
        } mb-4`}
      />
      <Skeleton
        className={`h-4 w-64 md:w-[420px] rounded-md ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
      <Skeleton
        className={`h-4 w-52 md:w-72 rounded-md mt-2 ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}

/** Breadcrumb skeleton — small nav trail at top */
function BreadcrumbSkeleton() {
  return (
    <div className="flex items-center gap-2 mb-8">
      <Skeleton className="h-3 w-10 rounded-md" />
      <span className="text-foreground-muted/30">/</span>
      <Skeleton className="h-3 w-16 rounded-md" />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Blog listing skeleton
   Layout: section header + topic pills + 3-column card grid + newsletter
   --------------------------------------------------------------------------- */
export function BlogListSkeleton() {
  return (
    <div className="space-y-0">
      <BreadcrumbSkeleton />

      {/* Section heading */}
      <SectionHeadingSkeleton />

      {/* Topic pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {Array.from({ length: 9 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-8 rounded-full"
            style={{ width: `${60 + (i % 3) * 28}px` }}
          />
        ))}
      </div>

      {/* Blog cards — 3 columns matching blog/page.tsx grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>

      {/* Newsletter placeholder */}
      <div className="mt-16 md:mt-20">
        <div className="rounded-2xl bg-background-subtle/60 border border-black/[0.06] p-8 md:p-12 max-w-xl mx-auto">
          <Skeleton className="h-6 w-48 mx-auto mb-3 rounded-lg" />
          <Skeleton className="h-4 w-72 mx-auto mb-6 rounded-md" />
          <div className="flex gap-3 max-w-sm mx-auto">
            <Skeleton className="h-11 flex-1 rounded-xl" />
            <Skeleton className="h-11 w-28 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogCardSkeleton() {
  return (
    <div className="rounded-2xl border border-black/[0.06] bg-white overflow-hidden">
      {/* Gradient image area */}
      <div className="relative h-48 skeleton-shimmer rounded-none" />
      {/* Content */}
      <div className="p-6 space-y-3">
        <Skeleton className="h-5 w-3/4 rounded-lg" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-5/6 rounded-md" />
        {/* Footer */}
        <div className="flex items-center justify-between pt-4 mt-2 border-t border-black/[0.06]">
          <div className="flex items-center gap-3">
            <Skeleton className="h-3 w-20 rounded-md" />
            <Skeleton className="h-3 w-12 rounded-md" />
          </div>
          <Skeleton className="h-3 w-20 rounded-md" />
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Services grid skeleton
   Layout: hero section with breadcrumb + heading + 2-column service card grid
   --------------------------------------------------------------------------- */
export function ServiceGridSkeleton() {
  return (
    <div>
      {/* Hero header area */}
      <BreadcrumbSkeleton />
      <SectionHeadingSkeleton />

      {/* Service cards — 2 columns matching services/page.tsx grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <ServiceCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function ServiceCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] p-6 md:p-8 space-y-4">
      {/* Icon */}
      <Skeleton className="h-7 w-7 rounded-lg" />
      {/* Title */}
      <Skeleton className="h-6 w-1/2 rounded-lg" />
      {/* Subtitle */}
      <Skeleton className="h-4 w-2/3 rounded-md" />
      {/* Description lines */}
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-5/6 rounded-md" />
      {/* Learn more link */}
      <Skeleton className="h-4 w-24 rounded-md" />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Case studies skeleton
   Layout: hero + 2 alternating 2-column sections (screenshot + text)
   --------------------------------------------------------------------------- */
export function CaseStudySkeleton() {
  return (
    <div>
      {/* Hero header */}
      <BreadcrumbSkeleton />
      <SectionHeadingSkeleton align="left" />

      {/* Case study entries */}
      <div className="space-y-20">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            {/* Screenshot placeholder */}
            <div className="rounded-2xl border border-black/[0.06] bg-white overflow-hidden p-3">
              <div className="flex gap-2">
                <Skeleton className="h-64 flex-[3] rounded-lg" />
                <Skeleton className="h-64 flex-[2] rounded-lg" />
              </div>
            </div>

            {/* Text content placeholder */}
            <div className="space-y-4">
              <Skeleton className="h-3 w-20 rounded-full" />
              <Skeleton className="h-8 w-3/4 rounded-lg" />
              <Skeleton className="h-4 w-1/2 rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-5/6 rounded-md" />
              {/* Result stats — 2x2 grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {Array.from({ length: 4 }).map((_, j) => (
                  <Skeleton key={j} className="h-[72px] rounded-xl" />
                ))}
              </div>
              <Skeleton className="h-4 w-32 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Careers skeleton
   Layout: hero with breadcrumb + heading + 2-column job listing grid
   --------------------------------------------------------------------------- */
export function CareersSkeleton() {
  return (
    <div>
      {/* Hero header */}
      <BreadcrumbSkeleton />
      <div className="mb-12 md:mb-16">
        <Skeleton className="h-10 md:h-12 w-64 md:w-80 rounded-lg mb-4" />
        <Skeleton className="h-4 w-64 md:w-[440px] rounded-md" />
        <Skeleton className="h-4 w-60 md:w-72 rounded-md mt-2" />
      </div>

      {/* Section heading for "Current Openings" */}
      <SectionHeadingSkeleton showLabel />

      {/* Job cards — 2 columns matching careers/page.tsx grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function JobCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] p-6 space-y-4">
      {/* Department badge */}
      <Skeleton className="h-3 w-20 rounded-full" />
      {/* Job title */}
      <Skeleton className="h-5 w-1/2 rounded-lg" />
      {/* Description lines */}
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-4/5 rounded-md" />
      {/* Meta chips */}
      <div className="flex flex-wrap gap-3 pt-1">
        <Skeleton className="h-4 w-24 rounded-md" />
        <Skeleton className="h-4 w-20 rounded-md" />
        <Skeleton className="h-4 w-28 rounded-md" />
      </div>
      {/* Apply link */}
      <div className="pt-4 border-t border-black/[0.06]">
        <Skeleton className="h-4 w-24 rounded-md" />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Standalone re-export helpers for Suspense boundaries inside pages
   --------------------------------------------------------------------------- */

export function CardSkeleton() {
  return <BlogCardSkeleton />;
}

/* ---------------------------------------------------------------------------
   Dynamic import fallbacks — lightweight placeholders for lazy-loaded sections.
   Each renders a subtle shimmer block that matches the approximate height of
   the real section so the page doesn't jump when the chunk finishes loading.
   --------------------------------------------------------------------------- */

/** Generic section placeholder — full-width shimmer block with a heading hint */
export function SectionFallback({ className }: { className?: string }) {
  return (
    <div className={cn("py-20 md:py-28", className)}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-3 w-20 rounded-full" />
          <Skeleton className="h-8 w-64 rounded-lg" />
          <Skeleton className="h-4 w-64 rounded-md" />
          <div className="mt-8 w-full">
            <Skeleton className="h-64 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Compact section placeholder — for smaller sections like CTA bars */
export function CompactSectionFallback({ className }: { className?: string }) {
  return (
    <div className={cn("py-12 md:py-16", className)}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-3">
          <Skeleton className="h-8 w-56 rounded-lg" />
          <Skeleton className="h-4 w-72 rounded-md" />
          <div className="flex gap-4 mt-4">
            <Skeleton className="h-11 w-32 rounded-full" />
            <Skeleton className="h-11 w-32 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** ScrollVelocityText placeholder — single-line shimmer bar */
export function ScrollVelocityFallback() {
  return (
    <div className="py-4 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </div>
  );
}
