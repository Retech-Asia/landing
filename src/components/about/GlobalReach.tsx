"use client";

import { Globe, MapPin, Building2, Clock, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { useLocale } from "next-intl";
import { CONTACT } from "@/lib/constants";

interface LocaleText {
  en: string;
  vi: string;
}

interface Region {
  name: LocaleText;
  description: LocaleText;
  markets: { en: string; vi: string }[];
  accent: string;
  accentBg: string;
}

const regions: Region[] = [
  {
    name: { en: "Asia Pacific", vi: "Châu Á – Thái Bình Dương" },
    description: {
      en: "Our home region and primary market, with deep connections across Southeast Asia and growing partnerships in East Asia and Australia.",
      vi: "Khu vực quê hương và thị trường chính của chúng tôi, với mối liên kết sâu rộng khắp Đông Nam Á và các đối tác ngày càng tăng tại Đông Á và Úc.",
    },
    markets: [
      { en: "Vietnam", vi: "Việt Nam" },
      { en: "Singapore", vi: "Singapore" },
      { en: "Japan", vi: "Nhật Bản" },
      { en: "Australia", vi: "Úc" },
    ],
    accent: "text-brand",
    accentBg: "bg-brand/10",
  },
  {
    name: { en: "North America", vi: "Bắc Mỹ" },
    description: {
      en: "Delivering software solutions for US and Canadian businesses, with an emphasis on timezone-aligned communication and agile collaboration.",
      vi: "Bàn giao giải pháp phần mềm cho doanh nghiệp Mỹ và Canada, chú trọng giao tiếp phù hợp múi giờ và hợp tác theo phương pháp agile.",
    },
    markets: [
      { en: "United States", vi: "Hoa Kỳ" },
      { en: "Canada", vi: "Canada" },
    ],
    accent: "text-accent-cyan",
    accentBg: "bg-accent-cyan/10",
  },
  {
    name: { en: "Europe", vi: "Châu Âu" },
    description: {
      en: "Supporting European enterprises with scalable development capacity, complying with data standards and multilingual project requirements.",
      vi: "Hỗ trợ doanh nghiệp châu Âu với năng lực phát triển dễ mở rộng, tuân thủ tiêu chuẩn dữ liệu và yêu cầu dự án đa ngôn ngữ.",
    },
    markets: [
      { en: "United Kingdom", vi: "Vương quốc Anh" },
      { en: "Germany", vi: "Đức" },
      { en: "Netherlands", vi: "Hà Lan" },
    ],
    accent: "text-accent-violet",
    accentBg: "bg-accent-violet/10",
  },
];

export function GlobalReach() {
  const locale = useLocale() as "en" | "vi";
  const isEn = locale === "en";
  const pick = (text: LocaleText) => (isEn ? text.en : text.vi);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <Container>
        <AnimatedSection>
          <SectionHeader
            label={isEn ? "Global Reach" : "Phạm vi toàn cầu"}
            title={isEn ? "Serving Clients Worldwide" : "Phục vụ khách hàng toàn cầu"}
            description={
              isEn
                ? "From our base in Ho Chi Minh City, we collaborate with businesses across three continents, delivering quality software regardless of borders."
                : "Từ trụ sở tại Thành phố Hồ Chí Minh, chúng tôi hợp tác với doanh nghiệp trên ba châu lục, bàn giao phần mềm chất lượng không bị giới hạn bởi biên giới."
            }
          />
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {regions.map((region) => (
            <StaggerItem key={region.name.en}>
              <div className="group relative h-full rounded-2xl bg-card-bg border border-card-border shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] hover:border-brand/15 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 p-6 md:p-8 overflow-hidden">
                {/* Region icon */}
                <div
                  className={`w-12 h-12 rounded-xl ${region.accentBg} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}
                >
                  <Globe size={22} className={region.accent} strokeWidth={2} />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2">
                  {pick(region.name)}
                </h3>

                <p className="text-sm text-foreground-secondary leading-relaxed mb-5">
                  {pick(region.description)}
                </p>

                {/* Market tags */}
                <div className="flex flex-wrap gap-2">
                  {region.markets.map((market) => (
                    <span
                      key={market.en}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/[0.03] text-xs font-medium text-foreground-muted"
                    >
                      <MapPin size={10} className="shrink-0" />
                      {pick(market)}
                    </span>
                  ))}
                </div>

                {/* Decorative corner accent */}
                <div
                  className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full ${region.accentBg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
                  aria-hidden="true"
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Office Location */}
        <AnimatedSection variant="slideUp" delay={0.15}>
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="rounded-2xl bg-card-bg border border-card-border shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                {/* Map pin visual */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand/10 shrink-0">
                    <Building2 size={22} className="text-brand" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {isEn ? "Our Office" : "Văn phòng của chúng tôi"}
                    </h3>
                    <p className="text-sm text-foreground-secondary leading-relaxed">
                      {CONTACT.address}
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-sm text-foreground-muted">
                      <Clock size={14} className="shrink-0" />
                      <span>
                        {isEn
                          ? "Mon – Fri, 9:00 AM – 6:00 PM (ICT / UTC+7)"
                          : "Thứ Hai – Thứ Sáu, 9:00 – 18:00 (ICT / UTC+7)"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact details */}
                <div className="flex flex-col gap-2 md:border-l md:border-card-border md:pl-8">
                  <a
                    href={CONTACT.emailHref}
                    className="flex items-center gap-2 text-sm text-foreground-secondary hover:text-brand transition-colors"
                  >
                    <Mail size={14} className="shrink-0" />
                    {CONTACT.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
