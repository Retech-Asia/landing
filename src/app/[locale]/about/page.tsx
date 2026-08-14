import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Target,
  Eye,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { ABOUT_STATS, SITE_URL } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/page-metadata";
import { setRequestLocale } from "next-intl/server";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";
import { ParallaxDivider } from "@/components/about/ParallaxDivider";
import { AnimatedTimeline } from "@/components/about/AnimatedTimeline";

import { ParallaxHero } from "@/components/about/ParallaxHero";
import { CultureValues } from "@/components/about/CultureValues";
import { OurCommitment } from "@/components/about/OurCommitment";
import { GlobalReach } from "@/components/about/GlobalReach";
import { WhatSetsUsApart } from "@/components/about/WhatSetsUsApart";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({ locale, path: "/about", namespace: "pages.about" });
}

// Locale-aware inline text — picked by `locale` at render time.
type LocaleText = { en: string; vi: string };

const milestones: { year: string; title: LocaleText; description: LocaleText }[] = [
  {
    year: "2020",
    title: {
      en: "Founded in Ho Chi Minh City",
      vi: "Thành lập tại Thành phố Hồ Chí Minh",
    },
    description: {
      en: "Jay Pham founded Retech Solutions with a small team of 5 engineers, focused on custom web and mobile application development for local and regional clients.",
      vi: "Jay Pham sáng lập Retech Solutions với đội ngũ 5 kỹ sư, tập trung vào phát triển ứng dụng web và di động tùy chỉnh cho khách hàng trong nước và khu vực.",
    },
  },
  {
    year: "2021",
    title: {
      en: "First Enterprise CRM Project",
      vi: "Dự án CRM doanh nghiệp đầu tiên",
    },
    description: {
      en: "Delivered our first full-scale CRM system for a financial services client, establishing our expertise in enterprise-grade software and long-term client partnerships.",
      vi: "Bàn giao hệ thống CRM quy mô đầy đủ đầu tiên cho một khách hàng dịch vụ tài chính, khẳng định năng lực của chúng tôi trong phần mềm cấp doanh nghiệp và quan hệ hợp tác lâu dài.",
    },
  },
  {
    year: "2022",
    title: {
      en: "Expanded to 15+ Engineers",
      vi: "Mở rộng lên hơn 15 kỹ sư",
    },
    description: {
      en: "Grew the engineering team and launched dedicated team services for international clients, expanding our delivery capacity across multiple time zones.",
      vi: "Tăng cường đội ngũ kỹ thuật và ra mắt dịch vụ đội ngũ chuyên trách cho khách hàng quốc tế, mở rộng năng lực bàn giao qua nhiều múi giờ.",
    },
  },
  {
    year: "2023",
    title: {
      en: "CMS & ERP Product Lines Launched",
      vi: "Ra mắt dòng sản phẩm CMS & ERP",
    },
    description: {
      en: "Expanded our product offerings with custom CMS and ERP solutions, serving clients in manufacturing, logistics, and professional services industries.",
      vi: "Mở rộng danh mục sản phẩm với các giải pháp CMS và ERP tùy chỉnh, phục vụ khách hàng trong các ngành sản xuất, logistics và dịch vụ chuyên môn.",
    },
  },
  {
    year: "2024",
    title: {
      en: "AI-Powered Solutions Launch",
      vi: "Ra mắt giải pháp tích hợp AI",
    },
    description: {
      en: "Integrated AI and machine learning capabilities across our CMS, CRM, and ERP product lines, helping clients automate workflows and make data-driven decisions.",
      vi: "Tích hợp năng lực AI và machine learning vào các dòng sản phẩm CMS, CRM và ERP, giúp khách hàng tự động hóa quy trình và ra quyết định dựa trên dữ liệu.",
    },
  },
  {
    year: "2025",
    title: {
      en: "Serving Clients in 6 Countries",
      vi: "Phục vụ khách hàng tại 6 quốc gia",
    },
    description: {
      en: "Expanded our client base across Asia Pacific, North America, and Europe, reaching businesses in Vietnam, Singapore, Japan, the US, the UK, and Germany.",
      vi: "Mở rộng tệp khách hàng khắp châu Á – Thái Bình Dương, Bắc Mỹ và châu Âu, tiếp cận doanh nghiệp tại Việt Nam, Singapore, Nhật Bản, Mỹ, Anh và Đức.",
    },
  },
  {
    year: "2026",
    title: {
      en: "50+ Projects Delivered",
      vi: "Hơn 50 dự án đã bàn giao",
    },
    description: {
      en: "Reached a milestone of 50+ successful projects across 8 industries, with a 98% client satisfaction rate and a growing team of 30+ expert engineers.",
      vi: "Đạt cột mốc hơn 50 dự án thành công trên 8 ngành nghề, với tỷ lệ hài lòng của khách hàng 98% và đội ngũ hơn 30 kỹ sư chuyên môn cao không ngừng tăng trưởng.",
    },
  },
];

// Resolve chrome strings by locale. Long-form data (milestones) lives in
// {en, vi} structures above and is picked per field at render time.
function getChrome(locale: string) {
  const isEn = locale === "en";
  return isEn
    ? {
        workspaceAlt: "Retech Solutions development workspace in Vietnam",
        missionTitle: "Building Digital Solutions from Vietnam to the World",
        missionP1:
          "Founded with a mission to bridge the gap between global businesses and Vietnamese engineering talent, Retech Solutions has grown into a trusted partner for companies seeking reliable, scalable software development services.",
        missionP2:
          "Our team of engineers, designers, and project managers works closely with clients to turn business problems into shipped software. We specialize in custom CMS, CRM, and ERP platforms, and we ship AI-native products that use RAG, multi-agent orchestration, and LLM features where they actually add value.",
        missionP3:
          "With over five years of experience and more than 50 projects delivered, we have proven that great software can come from anywhere, and that the right partnership can transform ideas into successful products.",
        missionCardTitle: "Our Mission",
        missionCardBody:
          "To empower businesses worldwide with high-quality, cost-effective software solutions built by exceptional talent. We believe that access to great engineering should not be limited by geography.",
        missionB1: "Delivering enterprise-grade software at competitive rates",
        missionB2: "Cultivating long-term partnerships, not one-off transactions",
        missionB3: "Driving innovation through AI and modern technologies",
        visionCardTitle: "Our Vision",
        visionCardBody:
          "To become the go-to software development partner in Southeast Asia, recognized for delivering exceptional quality, fostering innovation, and creating lasting impact for businesses worldwide.",
        visionB1: "Growing our global footprint to 10+ countries by 2028",
        visionB2: "Investing in AI and automation capabilities for smarter delivery",
        visionB3: "Building Vietnam's next generation of engineering leaders",
        numbersLabel: "By the Numbers",
        numbersTitle: "Retech by the Numbers",
        numbersDescription:
          "The impact we have made across industries and geographies, one project at a time.",
        statLabels: {} as Record<string, string>,
        officeAlt: "Retech Solutions modern office workspace",
        teamAlt: "Retech Solutions team collaborating in the office",
        journeyTitle: "Our Journey",
        journeyDescription:
          "Key milestones that have shaped Retech Solutions since our founding in 2020.",
        ctaTitle: "Ready to Work With Us?",
        ctaBody:
          "Tell us about your project and we will come back with a tailored plan: team composition, technology choices, timeline, and transparent pricing. No templates, no pressure.",
        ctaPrimary: "Tell Us About Your Project",
        ctaSecondary: "See Our Work",
      }
    : {
        workspaceAlt: "Không gian làm việc của Retech Solutions tại Việt Nam",
        missionTitle: "Xây dựng giải pháp số từ Việt Nam đến thế giới",
        missionP1:
          "Được thành lập với sứ mệnh kết nối doanh nghiệp toàn cầu với nguồn nhân lực kỹ thuật Việt Nam, Retech Solutions đã trở thành đối tác đáng tin cậy cho các công ty tìm kiếm dịch vụ phát triển phần mềm ổn định và dễ mở rộng.",
        missionP2:
          "Đội ngũ kỹ sư, nhà thiết kế và quản lý dự án của chúng tôi làm việc sát sao cùng khách hàng để biến các vấn đề kinh doanh thành phần mềm hoàn chỉnh. Chúng tôi chuyên về các nền tảng CMS, CRM và ERP tùy chỉnh, đồng thời phát triển các sản phẩm AI-native ứng dụng RAG, điều phối multi-agent và các tính năng LLM ở những nơi thực sự tạo ra giá trị.",
        missionP3:
          "Với hơn năm năm kinh nghiệm và hơn 50 dự án đã bàn giao, chúng tôi đã chứng minh rằng phần mềm chất lượng có thể đến từ bất kỳ đâu, và một sự hợp tác đúng cách có thể biến ý tưởng thành sản phẩm thành công.",
        missionCardTitle: "Sứ mệnh của chúng tôi",
        missionCardBody:
          "Trao quyền cho doanh nghiệp toàn cầu với các giải pháp phần mềm chất lượng cao, tiết kiệm chi phí, được xây dựng bởi đội ngũ tài năng. Chúng tôi tin rằng khả năng tiếp cận kỹ thuật tốt không nên bị giới hạn bởi địa lý.",
        missionB1: "Bàn giao phần mềm cấp doanh nghiệp với chi phí cạnh tranh",
        missionB2: "Xây dựng quan hệ hợp tác lâu dài, không phải giao dịch một lần",
        missionB3: "Thúc đẩy đổi mới thông qua AI và công nghệ hiện đại",
        visionCardTitle: "Tầm nhìn của chúng tôi",
        visionCardBody:
          "Trở thành đối tác phát triển phần mềm đáng tìm đến tại Đông Nam Á, được ghi nhận nhờ chất lượng bàn giao cao, tinh thần đổi mới và giá trị bền vững cho doanh nghiệp toàn cầu.",
        visionB1: "Mở rộng phạm vi hoạt động toàn cầu lên hơn 10 quốc gia vào năm 2028",
        visionB2: "Đầu tư vào năng lực AI và tự động hóa để bàn giao thông minh hơn",
        visionB3: "Xây dựng thế hệ kỹ sư kế tiếp của Việt Nam",
        numbersLabel: "Các con số",
        numbersTitle: "Retech qua các con số",
        numbersDescription:
          "Những dấu ấn chúng tôi để lại trên nhiều ngành nghề và thị trường, từng dự án một.",
        statLabels: {
          "Projects Delivered": "Dự án đã bàn giao",
          "Expert Engineers": "Kỹ sư chuyên môn cao",
          "Countries Served": "Quốc gia phục vụ",
          "Client Satisfaction Rate": "Tỷ lệ hài lòng của khách hàng",
          "Years of Excellence": "Năm kinh nghiệm",
          "Average Response Time": "Thời gian phản hồi trung bình",
        } as Record<string, string>,
        officeAlt: "Văn phòng hiện đại của Retech Solutions",
        teamAlt: "Đội ngũ Retech Solutions cùng làm việc tại văn phòng",
        journeyTitle: "Hành trình của chúng tôi",
        journeyDescription:
          "Những cột mốc quan trọng đã định hình Retech Solutions kể từ khi thành lập năm 2020.",
        ctaTitle: "Sẵn sàng hợp tác cùng chúng tôi?",
        ctaBody:
          "Hãy kể cho chúng tôi về dự án của bạn và chúng tôi sẽ phản hồi với một kế hoạch phù hợp: thành phần đội ngũ, lựa chọn công nghệ, tiến độ và báo giá minh bạch. Không dùng mẫu có sẵn, không tạo áp lực.",
        ctaPrimary: "Kể về dự án của bạn",
        ctaSecondary: "Xem sản phẩm của chúng tôi",
      };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const chrome = getChrome(locale);
  const pick = (text: LocaleText) => (locale === "vi" ? text.vi : text.en);
  const localizedMilestones = milestones.map((m) => ({
    year: m.year,
    title: pick(m.title),
    description: pick(m.description),
  }));
  return (
    <>
      {/* Structured Data */}
      <WebPageJsonLd
        title="About Us"
        description="Vietnam-based software outsourcing company. 5+ years experience, 50+ projects delivered across 6 countries. Full-cycle development from strategy to deployment."
        url={`${SITE_URL}/${locale}/about`}
        type="AboutPage"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE_URL}/${locale}` },
          { name: "About", url: `${SITE_URL}/${locale}/about` },
        ]}
      />

      {/* Person schema removed — leadership section was removed from the
          page, so the structured data referenced people not visible on-page. */}

      {/* Hero with Parallax Background */}
      <ParallaxHero />

      {/* Full-width workspace image — makes the company feel real */}
      <div className="relative h-[280px] md:h-[420px] overflow-hidden">
        <Image
          src="/images/stock/modern-office.webp"
          alt={chrome.workspaceAlt}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
      </div>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Our Mission */}
            <AnimatedSection variant="slideRight">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
                  {chrome.missionTitle}
                </h2>
                <div className="space-y-4 text-foreground-secondary leading-relaxed">
                  <p>{chrome.missionP1}</p>
                  <p>{chrome.missionP2}</p>
                  <p>{chrome.missionP3}</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Mission + Vision Cards */}
            <div className="space-y-6">
              <AnimatedSection variant="slideLeft">
                <Card hover={false} padding="lg" className="bg-background-subtle border-card-border">
                  <div className="flex items-center gap-3 mb-4">
                    <Target size={20} className="text-brand" />
                    <h3 className="text-xl font-bold text-foreground">{chrome.missionCardTitle}</h3>
                  </div>
                  <p className="text-foreground-secondary leading-relaxed mb-5">
                    {chrome.missionCardBody}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 rounded-full bg-brand shrink-0" />
                      <p className="text-sm text-foreground-secondary">
                        {chrome.missionB1}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 rounded-full bg-accent-cyan shrink-0" />
                      <p className="text-sm text-foreground-secondary">
                        {chrome.missionB2}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 rounded-full bg-accent-violet shrink-0" />
                      <p className="text-sm text-foreground-secondary">
                        {chrome.missionB3}
                      </p>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>

              <AnimatedSection variant="slideLeft" delay={0.15}>
                <Card hover={false} padding="lg" className="bg-background-subtle border-card-border">
                  <div className="flex items-center gap-3 mb-4">
                    <Eye size={20} className="text-accent-cyan" />
                    <h3 className="text-xl font-bold text-foreground">{chrome.visionCardTitle}</h3>
                  </div>
                  <p className="text-foreground-secondary leading-relaxed mb-5">
                    {chrome.visionCardBody}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 rounded-full bg-brand shrink-0" />
                      <p className="text-sm text-foreground-secondary">
                        {chrome.visionB1}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 rounded-full bg-accent-cyan shrink-0" />
                      <p className="text-sm text-foreground-secondary">
                        {chrome.visionB2}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 rounded-full bg-accent-violet shrink-0" />
                      <p className="text-sm text-foreground-secondary">
                        {chrome.visionB3}
                      </p>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </Container>
      </section>

      {/* Leadership section removed per owner request — company landing
          page does not need to show individual identities. */}

      {/* Parallax Visual Divider */}
      <ParallaxDivider />

      {/* By the Numbers */}
      <section className="py-20 md:py-28 bg-background-subtle relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern pointer-events-none opacity-30" aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-10 -right-10 w-[40vw] h-[40vw] rounded-full bg-brand/[0.03] blur-[140px] animate-mesh-1" />
          <div className="absolute -bottom-10 -left-10 w-[35vw] h-[35vw] rounded-full bg-accent-cyan/[0.03] blur-[120px] animate-mesh-2" />
        </div>

        <Container className="relative z-10">
          <AnimatedSection>
            <SectionHeader
              label={chrome.numbersLabel}
              title={chrome.numbersTitle}
              description={chrome.numbersDescription}
            />
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {ABOUT_STATS.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="group relative rounded-2xl bg-card-bg border border-card-border shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] hover:border-brand/15 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 p-6 md:p-8 text-center h-full">
                  <p className="text-4xl md:text-5xl font-bold gradient-text-brand mb-3">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm md:text-base text-foreground-muted font-medium">
                    {chrome.statLabels[stat.label] ?? stat.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Office interior — adds professional workspace context */}
      <div className="relative h-[200px] md:h-[300px] overflow-hidden">
        <Image
          src="/images/stock/office-interior.webp"
          alt={chrome.officeAlt}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Global Reach */}
      <GlobalReach />

      {/* What Sets Us Apart */}
      <WhatSetsUsApart />

      {/* Milestones — Animated Timeline */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader
            title={chrome.journeyTitle}
            description={chrome.journeyDescription}
          />
          <AnimatedTimeline milestones={localizedMilestones} />
        </Container>
      </section>

      {/* Values — 2x3 Grid with Animated Icons */}
      <CultureValues />

      {/* Team portrait — adds human element before the commitment section */}
      <div className="relative h-[200px] md:h-[300px] overflow-hidden">
        <Image
          src="/images/stock/team-portrait.webp"
          alt={chrome.teamAlt}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Our Commitment — 2x2 Grid */}
      <OurCommitment />

      {/* CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <GradientBackground variant="cta" />
        <Container className="relative z-10">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                {chrome.ctaTitle}
              </h2>
              <p className="text-lg text-foreground-secondary mb-8">
                {chrome.ctaBody}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href="/contact" size="lg">
                  {chrome.ctaPrimary}
                </Button>
                <Button href="/case-studies" variant="secondary" size="lg">
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
