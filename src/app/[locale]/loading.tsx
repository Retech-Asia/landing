import { Skeleton } from "@/components/ui/Skeleton";

export default function RootLoading() {
  return (
    <>
      {/* Hero section skeleton */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-20 left-[15%] w-[50vw] h-[50vw] rounded-full bg-brand/[0.03] blur-[100px]" />
          <div className="absolute top-[20%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-accent-cyan/[0.03] blur-[100px]" />
        </div>

        <div className="mx-auto max-w-7xl px-6 relative">
          <div className="max-w-3xl">
            {/* Badge / label */}
            <Skeleton className="h-7 w-40 rounded-full mb-6" />
            {/* Main heading lines */}
            <Skeleton className="h-12 md:h-16 w-full rounded-xl mb-3" />
            <Skeleton className="h-12 md:h-16 w-4/5 rounded-xl mb-3" />
            <Skeleton className="h-12 md:h-16 w-3/5 rounded-xl mb-8" />
            {/* Subtitle */}
            <Skeleton className="h-5 w-full max-w-xl rounded-lg mb-2" />
            <Skeleton className="h-5 w-3/4 max-w-md rounded-lg mb-10" />
            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <Skeleton className="h-12 w-40 rounded-full" />
              <Skeleton className="h-12 w-40 rounded-full" />
            </div>
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

      {/* Service preview skeleton — 3-column cards */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <Skeleton className="h-3 w-24 rounded-full mx-auto mb-4" />
            <Skeleton className="h-9 md:h-11 w-72 mx-auto rounded-lg mb-4" />
            <Skeleton className="h-4 w-80 mx-auto rounded-md" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
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
    </>
  );
}
