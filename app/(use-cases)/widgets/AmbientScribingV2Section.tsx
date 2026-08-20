"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { AmbientScribingV2SectionData } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

interface Props {
  section: AmbientScribingV2SectionData;
}

/**
 * Two-column take on the ambient scribing block: copy and metric tiles next to a
 * simulated live transcript. The home page still uses the centred version.
 */
export default function AmbientScribingV2Section({ section }: Props) {
  const stats = section.stats ?? [];
  const transcript = section.transcript ?? [];

  return (
    <section
      className={cn(
        "py-16 sm:py-24 bg-slate-900 text-white overflow-hidden relative",
        section.wrapperClass,
      )}
      id="use-cases"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)] pointer-events-none" />

      <div className="global-container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left — copy and stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            {section.badgeText && (
              <span className="text-xs font-bold text-brand-blue uppercase tracking-widest bg-brand-blue/10 border border-brand-blue/20 px-3 py-1 rounded-full mb-6 inline-block">
                {section.badgeText}
              </span>
            )}

            <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-white mb-6">
              {section.title}
            </h2>

            {section.description && (
              <p className="text-16 leading-relaxed text-slate-300 mb-8">
                {section.description}
              </p>
            )}

            {stats.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.id}
                    className="p-5 rounded-2xl bg-white/5 border border-white/5"
                  >
                    <span className="font-display font-medium text-brand-blue text-28 block leading-tight mb-1">
                      {stat.value}
                    </span>
                    <span className="text-11 font-bold uppercase tracking-widest text-slate-400">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right — simulated live transcript */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="p-6 bg-slate-950 border border-white/10 rounded-[2rem] relative overflow-hidden shadow-2xl">
              {/* Recorder header */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest font-mono">
                    {section.statusLabel || "Ambient Scribe Active"}
                  </span>
                </div>
                {section.durationLabel && (
                  <span className="text-[9px] text-slate-400 font-mono">
                    {section.durationLabel}
                  </span>
                )}
              </div>

              {/* Transcript + generated draft */}
              <div className="bg-slate-900 border border-white/5 p-4 rounded-xl font-mono text-[10px] sm:text-xs text-slate-300 space-y-4 mb-4 text-left max-h-[220px] overflow-y-auto">
                {transcript.map((line, idx) => (
                  <p key={line.id} className="leading-relaxed">
                    <span
                      className={cn(
                        "font-bold",
                        idx % 2 === 0 ? "text-brand-blue" : "text-brand-blue/70",
                      )}
                    >
                      {line.speaker}
                      {line.timestamp ? ` [${line.timestamp}]` : ""}:{" "}
                    </span>
                    <span className="text-slate-200">{line.text}</span>
                  </p>
                ))}

                {section.draftHeading && (
                  <p className="border-t border-white/5 pt-3 font-semibold text-emerald-400 text-[9px] uppercase tracking-wider">
                    {section.draftHeading}
                  </p>
                )}

                {section.draftText && (
                  <p className="text-[10px] text-slate-400 leading-relaxed font-semibold whitespace-pre-line">
                    {section.draftText}
                  </p>
                )}
              </div>

              {section.cta && (
                <Link
                  href={section.cta.url}
                  target={section.cta.newTab ? "_blank" : undefined}
                  rel={section.cta.newTab ? "noopener noreferrer" : undefined}
                  className="w-full flex justify-center items-center gap-2 py-3.5 bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-brand-blue/20 cursor-pointer"
                >
                  {section.cta.title}
                  <ArrowRight size={14} />
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
