"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  User,
  Calendar,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import { getStrapiMedia } from "@/app/lib/strapi";
import { formatLongDate } from "@/app/lib/date";
import ReadingProgress from "@/app/components/resource-detail/ReadingProgress";
import ShareButton from "@/app/components/resource-detail/ShareButton";
import { EYEBROW, PILL_BUTTON } from "@/app/components/resource-detail/styles";
import BlogContent from "./BlogContent";
import type { BlogDetailData } from "@/app/lib/types";

interface Props {
  post: BlogDetailData;
}

const DEFAULT_GRADIENT = "from-blue-600/20 to-indigo-600/20 border-blue-500/30";

export default function BlogDetail({ post }: Props) {
  const coverUrl = getStrapiMedia(post.coverImage?.url);
  const publishedOn = formatLongDate(post.publishDate);

  return (
    <section className="pb-16 sm:pb-24">
      <ReadingProgress />

      <div className="global-container mx-auto">
        {/* Title block — sits above the cover so the headline leads the page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center flex flex-col items-center gap-5 sm:gap-6 mb-10 sm:mb-12"
        >
          {/* Category + read time */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {post.category && (
              <span className="px-3 py-1.5 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold uppercase tracking-widest rounded-full">
                {post.category.name}
              </span>
            )}
            {post.readTime && (
              <span className="flex items-center gap-1.5 text-12 text-text-accent font-medium">
                <Clock size={13} className="text-brand-blue" />
                {post.readTime}
              </span>
            )}
          </div>

          <h1 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary">
            {post.title}
          </h1>
        </motion.div>

        {/* Cover — contained and rounded rather than full-bleed */}
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`max-w-5xl mx-auto h-64 sm:h-80 lg:h-[26rem] relative overflow-hidden rounded-[2rem] mb-12 sm:mb-16 shadow-xl shadow-brand-dark/5 flex items-center justify-center ${
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
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,104,81,0.12),transparent_65%)] pointer-events-none" />
              <div className="absolute w-[120%] h-[120%] opacity-10 flex items-center justify-center pointer-events-none">
                <svg
                  width="500"
                  height="500"
                  viewBox="0 0 400 400"
                  className="text-brand-blue"
                >
                  <circle
                    cx="200"
                    cy="200"
                    r="180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="6,6"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="130"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 40 200 C 130 90, 270 310, 360 200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 40 200 C 130 310, 270 90, 360 200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <div className="relative flex flex-col items-center gap-4 text-center px-6">
                <div className="w-16 h-16 rounded-2xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center">
                  <BookOpen size={28} className="text-brand-blue" />
                </div>
                <p className={EYEBROW}>OJAS Clinical Archives</p>
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
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-5 pb-8 border-b border-brand-subtle mb-10 sm:mb-12">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-12 text-text-accent font-medium">
              {post.author && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0">
                    <User size={15} className="text-brand-blue" />
                  </div>
                  <div className="leading-snug">
                    <p className="text-13 font-bold text-text-primary">
                      {post.author}
                    </p>
                    {post.authorRole && (
                      <p className="text-11 text-text-accent">
                        {post.authorRole}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {publishedOn && (
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-brand-blue" />
                  <span>{publishedOn}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-brand-blue" />
                <span>Verified Medical Release</span>
              </div>
            </div>

            <ShareButton />
          </div>

          {/* Pull quote */}
          {post.excerpt && (
            <blockquote className="border-l-4 border-brand-blue bg-brand-subtle/30 rounded-r-2xl pl-6 pr-5 py-5 mb-10 sm:mb-12 italic text-16 leading-relaxed text-text-secondary">
              &ldquo;{post.excerpt}&rdquo;
            </blockquote>
          )}

          {/* Body */}
          {post.content && <BlogContent markdown={post.content} />}

          {/* Footer compliance note */}
          <div className="mt-12 sm:mt-16 pt-8 border-t border-brand-subtle flex items-center justify-between flex-wrap gap-4">
            <span className={`${EYEBROW} flex items-center gap-2`}>
              <ShieldCheck size={13} className="text-brand-blue" />
              Conforms to HIPAA Secure Regulations
            </span>
            <Link href="/blogs" className={PILL_BUTTON}>
              <ArrowLeft
                size={14}
                className="text-brand-blue group-hover:-translate-x-0.5 transition-transform"
              />
              Back to Blogs
            </Link>
          </div>
        </motion.article>

        {/* Related posts */}
        {post.related && post.related.length > 0 && (
          <div className="max-w-5xl mx-auto mt-20 sm:mt-24 pt-12 sm:pt-16 border-t border-brand-subtle">
            <div className="flex flex-col gap-3 mb-10">
              <p className="text-11 uppercase tracking-widest font-bold text-brand-blue">
                Continue Reading
              </p>
              <h2 className="text-32 leading-[1.15] font-display font-medium text-text-primary">
                More from the Clinical Gazette
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {post.related.map((related) => {
                const relatedCover = getStrapiMedia(related.coverImage?.url);
                return (
                  <Link
                    key={related.documentId}
                    href={`/blogs/${related.slug}`}
                    className="group h-full bg-white border border-brand-subtle rounded-[2rem] p-5 shadow-sm hover:shadow-xl hover:shadow-brand-dark/5 hover:border-brand-blue/30 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between gap-5"
                  >
                    <div className="flex flex-col gap-4">
                      <div
                        className={`rounded-2xl aspect-[16/10] overflow-hidden relative ${
                          relatedCover
                            ? "border border-brand-subtle"
                            : `bg-gradient-to-br ${related.gradient || DEFAULT_GRADIENT} border`
                        }`}
                      >
                        {relatedCover && (
                          <Image
                            src={relatedCover}
                            alt={
                              related.coverImage?.alternativeText ||
                              related.title
                            }
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                          />
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        {related.category && (
                          <p className="text-11 uppercase tracking-widest font-bold text-brand-blue">
                            {related.category.name}
                          </p>
                        )}
                        <h3 className="text-lg sm:text-24 font-display font-medium text-text-primary leading-tight group-hover:text-brand-blue transition-colors">
                          {related.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-brand-subtle select-none">
                      {related.readTime ? (
                        <span className="flex items-center gap-1.5 text-12 text-text-accent font-medium">
                          <Clock size={12} className="text-brand-blue" />
                          {related.readTime}
                        </span>
                      ) : (
                        <span />
                      )}
                      <span className="flex items-center gap-1.5 text-text-primary font-bold text-11 uppercase tracking-widest">
                        Read
                        <ArrowRight
                          size={14}
                          className="group-hover:translate-x-1 transition-transform"
                        />
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
