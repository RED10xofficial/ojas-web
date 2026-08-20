import type { ResearchHeroSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

interface Props {
  section: ResearchHeroSection;
}

/**
 * The summary header that opens the research papers page, sitting above the
 * stats deck.
 */
export default function ResearchHero({ section }: Props) {
  return (
    <section className={cn("pb-12 sm:pb-16", section.wrapperClass)}>
      <div className="global-container mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {section.badgeText && (
            <span className="px-3.5 py-1 bg-brand-blue/5 border border-brand-blue/20 rounded-full text-brand-blue text-11 font-bold uppercase tracking-widest font-mono inline-block mb-5">
              {section.badgeText}
            </span>
          )}

          <h1 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary tracking-tight">
            {section.title}
            {section.highlightedTitle && (
              <>
                <br />
                <span className="text-brand-blue">{section.highlightedTitle}</span>
              </>
            )}
          </h1>

          {section.description && (
            <p className="text-16 leading-relaxed text-text-secondary max-w-2xl mx-auto mt-6">
              {section.description}
            </p>
          )}

          {section.showAccentBar !== false && (
            <div className="w-12 h-1 bg-brand-blue mx-auto mt-6 rounded-full opacity-30" />
          )}
        </div>
      </div>
    </section>
  );
}
