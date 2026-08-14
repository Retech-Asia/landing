"use client";

import {
  Code2,
  MessageSquare,
  Clock,
  Handshake,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { useLocale } from "next-intl";

interface LocaleText {
  en: string;
  vi: string;
}

interface CommitmentItem {
  icon: LucideIcon;
  title: LocaleText;
  description: LocaleText;
  color: string;
  bgColor: string;
}

const commitments: CommitmentItem[] = [
  {
    icon: Code2,
    title: { en: "Quality Code", vi: "Chất lượng code" },
    description: {
      en: "Clean, maintainable, and well-tested code that follows industry best practices. We write software that is built to last and easy for any team to extend.",
      vi: "Code sạch, dễ bảo trì và được kiểm thử kỹ lưỡng, tuân theo các thông lệ chuẩn của ngành. Chúng tôi viết phần mềm được xây dựng để bền lâu và dễ dàng cho bất kỳ đội ngũ nào mở rộng.",
    },
    color: "text-brand",
    bgColor: "bg-brand/10",
  },
  {
    icon: MessageSquare,
    title: { en: "Transparent Communication", vi: "Giao tiếp minh bạch" },
    description: {
      en: "Regular updates, clear timelines, and direct access to the team working on your project. No middlemen, no surprises, just honest, open dialogue.",
      vi: "Cập nhật thường xuyên, tiến độ rõ ràng và truy cập trực tiếp đội ngũ đang thực hiện dự án của bạn. Không trung gian, không bất ngờ, chỉ có đối thoại trung thực và cởi mở.",
    },
    color: "text-accent-cyan",
    bgColor: "bg-accent-cyan/10",
  },
  {
    icon: Clock,
    title: { en: "On-Time Delivery", vi: "Bàn giao đúng hạn" },
    description: {
      en: "Realistic timelines set from the start, with proactive risk management and milestone tracking. We deliver when we say we will.",
      vi: "Tiến độ thực tế được đặt ra ngay từ đầu, kèm quản lý rủi ro chủ động và theo dõi cột mốc. Chúng tôi bàn giao đúng như những gì đã cam kết.",
    },
    color: "text-accent-violet",
    bgColor: "bg-accent-violet/10",
  },
  {
    icon: Handshake,
    title: { en: "Long-term Partnership", vi: "Hợp tác lâu dài" },
    description: {
      en: "We grow with our clients. From initial build through scaling and evolution, we invest in relationships that deliver lasting value for years to come.",
      vi: "Chúng tôi cùng phát triển với khách hàng. Từ giai đoạn xây dựng ban đầu đến khi mở rộng và tiến hóa, chúng tôi đầu tư vào những mối quan hệ tạo ra giá trị bền vững trong nhiều năm.",
    },
    color: "text-brand",
    bgColor: "bg-brand/10",
  },
];

export function OurCommitment() {
  const locale = useLocale() as "en" | "vi";
  const isEn = locale === "en";
  const pick = (text: LocaleText) => (isEn ? text.en : text.vi);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <Container>
        <SectionHeader
          label={isEn ? "Our Commitment" : "Cam kết của chúng tôi"}
          title={isEn ? "What We Guarantee" : "Những gì chúng tôi cam kết"}
          description={
            isEn
              ? "Principles we hold ourselves to on every project, with every client."
              : "Những nguyên tắc chúng tôi tự giác tuân thủ trong mọi dự án, với mọi khách hàng."
          }
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {commitments.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title.en}>
                <div className="group relative h-full rounded-2xl bg-card-bg border border-card-border p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-brand/15 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5">
                  <div
                    className={`w-10 h-10 rounded-xl ${item.bgColor} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon
                      size={20}
                      className={item.color}
                      strokeWidth={2}
                    />
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
