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
    description: "Content management made easy with powerful, flexible platforms",
    icon: Layout,
  },
  {
    label: "CRM Systems",
    href: "/services/crm-systems",
    description: "Customer-centric tools for engagement and relationship management",
    icon: Users,
  },
  {
    label: "ERP Solutions",
    href: "/services/erp-solutions",
    description: "Insightful dashboards connecting departments and optimizing operations",
    icon: BarChart3,
  },
  {
    label: "Web Development",
    href: "/services/web-development",
    description: "Custom web applications built with modern frameworks and best practices",
    icon: Globe,
  },
  {
    label: "UI/UX Design",
    href: "/services/ui-ux-design",
    description: "User-centered design that drives engagement and conversion",
    icon: Palette,
  },
  {
    label: "Dedicated Teams",
    href: "/services/dedicated-teams",
    description: "Offshore development teams scaled to your project needs",
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
