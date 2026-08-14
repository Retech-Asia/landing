"use client";

import { useState, useCallback } from "react";
// next/image removed — all tech logos are SVG and use plain <img>.
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*  Data types                                                                */
/* -------------------------------------------------------------------------- */

interface Technology {
  name: string;
  description: string;
  services: string[];
  proficiency: 3 | 4 | 5;
  color: string;
  /** Optional brand logo path under /images/tech/ (e.g. "react.svg") */
  logo?: string;
}

interface TechCategory {
  label: string;
  technologies: Technology[];
}

/* -------------------------------------------------------------------------- */
/*  Tech data with brand colours & proficiency                                */
/* -------------------------------------------------------------------------- */

const techCategories: TechCategory[] = [
  {
    label: "Frontend",
    technologies: [
      {
        name: "React",
        logo: "react.svg",
        description:
          "Our go-to library for building dynamic, component-based user interfaces. We use React for single-page applications, progressive web apps, and interactive dashboards.",
        services: ["Web Development", "CMS Platforms", "CRM Systems"],
        proficiency: 5,
        color: "#61DAFB",
      },
      {
        name: "Next.js",
        logo: "nextdotjs.svg",
        description:
          "The backbone of our production-grade web applications. We leverage Next.js for server-side rendering, static generation, and API routes to deliver fast, SEO-friendly experiences.",
        services: ["Web Development", "CMS Platforms", "ERP Solutions"],
        proficiency: 5,
        color: "#000000",
      },
      {
        name: "TypeScript",
        logo: "typescript.svg",
        description:
          "TypeScript is standard across all our projects. Strong typing catches errors early, improves code maintainability, and makes large codebases safer to refactor.",
        services: ["Web Development", "CMS Platforms", "CRM Systems", "ERP Solutions"],
        proficiency: 5,
        color: "#3178C6",
      },
      {
        name: "Tailwind CSS",
        logo: "tailwindcss.svg",
        description:
          "Our utility-first CSS framework for rapid, consistent UI development. Tailwind enables us to build responsive, pixel-perfect designs without the overhead of custom stylesheets.",
        services: ["Web Development", "UI/UX Design"],
        proficiency: 5,
        color: "#06B6D4",
      },
      {
        name: "Vue.js",
        description:
          "We use Vue.js when projects benefit from its gentle learning curve and progressive architecture. Ideal for lightweight applications, admin panels, and incremental adoption.",
        services: ["Web Development", "CMS Platforms"],
        proficiency: 4,
        color: "#4FC08D",
      },
    ],
  },
  {
    label: "Backend",
    technologies: [
      {
        name: "Node.js",
        logo: "nodedotjs.svg",
        description:
          "Our primary backend runtime for building scalable, event-driven APIs and microservices. Node.js enables full-stack JavaScript development, reducing context switching.",
        services: ["Web Development", "CRM Systems", "ERP Solutions"],
        proficiency: 5,
        color: "#339933",
      },
      {
        name: "Python",
        logo: "python.svg",
        description:
          "Used for data-intensive backends, machine learning pipelines, and automation scripts. Python powers our AI-driven features and complex business logic layers.",
        services: ["AI-Powered Solutions", "Web Development", "ERP Solutions"],
        proficiency: 5,
        color: "#3776AB",
      },
      {
        name: "Go",
        logo: "go.svg",
        description:
          "Our choice for high-performance, concurrent backend services. Go excels in building APIs that handle heavy traffic and real-time data streaming with minimal resource overhead.",
        services: ["Web Development", "ERP Solutions"],
        proficiency: 4,
        color: "#00ADD8",
      },
      {
        name: "GraphQL",
        logo: "graphql.svg",
        description:
          "We implement GraphQL for APIs that serve complex, relational data to diverse clients. It eliminates over-fetching, simplifies data aggregation, and provides self-documenting schemas.",
        services: ["Web Development", "CRM Systems", "ERP Solutions"],
        proficiency: 4,
        color: "#E10098",
      },
    ],
  },
  {
    label: "Mobile",
    technologies: [
      {
        name: "React Native",
        description:
          "Our primary framework for cross-platform mobile development. Build native iOS and Android apps from a single JavaScript codebase with near-native performance.",
        services: ["Mobile Development", "Web Development"],
        proficiency: 4,
        color: "#61DAFB",
      },
      {
        name: "Flutter",
        description:
          "Used for projects requiring highly customized UI and smooth animations across platforms. Flutter's widget-based architecture enables pixel-perfect brand consistency.",
        services: ["Mobile Development", "UI/UX Design"],
        proficiency: 3,
        color: "#02569B",
      },
    ],
  },
  {
    label: "Database",
    technologies: [
      {
        name: "PostgreSQL",
        logo: "postgresql.svg",
        description:
          "Our default relational database for applications requiring strong data integrity, complex queries, and ACID compliance. Ideal for CRM, ERP, and financial systems.",
        services: ["CRM Systems", "ERP Solutions", "Web Development"],
        proficiency: 5,
        color: "#4169E1",
      },
      {
        name: "MongoDB",
        logo: "mongodb.svg",
        description:
          "Used for projects with flexible, document-based data models. MongoDB shines in content management systems, real-time analytics, and rapidly evolving schemas.",
        services: ["CMS Platforms", "Web Development"],
        proficiency: 4,
        color: "#47A248",
      },
      {
        name: "Redis",
        logo: "redis.svg",
        description:
          "Our in-memory data store for caching, session management, and real-time features. Redis dramatically reduces database load and improves response times.",
        services: ["Web Development", "CRM Systems", "ERP Solutions"],
        proficiency: 4,
        color: "#DC382D",
      },
    ],
  },
  {
    label: "Cloud",
    technologies: [
      {
        name: "AWS",
        description:
          "Amazon Web Services is our primary cloud provider. We leverage EC2, Lambda, S3, RDS, and CloudFront to build resilient, cost-optimized architectures.",
        services: ["Web Development", "CRM Systems", "ERP Solutions", "AI-Powered Solutions"],
        proficiency: 5,
        color: "#FF9900",
      },
      {
        name: "Vercel",
        logo: "vercel.svg",
        description:
          "Our preferred platform for Next.js deployments. Vercel provides edge-optimised hosting, instant previews, and seamless Git integration for rapid iteration.",
        services: ["Web Development", "CMS Platforms"],
        proficiency: 5,
        color: "#000000",
      },
    ],
  },
  {
    label: "DevOps",
    technologies: [
      {
        name: "Docker",
        logo: "docker.svg",
        description:
          "Containerization is central to our deployment workflow. Docker ensures consistent environments from development through staging to production.",
        services: ["Web Development", "ERP Solutions", "Dedicated Teams"],
        proficiency: 5,
        color: "#2496ED",
      },
      {
        name: "Kubernetes",
        logo: "kubernetes.svg",
        description:
          "We orchestrate containerized workloads with Kubernetes for enterprise projects that demand auto-scaling, self-healing infrastructure, and zero-downtime deployments.",
        services: ["ERP Solutions", "Web Development"],
        proficiency: 4,
        color: "#326CE5",
      },
      {
        name: "CI/CD",
        description:
          "Automated build, test, and deployment pipelines using GitHub Actions, GitLab CI, or Jenkins. Ensures every release is validated and deployed reliably.",
        services: ["Web Development", "ERP Solutions", "Dedicated Teams"],
        proficiency: 5,
        color: "#208535",
      },
    ],
  },
  {
    label: "AI/ML",
    technologies: [
      {
        name: "OpenAI",
        description:
          "We integrate OpenAI APIs for natural language processing, content generation, intelligent chatbots, and AI-powered features that add real business value.",
        services: ["AI-Powered Solutions", "Web Development"],
        proficiency: 5,
        color: "#412991",
      },
      {
        name: "TensorFlow",
        description:
          "Used for building and deploying machine learning models at scale. TensorFlow powers our computer vision, NLP, and predictive analytics solutions.",
        services: ["AI-Powered Solutions", "ERP Solutions"],
        proficiency: 3,
        color: "#FF6F00",
      },
      {
        name: "LangChain",
        description:
          "Our framework for building LLM-powered applications with retrieval-augmented generation, agent workflows, and structured output pipelines.",
        services: ["AI-Powered Solutions", "Web Development"],
        proficiency: 4,
        color: "#1C3C3C",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Locale strings (EN | VI)                                                  */
/*  EN data above stays the source of truth; VI overrides live here.          */
/* -------------------------------------------------------------------------- */

/** Category tab labels that differ in Vietnamese (jargon stays English). */
const viCategoryLabels: Record<string, string> = {
  Database: "Cơ sở dữ liệu",
};

/** Service tag translations (matches service naming used across the site). */
const viServiceLabels: Record<string, string> = {
  "Web Development": "Phát triển Web",
  "CMS Platforms": "Nền tảng CMS",
  "CRM Systems": "Hệ thống CRM",
  "ERP Solutions": "Giải pháp ERP",
  "AI-Powered Solutions": "Giải pháp AI",
  "Mobile Development": "Phát triển Mobile",
  "UI/UX Design": "Thiết kế UI/UX",
  "Dedicated Teams": "Team chuyên trách",
};

/** Per-technology description translations. Tech jargon stays English. */
const viDescriptions: Record<string, string> = {
  React:
    "Thư viện chủ lực của chúng tôi để xây dựng giao diện động theo hướng component. Chúng tôi dùng React cho single-page applications, progressive web apps và dashboard tương tác.",
  "Next.js":
    "Nền tảng cốt lõi cho các ứng dụng web production-grade của chúng tôi. Chúng tôi tận dụng Next.js cho server-side rendering, static generation và API routes để mang lại trải nghiệm nhanh, thân thiện với SEO.",
  TypeScript:
    "TypeScript là tiêu chuẩn trong mọi dự án của chúng tôi. Kiểu dữ liệu chặt chẽ giúp phát hiện lỗi sớm, cải thiện khả năng bảo trì và việc refactor codebase lớn an toàn hơn.",
  "Tailwind CSS":
    "CSS framework theo hướng utility-first của chúng tôi cho việc phát triển UI nhanh và nhất quán. Tailwind giúp xây dựng giao diện responsive, pixel-perfect mà không cần stylesheet tùy chỉnh cồng kềnh.",
  "Vue.js":
    "Chúng tôi sử dụng Vue.js khi dự án hưởng lợi từ đường cong học tập nhẹ và kiến trúc progressive. Phù hợp cho ứng dụng gọn nhẹ, admin panel và áp dụng từng bước.",
  "Node.js":
    "Backend runtime chính của chúng tôi để xây dựng API và microservices có khả năng mở rộng, hướng sự kiện. Node.js cho phép phát triển full-stack JavaScript, giảm việc chuyển đổi ngữ cảnh.",
  Python:
    "Được dùng cho backend xử lý dữ liệu nặng, machine learning pipelines và script tự động hóa. Python vận hành các tính năng AI và tầng logic nghiệp vụ phức tạp của chúng tôi.",
  Go: "Lựa chọn của chúng tôi cho backend service hiệu năng cao, đồng thời. Go vượt trội trong việc xây dựng API xử lý lưu lượng lớn và streaming dữ liệu thời gian thực với chi phí tài nguyên tối thiểu.",
  GraphQL:
    "Chúng tôi triển khai GraphQL cho các API phục vụ dữ liệu quan hệ phức tạp cho nhiều loại client. GraphQL loại bỏ over-fetching, đơn giản hóa việc tổng hợp dữ liệu và cung cấp schema tự tài liệu hóa.",
  "React Native":
    "Framework chính của chúng tôi cho phát triển mobile đa nền tảng. Xây dựng ứng dụng iOS và Android native từ một codebase JavaScript duy nhất với hiệu năng gần native.",
  Flutter:
    "Được dùng cho các dự án cần UI tùy biến cao và animation mượt mà trên nhiều nền tảng. Kiến trúc widget của Flutter đảm bảo tính nhất quán thương hiệu pixel-perfect.",
  PostgreSQL:
    "Cơ sở dữ liệu quan hệ mặc định của chúng tôi cho các ứng dụng đòi hỏi tính toàn vẹn dữ liệu cao, truy vấn phức tạp và tuân thủ ACID. Phù hợp cho CRM, ERP và hệ thống tài chính.",
  MongoDB:
    "Được dùng cho các dự án có mô hình dữ liệu linh hoạt theo tài liệu. MongoDB phát huy thế mạnh trong hệ thống quản lý nội dung, phân tích thời gian thực và schema thay đổi nhanh.",
  Redis:
    "In-memory data store của chúng tôi cho caching, quản lý session và tính năng thời gian thực. Redis giảm đáng kể tải cho cơ sở dữ liệu và cải thiện thời gian phản hồi.",
  AWS:
    "Amazon Web Services là nhà cung cấp cloud chính của chúng tôi. Chúng tôi tận dụng EC2, Lambda, S3, RDS và CloudFront để xây dựng kiến trúc bền vững, tối ưu chi phí.",
  Vercel:
    "Nền tảng ưa thích của chúng tôi cho việc deploy Next.js. Vercel cung cấp hosting tối ưu edge, preview tức thì và tích hợp Git liền mạch để lặp nhanh.",
  Docker:
    "Containerization là trung tâm trong quy trình deploy của chúng tôi. Docker đảm bảo môi trường nhất quán từ development, staging đến production.",
  Kubernetes:
    "Chúng tôi điều phối workload containerized bằng Kubernetes cho các dự án enterprise đòi hỏi auto-scaling, hạ tầng tự phục hồi và deploy không gián đoạn.",
  "CI/CD":
    "Pipeline build, test và deploy tự động bằng GitHub Actions, GitLab CI hoặc Jenkins. Đảm bảo mỗi bản release được kiểm chứng và deploy đáng tin cậy.",
  OpenAI:
    "Chúng tôi tích hợp OpenAI API cho xử lý ngôn ngữ tự nhiên, tạo nội dung, chatbot thông minh và các tính năng AI mang lại giá trị kinh doanh thực tế.",
  TensorFlow:
    "Được dùng để xây dựng và triển khai machine learning models ở quy mô lớn. TensorFlow vận hành các giải pháp computer vision, NLP và predictive analytics của chúng tôi.",
  LangChain:
    "Framework của chúng tôi để xây dựng ứng dụng dựa trên LLM với retrieval-augmented generation, agent workflow và pipeline structured output.",
};

/** Flow diagram step labels in Vietnamese. */
const viFlowLabels: Record<string, string> = {
  Client: "Client",
  "API Layer": "Tầng API",
  Services: "Dịch vụ",
  Data: "Dữ liệu",
  Deploy: "Triển khai",
};

/** Resolve chrome strings by locale. */
function useStrings(locale: string) {
  const isEn = locale === "en";
  return {
    isEn,
    allTab: isEn ? "All" : "Tất cả",
    architectureEyebrow: isEn ? "Architecture" : "Kiến trúc",
    architectureTitle: isEn ? "How Our Stack Connects" : "Cách Tech Stack của chúng tôi kết nối",
    architectureDescription: isEn
      ? "A typical production architecture flows from client to cloud, with each layer built on proven technology."
      : "Một kiến trúc production điển hình đi từ client đến cloud, với mỗi tầng được xây trên công nghệ đã được kiểm chứng.",
    expertise: isEn ? "Expertise" : "Chuyên môn",
    emptyState: isEn
      ? "No technologies found for this category."
      : "Không tìm thấy công nghệ nào trong danh mục này.",
  };
}

/* -------------------------------------------------------------------------- */
/*  Filter tabs                                                               */
/* -------------------------------------------------------------------------- */

const ALL_TAB = "__all__";
const tabs = [ALL_TAB, ...techCategories.map((c) => c.label)];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/** Flatten all technologies and tag each with its category label. */
function getAllTechnologies(): (Technology & { category: string })[] {
  return techCategories.flatMap((cat) =>
    cat.technologies.map((t) => ({ ...t, category: cat.label })),
  );
}

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                             */
/* -------------------------------------------------------------------------- */

/** Five-dot proficiency indicator. Filled dots represent the skill level. */
function ProficiencyDots({ level, color }: { level: number; color: string }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "inline-block h-2 w-2 rounded-full transition-colors duration-300",
            i < level ? "" : "bg-black/[0.08]",
          )}
          style={i < level ? { backgroundColor: color } : undefined}
        />
      ))}
    </div>
  );
}

/** A single technology card with hover glow + scale. */
function TechCard({
  tech,
  index,
  locale,
}: {
  tech: Technology & { category: string };
  index: number;
  locale: string;
}) {
  const isEn = locale === "en";
  const category = (!isEn && viCategoryLabels[tech.category]) || tech.category;
  const description =
    (!isEn && viDescriptions[tech.name]) || tech.description;
  const expertiseLabel = isEn ? "Expertise" : "Chuyên môn";
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.96 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.04 }}
      whileHover={{ scale: 1.03, y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group relative rounded-2xl bg-card-bg border border-card-border shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-shadow duration-300 hover:border-foreground/10 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] overflow-hidden"
    >
      {/* Hover glow */}
      <span
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow: `0 0 40px ${tech.color}15, 0 0 80px ${tech.color}08`,
        }}
        aria-hidden="true"
      />

      {/* Top accent bar */}
      <div
        className="h-1 w-full transition-all duration-300 group-hover:h-1.5"
        style={{
          background: `linear-gradient(90deg, ${tech.color}, ${tech.color}66)`,
        }}
      />

      <div className="p-6 flex flex-col h-full">
        {/* Header: logo + name + category */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            {tech.logo ? (
              // Plain <img> for SVG logos — next/image blocks SVG without
              // dangerouslyAllowSVG config. Vectors don't need optimization.
              <img
                src={`/images/tech/${tech.logo}`}
                alt={`${tech.name} logo`}
                width={36}
                height={36}
                className="w-9 h-9 object-contain flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div
                className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold text-foreground"
                style={{
                  backgroundColor: `${tech.color}20`,
                  /* Border uses brand color so the badge still reads as
                     brand-tinted, but text stays foreground for AA contrast.
                     Tech brand colors (#61DAFB cyan, #06B6D4 etc.) are
                     designed for white backgrounds and fail WCAG AA when
                     used as text on near-white tinted cards. */
                  borderColor: `${tech.color}40`,
                  borderWidth: 1,
                }}
                aria-hidden="true"
              >
                {tech.name.charAt(0)}
              </div>
            )}
            <h3 className="text-lg font-semibold text-foreground group-hover:text-brand transition-colors duration-300 truncate">
              {tech.name}
            </h3>
          </div>
          <span
            className="shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium text-foreground"
            style={{
              /* Brand color as background tint (still recognizable) +
                 border accent. Text uses var(--foreground) for AA. */
              backgroundColor: `${tech.color}18`,
              borderColor: `${tech.color}40`,
              borderWidth: 1,
            }}
          >
            {category}
          </span>
        </div>

        {/* Proficiency */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-foreground-muted font-medium">
            {expertiseLabel}
          </span>
          <ProficiencyDots level={tech.proficiency} color={tech.color} />
        </div>

        {/* Description */}
        <p className="text-sm text-foreground-secondary leading-relaxed mb-5 flex-1">
          {description}
        </p>

        {/* Service tags */}
        <div className="flex flex-wrap gap-1.5">
          {tech.services.map((service) => (
            <span
              key={service}
              className="inline-flex items-center rounded-md bg-black/[0.03] px-2.5 py-1 text-xs font-medium text-foreground-secondary"
            >
              {(!isEn && viServiceLabels[service]) || service}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stack flow diagram                                                        */
/* -------------------------------------------------------------------------- */

const flowSteps = [
  { label: "Client", sub: "React / Vue / Mobile", color: "#61DAFB" },
  { label: "API Layer", sub: "Node / GraphQL", color: "#339933" },
  { label: "Services", sub: "Python / Go", color: "#3776AB" },
  { label: "Data", sub: "PostgreSQL / Redis", color: "#4169E1" },
  { label: "Deploy", sub: "AWS / Docker / K8s", color: "#FF9900" },
];

function StackFlowDiagram({ locale }: { locale: string }) {
  const isEn = locale === "en";
  return (
    <div className="relative w-full overflow-hidden py-4">
      <div className="flex items-center justify-center gap-0 flex-wrap">
        {flowSteps.map((step, i) => (
          <div key={step.label} className="flex items-center">
            {/* Node */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="relative flex flex-col items-center"
            >
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-white text-sm md:text-base font-bold shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${step.color}, ${step.color}bb)`,
                  boxShadow: `0 4px 20px ${step.color}30`,
                }}
              >
                {(!isEn && viFlowLabels[step.label]) || step.label}
              </div>
              <span className="mt-2 text-xs text-foreground-muted text-center max-w-[100px]">
                {step.sub}
              </span>

              {/* Animated pulse ring on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{ border: `2px solid ${step.color}40` }}
                whileHover={{ scale: 1.15, opacity: 0 }}
                initial={{ opacity: 1 }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: "loop" }}
                aria-hidden="true"
              />
            </motion.div>

            {/* Connector arrow (skip last) */}
            {i < flowSteps.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 + 0.3 }}
                className="relative flex items-center justify-center w-8 md:w-14 lg:w-20 mx-1"
              >
                {/* Line */}
                <div
                  className="h-[2px] w-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${flowSteps[i].color}60, ${flowSteps[i + 1].color}60)`,
                  }}
                />
                {/* Animated dot travelling along the line */}
                <motion.span
                  className="absolute h-2 w-2 rounded-full"
                  style={{ backgroundColor: flowSteps[i].color }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                  aria-hidden="true"
                />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main TechListing component                                                */
/* -------------------------------------------------------------------------- */

export function TechListing({ locale = "en" }: { locale?: string }) {
  const s = useStrings(locale);
  const [activeTab, setActiveTab] = useState(ALL_TAB);

  const filteredTechnologies = useCallback(() => {
    const all = getAllTechnologies();
    if (activeTab === ALL_TAB) return all;
    return all.filter((t) => t.category === activeTab);
  }, [activeTab])();

  return (
    <section className="py-20 md:py-28">
      {/* Stack flow diagram */}
      <div className="mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-sm font-medium tracking-widest uppercase text-brand mb-3">
            {s.architectureEyebrow}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            {s.architectureTitle}
          </h2>
          <p className="mt-3 text-foreground-secondary max-w-xl mx-auto">
            {s.architectureDescription}
          </p>
        </motion.div>
        <StackFlowDiagram locale={locale} />
      </div>

      {/* Filter tabs */}
      <div className="mb-12">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {tabs.map((tab) => {
            const isActive = tab === activeTab;
            const tabLabel =
              tab === ALL_TAB
                ? s.allTab
                : (!s.isEn && viCategoryLabels[tab]) || tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive
                    ? "text-white"
                    : "text-foreground-secondary hover:text-foreground hover:bg-black/[0.04]",
                )}
              >
                {/* Active background pill */}
                {isActive && (
                  <motion.span
                    layoutId="activeTabBg"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-brand to-accent-cyan"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tabLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Technology cards grid */}
      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTechnologies.map((tech, index) => (
            <TechCard key={tech.name} tech={tech} index={index} locale={locale} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty state (shouldn't happen but defensive) */}
      {filteredTechnologies.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-foreground-muted py-16"
        >
          {s.emptyState}
        </motion.p>
      )}
    </section>
  );
}
