import { CareersSkeleton } from "@/components/ui/Skeleton";

export default function CareersLoading() {
  return (
    <>
      {/* Hero area */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern pointer-events-none opacity-50" aria-hidden="true" />
        <div className="absolute inset-0 dot-pattern pointer-events-none opacity-25" aria-hidden="true" />

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <CareersSkeleton />
        </div>
      </section>

      {/* Why Work section placeholder */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 md:mb-16 text-center">
            <div className="h-9 md:h-11 w-64 skeleton-shimmer rounded-lg mx-auto mb-4" aria-hidden="true" />
            <div className="h-4 w-80 skeleton-shimmer rounded-md mx-auto" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] p-6 space-y-3"
              >
                <div className="h-6 w-6 skeleton-shimmer rounded-md" aria-hidden="true" />
                <div className="h-5 w-28 skeleton-shimmer rounded-lg" aria-hidden="true" />
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
