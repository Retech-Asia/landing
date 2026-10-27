import type { Locale } from "@/i18n/routing";
import type { ShowcaseDefinition } from "./types";

/**
 * Registered product showcases. Content comes verbatim from the approved
 * Wave 1 creative handoff (2026-10-25, docs/product-showcase-roadmap.md);
 * copy is not invented locally.
 */
export const SHOWCASES: ShowcaseDefinition[] = [
  {
    id: "property",
    slug: { en: "property-studio", vi: "property-studio" },
    product: { en: "Property Studio", vi: "Property Studio" },
    tagline: {
      en: "Every property, lead, and next move in one place.",
      vi: "Mọi bất động sản, khách hàng và bước tiếp theo trong một nơi duy nhất.",
    },
    description: {
      en: "Explore a property management CRM concept connecting listings, leads, offers and agent workflows in one connected workspace. Navigate five interactive screens built on a realistic small-agency dataset.",
      vi: "Khám phá mô hình CRM quản lý bất động sản kết nối danh mục, khách hàng, đề xuất và quy trình đại lý trong một không gian làm việc thống nhất. Trải nghiệm năm màn hình tương tác trên tập dữ liệu thực tế.",
    },
    views: [
      {
        id: "property",
        title: { en: "Property Detail", vi: "Chi tiết bất động sản" },
        summary: {
          en: "One connected property record: gallery, specifications, price and status, location, documents, and linked leads and offers.",
          vi: "Hồ sơ bất động sản thống nhất: thư viện ảnh, thông số, giá và trạng thái, vị trí, tài liệu, cùng khách hàng và đề xuất liên quan.",
        },
      },
      {
        id: "portfolio",
        title: { en: "Portfolio", vi: "Danh mục bất động sản" },
        summary: {
          en: "Filterable portfolio of listings with status, price, occupancy and ownership at a glance.",
          vi: "Danh mục bất động sản có bộ lọc, hiển thị trạng thái, giá, tình trạng sử dụng và người phụ trách.",
        },
      },
      {
        id: "pipeline",
        title: { en: "Lead Pipeline", vi: "Quy trình khách hàng" },
        summary: {
          en: "Leads moving through qualifying, viewing, offer and closing stages with linked properties and next actions.",
          vi: "Khách hàng tiềm năng qua các giai đoạn sàng lọc, xem nhà, đề xuất và chốt với bất động sản liên quan.",
        },
      },
      {
        id: "map",
        title: { en: "Map View", vi: "Bản đồ" },
        summary: {
          en: "Schematic district map with status-colored pins and price details for every listing.",
          vi: "Bản đồ khu vực sơ đồ hóa với chân vịt theo trạng thái và thông tin giá của từng bất động sản.",
        },
      },
      {
        id: "companion",
        title: { en: "Agent Companion", vi: "Trợ lý hiện trường" },
        summary: {
          en: "On-site companion for agents: property facts, quick lead capture and appointment check-in from a phone-width panel.",
          vi: "Trợ lý hiện trường cho đại lý: thông tin bất động sản, ghi nhận khách hàng nhanh và xác nhận lịch hẹn trên khung chiều rộng điện thoại.",
        },
      },
    ],
    label: "concept-demo",
  },
  {
    id: "care",
    slug: { en: "care-companion", vi: "care-companion" },
    product: { en: "Care Companion", vi: "Care Companion" },
    tagline: {
      en: "A more connected experience between visits.",
      vi: "Trải nghiệm gắn kết hơn giữa các lần thăm khám.",
    },
    description: {
      en: "Explore a mobile-first healthcare concept connecting patients and care teams between visits — daily guidance, care plans, medications, appointments and messages in one calm experience.",
      vi: "Khám phá mô hình ứng dụng di động kết nối bệnh nhân và đội ngũ chăm sóc giữa các lần thăm khám — lịch hằng ngày, kế hoạch chăm sóc, thuốc, lịch hẹn và tin nhắn trong một trải nghiệm thống nhất.",
    },
    views: [
      {
        id: "today",
        title: { en: "Today", vi: "Hôm nay" },
        summary: {
          en: "The patient's day at a glance: next appointment, care-plan progress and a medication reminder.",
          vi: "Ngày của bệnh nhân trong một màn hình: lịch hẹn gần nhất, tiến độ kế hoạch chăm sóc và nhắc thuốc.",
        },
      },
      {
        id: "care-plan",
        title: { en: "Care Plan", vi: "Kế hoạch chăm sóc" },
        summary: {
          en: "Task check-ins and weekly progress across the active care plan.",
          vi: "Ghi nhận tiến độ và tiến bộ hằng tuần trong kế hoạch chăm sóc.",
        },
      },
      {
        id: "medications",
        title: { en: "Medications", vi: "Thuốc" },
        summary: {
          en: "Medication schedule, reminders and an adherence streak the patient can maintain.",
          vi: "Lịch uống thuốc, nhắc nhở và chuỗi ngày duy trì đều đặn của bệnh nhân.",
        },
      },
      {
        id: "appointments",
        title: { en: "Appointments", vi: "Lịch hẹn" },
        summary: {
          en: "Upcoming and past appointments with preparation steps and reschedule requests.",
          vi: "Lịch hẹn sắp tới và đã qua, với bước chuẩn bị và yêu cầu đổi lịch.",
        },
      },
      {
        id: "messages",
        title: { en: "Messages", vi: "Tin nhắn" },
        summary: {
          en: "A scripted, structured thread with the care team between visits.",
          vi: "Cuộc trò chuyện có cấu trúc với đội ngũ chăm sóc giữa các lần thăm khám.",
        },
      },
      {
        id: "clinic",
        title: { en: "Clinic Workspace", vi: "Không gian phòng khám" },
        summary: {
          en: "The care team's side: today's patients, schedule and care-plan templates.",
          vi: "Phía đội ngũ chăm sóc: bệnh nhân hôm nay, lịch làm việc và mẫu kế hoạch chăm sóc.",
        },
      },
    ],
    label: "concept-demo",
  },
  {
    id: "crm",
    slug: { en: "northline-crm", vi: "northline-crm" },
    product: { en: "Northline CRM", vi: "Northline CRM" },
    tagline: {
      en: "From first inquiry to closed deal, in one calm workspace.",
      vi: "Từ liên hệ đầu tiên đến khi chốt hợp đồng, trong một không gian làm việc thống nhất.",
    },
    description: {
      en: "Explore a custom CRM concept connecting lead management, sales pipelines, customer records, workflow automation, and reporting. Navigate five interactive screens built on a realistic dataset.",
      vi: "Khám phá mô hình CRM tùy chỉnh kết nối quản lý khách hàng tiềm năng, quy trình bán hàng, hồ sơ khách hàng, tự động hóa và báo cáo. Trải nghiệm năm màn hình tương tác trên tập dữ liệu thực tế.",
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
          en: "Examine rule-based workflows, trigger previews, and operational reporting across your pipeline and activity data.",
          vi: "Khám phá quy trình tự động, xem trước điều kiện kích hoạt và báo cáo vận hành trên dữ liệu cơ hội và hoạt động.",
        },
      },
    ],
    label: "concept-demo",
  },
  {
    id: "erp",
    slug: { en: "meridian-operations", vi: "meridian-operations" },
    product: { en: "Meridian Operations", vi: "Meridian Operations" },
    tagline: {
      en: "Every operation, connected.",
      vi: "Kết nối mọi hoạt động vận hành.",
    },
    description: {
      en: "Explore an ERP concept connecting purchasing, inventory, supplier records and approval workflows. See how operational information can move through one coordinated business system.",
      vi: "Khám phá mô hình ERP kết nối mua hàng, tồn kho, nhà cung cấp và quy trình phê duyệt. Trải nghiệm cách dữ liệu vận hành được quản lý trong một hệ thống thống nhất.",
    },
    views: [
      {
        id: "overview",
        title: { en: "Operations Overview", vi: "Tổng quan vận hành" },
        summary: {
          en: "Procurement summary, stock alerts, pending approvals and inbound shipments.",
          vi: "Tổng kết mua hàng, cảnh báo tồn kho, phê duyệt đang chờ và lô hàng đang về.",
        },
      },
      {
        id: "purchasing",
        title: { en: "Purchase Orders", vi: "Đơn mua hàng" },
        summary: {
          en: "Searchable PO table, supplier filters, detail drawer and order status.",
          vi: "Bảng đơn mua hàng có tìm kiếm, bộ lọc nhà cung cấp, chi tiết đơn và trạng thái.",
        },
      },
      {
        id: "inventory",
        title: { en: "Inventory Control", vi: "Quản lý tồn kho" },
        summary: {
          en: "Warehouse stock, reorder thresholds, SKU details and internal transfers.",
          vi: "Tồn kho theo kho, ngưỡng đặt hàng lại, chi tiết SKU và chuyển kho nội bộ.",
        },
      },
      {
        id: "approvals",
        title: { en: "Approval Center", vi: "Trung tâm phê duyệt" },
        summary: {
          en: "Approval inbox, purchase justification, decision history and review actions.",
          vi: "Hộp phê duyệt, lý do mua hàng, lịch sử quyết định và thao tác xét duyệt.",
        },
      },
    ],
    label: "concept-demo",
  },
  {
    id: "cms",
    slug: { en: "forma-studio", vi: "forma-studio" },
    product: { en: "Forma Studio", vi: "Forma Studio" },
    tagline: {
      en: "From first draft to published story.",
      vi: "Từ bản nháp đến nội dung xuất bản.",
    },
    description: {
      en: "Explore an editorial content platform with structured writing, review stages, media management and publication planning.",
      vi: "Khám phá nền tảng quản lý nội dung với công cụ biên tập, quy trình duyệt bài, thư viện hình ảnh và kế hoạch xuất bản.",
    },
    views: [
      {
        id: "desk",
        title: { en: "Editorial Desk", vi: "Bàn biên tập" },
        summary: {
          en: "Content status, featured drafts and assignments.",
          vi: "Trạng thái nội dung, bản nháp nổi bật và phân công.",
        },
      },
      {
        id: "editor",
        title: { en: "Content Editor", vi: "Trình biên tập" },
        summary: {
          en: "Title, summary, article body, structured metadata and preview.",
          vi: "Tiêu đề, tóm tắt, thân bài, siêu dữ liệu có cấu trúc và bản xem trước.",
        },
      },
      {
        id: "calendar",
        title: { en: "Publishing Calendar", vi: "Lịch xuất bản" },
        summary: {
          en: "Upcoming stories, scheduled dates and status changes.",
          vi: "Bài sắp xuất bản, ngày định lịch và thay đổi trạng thái.",
        },
      },
      {
        id: "library",
        title: { en: "Asset Library", vi: "Thư viện tài nguyên" },
        summary: {
          en: "Media cards, filters, selection and asset details.",
          vi: "Thẻ tài nguyên, bộ lọc, chọn lựa và chi tiết tài nguyên.",
        },
      },
    ],
    label: "concept-demo",
  },
  {
    id: "ai",
    slug: { en: "citewell", vi: "citewell" },
    product: { en: "Citewell", vi: "Citewell" },
    tagline: {
      en: "Answers connected to evidence.",
      vi: "Câu trả lời gắn liền với nguồn thông tin.",
    },
    description: {
      en: "Explore an AI knowledge-workspace concept focused on document retrieval, source citations, review workflows and answer quality.",
      vi: "Khám phá mô hình không gian tri thức AI tập trung vào tìm kiếm tài liệu, trích dẫn nguồn, quy trình kiểm duyệt và chất lượng câu trả lời.",
    },
    views: [
      {
        id: "answers",
        title: { en: "Answer Workspace", vi: "Không gian hỏi đáp" },
        summary: {
          en: "Curated questions, prepared answers and clickable citations.",
          vi: "Câu hỏi được tuyển chọn, câu trả lời được soạn sẵn và trích dẫn có thể nhấp vào.",
        },
      },
      {
        id: "sources",
        title: { en: "Source Library", vi: "Thư viện nguồn" },
        summary: {
          en: "Document list, version information, categories and excerpts.",
          vi: "Danh sách tài liệu, thông tin phiên bản, phân loại và đoạn trích.",
        },
      },
      {
        id: "review",
        title: { en: "Human Review", vi: "Kiểm duyệt" },
        summary: {
          en: "Pending answers, supporting evidence and approve/reject decisions.",
          vi: "Câu trả lời chờ duyệt, bằng chứng hỗ trợ và quyết định phê duyệt/từ chối.",
        },
      },
      {
        id: "quality",
        title: { en: "Quality Checks", vi: "Kiểm tra chất lượng" },
        summary: {
          en: "Deterministic example evaluation cases and outcomes.",
          vi: "Các trường hợp đánh giá mẫu tất định và kết quả.",
        },
      },
    ],
    label: "concept-demo",
  },
  {
    id: "mobile",
    slug: { en: "relay-field", vi: "relay-field" },
    product: { en: "Relay Field", vi: "Relay Field" },
    tagline: {
      en: "Field work, without the friction.",
      vi: "Công việc hiện trường, đơn giản và liền mạch.",
    },
    description: {
      en: "Explore a mobile-first field-service concept for daily schedules, job checklists, visit notes and offline synchronization.",
      vi: "Khám phá mô hình ứng dụng di động dành cho đội kỹ thuật hiện trường, hỗ trợ lịch công việc, danh sách kiểm tra, ghi chú và đồng bộ ngoại tuyến.",
    },
    views: [
      {
        id: "today",
        title: { en: "Today's Schedule", vi: "Lịch hôm nay" },
        summary: {
          en: "Technician schedule and upcoming visits.",
          vi: "Lịch kỹ thuật viên và các cuộc hẹn sắp tới.",
        },
      },
      {
        id: "job",
        title: { en: "Job Details", vi: "Chi tiết công việc" },
        summary: {
          en: "Customer site details, checklist and visit progress.",
          vi: "Thông tin khách hàng, danh sách kiểm tra và tiến độ.",
        },
      },
      {
        id: "notes",
        title: { en: "Visit Notes", vi: "Ghi chú công việc" },
        summary: {
          en: "Structured notes and photo attachment placeholders.",
          vi: "Ghi chú có cấu trúc và ảnh đính kèm.",
        },
      },
      {
        id: "sync",
        title: { en: "Offline Queue", vi: "Hàng đợi ngoại tuyến" },
        summary: {
          en: "Locally queued actions and sync state.",
          vi: "Hành động chờ đồng bộ và trạng thái đồng bộ.",
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
