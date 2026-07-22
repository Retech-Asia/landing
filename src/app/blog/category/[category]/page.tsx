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
import { CategoryBlogListing } from "./CategoryBlogListing";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({
    category: slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return { title: "Category Not Found" };
  }

  const title = `${category.name} Articles | Retech Solutions Blog`;
  const description = category.description;

  return {
    title: `${category.name} Blog`,
    description,
    alternates: {
      canonical: `${SITE_URL}/blog/category/${categorySlug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blog/category/${categorySlug}`,
      type: "website",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: `${category.name} Articles | Retech Solutions`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-image.png"],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const categoryName = SLUG_TO_CATEGORY[categorySlug];
  const posts = getPostsByCategory(categoryName);

  return (
    <>
      {/* Structured Data */}
      <WebPageJsonLd
        title={`${category.name} Articles | Retech Solutions Blog`}
        description={category.description}
        url={`${SITE_URL}/blog/category/${categorySlug}`}
        type="CollectionPage"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Blog", url: `${SITE_URL}/blog` },
          {
            name: category.name,
            url: `${SITE_URL}/blog/category/${categorySlug}`,
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
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: category.name },
            ]}
          />

          <AnimatedSection variant="slideUp">
            <SectionHeader
              label={category.name}
              title={`${category.name} Articles`}
              description={category.description}
            />
          </AnimatedSection>

          <Suspense fallback={<BlogListSkeleton />}>
            <CategoryBlogListing posts={posts} />
          </Suspense>

          {/* Back to all posts */}
          <AnimatedSection variant="slideUp" delay={0.2} className="mt-12">
            <div className="text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-brand-dark transition-colors"
              >
                <ArrowLeft size={14} />
                Back to all articles
              </Link>
            </div>
          </AnimatedSection>

          {/* Cross-link to other categories */}
          <AnimatedSection
            variant="slideUp"
            delay={0.3}
            className="mt-12 pt-10 border-t border-black/[0.06]"
          >
            <div className="text-center">
              <h3 className="text-sm font-medium tracking-widest uppercase text-brand mb-4">
                Explore other topics
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {[
                  { slug: "technology", name: "Technology" },
                  { slug: "guides", name: "Guides" },
                  { slug: "industry-insights", name: "Industry Insights" },
                ]
                  .filter((cat) => cat.slug !== categorySlug)
                  .map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/blog/category/${cat.slug}`}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full border border-black/[0.08] text-sm font-medium text-foreground-secondary hover:text-brand hover:border-brand/30 hover:bg-brand/5 transition-all duration-200"
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
