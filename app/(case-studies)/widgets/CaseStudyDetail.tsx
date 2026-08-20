"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Calendar,
  ShieldCheck,
  Stethoscope,
  Timer,
  TrendingUp,
} from "lucide-react";
import { getStrapiMedia } from "@/app/lib/strapi";
import { formatLongDate } from "@/app/lib/date";
import ReadingProgress from "@/app/components/resource-detail/ReadingProgress";
import ShareButton from "@/app/components/resource-detail/ShareButton";
import { EYEBROW, PILL_BUTTON } from "@/app/components/resource-detail/styles";
import BlogContent from "@/app/(blogs)/widgets/BlogContent";
import type { CaseStudyDetailData } from "@/app/lib/types";

interface Props {
  study: CaseStudyDetailData;
}

/**
 * One headline number from the study. The tiles flex to fill the row, so a study
 * that's missing a field just shows fewer tiles instead of a blank one.
 */
function OutcomeTile({
  icon,
  label,
  value,
  accent,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex-1 min-w-[13rem] bg-white border border-brand-subtle rounded-2xl p-5 sm:p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <p
          className={`text-11 font-bold uppercase tracking-widest ${
            accent ? "text-success" : "text-text-accent"
          }`}
        >
          {label}
        </p>
      </div>
      <p
        className={`text-20 lg:text-24 font-display font-medium leading-tight ${
          accent ? "text-success" : "text-text-primary"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export default function CaseStudyDetail({ study }: Props) {
  const [sliderPosition, setSliderPosition] = useState(50);

  const coverUrl = getStrapiMedia(study.image?.url);
  const beforeUrl = getStrapiMedia(study.beforeImage?.url);
  const afterUrl = getStrapiMedia(study.afterImage?.url);
  const publishedOn = formatLongDate(study.publishDate);
  const steps = study.journeySteps ?? [];

  return (
    <section className="pb-16 sm:pb-24">
      <ReadingProgress />

      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full h-72 sm:h-88 lg:h-[26rem] relative overflow-hidden flex items-end mb-12 sm:mb-16 bg-brand-dark border-b border-brand-subtle"
      >
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={study.image?.alternativeText || study.title}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(184,104,81,0.35),transparent_60%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/50 to-transparent" />

        <div className="global-container relative w-full pb-10 sm:pb-14">
          <div className="max-w-3xl mx-auto flex flex-col items-start gap-4 text-white">
            {study.category && (
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-brand-blue text-white text-11 font-bold uppercase tracking-widest">
                {study.category.name}
              </span>
            )}
            <h1 className="text-32 lg:text-48 leading-[1.15] font-display font-medium">
              {study.title}
            </h1>
            {study.subject && (
              <p className="text-12 font-semibold uppercase tracking-widest text-white/70">
                {study.subject}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      <div className="global-container mx-auto">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-3xl mx-auto"
        >
          {/* Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-brand-subtle mb-10 sm:mb-12">
            <span className={`${EYEBROW} flex items-center gap-2`}>
              <ShieldCheck size={14} className="text-brand-blue" />
              Clinical Case Study
            </span>
            <ShareButton />
          </div>

          {/* Outcome strip */}
          <div className="flex flex-wrap gap-4 mb-10 sm:mb-12">
            {study.duration && (
              <OutcomeTile
                icon={<Timer size={14} className="text-brand-blue" />}
                label="Trial Span"
                value={study.duration}
              />
            )}
            {study.impact && (
              <OutcomeTile
                icon={<TrendingUp size={14} className="text-success" />}
                label="Verified Result"
                value={study.impact}
                accent
              />
            )}
            {publishedOn && (
              <OutcomeTile
                icon={<Calendar size={14} className="text-brand-blue" />}
                label="Published"
                value={publishedOn}
              />
            )}
          </div>

          {/* Clinician */}
          {study.clinician && (
            <div className="bg-white border border-brand-subtle rounded-2xl p-5 shadow-sm flex items-center gap-4 mb-10 sm:mb-12">
              <div className="w-11 h-11 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0">
                <Stethoscope size={18} className="text-brand-blue" />
              </div>
              <div className="flex flex-col gap-1">
                <p className={EYEBROW}>Attending Superintendent</p>
                <p className="text-16 font-semibold text-text-primary leading-tight">
                  {study.clinician}
                </p>
              </div>
            </div>
          )}

          {/* Pull quote */}
          {study.summary && (
            <blockquote className="border-l-4 border-brand-blue bg-brand-subtle/30 rounded-r-2xl pl-6 pr-5 py-5 mb-10 sm:mb-12 italic text-16 leading-relaxed text-text-secondary">
              &ldquo;{study.summary}&rdquo;
            </blockquote>
          )}

          {/* Before / after comparison */}
          {beforeUrl && afterUrl && (
            <div className="mb-12 sm:mb-16">
              <div className="relative aspect-video overflow-hidden rounded-[2rem] border border-brand-subtle shadow-lg bg-slate-100">
                <Image
                  src={afterUrl}
                  alt={
                    study.afterImage?.alternativeText ||
                    study.afterLabel ||
                    "After"
                  }
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
                <div
                  className="absolute top-0 left-0 bottom-0 overflow-hidden border-r-2 border-brand-blue"
                  style={{ width: `${100 - sliderPosition}%` }}
                >
                  {/* The parent clips this, so the inner wrapper has to hold the full width.
                      Otherwise the image squashes instead of revealing. */}
                  <div className="absolute top-0 left-0 h-full w-screen max-w-none">
                    <div className="relative h-full w-full">
                      <Image
                        src={beforeUrl}
                        alt={
                          study.beforeImage?.alternativeText ||
                          study.beforeLabel ||
                          "Before"
                        }
                        fill
                        sizes="(max-width: 768px) 100vw, 768px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                {study.beforeLabel && (
                  <span className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-brand-dark/75 backdrop-blur-sm text-white text-11 font-bold uppercase tracking-widest">
                    {study.beforeLabel}
                  </span>
                )}
                {study.afterLabel && (
                  <span className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-brand-blue text-white text-11 font-bold uppercase tracking-widest">
                    {study.afterLabel}
                  </span>
                )}
              </div>

              <input
                type="range"
                min="1"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                aria-label="Before and after comparison"
                className="roi-slider w-full mt-6 cursor-pointer"
              />
            </div>
          )}

          {/* Body */}
          {study.content && <BlogContent markdown={study.content} />}

          {/* Journey timeline */}
          {steps.length > 0 && (
            <div className="mt-12 sm:mt-16 pt-10 border-t border-brand-subtle">
              <p className="text-11 uppercase tracking-widest font-bold text-brand-blue mb-8">
                Treatment Timeline
              </p>

              <ol className="relative ml-2 space-y-5 border-l border-brand-subtle pl-6">
                {steps.map((step) => (
                  <li key={step.id} className="relative">
                    <span className="absolute -left-[1.875rem] top-6 w-3 h-3 rounded-full bg-brand-blue ring-4 ring-bg-page" />
                    <div className="bg-white border border-brand-subtle rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-2.5">
                      <span className="w-fit px-2.5 py-1 rounded-md bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-11 font-bold uppercase tracking-widest">
                        {step.day}
                      </span>
                      <h4 className="text-16 lg:text-18 font-display font-medium text-text-primary leading-snug">
                        {step.title}
                      </h4>
                      {step.description && (
                        <p className="text-16 leading-relaxed text-text-secondary">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Footer compliance note */}
          <div className="mt-12 sm:mt-16 pt-8 border-t border-brand-subtle flex items-center justify-between flex-wrap gap-4">
            <span className={`${EYEBROW} flex items-center gap-2`}>
              <ShieldCheck size={13} className="text-brand-blue" />
              Vetted by the Scientific Advisory Guild
            </span>
            <Link href="/case-studies" className={PILL_BUTTON}>
              <ArrowLeft
                size={14}
                className="text-brand-blue group-hover:-translate-x-0.5 transition-transform"
              />
              Back to Case Studies
            </Link>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
