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
  color: string;
  /** Brand logo path under /images/tech/ (e.g. "react.svg") */
  logo: string;
}

interface TechCategory {
  label: string;
  technologies: Technology[];
}

/* -------------------------------------------------------------------------- */
/*  Tech data with brand colours                                              */
/*  Cards introduce each technology (what it is, what it is good at)          */
/*  rather than claiming our experience level with it.                        */
/* -------------------------------------------------------------------------- */

const techCategories: TechCategory[] = [
  {
    label: "Frontend",
    technologies: [
      {
        name: "React",
        logo: "react.svg",
        description:
          "A component-based JavaScript library for building user interfaces. It powers single-page applications, progressive web apps, and interactive dashboards with efficient, state-driven rendering.",
        services: ["Web Development", "CMS Platforms", "CRM Systems"],
        color: "#61DAFB",
      },
      {
        name: "Next.js",
        logo: "nextdotjs.svg",
        description:
          "A production framework built on React that adds server-side rendering, static generation, and API routes. It delivers fast load times and SEO-friendly pages out of the box.",
        services: ["Web Development", "CMS Platforms", "ERP Solutions"],
        color: "#000000",
      },
      {
        name: "TypeScript",
        logo: "typescript.svg",
        description:
          "A strongly typed superset of JavaScript. Types catch errors at compile time, make code self-documenting, and let large codebases refactor with confidence.",
        services: ["Web Development", "CMS Platforms", "CRM Systems", "ERP Solutions"],
        color: "#3178C6",
      },
      {
        name: "Tailwind CSS",
        logo: "tailwindcss.svg",
        description:
          "A utility-first CSS framework for building responsive, consistent interfaces directly in markup, without heavyweight custom stylesheets.",
        services: ["Web Development", "UI/UX Design"],
        color: "#06B6D4",
      },
      {
        name: "Vue.js",
        logo: "vuedotjs.svg",
        description:
          "A progressive JavaScript framework known for its gentle learning curve. Well suited to lightweight applications, admin panels, and incremental adoption.",
        services: ["Web Development", "CMS Platforms"],
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
          "A JavaScript runtime for building scalable, event-driven APIs and microservices. One language across client and server keeps full-stack development simple.",
        services: ["Web Development", "CRM Systems", "ERP Solutions"],
        color: "#339933",
      },
      {
        name: "Python",
        logo: "python.svg",
        description:
          "A versatile language for data-intensive backends, machine learning pipelines, and automation. Its ecosystem spans web frameworks, data science, and AI tooling.",
        services: ["AI-Powered Solutions", "Web Development", "ERP Solutions"],
        color: "#3776AB",
      },
      {
        name: "Go",
        logo: "go.svg",
        description:
          "A compiled language designed for concurrency and performance. It handles heavy-traffic APIs and real-time data streams with minimal resource overhead.",
        services: ["Web Development", "ERP Solutions"],
        color: "#00ADD8",
      },
      {
        name: "GraphQL",
        logo: "graphql.svg",
        description:
          "A query language for APIs serving complex, relational data to diverse clients. Clients fetch exactly what they need, and the schema documents itself.",
        services: ["Web Development", "CRM Systems", "ERP Solutions"],
        color: "#E10098",
      },
    ],
  },
  {
    label: "Mobile",
    technologies: [
      {
        name: "React Native",
        logo: "react.svg",
        description:
          "A framework for building native iOS and Android apps from a single JavaScript codebase, sharing business logic while keeping near-native performance.",
        services: ["Mobile Development", "Web Development"],
        color: "#61DAFB",
      },
      {
        name: "Flutter",
        logo: "flutter.svg",
        description:
          "Google's UI toolkit for pixel-perfect apps across mobile, web, and desktop. Its widget architecture enables custom interfaces and smooth animation.",
        services: ["Mobile Development", "UI/UX Design"],
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
          "A relational database with strong data integrity, complex query support, and ACID compliance. A natural fit for CRM, ERP, and financial systems.",
        services: ["CRM Systems", "ERP Solutions", "Web Development"],
        color: "#4169E1",
      },
      {
        name: "MongoDB",
        logo: "mongodb.svg",
        description:
          "A document database for flexible, evolving data models. It shines in content platforms, real-time analytics, and products that iterate quickly.",
        services: ["CMS Platforms", "Web Development"],
        color: "#47A248",
      },
      {
        name: "Redis",
        logo: "redis.svg",
        description:
          "An in-memory data store for caching, session management, and real-time features. It reduces database load and cuts response times.",
        services: ["Web Development", "CRM Systems", "ERP Solutions"],
        color: "#DC382D",
      },
    ],
  },
  {
    label: "Cloud",
    technologies: [
      {
        name: "AWS",
        logo: "amazonaws.svg",
        description:
          "A cloud platform spanning compute, serverless, storage, databases, and CDN: EC2, Lambda, S3, RDS, and CloudFront for resilient, cost-aware architecture.",
        services: ["Web Development", "CRM Systems", "ERP Solutions", "AI-Powered Solutions"],
        color: "#FF9900",
      },
      {
        name: "Vercel",
        logo: "vercel.svg",
        description:
          "A deployment platform optimized for frontend frameworks, with edge hosting, instant preview deployments, and seamless Git integration.",
        services: ["Web Development", "CMS Platforms"],
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
          "A container platform that packages applications with their dependencies, keeping environments identical from development to production.",
        services: ["Web Development", "ERP Solutions", "Dedicated Teams"],
        color: "#2496ED",
      },
      {
        name: "Kubernetes",
        logo: "kubernetes.svg",
        description:
          "Container orchestration for auto-scaling, self-healing workloads and zero-downtime deployments at enterprise scale.",
        services: ["ERP Solutions", "Web Development"],
        color: "#326CE5",
      },
    ],
  },
  {
    label: "AI/ML",
    technologies: [
      {
        name: "OpenAI",
        logo: "openai.svg",
        description:
          "APIs for natural language processing, content generation, and intelligent chat, used to add AI features that solve real business problems.",
        services: ["AI-Powered Solutions", "Web Development"],
        color: "#412991",
      },
      {
        name: "TensorFlow",
        logo: "tensorflow.svg",
        description:
          "An end-to-end machine learning platform for training and serving models at scale, from computer vision to predictive analytics.",
        services: ["AI-Powered Solutions", "ERP Solutions"],
        color: "#FF6F00",
      },
      {
        name: "LangChain",
        logo: "langchain.svg",
        description:
          "A framework for building LLM applications: retrieval-augmented generation, agent workflows, and structured output pipelines.",
        services: ["AI-Powered Solutions", "Web Development"],
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
    "Thư viện JavaScript theo hướng component để xây dựng giao diện người dùng. React vận hành single-page applications, progressive web apps và dashboard tương tác với hiệu năng render dựa trên state.",
  "Next.js":
    "Framework production xây trên React, bổ sung server-side rendering, static generation và API routes. Mang lại thời gian tải nhanh và các trang thân thiện với SEO ngay từ đầu.",
  TypeScript:
    "Siêu tập của JavaScript với hệ thống kiểu chặt chẽ. Kiểu dữ liệu bắt lỗi ngay khi compile, giúp code tự tài liệu hóa và refactor codebase lớn một cách an toàn.",
  "Tailwind CSS":
    "CSS framework utility-first để xây dựng giao diện responsive, nhất quán ngay trong markup, không cần stylesheet tùy chỉnh cồng kềnh.",
  "Vue.js":
    "JavaScript framework progressive với đường cong học tập nhẹ. Phù hợp với ứng dụng gọn nhẹ, admin panel và việc áp dụng từng bước.",
  "Node.js":
    "JavaScript runtime để xây dựng API và microservices có khả năng mở rộng, hướng sự kiện. Một ngôn ngữ dùng chung cho client và server giúp phát triển full-stack đơn giản hơn.",
  Python:
    "Ngôn ngữ đa dụng cho backend xử lý dữ liệu nặng, machine learning pipeline và tự động hóa. Hệ sinh thái trải rộng từ web framework, data science đến công cụ AI.",
  Go: "Ngôn ngữ biên dịch được thiết kế cho tính đồng thời và hiệu năng. Xử lý API lưu lượng lớn và luồng dữ liệu thời gian thực với chi phí tài nguyên tối thiểu.",
  GraphQL:
    "Ngôn ngữ truy vấn cho API phục vụ dữ liệu quan hệ phức tạp cho nhiều loại client. Client lấy đúng dữ liệu cần, và schema tự tài liệu hóa.",
  "React Native":
    "Framework xây dựng ứng dụng iOS và Android native từ một codebase JavaScript duy nhất, chia sẻ logic nghiệp vụ mà vẫn giữ hiệu năng gần native.",
  Flutter:
    "UI toolkit của Google cho các ứng dụng pixel-perfect trên mobile, web và desktop. Kiến trúc widget cho phép giao diện tùy biến và animation mượt mà.",
  PostgreSQL:
    "Cơ sở dữ liệu quan hệ với tính toàn vẹn dữ liệu cao, hỗ trợ truy vấn phức tạp và tuân thủ ACID. Phù hợp tự nhiên với CRM, ERP và hệ thống tài chính.",
  MongoDB:
    "Cơ sở dữ liệu tài liệu cho mô hình dữ liệu linh hoạt, tiến hóa liên tục. Phát huy thế mạnh trong nền tảng nội dung, phân tích thời gian thực và sản phẩm lặp nhanh.",
  Redis:
    "In-memory data store cho caching, quản lý session và tính năng thời gian thực. Giảm tải cho cơ sở dữ liệu và rút ngắn thời gian phản hồi.",
  AWS:
    "Nền tảng cloud trải rộng từ compute, serverless, storage, database đến CDN: EC2, Lambda, S3, RDS và CloudFront cho kiến trúc bền vững, tối ưu chi phí.",
  Vercel:
    "Nền tảng deploy được tối ưu cho các frontend framework, với edge hosting, preview deployment tức thì và tích hợp Git liền mạch.",
  Docker:
    "Nền tảng container đóng gói ứng dụng cùng dependencies, giữ môi trường giống hệt nhau từ development đến production.",
  Kubernetes:
    "Container orchestration cho workload tự động scale, tự phục hồi và deploy không gián đoạn ở quy mô enterprise.",
  OpenAI:
    "API cho xử lý ngôn ngữ tự nhiên, tạo nội dung và chat thông minh, dùng để xây dựng tính năng AI giải quyết vấn đề kinh doanh thực tế.",
  TensorFlow:
    "Nền tảng machine learning end-to-end để huấn luyện và triển khai model ở quy mô lớn, từ computer vision đến predictive analytics.",
  LangChain:
    "Framework xây dựng ứng dụng LLM: retrieval-augmented generation, agent workflow và pipeline structured output.",
};

/** Resolve chrome strings by locale. */
function useStrings(locale: string) {
  const isEn = locale === "en";
  return {
    isEn,
    allTab: isEn ? "All" : "Tất cả",
    usedFor: isEn ? "Used for" : "Dùng cho",
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
  const s = useStrings(locale);
  const category = (!isEn && viCategoryLabels[tech.category]) || tech.category;
  const description =
    (!isEn && viDescriptions[tech.name]) || tech.description;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.96 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.04 }}
      whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
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
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            {/* Plain <img> for SVG logos — next/image blocks SVG without
                dangerouslyAllowSVG config. Vectors don't need optimization.
                The white plate keeps dark brand marks (Next.js, Vercel)
                legible in dark mode without filters. */}
            <span
              className="flex-shrink-0 w-11 h-11 rounded-xl bg-white border border-black/[0.08] shadow-[0_1px_4px_rgba(0,0,0,0.1)] flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
              aria-hidden="true"
            >
              <img
                src={`/images/tech/${tech.logo}`}
                alt=""
                width={26}
                height={26}
                className="w-[26px] h-[26px] object-contain"
                loading="lazy"
                decoding="async"
              />
            </span>
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

        {/* Description */}
        <p className="text-sm text-foreground-secondary leading-relaxed mb-5 flex-1">
          {description}
        </p>

        {/* Where the technology fits */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground-muted mb-2">
            {s.usedFor}
          </p>
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
      </div>
    </motion.div>
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
