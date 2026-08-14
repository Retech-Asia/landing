import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, ArrowRight, Languages } from "lucide-react";
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
import { blogPosts, getPostBySlug, getAllSlugs, getRelatedPosts } from "@/lib/blog-data";
import { renderContent } from "@/lib/render-content";
import { getBlogImage } from "@/lib/blog-images";
import { BlogPostingJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { getBlogMeta, getEnSlugByViSlug, blogViMeta } from "@/lib/blog-i18n";
import { ReadingProgress } from "./ReadingProgress";

export function generateStaticParams() {
  const enParams = getAllSlugs().map((slug) => ({ locale: "en", slug }));
  const viParams = Object.values(blogViMeta).map((vi) => ({ locale: "vi", slug: vi.slug }));
  return [...enParams, ...viParams];
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug, locale }) => {
    const loc = locale as Locale;
    // Resolve VI slug → EN slug for content lookup
    const effectiveSlug = loc === "vi" ? (getEnSlugByViSlug(slug) ?? slug) : slug;
    const post = getPostBySlug(effectiveSlug);
    if (!post) {
      return { title: "Post Not Found" };
    }

    const meta = getBlogMeta(post, loc);
    const enUrl = `${SITE_URL}/en/blog/${post.slug}`;
    const viMeta = blogViMeta[post.slug];
    const viUrl = viMeta ? `${SITE_URL}/vi/blog/${viMeta.slug}` : null;
    // Untranslated posts render EN content under /vi on demand — canonicalize
    // those to the EN URL and declare hreflang only where VI really renders.
    const pageUrl =
      loc === "vi" && !viMeta ? enUrl : `${SITE_URL}/${locale}/blog/${meta.slug}`;
    // OG image routes live under /[locale]/... — use the statically generated
    // /en variant (always 200; image title text is locale-independent here).
    const ogImageUrl = `/en/blog/${post.slug}/opengraph-image`;
    const description = meta.excerpt.length > 155
      ? meta.excerpt.slice(0, 152).replace(/\s+\S*$/, "") + "..."
      : meta.excerpt;

    return {
      title: `${meta.title} | Blog`,
      description,
      alternates: {
        canonical: pageUrl,
        languages: viUrl
          ? { en: enUrl, vi: viUrl, "x-default": enUrl }
          : { en: enUrl, "x-default": enUrl },
      },
      openGraph: {
        title: `${meta.title} | ${SITE_NAME} Blog`,
        description,
        url: pageUrl,
        type: "article",
        publishedTime: post.date,
        modifiedTime: post.updatedAt ?? post.date,
        authors: ["Retech Solutions"],
        tags: [meta.category, "IT Outsourcing", "Software Development"],
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: `${post.title} - Retech Solutions Blog`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${meta.title} | ${SITE_NAME} Blog`,
        description,
        images: [ogImageUrl],
      },
    };
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  const loc = locale as Locale;
  setRequestLocale(locale);
  // Resolve VI slug → EN slug for content lookup
  const effectiveSlug = loc === "vi" ? (getEnSlugByViSlug(slug) ?? slug) : slug;
  const post = getPostBySlug(effectiveSlug);
  const meta = post ? getBlogMeta(post, loc) : null;

  if (!post) {
    notFound();
  }

  const postIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost =
    postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

  const relatedPosts = getRelatedPosts(slug, 2);

  const pageUrl = `${SITE_URL}/${locale}/blog/${meta!.slug}`;
  const isVi = loc === "vi";
  const dateLocale = isVi ? "vi-VN" : "en-US";
  const readTime = (t: string) =>
    isVi ? t.replace("min read", "phút đọc") : t;

  // VI chrome — post bodies stay EN with a notice until full translation
  // lands (see blog-i18n.ts).
  const chrome = isVi
    ? {
        home: "Trang chủ",
        onThisPage: "Trong bài này",
        updated: "Cập nhật",
        notice:
          "Bản dịch đang hoàn thiện — nội dung bài viết hiện chỉ có bằng tiếng Anh.",
        related: "Bài viết Liên quan",
        ctaTitle: "Cần đội ngũ phát triển chuyên nghiệp?",
        ctaBody:
          "Liên hệ với đội ngũ của chúng tôi để trao đổi dự án tiếp theo của bạn. Chúng tôi xây dựng giải pháp CMS, CRM và ERP theo yêu cầu, phù hợp với doanh nghiệp của bạn.",
        ctaButton: "Liên hệ",
        sidebar: "Thanh điều hướng bài viết",
      }
    : {
        home: "Home",
        onThisPage: "On this page",
        updated: "Updated",
        notice: null as string | null,
        related: "Related Articles",
        ctaTitle: "Need expert development?",
        ctaBody:
          "Get in touch with our team to discuss your next project. We build custom CMS, CRM, and ERP solutions tailored to your business.",
        ctaButton: "Get in Touch",
        sidebar: "Article sidebar",
      };

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
        className="font-display text-2xl md:text-3xl text-foreground mt-12 mb-4 scroll-mt-24"
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
        title={meta!.title}
        description={meta!.excerpt}
        url={pageUrl}
        datePublished={post.date}
        dateModified={post.updatedAt ?? post.date}
        authorName={post.author}
        imageUrl={`${SITE_URL}/en/blog/${post.slug}/opengraph-image`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE_URL}/${locale}` },
          { name: "Blog", url: `${SITE_URL}/${locale}/blog` },
          { name: meta!.title, url: pageUrl },
        ]}
      />
      <Container className="max-w-6xl">
        <BreadcrumbNav
          items={[
            { label: chrome.home, href: "/" },
            { label: "Blog", href: "/blog" },
            { label: meta!.title },
          ]}
        />

        <div className="lg:flex lg:gap-12 lg:items-start">
          {/* Main content */}
          <div className="min-w-0 flex-1">
            <div className="page-hero-enter">
              <header className="mb-10 md:mb-14">
                <p className="text-xs font-medium uppercase tracking-wider text-foreground-muted mb-4">
                  {meta!.category}
                </p>

                <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-foreground leading-tight mb-5">
                  {meta!.title}
                </h1>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-foreground-muted">
                  {/* Author byline removed — Retech Solutions is the sole
                      author of every post; repeating it adds noise. */}
                  <time
                    dateTime={post.date}
                    className="flex items-center gap-1.5"
                  >
                    <Calendar size={15} aria-hidden="true" />
                    {new Date(post.date).toLocaleDateString(dateLocale, {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                  {post.updatedAt && post.updatedAt !== post.date && (
                    <span className="text-xs text-foreground-muted/70">
                      ({chrome.updated}{" "}
                      <time dateTime={post.updatedAt}>
                        {new Date(post.updatedAt).toLocaleDateString(dateLocale, {
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
                    {readTime(post.readTime)}
                  </span>
                </div>
              </header>
              {chrome.notice && (
                <div
                  role="note"
                  className="mb-8 flex items-start gap-2.5 rounded-xl border border-accent-cyan/20 bg-accent-cyan/[0.06] px-4 py-3 text-sm text-foreground-secondary"
                >
                  <Languages size={15} className="mt-0.5 shrink-0 text-accent-cyan" aria-hidden="true" />
                  <span>{chrome.notice}</span>
                </div>
              )}
            </div>

            {/* Mobile TOC disclosure — same pattern as service detail pages.
                Native <details> for zero-JS accessibility. */}
            {post.headings.length > 0 && (
              <details className="lg:hidden group mb-8 rounded-xl border border-foreground/10 bg-card overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer list-none px-4 py-3 text-sm font-medium text-foreground select-none">
                  <span className="text-xs uppercase tracking-wider text-foreground-secondary">{chrome.onThisPage}</span>
                  <svg
                    className="w-4 h-4 text-foreground-secondary transition-transform duration-200 group-open:rotate-180"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <ul className="px-4 pb-3 pt-1 space-y-1 border-t border-foreground/[0.06]">
                  {post.headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="block py-1.5 text-sm text-foreground-secondary hover:text-foreground transition-colors"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            )}

            {/* Featured image — topic-relevant stock photo (not OG screenshot) */}
            <div className="relative h-[240px] md:h-[360px] rounded-2xl overflow-hidden mb-8">
              <Image
                src={getBlogImage(post.slug)}
                alt={meta!.title}
                fill
                priority
                quality={90}
                sizes="(max-width: 768px) 100vw, 720px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            <AnimatedSection variant="slideUp" delay={0.1}>
              <article className="prose-custom">
                {/* Lede paragraph — larger, foreground color (not secondary) for emphasis,
                    subtle brand-tinted left rule. Readers scan the first sentence before
                    committing; making it visually distinct improves engagement. */}
                <p className="text-foreground leading-relaxed text-xl md:text-2xl font-medium mb-8 pl-5 border-l-2 border-brand/40">
                  {renderContent(post.content[0])}
                </p>
                {contentElements.map((el, i) => (
                  <div key={i}>
                    {el}
                    {/* Decorative section break between major sections — a small
                        gradient dot centered, gives visual rhythm without
                        adding fake content. */}
                    {post.headings.length > 4 && i === Math.floor(contentElements.length / 2) - 1 && (
                      <div className="flex justify-center my-12" aria-hidden="true">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand/40" />
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-cyan/40 mx-2" />
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-violet/40" />
                      </div>
                    )}
                    {/* First inline image — full-bleed on desktop (breaks out of the
                        720px article column to ~1200px for visual variety). On mobile
                        keeps standard card width. */}
                    {i === 3 && post.headings.length > 4 && (
                      <figure className="my-12 md:my-16 md:w-screen md:max-w-[1200px] md:-ml-[240px] relative h-56 md:h-80 rounded-2xl overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.04),0_24px_60px_rgba(0,0,0,0.10)]">
                        <Image
                          src={
                            post.category === "Technology"
                              ? "/images/stock/code-screen.webp"
                              : post.category === "Guides"
                                ? "/images/stock/analytics-dashboard.webp"
                                : "/images/stock/ai-abstract.webp"
                          }
                          alt={`${post.title} | development workspace and code overview`}
                          fill
                          quality={90}
                          sizes="(max-width: 768px) 100vw, 1200px"
                          className="object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </figure>
                    )}
                    {/* Second inline image — same full-bleed treatment */}
                    {i === 7 && post.headings.length > 6 && (
                      <figure className="my-12 md:my-16 md:w-screen md:max-w-[1200px] md:-ml-[240px] relative h-56 md:h-80 rounded-2xl overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.04),0_24px_60px_rgba(0,0,0,0.10)]">
                        <Image
                          src={
                            post.category === "Technology"
                              ? "/images/stock/typing-code.webp"
                              : post.category === "Guides"
                                ? "/images/stock/developer-workspace.webp"
                                : "/images/stock/cloud-tech.webp"
                          }
                          alt={`${post.title} | engineering tools and technical implementation`}
                          fill
                          quality={90}
                          sizes="(max-width: 768px) 100vw, 1200px"
                          className="object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </figure>
                    )}
                  </div>
                ))}
              </article>
            </AnimatedSection>

            {/* Share buttons */}
            <AnimatedSection variant="slideUp" delay={0.12}>
              <div className="mt-8 pt-6 border-t border-card-border">
                <ShareButtons title={post.title} url={pageUrl} />
              </div>
            </AnimatedSection>

            {/* Was this article helpful? */}
            <AnimatedSection variant="slideUp" delay={0.14}>
              <FeedbackWidget />
            </AnimatedSection>

            {/* Author card removed — Retech Solutions is the sole author
                of every post, so a per-post author card added visual noise
                without information value. The byline "Retech Solutions"
                in the post header already communicates authorship. */}

            <AnimatedSection variant="slideUp" delay={0.15}>
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-card-border">
                {prevPost ? (
                  <Link
                    href={`/blog/${getBlogMeta(prevPost, loc).slug}`}
                    className="group flex items-center gap-2 text-sm font-medium text-foreground-secondary hover:text-brand transition-colors max-w-[45%]"
                  >
                    <ArrowLeft
                      size={16}
                      className="group-hover:-translate-x-0.5 transition-transform shrink-0"
                    />
                    <span className="line-clamp-2">{getBlogMeta(prevPost, loc).title}</span>
                  </Link>
                ) : (
                  <div />
                )}
                {nextPost ? (
                  <Link
                    href={`/blog/${getBlogMeta(nextPost, loc).slug}`}
                    className="group flex items-center gap-2 text-sm font-medium text-foreground-secondary hover:text-brand transition-colors max-w-[45%] text-right"
                  >
                    <span className="line-clamp-2">{getBlogMeta(nextPost, loc).title}</span>
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
                <div className="mt-12 pt-10 border-t border-card-border">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
                    {chrome.related}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {relatedPosts.map((related) => (
                      <Link
                        key={related.slug}
                        href={`/blog/${getBlogMeta(related, loc).slug}`}
                        className="group relative block overflow-hidden rounded-2xl border border-card-border transition-all duration-300 hover:border-brand/20 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)]"
                      >
                        {/* Topic-relevant thumbnail */}
                        <div className="relative h-36 overflow-hidden">
                          <Image
                            src={getBlogImage(related.slug)}
                            alt={getBlogMeta(related, loc).title}
                            fill
                            sizes="(max-width: 768px) 100vw, 360px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                          {/* Category tag overlaid on the image */}
                          <div className="absolute top-3 left-3">
                            <Badge variant="brand" className="text-[10px] uppercase tracking-wider">
                              {getBlogMeta(related, loc).category}
                            </Badge>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-base font-bold text-foreground group-hover:text-brand transition-colors mb-2 line-clamp-3">
                            {getBlogMeta(related, loc).title}
                          </h3>
                          <p className="text-sm text-foreground-secondary line-clamp-2 mb-3">
                            {getBlogMeta(related, loc).excerpt}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-foreground-muted">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {new Date(related.date).toLocaleDateString(dateLocale, {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              {readTime(related.readTime)}
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
                  {chrome.ctaTitle}
                </h2>
                <p className="text-foreground-secondary mb-5 max-w-lg mx-auto">
                  {chrome.ctaBody}
                </p>
                <Button variant="primary" href="/contact" size="md">
                  {chrome.ctaButton}
                  <ArrowRight size={16} />
                </Button>
              </Card>
            </AnimatedSection>
          </div>

          {/* Sidebar — desktop only. aria-label promotes <aside> to a
              complementary landmark so screen readers announce it. */}
          <aside aria-label={chrome.sidebar} className="hidden lg:block w-52 shrink-0">
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
