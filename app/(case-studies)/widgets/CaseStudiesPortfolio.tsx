"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Loader2 } from "lucide-react";
import { getCaseStudyListing } from "@/app/lib/api";
import { getStrapiMedia } from "@/app/lib/strapi";
import { cn } from "@/app/lib/cn";
import type {
  CaseStudyCard,
  CaseStudyCategory,
  CaseStudiesPortfolioSection,
} from "@/app/lib/types";

interface Props {
  section: CaseStudiesPortfolioSection;
}

const CaseStudiesPortfolio = ({ section }: Props) => {
  const pageSize = section.pageSize || 4;
  const categories: CaseStudyCategory[] = section.categories?.length
    ? section.categories
    : [{ name: "All Cases", slug: "all" }];

  const [activeFilter, setActiveFilter] = useState("all");
  const [studies, setStudies] = useState<CaseStudyCard[]>(section.caseStudies ?? []);
  const [page, setPage] = useState(section.pagination?.page ?? 1);
  const [hasMore, setHasMore] = useState(section.pagination?.hasMore ?? false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  /**
   * Guards against a slow early request overwriting a newer filter's results.
   * `isInitial` skips the refetch on mount since the server already sent page 1.
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

    getCaseStudyListing({ category: activeFilter, page: 1, pageSize }).then((listing) => {
      if (currentRequest !== requestId.current) return;

      setStudies(listing?.caseStudies ?? []);
      setPage(1);
      setHasMore(listing?.pagination?.hasMore ?? false);
      setIsFiltering(false);
    });
  }, [activeFilter, pageSize]);

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    const nextPage = page + 1;
    const currentRequest = requestId.current;

    const listing = await getCaseStudyListing({
      category: activeFilter,
      page: nextPage,
      pageSize,
    });

    /* A filter change while paging invalidates this response. */
    if (currentRequest === requestId.current && listing) {
      setStudies((prev) => [...prev, ...listing.caseStudies]);
      setPage(nextPage);
      setHasMore(listing.pagination.hasMore);
    }

    setIsLoadingMore(false);
  }, [isLoadingMore, hasMore, page, activeFilter, pageSize]);

  return (
    <section className={cn("pb-16 sm:pb-24", section.wrapperClass)}>
      <div className="global-container mx-auto space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-4 border-b border-slate-200">
          <div>
            <h3 className="text-lg sm:text-28 font-display font-medium text-text-primary tracking-tight">
              {section.title}
            </h3>
            {section.description && (
              <p className="text-xs text-text-secondary font-semibold mt-1 opacity-70">
                {section.description}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveFilter(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all duration-300 outline-none cursor-pointer border ${
                  activeFilter === cat.slug
                    ? "bg-brand-blue border-brand-blue text-white shadow-md shadow-brand-blue/15"
                    : "bg-white border-slate-200 text-text-secondary hover:border-slate-350 hover:bg-slate-50"
                }`}
              >
                {cat.name}
                {typeof cat.count === "number" && (
                  <span className="ml-1.5 opacity-60">{cat.count}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {isFiltering ? (
          <div className="flex justify-center py-20">
            <Loader2 size={28} className="animate-spin text-brand-blue" />
          </div>
        ) : studies.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl space-y-4">
            <h3 className="text-lg font-display font-bold">
              {section.emptyStateTitle || "No Matching Cases"}
            </h3>
            <p className="text-16 leading-relaxed text-text-secondary max-w-sm mx-auto">
              {section.emptyStateDescription ||
                "No case studies are published under this category yet."}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {studies.map((story) => {
                const imageUrl = getStrapiMedia(story.image?.url);
                return (
                  <motion.div
                    layout
                    key={story.documentId}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      href={`/case-studies/${story.slug}`}
                      className="bg-white h-full rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col hover:border-brand-blue hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="h-56 relative bg-slate-100 overflow-hidden">
                        {imageUrl && (
                          <Image
                            src={imageUrl}
                            alt={story.image?.alternativeText || story.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                        {story.category && (
                          <div className="absolute top-4 left-4 bg-brand-blue/90 text-white px-2.5 py-0.5 text-[9px] font-mono font-bold rounded-md uppercase tracking-widest">
                            {story.category.name}
                          </div>
                        )}
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          {story.subject && (
                            <p className="text-[10px] font-mono text-brand-subtle font-black tracking-widest uppercase mb-1">
                              {story.subject}
                            </p>
                          )}
                          <h3 className="text-lg font-display text-white leading-tight tracking-tight">
                            {story.title}
                          </h3>
                        </div>
                      </div>
                      <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-6">
                        {story.summary && (
                          <p className="text-xs text-text-secondary font-medium leading-relaxed opacity-90">
                            {story.summary}
                          </p>
                        )}
                        <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-slate-100 text-xs">
                          <div>
                            <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider mb-0.5">
                              {section.durationLabel || "Trial Span"}
                            </p>
                            <p className="font-bold text-text-primary font-mono">
                              {story.duration || "—"}
                            </p>
                          </div>
                          <div>
                            <p className="text-emerald-600 font-bold uppercase text-[9px] tracking-wider mb-0.5">
                              {section.impactLabel || "Verified Result"}
                            </p>
                            <p className="font-extrabold text-emerald-800 font-mono">
                              {story.impact || "—"}
                            </p>
                          </div>
                        </div>
                        {story.clinician && (
                          <div className="bg-bg-page p-3.5 rounded-2xl border border-slate-100 group-hover:border-brand-blue/30 transition-all">
                            <p className="text-[9px] font-mono text-brand-blue font-black uppercase tracking-wider mb-1">
                              {section.clinicianLabel || "ATTENDING SUPERINTENDENT"}
                            </p>
                            <p className="text-xs text-text-primary font-bold">
                              {story.clinician}
                            </p>
                          </div>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {hasMore && !isFiltering && (
          <div className="flex justify-center">
            <button
              onClick={loadMore}
              disabled={isLoadingMore}
              className="group flex items-center gap-2.5 bg-white border border-slate-200 hover:border-brand-blue/40 text-text-primary px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoadingMore ? (
                <>
                  <Loader2 size={14} className="animate-spin text-brand-blue" />
                  Loading
                </>
              ) : (
                <>
                  {section.loadMoreLabel || "Load More Cases"}
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

export default CaseStudiesPortfolio;
