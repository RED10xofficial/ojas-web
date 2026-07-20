import type { FeaturedInSection as FeaturedInSectionData } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

const defaultMedia = [
  "TechCrunch",
  "Forbes",
  "The Lancet",
  "Nature Medicine",
  "Wired",
  "Economic Times",
];

export default function FeaturedInSection({ data, wrapperClass }: { data?: FeaturedInSectionData; wrapperClass?: string }) {
  const title = data?.title ?? "As Featured In & Mentions";
  const subtitle = data?.subtitle ?? "Press & Recognition";
  const media = data?.mediaOutlets?.map((m) => m.name) ?? defaultMedia;
  const doubled = [...media, ...media];

  return (
    <section className={cn("py-16 sm:py-24 bg-slate-900 text-white overflow-hidden relative", wrapperClass)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent)]" />
      <div className="global-container mx-auto text-center mb-12 relative">
        <p className="text-xs font-bold text-brand-blue uppercase tracking-widest mb-3">
          {subtitle}
        </p>
        <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-white">
          {title}
        </h2>
      </div>

      <div className="relative">
        <span className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-linear-to-r from-slate-900 to-transparent" />
        <span className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-linear-to-l from-slate-900 to-transparent" />

        <div className="flex overflow-hidden">
          <div className="flex shrink-0 items-center gap-0 animate-scroll whitespace-nowrap py-4">
            {doubled.map((name, i) => (
              <div key={i} className="flex items-center">
                <span className="px-10 text-2xl md:text-3xl font-display font-bold text-white/20 hover:text-white/60 transition-colors duration-300 select-none">
                  {name}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue/40 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
