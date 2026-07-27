import {
  Layout,
  Users,
  BarChart3,
  Globe,
  Palette,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavChild {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const servicesNavigation: NavChild[] = [
  {
    label: "CMS Platforms",
    href: "/services/cms-platforms",
    description: "Headless and traditional CMS with AI tagging, smart search, and editorial copilots",
    icon: Layout,
  },
  {
    label: "CRM Systems",
    href: "/services/crm-systems",
    description: "CRMs with AI lead scoring, conversation intelligence, and predictive workflows",
    icon: Users,
  },
  {
    label: "ERP Solutions",
    href: "/services/erp-solutions",
    description: "ERPs with AI forecasting, anomaly detection, and automated reporting",
    icon: BarChart3,
  },
  {
    label: "Web Development",
    href: "/services/web-development",
    description: "Web apps with optional LLM features, vector search, and AI-assisted ops baked in",
    icon: Globe,
  },
  {
    label: "UI/UX Design",
    href: "/services/ui-ux-design",
    description: "Product design for AI-native interfaces, including copilot UX and conversational flows",
    icon: Palette,
  },
  {
    label: "Dedicated Teams",
    href: "/services/dedicated-teams",
    description: "Embedded engineers experienced in shipping RAG, agents, and LLM integrations",
    icon: UsersRound,
  },
];

export const navigation: {
  main: NavItem[];
  cta: { label: string; href: string };
} = {
  main: [
    {
      label: "Services",
      href: "/services",
      children: servicesNavigation,
    },
    { label: "Process", href: "/process" },
    { label: "Industries", href: "/industries" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
  ],
  cta: { label: "Request Quote", href: "/contact" },
};

export const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  services: servicesNavigation.map((s) => ({ label: s.label, href: s.href })),
  resources: [
    { label: "Industries", href: "/industries" },
    { label: "Blog", href: "/blog" },
    { label: "Case Studies", href: "/case-studies" },
  ],
};
