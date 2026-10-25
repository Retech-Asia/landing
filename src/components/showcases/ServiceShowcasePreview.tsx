"use client";

import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ConceptDemoLabel } from "./ConceptDemoLabel";

/**
 * Service-page concept-demo preview (creative handoffs §service-integration):
 * approved heading + supporting copy + CTA above a substantial, genuinely
 * interactive embed of the product's concept demo. Config-driven per service
 * id; renders nothing for services without an approved handoff. Demos are
 * client-only and code-split so they add nothing to the service page's
 * initial bundle.
 */

type PreviewCopy = {
  heading: string;
  body: string;
  cta: string;
  demoLabel: string;
};

const PREVIEWS: Record<
  string,
  { showcaseId: string; showcaseSlug: string; copy: Record<"en" | "vi", PreviewCopy> }
> = {
  "crm-systems": {
    showcaseId: "crm",
    showcaseSlug: "northline-crm",
    copy: {
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
    },
  },
  "erp-solutions": {
    showcaseId: "erp",
    showcaseSlug: "meridian-operations",
    copy: {
      en: {
        heading: "See how connected operations come together.",
        body: "Explore purchasing, stock visibility and approval workflows in an interactive ERP concept. See how complex operational information can become easier to understand and manage.",
        cta: "Explore ERP Demo",
        demoLabel: "Interactive preview — Meridian Operations overview screen",
      },
      vi: {
        heading: "Khám phá cách các quy trình vận hành được kết nối.",
        body: "Trải nghiệm mô hình ERP kết nối mua hàng, tồn kho và quy trình phê duyệt. Khám phá cách thông tin vận hành phức tạp có thể được tổ chức rõ ràng và dễ quản lý hơn.",
        cta: "Trải nghiệm ERP mẫu",
        demoLabel: "Xem trước tương tác — màn hình tổng quan Meridian Operations",
      },
    },
  },
  "cms-platforms": {
    showcaseId: "cms",
    showcaseSlug: "forma-studio",
    copy: {
      en: {
        heading: "Publishing tools should feel as thoughtful as the content.",
        body: "Explore an editorial workspace that brings writing, review, assets and scheduling together without losing the simplicity of a focused content experience.",
        cta: "Explore CMS Demo",
        demoLabel: "Interactive preview — Forma Studio editorial desk screen",
      },
      vi: {
        heading: "Công cụ xuất bản cũng cần được thiết kế chỉn chu như nội dung.",
        body: "Trải nghiệm không gian biên tập kết nối soạn thảo, duyệt bài, quản lý tài nguyên và lên lịch xuất bản trong một giao diện dễ sử dụng.",
        cta: "Trải nghiệm CMS mẫu",
        demoLabel: "Xem trước tương tác — màn hình bàn biên tập Forma Studio",
      },
    },
  },
};

function DemoSkeleton() {
  return (
    <div className="flex h-[420px] items-center justify-center rounded-xl border border-foreground/10 bg-[#F6F7F6]">
      <div className="text-sm text-[#64748B]">…</div>
    </div>
  );
}

const NorthlineDemo = dynamic(
  () => import("./northline/NorthlineShell").then((m) => ({ default: m.NorthlineApp })),
  { ssr: false, loading: DemoSkeleton }
);

const MeridianDemo = dynamic(
  () => import("./meridian/MeridianShell").then((m) => ({ default: m.MeridianApp })),
  { ssr: false, loading: DemoSkeleton }
);

const FormaDemo = dynamic(
  () => import("./forma/FormaShell").then((m) => ({ default: m.FormaApp })),
  { ssr: false, loading: DemoSkeleton }
);

const DEMOS: Record<string, React.ComponentType<{ locale: "en" | "vi" }>> = {
  crm: NorthlineDemo,
  erp: MeridianDemo,
  cms: FormaDemo,
};

export function ServiceShowcasePreview({
  serviceId,
  locale,
}: {
  serviceId: string;
  locale: "en" | "vi";
}) {
  const config = PREVIEWS[serviceId];
  if (!config) return null;
  const t = config.copy[locale];
  const Demo = DEMOS[config.showcaseId];

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
            visual (creative handoff: no stock photography, no thumbnails). */}
        <div
          className="mt-10 rounded-2xl border border-foreground/10 bg-white p-2 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] md:p-3"
          aria-label={t.demoLabel}
        >
          <Demo locale={locale} />
        </div>

        <div className="mt-8">
          <Link
            href={`/showcases/${config.showcaseSlug}`}
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
