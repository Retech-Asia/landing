import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { GlassIcon, type GlassIconName } from "@/components/ui/GlassIcon";
import { Container as ContainerUI } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { Button } from "@/components/ui/Button";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { CompositeSectionBackground } from "@/components/ui/SectionBackground";
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
  return buildPageMetadata({ locale, path: "/process", namespace: "pages.process", viReady: true });
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
        heroLead: "What working with Retech is like, from the first conversation to long after launch: four stages, no black boxes, and decisions you are part of.",
        toolsEyebrow: "Tooling",
        toolsTitle: "Tools We Use",
        toolsDescription: "We leverage established tools across every stage of the development lifecycle to ensure quality, speed, and transparency.",
        faqEyebrow: "FAQ",
        faqTitle: "Frequently Asked Questions",
        faqDescription: "Common questions about how we work, what to expect, and how we ensure your project succeeds.",
        ctaTitle: "Ready to Start Your Project?",
        ctaBody: "Tell us what you are building and we will map out the scope, team, and timeline, with a free estimate.",
        ctaPrimary: "Discuss Your Project",
        ctaSecondary: "View Case Studies",
        keyActivities: "What you will see",
      }
    : {
        breadcrumbHome: "Trang chủ",
        breadcrumbProcess: "Quy trình Phát triển",
        heroEyebrow: "Phương pháp",
        heroTitle: "Cách chúng tôi Bàn giao",
        heroLead: "Làm việc với Retech là như thế nào, từ cuộc trò chuyện đầu tiên đến lâu sau khi ra mắt: bốn giai đoạn, không hộp đen, và những quyết định bạn đồng hành.",
        toolsEyebrow: "Công cụ",
        toolsTitle: "Công cụ chúng tôi sử dụng",
        toolsDescription: "Chúng tôi tận dụng công cụ đã được kiểm chứng ở mọi giai đoạn vòng đời phát triển để đảm bảo chất lượng, tốc độ và minh bạch.",
        faqEyebrow: "Câu hỏi Thường gặp",
        faqTitle: "Câu hỏi Thường gặp",
        faqDescription: "Các câu hỏi thường gặp về cách chúng tôi làm việc, điều cần kỳ vọng và cách chúng tôi đảm bảo dự án thành công.",
        ctaTitle: "Sẵn sàng Bắt đầu Dự án?",
        ctaBody: "Chia sẻ những gì bạn đang xây dựng, chúng tôi sẽ đề xuất phạm vi, đội ngũ và lộ trình, kèm báo giá miễn phí.",
        ctaPrimary: "Trao đổi về dự án",
        ctaSecondary: "Xem Dự án",
        keyActivities: "Bạn sẽ thấy gì",
      };
}

/* ──────────────────────── Data ──────────────────────── */

/**
 * Editorial groups (owner corrections directive 2026-10-22: no timeline, no
 * week ranges, no numbered progress rail; client-experience voice). Four
 * groups describe what working with Retech is like, in the order a client
 * lives it. Copy states only what we actually do; no counts, no guarantees.
 */
const groups = [
  {
    numeral: "01",
    title: {
      en: "Start with understanding",
      vi: "Bắt đầu từ sự thấu hiểu",
    },
    paragraphs: [
      {
        en: "Before anything is built, we invest in understanding the business you run. Stakeholder interviews, process mapping, and market analysis shape a scope both sides can point to. Technical feasibility is assessed early, risks are named while they are still cheap to fix, and an AI opportunity assessment identifies which workflows genuinely benefit from LLM features or retrieval search, and which do not.",
        vi: "Trước khi bất cứ thứ gì được xây dựng, chúng tôi đầu tư để hiểu ngành kinh doanh của bạn. Phỏng vấn các bên liên quan, lập bản đồ quy trình và phân tích thị trường tạo thành một phạm vi mà hai bên cùng hướng tới. Tính khả thi kỹ thuật được đánh giá sớm, rủi ro được gọi tên khi còn sửa rẻ, và đánh giá cơ hội AI chỉ ra quy trình nào thực sự hưởng lợi từ tính năng LLM hay tìm kiếm retrieval, quy trình nào thì không.",
      },
      {
        en: "You leave this stage with a project brief, a technical specification, and a timeline estimate, so you know what was agreed before development begins.",
        vi: "Kết thúc giai đoạn này, bạn có bản tóm tắt dự án, đặc tả kỹ thuật và ước tính tiến độ, để mọi thứ đã thống nhất được ghi rõ trước khi phát triển bắt đầu.",
      },
    ],
    points: [
      { en: "Stakeholder interviews and workshops", vi: "Phỏng vấn và workshop với các bên liên quan" },
      { en: "Requirements gathered and documented", vi: "Yêu cầu được thu thập và tài liệu hóa" },
      { en: "Technical feasibility and risk assessment", vi: "Đánh giá tính khả thi kỹ thuật và rủi ro" },
      { en: "AI opportunity assessment where it applies", vi: "Đánh giá cơ hội AI ở nơi phù hợp" },
    ],
  },
  {
    numeral: "02",
    title: {
      en: "Decisions made together, before code",
      vi: "Quyết định cùng nhau, trước khi viết code",
    },
    paragraphs: [
      {
        en: "Architecture and design are decided on paper first. Database schemas, system diagrams, wireframes, and prototypes are documented and reviewed with you, so the expensive decisions are made while they are still inexpensive to change. For AI-native features, the retrieval architecture, embedding strategy, and evaluation harness are designed alongside the system itself.",
        vi: "Kiến trúc và thiết kế được chốt trên giấy trước. Schema cơ sở dữ liệu, sơ đồ hệ thống, wireframe và prototype được tài liệu hóa và xem xét cùng bạn, để những quyết định tốn kém được đưa ra khi còn rẻ để thay đổi. Với các tính năng AI-native, kiến trúc retrieval, chiến lược embedding và bộ đánh giá được thiết kế song song với hệ thống.",
      },
    ],
    points: [
      { en: "System architecture and database modeling", vi: "Kiến trúc hệ thống và mô hình hóa cơ sở dữ liệu" },
      { en: "Wireframes and clickable prototypes", vi: "Wireframe và prototype có thể bấm thử" },
      { en: "A design system for consistent UI", vi: "Design system cho giao diện nhất quán" },
      { en: "AI feature design where relevant", vi: "Thiết kế tính năng AI ở nơi liên quan" },
    ],
  },
  {
    numeral: "03",
    title: {
      en: "Sprints you can see, quality you can check",
      vi: "Sprint nhìn thấy được, chất lượng kiểm chứng được",
    },
    paragraphs: [
      {
        en: "Development runs in focused two-week sprints, and progress is demonstrated rather than reported: at each sprint review you use the working software yourself. Code review, automated tests, and continuous integration keep every change deployable; manual exploratory QA, security audits, and accessibility checks run alongside. AI features are held to the same standard, with evaluation suites in CI watching for regressions in retrieval quality and model output.",
        vi: "Phát triển chạy theo sprint hai tuần tập trung, và tiến độ được chứng minh thay vì báo cáo: tại mỗi sprint review, bạn trực tiếp sử dụng phần mềm đang chạy. Code review, kiểm thử tự động và tích hợp liên tục giữ mọi thay đổi luôn sẵn sàng triển khai; QA thăm dò thủ công, kiểm toán bảo mật và kiểm tra khả năng tiếp cận chạy song song. Tính năng AI chịu cùng chuẩn mực, với bộ đánh giá trong CI theo dõi suy giảm chất lượng retrieval và đầu ra mô hình.",
      },
    ],
    points: [
      { en: "Two-week sprints with working demos", vi: "Sprint hai tuần với bản demo chạy thật" },
      { en: "Automated testing and continuous integration", vi: "Kiểm thử tự động và tích hợp liên tục" },
      { en: "Security audits and accessibility checks", vi: "Kiểm toán bảo mật và kiểm tra khả năng tiếp cận" },
      { en: "Evaluation suites for AI features", vi: "Bộ đánh giá cho tính năng AI" },
    ],
  },
  {
    numeral: "04",
    title: {
      en: "Launch day, and the days after",
      vi: "Ngày ra mắt, và những ngày sau đó",
    },
    paragraphs: [
      {
        en: "Launch uses staged rollouts, and monitoring is in place before go-live so issues surface while they are small. Your team receives hands-on training and documentation for the handover. After launch, support agreements cover maintenance, monitoring, and new feature work; many clients keep us on as a long-term technology partner.",
        vi: "Ra mắt dùng staged rollout, và hệ thống giám sát được thiết lập trước go-live để sự cố hiện ra khi chúng còn nhỏ. Đội của bạn nhận đào tạo thực hành và tài liệu cho việc bàn giao. Sau khi ra mắt, các thỏa thuận hỗ trợ bao gồm bảo trì, giám sát và phát triển tính năng mới; nhiều khách hàng giữ chúng tôi làm đối tác công nghệ dài hạn.",
      },
    ],
    points: [
      { en: "Staged rollout with monitoring and alerting", vi: "Staged rollout với giám sát và cảnh báo" },
      { en: "Team training and handover documentation", vi: "Đào tạo đội ngũ và tài liệu bàn giao" },
      { en: "Ongoing maintenance and feature work", vi: "Bảo trì và phát triển tính năng liên tục" },
      { en: "Flexible support agreements", vi: "Thỏa thuận hỗ trợ linh hoạt" },
    ],
  },
];

const toolCategories: { name: { en: string; vi: string }; glass: GlassIconName; tools: string[] }[] = [
  {
    name: { en: "Project Management", vi: "Quản lý Dự án" },
    glass: "build",
    tools: ["Jira", "Linear", "Notion"],
  },
  {
    name: { en: "Communication", vi: "Giao tiếp" },
    glass: "partnership",
    tools: ["Slack", "Zoom", "Google Meet"],
  },
  {
    name: { en: "Development", vi: "Phát triển" },
    glass: "backend",
    tools: ["GitHub", "VS Code", "Cursor"],
  },
  {
    name: { en: "AI Engineering", vi: "AI Engineering" },
    glass: "ai-ml",
    tools: ["LangChain", "pgvector", "OpenAI", "Anthropic", "Cursor"],
  },
  {
    name: { en: "Design", vi: "Thiết kế" },
    glass: "design",
    tools: ["Figma", "FigJam"],
  },
  {
    name: { en: "DevOps", vi: "DevOps" },
    glass: "devops",
    tools: ["Docker", "AWS", "Vercel"],
  },
  {
    name: { en: "Testing", vi: "Kiểm thử" },
    glass: "test",
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
          </div>
        </ContainerUI>
      </section>

      {/* ── Editorial groups (owner directive: no timeline, client-
          experience voice; numerals are editorial rhythm, not steps) ── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <ContainerUI>
          <div className="max-w-3xl mx-auto space-y-20 md:space-y-28">
            {groups.map((group, idx) => (
              <AnimatedSection
                key={group.numeral}
                variant="fadeIn"
                className={idx > 0 ? "pt-20 md:pt-28 border-t border-card-border" : ""}
              >
                <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10">
                  <span
                    className="font-display-title text-brand/40 text-4xl md:text-5xl leading-none select-none"
                    aria-hidden="true"
                  >
                    {group.numeral}
                  </span>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight text-balance">
                      {group.title[lang]}
                    </h2>
                    <div className="mt-5 space-y-4">
                      {group.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph.en}
                          className="text-foreground-secondary leading-relaxed"
                        >
                          {paragraph[lang]}
                        </p>
                      ))}
                    </div>
                    <div className="mt-7">
                      <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                        {chrome.keyActivities}
                      </h3>
                      <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                        {group.points.map((point) => (
                          <li
                            key={point.en}
                            className="flex items-start gap-2 text-sm text-foreground-secondary"
                          >
                            <CheckCircle2
                              size={16}
                              className="text-brand flex-shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            {point[lang]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </ContainerUI>
      </section>

      {/* Visual break — brainstorming/collaboration photo */}
      <div className="relative h-[180px] md:h-[260px] overflow-hidden">
        <Image
          src="/images/photo/photo-process-review.webp"
          alt="Two engineers reviewing code together at a laptop"
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
              return (
                <StaggerItem key={category.name.en}>
                  <div className="rounded-2xl bg-card-bg border border-card-border p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <GlassIcon name={category.glass} size="sm" />
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
