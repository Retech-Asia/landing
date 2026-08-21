import type { Metadata } from "next";
import Image from "next/image";
import {
  Search,
  PenTool,
  Code2,
  ShieldCheck,
  Rocket,
  HeadphonesIcon,
  ArrowRight,
  CheckCircle2,
  FolderKanban,
  MessageSquare,
  GitBranch,
  Paintbrush,
  Box,
  TestTube2,
  Brain,
} from "lucide-react";
import { Container as ContainerUI } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { Button } from "@/components/ui/Button";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { CompositeSectionBackground } from "@/components/ui/SectionBackground";
import { GridPattern } from "@/components/ui/GridPattern";
import { GearIcon } from "@/components/ui/AnimatedIcons";
import { SITE_URL } from "@/lib/constants";
import { BreadcrumbJsonLd, WebPageJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";
import { FAQAccordion } from "./FAQAccordion";
import { buildPageMetadata } from "@/lib/page-metadata";
import { setRequestLocale, getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({ locale, path: "/process", namespace: "pages.process" });
}

// Resolve chrome strings by locale. Long-form inline data (phases,
// toolCategories, faqData) uses the {en, vi} shape and is resolved at
// render via `lang` (below). JSON-LD stays English.
function getChrome(locale: string) {
  const isEn = locale === "en";
  return isEn
    ? {
        breadcrumbHome: "Home",
        breadcrumbProcess: "Our Process",
        heroEyebrow: "Methodology",
        heroTitle: "How We Deliver",
        heroLead: "A proven methodology refined over 50+ successful projects, from discovery to launch and beyond.",
        toolsEyebrow: "Tooling",
        toolsTitle: "Tools We Use",
        toolsDescription: "We leverage established tools across every stage of the development lifecycle to ensure quality, speed, and transparency.",
        faqEyebrow: "FAQ",
        faqTitle: "Frequently Asked Questions",
        faqDescription: "Common questions about how we work, what to expect, and how we ensure your project succeeds.",
        ctaTitle: "Ready to Start Your Project?",
        ctaBody: "Our proven process ensures your project is delivered on time, on budget, and to the highest quality standards. Let's talk about what you're building.",
        ctaPrimary: "Get Your Free Estimate",
        ctaSecondary: "View Case Studies",
        keyActivities: "Key Activities",
        deliverables: "Deliverables",
      }
    : {
        breadcrumbHome: "Trang chủ",
        breadcrumbProcess: "Quy trình Phát triển",
        heroEyebrow: "Phương pháp",
        heroTitle: "Cách chúng tôi Bàn giao",
        heroLead: "Phương pháp đã được kiểm chứng qua hơn 50 dự án thành công, từ khám phá đến ra mắt và hơn thế nữa.",
        toolsEyebrow: "Công cụ",
        toolsTitle: "Công cụ chúng tôi sử dụng",
        toolsDescription: "Chúng tôi tận dụng công cụ đã được kiểm chứng ở mọi giai đoạn vòng đời phát triển để đảm bảo chất lượng, tốc độ và minh bạch.",
        faqEyebrow: "Câu hỏi Thường gặp",
        faqTitle: "Câu hỏi Thường gặp",
        faqDescription: "Các câu hỏi thường gặp về cách chúng tôi làm việc, điều cần kỳ vọng và cách chúng tôi đảm bảo dự án thành công.",
        ctaTitle: "Sẵn sàng Bắt đầu Dự án?",
        ctaBody: "Quy trình đã được kiểm chứng đảm bảo dự án của bạn được bàn giao đúng hạn, đúng ngân sách và đạt tiêu chuẩn chất lượng cao nhất. Hãy trò chuyện về những gì bạn đang xây dựng.",
        ctaPrimary: "Nhận Báo giá Miễn phí",
        ctaSecondary: "Xem Dự án",
        keyActivities: "Hoạt động Chính",
        deliverables: "Bàn giao",
      };
}

/* ──────────────────────── Data ──────────────────────── */

const phases = [
  {
    number: 1,
    title: { en: "Discovery & Strategy", vi: "Discovery & Chiến lược" },
    timeline: { en: "Week 1-2", vi: "Tuần 1-2" },
    icon: Search,
    description: {
      en: "Every successful project starts with deep understanding. We conduct stakeholder interviews, map business processes, and analyze your competitive landscape to define a clear project scope. Our team assesses technical feasibility and identifies risks early, ensuring the roadmap is realistic and aligned with your goals. An AI opportunity assessment identifies which workflows benefit from LLM features, RAG search, or agentic automation, and which do not.",
      vi: "Mọi dự án thành công đều bắt đầu từ sự thấu hiểu sâu sắc. Chúng tôi phỏng vấn các bên liên quan, lập bản đồ quy trình nghiệp vụ và phân tích bối cảnh cạnh tranh để xác định phạm vi dự án rõ ràng. Đội ngũ đánh giá tính khả thi kỹ thuật và nhận diện rủi ro sớm, đảm bảo lộ trình thực tế và phù hợp với mục tiêu của bạn. Đánh giá cơ hội AI xác định quy trình nào hưởng lợi từ tính năng LLM, tìm kiếm RAG hay tự động hóa agentic, và quy trình nào thì không.",
    },
    activities: [
      {
        en: "Stakeholder interviews & workshops",
        vi: "Phỏng vấn & workshop với các bên liên quan",
      },
      {
        en: "Requirements gathering & documentation",
        vi: "Thu thập & tài liệu hóa yêu cầu",
      },
      {
        en: "Competitive & market analysis",
        vi: "Phân tích cạnh tranh & thị trường",
      },
      {
        en: "Technical feasibility assessment",
        vi: "Đánh giá tính khả thi kỹ thuật",
      },
      {
        en: "AI opportunity assessment: identify workflows where RAG, agents, or LLM features add value",
        vi: "Đánh giá cơ hội AI: xác định các quy trình nơi RAG, agents hay tính năng LLM tạo ra giá trị",
      },
    ],
    deliverables: [
      { en: "Project brief", vi: "Bản tóm tắt dự án" },
      { en: "Technical specification", vi: "Đặc tả kỹ thuật" },
      { en: "Timeline estimate", vi: "Ước tính tiến độ" },
    ],
  },
  {
    number: 2,
    title: { en: "Architecture & Design", vi: "Kiến trúc & Thiết kế" },
    timeline: { en: "Week 2-4", vi: "Tuần 2-4" },
    icon: PenTool,
    description: {
      en: "We design systems that scale. Our architects define the technical backbone while our designers craft intuitive interfaces that users love. From database schemas to pixel-perfect mockups, every decision is documented and validated before a single line of code is written. For AI-native features, we design the retrieval architecture, embedding strategy, and evaluation harness alongside the system architecture.",
      vi: "Chúng tôi thiết kế hệ thống có khả năng mở rộng. Kiến trúc sư xác định khung kỹ thuật trong khi đội thiết kế tạo ra giao diện trực quan mà người dùng yêu thích. Từ schema cơ sở dữ liệu đến mockup hoàn thiện từng pixel, mọi quyết định đều được tài liệu hóa và xác thực trước khi viết dòng code đầu tiên. Với các tính năng AI-native, chúng tôi thiết kế kiến trúc retrieval, chiến lược embedding và bộ đánh giá song song với kiến trúc hệ thống.",
    },
    activities: [
      { en: "System architecture design", vi: "Thiết kế kiến trúc hệ thống" },
      {
        en: "Database modeling & design",
        vi: "Mô hình hóa & thiết kế cơ sở dữ liệu",
      },
      {
        en: "UI/UX wireframes & prototyping",
        vi: "Wireframe & prototyping UI/UX",
      },
      { en: "Design system creation", vi: "Xây dựng design system" },
      {
        en: "AI feature architecture: retrieval design, embedding strategy, evaluation harness",
        vi: "Kiến trúc tính năng AI: thiết kế retrieval, chiến lược embedding, bộ đánh giá",
      },
    ],
    deliverables: [
      { en: "Architecture document", vi: "Tài liệu kiến trúc" },
      { en: "Wireframes & prototypes", vi: "Wireframe & prototype" },
      { en: "Design system", vi: "Design system" },
    ],
  },
  {
    number: 3,
    title: { en: "Development Sprints", vi: "Sprint Phát triển" },
    timeline: { en: "Week 4-12", vi: "Tuần 4-12" },
    icon: Code2,
    description: {
      en: "Development happens in focused two-week sprints with clear goals and full transparency. Daily standups keep everyone aligned, while sprint reviews give you regular visibility into progress. Continuous integration ensures every change is tested and deployable from day one. AI features follow the same rigor: evaluation suites run in CI to catch regressions in retrieval quality and LLM output.",
      vi: "Quá trình phát triển diễn ra trong các sprint hai tuần tập trung, với mục tiêu rõ ràng và minh bạch hoàn toàn. Daily standup giữ mọi người đồng bộ, trong khi sprint review giúp bạn theo dõi tiến độ thường xuyên. Tích hợp liên tục đảm bảo mọi thay đổi được kiểm thử và sẵn sàng triển khai ngay từ ngày đầu. Tính năng AI tuân theo cùng chuẩn mực: bộ đánh giá chạy trong CI để phát hiện suy giảm chất lượng retrieval và đầu ra LLM.",
    },
    activities: [
      {
        en: "Agile development in 2-week sprints",
        vi: "Phát triển agile theo sprint 2 tuần",
      },
      {
        en: "Daily standups & progress tracking",
        vi: "Daily standup & theo dõi tiến độ",
      },
      {
        en: "Sprint reviews & retrospectives",
        vi: "Sprint review & retrospective",
      },
      {
        en: "Continuous integration & delivery",
        vi: "Tích hợp & triển khai liên tục",
      },
      {
        en: "LLM evaluation harness in CI for retrieval and output quality",
        vi: "Bộ đánh giá LLM trong CI cho chất lượng retrieval và đầu ra",
      },
    ],
    deliverables: [
      {
        en: "Working software increments",
        vi: "Các bản gia tăng phần mềm hoạt động",
      },
      { en: "Sprint reports", vi: "Báo cáo sprint" },
      { en: "Updated backlog", vi: "Backlog cập nhật" },
    ],
  },
  {
    number: 4,
    title: { en: "Quality Assurance", vi: "Đảm bảo Chất lượng" },
    timeline: { en: "Ongoing", vi: "Liên tục" },
    icon: ShieldCheck,
    description: {
      en: "Quality is not an afterthought; it is woven into every phase. Our QA engineers run automated test suites, perform manual exploratory testing, and benchmark performance under load. Security audits and accessibility checks ensure your product meets the highest standards. AI features receive additional scrutiny for prompt injection, data leakage, and hallucination surfaces.",
      vi: "Chất lượng không phải việc làm thêm sau cùng; nó được đan xen vào mọi giai đoạn. Kỹ sư QA chạy bộ kiểm thử tự động, thực hiện kiểm thử thăm dò thủ công và đo hiệu năng dưới tải. Kiểm toán bảo mật và kiểm tra khả năng tiếp cận đảm bảo sản phẩm đáp ứng các tiêu chuẩn nghiêm ngặt. Tính năng AI được giám sát chặt chẽ thêm về prompt injection, rò rỉ dữ liệu và các bề mặt hallucination.",
    },
    activities: [
      {
        en: "Automated unit & integration testing",
        vi: "Kiểm thử unit & tích hợp tự động",
      },
      { en: "Manual exploratory QA", vi: "QA thăm dò thủ công" },
      { en: "Performance & load testing", vi: "Kiểm thử hiệu năng & tải" },
      {
        en: "Security auditing & accessibility compliance",
        vi: "Kiểm toán bảo mật & tuân thủ khả năng tiếp cận",
      },
      {
        en: "AI red-teaming: prompt injection, data leakage, hallucination surface testing",
        vi: "AI red-teaming: kiểm thử prompt injection, rò rỉ dữ liệu, bề mặt hallucination",
      },
    ],
    deliverables: [
      { en: "Test reports", vi: "Báo cáo kiểm thử" },
      { en: "Bug fixes & resolutions", vi: "Sửa lỗi & cách xử lý" },
      { en: "QA certification", vi: "Chứng nhận QA" },
    ],
  },
  {
    number: 5,
    title: { en: "Deployment & Launch", vi: "Triển khai & Ra mắt" },
    timeline: { en: "Week 12-14", vi: "Tuần 12-14" },
    icon: Rocket,
    description: {
      en: "We launch with confidence using staged rollouts that minimize risk. Monitoring dashboards are set up before go-live so we can respond to any issue in real time. Your team receives hands-on training and comprehensive documentation to ensure a smooth handover.",
      vi: "Chúng tôi ra mắt tự tin bằng chiến lược staged rollout giúp giảm thiểu rủi ro. Dashboard giám sát được thiết lập trước go-live để chúng tôi có thể phản hồi mọi sự cố trong thời gian thực. Đội của bạn nhận được đào tạo thực hành và tài liệu đầy đủ để đảm bảo bàn giao suôn sẻ.",
    },
    activities: [
      { en: "Staged rollout strategy", vi: "Chiến lược staged rollout" },
      { en: "Monitoring & alerting setup", vi: "Thiết lập giám sát & cảnh báo" },
      { en: "Performance optimization", vi: "Tối ưu hiệu năng" },
      { en: "Team training & documentation", vi: "Đào tạo đội ngũ & tài liệu" },
      {
        en: "LLM cost and latency monitoring dashboards",
        vi: "Dashboard giám sát chi phí và độ trễ LLM",
      },
    ],
    deliverables: [
      { en: "Production deployment", vi: "Triển khai production" },
      { en: "Monitoring dashboard", vi: "Dashboard giám sát" },
      { en: "Training materials", vi: "Tài liệu đào tạo" },
    ],
  },
  {
    number: 6,
    title: { en: "Support & Growth", vi: "Hỗ trợ & Tăng trưởng" },
    timeline: { en: "Ongoing", vi: "Liên tục" },
    icon: HeadphonesIcon,
    description: {
      en: "Launch is just the beginning. We provide ongoing maintenance, build new features, and continuously monitor performance. Our team acts as a strategic partner, helping you adapt to changing market conditions and scale your product as your business grows.",
      vi: "Ra mắt chỉ là khởi đầu. Chúng tôi cung cấp bảo trì liên tục, xây dựng tính năng mới và giám sát hiệu năng thường xuyên. Đội ngũ của chúng tôi đóng vai trò đối tác chiến lược, giúp bạn thích ứng với điều kiện thị trường thay đổi và mở rộng sản phẩm khi doanh nghiệp phát triển.",
    },
    activities: [
      { en: "Proactive maintenance & updates", vi: "Bảo trì & cập nhật chủ động" },
      { en: "New feature development", vi: "Phát triển tính năng mới" },
      {
        en: "Performance monitoring & optimization",
        vi: "Giám sát & tối ưu hiệu năng",
      },
      {
        en: "Strategic consulting & roadmap planning",
        vi: "Tư vấn chiến lược & lập kế hoạch lộ trình",
      },
      {
        en: "Ongoing evaluation of AI feature quality against production traffic",
        vi: "Đánh giá liên tục chất lượng tính năng AI trên lưu lượng production",
      },
    ],
    deliverables: [
      { en: "Monthly reports", vi: "Báo cáo hàng tháng" },
      { en: "Feature releases", vi: "Các bản phát hành tính năng" },
      { en: "Uptime SLA", vi: "SLA thời gian hoạt động" },
    ],
  },
];

const toolCategories = [
  {
    name: { en: "Project Management", vi: "Quản lý Dự án" },
    icon: FolderKanban,
    tools: ["Jira", "Linear", "Notion"],
  },
  {
    name: { en: "Communication", vi: "Giao tiếp" },
    icon: MessageSquare,
    tools: ["Slack", "Zoom", "Google Meet"],
  },
  {
    name: { en: "Development", vi: "Phát triển" },
    icon: GitBranch,
    tools: ["GitHub", "VS Code", "Cursor"],
  },
  {
    name: { en: "AI Engineering", vi: "AI Engineering" },
    icon: Brain,
    tools: ["LangChain", "pgvector", "OpenAI", "Anthropic", "Cursor"],
  },
  {
    name: { en: "Design", vi: "Thiết kế" },
    icon: Paintbrush,
    tools: ["Figma", "FigJam"],
  },
  {
    name: { en: "DevOps", vi: "DevOps" },
    icon: Box,
    tools: ["Docker", "AWS", "Vercel"],
  },
  {
    name: { en: "Testing", vi: "Kiểm thử" },
    icon: TestTube2,
    tools: ["Jest", "Playwright", "Cypress"],
  },
];

/* ──────────────────────── FAQ ──────────────────────── */

export const faqData = [
  {
    question: "How long does a typical project take from start to launch?",
    answer:
      "Timelines vary based on scope and complexity. A focused MVP or single-platform application typically takes 8 to 14 weeks. Larger enterprise systems with multiple integrations can take 4 to 6 months. During the Discovery phase we provide a detailed timeline estimate so you know exactly what to expect before development begins.",
  },
  {
    question: "How involved do I need to be during the project?",
    answer:
      "We tailor the level of client involvement to your preferences. At minimum, we need active participation during Discovery for requirements validation and at each sprint review for feedback. Some clients prefer weekly check-ins, others prefer to review at key milestones. We adapt our communication cadence to what works best for you.",
  },
  {
    question: "What happens if requirements change mid-project?",
    answer:
      "Our agile process is designed to accommodate change. Because we work in two-week sprints, scope adjustments can be absorbed into the next sprint planning cycle. Significant changes are assessed for impact on timeline and budget, and we always discuss trade-offs transparently before proceeding. A flexible backlog ensures priorities shift without derailing the project.",
  },
  {
    question: "How do you ensure code quality and security?",
    answer:
      "Quality is embedded at every stage. We enforce code reviews on all pull requests, run automated unit and integration tests in CI, and conduct manual exploratory QA. Security audits include dependency scanning, OWASP compliance checks, and penetration testing before launch. We also maintain comprehensive documentation so your team can maintain the codebase long after delivery.",
  },
  {
    question: "What kind of support do you provide after launch?",
    answer:
      "We offer flexible post-launch support agreements tailored to your needs. This can include bug fixing, performance monitoring, feature development, and strategic consulting. Our standard support includes a warranty period after go-live, and ongoing retainers are available for continuous improvement. Many of our clients choose to keep us as a long-term technology partner.",
  },
];

/* VI FAQ — rendered on /vi; JSON-LD above stays EN. */
const faqDataVi = [
  {
    question: "Một dự án điển hình kéo dài bao lâu từ khởi động đến ra mắt?",
    answer:
      "Thời gian phụ thuộc vào phạm vi và độ phức tạp. Một MVP tập trung hoặc ứng dụng đơn nền tảng thường mất 8 đến 14 tuần. Hệ thống doanh nghiệp lớn với nhiều tích hợp có thể mất 4 đến 6 tháng. Trong giai đoạn Discovery, chúng tôi cung cấp ước tính thời gian chi tiết để bạn nắm rõ trước khi phát triển bắt đầu.",
  },
  {
    question: "Tôi cần tham gia bao nhiêu trong suốt dự án?",
    answer:
      "Chúng tôi điều chỉnh mức độ tham gia của khách hàng theo sở thích của bạn. Tối thiểu, chúng tôi cần bạn tham gia tích cực trong Discovery để xác thực yêu cầu và tại mỗi sprint review để phản hồi. Một số khách hàng thích check-in hàng tuần, số khác thích xem xét tại các cột mốc chính. Chúng tôi thích ứng nhịp giao tiếp theo cách phù hợp nhất với bạn.",
  },
  {
    question: "Điều gì xảy ra nếu yêu cầu thay đổi giữa dự án?",
    answer:
      "Quy trình agile của chúng tôi được thiết kế để thích ứng với thay đổi. Vì chúng tôi làm việc theo sprint hai tuần, các điều chỉnh phạm vi có thể được hấp thụ vào chu kỳ lập kế hoạch sprint tiếp theo. Thay đổi lớn sẽ được đánh giá tác động đến tiến độ và ngân sách, và chúng tôi luôn thảo luận minh bạch về trade-off trước khi tiếp tục. Backlog linh hoạt đảm bảo ưu tiên dịch chuyển mà không làm lệch hướng dự án.",
  },
  {
    question: "Bạn đảm bảo chất lượng code và bảo mật như thế nào?",
    answer:
      "Chất lượng được cài cắm ở mọi giai đoạn. Chúng tôi áp dụng code review trên mọi pull request, chạy kiểm thử unit và tích hợp tự động trong CI, và thực hiện QA thăm dò thủ công. Kiểm toán bảo mật gồm quét dependency, kiểm tra tuân thủ OWASP và penetration testing trước ra mắt. Chúng tôi cũng duy trì tài liệu đầy đủ để đội của bạn có thể bảo trì codebase lâu dài sau khi bàn giao.",
  },
  {
    question: "Bạn cung cấp hỗ trợ gì sau khi ra mắt?",
    answer:
      "Chúng tôi cung cấp thỏa thuận hỗ trợ sau ra mắt linh hoạt theo nhu cầu của bạn: sửa lỗi, giám sát hiệu suất, phát triển tính năng và tư vấn chiến lược. Hỗ trợ tiêu chuẩn gồm giai đoạn bảo hành sau go-live, và các gói retainer liên tục sẵn có cho cải tiến không ngừng. Nhiều khách hàng chọn giữ chúng tôi làm đối tác công nghệ dài hạn.",
  },
];

/* ──────────────────────── Page ──────────────────────── */

export default async function ProcessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const chrome = getChrome(locale);
  const isVi = locale === "vi";
  const lang = isVi ? "vi" : "en";
  return (
    <>
      {/* Structured Data */}
      <WebPageJsonLd
        title={chrome.heroTitle}
        description={chrome.heroLead}
        url={`${SITE_URL}/${locale}/process`}
      />
      <FAQJsonLd questions={faqData} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `/` },
          { name: "Our Process", url: `${SITE_URL}/${locale}/process` },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <CompositeSectionBackground layers={["aurora", "grid-fade"]} grain />
        <ContainerUI className="relative">
          <div className="page-hero-enter">
            <BreadcrumbNav
              items={[
                { label: chrome.breadcrumbHome, href: "/" },
                { label: chrome.breadcrumbProcess },
              ]}
            />
          </div>
          <div className="page-hero-enter" style={{ animationDelay: "80ms" }}>
            <p className="text-sm font-medium tracking-widest uppercase text-brand mb-3 text-center">{chrome.heroEyebrow}</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance text-center mx-auto">
              {chrome.heroTitle}
            </h1>
            <p className="mt-4 text-lg text-foreground-secondary leading-relaxed max-w-3xl text-center mx-auto">
              {chrome.heroLead}
            </p>
            <div className="mt-4">
              <GearIcon size={44} />
            </div>
          </div>
        </ContainerUI>
      </section>

      {/* ── Process Phases ───────────────────────────────────── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Decorative gradient orbs */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute top-[10%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-brand/[0.03] blur-[100px] animate-mesh-4" />
          <div className="absolute top-[50%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-accent-cyan/[0.025] blur-[100px] animate-mesh-5" />
          <div className="absolute bottom-[5%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-accent-violet/[0.02] blur-[100px] animate-mesh-3" />
        </div>

        <ContainerUI>
          <div className="relative max-w-5xl mx-auto">
            {/* ── Vertical progress bar (desktop left side) ── */}
            <div
              className="absolute left-5 md:left-7 top-0 bottom-0 w-[3px] rounded-full bg-brand/[0.06] hidden lg:block overflow-hidden"
              aria-hidden="true"
            >
              {/* Animated gradient fill that extends the full height */}
              <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full bg-gradient-to-b from-brand via-accent-cyan to-accent-violet animate-progress-fill origin-top" />
              {/* Step markers */}
              <div className="absolute inset-0 flex flex-col justify-between py-1">
                {phases.map((_, i) => (
                  <AnimatedSection
                    key={i}
                    variant="scale"
                    delay={i * 0.08}
                  >
                    <div className="w-[11px] h-[11px] rounded-full border-2 border-white bg-brand -ml-[4px] relative z-10 shadow-sm" />
                  </AnimatedSection>
                ))}
              </div>
            </div>

            {/* ── Mobile vertical line ── */}
            <div
              className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-brand/20 via-accent-cyan/15 to-accent-violet/15 md:hidden"
              aria-hidden="true"
            />

            {/* ── Zigzag phase cards ── */}
            {phases.map((phase, idx) => {
              const PhaseIcon = phase.icon;
              const isEven = idx % 2 === 0;
              const desktopAlign = isEven
                ? "lg:pr-[18%]"
                : "lg:pl-[18%] lg:ml-auto";

              return (
                <div key={phase.number} className="relative">
                  {/* ── Animated connector between steps ── */}
                  {idx > 0 && (
                    <AnimatedSection
                      variant="fadeIn"
                      delay={0.05}
                      className="hidden md:flex items-center justify-center py-1"
                    >
                      <div className="flex items-center gap-0">
                        <div
                          className={`w-14 lg:w-20 h-px ${
                            isEven
                              ? "bg-gradient-to-r from-transparent to-brand/30"
                              : "bg-gradient-to-r from-brand/30 to-transparent"
                          }`}
                        />
                        <div className="w-1.5 h-1.5 rounded-full bg-brand/30 flex-shrink-0" />
                        <div
                          className={`w-14 lg:w-20 h-px ${
                            isEven
                              ? "bg-gradient-to-r from-brand/30 to-transparent"
                              : "bg-gradient-to-r from-transparent to-brand/30"
                          }`}
                        />
                      </div>
                    </AnimatedSection>
                  )}

                  {/* ── Phase card — slides in from alternating sides ── */}
                  <AnimatedSection
                    variant={isEven ? "slideRight" : "slideLeft"}
                    delay={0.06}
                    className={`relative py-6 md:py-10 ${desktopAlign}`}
                  >
                    {/* Mobile: step number circle */}
                    <div className="absolute left-[2px] top-8 md:hidden z-10">
                      <AnimatedSection variant="scale" delay={0.05}>
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand text-white font-bold text-sm shadow-[0_0_0_3px_rgba(32,133,53,0.12)] animate-step-pulse">
                          {phase.number}
                        </div>
                      </AnimatedSection>
                    </div>

                    {/* Content card */}
                    <div
                      className={`ml-14 md:ml-0 rounded-2xl border-l-4 transition-shadow duration-300 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] ${
                        isEven
                          ? "border-l-brand bg-card-bg"
                          : "border-l-accent-cyan bg-background-subtle"
                      } p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]`}
                    >
                      {/* Header row: number + icon + title + timeline */}
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        {/* Desktop step number — scale-in animation */}
                        <AnimatedSection variant="scale" delay={0.1}>
                          <div className="hidden sm:flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand text-white font-bold text-lg md:text-xl shadow-[0_0_0_4px_rgba(32,133,53,0.12)] animate-step-pulse">
                            {phase.number}
                          </div>
                        </AnimatedSection>

                        {/* Icon with bounce animation */}
                        <AnimatedSection variant="scale" delay={0.18}>
                          <div
                            className={`flex items-center justify-center w-10 h-10 rounded-xl animate-icon-bounce ${
                              isEven ? "bg-brand/10" : "bg-accent-cyan/10"
                            }`}
                          >
                            <PhaseIcon
                              size={20}
                              className={
                                isEven ? "text-brand" : "text-accent-cyan"
                              }
                            />
                          </div>
                        </AnimatedSection>

                        <h3 className="text-xl md:text-2xl font-bold text-foreground">
                          {phase.title[lang]}
                        </h3>

                        <span className="ml-auto text-xs font-medium text-foreground-secondary bg-background-muted px-3 py-1 rounded-full whitespace-nowrap">
                          {phase.timeline[lang]}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-foreground-secondary leading-relaxed mt-3 mb-6">
                        {phase.description[lang]}
                      </p>

                      {/* Activities & Deliverables */}
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                            {chrome.keyActivities}
                          </h4>
                          <ul className="space-y-2">
                            {phase.activities.map((activity) => (
                              <li
                                key={activity.en}
                                className="flex items-start gap-2 text-sm text-foreground-secondary"
                              >
                                <span
                                  className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                    isEven ? "bg-brand" : "bg-accent-cyan"
                                  }`}
                                />
                                {activity[lang]}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                            {chrome.deliverables}
                          </h4>
                          <ul className="space-y-2">
                            {phase.deliverables.map((deliverable) => (
                              <li
                                key={deliverable.en}
                                className="flex items-start gap-2 text-sm text-foreground-secondary"
                              >
                                <CheckCircle2
                                  size={16}
                                  className="text-brand flex-shrink-0 mt-0.5"
                                />
                                {deliverable[lang]}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                </div>
              );
            })}
          </div>
        </ContainerUI>
      </section>

      {/* Visual break — brainstorming/collaboration photo */}
      <div className="relative h-[180px] md:h-[260px] overflow-hidden">
        <Image
          src="/images/stock/brainstorming.webp"
          alt="Retech Solutions team brainstorming and planning"
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      </div>

      {/* ── Tools We Use ─────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 bg-background-subtle overflow-hidden">
        <ContainerUI>
          <AnimatedSection variant="slideUp">
            <SectionHeader
              label={chrome.toolsEyebrow}
              title={chrome.toolsTitle}
              description={chrome.toolsDescription}
            />
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {toolCategories.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <StaggerItem key={category.name.en}>
                  <div className="rounded-2xl bg-card-bg border border-card-border p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand/10">
                        <CategoryIcon size={20} className="text-brand" />
                      </div>
                      <h3 className="text-base font-semibold text-foreground">
                        {category.name[lang]}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.tools.map((tool) => (
                        <span
                          key={tool}
                          className="inline-block text-sm font-medium text-foreground-secondary bg-background-subtle px-3 py-1.5 rounded-lg border border-card-border"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </ContainerUI>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <ContainerUI>
          <AnimatedSection variant="slideUp">
            <SectionHeader
              label={chrome.faqEyebrow}
              title={chrome.faqTitle}
              description={chrome.faqDescription}
            />
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            <FAQAccordion items={isVi ? faqDataVi : faqData} />
          </div>
        </ContainerUI>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 bg-brand-dark overflow-hidden">
        <ContainerUI className="relative z-10">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 text-balance">
                {chrome.ctaTitle}
              </h2>
              <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
                {chrome.ctaBody}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  href="/contact"
                  size="lg"
                  className="bg-card-bg text-foreground hover:bg-card-bg"
                >
                  {chrome.ctaPrimary}
                  <ArrowRight size={18} />
                </Button>
                <Button
                  href="/case-studies"
                  variant="ghost"
                  size="lg"
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  {chrome.ctaSecondary}
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </ContainerUI>
      </section>
    </>
  );
}
