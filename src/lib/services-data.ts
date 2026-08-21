import {
  Layout,
  Users,
  BarChart3,
  Globe,
  Palette,
  UsersRound,
  ShieldCheck,
  Search,
  Smartphone,
  BarChart,
  Workflow,
  Headphones,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/i18n/routing";

/**
 * Localized string — every user-facing field on a service carries both
 * locales. Resolved at render time by passing the active locale.
 *
 * Slug is also localized so `/vi/dich-vu/san-pham-cms` works alongside
 * `/en/services/cms-platforms`. The `id` field is the invariant key used
 * for cross-references (in navigation.ts, sitemap, internal links).
 */
export type L = { en: string; vi: string };

export interface ServiceFeature {
  icon: LucideIcon;
  title: L;
  description: L;
}

export interface ServiceFAQ {
  question: L;
  answer: L;
}

export interface ServiceBenefit {
  title: L;
  description: L;
}

export interface ServiceTimeline {
  week: L;
  phase: L;
  description: L;
}

export interface ServiceProcessStep {
  step: number;
  title: L;
  description: L;
}

export interface ServiceData {
  /** Invariant identifier — never localized, never appears in URLs. */
  id: string;
  slug: L;
  title: L;
  subtitle: L;
  description: L;
  longDescription: L;
  icon: LucideIcon;
  gradient: string;
  /** Gradient CSS class for the hero accent bar (e.g. "from-brand to-accent-cyan") */
  heroAccent: string;
  /** Tailwind color token for the hero icon glow (e.g. "brand") */
  heroColor: string;
  features: ServiceFeature[];
  benefits: ServiceBenefit[];
  technologies: string[];
  processSteps: ServiceProcessStep[];
  faq: ServiceFAQ[];
  timeline: ServiceTimeline[];
}

export const services: ServiceData[] = [
  {
    id: "cms-platforms",
    slug: { en: "cms-platforms", vi: "san-pham-cms" },
    title: { en: "CMS Platforms", vi: "Nền tảng CMS" },
    subtitle: {
      en: "Content Management Made Easy",
      vi: "Quản lý Nội dung Dễ dàng",
    },
    description: {
      en: "We build custom websites leveraging powerful CMS solutions, enabling businesses to manage and publish content efficiently across multiple platforms. Our approach combines headless and traditional architectures to give you the flexibility of modern content delivery with the ease of use your editorial team expects.",
      vi: "Chúng tôi xây dựng các website tùy chỉnh dựa trên giải pháp CMS mạnh mẽ, giúp doanh nghiệp quản lý và xuất bản nội dung hiệu quả trên nhiều nền tảng. Phương pháp của chúng tôi kết hợp kiến trúc headless và truyền thống, mang lại sự linh hoạt của phân phối nội dung hiện đại cùng dễ sử dụng mà đội biên tập của bạn mong đợi.",
    },
    longDescription: {
      en: "We build custom websites leveraging powerful CMS solutions, enabling businesses to manage and publish content efficiently across multiple platforms with ease and flexibility. Integrated AI features help streamline content organization, reduce human error, and enhance long-term maintainability.",
      vi: "Chúng tôi xây dựng các website tùy chỉnh dựa trên giải pháp CMS mạnh mẽ, giúp doanh nghiệp quản lý và xuất bản nội dung hiệu quả trên nhiều nền tảng một cách dễ dàng và linh hoạt. Các tính năng AI tích hợp giúp tinh gọn tổ chức nội dung, giảm thiểu sai sót con người và nâng cao khả năng bảo trì dài hạn.",
    },
    icon: Layout,
    gradient: "from-brand/10 to-accent-cyan/10",
    heroAccent: "from-brand to-accent-cyan",
    heroColor: "brand",
    features: [
      {
        icon: Layout,
        title: { en: "Custom Themes", vi: "Giao diện Tùy chỉnh" },
        description: {
          en: "Bespoke designs tailored to your brand identity and user expectations.",
          vi: "Thiết kế riêng phù hợp với nhận diện thương hiệu và kỳ vọng người dùng.",
        },
      },
      {
        icon: ShieldCheck,
        title: { en: "Security Hardening", vi: "Tăng cường Bảo mật" },
        description: {
          en: "Enterprise-grade security with regular updates and vulnerability scanning.",
          vi: "Bảo mật cấp doanh nghiệp với cập nhật định kỳ và quét lỗ hổng.",
        },
      },
      {
        icon: Search,
        title: { en: "SEO Optimization", vi: "Tối ưu SEO" },
        description: {
          en: "Built-in SEO best practices for maximum search engine visibility.",
          vi: "Tích hợp sẵn các thực hành SEO tốt nhất cho khả năng hiển thị tối đa trên công cụ tìm kiếm.",
        },
      },
      {
        icon: Smartphone,
        title: { en: "Responsive Design", vi: "Thiết kế Responsive" },
        description: {
          en: "Pixel-perfect layouts across all devices and screen sizes.",
          vi: "Bố cục pixel-perfect trên mọi thiết bị và kích thước màn hình.",
        },
      },
      {
        icon: Workflow,
        title: { en: "Content Workflows", vi: "Quy trình Nội dung" },
        description: {
          en: "Custom editorial workflows with role-based permissions and approval chains.",
          vi: "Quy trình biên tập tùy chỉnh với phân quyền theo vai trò và chuỗi phê duyệt.",
        },
      },
      {
        icon: Headphones,
        title: { en: "Ongoing Support", vi: "Hỗ trợ Liên tục" },
        description: {
          en: "Dedicated maintenance and support to keep your CMS running smoothly.",
          vi: "Bảo trì và hỗ trợ chuyên trách để CMS của bạn vận hành trơn tru.",
        },
      },
    ],
    benefits: [
      {
        title: { en: "Faster Time-to-Market", vi: "Time-to-Market Nhanh hơn" },
        description: {
          en: "Launch your website weeks faster with our proven CMS frameworks and pre-built components.",
          vi: "Ra mắt website nhanh hơn nhiều tuần với các framework CMS đã được chứng minh và component dựng sẵn.",
        },
      },
      {
        title: { en: "Content Editor Freedom", vi: "Tự do cho Biên tập viên" },
        description: {
          en: "Non-technical teams can publish and manage content without developer dependencies.",
          vi: "Các đội ngũ không chuyên kỹ thuật có thể xuất bản và quản lý nội dung mà không phụ thuộc lập trình viên.",
        },
      },
      {
        title: { en: "SEO-Ready Architecture", vi: "Kiến trúc Sẵn sàng cho SEO" },
        description: {
          en: "Server-side rendering, semantic markup, and optimized Core Web Vitals from day one.",
          vi: "Server-side rendering, markup ngữ nghĩa và Core Web Vitals tối ưu ngay từ ngày đầu tiên.",
        },
      },
      {
        title: { en: "Multi-Language Content Management", vi: "Quản lý Nội dung Đa ngôn ngữ" },
        description: {
          en: "Serve global audiences with built-in localization, translation workflows, and region-specific content delivery.",
          vi: "Phục vụ khán giả toàn cầu với bản địa hóa tích hợp, quy trình dịch thuật và phân phối nội dung theo khu vực.",
        },
      },
      {
        title: { en: "Content Scheduling and Publishing Workflows", vi: "Lên lịch Nội dung và Quy trình Xuất bản" },
        description: {
          en: "Plan content calendars with draft, review, and scheduled publishing states to keep your site consistently fresh.",
          vi: "Lập kế hoạch lịch nội dung với trạng thái nháp, xét duyệt và xuất bản theo lịch để giữ trang luôn mới mẻ.",
        },
      },
      {
        title: { en: "Scalable Content Infrastructure", vi: "Hạ tầng Nội dung Khả mở" },
        description: {
          en: "Headless CMS backends that handle traffic spikes and growing content libraries without performance degradation.",
          vi: "Backend CMS headless xử lý tốt lưu lượng đỉnh và thư viện nội dung tăng trưởng mà không suy giảm hiệu suất.",
        },
      },
      {
        title: { en: "Reduced Maintenance Overhead", vi: "Giảm Chi phí Bảo trì" },
        description: {
          en: "Managed updates, automated backups, and proactive monitoring so your team focuses on content, not infrastructure.",
          vi: "Cập nhật được quản lý, sao lưu tự động và giám sát chủ động để đội ngũ tập trung vào nội dung, không phải hạ tầng.",
        },
      },
    ],
    technologies: ["WordPress", "Strapi", "Contentful", "Sanity", "Next.js", "React", "GraphQL", "REST APIs", "Vercel", "Cloudflare"],
    processSteps: [
      {
        step: 1,
        title: { en: "Discovery and Platform Selection", vi: "Khám phá và Lựa chọn Nền tảng" },
        description: {
          en: "We assess your content needs, editorial workflows, and technical requirements to recommend the right CMS, whether headless, monolithic, or hybrid.",
          vi: "Chúng tôi đánh giá nhu cầu nội dung, quy trình biên tập và yêu cầu kỹ thuật để đề xuất CMS phù hợp: headless, monolithic hay hybrid.",
        },
      },
      {
        step: 2,
        title: { en: "Design and Content Architecture", vi: "Thiết kế và Kiến trúc Nội dung" },
        description: {
          en: "Our team creates custom theme designs, defines content models, and builds a structured information architecture that supports your publishing goals.",
          vi: "Đội ngũ của chúng tôi tạo thiết kế giao diện tùy chỉnh, định nghĩa mô hình nội dung và xây dựng kiến trúc thông tin có cấu trúc hỗ trợ mục tiêu xuất bản của bạn.",
        },
      },
      {
        step: 3,
        title: { en: "Development and Integration", vi: "Phát triển và Tích hợp" },
        description: {
          en: "We build the front-end, configure plugins and integrations, set up content workflows, and implement SEO best practices throughout the stack.",
          vi: "Chúng tôi xây dựng front-end, cấu hình plugin và tích hợp, thiết lập quy trình nội dung và triển khai thực hành SEO tốt nhất xuyên suốt stack.",
        },
      },
      {
        step: 4,
        title: { en: "Content Migration and QA", vi: "Dịch chuyển Nội dung và QA" },
        description: {
          en: "Existing content is carefully migrated with URL mapping and SEO preservation, followed by comprehensive testing across devices and browsers.",
          vi: "Nội dung hiện có được dịch chuyển cẩn thận với ánh xạ URL và bảo toàn SEO, sau đó là kiểm thử toàn diện trên nhiều thiết bị và trình duyệt.",
        },
      },
      {
        step: 5,
        title: { en: "Launch and Training", vi: "Ra mắt và Đào tạo" },
        description: {
          en: "We deploy the CMS, train your editorial team on day-to-day operations, and provide 30 days of post-launch support to ensure a smooth transition.",
          vi: "Chúng tôi triển khai CMS, đào tạo đội biên tập về vận hành hàng ngày và cung cấp 30 ngày hỗ trợ sau triển khai để đảm bảo chuyển đổi suôn sẻ.",
        },
      },
    ],
    faq: [
      {
        question: { en: "What CMS platforms do you work with?", vi: "Các bạn làm việc với nền tảng CMS nào?" },
        answer: {
          en: "We work with WordPress, Drupal, Strapi, Contentful, Sanity, and custom headless CMS solutions. We recommend the best platform based on your specific requirements, content complexity, and team capabilities.",
          vi: "Chúng tôi làm việc với WordPress, Drupal, Strapi, Contentful, Sanity và các giải pháp CMS headless tùy chỉnh. Chúng tôi đề xuất nền tảng phù hợp nhất dựa trên yêu cầu cụ thể, độ phức tạp nội dung và năng lực đội ngũ của bạn.",
        },
      },
      {
        question: { en: "How long does CMS development take?", vi: "Phát triển CMS mất bao lâu?" },
        answer: {
          en: "A standard CMS website takes 4-8 weeks from kickoff to launch, depending on complexity. Custom CMS platforms with advanced features may take 8-16 weeks. We provide a detailed timeline during our discovery phase.",
          vi: "Một website CMS tiêu chuẩn mất 4-8 tuần từ khởi động đến ra mắt, tùy thuộc vào độ phức tạp. Các nền tảng CMS tùy chỉnh với tính năng nâng cao có thể mất 8-16 tuần. Chúng tôi cung cấp timeline chi tiết trong giai đoạn khám phá.",
        },
      },
      {
        question: { en: "Do you provide CMS migration services?", vi: "Các bạn có cung cấp dịch vụ di chuyển CMS không?" },
        answer: {
          en: "Yes, we handle complete CMS migrations including content transfer, URL mapping, SEO preservation, and team training. We ensure zero data loss and minimal downtime during the transition.",
          vi: "Có, chúng tôi xử lý toàn bộ việc di chuyển CMS bao gồm chuyển nội dung, ánh xạ URL, bảo toàn SEO và đào tạo đội ngũ. Chúng tôi đảm bảo không mất dữ liệu và downtime tối thiểu trong quá trình chuyển đổi.",
        },
      },
      {
        question: { en: "Can you integrate AI into our CMS?", vi: "Các bạn có thể tích hợp AI vào CMS của chúng tôi không?" },
        answer: {
          en: "Absolutely. We integrate AI-powered features like automatic content tagging, smart search, content recommendations, automated image optimization, and predictive analytics to enhance your CMS capabilities.",
          vi: "Chắc chắn. Chúng tôi tích hợp các tính năng AI như gắn thẻ nội dung tự động, tìm kiếm thông minh, gợi ý nội dung, tối ưu hình ảnh tự động và phân tích dự đoán để nâng cao năng lực CMS của bạn.",
        },
      },
      {
        question: { en: "What about CMS hosting and maintenance?", vi: "Còn về hosting và bảo trì CMS thì sao?" },
        answer: {
          en: "We offer managed hosting solutions with automatic updates, daily backups, security monitoring, and performance optimization. Our maintenance plans ensure your CMS stays secure and fast.",
          vi: "Chúng tôi cung cấp giải pháp hosting được quản lý với cập nhật tự động, sao lưu hàng ngày, giám sát bảo mật và tối ưu hiệu suất. Các gói bảo trì của chúng tôi đảm bảo CMS của bạn luôn an toàn và nhanh.",
        },
      },
    ],
    timeline: [
      { week: { en: "Week 1-2", vi: "Tuần 1-2" }, phase: { en: "Discovery", vi: "Khám phá" }, description: { en: "Requirements gathering, content audit, and CMS platform selection.", vi: "Thu thập yêu cầu, kiểm toán nội dung và lựa chọn nền tảng CMS." } },
      { week: { en: "Week 2-4", vi: "Tuần 2-4" }, phase: { en: "Design", vi: "Thiết kế" }, description: { en: "Custom theme design, wireframes, and brand-aligned visual concepts.", vi: "Thiết kế giao diện tùy chỉnh, wireframe và khái niệm thị giác phù hợp thương hiệu." } },
      { week: { en: "Week 4-8", vi: "Tuần 4-8" }, phase: { en: "Development", vi: "Phát triển" }, description: { en: "Theme build, content migration, plugin integration, and SEO setup.", vi: "Xây dựng giao diện, di chuyển nội dung, tích hợp plugin và thiết lập SEO." } },
      { week: { en: "Week 8-10", vi: "Tuần 8-10" }, phase: { en: "Launch", vi: "Ra mắt" }, description: { en: "QA testing, performance tuning, training, and go-live deployment.", vi: "Kiểm thử QA, tinh chỉnh hiệu suất, đào tạo và triển khai go-live." } },
    ],
  },
  {
    id: "crm-systems",
    slug: { en: "crm-systems", vi: "he-thong-crm" },
    title: { en: "CRM Systems", vi: "Hệ thống CRM" },
    subtitle: {
      en: "Customer-Centric Tools",
      vi: "Công cụ Lấy Khách hàng làm Trung tâm",
    },
    description: {
      en: "We develop tailored websites integrated with CRM systems, designed to enhance customer engagement and improve communication. Whether extending an existing platform like Salesforce or HubSpot, or building a bespoke CRM from scratch, we focus on streamlining your sales, support, and marketing workflows into one unified system.",
      vi: "Chúng tôi phát triển các website tùy chỉnh tích hợp với hệ thống CRM, được thiết kế để tăng tương tác khách hàng và cải thiện giao tiếp. Dù là mở rộng nền tảng sẵn có như Salesforce hay HubSpot, hay xây dựng CRM riêng từ đầu, chúng tôi tập trung hợp nhất quy trình bán hàng, hỗ trợ và marketing vào một hệ thống thống nhất.",
    },
    longDescription: {
      en: "We develop tailored websites integrated with CRM systems, designed to enhance customer engagement, improve communication, and streamline client relationship workflows. With AI support, our solutions enable intelligent automation, predictive insights, and fewer operational mistakes, making your system easier to manage and scale.",
      vi: "Chúng tôi phát triển các website tùy chỉnh tích hợp với hệ thống CRM, được thiết kế để tăng tương tác khách hàng, cải thiện giao tiếp và tinh gọn quy trình quan hệ khách hàng. Với hỗ trợ AI, giải pháp của chúng tôi cho phép tự động hóa thông minh, insight dự đoán và ít sai sót vận hành hơn, giúp hệ thống của bạn dễ quản lý và mở rộng.",
    },
    icon: Users,
    gradient: "from-accent-cyan/10 to-accent-violet/10",
    heroAccent: "from-accent-cyan to-brand",
    heroColor: "accent-cyan",
    features: [
      {
        icon: Users,
        title: { en: "Contact Management", vi: "Quản lý Liên hệ" },
        description: {
          en: "360-degree customer profiles with interaction history and insights.",
          vi: "Hồ sơ khách hàng 360 độ với lịch sử tương tác và insight.",
        },
      },
      {
        icon: BarChart,
        title: { en: "Sales Pipeline", vi: "Pipeline Bán hàng" },
        description: {
          en: "Visual pipeline management with forecasting and automation.",
          vi: "Quản lý pipeline trực quan với dự báo và tự động hóa.",
        },
      },
      {
        icon: Headphones,
        title: { en: "Support Integration", vi: "Tích hợp Hỗ trợ" },
        description: {
          en: "Unified support ticketing with customer context and SLA tracking.",
          vi: "Hệ thống ticket hỗ trợ thống nhất với ngữ cảnh khách hàng và theo dõi SLA.",
        },
      },
      {
        icon: Workflow,
        title: { en: "Workflow Automation", vi: "Tự động hóa Quy trình" },
        description: {
          en: "Automated lead nurturing, follow-ups, and task assignments.",
          vi: "Tự động nuôi dưỡng lead, follow-up và phân công nhiệm vụ.",
        },
      },
      {
        icon: BarChart3,
        title: { en: "Analytics Dashboard", vi: "Dashboard Phân tích" },
        description: {
          en: "Real-time reporting on sales performance and customer behavior.",
          vi: "Báo cáo thời gian thực về hiệu suất bán hàng và hành vi khách hàng.",
        },
      },
      {
        icon: ShieldCheck,
        title: { en: "Data Security", vi: "Bảo mật Dữ liệu" },
        description: {
          en: "Role-based access, encryption, and compliance-ready data handling.",
          vi: "Phân quyền theo vai trò, mã hóa và xử lý dữ liệu sẵn sàng tuân thủ.",
        },
      },
    ],
    benefits: [
      {
        title: { en: "360° Customer View", vi: "Góc nhìn Khách hàng 360°" },
        description: {
          en: "Unified profiles that consolidate every touchpoint, interaction, and transaction into a single source of truth.",
          vi: "Hồ sơ thống nhất gộp mọi điểm chạm, tương tác và giao dịch vào một nguồn dữ liệu duy nhất.",
        },
      },
      {
        title: { en: "Sales Pipeline Acceleration", vi: "Tăng tốc Pipeline Bán hàng" },
        description: {
          en: "Automated lead scoring, follow-ups, and deal tracking that help your team close more deals, faster.",
          vi: "Tự động chấm điểm lead, follow-up và theo dõi deal giúp đội của bạn chốt nhiều deal hơn, nhanh hơn.",
        },
      },
      {
        title: { en: "Actionable Analytics", vi: "Phân tích Hành động được" },
        description: {
          en: "Real-time dashboards that turn customer data into revenue-driving decisions with visual reporting.",
          vi: "Dashboard thời gian thực chuyển dữ liệu khách hàng thành quyết định thúc đẩy doanh thu với báo cáo trực quan.",
        },
      },
      {
        title: { en: "Automated Lead Nurturing", vi: "Tự động Nuôi dưỡng Lead" },
        description: {
          en: "Trigger-based email sequences, follow-up reminders, and task assignments that keep prospects engaged without manual effort.",
          vi: "Chuỗi email dựa trên trigger, nhắc follow-up và phân công nhiệm vụ giữ prospect tương tác mà không cần thủ công.",
        },
      },
      {
        title: { en: "Cross-Team Visibility", vi: "Tầm nhìn Liên đội ngũ" },
        description: {
          en: "Sales, marketing, and support teams share the same customer context, eliminating information silos and duplicated work.",
          vi: "Các đội bán hàng, marketing và hỗ trợ chia sẻ cùng ngữ cảnh khách hàng, loại bỏ silo thông tin và công việc trùng lặp.",
        },
      },
      {
        title: { en: "Compliance-Ready Data Handling", vi: "Xử lý Dữ liệu Sẵn sàng Tuân thủ" },
        description: {
          en: "Built-in data governance, role-based access controls, and audit trails that meet GDPR and industry-specific regulations.",
          vi: "Quản trị dữ liệu tích hợp, kiểm soát truy cập theo vai trò và audit trail đáp ứng GDPR và quy định đặc thù ngành.",
        },
      },
    ],
    technologies: ["Salesforce", "HubSpot", "Zoho", "React", "Node.js", "PostgreSQL", "REST APIs", "TypeScript", "Redis", "Webhooks"],
    processSteps: [
      {
        step: 1,
        title: { en: "Requirements and Workflow Mapping", vi: "Yêu cầu và Ánh xạ Quy trình" },
        description: {
          en: "We interview stakeholders across sales, marketing, and support to map existing workflows, pain points, and integration requirements before selecting the right CRM approach.",
          vi: "Chúng tôi phỏng vấn stakeholder trong bán hàng, marketing và hỗ trợ để ánh xạ quy trình hiện tại, điểm đau và yêu cầu tích hợp trước khi chọn cách tiếp cận CRM phù hợp.",
        },
      },
      {
        step: 2,
        title: { en: "System Architecture and Design", vi: "Kiến trúc và Thiết kế Hệ thống" },
        description: {
          en: "We design the data model, define custom fields and objects, plan third-party integrations, and create the UI/UX for any custom-facing components.",
          vi: "Chúng tôi thiết kế mô hình dữ liệu, định nghĩa trường và object tùy chỉnh, lên kế hoạch tích hợp bên thứ ba và tạo UI/UX cho các component hướng khách hàng.",
        },
      },
      {
        step: 3,
        title: { en: "Development and Integration", vi: "Phát triển và Tích hợp" },
        description: {
          en: "Custom modules, API integrations, workflow automation rules, and dashboards are built iteratively with regular client reviews and demos.",
          vi: "Module tùy chỉnh, tích hợp API, quy tắc tự động hóa quy trình và dashboard được xây dựng lặp lại với đánh giá client định kỳ và demo.",
        },
      },
      {
        step: 4,
        title: { en: "Data Migration and Testing", vi: "Di chuyển Dữ liệu và Kiểm thử" },
        description: {
          en: "Existing customer data is migrated with deduplication and field mapping, followed by end-to-end testing including user acceptance testing with your team.",
          vi: "Dữ liệu khách hàng hiện có được di chuyển với khử trùng lặp và ánh xạ trường, sau đó là kiểm thử end-to-end bao gồm kiểm thử chấp nhận người dùng với đội của bạn.",
        },
      },
      {
        step: 5,
        title: { en: "Deployment and Team Onboarding", vi: "Triển khai và Onboarding Đội ngũ" },
        description: {
          en: "We launch the CRM, conduct hands-on training sessions for each user group, and provide post-launch support to ensure smooth adoption.",
          vi: "Chúng tôi ra mắt CRM, tiến hành phiên đào tạo thực hành cho từng nhóm người dùng và cung cấp hỗ trợ sau ra mắt để đảm bảo áp dụng suôn sẻ.",
        },
      },
    ],
    faq: [
      {
        question: { en: "What CRM platforms do you integrate with?", vi: "Các bạn tích hợp với nền tảng CRM nào?" },
        answer: {
          en: "We integrate with Salesforce, HubSpot, Zoho, Pipedrive, and custom CRM solutions. Our team can also build bespoke CRM systems tailored to your unique business processes.",
          vi: "Chúng tôi tích hợp với Salesforce, HubSpot, Zoho, Pipedrive và các giải pháp CRM tùy chỉnh. Đội của chúng tôi cũng có thể xây dựng hệ thống CRM riêng phù hợp với quy trình kinh doanh đặc thù của bạn.",
        },
      },
      {
        question: { en: "How long does CRM development take?", vi: "Phát triển CRM mất bao lâu?" },
        answer: {
          en: "CRM integration projects typically take 4-10 weeks. Custom CRM development can range from 8-20 weeks depending on the complexity of workflows, integrations, and automation requirements.",
          vi: "Dự án tích hợp CRM thường mất 4-10 tuần. Phát triển CRM tùy chỉnh có thể kéo dài 8-20 tuần tùy thuộc vào độ phức tạp của quy trình, tích hợp và yêu cầu tự động hóa.",
        },
      },
      {
        question: { en: "Can you automate our sales process?", vi: "Các bạn có thể tự động hóa quy trình bán hàng của chúng tôi không?" },
        answer: {
          en: "Yes, we design and implement end-to-end sales automation including lead scoring, automated follow-ups, pipeline management, and AI-powered insights to help your sales team close more deals.",
          vi: "Có, chúng tôi thiết kế và triển khai tự động hóa bán hàng end-to-end bao gồm chấm điểm lead, follow-up tự động, quản lý pipeline và insight hỗ trợ AI giúp đội bán hàng của bạn chốt nhiều deal hơn.",
        },
      },
      {
        question: { en: "Do you provide CRM training?", vi: "Các bạn có đào tạo CRM không?" },
        answer: {
          en: "We provide comprehensive training for your team including documentation, video tutorials, and hands-on workshops to ensure smooth adoption and maximum ROI from your CRM investment.",
          vi: "Chúng tôi cung cấp đào tạo toàn diện cho đội của bạn bao gồm tài liệu, video hướng dẫn và workshop thực hành để đảm bảo áp dụng suôn sẻ và ROI tối đa từ khoản đầu tư CRM.",
        },
      },
      {
        question: { en: "What about data migration to a new CRM?", vi: "Còn về di chuyển dữ liệu sang CRM mới thì sao?" },
        answer: {
          en: "We handle complete data migration with deduplication, field mapping, relationship preservation, and validation to ensure your data transfers cleanly to the new system.",
          vi: "Chúng tôi xử lý di chuyển dữ liệu toàn diện với khử trùng lặp, ánh xạ trường, bảo toàn quan hệ và validation để đảm bảo dữ liệu của bạn chuyển sạch sang hệ thống mới.",
        },
      },
    ],
    timeline: [
      { week: { en: "Week 1-2", vi: "Tuần 1-2" }, phase: { en: "Requirements", vi: "Yêu cầu" }, description: { en: "Stakeholder interviews, workflow mapping, and CRM platform evaluation.", vi: "Phỏng vấn stakeholder, ánh xạ quy trình và đánh giá nền tảng CRM." } },
      { week: { en: "Week 2-5", vi: "Tuần 2-5" }, phase: { en: "Architecture", vi: "Kiến trúc" }, description: { en: "Data model design, integration planning, and system architecture.", vi: "Thiết kế mô hình dữ liệu, lập kế hoạch tích hợp và kiến trúc hệ thống." } },
      { week: { en: "Week 5-10", vi: "Tuần 5-10" }, phase: { en: "Build", vi: "Xây dựng" }, description: { en: "Custom development, data migration, workflow automation, and API integrations.", vi: "Phát triển tùy chỉnh, di chuyển dữ liệu, tự động hóa quy trình và tích hợp API." } },
      { week: { en: "Week 10-12", vi: "Tuần 10-12" }, phase: { en: "Deploy", vi: "Triển khai" }, description: { en: "User acceptance testing, team training, and production rollout.", vi: "Kiểm thử chấp nhận người dùng, đào tạo đội và rollout sản xuất." } },
    ],
  },
  {
    id: "erp-solutions",
    slug: { en: "erp-solutions", vi: "giai-phap-erp" },
    title: { en: "ERP Solutions", vi: "Giải pháp ERP" },
    subtitle: {
      en: "Insightful Dashboards",
      vi: "Dashboard Đầy đủ Insight",
    },
    description: {
      en: "We create integrated web solutions based on ERP systems, connecting departments and optimizing operations. From finance and HR to procurement and inventory, our ERP implementations unify your business processes into a single platform with real-time visibility across the organization.",
      vi: "Chúng tôi tạo các giải pháp web tích hợp dựa trên hệ thống ERP, kết nối các phòng ban và tối ưu vận hành. Từ tài chính và HR đến mua hàng và tồn kho, các triển khai ERP của chúng tôi hợp nhất quy trình kinh doanh vào một nền tảng duy nhất với tầm nhìn thời gian thực trên toàn tổ chức.",
    },
    longDescription: {
      en: "We create integrated web solutions based on ERP systems, connecting departments, optimizing operations, and providing real-time data access for informed decision-making and sustainable growth. AI-driven analytics and process automation reduce manual effort, minimize errors, and ensure better system reliability and maintenance over time.",
      vi: "Chúng tôi tạo các giải pháp web tích hợp dựa trên hệ thống ERP, kết nối các phòng ban, tối ưu vận hành và cung cấp truy cập dữ liệu thời gian thực cho ra quyết định sáng suốt và tăng trưởng bền vững. Phân tích dẫn dắt AI và tự động hóa quy trình giảm nỗ lực thủ công, tối thiểu sai sót và đảm bảo độ tin cậy hệ thống tốt hơn cùng khả năng bảo trì theo thời gian.",
    },
    icon: BarChart3,
    gradient: "from-accent-violet/10 to-brand/10",
    heroAccent: "from-accent-violet to-brand",
    heroColor: "accent-violet",
    features: [
      {
        icon: BarChart3,
        title: { en: "Real-Time Dashboards", vi: "Dashboard Thời gian thực" },
        description: {
          en: "Live operational dashboards with customizable KPIs and alerts.",
          vi: "Dashboard vận hành trực tiếp với KPI tùy chỉnh và cảnh báo.",
        },
      },
      {
        icon: Workflow,
        title: { en: "Process Automation", vi: "Tự động hóa Quy trình" },
        description: {
          en: "Automated workflows across departments for efficiency and accuracy.",
          vi: "Quy trình tự động hóa xuyên phòng ban cho hiệu suất và độ chính xác.",
        },
      },
      {
        icon: ShieldCheck,
        title: { en: "Data Governance", vi: "Quản trị Dữ liệu" },
        description: {
          en: "Centralized data management with audit trails and compliance.",
          vi: "Quản lý dữ liệu tập trung với audit trail và tuân thủ.",
        },
      },
      {
        icon: Users,
        title: { en: "Multi-Department", vi: "Đa Phòng ban" },
        description: {
          en: "Unified platform connecting finance, HR, operations, and more.",
          vi: "Nền tảng thống nhất kết nối tài chính, HR, vận hành và hơn thế nữa.",
        },
      },
      {
        icon: Globe,
        title: { en: "Cloud Deployment", vi: "Triển khai Cloud" },
        description: {
          en: "Scalable cloud infrastructure with high availability and DR.",
          vi: "Hạ tầng cloud khả mở với high availability và DR.",
        },
      },
      {
        icon: Smartphone,
        title: { en: "Mobile Access", vi: "Truy cập Mobile" },
        description: {
          en: "Full ERP functionality on mobile devices for on-the-go management.",
          vi: "Toàn bộ chức năng ERP trên thiết bị di động cho quản lý khi đang di chuyển.",
        },
      },
    ],
    benefits: [
      {
        title: { en: "Operational Efficiency", vi: "Hiệu suất Vận hành" },
        description: {
          en: "Automate cross-department workflows and eliminate manual data entry, reducing processing time by up to 60%.",
          vi: "Tự động hóa quy trình xuyên phòng ban và loại bỏ nhập liệu thủ công, giảm thời gian xử lý tới 60%.",
        },
      },
      {
        title: { en: "Real-Time Insights", vi: "Insight Thời gian thực" },
        description: {
          en: "Live dashboards and KPI tracking give leadership the data they need to make informed decisions on the spot.",
          vi: "Dashboard trực tiếp và theo dõi KPI cung cấp cho leadership dữ liệu cần thiết để ra quyết định sáng suốt tại chỗ.",
        },
      },
      {
        title: { en: "Scalable Architecture", vi: "Kiến trúc Khả mở" },
        description: {
          en: "Cloud-native systems that grow with your business without costly re-platforming or migration projects.",
          vi: "Hệ thống cloud-native phát triển cùng doanh nghiệp của bạn mà không cần tốn kém re-platform hay dự án di chuyển.",
        },
      },
      {
        title: { en: "Cross-Department Transparency", vi: "Minh bạch Xuyên phòng ban" },
        description: {
          en: "Finance, HR, operations, and procurement share a single source of truth, eliminating data silos and reconciliation headaches.",
          vi: "Tài chính, HR, vận hành và mua hàng chia sẻ một nguồn dữ liệu duy nhất, loại bỏ silo dữ liệu và khó khăn đối soát.",
        },
      },
      {
        title: { en: "Automated Compliance and Audit Trails", vi: "Tự động hóa Tuân thủ và Audit Trail" },
        description: {
          en: "Built-in logging, approval chains, and version tracking simplify regulatory compliance and internal audits.",
          vi: "Logging tích hợp, chuỗi phê duyệt và theo dõi phiên bản đơn giản hóa tuân thủ pháp lý và audit nội bộ.",
        },
      },
      {
        title: { en: "Reduced IT Overhead", vi: "Giảm Chi phí IT" },
        description: {
          en: "Cloud deployment with managed infrastructure means fewer on-premise servers, lower maintenance costs, and automatic updates.",
          vi: "Triển khai cloud với hạ tầng được quản lý nghĩa là ít server on-premise hơn, chi phí bảo trì thấp hơn và cập nhật tự động.",
        },
      },
      {
        title: { en: "Mobile Workforce Enablement", vi: "Cho phép Lực lượng Lao động Di động" },
        description: {
          en: "Approve purchase orders, review reports, and manage workflows from any device, keeping operations moving outside the office.",
          vi: "Phê duyệt purchase order, xem báo cáo và quản lý quy trình từ bất kỳ thiết bị nào, giữ vận hành tiếp diễn ngoài văn phòng.",
        },
      },
    ],
    technologies: ["Odoo", "SAP", "Docker", "Kubernetes", "Python", "PostgreSQL", "Redis", "REST APIs", "AWS", "Nginx"],
    processSteps: [
      {
        step: 1,
        title: { en: "Business Process Review", vi: "Đánh giá Quy trình Kinh doanh" },
        description: {
          en: "We conduct department-level workshops to map current processes, identify bottlenecks, and define requirements for each ERP module.",
          vi: "Chúng tôi tiến hành workshop cấp phòng ban để ánh xạ quy trình hiện tại, xác định điểm nghẽn và định nghĩa yêu cầu cho từng module ERP.",
        },
      },
      {
        step: 2,
        title: { en: "Platform Selection and Architecture", vi: "Lựa chọn Nền tảng và Kiến trúc" },
        description: {
          en: "Based on your scale, industry, and integration needs, we recommend the right ERP platform and design the overall system architecture.",
          vi: "Dựa trên quy mô, ngành và nhu cầu tích hợp, chúng tôi đề xuất nền tảng ERP phù hợp và thiết kế kiến trúc hệ thống tổng thể.",
        },
      },
      {
        step: 3,
        title: { en: "Configuration and Custom Development", vi: "Cấu hình và Phát triển Tùy chỉnh" },
        description: {
          en: "Core modules are configured, custom fields and workflows are built, and third-party integrations (CRM, e-commerce, payment gateways) are connected.",
          vi: "Module cốt lõi được cấu hình, trường và quy trình tùy chỉnh được xây dựng, và tích hợp bên thứ ba (CRM, e-commerce, cổng thanh toán) được kết nối.",
        },
      },
      {
        step: 4,
        title: { en: "Data Migration and User Acceptance Testing", vi: "Di chuyển Dữ liệu và Kiểm thử Chấp nhận Người dùng" },
        description: {
          en: "Legacy data is migrated with validation, and key users from each department participate in structured testing to verify workflows.",
          vi: "Dữ liệu legacy được di chuyển với validation, và người dùng chủ chốt từ mỗi phòng ban tham gia kiểm thử có cấu trúc để xác minh quy trình.",
        },
      },
      {
        step: 5,
        title: { en: "Phased Rollout and Training", vi: "Rollout theo Giai đoạn và Đào tạo" },
        description: {
          en: "We deploy modules in phases to minimize disruption, train each user group, and provide stabilization support during the transition period.",
          vi: "Chúng tôi triển khai module theo giai đoạn để giảm thiểu gián đoạn, đào tạo từng nhóm người dùng và cung cấp hỗ trợ ổn định trong giai đoạn chuyển tiếp.",
        },
      },
    ],
    faq: [
      {
        question: { en: "What ERP systems do you work with?", vi: "Các bạn làm việc với hệ thống ERP nào?" },
        answer: {
          en: "We work with Odoo, SAP, Microsoft Dynamics, NetSuite, and custom-built ERP solutions. We help you choose the right platform based on your industry, scale, and operational complexity.",
          vi: "Chúng tôi làm việc với Odoo, SAP, Microsoft Dynamics, NetSuite và các giải pháp ERP tự xây dựng. Chúng tôi giúp bạn chọn nền tảng phù hợp dựa trên ngành, quy mô và độ phức tạp vận hành.",
        },
      },
      {
        question: { en: "How long does ERP implementation take?", vi: "Triển khai ERP mất bao lâu?" },
        answer: {
          en: "ERP implementations typically range from 12-24 weeks for mid-sized deployments. We follow a phased approach starting with core modules, then expanding to additional departments and features.",
          vi: "Triển khai ERP thường kéo dài 12-24 tuần cho các triển khai quy mô vừa. Chúng tôi áp dụng cách tiếp cận theo giai đoạn, bắt đầu với module cốt lõi, sau đó mở rộng sang các phòng ban và tính năng bổ sung.",
        },
      },
      {
        question: { en: "Can you customize an existing ERP?", vi: "Các bạn có thể tùy chỉnh ERP sẵn có không?" },
        answer: {
          en: "Yes, we specialize in custom ERP development and extending existing platforms with custom modules, integrations, dashboards, and workflows tailored to your specific business needs.",
          vi: "Có, chúng tôi chuyên phát triển ERP tùy chỉnh và mở rộng nền tảng sẵn có với module tùy chỉnh, tích hợp, dashboard và quy trình phù hợp với nhu cầu kinh doanh đặc thù của bạn.",
        },
      },
      {
        question: { en: "What about ERP integration with other systems?", vi: "Còn về tích hợp ERP với hệ thống khác thì sao?" },
        answer: {
          en: "We build seamless integrations between your ERP and CRM, e-commerce, HR systems, payment gateways, and third-party APIs using middleware and custom connectors.",
          vi: "Chúng tôi xây dựng tích hợp liền mạch giữa ERP và CRM, e-commerce, hệ thống HR, cổng thanh toán và API bên thứ ba sử dụng middleware và connector tùy chỉnh.",
        },
      },
      {
        question: { en: "Do you provide ERP support after launch?", vi: "Các bạn có hỗ trợ ERP sau ra mắt không?" },
        answer: {
          en: "We offer comprehensive post-launch support including bug fixes, feature additions, performance optimization, user training, and system upgrades with agreed SLAs.",
          vi: "Chúng tôi cung cấp hỗ trợ sau ra mắt toàn diện bao gồm sửa lỗi, thêm tính năng, tối ưu hiệu suất, đào tạo người dùng và nâng cấp hệ thống với SLA đã thỏa thuận.",
        },
      },
    ],
    timeline: [
      { week: { en: "Week 1-3", vi: "Tuần 1-3" }, phase: { en: "Analysis", vi: "Phân tích" }, description: { en: "Business process review, department workshops, and ERP platform selection.", vi: "Đánh giá quy trình kinh doanh, workshop phòng ban và lựa chọn nền tảng ERP." } },
      { week: { en: "Week 3-8", vi: "Tuần 3-8" }, phase: { en: "Design & Config", vi: "Thiết kế & Cấu hình" }, description: { en: "Module configuration, workflow design, and data architecture planning.", vi: "Cấu hình module, thiết kế quy trình và lập kế hoạch kiến trúc dữ liệu." } },
      { week: { en: "Week 8-16", vi: "Tuần 8-16" }, phase: { en: "Development", vi: "Phát triển" }, description: { en: "Custom module build, integrations, data migration, and user roles setup.", vi: "Xây dựng module tùy chỉnh, tích hợp, di chuyển dữ liệu và thiết lập vai trò người dùng." } },
      { week: { en: "Week 16-20", vi: "Tuần 16-20" }, phase: { en: "Go-Live", vi: "Go-Live" }, description: { en: "Pilot testing, staff training, phased rollout, and stabilization support.", vi: "Kiểm thử pilot, đào tạo nhân sự, rollout theo giai đoạn và hỗ trợ ổn định." } },
    ],
  },
  {
    id: "web-development",
    slug: { en: "web-development", vi: "phat-trien-web" },
    title: { en: "Web Development", vi: "Phát triển Web" },
    subtitle: {
      en: "Modern Web Applications",
      vi: "Ứng dụng Web Hiện đại",
    },
    description: {
      en: "Custom web applications built with modern frameworks, API-first architecture, and AI features where they earn their place: RAG-powered search, conversational interfaces, recommendation systems, and LLM-backed automation. From marketing sites to enterprise platforms, every build is optimized for performance, security, and long-term maintainability.",
      vi: "Ứng dụng web tùy chỉnh được xây dựng với framework hiện đại, kiến trúc API-first và tính năng AI nơi chúng thực sự cần: tìm kiếm RAG, giao diện hội thoại, hệ thống gợi ý và tự động hóa dựa trên LLM. Từ site marketing đến nền tảng doanh nghiệp, mọi build đều được tối ưu cho hiệu suất, bảo mật và khả năng bảo trì dài hạn.",
    },
    longDescription: {
      en: "We build high-performance web applications using modern technologies and frameworks. From single-page applications to complex enterprise platforms, our development team delivers scalable, secure, and maintainable solutions that drive business growth. Every project follows modern best practices including responsive design, API-first architecture, and comprehensive testing.",
      vi: "Chúng tôi xây dựng các ứng dụng web hiệu suất cao sử dụng công nghệ và framework hiện đại. Từ ứng dụng single-page đến nền tảng doanh nghiệp phức tạp, đội phát triển của chúng tôi bàn giao các giải pháp khả mở, an toàn và dễ bảo trì thúc đẩy tăng trưởng kinh doanh. Mọi dự án đều tuân theo thực hành tốt nhất hiện đại bao gồm thiết kế responsive, kiến trúc API-first và kiểm thử toàn diện.",
    },
    icon: Globe,
    gradient: "from-brand/10 to-accent-violet/10",
    heroAccent: "from-brand to-accent-violet",
    heroColor: "brand",
    features: [
      {
        icon: Globe,
        title: { en: "Full-Stack Development", vi: "Phát triển Full-Stack" },
        description: {
          en: "Frontend and backend development with React, Next.js, Node.js, and more.",
          vi: "Phát triển frontend và backend với React, Next.js, Node.js và hơn thế nữa.",
        },
      },
      {
        icon: Smartphone,
        title: { en: "Progressive Web Apps", vi: "Progressive Web Apps" },
        description: {
          en: "App-like web experiences with offline support and push notifications.",
          vi: "Trải nghiệm web giống native với hỗ trợ offline và push notification.",
        },
      },
      {
        icon: Search,
        title: { en: "SEO-Friendly Architecture", vi: "Kiến trúc Thân thiện SEO" },
        description: {
          en: "Server-side rendering, semantic HTML, and optimized performance.",
          vi: "Server-side rendering, HTML ngữ nghĩa và hiệu suất tối ưu.",
        },
      },
      {
        icon: ShieldCheck,
        title: { en: "Security First", vi: "Bảo mật Lên đầu" },
        description: {
          en: "OWASP-compliant development with authentication and encryption.",
          vi: "Phát triển tuân thủ OWASP với xác thực và mã hóa.",
        },
      },
      {
        icon: BarChart3,
        title: { en: "Performance Optimization", vi: "Tối ưu Hiệu suất" },
        description: {
          en: "Core Web Vitals optimization, CDN setup, and caching strategies.",
          vi: "Tối ưu Core Web Vitals, thiết lập CDN và chiến lược caching.",
        },
      },
      {
        icon: Workflow,
        title: { en: "API Development", vi: "Phát triển API" },
        description: {
          en: "RESTful and GraphQL APIs with documentation and versioning.",
          vi: "API RESTful và GraphQL với tài liệu và versioning.",
        },
      },
    ],
    benefits: [
      {
        title: { en: "Modern Stack", vi: "Stack Hiện đại" },
        description: {
          en: "React, Next.js, TypeScript, and Node.js, built with the tools top companies use.",
          vi: "React, Next.js, TypeScript và Node.js, được xây dựng với công cụ mà các công ty hàng đầu sử dụng.",
        },
      },
      {
        title: { en: "Performance First", vi: "Hiệu suất Lên đầu" },
        description: {
          en: "Optimized Core Web Vitals, lazy loading, and CDN distribution for instant load times.",
          vi: "Core Web Vitals tối ưu, lazy loading và phân phối CDN cho thời gian tải tức thì.",
        },
      },
      {
        title: { en: "Security Hardened", vi: "Tăng cường Bảo mật" },
        description: {
          en: "OWASP-compliant code with authentication, encryption, and regular vulnerability scanning.",
          vi: "Code tuân thủ OWASP với xác thực, mã hóa và quét lỗ hổng định kỳ.",
        },
      },
      {
        title: { en: "Progressive Web App Capabilities", vi: "Khả năng Progressive Web App" },
        description: {
          en: "Offline support, push notifications, and install-to-homescreen functionality that blur the line between web and native apps.",
          vi: "Hỗ trợ offline, push notification và tính năng install-to-homescreen làm mờ ranh giới giữa web và native app.",
        },
      },
      {
        title: { en: "API-First Architecture", vi: "Kiến trúc API-First" },
        description: {
          en: "Well-documented REST or GraphQL APIs that enable future integrations, mobile apps, and third-party connections without refactoring.",
          vi: "API REST hoặc GraphQL có tài liệu tốt, cho phép tích hợp tương lai, mobile app và kết nối bên thứ ba mà không cần refactor.",
        },
      },
      {
        title: { en: "Automated Testing and CI/CD", vi: "Kiểm thử Tự động và CI/CD" },
        description: {
          en: "Unit tests, integration tests, and automated deployment pipelines that catch bugs early and ship updates with confidence.",
          vi: "Unit test, integration test và pipeline deployment tự động phát hiện bug sớm và tung ra cập nhật với độ tin cậy.",
        },
      },
    ],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "GraphQL", "Docker", "Vercel", "Prisma"],
    processSteps: [
      {
        step: 1,
        title: { en: "Technical Discovery and Planning", vi: "Khám phá Kỹ thuật và Lập kế hoạch" },
        description: {
          en: "We define the technical scope, choose the right architecture (SSR, SSG, SPA), plan the data model, and establish sprint milestones.",
          vi: "Chúng tôi định nghĩa phạm vi kỹ thuật, chọn kiến trúc phù hợp (SSR, SSG, SPA), lên kế hoạch mô hình dữ liệu và thiết lập milestone sprint.",
        },
      },
      {
        step: 2,
        title: { en: "UI/UX Design and Prototyping", vi: "Thiết kế UI/UX và Prototyping" },
        description: {
          en: "Interactive prototypes and high-fidelity designs are created with your brand identity, then validated with stakeholder feedback before development begins.",
          vi: "Prototype tương tác và thiết kế high-fidelity được tạo với nhận diện thương hiệu của bạn, sau đó được validate với phản hồi stakeholder trước khi bắt đầu phát triển.",
        },
      },
      {
        step: 3,
        title: { en: "Agile Development", vi: "Phát triển Agile" },
        description: {
          en: "We build in 2-week sprints with regular demos, covering frontend components, backend APIs, database schema, and third-party integrations iteratively.",
          vi: "Chúng tôi xây dựng trong sprint 2 tuần với demo định kỳ, bao gồm component frontend, API backend, schema database và tích hợp bên thứ ba một cách lặp lại.",
        },
      },
      {
        step: 4,
        title: { en: "Testing and Quality Assurance", vi: "Kiểm thử và Đảm bảo Chất lượng" },
        description: {
          en: "Automated test suites, cross-browser testing, performance audits, and security scans ensure production readiness before any code ships.",
          vi: "Bộ test tự động, kiểm thử cross-browser, audit hiệu suất và quét bảo mật đảm bảo sẵn sàng sản xuất trước khi bất kỳ code nào được tung ra.",
        },
      },
      {
        step: 5,
        title: { en: "Deployment and Handoff", vi: "Triển khai và Bàn giao" },
        description: {
          en: "CI/CD pipelines are configured, the application is deployed to production, and comprehensive documentation plus 30-day support ensure a smooth launch.",
          vi: "Pipeline CI/CD được cấu hình, ứng dụng được triển khai lên sản xuất, và tài liệu toàn diện cùng 30 ngày hỗ trợ đảm bảo ra mắt suôn sẻ.",
        },
      },
    ],
    faq: [
      {
        question: { en: "What technologies do you use for web development?", vi: "Các bạn sử dụng công nghệ gì cho phát triển web?" },
        answer: {
          en: "We primarily use React, Next.js, TypeScript, Node.js, and PostgreSQL. We also work with Vue.js, Python, Go, and other technologies based on project requirements.",
          vi: "Chủ yếu chúng tôi sử dụng React, Next.js, TypeScript, Node.js và PostgreSQL. Chúng tôi cũng làm việc với Vue.js, Python, Go và các công nghệ khác dựa trên yêu cầu dự án.",
        },
      },
      {
        question: { en: "Do you build progressive web apps (PWAs)?", vi: "Các bạn có xây dựng progressive web app (PWA) không?" },
        answer: {
          en: "Yes, we build PWAs that work offline, load instantly, and provide a native app-like experience. PWAs are ideal for businesses that want mobile reach without app store distribution.",
          vi: "Có, chúng tôi xây dựng PWA hoạt động offline, tải tức thì và cung cấp trải nghiệm giống native app. PWA lý tưởng cho doanh nghiệp muốn tiếp cận mobile mà không cần phân phối qua app store.",
        },
      },
      {
        question: { en: "How do you ensure web application security?", vi: "Các bạn đảm bảo bảo mật ứng dụng web như thế nào?" },
        answer: {
          en: "We follow OWASP guidelines, implement authentication best practices, use encryption at rest and in transit, conduct security audits, and set up monitoring for threat detection.",
          vi: "Chúng tôi tuân thủ hướng dẫn OWASP, triển khai thực hành xác thực tốt nhất, sử dụng mã hóa at rest và in transit, tiến hành audit bảo mật và thiết lập giám sát cho phát hiện mối đe dọa.",
        },
      },
      {
        question: { en: "What is your web development process?", vi: "Quy trình phát triển web của các bạn là gì?" },
        answer: {
          en: "We follow agile methodology with 2-week sprints. The process includes discovery, design, development, testing, staging, and launch with continuous client collaboration throughout.",
          vi: "Chúng tôi áp dụng phương pháp agile với sprint 2 tuần. Quy trình bao gồm khám phá, thiết kế, phát triển, kiểm thử, staging và ra mắt với hợp tác liên tục từ khách hàng xuyên suốt.",
        },
      },
      {
        question: { en: "Can you take over an existing web project?", vi: "Các bạn có thể tiếp nhận dự án web sẵn có không?" },
        answer: {
          en: "Yes, we regularly take over existing projects. We start with a thorough code audit, document the current state, identify technical debt, and create a transition plan for smooth handover.",
          vi: "Có, chúng tôi thường xuyên tiếp nhận dự án sẵn có. Chúng tôi bắt đầu với audit code kỹ lưỡng, tài liệu hóa trạng thái hiện tại, xác định technical debt và tạo kế hoạch chuyển tiếp cho bàn giao suôn sẻ.",
        },
      },
    ],
    timeline: [
      { week: { en: "Week 1-2", vi: "Tuần 1-2" }, phase: { en: "Planning", vi: "Lập kế hoạch" }, description: { en: "Technical scoping, architecture decisions, and sprint roadmap.", vi: "Phạm vi kỹ thuật, quyết định kiến trúc và roadmap sprint." } },
      { week: { en: "Week 2-4", vi: "Tuần 2-4" }, phase: { en: "Design", vi: "Thiết kế" }, description: { en: "UI/UX design, component library, and responsive layouts.", vi: "Thiết kế UI/UX, thư viện component và bố cục responsive." } },
      { week: { en: "Week 4-10", vi: "Tuần 4-10" }, phase: { en: "Development", vi: "Phát triển" }, description: { en: "Frontend and backend build, API integration, and automated testing.", vi: "Xây dựng frontend và backend, tích hợp API và kiểm thử tự động." } },
      { week: { en: "Week 10-12", vi: "Tuần 10-12" }, phase: { en: "Launch", vi: "Ra mắt" }, description: { en: "Staging review, performance optimization, CI/CD setup, and deployment.", vi: "Đánh giá staging, tối ưu hiệu suất, thiết lập CI/CD và triển khai." } },
    ],
  },
  {
    id: "ui-ux-design",
    slug: { en: "ui-ux-design", vi: "thiet-ke-ui-ux" },
    title: { en: "UI/UX Design", vi: "Thiết kế UI/UX" },
    subtitle: {
      en: "User-Centered Design",
      vi: "Thiết kế Lấy Người dùng làm Trung tâm",
    },
    description: {
      en: "Design that drives engagement and conversion through research-backed user experiences. We design for AI-native patterns including conversational interfaces, copilot sidebars, streaming responses, and human-in-the-loop review flows. Every decision is grounded in user research, analytics, and iterative usability testing.",
      vi: "Thiết kế thúc đẩy tương tác và chuyển đổi thông qua trải nghiệm người dùng dựa trên nghiên cứu. Chúng tôi thiết kế cho các pattern AI-native bao gồm giao diện hội thoại, sidebar copilot, phản hồi streaming và quy trình review human-in-the-loop. Mọi quyết định đều dựa trên nghiên cứu người dùng, phân tích và kiểm thử khả năng sử dụng lặp đi lặp lại.",
    },
    longDescription: {
      en: "Our UI/UX design process is grounded in user research, data-driven decisions, and iterative testing. We create interfaces that are not only beautiful but functional, driving measurable improvements in engagement, conversion, and user satisfaction. From wireframes to high-fidelity prototypes, every design decision is intentional and validated.",
      vi: "Quy trình thiết kế UI/UX của chúng tôi dựa trên nghiên cứu người dùng, quyết định dẫn dắt dữ liệu và kiểm thử lặp lại. Chúng tôi tạo các giao diện không chỉ đẹp mà còn chức năng, thúc đẩy cải thiện đo lường được trong tương tác, chuyển đổi và sự hài lòng của người dùng. Từ wireframe đến prototype high-fidelity, mọi quyết định thiết kế đều có chủ đích và được validate.",
    },
    icon: Palette,
    gradient: "from-accent-cyan/10 to-brand/10",
    heroAccent: "from-accent-cyan to-accent-violet",
    heroColor: "accent-cyan",
    features: [
      {
        icon: Search,
        title: { en: "User Research", vi: "Nghiên cứu Người dùng" },
        description: {
          en: "Interviews, surveys, and analytics to understand your users deeply.",
          vi: "Phỏng vấn, khảo sát và phân tích để hiểu sâu người dùng của bạn.",
        },
      },
      {
        icon: Workflow,
        title: { en: "Wireframing", vi: "Wireframing" },
        description: {
          en: "Low and high-fidelity wireframes to validate structure and flow.",
          vi: "Wireframe low và high-fidelity để validate cấu trúc và flow.",
        },
      },
      {
        icon: Palette,
        title: { en: "Visual Design", vi: "Thiết kế Thị giác" },
        description: {
          en: "Pixel-perfect designs with your brand identity and design system.",
          vi: "Thiết kế pixel-perfect với nhận diện thương hiệu và design system của bạn.",
        },
      },
      {
        icon: Smartphone,
        title: { en: "Interactive Prototypes", vi: "Prototype Tương tác" },
        description: {
          en: "Clickable prototypes for stakeholder review and user testing.",
          vi: "Prototype có thể click cho đánh giá stakeholder và kiểm thử người dùng.",
        },
      },
      {
        icon: BarChart3,
        title: { en: "Usability Testing", vi: "Kiểm thử Khả năng Sử dụng" },
        description: {
          en: "Real-user testing sessions to validate and refine designs.",
          vi: "Phiên kiểm thử người dùng thực để validate và tinh chỉnh thiết kế.",
        },
      },
      {
        icon: Users,
        title: { en: "Design Systems", vi: "Design Systems" },
        description: {
          en: "Scalable component libraries for consistent, efficient development.",
          vi: "Thư viện component khả mở cho phát triển nhất quán và hiệu quả.",
        },
      },
    ],
    benefits: [
      {
        title: { en: "Research-Backed Decisions", vi: "Quyết định Dựa trên Nghiên cứu" },
        description: {
          en: "Every design choice is grounded in user research, analytics, and usability testing rather than guesswork.",
          vi: "Mọi lựa chọn thiết kế đều dựa trên nghiên cứu người dùng, phân tích và kiểm thử khả năng sử dụng thay vì phỏng đoán.",
        },
      },
      {
        title: { en: "Conversion Optimized", vi: "Tối ưu Chuyển đổi" },
        description: {
          en: "Interfaces engineered with clear information hierarchy and call-to-action placement to guide users toward your business goals.",
          vi: "Giao diện được thiết kế với phân cấp thông tin rõ ràng và vị trí call-to-action để hướng người dùng đến mục tiêu kinh doanh của bạn.",
        },
      },
      {
        title: { en: "Design System Scale", vi: "Khả mở của Design System" },
        description: {
          en: "Reusable component libraries with documented tokens and guidelines ensure visual consistency as your product and team grow.",
          vi: "Thư viện component tái sử dụng với token và hướng dẫn được tài liệu hóa đảm bảo tính nhất quán thị giác khi sản phẩm và đội ngũ của bạn phát triển.",
        },
      },
      {
        title: { en: "Accessibility Compliance", vi: "Tuân thủ Khả năng Tiếp cận" },
        description: {
          en: "WCAG 2.1 AA compliant designs with verified color contrast, keyboard navigation, and screen reader compatibility built in from the start.",
          vi: "Thiết kế tuân thủ WCAG 2.1 AA với tương phản màu được xác minh, điều hướng bàn phím và khả năng tương thích screen reader tích hợp từ đầu.",
        },
      },
      {
        title: { en: "Faster Development Handoff", vi: "Bàn giao Phát triển Nhanh hơn" },
        description: {
          en: "Developer-ready specs with auto-generated code snippets, spacing tokens, and asset exports that reduce back-and-forth during implementation.",
          vi: "Spec sẵn sàng cho developer với code snippet tự sinh, spacing token và export asset giảm qua lại trong quá trình triển khai.",
        },
      },
      {
        title: { en: "Reduced Redesign Risk", vi: "Giảm Rủi ro Redesign" },
        description: {
          en: "Early-stage prototyping and usability testing catch issues before development begins, saving significant time and budget downstream.",
          vi: "Prototyping giai đoạn đầu và kiểm thử khả năng sử dụng phát hiện vấn đề trước khi bắt đầu phát triển, tiết kiệm đáng kể thời gian và ngân sách sau này.",
        },
      },
    ],
    technologies: ["Figma", "FigJam", "Hotjar", "Maze", "React", "Storybook", "Design Systems", "Framer Motion", "Tailwind CSS", "Lottie"],
    processSteps: [
      {
        step: 1,
        title: { en: "Discovery and User Research", vi: "Khám phá và Nghiên cứu Người dùng" },
        description: {
          en: "We conduct stakeholder interviews, user surveys, competitive analysis, and analytics reviews to build a clear picture of who your users are and what they need.",
          vi: "Chúng tôi tiến hành phỏng vấn stakeholder, khảo sát người dùng, phân tích cạnh tranh và đánh giá phân tích để xây dựng bức tranh rõ ràng về ai là người dùng của bạn và họ cần gì.",
        },
      },
      {
        step: 2,
        title: { en: "Information Architecture and Wireframing", vi: "Kiến trúc Thông tin và Wireframing" },
        description: {
          en: "User flows, site maps, and low-fidelity wireframes are created to validate structure, navigation, and content hierarchy before visual design begins.",
          vi: "User flow, site map và wireframe low-fidelity được tạo để validate cấu trúc, điều hướng và phân cấp nội dung trước khi bắt đầu thiết kế thị giác.",
        },
      },
      {
        step: 3,
        title: { en: "Visual Design and Prototyping", vi: "Thiết kế Thị giác và Prototyping" },
        description: {
          en: "High-fidelity mockups are designed with your brand identity, then assembled into clickable prototypes for stakeholder review and feedback rounds.",
          vi: "Mockup high-fidelity được thiết kế với nhận diện thương hiệu của bạn, sau đó được lắp ráp thành prototype có thể click cho đánh giá stakeholder và vòng phản hồi.",
        },
      },
      {
        step: 4,
        title: { en: "Usability Testing and Iteration", vi: "Kiểm thử Khả năng Sử dụng và Lặp lại" },
        description: {
          en: "Real users interact with the prototypes while we observe pain points and gather feedback, then iterate on the designs until they perform well.",
          vi: "Người dùng thực tương tác với prototype trong khi chúng tôi quan sát điểm đau và thu thập phản hồi, sau đó lặp lại thiết kế cho đến khi chúng hoạt động tốt.",
        },
      },
      {
        step: 5,
        title: { en: "Design System and Developer Handoff", vi: "Design System và Bàn giao Developer" },
        description: {
          en: "A complete design system with reusable components, design tokens, and detailed specs is delivered alongside annotated files for seamless developer handoff.",
          vi: "Một design system hoàn chỉnh với component tái sử dụng, design token và spec chi tiết được bàn giao cùng file có annotation cho việc bàn giao developer liền mạch.",
        },
      },
    ],
    faq: [
      {
        question: { en: "What is your UI/UX design process?", vi: "Quy trình thiết kế UI/UX của các bạn là gì?" },
        answer: {
          en: "Our process includes discovery & research, information architecture, wireframing, visual design, prototyping, usability testing, and design handoff. Each phase includes client review and iteration.",
          vi: "Quy trình của chúng tôi bao gồm khám phá & nghiên cứu, kiến trúc thông tin, wireframing, thiết kế thị giác, prototyping, kiểm thử khả năng sử dụng và bàn giao thiết kế. Mỗi giai đoạn bao gồm đánh giá khách hàng và lặp lại.",
        },
      },
      {
        question: { en: "What design tools do you use?", vi: "Các bạn sử dụng công cụ thiết kế nào?" },
        answer: {
          en: "We use Figma for design and prototyping, FigJam for brainstorming, and build design systems with reusable components. We also use tools like Hotjar and Maze for user research.",
          vi: "Chúng tôi sử dụng Figma cho thiết kế và prototyping, FigJam cho brainstorming và xây dựng design system với component tái sử dụng. Chúng tôi cũng sử dụng công cụ như Hotjar và Maze cho nghiên cứu người dùng.",
        },
      },
      {
        question: { en: "How do you ensure designs are accessible?", vi: "Các bạn đảm bảo thiết kế tiếp cận được như thế nào?" },
        answer: {
          en: "We follow WCAG 2.1 AA guidelines, conduct accessibility audits, test with screen readers, verify color contrast ratios, and ensure keyboard navigation works throughout.",
          vi: "Chúng tôi tuân thủ hướng dẫn WCAG 2.1 AA, tiến hành audit khả năng tiếp cận, kiểm thử với screen reader, xác minh tỷ lệ tương phản màu và đảm bảo điều hướng bàn phím hoạt động xuyên suốt.",
        },
      },
      {
        question: { en: "Do you create design systems?", vi: "Các bạn có tạo design system không?" },
        answer: {
          en: "Yes, we build comprehensive design systems with component libraries, design tokens, usage guidelines, and documentation that ensure consistency across your entire product.",
          vi: "Có, chúng tôi xây dựng design system toàn diện với thư viện component, design token, hướng dẫn sử dụng và tài liệu đảm bảo tính nhất quán trên toàn bộ sản phẩm của bạn.",
        },
      },
      {
        question: { en: "How long does the design phase take?", vi: "Giai đoạn thiết kế mất bao lâu?" },
        answer: {
          en: "Design timelines vary by project scope. A typical website design takes 3-6 weeks, while a complex web application design phase can take 6-12 weeks including research and testing.",
          vi: "Timeline thiết kế thay đổi theo phạm vi dự án. Thiết kế website điển hình mất 3-6 tuần, trong khi giai đoạn thiết kế ứng dụng web phức tạp có thể mất 6-12 tuần bao gồm nghiên cứu và kiểm thử.",
        },
      },
    ],
    timeline: [
      { week: { en: "Week 1-2", vi: "Tuần 1-2" }, phase: { en: "Research", vi: "Nghiên cứu" }, description: { en: "User interviews, competitive analysis, and analytics review.", vi: "Phỏng vấn người dùng, phân tích cạnh tranh và đánh giá phân tích." } },
      { week: { en: "Week 2-4", vi: "Tuần 2-4" }, phase: { en: "Wireframes", vi: "Wireframe" }, description: { en: "Information architecture, user flows, and low-fidelity wireframes.", vi: "Kiến trúc thông tin, user flow và wireframe low-fidelity." } },
      { week: { en: "Week 4-6", vi: "Tuần 4-6" }, phase: { en: "Visual Design", vi: "Thiết kế Thị giác" }, description: { en: "High-fidelity mockups, design system, and interactive prototypes.", vi: "Mockup high-fidelity, design system và prototype tương tác." } },
      { week: { en: "Week 6-8", vi: "Tuần 6-8" }, phase: { en: "Testing & Handoff", vi: "Kiểm thử & Bàn giao" }, description: { en: "Usability testing, iteration, and developer-ready design handoff.", vi: "Kiểm thử khả năng sử dụng, lặp lại và bàn giao thiết kế sẵn sàng cho developer." } },
    ],
  },
  {
    id: "dedicated-teams",
    slug: { en: "dedicated-teams", vi: "doi-ngu-chuyen-trach" },
    title: { en: "Dedicated Teams", vi: "Đội ngũ Chuyên trách" },
    subtitle: {
      en: "Your Offshore Development Team",
      vi: "Đội Phát triển Offshore của Bạn",
    },
    description: {
      en: "Build your offshore development team with engineers experienced in shipping AI features alongside traditional web and mobile work. We handle recruitment, HR, payroll, and infrastructure so you can focus on product while your embedded team integrates RAG, agents, and LLM automation into your existing workflows.",
      vi: "Xây dựng đội phát triển offshore với kỹ sư giàu kinh nghiệm triển khai tính năng AI song song với công việc web và mobile truyền thống. Chúng tôi xử lý tuyển dụng, HR, payroll và hạ tầng để bạn tập trung vào sản phẩm trong khi đội tích hợp của bạn triển khai RAG, agents và tự động hóa LLM vào quy trình hiện có.",
    },
    longDescription: {
      en: "Our dedicated team model gives you access to pre-vetted senior developers, designers, and project managers who work exclusively on your projects. We handle recruitment, HR, infrastructure, and team management while you maintain full technical control. Scale up or down as needed with minimal overhead and maximum flexibility.",
      vi: "Mô hình đội chuyên trách của chúng tôi cho phép bạn truy cập developer senior được sàng lọc trước, designer và project manager làm việc độc quyền cho dự án của bạn. Chúng tôi xử lý tuyển dụng, HR, hạ tầng và quản lý đội ngũ trong khi bạn giữ toàn quyền kiểm soát kỹ thuật. Mở rộng hoặc thu hẹp theo nhu cầu với overhead tối thiểu và tính linh hoạt tối đa.",
    },
    icon: UsersRound,
    gradient: "from-accent-violet/10 to-accent-cyan/10",
    heroAccent: "from-accent-violet to-accent-cyan",
    heroColor: "accent-violet",
    features: [
      {
        icon: UsersRound,
        title: { en: "Pre-Vetted Talent", vi: "Nhân sự Đã sàng lọc" },
        description: {
          en: "Senior engineers selected through rigorous technical assessments.",
          vi: "Kỹ sư senior được chọn thông qua đánh giá kỹ thuật khắt khe.",
        },
      },
      {
        icon: Headphones,
        title: { en: "Fully Managed", vi: "Được Quản lý Toàn diện" },
        description: {
          en: "HR, payroll, equipment, and infrastructure all handled by us.",
          vi: "HR, payroll, thiết bị và hạ tầng đều được chúng tôi xử lý.",
        },
      },
      {
        icon: Workflow,
        title: { en: "Agile Processes", vi: "Quy trình Agile" },
        description: {
          en: "Scrum/Kanban workflows with daily standups and sprint planning.",
          vi: "Quy trình Scrum/Kanban với standup hàng ngày và lập kế hoạch sprint.",
        },
      },
      {
        icon: ShieldCheck,
        title: { en: "IP Protection", vi: "Bảo vệ IP" },
        description: {
          en: "NDAs, secure infrastructure, and compliance with your policies.",
          vi: "NDA, hạ tầng an toàn và tuân thủ chính sách của bạn.",
        },
      },
      {
        icon: BarChart3,
        title: { en: "Transparent Reporting", vi: "Báo cáo Minh bạch" },
        description: {
          en: "Weekly reports, time tracking, and performance metrics.",
          vi: "Báo cáo hàng tuần, theo dõi thời gian và chỉ số hiệu suất.",
        },
      },
      {
        icon: Globe,
        title: { en: "Timezone Friendly", vi: "Thân thiện Múi giờ" },
        description: {
          en: "Overlap hours with AU, EU, and US timezones for collaboration.",
          vi: "Giờ chồng lệch với múi giờ AU, EU và US để hợp tác.",
        },
      },
    ],
    benefits: [
      {
        title: { en: "Pre-Vetted Senior Talent", vi: "Nhân sự Senior Đã sàng lọc" },
        description: {
          en: "Every engineer passes a multi-stage technical assessment covering problem-solving, system design, and code quality before joining your team.",
          vi: "Mỗi kỹ sư vượt qua đánh giá kỹ thuật đa giai đoạn bao gồm giải quyết vấn đề, thiết kế hệ thống và chất lượng code trước khi gia nhập đội của bạn.",
        },
      },
      {
        title: { en: "Full Flexibility", vi: "Linh hoạt Toàn diện" },
        description: {
          en: "Scale your team up or down with just 2-4 weeks notice, with no long-term lock-in contracts or penalties.",
          vi: "Mở rộng hoặc thu hẹp đội với chỉ 2-4 tuần thông báo, không có hợp đồng lock-in dài hạn hay penalty.",
        },
      },
      {
        title: { en: "Seamless Integration", vi: "Tích hợp Liền mạch" },
        description: {
          en: "Your offshore team joins your existing workflows, tools, and ceremonies as if they were in-house colleagues.",
          vi: "Đội offshore của bạn tham gia quy trình, công cụ và ceremony hiện có như thể là đồng nghiệp in-house.",
        },
      },
      {
        title: { en: "Cost-Effective Scaling", vi: "Mở rộng Hiệu quả Chi phí" },
        description: {
          en: "Access senior engineering talent at competitive rates without the overhead of local hiring, office space, or benefits administration.",
          vi: "Truy cập nhân sự kỹ thuật senior với mức giá cạnh tranh mà không có overhead của tuyển dụng nội địa, văn phòng hay quản lý phúc lợi.",
        },
      },
      {
        title: { en: "Zero Administrative Overhead", vi: "Không Overhead Hành chính" },
        description: {
          en: "We handle recruitment, HR, payroll, equipment, and office infrastructure so you never deal with employment logistics.",
          vi: "Chúng tôi xử lý tuyển dụng, HR, payroll, thiết bị và hạ tầng văn phòng để bạn không bao giờ phải lo logistics nhân sự.",
        },
      },
      {
        title: { en: "IP Protection and Security", vi: "Bảo vệ IP và Bảo mật" },
        description: {
          en: "Signed NDAs, secure development environments, and compliance with your data security policies protect your intellectual property at all times.",
          vi: "NDA đã ký, môi trường phát triển an toàn và tuân thủ chính sách bảo mật dữ liệu của bạn bảo vệ sở hữu trí tuệ của bạn mọi lúc.",
        },
      },
      {
        title: { en: "Timezone Overlap for Real-Time Collaboration", vi: "Chồng lệch Múi giờ cho Hợp tác Thời gian thực" },
        description: {
          en: "Vietnam-based teams overlap with Australian, European, and US business hours for daily standups and synchronous communication.",
          vi: "Đội ngũ đặt tại Việt Nam chồng lệp với giờ làm việc của Úc, Châu Âu và Mỹ cho standup hàng ngày và giao tiếp đồng bộ.",
        },
      },
    ],
    technologies: ["React", "Next.js", "Node.js", "Python", "Go", "TypeScript", "PostgreSQL", "Docker", "AWS", "GraphQL"],
    processSteps: [
      {
        step: 1,
        title: { en: "Requirements Brief and Talent Matching", vi: "Tóm tắt Yêu cầu và Ghép nhân sự" },
        description: {
          en: "You share your technical requirements, team composition needs, and desired start date. We present pre-screened candidate profiles within one week.",
          vi: "Bạn chia sẻ yêu cầu kỹ thuật, nhu cầu thành phần đội và ngày bắt đầu mong muốn. Chúng tôi trình bày profile ứng viên đã sàng lọc trong một tuần.",
        },
      },
      {
        step: 2,
        title: { en: "Technical Interviews and Selection", vi: "Phỏng vấn Kỹ thuật và Lựa chọn" },
        description: {
          en: "You conduct technical interviews with shortlisted candidates to evaluate fit, communication skills, and domain expertise before making final selections.",
          vi: "Bạn tiến hành phỏng vấn kỹ thuật với ứng viên được chọn để đánh giá sự phù hợp, kỹ năng giao tiếp và chuyên môn lĩnh vực trước khi ra quyết định cuối cùng.",
        },
      },
      {
        step: 3,
        title: { en: "Onboarding and Environment Setup", vi: "Onboarding và Thiết lập Môi trường" },
        description: {
          en: "Selected engineers are provisioned with secure workstations, VPN access, and development environments. They undergo a structured onboarding into your codebase and processes.",
          vi: "Kỹ sư được chọn được cấp workstation an toàn, truy cập VPN và môi trường phát triển. Họ trải qua onboarding có cấu trúc vào codebase và quy trình của bạn.",
        },
      },
      {
        step: 4,
        title: { en: "Integration into Your Workflows", vi: "Tích hợp vào Quy trình của Bạn" },
        description: {
          en: "The team joins your Slack/Jira/Linear boards, participates in standups and sprint planning, and begins delivering code within the first sprint cycle.",
          vi: "Đội tham gia Slack/Jira/Linear board, tham gia standup và lập kế hoạch sprint, và bắt đầu bàn giao code trong sprint đầu tiên.",
        },
      },
      {
        step: 5,
        title: { en: "Ongoing Management and Scaling", vi: "Quản lý Liên tục và Mở rộng" },
        description: {
          en: "We provide weekly performance reports, handle any HR needs, and can scale the team up or down based on your evolving project demands.",
          vi: "Chúng tôi cung cấp báo cáo hiệu suất hàng tuần, xử lý mọi nhu cầu HR và có thể mở rộng hoặc thu hẹp đội dựa trên yêu cầu dự án thay đổi của bạn.",
        },
      },
    ],
    faq: [
      {
        question: { en: "How quickly can you assemble a dedicated team?", vi: "Các bạn có thể lập đội chuyên trách nhanh như thế nào?" },
        answer: {
          en: "We typically assemble a dedicated team within 2-4 weeks. Our talent pool of pre-vetted developers means we can staff projects quickly without compromising on quality.",
          vi: "Thường chúng tôi lập đội chuyên trách trong 2-4 tuần. Pool nhân sự được sàng lọc trước của chúng tôi nghĩa là có thể staff dự án nhanh mà không đánh đổi chất lượng.",
        },
      },
      {
        question: { en: "What technologies do your developers specialize in?", vi: "Developer của các bạn chuyên về công nghệ gì?" },
        answer: {
          en: "Our developers specialize in React, Next.js, TypeScript, Node.js, Python, Go, React Native, Flutter, and more. We match team composition to your specific technology stack.",
          vi: "Developer của chúng tôi chuyên về React, Next.js, TypeScript, Node.js, Python, Go, React Native, Flutter và hơn thế nữa. Chúng tôi ghép thành phần đội với tech stack đặc thù của bạn.",
        },
      },
      {
        question: { en: "How do you handle communication and collaboration?", vi: "Các bạn xử lý giao tiếp và hợp tác như thế nào?" },
        answer: {
          en: "We use Slack, Jira, Confluence, and video conferencing for daily communication. Teams participate in your existing ceremonies and we ensure overlap hours for real-time collaboration.",
          vi: "Chúng tôi sử dụng Slack, Jira, Confluence và video conferencing cho giao tiếp hàng ngày. Đội tham gia ceremony hiện có của bạn và chúng tôi đảm bảo giờ chồng lệch cho hợp tác thời gian thực.",
        },
      },
      {
        question: { en: "What is the pricing model for dedicated teams?", vi: "Mô hình giá cho đội chuyên trách là gì?" },
        answer: {
          en: "We offer monthly retainer pricing based on team composition and seniority. There are no hidden costs. The fee covers salary, benefits, equipment, office space, and management overhead.",
          vi: "Chúng tôi cung cấp giá retainer hàng tháng dựa trên thành phần đội và cấp độ. Không có chi phí ẩn. Phí bao gồm lương, phúc lợi, thiết bị, văn phòng và overhead quản lý.",
        },
      },
      {
        question: { en: "Can I scale the team up or down?", vi: "Tôi có thể mở rộng hoặc thu hẹp đội không?" },
        answer: {
          en: "Yes, our model is designed for flexibility. You can add or reduce team members with 2-4 weeks notice. We also support short-term augmentations for specific sprints or projects.",
          vi: "Có, mô hình của chúng tôi được thiết kế cho tính linh hoạt. Bạn có thể thêm hoặc giảm thành viên đội với 2-4 tuần thông báo. Chúng tôi cũng hỗ trợ tăng cường ngắn hạn cho sprint hoặc dự án cụ thể.",
        },
      },
    ],
    timeline: [
      { week: { en: "Week 1-2", vi: "Tuần 1-2" }, phase: { en: "Talent Selection", vi: "Lựa chọn Nhân sự" }, description: { en: "Requirements brief, candidate screening, and technical interviews.", vi: "Tóm tắt yêu cầu, sàng lọc ứng viên và phỏng vấn kỹ thuật." } },
      { week: { en: "Week 2-3", vi: "Tuần 2-3" }, phase: { en: "Onboarding", vi: "Onboarding" }, description: { en: "Team setup, environment provisioning, and process alignment.", vi: "Thiết lập đội, cấp phát môi trường và căn chỉnh quy trình." } },
      { week: { en: "Week 3-4", vi: "Tuần 3-4" }, phase: { en: "Integration", vi: "Tích hợp" }, description: { en: "Workflow adoption, first sprints, and communication rhythm setup.", vi: "Áp dụng workflow, sprint đầu tiên và thiết lập nhịp giao tiếp." } },
      { week: { en: "Week 4+", vi: "Tuần 4+" }, phase: { en: "Ongoing", vi: "Liên tục" }, description: { en: "Continuous delivery, performance reviews, and team scaling as needed.", vi: "Bàn giao liên tục, đánh giá hiệu suất và mở rộng đội theo nhu cầu." } },
    ],
  },
];

/**
 * Lookup by slug — slug is locale-specific, so the active locale must be
 * passed. Use `getServiceById` for invariant cross-references.
 */
export function getServiceBySlug(slug: string, locale: Locale): ServiceData | undefined {
  return services.find((s) => s.slug[locale] === slug);
}

/**
 * Lookup by invariant id. Use for cross-references that should resolve
 * regardless of the active locale (e.g. case-study → service mapping).
 */
export function getServiceById(id: string): ServiceData | undefined {
  return services.find((s) => s.id === id);
}

/**
 * Return the slug for a service in the given locale.
 * Convenience helper for building locale-aware hrefs.
 */
export function getServiceSlug(id: string, locale: Locale): string | undefined {
  return getServiceById(id)?.slug[locale];
}

/**
 * Flat (single-locale) projection of a service. Returned by `flattenService`
 * for consumers that don't need both locales at once — keeps the page code
 * unchanged from the pre-i18n shape (no `[locale]` indexing at every
 * access site).
 */
export interface FlatService {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  gradient: string;
  heroAccent: string;
  heroColor: string;
  features: { icon: LucideIcon; title: string; description: string }[];
  benefits: { title: string; description: string }[];
  technologies: string[];
  processSteps: { step: number; title: string; description: string }[];
  faq: { question: string; answer: string }[];
  timeline: { week: string; phase: string; description: string }[];
}

/**
 * Project a ServiceData into a single locale. Use this in components that
 * render one locale at a time so the rest of the JSX can stay unchanged.
 */
export function flattenService(svc: ServiceData, locale: Locale): FlatService {
  return {
    id: svc.id,
    slug: svc.slug[locale],
    title: svc.title[locale],
    subtitle: svc.subtitle[locale],
    description: svc.description[locale],
    longDescription: svc.longDescription[locale],
    icon: svc.icon,
    gradient: svc.gradient,
    heroAccent: svc.heroAccent,
    heroColor: svc.heroColor,
    features: svc.features.map((f) => ({
      icon: f.icon,
      title: f.title[locale],
      description: f.description[locale],
    })),
    benefits: svc.benefits.map((b) => ({
      title: b.title[locale],
      description: b.description[locale],
    })),
    technologies: svc.technologies,
    processSteps: svc.processSteps.map((p) => ({
      step: p.step,
      title: p.title[locale],
      description: p.description[locale],
    })),
    faq: svc.faq.map((q) => ({
      question: q.question[locale],
      answer: q.answer[locale],
    })),
    timeline: svc.timeline.map((t) => ({
      week: t.week[locale],
      phase: t.phase[locale],
      description: t.description[locale],
    })),
  };
}

/**
 * Convenience: lookup + flatten in one call. Most components want this.
 */
export function getFlatService(slug: string, locale: Locale): FlatService | undefined {
  const svc = getServiceBySlug(slug, locale);
  return svc ? flattenService(svc, locale) : undefined;
}

/**
 * Map an English-slug service href (e.g. `/services/cms-platforms`) to the
 * locale-specific equivalent. Used by nav/components that hold a static
 * English-slug href and need to render it for the active locale.
 *
 * If the slug isn't a known service (or the locale is en), returns the
 * input unchanged.
 */
export function localizeServiceHref(href: string, locale: Locale): string {
  if (locale === "en") return href;
  const match = href.match(/^\/services\/([^/]+)$/);
  if (!match) return href;
  const svc = getServiceById(match[1]);
  return svc ? `/services/${svc.slug[locale]}` : href;
}
