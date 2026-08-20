import type { SymptomTrapNarrativeSectionData } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

interface Props {
  section: SymptomTrapNarrativeSectionData;
}

/**
 * Narrative take on the Symptom Trap block: a single card with a pull quote.
 * The two-column bullet comparison lives in `home-symptom-trap-section`.
 */
export default function SymptomTrapNarrativeSection({ section }: Props) {
  return (
    <section
      className={cn("py-16 sm:py-24 bg-brand-subtle/30", section.wrapperClass)}
      id="symptom-trap"
    >
      <div className="global-container mx-auto">
        <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-[2.5rem] bg-white border border-brand-subtle relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-28 h-28 bg-brand-blue/5 rounded-bl-full pointer-events-none" />

          <div className="relative">
            {section.badgeText && (
              <span className="text-11 uppercase tracking-widest font-semibold text-brand-blue font-mono block mb-3">
                {section.badgeText}
              </span>
            )}

            <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary mb-6">
              {section.title}
            </h2>

            {section.description && (
              <p className="text-16 leading-relaxed text-text-secondary mb-8">
                {section.description}
              </p>
            )}

            {section.quote && (
              <blockquote className="border-l-4 border-brand-blue bg-brand-subtle/30 rounded-r-2xl pl-6 pr-5 py-5 mb-8 italic text-16 leading-relaxed text-text-secondary">
                &ldquo;{section.quote}&rdquo;
              </blockquote>
            )}

            {section.closingText && (
              <p className="text-16 leading-relaxed text-text-secondary">
                {section.closingText}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
