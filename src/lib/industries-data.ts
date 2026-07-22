import {
  HeartPulse,
  Landmark,
  ShoppingCart,
  GraduationCap,
  Building2,
  Truck,
  Factory,
  Cpu,
  Film,
  type LucideIcon,
} from "lucide-react";

export interface IndustryStat {
  value: number;
  suffix: string;
  label: string;
}

export interface IndustryApproachStep {
  step: string;
  title: string;
  description: string;
}

export type IndustryCategory = "enterprise" | "digital";

export interface Industry {
  slug: string;
  name: string;
  icon: LucideIcon;
  description: string;
  longDescription: string;
  challenges: string[];
  solutions: string[];
  technologies: string[];
  caseStudyExcerpt: string;
  color: string;
  /** Tailwind gradient classes for hero backgrounds */
  gradient: string;
  /** Key statistics to display with AnimatedCounter */
  stats: IndustryStat[];
  /** Methodology steps for the "Our Approach" section */
  approach: IndustryApproachStep[];
  /** Slugs of related services */
  relatedServiceSlugs: string[];
  /** Industry tag matching case study `industry` field */
  caseStudyIndustry: string;
  /** Category for filter tabs: enterprise = traditional industries, digital = tech-first industries */
  category: IndustryCategory;
}

export const industries: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    icon: HeartPulse,
    description:
      "HIPAA-compliant platforms for patient management, telemedicine, and health analytics that improve care delivery and clinical outcomes. We build secure, reliable systems that integrate with existing EHR infrastructure using HL7/FHIR standards for seamless data exchange. From patient portals to clinical decision-support dashboards, our solutions are designed to reduce administrative burden and let healthcare professionals focus on what matters most — patient care.",
    longDescription:
      "The healthcare industry is undergoing a massive digital transformation, driven by the need for better patient outcomes, regulatory compliance, and operational efficiency. From electronic health records to telemedicine platforms, technology is reshaping how care is delivered, managed, and experienced by patients worldwide.\n\nRetech Solutions brings deep expertise in building HIPAA-compliant healthcare software that meets the highest standards of security and reliability. Our team understands the complexities of healthcare data interoperability, patient privacy regulations, and the critical importance of system uptime in clinical environments.\n\nWhether you need a patient portal, a health analytics dashboard, or a full-scale telemedicine platform, we deliver solutions that integrate seamlessly with existing clinical workflows and comply with HL7/FHIR standards for health data exchange.",
    challenges: [
      "Ensuring HIPAA compliance and patient data security across all systems",
      "Integrating disparate health information systems with HL7/FHIR standards",
      "Building intuitive interfaces for clinicians with limited technical training",
      "Maintaining system reliability and uptime in critical clinical environments",
    ],
    solutions: [
      "HIPAA-compliant patient portals with secure authentication and audit trails",
      "Telemedicine platforms with real-time video, scheduling, and prescription management",
      "Health analytics dashboards for population health and clinical decision support",
      "EHR/EMR integration using HL7 FHIR APIs for seamless data exchange",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "HL7/FHIR", "TypeScript", "Docker", "WebRTC"],
    caseStudyExcerpt:
      "We have delivered secure, user-facing healthcare platforms that handle sensitive patient data with strict compliance requirements, demonstrating our ability to build reliable clinical-grade software.",
    color: "text-brand",
    gradient: "from-brand/10 via-brand/5 to-accent-cyan/5",
    stats: [
      { value: 99, suffix: ".9%", label: "Uptime SLA" },
      { value: 100, suffix: "%", label: "HIPAA Compliant" },
      { value: 40, suffix: "%", label: "Faster Workflows" },
      { value: 3, suffix: "x", label: "Patient Engagement" },
    ],
    approach: [
      { step: "01", title: "Compliance Audit", description: "We start by mapping your regulatory requirements — HIPAA, HL7, FHIR — and establishing a security-first architecture baseline." },
      { step: "02", title: "Clinical Discovery", description: "We work alongside clinicians and administrators to understand real workflows, pain points, and integration needs." },
      { step: "03", title: "Secure Development", description: "Iterative, test-driven development with continuous security review, audit trail logging, and data encryption at every layer." },
      { step: "04", title: "Integration & Launch", description: "Seamless EHR/EMR integration, user acceptance testing with clinical staff, and phased deployment with monitoring." },
    ],
    relatedServiceSlugs: ["web-development", "ui-ux-design", "dedicated-teams"],
    caseStudyIndustry: "Health & Wellness",
    category: "enterprise",
  },
  {
    slug: "finance",
    name: "Finance",
    icon: Landmark,
    description:
      "Secure, scalable financial systems for investment management, banking portals, and regulatory compliance workflows. Our team has deep experience building platforms that process complex financial data with zero tolerance for error, from real-time portfolio analytics to automated compliance reporting. We balance speed, security, and regulatory adherence to deliver fintech solutions that institutions and startups alike can trust.",
    longDescription:
      "Financial services demand the highest levels of security, performance, and regulatory compliance. From real-time trading dashboards to banking portals serving millions of users, fintech software must handle complex transactions with zero tolerance for error while meeting stringent regulatory requirements.\n\nRetech Solutions has extensive experience building financial technology platforms that balance speed, security, and scalability. Our engineers understand the nuances of financial data processing, real-time market data handling, and the regulatory frameworks that govern financial software across different jurisdictions.\n\nWe partner with financial institutions and fintech startups alike to deliver solutions ranging from investment management platforms and banking portals to compliance automation tools and real-time analytics dashboards.",
    challenges: [
      "Meeting strict regulatory compliance (PCI-DSS, SOX, AML/KYC) requirements",
      "Processing high-volume financial transactions with zero-downtime reliability",
      "Securing sensitive financial data against increasingly sophisticated threats",
      "Building real-time dashboards that handle volatile market data streams",
    ],
    solutions: [
      "Secure banking portals with multi-factor authentication and role-based access",
      "Investment management platforms with real-time portfolio tracking and analytics",
      "Regulatory compliance automation tools for reporting and audit trails",
      "Real-time financial dashboards with live market data visualization",
    ],
    technologies: ["React", "Python", "PostgreSQL", "Redis", "Docker", "TypeScript", "Kubernetes", "GraphQL"],
    caseStudyExcerpt:
      "Our work on the Asset Management Platform showcases our ability to build sophisticated financial platforms with complex data modeling, real-time dashboards, and enterprise-grade security.",
    color: "text-accent-cyan",
    gradient: "from-accent-cyan/10 via-accent-cyan/5 to-brand/5",
    stats: [
      { value: 60, suffix: "%", label: "Cost Reduction" },
      { value: 99, suffix: ".7%", label: "Data Accuracy" },
      { value: 85, suffix: "%", label: "Faster Reporting" },
      { value: 256, suffix: "-bit", label: "Encryption" },
    ],
    approach: [
      { step: "01", title: "Risk Assessment", description: "We evaluate your regulatory landscape, data sensitivity, and threat vectors to design a security-first architecture." },
      { step: "02", title: "Data Architecture", description: "We model your financial data flows, design real-time processing pipelines, and establish governance controls." },
      { step: "03", title: "Compliant Development", description: "Agile development with continuous compliance checks, automated testing, and security scanning at every sprint." },
      { step: "04", title: "Audit & Deployment", description: "Penetration testing, regulatory audit preparation, and phased rollout with comprehensive monitoring." },
    ],
    relatedServiceSlugs: ["web-development", "dedicated-teams", "cms-platforms"],
    caseStudyIndustry: "Finance",
    category: "enterprise",
  },
  {
    slug: "e-commerce",
    name: "E-commerce",
    icon: ShoppingCart,
    description:
      "High-performance online stores and marketplace platforms with advanced inventory, payment, and customer management features. We specialize in building commerce experiences that drive conversion — from headless architectures with sub-second page loads to AI-powered product recommendations. Whether B2C or B2B marketplace, our solutions scale with your business and integrate with the payment, logistics, and marketing tools you already use.",
    longDescription:
      "The e-commerce landscape is more competitive than ever, with consumers expecting fast, seamless shopping experiences across every device and channel. Building a successful online retail platform requires robust architecture, intelligent product discovery, and frictionless checkout flows that maximize conversion rates.\n\nRetech Solutions specializes in building high-performance e-commerce platforms that scale with your business. From custom storefronts and marketplace systems to inventory management and payment integration, we deliver solutions that drive revenue and customer satisfaction.\n\nOur team has deep experience with modern e-commerce architectures, including headless CMS integrations, omnichannel commerce strategies, and advanced features like AI-powered product recommendations, dynamic pricing, and real-time inventory synchronization across multiple warehouses.",
    challenges: [
      "Delivering sub-second page loads during high-traffic sales events and promotions",
      "Managing complex multi-warehouse inventory in real time across channels",
      "Integrating diverse payment gateways while ensuring PCI compliance",
      "Building personalized shopping experiences that drive conversion and retention",
    ],
    solutions: [
      "Custom online stores and marketplace platforms built for speed and conversion",
      "Inventory management systems with real-time synchronization and forecasting",
      "Payment integration with Stripe, PayPal, and regional payment gateways",
      "Headless commerce architectures with Next.js storefronts and API-driven backends",
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Shopify", "TypeScript", "Redis", "Elasticsearch"],
    caseStudyExcerpt:
      "We build high-performance e-commerce platforms with advanced content management, seamless checkout experiences, and scalable architectures that handle high-traffic sales events without breaking a sweat.",
    color: "text-accent-violet",
    gradient: "from-accent-violet/10 via-accent-violet/5 to-accent-cyan/5",
    stats: [
      { value: 40, suffix: "%", label: "Higher Conversions" },
      { value: 99, suffix: ".9%", label: "Uptime" },
      { value: 200, suffix: "ms", label: "Avg Response" },
      { value: 50, suffix: "%", label: "Faster Load Times" },
    ],
    approach: [
      { step: "01", title: "Commerce Audit", description: "We analyze your current storefront performance, conversion funnel, and customer journey to identify optimization opportunities." },
      { step: "02", title: "Platform Strategy", description: "We recommend the right commerce architecture — headless, monolithic, or marketplace — based on your catalog and traffic needs." },
      { step: "03", title: "Iterative Build", description: "Sprint-based development with continuous performance testing, conversion optimization, and payment integration validation." },
      { step: "04", title: "Launch & Optimize", description: "Load testing, SEO migration, analytics setup, and post-launch optimization with A/B testing and monitoring." },
    ],
    relatedServiceSlugs: ["cms-platforms", "web-development", "ui-ux-design"],
    caseStudyIndustry: "E-commerce",
    category: "digital",
  },
  {
    slug: "education",
    name: "Education",
    icon: GraduationCap,
    description:
      "Learning management systems, student portals, and educational platforms that make knowledge accessible and engaging for learners at every level. We combine modern web technologies with pedagogical best practices to build adaptive, mobile-first learning experiences that improve completion rates and student outcomes. From K-12 to corporate training, our solutions support real-time collaboration, multi-language content, and data-driven progress tracking.",
    longDescription:
      "Education technology is transforming how students learn, teachers teach, and institutions operate. From K-12 to higher education and corporate training, digital platforms are enabling personalized learning experiences, real-time collaboration, and data-driven educational outcomes at scale.\n\nRetech Solutions builds comprehensive learning management systems and educational platforms that serve students, educators, and administrators. Our solutions combine modern web technologies with pedagogical best practices to create engaging, accessible, and measurable learning experiences.\n\nWhether you need an LMS with adaptive learning paths, a student portal with real-time progress tracking, or a corporate training platform with certification management, our team delivers solutions that make education more effective and accessible.",
    challenges: [
      "Scaling platforms to handle thousands of concurrent video streams and interactive sessions",
      "Building adaptive learning algorithms that personalize content for diverse student needs",
      "Ensuring accessibility compliance (WCAG) while maintaining rich interactive experiences",
      "Integrating with existing student information systems and institutional infrastructure",
    ],
    solutions: [
      "Cloud-native LMS platforms with adaptive learning paths and AI-powered recommendations",
      "Real-time collaboration tools with WebRTC video, chat, and shared workspaces",
      "Student analytics dashboards for progress tracking and early intervention",
      "Mobile-first design that ensures learning is accessible on any device",
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "WebRTC", "AWS", "Redis", "TensorFlow"],
    caseStudyExcerpt:
      "We have developed learning management platforms with adaptive learning paths, real-time collaboration tools, and AI-powered study recommendations — enabling educational institutions to significantly improve student engagement and completion rates.",
    color: "text-brand",
    gradient: "from-brand/10 via-accent-cyan/5 to-brand/5",
    stats: [
      { value: 50, suffix: "K+", label: "Students Served" },
      { value: 340, suffix: "%", label: "Engagement Increase" },
      { value: 72, suffix: "%", label: "Completion Rate" },
      { value: 87, suffix: "%", label: "Faster Load Times" },
    ],
    approach: [
      { step: "01", title: "Pedagogical Discovery", description: "We work with educators and students to understand learning objectives, workflows, and pain points in existing systems." },
      { step: "02", title: "Learner-Centered Design", description: "Accessibility-first UX design with student, teacher, and admin dashboards optimized for diverse learning contexts." },
      { step: "03", title: "Scalable Development", description: "Cloud-native architecture with adaptive algorithms, real-time collaboration, and progressive loading for media-rich content." },
      { step: "04", title: "Phased Rollout", description: "Staged deployment with educator training, student onboarding, and continuous optimization based on learning analytics." },
    ],
    relatedServiceSlugs: ["web-development", "ui-ux-design", "dedicated-teams"],
    caseStudyIndustry: "Education",
    category: "digital",
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    icon: Building2,
    description:
      "Property management systems, listing platforms, and CRM tools that streamline operations for agents, developers, and investors. We build data-rich real estate platforms that connect buyers, sellers, and property managers through intuitive interfaces with virtual tours, automated valuations, and predictive market analytics. Our solutions cover residential, commercial, and industrial real estate — reducing overhead and accelerating deal cycles.",
    longDescription:
      "The real estate industry is embracing digital transformation to streamline property management, enhance buyer experiences, and optimize investment decisions. Modern real estate platforms need to handle complex property data, virtual tours, automated valuations, and seamless transaction workflows.\n\nRetech Solutions builds real estate technology platforms that connect buyers, sellers, agents, and property managers through intuitive, data-rich interfaces. From MLS-integrated listing platforms to property management systems with automated rent collection, we deliver solutions that modernize every aspect of real estate operations.\n\nOur experience spans residential, commercial, and industrial real estate, with solutions that incorporate AI-powered property valuations, virtual tour integrations, and predictive market analytics.",
    challenges: [
      "Managing large property databases with complex search and filtering requirements",
      "Building virtual tour and 3D visualization experiences that load quickly",
      "Integrating with MLS systems, payment gateways, and document management platforms",
      "Handling seasonal traffic spikes during peak buying and renting seasons",
    ],
    solutions: [
      "Custom listing platforms with advanced search, maps, and virtual tour integration",
      "Property management systems with automated rent collection and maintenance tracking",
      "AI-powered property valuation tools with predictive market analytics",
      "CRM systems for agents with lead management, showing scheduling, and pipeline tracking",
    ],
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "AWS", "Google Maps API", "Stripe", "Redis"],
    caseStudyExcerpt:
      "We deliver real estate platforms that combine rich property data, intelligent search, and seamless transaction workflows — helping agents close deals faster and property managers reduce operational overhead.",
    color: "text-accent-cyan",
    gradient: "from-accent-cyan/10 via-brand/5 to-accent-cyan/5",
    stats: [
      { value: 3, suffix: "x", label: "Faster Listings" },
      { value: 45, suffix: "%", label: "Less Admin Work" },
      { value: 98, suffix: "%", label: "Data Accuracy" },
      { value: 24, suffix: "/7", label: "Platform Availability" },
    ],
    approach: [
      { step: "01", title: "Market Analysis", description: "We study your local real estate market, regulatory requirements, and competitive landscape to inform platform design." },
      { step: "02", title: "Data Architecture", description: "We design your property data model, MLS integration strategy, and search indexing for fast, accurate results." },
      { step: "03", title: "Agile Development", description: "Iterative development with continuous feedback from agents and property managers, ensuring the platform fits real workflows." },
      { step: "04", title: "Launch & Scale", description: "Phased rollout with data migration, team training, and performance optimization for peak traffic handling." },
    ],
    relatedServiceSlugs: ["cms-platforms", "crm-systems", "web-development"],
    caseStudyIndustry: "Real Estate",
    category: "enterprise",
  },
  {
    slug: "logistics",
    name: "Logistics",
    icon: Truck,
    description:
      "Fleet management, route optimization, and supply chain visibility tools that reduce costs and improve delivery performance. We leverage AI, real-time GPS tracking, and predictive analytics to optimize every link in the supply chain — from warehouse management to last-mile delivery. Our platforms help logistics companies scale operations without proportional overhead increases, keeping deliveries on time and budgets intact.",
    longDescription:
      "The logistics industry operates on razor-thin margins where efficiency gains directly translate to competitive advantage. From last-mile delivery optimization to warehouse management and supply chain visibility, technology is the key differentiator in modern logistics operations.\n\nRetech Solutions builds intelligent logistics platforms that leverage AI, real-time GPS tracking, and predictive analytics to optimize every link in the supply chain. Our solutions help logistics companies reduce costs, improve on-time delivery rates, and scale operations without proportional overhead increases.\n\nWhether you need a fleet management dashboard, a route optimization engine, or a full-stack logistics platform with driver apps and customer portals, we deliver solutions that keep your operations moving efficiently.",
    challenges: [
      "Optimizing routes across hundreds of delivery points with real-time traffic data",
      "Providing real-time visibility across complex multi-modal supply chains",
      "Managing fleet maintenance schedules and driver compliance requirements",
      "Handling peak season volume spikes without performance degradation",
    ],
    solutions: [
      "AI-powered route optimization that reduces fuel costs and improves delivery times",
      "Real-time fleet tracking dashboards with GPS integration and predictive ETAs",
      "Automated dispatch systems with driver assignment and load balancing",
      "Driver mobile apps with navigation, proof-of-delivery, and digital signatures",
    ],
    technologies: ["React", "Python", "PostgreSQL", "Redis", "Docker", "Google Maps API", "TensorFlow", "WebSocket"],
    caseStudyExcerpt:
      "We have built logistics platforms with AI-powered route optimization, real-time fleet tracking, and automated dispatch systems — helping logistics companies reduce fuel costs and improve on-time delivery rates across their operations.",
    color: "text-accent-violet",
    gradient: "from-accent-violet/10 via-brand/5 to-accent-violet/5",
    stats: [
      { value: 35, suffix: "%", label: "Cost Reduction" },
      { value: 96, suffix: "%", label: "On-Time Delivery" },
      { value: 2000, suffix: "+", label: "Daily Deliveries" },
      { value: 45, suffix: "%", label: "Efficiency Gain" },
    ],
    approach: [
      { step: "01", title: "Operations Audit", description: "We analyze your current logistics workflows, fleet composition, and delivery patterns to identify optimization opportunities." },
      { step: "02", title: "System Design", description: "We design the route optimization engine, tracking infrastructure, and integration architecture for your logistics platform." },
      { step: "03", title: "Iterative Build", description: "Sprint-based development with real-world testing using actual delivery data, driver feedback, and operational metrics." },
      { step: "04", title: "Phased Rollout", description: "Gradual fleet onboarding, driver training, integration with mapping and payment providers, and continuous optimization." },
    ],
    relatedServiceSlugs: ["web-development", "erp-solutions", "dedicated-teams"],
    caseStudyIndustry: "Logistics",
    category: "enterprise",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    icon: Factory,
    description:
      "Production tracking, inventory management, and ERP integrations that boost operational efficiency and reduce unplanned downtime. We build software that bridges the gap between operational technology and information technology — connecting IoT sensors, legacy PLC systems, and enterprise planning tools into a unified, real-time view of your operations. Our shop-floor-friendly interfaces are designed for workers with varying technical skills, not just IT teams.",
    longDescription:
      "Manufacturing is undergoing its fourth industrial revolution, with IoT sensors, AI-driven quality control, and real-time production monitoring transforming factory floors worldwide. Software plays a critical role in connecting machines, people, and processes to maximize throughput and minimize waste.\n\nRetech Solutions builds manufacturing software that bridges the gap between operational technology and information technology. From production tracking dashboards and quality management systems to full ERP integrations, we deliver solutions that give manufacturers real-time visibility and control over their operations.\n\nOur team understands the unique challenges of manufacturing environments — from integrating with legacy PLC systems to building intuitive interfaces for shop floor workers — and we design solutions that work in the real world, not just on paper.",
    challenges: [
      "Connecting legacy machinery and PLC systems to modern cloud platforms",
      "Building intuitive interfaces for shop floor workers with varying technical skills",
      "Managing real-time production data from thousands of IoT sensors",
      "Integrating production systems with ERP, supply chain, and quality management tools",
    ],
    solutions: [
      "Real-time production dashboards with OEE tracking and bottleneck identification",
      "Quality management systems with statistical process control and automated inspections",
      "Inventory management with automated reorder points and supplier integration",
      "ERP integration modules that connect shop floor data to financial and planning systems",
    ],
    technologies: ["React", "Python", "PostgreSQL", "Docker", "MQTT", "Kubernetes", "AWS IoT", "Grafana"],
    caseStudyExcerpt:
      "We build manufacturing software that connects shop floor operations with enterprise systems — giving managers real-time visibility into production, quality, and inventory across every line.",
    color: "text-brand",
    gradient: "from-brand/10 via-accent-violet/5 to-brand/5",
    stats: [
      { value: 30, suffix: "%", label: "Less Downtime" },
      { value: 25, suffix: "%", label: "Efficiency Gain" },
      { value: 99, suffix: ".5%", label: "Quality Rate" },
      { value: 40, suffix: "%", label: "Faster Reporting" },
    ],
    approach: [
      { step: "01", title: "Factory Assessment", description: "We audit your production lines, data sources, and existing systems to understand the current state and integration points." },
      { step: "02", title: "Architecture Design", description: "We design the data pipeline from sensors to dashboards, including edge computing for low-latency shop floor decisions." },
      { step: "03", title: "Connected Development", description: "Iterative development with real sensor data, shop floor user testing, and continuous integration with legacy systems." },
      { step: "04", title: "Deploy & Train", description: "Phased deployment by production line, operator training, and ongoing optimization based on real production metrics." },
    ],
    relatedServiceSlugs: ["erp-solutions", "web-development", "dedicated-teams"],
    caseStudyIndustry: "Manufacturing",
    category: "enterprise",
  },
  {
    slug: "technology",
    name: "Technology",
    icon: Cpu,
    description:
      "Developer tools, SaaS platforms, and cloud-native applications built with modern architectures and scalable infrastructure. We speak your language — our engineers bring deep expertise in microservices, event-driven architectures, and infrastructure automation. From MVP development and rapid prototyping to full-scale platform engineering, we help technology companies ship faster and scale reliably.",
    longDescription:
      "Technology companies need software partners who speak their language — engineers who understand distributed systems, API design, and the trade-offs involved in building products that scale from hundreds to millions of users. Whether you are building a developer tool, a SaaS platform, or a cloud-native application, the quality of your engineering directly impacts your competitive position.\n\nRetech Solutions partners with technology companies to build products that are architected for scale from day one. Our engineers bring deep expertise in microservices, event-driven architectures, and cloud infrastructure — and we apply the same rigorous engineering practices to your product that we would to our own.\n\nFrom MVP development and rapid prototyping to full-scale platform engineering and DevOps automation, we help technology companies ship faster, scale reliably, and maintain the engineering velocity they need to win in competitive markets.",
    challenges: [
      "Architecting systems that scale from MVP to millions of users without re-platforming",
      "Building developer-friendly APIs with comprehensive documentation and SDKs",
      "Managing multi-tenant infrastructure with strong isolation and performance guarantees",
      "Maintaining engineering velocity while managing technical debt and system complexity",
    ],
    solutions: [
      "Cloud-native SaaS platforms with multi-tenant architecture and horizontal scaling",
      "Developer tools and APIs with SDKs, webhooks, and comprehensive documentation",
      "CI/CD pipeline automation with infrastructure-as-code and automated testing",
      "Microservices architecture with event-driven communication and service mesh",
    ],
    technologies: ["React", "Go", "TypeScript", "Kubernetes", "AWS", "Terraform", "PostgreSQL", "Kafka"],
    caseStudyExcerpt:
      "We help technology companies build products that scale — from MVP to enterprise — with the engineering rigor, architectural patterns, and DevOps practices that high-growth startups and established tech firms demand.",
    color: "text-accent-cyan",
    gradient: "from-accent-cyan/10 via-accent-violet/5 to-accent-cyan/5",
    stats: [
      { value: 10, suffix: "x", label: "Faster Deploys" },
      { value: 99, suffix: ".99%", label: "Uptime" },
      { value: 50, suffix: "%", label: "Cost Optimization" },
      { value: 0, suffix: " Downtime", label: "Deploy Strategy" },
    ],
    approach: [
      { step: "01", title: "Technical Audit", description: "We review your existing architecture, codebase, and infrastructure to identify bottlenecks, risks, and improvement opportunities." },
      { step: "02", title: "Architecture Design", description: "We design scalable system architecture — event-driven, microservices, or monolithic — based on your specific scale and latency needs." },
      { step: "03", title: "Engineering Sprint", description: "Dedicated engineering sprints with code reviews, pair programming, and continuous integration following your team's practices." },
      { step: "04", title: "Scale & Operate", description: "Load testing, performance optimization, infrastructure automation, and handoff with comprehensive documentation and runbooks." },
    ],
    relatedServiceSlugs: ["web-development", "dedicated-teams"],
    caseStudyIndustry: "Technology",
    category: "digital",
  },
  {
    slug: "media-entertainment",
    name: "Media & Entertainment",
    icon: Film,
    description:
      "Content management platforms, streaming solutions, and digital publishing tools that engage audiences at scale. We understand the unique demands of content-heavy applications — from high-traffic streaming infrastructure to intelligent recommendation engines. Whether you need a CMS for digital publishing or a full video streaming platform, we deliver solutions that perform under pressure and keep audiences coming back.",
    longDescription:
      "The media and entertainment industry is in constant flux, with streaming platforms, digital publishing, and social media reshaping how content is created, distributed, and monetized. Success requires technology that can handle massive audiences, deliver rich media experiences, and adapt quickly to changing consumption patterns.\n\nRetech Solutions builds media technology platforms that handle the unique demands of content-heavy applications — from high-traffic streaming infrastructure to intelligent content recommendation engines. We understand the technical challenges of delivering rich media experiences at scale, and we build solutions that keep audiences engaged.\n\nWhether you need a content management system for a digital publisher, a video streaming platform, or an analytics dashboard for audience insights, our team delivers solutions that perform under pressure and scale with your audience.",
    challenges: [
      "Delivering high-quality video and audio streaming to global audiences with minimal latency",
      "Managing massive content libraries with intelligent tagging, search, and recommendation",
      "Handling viral traffic spikes that can multiply normal load by 10x or more",
      "Monetizing content through subscriptions, ads, and pay-per-view with flexible pricing models",
    ],
    solutions: [
      "Video streaming platforms with adaptive bitrate delivery and CDN optimization",
      "Content management systems with AI-powered tagging, scheduling, and workflow automation",
      "Audience analytics dashboards with real-time engagement metrics and retention insights",
      "Monetization platforms with subscription management, ad integration, and payment processing",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "FFmpeg", "Redis", "Elasticsearch", "CDN"],
    caseStudyExcerpt:
      "We build media platforms that engage audiences at scale — from high-performance streaming infrastructure to intelligent content management systems that keep viewers coming back.",
    color: "text-accent-violet",
    gradient: "from-accent-violet/10 via-accent-cyan/5 to-accent-violet/5",
    stats: [
      { value: 10, suffix: "M+", label: "Viewers Served" },
      { value: 99, suffix: ".95%", label: "Stream Uptime" },
      { value: 200, suffix: "ms", label: "Start Time" },
      { value: 65, suffix: "%", label: "Retention Rate" },
    ],
    approach: [
      { step: "01", title: "Content Strategy", description: "We analyze your content types, audience behavior, and distribution channels to define the right platform architecture." },
      { step: "02", title: "Media Infrastructure", description: "We design your CDN strategy, transcoding pipeline, and storage architecture for cost-effective delivery at scale." },
      { step: "03", title: "Experience Development", description: "Iterative development of your content platform with focus on playback quality, discovery, and monetization features." },
      { step: "04", title: "Scale & Optimize", description: "Load testing for peak audiences, CDN optimization, analytics integration, and continuous performance tuning." },
    ],
    relatedServiceSlugs: ["cms-platforms", "web-development", "ui-ux-design"],
    caseStudyIndustry: "Media & Entertainment",
    category: "digital",
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}
