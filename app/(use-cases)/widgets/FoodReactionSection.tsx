"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import type { FoodReactionSectionData } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

interface Props {
  section: FoodReactionSectionData;
}

/**
 * Bar colours come from a tone enum instead of raw Tailwind gradients, so authors
 * pick what they mean ("negative") rather than a class string.
 */
const TONE_GRADIENTS: Record<string, string> = {
  positive: "from-emerald-400 to-teal-500",
  caution: "from-amber-500 to-orange-500",
  negative: "from-rose-500 to-red-600",
  neutral: "from-blue-400 to-indigo-500",
};

export default function FoodReactionSection({ section }: Props) {
  const foods = section.foods ?? [];
  const [activeIndex, setActiveIndex] = useState(0);

  if (foods.length === 0) return null;

  const active = foods[Math.min(activeIndex, foods.length - 1)];
  const metrics = active.metrics ?? [];

  return (
    <section
      className={cn("py-16 sm:py-24", section.wrapperClass)}
      id="interactive-food-reaction"
    >
      <div className="global-container mx-auto">
        <div className="text-center mb-12 sm:mb-14">
          <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary mb-4">
            {section.title}
          </h2>
          {section.description && (
            <p className="text-16 leading-relaxed text-text-secondary max-w-xl mx-auto">
              {section.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-stretch bg-white border border-brand-subtle rounded-[2.5rem] p-8 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/[0.02] rounded-bl-full pointer-events-none" />

          {/* Left — food selector */}
          <div className="xl:col-span-5 flex flex-col justify-between text-left pr-0 xl:pr-8 xl:border-r border-brand-subtle/80">
            <div>
              {section.selectorLabel && (
                <span className="text-11 uppercase tracking-widest font-semibold text-brand-blue font-mono block mb-3">
                  {section.selectorLabel}
                </span>
              )}
              {section.selectorDescription && (
                <p className="text-16 leading-relaxed text-text-secondary mb-8">
                  {section.selectorDescription}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-3">
                {foods.map((food, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={food.id}
                      onClick={() => setActiveIndex(idx)}
                      className={`w-full p-4 rounded-2xl border transition-all text-left flex items-center justify-between cursor-pointer group ${
                        isActive
                          ? "bg-brand-blue border-brand-blue text-white shadow-md shadow-brand-blue/15"
                          : "bg-bg-page/50 border-brand-subtle text-text-primary hover:border-brand-blue/30 hover:bg-bg-page"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        {food.emoji && <span className="text-2xl">{food.emoji}</span>}
                        <span
                          className={`text-sm font-display font-bold uppercase tracking-tight ${
                            isActive ? "text-white" : "text-text-primary"
                          }`}
                        >
                          {food.name}
                        </span>
                      </span>
                      <span
                        className={`hidden sm:inline-block text-11 font-mono font-bold transition-all px-2.5 py-1 rounded-lg ${
                          isActive
                            ? "bg-white/10 text-white"
                            : "bg-brand-blue/5 text-brand-blue group-hover:bg-brand-blue/10"
                        }`}
                      >
                        {isActive
                          ? section.simulatingLabel || "Simulating"
                          : section.simulateLabel || "Simulate"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Systemic outcome */}
            {active.consequence && (
              <div className="mt-8 pt-6 border-t border-brand-subtle/80">
                {section.outcomeLabel && (
                  <span className="text-11 uppercase tracking-widest font-semibold text-text-accent block mb-3 font-mono">
                    {section.outcomeLabel}
                  </span>
                )}
                <p className="text-16 leading-relaxed text-text-secondary italic border-l-4 border-brand-blue pl-4">
                  &ldquo;{active.consequence}&rdquo;
                </p>
              </div>
            )}
          </div>

          {/* Right — metric bars */}
          <div className="xl:col-span-7 flex flex-col justify-between text-left pl-0 xl:pl-2 pt-6 xl:pt-0">
            <div>
              <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-brand-subtle/80">
                <div>
                  {section.chartTitle && (
                    <h3 className="text-lg sm:text-28 font-display font-medium text-text-primary flex items-center gap-2 leading-tight">
                      <Sparkles size={16} className="text-brand-blue shrink-0" />
                      {section.chartTitle}
                    </h3>
                  )}
                  {section.chartDescription && (
                    <p className="text-xs text-text-accent mt-1 font-semibold">
                      {section.chartDescription}
                    </p>
                  )}
                </div>
                {active.emoji && (
                  <span className="text-3xl shrink-0">{active.emoji}</span>
                )}
              </div>

              <div className="space-y-6">
                {metrics.map((metric) => (
                  <div key={metric.id}>
                    <div className="flex justify-between items-baseline gap-4 text-xs font-bold mb-2">
                      <span className="text-text-secondary uppercase tracking-tight">
                        {metric.label}
                      </span>
                      <span className="text-text-primary font-mono text-right">
                        {metric.value}%
                        {metric.valueLabel ? ` (${metric.valueLabel})` : ""}
                      </span>
                    </div>
                    <div className="h-2.5 w-full bg-brand-subtle rounded-full overflow-hidden">
                      <motion.div
                        /* Keyed on the food so bars re-animate on every switch */
                        key={`${active.id}-${metric.id}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.value}%` }}
                        transition={{ type: "spring", stiffness: 60, damping: 15 }}
                        className={`h-full bg-gradient-to-r ${
                          TONE_GRADIENTS[metric.tone ?? "neutral"]
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nutrient profile */}
            {active.profile && (
              <div className="mt-8 bg-bg-page/50 rounded-2xl p-5 border border-brand-subtle">
                {section.profileLabel && (
                  <span className="text-11 uppercase tracking-widest font-semibold text-brand-blue block mb-2 font-mono">
                    {section.profileLabel}
                  </span>
                )}
                <p className="text-16 leading-relaxed text-text-secondary">
                  {active.profile}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
