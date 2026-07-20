"use client";

import { useState } from "react";
import { Clock, TrendingUp } from "lucide-react";
import type { DermaRoiCalculatorSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

export default function ROICalculatorSection({
  data,
  wrapperClass,
}: {
  data?: DermaRoiCalculatorSection;
  wrapperClass?: string;
}) {
  const preheading = data?.preheading ?? "Practice Value Modeler";
  const title = data?.title ?? "Interactive ROI Calculator";
  const sliderLabel = data?.sliderLabel ?? "Average Daily Patient Visits";
  const sliderMin = data?.sliderMin ?? 5;
  const sliderMax = data?.sliderMax ?? 100;
  const sliderStep = data?.sliderStep ?? 5;
  const sliderDefault = data?.sliderDefault ?? 30;
  const metric1Label = data?.metric1Label ?? "Hours Saved Weekly Charting";
  const metric1Multiplier = data?.metric1Multiplier ?? 0.5;
  const metric2Label =
    data?.metric2Label ?? "Projected Annual Revenue Retained";
  const metric2Multiplier = data?.metric2Multiplier ?? 18;

  const [patientVisits, setPatientVisits] = useState(sliderDefault);

  const hoursSaved = Math.round(patientVisits * metric1Multiplier * 10) / 10;
  const practiceRevenue = (
    patientVisits *
    metric2Multiplier *
    52 *
    105
  ).toLocaleString();

  return (
    <section className="w-full bg-bg-surface py-12 overflow-hidden">
      <div className="global-container">
        <section
          className={cn(
            "py-16 sm:py-24 bg-bg-surface md:rounded-3xl mx-auto border border-brand-subtle shadow-lg relative overflow-hidden",
            wrapperClass,
          )}
        >
          <div className="text-center mb-12 sm:mb-16 relative z-10">
            <p className="text-brand-blue font-medium max-w-2xl mx-auto mb-2">
              {preheading}
            </p>
            <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium mb-4 text-text-primary">
              {title}
            </h2>
            <div className="w-10 h-0.5 bg-brand-blue mx-auto mt-5 rounded-full opacity-40" />
          </div>

          <div className="max-w-3xl mx-auto relative z-10 bg-bg-page/40 p-8 md:p-12 rounded-2xl border border-brand-subtle">
            <div className="mb-10 text-center">
              <label className="block text-sm font-extrabold text-text-primary uppercase tracking-wider mb-4">
                {sliderLabel}:{" "}
                <span className="text-brand-blue text-2xl font-black ml-1">
                  {patientVisits}
                </span>
              </label>
              <input
                type="range"
                min={sliderMin}
                max={sliderMax}
                step={sliderStep}
                value={patientVisits}
                onChange={(e) => setPatientVisits(parseInt(e.target.value))}
                className="w-full h-2 rounded-full cursor-pointer bg-slate-200"
              />
              <div className="flex justify-between text-11 font-semibold text-text-accent mt-3 select-none">
                <span>{sliderMin} patients</span>
                <span>{Math.round((sliderMin + sliderMax) / 2)} patients</span>
                <span>{sliderMax} patients</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 border-t border-brand-subtle pt-8">
              <div className="p-6 bg-white rounded-2xl border border-brand-subtle shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-2xl font-display font-black text-brand-blue">
                    {hoursSaved} hrs
                  </p>
                  <p className="text-xs text-text-secondary font-bold">
                    {metric1Label}
                  </p>
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-brand-subtle shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/15 flex items-center justify-center text-success">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-2xl font-display font-black text-brand-blue">
                    ${practiceRevenue}
                  </p>
                  <p className="text-xs text-text-secondary font-bold">
                    {metric2Label}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
