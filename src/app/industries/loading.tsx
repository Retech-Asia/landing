import { Skeleton } from "@/components/ui/Skeleton";

export default function IndustriesLoading() {
  return (
    <>
      {/* Hero area */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-20 left-[15%] w-[50vw] h-[50vw] rounded-full bg-brand/[0.03] blur-[100px]" />
          <div className="absolute top-[20%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-accent-cyan/[0.03] blur-[100px]" />
        </div>
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <Skeleton className="h-3 w-10 rounded-md" />
            <span className="text-foreground-muted/30">/</span>
            <Skeleton className="h-3 w-20 rounded-md" />
          </div>
          {/* Heading */}
          <div className="text-center mb-12">
            <Skeleton className="h-3 w-24 rounded-full mx-auto mb-4" />
            <Skeleton className="h-9 md:h-11 w-72 mx-auto rounded-lg mb-4" />
            <Skeleton className="h-4 w-80 mx-auto rounded-md" />
            <Skeleton className="h-4 w-64 mx-auto rounded-md mt-2" />
          </div>
        </div>
      </section>

      {/* Industry cards grid */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] p-6 space-y-3"
              >
                <Skeleton className="h-8 w-8 rounded-lg" />
                <Skeleton className="h-5 w-3/4 rounded-lg" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-5/6 rounded-md" />
                <Skeleton className="h-4 w-24 rounded-md mt-2" />
              </div>
            ))}
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
