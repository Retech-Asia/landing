import {
  Layout,
  Users,
  BarChart3,
  Globe,
  Palette,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Navigation data — locale-aware.
 *
 * - `labelKey` / `descriptionKey` are translation keys into the `nav.*`
 *   namespace in `src/messages/{en,vi}.json`. The Navbar/Footer resolve them
 *   via `useTranslations("nav")`.
 * - `href` is a locale-stripped path (e.g. `/services/cms-platforms`). The
 *   locale-aware `Link` from `@/i18n/navigation` prepends `/en` or `/vi`
 *   automatically at render time.
 *
 * Service detail page slugs are still English-only at the URL level for
 * Phase 1 — we'll add `slug: {en, vi}` translation in Phase 2 when service
 * detail content gets translated.
 */
export interface NavChild {
  labelKey: string;
  href: string;
  descriptionKey: string;
  icon: LucideIcon;
}

export interface NavItem {
  labelKey: string;
  href: string;
  children?: NavChild[];
}

export const servicesNavigation: NavChild[] = [
  {
    labelKey: "cms",
    href: "/services/cms-platforms",
    descriptionKey: "cmsDesc",
    icon: Layout,
  },
  {
    labelKey: "crm",
    href: "/services/crm-systems",
    descriptionKey: "crmDesc",
    icon: Users,
  },
  {
    labelKey: "erp",
    href: "/services/erp-solutions",
    descriptionKey: "erpDesc",
    icon: BarChart3,
  },
  {
    labelKey: "web",
    href: "/services/web-development",
    descriptionKey: "webDesc",
    icon: Globe,
  },
  {
    labelKey: "uiux",
    href: "/services/ui-ux-design",
    descriptionKey: "uiuxDesc",
    icon: Palette,
  },
  {
    labelKey: "teams",
    href: "/services/dedicated-teams",
    descriptionKey: "teamsDesc",
    icon: UsersRound,
  },
];

export const navigation: {
  main: NavItem[];
  cta: { labelKey: string; href: string };
} = {
  main: [
    {
      labelKey: "services",
      href: "/services",
      children: servicesNavigation,
    },
    { labelKey: "process", href: "/process" },
    { labelKey: "industries", href: "/industries" },
    { labelKey: "caseStudies", href: "/case-studies" },
    { labelKey: "about", href: "/about" },
    { labelKey: "blog", href: "/blog" },
  ],
  cta: { labelKey: "quote", href: "/contact" },
};

/**
 * Footer quick-links column. Keys resolve in `nav.footer.*` namespace.
 */
export const footerQuickLinks: { labelKey: string; href: string }[] = [
  { labelKey: "home", href: "/" },
  { labelKey: "about", href: "/about" },
  { labelKey: "services", href: "/services" },
  { labelKey: "process", href: "/process" },
  { labelKey: "industries", href: "/industries" },
  { labelKey: "caseStudies", href: "/case-studies" },
  { labelKey: "blog", href: "/blog" },
  { labelKey: "contact", href: "/contact" },
];

export const footerResourceLinks: { labelKey: string; href: string }[] = [
  { labelKey: "faq", href: "/faq" },
  { labelKey: "technologies", href: "/technologies" },
  { labelKey: "careers", href: "/careers" },
  { labelKey: "privacy", href: "/privacy-policy" },
  { labelKey: "terms", href: "/terms-of-service" },
];
