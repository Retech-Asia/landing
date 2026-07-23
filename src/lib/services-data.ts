import {
  Layout,
  Users,
  BarChart3,
  Globe,
  Palette,
  UsersRound,
  ShieldCheck,
  Search,
  Smartphone,
  BarChart,
  Workflow,
  Headphones,
  type LucideIcon,
} from "lucide-react";

export interface ServiceFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface ServiceTimeline {
  week: string;
  phase: string;
  description: string;
}

export interface ServiceProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceData {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  gradient: string;
  /** Gradient CSS class for the hero accent bar (e.g. "from-brand to-accent-cyan") */
  heroAccent: string;
  /** Tailwind color token for the hero icon glow (e.g. "brand") */
  heroColor: string;
  features: ServiceFeature[];
  benefits: ServiceBenefit[];
  technologies: string[];
  processSteps: ServiceProcessStep[];
  faq: ServiceFAQ[];
  timeline: ServiceTimeline[];
}

export const services: ServiceData[] = [
  {
    slug: "cms-platforms",
    title: "CMS Platforms",
    subtitle: "Content Management Made Easy",
    description: "We build custom websites leveraging powerful CMS solutions, enabling businesses to manage and publish content efficiently across multiple platforms. Our approach combines headless and traditional architectures to give you the flexibility of modern content delivery with the ease of use your editorial team expects.",
    longDescription: "We build custom websites leveraging powerful CMS solutions, enabling businesses to manage and publish content efficiently across multiple platforms with ease and flexibility. Integrated AI features help streamline content organization, reduce human error, and enhance long-term maintainability.",
    icon: Layout,
    gradient: "from-brand/10 to-accent-cyan/10",
    heroAccent: "from-brand to-accent-cyan",
    heroColor: "brand",
    features: [
      { icon: Layout, title: "Custom Themes", description: "Bespoke designs tailored to your brand identity and user expectations." },
      { icon: ShieldCheck, title: "Security Hardening", description: "Enterprise-grade security with regular updates and vulnerability scanning." },
      { icon: Search, title: "SEO Optimization", description: "Built-in SEO best practices for maximum search engine visibility." },
      { icon: Smartphone, title: "Responsive Design", description: "Pixel-perfect layouts across all devices and screen sizes." },
      { icon: Workflow, title: "Content Workflows", description: "Custom editorial workflows with role-based permissions and approval chains." },
      { icon: Headphones, title: "Ongoing Support", description: "Dedicated maintenance and support to keep your CMS running smoothly." },
    ],
    benefits: [
      { title: "Faster Time-to-Market", description: "Launch your website weeks faster with our proven CMS frameworks and pre-built components." },
      { title: "Content Editor Freedom", description: "Non-technical teams can publish and manage content without developer dependencies." },
      { title: "SEO-Ready Architecture", description: "Server-side rendering, semantic markup, and optimized Core Web Vitals from day one." },
      { title: "Multi-Language Content Management", description: "Serve global audiences with built-in localization, translation workflows, and region-specific content delivery." },
      { title: "Content Scheduling and Publishing Workflows", description: "Plan content calendars with draft, review, and scheduled publishing states to keep your site consistently fresh." },
      { title: "Scalable Content Infrastructure", description: "Headless CMS backends that handle traffic spikes and growing content libraries without performance degradation." },
      { title: "Reduced Maintenance Overhead", description: "Managed updates, automated backups, and proactive monitoring so your team focuses on content, not infrastructure." },
    ],
    technologies: ["WordPress", "Strapi", "Contentful", "Sanity", "Next.js", "React", "GraphQL", "REST APIs", "Vercel", "Cloudflare"],
    processSteps: [
      { step: 1, title: "Discovery and Platform Selection", description: "We assess your content needs, editorial workflows, and technical requirements to recommend the right CMS — whether headless, monolithic, or hybrid." },
      { step: 2, title: "Design and Content Architecture", description: "Our team creates custom theme designs, defines content models, and builds a structured information architecture that supports your publishing goals." },
      { step: 3, title: "Development and Integration", description: "We build the front-end, configure plugins and integrations, set up content workflows, and implement SEO best practices throughout the stack." },
      { step: 4, title: "Content Migration and QA", description: "Existing content is carefully migrated with URL mapping and SEO preservation, followed by comprehensive testing across devices and browsers." },
      { step: 5, title: "Launch and Training", description: "We deploy the CMS, train your editorial team on day-to-day operations, and provide 30 days of post-launch support to ensure a smooth transition." },
    ],
    faq: [
      { question: "What CMS platforms do you work with?", answer: "We work with WordPress, Drupal, Strapi, Contentful, Sanity, and custom headless CMS solutions. We recommend the best platform based on your specific requirements, content complexity, and team capabilities." },
      { question: "How long does CMS development take?", answer: "A standard CMS website takes 4-8 weeks from kickoff to launch, depending on complexity. Custom CMS platforms with advanced features may take 8-16 weeks. We provide a detailed timeline during our discovery phase." },
      { question: "Do you provide CMS migration services?", answer: "Yes, we handle complete CMS migrations including content transfer, URL mapping, SEO preservation, and team training. We ensure zero data loss and minimal downtime during the transition." },
      { question: "Can you integrate AI into our CMS?", answer: "Absolutely. We integrate AI-powered features like automatic content tagging, smart search, content recommendations, automated image optimization, and predictive analytics to enhance your CMS capabilities." },
      { question: "What about CMS hosting and maintenance?", answer: "We offer managed hosting solutions with automatic updates, daily backups, security monitoring, and performance optimization. Our maintenance plans ensure your CMS stays secure and fast." },
    ],
    timeline: [
      { week: "Week 1-2", phase: "Discovery", description: "Requirements gathering, content audit, and CMS platform selection." },
      { week: "Week 2-4", phase: "Design", description: "Custom theme design, wireframes, and brand-aligned visual concepts." },
      { week: "Week 4-8", phase: "Development", description: "Theme build, content migration, plugin integration, and SEO setup." },
      { week: "Week 8-10", phase: "Launch", description: "QA testing, performance tuning, training, and go-live deployment." },
    ],
  },
  {
    slug: "crm-systems",
    title: "CRM Systems",
    subtitle: "Customer-Centric Tools",
    description: "We develop tailored websites integrated with CRM systems, designed to enhance customer engagement and improve communication. Whether extending an existing platform like Salesforce or HubSpot, or building a bespoke CRM from scratch, we focus on streamlining your sales, support, and marketing workflows into one unified system.",
    longDescription: "We develop tailored websites integrated with CRM systems, designed to enhance customer engagement, improve communication, and streamline client relationship workflows. With AI support, our solutions enable intelligent automation, predictive insights, and fewer operational mistakes \u2014 making your system easier to manage and scale.",
    icon: Users,
    gradient: "from-accent-cyan/10 to-accent-violet/10",
    heroAccent: "from-accent-cyan to-brand",
    heroColor: "accent-cyan",
    features: [
      { icon: Users, title: "Contact Management", description: "360-degree customer profiles with interaction history and insights." },
      { icon: BarChart, title: "Sales Pipeline", description: "Visual pipeline management with forecasting and automation." },
      { icon: Headphones, title: "Support Integration", description: "Unified support ticketing with customer context and SLA tracking." },
      { icon: Workflow, title: "Workflow Automation", description: "Automated lead nurturing, follow-ups, and task assignments." },
      { icon: BarChart3, title: "Analytics Dashboard", description: "Real-time reporting on sales performance and customer behavior." },
      { icon: ShieldCheck, title: "Data Security", description: "Role-based access, encryption, and compliance-ready data handling." },
    ],
    benefits: [
      { title: "360\u00b0 Customer View", description: "Unified profiles that consolidate every touchpoint, interaction, and transaction into a single source of truth." },
      { title: "Sales Pipeline Acceleration", description: "Automated lead scoring, follow-ups, and deal tracking that help your team close more deals, faster." },
      { title: "Actionable Analytics", description: "Real-time dashboards that turn customer data into revenue-driving decisions with visual reporting." },
      { title: "Automated Lead Nurturing", description: "Trigger-based email sequences, follow-up reminders, and task assignments that keep prospects engaged without manual effort." },
      { title: "Cross-Team Visibility", description: "Sales, marketing, and support teams share the same customer context, eliminating information silos and duplicated work." },
      { title: "Compliance-Ready Data Handling", description: "Built-in data governance, role-based access controls, and audit trails that meet GDPR and industry-specific regulations." },
    ],
    technologies: ["Salesforce", "HubSpot", "Zoho", "React", "Node.js", "PostgreSQL", "REST APIs", "TypeScript", "Redis", "Webhooks"],
    processSteps: [
      { step: 1, title: "Requirements and Workflow Mapping", description: "We interview stakeholders across sales, marketing, and support to map existing workflows, pain points, and integration requirements before selecting the right CRM approach." },
      { step: 2, title: "System Architecture and Design", description: "We design the data model, define custom fields and objects, plan third-party integrations, and create the UI/UX for any custom-facing components." },
      { step: 3, title: "Development and Integration", description: "Custom modules, API integrations, workflow automation rules, and dashboards are built iteratively with regular client reviews and demos." },
      { step: 4, title: "Data Migration and Testing", description: "Existing customer data is migrated with deduplication and field mapping, followed by end-to-end testing including user acceptance testing with your team." },
      { step: 5, title: "Deployment and Team Onboarding", description: "We launch the CRM, conduct hands-on training sessions for each user group, and provide post-launch support to ensure smooth adoption." },
    ],
    faq: [
      { question: "What CRM platforms do you integrate with?", answer: "We integrate with Salesforce, HubSpot, Zoho, Pipedrive, and custom CRM solutions. Our team can also build bespoke CRM systems tailored to your unique business processes." },
      { question: "How long does CRM development take?", answer: "CRM integration projects typically take 4-10 weeks. Custom CRM development can range from 8-20 weeks depending on the complexity of workflows, integrations, and automation requirements." },
      { question: "Can you automate our sales process?", answer: "Yes, we design and implement end-to-end sales automation including lead scoring, automated follow-ups, pipeline management, and AI-powered insights to help your sales team close more deals." },
      { question: "Do you provide CRM training?", answer: "We provide comprehensive training for your team including documentation, video tutorials, and hands-on workshops to ensure smooth adoption and maximum ROI from your CRM investment." },
      { question: "What about data migration to a new CRM?", answer: "We handle complete data migration with deduplication, field mapping, relationship preservation, and validation to ensure your data transfers cleanly to the new system." },
    ],
    timeline: [
      { week: "Week 1-2", phase: "Requirements", description: "Stakeholder interviews, workflow mapping, and CRM platform evaluation." },
      { week: "Week 2-5", phase: "Architecture", description: "Data model design, integration planning, and system architecture." },
      { week: "Week 5-10", phase: "Build", description: "Custom development, data migration, workflow automation, and API integrations." },
      { week: "Week 10-12", phase: "Deploy", description: "User acceptance testing, team training, and production rollout." },
    ],
  },
  {
    slug: "erp-solutions",
    title: "ERP Solutions",
    subtitle: "Insightful Dashboards",
    description: "We create integrated web solutions based on ERP systems, connecting departments and optimizing operations. From finance and HR to procurement and inventory, our ERP implementations unify your business processes into a single platform with real-time visibility across the organization.",
    longDescription: "We create integrated web solutions based on ERP systems, connecting departments, optimizing operations, and providing real-time data access for informed decision-making and sustainable growth. AI-driven analytics and process automation reduce manual effort, minimize errors, and ensure better system reliability and maintenance over time.",
    icon: BarChart3,
    gradient: "from-accent-violet/10 to-brand/10",
    heroAccent: "from-accent-violet to-brand",
    heroColor: "accent-violet",
    features: [
      { icon: BarChart3, title: "Real-Time Dashboards", description: "Live operational dashboards with customizable KPIs and alerts." },
      { icon: Workflow, title: "Process Automation", description: "Automated workflows across departments for efficiency and accuracy." },
      { icon: ShieldCheck, title: "Data Governance", description: "Centralized data management with audit trails and compliance." },
      { icon: Users, title: "Multi-Department", description: "Unified platform connecting finance, HR, operations, and more." },
      { icon: Globe, title: "Cloud Deployment", description: "Scalable cloud infrastructure with high availability and DR." },
      { icon: Smartphone, title: "Mobile Access", description: "Full ERP functionality on mobile devices for on-the-go management." },
    ],
    benefits: [
      { title: "Operational Efficiency", description: "Automate cross-department workflows and eliminate manual data entry, reducing processing time by up to 60%." },
      { title: "Real-Time Insights", description: "Live dashboards and KPI tracking give leadership the data they need to make informed decisions on the spot." },
      { title: "Scalable Architecture", description: "Cloud-native systems that grow with your business without costly re-platforming or migration projects." },
      { title: "Cross-Department Transparency", description: "Finance, HR, operations, and procurement share a single source of truth, eliminating data silos and reconciliation headaches." },
      { title: "Automated Compliance and Audit Trails", description: "Built-in logging, approval chains, and version tracking simplify regulatory compliance and internal audits." },
      { title: "Reduced IT Overhead", description: "Cloud deployment with managed infrastructure means fewer on-premise servers, lower maintenance costs, and automatic updates." },
      { title: "Mobile Workforce Enablement", description: "Approve purchase orders, review reports, and manage workflows from any device, keeping operations moving outside the office." },
    ],
    technologies: ["Odoo", "SAP", "Docker", "Kubernetes", "Python", "PostgreSQL", "Redis", "REST APIs", "AWS", "Nginx"],
    processSteps: [
      { step: 1, title: "Business Process Review", description: "We conduct department-level workshops to map current processes, identify bottlenecks, and define requirements for each ERP module." },
      { step: 2, title: "Platform Selection and Architecture", description: "Based on your scale, industry, and integration needs, we recommend the right ERP platform and design the overall system architecture." },
      { step: 3, title: "Configuration and Custom Development", description: "Core modules are configured, custom fields and workflows are built, and third-party integrations (CRM, e-commerce, payment gateways) are connected." },
      { step: 4, title: "Data Migration and User Acceptance Testing", description: "Legacy data is migrated with validation, and key users from each department participate in structured testing to verify workflows." },
      { step: 5, title: "Phased Rollout and Training", description: "We deploy modules in phases to minimize disruption, train each user group, and provide stabilization support during the transition period." },
    ],
    faq: [
      { question: "What ERP systems do you work with?", answer: "We work with Odoo, SAP, Microsoft Dynamics, NetSuite, and custom-built ERP solutions. We help you choose the right platform based on your industry, scale, and operational complexity." },
      { question: "How long does ERP implementation take?", answer: "ERP implementations typically range from 12-24 weeks for mid-sized deployments. We follow a phased approach starting with core modules, then expanding to additional departments and features." },
      { question: "Can you customize an existing ERP?", answer: "Yes, we specialize in custom ERP development and extending existing platforms with custom modules, integrations, dashboards, and workflows tailored to your specific business needs." },
      { question: "What about ERP integration with other systems?", answer: "We build seamless integrations between your ERP and CRM, e-commerce, HR systems, payment gateways, and third-party APIs using middleware and custom connectors." },
      { question: "Do you provide ERP support after launch?", answer: "We offer comprehensive post-launch support including bug fixes, feature additions, performance optimization, user training, and system upgrades with agreed SLAs." },
    ],
    timeline: [
      { week: "Week 1-3", phase: "Analysis", description: "Business process review, department workshops, and ERP platform selection." },
      { week: "Week 3-8", phase: "Design & Config", description: "Module configuration, workflow design, and data architecture planning." },
      { week: "Week 8-16", phase: "Development", description: "Custom module build, integrations, data migration, and user roles setup." },
      { week: "Week 16-20", phase: "Go-Live", description: "Pilot testing, staff training, phased rollout, and stabilization support." },
    ],
  },
  {
    slug: "web-development",
    title: "Web Development",
    subtitle: "Modern Web Applications",
    description: "Custom web applications built with modern frameworks, best practices, and scalable architecture. From responsive marketing sites to complex enterprise platforms, we deliver solutions optimized for performance, security, and long-term maintainability using an API-first approach.",
    longDescription: "We build high-performance web applications using modern technologies and frameworks. From single-page applications to complex enterprise platforms, our development team delivers scalable, secure, and maintainable solutions that drive business growth. Every project follows modern best practices including responsive design, API-first architecture, and comprehensive testing.",
    icon: Globe,
    gradient: "from-brand/10 to-accent-violet/10",
    heroAccent: "from-brand to-accent-violet",
    heroColor: "brand",
    features: [
      { icon: Globe, title: "Full-Stack Development", description: "Frontend and backend development with React, Next.js, Node.js, and more." },
      { icon: Smartphone, title: "Progressive Web Apps", description: "App-like web experiences with offline support and push notifications." },
      { icon: Search, title: "SEO-Friendly Architecture", description: "Server-side rendering, semantic HTML, and optimized performance." },
      { icon: ShieldCheck, title: "Security First", description: "OWASP-compliant development with authentication and encryption." },
      { icon: BarChart3, title: "Performance Optimization", description: "Core Web Vitals optimization, CDN setup, and caching strategies." },
      { icon: Workflow, title: "API Development", description: "RESTful and GraphQL APIs with documentation and versioning." },
    ],
    benefits: [
      { title: "Modern Stack", description: "React, Next.js, TypeScript, and Node.js \u2014 built with the tools top companies use." },
      { title: "Performance First", description: "Optimized Core Web Vitals, lazy loading, and CDN distribution for instant load times." },
      { title: "Security Hardened", description: "OWASP-compliant code with authentication, encryption, and regular vulnerability scanning." },
      { title: "Progressive Web App Capabilities", description: "Offline support, push notifications, and install-to-homescreen functionality that blur the line between web and native apps." },
      { title: "API-First Architecture", description: "Well-documented REST or GraphQL APIs that enable future integrations, mobile apps, and third-party connections without refactoring." },
      { title: "Automated Testing and CI/CD", description: "Unit tests, integration tests, and automated deployment pipelines that catch bugs early and ship updates with confidence." },
    ],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "GraphQL", "Docker", "Vercel", "Prisma"],
    processSteps: [
      { step: 1, title: "Technical Discovery and Planning", description: "We define the technical scope, choose the right architecture (SSR, SSG, SPA), plan the data model, and establish sprint milestones." },
      { step: 2, title: "UI/UX Design and Prototyping", description: "Interactive prototypes and high-fidelity designs are created with your brand identity, then validated with stakeholder feedback before development begins." },
      { step: 3, title: "Agile Development", description: "We build in 2-week sprints with regular demos, covering frontend components, backend APIs, database schema, and third-party integrations iteratively." },
      { step: 4, title: "Testing and Quality Assurance", description: "Automated test suites, cross-browser testing, performance audits, and security scans ensure production readiness before any code ships." },
      { step: 5, title: "Deployment and Handoff", description: "CI/CD pipelines are configured, the application is deployed to production, and comprehensive documentation plus 30-day support ensure a smooth launch." },
    ],
    faq: [
      { question: "What technologies do you use for web development?", answer: "We primarily use React, Next.js, TypeScript, Node.js, and PostgreSQL. We also work with Vue.js, Python, Go, and other technologies based on project requirements." },
      { question: "Do you build progressive web apps (PWAs)?", answer: "Yes, we build PWAs that work offline, load instantly, and provide a native app-like experience. PWAs are ideal for businesses that want mobile reach without app store distribution." },
      { question: "How do you ensure web application security?", answer: "We follow OWASP guidelines, implement authentication best practices, use encryption at rest and in transit, conduct security audits, and set up monitoring for threat detection." },
      { question: "What is your web development process?", answer: "We follow agile methodology with 2-week sprints. The process includes discovery, design, development, testing, staging, and launch with continuous client collaboration throughout." },
      { question: "Can you take over an existing web project?", answer: "Yes, we regularly take over existing projects. We start with a thorough code audit, document the current state, identify technical debt, and create a transition plan for smooth handover." },
    ],
    timeline: [
      { week: "Week 1-2", phase: "Planning", description: "Technical scoping, architecture decisions, and sprint roadmap." },
      { week: "Week 2-4", phase: "Design", description: "UI/UX design, component library, and responsive layouts." },
      { week: "Week 4-10", phase: "Development", description: "Frontend and backend build, API integration, and automated testing." },
      { week: "Week 10-12", phase: "Launch", description: "Staging review, performance optimization, CI/CD setup, and deployment." },
    ],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    subtitle: "User-Centered Design",
    description: "Design that drives engagement, conversion, and delight through research-backed user experiences. Our process combines user interviews, data analysis, and iterative prototyping to create interfaces that look great and perform measurably better than industry benchmarks.",
    longDescription: "Our UI/UX design process is grounded in user research, data-driven decisions, and iterative testing. We create interfaces that are not only beautiful but functional \u2014 driving measurable improvements in engagement, conversion, and user satisfaction. From wireframes to high-fidelity prototypes, every design decision is intentional and validated.",
    icon: Palette,
    gradient: "from-accent-cyan/10 to-brand/10",
    heroAccent: "from-accent-cyan to-accent-violet",
    heroColor: "accent-cyan",
    features: [
      { icon: Search, title: "User Research", description: "Interviews, surveys, and analytics to understand your users deeply." },
      { icon: Workflow, title: "Wireframing", description: "Low and high-fidelity wireframes to validate structure and flow." },
      { icon: Palette, title: "Visual Design", description: "Pixel-perfect designs with your brand identity and design system." },
      { icon: Smartphone, title: "Interactive Prototypes", description: "Clickable prototypes for stakeholder review and user testing." },
      { icon: BarChart3, title: "Usability Testing", description: "Real-user testing sessions to validate and refine designs." },
      { icon: Users, title: "Design Systems", description: "Scalable component libraries for consistent, efficient development." },
    ],
    benefits: [
      { title: "Research-Backed Decisions", description: "Every design choice is grounded in user research, analytics, and usability testing rather than guesswork." },
      { title: "Conversion Optimized", description: "Interfaces engineered with clear information hierarchy and call-to-action placement to guide users toward your business goals." },
      { title: "Design System Scale", description: "Reusable component libraries with documented tokens and guidelines ensure visual consistency as your product and team grow." },
      { title: "Accessibility Compliance", description: "WCAG 2.1 AA compliant designs with verified color contrast, keyboard navigation, and screen reader compatibility built in from the start." },
      { title: "Faster Development Handoff", description: "Developer-ready specs with auto-generated code snippets, spacing tokens, and asset exports that reduce back-and-forth during implementation." },
      { title: "Reduced Redesign Risk", description: "Early-stage prototyping and usability testing catch issues before development begins, saving significant time and budget downstream." },
    ],
    technologies: ["Figma", "FigJam", "Hotjar", "Maze", "React", "Storybook", "Design Systems", "Framer Motion", "Tailwind CSS", "Lottie"],
    processSteps: [
      { step: 1, title: "Discovery and User Research", description: "We conduct stakeholder interviews, user surveys, competitive analysis, and analytics reviews to build a clear picture of who your users are and what they need." },
      { step: 2, title: "Information Architecture and Wireframing", description: "User flows, site maps, and low-fidelity wireframes are created to validate structure, navigation, and content hierarchy before visual design begins." },
      { step: 3, title: "Visual Design and Prototyping", description: "High-fidelity mockups are designed with your brand identity, then assembled into clickable prototypes for stakeholder review and feedback rounds." },
      { step: 4, title: "Usability Testing and Iteration", description: "Real users interact with the prototypes while we observe pain points and gather feedback, then iterate on the designs until they perform well." },
      { step: 5, title: "Design System and Developer Handoff", description: "A complete design system with reusable components, design tokens, and detailed specs is delivered alongside annotated files for seamless developer handoff." },
    ],
    faq: [
      { question: "What is your UI/UX design process?", answer: "Our process includes discovery & research, information architecture, wireframing, visual design, prototyping, usability testing, and design handoff. Each phase includes client review and iteration." },
      { question: "What design tools do you use?", answer: "We use Figma for design and prototyping, FigJam for brainstorming, and build design systems with reusable components. We also use tools like Hotjar and Maze for user research." },
      { question: "How do you ensure designs are accessible?", answer: "We follow WCAG 2.1 AA guidelines, conduct accessibility audits, test with screen readers, verify color contrast ratios, and ensure keyboard navigation works throughout." },
      { question: "Do you create design systems?", answer: "Yes, we build comprehensive design systems with component libraries, design tokens, usage guidelines, and documentation that ensure consistency across your entire product." },
      { question: "How long does the design phase take?", answer: "Design timelines vary by project scope. A typical website design takes 3-6 weeks, while a complex web application design phase can take 6-12 weeks including research and testing." },
    ],
    timeline: [
      { week: "Week 1-2", phase: "Research", description: "User interviews, competitive analysis, and analytics review." },
      { week: "Week 2-4", phase: "Wireframes", description: "Information architecture, user flows, and low-fidelity wireframes." },
      { week: "Week 4-6", phase: "Visual Design", description: "High-fidelity mockups, design system, and interactive prototypes." },
      { week: "Week 6-8", phase: "Testing & Handoff", description: "Usability testing, iteration, and developer-ready design handoff." },
    ],
  },
  {
    slug: "dedicated-teams",
    title: "Dedicated Teams",
    subtitle: "Your Offshore Development Team",
    description: "Build your offshore development team with experienced engineers from Vietnam \u2014 fully managed, scalable, and cost-effective. We handle recruitment, HR, payroll, and infrastructure so you can focus on product development with a team that integrates seamlessly into your existing workflows.",
    longDescription: "Our dedicated team model gives you access to pre-vetted senior developers, designers, and project managers who work exclusively on your projects. We handle recruitment, HR, infrastructure, and team management while you maintain full technical control. Scale up or down as needed with minimal overhead and maximum flexibility.",
    icon: UsersRound,
    gradient: "from-accent-violet/10 to-accent-cyan/10",
    heroAccent: "from-accent-violet to-accent-cyan",
    heroColor: "accent-violet",
    features: [
      { icon: UsersRound, title: "Pre-Vetted Talent", description: "Senior engineers selected through rigorous technical assessments." },
      { icon: Headphones, title: "Fully Managed", description: "HR, payroll, equipment, and infrastructure all handled by us." },
      { icon: Workflow, title: "Agile Processes", description: "Scrum/Kanban workflows with daily standups and sprint planning." },
      { icon: ShieldCheck, title: "IP Protection", description: "NDAs, secure infrastructure, and compliance with your policies." },
      { icon: BarChart3, title: "Transparent Reporting", description: "Weekly reports, time tracking, and performance metrics." },
      { icon: Globe, title: "Timezone Friendly", description: "Overlap hours with AU, EU, and US timezones for collaboration." },
    ],
    benefits: [
      { title: "Pre-Vetted Senior Talent", description: "Every engineer passes a multi-stage technical assessment covering problem-solving, system design, and code quality before joining your team." },
      { title: "Full Flexibility", description: "Scale your team up or down with just 2-4 weeks notice, with no long-term lock-in contracts or penalties." },
      { title: "Seamless Integration", description: "Your offshore team joins your existing workflows, tools, and ceremonies as if they were in-house colleagues." },
      { title: "Cost-Effective Scaling", description: "Access senior engineering talent at competitive rates without the overhead of local hiring, office space, or benefits administration." },
      { title: "Zero Administrative Overhead", description: "We handle recruitment, HR, payroll, equipment, and office infrastructure so you never deal with employment logistics." },
      { title: "IP Protection and Security", description: "Signed NDAs, secure development environments, and compliance with your data security policies protect your intellectual property at all times." },
      { title: "Timezone Overlap for Real-Time Collaboration", description: "Vietnam-based teams overlap with Australian, European, and US business hours for daily standups and synchronous communication." },
    ],
    technologies: ["React", "Next.js", "Node.js", "Python", "Go", "TypeScript", "PostgreSQL", "Docker", "AWS", "GraphQL"],
    processSteps: [
      { step: 1, title: "Requirements Brief and Talent Matching", description: "You share your technical requirements, team composition needs, and desired start date. We present pre-screened candidate profiles within one week." },
      { step: 2, title: "Technical Interviews and Selection", description: "You conduct technical interviews with shortlisted candidates to evaluate fit, communication skills, and domain expertise before making final selections." },
      { step: 3, title: "Onboarding and Environment Setup", description: "Selected engineers are provisioned with secure workstations, VPN access, and development environments. They undergo a structured onboarding into your codebase and processes." },
      { step: 4, title: "Integration into Your Workflows", description: "The team joins your Slack/Jira/Linear boards, participates in standups and sprint planning, and begins delivering code within the first sprint cycle." },
      { step: 5, title: "Ongoing Management and Scaling", description: "We provide weekly performance reports, handle any HR needs, and can scale the team up or down based on your evolving project demands." },
    ],
    faq: [
      { question: "How quickly can you assemble a dedicated team?", answer: "We typically assemble a dedicated team within 2-4 weeks. Our talent pool of pre-vetted developers means we can staff projects quickly without compromising on quality." },
      { question: "What technologies do your developers specialize in?", answer: "Our developers specialize in React, Next.js, TypeScript, Node.js, Python, Go, React Native, Flutter, and more. We match team composition to your specific technology stack." },
      { question: "How do you handle communication and collaboration?", answer: "We use Slack, Jira, Confluence, and video conferencing for daily communication. Teams participate in your existing ceremonies and we ensure overlap hours for real-time collaboration." },
      { question: "What is the pricing model for dedicated teams?", answer: "We offer monthly retainer pricing based on team composition and seniority. There are no hidden costs \u2014 the fee covers salary, benefits, equipment, office space, and management overhead." },
      { question: "Can I scale the team up or down?", answer: "Yes, our model is designed for flexibility. You can add or reduce team members with 2-4 weeks notice. We also support short-term augmentations for specific sprints or projects." },
    ],
    timeline: [
      { week: "Week 1-2", phase: "Talent Selection", description: "Requirements brief, candidate screening, and technical interviews." },
      { week: "Week 2-3", phase: "Onboarding", description: "Team setup, environment provisioning, and process alignment." },
      { week: "Week 3-4", phase: "Integration", description: "Workflow adoption, first sprints, and communication rhythm setup." },
      { week: "Week 4+", phase: "Ongoing", description: "Continuous delivery, performance reviews, and team scaling as needed." },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}
