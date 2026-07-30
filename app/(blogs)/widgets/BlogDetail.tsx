"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  User,
  Calendar,
  ShieldCheck,
  BookOpen,
  Link2,
  Check,
} from "lucide-react";
import { getStrapiMedia } from "@/app/lib/strapi";
import BlogContent from "./BlogContent";
import type { BlogDetailData } from "@/app/lib/types";

interface Props {
  post: BlogDetailData;
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

export default function BlogDetail({ post }: Props) {
  const [copied, setCopied] = useState(false);

  /* Thin progress bar tracking how far the reader is through the page. */
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      /* Clipboard unavailable (insecure context) — silently ignore. */
    }
  };

  const coverUrl = getStrapiMedia(post.coverImage?.url);
  const publishedOn = formatDate(post.publishDate);

  return (
    <section className="pb-16 sm:pb-24">
      {/* Reading progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-1 bg-brand-blue origin-left z-50"
      />

      <div className="global-container mx-auto">
        {/* Title block — sits above the cover so the headline leads the page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-10"
        >
          {/* Category + read time */}
          <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
            {post.category && (
              <span className="px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold uppercase tracking-wider rounded-full">
                {post.category.name}
              </span>
            )}
            {post.readTime && (
              <span className="flex items-center gap-1.5 text-xs text-text-accent font-medium">
                <Clock size={12} className="text-brand-blue" />
                {post.readTime}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary">
            {post.title}
          </h1>
        </motion.div>

        {/* Cover — contained and rounded rather than full-bleed */}
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`max-w-5xl mx-auto h-64 sm:h-80 lg:h-[26rem] relative overflow-hidden rounded-[2rem] mb-12 shadow-xl shadow-brand-dark/5 flex items-center justify-center ${
            coverUrl
              ? "bg-brand-dark"
              : `bg-gradient-to-br ${post.gradient || DEFAULT_GRADIENT} border border-brand-subtle`
          }`}
        >
          {coverUrl ? (
            <>
              <Image
                src={coverUrl}
                alt={post.coverImage?.alternativeText || post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(26,111,196,0.12),transparent_65%)] pointer-events-none" />
              <div className="absolute w-[120%] h-[120%] opacity-10 flex items-center justify-center pointer-events-none">
                <svg width="500" height="500" viewBox="0 0 400 400" className="text-brand-blue">
                  <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6,6" />
                  <circle cx="200" cy="200" r="130" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M 40 200 C 130 90, 270 310, 360 200" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M 40 200 C 130 310, 270 90, 360 200" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="relative flex flex-col items-center gap-4 text-center px-6">
                <div className="w-16 h-16 rounded-2xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center">
                  <BookOpen size={28} className="text-brand-blue" />
                </div>
                <p className="text-11 uppercase tracking-widest font-semibold text-brand-blue font-mono">
                  OJAS Clinical Archives
                </p>
              </div>
            </>
          )}
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-3xl mx-auto"
        >
          {/* Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-brand-subtle mb-10">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-text-accent font-medium">
              {post.author && (
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0">
                    <User size={14} className="text-brand-blue" />
                  </div>
                  <div className="leading-tight">
                    <p className="font-bold text-text-primary text-xs">{post.author}</p>
                    {post.authorRole && (
                      <p className="text-[11px] text-text-accent">{post.authorRole}</p>
                    )}
                  </div>
                </div>
              )}
              {publishedOn && (
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-brand-blue" />
                  <span>{publishedOn}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-brand-blue" />
                <span>Verified Medical Release</span>
              </div>
            </div>

            <button
              onClick={copyLink}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-subtle bg-white text-xs font-bold uppercase tracking-wider text-text-secondary hover:border-brand-blue/40 hover:text-brand-blue transition-all shadow-sm cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-brand-blue" /> Copied
                </>
              ) : (
                <>
                  <Link2 size={14} className="text-brand-blue" /> Share
                </>
              )}
            </button>
          </div>

          {/* Pull quote */}
          {post.excerpt && (
            <blockquote className="border-l-4 border-brand-blue bg-brand-subtle/30 rounded-r-2xl pl-6 pr-5 py-5 mb-10 italic text-16 leading-relaxed text-text-secondary">
              &ldquo;{post.excerpt}&rdquo;
            </blockquote>
          )}

          {/* Body */}
          {post.content && <BlogContent markdown={post.content} />}

          {/* Footer compliance note */}
          <div className="mt-12 pt-8 border-t border-brand-subtle flex items-center justify-between flex-wrap gap-4">
            <span className="flex items-center gap-1.5 text-11 uppercase tracking-widest font-semibold text-text-accent font-mono">
              <ShieldCheck size={13} className="text-brand-blue" />
              Conforms to HIPAA Secure Regulations
            </span>
            <Link
              href="/blogs"
              className="group flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-subtle bg-white text-xs font-bold uppercase tracking-widest text-text-secondary hover:border-brand-blue/40 hover:text-brand-blue transition-all shadow-sm cursor-pointer"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              Back to Blogs
            </Link>
          </div>
        </motion.article>

        {/* Related posts */}
        {post.related && post.related.length > 0 && (
          <div className="max-w-5xl mx-auto mt-24 pt-14 border-t border-brand-subtle">
            <div className="mb-10">
              <p className="text-11 uppercase tracking-widest font-semibold text-brand-blue font-mono mb-3">
                Continue Reading
              </p>
              <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary">
                More from the Clinical Gazette
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {post.related.map((related) => {
                const relatedCover = getStrapiMedia(related.coverImage?.url);
                return (
                  <Link
                    key={related.documentId}
                    href={`/blogs/${related.slug}`}
                    className="group h-full bg-white border border-brand-subtle rounded-[2.2rem] p-4 shadow-sm hover:shadow-xl hover:shadow-brand-dark/5 hover:border-brand-blue/30 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div
                        className={`rounded-2xl aspect-[16/10] mb-6 overflow-hidden relative ${
                          relatedCover
                            ? "border border-brand-subtle"
                            : `bg-gradient-to-br ${related.gradient || DEFAULT_GRADIENT} border`
                        }`}
                      >
                        {relatedCover && (
                          <Image
                            src={relatedCover}
                            alt={related.coverImage?.alternativeText || related.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                          />
                        )}
                      </div>
                      {related.category && (
                        <p className="text-11 uppercase tracking-widest font-semibold text-brand-blue mb-2 font-mono">
                          {related.category.name}
                        </p>
                      )}
                      <h3 className="text-lg sm:text-24 font-display font-medium text-text-primary mb-3 leading-tight group-hover:text-brand-blue transition-colors">
                        {related.title}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-brand-subtle select-none">
                      {related.readTime ? (
                        <span className="flex items-center gap-1.5 text-xs text-text-accent font-medium">
                          <Clock size={12} className="text-brand-blue" />
                          {related.readTime}
                        </span>
                      ) : (
                        <span />
                      )}
                      <span className="flex items-center gap-1.5 text-text-primary font-bold text-xs uppercase tracking-wider">
                        Read{" "}
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
