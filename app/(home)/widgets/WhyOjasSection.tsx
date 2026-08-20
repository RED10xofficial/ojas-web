"use client";

import { Check, X } from "lucide-react";
import type { WhyOjasSection as WhyOjasSectionData } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

const defaultHeaders = ["Clinical Capabilities", "Other Platforms*", "OJAS INTEL"];
const defaultFeatures = [
  "Multi-omic Data Integration",
  "Vedic Bio-Engineering Convergence",
  "India Healthcare Compliance (Ayush)",
  "Actionable Disease Reversal Protocols",
];

export default function WhyOjasSection({ data, wrapperClass }: { data?: WhyOjasSectionData; wrapperClass?: string }) {
  const title = data?.title ?? "Why";
  const subtitle = data?.subtitle ?? "Legacy platforms vs. Bio-Intelligence infrastructure.";

  const headers = data?.tableHeaders?.map((h) => h.label) ?? defaultHeaders;

  /*
   * CMS table rows come through as cell[0] = feature name, cell[1] = competitor
   * (✕/✓), cell[2] = ojas. If the CMS sends no rows we fall back to the defaults.
   */
  const tableRows = data?.tableRows;
  const features = tableRows && tableRows.length > 0
    ? tableRows.map((r) => r.cells?.[0]?.value ?? "")
    : defaultFeatures;

  return (
    <section className={cn("py-16 sm:py-24 bg-bg-page/10", wrapperClass)} id="science">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary mb-4">
            {data ? title : (<>Why <span className="text-brand-blue">OJAS?</span></>)}
          </h2>
          <p className="text-14 sm:text-base text-text-secondary max-w-xl mx-auto font-medium opacity-60">
            {subtitle}
          </p>
        </div>
        <div className="overflow-auto bg-white rounded-2xl border border-brand-subtle shadow-lg">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-brand-subtle/30">
                {headers.map((header, idx) => (
                  <th
                    key={idx}
                    className={
                      idx === 0
                        ? "text-left py-4 px-6 font-display font-bold text-text-accent uppercase tracking-widest text-14 border-b border-brand-subtle"
                        : idx === headers.length - 1
                          ? "text-center py-4 px-8 font-display font-bold text-brand-blue uppercase tracking-widest text-14 border-b border-brand-subtle bg-brand-blue/[0.03]"
                          : "text-center py-4 px-6 font-display font-bold text-text-accent uppercase tracking-widest text-14 border-b border-brand-subtle"
                    }
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-subtle">
              {features.map((feature, idx) => (
                <tr key={idx} className="group hover:bg-slate-50/30 transition-all text-16">
                  <td className="py-4 px-6">
                    <p className="font-bold text-text-primary">{feature}</p>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <X size={16} className="mx-auto text-red-300" strokeWidth={3} />
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
