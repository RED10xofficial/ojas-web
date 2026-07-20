import type { FeaturedInSection as FeaturedInSectionType } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

const defaultMediaOutlets = ["The Lancet", "JAMA Dermatology", "Nature Medicine", "TechCrunch", "Forbes Healthcare", "Y Combinator"];

export default function FeaturedInSection({ data, wrapperClass }: { data?: FeaturedInSectionType; wrapperClass?: string }) {
  const sectionTitle = data?.title ?? "As Featured In";
  const mediaOutlets = data?.mediaOutlets?.map((m) => m.name) ?? defaultMediaOutlets;

  return (
    <section className={cn("py-16 sm:py-24 bg-bg-page/30 border-y border-brand-subtle global-container mx-auto text-center", wrapperClass)}>
      <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium mb-12 sm:mb-16 text-text-primary text-center uppercase tracking-tight">{sectionTitle}</h2>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all select-none duration-300">
        {mediaOutlets.map((media, idx) => (
          <span key={idx} className="text-lg md:text-xl font-display font-extrabold text-text-secondary uppercase tracking-widest">
            {media}
          </span>
        ))}
      </div>
    </section>
  );
}
