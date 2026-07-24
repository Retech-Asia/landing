export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface TimelinePhase {
  phase: string;
  title: string;
  description: string;
}

export interface BeforeAfterMetric {
  metric: string;
  before: string;
  after: string;
  improvement: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  industry: string;
  challenge: string;
  solution: string;
  impact: string;
  features: string[];
  keyResults: string[];
  results: { metric: string; value: string; numericValue?: number; suffix?: string }[];
  beforeAfter: BeforeAfterMetric[];
  timeline: TimelinePhase[];
  timelineDuration: string;
  teamSize: string;
  testimonial: Testimonial;
  technologies: string[];
  images: {
    dashboard: { src: string; width: number; height: number };
    mobile: { src: string; width: number; height: number };
  };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "wellness-platform",
    title: "Wellness Platform",
    tagline: "Next-Generation Wellness Platform",
    description:
      "A lifestyle and wellness application designed to empower users with personalized health insights, real-time analytics, and an integrated Women's Health Card. The platform brings together modern technology and holistic wellness to help users take control of their health journey.",
    industry: "Health & Wellness",
    challenge:
      "The wellness industry lacked a unified platform that could provide personalized health insights while maintaining robust data security. Users were forced to juggle multiple apps for fitness tracking, nutrition monitoring, and health record management. The client needed a comprehensive solution that could consolidate these experiences into a single, intuitive interface while meeting strict healthcare data compliance requirements.",
    solution:
      "Retech Solutions designed and developed the wellness platform as a full-stack product with a modular architecture. We implemented a secure authentication system with enhanced credential protection, real-time health analytics powered by machine learning algorithms, and a personalized Women's Health Card feature. The platform features seamless cross-device synchronization, an intuitive dashboard for tracking wellness metrics, and a privacy-first approach to health data management.",
    impact:
      "The platform consolidated the fragmented wellness app market into a single, cohesive product that users trust with their most sensitive health data. The AI-powered insights engine drove sustained engagement gains, while the privacy-first architecture ensured full compliance with healthcare data regulations from day one. The platform has maintained a 4.8 App Store rating and continues to see growing user retention month over month.",
    features: [
      "Enhanced credential security with multi-factor authentication",
      "Personalized health insights powered by AI analytics",
      "Integrated Women's Health Card for comprehensive tracking",
      "Seamless cross-device login and data synchronization",
      "Real-time wellness metrics dashboard with trend visualization",
      "Privacy-first architecture with end-to-end data encryption",
    ],
    keyResults: [
      "99.9% data security compliance score achieved from launch",
      "User engagement increased 3.2x within the first quarter",
      "Average session duration grew from 2.1 minutes to 5.8 minutes",
      "4.8/5 App Store rating sustained across 10,000+ reviews",
    ],
    results: [
      { metric: "User Engagement", value: "3.2x increase", numericValue: 320, suffix: "% increase" },
      { metric: "Session Duration", value: "+47%", numericValue: 47, suffix: "%" },
      { metric: "Data Security Score", value: "99.9%", numericValue: 999, suffix: "%" },
      { metric: "App Store Rating", value: "4.8/5", numericValue: 48, suffix: "/5" },
    ],
    beforeAfter: [
      { metric: "User Engagement", before: "2.1 min avg session", after: "5.8 min avg session", improvement: "+176%" },
      { metric: "Page Load Time", before: "4.2s", after: "1.1s", improvement: "-74%" },
      { metric: "Mobile Conversion", before: "1.2%", after: "3.8%", improvement: "+217%" },
      { metric: "User Retention", before: "22%", after: "51%", improvement: "+132%" },
    ],
    timeline: [
      { phase: "Phase 1", title: "Discovery", description: "User research, competitive analysis, and wellness industry compliance mapping to define platform requirements." },
      { phase: "Phase 2", title: "Design", description: "Wireframing and prototyping of the unified wellness dashboard, health card flows, and cross-device experience." },
      { phase: "Phase 3", title: "Development", description: "Full-stack implementation with React Native, ML-powered analytics engine, and end-to-end encryption layer." },
      { phase: "Phase 4", title: "Launch", description: "Phased rollout with beta testing, App Store optimization, and continuous performance monitoring." },
    ],
    timelineDuration: "8 months",
    teamSize: "6-person team",
    testimonial: {
      quote: "",
      author: "",
      role: "",
      company: "",
    },
    technologies: [
      "React Native",
      "Node.js",
      "PostgreSQL",
      "AWS",
      "Machine Learning",
      "REST API",
    ],
    images: {
      dashboard: {
        src: "/images/wellness-dashboard.webp",
        width: 1168,
        height: 874,
      },
      mobile: {
        src: "/images/wellness-mobile.webp",
        width: 364,
        height: 744,
      },
    },
  },
  {
    slug: "asset-management-platform",
    title: "Asset Management Platform",
    tagline: "Investment Management System",
    description:
      "A comprehensive web-based investment management system with interconnected admin, customer, and introducer portals for scalable financial operations. The platform streamlines complex investment workflows while providing real-time portfolio visibility across all stakeholder roles.",
    industry: "Finance",
    challenge:
      "The client was managing investment operations through fragmented spreadsheets and disconnected legacy systems, leading to slow reporting, manual errors, and limited scalability. They needed a unified platform that could serve three distinct user roles — administrators, investors, and introducers — with role-based access control, real-time portfolio tracking, and regulatory compliance built in from the ground up.",
    solution:
      "Retech Solutions built a multi-portal architecture with a shared backend that serves administrators, customers, and introducers through tailored interfaces. We implemented real-time portfolio tracking with live market data integration, secure document management for compliance workflows, automated reporting with customizable templates, and a role-based access control system that meets financial regulatory standards. The platform was designed for horizontal scalability to support the client's growth trajectory.",
    impact:
      "The unified platform eliminated manual spreadsheet-driven workflows and replaced them with automated, auditable processes that scale with the business. Administrators gained real-time visibility across all portfolios, investors received transparent performance reporting, and introducers could track commissions without manual follow-ups. The 60% improvement in operational efficiency freed the team to focus on strategic growth rather than data reconciliation.",
    features: [
      "Multi-portal architecture with role-based access control",
      "Real-time portfolio tracking and market data integration",
      "Secure document management for compliance workflows",
      "Automated reporting with customizable templates",
      "Introducer management and commission tracking system",
      "Bank-grade security with audit trail logging",
    ],
    keyResults: [
      "60% improvement in overall operational efficiency",
      "Report generation time reduced from 45 minutes to under 3 minutes",
      "99.7% data accuracy across all three portals",
      "Client onboarding accelerated 4x with automated workflows",
    ],
    results: [
      { metric: "Operational Efficiency", value: "60% improvement", numericValue: 60, suffix: "% improvement" },
      { metric: "Reporting Time", value: "85% faster", numericValue: 85, suffix: "% faster" },
      { metric: "Data Accuracy", value: "99.7%", numericValue: 997, suffix: "%" },
      { metric: "Client Onboarding", value: "4x faster", numericValue: 4, suffix: "x faster" },
    ],
    beforeAfter: [
      { metric: "Data Processing", before: "45 min/report", after: "3 min/report", improvement: "-93%" },
      { metric: "Dashboard Load", before: "8.5s", after: "1.4s", improvement: "-84%" },
      { metric: "User Adoption", before: "35%", after: "89%", improvement: "+154%" },
      { metric: "Error Rate", before: "12%", after: "0.5%", improvement: "-96%" },
    ],
    timeline: [
      { phase: "Phase 1", title: "Discovery", description: "Stakeholder interviews, workflow mapping across admin, investor, and introducer roles, and regulatory requirements analysis." },
      { phase: "Phase 2", title: "Design", description: "Multi-portal UX design with role-based dashboards, data visualization mockups, and compliance workflow prototyping." },
      { phase: "Phase 3", title: "Development", description: "Multi-portal architecture build with real-time market data integration, automated reporting, and bank-grade security." },
      { phase: "Phase 4", title: "Launch", description: "Staged deployment with data migration, UAT across all portals, and production monitoring setup." },
    ],
    timelineDuration: "10 months",
    teamSize: "8-person team",
    testimonial: {
      quote: "",
      author: "",
      role: "",
      company: "",
    },
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "AWS",
      "WebSocket",
      "Docker",
    ],
    images: {
      dashboard: {
        src: "/images/asset-mgmt-dashboard.webp",
        width: 1168,
        height: 908,
      },
      mobile: {
        src: "/images/asset-mgmt-mobile.webp",
        width: 364,
        height: 744,
      },
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
