import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, User, ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { BreadcrumbNav } from "@/components/ui/BreadcrumbNav";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

import { TableOfContents } from "@/components/ui/TableOfContents";
import { RelatedServicesSidebar } from "@/components/blog/RelatedServicesSidebar";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { FeedbackWidget } from "@/components/blog/FeedbackWidget";
import { BlogHero } from "@/components/blog/BlogHero";
import { blogPosts, getPostBySlug, getAllSlugs, getRelatedPosts } from "@/lib/blog-data";
import { renderContent } from "@/lib/render-content";
import { BlogPostingJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { ReadingProgress } from "./ReadingProgress";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = getPostBySlug(slug);
    if (!post) {
      return { title: "Post Not Found" };
    }

    const pageUrl = `${SITE_URL}/blog/${post.slug}`;

    return {
      title: `${post.title} — Blog`,
      description: post.excerpt.length > 155
        ? post.excerpt.slice(0, 152).replace(/\s+\S*$/, "") + "..."
        : post.excerpt,
      alternates: {
        canonical: pageUrl,
      },
      openGraph: {
        title: `${post.title} | ${SITE_NAME} Blog`,
        description: post.excerpt.length > 155
          ? post.excerpt.slice(0, 152).replace(/\s+\S*$/, "") + "..."
          : post.excerpt,
        url: pageUrl,
        type: "article",
        publishedTime: post.date,
        modifiedTime: post.updatedAt ?? post.date,
        authors: [post.author],
        tags: [post.category, "IT Outsourcing", "Software Development"],
        images: [
          {
            url: `/blog/${post.slug}/opengraph-image`,
            width: 1200,
            height: 630,
            alt: `${post.title} - Retech Solutions Blog`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${post.title} | ${SITE_NAME} Blog`,
        description: post.excerpt.length > 155
          ? post.excerpt.slice(0, 152).replace(/\s+\S*$/, "") + "..."
          : post.excerpt,
        images: [`/blog/${post.slug}/opengraph-image`],
      },
    };
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const postIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost =
    postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

  const relatedPosts = getRelatedPosts(slug, 2);

  const pageUrl = `${SITE_URL}/blog/${post.slug}`;

  // Build content with headings interleaved: first heading comes before the second paragraph,
  // subsequent headings appear before their corresponding paragraphs.
  // content[0] = intro, then each heading maps to the paragraph at (heading index + 1).
  const contentElements: React.ReactNode[] = [];

  post.headings.forEach((heading, hIndex) => {
    const paragraphIndex = hIndex + 1;
    // Insert the heading before its corresponding paragraph
    contentElements.push(
      <h2
        key={`heading-${heading.id}`}
        id={heading.id}
        className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24"
      >
        {heading.text}
      </h2>
    );
    // Insert the paragraph after the heading (if it exists)
    if (paragraphIndex < post.content.length) {
      contentElements.push(
        <p
          key={`para-${paragraphIndex}`}
          className="text-foreground-secondary leading-relaxed text-base md:text-lg mb-5"
        >
          {renderContent(post.content[paragraphIndex])}
        </p>
      );
    }
  });

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <ReadingProgress />

      {/* Structured Data */}
      <BlogPostingJsonLd
        title={post.title}
        description={post.excerpt}
        url={pageUrl}
        datePublished={post.date}
        dateModified={post.updatedAt ?? post.date}
        authorName={post.author}
        imageUrl={`${SITE_URL}/blog/${post.slug}/opengraph-image`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Blog", url: `${SITE_URL}/blog` },
          { name: post.title, url: pageUrl },
        ]}
      />
      <Container className="max-w-6xl">
        <BreadcrumbNav
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />

        <div className="lg:flex lg:gap-12 lg:items-start">
          {/* Main content */}
          <div className="min-w-0 flex-1">
            <div className="page-hero-enter">
              <header className="mb-10 md:mb-14">
                <p className="text-xs font-medium uppercase tracking-wider text-foreground-muted mb-4">
                  {post.category}
                </p>

                <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-foreground leading-tight mb-5">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-foreground-muted">
                  <span className="flex items-center gap-1.5">
                    <User size={15} aria-hidden="true" />
                    {post.author}
                  </span>
                  <time
                    dateTime={post.date}
                    className="flex items-center gap-1.5"
                  >
                    <Calendar size={15} aria-hidden="true" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                  {post.updatedAt && post.updatedAt !== post.date && (
                    <span className="text-xs text-foreground-muted/70">
                      (Updated{" "}
                      <time dateTime={post.updatedAt}>
                        {new Date(post.updatedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                      )
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Clock size={15} aria-hidden="true" />
                    {post.readTime}
                  </span>
                </div>
              </header>
            </div>

            {/* Category-themed hero banner — visual only, title is in the H1 above */}
            <AnimatedSection variant="slideUp" delay={0.1}>
              <BlogHero category={post.category} readTime={post.readTime} />
            </AnimatedSection>

            <AnimatedSection variant="slideUp" delay={0.1}>
              <article className="prose-custom">
                {/* Intro paragraph (before any headings) */}
                <p className="text-foreground-secondary leading-relaxed text-base md:text-lg mb-5">
                  {renderContent(post.content[0])}
                </p>
                {contentElements}
              </article>
            </AnimatedSection>

            {/* Share buttons */}
            <AnimatedSection variant="slideUp" delay={0.12}>
              <div className="mt-8 pt-6 border-t border-black/[0.06]">
                <ShareButtons title={post.title} url={pageUrl} />
              </div>
            </AnimatedSection>

            {/* Was this article helpful? */}
            <AnimatedSection variant="slideUp" delay={0.14}>
              <FeedbackWidget />
            </AnimatedSection>

            {/* Author card */}
            <AnimatedSection variant="slideUp" delay={0.12}>
              <div className="mt-10 relative overflow-hidden rounded-2xl border border-black/[0.06] bg-background-subtle">
                {/* Subtle gradient accent at the top */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
                <div className="p-6 md:p-8 flex flex-col sm:flex-row items-start gap-5">
                  {/* Gradient avatar circle */}
                  <div className="relative shrink-0">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-brand via-accent-cyan to-accent-violet p-[2px]">
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-background-subtle">
                        <span className="text-lg font-bold gradient-text-brand">RS</span>
                      </div>
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white ring-2 ring-background-subtle">
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 8.5L6.5 11L12 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-bold text-foreground">
                      Retech Solutions
                    </p>
                    <p className="text-sm font-medium text-brand mt-0.5">
                      Software Development Team
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-secondary max-w-xl">
                      We are a team of 30+ engineers based in Ho Chi Minh City,
                      building custom CMS, CRM, and ERP solutions for businesses
                      worldwide. Our focus is on delivering enterprise-grade software
                      with modern technologies and agile practices.
                    </p>
                    <div className="mt-3 flex items-center gap-4 text-xs text-foreground-muted">
                      <span className="flex items-center gap-1">
                        <BookOpen size={12} />
                        {blogPosts.filter((p) => p.author === post.author).length} articles
                      </span>
                      <Link
                        href="/about"
                        className="font-medium text-brand hover:text-brand-dark transition-colors"
                      >
                        Learn more about us &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection variant="slideUp" delay={0.15}>
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-black/[0.06]">
                {prevPost ? (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="group flex items-center gap-2 text-sm font-medium text-foreground-secondary hover:text-brand transition-colors max-w-[45%]"
                  >
                    <ArrowLeft
                      size={16}
                      className="group-hover:-translate-x-0.5 transition-transform shrink-0"
                    />
                    <span className="line-clamp-2">{prevPost.title}</span>
                  </Link>
                ) : (
                  <div />
                )}
                {nextPost ? (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="group flex items-center gap-2 text-sm font-medium text-foreground-secondary hover:text-brand transition-colors max-w-[45%] text-right"
                  >
                    <span className="line-clamp-2">{nextPost.title}</span>
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-0.5 transition-transform shrink-0"
                    />
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </AnimatedSection>

            {relatedPosts.length > 0 && (
              <AnimatedSection variant="slideUp" delay={0.2}>
                <div className="mt-12 pt-10 border-t border-black/[0.06]">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
                    Related Articles
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {relatedPosts.map((related) => (
                      <Link
                        key={related.slug}
                        href={`/blog/${related.slug}`}
                        className="group relative block overflow-hidden rounded-2xl border border-black/[0.06] transition-all duration-300 hover:border-brand/20 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)]"
                      >
                        {/* Decorative image placeholder area */}
                        <div className="relative h-32 bg-gradient-to-br from-brand/5 via-accent-cyan/5 to-accent-violet/5 overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <BookOpen size={28} className="text-brand/20 group-hover:text-brand/30 transition-colors" />
                          </div>
                          {/* Category tag overlaid on the image area */}
                          <div className="absolute top-3 left-3">
                            <Badge variant="brand" className="text-[10px] uppercase tracking-wider">
                              {related.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-base font-bold text-foreground group-hover:text-brand transition-colors mb-2 line-clamp-3">
                            {related.title}
                          </h3>
                          <p className="text-sm text-foreground-secondary line-clamp-2 mb-3">
                            {related.excerpt}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-foreground-muted">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {new Date(related.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              {related.readTime}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )}

            <AnimatedSection variant="slideUp" delay={0.2}>
              <Card hover={false} padding="lg" className="mt-12 text-center">
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  Need expert development?
                </h2>
                <p className="text-foreground-secondary mb-5 max-w-lg mx-auto">
                  Get in touch with our team to discuss your next project. We build
                  custom CMS, CRM, and ERP solutions tailored to your business.
                </p>
                <Button variant="primary" href="/contact" size="md">
                  Get in Touch
                  <ArrowRight size={16} />
                </Button>
              </Card>
            </AnimatedSection>
          </div>

          {/* Sidebar — desktop only */}
          <aside className="hidden lg:block w-52 shrink-0">
            <div className="sticky top-28 space-y-6 max-h-[calc(100vh-9rem)] overflow-y-auto pr-1 -mr-1">
              {post.headings.length > 0 && (
                <TableOfContents headings={post.headings} />
              )}
              <RelatedServicesSidebar category={post.category} />
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
