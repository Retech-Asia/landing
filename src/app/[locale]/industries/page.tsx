import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import {
  AnimatedSection,
} from "@/components/ui/AnimatedSection";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { CompositeSectionBackground } from "@/components/ui/SectionBackground";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { IndustryExplorer } from "@/components/ui/IndustryExplorer";
import { SITE_URL } from "@/lib/constants";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/page-metadata";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // VI listing is now translated (IndustryExplorer consumes flattened locale data)
  return buildPageMetadata({ locale, path: "/industries", namespace: "pages.industries", viReady: true });
}

// Resolve chrome strings by locale. The IndustryExplorer consumes
// flattened locale data separately; this covers the page chrome —
// hero, stats, section headers, and CTAs.
function getChrome(locale: string) {
  const isEn = locale === "en";
  return isEn
    ? {
        breadcrumbHome: "Home",
        breadcrumbIndustries: "Industries",
        heroTitle: "Industries We Serve",
        heroLead: "From healthcare to finance, e-commerce to manufacturing, we bring deep domain expertise and proven technical capabilities to every industry we work in.",
        statIndustries: "Industries",
        statProjects: "Projects Delivered",
        statSavings: "Cost Savings",
        statCountries: "Countries Served",
        explorerTitle: "Explore Our Industries",
        explorerDescription: "Filter by category, expand any industry for a quick look at challenges, solutions, and technologies.",
        whyTitle: "Why Companies Choose Vietnam for Industry Software",
        whyP1: "Vietnam has rapidly emerged as one of Southeast Asia's established technology hubs, producing a growing pipeline of skilled engineers who specialize in enterprise-grade software development. With strong university programs in computer science and a culture that emphasizes analytical thinking, Vietnamese development teams consistently deliver high-quality solutions across complex industry domains, from healthcare compliance systems to real-time financial platforms.",
        whyP2: "Partnering with a Vietnam-based team gives international companies access to deep technical talent at a fraction of Western market rates, without sacrificing quality. The GMT+7 timezone also enables productive overlap with both European and Australian business hours, making real-time collaboration seamless.",
        statItGraduates: "IT graduates annually",
        statLowerCosts: "Lower development costs",
        statTimezone: "Timezone advantage for EU & APAC overlap",
        processTitle: "Our Development Process",
        step1Title: "Discovery",
        step1Description: "We analyze your industry requirements, business goals, and existing systems to define a clear technical roadmap.",
        step2Title: "Development",
        step2Description: "Our team builds iteratively using agile sprints, with continuous testing and stakeholder feedback at every milestone.",
        step3Title: "Delivery",
        step3Description: "We deploy, monitor, and support your solution in production, ensuring a smooth launch and long-term reliability.",
        ctaTitle: "Your Industry, Our Expertise",
        ctaBody: "No matter your industry, we have the experience and technical depth to deliver software that makes a difference. Let's discuss your needs.",
        ctaPrimary: "Get Your Free Estimate",
        ctaSecondary: "Explore Services",
      }
    : {
        breadcrumbHome: "Trang chủ",
        breadcrumbIndustries: "Ngành",
        heroTitle: "Các Ngành chúng tôi Phục vụ",
        heroLead: "Từ y tế đến tài chính, thương mại điện tử đến sản xuất, chúng tôi mang đến chuyên môn sâu và năng lực kỹ thuật đã được kiểm chứng cho mọi ngành chúng tôi hợp tác.",
        statIndustries: "Ngành",
        statProjects: "Dự án đã Bàn giao",
        statSavings: "Tiết kiệm Chi phí",
        statCountries: "Quốc gia Phục vụ",
        explorerTitle: "Khám phá Các Ngành của chúng tôi",
        explorerDescription: "Lọc theo danh mục, mở rộng bất kỳ ngành nào để xem nhanh các thách thức, giải pháp và công nghệ.",
        whyTitle: "Vì sao Các Công ty Chọn Việt Nam cho Phần mềm Ngành",
        whyP1: "Việt Nam đã nhanh chóng trở thành một trong những trung tâm công nghệ uy tín của Đông Nam Á, tạo ra nguồn kỹ sư giỏi ngày càng đông với chuyên môn về phát triển phần mềm cấp doanh nghiệp. Với các chương trình đại học mạnh về khoa học máy tính và nền văn hóa đề cao tư duy phân tích, các đội ngũ phát triển Việt Nam liên tục bàn giao giải pháp chất lượng cao trên các lĩnh vực ngành phức tạp, từ hệ thống tuân thủ y tế đến nền tảng tài chính thời gian thực.",
        whyP2: "Hợp tác với đội ngũ tại Việt Nam giúp các công ty quốc tế tiếp cận nguồn nhân lực kỹ thuật sâu rộng với chi phí chỉ bằng một phần so với mức giá thị trường phương Tây, mà không hy sinh chất lượng. Múi giờ GMT+7 cũng cho phép chồng lấp làm việc hiệu quả với cả giờ hành chính châu Âu và châu Úc, giúp cộng tác thời gian thực liền mạch.",
        statItGraduates: "Kỹ sư CNTT tốt nghiệp mỗi năm",
        statLowerCosts: "Chi phí phát triển thấp hơn",
        statTimezone: "Lợi thế múi giờ chồng lấp với EU & APAC",
        processTitle: "Quy trình Phát triển của chúng tôi",
        step1Title: "Khám phá",
        step1Description: "Chúng tôi phân tích yêu cầu ngành, mục tiêu kinh doanh và hệ thống hiện có của bạn để xác định lộ trình kỹ thuật rõ ràng.",
        step2Title: "Phát triển",
        step2Description: "Đội ngũ của chúng tôi xây dựng lặp lại theo các sprint linh hoạt, với kiểm thử liên tục và phản hồi từ các bên ở mọi cột mốc.",
        step3Title: "Bàn giao",
        step3Description: "Chúng tôi triển khai, giám sát và hỗ trợ giải pháp của bạn trong môi trường sản xuất, đảm bảo ra mắt suôn sẻ và độ tin cậy lâu dài.",
        ctaTitle: "Ngành của Bạn, Chuyên môn của chúng tôi",
        ctaBody: "Dù bạn ở ngành nào, chúng tôi có kinh nghiệm và chiều sâu kỹ thuật để bàn giao phần mềm tạo ra khác biệt. Hãy trao đổi về nhu cầu của bạn.",
        ctaPrimary: "Nhận Báo giá Miễn phí",
        ctaSecondary: "Khám phá Dịch vụ",
      };
}

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const chrome = getChrome(locale);
  return (
    <>
      {/* Structured Data */}
      <WebPageJsonLd
        title="Industries We Serve"
        description="Custom software for Healthcare, Finance, E-commerce & more. Industry-specific CMS, CRM, ERP and AI solutions."
        url={`${SITE_URL}/${locale}/industries`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE_URL}/${locale}` },
          { name: "Industries", url: `${SITE_URL}/${locale}/industries` },
        ]}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <CompositeSectionBackground layers={["aurora", "grid-fade"]} grain />
        <Container className="relative z-10">
          <BreadcrumbNav
            items={[
              { label: chrome.breadcrumbHome, href: "/" },
              { label: chrome.breadcrumbIndustries },
            ]}
          />
          <div className="page-hero-enter">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              {chrome.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-foreground-secondary max-w-3xl leading-relaxed">
              {chrome.heroLead}
            </p>
          </div>

          {/* Quick stats bar */}
          <AnimatedSection variant="slideUp" delay={0.15}>
            <div className="mt-12 flex flex-wrap gap-x-6 sm:gap-x-12 gap-y-4">
              {[
                { value: 9, suffix: "", label: chrome.statIndustries },
                { value: 50, suffix: "+", label: chrome.statProjects },
                { value: 40, suffix: "-60%", label: chrome.statSavings },
                { value: 6, suffix: "", label: chrome.statCountries },
              ].map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-3xl font-bold text-foreground">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      duration={1800}
                    />
                  </span>
                  <span className="text-sm text-foreground-secondary">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </Container>
      </section>

      <SectionDivider />

      {/* Industries Explorer — Interactive grid with filters and expandable cards */}
      <section className="py-20 md:py-28">
        <Container>
          <AnimatedSection variant="slideUp">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-center">
              {chrome.explorerTitle}
            </h2>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto text-center mb-10 leading-relaxed">
              {chrome.explorerDescription}
            </p>
          </AnimatedSection>
          <IndustryExplorer />
        </Container>
      </section>

      {/* Why Vietnam */}
      <section className="py-20 md:py-28 bg-background-subtle">
        <Container>
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
              <div className="lg:col-span-3">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {chrome.whyTitle}
                </h2>
                <div className="space-y-4 text-foreground-secondary leading-relaxed">
                  <p>
                    {chrome.whyP1}
                  </p>
                  <p>
                    {chrome.whyP2}
                  </p>
                </div>
              </div>
              <div className="lg:col-span-2">
                <Card padding="lg" hover={false} className="space-y-6">
                  <div>
                    <p className="text-3xl font-bold text-brand">
                      <AnimatedCounter target={50} suffix="K+" duration={2000} />
                    </p>
                    <p className="text-sm text-foreground-secondary mt-1">
                      {chrome.statItGraduates}
                    </p>
                  </div>
                  <div className="border-t border-card-border" />
                  <div>
                    <p className="text-3xl font-bold text-accent-cyan">
                      40&ndash;60%
                    </p>
                    <p className="text-sm text-foreground-secondary mt-1">
                      {chrome.statLowerCosts}
                    </p>
                  </div>
                  <div className="border-t border-card-border" />
                  <div>
                    <p className="text-3xl font-bold text-accent-violet">
                      GMT+7
                    </p>
                    <p className="text-sm text-foreground-secondary mt-1">
                      {chrome.statTimezone}
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Development Process */}
      <section className="py-20 md:py-28">
        <Container>
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              {chrome.processTitle}
            </h2>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0">
              {[
                {
                  step: "01",
                  title: chrome.step1Title,
                  description: chrome.step1Description,
                },
                {
                  step: "02",
                  title: chrome.step2Title,
                  description: chrome.step2Description,
                },
                {
                  step: "03",
                  title: chrome.step3Title,
                  description: chrome.step3Description,
                },
              ].map((item, index) => (
                <div
                  key={item.step}
                  className="flex-1 flex flex-row md:flex-col items-start md:items-center gap-4 md:gap-0 md:text-center"
                >
                  <span className="text-sm font-mono font-semibold text-brand tracking-wider">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground md:mt-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed md:mt-2 md:max-w-xs">
                    {item.description}
                  </p>
                  {index < 2 && (
                    <span
                      className="hidden md:block text-foreground-secondary/30 text-2xl font-light mx-6 self-center"
                      aria-hidden="true"
                    >
                      &mdash;
                    </span>
                  )}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-background-subtle border-t border-gradient">
        <GradientBackground variant="cta" />
        <Container className="relative z-10">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {chrome.ctaTitle}
              </h2>
              <p className="text-lg text-foreground-secondary mb-8">
                {chrome.ctaBody}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href="/contact" size="lg">
                  {chrome.ctaPrimary}
                </Button>
                <Button href="/services" variant="secondary" size="lg">
                  {chrome.ctaSecondary} <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
