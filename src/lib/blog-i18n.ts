/**
 * Vietnamese blog metadata overlay.
 *
 * Maps each EN blog post slug → { viSlug, viTitle, viExcerpt, viCategory }.
 * Used by blog page consumers to render VI metadata without modifying the
 * 1000-line blog-data.ts file. Post bodies remain English — a notice
 * ("Bản dịch đang hoàn thiện") appears on VI blog detail pages until the
 * full body translation lands.
 *
 * Adding a new post: add an entry here alongside the blog-data.ts entry.
 */
import type { BlogPost } from "./blog-data";
import type { Locale } from "@/i18n/routing";

export interface BlogViMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
}

export const blogViMeta: Record<string, BlogViMeta> = {
  "vietnam-software-developer-rates-2026-complete-pricing-guide": {
    slug: "chi-phi-lap-trinh-vien-viet-nam-2026-huong-dan-gia",
    title: "Chi phí Lập trình viên Việt Nam 2026: Hướng dẫn Giá Hoàn chỉnh",
    excerpt: "Lập trình viên Việt Nam thực sự giá bao nhiêu năm 2026 — mức giá theo năm kinh nghiệm, giá đội chuyên trách hàng tháng, và so sánh với Ấn Độ, Đông Âu. Hướng dẫn lập ngân sách thực tế cho doanh nghiệp đánh giá offshore.",
    category: "Insight Ngành",
  },
  "odoo-vs-sap-business-one-2026-honest-comparison": {
    slug: "odoo-vs-sap-business-one-2026-so-sanh-thuc-te",
    title: "Odoo vs SAP Business One 2026: So sánh Thực tế cho Doanh nghiệp Đang lớn",
    excerpt: "Odoo và SAP Business One nhắm cùng phân khúc trung nhưng khác nhau rõ rệt về chi phí, linh hoạt và thời gian triển khai. Khung so sánh từ đội ngũ triển khai ERP — kèm mức ngân sách thực tế cho từng bên.",
    category: "Hướng dẫn",
  },
  "ai-agents-small-business-workflows-2026-practical-guide": {
    slug: "ai-agent-doanh-nghiep-nho-2026-huong-dan-thuc-te",
    title: "AI Agent cho Doanh nghiệp Nhỏ: Quy trình Tự động hóa Đáng đồng tiền 2026",
    excerpt: "AI agent đã từ demo trở nên đáng tin cho quy trình doanh nghiệp nhỏ — phân loại hỗ trợ, xử lý hóa đơn, sàng lọc khách hàng tiềm năng. Agent làm gì, chi phí bao nhiêu, và bắt đầu từ đâu mà không cần đội data science.",
    category: "Công nghệ",
  },
  "nab-innovation-centre-vietnam-global-bank-tech-hub": {
    slug: "nab-innovation-centre-viet-nam-can-cu-cong-nghe-ngan-hang-toan-cau",
    title: "NAB Innovation Centre Việt Nam: Ngân hàng Toàn cầu Đặt cược vào Nhân lực Bản địa",
    excerpt: "Trung tâm công nghệ của National Australia Bank tại TP.HCM đã vượt 2.800 nhân sự từ năm 2019. Tín hiệu từ nước đi của NAB về nguồn kỹ sư Việt Nam — và cách doanh nghiệp vừa và nhỏ khai thác chính nguồn nhân lực đó.",
    category: "Insight Ngành",
  },
  "nvidia-vietnam-expansion-ai-talent-pipeline": {
    slug: "nvidia-mo-rong-tai-viet-nam-nguon-nhan-luc-ai",
    title: "NVIDIA Mở rộng tại Việt Nam: Ý nghĩa với Nguồn nhân lực AI của Quốc gia",
    excerpt: "Từ thương vụ mua lại VinBrain đến trung tâm R&D cùng chính phủ và nhà máy AI 200 triệu USD tại Hà Nội, NVIDIA đã chọn Việt Nam làm cứ điểm AI chiến lược — và điều đó thay đổi thị trường nhân lực thế nào.",
    category: "Công nghệ",
  },
  "samsung-rd-vietnam-engineering-quality-standard": {
    slug: "samsung-rd-viet-nam-tieu-chuan-chat-luong-ky-thuat",
    title: "Samsung R&D Việt Nam: Hàng nghìn Kỹ sư Nâng chuẩn Chất lượng Công nghệ",
    excerpt: "Samsung là nhà đầu tư nước ngoài lớn nhất tại Việt Nam với hơn 22 tỷ USD, và trung tâm R&D 220 triệu USD tại Hà Nội tuyển dụng hàng nghìn kỹ sư Việt. Hai thập kỷ đầu tư của Samsung đã nâng chuẩn mực kỹ thuật của cả hệ sinh thái.",
    category: "Insight Ngành",
  },
  "fpt-viettel-vng-vietnam-tech-champions-global": {
    slug: "fpt-viettel-vng-cac-ong-lon-cong-nghe-viet-tien-ra-toan-cau",
    title: "FPT, Viettel, VNG: Các Ông lớn Công nghệ Việt Nam Tiến ra Toàn cầu",
    excerpt: "Câu chuyện công nghệ Việt Nam từng được kể bởi nhà đầu tư nước ngoài. Giờ đây GPU cloud của FPT, data center siêu lớn của Viettel và Zalo AI của VNG tự khẳng định — với thị trường AI dự báo tăng gấp gần bốn lần.",
    category: "Insight Ngành",
  },
  "vietnam-semiconductor-industry-2026-chip-giants-expanding": {
    slug: "nganh-ban-dan-viet-nam-2026-cac-ong-lon-chip-mo-rong",
    title: "Làn sóng Bán dẫn Việt Nam 2026: Vì sao các Ông lớn Chip Đang Mở rộng",
    excerpt: "Dự án FDI mới tăng 56,6% so với cùng kỳ trong khi Samsung, Amkor, Foxconn rót hàng tỷ USD vào chuỗi cung ứng chip tại Việt Nam. Vì sao doanh nghiệp phần mềm nên theo dõi làn sóng bán dẫn này.",
    category: "Công nghệ",
  },
  "why-vietnam-top-it-outsourcing-destination-2026": {
    slug: "vi-sao-viet-nam-diem-den-it-outsourcing-hang-dau-2026",
    title: "Vì sao Việt Nam là Điểm đến IT Outsourcing Hàng đầu 2026",
    excerpt: "Việt Nam nhanh chóng trở thành một trong những trung tâm IT outsourcing cạnh tranh nhất Đông Nam Á. Khám phá các yếu tố thúc đẩy công ty toàn cầu xây dựng đội phát triển offshore tại Việt Nam.",
    category: "Insight Ngành",
  },
  "cms-vs-crm-choosing-right-system-business": {
    slug: "cms-vs-crm-chon-he-thong-phu-hop-doanh-nghiep",
    title: "CMS vs CRM: Chọn Hệ thống Phù hợp cho Doanh nghiệp",
    excerpt: "Hệ thống quản lý nội dung (CMS) và quản lý quan hệ khách hàng (CRM) phục vụ mục đích khác nhau. Tìm hiểu cách xác định doanh nghiệp của bạn cần cái nào, và khi nào cần cả hai.",
    category: "Hướng dẫn",
  },
  "how-ai-transforming-custom-software-development": {
    slug: "ai-dang-thay-doi-phat-trien-phan-mem-theo-yeu-cau",
    title: "AI đang Thay đổi Phát triển Phần mềm Theo yêu cầu như thế nào",
    excerpt: "Trí tuệ nhân tạo đang định hình lại mọi giai đoạn vòng đời phát triển phần mềm. Từ sinh code đến kiểm thử và triển khai, tìm hiểu cách công cụ AI tăng tốc bàn giao và nâng cao chất lượng.",
    category: "Công nghệ",
  },
  "agentic-ai-autonomous-software-systems-2026": {
    slug: "agentic-ai-he-thong-phan-mem-tu-chu-2026",
    title: "Agentic AI: Hệ thống Tự chủ đang Định hình lại Kiến trúc Phần mềm",
    excerpt: "Hệ thống AI tự chủ đang chuyển từ demo sang sản xuất. Tìm hiểu cách agentic architecture thay đổi cách chúng ta thiết kế, xây dựng và vận hành phần mềm doanh nghiệp.",
    category: "Công nghệ",
  },
  "erp-modernization-legacy-systems-migration-guide": {
    slug: "hien-dai-hoa-erp-huong-dan-di-chuyen-he-thong-cu",
    title: "Hiện đại hóa ERP 2026: Khi nào và Cách Nâng cấp Hệ thống Legacy",
    excerpt: "Hệ thống ERP legacy cản trở tăng trưởng. Hướng dẫn từng bước khi nào nên nâng cấp, cách lập kế hoạch di chuyển và tránh các cạm bẫy phổ biến trong hiện đại hóa ERP.",
    category: "Hướng dẫn",
  },
  "building-offshore-development-team-practical-guide": {
    slug: "xay-dung-doi-phat-trien-offshore-huong-dan-thuc-te",
    title: "Xây dựng Đội Phát triển Offshore: Hướng dẫn Thực tế cho CTO",
    excerpt: "Hướng dẫn từng bước để xây dựng đội phát triển offshore thành công — từ tuyển dụng, onboarding đến quản lý hiệu suất và giao tiếp xuyên múi giờ.",
    category: "Insight Ngành",
  },
  "nextjs-16-server-components-performance-guide": {
    slug: "nextjs-16-react-server-components-performance",
    title: "Next.js 16 và React Server Components: Phân tích Hiệu suất",
    excerpt: "Server Components thay đổi cách chúng ta nghĩ về rendering. Phân tích sâu về pattern hiệu suất, streaming và trade-off dữ liệu trong Next.js 16.",
    category: "Công nghệ",
  },
  "low-code-vs-custom-development-when-to-choose": {
    slug: "low-code-vs-phat-trien-theo-yeu-cau-khi-nao-chon",
    title: "Low-Code vs Phát triển Theo yêu cầu: Lựa chọn Đúng trong 2026",
    excerpt: "Nền tảng low-code hứa hẹn tốc độ, nhưng phát triển theo yêu cầu mang lại sự linh hoạt. Tìm hiểu khi nào chọn cái nào cho dự án tiếp theo của bạn.",
    category: "Hướng dẫn",
  },
  "cloud-native-erp-microservices-architecture-future": {
    slug: "cloud-native-erp-kien-truc-microservices-tuong-lai",
    title: "Cloud-Native ERP: Vì sao Kiến trúc Microservices là Tương lai",
    excerpt: "ERP monolithic không thể theo kịp tốc độ kinh doanh hiện đại. Tìm hiểu vì sao kiến trúc microservices cloud-native trở thành tiêu chuẩn cho hệ thống doanh nghiệp.",
    category: "Công nghệ",
  },
  "evaluate-offshore-software-development-partner-checklist": {
    slug: "danh-gia-doi-tac-offshore-software-development-checklist",
    title: "Cách Đánh giá Đối tác Offshore Software Development: Checklist",
    excerpt: "Checklist toàn diện để đánh giá đối tác phát triển phần mềm offshore — từ năng lực kỹ thuật, quy trình đến bảo mật, communication và cultural fit.",
    category: "Hướng dẫn",
  },
  "rise-of-headless-cms-separating-content-from-presentation": {
    slug: "headless-cms-tach-noi-dung-khoi-trinh-bay",
    title: "Sự trỗi dậy của Headless CMS: Tách Nội dung khỏi Trình bày",
    excerpt: "Kiến trúc headless CMS tách backend nội dung khỏi frontend presentation, cho phép phát hành đa kênh và trải nghiệm người dùng nhanh hơn. Tìm hiểu khi nào nên áp dụng.",
    category: "Công nghệ",
  },
  "software-development-cost-comparison-vietnam-india-eastern-europe-2026": {
    slug: "so-sanh-chi-phi-phat-trien-phan-mem-viet-nam-an-do-dong-au-2026",
    title: "So sánh Chi phí Phát triển Phần mềm: Việt Nam vs Ấn Độ vs Đông Âu 2026",
    excerpt: "So sánh chi tiết chi phí, chất lượng, múi giờ và năng lực kỹ thuật của Việt Nam, Ấn Độ và Đông Âu làm điểm đến outsourcing trong 2026.",
    category: "Insight Ngành",
  },
  "ai-governance-enterprise-software-compliance-2026": {
    slug: "quan-tri-ai-phần-mem-doanh-nghiep-tuan-thu-2026",
    title: "Quản trị AI cho Phần mềm Doanh nghiệp: Lãnh đạo Tech cần Biết gì",
    excerpt: "Khi AI trở thành cốt lõi của sản phẩm, quản trị AI trở thành thiết yếu. Tìm hiểu các khung tuân thủ, rủi ro và thực hành tốt nhất cho AI trong phần mềm doanh nghiệp.",
    category: "Insight Ngành",
  },
  "how-small-businesses-leverage-ai-without-breaking-bank": {
    slug: "doanh-nghiep-nho-tan-dung-ai-khong-von",
    title: "Doanh nghiệp Nhỏ có thể Tận dụng AI mà không Tốn kém",
    excerpt: "AI không chỉ dành cho công ty lớn. Tìm hiểu cách doanh nghiệp nhỏ tận dụng AI để tự động hóa, phục vụ khách hàng và phát triển mà không cần ngân sách lớn.",
    category: "Hướng dẫn",
  },
  "rise-of-edge-computing-what-it-means-for-web-applications": {
    slug: "edge-computing-y-nghia-voi-ung-dung-web",
    title: "Sự trỗi dậy của Edge Computing: Ý nghĩa với Ứng dụng Web",
    excerpt: "Edge computing đưa xử lý gần người dùng hơn, giảm độ trễ và mở ra pattern kiến trúc mới. Tìm hiểu điều này có ý nghĩa gì cho ứng dụng web tiếp theo của bạn.",
    category: "Công nghệ",
  },
  "why-typescript-became-default-enterprise-development": {
    slug: "vi-sao-typescript-tro-thanh-mac-dinh-doanh-nghiep",
    title: "Vì sao TypeScript trở thành Mặc định cho Phát triển Doanh nghiệp",
    excerpt: "TypeScript đã giành chiến thắng trong cuộc chiến ngôn ngữ doanh nghiệp. Tìm hiểu vì sao các đội kỹ thuật chọn TypeScript và cách nó cải thiện chất lượng code.",
    category: "Insight Ngành",
  },
  "building-accessible-websites-practical-guide-2026": {
    slug: "xay-dung-website-tiep-can-duoc-huong-dan-thuc-te-2026",
    title: "Xây dựng Website Tiếp cận được: Hướng dẫn Thực tế 2026",
    excerpt: "Khả năng tiếp cận không chỉ là tuân thủ — đó là trải nghiệm người dùng tốt hơn cho tất cả. Hướng dẫn thực tế WCAG 2.1 AA cho developer và designer.",
    category: "Hướng dẫn",
  },
  "state-of-react-server-components-2026": {
    slug: "trang-thai-react-server-components-2026",
    title: "Trạng thái của React Server Components trong 2026",
    excerpt: "Server Components đã trưởng thành. Đánh giá adoption hiện tại, pattern tốt nhất và những cạm bẫy cần tránh khi xây dựng ứng dụng React trong 2026.",
    category: "Công nghệ",
  },
  "why-vietnam-smart-choice-it-outsourcing-2026": {
    slug: "vi-sao-viet-nam-lua-chon-thong-minh-it-outsourcing-2026",
    title: "Vì sao Việt Nam là Lựa chọn Thông minh cho IT Outsourcing 2026",
    excerpt: "Talent deep, chi phí cạnh tranh, chồng lệch múi giờ với APAC và EMEA — Việt Nam có tất cả. Đánh giá chi tiết vì sao Việt Nam vượt trội cho outsourcing.",
    category: "Insight Ngành",
  },
  "how-choose-right-tech-stack-next-project": {
    slug: "chon-tech-stack-phu-hop-du-an-tiep-theo",
    title: "Cách Chọn Tech Stack Phù hợp cho Dự án Tiếp theo",
    excerpt: "Hướng dẫn từng bước để chọn đúng tech stack — đánh giá yêu cầu dự án, rủi ro nhóm kỹ năng, chi phí dài hạn và trade-off maintainability.",
    category: "Hướng dẫn",
  },
  "from-legacy-to-cloud-native-practical-migration-guide": {
    slug: "tu-legacy-den-cloud-native-huong-dan-di-chuyen-thuc-te",
    title: "Từ Legacy đến Cloud-Native: Hướng dẫn Di chuyển Thực tế",
    excerpt: "Di chuyển hệ thống legacy lên cloud-native đầy thách thức nhưng cần thiết. Hướng dẫn từng bước về strategy, pattern và cạm bẫy cần tránh.",
    category: "Công nghệ",
  },
  "custom-software-vs-off-the-shelf-how-to-choose": {
    slug: "phan-mem-theo-yeu-cau-vs-co-san-cach-chon",
    title: "Phần mềm Theo yêu cầu vs Có sẵn: Cách Chọn Giải pháp Đúng",
    excerpt: "Giải pháp có sẵn nhanh, phần mềm theo yêu cầu linh hoạt. Tìm hiểu cách đánh giá và chọn đúng hướng cho doanh nghiệp của bạn.",
    category: "Hướng dẫn",
  },
  "role-of-ai-in-modern-business-software": {
    slug: "vai-tro-cua-ai-trong-phan-mem-doanh-nghiep-hien-dai",
    title: "Vai trò của AI trong Phần mềm Doanh nghiệp Hiện đại: Vượt ngoài Hype",
    excerpt: "AI không còn là buzzword. Tìm hiểu các use case AI thực tế, đo lường được đang thúc đẩy ROI trong phần mềm doanh nghiệp — từ tự động hóa đến phân tích dự đoán.",
    category: "Công nghệ",
  },
  "building-scalable-web-applications-technical-deep-dive": {
    slug: "xay-dung-ung-dung-web-kha-mo-phan-tich-ky-thuat",
    title: "Xây dựng Ứng dụng Web Khả mở: Phân tích Kỹ thuật",
    excerpt: "Kiến trúc khả mở từ cơ sở dữ liệu đến frontend. Tìm hiểu caching strategy, database sharding, CDN optimization và pattern microservices cho ứng dụng lưu lượng cao.",
    category: "Công nghệ",
  },
  "ui-ux-design-principles-enterprise-software": {
    slug: "nguyen-tac-ui-ux-cho-phan-mem-doanh-nghiep",
    title: "Điều gì tạo nên Thiết kế UI/UX Tuyệt vời cho Phần mềm Doanh nghiệp",
    excerpt: "Phần mềm doanh nghiệp không cần phải khó dùng. Tìm hiểu các nguyên tắc thiết kế UI/UX biến công cụ phức tạp thành trải nghiệm trực quan.",
    category: "Hướng dẫn",
  },
  "vietnam-digital-transformation-hub-2025": {
    slug: "chuyen-doi-so-viet-nam-trung-tam-cong-nghe",
    title: "Chuyển đổi số Việt Nam: Cách một Quốc gia trở thành Cường quốc Công nghệ",
    excerpt: "Hành trình chuyển đổi số của Việt Nam từ nền kinh tế chế tạo đến trung tâm công nghệ. Đầu tư chính phủ, talent pipeline và hệ sinh thái startup.",
    category: "Insight Ngành",
  },
  "offshore-software-development-complete-guide-2026": {
    slug: "offshore-software-development-huong-dan-toan-dien-2026",
    title: "Offshore Software Development: Hướng dẫn Toàn diện 2026",
    excerpt: "Mọi thứ bạn cần biết về offshore development trong 2026 — từ lựa chọn điểm đến, mô hình giá đến quản lý đội từ xa và đảm bảo chất lượng.",
    category: "Hướng dẫn",
  },
  "crm-vs-erp-understanding-differences-choosing-right-system": {
    slug: "crm-vs-erp-hieu-khac-biet-va-chon-he-thong",
    title: "CRM vs ERP: Hiểu Khác biệt và Chọn Hệ thống Đúng",
    excerpt: "CRM và ERP phục vụ mục đích khác nhau nhưng thường bị nhầm lẫn. Tìm hiểu sự khác biệt cốt lõi và cách chọn hệ thống phù hợp cho doanh nghiệp của bạn.",
    category: "Hướng dẫn",
  },
  "how-build-dedicated-development-team-vietnam": {
    slug: "cach-xay-dung-doi-phat-trien-chuyen-trach-tai-viet-nam",
    title: "Cách Xây dựng Đội Phát triển Chuyên trách tại Việt Nam",
    excerpt: "Hướng dẫn từng bước để xây dựng đội phát triển chuyên trách tại Việt Nam — từ tuyển dụng, onboarding đến quản lý hiệu suất và cultural integration.",
    category: "Insight Ngành",
  },
  "view-transitions-api-production-guide-202608": {
    slug: "view-transitions-api-huong-dan-thuc-te-202608",
    title: "View Transitions API trong Production: Hướng dẫn Thực tế 2026",
    excerpt: "View Transitions API hiện hoạt động cross-browser cho điều hướng same-document và cross-document. Hướng dẫn thực tế với code example cho React, Next.js và CSS thuần.",
    category: "Công nghệ",
  },
};

/**
 * Resolve blog post metadata for a given locale.
 * Falls back to EN when VI metadata isn't available.
 */
export function getBlogMeta(post: BlogPost, locale: Locale) {
  if (locale === "en") {
    return {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
    };
  }
  const vi = blogViMeta[post.slug];
  return vi
    ? { slug: vi.slug, title: vi.title, excerpt: vi.excerpt, category: vi.category }
    : { slug: post.slug, title: post.title, excerpt: post.excerpt, category: post.category };
}

/**
 * Find the EN post slug from a VI slug. Used when the VI URL is requested.
 */
export function getEnSlugByViSlug(viSlug: string): string | undefined {
  for (const [enSlug, vi] of Object.entries(blogViMeta)) {
    if (vi.slug === viSlug) return enSlug;
  }
  return undefined;
}

/**
 * Get all VI blog slugs.
 */
export function getAllViSlugs(): string[] {
  return Object.values(blogViMeta).map((v) => v.slug);
}
