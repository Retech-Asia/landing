"use client";

import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ConceptDemoLabel } from "./ConceptDemoLabel";

/**
 * CRM service-page preview (creative handoff §1/§6): approved heading +
 * supporting copy + CTA above a substantial, genuinely interactive embed of
 * the Northline CRM concept demo. The demo is client-only and code-split so
 * it adds nothing to the service page's initial bundle.
 */

const COPY = {
  en: {
    heading: "See what a thoughtfully designed CRM can do.",
    body: "Business software should make complex workflows easier to manage. Explore our interactive CRM concept to see how dashboards, customer records, sales pipelines, and automation can work together.",
    cta: "Explore the CRM Demo",
    demoLabel: "Interactive preview — Northline CRM overview screen",
  },
  vi: {
    heading: "Khám phá khả năng của một CRM được thiết kế bài bản.",
    body: "Phần mềm doanh nghiệp cần giúp quản lý quy trình phức tạp dễ dàng hơn. Hãy trải nghiệm mô hình CRM tương tác của chúng tôi để xem dashboard, hồ sơ khách hàng, quy trình bán hàng và tự động hóa phối hợp như thế nào.",
    cta: "Trải nghiệm CRM mẫu",
    demoLabel: "Xem trước tương tác — màn hình tổng quan Northline CRM",
  },
} as const;

const NorthlineDemo = dynamic(
  () =>
    import("./northline/NorthlineShell").then((m) => ({ default: m.NorthlineApp })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[420px] items-center justify-center rounded-xl border border-[var(--nl-border)] bg-[#F6F8F8]">
        <div className="text-sm text-[#64748B]">…</div>
      </div>
    ),
  }
);

export function CrmShowcasePreview({ locale }: { locale: "en" | "vi" }) {
  const t = COPY[locale];
  return (
    <section id="concept-demo" className="relative py-20 md:py-28 overflow-hidden scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <ConceptDemoLabel locale={locale} className="mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            {t.heading}
          </h2>
          <p className="text-lg text-foreground-secondary leading-relaxed">{t.body}</p>
        </div>

        {/* Substantial interactive embed — the application UI itself is the
            visual (handoff §2: no stock photography, no thumbnails). */}
        <div
          className="mt-10 rounded-2xl border border-foreground/10 bg-white p-2 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] md:p-3"
          aria-label={t.demoLabel}
        >
          <NorthlineDemo locale={locale} />
        </div>

        <div className="mt-8">
          <Link
            href="/showcases/northline-crm"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            {t.cta}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
