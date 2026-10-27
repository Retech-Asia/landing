/* -------------------------------------------------------------------------- */
/*  Capability-led technologies listing                                       */
/*                                                                            */
/*  2026-10-27 (owner-directed refinement, batch B): the white-card grid with */
/*  brand-logo tiles, filter pills and service-tag inventories was replaced   */
/*  by five static capability sections in the site's typographic system —     */
/*  ghost numerals, serif display titles, hairline rules, quiet ruled lists.  */
/*  Round 3 (same day): authentic official logos (simple-icons path data,     */
/*  brand colors) now sit beside each technology name — the owner reversed    */
/*  the no-logos line for technical identifiers; decorative-icon ban stays.   */
/*                                                                            */
/*  Content integrity: only technologies the previous data listed appear      */
/*  here, mapped into five capability groups; role lines are condensed from   */
/*  the previous card descriptions (EN) and viDescriptions (VI). The Delivery */
/*  quality group lists practices already claimed on the site (senior code    */
/*  review, automated test suites, per-phase acceptance criteria) rather than */
/*  inventing tool names the stack does not name.                             */
/* -------------------------------------------------------------------------- */

import { TechLogo } from "@/components/ui/TechLogo";

interface TechItem {
  name: string;
  role: string;
  roleVi: string;
}

interface Capability {
  numeral: string;
  title: string;
  titleVi: string;
  blurb: string;
  blurbVi: string;
  items: TechItem[];
}

const capabilities: Capability[] = [
  {
    numeral: "01",
    title: "Application engineering",
    titleVi: "Kỹ thuật ứng dụng",
    blurb:
      "Frameworks and languages for product interfaces and services. React, Next.js, and TypeScript are the default starting point; Vue.js, React Native, and Flutter cover projects that call for something lighter or mobile-first. Each choice is made for reliability and team familiarity rather than novelty.",
    blurbVi:
      "Các framework và ngôn ngữ dùng để xây dựng giao diện sản phẩm và dịch vụ. React, Next.js và TypeScript là lựa chọn khởi điểm mặc định; Vue.js, React Native và Flutter dành cho các dự án cần thứ gọn nhẹ hơn hoặc mobile-first. Mỗi lựa chọn dựa trên độ tin cậy và sự quen thuộc của đội ngũ, không theo trào lưu.",
    items: [
      {
        name: "React",
        role: "Component-based library for building user interfaces, from single-page apps to interactive dashboards.",
        roleVi:
          "Thư viện theo hướng component để xây dựng giao diện người dùng, từ single-page app đến dashboard tương tác.",
      },
      {
        name: "Next.js",
        role: "Production React framework: server-side rendering, static generation, API routes, SEO-friendly pages.",
        roleVi:
          "Framework production xây trên React: server-side rendering, static generation, API routes và các trang thân thiện với SEO.",
      },
      {
        name: "TypeScript",
        role: "A typed superset of JavaScript that catches errors at compile time and keeps large codebases refactorable.",
        roleVi:
          "Siêu tập có kiểu của JavaScript, bắt lỗi ngay khi compile và giúp refactor codebase lớn một cách an toàn.",
      },
      {
        name: "Tailwind CSS",
        role: "Utility-first CSS framework for responsive, consistent interfaces without heavyweight custom stylesheets.",
        roleVi:
          "CSS framework utility-first cho giao diện responsive, nhất quán ngay trong markup, không cần stylesheet tùy chỉnh cồng kềnh.",
      },
      {
        name: "Vue.js",
        role: "Progressive JavaScript framework for lightweight applications and admin panels.",
        roleVi:
          "JavaScript framework progressive với đường cong học tập nhẹ, phù hợp với ứng dụng gọn nhẹ và admin panel.",
      },
      {
        name: "React Native",
        role: "Native iOS and Android apps from a single JavaScript codebase with shared business logic.",
        roleVi:
          "Ứng dụng iOS và Android native từ một codebase JavaScript duy nhất, chia sẻ logic nghiệp vụ.",
      },
      {
        name: "Flutter",
        role: "Google's UI toolkit for custom interfaces across mobile, web, and desktop.",
        roleVi:
          "UI toolkit của Google cho giao diện tùy biến trên mobile, web và desktop.",
      },
    ],
  },
  {
    numeral: "02",
    title: "Systems & data",
    titleVi: "Hệ thống & dữ liệu",
    blurb:
      "Backend runtimes, APIs, and the stores behind them. PostgreSQL is the default relational store; MongoDB and Redis cover document models and caching, while Node.js, Python, and Go carry the service layer. GraphQL appears when clients need to shape their own queries.",
    blurbVi:
      "Runtime backend, API và các kho dữ liệu phía sau. PostgreSQL là kho quan hệ mặc định; MongoDB và Redis đảm nhận mô hình tài liệu và caching, trong khi Node.js, Python và Go đảm nhận tầng dịch vụ. GraphQL xuất hiện khi client cần tự định hình truy vấn.",
    items: [
      {
        name: "Node.js",
        role: "JavaScript runtime for event-driven APIs and microservices; one language across client and server.",
        roleVi:
          "JavaScript runtime cho API và microservices hướng sự kiện; một ngôn ngữ dùng chung cho client và server.",
      },
      {
        name: "Python",
        role: "Versatile language for data-intensive backends, machine learning pipelines, and automation.",
        roleVi:
          "Ngôn ngữ đa dụng cho backend xử lý dữ liệu nặng, machine learning pipeline và tự động hóa.",
      },
      {
        name: "Go",
        role: "Compiled language built for concurrency; heavy-traffic APIs with minimal resource overhead.",
        roleVi:
          "Ngôn ngữ biên dịch thiết kế cho tính đồng thời; API lưu lượng lớn với chi phí tài nguyên tối thiểu.",
      },
      {
        name: "GraphQL",
        role: "Query language for APIs; clients fetch exactly what they need and the schema documents itself.",
        roleVi:
          "Ngôn ngữ truy vấn cho API; client lấy đúng dữ liệu cần và schema tự tài liệu hóa.",
      },
      {
        name: "PostgreSQL",
        role: "Relational store with strong data integrity and ACID compliance; a natural fit for CRM, ERP, and financial systems.",
        roleVi:
          "Cơ sở dữ liệu quan hệ với tính toàn vẹn dữ liệu cao và tuân thủ ACID; phù hợp tự nhiên với CRM, ERP và hệ thống tài chính.",
      },
      {
        name: "MongoDB",
        role: "Document database for flexible, evolving data models and fast-iterating products.",
        roleVi:
          "Cơ sở dữ liệu tài liệu cho mô hình dữ liệu linh hoạt, tiến hóa liên tục và sản phẩm lặp nhanh.",
      },
      {
        name: "Redis",
        role: "In-memory store for caching, session management, and real-time features.",
        roleVi:
          "In-memory data store cho caching, quản lý session và tính năng thời gian thực.",
      },
    ],
  },
  {
    numeral: "03",
    title: "AI integration",
    titleVi: "Tích hợp AI",
    blurb:
      "LLM and machine-learning tooling used to add AI features where they earn their place in a product. OpenAI APIs and LangChain cover language features and retrieval pipelines; TensorFlow covers training and serving custom models.",
    blurbVi:
      "Công cụ LLM và machine learning dùng để bổ sung tính năng AI ở những nơi thực sự tạo ra giá trị trong sản phẩm. API OpenAI và LangChain đảm nhận các tính năng ngôn ngữ và pipeline retrieval; TensorFlow đảm nhận huấn luyện và triển khai model riêng.",
    items: [
      {
        name: "OpenAI",
        role: "APIs for natural-language features, content generation, and intelligent chat.",
        roleVi:
          "API cho tính năng ngôn ngữ tự nhiên, tạo nội dung và chat thông minh.",
      },
      {
        name: "TensorFlow",
        role: "End-to-end machine-learning platform for training and serving models at scale.",
        roleVi:
          "Nền tảng machine learning end-to-end để huấn luyện và triển khai model ở quy mô lớn.",
      },
      {
        name: "LangChain",
        role: "Framework for LLM applications: retrieval-augmented generation, agent workflows, structured output.",
        roleVi:
          "Framework cho ứng dụng LLM: retrieval-augmented generation, agent workflow và structured output.",
      },
    ],
  },
  {
    numeral: "04",
    title: "Cloud infrastructure",
    titleVi: "Hạ tầng cloud",
    blurb:
      "Where the software runs. AWS covers compute, serverless, storage, and CDN; Vercel hosts frontend projects with instant preview deployments. Docker and Kubernetes package and orchestrate workloads so environments stay identical from development to production.",
    blurbVi:
      "Nơi phần mềm vận hành. AWS đảm nhận compute, serverless, storage và CDN; Vercel host các dự án frontend với preview deployment tức thì. Docker và Kubernetes đóng gói và điều phối workload để môi trường giữ nguyên từ development đến production.",
    items: [
      {
        name: "AWS",
        role: "Compute, serverless, storage, databases, and CDN: EC2, Lambda, S3, RDS, CloudFront.",
        roleVi:
          "Compute, serverless, storage, database và CDN: EC2, Lambda, S3, RDS, CloudFront.",
      },
      {
        name: "Vercel",
        role: "Deployment platform for frontend frameworks, with edge hosting and instant preview deployments.",
        roleVi:
          "Nền tảng deploy cho frontend framework, với edge hosting và preview deployment tức thì.",
      },
      {
        name: "Docker",
        role: "Containers that package applications with their dependencies, keeping environments identical.",
        roleVi:
          "Container đóng gói ứng dụng cùng dependencies, giữ môi trường giống hệt nhau.",
      },
      {
        name: "Kubernetes",
        role: "Container orchestration for auto-scaling, self-healing workloads, and zero-downtime deployments.",
        roleVi:
          "Container orchestration cho workload tự động scale, tự phục hồi và deploy không gián đoạn.",
      },
    ],
  },
  {
    numeral: "05",
    title: "Delivery quality",
    titleVi: "Chất lượng bàn giao",
    blurb:
      "The practices around the code. Every change passes senior review and automated test suites before it reaches a release, and each delivery phase closes against acceptance criteria agreed with your team.",
    blurbVi:
      "Các thực hành quanh code. Mỗi thay đổi đều qua rà soát của kỹ sư cấp cao và bộ kiểm thử tự động trước khi đến bản release, và từng giai đoạn bàn giao khép lại theo tiêu chí nghiệm thu đã thống nhất với đội ngũ của bạn.",
    items: [
      {
        name: "Code review",
        role: "Changes are reviewed by senior engineers before they merge.",
        roleVi:
          "Mọi thay đổi đều được kỹ sư cấp cao rà soát trước khi merge.",
      },
      {
        name: "Automated testing",
        role: "Test suites validate behavior before anything ships.",
        roleVi:
          "Bộ kiểm thử tự động xác nhận hành vi của hệ thống trước khi bàn giao.",
      },
      {
        name: "Acceptance criteria",
        role: "Each phase closes against criteria agreed and tested with your team.",
        roleVi:
          "Từng giai đoạn khép lại theo tiêu chí đã thống nhất và được đội ngũ của bạn trực tiếp kiểm thử.",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  TechListing                                                                */
/* -------------------------------------------------------------------------- */

export function TechListing({ locale = "en" }: { locale?: string }) {
  const isEn = locale === "en";
  const title = (c: Capability) => (isEn ? c.title : c.titleVi);
  const blurb = (c: Capability) => (isEn ? c.blurb : c.blurbVi);
  const role = (i: TechItem) => (isEn ? i.role : i.roleVi);

  return (
    <section className="py-16 md:py-24">
      {capabilities.map((cap) => (
        <section
          key={cap.numeral}
          className="border-t border-rule py-10 md:py-14 last:border-b last:pb-12 md:last:pb-16"
        >
          <div className="grid grid-cols-[44px_1fr] gap-3 md:grid-cols-[44px_minmax(0,2fr)_minmax(0,3fr)] md:gap-x-10 lg:gap-x-14">
            <p
              className="font-display text-sm text-foreground-muted tabular-nums"
              aria-hidden="true"
            >
              {cap.numeral}
            </p>

            <div>
              <h2 className="font-display-title text-2xl text-foreground md:text-3xl">
                {title(cap)}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground-secondary md:text-base">
                {blurb(cap)}
              </p>
            </div>

            <ul className="col-start-2 mt-6 md:col-start-3 md:row-start-1 md:mt-0">
              {cap.items.map((item) => (
                <li
                  key={item.name}
                  className="border-b border-rule-soft py-4"
                >
                  <div className="grid gap-0.5 md:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] md:gap-x-6">
                    <p className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                      <TechLogo name={item.name} size={17} />
                      {item.name}
                    </p>
                    <p className="text-sm leading-relaxed text-foreground-muted">
                      {role(item)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </section>
  );
}
