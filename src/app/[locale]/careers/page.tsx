import type { Metadata } from "next";
import Image from "next/image";
import {
  Clock,
  DollarSign,
  GraduationCap,
  Globe,
  ArrowRight,
  Mail,
  Heart,
  Users,
  Sparkles,
  Laptop,
  Shield,
  FileText,
  MessageCircle,
  Code2,
  Handshake,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { SITE_URL, CONTACT } from "@/lib/constants";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";
// CareersListing + jobListings intentionally not imported — no public openings right now.
// When positions reopen, render <CareersListing jobs={getFlatJobs(locale)} email={CONTACT.email} locale={locale} />.
import { buildPageMetadata } from "@/lib/page-metadata";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import type { L } from "@/lib/careers-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({ locale, path: "/careers", namespace: "pages.careers" });
}

// Resolve chrome strings by locale — same inline EN | VI bundle pattern
// as the process page. Long-form data arrays (benefits, culture,
// hiring steps) carry per-field {en, vi} pairs resolved at render.
function getChrome(locale: string) {
  const isEn = locale === "en";
  return isEn
    ? {
        homeLabel: "Home",
        careersLabel: "Careers",
        heroTitle: "Join Our Team",
        heroLead:
          "Build the future of software development from Vietnam. We are looking for passionate people who want to make an impact on international projects.",
        cultureLabel: "Our Culture",
        cultureTitle: "Why Retech?",
        cultureDescription:
          "We invest in our people because great software starts with a great team. Here is what makes us different.",
        teamCaption: "Join a team that ships.",
        benefitsLabel: "Benefits & Perks",
        benefitsTitle: "What You Get",
        benefitsDescription:
          "We go beyond the basics to ensure our team members are supported, challenged, and rewarded.",
        hiringLabel: "Hiring Process",
        hiringTitle: "How We Hire",
        hiringDescription:
          "Our process is thorough but respectful of your time. No trick questions, no endless rounds, just meaningful conversations to see if we are a great match.",
        stepLabel: "Step",
        ctaTitle: "Don't See the Right Role?",
        ctaBody:
          "We are always looking for talented people. Send us your resume and let us know how you can contribute to our team.",
        sendResume: "Send Your Resume",
        contactUs: "Contact Us",
      }
    : {
        homeLabel: "Trang chủ",
        careersLabel: "Tuyển dụng",
        heroTitle: "Tham gia Đội ngũ của chúng tôi",
        heroLead:
          "Xây dựng tương lai phát triển phần mềm từ Việt Nam. Chúng tôi đang tìm kiếm những người đam mê muốn tạo ra tác động tại các dự án quốc tế.",
        cultureLabel: "Văn hóa của chúng tôi",
        cultureTitle: "Vì sao chọn Retech?",
        cultureDescription:
          "Chúng tôi đầu tư vào con người vì phần mềm tốt bắt đầu từ một đội ngũ tốt. Dưới đây là những điều làm nên sự khác biệt của chúng tôi.",
        teamCaption: "Tham gia một đội ngũ thực sự ra mắt sản phẩm.",
        benefitsLabel: "Quyền lợi & Đặc quyền",
        benefitsTitle: "Những gì bạn nhận được",
        benefitsDescription:
          "Chúng tôi không dừng lại ở những điều cơ bản: thành viên trong đội ngũ luôn được hỗ trợ, thử thách và ghi nhận xứng đáng.",
        hiringLabel: "Quy trình Tuyển dụng",
        hiringTitle: "Cách chúng tôi Tuyển dụng",
        hiringDescription:
          "Quy trình của chúng tôi kỹ lưỡng nhưng tôn trọng thời gian của bạn. Không câu hỏi hóc búa, không vòng phỏng vấn kéo dài: chỉ những cuộc trò chuyện thực sự để xem hai bên có phù hợp hay không.",
        stepLabel: "Bước",
        ctaTitle: "Chưa thấy vị trí phù hợp?",
        ctaBody:
          "Chúng tôi luôn tìm kiếm những người tài năng. Hãy gửi CV và cho chúng tôi biết bạn có thể đóng góp gì cho đội ngũ.",
        sendResume: "Gửi CV của bạn",
        contactUs: "Liên hệ",
      };
}

/* ------------------------------------------------------------------ */
/*  Benefits data                                                      */
/* ------------------------------------------------------------------ */

const benefits = [
  {
    icon: DollarSign,
    title: { en: "Competitive Salary", vi: "Lương Cạnh tranh" } as L,
    description: {
      en: "Market-leading compensation with performance-based bonuses and regular salary reviews.",
      vi: "Mức lương cạnh tranh theo thị trường, kèm thưởng theo hiệu suất và xét lương định kỳ.",
    },
    color: "text-brand",
    bg: "bg-brand/10",
  },
  {
    icon: Shield,
    title: { en: "Health Insurance", vi: "Bảo hiểm Y tế" } as L,
    description: {
      en: "Comprehensive health coverage and wellness allowance to keep you and your family protected.",
      vi: "Quyền lợi bảo hiểm sức khỏe toàn diện và phụ cấp chăm sóc sức khỏe để bảo vệ bạn và gia đình.",
    },
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/10",
  },
  {
    icon: Clock,
    title: { en: "Flexible Hours", vi: "Giờ làm việc Linh hoạt" } as L,
    description: {
      en: "Hybrid work model with flexible schedules so you can do your best work when it suits you.",
      vi: "Mô hình làm việc hybrid với lịch trình linh hoạt để bạn làm việc hiệu quả vào thời điểm phù hợp.",
    },
    color: "text-accent-violet",
    bg: "bg-accent-violet/10",
  },
  {
    icon: GraduationCap,
    title: {
      en: "Professional Development",
      vi: "Phát triển Chuyên môn",
    } as L,
    description: {
      en: "Annual learning budget for courses, certifications, and conferences plus internal tech talks.",
      vi: "Ngân sách học tập hàng năm cho khóa học, chứng chỉ, hội thảo cùng các buổi chia sẻ công nghệ nội bộ.",
    },
    color: "text-brand",
    bg: "bg-brand/10",
  },
  {
    icon: Laptop,
    title: { en: "Modern Tech Stack", vi: "Tech Stack Hiện đại" } as L,
    description: {
      en: "Work with React, Next.js, Node.js, TypeScript, and cloud-native architectures.",
      vi: "Làm việc với React, Next.js, Node.js, TypeScript và các kiến trúc cloud-native.",
    },
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/10",
  },
  {
    icon: Globe,
    title: { en: "International Projects", vi: "Dự án Quốc tế" } as L,
    description: {
      en: "Collaborate with clients across Asia, Australia, Europe, and North America.",
      vi: "Hợp tác với khách hàng trên khắp Châu Á, Úc, Châu Âu và Bắc Mỹ.",
    },
    color: "text-accent-violet",
    bg: "bg-accent-violet/10",
  },
];

/* ------------------------------------------------------------------ */
/*  "Why Retech" culture highlights                                     */
/* ------------------------------------------------------------------ */

const cultureHighlights = [
  {
    icon: Users,
    title: { en: "Collaborative Culture", vi: "Văn hóa Cộng tác" } as L,
    description: {
      en: "Flat hierarchy where every voice matters. We make decisions together and celebrate wins as a team.",
      vi: "Cơ cấu phẳng nơi mọi ý kiến đều được lắng nghe. Chúng tôi cùng nhau ra quyết định và cùng nhau ghi nhận thành công.",
    },
    color: "text-brand",
    bg: "bg-brand/10",
  },
  {
    icon: Sparkles,
    title: { en: "Innovation First", vi: "Ưu tiên Đổi mới" } as L,
    description: {
      en: "We experiment with modern technologies and encourage creative problem-solving in everything we build.",
      vi: "Chúng tôi thử nghiệm các công nghệ hiện đại và khuyến khích tư duy sáng tạo trong mọi sản phẩm chúng tôi xây dựng.",
    },
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/10",
  },
  {
    icon: Heart,
    title: { en: "Work-Life Balance", vi: "Cân bằng Công việc & Cuộc sống" } as L,
    description: {
      en: "Sustainable pace, not burnout. We respect your time off and invest in an environment where you can thrive long-term.",
      vi: "Nhịp độ bền vững, không kiệt sức. Chúng tôi tôn trọng thời gian nghỉ ngơi của bạn và đầu tư vào môi trường để bạn phát triển lâu dài.",
    },
    color: "text-accent-violet",
    bg: "bg-accent-violet/10",
  },
  {
    icon: Globe,
    title: { en: "Global Impact", vi: "Tác động Toàn cầu" } as L,
    description: {
      en: "Your code ships to users worldwide. From startups to enterprises, the products you build make a real difference.",
      vi: "Code của bạn đến với người dùng trên toàn thế giới. Từ startup đến doanh nghiệp lớn, sản phẩm bạn xây dựng tạo ra giá trị thực.",
    },
    color: "text-brand",
    bg: "bg-brand/10",
  },
];

/* ------------------------------------------------------------------ */
/*  Hiring process steps                                                */
/* ------------------------------------------------------------------ */

const hiringSteps = [
  {
    number: 1,
    icon: FileText,
    title: { en: "Application Review", vi: "Xem xét Hồ sơ" } as L,
    description: {
      en: "Our talent team reviews your resume and portfolio within 3 business days. We look for relevant experience, project impact, and cultural alignment.",
      vi: "Đội ngũ tuyển dụng của chúng tôi xem xét CV và portfolio của bạn trong vòng 3 ngày làm việc. Chúng tôi chú trọng kinh nghiệm phù hợp, tác động dự án và sự tương đồng văn hóa.",
    },
    timeline: { en: "1-3 days", vi: "1-3 ngày" } as L,
  },
  {
    number: 2,
    icon: MessageCircle,
    title: { en: "Initial Interview", vi: "Phỏng vấn Ban đầu" } as L,
    description: {
      en: "A 30-minute conversation with our hiring manager to discuss your background, motivations, and what you are looking for in your next role.",
      vi: "Cuộc trò chuyện 30 phút với quản lý tuyển dụng về kinh nghiệm, động lực và điều bạn tìm kiếm ở vị trí tiếp theo.",
    },
    timeline: { en: "30 min", vi: "30 phút" } as L,
  },
  {
    number: 3,
    icon: Code2,
    title: { en: "Technical Assessment", vi: "Bài đánh giá Kỹ thuật" } as L,
    description: {
      en: "A practical take-home or live coding exercise relevant to the role. We evaluate problem-solving ability, code quality, and communication, not trick questions.",
      vi: "Bài tập thực hành tại nhà hoặc live coding phù hợp với vị trí. Chúng tôi đánh giá khả năng giải quyết vấn đề, chất lượng code và khả năng giao tiếp, không phải những câu hỏi hóc búa.",
    },
    timeline: { en: "2-3 hours", vi: "2-3 giờ" } as L,
  },
  {
    number: 4,
    icon: Users,
    title: { en: "Team Interview", vi: "Phỏng vấn với Đội ngũ" } as L,
    description: {
      en: "Meet the team you would be working with. This is a collaborative session focused on how you approach real-world scenarios and work with others.",
      vi: "Gặp gỡ đội ngũ bạn sẽ cùng làm việc. Đây là buổi trao đổi mang tính cộng tác, tập trung vào cách bạn tiếp cận các tình huống thực tế và làm việc với người khác.",
    },
    timeline: { en: "45-60 min", vi: "45-60 phút" } as L,
  },
  {
    number: 5,
    icon: Handshake,
    title: { en: "Offer & Onboarding", vi: "Offer & Onboarding" } as L,
    description: {
      en: "If it is a mutual fit, we extend an offer promptly. Our structured onboarding gets you set up with tools, introduced to the team, and contributing within your first week.",
      vi: "Nếu hai bên phù hợp, chúng tôi sẽ gửi offer nhanh chóng. Quy trình hội nhập có cấu trúc giúp bạn trang bị đầy đủ công cụ, làm quen đội ngũ và bắt đầu đóng góp ngay trong tuần đầu tiên.",
    },
    timeline: { en: "1 week", vi: "1 tuần" } as L,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const chrome = getChrome(locale);
  const lang = locale as Locale;
  return (
    <>
      {/* Structured Data */}
      <WebPageJsonLd
        title="Careers"
        description="Join Retech Solutions in Ho Chi Minh City. We're always interested in hearing from talented engineers, designers, and project managers, even when we don't have public openings listed."
        url={`${SITE_URL}/${locale}/careers`}
      />
      {/* JobPosting structured data intentionally omitted — no active public
          openings right now. Restore by mapping over jobListings with
          <JobPostingJsonLd> when positions reopen. */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE_URL}/${locale}` },
          { name: "Careers", url: `${SITE_URL}/${locale}/careers` },
        ]}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <GradientBackground variant="hero" />
        <div
          className="absolute inset-0 grid-pattern pointer-events-none opacity-50"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 dot-pattern pointer-events-none opacity-25"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <BreadcrumbNav
            items={[
              { label: chrome.homeLabel, href: "/" },
              { label: chrome.careersLabel },
            ]}
          />
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              {chrome.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-foreground-secondary max-w-3xl leading-relaxed">
              {chrome.heroLead}
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* Why Retech */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <GradientBackground variant="subtle" />
        <Container className="relative z-10">
          <SectionHeader
            label={chrome.cultureLabel}
            title={chrome.cultureTitle}
            description={chrome.cultureDescription}
          />

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cultureHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title.en}>
                  <Card padding="lg" className="h-full text-center">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${item.bg} mb-4`}
                    >
                      <Icon size={22} className={item.color} />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      {item.title[lang]}
                    </h3>
                    <p className="text-sm text-foreground-secondary leading-relaxed">
                      {item.description[lang]}
                    </p>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* Open positions — intentionally not shown. We are not actively hiring
          via the public site right now. To re-enable, restore the Job Listings
          section + import { getFlatJobs } from "@/lib/careers-data" and render
          <CareersListing jobs={getFlatJobs(lang)} email={CONTACT.email} locale={locale} /> here. */}

      {/* Team photo — careers pages need human element for employer branding */}
      <div className="relative h-[220px] md:h-[320px] overflow-hidden">
        <Image
          src="/images/stock/team-portrait.webp"
          alt="Retech Solutions team in our Ho Chi Minh City office"
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-6 left-0 right-0">
          <Container>
            <p className="text-lg md:text-2xl font-bold text-foreground">
              {chrome.teamCaption}
            </p>
          </Container>
        </div>
      </div>

      {/* Benefits */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <GradientBackground variant="subtle" />
        <Container className="relative z-10">
          <SectionHeader
            label={chrome.benefitsLabel}
            title={chrome.benefitsTitle}
            description={chrome.benefitsDescription}
          />

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <StaggerItem key={benefit.title.en}>
                  <Card padding="lg" className="h-full">
                    <div className="flex items-start gap-4">
                      <div
                        className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${benefit.bg} shrink-0`}
                      >
                        <Icon size={20} className={benefit.color} />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground mb-1">
                          {benefit.title[lang]}
                        </h3>
                        <p className="text-sm text-foreground-secondary leading-relaxed">
                          {benefit.description[lang]}
                        </p>
                      </div>
                    </div>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* Hiring Process */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <Container className="relative z-10">
          <SectionHeader
            label={chrome.hiringLabel}
            title={chrome.hiringTitle}
            description={chrome.hiringDescription}
          />

          <div className="max-w-4xl mx-auto relative">
            {/* Vertical connector line */}
            <div
              className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-brand/20 via-accent-cyan/15 to-accent-violet/15 hidden sm:block"
              aria-hidden="true"
            />

            <StaggerContainer className="space-y-6" staggerDelay={0.06}>
              {hiringSteps.map((step) => {
                const StepIcon = step.icon;
                return (
                  <StaggerItem key={step.number}>
                    <div className="flex gap-5 md:gap-6 items-start">
                      {/* Step number + icon */}
                      <div className="shrink-0 relative z-10">
                        <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-card-bg border border-card-border shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]">
                          <StepIcon size={22} className="text-brand" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-2">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <span className="text-xs font-bold text-brand bg-brand/10 px-2.5 py-1 rounded-full">
                            {chrome.stepLabel} {step.number}
                          </span>
                          <h3 className="text-lg md:text-xl font-bold text-foreground">
                            {step.title[lang]}
                          </h3>
                          <span className="ml-auto text-xs font-medium text-foreground-muted bg-background-muted px-3 py-1 rounded-full whitespace-nowrap hidden sm:inline-block">
                            {step.timeline[lang]}
                          </span>
                        </div>
                        <p className="text-foreground-secondary leading-relaxed mt-1">
                          {step.description[lang]}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden">
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
                <Button
                  href={`mailto:${CONTACT.email}?subject=General Application`}
                  size="lg"
                >
                  <Mail size={18} />
                  {chrome.sendResume}
                </Button>
                <Button href="/contact" variant="secondary" size="lg">
                  {chrome.contactUs} <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
