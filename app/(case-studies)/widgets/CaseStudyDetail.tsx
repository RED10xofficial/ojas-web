"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, ShieldCheck, Stethoscope, Timer, TrendingUp } from "lucide-react";
import { getStrapiMedia } from "@/app/lib/strapi";
import BlogContent from "@/app/(blogs)/widgets/BlogContent";
import type { CaseStudyDetailData } from "@/app/lib/types";

interface Props {
  study: CaseStudyDetailData;
}

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

export default function CaseStudyDetail({ study }: Props) {
  const [sliderPosition, setSliderPosition] = useState(50);

  const coverUrl = getStrapiMedia(study.image?.url);
  const beforeUrl = getStrapiMedia(study.beforeImage?.url);
  const afterUrl = getStrapiMedia(study.afterImage?.url);
  const publishedOn = formatDate(study.publishDate);
  const steps = study.journeySteps ?? [];

  return (
    <section className="pb-16 sm:pb-24">
      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full h-64 sm:h-80 lg:h-96 relative overflow-hidden flex items-end mb-12 bg-brand-dark border-b border-slate-200"
      >
        {coverUrl && (
          <Image
            src={coverUrl}
            alt={study.image?.alternativeText || study.title}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent" />
        <div className="global-container relative pb-10 w-full">
          <div className="max-w-3xl mx-auto text-white">
            {study.category && (
              <span className="inline-block bg-brand-blue/90 px-2.5 py-1 text-[9px] font-mono font-black rounded-md uppercase tracking-widest mb-3">
                {study.category.name}
              </span>
            )}
            {study.subject && (
              <p className="text-[10px] font-mono text-brand-subtle font-black tracking-widest uppercase mb-2">
                {study.subject}
              </p>
            )}
            <h1 className="text-32 lg:text-48 leading-[1.15] font-display font-medium uppercase tracking-tight">
              {study.title}
            </h1>
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
          {/* Outcome strip */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Timer size={13} className="text-brand-blue" />
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Trial Span
                </p>
              </div>
              <p className="font-bold text-text-primary font-mono text-sm">
                {study.duration || "—"}
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-1.5 mb-1.5">
                <TrendingUp size={13} className="text-emerald-600" />
                <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-600">
                  Verified Result
                </p>
              </div>
              <p className="font-extrabold text-emerald-800 font-mono text-sm">
                {study.impact || "—"}
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Calendar size={13} className="text-brand-blue" />
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Published
                </p>
              </div>
              <p className="font-bold text-text-primary font-mono text-sm">
                {publishedOn || "—"}
              </p>
            </div>
          </div>

          {/* Clinician */}
          {study.clinician && (
            <div className="bg-bg-page p-4 rounded-2xl border border-slate-200 flex items-center gap-3 mb-10">
              <Stethoscope size={18} className="text-brand-blue shrink-0" />
              <div>
                <p className="text-[9px] font-mono text-brand-blue font-black uppercase tracking-wider">
                  Attending Superintendent
                </p>
                <p className="text-xs text-text-primary font-bold">{study.clinician}</p>
              </div>
            </div>
          )}

          {/* Pull quote */}
          {study.summary && (
            <blockquote className="border-l-4 border-brand-blue pl-6 py-2 mb-10 italic text-16 leading-relaxed text-text-secondary">
              &ldquo;{study.summary}&rdquo;
            </blockquote>
          )}

          {/* Before / after comparison */}
          {beforeUrl && afterUrl && (
            <div className="mb-12">
              <div className="rounded-2xl overflow-hidden aspect-video relative border border-slate-200 shadow-lg bg-slate-100">
                <Image
                  src={afterUrl}
                  alt={study.afterImage?.alternativeText || study.afterLabel || "After"}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
                <div
                  className="absolute top-0 left-0 bottom-0 overflow-hidden border-r-2 border-brand-blue"
                  style={{ width: `${100 - sliderPosition}%` }}
                >
                  {/*
                    The inner wrapper keeps the full container width while the
                    parent clips it, so the image reveals rather than squashes.
                  */}
                  <div className="absolute top-0 left-0 h-full w-screen max-w-none">
                    <div className="relative h-full w-full">
                      <Image
                        src={beforeUrl}
                        alt={study.beforeImage?.alternativeText || study.beforeLabel || "Before"}
                        fill
                        sizes="(max-width: 768px) 100vw, 768px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-xs font-bold font-mono mt-4">
                <span className="text-rose-600 uppercase">{study.beforeLabel}</span>
                <span className="text-brand-blue uppercase">{study.afterLabel}</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                aria-label="Before and after comparison"
                className="w-full h-2 mt-3 rounded-lg appearance-none cursor-pointer bg-slate-200 accent-brand-blue py-0 border-0 outline-none"
              />
            </div>
          )}

          {/* Body */}
          {study.content && <BlogContent markdown={study.content} />}

          {/* Journey timeline */}
          {steps.length > 0 && (
            <div className="mt-12 pt-10 border-t border-slate-200">
              <p className="text-xs font-bold text-brand-blue uppercase tracking-widest font-mono mb-6">
                Treatment Timeline
              </p>
              <div className="space-y-4">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className="bg-white border border-slate-200 rounded-2xl p-5 flex gap-4 shadow-sm"
                  >
                    <span className="h-fit px-2.5 py-0.5 bg-brand-blue/10 border border-brand-blue/30 text-[9px] text-brand-blue font-bold tracking-widest rounded-md font-mono shrink-0">
                      {step.day}
                    </span>
                    <div>
                      <h4 className="text-xs font-black text-text-primary uppercase tracking-tight mb-1 font-display">
                        {step.title}
                      </h4>
                      {step.description && (
                        <p className="text-xs text-text-secondary leading-relaxed font-semibold">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer compliance note */}
          <div className="mt-12 pt-8 border-t border-slate-200 flex items-center justify-between flex-wrap gap-4">
            <span className="text-11 uppercase tracking-widest font-semibold text-text-accent font-mono flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-brand-blue" />
              Vetted by the Scientific Advisory Guild
            </span>
            <Link
              href="/case-studies"
              className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-accent hover:text-brand-blue transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              Back to Case Studies
            </Link>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
