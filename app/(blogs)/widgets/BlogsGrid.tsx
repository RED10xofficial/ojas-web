"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Search, Clock, User, Calendar, BookOpen, Loader2 } from "lucide-react";
import { getBlogListing } from "@/app/lib/api";
import { getStrapiMedia } from "@/app/lib/strapi";
import { cn } from "@/app/lib/cn";
import type { BlogPostCard, BlogCategory, BlogsListingSection } from "@/app/lib/types";

interface Props {
  section: BlogsListingSection;
}

const DEFAULT_GRADIENT = "from-blue-600/20 to-indigo-600/20 border-blue-500/30";

const formatDate = (value?: string | null) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
};

/** Card artwork: a real cover image when present, else the gradient plate. */
const CardArtwork = ({ blog, index }: { blog: BlogPostCard; index: number }) => {
  const imageUrl = getStrapiMedia(blog.coverImage?.url);

  if (imageUrl) {
    return (
      <div className="rounded-2xl aspect-[16/10] mb-6 overflow-hidden relative border border-brand-subtle">
        <Image
          src={imageUrl}
          alt={blog.coverImage?.alternativeText || blog.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center select-none">
          {blog.category && (
            <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[9px] font-black uppercase tracking-wider text-text-secondary rounded-md">
              {blog.category.name}
            </span>
          )}
          {blog.readTime && (
            <span className="text-[10px] text-white font-mono font-bold flex items-center gap-1">
              <Clock size={10} /> {blog.readTime}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl aspect-[16/10] p-6 mb-6 overflow-hidden bg-gradient-to-br ${
        blog.gradient || DEFAULT_GRADIENT
      } border flex flex-col justify-between relative`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(26,111,196,0.1),transparent_50%)] pointer-events-none" />
      <div className="flex justify-between items-center select-none">
        {blog.category && (
          <span className="px-2.5 py-1 bg-white/80 border border-brand-subtle backdrop-blur-sm text-[9px] font-black uppercase tracking-wider text-text-secondary rounded-md">
            {blog.category.name}
          </span>
        )}
        {blog.readTime && (
          <span className="text-[10px] text-text-secondary/70 font-mono font-bold flex items-center gap-1">
            <Clock size={10} /> {blog.readTime}
          </span>
        )}
      </div>
      <div className="pt-16 pb-2">
        <p className="text-[10px] font-bold text-brand-blue/80 font-mono tracking-widest uppercase">
          OJAS EVIDENCE SERIES
        </p>
        <h4 className="text-white/10 text-3xl font-display font-black leading-none absolute bottom-4 right-4 select-none">
          {String(index + 1).padStart(2, "0")}
        </h4>
      </div>
    </div>
  );
};

const BlogsGrid = ({ section }: Props) => {
  const pageSize = section.pageSize || 6;
  const categories: BlogCategory[] = section.categories?.length
    ? section.categories
    : [{ name: "All", slug: "all" }];

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [blogs, setBlogs] = useState<BlogPostCard[]>(section.blogs ?? []);
  const [page, setPage] = useState(section.pagination?.page ?? 1);
  const [hasMore, setHasMore] = useState(section.pagination?.hasMore ?? false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  /* Debounce the search box so typing doesn't fire a request per keystroke. */
  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(searchInput.trim()), 350);
    return () => clearTimeout(timer);
  }, [searchInput]);

  /**
   * Stops a slow request from clobbering results the user has since filtered for.
   * We skip the fetch on mount too, since the server already gave us page 1.
   */
  const requestId = useRef(0);
  const isInitial = useRef(true);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }

    const currentRequest = ++requestId.current;
    setIsFiltering(true);

    getBlogListing({
      category: selectedCategory,
      page: 1,
      pageSize,
      search: searchQuery || undefined,
    }).then((listing) => {
      if (currentRequest !== requestId.current) return;

      setBlogs(listing?.blogs ?? []);
      setPage(1);
      setHasMore(listing?.pagination?.hasMore ?? false);
      setIsFiltering(false);
    });
  }, [selectedCategory, searchQuery, pageSize]);

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    const nextPage = page + 1;
    const currentRequest = requestId.current;

    const listing = await getBlogListing({
      category: selectedCategory,
      page: nextPage,
      pageSize,
      search: searchQuery || undefined,
    });

    /* A filter change while paging invalidates this response. */
    if (currentRequest === requestId.current && listing) {
      setBlogs((prev) => [...prev, ...listing.blogs]);
      setPage(nextPage);
      setHasMore(listing.pagination.hasMore);
    }

    setIsLoadingMore(false);
  }, [isLoadingMore, hasMore, page, selectedCategory, searchQuery, pageSize]);

  const isUnfiltered = selectedCategory === "all" && searchQuery === "";
  const featured = section.showFeatured !== false && isUnfiltered ? blogs[0] : null;
  const gridBlogs = featured ? blogs.slice(1) : blogs;

  return (
    <section className={cn("pb-16 sm:pb-24", section.wrapperClass)}>
      <div className="global-container mx-auto space-y-8">
        {/* FILTERS & SEARCH ROW */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white p-4 sm:p-6 rounded-[2rem] border border-brand-subtle shadow-sm">
          <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all focus:outline-none cursor-pointer ${
                  selectedCategory === cat.slug
                    ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                    : "bg-brand-subtle/50 text-text-secondary hover:bg-brand-subtle"
                }`}
              >
                {cat.name}
                {typeof cat.count === "number" && (
                  <span className="ml-1.5 opacity-60">{cat.count}</span>
                )}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder={section.searchPlaceholder || "Search clinical archives..."}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-brand-subtle/30 border border-brand-subtle rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium focus:outline-none focus:border-brand-blue transition-all"
            />
            <Search size={14} className="absolute left-3.5 top-3.5 text-text-accent opacity-60" />
          </div>
        </div>

        {/* FEATURED BLOG POST */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href={`/blogs/${featured.slug}`}
              className="group grid lg:grid-cols-12 gap-8 bg-white border border-brand-subtle p-8 rounded-[2.5rem] shadow-sm hover:border-brand-blue/30 transition-all"
            >
              <div className="lg:col-span-6 rounded-3xl aspect-[16/10] lg:aspect-auto min-h-[280px] sm:min-h-[350px] bg-gradient-to-tr from-brand-dark to-slate-900 relative overflow-hidden flex items-center justify-center">
                {getStrapiMedia(featured.coverImage?.url) ? (
                  <Image
                    src={getStrapiMedia(featured.coverImage?.url) as string}
                    alt={featured.coverImage?.alternativeText || featured.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(26,111,196,0.15),transparent_60%)]" />
                    <div className="absolute w-[140%] h-[140%] opacity-20 transform rotate-12 scale-110 flex items-center justify-center pointer-events-none">
                      <svg width="400" height="400" viewBox="0 0 400 400" className="text-brand-blue">
                        <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" />
                        <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="2" />
                        <path d="M 50 200 C 150 100, 250 300, 350 200" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M 50 200 C 150 300, 250 100, 350 200" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </div>
                    <div className="relative text-center p-6 space-y-2 select-none">
                      <div className="w-16 h-16 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center mx-auto border border-brand-blue/30 scale-110">
                        <BookOpen size={28} />
                      </div>
                      <p className="font-mono text-[10px] text-brand-blue/80 tracking-widest uppercase">
                        OJAS INSIGHT ENGINE
                      </p>
                    </div>
                  </>
                )}
                <div className="absolute top-6 left-6 px-3.5 py-1.5 bg-brand-blue text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                  {section.featuredBadgeText || "FEATURED SUMMARY"}
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
                {featured.category && (
                  <span className="px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-[10px] font-bold uppercase tracking-wider rounded-lg w-fit">
                    {featured.category.name}
                  </span>
                )}
                <div className="space-y-4">
                  <h2 className="text-lg sm:text-28 font-display font-medium text-text-primary tracking-tight leading-tight group-hover:text-brand-blue transition-colors">
                    {featured.title}
                  </h2>
                  {featured.excerpt && (
                    <p className="text-16 leading-relaxed text-text-secondary">{featured.excerpt}</p>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-text-accent font-medium pt-4 border-t border-brand-subtle select-none">
                  {featured.author && (
                    <div className="flex items-center gap-1.5">
                      <User size={14} className="text-brand-blue" />
                      <span>{featured.author}</span>
                    </div>
                  )}
                  {formatDate(featured.publishDate) && (
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-brand-blue" />
                      <span>{formatDate(featured.publishDate)}</span>
                    </div>
                  )}
                  {featured.readTime && (
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-brand-blue" />
                      <span>{featured.readTime}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-brand-blue font-bold text-xs uppercase tracking-wider">
                  Explore Full Study{" "}
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* BLOGS GRID */}
        {isFiltering ? (
          <div className="flex justify-center py-20">
            <Loader2 size={28} className="animate-spin text-brand-blue" />
          </div>
        ) : gridBlogs.length === 0 && !featured ? (
          <div className="text-center py-20 bg-white border border-brand-subtle rounded-[2rem] space-y-4">
            <h3 className="text-lg font-display font-bold">
              {section.emptyStateTitle || "No Matching Archives"}
            </h3>
            <p className="text-16 leading-relaxed text-text-secondary max-w-sm mx-auto">
              {section.emptyStateDescription ||
                "We couldn't find any papers or summaries matching your current filters."}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {gridBlogs.map((blog, idx) => (
              <motion.div
                key={blog.documentId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (idx % pageSize) * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="group h-full bg-white border border-brand-subtle p-6 rounded-[2.2rem] shadow-sm hover:shadow-xl hover:shadow-brand-dark/5 hover:border-brand-blue/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <CardArtwork blog={blog} index={idx} />
                    {formatDate(blog.publishDate) && (
                      <p className="text-11 uppercase tracking-widest font-semibold text-brand-blue mb-2 font-mono">
                        {formatDate(blog.publishDate)}
                      </p>
                    )}
                    <h3 className="text-lg sm:text-28 font-display font-medium text-text-primary mb-3 group-hover:text-brand-blue transition-colors leading-tight">
                      {blog.title}
                    </h3>
                    {blog.excerpt && (
                      <p className="text-16 leading-relaxed text-text-secondary mb-6">
                        {blog.excerpt}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-brand-subtle select-none">
                    <div className="flex items-center gap-2 text-xs text-text-accent font-semibold">
                      {blog.author && (
                        <>
                          <User size={12} className="text-brand-blue" />
                          <span>{blog.author}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-text-primary font-bold text-xs uppercase tracking-wider">
                      Read Article{" "}
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* LOAD MORE */}
        {hasMore && !isFiltering && (
          <div className="flex justify-center">
            <button
              onClick={loadMore}
              disabled={isLoadingMore}
              className="group flex items-center gap-2.5 bg-white border border-brand-subtle hover:border-brand-blue/40 text-text-primary px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoadingMore ? (
                <>
                  <Loader2 size={14} className="animate-spin text-brand-blue" />
                  Loading
                </>
              ) : (
                <>
                  {section.loadMoreLabel || "Load More Articles"}
                  <ArrowRight
                    size={14}
                    className="text-brand-blue group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogsGrid;
