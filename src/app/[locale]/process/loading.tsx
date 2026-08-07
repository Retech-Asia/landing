import { Skeleton } from "@/components/ui/Skeleton";

export default function ProcessLoading() {
  return (
    <>
      {/* Hero section skeleton */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-20 left-[15%] w-[50vw] h-[50vw] rounded-full bg-brand/[0.03] blur-[100px]" />
          <div className="absolute top-[20%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-accent-cyan/[0.03] blur-[100px]" />
        </div>
        <div className="mx-auto max-w-7xl px-6 relative">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <Skeleton className="h-3 w-10 rounded-md" />
            <span className="text-foreground-muted/30">/</span>
            <Skeleton className="h-3 w-20 rounded-md" />
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <Skeleton className="h-3 w-24 rounded-full mx-auto mb-4" />
            <Skeleton className="h-12 md:h-16 w-full rounded-xl mx-auto mb-3" />
            <Skeleton className="h-5 w-full max-w-xl rounded-lg mx-auto mb-2" />
            <Skeleton className="h-5 w-3/4 max-w-md rounded-lg mx-auto" />
          </div>
        </div>
      </section>

      {/* 6-phase process skeleton */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <Skeleton className="h-3 w-24 rounded-full mx-auto mb-4" />
            <Skeleton className="h-9 md:h-11 w-64 mx-auto rounded-lg mb-4" />
            <Skeleton className="h-4 w-80 mx-auto rounded-md" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] p-6 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <Skeleton className="h-5 w-28 rounded-lg" />
                </div>
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-5/6 rounded-md" />
                <Skeleton className="h-4 w-4/5 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ skeleton */}
      <section className="py-20 md:py-28 bg-background-subtle">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl mx-auto">
            <Skeleton className="h-9 md:h-11 w-48 rounded-lg mb-8" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-xl bg-white border border-black/[0.06] p-5">
                  <Skeleton className="h-5 w-3/4 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA skeleton */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <Skeleton className="h-9 md:h-10 w-72 rounded-lg mx-auto mb-4" />
            <Skeleton className="h-4 w-80 rounded-md mx-auto mb-8" />
            <div className="flex flex-wrap justify-center gap-4">
              <Skeleton className="h-12 w-36 rounded-full" />
              <Skeleton className="h-12 w-36 rounded-full" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
