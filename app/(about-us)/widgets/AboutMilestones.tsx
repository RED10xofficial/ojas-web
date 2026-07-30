import type { AboutMilestonesSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

const defaultMilestones = [
  {
    year: "2024",
    title: "Genesis & Seed Foundation",
    description:
      "Founded by a diverse assembly of practicing dermatologists, computational neuroscientists, and systems engineers to reinvent EHR workflows.",
  },
  {
    year: "2025",
    title: "Clinical Steering Validation",
    description:
      "Formed the OJAS Scientific Steering Core and completed clinical safety benchmarking with over 150 independent clinicians across Southeast Asia.",
  },
  {
    year: "2026",
    title: "Commercial Multi-Modal Launch",
    description:
      "Deployed our state-of-the-art Ambient Scribing capabilities alongside specialist Bio-Intelligence models for real-time clinician validation.",
  },
];

export default function AboutMilestones({
  data,
  wrapperClass,
}: {
  data?: AboutMilestonesSection;
  wrapperClass?: string;
}) {
  const badgeText = data?.badgeText ?? "OJAS Chronicles";
  const title = data?.title ?? "Progression Roadmap";
  const milestones = data?.milestones?.length
    ? data.milestones
    : defaultMilestones;

  return (
    <section className={cn("pb-16 sm:pb-24", wrapperClass)}>
      <div className="global-container mx-auto">
        <div className="bg-brand-dark text-white rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden text-left">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/10 blur-[90px] pointer-events-none" />

          <span className="text-xs text-brand-blue font-mono font-bold uppercase tracking-widest bg-brand-blue/20 border border-brand-blue/40 px-3 py-1 rounded-full mb-6 inline-block">
            {badgeText}
          </span>

          <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium mb-12 text-white">
            {title}
          </h2>

          <div className="relative border-l-2 border-white/10 pl-6 sm:pl-10 space-y-12">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 rounded-full bg-brand-dark border-2 border-brand-blue flex items-center justify-center text-[10px] text-brand-blue font-bold font-mono">
                  {idx + 1}
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-mono font-black tracking-widest text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded border border-brand-blue/20">
                    {milestone.year}
                  </span>
                  <h4 className="text-lg font-display font-bold text-white mt-2">
                    {milestone.title}
                  </h4>
                  <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
