"use client";

import { useState } from "react";
import type { CaseStudiesJourneySection } from "@/app/lib/types";

interface Props {
  section: CaseStudiesJourneySection;
}

const CaseStudiesJourney = ({ section }: Props) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = section.steps ?? [];
  if (steps.length === 0) return null;

  return (
    <section className="pb-16 sm:pb-24">
      <div className="global-container mx-auto">
        <div className="bg-brand-dark text-white rounded-3xl border border-white/10 p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-80 h-80 bg-brand-blue/10 blur-[100px] pointer-events-none" />
          <div className="max-w-3xl mx-auto text-center mb-12">
            {section.badgeText && (
              <span className="text-[10px] text-brand-blue font-mono font-black uppercase tracking-widest bg-brand-blue/20 px-3 py-1 rounded-full border border-brand-blue/30">
                {section.badgeText}
              </span>
            )}
            <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-white uppercase mt-5 tracking-tight">
              {section.title}
            </h2>
            {section.description && (
              <p className="text-16 leading-relaxed text-slate-400 mt-2">
                {section.description}
              </p>
            )}
          </div>
          <div
            className="grid md:grid-cols-4 gap-6 relative"
            style={{ gridTemplateColumns: `repeat(${Math.min(steps.length, 4)}, minmax(0, 1fr))` }}
          >
            <div className="absolute top-5 left-10 right-10 h-[1.5px] bg-brand-blue/30 hidden md:block" />
            {steps.map((step, idx) => (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-2xl border transition-all duration-350 select-none cursor-pointer text-left relative z-10 ${
                  activeStep === idx
                    ? "bg-slate-950 border-brand-blue shadow-lg shadow-brand-blue/20"
                    : "bg-slate-950/40 border-white/5 opacity-70 hover:opacity-100 hover:border-white/15"
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="px-2.5 py-0.5 bg-brand-blue/20 border border-brand-blue/40 text-[9px] text-brand-blue font-bold tracking-widest rounded-md font-mono">
                    {step.day}
                  </span>
                  {activeStep === idx && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-ping" />
                  )}
                </div>
                <h4 className="text-xs font-black text-white uppercase tracking-tight leading-snug mb-2 font-display">
                  {step.title}
                </h4>
                {step.description && (
                  <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
                    {step.description}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesJourney;
