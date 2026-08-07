import { Skeleton } from "@/components/ui/Skeleton";

export default function AboutLoading() {
  return (
    <>
      {/* Hero section skeleton */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-20 left-[15%] w-[50vw] h-[50vw] rounded-full bg-brand/[0.03] blur-[100px]" />
          <div className="absolute top-[20%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-accent-cyan/[0.03] blur-[100px]" />
        </div>
        <div className="mx-auto max-w-7xl px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Skeleton className="h-3 w-24 rounded-full mx-auto mb-4" />
            <Skeleton className="h-12 md:h-16 w-full rounded-xl mx-auto mb-3" />
            <Skeleton className="h-12 md:h-16 w-4/5 rounded-xl mx-auto mb-3" />
            <Skeleton className="h-5 w-full max-w-xl rounded-lg mx-auto mb-2" />
            <Skeleton className="h-5 w-3/4 max-w-md rounded-lg mx-auto" />
          </div>
        </div>
      </section>

      {/* Stats bar skeleton */}
      <section className="border-y border-black/[0.06] bg-white/50">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center">
                <Skeleton className="h-8 w-16 rounded-lg mx-auto mb-2" />
                <Skeleton className="h-3 w-20 rounded-md mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline skeleton */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <Skeleton className="h-3 w-24 rounded-full mx-auto mb-4" />
            <Skeleton className="h-9 md:h-11 w-72 mx-auto rounded-lg mb-4" />
          </div>
          <div className="space-y-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-start gap-6">
                <div className="flex flex-col items-center">
                  <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                  {i < 3 && <div className="w-px h-16 bg-black/[0.06] mt-2" />}
                </div>
                <div className="flex-1 space-y-2 pt-2">
                  <Skeleton className="h-5 w-48 rounded-lg" />
                  <Skeleton className="h-4 w-full rounded-md" />
                  <Skeleton className="h-4 w-5/6 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team grid skeleton */}
      <section className="py-20 md:py-28 bg-background-subtle">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <Skeleton className="h-3 w-24 rounded-full mx-auto mb-4" />
            <Skeleton className="h-9 md:h-11 w-64 mx-auto rounded-lg mb-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-white border border-black/[0.06] p-6 space-y-3">
                <Skeleton className="h-16 w-16 rounded-full mx-auto" />
                <Skeleton className="h-5 w-32 rounded-lg mx-auto" />
                <Skeleton className="h-4 w-24 rounded-md mx-auto" />
                <Skeleton className="h-4 w-full rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
