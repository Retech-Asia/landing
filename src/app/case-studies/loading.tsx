import { CaseStudySkeleton } from "@/components/ui/Skeleton";

export default function CaseStudiesLoading() {
  return (
    <>
      {/* Hero — matches case-studies/page.tsx hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-20 left-[15%] w-[50vw] h-[50vw] rounded-full bg-brand/[0.03] blur-[100px]" />
          <div className="absolute top-[20%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-accent-cyan/[0.03] blur-[100px]" />
        </div>
        <div className="absolute inset-0 grid-pattern pointer-events-none opacity-40" aria-hidden="true" />
        <div className="absolute inset-0 dot-pattern pointer-events-none opacity-20" aria-hidden="true" />

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <CaseStudySkeleton />
        </div>
      </section>

      {/* CTA section skeleton — matches the page's CTA section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="h-9 md:h-10 w-72 skeleton-shimmer rounded-lg mx-auto mb-4" aria-hidden="true" />
            <div className="h-4 w-80 skeleton-shimmer rounded-md mx-auto mb-8" aria-hidden="true" />
            <div className="flex flex-wrap justify-center gap-4">
              <div className="h-12 w-36 skeleton-shimmer rounded-full" aria-hidden="true" />
              <div className="h-12 w-36 skeleton-shimmer rounded-full" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
