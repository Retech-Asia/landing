"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { GlassIcon, type GlassIconName } from "@/components/ui/GlassIcon";
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
  /** ReTech Glass kit pictogram (glass round 2026-10-23) — replaces the
   * per-value lucide strokes and the pulse-ring entrance (kit law: the
   * tiles carry the visual identity; the cards already stagger in). */
  glass: GlassIconName;
  title: LocaleText;
  description: LocaleText;
}

const values: ValueItem[] = [
  {
    glass: "ai-ml",
    title: { en: "Innovation", vi: "Đổi mới" },
    description: {
      en: "We integrate AI, machine learning, and modern cloud-native patterns into real products, not just prototypes. When we adopted AI-assisted workflows in 2024, every CMS, CRM, and ERP we shipped afterward benefited from automated content tagging, predictive analytics, and smarter data pipelines.",
      vi: "Chúng tôi tích hợp AI, machine learning và các mô hình cloud-native hiện đại vào sản phẩm thực tế, không chỉ dừng ở nguyên mẫu. Từ khi áp dụng quy trình hỗ trợ bởi AI năm 2024, mọi hệ thống CMS, CRM và ERP chúng tôi bàn giao đều được hưởng lợi từ gắn thẻ nội dung tự động, phân tích dự đoán và pipeline dữ liệu thông minh hơn.",
    },
  },
  {
    glass: "quality",
    title: { en: "Quality", vi: "Chất lượng" },
    description: {
      en: "We do not ship code that has not been reviewed by at least two senior engineers and validated by automated test suites. One bug in production is one too many for the clients who trust us with their business systems.",
      vi: "Chúng tôi không bàn giao code chưa được ít nhất hai kỹ sư cấp cao rà soát và kiểm chứng bằng bộ kiểm thử tự động. Một lỗi trong môi trường sản xuất là một lỗi quá nhiều đối với khách hàng tin tưởng giao hệ thống kinh doanh của họ cho chúng tôi.",
    },
  },
  {
    glass: "partnership",
    title: { en: "Collaboration", vi: "Hợp tác" },
    description: {
      en: "Great software is built together. We foster open teamwork between our engineers, designers, and your stakeholders to ensure every voice shapes the final product.",
      vi: "Phần mềm tốt được xây dựng bằng sự cùng làm việc. Chúng tôi đề cao tinh thần làm việc nhóm cởi mở giữa kỹ sư, nhà thiết kế và các bên liên quan của bạn để mọi ý kiến đều góp phần định hình sản phẩm cuối cùng.",
    },
  },
  {
    glass: "transparency",
    title: { en: "Transparency", vi: "Minh bạch" },
    description: {
      en: "Open communication is the foundation of every partnership. We provide clear timelines, honest progress updates, and direct access to our team throughout every project.",
      vi: "Giao tiếp cởi mở là nền tảng của mọi sự hợp tác. Chúng tôi cung cấp tiến độ rõ ràng, cập nhật trung thực và truy cập trực tiếp đội ngũ trong suốt dự án.",
    },
  },
  {
    glass: "growth",
    title: { en: "Growth", vi: "Tăng trưởng" },
    description: {
      en: "We invest in continuous learning, technical training, and knowledge sharing across the team. Every engineer at Retech has dedicated learning time each week, because we believe that growing our people is the most reliable way to grow our clients' products.",
      vi: "Chúng tôi đầu tư vào việc học liên tục, đào tạo kỹ thuật và chia sẻ kiến thức trong toàn đội. Mỗi kỹ sư tại Retech đều có thời gian học tập riêng mỗi tuần, vì chúng tôi tin rằng phát triển con người là cách đáng tin cậy nhất để phát triển sản phẩm của khách hàng.",
    },
  },
  {
    glass: "performance",
    title: { en: "Excellence", vi: "Chuẩn mực cao" },
    description: {
      en: "We hold ourselves to a high bar: clean architecture, thorough code reviews, automated testing, and proactive communication. Not because a process document says so, but because our engineers genuinely care about the craft of building software that lasts.",
      vi: "Chúng tôi tự đặt ra chuẩn mực cao: kiến trúc sạch, rà soát code kỹ lưỡng, kiểm thử tự động và giao tiếp chủ động. Không phải vì tài liệu quy trình yêu cầu, mà vì các kỹ sư của chúng tôi thực sự trân trọng nghề xây dựng phần mềm bền vững.",
    },
  },
];

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
            return (
              <StaggerItem key={value.title.en}>
                <Card padding="lg" className="h-full gradient-border">
                  <GlassIcon name={value.glass} size="md" />
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
