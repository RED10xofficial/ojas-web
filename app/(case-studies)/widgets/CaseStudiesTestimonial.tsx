import { MessageSquare } from "lucide-react";
import type { CaseStudiesTestimonialSection } from "@/app/lib/types";

interface Props {
  section: CaseStudiesTestimonialSection;
}

const CaseStudiesTestimonial = ({ section }: Props) => (
  <section className="pb-16 sm:pb-24">
    <div className="global-container mx-auto">
      <div className="text-center max-w-4xl mx-auto">
        <MessageSquare className="text-brand-blue mx-auto mb-4" size={24} />
        <p className="text-lg sm:text-xl text-text-secondary leading-relaxed font-serif italic font-medium">
          &ldquo;{section.quote}&rdquo;
        </p>
        {(section.authorName || section.authorTitle) && (
          <div className="mt-6 flex justify-center items-center gap-3">
            {section.authorInitials && (
              <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold">
                {section.authorInitials}
              </div>
            )}
            <div className="text-left">
              {section.authorName && (
                <p className="text-xs font-black uppercase text-brand-dark tracking-wide">
                  {section.authorName}
                </p>
              )}
              {section.authorTitle && (
                <p className="text-[10px] text-text-secondary opacity-65 font-bold">
                  {section.authorTitle}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  </section>
);

export default CaseStudiesTestimonial;
