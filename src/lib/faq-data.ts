/**
 * Comprehensive FAQ data for the Retech Solutions FAQ page.
 *
 * Organized into six categories:
 *   General, Services, Process, Pricing, Technical, Support
 *
 * Each category has 6 questions with detailed, genuinely useful answers
 * that reflect real information about Retech's capabilities.
 *
 * Bilingual: every user-facing string carries {en, vi}. The `slug` is
 * invariant (same EN slug used for both locales' URLs) since FAQ
 * categories aren't high-value SEO keywords — translating them would
 * add complexity without meaningful upside.
 */

import { CONTACT } from "./constants";
import type { L } from "./services-data";
import type { Locale } from "@/i18n/routing";

export interface FAQItem {
  question: L;
  answer: L;
}

export interface FAQCategory {
  slug: string;
  title: L;
  description: L;
  icon: string; // lucide icon name
  items: FAQItem[];
}

export function flattenFAQItem(item: FAQItem, locale: Locale) {
  return { question: item.question[locale], answer: item.answer[locale] };
}

export function flattenFAQCategory(cat: FAQCategory, locale: Locale) {
  return {
    slug: cat.slug,
    title: cat.title[locale],
    description: cat.description[locale],
    icon: cat.icon,
    items: cat.items.map((i) => flattenFAQItem(i, locale)),
  };
}

export const faqCategories: FAQCategory[] = [
  /* ── General ─────────────────────────────────────────────────────── */
  {
    slug: "general",
    title: { en: "General", vi: "Tổng quan" },
    description: {
      en: "Common questions about working with Retech Solutions.",
      vi: "Các câu hỏi thường gặp khi làm việc với Retech Solutions.",
    },
    icon: "HelpCircle",
    items: [
      {
        question: { en: "What services does Retech Solutions offer?", vi: "Retech Solutions cung cấp những dịch vụ gì?" },
        answer: {
          en: "We offer full-cycle software development services including custom web and mobile applications, CMS platforms (WordPress, Strapi, Webflow), CRM solutions (Salesforce, HubSpot integrations), ERP systems, AI-powered products, and dedicated development team services. Our expertise spans the entire lifecycle from business analysis and UI/UX design through development, testing, and deployment.",
          vi: "Chúng tôi cung cấp dịch vụ phát triển phần mềm toàn vòng đời bao gồm ứng dụng web và di động tùy chỉnh, nền tảng CMS (WordPress, Strapi, Webflow), giải pháp CRM (tích hợp Salesforce, HubSpot), hệ thống ERP, sản phẩm tích hợp AI và dịch vụ đội ngũ phát triển chuyên trách. Chuyên môn của chúng tôi trải dài toàn bộ vòng đời từ phân tích nghiệp vụ và thiết kế UI/UX đến phát triển, kiểm thử và triển khai.",
        },
      },
      {
        question: { en: "Where is Retech Solutions located?", vi: "Retech Solutions đặt ở đâu?" },
        answer: {
          en: "We are headquartered in Ho Chi Minh City, Vietnam, at 288K8 Nam Ky Khoi Nghia, Vo Thi Sau Ward. Vietnam's strong engineering talent pool and competitive cost structure allow us to deliver high-quality solutions while offering excellent value. Our team works across time zones to serve clients in Asia, Australia, Europe, and North America.",
          vi: "Trụ sở chính của chúng tôi tại TP. Hồ Chí Minh, Việt Nam, 288K8 Nam Kỳ Khởi Nghĩa, Phường Võ Thị Sáu. nguồn kỹ sư chất lượng và chi phí cạnh tranh của Việt Nam cho phép chúng tôi bàn giao giải pháp chất lượng cao trong khi mang lại giá trị tuyệt vời. Đội ngũ của chúng tôi làm việc xuyên múi giờ phục vụ khách hàng tại Châu Á, Úc, Châu Âu và Bắc Mỹ.",
        },
      },
      {
        question: { en: "How large is your team?", vi: "Đội ngũ của các bạn đông bao nhiêu?" },
        answer: {
          en: "Our team consists of 30+ experienced engineers, designers, and project managers. We have delivered more than 50 projects across 6 countries over 5+ years. The team is structured to scale up or down based on project demands, ensuring we always have the right expertise available for your engagement.",
          vi: "Đội ngũ của chúng tôi gồm 30+ kỹ sư, designer và project manager giàu kinh nghiệm. Chúng tôi đã bàn giao hơn 50 dự án tại 6 quốc gia trong hơn 5 năm. Đội được cấu trúc để mở rộng hoặc thu hẹp theo nhu cầu dự án, đảm bảo luôn có chuyên môn phù hợp cho lần hợp tác của bạn.",
        },
      },
      {
        question: { en: "What industries do you serve?", vi: "Các bạn phục vụ những ngành nào?" },
        answer: {
          en: "We work across a range of industries including healthcare, education, e-commerce, logistics, real estate, and finance. Our adaptable approach means we invest time understanding your domain, regulations, and user expectations before writing a single line of code. This ensures every solution we deliver is tailored to your specific industry context.",
          vi: "Chúng tôi làm việc trên nhiều ngành bao gồm y tế, giáo dục, thương mại điện tử, logistics, bất động sản và tài chính. Cách tiếp cận linh hoạt của chúng tôi nghĩa là đầu tư thời gian hiểu domain, quy định và kỳ vọng người dùng của bạn trước khi viết dòng code nào. Điều này đảm bảo mọi giải pháp chúng tôi bàn giao được điều chỉnh theo bối cảnh ngành cụ thể của bạn.",
        },
      },
      {
        question: { en: "Do you work with startups or only established companies?", vi: "Các bạn làm việc với startup hay chỉ công ty lớn?" },
        answer: {
          en: "We work with both. For startups, we offer flexible engagement models that accommodate evolving requirements and tight budgets, including MVP development and rapid prototyping. For established businesses, we deliver enterprise-grade solutions with robust architecture, compliance considerations, and scalable infrastructure. Our experience spans early-stage ventures to large organizations.",
          vi: "Chúng tôi làm việc với cả hai. Với startup, chúng tôi cung cấp mô hình hợp tác linh hoạt đáp ứng yêu cầu thay đổi và ngân sách eo hẹp, bao gồm phát triển MVP và prototyping nhanh. Với doanh nghiệp lớn, chúng tôi bàn giao giải pháp cấp doanh nghiệp với kiến trúc mạnh mẽ, cân nhắc tuân thủ và hạ tầng khả mở. Kinh nghiệm của chúng tôi trải dài từ startup giai đoạn đầu đến tổ chức lớn.",
        },
      },
      {
        question: { en: "What makes Retech different from other outsourcing companies?", vi: "Điều gì làm Retech khác với công ty gia công khác?" },
        answer: {
          en: "Three things set us apart: (1) Full-cycle ownership -- we handle everything from business analysis through deployment and support, not just coding. (2) Transparent communication -- you get direct access to your project team, weekly progress reports, and real-time task tracking via Jira or Linear. (3) Quality-first culture -- our engineers are pre-vetted through rigorous technical assessments, and we maintain a 98% client satisfaction rate.",
          vi: "Ba điều làm nên sự khác biệt: (1) Sở hữu toàn vòng đời — chúng tôi xử lý mọi thứ từ phân tích nghiệp vụ đến triển khai và hỗ trợ, không chỉ code. (2) Giao tiếp minh bạch — bạn có truy cập trực tiếp đội dự án, báo cáo tiến độ hàng tuần và theo dõi nhiệm vụ thời gian thực qua Jira hoặc Linear. (3) Văn hóa chất lượng lên đầu — kỹ sư của chúng tôi được sàng lọc qua đánh giá kỹ thuật khắt khe và chúng tôi duy trì tỷ lệ hài lòng khách hàng 98%.",
        },
      },
    ],
  },

  /* ── Services ─────────────────────────────────────────────────────── */
  {
    slug: "services",
    title: { en: "Services", vi: "Dịch vụ" },
    description: {
      en: "Questions about our CMS, CRM, ERP, web, mobile, and UI/UX services.",
      vi: "Câu hỏi về dịch vụ CMS, CRM, ERP, web, mobile và UI/UX.",
    },
    icon: "Layers",
    items: [
      {
        question: { en: "What CMS platforms do you work with?", vi: "Các bạn làm việc với nền tảng CMS nào?" },
        answer: {
          en: "We work with WordPress, Drupal, Strapi, Contentful, Sanity, and custom headless CMS solutions. We recommend the best platform based on your content complexity, editorial team capabilities, and technical requirements. Our CMS services include custom theme development, plugin development, content migration, and managed hosting with security hardening.",
          vi: "Chúng tôi làm việc với WordPress, Drupal, Strapi, Contentful, Sanity và giải pháp CMS headless tùy chỉnh. Chúng tôi đề xuất nền tảng phù hợp nhất dựa trên độ phức tạp nội dung, năng lực đội biên tập và yêu cầu kỹ thuật. Dịch vụ CMS của chúng tôi bao gồm phát triển giao diện tùy chỉnh, phát triển plugin, di chuyển nội dung và hosting được quản lý với tăng cường bảo mật.",
        },
      },
      {
        question: { en: "Can you build a CRM system from scratch?", vi: "Các bạn có thể xây CRM từ đầu không?" },
        answer: {
          en: "Yes. While we integrate with existing platforms like Salesforce, HubSpot, and Zoho, we also build fully bespoke CRM systems when off-the-shelf solutions cannot accommodate unique business processes. Custom CRM development gives you complete control over data models, workflows, automation rules, and user interfaces tailored to your team.",
          vi: "Có. Trong khi chúng tôi tích hợp với nền tảng sẵn có như Salesforce, HubSpot và Zoho, chúng tôi cũng xây dựng hệ thống CRM riêng khi giải pháp có sẵn không đáp ứng được quy trình kinh doanh đặc thù. Phát triển CRM tùy chỉnh cho bạn toàn quyền kiểm soát mô hình dữ liệu, quy trình, quy tắc tự động hóa và giao diện phù hợp với đội của bạn.",
        },
      },
      {
        question: { en: "What ERP systems do you implement?", vi: "Các bạn triển khai hệ thống ERP nào?" },
        answer: {
          en: "We work with Odoo, SAP, Microsoft Dynamics, NetSuite, and custom-built ERP solutions. Our implementations follow a phased approach: business process review, platform selection and architecture, configuration and custom development, data migration and UAT, then phased rollout with training. We ensure your ERP integrates seamlessly with your existing CRM, e-commerce, and HR systems.",
          vi: "Chúng tôi làm việc với Odoo, SAP, Microsoft Dynamics, NetSuite và giải pháp ERP tự xây dựng. Việc triển khai theo cách tiếp cận theo giai đoạn: đánh giá quy trình kinh doanh, lựa chọn nền tảng và kiến trúc, cấu hình và phát triển tùy chỉnh, di chuyển dữ liệu và UAT, sau đó rollout theo giai đoạn với đào tạo. Chúng tôi đảm bảo ERP tích hợp liền mạch với CRM, e-commerce và hệ thống HR sẵn có.",
        },
      },
      {
        question: { en: "Do you offer mobile app development?", vi: "Các bạn có phát triển mobile app không?" },
        answer: {
          en: "Yes, we build cross-platform mobile applications using React Native and Flutter, as well as native iOS and Android development when required. Our mobile team handles everything from UI/UX design through App Store and Google Play deployment, including push notifications, offline support, and API integration with your backend systems.",
          vi: "Có, chúng tôi xây dựng ứng dụng di động đa nền tảng sử dụng React Native và Flutter, cũng như phát triển native iOS và Android khi cần. Đội mobile của chúng tôi xử lý mọi thứ từ thiết kế UI/UX đến triển khai App Store và Google Play, bao gồm push notification, hỗ trợ offline và tích hợp API với hệ thống backend của bạn.",
        },
      },
      {
        question: { en: "What does your UI/UX design process look like?", vi: "Quy trình thiết kế UI/UX của các bạn như thế nào?" },
        answer: {
          en: "Our design process follows five phases: (1) Discovery and user research -- interviews, surveys, competitive analysis. (2) Information architecture and wireframing. (3) Visual design and high-fidelity prototyping in Figma. (4) Usability testing with real users. (5) Design system creation and developer handoff with reusable components and documented tokens.",
          vi: "Quy trình thiết kế của chúng tôi theo 5 giai đoạn: (1) Khám phá và nghiên cứu người dùng — phỏng vấn, khảo sát, phân tích cạnh tranh. (2) Kiến trúc thông tin và wireframing. (3) Thiết kế thị giác và prototyping high-fidelity trong Figma. (4) Kiểm thử khả năng sử dụng với người dùng thực. (5) Tạo design system và bàn giao developer với component tái sử dụng và token được tài liệu hóa.",
        },
      },
      {
        question: { en: "How does the dedicated team model work?", vi: "Mô hình đội chuyên trách hoạt động như thế nào?" },
        answer: {
          en: "Our dedicated team model provides you with a fully integrated extension of your in-house team. We assemble developers, designers, and project managers based on your tech stack and project requirements. The team works exclusively on your project, follows your processes, and reports directly to you. We handle recruitment, infrastructure, and HR while you retain full control over priorities and sprint planning.",
          vi: "Mô hình đội chuyên trách của chúng tôi cung cấp cho bạn phần mở rộng hoàn toàn tích hợp của đội nội bộ. Chúng tôi tổ chức developer, designer và project manager dựa trên tech stack và yêu cầu dự án. Đội làm việc độc quyền cho dự án của bạn, tuân theo quy trình của bạn và báo cáo trực tiếp cho bạn. Chúng tôi xử lý tuyển dụng, hạ tầng và HR trong khi bạn giữ toàn quyền kiểm soát ưu tiên và lập kế hoạch sprint.",
        },
      },
    ],
  },

  /* ── Process ──────────────────────────────────────────────────────── */
  {
    slug: "process",
    title: { en: "Process", vi: "Quy trình" },
    description: {
      en: "How we plan, build, and deliver your project from start to finish.",
      vi: "Cách chúng tôi lập kế hoạch, xây dựng và bàn giao dự án từ đầu đến cuối.",
    },
    icon: "GitBranch",
    items: [
      {
        question: { en: "What is your typical project lifecycle?", vi: "Vòng đời dự án điển hình của các bạn là gì?" },
        answer: {
          en: "Every project follows a structured lifecycle: (1) Discovery -- requirements gathering, stakeholder interviews, and technical scoping. (2) Design -- wireframes, prototypes, and visual design. (3) Development -- agile sprints with regular demos. (4) Testing -- automated tests, cross-browser checks, performance audits, and security scans. (5) Deployment -- CI/CD setup, production launch, and monitoring. (6) Support -- post-launch maintenance and iterative improvements.",
          vi: "Mỗi dự án theo vòng đời có cấu trúc: (1) Khám phá — thu thập yêu cầu, phỏng vấn stakeholder và phạm vi kỹ thuật. (2) Thiết kế — wireframe, prototype và thiết kế thị giác. (3) Phát triển — sprint agile với demo định kỳ. (4) Kiểm thử — test tự động, kiểm tra cross-browser, audit hiệu suất và quét bảo mật. (5) Triển khai — thiết lập CI/CD, ra mắt production và giám sát. (6) Hỗ trợ — bảo trì sau ra mắt và cải thiện lặp lại.",
        },
      },
      {
        question: { en: "What methodology do you follow?", vi: "Các bạn áp dụng phương pháp nào?" },
        answer: {
          en: "We use agile methodologies, primarily Scrum with 2-week sprints. Each sprint includes planning, daily standups, development, and a sprint review with demo. We also support Kanban for maintenance and support engagements. The methodology is adapted to your preferences -- some clients prefer more structured waterfall approaches for fixed-scope projects, and we accommodate that too.",
          vi: "Chúng tôi áp dụng phương pháp agile, chủ yếu Scrum với sprint 2 tuần. Mỗi sprint bao gồm lập kế hoạch, standup hàng ngày, phát triển và sprint review với demo. Chúng tôi cũng hỗ trợ Kanban cho hợp tác bảo trì và hỗ trợ. Phương pháp được điều chỉnh theo sở thích của bạn — một số khách hàng thích cách tiếp cận waterfall có cấu trúc hơn cho dự án fixed-scope và chúng tôi cũng đáp ứng.",
        },
      },
      {
        question: { en: "How do we get started with a new project?", vi: "Làm sao để bắt đầu dự án mới?" },
        answer: {
          en: `The process begins with a free consultation call where we discuss your goals, requirements, and timeline. We then provide a detailed proposal including scope, technical approach, timeline, and cost estimate. Once approved, we kick off with a discovery workshop, assemble the team, and begin development within 1-2 weeks. Contact us at ${CONTACT.email} to schedule your initial call.`,
          vi: `Quy trình bắt đầu với cuộc tư vấn miễn phí nơi chúng tôi thảo luận mục tiêu, yêu cầu và timeline của bạn. Sau đó chúng tôi cung cấp đề xuất chi tiết bao gồm phạm vi, hướng tiếp cận kỹ thuật, timeline và ước tính chi phí. Khi được phê duyệt, chúng tôi khởi động với workshop khám phá, tổ chức đội và bắt đầu phát triển trong 1-2 tuần. Liên hệ ${CONTACT.email} để lên lịch gọi ban đầu.`,
        },
      },
      {
        question: { en: "How do you handle communication during a project?", vi: "Các bạn xử lý giao tiếp trong dự án như thế nào?" },
        answer: {
          en: "We use agile methodologies with regular sprint planning, daily standups, and retrospectives. Communication happens through your preferred channels -- Slack, Microsoft Teams, or Zoom. You receive weekly progress reports and have direct access to the project manager and development team. We also use tools like Jira, Linear, or Notion for transparent task tracking so you always know the status of your project.",
          vi: "Chúng tôi áp dụng phương pháp agile với lập kế hoạch sprint định kỳ, standup hàng ngày và retrospective. Giao tiếp diễn ra qua kênh bạn ưu tiên — Slack, Microsoft Teams hoặc Zoom. Bạn nhận báo cáo tiến độ hàng tuần và có quyền truy cập trực tiếp project manager và đội phát triển. Chúng tôi cũng sử dụng công cụ như Jira, Linear hoặc Notion cho theo dõi nhiệm vụ minh bạch để bạn luôn biết trạng thái dự án.",
        },
      },
      {
        question: { en: "How involved do I need to be during development?", vi: "Tôi cần tham gia bao nhiêu trong quá trình phát triển?" },
        answer: {
          en: "That depends on your preference. Some clients want daily involvement in standups and design reviews, while others prefer weekly summaries and milestone demos. We recommend participating in sprint planning and review sessions (roughly 2-4 hours per sprint) to ensure alignment. Beyond that, our project managers handle day-to-day coordination so your time investment remains manageable.",
          vi: "Tùy thuộc vào sở thích của bạn. Một số khách hàng muốn tham gia hàng ngày trong standup và review thiết kế, trong khi số khác thích tóm tắt hàng tuần và demo milestone. Chúng tôi đề nghị tham gia lập kế hoạch sprint và phiên review (khoảng 2-4 giờ mỗi sprint) để đảm bảo căn chỉnh. Ngoài ra, project manager của chúng tôi xử lý phối hợp hàng ngày để thời gian đầu tư của bạn còn kiểm soát được.",
        },
      },
      {
        question: { en: "What happens after the project launches?", vi: "Điều gì xảy ra sau khi dự án ra mắt?" },
        answer: {
          en: "We provide 30 days of complimentary post-launch support covering bug fixes and minor adjustments. Beyond that, we offer ongoing maintenance packages that include regular updates, security patches, performance monitoring, and feature development. Many clients continue with a retainer model where we allocate dedicated hours each month for continuous improvement.",
          vi: "Chúng tôi cung cấp 30 ngày hỗ trợ sau ra mắt miễn phí bao gồm sửa lỗi và điều chỉnh nhỏ. Ngoài ra, chúng tôi cung cấp gói bảo trì liên tục bao gồm cập nhật định kỳ, patch bảo mật, giám sát hiệu suất và phát triển tính năng. Nhiều khách hàng tiếp tục với mô hình retainer nơi chúng tôi phân bổ giờ chuyên trách mỗi tháng cho cải tiến liên tục.",
        },
      },
    ],
  },

  /* ── Pricing ──────────────────────────────────────────────────────── */
  {
    slug: "pricing",
    title: { en: "Pricing", vi: "Báo giá" },
    description: {
      en: "How we estimate, price, and manage project budgets.",
      vi: "Cách chúng tôi ước tính, báo giá và quản lý ngân sách dự án.",
    },
    icon: "Receipt",
    items: [
      {
        question: { en: "What pricing models do you offer?", vi: "Các bạn cung cấp mô hình giá nào?" },
        answer: {
          en: "We offer three flexible pricing models: (1) Fixed Price -- ideal for projects with well-defined scope and requirements, giving you cost certainty upfront. (2) Time and Materials -- best for evolving projects where flexibility is needed, billed hourly based on actual work. (3) Dedicated Team -- a monthly retainer for ongoing collaboration with a dedicated team. We recommend the best model based on your project scope and business objectives during our initial consultation.",
          vi: "Chúng tôi cung cấp ba mô hình giá linh hoạt: (1) Giá cố định — phù hợp cho dự án có phạm vi và yêu cầu xác định rõ, mang lại sự chắc chắn về chi phí từ đầu. (2) Thời gian & Vật tư — phù hợp nhất cho dự án đang tiến hóa cần sự linh hoạt, tính phí theo giờ dựa trên công việc thực. (3) Đội Chuyên trách — phí cố định hàng tháng cho hợp tác liên tục với đội chuyên trách. Chúng tôi đề xuất mô hình phù hợp nhất dựa trên phạm vi dự án và mục tiêu kinh doanh trong buổi tư vấn ban đầu.",
        },
      },
      {
        question: { en: "How do you estimate project costs?", vi: "Các bạn ước tính chi phí dự án như thế nào?" },
        answer: {
          en: "We estimate costs through a detailed discovery process that includes requirements analysis, technical scoping, and work breakdown. We evaluate complexity, number of features, integration requirements, and design needs to produce a comprehensive estimate. For fixed-price projects, we provide a detailed proposal. For time-and-materials engagements, we share rate cards and estimated hours per phase.",
          vi: "Chúng tôi ước tính chi phí qua quy trình khám phá chi tiết bao gồm phân tích yêu cầu, phạm vi kỹ thuật và work breakdown. Chúng tôi đánh giá độ phức tạp, số tính năng, yêu cầu tích hợp và nhu cầu thiết kế để tạo ước tính toàn diện. Với dự án fixed-price, chúng tôi cung cấp đề xuất chi tiết. Với hợp tác time-and-materials, chúng tôi chia sẻ rate card và giờ ước tính mỗi giai đoạn.",
        },
      },
      {
        question: { en: "Is there a minimum project size?", vi: "Có quy mô dự án tối thiểu không?" },
        answer: {
          en: "We do not have a strict minimum project size. We have completed focused engagements like single-feature builds, CMS migrations, and UI/UX design sprints that ran for 2-4 weeks. That said, most of our successful engagements span at least 4-6 weeks to allow for proper discovery, development, and quality assurance. We are happy to discuss projects of any size during an initial consultation.",
          vi: "Chúng tôi không có quy mô dự án tối thiểu khắt khe. Chúng tôi đã hoàn thành hợp tác tập trung như build single-feature, di chuyển CMS và sprint thiết kế UI/UX kéo dài 2-4 tuần. Tuy vậy, hầu hết hợp tác thành công kéo dài ít nhất 4-6 tuần để có thời gian khám phá, phát triển và đảm bảo chất lượng phù hợp. Chúng tôi sẵn sàng thảo luận dự án bất kỳ quy mô nào trong buổi tư vấn ban đầu.",
        },
      },
      {
        question: { en: "What is included in the project cost?", vi: "Chi phí dự án bao gồm những gì?" },
        answer: {
          en: "Our project costs cover the full development lifecycle: business analysis, UI/UX design, frontend and backend development, QA testing, deployment, and documentation. For dedicated team engagements, the monthly retainer covers salary, benefits, equipment, office infrastructure, and management overhead. We are transparent about what is included and any optional add-ons before engagement begins.",
          vi: "Chi phí dự án bao phủ toàn bộ vòng đời phát triển: phân tích nghiệp vụ, thiết kế UI/UX, phát triển frontend và backend, kiểm thử QA, triển khai và tài liệu. Với hợp tác đội chuyên trách, phí cố định hàng tháng bao phủ lương, phúc lợi, thiết bị, hạ tầng văn phòng và overhead quản lý. Chúng tôi minh bạch về những gì bao gồm và add-on tùy chọn trước khi hợp tác bắt đầu.",
        },
      },
      {
        question: { en: "How do you handle scope changes during a project?", vi: "Các bạn xử lý thay đổi phạm vi trong dự án như thế nào?" },
        answer: {
          en: "For agile (time-and-materials) projects, scope changes are handled naturally through sprint planning and backlog prioritization. For fixed-price projects, we follow a formal change request process: we assess the impact on timeline and cost, provide a revised estimate for your approval, and then implement the change. This ensures transparency and prevents unexpected budget overruns.",
          vi: "Với dự án agile (time-and-materials), thay đổi phạm vi được xử lý tự nhiên qua lập kế hoạch sprint và ưu tiên backlog. Với dự án fixed-price, chúng tôi tuân theo quy trình change request chính thức: đánh giá tác động lên timeline và chi phí, cung cấp ước tính sửa đổi để bạn phê duyệt, sau đó triển khai thay đổi. Điều này đảm bảo minh bạch và ngăn vượt ngân sách bất ngờ.",
        },
      },
      {
        question: { en: "Do you require upfront payment?", vi: "Các bạn có yêu cầu thanh toán trước không?" },
        answer: {
          en: "Typically, fixed-price projects are structured with milestone-based payments -- for example, 30% upfront, 30% at midpoint, and 40% on delivery. Dedicated team engagements are billed monthly in advance. We are flexible with payment structures and can accommodate terms that work for your organization, including net-30 invoicing for established accounts.",
          vi: "Thường thì dự án fixed-price được cấu trúc với thanh toán theo milestone — ví dụ 30% trước, 30% giữa chừng và 40% khi bàn giao. Hợp tác đội chuyên trách được thanh toán hàng tháng trước. Chúng tôi linh hoạt với cấu trúc thanh toán và có thể đáp ứng điều khoản phù hợp với tổ chức, bao gồm invoicing net-30 cho tài khoản đã thiết lập.",
        },
      },
    ],
  },

  /* ── Technical ─────────────────────────────────────────────────────── */
  {
    slug: "technical",
    title: { en: "Technical", vi: "Kỹ thuật" },
    description: {
      en: "Our technology stack, infrastructure, and engineering practices.",
      vi: "Stack công nghệ, hạ tầng và thực hành engineering của chúng tôi.",
    },
    icon: "Code2",
    items: [
      {
        question: { en: "What technologies do you specialize in?", vi: "Các bạn chuyên về công nghệ gì?" },
        answer: {
          en: "We work with a modern tech stack including React, Next.js, Vue.js, Node.js, Python, and TypeScript on the frontend and backend. For mobile, we use React Native and Flutter. Our CMS expertise covers WordPress, Strapi, and headless CMS architectures. We also have strong experience with cloud platforms (AWS, GCP, Azure), and we integrate AI/ML capabilities using frameworks like TensorFlow and OpenAI APIs.",
          vi: "Chúng tôi làm việc với tech stack hiện đại bao gồm React, Next.js, Vue.js, Node.js, Python và TypeScript ở frontend và backend. Về mobile, chúng tôi sử dụng React Native và Flutter. Chuyên môn CMS bao phủ WordPress, Strapi và kiến trúc CMS headless. Chúng tôi cũng có kinh nghiệm mạnh với nền tảng cloud (AWS, GCP, Azure) và tích hợp năng lực AI/ML sử dụng framework như TensorFlow và OpenAI APIs.",
        },
      },
      {
        question: { en: "How do you ensure code quality?", vi: "Các bạn đảm bảo chất lượng code như thế nào?" },
        answer: {
          en: "We enforce code quality through multiple layers: code reviews on every pull request, automated linting and formatting (ESLint, Prettier), unit and integration testing with Jest and Playwright, static analysis tools, and CI/CD pipelines that run tests before any code reaches production. We also follow established coding standards and maintain comprehensive documentation throughout the project.",
          vi: "Chúng tôi thực thi chất lượng code qua nhiều lớp: code review trên mỗi pull request, linting và formatting tự động (ESLint, Prettier), unit và integration test với Jest và Playwright, công cụ phân tích tĩnh và CI/CD pipeline chạy test trước khi code vào production. Chúng tôi cũng tuân thủ coding standards đã thiết lập và duy trì tài liệu toàn diện xuyên suốt dự án.",
        },
      },
      {
        question: { en: "What cloud platforms do you deploy on?", vi: "Các bạn triển khai trên nền tảng cloud nào?" },
        answer: {
          en: "We deploy on AWS, Google Cloud Platform, Microsoft Azure, Vercel, and Cloudflare, depending on your project requirements and existing infrastructure. We set up CI/CD pipelines (GitHub Actions, GitLab CI, or similar), containerization with Docker, and infrastructure-as-code using tools like Terraform. We can also deploy to your existing cloud environment if you have one.",
          vi: "Chúng tôi triển khai trên AWS, Google Cloud Platform, Microsoft Azure, Vercel và Cloudflare, tùy thuộc vào yêu cầu dự án và hạ tầng sẵn có. Chúng tôi thiết lập CI/CD pipeline (GitHub Actions, GitLab CI hoặc tương tự), containerization với Docker và infrastructure-as-code sử dụng công cụ như Terraform. Chúng tôi cũng có thể triển khai lên môi trường cloud sẵn có của bạn.",
        },
      },
      {
        question: { en: "How do you handle security?", vi: "Các bạn xử lý bảo mật như thế nào?" },
        answer: {
          en: "Security is built into every phase of development. We follow OWASP guidelines, implement authentication best practices (OAuth 2.0, JWT, multi-factor authentication), use encryption at rest and in transit (TLS 1.3), conduct regular security audits and vulnerability scans, and set up monitoring for threat detection. We also ensure compliance with regulations like GDPR where applicable.",
          vi: "Bảo mật được tích hợp vào mỗi giai đoạn phát triển. Chúng tôi tuân thủ hướng dẫn OWASP, triển khai thực hành xác thực tốt nhất (OAuth 2.0, JWT, multi-factor authentication), sử dụng mã hóa at rest và in transit (TLS 1.3), tiến hành audit bảo mật và quét lỗ hổng định kỳ, thiết lập giám sát cho phát hiện mối đe dọa. Chúng tôi cũng đảm bảo tuân thủ quy định như GDPR nơi áp dụng.",
        },
      },
      {
        question: { en: "Can you integrate AI into our product?", vi: "Các bạn có thể tích hợp AI vào sản phẩm của chúng tôi không?" },
        answer: {
          en: "Yes, we integrate AI capabilities across our solutions. This includes AI-powered content tagging and recommendations in CMS platforms, predictive analytics and intelligent automation in CRM systems, natural language processing for chatbots and support tools, and custom ML models for domain-specific use cases. We work with OpenAI APIs, TensorFlow, and other AI frameworks to deliver practical, production-ready AI features.",
          vi: "Có, chúng tôi tích hợp năng lực AI xuyên suốt giải pháp. Bao gồm tagging nội dung và gợi ý hỗ trợ AI trong nền tảng CMS, phân tích dự đoán và tự động hóa thông minh trong hệ thống CRM, xử lý ngôn ngữ tự nhiên cho chatbot và công cụ hỗ trợ, mô hình ML tùy chỉnh cho use case đặc thù domain. Chúng tôi làm việc với OpenAI APIs, TensorFlow và framework AI khác để bàn giao tính năng AI thiết thực, sẵn sàng sản xuất.",
        },
      },
      {
        question: { en: "Do you support existing codebases?", vi: "Các bạn có hỗ trợ codebase sẵn có không?" },
        answer: {
          en: "Yes, we regularly take over and modernize existing projects. We start with a thorough code audit that evaluates architecture, technical debt, test coverage, and security posture. We then document the current state, identify areas for improvement, and create a transition plan. Whether you need ongoing maintenance, feature additions, or a complete refactor, we can integrate with your existing codebase.",
          vi: "Có, chúng tôi thường xuyên tiếp nhận và hiện đại hóa dự án sẵn có. Chúng tôi bắt đầu với audit code kỹ lưỡng đánh giá kiến trúc, technical debt, độ phủ test và tình trạng bảo mật. Sau đó tài liệu hóa trạng thái hiện tại, xác định khu vực cần cải thiện và tạo kế hoạch chuyển tiếp. Dù bạn cần bảo trì liên tục, thêm tính năng hay refactor hoàn toàn, chúng tôi có thể tích hợp với codebase sẵn có của bạn.",
        },
      },
    ],
  },

  /* ── Support ──────────────────────────────────────────────────────── */
  {
    slug: "support",
    title: { en: "Support", vi: "Hỗ trợ" },
    description: {
      en: "Post-launch maintenance, SLAs, and ongoing partnership.",
      vi: "Bảo trì sau ra mắt, SLA và hợp tác liên tục.",
    },
    icon: "HeadphonesIcon",
    items: [
      {
        question: { en: "What post-launch support do you provide?", vi: "Các bạn cung cấp hỗ trợ sau ra mắt gì?" },
        answer: {
          en: "Every project includes 30 days of complimentary post-launch support covering bug fixes and minor adjustments. Beyond that, we offer structured maintenance packages that include regular updates, security patches, performance monitoring, uptime checks, and priority bug resolution. We also provide ongoing feature development through retainer agreements.",
          vi: "Mỗi dự án bao gồm 30 ngày hỗ trợ sau ra mắt miễn phí bao gồm sửa lỗi và điều chỉnh nhỏ. Ngoài ra, chúng tôi cung cấp gói bảo trì có cấu trúc bao gồm cập nhật định kỳ, patch bảo mật, giám sát hiệu suất, kiểm tra uptime và giải quyết bug ưu tiên. Chúng tôi cũng cung cấp phát triển tính năng liên tục qua hợp đồng retainer.",
        },
      },
      {
        question: { en: "What are your SLA response times?", vi: "Thời gian phản hồi SLA của các bạn là bao lâu?" },
        answer: {
          en: "Our standard SLA includes a 24-hour average response time for support requests. Critical issues (production outages, security vulnerabilities) are addressed within 4 hours. We tailor SLA terms based on your business needs, and higher-tier support agreements are available for mission-critical applications that require faster response and resolution times.",
          vi: "SLA tiêu chuẩn bao gồm thời gian phản hồi trung bình 24 giờ cho yêu cầu hỗ trợ. Vấn đề nghiêm trọng (outage production, lỗ hổng bảo mật) được xử lý trong 4 giờ. Chúng tôi điều chỉnh điều khoản SLA dựa trên nhu cầu kinh doanh và thỏa thuận hỗ trợ cấp cao hơn có sẵn cho ứng dụng mission-critical cần thời gian phản hồi và giải quyết nhanh hơn.",
        },
      },
      {
        question: { en: "Do you provide hosting and infrastructure management?", vi: "Các bạn có cung cấp hosting và quản lý hạ tầng không?" },
        answer: {
          en: "Yes, we offer managed hosting solutions that include server setup, configuration, monitoring, automated backups, SSL certificate management, CDN setup, and performance optimization. We manage infrastructure on AWS, GCP, Azure, Vercel, and Cloudflare. You can also choose to host on your own infrastructure and we will handle the deployment pipeline.",
          vi: "Có, chúng tôi cung cấp giải pháp hosting được quản lý bao gồm thiết lập server, cấu hình, giám sát, sao lưu tự động, quản lý chứng chỉ SSL, thiết lập CDN và tối ưu hiệu suất. Chúng tôi quản lý hạ tầng trên AWS, GCP, Azure, Vercel và Cloudflare. Bạn cũng có thể chọn host trên hạ tầng riêng và chúng tôi sẽ xử lý pipeline triển khai.",
        },
      },
      {
        question: { en: "How do you handle knowledge transfer?", vi: "Các bạn xử lý chuyển giao kiến thức như thế nào?" },
        answer: {
          en: "We prioritize knowledge transfer throughout the engagement. This includes comprehensive technical documentation, architecture decision records, API documentation (Swagger/OpenAPI), runbooks for operations, and video walkthroughs for complex features. For dedicated team engagements, we also offer direct knowledge transfer sessions with your in-house team.",
          vi: "Chúng tôi ưu tiên chuyển giao kiến thức xuyên suốt hợp tác. Bao gồm tài liệu kỹ thuật toàn diện, architecture decision record, tài liệu API (Swagger/OpenAPI), runbook cho vận hành và video walkthrough cho tính năng phức tạp. Với hợp tác đội chuyên trách, chúng tôi cũng cung cấp phiên chuyển giao kiến thức trực tiếp với đội nội bộ của bạn.",
        },
      },
      {
        question: { en: "Can we scale the team up or down after launch?", vi: "Chúng tôi có thể mở rộng hoặc thu hẹp đội sau ra mắt không?" },
        answer: {
          en: "Absolutely. Our engagement models are designed for flexibility. You can add developers, designers, or specialists with 2-4 weeks notice. You can also scale down or transition to a lighter maintenance model when project demands decrease. There are no long-term lock-in contracts or penalties for adjusting team size.",
          vi: "Chắc chắn. Mô hình hợp tác của chúng tôi được thiết kế cho tính linh hoạt. Bạn có thể thêm developer, designer hoặc chuyên gia với 2-4 tuần thông báo. Bạn cũng có thể thu hẹp hoặc chuyển sang mô hình bảo trì nhẹ hơn khi nhu cầu dự án giảm. Không có hợp đồng lock-in dài hạn hay penalty cho điều chỉnh quy mô đội.",
        },
      },
      {
        question: { en: "How do we report issues or request new features?", vi: "Làm sao để báo cáo vấn đề hoặc yêu cầu tính năng mới?" },
        answer: {
          en: "We set up a shared project management board (Jira, Linear, or Notion) where you can log issues and feature requests directly. Each item is triaged, prioritized, and scheduled into upcoming sprints. For urgent issues, you can reach your project manager directly via Slack or email. We maintain a transparent process so you can track the status of every request in real time.",
          vi: "Chúng tôi thiết lập board quản lý dự án dùng chung (Jira, Linear hoặc Notion) nơi bạn có thể log vấn đề và yêu cầu tính năng trực tiếp. Mỗi item được triage, ưu tiên và lên lịch vào sprint sắp tới. Với vấn đề khẩn cấp, bạn có thể liên hệ project manager trực tiếp qua Slack hoặc email. Chúng tôi duy trì quy trình minh bạch để bạn theo dõi trạng thái mỗi yêu cầu thời gian thực.",
        },
      },
    ],
  },
];

/**
 * Flat list of all FAQ items across all categories -- used for JSON-LD.
 * Returns raw (bilingual) items. Consumers must call flattenFAQItem with
 * the active locale.
 */
export const allFAQs: FAQItem[] = faqCategories.flatMap((cat) => cat.items);
