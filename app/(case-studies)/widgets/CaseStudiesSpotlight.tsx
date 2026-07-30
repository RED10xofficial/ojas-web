"use client";

import { useState } from "react";
import Image from "next/image";
import { Activity, Sparkles } from "lucide-react";
import { getStrapiMedia } from "@/app/lib/strapi";
import type { CaseStudiesSpotlightSection } from "@/app/lib/types";

interface Props {
  section: CaseStudiesSpotlightSection;
}

const CaseStudiesSpotlight = ({ section }: Props) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const beforeUrl = getStrapiMedia(section.beforeImage?.url);
  const afterUrl = getStrapiMedia(section.afterImage?.url);

  /* The comparison needs both plates to mean anything. */
  if (!beforeUrl || !afterUrl) return null;

  const stateText =
    sliderPosition < 35
      ? section.lowStateText
      : sliderPosition < 70
        ? section.midStateText
        : section.highStateText;

  return (
    <section className="pb-16 sm:pb-24">
      <div className="global-container mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-subtle/40 rounded-full blur-3xl pointer-events-none" />
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              {section.badgeText && (
                <div className="inline-flex items-center gap-1.5 text-brand-blue text-[10px] font-bold uppercase tracking-wider font-mono bg-brand-subtle px-2.5 py-1 rounded-md">
                  <Sparkles size={12} /> {section.badgeText}
                </div>
              )}
              <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary uppercase tracking-tight">
                {section.title}
              </h2>
              {section.description && (
                <p className="text-16 leading-relaxed text-text-secondary">
                  {section.description}
                </p>
              )}

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex justify-between text-xs font-bold font-mono">
                  <span className="text-rose-600 uppercase">{section.beforeLabel}</span>
                  <span className="text-brand-blue uppercase">{section.afterLabel}</span>
                </div>
                <div className="relative pt-4">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    aria-label="Before and after comparison"
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200 accent-brand-blue py-0 border-0 outline-none"
                  />
                </div>
                {(section.scaleTitle || stateText) && (
                  <div className="p-4 bg-bg-page rounded-2xl flex items-center gap-3.5 border border-slate-200">
                    <Activity className="text-brand-blue animate-pulse shrink-0" size={20} />
                    <div>
                      {section.scaleTitle && (
                        <h4 className="text-xs font-bold text-text-primary uppercase">
                          {section.scaleTitle}
                        </h4>
                      )}
                      {stateText && (
                        <p className="text-[11px] text-text-secondary font-semibold mt-0.5 opacity-80">
                          {stateText}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl overflow-hidden aspect-video relative border border-slate-200 shadow-lg bg-slate-100">
                <Image
                  src={afterUrl}
                  alt={section.afterImage?.alternativeText || section.afterLabel || "After"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                {section.afterBadge && (
                  <div className="absolute top-4 right-4 bg-brand-blue text-white px-2.5 py-1 text-[9px] font-mono font-black uppercase rounded-md tracking-widest z-10">
                    {section.afterBadge}
                  </div>
                )}
                {/* Before plate is revealed by clipping from the left edge */}
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
                        alt={
                          section.beforeImage?.alternativeText || section.beforeLabel || "Before"
                        }
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  {section.beforeBadge && (
                    <div className="absolute top-4 left-4 bg-rose-600 text-white px-2.5 py-1 text-[9px] font-mono font-black uppercase rounded-md tracking-widest z-10">
                      {section.beforeBadge}
                    </div>
                  )}
                </div>
              </div>
              {section.footnote && (
                <p className="text-[10px] text-center text-text-secondary opacity-60 uppercase font-mono tracking-widest mt-3">
                  {section.footnote}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSpotlight;
