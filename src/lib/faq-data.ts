/**
 * Comprehensive FAQ data for the Retech Solutions FAQ page.
 *
 * Organized into six categories:
 *   General, Services, Process, Pricing, Technical, Support
 *
 * Each category has 6 questions with detailed, genuinely useful answers
 * that reflect real information about Retech's capabilities.
 */

import { CONTACT } from "./constants";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  slug: string;
  title: string;
  description: string;
  icon: string; // lucide icon name
  items: FAQItem[];
}

export const faqCategories: FAQCategory[] = [
  /* ── General ─────────────────────────────────────────────────────── */
  {
    slug: "general",
    title: "General",
    description: "Common questions about working with Retech Solutions.",
    icon: "HelpCircle",
    items: [
      {
        question: "What services does Retech Solutions offer?",
        answer:
          "We offer full-cycle software development services including custom web and mobile applications, CMS platforms (WordPress, Strapi, Webflow), CRM solutions (Salesforce, HubSpot integrations), ERP systems, AI-powered products, and dedicated development team services. Our expertise spans the entire lifecycle from business analysis and UI/UX design through development, testing, and deployment.",
      },
      {
        question: "Where is Retech Solutions located?",
        answer:
          "We are headquartered in Ho Chi Minh City, Vietnam, at 288K8 Nam Ky Khoi Nghia, Vo Thi Sau Ward. Vietnam's strong engineering talent pool and competitive cost structure allow us to deliver high-quality solutions while offering excellent value. Our team works across time zones to serve clients in Asia, Australia, Europe, and North America.",
      },
      {
        question: "How large is your team?",
        answer:
          "Our team consists of 30+ experienced engineers, designers, and project managers. We have delivered more than 50 projects across 6 countries over 5+ years. The team is structured to scale up or down based on project demands, ensuring we always have the right expertise available for your engagement.",
      },
      {
        question: "What industries do you serve?",
        answer:
          "We work across a range of industries including healthcare, education, e-commerce, logistics, real estate, and finance. Our adaptable approach means we invest time understanding your domain, regulations, and user expectations before writing a single line of code. This ensures every solution we deliver is tailored to your specific industry context.",
      },
      {
        question: "Do you work with startups or only established companies?",
        answer:
          "We work with both. For startups, we offer flexible engagement models that accommodate evolving requirements and tight budgets, including MVP development and rapid prototyping. For established businesses, we deliver enterprise-grade solutions with robust architecture, compliance considerations, and scalable infrastructure. Our experience spans early-stage ventures to large organizations.",
      },
      {
        question: "What makes Retech different from other outsourcing companies?",
        answer:
          "Three things set us apart: (1) Full-cycle ownership -- we handle everything from business analysis through deployment and support, not just coding. (2) Transparent communication -- you get direct access to your project team, weekly progress reports, and real-time task tracking via Jira or Linear. (3) Quality-first culture -- our engineers are pre-vetted through rigorous technical assessments, and we maintain a 98% client satisfaction rate.",
      },
    ],
  },

  /* ── Services ─────────────────────────────────────────────────────── */
  {
    slug: "services",
    title: "Services",
    description: "Questions about our CMS, CRM, ERP, web, mobile, and UI/UX services.",
    icon: "Layers",
    items: [
      {
        question: "What CMS platforms do you work with?",
        answer:
          "We work with WordPress, Drupal, Strapi, Contentful, Sanity, and custom headless CMS solutions. We recommend the best platform based on your content complexity, editorial team capabilities, and technical requirements. Our CMS services include custom theme development, plugin development, content migration, and managed hosting with security hardening.",
      },
      {
        question: "Can you build a CRM system from scratch?",
        answer:
          "Yes. While we integrate with existing platforms like Salesforce, HubSpot, and Zoho, we also build fully bespoke CRM systems when off-the-shelf solutions cannot accommodate unique business processes. Custom CRM development gives you complete control over data models, workflows, automation rules, and user interfaces tailored to your team.",
      },
      {
        question: "What ERP systems do you implement?",
        answer:
          "We work with Odoo, SAP, Microsoft Dynamics, NetSuite, and custom-built ERP solutions. Our implementations follow a phased approach: business process review, platform selection and architecture, configuration and custom development, data migration and UAT, then phased rollout with training. We ensure your ERP integrates seamlessly with your existing CRM, e-commerce, and HR systems.",
      },
      {
        question: "Do you offer mobile app development?",
        answer:
          "Yes, we build cross-platform mobile applications using React Native and Flutter, as well as native iOS and Android development when required. Our mobile team handles everything from UI/UX design through App Store and Google Play deployment, including push notifications, offline support, and API integration with your backend systems.",
      },
      {
        question: "What does your UI/UX design process look like?",
        answer:
          "Our design process follows five phases: (1) Discovery and user research -- interviews, surveys, competitive analysis. (2) Information architecture and wireframing. (3) Visual design and high-fidelity prototyping in Figma. (4) Usability testing with real users. (5) Design system creation and developer handoff with reusable components and documented tokens.",
      },
      {
        question: "How does the dedicated team model work?",
        answer:
          "Our dedicated team model provides you with a fully integrated extension of your in-house team. We assemble developers, designers, and project managers based on your tech stack and project requirements. The team works exclusively on your project, follows your processes, and reports directly to you. We handle recruitment, infrastructure, and HR while you retain full control over priorities and sprint planning.",
      },
    ],
  },

  /* ── Process ──────────────────────────────────────────────────────── */
  {
    slug: "process",
    title: "Process",
    description: "How we plan, build, and deliver your project from start to finish.",
    icon: "GitBranch",
    items: [
      {
        question: "What is your typical project lifecycle?",
        answer:
          "Every project follows a structured lifecycle: (1) Discovery -- requirements gathering, stakeholder interviews, and technical scoping. (2) Design -- wireframes, prototypes, and visual design. (3) Development -- agile sprints with regular demos. (4) Testing -- automated tests, cross-browser checks, performance audits, and security scans. (5) Deployment -- CI/CD setup, production launch, and monitoring. (6) Support -- post-launch maintenance and iterative improvements.",
      },
      {
        question: "What methodology do you follow?",
        answer:
          "We use agile methodologies, primarily Scrum with 2-week sprints. Each sprint includes planning, daily standups, development, and a sprint review with demo. We also support Kanban for maintenance and support engagements. The methodology is adapted to your preferences -- some clients prefer more structured waterfall approaches for fixed-scope projects, and we accommodate that too.",
      },
      {
        question: "How do we get started with a new project?",
        answer:
          `The process begins with a free consultation call where we discuss your goals, requirements, and timeline. We then provide a detailed proposal including scope, technical approach, timeline, and cost estimate. Once approved, we kick off with a discovery workshop, assemble the team, and begin development within 1-2 weeks. Contact us at ${CONTACT.email} to schedule your initial call.`,
      },
      {
        question: "How do you handle communication during a project?",
        answer:
          "We use agile methodologies with regular sprint planning, daily standups, and retrospectives. Communication happens through your preferred channels -- Slack, Microsoft Teams, or Zoom. You receive weekly progress reports and have direct access to the project manager and development team. We also use tools like Jira, Linear, or Notion for transparent task tracking so you always know the status of your project.",
      },
      {
        question: "How involved do I need to be during development?",
        answer:
          "That depends on your preference. Some clients want daily involvement in standups and design reviews, while others prefer weekly summaries and milestone demos. We recommend participating in sprint planning and review sessions (roughly 2-4 hours per sprint) to ensure alignment. Beyond that, our project managers handle day-to-day coordination so your time investment remains manageable.",
      },
      {
        question: "What happens after the project launches?",
        answer:
          "We provide 30 days of complimentary post-launch support covering bug fixes and minor adjustments. Beyond that, we offer ongoing maintenance packages that include regular updates, security patches, performance monitoring, and feature development. Many clients continue with a retainer model where we allocate dedicated hours each month for continuous improvement.",
      },
    ],
  },

  /* ── Pricing ──────────────────────────────────────────────────────── */
  {
    slug: "pricing",
    title: "Pricing",
    description: "How we estimate, price, and manage project budgets.",
    icon: "Receipt",
    items: [
      {
        question: "What pricing models do you offer?",
        answer:
          "We offer three flexible pricing models: (1) Fixed Price -- ideal for projects with well-defined scope and requirements, giving you cost certainty upfront. (2) Time and Materials -- best for evolving projects where flexibility is needed, billed hourly based on actual work. (3) Dedicated Team -- a monthly retainer for ongoing collaboration with a dedicated team. We recommend the best model based on your project scope and business objectives during our initial consultation.",
      },
      {
        question: "How do you estimate project costs?",
        answer:
          "We estimate costs through a detailed discovery process that includes requirements analysis, technical scoping, and work breakdown. We evaluate complexity, number of features, integration requirements, and design needs to produce a comprehensive estimate. For fixed-price projects, we provide a detailed proposal. For time-and-materials engagements, we share rate cards and estimated hours per phase.",
      },
      {
        question: "Is there a minimum project size?",
        answer:
          "We do not have a strict minimum project size. We have completed focused engagements like single-feature builds, CMS migrations, and UI/UX design sprints that ran for 2-4 weeks. That said, most of our successful engagements span at least 4-6 weeks to allow for proper discovery, development, and quality assurance. We are happy to discuss projects of any size during an initial consultation.",
      },
      {
        question: "What is included in the project cost?",
        answer:
          "Our project costs cover the full development lifecycle: business analysis, UI/UX design, frontend and backend development, QA testing, deployment, and documentation. For dedicated team engagements, the monthly retainer covers salary, benefits, equipment, office infrastructure, and management overhead. We are transparent about what is included and any optional add-ons before engagement begins.",
      },
      {
        question: "How do you handle scope changes during a project?",
        answer:
          "For agile (time-and-materials) projects, scope changes are handled naturally through sprint planning and backlog prioritization. For fixed-price projects, we follow a formal change request process: we assess the impact on timeline and cost, provide a revised estimate for your approval, and then implement the change. This ensures transparency and prevents unexpected budget overruns.",
      },
      {
        question: "Do you require upfront payment?",
        answer:
          "Typically, fixed-price projects are structured with milestone-based payments -- for example, 30% upfront, 30% at midpoint, and 40% on delivery. Dedicated team engagements are billed monthly in advance. We are flexible with payment structures and can accommodate terms that work for your organization, including net-30 invoicing for established accounts.",
      },
    ],
  },

  /* ── Technical ─────────────────────────────────────────────────────── */
  {
    slug: "technical",
    title: "Technical",
    description: "Our technology stack, infrastructure, and engineering practices.",
    icon: "Code2",
    items: [
      {
        question: "What technologies do you specialize in?",
        answer:
          "We work with a modern tech stack including React, Next.js, Vue.js, Node.js, Python, and TypeScript on the frontend and backend. For mobile, we use React Native and Flutter. Our CMS expertise covers WordPress, Strapi, and headless CMS architectures. We also have strong experience with cloud platforms (AWS, GCP, Azure), and we integrate AI/ML capabilities using frameworks like TensorFlow and OpenAI APIs.",
      },
      {
        question: "How do you ensure code quality?",
        answer:
          "We enforce code quality through multiple layers: code reviews on every pull request, automated linting and formatting (ESLint, Prettier), unit and integration testing with Jest and Playwright, static analysis tools, and CI/CD pipelines that run tests before any code reaches production. We also follow established coding standards and maintain comprehensive documentation throughout the project.",
      },
      {
        question: "What cloud platforms do you deploy on?",
        answer:
          "We deploy on AWS, Google Cloud Platform, Microsoft Azure, Vercel, and Cloudflare, depending on your project requirements and existing infrastructure. We set up CI/CD pipelines (GitHub Actions, GitLab CI, or similar), containerization with Docker, and infrastructure-as-code using tools like Terraform. We can also deploy to your existing cloud environment if you have one.",
      },
      {
        question: "How do you handle security?",
        answer:
          "Security is built into every phase of development. We follow OWASP guidelines, implement authentication best practices (OAuth 2.0, JWT, multi-factor authentication), use encryption at rest and in transit (TLS 1.3), conduct regular security audits and vulnerability scans, and set up monitoring for threat detection. We also ensure compliance with regulations like GDPR where applicable.",
      },
      {
        question: "Can you integrate AI into our product?",
        answer:
          "Yes, we integrate AI capabilities across our solutions. This includes AI-powered content tagging and recommendations in CMS platforms, predictive analytics and intelligent automation in CRM systems, natural language processing for chatbots and support tools, and custom ML models for domain-specific use cases. We work with OpenAI APIs, TensorFlow, and other AI frameworks to deliver practical, production-ready AI features.",
      },
      {
        question: "Do you support existing codebases?",
        answer:
          "Yes, we regularly take over and modernize existing projects. We start with a thorough code audit that evaluates architecture, technical debt, test coverage, and security posture. We then document the current state, identify areas for improvement, and create a transition plan. Whether you need ongoing maintenance, feature additions, or a complete refactor, we can integrate with your existing codebase.",
      },
    ],
  },

  /* ── Support ──────────────────────────────────────────────────────── */
  {
    slug: "support",
    title: "Support",
    description: "Post-launch maintenance, SLAs, and ongoing partnership.",
    icon: "HeadphonesIcon",
    items: [
      {
        question: "What post-launch support do you provide?",
        answer:
          "Every project includes 30 days of complimentary post-launch support covering bug fixes and minor adjustments. Beyond that, we offer structured maintenance packages that include regular updates, security patches, performance monitoring, uptime checks, and priority bug resolution. We also provide ongoing feature development through retainer agreements.",
      },
      {
        question: "What are your SLA response times?",
        answer:
          "Our standard SLA includes a 24-hour average response time for support requests. Critical issues (production outages, security vulnerabilities) are addressed within 4 hours. We tailor SLA terms based on your business needs, and higher-tier support agreements are available for mission-critical applications that require faster response and resolution times.",
      },
      {
        question: "Do you provide hosting and infrastructure management?",
        answer:
          "Yes, we offer managed hosting solutions that include server setup, configuration, monitoring, automated backups, SSL certificate management, CDN setup, and performance optimization. We manage infrastructure on AWS, GCP, Azure, Vercel, and Cloudflare. You can also choose to host on your own infrastructure and we will handle the deployment pipeline.",
      },
      {
        question: "How do you handle knowledge transfer?",
        answer:
          "We prioritize knowledge transfer throughout the engagement. This includes comprehensive technical documentation, architecture decision records, API documentation (Swagger/OpenAPI), runbooks for operations, and video walkthroughs for complex features. For dedicated team engagements, we also offer direct knowledge transfer sessions with your in-house team.",
      },
      {
        question: "Can we scale the team up or down after launch?",
        answer:
          "Absolutely. Our engagement models are designed for flexibility. You can add developers, designers, or specialists with 2-4 weeks notice. You can also scale down or transition to a lighter maintenance model when project demands decrease. There are no long-term lock-in contracts or penalties for adjusting team size.",
      },
      {
        question: "How do we report issues or request new features?",
        answer:
          "We set up a shared project management board (Jira, Linear, or Notion) where you can log issues and feature requests directly. Each item is triaged, prioritized, and scheduled into upcoming sprints. For urgent issues, you can reach your project manager directly via Slack or email. We maintain a transparent process so you can track the status of every request in real time.",
      },
    ],
  },
];

/** Flat list of all FAQ items across all categories -- used for JSON-LD. */
export const allFAQs: FAQItem[] = faqCategories.flatMap((cat) => cat.items);
