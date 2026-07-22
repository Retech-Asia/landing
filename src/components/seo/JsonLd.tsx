/**
 * JSON-LD Structured Data Components for Retech Solutions
 *
 * Implements schema.org structured data for:
 * - Organization: Company-level information (Knowledge Panel)
 * - WebSite: Site identity
 * - LocalBusiness / ProfessionalService: Physical location for local SEO
 * - Service: Individual service pages
 * - FAQPage: FAQ sections on service pages
 * - BlogPosting: Blog article pages
 * - BreadcrumbList: Navigation hierarchy
 * - WebPage: Generic page schema
 *
 * @see https://nextjs.org/docs/app/guides/json-ld
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */

import { CONTACT, SITE_URL as SITE_URL_CONST } from "@/lib/constants";

const SITE_URL = SITE_URL_CONST;
const SITE_NAME = CONTACT.businessName;
const SITE_DESCRIPTION =
  "Retech Solutions is a Vietnam-based software development company offering custom CMS, CRM, ERP solutions, and AI-powered services.";
const LOGO_URL = `${SITE_URL}/images/logo.svg`;

/** Sanitize JSON-LD to prevent XSS via HTML injection in strings */
function sanitizeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c").replace(/\//g, "\\/");
}

/** Generic script tag renderer for any JSON-LD schema */
function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: sanitizeJsonLd(data),
      }}
    />
  );
}

/**
 * Organization schema - represents Retech Solutions at the company level.
 * Used sitewide in the root layout for Google Knowledge Panel eligibility.
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/organization
 */
function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: ["Retech Asia", "Retech Solutions Vietnam"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
    },
    description: SITE_DESCRIPTION,
    foundingDate: "2020",
    foundingLocation: {
      "@type": "Place",
      name: "Ho Chi Minh City, Vietnam",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "VN",
      addressLocality: "Ho Chi Minh City",
      streetAddress: "288K8 Nam Ky Khoi Nghia, Vo Thi Sau Ward",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: CONTACT.phoneHref.replace("tel:", ""),
      email: CONTACT.email,
      availableLanguage: ["English", "Vietnamese"],
    },
    areaServed: [
      { "@type": "Place", name: "Vietnam" },
      { "@type": "Place", name: "Southeast Asia" },
      { "@type": "Place", name: "Asia" },
      { "@type": "Place", name: "Australia" },
      { "@type": "Place", name: "Europe" },
      { "@type": "Place", name: "North America" },
    ],
    knowsAbout: [
      "Custom Software Development",
      "CMS Platforms",
      "CRM Systems",
      "ERP Solutions",
      "AI-Powered Solutions",
      "IT Outsourcing",
      "Offshore Development",
      "Web Application Development",
      "Mobile Application Development",
      "UI/UX Design",
      "Dedicated Development Teams",
    ],
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 30,
      maxValue: 50,
    },
    slogan: "Turning Ideas into Solutions",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "IT Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "CMS Platforms",
            description:
              "Custom websites leveraging powerful CMS solutions, enabling businesses to manage and publish content efficiently.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "CRM Systems",
            description:
              "Tailored websites integrated with CRM systems, designed to enhance customer engagement.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "ERP Solutions",
            description:
              "Integrated web solutions based on ERP systems, connecting departments and optimizing operations.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Development",
            description:
              "Custom web applications built with modern frameworks, best practices, and scalable architecture.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UI/UX Design",
            description:
              "Design that drives engagement, conversion, and delight through research-backed user experiences.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Dedicated Teams",
            description:
              "Build your offshore development team with engineering talent from Vietnam.",
          },
        },
      ],
    },
  };
}

/**
 * WebSite schema - enables sitelinks search box and site identity.
 * Used sitewide in the root layout.
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox
 */
function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: "Retech Asia",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * LocalBusiness / ProfessionalService schema - for local SEO targeting.
 * Helps Google understand the physical business location in Vietnam and
 * powers the Google Business Profile knowledge panel.
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/local-business
 */
function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    alternateName: "Retech Asia",
    url: SITE_URL,
    logo: LOGO_URL,
    image: LOGO_URL,
    description: SITE_DESCRIPTION,
    address: {
      "@type": "PostalAddress",
      addressCountry: "VN",
      addressLocality: "Ho Chi Minh City",
      streetAddress: "288K8 Nam Ky Khoi Nghia, Vo Thi Sau Ward",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 10.8231,
      longitude: 106.6297,
    },
    telephone: CONTACT.phoneHref.replace("tel:", ""),
    email: CONTACT.email,
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "IT Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "CMS Platforms",
          description:
            "Custom websites leveraging powerful CMS solutions, enabling businesses to manage and publish content efficiently across multiple platforms.",
        },
        {
          "@type": "OfferCatalog",
          name: "CRM Systems",
          description:
            "Tailored websites integrated with CRM systems, designed to enhance customer engagement and streamline client relationship workflows.",
        },
        {
          "@type": "OfferCatalog",
          name: "ERP Solutions",
          description:
            "Integrated web solutions based on ERP systems, connecting departments, optimizing operations, and providing real-time data access.",
        },
      ],
    },
    serviceType: [
      "Custom Software Development",
      "CMS Platforms",
      "CRM Systems",
      "ERP Solutions",
      "Web Application Development",
      "Mobile Application Development",
      "AI-Powered Solutions",
      "IT Outsourcing",
      "Dedicated Development Teams",
    ],
    parentOrganization: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

/**
 * Renders all sitewide structured data (Organization, WebSite, LocalBusiness).
 * Included once in the root layout via <SiteJsonLd />.
 */
export function SiteJsonLd() {
  const schemas = [
    getOrganizationSchema(),
    getWebSiteSchema(),
    getLocalBusinessSchema(),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLdScript key={index} data={schema} />
      ))}
    </>
  );
}

/**
 * BreadcrumbList schema - for individual pages.
 * Use on sub-pages to show breadcrumb trails in search results.
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
 */
export function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLdScript data={schema} />;
}

/**
 * Service schema - for individual service detail pages.
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/service
 */
export function ServiceJsonLd({
  name,
  description,
  url,
  providerName = "Retech Solutions",
  serviceType = "IT Services",
}: {
  name: string;
  description: string;
  url: string;
  providerName?: string;
  serviceType?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: providerName,
    },
    serviceType,
    areaServed: [
      { "@type": "Place", name: "Vietnam" },
      { "@type": "Place", name: "Southeast Asia" },
      { "@type": "Place", name: "Worldwide" },
    ],
    offers: {
      "@type": "Offer",
      description: "Custom software development services with free initial consultation",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  return <JsonLdScript data={schema} />;
}

/**
 * FAQPage schema - for pages with FAQ sections.
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/faq
 */
export function FAQJsonLd({
  questions,
}: {
  questions: Array<{ question: string; answer: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return <JsonLdScript data={schema} />;
}

/**
 * BlogPosting schema - for individual blog article pages.
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/article
 */
export function BlogPostingJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName = "Retech Solutions",
  imageUrl,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  imageUrl?: string;
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: authorName,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  if (imageUrl) {
    schema.image = {
      "@type": "ImageObject",
      url: imageUrl,
    };
  }

  return <JsonLdScript data={schema} />;
}

/**
 * WebPage schema - for generic page structured data.
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/search-gallery
 */
export function WebPageJsonLd({
  title,
  description,
  url,
  type = "WebPage",
}: {
  title: string;
  description: string;
  url: string;
  type?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    name: title,
    description,
    url,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  return <JsonLdScript data={schema} />;
}

/**
 * LocalBusiness schema specifically for the Contact page.
 * Includes expanded contact and location information.
 */
export function ContactPageLocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/contact/#localbusiness`,
    name: SITE_NAME,
    alternateName: "Retech Asia",
    url: `${SITE_URL}/contact`,
    logo: LOGO_URL,
    image: LOGO_URL,
    description:
      "Get in touch with Retech Solutions to discuss your next software development project. We build custom CMS, CRM, ERP, and AI-powered solutions.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "VN",
      addressLocality: "Ho Chi Minh City",
      streetAddress: "288K8 Nam Ky Khoi Nghia, Vo Thi Sau Ward",
      postalCode: "700000",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 10.8231,
      longitude: 106.6297,
    },
    telephone: CONTACT.phoneHref.replace("tel:", ""),
    email: CONTACT.email,
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    parentOrganization: {
      "@id": `${SITE_URL}/#organization`,
    },
    serviceType: [
      "Custom Software Development",
      "CMS Platforms",
      "CRM Systems",
      "ERP Solutions",
      "Web Application Development",
      "UI/UX Design",
      "Dedicated Development Teams",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "IT Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "CMS Platforms",
          url: `${SITE_URL}/services/cms-platforms`,
        },
        {
          "@type": "OfferCatalog",
          name: "CRM Systems",
          url: `${SITE_URL}/services/crm-systems`,
        },
        {
          "@type": "OfferCatalog",
          name: "ERP Solutions",
          url: `${SITE_URL}/services/erp-solutions`,
        },
        {
          "@type": "OfferCatalog",
          name: "Web Development",
          url: `${SITE_URL}/services/web-development`,
        },
        {
          "@type": "OfferCatalog",
          name: "UI/UX Design",
          url: `${SITE_URL}/services/ui-ux-design`,
        },
        {
          "@type": "OfferCatalog",
          name: "Dedicated Teams",
          url: `${SITE_URL}/services/dedicated-teams`,
        },
      ],
    },
  };

  return <JsonLdScript data={schema} />;
}

/**
 * Article schema with embedded Review - for case study detail pages.
 * Combines an Article schema (for rich article snippets) with a Review
 * schema (for testimonial star ratings in search results).
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/article
 * @see https://developers.google.com/search/docs/appearance/structured-data/review-snippet
 */
export function CaseStudyJsonLd({
  study,
  url,
}: {
  study: {
    title: string;
    description: string;
    industry: string;
    technologies: string[];
    testimonial: {
      quote: string;
      author: string;
      role: string;
      company: string;
    };
    images: {
      dashboard: { src: string; width: number; height: number };
      mobile: { src: string; width: number; height: number };
    };
  };
  url: string;
}) {
  const imageUrl =
    study.images.dashboard.src || study.images.mobile.src || undefined;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${study.title} Case Study`,
    description: study.description,
    url,
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      "@type": "Thing",
      name: study.industry,
    },
    keywords: study.technologies.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    review: {
      "@type": "Review",
      reviewBody: study.testimonial.quote,
      author: {
        "@type": "Person",
        name: study.testimonial.author,
        jobTitle: study.testimonial.role,
        worksFor: {
          "@type": "Organization",
          name: study.testimonial.company,
        },
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
    },
  };

  if (imageUrl) {
    schema.image = {
      "@type": "ImageObject",
      url: imageUrl.startsWith("http")
        ? imageUrl
        : `${SITE_URL}${imageUrl}`,
    };
  }

  return <JsonLdScript data={schema} />;
}

/**
 * SoftwareApplication schema - for product/case-study pages.
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/software-app
 */
export function SoftwareProductJsonLd({
  name,
  description,
  applicationCategory,
  operatingSystem,
}: {
  name: string;
  description: string;
  applicationCategory: string;
  operatingSystem: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    applicationCategory,
    operatingSystem,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    producer: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  return <JsonLdScript data={schema} />;
}

/**
 * JobPosting schema - for individual job listings on the Careers page.
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/job-posting
 */
export function JobPostingJsonLd({
  title,
  description,
  url,
  datePosted,
  employmentType,
  hiringOrganization = SITE_NAME,
}: {
  title: string;
  description: string;
  url: string;
  datePosted: string;
  employmentType?: string;
  hiringOrganization?: string;
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    description,
    url,
    datePosted,
    hiringOrganization: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: hiringOrganization,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ho Chi Minh City",
        addressCountry: "VN",
      },
    },
  };

  if (employmentType) {
    schema.employmentType = employmentType;
  }

  return <JsonLdScript data={schema} />;
}
