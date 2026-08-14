"use client";

import {
  Code2,
  Zap,
  DollarSign,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { useLocale } from "next-intl";

interface LocaleText {
  en: string;
  vi: string;
}

interface Differentiator {
  icon: LucideIcon;
  title: LocaleText;
  description: LocaleText;
  color: string;
  bgColor: string;
}

const differentiators: Differentiator[] = [
  {
    icon: Code2,
    title: { en: "Technical Excellence", vi: "Năng lực kỹ thuật" },
    description: {
      en: "Our engineers bring deep expertise in modern stacks: React, Next.js, Node.js, Python, and cloud-native architectures. Every solution is built on proven best practices with clean, maintainable code.",
      vi: "Các kỹ sư của chúng tôi có chuyên môn sâu về các stack hiện đại: React, Next.js, Node.js, Python và kiến trúc cloud-native. Mọi giải pháp đều được xây dựng trên thông lệ đã kiểm chứng với code sạch, dễ bảo trì.",
    },
    color: "text-brand",
    bgColor: "bg-brand/10",
  },
  {
    icon: Zap,
    title: { en: "Agile Approach", vi: "Phương pháp agile" },
    description: {
      en: "Short sprints, continuous delivery, and transparent progress tracking. We adapt to changing requirements quickly, keeping your project on track and your stakeholders informed at every step.",
      vi: "Sprint ngắn, bàn giao liên tục và theo dõi tiến độ minh bạch. Chúng tôi thích ứng nhanh với thay đổi yêu cầu, giữ dự án của bạn đúng tiến độ và các bên liên quan luôn nắm rõ thông tin ở từng bước.",
    },
    color: "text-accent-cyan",
    bgColor: "bg-accent-cyan/10",
  },
  {
    icon: DollarSign,
    title: { en: "Cost Efficiency", vi: "Hiệu quả chi phí" },
    description: {
      en: "Vietnam-based operations mean competitive rates without compromising quality. We deliver enterprise-grade solutions at a fraction of the cost of onshore or Western European development teams.",
      vi: "Vận hành tại Việt Nam giúp mức chi phí cạnh tranh mà không phải đánh đổi chất lượng. Chúng tôi bàn giao giải pháp cấp doanh nghiệp với chi phí chỉ bằng một phần so với đội ngũ onshore hay Tây Âu.",
    },
    color: "text-accent-violet",
    bgColor: "bg-accent-violet/10",
  },
  {
    icon: HeartHandshake,
    title: { en: "Cultural Alignment", vi: "Tương thích văn hóa" },
    description: {
      en: "We understand Western business culture and communication styles. Fluent English proficiency, overlapping working hours, and a collaborative mindset ensure seamless integration with your team.",
      vi: "Chúng tôi hiểu văn hóa và phong cách giao tiếp phương Tây. Khả năng tiếng Anh lưu loát, giờ làm việc trùng lặp và tư duy hợp tác đảm bảo tích hợp trơn tru với đội ngũ của bạn.",
    },
    color: "text-brand",
    bgColor: "bg-brand/10",
  },
];

export function WhatSetsUsApart() {
  const locale = useLocale() as "en" | "vi";
  const isEn = locale === "en";
  const pick = (text: LocaleText) => (isEn ? text.en : text.vi);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <Container>
        <AnimatedSection>
          <SectionHeader
            label={isEn ? "Why Retech" : "Vì sao chọn Retech"}
            title={isEn ? "What Sets Us Apart" : "Điểm khác biệt của chúng tôi"}
            description={
              isEn
                ? "Four pillars that define how we work and why our clients stay with us for the long haul."
                : "Bốn trụ cột định hình cách chúng tôi làm việc và lý do khách hàng gắn bó lâu dài."
            }
          />
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title.en}>
                <div className="group relative h-full rounded-2xl bg-card-bg border border-card-border shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] hover:border-brand/15 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 p-6 md:p-8">
                  {/* Number badge */}
                  <div className="absolute top-6 right-6 md:top-8 md:right-8">
                    <span className="text-xs font-bold text-foreground-muted/40">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-11 h-11 rounded-xl ${item.bgColor} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon size={20} className={item.color} strokeWidth={2} />
                  </div>

                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {pick(item.title)}
                  </h3>

                  <p className="text-sm text-foreground-secondary leading-relaxed">
                    {pick(item.description)}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Container>
    </section>
  );
}
