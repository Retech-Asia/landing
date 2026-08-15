"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useLocale } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface TeamMember {
  name: string;
  role: { en: string; vi: string };
  initials: string;
  bio: { en: string; vi: string };
  gradient: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Jay Pham",
    role: {
      en: "Founder & CEO",
      vi: "Nhà sáng lập & CEO",
    },
    initials: "JP",
    bio: {
      en: "Over a decade in software development and IT outsourcing across Southeast Asia and Australia. Jay founded Retech Solutions to connect global businesses with Vietnam's strongest engineering talent, combining local cost advantages with international delivery standards.",
      vi: "Hơn một thập kỷ kinh nghiệm trong phát triển phần mềm và thuê ngoài công nghệ thông tin tại Đông Nam Á và Úc. Jay sáng lập Retech Solutions để kết nối các doanh nghiệp toàn cầu với đội ngũ kỹ sư tài năng của Việt Nam, kết hợp lợi thế chi phí trong nước cùng tiêu chuẩn bàn giao quốc tế.",
    },
    gradient: "from-brand via-brand-light to-accent-cyan",
  },
  {
    name: "Minh Tran",
    role: {
      en: "CTO",
      vi: "CTO",
    },
    initials: "MT",
    bio: {
      en: "Systems architect with deep experience in enterprise platforms, from multi-tenant SaaS to real-time financial systems. Minh defines technical strategy, leads architecture reviews, and ensures every project meets production-grade standards for security and performance.",
      vi: "Kiến trúc sư hệ thống với nhiều kinh nghiệm về các nền tảng doanh nghiệp, từ SaaS đa khách hàng đến hệ thống tài chính thời gian thực. Minh định hướng chiến lược kỹ thuật, chủ trì các buổi rà soát kiến trúc và đảm bảo mọi dự án đạt tiêu chuẩn sẵn sàng vận hành thực tế về bảo mật và hiệu năng.",
    },
    gradient: "from-accent-cyan via-brand to-accent-violet",
  },
  {
    name: "Linh Nguyen",
    role: {
      en: "Head of Design",
      vi: "Trưởng bộ phận Thiết kế",
    },
    initials: "LN",
    bio: {
      en: "UX designer focused on research-driven product design for web and mobile applications. Linh leads the design practice at Retech, building scalable design systems and ensuring every interface is grounded in user research, not assumptions.",
      vi: "Nhà thiết kế trải nghiệm người dùng tập trung vào thiết kế sản phẩm dựa trên nghiên cứu cho các ứng dụng web và di động. Linh dẫn dắt mảng thiết kế tại Retech, xây dựng hệ thống thiết kế có khả năng mở rộng và bảo đảm mọi giao diện đều dựa trên nghiên cứu người dùng thay vì phỏng đoán.",
    },
    gradient: "from-accent-violet via-brand to-accent-cyan",
  },
  {
    name: "Tuan Le",
    role: {
      en: "VP of Engineering",
      vi: "Phó Chủ tịch Kỹ thuật",
    },
    initials: "TL",
    bio: {
      en: "Engineering leader who has managed distributed teams of 20+ developers across multiple concurrent projects. Tuan oversees delivery operations, mentors senior engineers, and drives the agile processes that keep Retech's projects on schedule.",
      vi: "Lãnh đạo kỹ thuật từng quản lý các đội ngũ phân tán hơn 20 kỹ sư qua nhiều dự án song song. Tuan giám sát vận hành bàn giao, đồng hành cùng các kỹ sư cấp cao và thúc đẩy quy trình agile giúp các dự án của Retech luôn đúng tiến độ.",
    },
    gradient: "from-brand via-accent-violet to-accent-cyan",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};

export function LeadershipTeam() {
  const locale = useLocale();
  const isVi = locale === "vi";

  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeader
          title={isVi ? "Đội ngũ lãnh đạo" : "Leadership Team"}
          description={
            isVi
              ? "Gặp gỡ các lãnh đạo giàu kinh nghiệm đang dẫn dắt Retech Solutions và mang lại kết quả cho khách hàng toàn cầu."
              : "Meet the experienced leaders driving innovation at Retech Solutions and delivering results for our global clients."
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {teamMembers.map((member, i) => (
            <motion.article
              key={member.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
              className="group relative rounded-2xl bg-card-bg border border-card-border shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] hover:border-brand/30 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 overflow-hidden"
            >
              {/* Top gradient accent bar */}
              <div
                className={`h-1 w-full bg-gradient-to-r ${member.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="p-6 pb-5">
                {/* Initials circle */}
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center mb-4`}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Subtle ring animation on hover */}
                    <motion.div
                      className="absolute inset-[-4px] rounded-full border-2 border-brand/0 group-hover:border-brand/30"
                      transition={{ duration: 0.4 }}
                    />
                    <span className="text-lg font-bold text-white tracking-wide">
                      {member.initials}
                    </span>
                  </motion.div>

                  <h3 className="text-lg font-bold text-foreground mb-0.5">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-brand mb-3">
                    {isVi ? member.role.vi : member.role.en}
                  </p>
                </div>
              </div>

              {/* Hover reveal bio overlay */}
              <motion.div
                className="absolute inset-0 top-[76px] bg-card-bg backdrop-blur-sm flex flex-col justify-center px-6"
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ pointerEvents: "none" }}
              >
                <p className="text-sm text-foreground-secondary leading-relaxed text-center">
                  {isVi ? member.bio.vi : member.bio.en}
                </p>
              </motion.div>

              {/* Always-visible quick link at bottom */}
              <div className="px-6 pb-4">
                <div className="pt-3 border-t border-card-border flex items-center justify-center">
                  <span className="inline-flex items-center gap-1 text-xs text-foreground-muted group-hover:text-brand transition-colors duration-200">
                    <ExternalLink size={12} />
                    <span>{isVi ? "Xem hồ sơ" : "View profile"}</span>
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
