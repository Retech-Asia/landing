"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import {
  Lightbulb,
  Shield,
  Eye,
  Users,
  TrendingUp,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
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

interface ValueItem {
  icon: LucideIcon;
  title: LocaleText;
  description: LocaleText;
  color: string;
  bgColor: string;
}

const values: ValueItem[] = [
  {
    icon: Lightbulb,
    title: { en: "Innovation", vi: "Đổi mới" },
    description: {
      en: "We integrate AI, machine learning, and modern cloud-native patterns into real products, not just prototypes. When we adopted AI-assisted workflows in 2024, every CMS, CRM, and ERP we shipped afterward benefited from automated content tagging, predictive analytics, and smarter data pipelines.",
      vi: "Chúng tôi tích hợp AI, machine learning và các mô hình cloud-native hiện đại vào sản phẩm thực tế, không chỉ dừng ở nguyên mẫu. Từ khi áp dụng quy trình hỗ trợ bởi AI năm 2024, mọi hệ thống CMS, CRM và ERP chúng tôi bàn giao đều được hưởng lợi từ gắn thẻ nội dung tự động, phân tích dự đoán và pipeline dữ liệu thông minh hơn.",
    },
    color: "text-brand",
    bgColor: "bg-brand/10",
  },
  {
    icon: Shield,
    title: { en: "Quality", vi: "Chất lượng" },
    description: {
      en: "We do not ship code that has not been reviewed by at least two senior engineers and validated by automated test suites. Our QA process caught 0.3% defect rates across 50+ projects, because one bug in production is one too many for the clients who trust us with their business systems.",
      vi: "Chúng tôi không bàn giao code chưa được ít nhất hai kỹ sư cấp cao rà soát và kiểm chứng bằng bộ kiểm thử tự động. Quy trình QA của chúng tôi duy trì tỷ lệ lỗi 0,3% trên hơn 50 dự án, bởi một lỗi trong môi trường sản xuất là một lỗi quá nhiều đối với khách hàng tin tưởng giao hệ thống kinh doanh của họ cho chúng tôi.",
    },
    color: "text-accent-cyan",
    bgColor: "bg-accent-cyan/10",
  },
  {
    icon: Users,
    title: { en: "Collaboration", vi: "Hợp tác" },
    description: {
      en: "Great software is built together. We foster open teamwork between our engineers, designers, and your stakeholders to ensure every voice shapes the final product.",
      vi: "Phần mềm tốt được xây dựng bằng sự cùng làm việc. Chúng tôi đề cao tinh thần làm việc nhóm cởi mở giữa kỹ sư, nhà thiết kế và các bên liên quan của bạn để mọi ý kiến đều góp phần định hình sản phẩm cuối cùng.",
    },
    color: "text-accent-violet",
    bgColor: "bg-accent-violet/10",
  },
  {
    icon: Eye,
    title: { en: "Transparency", vi: "Minh bạch" },
    description: {
      en: "Open communication is the foundation of every partnership. We provide clear timelines, honest progress updates, and direct access to our team throughout every project.",
      vi: "Giao tiếp cởi mở là nền tảng của mọi sự hợp tác. Chúng tôi cung cấp tiến độ rõ ràng, cập nhật trung thực và truy cập trực tiếp đội ngũ trong suốt dự án.",
    },
    color: "text-brand",
    bgColor: "bg-brand/10",
  },
  {
    icon: TrendingUp,
    title: { en: "Growth", vi: "Tăng trưởng" },
    description: {
      en: "We invest in continuous learning, technical training, and knowledge sharing across the team. Every engineer at Retech has dedicated learning time each week, because we believe that growing our people is the most reliable way to grow our clients' products.",
      vi: "Chúng tôi đầu tư vào việc học liên tục, đào tạo kỹ thuật và chia sẻ kiến thức trong toàn đội. Mỗi kỹ sư tại Retech đều có thời gian học tập riêng mỗi tuần, vì chúng tôi tin rằng phát triển con người là cách đáng tin cậy nhất để phát triển sản phẩm của khách hàng.",
    },
    color: "text-accent-cyan",
    bgColor: "bg-accent-cyan/10",
  },
  {
    icon: Sparkles,
    title: { en: "Excellence", vi: "Chuẩn mực cao" },
    description: {
      en: "We hold ourselves to a high bar: clean architecture, thorough code reviews, automated testing, and proactive communication. Not because a process document says so, but because our engineers genuinely care about the craft of building software that lasts.",
      vi: "Chúng tôi tự đặt ra chuẩn mực cao: kiến trúc sạch, rà soát code kỹ lưỡng, kiểm thử tự động và giao tiếp chủ động. Không phải vì tài liệu quy trình yêu cầu, mà vì các kỹ sư của chúng tôi thực sự trân trọng nghề xây dựng phần mềm bền vững.",
    },
    color: "text-accent-violet",
    bgColor: "bg-accent-violet/10",
  },
];

function AnimatedIcon({
  icon: Icon,
  color,
  bgColor,
}: {
  icon: LucideIcon;
  color: string;
  bgColor: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative w-12 h-12">
      {/* Pulse ring — expands outward when visible */}
      <div
        className={`absolute inset-0 rounded-xl ${bgColor}`}
        style={{
          transform: isInView ? "scale(2)" : "scale(0.8)",
          opacity: isInView ? 0 : 0.6,
          transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />
      {/* Second pulse ring — delayed for layered effect */}
      <div
        className={`absolute inset-0 rounded-xl ${bgColor}`}
        style={{
          transform: isInView ? "scale(2.5)" : "scale(0.8)",
          opacity: isInView ? 0 : 0.4,
          transition: "transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s, opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s",
        }}
      />
      {/* Icon container — bounces in */}
      <div
        className={`relative w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center`}
        style={{
          transform: isInView ? "scale(1)" : "scale(0.6)",
          opacity: isInView ? 1 : 0,
          transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s, opacity 0.5s ease 0.1s",
        }}
      >
        <Icon size={24} className={color} />
      </div>
    </div>
  );
}

export function CultureValues() {
  const locale = useLocale() as "en" | "vi";
  const pick = (text: LocaleText) => (locale === "vi" ? text.vi : text.en);

  return (
    <section className="py-20 md:py-28 bg-background-subtle relative overflow-hidden">
      <Container>
        <AnimatedSection>
          <SectionHeader
            title={
              locale === "vi"
                ? "Điều gì thúc đẩy chúng tôi"
                : "What Drives Us"
            }
            description={
              locale === "vi"
                ? "Các giá trị cốt lõi định hình mọi dự án chúng tôi thực hiện và mọi mối quan hệ chúng tôi xây dựng."
                : "Our core values shape every project we take on and every relationship we build."
            }
          />
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <StaggerItem key={value.title.en}>
                <Card padding="lg" className="h-full gradient-border">
                  <AnimatedIcon
                    icon={Icon}
                    color={value.color}
                    bgColor={value.bgColor}
                  />
                  <h3 className="text-base font-semibold text-foreground mb-2 mt-4">
                    {pick(value.title)}
                  </h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed">
                    {pick(value.description)}
                  </p>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Container>
    </section>
  );
}
