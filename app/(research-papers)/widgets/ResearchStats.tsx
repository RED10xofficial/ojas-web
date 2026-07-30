import type { ResearchStatsSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

const defaultStats = [
  { value: "124", label: "Vetted Studies Published" },
  { value: "17,450", label: "Cross-Reference Citations" },
  { value: "8", label: "Multi-Center Partnerships" },
];

export default function ResearchStats({
  section,
}: {
  section?: ResearchStatsSection;
}) {
  const stats = section?.stats?.length ? section.stats : defaultStats;

  return (
    <section className={cn("pb-12", section?.wrapperClass)}>
      <div className="global-container mx-auto">
        <div className="bg-white rounded-3xl border border-brand-blue/10 p-6 sm:p-8 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              /* Middle cells carry the dividers, matching the original 3-up rule. */
              className={
                idx > 0 && idx < stats.length - 1
                  ? "sm:border-l sm:border-r sm:border-slate-100"
                  : undefined
              }
            >
              <p className="text-3xl font-display font-black text-brand-blue">
                {stat.value}
              </p>
              <p className="text-11 uppercase tracking-widest font-semibold text-brand-blue mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
