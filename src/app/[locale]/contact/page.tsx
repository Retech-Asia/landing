import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MessageSquare, FileText, Video, Hash, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import Image from "next/image";
import { CompositeSectionBackground } from "@/components/ui/SectionBackground";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "./ContactForm";
import { CONTACT, SITE_NAME, SITE_URL } from "@/lib/constants";
import { ProjectEstimator } from "@/components/ui/ProjectEstimator";
import { ContactPageLocalBusinessJsonLd, BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";
import { LocationMap } from "@/components/ui/LocationMap";
import { ContactInfoCard } from "@/components/ui/ContactInfoCard";
import { buildPageMetadata } from "@/lib/page-metadata";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({ locale, path: "/contact", namespace: "pages.contact" });
}

// Resolve chrome strings by locale — inline EN | VI bundles, same pattern
// as the process page. JSON-LD strings intentionally stay EN.
function getChrome(locale: string) {
  const isEn = locale === "en";
  return isEn
    ? {
        breadcrumbHome: "Home",
        breadcrumbContact: "Contact",
        heroEyebrow: "Contact",
        heroTitle: "Get In Touch",
        heroLead:
          "Have a project in mind? We'd love to hear about it. Fill out the form below and our team will get back to you within one business day.",
        expectTitle: "What to Expect",
        estimatorLabel: "Estimator",
        estimatorTitle: "Estimate Your Project",
        estimatorDescription:
          "Get a quick ballpark estimate based on your project type, scope, and team size.",
        sendMessageTitle: "Send Us a Message",
        contactFormAria: "Contact form",
        teamAlt: "Retech Solutions team ready to discuss your project",
        teamCaption: "Let's build something together",
        infoEmailDesc: "For project inquiries and partnerships",
        infoResponseLabel: "Email",
        infoResponseDesc: "Replies within one business day",
        infoEmailAction: "Email us",
        addressLabel: "Address",
        addressDesc: "Vo Thi Sau Ward, Ho Chi Minh City",
        mapsAction: "Open in Google Maps",
        quickTitle: "Quick Response Guaranteed",
        quickBody:
          "We respond to all inquiries within one business day. Email is the fastest channel — we monitor it throughout the day.",
        quickButton: "Email Us",
        connectLabel: "Connect",
        connectTitle: "Other Ways to Connect",
        connectDescription:
          "Prefer a different channel? Reach out however works best for you.",
        exploreLabel: "Explore",
        exploreTitle: "Learn More Before You Reach Out",
        exploreDescription:
          "Want to understand our capabilities or process before your first consultation?",
        learnMore: "Learn more",
      }
    : {
        breadcrumbHome: "Trang chủ",
        breadcrumbContact: "Liên hệ",
        heroEyebrow: "Liên hệ",
        heroTitle: "Liên hệ với chúng tôi",
        heroLead:
          "Bạn đang có ý tưởng dự án? Chúng tôi rất muốn được lắng nghe. Điền vào biểu mẫu bên dưới và đội ngũ của chúng tôi sẽ phản hồi trong vòng một ngày làm việc.",
        expectTitle: "Những gì sẽ diễn ra",
        estimatorLabel: "Dự toán",
        estimatorTitle: "Dự toán Dự án của Bạn",
        estimatorDescription:
          "Nhận mức ước tính nhanh dựa trên loại dự án, phạm vi và quy mô đội ngũ.",
        sendMessageTitle: "Gửi tin nhắn cho chúng tôi",
        contactFormAria: "Biểu mẫu liên hệ",
        teamAlt: "Đội ngũ Retech Solutions sẵn sàng trao đổi về dự án của bạn",
        teamCaption: "Hãy cùng nhau xây dựng",
        infoEmailDesc: "Dành cho yêu cầu dự án và hợp tác",
        infoResponseLabel: "Email",
        infoResponseDesc: "Phản hồi trong vòng một ngày làm việc",
        infoEmailAction: "Gửi email",
        addressLabel: "Địa chỉ",
        addressDesc: "Phường Võ Thị Sáu, TP. Hồ Chí Minh",
        mapsAction: "Mở trong Google Maps",
        quickTitle: "Cam kết Phản hồi Nhanh",
        quickBody:
          "Chúng tôi phản hồi mọi yêu cầu trong vòng một ngày làm việc. Email là kênh nhanh nhất — chúng tôi theo dõi thường xuyên trong ngày.",
        quickButton: "Gửi email",
        connectLabel: "Kết nối",
        connectTitle: "Các Kênh Kết nối Khác",
        connectDescription:
          "Bạn muốn dùng kênh khác? Hãy liên hệ theo cách thuận tiện nhất cho bạn.",
        exploreLabel: "Khám phá",
        exploreTitle: "Tìm hiểu Trước khi Liên hệ",
        exploreDescription:
          "Muốn tìm hiểu về năng lực hoặc quy trình của chúng tôi trước buổi tư vấn đầu tiên?",
        learnMore: "Tìm hiểu thêm",
      };
}

function getWhatToExpectItems(isEn: boolean) {
  return [
    {
      step: 1,
      icon: Mail,
      color: "text-brand",
      bg: "bg-brand/10",
      title: isEn ? "Quick Response" : "Phản hồi Nhanh",
      description: isEn
        ? "We respond to all inquiries within one business day."
        : "Chúng tôi phản hồi mọi yêu cầu trong vòng một ngày làm việc.",
    },
    {
      step: 2,
      icon: MessageSquare,
      color: "text-accent-cyan",
      bg: "bg-accent-cyan/10",
      title: isEn ? "Free Consultation" : "Tư vấn Miễn phí",
      description: isEn
        ? "No commitment required. We'll discuss your project scope, timeline, and the best approach."
        : "Không cần cam kết. Chúng tôi sẽ trao đổi về phạm vi dự án, thời gian và cách tiếp cận phù hợp.",
    },
    {
      step: 3,
      icon: FileText,
      color: "text-accent-violet",
      bg: "bg-accent-violet/10",
      title: isEn ? "Tailored Proposal" : "Đề xuất Riêng cho Bạn",
      description: isEn
        ? "You'll receive a detailed proposal with team composition, technology choices, and transparent pricing."
        : "Bạn sẽ nhận được đề xuất chi tiết gồm thành phần đội ngũ, lựa chọn công nghệ và giá minh bạch.",
    },
  ];
}

function getCommunicationChannels(isEn: boolean) {
  return [
    {
      icon: Mail,
      color: "text-brand",
      bg: "bg-brand/10",
      title: isEn ? "Email Us" : "Gửi email",
      detail: CONTACT.email,
      description: isEn
        ? "For project inquiries and partnerships"
        : "Dành cho yêu cầu dự án và hợp tác",
      href: CONTACT.emailHref,
    },
    {
      icon: Clock,
      color: "text-accent-cyan",
      bg: "bg-accent-cyan/10",
      title: isEn ? "Response Time" : "Thời gian Phản hồi",
      detail: isEn ? "< 1 business day" : "< 1 ngày làm việc",
      description: isEn
        ? "We reply to every inquiry within one business day"
        : "Chúng tôi phản hồi mọi yêu cầu trong vòng một ngày làm việc",
      href: CONTACT.emailHref,
    },
    {
      icon: MessageSquare,
      color: "text-accent-violet",
      bg: "bg-accent-violet/10",
      title: isEn ? "Live Chat" : "Trò chuyện Trực tuyến",
      detail: "retech.asia",
      description: isEn
        ? "In-app live chat, fastest response (business hours, GMT+7)"
        : "Trò chuyện trực tiếp trên website, phản hồi nhanh nhất (giờ hành chính, GMT+7)",
      href: "/contact",
    },
    {
      icon: Video,
      color: "text-brand",
      bg: "bg-brand/10",
      title: isEn ? "Zoom Meeting" : "Họp qua Zoom",
      detail: isEn ? "Schedule a video call" : "Đặt lịch gọi video",
      description: isEn
        ? "Face-to-face consultation anywhere"
        : "Tư vấn trực tiếp ở mọi nơi",
      href: `mailto:${CONTACT.email}?subject=Zoom%20Meeting%20Request`,
    },
  ];
}

function getQuickLinks(isEn: boolean) {
  return [
    {
      href: "/services",
      label: isEn ? "Our Services" : "Dịch vụ của chúng tôi",
      desc: isEn
        ? "CMS, CRM, ERP, web development, UI/UX, and dedicated teams."
        : "CMS, CRM, ERP, phát triển web, UI/UX và đội ngũ chuyên trách.",
    },
    {
      href: "/process",
      label: isEn ? "Our Process" : "Quy trình của chúng tôi",
      desc: isEn
        ? "How we deliver projects from discovery to deployment."
        : "Cách chúng tôi thực hiện dự án từ khám phá đến triển khai.",
    },
    {
      href: "/case-studies",
      label: isEn ? "Case Studies" : "Dự án",
      desc: isEn
        ? "Real results from projects we have delivered."
        : "Kết quả thực tế từ các dự án chúng tôi đã bàn giao.",
    },
    {
      href: "/technologies",
      label: isEn ? "Technologies" : "Công nghệ",
      desc: isEn
        ? "The tools and frameworks we work with."
        : "Các công cụ và framework chúng tôi sử dụng.",
    },
  ];
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = getChrome(locale);
  const isEn = locale === "en";
  const whatToExpectItems = getWhatToExpectItems(isEn);
  const communicationChannels = getCommunicationChannels(isEn);
  const quickLinks = getQuickLinks(isEn);
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Structured Data */}
      <ContactPageLocalBusinessJsonLd locale={locale} />
      <WebPageJsonLd
        title="Contact Us | Retech Solutions"
        description="Ready to build? Contact Retech Solutions for a free consultation on custom CMS, CRM, ERP & AI software. Response within 24 hours."
        url={`${SITE_URL}/${locale}/contact`}
        type="ContactPage"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE_URL}/${locale}` },
          { name: "Contact", url: `${SITE_URL}/${locale}/contact` },
        ]}
      />

      {/* Premium background: aurora mesh + grid fade (replaces old blur orbs) */}
      <CompositeSectionBackground layers={["aurora", "grid-fade"]} grain />

      <Container className="relative z-10">
        <BreadcrumbNav
          items={[
            { label: c.breadcrumbHome, href: "/" },
            { label: c.breadcrumbContact },
          ]}
        />

        <div className="page-hero-enter">
          <p className="text-sm font-medium tracking-widest uppercase text-brand mb-3 text-center">{c.heroEyebrow}</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance text-center mx-auto">
            {c.heroTitle}
          </h1>
          <p className="mt-4 text-lg text-foreground-secondary leading-relaxed max-w-3xl text-center mx-auto">
            {c.heroLead}
          </p>
        </div>

        {/* What to Expect */}
        <AnimatedSection variant="slideUp" delay={0.05}>
          <h2 className="text-base font-semibold text-foreground mb-5">{c.expectTitle}</h2>
        </AnimatedSection>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-14">
          {whatToExpectItems.map(({ step, icon: Icon, color, bg, title, description }) => (
            <StaggerItem key={title}>
              <div className="flex flex-col items-start gap-4 p-6 rounded-xl bg-card-bg border border-card-border">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-dark text-white text-xs font-bold">
                    {step}
                  </span>
                  <div className={`p-2 rounded-lg ${bg}`}>
                    <Icon size={18} className={color} strokeWidth={1.75} />
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-foreground">
                  {title}
                </h3>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Project Estimator */}
        <AnimatedSection variant="slideUp" delay={0.1} className="mb-12 md:mb-14">
          <SectionHeader
            label={c.estimatorLabel}
            title={c.estimatorTitle}
            description={c.estimatorDescription}
          />
          <ProjectEstimator />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-10">
          {/* Form — takes 3 of 5 Columns */}
          <AnimatedSection
            variant="slideRight"
            delay={0.1}
            className="lg:col-span-3"
          >
            <div className="relative rounded-2xl overflow-hidden">
              {/* Gradient background layer behind the card */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-brand/[0.03] via-transparent to-accent-cyan/[0.03] pointer-events-none"
                aria-hidden="true"
              />
              {/* Subtle inner glow */}
              <div
                className="absolute -top-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent"
                aria-hidden="true"
              />

              <Card hover={false} padding="lg" className="relative bg-card-bg backdrop-blur-sm border-card-border">
                <h2 className="text-lg font-semibold text-foreground mb-6">
                  {c.sendMessageTitle}
                </h2>
                {/* Accessible container for form/success state transitions */}
                <div
                  role="region"
                  aria-label={c.contactFormAria}
                  aria-live="polite"
                >
                  <ContactForm />
                </div>
              </Card>
            </div>
          </AnimatedSection>

          {/* Info sidebar — takes 2 of 5 Columns */}
          <AnimatedSection
            variant="slideLeft"
            delay={0.15}
            className="lg:col-span-2 space-y-5"
          >
            {/* Team photo — adds human element to the contact page */}
            <div className="relative h-44 rounded-2xl overflow-hidden">
              <Image
                src="/images/stock/team-meeting.webp"
                alt={c.teamAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <p className="absolute bottom-3 left-4 text-sm font-medium text-white">
                {c.teamCaption}
              </p>
            </div>

            {/* Location Map */}
            <LocationMap />

            {/* Contact Method Cards */}
            <div className="space-y-3">
              <ContactInfoCard
                iconName="mail"
                iconBg="bg-brand/10"
                iconColor="text-brand"
                label="Email"
                value={CONTACT.email}
                description={c.infoEmailDesc}
                action={{ type: "copy" }}
              />
              <ContactInfoCard
                iconName="phone"
                iconBg="bg-accent-cyan/10"
                iconColor="text-accent-cyan"
                label={c.infoResponseLabel}
                value={CONTACT.email}
                description={c.infoResponseDesc}
                action={{ type: "link", href: CONTACT.emailHref, label: c.infoEmailAction }}
              />
              <ContactInfoCard
                iconName="mapPin"
                iconBg="bg-accent-violet/10"
                iconColor="text-accent-violet"
                label={c.addressLabel}
                value={CONTACT.address}
                description={c.addressDesc}
                action={{
                  type: "map",
                  href: CONTACT.mapUrl,
                  label: c.mapsAction,
                }}
              />
            </div>

            {/* Quick Response CTA */}
            <Card hover={false} padding="md" className="bg-brand-dark text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 rounded-full blur-3xl" aria-hidden="true" />
              <div className="relative">
                <h3 className="text-base font-semibold mb-2">
                  {c.quickTitle}
                </h3>
                <p className="text-sm text-white/60 mb-4">
                  {c.quickBody}
                </p>
                <Button
                  variant="secondary"
                  href={CONTACT.emailHref}
                  size="sm"
                >
                  <Mail size={14} />
                  {c.quickButton}
                </Button>
              </div>
            </Card>
          </AnimatedSection>
        </div>

        {/* Other Ways to Connect */}
        <AnimatedSection variant="slideUp" delay={0.1} className="mt-16 md:mt-20">
          <SectionHeader
            label={c.connectLabel}
            title={c.connectTitle}
            description={c.connectDescription}
          />
        </AnimatedSection>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {communicationChannels.map(({ icon: Icon, color, bg, title, detail, description, href }) => (
            <StaggerItem key={title}>
              <a
                href={href}
                className="flex flex-col items-start gap-4 p-6 rounded-xl bg-card-bg border border-card-border transition-all duration-300 hover:border-brand/15 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={`${title}: ${detail}. ${description}`}
              >
                <div className={`p-2.5 rounded-lg ${bg}`} aria-hidden="true">
                  <Icon size={20} className={color} strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    {title}
                  </h3>
                  <p className="text-sm font-medium text-brand mb-1">
                    {detail}
                  </p>
                  <p className="text-xs text-foreground-secondary leading-relaxed">
                    {description}
                  </p>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Quick Links: Services & Process */}
        <AnimatedSection variant="slideUp" delay={0.1} className="mt-16 md:mt-20">
          <SectionHeader
            label={c.exploreLabel}
            title={c.exploreTitle}
            description={c.exploreDescription}
          />
        </AnimatedSection>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {quickLinks.map((link) => (
            <StaggerItem key={link.href}>
              <Link
                href={link.href}
                className="group flex flex-col gap-3 p-6 rounded-xl bg-card-bg border border-card-border transition-all duration-300 hover:border-brand/15 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
              >
                <h3 className="text-sm font-semibold text-foreground group-hover:text-brand transition-colors">
                  {link.label}
                </h3>
                <p className="text-xs text-foreground-secondary leading-relaxed">
                  {link.desc}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-brand mt-auto">
                  {c.learnMore} <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
