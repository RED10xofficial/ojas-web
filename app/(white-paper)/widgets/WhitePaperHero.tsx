"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { BookOpen } from "lucide-react";
import type { WhitePaperHeroSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

interface Props {
  section: WhitePaperHeroSection;
}

const WhitePaperHero = ({ section }: Props) => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section className={cn("pb-16 sm:pb-24 relative", section.wrapperClass)}>
      {section.showProgressBar !== false && (
        <motion.div
          style={{ scaleX: progress }}
          className="fixed top-0 left-0 right-0 h-1.5 bg-brand-blue origin-left z-50"
        />
      )}

      <div className="global-container mx-auto">
        {/* Document classification tag */}
        {(section.documentLabel || section.classification) && (
          <div className="flex flex-wrap justify-between items-center gap-4 mb-10 pb-6 border-b border-slate-100">
            {section.documentLabel && (
              <div className="flex items-center gap-2 text-sm text-text-secondary font-semibold">
                <BookOpen size={16} className="text-brand-blue" />
                <span>{section.documentLabel}</span>
              </div>
            )}
            {section.classification && (
              <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">
                {section.classification}
              </span>
            )}
          </div>
        )}

        {/* LARGE EDITORIAL HERO SECTION */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          {section.badgeText && (
            <p className="text-xs font-bold text-brand-blue uppercase tracking-widest font-mono bg-brand-subtle px-3 py-1 rounded-md inline-block mb-4">
              {section.badgeText}
            </p>
          )}

          <h1 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary mb-8">
            {section.title}
            {section.highlightedTitle && (
              <>
                {" "}
                <span className="text-brand-blue">{section.highlightedTitle}</span>
              </>
            )}
          </h1>

          {section.pullQuote && (
            <p className="text-16 leading-relaxed text-text-secondary border-l-4 border-brand-blue pl-6 mb-8 font-serif text-left max-w-2xl mx-auto italic">
              &ldquo;{section.pullQuote}&rdquo;
            </p>
          )}

          {(section.publishedLabel || section.vettedLabel || section.readTimeLabel) && (
            <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-slate-100 text-11 text-slate-550 font-semibold uppercase tracking-widest">
              {section.publishedLabel && (
                <span>
                  Published: <strong>{section.publishedLabel}</strong>
                </span>
              )}
              {section.publishedLabel && section.vettedLabel && <span>•</span>}
              {section.vettedLabel && (
                <span>
                  Vetted: <strong>{section.vettedLabel}</strong>
                </span>
              )}
              {section.vettedLabel && section.readTimeLabel && <span>•</span>}
              {section.readTimeLabel && (
                <span>
                  Estimate: <strong>{section.readTimeLabel}</strong>
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WhitePaperHero;
