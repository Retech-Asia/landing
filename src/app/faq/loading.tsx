import { Skeleton } from "@/components/ui/Skeleton";

export default function FAQLoading() {
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
            <Skeleton className="h-3 w-16 rounded-full mx-auto mb-4" />
            <Skeleton className="h-9 md:h-11 w-48 mx-auto rounded-lg mb-4" />
            <Skeleton className="h-4 w-80 mx-auto rounded-md" />
          </div>
        </div>
      </section>

      {/* FAQ accordion skeleton */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-white border border-black/[0.06] p-5">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-3/4 rounded-lg" />
                  <Skeleton className="h-5 w-5 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
