import {
  HeartPulse,
  Landmark,
  ShoppingCart,
  GraduationCap,
  Building2,
  Truck,
  Factory,
  Cpu,
  Film,
  type LucideIcon,
} from "lucide-react";
import type { L } from "./services-data";
import type { Locale } from "@/i18n/routing";

export interface IndustryStat {
  value: number;
  suffix: string;
  label: L;
}

export interface IndustryApproachStep {
  step: string;
  title: L;
  description: L;
}

export type IndustryCategory = "enterprise" | "digital";

export interface Industry {
  /** Invariant id — same as EN slug for backwards compat. */
  id: string;
  slug: L;
  name: L;
  icon: LucideIcon;
  description: L;
  longDescription: L;
  challenges: L[];
  solutions: L[];
  technologies: string[];
  caseStudyExcerpt: L;
  color: string;
  /** Tailwind gradient classes for hero backgrounds */
  gradient: string;
  /** Key statistics to display with AnimatedCounter */
  stats: IndustryStat[];
  /** Methodology steps for the "Our Approach" section */
  approach: IndustryApproachStep[];
  /** Invariant ids of related services */
  relatedServiceSlugs: string[];
  /** Industry tag matching case study `industry` field */
  caseStudyIndustry: L;
  /** Category for filter tabs */
  category: IndustryCategory;
}

export const industries: Industry[] = [
  {
    id: "healthcare",
    slug: { en: "healthcare", vi: "y-te" },
    name: { en: "Healthcare", vi: "Y tế" },
    icon: HeartPulse,
    description: {
      en: "HIPAA-compliant platforms for patient management, telemedicine, and health analytics that improve care delivery and clinical outcomes. We build secure, reliable systems that integrate with existing EHR infrastructure using HL7/FHIR standards for seamless data exchange. From patient portals to clinical decision-support dashboards, our solutions are designed to reduce administrative burden and let healthcare professionals focus on what matters most: patient care. Our team has built clinical decision-support tools with HIPAA-compliant RAG pipelines over medical knowledge bases, and patient-facing assistants with strict scope guards to prevent medical advice.",
      vi: "Các nền tảng tuân thủ HIPAA cho quản lý bệnh nhân, telemedicine và phân tích y tế giúp cải thiện việc chăm sóc và kết quả lâm sàng. Chúng tôi xây dựng hệ thống an toàn, đáng tin cậy tích hợp với hạ tầng EHR sẵn có bằng tiêu chuẩn HL7/FHIR để trao đổi dữ liệu liền mạch. Từ cổng thông tin bệnh nhân đến dashboard hỗ trợ quyết định lâm sàng, giải pháp của chúng tôi được thiết kế để giảm gánh nặng hành chính và giúp chuyên gia y tế tập trung vào điều quan trọng nhất: chăm sóc bệnh nhân. Đội ngũ của chúng tôi đã xây dựng công cụ hỗ trợ quyết định lâm sàng với RAG pipeline tuân thủ HIPAA trên cơ sở tri thức y khoa, và trợ lý hướng bệnh nhân với scope guard nghiêm ngặt để ngăn tư vấn y tế.",
    },
    longDescription: {
      en: "The healthcare industry is undergoing a massive digital transformation, driven by the need for better patient outcomes, regulatory compliance, and operational efficiency. From electronic health records to telemedicine platforms, technology is reshaping how care is delivered, managed, and experienced by patients worldwide.\n\nRetech Solutions brings deep expertise in building HIPAA-compliant healthcare software that meets the highest standards of security and reliability. Our team understands the complexities of healthcare data interoperability, patient privacy regulations, and the critical importance of system uptime in clinical environments.\n\nWhether you need a patient portal, a health analytics dashboard, or a full-scale telemedicine platform, we deliver solutions that integrate seamlessly with existing clinical workflows and comply with HL7/FHIR standards for health data exchange.",
      vi: "Ngành y tế đang trải qua chuyển đổi số quy mô lớn, thúc đẩy bởi nhu cầu kết quả bệnh nhân tốt hơn, tuân thủ pháp lý và hiệu quả vận hành. Từ hồ sơ sức khỏe điện tử đến nền tảng telemedicine, công nghệ đang định hình lại cách chăm sóc được cung cấp, quản lý và trải nghiệm bởi bệnh nhân trên toàn cầu.\n\nRetech Solutions mang chuyên môn sâu trong xây dựng phần mềm y tế tuân thủ HIPAA đáp ứng tiêu chuẩn cao nhất về bảo mật và độ tin cậy. Đội ngũ của chúng tôi hiểu sự phức tạp của khả năng tương tác dữ liệu y tế, quy định quyền riêng tư bệnh nhân và tầm quan trọng thiết yếu của uptime hệ thống trong môi trường lâm sàng.\n\nDù bạn cần cổng thông tin bệnh nhân, dashboard phân tích y tế hay nền tảng telemedicine quy mô đầy đủ, chúng tôi bàn giao giải pháp tích hợp liền mạch với quy trình lâm sàng hiện có và tuân thủ tiêu chuẩn HL7/FHIR cho trao đổi dữ liệu y tế.",
    },
    challenges: [
      {
        en: "Ensuring HIPAA compliance and patient data security across all systems",
        vi: "Đảm bảo tuân thủ HIPAA và bảo mật dữ liệu bệnh nhân trên mọi hệ thống",
      },
      {
        en: "Integrating disparate health information systems with HL7/FHIR standards",
        vi: "Tích hợp các hệ thống thông tin y tế phân tán với tiêu chuẩn HL7/FHIR",
      },
      {
        en: "Building intuitive interfaces for clinicians with limited technical training",
        vi: "Xây dựng giao diện trực quan cho chuyên gia lâm sàng với đào tạo kỹ thuật hạn chế",
      },
      {
        en: "Maintaining system reliability and uptime in critical clinical environments",
        vi: "Duy trì độ tin cậy và uptime hệ thống trong môi trường lâm sàng quan trọng",
      },
    ],
    solutions: [
      {
        en: "HIPAA-compliant patient portals with secure authentication and audit trails",
        vi: "Cổng bệnh nhân tuân thủ HIPAA với xác thực an toàn và audit trail",
      },
      {
        en: "Telemedicine platforms with real-time video, scheduling, and prescription management",
        vi: "Nền tảng telemedicine với video thời gian thực, lịch hẹn và quản lý đơn thuốc",
      },
      {
        en: "Health analytics dashboards for population health and clinical decision support",
        vi: "Dashboard phân tích y tế cho sức khỏe dân số và hỗ trợ quyết định lâm sàng",
      },
      {
        en: "EHR/EMR integration using HL7 FHIR APIs for seamless data exchange",
        vi: "Tích hợp EHR/EMR sử dụng HL7 FHIR APIs cho trao đổi dữ liệu liền mạch",
      },
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "HL7/FHIR", "TypeScript", "Docker", "WebRTC"],
    caseStudyExcerpt: {
      en: "We have delivered secure, user-facing healthcare platforms that handle sensitive patient data with strict compliance requirements, demonstrating our ability to build reliable clinical-grade software.",
      vi: "Chúng tôi đã bàn giao các nền tảng y tế an toàn, hướng người dùng xử lý dữ liệu bệnh nhân nhạy cảm với yêu cầu tuân thủ nghiêm ngặt, minh chứng cho khả năng xây dựng phần mềm cấp lâm sàng đáng tin cậy.",
    },
    color: "text-brand",
    gradient: "from-brand/10 via-brand/5 to-accent-cyan/5",
    stats: [
      { value: 99, suffix: ".9%", label: { en: "Uptime SLA", vi: "SLA Uptime" } },
      { value: 100, suffix: "%", label: { en: "HIPAA Compliant", vi: "Tuân thủ HIPAA" } },
      { value: 40, suffix: "%", label: { en: "Faster Workflows", vi: "Quy trình Nhanh hơn" } },
      { value: 3, suffix: "x", label: { en: "Patient Engagement", vi: "Tương tác Bệnh nhân" } },
    ],
    approach: [
      {
        step: "01",
        title: { en: "Compliance Audit", vi: "Audit Tuân thủ" },
        description: {
          en: "We start by mapping your regulatory requirements (HIPAA, HL7, FHIR) and establishing a security-first architecture baseline.",
          vi: "Chúng tôi bắt đầu bằng cách ánh xạ yêu cầu pháp lý (HIPAA, HL7, FHIR) và thiết lập baseline kiến trúc security-first.",
        },
      },
      {
        step: "02",
        title: { en: "Clinical Discovery", vi: "Khám phá Lâm sàng" },
        description: {
          en: "We work alongside clinicians and administrators to understand real workflows, pain points, and integration needs.",
          vi: "Chúng tôi làm việc cùng chuyên gia lâm sàng và quản trị viên để hiểu quy trình thực, điểm đau và nhu cầu tích hợp.",
        },
      },
      {
        step: "03",
        title: { en: "Secure Development", vi: "Phát triển An toàn" },
        description: {
          en: "Iterative, test-driven development with continuous security review, audit trail logging, and data encryption at every layer.",
          vi: "Phát triển lặp lại, test-driven với review bảo mật liên tục, logging audit trail và mã hóa dữ liệu ở mọi lớp.",
        },
      },
      {
        step: "04",
        title: { en: "Integration & Launch", vi: "Tích hợp & Ra mắt" },
        description: {
          en: "Seamless EHR/EMR integration, user acceptance testing with clinical staff, and phased deployment with monitoring.",
          vi: "Tích hợp EHR/EMR liền mạch, kiểm thử chấp nhận người dùng với nhân viên lâm sàng và triển khai theo giai đoạn với giám sát.",
        },
      },
    ],
    relatedServiceSlugs: ["web-development", "ui-ux-design", "dedicated-teams"],
    caseStudyIndustry: { en: "Health & Wellness", vi: "Sức khỏe & Phúc lợi" },
    category: "enterprise",
  },
  {
    id: "finance",
    slug: { en: "finance", vi: "tai-chinh" },
    name: { en: "Finance", vi: "Tài chính" },
    icon: Landmark,
    description: {
      en: "Secure, scalable financial systems for investment management, banking portals, and regulatory compliance workflows. Our team has deep experience building platforms that process complex financial data with zero tolerance for error, from real-time portfolio analytics to automated compliance reporting. We balance speed, security, and regulatory adherence to deliver fintech solutions that institutions and startups alike can trust. Our AI work in finance includes investment research platforms with multi-agent debate, RAG over SEC filings and earnings transcripts, and anomaly detection on transaction streams.",
      vi: "Hệ thống tài chính an toàn, khả mở cho quản lý đầu tư, cổng thông tin ngân hàng và quy trình tuân thủ pháp lý. Đội ngũ của chúng tôi có kinh nghiệm sâu trong xây dựng nền tảng xử lý dữ liệu tài chính phức tạp với dung sai lỗi bằng không, từ phân tích danh mục đầu tư thời gian thực đến báo cáo tuân thủ tự động. Chúng tôi cân bằng tốc độ, bảo mật và tuân thủ pháp lý để bàn giao giải pháp fintech mà các tổ chức và startup đều có thể tin tưởng. Công việc AI của chúng tôi trong tài chính bao gồm nền tảng nghiên cứu đầu tư với multi-agent debate, RAG trên hồ sơ SEC và transcript báo cáo, cũng như phát hiện bất thường trên luồng giao dịch.",
    },
    longDescription: {
      en: "Financial services demand the highest levels of security, performance, and regulatory compliance. From real-time trading dashboards to banking portals serving millions of users, fintech software must handle complex transactions with zero tolerance for error while meeting stringent regulatory requirements.\n\nRetech Solutions has extensive experience building financial technology platforms that balance speed, security, and scalability. Our engineers understand the nuances of financial data processing, real-time market data handling, and the regulatory frameworks that govern financial software across different jurisdictions.\n\nWe partner with financial institutions and fintech startups alike to deliver solutions ranging from investment management platforms and banking portals to compliance automation tools and real-time analytics dashboards.",
      vi: "Dịch vụ tài chính đòi hỏi mức bảo mật, hiệu suất và tuân thủ pháp lý cao nhất. Từ dashboard giao dịch thời gian thực đến cổng thông tin ngân hàng phục vụ hàng triệu người dùng, phần mềm fintech phải xử lý giao dịch phức tạp với dung sai lỗi bằng không trong khi đáp ứng yêu cầu pháp lý khắt khe.\n\nRetech Solutions có kinh nghiệm phong phú trong xây dựng nền tảng công nghệ tài chính cân bằng tốc độ, bảo mật và khả năng mở rộng. Kỹ sư của chúng tôi hiểu sắc thái của xử lý dữ liệu tài chính, xử lý dữ liệu thị trường thời gian thực và các khung pháp lý chi phối phần mềm tài chính ở các jurisdictions khác nhau.\n\nChúng tôi hợp tác với cả tổ chức tài chính và startup fintech để bàn giao giải pháp từ nền tảng quản lý đầu tư và cổng ngân hàng đến công cụ tự động hóa tuân thủ và dashboard phân tích thời gian thực.",
    },
    challenges: [
      {
        en: "Meeting strict regulatory compliance (PCI-DSS, SOX, AML/KYC) requirements",
        vi: "Đáp ứng yêu cầu tuân thủ pháp lý khắt khe (PCI-DSS, SOX, AML/KYC)",
      },
      {
        en: "Processing high-volume financial transactions with zero-downtime reliability",
        vi: "Xử lý giao dịch tài chính khối lượng lớn với độ tin cậy zero-downtime",
      },
      {
        en: "Securing sensitive financial data against increasingly sophisticated threats",
        vi: "Bảo mật dữ liệu tài chính nhạy cảm trước các mối đe dọa ngày càng tinh vi",
      },
      {
        en: "Building real-time dashboards that handle volatile market data streams",
        vi: "Xây dựng dashboard thời gian thực xử lý luồng dữ liệu thị trường biến động",
      },
    ],
    solutions: [
      {
        en: "Secure banking portals with multi-factor authentication and role-based access",
        vi: "Cổng ngân hàng an toàn với xác thực đa yếu tố và truy cập theo vai trò",
      },
      {
        en: "Investment management platforms with real-time portfolio tracking and analytics",
        vi: "Nền tảng quản lý đầu tư với theo dõi danh mục thời gian thực và phân tích",
      },
      {
        en: "Regulatory compliance automation tools for reporting and audit trails",
        vi: "Công cụ tự động hóa tuân thủ pháp lý cho báo cáo và audit trail",
      },
      {
        en: "Real-time financial dashboards with live market data visualization",
        vi: "Dashboard tài chính thời gian thực với visualization dữ liệu thị trường trực tiếp",
      },
    ],
    technologies: ["React", "Python", "PostgreSQL", "Redis", "Docker", "TypeScript", "Kubernetes", "GraphQL"],
    caseStudyExcerpt: {
      en: "Our work on the Asset Management Platform showcases our ability to build sophisticated financial platforms with complex data modeling, real-time dashboards, and enterprise-grade security.",
      vi: "Công việc của chúng tôi trên Asset Management Platform cho thấy khả năng xây dựng nền tảng tài chính tinh tế với mô hình dữ liệu phức tạp, dashboard thời gian thực và bảo mật cấp doanh nghiệp.",
    },
    color: "text-accent-cyan",
    gradient: "from-accent-cyan/10 via-accent-cyan/5 to-brand/5",
    stats: [
      { value: 60, suffix: "%", label: { en: "Cost Reduction", vi: "Giảm Chi phí" } },
      { value: 99, suffix: ".7%", label: { en: "Data Accuracy", vi: "Độ chính xác Dữ liệu" } },
      { value: 85, suffix: "%", label: { en: "Faster Reporting", vi: "Báo cáo Nhanh hơn" } },
      { value: 256, suffix: "-bit", label: { en: "Encryption", vi: "Mã hóa" } },
    ],
    approach: [
      {
        step: "01",
        title: { en: "Risk Assessment", vi: "Đánh giá Rủi ro" },
        description: {
          en: "We evaluate your regulatory landscape, data sensitivity, and threat vectors to design a security-first architecture.",
          vi: "Chúng tôi đánh giá bối cảnh pháp lý, độ nhạy dữ liệu và vector mối đe dọa để thiết kế kiến trúc security-first.",
        },
      },
      {
        step: "02",
        title: { en: "Data Architecture", vi: "Kiến trúc Dữ liệu" },
        description: {
          en: "We model your financial data flows, design real-time processing pipelines, and establish governance controls.",
          vi: "Chúng tôi mô hình hóa luồng dữ liệu tài chính, thiết kế pipeline xử lý thời gian thực và thiết lập kiểm soát quản trị.",
        },
      },
      {
        step: "03",
        title: { en: "Compliant Development", vi: "Phát triển Tuân thủ" },
        description: {
          en: "Agile development with continuous compliance checks, automated testing, and security scanning at every sprint.",
          vi: "Phát triển agile với kiểm tra tuân thủ liên tục, kiểm thử tự động và quét bảo mật ở mỗi sprint.",
        },
      },
      {
        step: "04",
        title: { en: "Audit & Deployment", vi: "Audit & Triển khai" },
        description: {
          en: "Penetration testing, regulatory audit preparation, and phased rollout with comprehensive monitoring.",
          vi: "Penetration testing, chuẩn bị audit pháp lý và rollout theo giai đoạn với giám sát toàn diện.",
        },
      },
    ],
    relatedServiceSlugs: ["web-development", "dedicated-teams", "cms-platforms"],
    caseStudyIndustry: { en: "Finance", vi: "Tài chính" },
    category: "enterprise",
  },
  {
    id: "e-commerce",
    slug: { en: "e-commerce", vi: "thuong-mai-dien-tu" },
    name: { en: "E-commerce", vi: "Thương mại Điện tử" },
    icon: ShoppingCart,
    description: {
      en: "High-performance online stores and marketplace platforms with advanced inventory, payment, and customer management features. We specialize in building commerce experiences that drive conversion, from headless architectures with sub-second page loads to AI-powered product recommendations. Whether B2C or B2B marketplace, our solutions scale with your business and integrate with the payment, logistics, and marketing tools you already use.",
      vi: "Cửa hàng trực tuyến hiệu suất cao và nền tảng marketplace với tính năng quản lý tồn kho, thanh toán và khách hàng tiên tiến. Chúng tôi chuyên xây dựng trải nghiệm thương mại thúc đẩy chuyển đổi, từ kiến trúc headless với thời gian tải dưới 1 giây đến gợi ý sản phẩm hỗ trợ AI. Dù là B2C hay marketplace B2B, giải pháp của chúng tôi mở rộng cùng doanh nghiệp và tích hợp với công cụ thanh toán, logistics và marketing bạn đang dùng.",
    },
    longDescription: {
      en: "The e-commerce landscape is more competitive than ever, with consumers expecting fast, seamless shopping experiences across every device and channel. Building a successful online retail platform requires robust architecture, intelligent product discovery, and frictionless checkout flows that maximize conversion rates.\n\nRetech Solutions specializes in building high-performance e-commerce platforms that scale with your business. From custom storefronts and marketplace systems to inventory management and payment integration, we deliver solutions that drive revenue and customer satisfaction.\n\nOur team has deep experience with modern e-commerce architectures, including headless CMS integrations, omnichannel commerce strategies, and advanced features like AI-powered product recommendations, dynamic pricing, and real-time inventory synchronization across multiple warehouses.",
      vi: "Bối cảnh thương mại điện tử cạnh tranh hơn bao giờ hết, với người tiêu dùng kỳ vọng trải nghiệm mua sắm nhanh, liền mạch trên mọi thiết bị và kênh. Xây dựng nền tảng bán lẻ trực tuyến thành công đòi hỏi kiến trúc mạnh mẽ, khám phá sản phẩm thông minh và luồng thanh toán không ma sát tối đa hóa tỷ lệ chuyển đổi.\n\nRetech Solutions chuyên xây dựng nền tảng e-commerce hiệu suất cao mở rộng cùng doanh nghiệp. Từ storefront tùy chỉnh và hệ thống marketplace đến quản lý tồn kho và tích hợp thanh toán, chúng tôi bàn giao giải pháp thúc đẩy doanh thu và sự hài lòng khách hàng.\n\nĐội ngũ của chúng tôi có kinh nghiệm sâu với kiến trúc e-commerce hiện đại, bao gồm tích hợp headless CMS, chiến lược thương mại omnichannel và tính năng tiên tiến như gợi ý sản phẩm hỗ trợ AI, định giá động và đồng bộ tồn kho thời gian thực trên nhiều kho.",
    },
    challenges: [
      {
        en: "Delivering sub-second page loads during high-traffic sales events and promotions",
        vi: "Cung cấp thời gian tải dưới 1 giây trong sự kiện bán hàng lưu lượng cao và khuyến mãi",
      },
      {
        en: "Managing complex multi-warehouse inventory in real time across channels",
        vi: "Quản lý tồn kho đa kho phức tạp thời gian thực trên các kênh",
      },
      {
        en: "Integrating diverse payment gateways while ensuring PCI compliance",
        vi: "Tích hợp đa dạng cổng thanh toán trong khi đảm bảo tuân thủ PCI",
      },
      {
        en: "Building personalized shopping experiences that drive conversion and retention",
        vi: "Xây dựng trải nghiệm mua sắm cá nhân hóa thúc đẩy chuyển đổi và giữ chân",
      },
    ],
    solutions: [
      {
        en: "Custom online stores and marketplace platforms built for speed and conversion",
        vi: "Cửa hàng trực tuyến tùy chỉnh và nền tảng marketplace được xây dựng cho tốc độ và chuyển đổi",
      },
      {
        en: "Inventory management systems with real-time synchronization and forecasting",
        vi: "Hệ thống quản lý tồn kho với đồng bộ thời gian thực và dự báo",
      },
      {
        en: "Payment integration with Stripe, PayPal, and regional payment gateways",
        vi: "Tích hợp thanh toán với Stripe, PayPal và cổng thanh toán khu vực",
      },
      {
        en: "Headless commerce architectures with Next.js storefronts and API-driven backends",
        vi: "Kiến trúc thương mại headless với storefront Next.js và backend API-driven",
      },
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Shopify", "TypeScript", "Redis", "Elasticsearch"],
    caseStudyExcerpt: {
      en: "We build high-performance e-commerce platforms with advanced content management, seamless checkout experiences, and scalable architectures that handle high-traffic sales events without breaking a sweat.",
      vi: "Chúng tôi xây dựng nền tảng e-commerce hiệu suất cao với quản lý nội dung tiên tiến, trải nghiệm thanh toán liền mạch và kiến trúc khả mở xử lý sự kiện bán hàng lưu lượng cao mà không gặp khó khăn.",
    },
    color: "text-accent-violet",
    gradient: "from-accent-violet/10 via-accent-violet/5 to-accent-cyan/5",
    stats: [
      { value: 40, suffix: "%", label: { en: "Higher Conversions", vi: "Chuyển đổi Cao hơn" } },
      { value: 99, suffix: ".9%", label: { en: "Uptime", vi: "Uptime" } },
      { value: 200, suffix: "ms", label: { en: "Avg Response", vi: "Phản hồi TB" } },
      { value: 50, suffix: "%", label: { en: "Faster Load Times", vi: "Tải Nhanh hơn" } },
    ],
    approach: [
      {
        step: "01",
        title: { en: "Commerce Audit", vi: "Audit Thương mại" },
        description: {
          en: "We analyze your current storefront performance, conversion funnel, and customer journey to identify optimization opportunities.",
          vi: "Chúng tôi phân tích hiệu suất storefront hiện tại, funnel chuyển đổi và customer journey để xác định cơ hội tối ưu.",
        },
      },
      {
        step: "02",
        title: { en: "Platform Strategy", vi: "Chiến lược Nền tảng" },
        description: {
          en: "We recommend the right commerce architecture (headless, monolithic, or marketplace) based on your catalog and traffic needs.",
          vi: "Chúng tôi đề xuất kiến trúc thương mại phù hợp (headless, monolithic hoặc marketplace) dựa trên danh mục và nhu cầu lưu lượng.",
        },
      },
      {
        step: "03",
        title: { en: "Iterative Build", vi: "Xây dựng Lặp lại" },
        description: {
          en: "Sprint-based development with continuous performance testing, conversion optimization, and payment integration validation.",
          vi: "Phát triển theo sprint với kiểm thử hiệu suất liên tục, tối ưu chuyển đổi và validation tích hợp thanh toán.",
        },
      },
      {
        step: "04",
        title: { en: "Launch & Optimize", vi: "Ra mắt & Tối ưu" },
        description: {
          en: "Load testing, SEO migration, analytics setup, and post-launch optimization with A/B testing and monitoring.",
          vi: "Load testing, di chuyển SEO, thiết lập analytics và tối ưu sau ra mắt với A/B testing và giám sát.",
        },
      },
    ],
    relatedServiceSlugs: ["cms-platforms", "web-development", "ui-ux-design"],
    caseStudyIndustry: { en: "E-commerce", vi: "Thương mại Điện tử" },
    category: "digital",
  },
  {
    id: "education",
    slug: { en: "education", vi: "giao-duc" },
    name: { en: "Education", vi: "Giáo dục" },
    icon: GraduationCap,
    description: {
      en: "Learning management systems, student portals, and educational platforms that make knowledge accessible and engaging for learners at every level. We combine modern web technologies with pedagogical best practices to build adaptive, mobile-first learning experiences that improve completion rates and student outcomes. From K-12 to corporate training, our solutions support real-time collaboration, multi-language content, and data-driven progress tracking.",
      vi: "Hệ thống quản lý học tập, cổng sinh viên và nền tảng giáo dục giúp kiến thức dễ tiếp cận và hấp dẫn với người học ở mọi cấp độ. Chúng tôi kết hợp công nghệ web hiện đại với thực hành sư phạm tốt nhất để xây dựng trải nghiệm học tập adaptive, mobile-first cải thiện tỷ lệ hoàn thành và kết quả học tập. Từ K-12 đến đào tạo doanh nghiệp, giải pháp của chúng tôi hỗ trợ cộng tác thời gian thực, nội dung đa ngôn ngữ và theo dõi tiến độ dẫn dắt dữ liệu.",
    },
    longDescription: {
      en: "Education technology is transforming how students learn, teachers teach, and institutions operate. From K-12 to higher education and corporate training, digital platforms are enabling personalized learning experiences, real-time collaboration, and data-driven educational outcomes at scale.\n\nRetech Solutions builds comprehensive learning management systems and educational platforms that serve students, educators, and administrators. Our solutions combine modern web technologies with pedagogical best practices to create engaging, accessible, and measurable learning experiences.\n\nWhether you need an LMS with adaptive learning paths, a student portal with real-time progress tracking, or a corporate training platform with certification management, our team delivers solutions that make education more effective and accessible.",
      vi: "Công nghệ giáo dục đang chuyển đổi cách sinh viên học, giảng viên dạy và tổ chức vận hành. Từ K-12 đến giáo dục đại học và đào tạo doanh nghiệp, nền tảng số đang cho phép trải nghiệm học tập cá nhân hóa, cộng tác thời gian thực và kết quả giáo dục dẫn dắt dữ liệu ở quy mô lớn.\n\nRetech Solutions xây dựng hệ thống quản lý học tập toàn diện và nền tảng giáo dục phục vụ sinh viên, giảng viên và quản trị viên. Giải pháp của chúng tôi kết hợp công nghệ web hiện đại với thực hành sư phạm tốt nhất để tạo trải nghiệm học tập hấp dẫn, tiếp cận được và đo lường được.\n\nDù bạn cần LMS với learning path adaptive, cổng sinh viên với theo dõi tiến độ thời gian thực hay nền tảng đào tạo doanh nghiệp với quản lý chứng chỉ, đội ngũ chúng tôi bàn giao giải pháp làm giáo dục hiệu quả và dễ tiếp cận hơn.",
    },
    challenges: [
      {
        en: "Scaling platforms to handle thousands of concurrent video streams and interactive sessions",
        vi: "Mở rộng nền tảng xử lý hàng nghìn luồng video đồng thời và phiên tương tác",
      },
      {
        en: "Building adaptive learning algorithms that personalize content for diverse student needs",
        vi: "Xây dựng thuật toán học tập adaptive cá nhân hóa nội dung cho nhu cầu sinh viên đa dạng",
      },
      {
        en: "Ensuring accessibility compliance (WCAG) while maintaining rich interactive experiences",
        vi: "Đảm bảo tuân thủ khả năng tiếp cận (WCAG) trong khi duy trì trải nghiệm tương tác phong phú",
      },
      {
        en: "Integrating with existing student information systems and institutional infrastructure",
        vi: "Tích hợp với hệ thống thông tin sinh viên sẵn có và hạ tầng tổ chức",
      },
    ],
    solutions: [
      {
        en: "Cloud-native LMS platforms with adaptive learning paths and AI-powered recommendations",
        vi: "Nền tảng LMS cloud-native với learning path adaptive và gợi ý hỗ trợ AI",
      },
      {
        en: "Real-time collaboration tools with WebRTC video, chat, and shared workspaces",
        vi: "Công cụ cộng tác thời gian thực với video WebRTC, chat và workspace chia sẻ",
      },
      {
        en: "Student analytics dashboards for progress tracking and early intervention",
        vi: "Dashboard phân tích sinh viên cho theo dõi tiến độ và can thiệp sớm",
      },
      {
        en: "Mobile-first design that ensures learning is accessible on any device",
        vi: "Thiết kế mobile-first đảm bảo học tập tiếp cận được trên mọi thiết bị",
      },
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "WebRTC", "AWS", "Redis", "TensorFlow"],
    caseStudyExcerpt: {
      en: "We have developed learning management platforms with adaptive learning paths, real-time collaboration tools, and AI-powered study recommendations, enabling educational institutions to significantly improve student engagement and completion rates.",
      vi: "Chúng tôi đã phát triển nền tảng quản lý học tập với learning path adaptive, công cụ cộng tác thời gian thực và gợi ý học tập hỗ trợ AI, giúp tổ chức giáo dục cải thiện đáng kể sự tương tác và tỷ lệ hoàn thành của sinh viên.",
    },
    color: "text-brand",
    gradient: "from-brand/10 via-accent-cyan/5 to-brand/5",
    stats: [
      { value: 50, suffix: "K+", label: { en: "Students Served", vi: "Sinh viên Phục vụ" } },
      { value: 340, suffix: "%", label: { en: "Engagement Increase", vi: "Tăng Tương tác" } },
      { value: 72, suffix: "%", label: { en: "Completion Rate", vi: "Tỷ lệ Hoàn thành" } },
      { value: 87, suffix: "%", label: { en: "Faster Load Times", vi: "Tải Nhanh hơn" } },
    ],
    approach: [
      {
        step: "01",
        title: { en: "Pedagogical Discovery", vi: "Khám phá Sư phạm" },
        description: {
          en: "We work with educators and students to understand learning objectives, workflows, and pain points in existing systems.",
          vi: "Chúng tôi làm việc với giảng viên và sinh viên để hiểu mục tiêu học tập, quy trình và điểm đau trong hệ thống hiện có.",
        },
      },
      {
        step: "02",
        title: { en: "Learner-Centered Design", vi: "Thiết kế Lấy Học viên làm Trung tâm" },
        description: {
          en: "Accessibility-first UX design with student, teacher, and admin dashboards optimized for diverse learning contexts.",
          vi: "Thiết kế UX accessibility-first với dashboard sinh viên, giảng viên và quản trị tối ưu cho bối cảnh học tập đa dạng.",
        },
      },
      {
        step: "03",
        title: { en: "Scalable Development", vi: "Phát triển Khả mở" },
        description: {
          en: "Cloud-native architecture with adaptive algorithms, real-time collaboration, and progressive loading for media-rich content.",
          vi: "Kiến trúc cloud-native với thuật toán adaptive, cộng tác thời gian thực và progressive loading cho nội dung giàu media.",
        },
      },
      {
        step: "04",
        title: { en: "Phased Rollout", vi: "Rollout theo Giai đoạn" },
        description: {
          en: "Staged deployment with educator training, student onboarding, and continuous optimization based on learning analytics.",
          vi: "Triển khai theo giai đoạn với đào tạo giảng viên, onboarding sinh viên và tối ưu liên tục dựa trên learning analytics.",
        },
      },
    ],
    relatedServiceSlugs: ["web-development", "ui-ux-design", "dedicated-teams"],
    caseStudyIndustry: { en: "Education", vi: "Giáo dục" },
    category: "digital",
  },
  {
    id: "real-estate",
    slug: { en: "real-estate", vi: "bat-dong-san" },
    name: { en: "Real Estate", vi: "Bất động sản" },
    icon: Building2,
    description: {
      en: "Property management systems, listing platforms, and CRM tools that streamline operations for agents, developers, and investors. We build data-rich real estate platforms that connect buyers, sellers, and property managers through intuitive interfaces with virtual tours, automated valuations, and predictive market analytics. Our solutions cover residential, commercial, and industrial real estate, reducing overhead and accelerating deal cycles.",
      vi: "Hệ thống quản lý bất động sản, nền tảng listing và công cụ CRM giúp tinh gọn vận hành cho môi giới, nhà phát triển và nhà đầu tư. Chúng tôi xây dựng nền tảng bất động sản giàu dữ liệu kết nối người mua, người bán và quản lý tài sản qua giao diện trực quan với tour ảo, định giá tự động và phân tích thị trường dự đoán. Giải pháp của chúng tôi bao phủ bất động sản dân cư, thương mại và công nghiệp, giảm overhead và tăng tốc chu kỳ giao dịch.",
    },
    longDescription: {
      en: "The real estate industry is embracing digital transformation to streamline property management, enhance buyer experiences, and optimize investment decisions. Modern real estate platforms need to handle complex property data, virtual tours, automated valuations, and seamless transaction workflows.\n\nRetech Solutions builds real estate technology platforms that connect buyers, sellers, agents, and property managers through intuitive, data-rich interfaces. From MLS-integrated listing platforms to property management systems with automated rent collection, we deliver solutions that modernize every aspect of real estate operations.\n\nOur experience spans residential, commercial, and industrial real estate, with solutions that incorporate AI-powered property valuations, virtual tour integrations, and predictive market analytics.",
      vi: "Ngành bất động sản đang nắm bắt chuyển đổi số để tinh gọn quản lý tài sản, nâng cao trải nghiệm người mua và tối ưu quyết định đầu tư. Nền tảng bất động sản hiện đại cần xử lý dữ liệu tài sản phức tạp, tour ảo, định giá tự động và quy trình giao dịch liền mạch.\n\nRetech Solutions xây dựng nền tảng công nghệ bất động sản kết nối người mua, người bán, môi giới và quản lý tài sản qua giao diện trực quan, giàu dữ liệu. Từ nền tảng listing tích hợp MLS đến hệ thống quản lý tài sản với thu tiền thuê tự động, chúng tôi bàn giao giải pháp hiện đại hóa mọi khía cạnh vận hành bất động sản.\n\nKinh nghiệm của chúng tôi bao phủ bất động sản dân cư, thương mại và công nghiệp, với giải pháp tích hợp định giá tài sản hỗ trợ AI, tích hợp tour ảo và phân tích thị trường dự đoán.",
    },
    challenges: [
      {
        en: "Managing large property databases with complex search and filtering requirements",
        vi: "Quản lý cơ sở dữ liệu tài sản lớn với yêu cầu tìm kiếm và lọc phức tạp",
      },
      {
        en: "Building virtual tour and 3D visualization experiences that load quickly",
        vi: "Xây dựng trải nghiệm tour ảo và visualization 3D tải nhanh",
      },
      {
        en: "Integrating with MLS systems, payment gateways, and document management platforms",
        vi: "Tích hợp với hệ thống MLS, cổng thanh toán và nền tảng quản lý tài liệu",
      },
      {
        en: "Handling seasonal traffic spikes during peak buying and renting seasons",
        vi: "Xử lý tăng lưu lượng theo mùa trong mùa cao điểm mua và thuê",
      },
    ],
    solutions: [
      {
        en: "Custom listing platforms with advanced search, maps, and virtual tour integration",
        vi: "Nền tảng listing tùy chỉnh với tìm kiếm tiên tiến, bản đồ và tích hợp tour ảo",
      },
      {
        en: "Property management systems with automated rent collection and maintenance tracking",
        vi: "Hệ thống quản lý tài sản với thu tiền thuê tự động và theo dõi bảo trì",
      },
      {
        en: "AI-powered property valuation tools with predictive market analytics",
        vi: "Công cụ định giá tài sản hỗ trợ AI với phân tích thị trường dự đoán",
      },
      {
        en: "CRM systems for agents with lead management, showing scheduling, and pipeline tracking",
        vi: "Hệ thống CRM cho môi giới với quản lý lead, lên lịch xem và theo dõi pipeline",
      },
    ],
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "AWS", "Google Maps API", "Stripe", "Redis"],
    caseStudyExcerpt: {
      en: "We deliver real estate platforms that combine rich property data, intelligent search, and seamless transaction workflows, helping agents close deals faster and property managers reduce operational overhead.",
      vi: "Chúng tôi bàn giao nền tảng bất động sản kết hợp dữ liệu tài sản phong phú, tìm kiếm thông minh và quy trình giao dịch liền mạch, giúp môi giới chốt deal nhanh hơn và quản lý tài sản giảm overhead vận hành.",
    },
    color: "text-accent-cyan",
    gradient: "from-accent-cyan/10 via-brand/5 to-accent-cyan/5",
    stats: [
      { value: 3, suffix: "x", label: { en: "Faster Listings", vi: "Listing Nhanh hơn" } },
      { value: 45, suffix: "%", label: { en: "Less Admin Work", vi: "Ít Việc Hành chính" } },
      { value: 98, suffix: "%", label: { en: "Data Accuracy", vi: "Độ chính xác Dữ liệu" } },
      { value: 24, suffix: "/7", label: { en: "Platform Availability", vi: "Khả dụng Nền tảng" } },
    ],
    approach: [
      {
        step: "01",
        title: { en: "Market Analysis", vi: "Phân tích Thị trường" },
        description: {
          en: "We study your local real estate market, regulatory requirements, and competitive landscape to inform platform design.",
          vi: "Chúng tôi nghiên cứu thị trường bất động sản địa phương, yêu cầu pháp lý và bối cảnh cạnh tranh để định hình thiết kế nền tảng.",
        },
      },
      {
        step: "02",
        title: { en: "Data Architecture", vi: "Kiến trúc Dữ liệu" },
        description: {
          en: "We design your property data model, MLS integration strategy, and search indexing for fast, accurate results.",
          vi: "Chúng tôi thiết kế mô hình dữ liệu tài sản, chiến lược tích hợp MLS và search indexing cho kết quả nhanh, chính xác.",
        },
      },
      {
        step: "03",
        title: { en: "Agile Development", vi: "Phát triển Agile" },
        description: {
          en: "Iterative development with continuous feedback from agents and property managers, ensuring the platform fits real workflows.",
          vi: "Phát triển lặp lại với phản hồi liên tục từ môi giới và quản lý tài sản, đảm bảo nền tảng phù hợp quy trình thực.",
        },
      },
      {
        step: "04",
        title: { en: "Launch & Scale", vi: "Ra mắt & Mở rộng" },
        description: {
          en: "Phased rollout with data migration, team training, and performance optimization for peak traffic handling.",
          vi: "Rollout theo giai đoạn với di chuyển dữ liệu, đào tạo đội ngũ và tối ưu hiệu suất cho xử lý lưu lượng đỉnh.",
        },
      },
    ],
    relatedServiceSlugs: ["cms-platforms", "crm-systems", "web-development"],
    caseStudyIndustry: { en: "Real Estate", vi: "Bất động sản" },
    category: "enterprise",
  },
  {
    id: "logistics",
    slug: { en: "logistics", vi: "logistics" },
    name: { en: "Logistics", vi: "Logistics" },
    icon: Truck,
    description: {
      en: "Fleet management, route optimization, and supply chain visibility tools that reduce costs and improve delivery performance. We leverage AI, real-time GPS tracking, and predictive analytics to optimize every link in the supply chain, from warehouse management to last-mile delivery. Our platforms help logistics companies scale operations without proportional overhead increases, keeping deliveries on time and budgets intact.",
      vi: "Quản lý đội xe, tối ưu hóa tuyến đường và công cụ hiển thị chuỗi cung ứng giúp giảm chi phí và cải thiện hiệu suất giao hàng. Chúng tôi tận dụng AI, theo dõi GPS thời gian thực và phân tích dự đoán để tối ưu mọi mắt xích trong chuỗi cung ứng, từ quản lý kho đến giao hàng chặng cuối. Nền tảng của chúng tôi giúp công ty logistics mở rộng vận hành mà không tăng overhead tỷ lệ thuận, giữ giao hàng đúng hạn và ngân sách nguyên vẹn.",
    },
    longDescription: {
      en: "The logistics industry operates on razor-thin margins where efficiency gains directly translate to competitive advantage. From last-mile delivery optimization to warehouse management and supply chain visibility, technology is the key differentiator in modern logistics operations.\n\nRetech Solutions builds intelligent logistics platforms that leverage AI, real-time GPS tracking, and predictive analytics to optimize every link in the supply chain. Our solutions help logistics companies reduce costs, improve on-time delivery rates, and scale operations without proportional overhead increases.\n\nWhether you need a fleet management dashboard, a route optimization engine, or a full-stack logistics platform with driver apps and customer portals, we deliver solutions that keep your operations moving efficiently.",
      vi: "Ngành logistics vận hành trên biên lợi nhuận rất mỏng nơi cải thiện hiệu suất trực tiếp chuyển thành lợi thế cạnh tranh. Từ tối ưu giao hàng chặng cuối đến quản lý kho và hiển thị chuỗi cung ứng, công nghệ là yếu tố khác biệt chính trong vận hành logistics hiện đại.\n\nRetech Solutions xây dựng nền tảng logistics thông minh tận dụng AI, theo dõi GPS thời gian thực và phân tích dự đoán để tối ưu mọi mắt xích trong chuỗi cung ứng. Giải pháp của chúng tôi giúp công ty logistics giảm chi phí, cải thiện tỷ lệ giao đúng giờ và mở rộng vận hành mà không tăng overhead tỷ lệ thuận.\n\nDù bạn cần dashboard quản lý đội xe, engine tối ưu hóa tuyến đường hay nền tảng logistics full-stack với driver app và cổng khách hàng, chúng tôi bàn giao giải pháp giữ vận hành trôi chảy hiệu quả.",
    },
    challenges: [
      {
        en: "Optimizing routes across hundreds of delivery points with real-time traffic data",
        vi: "Tối ưu hóa tuyến đường trên hàng trăm điểm giao với dữ liệu giao thông thời gian thực",
      },
      {
        en: "Providing real-time visibility across complex multi-modal supply chains",
        vi: "Cung cấp hiển thị thời gian thực trên chuỗi cung ứng đa phương thức phức tạp",
      },
      {
        en: "Managing fleet maintenance schedules and driver compliance requirements",
        vi: "Quản lý lịch bảo trì đội xe và yêu cầu tuân thủ tài xế",
      },
      {
        en: "Handling peak season volume spikes without performance degradation",
        vi: "Xử lý tăng khối lượng mùa cao điểm mà không suy giảm hiệu suất",
      },
    ],
    solutions: [
      {
        en: "AI-powered route optimization that reduces fuel costs and improves delivery times",
        vi: "Tối ưu hóa tuyến đường hỗ trợ AI giảm chi phí nhiên liệu và cải thiện thời gian giao",
      },
      {
        en: "Real-time fleet tracking dashboards with GPS integration and predictive ETAs",
        vi: "Dashboard theo dõi đội xe thời gian thực với tích hợp GPS và ETA dự đoán",
      },
      {
        en: "Automated dispatch systems with driver assignment and load balancing",
        vi: "Hệ thống dispatch tự động với phân công tài xế và load balancing",
      },
      {
        en: "Driver mobile apps with navigation, proof-of-delivery, and digital signatures",
        vi: "Driver mobile app với điều hướng, proof-of-delivery và chữ ký số",
      },
    ],
    technologies: ["React", "Python", "PostgreSQL", "Redis", "Docker", "Google Maps API", "TensorFlow", "WebSocket"],
    caseStudyExcerpt: {
      en: "We have built logistics platforms with AI-powered route optimization, real-time fleet tracking, and automated dispatch systems, helping logistics companies reduce fuel costs and improve on-time delivery rates across their operations.",
      vi: "Chúng tôi đã xây dựng nền tảng logistics với tối ưu hóa tuyến đường hỗ trợ AI, theo dõi đội xe thời gian thực và hệ thống dispatch tự động, giúp công ty logistics giảm chi phí nhiên liệu và cải thiện tỷ lệ giao đúng giờ trên toàn bộ vận hành.",
    },
    color: "text-accent-violet",
    gradient: "from-accent-violet/10 via-brand/5 to-accent-violet/5",
    stats: [
      { value: 35, suffix: "%", label: { en: "Cost Reduction", vi: "Giảm Chi phí" } },
      { value: 96, suffix: "%", label: { en: "On-Time Delivery", vi: "Giao Đúng giờ" } },
      { value: 2000, suffix: "+", label: { en: "Daily Deliveries", vi: "Giao hàng Hàng ngày" } },
      { value: 45, suffix: "%", label: { en: "Efficiency Gain", vi: "Tăng Hiệu suất" } },
    ],
    approach: [
      {
        step: "01",
        title: { en: "Operations Audit", vi: "Audit Vận hành" },
        description: {
          en: "We analyze your current logistics workflows, fleet composition, and delivery patterns to identify optimization opportunities.",
          vi: "Chúng tôi phân tích quy trình logistics hiện tại, thành phần đội xe và pattern giao hàng để xác định cơ hội tối ưu.",
        },
      },
      {
        step: "02",
        title: { en: "System Design", vi: "Thiết kế Hệ thống" },
        description: {
          en: "We design the route optimization engine, tracking infrastructure, and integration architecture for your logistics platform.",
          vi: "Chúng tôi thiết kế engine tối ưu hóa tuyến đường, hạ tầng tracking và kiến trúc tích hợp cho nền tảng logistics của bạn.",
        },
      },
      {
        step: "03",
        title: { en: "Iterative Build", vi: "Xây dựng Lặp lại" },
        description: {
          en: "Sprint-based development with real-world testing using actual delivery data, driver feedback, and operational metrics.",
          vi: "Phát triển theo sprint với kiểm thử thực tế sử dụng dữ liệu giao hàng thực, phản hồi tài xế và chỉ số vận hành.",
        },
      },
      {
        step: "04",
        title: { en: "Phased Rollout", vi: "Rollout theo Giai đoạn" },
        description: {
          en: "Gradual fleet onboarding, driver training, integration with mapping and payment providers, and continuous optimization.",
          vi: "Onboarding đội xe dần dần, đào tạo tài xế, tích hợp với nhà cung cấp mapping và thanh toán, tối ưu liên tục.",
        },
      },
    ],
    relatedServiceSlugs: ["web-development", "erp-solutions", "dedicated-teams"],
    caseStudyIndustry: { en: "Logistics", vi: "Logistics" },
    category: "enterprise",
  },
  {
    id: "manufacturing",
    slug: { en: "manufacturing", vi: "san-xuat" },
    name: { en: "Manufacturing", vi: "Sản xuất" },
    icon: Factory,
    description: {
      en: "Production tracking, inventory management, and ERP integrations that boost operational efficiency and reduce unplanned downtime. We build software that bridges the gap between operational technology and information technology, connecting IoT sensors, legacy PLC systems, and enterprise planning tools into a unified, real-time view of your operations. Our shop-floor-friendly interfaces are designed for workers with varying technical skills, not just IT teams.",
      vi: "Theo dõi sản xuất, quản lý tồn kho và tích hợp ERP thúc đẩy hiệu suất vận hành và giảm downtime ngoài kế hoạch. Chúng tôi xây dựng phần mềm kết nối khoảng cách giữa công nghệ vận hành và công nghệ thông tin, liên kết cảm biến IoT, hệ thống PLC legacy và công cụ lập kế hoạch doanh nghiệp thành góc nhìn thống nhất, thời gian thực về vận hành. Giao diện thân thiện xưởng sản xuất của chúng tôi được thiết kế cho công nhân với kỹ năng kỹ thuật đa dạng, không chỉ đội IT.",
    },
    longDescription: {
      en: "Manufacturing is undergoing its fourth industrial revolution, with IoT sensors, AI-driven quality control, and real-time production monitoring transforming factory floors worldwide. Software plays a critical role in connecting machines, people, and processes to maximize throughput and minimize waste.\n\nRetech Solutions builds manufacturing software that bridges the gap between operational technology and information technology. From production tracking dashboards and quality management systems to full ERP integrations, we deliver solutions that give manufacturers real-time visibility and control over their operations.\n\nOur team understands the unique challenges of manufacturing environments, from integrating with legacy PLC systems to building intuitive interfaces for shop floor workers, and we design solutions that work in the real world, not just on paper.",
      vi: "Sản xuất đang trải qua cuộc cách mạng công nghiệp lần thứ tư, với cảm biến IoT, kiểm soát chất lượng dẫn dắt AI và theo dõi sản xuất thời gian thực đang chuyển đổi sàn sản xuất toàn cầu. Phần mềm đóng vai trò quan trọng trong việc kết nối máy móc, con người và quy trình để tối đa hóa throughput và tối thiểu hóa lãng phí.\n\nRetech Solutions xây dựng phần mềm sản xuất kết nối khoảng cách giữa công nghệ vận hành và công nghệ thông tin. Từ dashboard theo dõi sản xuất và hệ thống quản lý chất lượng đến tích hợp ERP đầy đủ, chúng tôi bàn giao giải pháp cho nhà sản xuất tầm nhìn và kiểm soát thời gian thực về vận hành.\n\nĐội ngũ của chúng tôi hiểu những thách thức độc đáo của môi trường sản xuất, từ tích hợp với hệ thống PLC legacy đến xây dựng giao diện trực quan cho công nhân xưởng, và chúng tôi thiết kế giải pháp hoạt động trong thế giới thực, không chỉ trên giấy.",
    },
    challenges: [
      {
        en: "Connecting legacy machinery and PLC systems to modern cloud platforms",
        vi: "Kết nối máy móc legacy và hệ thống PLC với nền tảng cloud hiện đại",
      },
      {
        en: "Building intuitive interfaces for shop floor workers with varying technical skills",
        vi: "Xây dựng giao diện trực quan cho công nhân xưởng với kỹ năng kỹ thuật đa dạng",
      },
      {
        en: "Managing real-time production data from thousands of IoT sensors",
        vi: "Quản lý dữ liệu sản xuất thời gian thực từ hàng nghìn cảm biến IoT",
      },
      {
        en: "Integrating production systems with ERP, supply chain, and quality management tools",
        vi: "Tích hợp hệ thống sản xuất với ERP, chuỗi cung ứng và công cụ quản lý chất lượng",
      },
    ],
    solutions: [
      {
        en: "Real-time production dashboards with OEE tracking and bottleneck identification",
        vi: "Dashboard sản xuất thời gian thực với theo dõi OEE và xác định điểm nghẽn",
      },
      {
        en: "Quality management systems with statistical process control and automated inspections",
        vi: "Hệ thống quản lý chất lượng với kiểm soát quy trình thống kê và kiểm tra tự động",
      },
      {
        en: "Inventory management with automated reorder points and supplier integration",
        vi: "Quản lý tồn kho với điểm reorder tự động và tích hợp nhà cung cấp",
      },
      {
        en: "ERP integration modules that connect shop floor data to financial and planning systems",
        vi: "Module tích hợp ERP kết nối dữ liệu xưởng sản xuất với hệ thống tài chính và lập kế hoạch",
      },
    ],
    technologies: ["React", "Python", "PostgreSQL", "Docker", "MQTT", "Kubernetes", "AWS IoT", "Grafana"],
    caseStudyExcerpt: {
      en: "We build manufacturing software that connects shop floor operations with enterprise systems, giving managers real-time visibility into production, quality, and inventory across every line.",
      vi: "Chúng tôi xây dựng phần mềm sản xuất kết nối vận hành xưởng với hệ thống doanh nghiệp, cho quản lý tầm nhìn thời gian thực vào sản xuất, chất lượng và tồn kho trên mọi dây chuyền.",
    },
    color: "text-brand",
    gradient: "from-brand/10 via-accent-violet/5 to-brand/5",
    stats: [
      { value: 30, suffix: "%", label: { en: "Less Downtime", vi: "Ít Downtime" } },
      { value: 25, suffix: "%", label: { en: "Efficiency Gain", vi: "Tăng Hiệu suất" } },
      { value: 99, suffix: ".5%", label: { en: "Quality Rate", vi: "Tỷ lệ Chất lượng" } },
      { value: 40, suffix: "%", label: { en: "Faster Reporting", vi: "Báo cáo Nhanh hơn" } },
    ],
    approach: [
      {
        step: "01",
        title: { en: "Factory Assessment", vi: "Đánh giá Nhà máy" },
        description: {
          en: "We audit your production lines, data sources, and existing systems to understand the current state and integration points.",
          vi: "Chúng tôi audit dây chuyền sản xuất, nguồn dữ liệu và hệ thống hiện có để hiểu trạng thái hiện tại và điểm tích hợp.",
        },
      },
      {
        step: "02",
        title: { en: "Architecture Design", vi: "Thiết kế Kiến trúc" },
        description: {
          en: "We design the data pipeline from sensors to dashboards, including edge computing for low-latency shop floor decisions.",
          vi: "Chúng tôi thiết kế pipeline dữ liệu từ cảm biến đến dashboard, bao gồm edge computing cho quyết định xưởng độ trễ thấp.",
        },
      },
      {
        step: "03",
        title: { en: "Connected Development", vi: "Phát triển Kết nối" },
        description: {
          en: "Iterative development with real sensor data, shop floor user testing, and continuous integration with legacy systems.",
          vi: "Phát triển lặp lại với dữ liệu cảm biến thực, kiểm thử người dùng xưởng và tích hợp liên tục với hệ thống legacy.",
        },
      },
      {
        step: "04",
        title: { en: "Deploy & Train", vi: "Triển khai & Đào tạo" },
        description: {
          en: "Phased deployment by production line, operator training, and ongoing optimization based on real production metrics.",
          vi: "Triển khai theo giai đoạn theo dây chuyền sản xuất, đào tạo operator và tối ưu liên tục dựa trên chỉ số sản xuất thực.",
        },
      },
    ],
    relatedServiceSlugs: ["erp-solutions", "web-development", "dedicated-teams"],
    caseStudyIndustry: { en: "Manufacturing", vi: "Sản xuất" },
    category: "enterprise",
  },
  {
    id: "technology",
    slug: { en: "technology", vi: "cong-nghe" },
    name: { en: "Technology", vi: "Công nghệ" },
    icon: Cpu,
    description: {
      en: "Developer tools, SaaS platforms, and AI-native applications built with modern architectures and scalable infrastructure. We speak your language. Our engineers bring deep expertise in microservices, event-driven architectures, RAG pipelines, and multi-agent systems. From MVP development and rapid prototyping to full-scale platform engineering, we help technology companies ship AI features that earn their compute cost.",
      vi: "Công cụ developer, nền tảng SaaS và ứng dụng AI-native được xây dựng với kiến trúc hiện đại và hạ tầng khả mở. Chúng tôi nói ngôn ngữ của bạn. Kỹ sư của chúng tôi mang chuyên môn sâu về microservices, kiến trúc event-driven, RAG pipeline và hệ thống multi-agent. Từ phát triển MVP và prototyping nhanh đến engineering nền tảng quy mô đầy đủ, chúng tôi giúp công ty công nghệ tung ra tính năng AI xứng đáng chi phí compute.",
    },
    longDescription: {
      en: "Technology companies need software partners who speak their language: engineers who understand distributed systems, API design, and the trade-offs involved in building products that scale from hundreds to millions of users. Whether you are building a developer tool, a SaaS platform, or a cloud-native application, the quality of your engineering directly impacts your competitive position.\n\nRetech Solutions partners with technology companies to build products that are architected for scale from day one. Our engineers bring deep expertise in microservices, event-driven architectures, and cloud infrastructure, and we apply the same rigorous engineering practices to your product that we would to our own.\n\nFrom MVP development and rapid prototyping to full-scale platform engineering and DevOps automation, we help technology companies ship faster, scale reliably, and maintain the engineering velocity they need to win in competitive markets.",
      vi: "Công ty công nghệ cần đối tác phần mềm nói cùng ngôn ngữ: kỹ sư hiểu hệ thống phân tán, thiết kế API và các trade-off trong xây dựng sản phẩm mở rộng từ hàng trăm đến hàng triệu người dùng. Dù bạn đang xây công cụ developer, nền tảng SaaS hay ứng dụng cloud-native, chất lượng engineering của bạn trực tiếp ảnh hưởng vị thế cạnh tranh.\n\nRetech Solutions hợp tác với công ty công nghệ để xây sản phẩm được thiết kế cho mở rộng từ ngày đầu. Kỹ sư của chúng tôi mang chuyên môn sâu về microservices, kiến trúc event-driven và hạ tầng cloud, và chúng tôi áp dụng cùng thực hành engineering nghiêm ngặt cho sản phẩm của bạn như thể là của chính mình.\n\nTừ phát triển MVP và prototyping nhanh đến engineering nền tảng quy mô đầy đủ và tự động hóa DevOps, chúng tôi giúp công ty công nghệ tung ra nhanh hơn, mở rộng đáng tin cậy và duy trì velocity engineering cần thiết để chiến thắng trong thị trường cạnh tranh.",
    },
    challenges: [
      {
        en: "Architecting systems that scale from MVP to millions of users without re-platforming",
        vi: "Thiết kế kiến trúc hệ thống mở rộng từ MVP đến hàng triệu người dùng mà không cần re-platform",
      },
      {
        en: "Building developer-friendly APIs with comprehensive documentation and SDKs",
        vi: "Xây dựng API thân thiện developer với tài liệu toàn diện và SDK",
      },
      {
        en: "Managing multi-tenant infrastructure with strong isolation and performance guarantees",
        vi: "Quản lý hạ tầng multi-tenant với isolation mạnh và đảm bảo hiệu suất",
      },
      {
        en: "Maintaining engineering velocity while managing technical debt and system complexity",
        vi: "Duy trì velocity engineering trong khi quản lý technical debt và độ phức tạp hệ thống",
      },
    ],
    solutions: [
      {
        en: "Cloud-native SaaS platforms with multi-tenant architecture and horizontal scaling",
        vi: "Nền tảng SaaS cloud-native với kiến trúc multi-tenant và horizontal scaling",
      },
      {
        en: "Developer tools and APIs with SDKs, webhooks, and comprehensive documentation",
        vi: "Công cụ developer và API với SDK, webhook và tài liệu toàn diện",
      },
      {
        en: "CI/CD pipeline automation with infrastructure-as-code and automated testing",
        vi: "Tự động hóa CI/CD pipeline với infrastructure-as-code và kiểm thử tự động",
      },
      {
        en: "Microservices architecture with event-driven communication and service mesh",
        vi: "Kiến trúc microservices với giao tiếp event-driven và service mesh",
      },
    ],
    technologies: ["React", "Go", "TypeScript", "Kubernetes", "AWS", "Terraform", "PostgreSQL", "Kafka"],
    caseStudyExcerpt: {
      en: "We help technology companies build products that scale, from MVP to enterprise, with the engineering rigor, architectural patterns, and DevOps practices that high-growth startups and established tech firms demand.",
      vi: "Chúng tôi giúp công ty công nghệ xây sản phẩm khả mở, từ MVP đến enterprise, với tính nghiêm ngặt engineering, pattern kiến trúc và thực hành DevOps mà startup tăng trưởng nhanh và công ty công nghệ lớn đòi hỏi.",
    },
    color: "text-accent-cyan",
    gradient: "from-accent-cyan/10 via-accent-violet/5 to-accent-cyan/5",
    stats: [
      { value: 10, suffix: "x", label: { en: "Faster Deploys", vi: "Deploy Nhanh hơn" } },
      { value: 99, suffix: ".99%", label: { en: "Uptime", vi: "Uptime" } },
      { value: 50, suffix: "%", label: { en: "Cost Optimization", vi: "Tối ưu Chi phí" } },
      { value: 0, suffix: " Downtime", label: { en: "Deploy Strategy", vi: "Chiến lược Deploy" } },
    ],
    approach: [
      {
        step: "01",
        title: { en: "Technical Audit", vi: "Audit Kỹ thuật" },
        description: {
          en: "We review your existing architecture, codebase, and infrastructure to identify bottlenecks, risks, and improvement opportunities.",
          vi: "Chúng tôi review kiến trúc, codebase và hạ tầng hiện có để xác định điểm nghẽn, rủi ro và cơ hội cải thiện.",
        },
      },
      {
        step: "02",
        title: { en: "Architecture Design", vi: "Thiết kế Kiến trúc" },
        description: {
          en: "We design scalable system architecture (event-driven, microservices, or monolithic) based on your specific scale and latency needs.",
          vi: "Chúng tôi thiết kế kiến trúc hệ thống khả mở (event-driven, microservices hoặc monolithic) dựa trên nhu cầu mở rộng và độ trễ cụ thể của bạn.",
        },
      },
      {
        step: "03",
        title: { en: "Engineering Sprint", vi: "Sprint Engineering" },
        description: {
          en: "Dedicated engineering sprints with code reviews, pair programming, and continuous integration following your team's practices.",
          vi: "Sprint engineering chuyên trách với code review, pair programming và tích hợp liên tục theo thực hành của đội bạn.",
        },
      },
      {
        step: "04",
        title: { en: "Scale & Operate", vi: "Mở rộng & Vận hành" },
        description: {
          en: "Load testing, performance optimization, infrastructure automation, and handoff with comprehensive documentation and runbooks.",
          vi: "Load testing, tối ưu hiệu suất, tự động hóa hạ tầng và bàn giao với tài liệu toàn diện và runbook.",
        },
      },
    ],
    relatedServiceSlugs: ["web-development", "dedicated-teams"],
    caseStudyIndustry: { en: "Technology", vi: "Công nghệ" },
    category: "digital",
  },
  {
    id: "media-entertainment",
    slug: { en: "media-entertainment", vi: "media-giai-tri" },
    name: { en: "Media & Entertainment", vi: "Media & Giải trí" },
    icon: Film,
    description: {
      en: "Content management platforms, streaming solutions, and digital publishing tools that engage audiences at scale. We understand the unique demands of content-heavy applications, from high-traffic streaming infrastructure to intelligent recommendation engines. Whether you need a CMS for digital publishing or a full video streaming platform, we deliver solutions that perform under pressure and keep audiences coming back.",
      vi: "Nền tảng quản lý nội dung, giải pháp streaming và công cụ xuất bản số thu hút khán giả ở quy mô lớn. Chúng tôi hiểu những đòi hỏi độc đáo của ứng dụng nặng nội dung, từ hạ tầng streaming lưu lượng cao đến engine gợi ý thông minh. Dù bạn cần CMS cho xuất bản số hay nền tảng streaming video đầy đủ, chúng tôi bàn giao giải pháp hoạt động tốt dưới áp lực và giữ khán giả quay lại.",
    },
    longDescription: {
      en: "The media and entertainment industry is in constant flux, with streaming platforms, digital publishing, and social media reshaping how content is created, distributed, and monetized. Success requires technology that can handle massive audiences, deliver rich media experiences, and adapt quickly to changing consumption patterns.\n\nRetech Solutions builds media technology platforms that handle the unique demands of content-heavy applications, from high-traffic streaming infrastructure to intelligent content recommendation engines. We understand the technical challenges of delivering rich media experiences at scale, and we build solutions that keep audiences engaged.\n\nWhether you need a content management system for a digital publisher, a video streaming platform, or an analytics dashboard for audience insights, our team delivers solutions that perform under pressure and scale with your audience.",
      vi: "Ngành media và giải trí luôn biến động, với nền tảng streaming, xuất bản số và mạng xã hội định hình lại cách nội dung được tạo, phân phối và kiếm tiền. Thành công đòi hỏi công nghệ xử lý khán giả quy mô lớn, phân phối trải nghiệm media phong phú và thích ứng nhanh với pattern tiêu dùng thay đổi.\n\nRetech Solutions xây dựng nền tảng công nghệ media xử lý những đòi hỏi độc đáo của ứng dụng nặng nội dung, từ hạ tầng streaming lưu lượng cao đến engine gợi ý nội dung thông minh. Chúng tôi hiểu thách thức kỹ thuật của việc phân phối trải nghiệm media phong phú ở quy mô lớn, và chúng tôi xây giải pháp giữ khán giả tương tác.\n\nDù bạn cần hệ thống quản lý nội dung cho nhà xuất bản số, nền tảng streaming video hay dashboard analytics cho insight khán giả, đội ngũ chúng tôi bàn giao giải pháp hoạt động tốt dưới áp lực và mở rộng cùng khán giả.",
    },
    challenges: [
      {
        en: "Delivering high-quality video and audio streaming to global audiences with minimal latency",
        vi: "Phân phối streaming video và audio chất lượng cao cho khán giả toàn cầu với độ trễ tối thiểu",
      },
      {
        en: "Managing massive content libraries with intelligent tagging, search, and recommendation",
        vi: "Quản lý thư viện nội dung khổng lồ với tagging, tìm kiếm và gợi ý thông minh",
      },
      {
        en: "Handling viral traffic spikes that can multiply normal load by 10x or more",
        vi: "Xử lý tăng lưu lượng viral có thể nhân bình thường lên 10 lần hoặc hơn",
      },
      {
        en: "Monetizing content through subscriptions, ads, and pay-per-view with flexible pricing models",
        vi: "Kiếm tiền từ nội dung qua subscription, quảng cáo và pay-per-view với mô hình giá linh hoạt",
      },
    ],
    solutions: [
      {
        en: "Video streaming platforms with adaptive bitrate delivery and CDN optimization",
        vi: "Nền tảng streaming video với phân phối adaptive bitrate và tối ưu CDN",
      },
      {
        en: "Content management systems with AI-powered tagging, scheduling, and workflow automation",
        vi: "Hệ thống quản lý nội dung với tagging hỗ trợ AI, lên lịch và tự động hóa quy trình",
      },
      {
        en: "Audience analytics dashboards with real-time engagement metrics and retention insights",
        vi: "Dashboard analytics khán giả với chỉ số tương tác thời gian thực và insight giữ chân",
      },
      {
        en: "Monetization platforms with subscription management, ad integration, and payment processing",
        vi: "Nền tảng kiếm tiền với quản lý subscription, tích hợp quảng cáo và xử lý thanh toán",
      },
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "FFmpeg", "Redis", "Elasticsearch", "CDN"],
    caseStudyExcerpt: {
      en: "We build media platforms that engage audiences at scale, from high-performance streaming infrastructure to intelligent content management systems that keep viewers coming back.",
      vi: "Chúng tôi xây nền tảng media thu hút khán giả ở quy mô lớn, từ hạ tầng streaming hiệu suất cao đến hệ thống quản lý nội dung thông minh giữ người xem quay lại.",
    },
    color: "text-accent-violet",
    gradient: "from-accent-violet/10 via-accent-cyan/5 to-accent-violet/5",
    stats: [
      { value: 10, suffix: "M+", label: { en: "Viewers Served", vi: "Người xem Phục vụ" } },
      { value: 99, suffix: ".95%", label: { en: "Stream Uptime", vi: "Uptime Stream" } },
      { value: 200, suffix: "ms", label: { en: "Start Time", vi: "Thời gian Bắt đầu" } },
      { value: 65, suffix: "%", label: { en: "Retention Rate", vi: "Tỷ lệ Giữ chân" } },
    ],
    approach: [
      {
        step: "01",
        title: { en: "Content Strategy", vi: "Chiến lược Nội dung" },
        description: {
          en: "We analyze your content types, audience behavior, and distribution channels to define the right platform architecture.",
          vi: "Chúng tôi phân tích loại nội dung, hành vi khán giả và kênh phân phối để định nghĩa kiến trúc nền tảng phù hợp.",
        },
      },
      {
        step: "02",
        title: { en: "Media Infrastructure", vi: "Hạ tầng Media" },
        description: {
          en: "We design your CDN strategy, transcoding pipeline, and storage architecture for cost-effective delivery at scale.",
          vi: "Chúng tôi thiết kế chiến lược CDN, pipeline transcoding và kiến trúc lưu trữ cho phân phối hiệu quả chi phí ở quy mô lớn.",
        },
      },
      {
        step: "03",
        title: { en: "Experience Development", vi: "Phát triển Trải nghiệm" },
        description: {
          en: "Iterative development of your content platform with focus on playback quality, discovery, and monetization features.",
          vi: "Phát triển lặp lại nền tảng nội dung tập trung vào chất lượng playback, khám phá và tính năng kiếm tiền.",
        },
      },
      {
        step: "04",
        title: { en: "Scale & Optimize", vi: "Mở rộng & Tối ưu" },
        description: {
          en: "Load testing for peak audiences, CDN optimization, analytics integration, and continuous performance tuning.",
          vi: "Load testing cho khán giả đỉnh, tối ưu CDN, tích hợp analytics và tinh chỉnh hiệu suất liên tục.",
        },
      },
    ],
    relatedServiceSlugs: ["cms-platforms", "web-development", "ui-ux-design"],
    caseStudyIndustry: { en: "Media & Entertainment", vi: "Media & Giải trí" },
    category: "digital",
  },
];

/**
 * Lookup by locale-specific slug. Returns the raw Industry.
 */
export function getIndustryBySlug(slug: string, locale: Locale): Industry | undefined {
  return industries.find((i) => i.slug[locale] === slug);
}

/**
 * Lookup by invariant id.
 */
export function getIndustryById(id: string): Industry | undefined {
  return industries.find((i) => i.id === id);
}

/**
 * Flat (single-locale) projection of an industry.
 */
export interface FlatIndustry {
  id: string;
  slug: string;
  name: string;
  icon: LucideIcon;
  description: string;
  longDescription: string;
  challenges: string[];
  solutions: string[];
  technologies: string[];
  caseStudyExcerpt: string;
  color: string;
  gradient: string;
  stats: { value: number; suffix: string; label: string }[];
  approach: { step: string; title: string; description: string }[];
  relatedServiceSlugs: string[];
  caseStudyIndustry: string;
  category: IndustryCategory;
}

export function flattenIndustry(ind: Industry, locale: Locale): FlatIndustry {
  return {
    id: ind.id,
    slug: ind.slug[locale],
    name: ind.name[locale],
    icon: ind.icon,
    description: ind.description[locale],
    longDescription: ind.longDescription[locale],
    challenges: ind.challenges.map((c) => c[locale]),
    solutions: ind.solutions.map((s) => s[locale]),
    technologies: ind.technologies,
    caseStudyExcerpt: ind.caseStudyExcerpt[locale],
    color: ind.color,
    gradient: ind.gradient,
    stats: ind.stats.map((s) => ({ value: s.value, suffix: s.suffix, label: s.label[locale] })),
    approach: ind.approach.map((a) => ({
      step: a.step,
      title: a.title[locale],
      description: a.description[locale],
    })),
    relatedServiceSlugs: ind.relatedServiceSlugs,
    caseStudyIndustry: ind.caseStudyIndustry[locale],
    category: ind.category,
  };
}

export function getFlatIndustry(slug: string, locale: Locale): FlatIndustry | undefined {
  const ind = getIndustryBySlug(slug, locale);
  return ind ? flattenIndustry(ind, locale) : undefined;
}

/**
 * Map an English-slug industries href to the locale-specific equivalent.
 * Used by nav/components that hold a static English-slug href.
 */
export function localizeIndustryHref(href: string, locale: Locale): string {
  if (locale === "en") return href;
  const match = href.match(/^\/industries\/([^/]+)$/);
  if (!match) return href;
  const ind = getIndustryById(match[1]);
  return ind ? `/industries/${ind.slug[locale]}` : href;
}
