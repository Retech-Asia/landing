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
  Monitor,
  Brain,
  Compass,
  Layers,
  WifiOff,
  Bell,
  Rocket,
  HardDrive,
  RefreshCw,
  FileText,
  Bot,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/i18n/routing";
import type { GlassIconName } from "@/components/ui/GlassIcon";

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
  /** Compact lucide marker for small inline contexts (16–20px lists). */
  icon: LucideIcon;
  /** ReTech Glass kit pictogram for prominent card/hero contexts. */
  glass: GlassIconName;
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
  /** Compact lucide marker for small inline contexts (nav chips, 16px lists). */
  icon: LucideIcon;
  /** ReTech Glass kit pictogram for hero/card contexts. */
  glass: GlassIconName;
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
      en: "We design content management experiences that make publishing, organizing, and maintaining digital content easier for your team. From editorial workflows and media libraries to structured content and multi-channel delivery, we build CMS solutions around real publishing needs.",
      vi: "Chúng tôi thiết kế hệ thống quản lý nội dung giúp đội ngũ dễ dàng xuất bản, sắp xếp và cập nhật thông tin số. Từ quy trình biên tập, thư viện hình ảnh đến nội dung có cấu trúc và phân phối đa kênh, giải pháp CMS được xây dựng theo nhu cầu xuất bản thực tế.",
    },
    longDescription: {
      en: "A content platform should support the people who manage it every day. We design content models, editor interfaces, review flows, previews, and publishing integrations based on the organization's workflow. Traditional or headless architectures can be considered according to content channels, team needs, and maintenance requirements.",
      vi: "Nền tảng nội dung cần phục vụ hiệu quả những người sử dụng hằng ngày. Chúng tôi thiết kế cấu trúc nội dung, giao diện biên tập, quy trình duyệt, xem trước và tích hợp xuất bản theo cách làm việc của doanh nghiệp. Kiến trúc truyền thống hoặc headless được cân nhắc tùy theo kênh nội dung, nhu cầu đội ngũ và khả năng bảo trì.",
    },
    icon: Layout,
    glass: "database",
    gradient: "from-brand/10 to-accent-cyan/10",
    heroAccent: "from-brand to-accent-cyan",
    heroColor: "brand",
    features: [
      {
        icon: Layout,
        glass: "design",
        title: { en: "Custom Themes", vi: "Giao diện Tùy chỉnh" },
        description: {
          en: "Bespoke designs tailored to your brand identity and user expectations.",
          vi: "Thiết kế riêng phù hợp với nhận diện thương hiệu và kỳ vọng người dùng.",
        },
      },
      {
        icon: ShieldCheck,
        glass: "security",
        title: { en: "Security Hardening", vi: "Tăng cường Bảo mật" },
        description: {
          en: "Enterprise-grade security with regular updates and vulnerability scanning.",
          vi: "Bảo mật cấp doanh nghiệp với cập nhật định kỳ và quét lỗ hổng.",
        },
      },
      {
        icon: Search,
        glass: "growth",
        title: { en: "SEO Optimization", vi: "Tối ưu SEO" },
        description: {
          en: "Built-in SEO best practices for maximum search engine visibility.",
          vi: "Tích hợp sẵn các thực hành SEO tốt nhất cho khả năng hiển thị tối đa trên công cụ tìm kiếm.",
        },
      },
      {
        icon: Smartphone,
        glass: "mobile",
        title: { en: "Responsive Design", vi: "Thiết kế Responsive" },
        description: {
          en: "Pixel-perfect layouts across all devices and screen sizes.",
          vi: "Bố cục pixel-perfect trên mọi thiết bị và kích thước màn hình.",
        },
      },
      {
        icon: Workflow,
        glass: "devops",
        title: { en: "Content Workflows", vi: "Quy trình Nội dung" },
        description: {
          en: "Custom editorial workflows with role-based permissions and approval chains.",
          vi: "Quy trình biên tập tùy chỉnh với phân quyền theo vai trò và chuỗi phê duyệt.",
        },
      },
      {
        icon: Headphones,
        glass: "support",
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
      en: "We design and build custom CRM applications around the way your team actually works. From lead intake and sales pipelines to customer records, permissions, automation, and reporting, we bring important workflows together in one manageable system.",
      vi: "Chúng tôi thiết kế và phát triển ứng dụng CRM tùy chỉnh theo quy trình làm việc thực tế của doanh nghiệp. Từ tiếp nhận khách hàng tiềm năng, quản lý bán hàng đến hồ sơ khách hàng, phân quyền, tự động hóa và báo cáo, các công việc quan trọng được kết nối trong một hệ thống dễ quản lý.",
    },
    longDescription: {
      en: "A useful CRM does more than store contacts. We map the way information moves between your teams, design the right data model, and build interfaces for daily operations. Custom workflows, integrations, reporting, and role-based permissions are planned around your requirements, with AI features considered only where they offer a practical benefit.",
      vi: "Một CRM hữu ích không chỉ dùng để lưu thông tin liên hệ. Chúng tôi tìm hiểu cách dữ liệu được chia sẻ giữa các bộ phận, thiết kế mô hình dữ liệu phù hợp và xây dựng giao diện phục vụ công việc hằng ngày. Quy trình tùy chỉnh, tích hợp, báo cáo và phân quyền được thiết kế theo nhu cầu thực tế; tính năng AI chỉ được cân nhắc khi mang lại giá trị thiết thực.",
    },
    icon: Users,
    glass: "crm",
    gradient: "from-accent-cyan/10 to-accent-violet/10",
    heroAccent: "from-accent-cyan to-brand",
    heroColor: "accent-cyan",
    features: [
      {
        icon: Users,
        glass: "crm",
        title: { en: "Contact Management", vi: "Quản lý Liên hệ" },
        description: {
          en: "360-degree customer profiles with interaction history and insights.",
          vi: "Hồ sơ khách hàng 360 độ với lịch sử tương tác và insight.",
        },
      },
      {
        icon: BarChart,
        glass: "growth",
        title: { en: "Sales Pipeline", vi: "Pipeline Bán hàng" },
        description: {
          en: "Visual pipeline management with forecasting and automation.",
          vi: "Quản lý pipeline trực quan với dự báo và tự động hóa.",
        },
      },
      {
        icon: Headphones,
        glass: "support",
        title: { en: "Support Integration", vi: "Tích hợp Hỗ trợ" },
        description: {
          en: "Unified support ticketing with customer context and SLA tracking.",
          vi: "Hệ thống ticket hỗ trợ thống nhất với ngữ cảnh khách hàng và theo dõi SLA.",
        },
      },
      {
        icon: Workflow,
        glass: "devops",
        title: { en: "Workflow Automation", vi: "Tự động hóa Quy trình" },
        description: {
          en: "Automated lead nurturing, follow-ups, and task assignments.",
          vi: "Tự động nuôi dưỡng lead, follow-up và phân công nhiệm vụ.",
        },
      },
      {
        icon: BarChart3,
        glass: "analytics",
        title: { en: "Analytics Dashboard", vi: "Dashboard Phân tích" },
        description: {
          en: "Real-time reporting on sales performance and customer behavior.",
          vi: "Báo cáo thời gian thực về hiệu suất bán hàng và hành vi khách hàng.",
        },
      },
      {
        icon: ShieldCheck,
        glass: "security",
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
          en: "Role-based permissions, audit trails, and configurable data-handling controls that can support privacy and compliance requirements identified during discovery.",
          vi: "Phân quyền theo vai trò, nhật ký hoạt động và các cơ chế quản lý dữ liệu có thể cấu hình để hỗ trợ yêu cầu về quyền riêng tư và tuân thủ được xác định trong giai đoạn khảo sát.",
        },
      },
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "REST APIs", "TypeScript", "Redis", "Webhooks"],
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
          vi: "Dữ liệu khách hàng hiện có được di chuyển với loại bỏ trùng lặp và ánh xạ trường, sau đó là kiểm thử end-to-end bao gồm kiểm thử chấp nhận người dùng với đội của bạn.",
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
          en: "We design custom CRM applications and evaluate integrations with a client's existing tools. Compatibility with any particular CRM platform depends on its available APIs, permissions, and project requirements.",
          vi: "Chúng tôi thiết kế ứng dụng CRM tùy chỉnh và đánh giá khả năng tích hợp với các công cụ doanh nghiệp đang sử dụng. Việc kết nối với từng nền tảng CRM phụ thuộc vào API, quyền truy cập và yêu cầu cụ thể của dự án.",
        },
      },
      {
        question: { en: "How long does CRM development take?", vi: "Phát triển CRM mất bao lâu?" },
        answer: {
          en: "The schedule depends on workflow complexity, integrations, data migration, and approval cycles. After discovery, we propose phases and milestones tailored to the agreed scope.",
          vi: "Tiến độ phụ thuộc vào độ phức tạp của quy trình, tích hợp, di chuyển dữ liệu và các bước phê duyệt. Sau giai đoạn khảo sát, chúng tôi đề xuất các giai đoạn và mốc bàn giao phù hợp với phạm vi thống nhất.",
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
          en: "We can provide team onboarding, practical training sessions, and documentation tailored to user roles, helping staff understand the workflows introduced by the new CRM.",
          vi: "Chúng tôi có thể hỗ trợ hướng dẫn sử dụng, đào tạo thực hành và cung cấp tài liệu phù hợp với từng nhóm người dùng, giúp nhân viên nắm rõ quy trình làm việc trên CRM mới.",
        },
      },
      {
        question: { en: "What about data migration to a new CRM?", vi: "Còn về di chuyển dữ liệu sang CRM mới thì sao?" },
        answer: {
          en: "We handle complete data migration with deduplication, field mapping, relationship preservation, and validation to ensure your data transfers cleanly to the new system.",
          vi: "Chúng tôi xử lý di chuyển dữ liệu toàn diện với loại bỏ trùng lặp, ánh xạ trường, bảo toàn quan hệ và validation để đảm bảo dữ liệu của bạn chuyển sạch sang hệ thống mới.",
        },
      },
    ],
    timeline: [
      { week: { en: "Phase 1", vi: "Giai đoạn 1" }, phase: { en: "Requirements", vi: "Yêu cầu" }, description: { en: "Stakeholder interviews, workflow mapping, and CRM approach evaluation.", vi: "Phỏng vấn stakeholder, ánh xạ quy trình và đánh giá hướng tiếp cận CRM." } },
      { week: { en: "Phase 2", vi: "Giai đoạn 2" }, phase: { en: "Architecture", vi: "Kiến trúc" }, description: { en: "Data model design, integration planning, and system architecture.", vi: "Thiết kế mô hình dữ liệu, lập kế hoạch tích hợp và kiến trúc hệ thống." } },
      { week: { en: "Phase 3", vi: "Giai đoạn 3" }, phase: { en: "Build", vi: "Xây dựng" }, description: { en: "Custom development, data migration, workflow automation, and API integrations.", vi: "Phát triển tùy chỉnh, di chuyển dữ liệu, tự động hóa quy trình và tích hợp API." } },
      { week: { en: "Phase 4", vi: "Giai đoạn 4" }, phase: { en: "Deploy", vi: "Triển khai" }, description: { en: "User acceptance testing, team training, and production rollout.", vi: "Kiểm thử chấp nhận người dùng, đào tạo đội và rollout sản xuất." } },
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
      en: "We build and integrate business operations software that connects the processes behind purchasing, inventory, finance, and day-to-day management. The goal is clearer information flow, fewer repetitive steps, and tools designed around the people using them.",
      vi: "Chúng tôi phát triển và tích hợp phần mềm vận hành doanh nghiệp, kết nối các quy trình mua hàng, tồn kho, tài chính và quản lý hằng ngày. Mục tiêu là giúp dữ liệu được luân chuyển rõ ràng hơn, giảm thao tác lặp lại và xây dựng công cụ phù hợp với người sử dụng.",
    },
    longDescription: {
      en: "ERP projects require careful coordination between business processes, data, and existing systems. We help map those dependencies, design appropriate modules and integrations, and plan phased implementation. Dashboards, approval workflows, access permissions, and reporting are tailored to the agreed operational requirements.",
      vi: "Dự án ERP cần phối hợp chặt chẽ giữa quy trình kinh doanh, dữ liệu và hệ thống hiện có. Chúng tôi hỗ trợ làm rõ các mối liên hệ này, thiết kế phân hệ và tích hợp phù hợp, đồng thời lập kế hoạch triển khai theo giai đoạn. Dashboard, quy trình phê duyệt, phân quyền và báo cáo được xây dựng theo yêu cầu vận hành đã thống nhất.",
    },
    icon: BarChart3,
    glass: "analytics",
    gradient: "from-accent-violet/10 to-brand/10",
    heroAccent: "from-accent-violet to-brand",
    heroColor: "accent-violet",
    features: [
      {
        icon: BarChart3,
        glass: "analytics",
        title: { en: "Real-Time Dashboards", vi: "Dashboard Thời gian thực" },
        description: {
          en: "Live operational dashboards with customizable KPIs and alerts.",
          vi: "Dashboard vận hành trực tiếp với KPI tùy chỉnh và cảnh báo.",
        },
      },
      {
        icon: Workflow,
        glass: "devops",
        title: { en: "Process Automation", vi: "Tự động hóa Quy trình" },
        description: {
          en: "Automated workflows across departments for efficiency and accuracy.",
          vi: "Quy trình tự động hóa xuyên phòng ban cho hiệu suất và độ chính xác.",
        },
      },
      {
        icon: ShieldCheck,
        glass: "database",
        title: { en: "Data Governance", vi: "Quản trị Dữ liệu" },
        description: {
          en: "Centralized data management with audit trails and compliance.",
          vi: "Quản lý dữ liệu tập trung với audit trail và tuân thủ.",
        },
      },
      {
        icon: Users,
        glass: "scalability",
        title: { en: "Multi-Department", vi: "Đa Phòng ban" },
        description: {
          en: "Unified platform connecting finance, HR, operations, and more.",
          vi: "Nền tảng thống nhất kết nối tài chính, HR, vận hành và hơn thế nữa.",
        },
      },
      {
        icon: Globe,
        glass: "cloud",
        title: { en: "Cloud Deployment", vi: "Triển khai Cloud" },
        description: {
          en: "Scalable cloud infrastructure with high availability and DR.",
          vi: "Hạ tầng cloud khả mở với high availability và DR.",
        },
      },
      {
        icon: Smartphone,
        glass: "mobile",
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
          en: "Connect purchasing, inventory, finance, and operational workflows to reduce repetitive data entry and make handoffs easier to manage.",
          vi: "Kết nối quy trình mua hàng, tồn kho, tài chính và vận hành để giảm thao tác nhập liệu lặp lại và quản lý việc bàn giao giữa các bộ phận thuận tiện hơn.",
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
    technologies: ["Docker", "Kubernetes", "Python", "PostgreSQL", "Redis", "REST APIs", "AWS", "Nginx"],
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
          en: "We help evaluate whether an existing ERP platform should be configured, extended, integrated, or complemented by custom software. Specific platform compatibility is confirmed during technical discovery.",
          vi: "Chúng tôi hỗ trợ đánh giá nên cấu hình, mở rộng, tích hợp nền tảng ERP hiện có hay phát triển phần mềm bổ sung. Khả năng tương thích với từng nền tảng được xác nhận trong giai đoạn khảo sát kỹ thuật.",
        },
      },
      {
        question: { en: "How long does ERP implementation take?", vi: "Triển khai ERP mất bao lâu?" },
        answer: {
          en: "ERP delivery varies with the number of departments, modules, integrations, and migration requirements. We plan phased delivery around business priorities and confirm the schedule after requirements review.",
          vi: "Tiến độ ERP phụ thuộc vào số bộ phận, phân hệ, tích hợp và yêu cầu chuyển đổi dữ liệu. Chúng tôi lên kế hoạch triển khai theo giai đoạn dựa trên mức độ ưu tiên và xác nhận lịch trình sau khi rà soát yêu cầu.",
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
      { week: { en: "Phase 1", vi: "Giai đoạn 1" }, phase: { en: "Analysis", vi: "Phân tích" }, description: { en: "Business process review, department workshops, and ERP approach definition.", vi: "Đánh giá quy trình kinh doanh, workshop phòng ban và xác định hướng tiếp cận ERP." } },
      { week: { en: "Phase 2", vi: "Giai đoạn 2" }, phase: { en: "Design & Config", vi: "Thiết kế & Cấu hình" }, description: { en: "Module configuration, workflow design, and data architecture planning.", vi: "Cấu hình module, thiết kế quy trình và lập kế hoạch kiến trúc dữ liệu." } },
      { week: { en: "Phase 3", vi: "Giai đoạn 3" }, phase: { en: "Development", vi: "Phát triển" }, description: { en: "Custom module build, integrations, data migration, and user roles setup.", vi: "Xây dựng module tùy chỉnh, tích hợp, di chuyển dữ liệu và thiết lập vai trò người dùng." } },
      { week: { en: "Phase 4", vi: "Giai đoạn 4" }, phase: { en: "Go-Live", vi: "Go-Live" }, description: { en: "Pilot testing, staff training, phased rollout, and stabilization support.", vi: "Kiểm thử pilot, đào tạo nhân sự, rollout theo giai đoạn và hỗ trợ ổn định." } },
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
    glass: "frontend",
    gradient: "from-brand/10 to-accent-violet/10",
    heroAccent: "from-brand to-accent-violet",
    heroColor: "brand",
    features: [
      {
        icon: Globe,
        glass: "backend",
        title: { en: "Full-Stack Development", vi: "Phát triển Full-Stack" },
        description: {
          en: "Frontend and backend development with React, Next.js, Node.js, and more.",
          vi: "Phát triển frontend và backend với React, Next.js, Node.js và hơn thế nữa.",
        },
      },
      {
        icon: Smartphone,
        glass: "mobile",
        title: { en: "Progressive Web Apps", vi: "Progressive Web Apps" },
        description: {
          en: "App-like web experiences with offline support and push notifications.",
          vi: "Trải nghiệm web giống native với hỗ trợ offline và push notification.",
        },
      },
      {
        icon: Search,
        glass: "growth",
        title: { en: "SEO-Friendly Architecture", vi: "Kiến trúc Thân thiện SEO" },
        description: {
          en: "Server-side rendering, semantic HTML, and optimized performance.",
          vi: "Server-side rendering, HTML ngữ nghĩa và hiệu suất tối ưu.",
        },
      },
      {
        icon: ShieldCheck,
        glass: "security",
        title: { en: "Security First", vi: "Bảo mật Lên đầu" },
        description: {
          en: "OWASP-compliant development with authentication and encryption.",
          vi: "Phát triển tuân thủ OWASP với xác thực và mã hóa.",
        },
      },
      {
        icon: BarChart3,
        glass: "performance",
        title: { en: "Performance Optimization", vi: "Tối ưu Hiệu suất" },
        description: {
          en: "Core Web Vitals optimization, CDN setup, and caching strategies.",
          vi: "Tối ưu Core Web Vitals, thiết lập CDN và chiến lược caching.",
        },
      },
      {
        icon: Workflow,
        glass: "cloud",
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
    glass: "design",
    gradient: "from-accent-cyan/10 to-brand/10",
    heroAccent: "from-accent-cyan to-accent-violet",
    heroColor: "accent-cyan",
    features: [
      {
        icon: Search,
        glass: "discover",
        title: { en: "User Research", vi: "Nghiên cứu Người dùng" },
        description: {
          en: "Interviews, surveys, and analytics to understand your users deeply.",
          vi: "Phỏng vấn, khảo sát và phân tích để hiểu sâu người dùng của bạn.",
        },
      },
      {
        icon: Workflow,
        glass: "design",
        title: { en: "Wireframing", vi: "Wireframing" },
        description: {
          en: "Low and high-fidelity wireframes to validate structure and flow.",
          vi: "Wireframe low và high-fidelity để validate cấu trúc và flow.",
        },
      },
      {
        icon: Palette,
        glass: "frontend",
        title: { en: "Visual Design", vi: "Thiết kế Thị giác" },
        description: {
          en: "Pixel-perfect designs with your brand identity and design system.",
          vi: "Thiết kế pixel-perfect với nhận diện thương hiệu và design system của bạn.",
        },
      },
      {
        icon: Smartphone,
        glass: "build",
        title: { en: "Interactive Prototypes", vi: "Prototype Tương tác" },
        description: {
          en: "Clickable prototypes for stakeholder review and user testing.",
          vi: "Prototype có thể click cho đánh giá stakeholder và kiểm thử người dùng.",
        },
      },
      {
        icon: BarChart3,
        glass: "test",
        title: { en: "Usability Testing", vi: "Kiểm thử Khả năng Sử dụng" },
        description: {
          en: "Real-user testing sessions to validate and refine designs.",
          vi: "Phiên kiểm thử người dùng thực để validate và tinh chỉnh thiết kế.",
        },
      },
      {
        icon: Users,
        glass: "quality",
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
    glass: "partnership",
    gradient: "from-accent-violet/10 to-accent-cyan/10",
    heroAccent: "from-accent-violet to-accent-cyan",
    heroColor: "accent-violet",
    features: [
      {
        icon: UsersRound,
        glass: "partnership",
        title: { en: "Pre-Vetted Talent", vi: "Nhân sự Đã sàng lọc" },
        description: {
          en: "Senior engineers selected through rigorous technical assessments.",
          vi: "Kỹ sư senior được chọn thông qua đánh giá kỹ thuật khắt khe.",
        },
      },
      {
        icon: Headphones,
        glass: "support",
        title: { en: "Fully Managed", vi: "Được Quản lý Toàn diện" },
        description: {
          en: "HR, payroll, equipment, and infrastructure all handled by us.",
          vi: "HR, payroll, thiết bị và hạ tầng đều được chúng tôi xử lý.",
        },
      },
      {
        icon: Workflow,
        glass: "build",
        title: { en: "Agile Processes", vi: "Quy trình Agile" },
        description: {
          en: "Scrum/Kanban workflows with daily standups and sprint planning.",
          vi: "Quy trình Scrum/Kanban với standup hàng ngày và lập kế hoạch sprint.",
        },
      },
      {
        icon: ShieldCheck,
        glass: "security",
        title: { en: "IP Protection", vi: "Bảo vệ IP" },
        description: {
          en: "NDAs, secure infrastructure, and compliance with your policies.",
          vi: "NDA, hạ tầng an toàn và tuân thủ chính sách của bạn.",
        },
      },
      {
        icon: BarChart3,
        glass: "transparency",
        title: { en: "Transparent Reporting", vi: "Báo cáo Minh bạch" },
        description: {
          en: "Weekly reports, time tracking, and performance metrics.",
          vi: "Báo cáo hàng tuần, theo dõi thời gian và chỉ số hiệu suất.",
        },
      },
      {
        icon: Globe,
        glass: "global",
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
  {
    id: "mobile-app-development",
    slug: { en: "mobile-app-development", vi: "ung-dung-mobile" },
    title: { en: "Mobile App Development", vi: "Phát triển Ứng dụng Mobile" },
    subtitle: {
      en: "iOS and Android Applications from a Shared Codebase",
      vi: "Ứng dụng iOS và Android từ Một Codebase Chung",
    },
    description: {
      en: "We build iOS and Android applications from a shared React Native or Flutter codebase, with native modules where the hardware demands them. From booking flows to field tools, every app ships with offline-capable data layers, push notifications, deep links, and App Store and Google Play submission handled end to end: for products where the customer is on a phone, not at a desk.",
      vi: "Chúng tôi xây dựng ứng dụng iOS và Android từ một codebase React Native hoặc Flutter chung, với native module nơi phần cứng đòi hỏi. Từ luồng đặt chỗ đến công cụ ngoài hiện trường, mỗi ứng dụng đều có lớp dữ liệu hoạt động offline, push notification, deep link và việc submit App Store cùng Google Play được xử lý trọn gói: cho các sản phẩm mà khách hàng ở trên điện thoại, không phải trước bàn làm việc.",
    },
    longDescription: {
      en: "Mobile apps live on details: startup time, offline behavior, and how the app feels in one hand. We build with React Native and Flutter as the cross-platform base, so one team ships both iOS and Android, and we add native modules when a feature needs device capability the frameworks do not cover. Data layers are designed offline first and sync when the network returns, push notifications and deep links are wired from the first build, and App Store and Google Play submission is handled end to end. The result is one codebase to maintain and one team from design to release.",
      vi: "Ứng dụng mobile sống nhờ chi tiết: thời gian khởi động, hành vi offline và cảm giác cầm trên một tay. Chúng tôi xây dựng với React Native và Flutter làm nền tảng cross-platform, để một đội bàn giao cả iOS và Android, và bổ sung native module khi tính năng cần khả năng phần cứng mà framework không bao phủ. Lớp dữ liệu được thiết kế offline first và đồng bộ khi mạng trở lại, push notification cùng deep link được nối từ build đầu tiên, và việc submit App Store cùng Google Play được xử lý trọn gói. Kết quả là một codebase để bảo trì và một đội từ thiết kế đến ra mắt.",
    },
    icon: Smartphone,
    glass: "mobile",
    gradient: "from-brand/10 to-accent-cyan/10",
    heroAccent: "from-brand to-accent-cyan",
    heroColor: "brand",
    features: [
      {
        icon: Smartphone,
        glass: "build",
        title: { en: "Cross-Platform Builds", vi: "Build Cross-platform" },
        description: {
          en: "One React Native or Flutter codebase, shipped to both the App Store and Google Play.",
          vi: "Một codebase React Native hoặc Flutter, triển khai lên cả App Store và Google Play.",
        },
      },
      {
        icon: Layers,
        glass: "performance",
        title: { en: "Native Capability Where Needed", vi: "Native Capability ở nơi Cần" },
        description: {
          en: "Native modules where the hardware demands it: camera, sensors, and platform-specific features.",
          vi: "Native module nơi phần cứng đòi hỏi: camera, cảm biến và tính năng đặc thù nền tảng.",
        },
      },
      {
        icon: WifiOff,
        glass: "database",
        title: { en: "Offline-First Data", vi: "Dữ liệu Offline First" },
        description: {
          en: "Local data layers that keep the app working without a connection and sync when the network returns.",
          vi: "Lớp dữ liệu cục bộ giữ ứng dụng hoạt động khi mất kết nối và đồng bộ khi mạng trở lại.",
        },
      },
      {
        icon: Bell,
        glass: "launch",
        title: { en: "Push and Deep Linking", vi: "Push và Deep Linking" },
        description: {
          en: "Notifications and deep links wired from the first build, so campaigns and shared links land in the right screen.",
          vi: "Notification và deep link được nối từ build đầu tiên, để chiến dịch và link chia sẻ mở đúng màn hình.",
        },
      },
      {
        icon: Rocket,
        glass: "quality",
        title: { en: "Store Submission and Release Management", vi: "Submit Store và Quản lý Phát hành" },
        description: {
          en: "App Store and Google Play submission, review responses, and staged rollouts handled end to end.",
          vi: "Submit App Store và Google Play, trả lời review và rollout theo giai đoạn được xử lý trọn gói.",
        },
      },
      {
        icon: BarChart3,
        glass: "analytics",
        title: { en: "Analytics and Crash Reporting", vi: "Analytics và Crash Reporting" },
        description: {
          en: "Usage analytics and crash reporting wired from day one, so the first release is already measurable.",
          vi: "Analytics sử dụng và crash reporting được nối từ ngày đầu, để bản phát hành đầu tiên đã đo lường được.",
        },
      },
    ],
    benefits: [
      {
        title: { en: "Built for Mobile-First Customers", vi: "Dành cho Khách hàng Mobile-first" },
        description: {
          en: "For products where the customer is on a phone, not at a desk: booking flows, field tools, and service requests that work in line, in transit, and on site.",
          vi: "Cho các sản phẩm mà khách hàng ở trên điện thoại, không phải trước bàn làm việc: luồng đặt chỗ, công cụ hiện trường và yêu cầu dịch vụ hoạt động khi xếp hàng, khi di chuyển và tại công trường.",
        },
      },
      {
        title: { en: "One Codebase, Both Stores", vi: "Một Codebase, Cả hai Store" },
        description: {
          en: "A shared React Native or Flutter base cuts the cost of the second platform without giving up native capability where it matters.",
          vi: "Nền chung React Native hoặc Flutter cắt giảm chi phí nền tảng thứ hai mà không từ bỏ native capability ở nơi cần thiết.",
        },
      },
      {
        title: { en: "Store Compliance Handled", vi: "Tuân thủ Store được Xử lý" },
        description: {
          en: "Submission requirements, review guidelines, and release management for both stores stay with one team from first build to public release.",
          vi: "Yêu cầu submit, hướng dẫn review và quản lý phát hành cho cả hai store thuộc về một đội từ build đầu tiên đến phát hành công khai.",
        },
      },
      {
        title: { en: "One Team from Design to Release", vi: "Một Đội từ Thiết kế đến Ra mắt" },
        description: {
          en: "Design, build, store submission, and post-launch monitoring stay inside one team, so nothing is lost between vendors.",
          vi: "Thiết kế, xây dựng, submit store và giám sát sau ra mắt nằm trong một đội, nên không có khoảng trống giữa các bên.",
        },
      },
    ],
    technologies: ["React Native", "Flutter", "TypeScript", "iOS", "Android", "Node.js", "PostgreSQL", "REST APIs"],
    processSteps: [
      {
        step: 1,
        title: { en: "Discovery and Device Context", vi: "Khám phá và Ngữ cảnh Thiết bị" },
        description: {
          en: "We map the workflows the app must support, the devices and OS versions in play, and the backend systems it will talk to.",
          vi: "Chúng tôi ánh xạ quy trình ứng dụng cần hỗ trợ, thiết bị và phiên bản OS liên quan, cùng các hệ thống backend ứng dụng sẽ kết nối.",
        },
      },
      {
        step: 2,
        title: { en: "Mobile-First UX Flows", vi: "UX Flow Mobile First" },
        description: {
          en: "Screens are designed for thumbs and interruptions first: short flows, clear states, and offline behavior drawn before code.",
          vi: "Màn hình được thiết kế cho thao tác một tay và gián đoạn trước: flow ngắn, trạng thái rõ ràng và hành vi offline được vẽ trước khi code.",
        },
      },
      {
        step: 3,
        title: { en: "Incremental Builds on Real Devices", vi: "Build Tăng dần trên Thiết bị Thật" },
        description: {
          en: "Development runs in cycles, each ending with a build you install on real devices, not screenshots.",
          vi: "Phát triển chạy theo chu kỳ, mỗi chu kỳ kết thúc bằng một build cài lên thiết bị thật, không phải ảnh chụp màn hình.",
        },
      },
      {
        step: 4,
        title: { en: "Store Review and Acceptance", vi: "Review Store và Nghiệm thu" },
        description: {
          en: "We prepare store listings, run internal and external testing tracks, and complete acceptance against the agreed criteria.",
          vi: "Chúng tôi chuẩn bị listing store, chạy kênh kiểm thử nội bộ và bên ngoài, hoàn tất nghiệm thu theo tiêu chí đã thống nhất.",
        },
      },
      {
        step: 5,
        title: { en: "Launch with Monitoring", vi: "Ra mắt kèm Monitoring" },
        description: {
          en: "Release goes out with crash reporting and analytics live from day one, so the first week of real usage is visible.",
          vi: "Bản phát hành ra mắt với crash reporting và analytics hoạt động từ ngày đầu, để tuần đầu sử dụng thực tế được nhìn thấy.",
        },
      },
      {
        step: 6,
        title: { en: "Handover", vi: "Bàn giao" },
        description: {
          en: "Documentation, source access, and a maintenance path are handed over, or the same team stays on under a support agreement.",
          vi: "Tài liệu, quyền truy cập mã nguồn và lộ trình bảo trì được bàn giao, hoặc cùng đội tiếp tục theo thỏa thuận hỗ trợ.",
        },
      },
    ],
    faq: [
      {
        question: { en: "Native or cross-platform: which do you build?", vi: "Native hay cross-platform: các bạn xây dựng loại nào?" },
        answer: {
          en: "We default to a shared codebase with React Native or Flutter, which covers most product work on both platforms. When a feature genuinely needs native capability, camera pipelines, background tasks, or platform-specific hardware, we write that part natively and bridge it into the shared app. We do not sell native-only builds when cross-platform is the better economics.",
          vi: "Chúng tôi mặc định dùng codebase chung với React Native hoặc Flutter, bao phủ phần lớn công việc sản phẩm trên cả hai nền tảng. Khi một tính năng thực sự cần native capability, camera, background task hoặc phần cứng đặc thù nền tảng, chúng tôi viết phần đó native và nối vào ứng dụng chung. Chúng tôi không bán build native-only khi cross-platform là phương án kinh tế hơn.",
        },
      },
      {
        question: { en: "Does the app work offline?", vi: "Ứng dụng có hoạt động offline không?" },
        answer: {
          en: "Yes, where the workflow needs it. Data layers are designed offline first: the app reads and writes locally, queues changes, and syncs when the network returns. During discovery we mark which screens must survive a dead zone and acceptance covers them.",
          vi: "Có, ở những nơi quy trình cần. Lớp dữ liệu được thiết kế offline first: ứng dụng đọc ghi cục bộ, xếp hàng thay đổi và đồng bộ khi mạng trở lại. Trong giai đoạn khám phá, chúng tôi đánh dấu màn hình nào phải sống sót khi mất mạng và nghiệm thu bao phủ chúng.",
        },
      },
      {
        question: { en: "Who handles App Store and Google Play submission?", vi: "Ai xử lý việc submit App Store và Google Play?" },
        answer: {
          en: "We do, end to end: developer accounts, store listings, screenshots, review responses, and staged releases. Your team keeps ownership of the accounts, so the stores stay yours after the project ends.",
          vi: "Chúng tôi, trọn gói: tài khoản developer, listing store, ảnh chụp màn hình, trả lời review và phát hành theo giai đoạn. Đội của bạn giữ quyền sở hữu tài khoản, để store vẫn thuộc về bạn sau khi dự án kết thúc.",
        },
      },
      {
        question: { en: "What drives the cost of a mobile app?", vi: "Yếu tố nào quyết định chi phí ứng dụng mobile?" },
        answer: {
          en: "The main drivers are the platforms in scope, the device features the app must touch (camera, sensors, background work), the depth of backend integration, and how much must work offline. Discovery fixes these before an estimate is made.",
          vi: "Các yếu tố chính là số nền tảng trong phạm vi, tính năng thiết bị ứng dụng phải chạm tới (camera, cảm biến, background work), độ sâu tích hợp backend và mức độ phải hoạt động offline. Giai đoạn khám phá chốt các yếu tố này trước khi đưa ra ước tính.",
        },
      },
      {
        question: { en: "What happens after launch?", vi: "Điều gì xảy ra sau khi ra mắt?" },
        answer: {
          en: "Crash reporting and analytics are live from day one, so the first real usage is visible. After that, a support agreement covers OS updates, store requirement changes, and fixes, or your team takes over with the documentation and source we hand over.",
          vi: "Crash reporting và analytics hoạt động từ ngày đầu, nên lần sử dụng thực tế đầu tiên được nhìn thấy. Sau đó, thỏa thuận hỗ trợ bao gồm cập nhật OS, thay đổi yêu cầu store và sửa lỗi, hoặc đội của bạn tiếp nhận với tài liệu và mã nguồn chúng tôi bàn giao.",
        },
      },
    ],
    timeline: [
      { week: { en: "Week 1-2", vi: "Tuần 1-2" }, phase: { en: "Discovery", vi: "Khám phá" }, description: { en: "Workflow mapping, device and OS context, and backend integration scope.", vi: "Ánh xạ quy trình, ngữ cảnh thiết bị và OS cùng phạm vi tích hợp backend." } },
      { week: { en: "Week 2-4", vi: "Tuần 2-4" }, phase: { en: "Design", vi: "Thiết kế" }, description: { en: "Mobile-first UX flows, offline behavior, and clickable prototypes.", vi: "UX flow mobile first, hành vi offline và prototype tương tác." } },
      { week: { en: "Week 4-10", vi: "Tuần 4-10" }, phase: { en: "Development", vi: "Phát triển" }, description: { en: "Incremental builds on real devices each cycle, with backend integration.", vi: "Build tăng dần trên thiết bị thật mỗi chu kỳ, cùng tích hợp backend." } },
      { week: { en: "Week 10-12", vi: "Tuần 10-12" }, phase: { en: "Store Review", vi: "Review Store" }, description: { en: "Acceptance testing, store listings, and submission to both stores.", vi: "Kiểm thử nghiệm thu, listing store và submit lên cả hai store." } },
      { week: { en: "Week 12+", vi: "Tuần 12+" }, phase: { en: "Launch", vi: "Ra mắt" }, description: { en: "Staged rollout, monitoring, and handover or support agreement.", vi: "Rollout theo giai đoạn, monitoring và bàn giao hoặc thỏa thuận hỗ trợ." } },
    ],
  },
  {
    id: "desktop-app-development",
    slug: { en: "desktop-app-development", vi: "ung-dung-desktop" },
    title: { en: "Desktop App Development", vi: "Phát triển Ứng dụng Desktop" },
    subtitle: {
      en: "Windows and macOS Applications",
      vi: "Ứng dụng Windows và macOS",
    },
    description: {
      en: "Desktop software for operations with local hardware, large files, or offline work: packaging web-grade stacks like TypeScript, Node.js, and React into products that run where the browser tab runs out. We integrate the peripherals your workflow depends on and keep the app usable when the network is not.",
      vi: "Phần mềm desktop cho vận hành cần phần cứng cục bộ, file lớn hoặc làm việc offline: đóng gói stack cấp web như TypeScript, Node.js và React thành sản phẩm chạy nơi tab trình duyệt không đủ. Chúng tôi tích hợp thiết bị ngoại vi mà quy trình của bạn phụ thuộc và giữ ứng dụng dùng được khi mạng không có.",
    },
    longDescription: {
      en: "Some work does not fit a browser tab: scanning hardware, files measured in gigabytes, workshops and field sites without reliable connectivity. We build desktop products for that work by packaging web-grade stacks (TypeScript, Node.js, React) into installable applications, integrating local hardware and peripherals, and designing for offline-first operation. Where it makes sense, the desktop app shares code with your web product, so one team can maintain both. Distribution and updates run through a signed auto-update channel, so fixes reach every workstation without IT walking desk to desk.",
      vi: "Một số công việc không vừa một tab trình duyệt: phần cứng quét, file dung lượng lớn, xưởng và hiện trường không có kết nối ổn định. Chúng tôi xây dựng sản phẩm desktop cho các công việc đó bằng cách đóng gói stack cấp web (TypeScript, Node.js, React) thành ứng dụng cài đặt, tích hợp phần cứng và thiết bị ngoại vi cục bộ, và thiết kế cho vận hành offline first. Khi hợp lý, ứng dụng desktop dùng chung code với sản phẩm web của bạn, để một đội có thể bảo trì cả hai. Phân phối và cập nhật chạy qua kênh auto-update được ký số, để bản sửa đến mọi workstation mà IT không phải đi từng bàn.",
    },
    icon: Monitor,
    glass: "desktop",
    gradient: "from-accent-cyan/10 to-accent-violet/10",
    heroAccent: "from-accent-cyan to-accent-violet",
    heroColor: "accent-cyan",
    features: [
      {
        icon: Monitor,
        glass: "backend",
        title: { en: "Local Hardware and Peripherals", vi: "Phần cứng và Thiết bị Ngoại vi Cục bộ" },
        description: {
          en: "Integration with scanners, printers, and other devices your operation runs on, talked to directly from the app.",
          vi: "Tích hợp máy quét, máy in và các thiết bị khác mà vận hành của bạn dựa vào, kết nối trực tiếp từ ứng dụng.",
        },
      },
      {
        icon: WifiOff,
        glass: "database",
        title: { en: "Offline-First Operation", vi: "Vận hành Offline First" },
        description: {
          en: "The app keeps working when the network drops and reconciles data when it returns.",
          vi: "Ứng dụng tiếp tục hoạt động khi mạng đứt và đối soát dữ liệu khi mạng trở lại.",
        },
      },
      {
        icon: HardDrive,
        glass: "performance",
        title: { en: "Large-File Performance", vi: "Hiệu suất File Lớn" },
        description: {
          en: "Local processing for files too large or too sensitive to push through a browser round trip.",
          vi: "Xử lý cục bộ cho file quá lớn hoặc quá nhạy cảm để đẩy qua một vòng trình duyệt.",
        },
      },
      {
        icon: RefreshCw,
        glass: "cloud",
        title: { en: "Auto-Update Distribution", vi: "Phân phối Auto-Update" },
        description: {
          en: "Signed updates delivered to every workstation through a managed channel, with rollback available.",
          vi: "Bản cập nhật được ký số phân phối đến mọi workstation qua kênh được quản lý, có rollback khi cần.",
        },
      },
      {
        icon: Workflow,
        glass: "sustainability",
        title: { en: "Shared Codebase with Web", vi: "Codebase Chung với Web" },
        description: {
          en: "Where it makes sense, the desktop app shares code with your web product, so one team maintains both.",
          vi: "Khi hợp lý, ứng dụng desktop dùng chung code với sản phẩm web của bạn, để một đội bảo trì cả hai.",
        },
      },
    ],
    benefits: [
      {
        title: { en: "Fits Hardware-Bound Work", vi: "Phù hợp Công việc Gắn Phần cứng" },
        description: {
          en: "Operations with scanners, printers, or other local devices get an app that talks to them directly instead of through workarounds.",
          vi: "Vận hành với máy quét, máy in hoặc thiết bị cục bộ khác có ứng dụng kết nối trực tiếp thay vì qua các cách vòng.",
        },
      },
      {
        title: { en: "Works Without the Network", vi: "Hoạt động Không cần Mạng" },
        description: {
          en: "Offline-first design keeps the shift running through outages and syncs the record when connectivity returns.",
          vi: "Thiết kế offline first giữ ca làm việc tiếp diễn khi mất kết nối và đồng bộ dữ liệu khi mạng trở lại.",
        },
      },
      {
        title: { en: "Web-Grade Stack, Desktop Delivery", vi: "Stack cấp Web, Bàn giao Desktop" },
        description: {
          en: "The same TypeScript and React tooling as your web product means one hiring profile and one code quality bar.",
          vi: "Cùng bộ công cụ TypeScript và React với sản phẩm web của bạn nghĩa là một chuẩn tuyển dụng và một chuẩn chất lượng code.",
        },
      },
      {
        title: { en: "Updates Without Desk Visits", vi: "Cập nhật Không cần Đến từng Bàn" },
        description: {
          en: "Auto-update distribution keeps every workstation current without manual installs.",
          vi: "Phân phối auto-update giữ mọi workstation luôn ở bản mới mà không cần cài thủ công.",
        },
      },
    ],
    technologies: ["TypeScript", "Node.js", "React", "PostgreSQL", "REST APIs", "Docker"],
    processSteps: [
      {
        step: 1,
        title: { en: "Discovery and Hardware Audit", vi: "Khám phá và Kiểm kê Phần cứng" },
        description: {
          en: "We inventory the machines, peripherals, and network conditions the app must handle, alongside the workflows it serves.",
          vi: "Chúng tôi kiểm kê máy móc, thiết bị ngoại vi và điều kiện mạng ứng dụng phải xử lý, cùng các quy trình ứng dụng phục vụ.",
        },
      },
      {
        step: 2,
        title: { en: "Architecture and UX", vi: "Kiến trúc và UX" },
        description: {
          en: "The app shell, data layer, and offline strategy are designed, with acceptance criteria for offline behavior written up front.",
          vi: "App shell, lớp dữ liệu và chiến lược offline được thiết kế, với tiêu chí nghiệm thu cho hành vi offline được viết từ đầu.",
        },
      },
      {
        step: 3,
        title: { en: "Incremental Builds on Target Machines", vi: "Build Tăng dần trên Máy Đích" },
        description: {
          en: "Each cycle ends with a build installed on the actual hardware it must run on, not a clean laptop.",
          vi: "Mỗi chu kỳ kết thúc bằng một build cài lên chính phần cứng ứng dụng phải chạy trên đó, không phải laptop sạch.",
        },
      },
      {
        step: 4,
        title: { en: "Acceptance and Packaging", vi: "Nghiệm thu và Đóng gói" },
        description: {
          en: "Offline acceptance criteria are verified, installers and the auto-update channel are configured, and sign-off testing runs with your team.",
          vi: "Tiêu chí nghiệm thu offline được xác minh, installer và kênh auto-update được cấu hình, kiểm thử sign-off chạy cùng đội của bạn.",
        },
      },
      {
        step: 5,
        title: { en: "Deployment and Handover", vi: "Triển khai và Bàn giao" },
        description: {
          en: "Rollout to workstations is staged, monitoring and update telemetry are confirmed, and documentation plus a maintenance path are handed over.",
          vi: "Rollout tới workstation được thực hiện theo giai đoạn, monitoring và telemetry cập nhật được xác nhận, cùng tài liệu và lộ trình bảo trì được bàn giao.",
        },
      },
    ],
    faq: [
      {
        question: { en: "Which desktop frameworks do you use?", vi: "Các bạn sử dụng framework desktop nào?" },
        answer: {
          en: "We build desktop products on web-grade stacks: TypeScript, Node.js, and React packaged into installable applications with an auto-update channel. That keeps desktop work on the same tooling and quality bar as the web products we ship.",
          vi: "Chúng tôi xây dựng sản phẩm desktop trên stack cấp web: TypeScript, Node.js và React được đóng gói thành ứng dụng cài đặt với kênh auto-update. Điều này giữ công việc desktop trên cùng bộ công cụ và chuẩn chất lượng với các sản phẩm web chúng tôi bàn giao.",
        },
      },
      {
        question: { en: "How do updates reach user machines?", vi: "Bản cập nhật đến máy người dùng như thế nào?" },
        answer: {
          en: "Through a signed auto-update channel: the app checks for releases, downloads, and applies updates without manual installs. We can stage rollouts so a pilot group confirms a release before it reaches every workstation.",
          vi: "Qua kênh auto-update được ký số: ứng dụng kiểm tra bản phát hành, tải xuống và áp dụng cập nhật không cần cài thủ công. Chúng tôi có thể rollout theo giai đoạn để một nhóm pilot xác nhận bản phát hành trước khi tới mọi workstation.",
        },
      },
      {
        question: { en: "Can you migrate us off a legacy desktop application?", vi: "Các bạn có thể di chuyển chúng tôi khỏi ứng dụng desktop legacy không?" },
        answer: {
          en: "Yes. We start with an audit of the current application, its data formats, and the hardware it drives, then plan the migration in stages so the operation keeps running while the replacement is built.",
          vi: "Có. Chúng tôi bắt đầu với audit ứng dụng hiện tại, định dạng dữ liệu và phần cứng nó điều khiển, sau đó lập kế hoạch di chuyển theo giai đoạn để vận hành tiếp diễn trong khi phiên bản thay thế được xây dựng.",
        },
      },
      {
        question: { en: "What drives the cost of a desktop app?", vi: "Yếu tố nào quyết định chi phí ứng dụng desktop?" },
        answer: {
          en: "The same forces as any product: the number of platforms, the hardware integration surface, offline complexity, and how much is shared with your web product. The discovery phase fixes the scope before an estimate is made.",
          vi: "Cùng các yếu tố như mọi sản phẩm: số nền tảng, diện tích tích hợp phần cứng, độ phức tạp offline và mức dùng chung với sản phẩm web của bạn. Giai đoạn khám phá chốt phạm vi trước khi đưa ra ước tính.",
        },
      },
      {
        question: { en: "Do you support the app after release?", vi: "Các bạn có hỗ trợ ứng dụng sau phát hành không?" },
        answer: {
          en: "Yes, under a support agreement that covers fixes, updates for new OS versions, and hardware changes. Update telemetry shows which machines are behind before users report it.",
          vi: "Có, theo thỏa thuận hỗ trợ bao gồm sửa lỗi, cập nhật cho phiên bản OS mới và thay đổi phần cứng. Telemetry cập nhật cho thấy máy nào chưa lên bản mới trước khi người dùng báo.",
        },
      },
    ],
    timeline: [
      { week: { en: "Week 1-2", vi: "Tuần 1-2" }, phase: { en: "Discovery", vi: "Khám phá" }, description: { en: "Hardware audit, workflow mapping, and offline acceptance criteria.", vi: "Kiểm kê phần cứng, ánh xạ quy trình và tiêu chí nghiệm thu offline." } },
      { week: { en: "Week 2-4", vi: "Tuần 2-4" }, phase: { en: "Design", vi: "Thiết kế" }, description: { en: "App shell architecture, data layer, and offline strategy.", vi: "Kiến trúc app shell, lớp dữ liệu và chiến lược offline." } },
      { week: { en: "Week 4-10", vi: "Tuần 4-10" }, phase: { en: "Development", vi: "Phát triển" }, description: { en: "Incremental builds on target machines, hardware integration, and shared code with web where sensible.", vi: "Build tăng dần trên máy đích, tích hợp phần cứng và dùng chung code với web khi hợp lý." } },
      { week: { en: "Week 10-12", vi: "Tuần 10-12" }, phase: { en: "Packaging", vi: "Đóng gói" }, description: { en: "Installers, auto-update channel, and offline acceptance sign-off.", vi: "Installer, kênh auto-update và ký nghiệm thu offline." } },
      { week: { en: "Week 12+", vi: "Tuần 12+" }, phase: { en: "Rollout", vi: "Rollout" }, description: { en: "Staged deployment to workstations, monitoring, and handover.", vi: "Triển khai theo giai đoạn tới workstation, monitoring và bàn giao." } },
    ],
  },
  {
    id: "ai-development",
    slug: { en: "ai-development", vi: "phat-trien-ai" },
    title: { en: "AI Development", vi: "Phát triển AI" },
    subtitle: {
      en: "AI Features Where the Use Case Justifies Them",
      vi: "Tính năng AI ở nơi Trường hợp Sử dụng Xứng đáng",
    },
    description: {
      en: "We add AI to products when the task is measurable, the data is ready, and the operating cost is understood: document intelligence, retrieval and search, assistants, and analysis pipelines built with LangChain, pgvector, and the OpenAI and Anthropic APIs. Engineers use AI tooling in our own work too, and every shipped line is reviewed and owned by an engineer.",
      vi: "Chúng tôi bổ sung AI vào sản phẩm khi tác vụ đo lường được, dữ liệu sẵn sàng và chi phí vận hành được hiểu rõ: document intelligence, retrieval và tìm kiếm, assistant và pipeline phân tích được xây dựng với LangChain, pgvector cùng API OpenAI và Anthropic. Kỹ sư của chúng tôi cũng dùng công cụ AI trong công việc của mình, và mọi dòng code phát hành đều được kỹ sư review và chịu trách nhiệm.",
    },
    longDescription: {
      en: "Two questions decide how we work with AI. First, how we build: our engineers use AI tooling day to day, and every line that ships is reviewed and owned by an engineer, so speed never replaces accountability. Second, AI inside your product: we add it only when the task is measurable, the data is ready, and the operating cost per request is understood. Under those conditions we deliver RAG pipelines and vector search on pgvector, document intelligence, classification, retrieval, assistants, and multi-agent systems, built with LangChain and the OpenAI and Anthropic APIs. When a rules-based solution is the better answer, we say so.",
      vi: "Hai câu hỏi quyết định cách chúng tôi làm việc với AI. Thứ nhất, cách chúng tôi xây dựng: kỹ sư của chúng tôi dùng công cụ AI hằng ngày, và mọi dòng code phát hành đều được kỹ sư review và chịu trách nhiệm, để tốc độ không bao giờ thay thế trách nhiệm. Thứ hai, AI bên trong sản phẩm của bạn: chúng tôi chỉ bổ sung khi tác vụ đo lường được, dữ liệu sẵn sàng và chi phí vận hành mỗi request được hiểu rõ. Trong những điều kiện đó, chúng tôi bàn giao RAG pipeline và vector search trên pgvector, document intelligence, classification, retrieval, assistant và hệ thống multi-agent, được xây dựng với LangChain cùng API OpenAI và Anthropic. Khi giải pháp dựa trên luật là câu trả lời tốt hơn, chúng tôi nói rõ.",
    },
    icon: Brain,
    glass: "ai-solutions",
    gradient: "from-accent-violet/10 to-brand/10",
    heroAccent: "from-accent-violet to-brand",
    heroColor: "accent-violet",
    features: [
      {
        icon: FileText,
        glass: "discover",
        title: { en: "Document Intelligence", vi: "Document Intelligence" },
        description: {
          en: "Extraction, classification, and structured output from contracts, invoices, and forms.",
          vi: "Trích xuất, phân loại và đầu ra có cấu trúc từ hợp đồng, hóa đơn và biểu mẫu.",
        },
      },
      {
        icon: Search,
        glass: "database",
        title: { en: "Retrieval and Search", vi: "Retrieval và Tìm kiếm" },
        description: {
          en: "RAG pipelines with vector search on pgvector, so answers cite the source documents.",
          vi: "RAG pipeline với vector search trên pgvector, để câu trả lời trích dẫn tài liệu nguồn.",
        },
      },
      {
        icon: Bot,
        glass: "ai-solutions",
        title: { en: "Assistants and Copilots", vi: "Assistant và Copilot" },
        description: {
          en: "In-product assistants scoped to your data and workflows, with human review where the stakes require it.",
          vi: "Assistant trong sản phẩm scoped theo dữ liệu và quy trình của bạn, có human review ở nơi rủi ro đòi hỏi.",
        },
      },
      {
        icon: Workflow,
        glass: "analytics",
        title: { en: "Analysis Pipelines", vi: "Pipeline Phân tích" },
        description: {
          en: "Multi-agent and LLM pipelines that process queues of documents, tickets, or records into structured results.",
          vi: "Pipeline multi-agent và LLM xử lý hàng chờ tài liệu, ticket hoặc bản ghi thành kết quả có cấu trúc.",
        },
      },
      {
        icon: BarChart3,
        glass: "quality",
        title: { en: "Evaluation and Cost Controls", vi: "Đánh giá và Kiểm soát Chi phí" },
        description: {
          en: "Eval sets, quality gates, and per-request cost tracking, so quality and spend stay visible in production.",
          vi: "Bộ eval, quality gate và theo dõi chi phí mỗi request, để chất lượng và chi tiêu luôn thấy được trong production.",
        },
      },
    ],
    benefits: [
      {
        title: { en: "Measurable Tasks First", vi: "Ưu tiên Tác vụ Đo lường được" },
        description: {
          en: "We start where accuracy can be graded against a test set, so the feature is judged on results, not demos.",
          vi: "Chúng tôi bắt đầu ở nơi độ chính xác chấm được theo bộ test, để tính năng được đánh giá bằng kết quả, không phải demo.",
        },
      },
      {
        title: { en: "Reviewed and Owned by Engineers", vi: "Được Kỹ sư Review và Chịu trách nhiệm" },
        description: {
          en: "AI tooling accelerates the build; accountability for what ships stays with named engineers.",
          vi: "Công cụ AI tăng tốc quá trình xây dựng; trách nhiệm với sản phẩm phát hành thuộc về kỹ sư cụ thể.",
        },
      },
      {
        title: { en: "Operating Cost Understood Up Front", vi: "Chi phí Vận hành được Hiể rõ từ Đầu" },
        description: {
          en: "Per-request cost is estimated before build and tracked after launch, so the feature stays affordable at real volume.",
          vi: "Chi phí mỗi request được ước tính trước khi xây và theo dõi sau ra mắt, để tính năng vẫn hợp lý ở sản lượng thực.",
        },
      },
      {
        title: { en: "Honest Fit Assessment", vi: "Đánh giá Phù hợp Thẳng thắn" },
        description: {
          en: "When rules-based logic or a plain database query is the better answer, we recommend that instead.",
          vi: "Khi logic dựa trên luật hoặc một truy vấn cơ sở dữ liệu thường là câu trả lời tốt hơn, chúng tôi đề xuất điều đó.",
        },
      },
    ],
    technologies: ["LangChain", "pgvector", "OpenAI", "Anthropic", "Python", "TypeScript", "Node.js", "PostgreSQL"],
    processSteps: [
      {
        step: 1,
        title: { en: "Use-Case Validation", vi: "Xác thực Trường hợp Sử dụng" },
        description: {
          en: "We define the task, the measurable outcome, and the data it depends on. If the use case does not clear that bar, we say so before any build starts.",
          vi: "Chúng tôi định nghĩa tác vụ, kết quả đo lường được và dữ liệu phụ thuộc. Nếu trường hợp sử dụng không đạt chuẩn đó, chúng tôi nói rõ trước khi bất kỳ việc xây dựng nào bắt đầu.",
        },
      },
      {
        step: 2,
        title: { en: "Data Readiness Review", vi: "Rà soát Sẵn sàng Dữ liệu" },
        description: {
          en: "Sources are inventoried, access and quality are checked, and the retrieval layer (PostgreSQL with pgvector) is planned.",
          vi: "Nguồn dữ liệu được kiểm kê, quyền truy cập và chất lượng được rà soát, và lớp retrieval (PostgreSQL với pgvector) được lên kế hoạch.",
        },
      },
      {
        step: 3,
        title: { en: "Prototype and Eval Harness", vi: "Prototype và Bộ Eval" },
        description: {
          en: "A working prototype is built against a small evaluation set, so quality is graded before the system grows.",
          vi: "Một prototype chạy được được xây dựng theo bộ eval nhỏ, để chất lượng được chấm điểm trước khi hệ thống mở rộng.",
        },
      },
      {
        step: 4,
        title: { en: "Production Build", vi: "Xây dựng Production" },
        description: {
          en: "The pipeline is hardened: prompts and retrieval versioned, cost tracking wired, and human review placed where the stakes require it.",
          vi: "Pipeline được gia cố: prompt và retrieval được version, theo dõi chi phí được nối và human review đặt ở nơi rủi ro đòi hỏi.",
        },
      },
      {
        step: 5,
        title: { en: "Monitoring and Handover", vi: "Monitoring và Bàn giao" },
        description: {
          en: "Evals run continuously in production, drift and spend are reported, and prompts and pipelines are handed over as owned assets.",
          vi: "Eval chạy liên tục trong production, drift và chi tiêu được báo cáo, cùng prompt và pipeline được bàn giao như tài sản thuộc sở hữu của bạn.",
        },
      },
    ],
    faq: [
      {
        question: { en: "When does AI make sense in a product?", vi: "Khi nào AI hợp lý trong một sản phẩm?" },
        answer: {
          en: "When three things hold: the task is measurable, the data it needs is ready, and the operating cost per request is understood and acceptable. We will also tell you when a rules-based solution is the better answer, and we often do.",
          vi: "Khi ba điều đạt được: tác vụ đo lường được, dữ liệu cần thiết sẵn sàng và chi phí vận hành mỗi request được hiểu rõ và chấp nhận được. Chúng tôi cũng sẽ nói khi giải pháp dựa trên luật là câu trả lời tốt hơn, và chúng tôi thường làm vậy.",
        },
      },
      {
        question: { en: "How do you build with AI internally?", vi: "Các bạn xây dựng bằng AI nội bộ như thế nào?" },
        answer: {
          en: "Our engineers use AI tooling day to day to move faster. Every line that ships is reviewed and owned by an engineer, so the accountability on the codebase does not change.",
          vi: "Kỹ sư của chúng tôi dùng công cụ AI hằng ngày để đi nhanh hơn. Mọi dòng code phát hành đều được kỹ sư review và chịu trách nhiệm, nên trách nhiệm với codebase không thay đổi.",
        },
      },
      {
        question: { en: "Is our data ready for AI features?", vi: "Dữ liệu của chúng tôi đã sẵn sàng cho tính năng AI chưa?" },
        answer: {
          en: "We check before we promise: whether the sources exist, access is granted, and quality is good enough to grade results against. If the data is not ready, preparing it becomes the first phase of the project.",
          vi: "Chúng tôi kiểm tra trước khi hứa: nguồn có tồn tại, quyền truy cập được cấp và chất lượng đủ tốt để chấm điểm kết quả. Nếu dữ liệu chưa sẵn sàng, việc chuẩn bị dữ liệu trở thành giai đoạn đầu của dự án.",
        },
      },
      {
        question: { en: "What does it cost to run AI features in production?", vi: "Chi phí vận hành tính năng AI trong production là bao nhiêu?" },
        answer: {
          en: "LLM features carry a per-request operating cost on top of hosting. We estimate it during discovery, wire cost tracking into the build, and report spend alongside quality after launch.",
          vi: "Tính năng LLM mang chi phí vận hành mỗi request ngoài chi phí hosting. Chúng tôi ước tính trong giai đoạn khám phá, nối theo dõi chi phí vào bản build và báo cáo chi tiêu cùng chất lượng sau ra mắt.",
        },
      },
      {
        question: { en: "Who owns the prompts, pipelines, and eval sets?", vi: "Ai sở hữu prompt, pipeline và bộ eval?" },
        answer: {
          en: "You do. Prompts, retrieval code, pipelines, and eval sets are versioned in your repository and documented, so another team can take them over.",
          vi: "Bạn sở hữu. Prompt, code retrieval, pipeline và bộ eval được version trong repository của bạn và có tài liệu, để đội khác có thể tiếp nhận.",
        },
      },
    ],
    timeline: [
      { week: { en: "Week 1-2", vi: "Tuần 1-2" }, phase: { en: "Validation", vi: "Xác thực" }, description: { en: "Use-case definition, measurability check, data readiness review, and go or no-go.", vi: "Định nghĩa tác vụ, kiểm tra khả năng đo lường, rà soát sẵn sàng dữ liệu và quyết định làm hay dừng." } },
      { week: { en: "Week 2-4", vi: "Tuần 2-4" }, phase: { en: "Prototype", vi: "Prototype" }, description: { en: "Working prototype graded against a small eval set, with a first per-request cost estimate.", vi: "Prototype chạy được chấm điểm theo bộ eval nhỏ, với ước tính chi phí mỗi request đầu tiên." } },
      { week: { en: "Week 4-10", vi: "Tuần 4-10" }, phase: { en: "Build", vi: "Xây dựng" }, description: { en: "Retrieval layer, production pipeline, cost tracking, and human review points.", vi: "Lớp retrieval, pipeline production, theo dõi chi phí và các điểm human review." } },
      { week: { en: "Week 10-12", vi: "Tuần 10-12" }, phase: { en: "Harden and Hand Over", vi: "Gia cố và Bàn giao" }, description: { en: "Full eval runs, production rollout with monitoring, and ownership of prompts and pipelines.", vi: "Chạy đầy đủ bộ eval, rollout production kèm monitoring và bàn giao quyền sở hữu prompt cùng pipeline." } },
    ],
  },
  {
    id: "it-consulting",
    slug: { en: "it-consulting", vi: "tu-van-it" },
    title: { en: "IT Consulting", vi: "Tư vấn IT" },
    subtitle: {
      en: "Independent Reviews and Roadmaps",
      vi: "Đánh giá và Lộ trình Độc lập",
    },
    description: {
      en: "Independent architecture reviews, technical due diligence, and roadmap planning before you commit to a build. We deliver a written assessment, an architecture proposal, and a delivery roadmap you can act on, and the review is useful whether or not Retech builds the result.",
      vi: "Đánh giá kiến trúc độc lập, technical due diligence và lập kế hoạch lộ trình trước khi bạn cam kết một bản build. Chúng tôi bàn giao bản đánh giá bằng văn bản, đề xuất kiến trúc và lộ trình triển khai có thể hành động ngay, và bản đánh giá hữu ích dù Retech có xây dựng kết quả hay không.",
    },
    longDescription: {
      en: "Big commitments deserve an independent read first. We review the architecture, the codebase, and the team and vendor setup around them, then put the findings in writing: an assessment of what holds and what does not, an architecture proposal for the path forward, and a delivery roadmap with sequence and effort. The engagement ends with the documents, and the recommendations are not steered toward a build contract. If you take the roadmap to another team, it is written to survive that.",
      vi: "Các cam kết lớn cần một góc nhìn độc lập trước tiên. Chúng tôi đánh giá kiến trúc, codebase và cách tổ chức đội ngũ cùng vendor xung quanh, sau đó đưa kết luận thành văn bản: bản đánh giá điều gì vững và điều gì không, đề xuất kiến trúc cho hướng đi tiếp theo, và lộ trình triển khai với trình tự cùng khối lượng. Cuộc hợp tác kết thúc bằng các tài liệu, và đề xuất không bị kéo theo hướng có hợp đồng xây dựng. Nếu bạn mang lộ trình tới đội khác, nó được viết để dùng được trong trường hợp đó.",
    },
    icon: Compass,
    glass: "consulting",
    gradient: "from-brand/10 to-accent-violet/10",
    heroAccent: "from-brand to-accent-violet",
    heroColor: "brand",
    features: [
      {
        icon: Layout,
        glass: "backend",
        title: { en: "Architecture Review", vi: "Đánh giá Kiến trúc" },
        description: {
          en: "A structured read of your system: boundaries, data flows, failure modes, and the trade-offs already baked in.",
          vi: "Một góc nhìn có cấu trúc về hệ thống của bạn: ranh giới, luồng dữ liệu, chế độ lỗi và các đánh đổi đã ăn vào thiết kế.",
        },
      },
      {
        icon: ShieldCheck,
        glass: "quality",
        title: { en: "Technical Due Diligence", vi: "Technical Due Diligence" },
        description: {
          en: "Codebase, infrastructure, and process reviewed before an acquisition, investment, or platform commitment.",
          vi: "Codebase, hạ tầng và quy trình được rà soát trước khi mua bán, đầu tư hoặc cam kết nền tảng.",
        },
      },
      {
        icon: Compass,
        glass: "discover",
        title: { en: "Roadmap Planning", vi: "Lập Kế hoạch Lộ trình" },
        description: {
          en: "A sequenced delivery roadmap that separates what must come first from what can wait.",
          vi: "Lộ trình triển khai có trình tự, tách điều gì phải đi trước khỏi điều gì có thể chờ.",
        },
      },
      {
        icon: Users,
        glass: "partnership",
        title: { en: "Team and Vendor Assessment", vi: "Đánh giá Đội ngũ và Vendor" },
        description: {
          en: "An outside read on in-house capability and vendor delivery, with options for the structure you actually need.",
          vi: "Góc nhìn bên ngoài về năng lực nội bộ và cách vendor bàn giao, với các phương án cho cơ cấu bạn thực sự cần.",
        },
      },
    ],
    benefits: [
      {
        title: { en: "Decisions Before Spend", vi: "Quyết định Trước khi Chi tiêu" },
        description: {
          en: "The review happens before the build contract, so the expensive decisions are made on evidence, not momentum.",
          vi: "Đánh giá diễn ra trước hợp đồng xây dựng, để các quyết định tốn kém dựa trên bằng chứng, không phải đà vận hành.",
        },
      },
      {
        title: { en: "Findings in Writing", vi: "Kết luận Bằng Văn bản" },
        description: {
          en: "The assessment, architecture proposal, and roadmap are delivered as documents your board, bank, or acquirer can read.",
          vi: "Bản đánh giá, đề xuất kiến trúc và lộ trình được bàn giao thành tài liệu cho hội đồng, ngân hàng hoặc bên mua của bạn đọc được.",
        },
      },
      {
        title: { en: "Independent by Design", vi: "Độc lập ngay từ Thiết kế" },
        description: {
          en: "Recommendations are the same whether or not Retech builds the result, and we say when no build is needed.",
          vi: "Đề xuất giữ nguyên dù Retech có xây dựng kết quả hay không, và chúng tôi nói rõ khi không cần xây dựng gì.",
        },
      },
      {
        title: { en: "A Roadmap Any Team Can Run", vi: "Lộ trình Mọi Đội đều Chạy được" },
        description: {
          en: "The delivery roadmap is written so your in-house team or a third party can execute it without us in the room.",
          vi: "Lộ trình triển khai được viết để đội nội bộ hoặc bên thứ ba có thể thực hiện mà không cần chúng tôi ngồi cạnh.",
        },
      },
    ],
    technologies: ["TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker"],
    processSteps: [
      {
        step: 1,
        title: { en: "Context and Access", vi: "Ngữ cảnh và Quyền truy cập" },
        description: {
          en: "We interview stakeholders, get read access to the codebase and infrastructure, and agree the questions the review must answer.",
          vi: "Chúng tôi phỏng vấn stakeholder, xin quyền đọc codebase và hạ tầng, và thống nhất những câu hỏi mà bản đánh giá phải trả lời.",
        },
      },
      {
        step: 2,
        title: { en: "Assessment", vi: "Đánh giá" },
        description: {
          en: "Architecture, code, data, security posture, and delivery process are reviewed against the questions agreed up front.",
          vi: "Kiến trúc, code, dữ liệu, tư thế bảo mật và quy trình bàn giao được đánh giá theo các câu hỏi đã thống nhất từ đầu.",
        },
      },
      {
        step: 3,
        title: { en: "Written Deliverables", vi: "Tài liệu Bàn giao" },
        description: {
          en: "Findings become a written assessment, an architecture proposal, and a sequenced delivery roadmap.",
          vi: "Kết luận trở thành bản đánh giá bằng văn bản, đề xuất kiến trúc và lộ trình triển khai có trình tự.",
        },
      },
      {
        step: 4,
        title: { en: "Readout and Handover", vi: "Trình bày và Bàn giao" },
        description: {
          en: "We walk your team through the findings, answer follow-ups, and hand over documents written to stand on their own.",
          vi: "Chúng tôi trình bày kết luận với đội của bạn, trả lời các câu hỏi tiếp theo và bàn giao tài liệu được viết để tự đứng được khi không có chúng tôi giải thích.",
        },
      },
    ],
    faq: [
      {
        question: { en: "When should we bring in consultants?", vi: "Khi nào chúng tôi nên thuê tư vấn?" },
        answer: {
          en: "Before the commitment: a re-platform, a large hire plan, an acquisition, or a build whose scope nobody has independently checked. After the contract is signed is the expensive time to get a second opinion.",
          vi: "Trước cam kết: re-platform, kế hoạch tuyển dụng lớn, giao dịch mua bán hoặc một bản build mà chưa ai kiểm tra phạm vi độc lập. Sau khi ký hợp đồng mới xin ý kiến thứ hai là lúc tốn kém.",
        },
      },
      {
        question: { en: "What does a review actually deliver?", vi: "Một bản đánh giá thực sự bàn giao những gì?" },
        answer: {
          en: "Three documents: a written assessment of what holds and what does not, an architecture proposal for the path forward, and a delivery roadmap with sequence and effort. Everything is written and specific, not a deck of directions.",
          vi: "Ba tài liệu: bản đánh giá bằng văn bản về điều gì vững và điều gì không, đề xuất kiến trúc cho hướng đi, và lộ trình triển khai với trình tự cùng khối lượng. Mọi thứ được viết rõ và cụ thể, không phải bộ slide chung chung.",
        },
      },
      {
        question: { en: "Is this a one-off or ongoing?", vi: "Dịch vụ này là một lần hay liên tục?" },
        answer: {
          en: "Most engagements are one-off: context, assessment, written deliverables, readout, done. Some clients keep a lighter standing arrangement for periodic reviews at decision points, and we scope that separately.",
          vi: "Phần lớn là một lần: ngữ cảnh, đánh giá, tài liệu bàn giao, buổi trình bày, xong. Một số khách hàng giữ thỏa thuận nhẹ hơn cho các đợt review định kỳ tại các mốc quyết định, và chúng tôi định phạm vi riêng cho hình thức đó.",
        },
      },
      {
        question: { en: "Are your recommendations independent?", vi: "Các đề xuất của các bạn có độc lập không?" },
        answer: {
          en: "Yes, and that is the point of the service: the assessment is the same whether Retech builds the result or another team does. We also recommend not building when the evidence says so.",
          vi: "Có, và đó là lý do của dịch vụ này: bản đánh giá giữ nguyên dù Retech xây dựng kết quả hay đội khác thực hiện. Chúng tôi cũng đề xuất không xây dựng khi bằng chứng chỉ ra như vậy.",
        },
      },
      {
        question: { en: "Do you implement afterwards?", vi: "Sau đó các bạn có triển khai không?" },
        answer: {
          en: "When you want us to, the roadmap becomes the starting brief for a build engagement. When you take it elsewhere, the documents are written to hand over cleanly.",
          vi: "Khi bạn muốn, lộ trình trở thành bản đầu vào cho một dự án xây dựng với chúng tôi. Khi bạn mang đi nơi khác, các tài liệu được viết để bàn giao gọn gàng.",
        },
      },
    ],
    timeline: [
      { week: { en: "Week 1", vi: "Tuần 1" }, phase: { en: "Context", vi: "Ngữ cảnh" }, description: { en: "Stakeholder interviews, access to code and infrastructure, and the review questions agreed.", vi: "Phỏng vấn stakeholder, quyền truy cập code và hạ tầng, cùng các câu hỏi đánh giá được thống nhất." } },
      { week: { en: "Week 1-3", vi: "Tuần 1-3" }, phase: { en: "Assessment", vi: "Đánh giá" }, description: { en: "Architecture, code, data, security, and team or vendor review against the agreed questions.", vi: "Kiến trúc, code, dữ liệu, bảo mật và đội ngũ hoặc vendor được đánh giá theo các câu hỏi đã thống nhất." } },
      { week: { en: "Week 3-4", vi: "Tuần 3-4" }, phase: { en: "Deliverables", vi: "Tài liệu bàn giao" }, description: { en: "Written assessment, architecture proposal, and sequenced delivery roadmap.", vi: "Bản đánh giá bằng văn bản, đề xuất kiến trúc và lộ trình triển khai có trình tự." } },
      { week: { en: "Week 4", vi: "Tuần 4" }, phase: { en: "Readout", vi: "Trình bày" }, description: { en: "Findings walkthrough with your team, follow-up questions, and document handover.", vi: "Đi qua kết luận cùng đội của bạn, trả lời câu hỏi tiếp theo và bàn giao tài liệu." } },
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
  glass: GlassIconName;
  gradient: string;
  heroAccent: string;
  heroColor: string;
  features: { icon: LucideIcon; glass: GlassIconName; title: string; description: string }[];
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
    glass: svc.glass,
    gradient: svc.gradient,
    heroAccent: svc.heroAccent,
    heroColor: svc.heroColor,
    features: svc.features.map((f) => ({
      icon: f.icon,
      glass: f.glass,
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
