import { ServiceGridSkeleton } from "@/components/ui/Skeleton";

export default function ServicesLoading() {
  return (
    <>
      {/* Hero / Header area — matches services/page.tsx hero section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-20 left-[15%] w-[50vw] h-[50vw] rounded-full bg-brand/[0.03] blur-[100px]" />
          <div className="absolute top-[20%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-accent-cyan/[0.03] blur-[100px]" />
        </div>
        <div className="absolute inset-0 dot-pattern pointer-events-none opacity-30" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-6 relative">
          <ServiceGridSkeleton />
        </div>
      </section>

      {/* Comparison table section */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 md:mb-16 text-center">
            <div className="h-9 md:h-11 w-64 md:w-80 skeleton-shimmer rounded-lg mx-auto mb-4" aria-hidden="true" />
            <div className="h-4 w-80 skeleton-shimmer rounded-md mx-auto" aria-hidden="true" />
          </div>
          <div className="skeleton-shimmer h-64 rounded-2xl" aria-hidden="true" />
        </div>
      </section>

      {/* How We Work section — 4-column cards */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 md:mb-16 text-center">
            <div className="h-9 md:h-11 w-64 skeleton-shimmer rounded-lg mx-auto mb-4" aria-hidden="true" />
            <div className="h-4 w-96 skeleton-shimmer rounded-md mx-auto" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/80 border border-black/[0.06] p-6 space-y-3 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]"
              >
                <div className="flex items-center gap-3">
                  <div className="h-7 w-10 skeleton-shimmer rounded-lg" aria-hidden="true" />
                  <div className="h-5 w-5 skeleton-shimmer rounded-md" aria-hidden="true" />
                </div>
                <div className="h-5 w-24 skeleton-shimmer rounded-lg" aria-hidden="true" />
                <div className="h-4 w-full skeleton-shimmer rounded-md" aria-hidden="true" />
                <div className="h-4 w-5/6 skeleton-shimmer rounded-md" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
