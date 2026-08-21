import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { BlogListSkeleton } from "@/components/ui/Skeleton";
import { SITE_URL } from "@/lib/constants";
import {
  getCategoryBySlug,
  getPostsByCategory,
  getAllCategorySlugs,
  SLUG_TO_CATEGORY,
} from "@/lib/blog-data";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { getBlogMeta } from "@/lib/blog-i18n";
import { CategoryBlogListing } from "./CategoryBlogListing";

// VI names/descriptions for the three canonical blog categories.
const CATEGORY_VI: Record<string, { name: string; description: string }> = {
  technology: {
    name: "Công nghệ",
    description:
      "Phân tích chuyên sâu về web framework hiện đại, xu hướng AI, kiến trúc cloud và các công cụ định hình phát triển phần mềm năm 2026.",
  },
  guides: {
    name: "Hướng dẫn",
    description:
      "Hướng dẫn thực tế từng bước để chọn tech stack phù hợp, xây dựng đội offshore và ra quyết định phần mềm chiến lược.",
  },
  "industry-insights": {
    name: "Insight Ngành",
    description:
      "Phân tích thị trường, xu hướng outsourcing và góc nhìn chiến lược về phát triển IT tại Việt Nam và Đông Nam Á.",
  },
};

interface CategoryPageProps {
  params: Promise<{ locale: string; category: string }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllCategorySlugs().map((slug) => ({ locale, category: slug }))
  );
}

// All valid locale+category combos are enumerated above — anything else 404s
// statically. Without this, unknown categories render on demand and notFound()
// streams after the 200 headers (soft-404, bad for SEO).
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug, locale } = await params;
  const category = getCategoryBySlug(categorySlug);
  const loc = locale as Locale;
  const vi = loc === "vi" ? CATEGORY_VI[categorySlug] : undefined;

  if (!category) {
    // Throw here too (not just in the page) — otherwise the metadata
    // resolves, headers stream with 200, and the page's notFound() body
    // renders under a 200 status (bad for SEO).
    notFound();
  }

  const catName = vi?.name ?? category.name;
  const description = vi?.description ?? category.description;
  const title = vi
    ? `${catName}: Bài viết | Retech Solutions Blog`
    : `${catName} Articles | Retech Solutions Blog`;

  return {
    title: vi ? `${catName} Blog` : `${category.name} Blog`,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog/category/${categorySlug}`,
      // Category slugs are shared across locales — declare reciprocal
      // hreflang to match the sitemap's alternates for these URLs.
      languages: {
        en: `${SITE_URL}/en/blog/category/${categorySlug}`,
        vi: `${SITE_URL}/vi/blog/category/${categorySlug}`,
        "x-default": `${SITE_URL}/en/blog/category/${categorySlug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/blog/category/${categorySlug}`,
      type: "website",
      // OG image omitted — Next.js auto-uses src/app/opengraph-image.tsx
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug, locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const isVi = loc === "vi";
  const vi = isVi ? CATEGORY_VI[categorySlug] : undefined;
  const catName = vi?.name ?? category.name;
  const catDesc = vi?.description ?? category.description;
  const chrome = isVi
    ? {
        home: "Trang chủ",
        articles: "Bài viết",
        backToAll: "Quay lại tất cả bài viết",
        exploreOther: "Khám phá chủ đề khác",
      }
    : {
        home: "Home",
        articles: "Articles",
        backToAll: "Back to all articles",
        exploreOther: "Explore other topics",
      };

  const categoryName = SLUG_TO_CATEGORY[categorySlug];
  const posts = getPostsByCategory(categoryName);

  // Precompute locale-aware card data server-side — keeps the client
  // listing component free of the blog-data/blog-i18n bundles.
  const items = posts.map((p) => {
    const m = getBlogMeta(p, loc);
    return {
      enSlug: p.slug,
      slug: m.slug,
      title: m.title,
      excerpt: m.excerpt,
      category: m.category,
      date: p.date,
      readTime: isVi ? p.readTime.replace("min read", "phút đọc") : p.readTime,
    };
  });

  const strings = isVi
    ? {
        noPostsTitle: "Chưa có bài viết",
        noPostsBody:
          "Chưa có bài viết nào trong chủ đề này. Hãy quay lại sau hoặc khám phá các chủ đề khác.",
        browseAll: "Xem tất cả bài viết",
        showing: "Đang hiển thị",
        of: "/",
        articleSingular: "bài viết",
        articlePlural: "bài viết",
        readMore: "Đọc tiếp",
        readMoreAria: "Đọc tiếp về",
        loadMore: "Xem thêm bài viết",
        dateLocale: "vi-VN",
      }
    : {
        noPostsTitle: "No posts yet",
        noPostsBody:
          "There are no articles in this category yet. Check back soon or browse other topics.",
        browseAll: "Browse all articles",
        showing: "Showing",
        of: "of",
        articleSingular: "article",
        articlePlural: "articles",
        readMore: "Read more",
        readMoreAria: "Read more about",
        loadMore: "Load more articles",
        dateLocale: "en-US",
      };

  return (
    <>
      {/* Structured Data */}
      <WebPageJsonLd
        title={
          isVi
            ? `${catName}: Bài viết | Retech Solutions Blog`
            : `${catName} Articles | Retech Solutions Blog`
        }
        description={catDesc}
        url={`${SITE_URL}/${locale}/blog/category/${categorySlug}`}
        type="CollectionPage"
      />
      <BreadcrumbJsonLd
        items={[
          { name: chrome.home, url: `${SITE_URL}/${locale}` },
          { name: "Blog", url: `${SITE_URL}/${locale}/blog` },
          {
            name: catName,
            url: `${SITE_URL}/${locale}/blog/category/${categorySlug}`,
          },
        ]}
      />

      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        {/* Decorative gradient orbs */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -top-20 left-[10%] w-[50vw] h-[50vw] rounded-full bg-brand/[0.03] blur-[100px] animate-mesh-4" />
          <div className="absolute top-[30%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-accent-cyan/[0.03] blur-[100px] animate-mesh-5" />
          <div className="absolute -bottom-10 left-[30%] w-[35vw] h-[35vw] rounded-full bg-accent-violet/[0.02] blur-[100px] animate-mesh-3" />
        </div>

        <Container className="relative">
          <BreadcrumbNav
            items={[
              { label: chrome.home, href: "/" },
              { label: "Blog", href: "/blog" },
              { label: catName },
            ]}
          />

          <AnimatedSection variant="slideUp">
            <SectionHeader
              label={catName}
              title={isVi ? catName : `${catName} ${chrome.articles}`}
              description={catDesc}
            />
          </AnimatedSection>

          <Suspense fallback={<BlogListSkeleton />}>
            <CategoryBlogListing items={items} strings={strings} />
          </Suspense>

          {/* Back to all posts */}
          <AnimatedSection variant="slideUp" delay={0.2} className="mt-12">
            <div className="text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-brand-dark transition-colors"
              >
                <ArrowLeft size={14} />
                {chrome.backToAll}
              </Link>
            </div>
          </AnimatedSection>

          {/* Cross-link to other categories */}
          <AnimatedSection
            variant="slideUp"
            delay={0.3}
            className="mt-12 pt-10 border-t border-card-border"
          >
            <div className="text-center">
              <h3 className="text-sm font-medium tracking-widest uppercase text-brand mb-4">
                {chrome.exploreOther}
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {[
                  { slug: "technology", name: "Technology" },
                  { slug: "guides", name: "Guides" },
                  { slug: "industry-insights", name: "Industry Insights" },
                ].map((cat) => ({
                  ...cat,
                  name: isVi ? CATEGORY_VI[cat.slug].name : cat.name,
                }))
                  .filter((cat) => cat.slug !== categorySlug)
                  .map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/blog/category/${cat.slug}`}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full border border-card-border text-sm font-medium text-foreground-secondary hover:text-brand hover:border-brand/30 hover:bg-brand/5 transition-all duration-200"
                    >
                      {cat.name}
                      <ArrowRight size={12} />
                    </Link>
                  ))}
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
