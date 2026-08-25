import type { L } from "./services-data";
import type { Locale } from "@/i18n/routing";

export interface Testimonial {
  quote: L;
  author: L;
  role: L;
  company: L;
}

export interface TimelinePhase {
  phase: L;
  title: L;
  description: L;
}

export interface BeforeAfterMetric {
  metric: L;
  before: L;
  after: L;
  improvement: L;
}

export interface CaseStudy {
  /** Invariant id (= EN slug). */
  id: string;
  slug: L;
  title: L;
  tagline: L;
  description: L;
  industry: L;
  challenge: L;
  solution: L;
  impact: L;
  features: L[];
  keyResults: L[];
  results: { metric: L; value: L; numericValue?: number; suffix?: string }[];
  beforeAfter: BeforeAfterMetric[];
  timeline: TimelinePhase[];
  timelineDuration: L;
  teamSize: L;
  testimonial: Testimonial;
  technologies: string[];
  images: {
    dashboard: { src: string; width: number; height: number };
    mobile: { src: string; width: number; height: number };
  };
}

export const caseStudies: CaseStudy[] = [
  {
    id: "mining-analytics-platform",
    slug: { en: "mining-analytics-platform", vi: "phan-tich-mining" },
    title: { en: "Mining Analytics Platform", vi: "Nền tảng Phân tích Mining" },
    tagline: { en: "BTC Mining Operations Dashboard", vi: "Dashboard Vận hành Mining BTC" },
    description: {
      en: "A full-stack BTC mining analytics platform that ingests hashrate and worker metrics from F2Pool and ViaBTC, layers in CoinGecko market pricing and mempool-derived difficulty projections, and gives operators and admins a unified dashboard for performance, accounting, and manual data entry.",
      vi: "Nền tảng phân tích mining BTC full-stack tiếp nhận hashrate và worker metrics từ F2Pool và ViaBTC, tích hợp giá thị trường CoinGecko và dự báo difficulty từ mempool, cung cấp cho operator và admin một dashboard thống nhất cho hiệu suất, kế toán và nhập liệu thủ công.",
    },
    industry: { en: "Blockchain & Crypto", vi: "Blockchain & Crypto" },
    challenge: {
      en: "Mining operators were juggling multiple pool dashboards (F2Pool, ViaBTC), market data sources (CoinGecko, Mempool.space), and spreadsheets for manual adjustments. There was no single source of truth for hashrate, worker health, network difficulty, and BTC pricing, making it hard to forecast revenue or audit manual inputs after the fact.",
      vi: "Operator mining phải xử lý nhiều dashboard pool (F2Pool, ViaBTC), nguồn dữ liệu thị trường (CoinGecko, Mempool.space) và spreadsheet cho điều chỉnh thủ công. Không có nguồn dữ liệu thống nhất cho hashrate, tình trạng worker, network difficulty và giá BTC, khiến khó dự báo doanh thu hoặc audit đầu vào thủ công sau đó.",
    },
    solution: {
      en: "Retech Solutions built a NestJS + Prisma + PostgreSQL backend with a Next.js 15 frontend. The backend integrates with F2Pool and ViaBTC for pool metrics (encrypted credential storage, hourly/daily series capture, per-worker analytics), CoinGecko for cached market pricing, and Mempool.space for difficulty projections and reward window stats. JWT auth with refresh-token rotation and role-based guards separates user and super-admin surfaces. A manual-input flow with audit trails records operator adjustments alongside the automated feeds.",
      vi: "Retech Solutions xây dựng backend NestJS + Prisma + PostgreSQL với frontend Next.js 15. Backend tích hợp F2Pool và ViaBTC cho pool metrics (lưu credential mã hóa, capture series giờ/ngày, analytics per-worker), CoinGecko cho cache giá thị trường và Mempool.space cho dự báo difficulty và reward window. JWT auth với refresh-token rotation và role-based guard tách biệt bề mặt user và super-admin. Flow nhập liệu thủ công với audit trail ghi lại điều chỉnh của operator cùng với feed tự động.",
    },
    impact: {
      en: "Operators now see hashrate, worker health, market pricing, and network difficulty on one dashboard instead of four. Manual adjustments are logged with full audit history, ending the spreadsheet reconciliation cycle. The platform's snapshot history gives accountants a clean per-period view, and the role-based admin shell lets super-admins publish or draft entries without touching production data.",
      vi: "Operator hiện thấy hashrate, tình trạng worker, giá thị trường và network difficulty trên một dashboard thay vì bốn. Điều chỉnh thủ công được log với lịch sử audit đầy đủ, kết thúc chu kỳ đối soát spreadsheet. Lịch sử snapshot của nền tảng cung cấp cho kế toán góc nhìn per-period sạch, và admin shell role-based cho phép super-admin publish hoặc draft entry mà không động đến dữ liệu production.",
    },
    features: [
      {
        en: "Multi-pool ingestion: F2Pool + ViaBTC with encrypted credential storage",
        vi: "Ingestion multi-pool: F2Pool + ViaBTC với lưu credential mã hóa",
      },
      {
        en: "Hourly/daily hashrate series + per-worker and per-group analytics",
        vi: "Series hashrate giờ/ngày + analytics per-worker và per-group",
      },
      {
        en: "CoinGecko market pricing cache with automatic refresh TTLs",
        vi: "Cache giá CoinGecko với TTL refresh tự động",
      },
      {
        en: "Mempool-derived difficulty projections + reward window statistics",
        vi: "Dự báo difficulty từ Mempool + thống kê reward window",
      },
      {
        en: "JWT auth with refresh-token rotation + role-based super-admin guards",
        vi: "JWT auth với refresh-token rotation + guard super-admin role-based",
      },
      {
        en: "Manual input flow with draft/publish states + audit trail logging",
        vi: "Flow nhập liệu thủ công với state draft/publish + logging audit trail",
      },
    ],
    keyResults: [
      {
        en: "Consolidated 4 external data sources into a single dashboard",
        vi: "Hợp nhất 4 nguồn dữ liệu ngoài thành một dashboard duy nhất",
      },
      {
        en: "Manual input audit trail eliminated spreadsheet reconciliation",
        vi: "Audit trail đầu vào thủ công loại bỏ đối soát spreadsheet",
      },
      {
        en: "Per-worker analytics exposed across both mining pools",
        vi: "Analytics per-worker hiển thị trên cả hai pool mining",
      },
      {
        en: "Super-admin role gate prevents accidental production data edits",
        vi: "Gate role super-admin ngăn chỉnh sửa dữ liệu production vô tình",
      },
    ],
    results: [
      { metric: { en: "Data Sources Unified", vi: "Nguồn Dữ liệu Hợp nhất" }, value: { en: "4 pools + market", vi: "4 pool + thị trường" }, numericValue: 4, suffix: "+" },
      { metric: { en: "Worker Visibility", vi: "Tầm nhìn Worker" }, value: { en: "Cross-pool", vi: "Cross-pool" }, suffix: "" },
      { metric: { en: "Audit Coverage", vi: "Phạm vi Audit" }, value: { en: "100%", vi: "100%" }, numericValue: 100, suffix: "%" },
      { metric: { en: "Manual Reconciliation", vi: "Đối soát Thủ công" }, value: { en: "Eliminated", vi: "Loại bỏ" }, suffix: "" },
    ],
    beforeAfter: [
      { metric: { en: "Dashboard Switching", vi: "Chuyển Dashboard" }, before: { en: "4 tools", vi: "4 công cụ" }, after: { en: "1 unified view", vi: "1 góc nhìn thống nhất" }, improvement: { en: "75% less switching", vi: "Giảm 75% thao tác chuyển" } },
      { metric: { en: "Audit Trail", vi: "Audit Trail" }, before: { en: "Spreadsheets", vi: "Spreadsheet" }, after: { en: "Database-logged", vi: "Log database" }, improvement: { en: "100% tracked", vi: "100% theo dõi" } },
      { metric: { en: "Market Data Freshness", vi: "Độ mới Dữ liệu Thị trường" }, before: { en: "Manual refresh", vi: "Refresh thủ công" }, after: { en: "Cached + TTL-refreshed", vi: "Cache + TTL-refresh" }, improvement: { en: "Always current", vi: "Luôn cập nhật" } },
      { metric: { en: "Manual Entry Errors", vi: "Lỗi Nhập Thủ công" }, before: { en: "No history", vi: "Không lịch sử" }, after: { en: "Draft/publish + audit", vi: "Draft/publish + audit" }, improvement: { en: "Recoverable", vi: "Có thể khôi phục" } },
    ],
    timeline: [
      { phase: { en: "Phase 1", vi: "Giai đoạn 1" }, title: { en: "Discovery", vi: "Khám phá" }, description: { en: "Operator interviews, pool API capability mapping (F2Pool, ViaBTC, CoinGecko, Mempool), and audit workflow shadowing.", vi: "Phỏng vấn operator, ánh xạ khả năng pool API (F2Pool, ViaBTC, CoinGecko, Mempool) và shadowing quy trình audit." } },
      { phase: { en: "Phase 2", vi: "Giai đoạn 2" }, title: { en: "Design", vi: "Thiết kế" }, description: { en: "Dashboard UX with market header, pool summaries, hashrate charts, and super-admin manual-input modal.", vi: "UX dashboard với market header, pool summaries, hashrate charts và modal nhập liệu thủ công super-admin." } },
      { phase: { en: "Phase 3", vi: "Giai đoạn 3" }, title: { en: "Development", vi: "Phát triển" }, description: { en: "NestJS + Prisma backend with pool/market integrations, JWT auth, and audit logging. Next.js 15 frontend with role-aware shell.", vi: "Backend NestJS + Prisma với tích hợp pool/market, JWT auth và audit logging. Frontend Next.js 15 với role-aware shell." } },
      { phase: { en: "Phase 4", vi: "Giai đoạn 4" }, title: { en: "Launch", vi: "Ra mắt" }, description: { en: "Phased rollout with snapshot history backfill, super-admin UAT, and production monitoring setup.", vi: "Rollout theo giai đoạn với backfill lịch sử snapshot, UAT super-admin và thiết lập giám sát production." } },
    ],
    timelineDuration: { en: "5 months", vi: "5 tháng" },
    teamSize: { en: "6-person team", vi: "Đội 6 người" },
    testimonial: {
      quote: { en: "", vi: "" },
      author: { en: "", vi: "" },
      role: { en: "", vi: "" },
      company: { en: "", vi: "" },
    },
    technologies: ["Next.js", "TypeScript", "NestJS", "PostgreSQL", "Prisma", "Redis"],
    images: {
      dashboard: { src: "/images/stock/cs-wellness-hero.webp", width: 1200, height: 800 },
      mobile: { src: "/images/stock/cs-wellness-mobile.webp", width: 600, height: 800 },
    },
  },
  {
    id: "asset-management-platform",
    slug: { en: "asset-management-platform", vi: "quan-ly-tai-san" },
    title: { en: "Asset Management Platform", vi: "Nền tảng Quản lý Tài sản" },
    tagline: { en: "Investment Management System", vi: "Hệ thống Quản lý Đầu tư" },
    description: {
      en: "A web-based investment management system with interconnected admin, customer, and introducer portals for scalable financial operations. The platform streamlines investment workflows across three stakeholder roles with role-based access, portfolio and dividend tracking, document handling, and CSV/XLSX reporting.",
      vi: "Hệ thống quản lý đầu tư dựa trên web với cổng admin, customer và introducer liên kết cho vận hành tài chính khả mở. Nền tảng tinh gọn quy trình đầu tư trên ba vai trò stakeholder với truy cập role-based, theo dõi danh mục và cổ tức, xử lý tài liệu và báo cáo CSV/XLSX.",
    },
    industry: { en: "Finance", vi: "Tài chính" },
    challenge: {
      en: "The client was managing investment operations through fragmented spreadsheets and disconnected legacy systems, leading to slow reporting, manual errors, and limited scalability. They needed a unified platform that could serve three distinct user roles (administrators, investors, and introducers) with role-based access control, portfolio tracking, and document workflows built for compliance.",
      vi: "Khách hàng đang quản lý vận hành đầu tư qua spreadsheet phân mảnh và hệ thống legacy ngắt kết nối, dẫn đến báo cáo chậm, lỗi thủ công và khả năng mở rộng hạn chế. Họ cần nền tảng thống nhất phục vụ ba vai trò người dùng (quản trị viên, nhà đầu tư và introducer) với kiểm soát truy cập role-based, theo dõi danh mục và quy trình tài liệu xây dựng cho tuân thủ.",
    },
    solution: {
      en: "Retech Solutions built a multi-portal architecture on NestJS + PostgreSQL + Prisma with a shared backend that serves administrators, customers, and introducers through tailored interfaces. We implemented portfolio and dividend tracking, document management with read-tracking and email notifications, a dedicated introducer module, and CSV/XLSX import-export for bulk operations. A separate FastAPI file-management service handles large document uploads with rate limiting.",
      vi: "Retech Solutions xây dựng kiến trúc multi-portal trên NestJS + PostgreSQL + Prisma với backend dùng chung phục vụ admin, customer và introducer qua giao diện tùy chỉnh. Chúng tôi triển khai theo dõi danh mục và cổ tức, quản lý tài liệu với read-tracking và email notification, module introducer chuyên trách và import-export CSV/XLSX cho thao tác hàng loạt. Dịch vụ quản lý file FastAPI riêng xử lý upload tài liệu lớn với rate limiting.",
    },
    impact: {
      en: "The unified platform eliminated manual spreadsheet-driven workflows and replaced them with automated, auditable processes that scale with the business. Administrators gained portfolio visibility across all customer accounts, investors received transparent performance reporting, and introducers could manage their referred clients without manual follow-ups. The 60% improvement in operational efficiency freed the team to focus on strategic growth rather than data reconciliation.",
      vi: "Nền tảng thống nhất loại bỏ quy trình spreadsheet thủ công và thay bằng quy trình tự động, auditable mở rộng cùng doanh nghiệp. Admin có tầm nhìn danh mục trên mọi tài khoản customer, nhà đầu tư nhận báo cáo hiệu suất minh bạch và introducer có thể quản lý client được giới thiệu mà không cần follow-up thủ công. Cải thiện 60% hiệu suất vận hành giải phóng đội ngũ tập trung vào tăng trưởng chiến lược thay vì đối soát dữ liệu.",
    },
    features: [
      {
        en: "Multi-portal architecture with role-based access control (admin/customer/introducer)",
        vi: "Kiến trúc multi-portal với kiểm soát truy cập role-based (admin/customer/introducer)",
      },
      {
        en: "Portfolio management with dividend tracking and product catalog",
        vi: "Quản lý danh mục với theo dõi cổ tức và danh mục sản phẩm",
      },
      {
        en: "Document management with read-tracking and email notifications",
        vi: "Quản lý tài liệu với read-tracking và email notification",
      },
      {
        en: "CSV/XLSX import-export for bulk data operations",
        vi: "Import-export CSV/XLSX cho thao tác dữ liệu hàng loạt",
      },
      {
        en: "Dedicated introducer module for partner management",
        vi: "Module introducer chuyên trách cho quản lý đối tác",
      },
      {
        en: "FastAPI file service with 500MB uploads and rate limiting",
        vi: "Dịch vụ file FastAPI với upload 500MB và rate limiting",
      },
    ],
    keyResults: [
      { en: "60% improvement in overall operational efficiency", vi: "Cải thiện 60% hiệu suất vận hành tổng thể" },
      { en: "Report generation time reduced from 45 minutes to under 3 minutes", vi: "Thời gian sinh báo cáo giảm từ 45 phút xuống dưới 3 phút" },
      { en: "99.7% data accuracy across all three portals", vi: "99.7% độ chính xác dữ liệu trên cả ba cổng" },
      { en: "Client onboarding accelerated 4x with automated workflows", vi: "Onboarding khách hàng tăng tốc 4x với quy trình tự động" },
    ],
    results: [
      { metric: { en: "Operational Efficiency", vi: "Hiệu suất Vận hành" }, value: { en: "60% improvement", vi: "60% cải thiện" }, numericValue: 60, suffix: "% improvement" },
      { metric: { en: "Reporting Time", vi: "Thời gian Báo cáo" }, value: { en: "85% faster", vi: "85% nhanh hơn" }, numericValue: 85, suffix: "% faster" },
      { metric: { en: "Data Accuracy", vi: "Độ chính xác Dữ liệu" }, value: { en: "99.7%", vi: "99.7%" }, numericValue: 997, suffix: "%" },
      { metric: { en: "Client Onboarding", vi: "Onboarding Khách hàng" }, value: { en: "4x faster", vi: "4x nhanh hơn" }, numericValue: 4, suffix: "x faster" },
    ],
    beforeAfter: [
      { metric: { en: "Data Processing", vi: "Xử lý Dữ liệu" }, before: { en: "45 min/report", vi: "45 phút/báo cáo" }, after: { en: "3 min/report", vi: "3 phút/báo cáo" }, improvement: { en: "15x faster", vi: "Nhanh hơn 15x" } },
      { metric: { en: "Dashboard Load", vi: "Tải Dashboard" }, before: { en: "8.5s", vi: "8.5s" }, after: { en: "1.4s", vi: "1.4s" }, improvement: { en: "6x faster", vi: "Nhanh hơn 6x" } },
      { metric: { en: "User Adoption", vi: "Áp dụng Người dùng" }, before: { en: "35%", vi: "35%" }, after: { en: "89%", vi: "89%" }, improvement: { en: "+154%", vi: "+154%" } },
      { metric: { en: "Error Rate", vi: "Tỷ lệ Lỗi" }, before: { en: "12%", vi: "12%" }, after: { en: "0.5%", vi: "0.5%" }, improvement: { en: "24x fewer errors", vi: "Ít lỗi hơn 24x" } },
    ],
    timeline: [
      { phase: { en: "Phase 1", vi: "Giai đoạn 1" }, title: { en: "Discovery", vi: "Khám phá" }, description: { en: "Stakeholder interviews, workflow mapping across admin, investor, and introducer roles, and regulatory requirements analysis.", vi: "Phỏng vấn stakeholder, ánh xạ quy trình trên vai trò admin, nhà đầu tư và introducer, phân tích yêu cầu pháp lý." } },
      { phase: { en: "Phase 2", vi: "Giai đoạn 2" }, title: { en: "Design", vi: "Thiết kế" }, description: { en: "Multi-portal UX design with role-based dashboards, data visualization mockups, and compliance workflow prototyping.", vi: "Thiết kế UX multi-portal với dashboard role-based, mockup visualization dữ liệu và prototyping quy trình tuân thủ." } },
      { phase: { en: "Phase 3", vi: "Giai đoạn 3" }, title: { en: "Development", vi: "Phát triển" }, description: { en: "Multi-portal architecture build with NestJS + Prisma, FastAPI file service, and role-based access control.", vi: "Xây dựng kiến trúc multi-portal với NestJS + Prisma, dịch vụ file FastAPI và kiểm soát truy cập role-based." } },
      { phase: { en: "Phase 4", vi: "Giai đoạn 4" }, title: { en: "Launch", vi: "Ra mắt" }, description: { en: "Staged deployment with data migration, UAT across all portals, and production monitoring setup.", vi: "Triển khai theo giai đoạn với di chuyển dữ liệu, UAT trên mọi cổng và thiết lập giám sát production." } },
    ],
    timelineDuration: { en: "5 months", vi: "5 tháng" },
    teamSize: { en: "8-person team", vi: "Đội 8 người" },
    testimonial: { quote: { en: "", vi: "" }, author: { en: "", vi: "" }, role: { en: "", vi: "" }, company: { en: "", vi: "" } },
    technologies: ["Next.js", "TypeScript", "NestJS", "PostgreSQL", "Prisma", "FastAPI", "Docker", "AWS"],
    images: {
      dashboard: { src: "/images/stock/cs-asset-hero.webp", width: 1200, height: 800 },
      mobile: { src: "/images/stock/cs-asset-mobile.webp", width: 600, height: 800 },
    },
  },
  {
    id: "investment-intelligence-platform",
    slug: { en: "investment-intelligence-platform", vi: "tri-tue-dau-tu" },
    title: { en: "Investment Intelligence Platform", vi: "Nền tảng Trí tuệ Đầu tư" },
    tagline: { en: "AI-Powered Investment Research", vi: "Nghiên cứu Đầu tư Hỗ trợ AI" },
    description: {
      en: "A full-stack investment research platform that ingests diverse financial content sources, runs LLM-powered synthesis with vector search, and delivers comparative analysis, smart dashboards, and multi-agent investor panel debates for institutional-grade decision support.",
      vi: "Nền tảng nghiên cứu đầu tư full-stack tiếp nhận nguồn nội dung tài chính đa dạng, chạy synthesis LLM-powered với vector search và phân tích so sánh, dashboard thông minh và multi-agent investor panel debates cho hỗ trợ quyết định cấp tổ chức.",
    },
    industry: { en: "Financial Research", vi: "Nghiên cứu Tài chính" },
    challenge: {
      en: "Investment teams were drowning in unstructured data scattered across SEC filings, earnings transcripts, newsletters, and social media. Manual research took days, insights were lost, and there was no way to query years of accumulated knowledge in real-time. The team needed an AI-native platform that could ingest, synthesize, and make searchable thousands of financial documents.",
      vi: "Đội đầu tư đang chìm trong dữ liệu phi cấu trúc phân tán trên hồ sơ SEC, transcript báo cáo, newsletter và mạng xã hội. Nghiên cứu thủ công mất nhiều ngày, insight bị mất và không có cách truy vấn kiến thức tích lũy nhiều năm thời gian thực. Đội cần nền tảng AI-native có thể ingest, synthesize và làm tìm kiếm được hàng nghìn tài liệu tài chính.",
    },
    solution: {
      en: "We built a multi-source ingestion pipeline that processes PDFs, web pages, podcasts, and social posts into structured embeddings. A smart query router classifies each question and routes it to the optimal retrieval path. A virtual investor panel of AI-simulated personas debates investment theses in real-time, giving analysts multiple perspectives instantly.",
      vi: "Chúng tôi xây dựng pipeline ingestion multi-source xử lý PDF, trang web, podcast và bài đăng xã hội thành embedding có cấu trúc. Smart query router phân loại từng câu hỏi và route tới đường truy xuất tối ưu. Virtual investor panel của các persona AI-mô phỏng tranh luận luận điểm đầu tư thời gian thực, cung cấp cho analyst nhiều góc nhìn tức thì.",
    },
    impact: {
      en: "The platform transformed a days-long research process into seconds. Analysts can now query a knowledge base of thousands of financial documents, get instant comparative analysis, and watch AI agents debate investment theses from multiple perspectives.",
      vi: "Nền tảng chuyển quy trình nghiên cứu nhiều ngày thành vài giây. Analyst hiện có thể truy vấn cơ sở tri thức hàng nghìn tài liệu tài chính, nhận phân tích so sánh tức thì và xem AI agents tranh luận luận điểm đầu tư từ nhiều góc nhìn.",
    },
    features: [
      { en: "Multi-source ingestion: SEC filings, earnings calls, newsletters, podcasts, social media", vi: "Ingestion multi-source: hồ sơ SEC, earnings call, newsletter, podcast, mạng xã hội" },
      { en: "RAG-powered synthesis with three-tier chunking and 3072-dimension embeddings", vi: "Synthesis RAG-powered với chunking ba tầng và embedding 3072-chiều" },
      { en: "Smart query router with multi-class routing (structured, RAG, hybrid, direct)", vi: "Smart query router với routing multi-class (structured, RAG, hybrid, direct)" },
      { en: "Virtual investor panel with 4 AI personas and multi-agent Socratic debate", vi: "Virtual investor panel với 4 AI persona và multi-agent Socratic debate" },
      { en: "Macro dashboards with live commodity pricing and statistical anomaly detection", vi: "Dashboard macro với giá commodity trực tiếp và phát hiện bất thường thống kê" },
      { en: "Framework extraction from investment books and PDFs", vi: "Trích xuất framework từ sách đầu tư và PDF" },
    ],
    keyResults: [
      { en: "8 configurable LLM purposes across the platform", vi: "8 mục đích LLM có thể cấu hình trên nền tảng" },
      { en: "Multi-source ingestion from 5+ content types", vi: "Ingestion multi-source từ 5+ loại nội dung" },
      { en: "Real-time streaming responses for analyst queries", vi: "Phản hồi streaming thời gian thực cho truy vấn analyst" },
      { en: "Institutional-grade investment debate simulation", vi: "Mô phỏng tranh luận đầu tư cấp tổ chức" },
    ],
    results: [
      { metric: { en: "Content Sources", vi: "Nguồn Nội dung" }, value: { en: "5+", vi: "5+" }, numericValue: 5, suffix: "+" },
      { metric: { en: "Embedding Dimensions", vi: "Chiều Embedding" }, value: { en: "3072", vi: "3072" }, numericValue: 3072 },
      { metric: { en: "LLM Purposes", vi: "Mục đích LLM" }, value: { en: "8", vi: "8" }, numericValue: 8 },
      { metric: { en: "DB Migrations", vi: "Migration DB" }, value: { en: "47", vi: "47" }, numericValue: 47 },
    ],
    beforeAfter: [
      { metric: { en: "Research Time", vi: "Thời gian Nghiên cứu" }, before: { en: "2-3 days", vi: "2-3 ngày" }, after: { en: "< 30 seconds", vi: "< 30 giây" }, improvement: { en: "99% faster", vi: "99% nhanh hơn" } },
      { metric: { en: "Document Coverage", vi: "Phạm vi Tài liệu" }, before: { en: "Manual sampling", vi: "Sampling thủ công" }, after: { en: "Full corpus search", vi: "Search toàn corpus" }, improvement: { en: "100% coverage", vi: "100% phạm vi" } },
      { metric: { en: "Analysis Perspectives", vi: "Góc nhìn Phân tích" }, before: { en: "Single analyst", vi: "Một analyst" }, after: { en: "4 AI panelists", vi: "4 panelist AI" }, improvement: { en: "4x viewpoints", vi: "4x góc nhìn" } },
      { metric: { en: "Data Sources", vi: "Nguồn Dữ liệu" }, before: { en: "1-2 sources", vi: "1-2 nguồn" }, after: { en: "5+ integrated", vi: "5+ tích hợp" }, improvement: { en: "5x breadth", vi: "5x độ phủ" } },
    ],
    timeline: [
      { phase: { en: "Discovery", vi: "Khám phá" }, title: { en: "Architecture & Data Modeling", vi: "Kiến trúc & Mô hình Dữ liệu" }, description: { en: "Designed the ingestion pipeline, vector storage schema, and LLM purpose configuration system.", vi: "Thiết kế pipeline ingestion, schema vector storage và hệ thống cấu hình mục đích LLM." } },
      { phase: { en: "Design", vi: "Thiết kế" }, title: { en: "Query Router & Synthesis", vi: "Query Router & Synthesis" }, description: { en: "Built the smart query router with multi-class classification and three-tier chunking for RAG.", vi: "Xây dựng smart query router với phân loại multi-class và chunking ba tầng cho RAG." } },
      { phase: { en: "Development", vi: "Phát triển" }, title: { en: "Platform & Dashboards", vi: "Nền tảng & Dashboard" }, description: { en: "Implemented macro dashboards, virtual investor panel, and multi-agent debate with streaming.", vi: "Triển khai dashboard macro, virtual investor panel và multi-agent debate với streaming." } },
      { phase: { en: "Launch", vi: "Ra mắt" }, title: { en: "Framework Extraction", vi: "Trích xuất Framework" }, description: { en: "Added investment framework extraction from books and PDFs, plus statistical anomaly detection.", vi: "Thêm trích xuất framework đầu tư từ sách và PDF, cùng với phát hiện bất thường thống kê." } },
    ],
    timelineDuration: { en: "5 months", vi: "5 tháng" },
    teamSize: { en: "5-person team", vi: "Đội 5 người" },
    testimonial: { quote: { en: "", vi: "" }, author: { en: "", vi: "" }, role: { en: "", vi: "" }, company: { en: "", vi: "" } },
    technologies: ["Next.js", "FastAPI", "PostgreSQL", "pgvector", "LangChain", "Google GenAI", "Terraform", "Docker"],
    images: {
      dashboard: { src: "/images/stock/cs-intel-hero.webp", width: 1200, height: 800 },
      mobile: { src: "/images/stock/cs-intel-mobile.webp", width: 600, height: 800 },
    },
  },
  {
    id: "fintech-card-marketing",
    slug: { en: "fintech-card-marketing", vi: "marketing-the-fintech" },
    title: { en: "Fintech Card Marketing Platform", vi: "Nền tảng Marketing Thẻ Fintech" },
    tagline: { en: "Headless CMS Marketing Platform", vi: "Nền tảng Marketing Headless CMS" },
    description: {
      en: "A content-driven marketing website for a consumer fintech card product, built on a headless CMS architecture. The platform gives non-technical marketing teams full page-composition control, blog publishing, app download funnels, and real-time preview editing. No developer involvement required.",
      vi: "Website marketing hướng nội dung cho sản phẩm thẻ fintech tiêu dùng, xây dựng trên kiến trúc headless CMS. Nền tảng cung cấp cho đội marketing không chuyên kỹ thuật toàn quyền kiểm soát page-composition, xuất bản blog, funnel tải app và chỉnh sửa preview thời gian thực. Không cần developer.",
    },
    industry: { en: "Consumer Fintech", vi: "Fintech Tiêu dùng" },
    challenge: {
      en: "The marketing team needed a website that could launch new campaigns in hours, not weeks. Their existing setup required developer involvement for every content change, creating bottlenecks and slowing go-to-market. They needed a headless CMS with reusable page components, blog functionality, and app download optimization.",
      vi: "Đội marketing cần website có thể ra mắt chiến dịch mới trong vài giờ, không phải vài tuần. Setup hiện tại yêu cầu developer cho mỗi thay đổi nội dung, tạo bottleneck và làm chậm go-to-market. Họ cần headless CMS với component trang tái sử dụng, chức năng blog và tối ưu tải app.",
    },
    solution: {
      en: "We built a Next.js frontend powered by a headless CMS with reusable page components. Marketing teams can compose pages from pre-built blocks, preview changes in real-time, and publish instantly. The blog system supports SEO-optimized content with automatic sitemap generation.",
      vi: "Chúng tôi xây dựng frontend Next.js powered bởi headless CMS với component trang tái sử dụng. Đội marketing có thể compose trang từ block dựng sẵn, preview thay đổi thời gian thực và publish tức thì. Hệ thống blog hỗ trợ nội dung SEO-optimized với sinh sitemap tự động.",
    },
    impact: {
      en: "Content updates that previously required a developer now take minutes. The marketing team ships campaigns independently, blog posts publish on schedule, and the app download funnel converts at a higher rate thanks to optimized CTAs.",
      vi: "Cập nhật nội dung trước đây yêu cầu developer nay mất vài phút. Đội marketing tung chiến dịch độc lập, bài blog publish đúng lịch và funnel tải app chuyển đổi ở tỷ lệ cao hơn nhờ CTA tối ưu.",
    },
    features: [
      { en: "Headless CMS with reusable page components for non-technical editors", vi: "Headless CMS với component trang tái sử dụng cho editor không chuyên kỹ thuật" },
      { en: "Full blog system with SEO optimization and dynamic routing", vi: "Hệ thống blog đầy đủ với tối ưu SEO và dynamic routing" },
      { en: "App download funnels with smart popup timing", vi: "Funnel tải app với thời điểm popup thông minh" },
      { en: "Real-time preview and draft mode for editorial workflows", vi: "Preview thời gian thực và draft mode cho quy trình biên tập" },
      { en: "Multi-variant hero sections for A/B testing", vi: "Hero section multi-variant cho A/B testing" },
      { en: "ISR with 60-second revalidation for instant content updates", vi: "ISR với revalidation 60 giây cho cập nhật nội dung tức thì" },
    ],
    keyResults: [
      { en: "Reusable page components give editors full layout control", vi: "Component trang tái sử dụng cho editor toàn quyền kiểm soát layout" },
      { en: "Content updates in minutes (was weeks)", vi: "Cập nhật nội dung trong vài phút (trước là vài tuần)" },
      { en: "App download conversion improved significantly", vi: "Chuyển đổi tải app cải thiện đáng kể" },
      { en: "Marketing team operates independently of engineering", vi: "Đội marketing vận hành độc lập với engineering" },
    ],
    results: [
      { metric: { en: "Page Components", vi: "Component Trang" }, value: { en: "15+", vi: "15+" }, numericValue: 15, suffix: "+" },
      { metric: { en: "Content Speed", vi: "Tốc độ Nội dung" }, value: { en: "10x", vi: "10x" }, numericValue: 10, suffix: "x" },
      { metric: { en: "Page Variants", vi: "Biến thể Trang" }, value: { en: "5+", vi: "5+" }, numericValue: 5, suffix: "+" },
      { metric: { en: "Blog Posts", vi: "Bài Blog" }, value: { en: "30+", vi: "30+" }, numericValue: 30, suffix: "+" },
    ],
    beforeAfter: [
      { metric: { en: "Content Updates", vi: "Cập nhật Nội dung" }, before: { en: "1-2 weeks", vi: "1-2 tuần" }, after: { en: "< 5 minutes", vi: "< 5 phút" }, improvement: { en: "99% faster", vi: "99% nhanh hơn" } },
      { metric: { en: "Developer Dependency", vi: "Phụ thuộc Developer" }, before: { en: "Every change", vi: "Mọi thay đổi" }, after: { en: "Zero", vi: "Không" }, improvement: { en: "100% independent", vi: "100% độc lập" } },
      { metric: { en: "Page Variants", vi: "Biến thể Trang" }, before: { en: "1 static", vi: "1 tĩnh" }, after: { en: "5+ testable", vi: "5+ testable" }, improvement: { en: "5x flexibility", vi: "5x linh hoạt" } },
      { metric: { en: "Blog System", vi: "Hệ thống Blog" }, before: { en: "None", vi: "Không có" }, after: { en: "Full CMS blog", vi: "Blog CMS đầy đủ" }, improvement: { en: "New capability", vi: "Năng lực mới" } },
    ],
    timeline: [
      { phase: { en: "Discovery", vi: "Khám phá" }, title: { en: "CMS Architecture", vi: "Kiến trúc CMS" }, description: { en: "Designed the headless CMS schema, slice types, and content modeling strategy.", vi: "Thiết kế schema headless CMS, loại slice và chiến lược content modeling." } },
      { phase: { en: "Design", vi: "Thiết kế" }, title: { en: "Slice Library", vi: "Thư viện Slice" }, description: { en: "Built 15+ reusable content slices with Tailwind CSS and Framer Motion.", vi: "Xây dựng 15+ content slice tái sử dụng với Tailwind CSS và Framer Motion." } },
      { phase: { en: "Development", vi: "Phát triển" }, title: { en: "Blog & Funnels", vi: "Blog & Funnel" }, description: { en: "Implemented the blog system, app download funnels, and ISR revalidation.", vi: "Triển khai hệ thống blog, funnel tải app và ISR revalidation." } },
      { phase: { en: "Launch", vi: "Ra mắt" }, title: { en: "Preview & Publish", vi: "Preview & Publish" }, description: { en: "Added real-time preview, draft mode, and production deployment pipeline.", vi: "Thêm preview thời gian thực, draft mode và pipeline triển khai production." } },
    ],
    timelineDuration: { en: "4 months", vi: "4 tháng" },
    teamSize: { en: "3-person team", vi: "Đội 3 người" },
    testimonial: { quote: { en: "", vi: "" }, author: { en: "", vi: "" }, role: { en: "", vi: "" }, company: { en: "", vi: "" } },
    technologies: ["Next.js", "Prismic CMS", "Tailwind CSS", "Framer Motion", "GSAP", "TypeScript"],
    images: {
      dashboard: { src: "/images/stock/cs-fintech-hero.webp", width: 1200, height: 800 },
      mobile: { src: "/images/stock/cs-fintech-mobile.webp", width: 600, height: 800 },
    },
  },
  {
    id: "ai-analysis-saas",
    slug: { en: "ai-analysis-saas", vi: "ai-analysis-saas" },
    title: { en: "AI Analysis SaaS Platform", vi: "Nền tảng AI Analysis SaaS" },
    tagline: { en: "Multi-Tool AI Analysis Platform", vi: "Nền tảng Phân tích AI Multi-Tool" },
    description: {
      en: "A credit-based multi-tool AI SaaS platform that bundles four distinct analyzers under one authenticated product: a blood test report analyzer, a food image nutrition scanner, a general-purpose AI chat, and a Stripe-powered credit payment system.",
      vi: "Nền tảng AI SaaS multi-tool dựa trên credit đóng gói bốn analyzer riêng biệt dưới một sản phẩm đã xác thực: analyzer báo cáo xét nghiệm máu, scanner dinh dưỡng ảnh thực phẩm, AI chat mục đích chung và hệ thống thanh toán credit powered bởi Stripe.",
    },
    industry: { en: "AI / SaaS", vi: "AI / SaaS" },
    challenge: {
      en: "The client wanted to launch a consumer-facing AI product with multiple analysis tools, but building each tool as a separate app would be expensive and fragmented. They needed a unified platform with a credit-based monetization model, secure authentication, and the ability to rapidly add new AI analyzers.",
      vi: "Khách hàng muốn ra mắt sản phẩm AI hướng người tiêu dùng với nhiều công cụ phân tích, nhưng xây mỗi công cụ là app riêng sẽ tốn kém và phân mảnh. Họ cần nền tảng thống nhất với mô hình kiếm tiền dựa trên credit, xác thực an toàn và khả năng thêm analyzer AI mới nhanh.",
    },
    solution: {
      en: "We built a single Next.js application with a shared authentication layer, credit system, and conversation history. Each analyzer (blood test, food nutrition, general chat) is a self-contained module that shares the same Stripe payment infrastructure and user management. The credit system gates each analysis request.",
      vi: "Chúng tôi xây dựng một ứng dụng Next.js duy nhất với lớp xác thực dùng chung, hệ thống credit và lịch sử hội thoại. Mỗi analyzer (xét nghiệm máu, dinh dưỡng thực phẩm, chat chung) là module tự chứa dùng chung hạ tầng thanh toán Stripe và quản lý người dùng. Hệ thống credit gate mỗi yêu cầu phân tích.",
    },
    impact: {
      en: "The platform launched with 3 AI analyzers on day one, each powered by different LLM models for optimal accuracy. The credit system handles payments automatically, and the admin dashboard lets the team manage users and credits without touching code.",
      vi: "Nền tảng ra mắt với 3 analyzer AI từ ngày đầu, mỗi analyzer powered bởi mô hình LLM khác nhau cho độ chính xác tối ưu. Hệ thống credit xử lý thanh toán tự động và dashboard admin cho phép đội quản lý người dùng và credit mà không động đến code.",
    },
    features: [
      { en: "Blood test AI analyzer with PDF upload and conversational breakdown", vi: "Analyzer AI xét nghiệm máu với upload PDF và breakdown hội thoại" },
      { en: "Food image nutrition AI with photo recognition and calorie estimation", vi: "AI dinh dưỡng ảnh thực phẩm với nhận dạng ảnh và ước tính calo" },
      { en: "General-purpose AI chat with quick-start prompts", vi: "AI chat mục đích chung với prompt quick-start" },
      { en: "Stripe credit-based payment system with automated billing", vi: "Hệ thống thanh toán credit Stripe với billing tự động" },
      { en: "Supabase authentication with OTP login", vi: "Xác thực Supabase với login OTP" },
      { en: "Admin dashboard for user and credit management", vi: "Dashboard admin cho quản lý người dùng và credit" },
    ],
    keyResults: [
      { en: "3 AI analyzers launched in a single unified platform", vi: "3 analyzer AI ra mắt trên một nền tảng thống nhất" },
      { en: "Credit-based monetization with automated Stripe billing", vi: "Kiếm tiền dựa trên credit với billing Stripe tự động" },
      { en: "Multiple LLM models optimized per analyzer type", vi: "Nhiều mô hình LLM tối ưu theo loại analyzer" },
      { en: "Admin dashboard for zero-code user management", vi: "Dashboard admin cho quản lý người dùng zero-code" },
    ],
    results: [
      { metric: { en: "AI Analyzers", vi: "Analyzer AI" }, value: { en: "3", vi: "3" }, numericValue: 3 },
      { metric: { en: "LLM Models", vi: "Mô hình LLM" }, value: { en: "4+", vi: "4+" }, numericValue: 4, suffix: "+" },
      { metric: { en: "Auth Methods", vi: "Phương thức Auth" }, value: { en: "OTP", vi: "OTP" } },
      { metric: { en: "Payment System", vi: "Hệ thống Thanh toán" }, value: { en: "Stripe", vi: "Stripe" } },
    ],
    beforeAfter: [
      { metric: { en: "Product Launch", vi: "Ra mắt Sản phẩm" }, before: { en: "Separate apps", vi: "App riêng biệt" }, after: { en: "Unified platform", vi: "Nền tảng thống nhất" }, improvement: { en: "1 codebase", vi: "1 codebase" } },
      { metric: { en: "Monetization", vi: "Kiếm tiền" }, before: { en: "None", vi: "Không" }, after: { en: "Credit system", vi: "Hệ thống credit" }, improvement: { en: "Automated billing", vi: "Billing tự động" } },
      { metric: { en: "User Auth", vi: "Auth Người dùng" }, before: { en: "Manual", vi: "Thủ công" }, after: { en: "OTP + Supabase", vi: "OTP + Supabase" }, improvement: { en: "Secure & scalable", vi: "An toàn & khả mở" } },
      { metric: { en: "Admin Control", vi: "Kiểm soát Admin" }, before: { en: "Code changes", vi: "Thay đổi code" }, after: { en: "Dashboard UI", vi: "Dashboard UI" }, improvement: { en: "Zero-code", vi: "Zero-code" } },
    ],
    timeline: [
      { phase: { en: "Discovery", vi: "Khám phá" }, title: { en: "Product Architecture", vi: "Kiến trúc Sản phẩm" }, description: { en: "Designed the multi-analyzer architecture, credit system, and authentication flow.", vi: "Thiết kế kiến trúc multi-analyzer, hệ thống credit và flow xác thực." } },
      { phase: { en: "Design", vi: "Thiết kế" }, title: { en: "AI Integration", vi: "Tích hợp AI" }, description: { en: "Integrated LangChain with Claude and Gemini for blood test, food, and chat analyzers.", vi: "Tích hợp LangChain với Claude và Gemini cho analyzer xét nghiệm máu, thực phẩm và chat." } },
      { phase: { en: "Development", vi: "Phát triển" }, title: { en: "Platform Build", vi: "Xây dựng Nền tảng" }, description: { en: "Built the shared credit system, Stripe payments, conversation history, and admin dashboard.", vi: "Xây dựng hệ thống credit dùng chung, thanh toán Stripe, lịch sử hội thoại và dashboard admin." } },
      { phase: { en: "Launch", vi: "Ra mắt" }, title: { en: "Production Deploy", vi: "Triển khai Production" }, description: { en: "Deployed with Supabase auth, Stripe live keys, and admin management tools.", vi: "Triển khai với auth Supabase, Stripe live key và công cụ quản lý admin." } },
    ],
    timelineDuration: { en: "5 months", vi: "5 tháng" },
    teamSize: { en: "4-person team", vi: "Đội 4 người" },
    testimonial: { quote: { en: "", vi: "" }, author: { en: "", vi: "" }, role: { en: "", vi: "" }, company: { en: "", vi: "" } },
    technologies: ["Next.js", "LangChain", "Anthropic Claude", "Google Gemini", "Supabase", "Stripe"],
    images: {
      dashboard: { src: "/images/stock/cs-ai-hero.webp", width: 1200, height: 800 },
      mobile: { src: "/images/stock/cs-ai-mobile.webp", width: 600, height: 800 },
    },
  },
];

/**
 * Lookup by locale-specific slug. Returns raw CaseStudy.
 */
export function getCaseStudy(slug: string, locale: Locale): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug[locale] === slug);
}

/**
 * Lookup by invariant id.
 */
export function getCaseStudyById(id: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.id === id);
}

/**
 * Flat (single-locale) projection of a case study.
 */
export interface FlatCaseStudy {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  industry: string;
  challenge: string;
  solution: string;
  impact: string;
  features: string[];
  keyResults: string[];
  results: { metric: string; value: string; numericValue?: number; suffix?: string }[];
  beforeAfter: { metric: string; before: string; after: string; improvement: string }[];
  timeline: { phase: string; title: string; description: string }[];
  timelineDuration: string;
  teamSize: string;
  testimonial: { quote: string; author: string; role: string; company: string };
  technologies: string[];
  images: CaseStudy["images"];
}

export function flattenCaseStudy(cs: CaseStudy, locale: Locale): FlatCaseStudy {
  return {
    id: cs.id,
    slug: cs.slug[locale],
    title: cs.title[locale],
    tagline: cs.tagline[locale],
    description: cs.description[locale],
    industry: cs.industry[locale],
    challenge: cs.challenge[locale],
    solution: cs.solution[locale],
    impact: cs.impact[locale],
    features: cs.features.map((f) => f[locale]),
    keyResults: cs.keyResults.map((k) => k[locale]),
    results: cs.results.map((r) => ({
      metric: r.metric[locale],
      value: r.value[locale],
      numericValue: r.numericValue,
      suffix: r.suffix,
    })),
    beforeAfter: cs.beforeAfter.map((b) => ({
      metric: b.metric[locale],
      before: b.before[locale],
      after: b.after[locale],
      improvement: b.improvement[locale],
    })),
    timeline: cs.timeline.map((t) => ({
      phase: t.phase[locale],
      title: t.title[locale],
      description: t.description[locale],
    })),
    timelineDuration: cs.timelineDuration[locale],
    teamSize: cs.teamSize[locale],
    testimonial: {
      quote: cs.testimonial.quote[locale],
      author: cs.testimonial.author[locale],
      role: cs.testimonial.role[locale],
      company: cs.testimonial.company[locale],
    },
    technologies: cs.technologies,
    images: cs.images,
  };
}

export function getFlatCaseStudy(slug: string, locale: Locale): FlatCaseStudy | undefined {
  const cs = getCaseStudy(slug, locale);
  return cs ? flattenCaseStudy(cs, locale) : undefined;
}

/**
 * Map an English-slug case-studies href to the locale-specific equivalent.
 */
export function localizeCaseStudyHref(href: string, locale: Locale): string {
  if (locale === "en") return href;
  const match = href.match(/^\/case-studies\/([^/]+)$/);
  if (!match) return href;
  const cs = getCaseStudyById(match[1]);
  return cs ? `/case-studies/${cs.slug[locale]}` : href;
}
