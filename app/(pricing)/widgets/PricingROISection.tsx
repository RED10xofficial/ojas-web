"use client";

import { useState } from "react";
import { Clock, TrendingUp } from "lucide-react";
import type { PricingRoiSection } from "@/app/lib/types";
import { getStrapiMedia } from "@/app/lib/strapi";
import { cn } from "@/app/lib/cn";

export default function PricingROISection({
  data,
  wrapperClass,
}: {
  data?: PricingRoiSection;
  wrapperClass?: string;
}) {
  const badgeText = data?.badgeText ?? "Return on Investment";
  const title = data?.title ?? "Practice Value Calculator";
  const description =
    data?.description ??
    "Calculate the time saved and potential revenue gain from incorporating OJAS Clinical Operating System.";
  const sliderLabel = data?.sliderLabel ?? "Average Daily Patient Volume";
  const sliderUnit = data?.sliderUnit ?? "patients";
  const sliderMin = data?.sliderMin ?? 5;
  const sliderMax = data?.sliderMax ?? 120;
  const sliderStep = data?.sliderStep ?? 5;

  const [visits, setVisits] = useState(data?.sliderDefault ?? 20);

  /* Figures are computed here — the CMS supplies labels and copy only. */
  const hoursSaved = Math.round(visits * 0.5);
  const revenueRetained = Math.round(visits * 50 * 52 * 0.2).toLocaleString();

  const hoursCard = data?.hoursSavedCard;
  const revenueCard = data?.revenueGainCard;

  const hoursIconUrl = getStrapiMedia(hoursCard?.icon?.url);
  const revenueIconUrl = getStrapiMedia(revenueCard?.icon?.url);

  return (
    <section
      className={cn(
        "py-16 sm:py-24 bg-brand-subtle/30 border-y border-brand-subtle",
        wrapperClass,
      )}
    >
      <div className="global-container mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-widest bg-brand-blue/10 border border-brand-blue/20 px-3 py-1 rounded-full mb-4 inline-block">
            {badgeText}
          </span>
          <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary mt-2 mb-3">
            {title}
          </h2>
          <p className="text-16 leading-relaxed text-text-secondary font-medium max-w-lg mx-auto">
            {description}
          </p>
        </div>

        <div className="p-8 bg-white rounded-[2rem] border border-brand-subtle max-w-4xl mx-auto shadow-sm">
          <div className="space-y-12">
            {/* Slider */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">
                  {sliderLabel}
                </label>
                <span className="text-32 font-display font-medium text-brand-blue">
                  {visits} <span className="text-xs text-text-accent">{sliderUnit}</span>
                </span>
              </div>
              <input
                type="range"
                min={sliderMin}
                max={sliderMax}
                step={sliderStep}
                value={visits}
                onChange={(e) => setVisits(parseInt(e.target.value))}
                className="w-full h-2 bg-brand-subtle rounded-lg appearance-none cursor-pointer accent-brand-blue"
              />
              <div className="flex justify-between text-xs text-text-accent font-mono">
                <span>
                  {sliderMin} {sliderUnit}/day
                </span>
                <span>
                  {sliderMax} {sliderUnit}/day
                </span>
              </div>
            </div>

            {/* Result cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Hours saved */}
              <div className="bg-brand-subtle/40 p-6 rounded-2xl border border-brand-subtle flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-500/15 rounded-xl flex items-center justify-center text-emerald-500 shrink-0">
                  {hoursIconUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={hoursIconUrl}
                      alt={hoursCard?.label ?? "Hours Saved Weekly"}
                      className="w-5 h-5 object-contain"
                    />
                  ) : (
                    <Clock size={20} />
                  )}
                </div>
                <div>
                  <h4 className="text-32 font-display font-medium text-text-primary">
                    {hoursCard?.prefix}
                    {hoursSaved}
                    {hoursCard?.suffix}
                  </h4>
                  <p className="text-11 font-bold text-text-accent uppercase tracking-widest mt-0.5">
                    {hoursCard?.label ?? "Hours Saved Weekly"}
                  </p>
                  <p className="text-sm leading-relaxed text-text-secondary mt-1">
                    {hoursCard?.description ??
                      "Based on saving approx 30 minutes in EMR charting per patient."}
                  </p>
                </div>
              </div>

              {/* Revenue gain */}
              <div className="bg-brand-subtle/40 p-6 rounded-2xl border border-brand-subtle flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-blue/15 rounded-xl flex items-center justify-center text-brand-blue shrink-0">
                  {revenueIconUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={revenueIconUrl}
                      alt={revenueCard?.label ?? "Estimated Revenue Gain / Year"}
                      className="w-5 h-5 object-contain"
                    />
                  ) : (
                    <TrendingUp size={20} />
                  )}
                </div>
                <div>
                  <h4 className="text-32 font-display font-medium text-text-primary">
                    {revenueCard?.prefix ?? "$"}
                    {revenueRetained}
                    {revenueCard?.suffix}
                  </h4>
                  <p className="text-11 font-bold text-text-accent uppercase tracking-widest mt-0.5">
                    {revenueCard?.label ?? "Estimated Revenue Gain / Year"}
                  </p>
                  <p className="text-sm leading-relaxed text-text-secondary mt-1">
                    {revenueCard?.description ??
                      "From reduced EMR overhead and enhanced retention mapping."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
