import type { UseCasesHeroSectionData } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

interface Props {
  section: UseCasesHeroSectionData;
}

export default function UseCasesHero({ section }: Props) {
  return (
    <section className={cn("pb-16 sm:pb-24 pt-35", section.wrapperClass)}>
      <div className="global-container mx-auto">
        <div className="flex flex-col items-center text-center">
          {section.badgeText && (
            <div className="mb-8 flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold uppercase tracking-widest">
              <span>{section.badgeText}</span>
            </div>
          )}
          <h1 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary mb-5 max-w-4xl mx-auto">
            {section.title}
          </h1>
          {section.description && (
            <p className="text-16 leading-relaxed text-text-secondary max-w-2xl mx-auto">
              {section.description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
