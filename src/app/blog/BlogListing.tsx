"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, Search, X } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CATEGORY_SLUG_MAP, type BlogPost } from "@/lib/blog-data";

const POSTS_PER_PAGE = 6;

const categoryGradients: Record<string, string> = {
  "Industry Insights": "from-brand/80 to-accent-cyan/80",
  Guides: "from-accent-cyan/80 to-accent-violet/80",
  Technology: "from-accent-violet/80 to-brand/80",
};

/** Hook: debounced value with configurable delay. */
function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

/* -------------------------------------------------------------------
   BlogListingGrid — holds load-more state.
   Parent passes a `resetKey` so this component remounts (resetting
   all local state) whenever filters change. No setState-in-effect or
   setState-during-render needed.
   ------------------------------------------------------------------- */

function BlogListingGrid({
  posts,
  featuredPost,
}: {
  posts: BlogPost[];
  featuredPost: BlogPost | null;
}) {
  const [extraPages, setExtraPages] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const visibleCount = POSTS_PER_PAGE + extraPages * POSTS_PER_PAGE;

  const gridPosts = useMemo(() => {
    const offset = featuredPost ? 1 : 0;
    return posts.slice(offset, visibleCount + offset);
  }, [posts, featuredPost, visibleCount]);

  const hasMore = useMemo(() => {
    const offset = featuredPost ? 1 : 0;
    return visibleCount + offset < posts.length;
  }, [posts, featuredPost, visibleCount]);

  const totalShowing = gridPosts.length + (featuredPost ? 1 : 0);

  return (
    <>
      {/* Post count */}
      <div className="mb-6 text-center">
        <p className="text-sm text-foreground-muted">
          Showing{" "}
          <span className="font-medium text-foreground-secondary">
            {totalShowing}
          </span>{" "}
          of{" "}
          <span className="font-medium text-foreground-secondary">
            {posts.length + (featuredPost ? 0 : 0)}
          </span>{" "}
          {posts.length === 1 ? "article" : "articles"}
        </p>
      </div>

      {/* Featured / hero post */}
      <AnimatePresence mode="wait">
        {featuredPost && (
          <motion.div
            key={`featured-${featuredPost.slug}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mb-10"
          >
            <Card
              hover
              padding="none"
              className="group h-full flex flex-col md:flex-row overflow-hidden border-transparent hover:border-brand/15"
            >
              <div
                className={`relative w-full md:w-2/5 min-h-[240px] md:min-h-[320px] bg-gradient-to-br ${
                  categoryGradients[featuredPost.category] ??
                  "from-brand/80 to-accent-cyan/80"
                } overflow-hidden`}
              >
                <Image
                  src={`/blog/${featuredPost.slug}/opengraph-image`}
                  alt={featuredPost.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  priority
                />
                {/* Gradient scrim for badge readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-6">
                  <Badge
                    variant="outline"
                    className="bg-white/90 text-foreground-secondary backdrop-blur-sm"
                  >
                    Featured
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-white/90 text-foreground-secondary backdrop-blur-sm"
                  >
                    {featuredPost.category}
                  </Badge>
                </div>
              </div>

              <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-xs text-foreground-muted mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} />
                    {new Date(featuredPost.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} />
                    {featuredPost.readTime}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-foreground leading-snug mb-3 group-hover:text-brand transition-colors">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="hover:underline"
                  >
                    {featuredPost.title}
                  </Link>
                </h3>

                <p className="text-sm md:text-base text-foreground-secondary leading-relaxed mb-5 line-clamp-3">
                  {featuredPost.excerpt}
                </p>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-dark transition-colors group/link"
                >
                  Read article
                  <ArrowRight
                    size={14}
                    className="group-hover/link:translate-x-0.5 transition-transform"
                  />
                </Link>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Post grid */}
      <AnimatePresence mode="wait">
        {gridPosts.length > 0 ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {gridPosts.map((post) => (
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
                    <div
                      className={`relative h-48 bg-gradient-to-br ${
                        categoryGradients[post.category] ??
                        "from-brand/80 to-accent-cyan/80"
                      } overflow-hidden`}
                    >
                      <Image
                        src={`/blog/${post.slug}/opengraph-image`}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                      {/* Gradient scrim for badge readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
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
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black/[0.04] mb-5">
              <Search size={28} className="text-foreground-muted" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No posts found
            </h3>
            <p className="text-sm text-foreground-secondary mb-6 max-w-sm mx-auto">
              Try adjusting your search or category filter to find what you are
              looking for.
            </p>
          </motion.div>
        )}
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
            onClick={() => {
              setIsLoadingMore(true);
              // Use requestAnimationFrame to allow React to render the loading
              // state before the layout recalculation from new posts.
              requestAnimationFrame(() => {
                setExtraPages((c) => c + 1);
                setIsLoadingMore(false);
              });
            }}
            disabled={isLoadingMore}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-black/[0.08] text-sm font-medium text-foreground-secondary hover:text-brand hover:border-brand/30 hover:bg-brand/5 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-wait"
          >
            {isLoadingMore ? "Loading..." : "Load more articles"}
            <ArrowRight size={14} className={isLoadingMore ? "animate-pulse" : ""} />
          </button>
        </motion.div>
      )}
    </>
  );
}

/* -------------------------------------------------------------------
   BlogListing — outer shell with search, category pills, and filter
   state. Renders BlogListingGrid with a key derived from active
   filters so the grid remounts (resetting load-more count) when
   filters change.
   ------------------------------------------------------------------- */

interface BlogListingProps {
  posts: BlogPost[];
}

export function BlogListing({ posts }: BlogListingProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const debouncedSearch = useDebouncedValue(search, 300);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Stable key that changes when effective filters change.
  const resetKey = `${debouncedSearch}|${activeCategory ?? ""}`;

  const categories = useMemo(() => {
    const unique = Array.from(new Set(posts.map((p) => p.category)));
    return unique.sort();
  }, [posts]);

  const filtered = useMemo(() => {
    const q = debouncedSearch.toLowerCase().trim();
    return posts
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .filter((post) => {
        const matchesSearch =
          !q ||
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q);
        const matchesCategory =
          !activeCategory || post.category === activeCategory;
        return matchesSearch && matchesCategory;
      });
  }, [posts, debouncedSearch, activeCategory]);

  const featuredPost = useMemo(() => {
    if (activeCategory || debouncedSearch.trim()) return null;
    return filtered.length > 0 ? filtered[0] : null;
  }, [filtered, activeCategory, debouncedSearch]);

  const clearFilters = useCallback(() => {
    setSearch("");
    setActiveCategory(null);
    searchInputRef.current?.focus();
  }, []);

  const hasActiveFilters = search.trim() !== "" || activeCategory !== null;

  return (
    <>
      {/* Search bar */}
      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted pointer-events-none"
            aria-hidden="true"
          />
          <input
            ref={searchInputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            aria-label="Search blog posts"
            className="w-full pl-11 pr-10 py-3 rounded-full border border-black/[0.08] bg-white text-base text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/30 transition-all duration-200 shadow-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-foreground-muted hover:text-foreground hover:bg-black/[0.05] transition-colors cursor-pointer"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Category filter pills — clickable links to category pages */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        <Link
          href="/blog"
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            !activeCategory
              ? "bg-brand text-white shadow-sm"
              : "border border-black/[0.08] text-foreground-secondary hover:text-brand hover:border-brand/30 hover:bg-brand/5"
          }`}
        >
          All
        </Link>
        {categories.map((cat) => {
          const catSlug =
            CATEGORY_SLUG_MAP[cat] ??
            cat.toLowerCase().replace(/\s+/g, "-");
          const isActive = activeCategory === cat;
          return (
            <Link
              key={cat}
              href={isActive ? "/blog" : `/blog/category/${catSlug}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-brand text-white shadow-sm"
                  : "border border-black/[0.08] text-foreground-secondary hover:text-brand hover:border-brand/30 hover:bg-brand/5"
              }`}
            >
              {cat}
            </Link>
          );
        })}
      </div>

      {/* Search result summary */}
      {debouncedSearch.trim() && (
        <div className="mb-4 text-center">
          <p className="text-sm text-foreground-muted">
            {filtered.length} {filtered.length === 1 ? "result" : "results"}{" "}
            for &ldquo;
            <span className="font-medium text-foreground">
              {debouncedSearch.trim()}
            </span>
            &rdquo;
          </p>
        </div>
      )}

      {/* Grid — key causes remount when filters change, resetting load-more */}
      <BlogListingGrid
        key={resetKey}
        posts={filtered}
        featuredPost={featuredPost}
      />

      {/* Clear filters when no results */}
      {filtered.length === 0 && hasActiveFilters && (
        <div className="text-center mt-4">
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand text-white text-sm font-medium hover:bg-brand-light transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
          >
            <X size={15} />
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
