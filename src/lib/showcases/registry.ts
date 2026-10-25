import type { Locale } from "@/i18n/routing";
import type { ShowcaseDefinition } from "./types";

/**
 * Registered product showcases. Content comes verbatim from the approved
 * Wave 1 creative handoff (2026-10-25, docs/product-showcase-roadmap.md);
 * copy is not invented locally.
 */
export const SHOWCASES: ShowcaseDefinition[] = [
  {
    id: "crm",
    slug: { en: "northline-crm", vi: "northline-crm" },
    product: { en: "Northline CRM", vi: "Northline CRM" },
    tagline: {
      en: "From first inquiry to closed deal, in one calm workspace.",
      vi: "Từ liên hệ đầu tiên đến khi chốt hợp đồng, trong một không gian làm việc thống nhất.",
    },
    description: {
      en: "Explore a custom CRM concept connecting lead management, sales pipelines, customer records, workflow automation, and reporting. Navigate five interactive screens built with realistic sample data.",
      vi: "Khám phá mô hình CRM tùy chỉnh kết nối quản lý khách hàng tiềm năng, quy trình bán hàng, hồ sơ khách hàng, tự động hóa và báo cáo. Trải nghiệm năm màn hình tương tác với dữ liệu minh họa.",
    },
    views: [
      {
        id: "dashboard",
        title: { en: "Overview", vi: "Tổng quan" },
        summary: {
          en: "Review pipeline value, open opportunities, upcoming tasks, and recent activity in one operational dashboard.",
          vi: "Theo dõi giá trị cơ hội kinh doanh, các cơ hội đang mở, công việc sắp tới và hoạt động gần đây trên một dashboard.",
        },
      },
      {
        id: "leads",
        title: { en: "Leads", vi: "Khách hàng tiềm năng" },
        summary: {
          en: "Search, filter, assign, and organize leads using a data-rich management interface.",
          vi: "Tìm kiếm, lọc, phân công và quản lý khách hàng tiềm năng qua giao diện dữ liệu chi tiết.",
        },
      },
      {
        id: "pipeline",
        title: { en: "Pipeline", vi: "Quy trình bán hàng" },
        summary: {
          en: "Follow opportunities through sales stages with clear ownership, deal values, and next actions.",
          vi: "Theo dõi cơ hội kinh doanh qua từng giai đoạn với người phụ trách, giá trị dự kiến và bước tiếp theo.",
        },
      },
      {
        id: "customers",
        title: { en: "Customer 360°", vi: "Hồ sơ khách hàng 360°" },
        summary: {
          en: "Explore one connected customer record containing contacts, deals, notes, tasks, and communication history.",
          vi: "Xem hồ sơ khách hàng thống nhất gồm liên hệ, cơ hội kinh doanh, ghi chú, công việc và lịch sử tương tác.",
        },
      },
      {
        id: "automation",
        title: { en: "Automation & Insights", vi: "Tự động hóa & Báo cáo" },
        summary: {
          en: "Examine rule-based workflows, simulated triggers, and operational reporting without connecting to real external systems.",
          vi: "Khám phá quy trình tự động, điều kiện kích hoạt mô phỏng và báo cáo vận hành mà không kết nối hệ thống thật.",
        },
      },
    ],
    label: "concept-demo",
  },
];

export function getShowcaseBySlug(
  slug: string,
  locale: Locale
): ShowcaseDefinition | undefined {
  return SHOWCASES.find((s) => s.slug[locale] === slug);
}

export function getShowcaseById(id: string): ShowcaseDefinition | undefined {
  return SHOWCASES.find((s) => s.id === id);
}
