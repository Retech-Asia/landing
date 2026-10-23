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

/**
 * Owner directive 2026-10-22 (checkpoint 2 §2): vanity metrics are out of the
 * promotional presentation. `results` (stat rows) and `beforeAfter`
 * (comparison tables) carried numbers with no business record behind them and
 * are removed from the model entirely. keyResults stay as qualitative,
 * capability-level statements that trace to what was built.
 *
 * `clientCountry` is part of the owner's required narrative arc
 * (challenge → solution → impact → verified tech → client country). Values are
 * Jay-gated: leave undefined until the owner confirms the market per study.
 */
export interface CaseStudy {
  /** Invariant id (= EN slug). */
  id: string;
  slug: L;
  title: L;
  tagline: L;
  /** Deliberately written one-sentence challenge→solution arc for listing
   *  surfaces (owner ruling 2026-10-23: no mechanically clipped previews). */
  summary: L;
  description: L;
  industry: L;
  challenge: L;
  solution: L;
  impact: L;
  features: L[];
  keyResults: L[];
  timeline: TimelinePhase[];
  timelineDuration: L;
  teamSize: L;
  clientCountry?: L;
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
    summary: {
      en: "Mining operators juggled four dashboards and spreadsheets; Retech unified pool metrics, market pricing, and difficulty forecasts into one auditable operations platform.",
      vi: "Operator mining phải xoay xở giữa bốn dashboard và spreadsheet; Retech hợp nhất số liệu pool, giá thị trường và dự báo difficulty thành một nền tảng vận hành có audit đầy đủ.",
    },
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
        en: "Four external data sources consolidated into a single dashboard",
        vi: "Bốn nguồn dữ liệu ngoài hợp nhất vào một dashboard duy nhất",
      },
      {
        en: "Manual adjustments logged in a database audit trail instead of spreadsheets",
        vi: "Điều chỉnh thủ công được ghi vào audit trail trong database thay vì spreadsheet",
      },
      {
        en: "Per-worker analytics available across both mining pools",
        vi: "Analytics per-worker khả dụng trên cả hai pool mining",
      },
      {
        en: "Super-admin role gate protects production data from accidental edits",
        vi: "Gate role super-admin bảo vệ dữ liệu production khỏi chỉnh sửa vô tình",
      },
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
    // Illustrative visualization, not a product capture (owner directive:
    // real screenshots only where approved; never present stock as the
    // product). The earlier cs-wellness-* files belonged to no study.
    images: {
      dashboard: { src: "/images/stock/analytics-dashboard.webp", width: 1200, height: 800 },
      mobile: { src: "/images/stock/analytics-dashboard.webp", width: 1200, height: 800 },
    },
  },
  {
    id: "asset-management-platform",
    slug: { en: "asset-management-platform", vi: "quan-ly-tai-san" },
    title: { en: "Asset Management Platform", vi: "Nền tảng Quản lý Tài sản" },
    tagline: { en: "Investment Management System", vi: "Hệ thống Quản lý Đầu tư" },
    summary: {
      en: "Investment operations ran on fragmented spreadsheets; Retech replaced them with one multi-portal platform serving administrators, investors, and introducers.",
      vi: "Vận hành đầu tư chạy trên spreadsheet phân mảnh; Retech thay thế bằng một nền tảng multi-portal phục vụ quản trị viên, nhà đầu tư và introducer.",
    },
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
      en: "The unified platform replaced spreadsheet-driven workflows with automated, auditable processes that scale with the business. Administrators have portfolio visibility across all customer accounts, investors receive transparent performance reporting, and introducers manage their referred clients without manual follow-ups. With reconciliation handled by the system, the team can focus on strategic growth instead of data housekeeping.",
      vi: "Nền tảng thống nhất thay thế quy trình spreadsheet bằng quy trình tự động, auditable mở rộng cùng doanh nghiệp. Admin có tầm nhìn danh mục trên mọi tài khoản customer, nhà đầu tư nhận báo cáo hiệu suất minh bạch và introducer quản lý client được giới thiệu mà không cần follow-up thủ công. Khi đối soát do hệ thống xử lý, đội ngũ có thể tập trung vào tăng trưởng chiến lược thay vì công việc dọn dữ liệu.",
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
      { en: "Administrators, investors, and introducers work in one platform instead of disconnected systems", vi: "Admin, nhà đầu tư và introducer làm việc trên một nền tảng thay vì các hệ thống rời rạc" },
      { en: "Portfolio and dividend tracking unified across every customer account", vi: "Theo dõi danh mục và cổ tức hợp nhất trên mọi tài khoản customer" },
      { en: "Document workflows carry read-tracking and email notifications end to end", vi: "Quy trình tài liệu có read-tracking và email notification xuyên suốt" },
      { en: "Bulk data operations run through CSV/XLSX import-export", vi: "Thao tác dữ liệu hàng loạt chạy qua import-export CSV/XLSX" },
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
    summary: {
      en: "Research teams spent days reading scattered filings and transcripts; Retech made thousands of documents queryable and added an AI investor panel for instant perspectives.",
      vi: "Đội nghiên cứu mất nhiều ngày đọc hồ sơ và transcript rời rạc; Retech giúp hàng nghìn tài liệu truy vấn được và bổ sung panel nhà đầu tư AI cho góc nhìn tức thì.",
    },
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
      en: "Analysts query the knowledge base directly instead of reading document by document, and comparative analysis across sources is a search away rather than a desk-week of manual review. The virtual investor panel surfaces multiple perspectives on a thesis in a single session, and macro dashboards keep commodity pricing and anomaly signals in the same workspace as the research.",
      vi: "Analyst truy vấn trực tiếp cơ sở tri thức thay vì đọc từng tài liệu, và phân tích so sánh giữa các nguồn chỉ còn là một lần tìm kiếm thay vì hàng ngày đọc thủ công. Virtual investor panel mang nhiều góc nhìn về một luận điểm trong một phiên làm việc, và dashboard macro đặt giá commodity cùng tín hiệu bất thường thống kê ngay trong không gian làm việc nghiên cứu.",
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
      { en: "Eight configurable LLM purposes across the platform", vi: "Tám mục đích LLM có thể cấu hình trên nền tảng" },
      { en: "One ingestion path for filings, transcripts, newsletters, podcasts, and social posts", vi: "Một đường ingestion cho hồ sơ, transcript, newsletter, podcast và bài đăng xã hội" },
      { en: "Streaming responses for analyst queries", vi: "Phản hồi streaming cho truy vấn analyst" },
      { en: "Multi-agent investor panel that debates a thesis from several personas", vi: "Investor panel multi-agent tranh luận luận điểm từ nhiều persona" },
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
    summary: {
      en: "Every campaign change waited on developers; Retech built a headless CMS so marketers compose, preview, and publish pages and funnels themselves.",
      vi: "Mỗi thay đổi chiến dịch đều phải chờ developer; Retech xây dựng headless CMS để đội marketing tự dựng, preview và publish trang cùng funnel.",
    },
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
      en: "Content updates that previously required a developer now ship directly from the marketing team. Campaign pages, blog posts, and app download funnels are composed and published in the CMS, and engineering stays focused on the product instead of content tickets.",
      vi: "Cập nhật nội dung trước đây yêu cầu developer nay đội marketing tự xuất bản trực tiếp. Trang chiến dịch, bài blog và funnel tải app đều được dựng và publish trong CMS, và engineering tập trung vào sản phẩm thay vì ticket nội dung.",
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
      { en: "Editors compose and publish pages from reusable blocks without engineering involvement", vi: "Editor dựng và publish trang từ block tái sử dụng mà không cần engineering" },
      { en: "Real-time preview and draft mode separate editing from publishing", vi: "Preview thời gian thực và draft mode tách biên tập khỏi xuất bản" },
      { en: "Blog publishing with SEO-optimized content and automatic sitemap generation", vi: "Xuất bản blog với nội dung tối ưu SEO và sinh sitemap tự động" },
      { en: "App download funnels run as composable page blocks", vi: "Funnel tải app chạy như block trang có thể dựng linh hoạt" },
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
    summary: {
      en: "Separate apps per AI tool would be costly and fragmented; Retech shipped one credit-based platform where every analyzer shares auth, history, and Stripe billing.",
      vi: "Mỗi công cụ AI một app riêng vừa tốn kém vừa phân mảnh; Retech triển khai một nền tảng theo credit, nơi mọi analyzer dùng chung xác thực, lịch sử và thanh toán Stripe.",
    },
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
      en: "The platform launched with three AI analyzers on day one, each paired with the model suited to its task. The credit system handles payments automatically, and the admin dashboard lets the team manage users and credits without touching code.",
      vi: "Nền tảng ra mắt với ba analyzer AI từ ngày đầu, mỗi analyzer ghép với mô hình phù hợp với nhiệm vụ của nó. Hệ thống credit xử lý thanh toán tự động và dashboard admin cho phép đội quản lý người dùng và credit mà không động đến code.",
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
      { en: "Three AI analyzers launched in one unified platform", vi: "Ba analyzer AI ra mắt trên một nền tảng thống nhất" },
      { en: "Credit-based monetization with automated Stripe billing", vi: "Kiếm tiền dựa trên credit với billing Stripe tự động" },
      { en: "Conversation history shared across every analyzer", vi: "Lịch sử hội thoại dùng chung trên mọi analyzer" },
      { en: "Admin dashboard for user and credit management without code changes", vi: "Dashboard admin quản lý người dùng và credit không cần đổi code" },
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
  summary: string;
  description: string;
  industry: string;
  challenge: string;
  solution: string;
  impact: string;
  features: string[];
  keyResults: string[];
  timeline: { phase: string; title: string; description: string }[];
  timelineDuration: string;
  teamSize: string;
  clientCountry?: string;
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
    summary: cs.summary[locale],
    description: cs.description[locale],
    industry: cs.industry[locale],
    challenge: cs.challenge[locale],
    solution: cs.solution[locale],
    impact: cs.impact[locale],
    features: cs.features.map((f) => f[locale]),
    keyResults: cs.keyResults.map((k) => k[locale]),
    timeline: cs.timeline.map((t) => ({
      phase: t.phase[locale],
      title: t.title[locale],
      description: t.description[locale],
    })),
    timelineDuration: cs.timelineDuration[locale],
    teamSize: cs.teamSize[locale],
    clientCountry: cs.clientCountry?.[locale],
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
