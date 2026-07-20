import { Check, X } from "lucide-react";
import type { WhyOjasSection as WhyOjasSectionType } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

const defaultFeatures = [
  "Multi-omic Data Integration",
  "Vedic Bio-Engineering Convergence",
  "India Healthcare Compliance (Ayush)",
  "Actionable Disease Reversal Protocols",
];

export default function WhyOjasSection({ data, wrapperClass }: { data?: WhyOjasSectionType; wrapperClass?: string }) {
  const title = data?.title ?? "Why OJAS?";
  const subtitle = data?.subtitle ?? "Legacy platforms vs. Bio-Intelligence infrastructure.";

  // Each tableRow's first cell value is the feature name
  const cmsFeatures = data?.tableRows
    ?.map((row) => row.cells?.[0]?.value)
    .filter((v): v is string => Boolean(v));
  const displayFeatures = cmsFeatures?.length ? cmsFeatures : defaultFeatures;

  return (
    <section
      className={cn("py-16 bg-bg-page/10 border-t border-brand-subtle font-sans animate-fadeIn", wrapperClass)}
      id="science"
    >
      <div className="global-container max-w-4xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary mb-4">
            {title}
          </h2>
          <p className="text-14 sm:text-base text-text-secondary max-w-xl mx-auto font-medium opacity-60">
            {subtitle}
          </p>
        </div>

        <div className="overflow-hidden bg-bg-surface rounded-2xl border border-brand-subtle shadow-lg">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-brand-subtle/30">
                <th className="text-left py-4 px-6 font-display font-bold text-text-accent uppercase tracking-widest text-10 border-b border-brand-subtle">
                  Clinical Capabilities
                </th>
                <th className="text-center py-4 px-6 font-display font-bold text-text-accent uppercase tracking-widest text-10 border-b border-brand-subtle">
                  Other Platforms*
                </th>
                <th className="text-center py-4 px-8 font-display font-bold text-brand-blue uppercase tracking-widest text-10 border-b border-brand-subtle bg-brand-blue/[0.03]">
                  OJAS INTEL
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-subtle">
              {displayFeatures.map((feature, idx) => (
                <tr
                  key={idx}
                  className="group hover:bg-slate-50/30 transition-all"
                >
                  <td className="py-4 px-6">
                    <p className="font-bold text-text-primary text-left">
                      {feature}
                    </p>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <X
                      size={16}
                      className="mx-auto text-red-300"
                      strokeWidth={3}
                    />
                  </td>
                  <td className="py-4 px-8 text-center bg-brand-blue/[0.01]">
                    <div className="w-6 h-6 rounded-md bg-brand-blue text-white flex items-center justify-center mx-auto shadow-md shadow-brand-blue/20">
                      <Check size={14} strokeWidth={3} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
