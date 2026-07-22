import { Skeleton } from "@/components/ui/Skeleton";

export default function ContactLoading() {
  return (
    <>
      {/* Hero area */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-20 left-1/4 w-[50vw] h-[50vw] rounded-full bg-brand/[0.025] blur-[160px]" />
          <div className="absolute -bottom-10 right-1/4 w-[40vw] h-[40vw] rounded-full bg-accent-cyan/[0.02] blur-[140px]" />
        </div>
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <Skeleton className="h-3 w-10 rounded-md" />
            <span className="text-foreground-muted/30">/</span>
            <Skeleton className="h-3 w-16 rounded-md" />
          </div>
          {/* Heading */}
          <div className="text-center mb-12">
            <Skeleton className="h-3 w-16 rounded-full mx-auto mb-3" />
            <Skeleton className="h-9 md:h-11 w-48 mx-auto rounded-lg mb-4" />
            <Skeleton className="h-4 w-80 mx-auto rounded-md" />
            <Skeleton className="h-4 w-64 mx-auto rounded-md mt-2" />
          </div>
        </div>
      </section>

      {/* What to Expect skeleton */}
      <div className="mx-auto max-w-7xl px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-card-bg border border-card-border p-6 space-y-2">
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-lg" />
              </div>
              <Skeleton className="h-4 w-24 rounded-lg" />
              <Skeleton className="h-3 w-full rounded-md" />
            </div>
          ))}
        </div>

        {/* Form + sidebar skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-10">
          {/* Form area */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-white/95 border border-black/[0.06] p-6 md:p-8">
              <Skeleton className="h-5 w-40 rounded-lg mb-6" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-full rounded-lg" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Skeleton className="h-10 w-full rounded-lg" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-24 w-full rounded-lg" />
                <Skeleton className="h-12 w-40 rounded-full" />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-4">
            {/* Map placeholder */}
            <div className="rounded-xl bg-black/[0.03] h-48 skeleton-shimmer" />
            {/* Contact cards */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-card-border bg-white p-5">
                <div className="flex items-start gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-3 w-12 rounded-md" />
                    <Skeleton className="h-4 w-32 rounded-lg" />
                    <Skeleton className="h-3 w-40 rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
