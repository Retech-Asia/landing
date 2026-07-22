import { BlogListSkeleton } from "@/components/ui/Skeleton";

export default function BlogLoading() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Decorative gradient orbs — matching blog/page.tsx */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-20 left-[10%] w-[50vw] h-[50vw] rounded-full bg-brand/[0.03] blur-[100px] animate-mesh-4" />
        <div className="absolute top-[30%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-accent-cyan/[0.03] blur-[100px] animate-mesh-5" />
        <div className="absolute -bottom-10 left-[30%] w-[35vw] h-[35vw] rounded-full bg-accent-violet/[0.02] blur-[100px] animate-mesh-3" />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative">
        <BlogListSkeleton />

        {/* Cross-links section skeleton */}
        <div className="mt-16 pt-12 border-t border-black/[0.06]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="h-6 w-32 skeleton-shimmer rounded-lg" aria-hidden="true" />
              <div className="h-4 w-full skeleton-shimmer rounded-md" aria-hidden="true" />
              <div className="h-4 w-3/4 skeleton-shimmer rounded-md" aria-hidden="true" />
              <div className="space-y-2 mt-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-4 w-40 skeleton-shimmer rounded-md" aria-hidden="true" />
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-6 w-28 skeleton-shimmer rounded-lg" aria-hidden="true" />
              <div className="h-4 w-full skeleton-shimmer rounded-md" aria-hidden="true" />
              <div className="h-4 w-3/4 skeleton-shimmer rounded-md" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
