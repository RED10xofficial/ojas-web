"use client";

import { motion } from "motion/react";
import { Dna } from "lucide-react";
import type { ClinicianValidationSectionData } from "@/app/lib/types";

interface Props {
  section: ClinicianValidationSectionData;
}

export default function ClinicianValidationSection({ section }: Props) {
  return (
    <section className="pb-16 sm:pb-24 border-t border-brand-subtle">
      <div className="global-container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column — video card */}
          <div className="bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800">
            {/* Card header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-800">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-blue" />
              </span>
              <span className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-widest">
                Live Video Simulation
              </span>
              <span className="ml-auto text-[10px] font-bold uppercase tracking-wider bg-brand-blue/20 text-brand-blue border border-brand-blue/30 rounded-full px-2 py-0.5">
                OOM-1 Gynecology
              </span>
            </div>

            {/* Aspect-video box */}
            <div className="aspect-video bg-slate-950 flex flex-col items-center justify-center gap-3 cursor-pointer group">
              <div className="w-14 h-14 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-xs text-slate-400 font-mono uppercase tracking-widest">
                Click to Play Demonstration
              </p>
            </div>

            {/* Below video */}
            <div className="px-6 py-5">
              <div className="flex items-start gap-3 mb-4">
                <Dna className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-slate-200 leading-snug">
                    Salivary Epigenetics Analytics
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1">
                    Real-time biomarker extraction from salivary epigenetic
                    signatures, mapped directly to hormonal and metabolic
                    indicators.
                  </p>
                </div>
              </div>

              {/* Animated progress bar */}
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-brand-blue to-text-accent"
                  initial={{ width: "20%" }}
                  animate={{ width: "95%" }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right column — text */}
          <div>
            {section.badgeText && (
              <p className="text-11 uppercase tracking-widest font-semibold text-brand-blue font-mono mb-4">
                {section.badgeText}
              </p>
            )}
            <h3 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary mb-6">
              {section.title}
            </h3>
            {section.description && (
              <p className="text-16 leading-relaxed text-text-secondary">
                {section.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
