import { Skeleton } from "@/components/ui/Skeleton";

export default function TechnologiesLoading() {
  return (
    <>
      {/* Hero section skeleton */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-20 left-[15%] w-[50vw] h-[50vw] rounded-full bg-brand/[0.03] blur-[100px]" />
          <div className="absolute top-[20%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-accent-cyan/[0.03] blur-[100px]" />
        </div>
        <div className="mx-auto max-w-7xl px-6 relative">
          <div className="text-center max-w-3xl mx-auto">
            <Skeleton className="h-3 w-28 rounded-full mx-auto mb-4" />
            <Skeleton className="h-9 md:h-11 w-80 mx-auto rounded-lg mb-4" />
            <Skeleton className="h-4 w-96 mx-auto rounded-md" />
          </div>
        </div>
      </section>

      {/* Tech grid skeleton */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl bg-white border border-black/[0.06] p-4 flex flex-col items-center gap-3"
              >
                <Skeleton className="h-10 w-10 rounded-lg" />
                <Skeleton className="h-3 w-16 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
