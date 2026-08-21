import type { Locale } from "@/i18n/routing";

/**
 * Localized string — user-facing job fields carry both locales and are
 * resolved at render time via `flattenJob(job, locale)`.
 *
 * `slug` stays invariant (no per-job detail pages — it only keys the
 * mailto subject). `department.en` doubles as the stable key used by
 * the listing filter + badge-style map.
 */
export type L = { en: string; vi: string };

export interface JobListingData {
  slug: string;
  title: L;
  department: L;
  location: L;
  type: L;
  experience: L;
  description: L;
  requirements: L[];
  benefits: L[];
}

/**
 * Flat (single-locale) projection of a job listing. Returned by
 * `flattenJob` so consumers keep the pre-i18n shape. `departmentKey`
 * carries the English department value for style/filter lookups while
 * `department` is the localized display string.
 */
export interface FlatJobListing {
  slug: string;
  title: string;
  department: string;
  departmentKey: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

/**
 * Project a JobListingData into a single locale. Use this in components
 * that render one locale at a time so the rest of the JSX stays unchanged.
 */
export function flattenJob(job: JobListingData, locale: Locale): FlatJobListing {
  return {
    slug: job.slug,
    title: job.title[locale],
    department: job.department[locale],
    departmentKey: job.department.en,
    location: job.location[locale],
    type: job.type[locale],
    experience: job.experience[locale],
    description: job.description[locale],
    requirements: job.requirements.map((r) => r[locale]),
    benefits: job.benefits.map((b) => b[locale]),
  };
}

/**
 * Convenience: flatten every listing for the active locale.
 */
export function getFlatJobs(locale: Locale): FlatJobListing[] {
  return jobListings.map((job) => flattenJob(job, locale));
}

/* ------------------------------------------------------------------ */
/*  Shared benefit bundle — identical across most engineering roles    */
/* ------------------------------------------------------------------ */

const standardBenefits: L[] = [
  {
    en: "Competitive salary + 13th-month pay (Vietnamese labor law)",
    vi: "Lương cạnh tranh + thưởng tháng 13 (theo luật lao động Việt Nam)",
  },
  {
    en: "Tet bonus and statutory Vietnamese public holidays",
    vi: "Thưởng Tết và các ngày nghỉ lễ theo quy định của Việt Nam",
  },
  {
    en: "Premium health insurance + annual wellness allowance",
    vi: "Bảo hiểm sức khỏe cao cấp + phụ cấp chăm sóc sức khỏe hàng năm",
  },
  {
    en: "Lunch allowance and modern office in HCMC (or remote-friendly)",
    vi: "Phụ cấp ăn trưa và văn phòng hiện đại tại TP.HCM (hoặc hỗ trợ làm từ xa)",
  },
  {
    en: "Annual learning budget for courses, certs, and conferences",
    vi: "Ngân sách học tập hàng năm cho khóa học, chứng chỉ và hội thảo",
  },
  {
    en: "Flexible hours, hybrid work model, English-training stipend",
    vi: "Giờ làm việc linh hoạt, mô hình làm việc hybrid, hỗ trợ học tiếng Anh",
  },
];

/* ------------------------------------------------------------------ */
/*  Listings                                                           */
/* ------------------------------------------------------------------ */

const HCMC: L = { en: "Ho Chi Minh City", vi: "TP.HCM" };
const FULL_TIME: L = { en: "Full-time", vi: "Toàn thời gian" };

const ENGINEERING: L = { en: "Engineering", vi: "Kỹ thuật" };
const DESIGN: L = { en: "Design", vi: "Thiết kế" };
const MANAGEMENT: L = { en: "Management", vi: "Quản lý" };
const SALES: L = { en: "Sales", vi: "Kinh doanh" };

export const jobListings: JobListingData[] = [
  {
    slug: "senior-react-developer",
    title: {
      en: "Senior React Developer",
      vi: "Lập trình viên React Senior",
    },
    department: ENGINEERING,
    location: HCMC,
    type: FULL_TIME,
    experience: { en: "3-5 years", vi: "3-5 năm" },
    description: {
      en: "Build modern, high-performance web applications using React, Next.js, and TypeScript. You will lead frontend architecture decisions and mentor junior developers on best practices.",
      vi: "Xây dựng các ứng dụng web hiện đại, hiệu năng cao với React, Next.js và TypeScript. Bạn sẽ dẫn dắt các quyết định kiến trúc frontend và hướng dẫn các lập trình viên ít kinh nghiệm về thực hành tốt nhất.",
    },
    requirements: [
      {
        en: "3+ years of professional experience with React and TypeScript",
        vi: "Trên 3 năm kinh nghiệm làm việc chuyên nghiệp với React và TypeScript",
      },
      {
        en: "Strong understanding of Next.js App Router and server-side rendering",
        vi: "Hiểu sâu về Next.js App Router và server-side rendering",
      },
      {
        en: "Experience with state management solutions (Redux, Zustand, or React Query)",
        vi: "Có kinh nghiệm với các giải pháp quản lý state (Redux, Zustand hoặc React Query)",
      },
      {
        en: "Proficiency in Tailwind CSS and responsive design principles",
        vi: "Thành thạo Tailwind CSS và các nguyên tắc thiết kế responsive",
      },
      {
        en: "Familiarity with testing frameworks (Jest, React Testing Library, Playwright)",
        vi: "Quen thuộc với các framework kiểm thử (Jest, React Testing Library, Playwright)",
      },
      {
        en: "Good understanding of RESTful APIs and GraphQL",
        vi: "Hiểu tốt về RESTful API và GraphQL",
      },
    ],
    benefits: standardBenefits,
  },
  {
    slug: "senior-nodejs-developer",
    title: {
      en: "Senior Node.js Developer",
      vi: "Lập trình viên Node.js Senior",
    },
    department: ENGINEERING,
    location: HCMC,
    type: FULL_TIME,
    experience: { en: "3-5 years", vi: "3-5 năm" },
    description: {
      en: "Design and implement scalable backend services and APIs using Node.js, Express, and modern database technologies. You will drive backend architecture and ensure system reliability.",
      vi: "Thiết kế và triển khai các dịch vụ backend và API có khả năng mở rộng bằng Node.js, Express và các công nghệ cơ sở dữ liệu hiện đại. Bạn sẽ dẫn dắt kiến trúc backend và đảm bảo độ tin cậy của hệ thống.",
    },
    requirements: [
      {
        en: "3+ years of professional experience with Node.js and Express or NestJS",
        vi: "Trên 3 năm kinh nghiệm làm việc chuyên nghiệp với Node.js và Express hoặc NestJS",
      },
      {
        en: "Strong proficiency in TypeScript and modern JavaScript",
        vi: "Thành thạo TypeScript và JavaScript hiện đại",
      },
      {
        en: "Experience with relational (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis) databases",
        vi: "Có kinh nghiệm với cơ sở dữ liệu quan hệ (PostgreSQL, MySQL) và NoSQL (MongoDB, Redis)",
      },
      {
        en: "Familiarity with Docker, CI/CD pipelines, and cloud platforms (AWS, GCP)",
        vi: "Quen thuộc với Docker, pipeline CI/CD và các nền tảng đám mây (AWS, GCP)",
      },
      {
        en: "Understanding of microservices architecture and message queues",
        vi: "Hiểu về kiến trúc microservices và message queue",
      },
      {
        en: "Experience with unit and integration testing",
        vi: "Có kinh nghiệm kiểm thử đơn vị và kiểm thử tích hợp",
      },
    ],
    benefits: standardBenefits,
  },
  {
    slug: "full-stack-developer",
    title: {
      en: "Full-Stack Developer",
      vi: "Lập trình viên Full-stack",
    },
    department: ENGINEERING,
    location: HCMC,
    type: FULL_TIME,
    experience: { en: "2-4 years", vi: "2-4 năm" },
    description: {
      en: "Work across the entire stack to deliver end-to-end features for client projects. You will collaborate closely with designers, project managers, and other engineers to ship quality software.",
      vi: "Làm việc trên toàn bộ stack để bàn giao các tính năng trọn vẹn cho dự án khách hàng. Bạn sẽ cộng tác chặt chẽ với designer, project manager và các kỹ sư khác để hoàn thiện phần mềm chất lượng.",
    },
    requirements: [
      {
        en: "2+ years of professional full-stack development experience",
        vi: "Trên 2 năm kinh nghiệm phát triển full-stack chuyên nghiệp",
      },
      {
        en: "Proficiency in React or Vue.js for frontend development",
        vi: "Thành thạo React hoặc Vue.js cho phát triển frontend",
      },
      {
        en: "Experience with Node.js, Python, or PHP for backend development",
        vi: "Có kinh nghiệm với Node.js, Python hoặc PHP cho phát triển backend",
      },
      {
        en: "Working knowledge of relational databases and REST API design",
        vi: "Nắm vững cơ sở dữ liệu quan hệ và thiết kế REST API",
      },
      {
        en: "Familiarity with Git, code reviews, and agile workflows",
        vi: "Quen thuộc với Git, code review và quy trình agile",
      },
      {
        en: "Strong problem-solving skills and attention to detail",
        vi: "Kỹ năng giải quyết vấn đề tốt và chú trọng từng chi tiết",
      },
    ],
    benefits: standardBenefits,
  },
  {
    slug: "ui-ux-designer",
    title: {
      en: "UI/UX Designer",
      vi: "Designer UI/UX",
    },
    department: DESIGN,
    location: HCMC,
    type: FULL_TIME,
    experience: { en: "2-4 years", vi: "2-4 năm" },
    description: {
      en: "Create intuitive, visually compelling user interfaces and experiences for web and mobile applications. You will own the design process from research and wireframing through to high-fidelity prototypes.",
      vi: "Tạo ra các giao diện và trải nghiệm người dùng trực quan, hấp dẫn về thị giác cho ứng dụng web và mobile. Bạn sẽ phụ trách toàn bộ quy trình thiết kế, từ nghiên cứu, wireframe đến prototype độ chính xác cao.",
    },
    requirements: [
      {
        en: "2+ years of professional UI/UX design experience",
        vi: "Trên 2 năm kinh nghiệm thiết kế UI/UX chuyên nghiệp",
      },
      {
        en: "Proficiency in Figma, Sketch, or Adobe XD",
        vi: "Thành thạo Figma, Sketch hoặc Adobe XD",
      },
      {
        en: "Strong portfolio demonstrating user-centered design thinking",
        vi: "Portfolio thuyết phục thể hiện tư duy thiết kế lấy người dùng làm trung tâm",
      },
      {
        en: "Experience with design systems and component libraries",
        vi: "Có kinh nghiệm với design system và thư viện component",
      },
      {
        en: "Understanding of accessibility standards (WCAG 2.1)",
        vi: "Hiểu về các tiêu chuẩn khả năng tiếp cận (WCAG 2.1)",
      },
      {
        en: "Basic knowledge of HTML and CSS is a plus",
        vi: "Kiến thức cơ bản về HTML và CSS là một lợi thế",
      },
    ],
    benefits: standardBenefits,
  },
  {
    slug: "devops-engineer",
    title: {
      en: "DevOps Engineer",
      vi: "Kỹ sư DevOps",
    },
    department: ENGINEERING,
    location: HCMC,
    type: FULL_TIME,
    experience: { en: "2-4 years", vi: "2-4 năm" },
    description: {
      en: "Build and maintain CI/CD pipelines, cloud infrastructure, and deployment automation. You will ensure our systems are reliable, scalable, and secure across all environments.",
      vi: "Xây dựng và duy trì pipeline CI/CD, hạ tầng đám mây và tự động hóa triển khai. Bạn sẽ đảm bảo hệ thống của chúng tôi vận hành tin cậy, dễ mở rộng và an toàn trên mọi môi trường.",
    },
    requirements: [
      {
        en: "2+ years of experience in DevOps or site reliability engineering",
        vi: "Trên 2 năm kinh nghiệm trong lĩnh vực DevOps hoặc site reliability engineering",
      },
      {
        en: "Strong experience with AWS or GCP cloud services",
        vi: "Nhiều kinh nghiệm với các dịch vụ đám mây AWS hoặc GCP",
      },
      {
        en: "Proficiency with Docker, Kubernetes, and infrastructure-as-code (Terraform, Pulumi)",
        vi: "Thành thạo Docker, Kubernetes và infrastructure-as-code (Terraform, Pulumi)",
      },
      {
        en: "Experience building and optimizing CI/CD pipelines (GitHub Actions, GitLab CI)",
        vi: "Có kinh nghiệm xây dựng và tối ưu pipeline CI/CD (GitHub Actions, GitLab CI)",
      },
      {
        en: "Familiarity with monitoring and observability tools (Prometheus, Grafana, Datadog)",
        vi: "Quen thuộc với các công cụ giám sát và observability (Prometheus, Grafana, Datadog)",
      },
      {
        en: "Understanding of networking, security, and Linux system administration",
        vi: "Hiểu về mạng, bảo mật và quản trị hệ thống Linux",
      },
    ],
    benefits: standardBenefits,
  },
  {
    slug: "qa-engineer",
    title: {
      en: "QA Engineer",
      vi: "Kỹ sư QA",
    },
    department: ENGINEERING,
    location: HCMC,
    type: FULL_TIME,
    experience: { en: "2-4 years", vi: "2-4 năm" },
    description: {
      en: "Ensure the quality and reliability of our software products through comprehensive testing strategies. You will design test plans, automate regression tests, and work closely with development teams.",
      vi: "Đảm bảo chất lượng và độ tin cậy của các sản phẩm phần mềm thông qua chiến lược kiểm thử toàn diện. Bạn sẽ thiết kế kế hoạch kiểm thử, tự động hóa kiểm thử hồi quy và làm việc chặt chẽ với các đội phát triển.",
    },
    requirements: [
      {
        en: "2+ years of professional QA and software testing experience",
        vi: "Trên 2 năm kinh nghiệm QA và kiểm thử phần mềm chuyên nghiệp",
      },
      {
        en: "Experience with automated testing frameworks (Selenium, Playwright, Cypress)",
        vi: "Có kinh nghiệm với các framework kiểm thử tự động (Selenium, Playwright, Cypress)",
      },
      {
        en: "Strong understanding of SDLC, agile methodologies, and QA best practices",
        vi: "Hiểu sâu về SDLC, phương pháp agile và các thực hành QA chuẩn ngành",
      },
      {
        en: "Experience with API testing tools (Postman, Insomnia)",
        vi: "Có kinh nghiệm với các công cụ kiểm thử API (Postman, Insomnia)",
      },
      {
        en: "Familiarity with performance testing and security testing concepts",
        vi: "Quen thuộc với các khái niệm kiểm thử hiệu năng và kiểm thử bảo mật",
      },
      {
        en: "ISTQB certification is a plus",
        vi: "Chứng chỉ ISTQB là một lợi thế",
      },
    ],
    benefits: standardBenefits,
  },
  {
    slug: "project-manager",
    title: {
      en: "Project Manager",
      vi: "Quản lý Dự án",
    },
    department: MANAGEMENT,
    location: HCMC,
    type: FULL_TIME,
    experience: { en: "3-5 years", vi: "3-5 năm" },
    description: {
      en: "Lead software development projects from inception to delivery, ensuring they meet quality standards, timelines, and client expectations. You will manage cross-functional teams and serve as the primary client liaison.",
      vi: "Dẫn dắt các dự án phát triển phần mềm từ khởi đầu đến bàn giao, đảm bảo chất lượng, tiến độ và kỳ vọng của khách hàng. Bạn sẽ quản lý các đội liên chức năng và là đầu mối chính kết nối với khách hàng.",
    },
    requirements: [
      {
        en: "3+ years of project management experience in software development",
        vi: "Trên 3 năm kinh nghiệm quản lý dự án trong lĩnh vực phát triển phần mềm",
      },
      {
        en: "Strong knowledge of Agile and Scrum methodologies",
        vi: "Nắm vững phương pháp Agile và Scrum",
      },
      {
        en: "Experience with project management tools (Jira, Linear, Asana)",
        vi: "Có kinh nghiệm với các công cụ quản lý dự án (Jira, Linear, Asana)",
      },
      {
        en: "Excellent communication and stakeholder management skills",
        vi: "Kỹ năng giao tiếp và quản lý các bên liên quan xuất sắc",
      },
      {
        en: "Understanding of software development processes and technical concepts",
        vi: "Hiểu về quy trình phát triển phần mềm và các khái niệm kỹ thuật",
      },
      {
        en: "PMP or Scrum Master certification is a plus",
        vi: "Chứng chỉ PMP hoặc Scrum Master là một lợi thế",
      },
    ],
    benefits: standardBenefits,
  },
  {
    slug: "business-development-manager",
    title: {
      en: "Business Development Manager",
      vi: "Quản lý Phát triển Kinh doanh",
    },
    department: SALES,
    location: HCMC,
    type: FULL_TIME,
    experience: { en: "3-5 years", vi: "3-5 năm" },
    description: {
      en: "Drive business growth by identifying new opportunities, building client relationships, and expanding our market presence. You will develop strategic partnerships and contribute to revenue targets in international markets.",
      vi: "Thúc đẩy tăng trưởng kinh doanh bằng cách tìm kiếm cơ hội mới, xây dựng quan hệ khách hàng và mở rộng sự hiện diện thị trường. Bạn sẽ phát triển các đối tác chiến lược và đóng góp vào mục tiêu doanh thu tại các thị trường quốc tế.",
    },
    requirements: [
      {
        en: "3+ years of B2B sales or business development experience, preferably in IT services",
        vi: "Trên 3 năm kinh nghiệm bán hàng B2B hoặc phát triển kinh doanh, ưu tiên trong lĩnh vực dịch vụ IT",
      },
      {
        en: "Proven track record of meeting or exceeding revenue targets",
        vi: "Có thành tích đạt hoặc vượt mục tiêu doanh thu",
      },
      {
        en: "Strong understanding of IT outsourcing and software development services",
        vi: "Hiểu sâu về dịch vụ gia công IT và phát triển phần mềm",
      },
      {
        en: "Excellent English communication skills, both written and verbal",
        vi: "Kỹ năng giao tiếp tiếng Anh xuất sắc, cả viết và nói",
      },
      {
        en: "Experience with CRM tools and sales pipeline management",
        vi: "Có kinh nghiệm với công cụ CRM và quản lý pipeline bán hàng",
      },
      {
        en: "International business exposure is a strong advantage",
        vi: "Kinh nghiệm làm việc trong môi trường kinh doanh quốc tế là lợi thế lớn",
      },
    ],
    benefits: [
      {
        en: "Competitive salary with attractive commission structure",
        vi: "Lương cạnh tranh với cơ chế hoa hồng hấp dẫn",
      },
      {
        en: "Health insurance and wellness allowance",
        vi: "Bảo hiểm sức khỏe và phụ cấp chăm sóc sức khỏe",
      },
      {
        en: "Flexible working hours and hybrid work model",
        vi: "Giờ làm việc linh hoạt và mô hình làm việc hybrid",
      },
      {
        en: "Annual learning budget for courses and conferences",
        vi: "Ngân sách học tập hàng năm cho khóa học và hội thảo",
      },
    ],
  },
];
