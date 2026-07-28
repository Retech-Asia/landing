import type { MetadataRoute } from "next";
import { services } from "@/lib/services-data";
import { caseStudies } from "@/lib/case-studies-data";
import { blogPosts, BLOG_CATEGORIES } from "@/lib/blog-data";
import { industries } from "@/lib/industries-data";
import { SITE_URL, CONTENT_LAST_UPDATED } from "@/lib/constants";

// Stable lastModified timestamp — see CONTENT_LAST_UPDATED in constants.ts.
// Avoids the anti-pattern of every build emitting `new Date()` and marking
// every URL as freshly modified, which flattens the freshness signal.
const CONTENT_LAST_MODIFIED = new Date(CONTENT_LAST_UPDATED);

const staticPages = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/process", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/technologies", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/industries", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/case-studies", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/careers", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const servicePages = services.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const caseStudyPages = caseStudies.map((study) => ({
    url: `${SITE_URL}/case-studies/${study.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const industryPages = industries.map((industry) => ({
    url: `${SITE_URL}/industries/${industry.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogCategoryPages = BLOG_CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/blog/category/${cat.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  const staticEntries = staticPages.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  return [...staticEntries, ...servicePages, ...caseStudyPages, ...blogPages, ...industryPages, ...blogCategoryPages];
}
