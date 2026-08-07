"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getBlogImage } from "@/lib/blog-images";
import type { BlogPost } from "@/lib/blog-data";

const POSTS_PER_PAGE = 6;

const categoryGradients: Record<string, string> = {
  "Industry Insights": "from-brand/80 to-accent-cyan/80",
  Guides: "from-accent-cyan/80 to-accent-violet/80",
  Technology: "from-accent-violet/80 to-brand/80",
};

interface CategoryBlogListingProps {
  posts: BlogPost[];
}

export function CategoryBlogListing({ posts }: CategoryBlogListingProps) {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  const visiblePosts = useMemo(
    () => posts.slice(0, visibleCount),
    [posts, visibleCount]
  );

  const hasMore = visibleCount < posts.length;

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + POSTS_PER_PAGE);
  }, []);

  // Post count
  const showing = Math.min(visibleCount, posts.length);

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No posts yet
        </h3>
        <p className="text-sm text-foreground-secondary mb-6 max-w-sm mx-auto">
          There are no articles in this category yet. Check back soon or browse
          other topics.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-brand-dark transition-colors"
        >
          Browse all articles
          <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Post count */}
      <div className="mb-6 text-center">
        <p className="text-sm text-foreground-muted">
          Showing{" "}
          <span className="font-medium text-foreground-secondary">
            {showing}
          </span>{" "}
          of{" "}
          <span className="font-medium text-foreground-secondary">
            {posts.length}
          </span>{" "}
          {posts.length === 1 ? "article" : "articles"}
        </p>
      </div>

      {/* Post grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key="grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {visiblePosts.map((post) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Card
                  hover
                  padding="none"
                  className="group h-full flex flex-col overflow-hidden border-transparent hover:border-brand/15"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={getBlogImage(post.slug)}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3">
                      <Badge
                        variant="outline"
                        className="bg-white/90 text-foreground-secondary backdrop-blur-sm"
                      >
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-semibold text-foreground leading-snug mb-2 line-clamp-3 group-hover:text-brand transition-colors">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:underline"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-sm text-foreground-secondary leading-relaxed mb-4 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-black/[0.06]">
                      <div className="flex items-center gap-4 text-xs text-foreground-muted">
                        <span className="flex items-center gap-1">
                          <Calendar size={13} />
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={13} />
                          {post.readTime}
                        </span>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        aria-label={`Read more about ${post.title}`}
                        className="text-sm font-medium text-brand hover:text-brand-dark transition-colors inline-flex items-center gap-1"
                      >
                        Read more
                        <ArrowRight
                          size={14}
                          className="group-hover:translate-x-0.5 transition-transform"
                        />
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Load More button */}
      {hasMore && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center"
        >
          <button
            onClick={loadMore}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-black/[0.08] text-sm font-medium text-foreground-secondary hover:text-brand hover:border-brand/30 hover:bg-brand/5 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
          >
            Load more articles
            <ArrowRight size={14} />
          </button>
        </motion.div>
      )}
    </>
  );
}
