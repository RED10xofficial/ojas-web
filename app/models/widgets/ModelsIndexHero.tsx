import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ModelsIndexHeroSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

interface Props {
  section: ModelsIndexHeroSection;
}

export default function ModelsIndexHero({ section }: Props) {
  return (
    <section className={cn("pb-12 sm:pb-16 pt-35", section.wrapperClass)}>
      <div className="global-container mx-auto">
        <div className="flex flex-col items-center text-center">
          {section.badgeText &&
            (section.badgeUrl ? (
              <Link
                href={section.badgeUrl}
                className="group inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold uppercase tracking-widest hover:bg-brand-blue/15 transition-all cursor-pointer"
              >
                <ArrowLeft
                  size={12}
                  className="group-hover:-translate-x-0.5 transition-transform"
                />
                {section.badgeText}
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold uppercase tracking-widest">
                {section.badgeText}
              </span>
            ))}

          <h1 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary max-w-4xl mx-auto">
            {section.title}
          </h1>

          {section.description && (
            <p className="text-16 leading-relaxed text-text-secondary max-w-2xl mx-auto mt-5">
              {section.description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
