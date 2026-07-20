"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Clock,
  Users,
  Stethoscope,
  BookOpen,
  Zap,
} from "lucide-react";
import Link from "next/link";
import type { ScribeCapabilitiesSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

const capabilities = [
  {
    name: "Pre-Consult Summary Extraction",
    id: "previsit",
    desc: "Pre-analyzes patient records to extract high-yield clinical summaries.",
    icon: Clock,
    bullets: [
      "Historical intake scanning",
      "Chief complaint analysis",
      "Patient-reported symptom list",
      "Clinical warning flag markers",
    ],
  },
  {
    name: "Ambient Multilingual (Hindi & English) Audio Capture",
    id: "multilingual",
    desc: "Passively records bilingual consults with seamless speech capturing.",
    icon: Users,
    bullets: [
      "Bilingual voice translation",
      "Dual-channel audio capture",
      "Medically-mapped Hinglish dictionary",
      "Localized clinical export variants",
    ],
  },
  {
    name: "Indian Accent & Linguistic Dialect Engine",
    id: "ambient",
    desc: "Highly optimized speech engine for diverse regional accents and dialects.",
    icon: Stethoscope,
    bullets: [
      "Regional dialect parsing",
      "Acoustic accent modeling",
      "Clinical terminology indexing",
      "Silent ambient noise cancellation",
    ],
  },
  {
    name: "Doctor's Note Generation",
    id: "soap",
    desc: "Auto-structures conversation transcripts into clinical SOAP draft format.",
    icon: BookOpen,
    bullets: [
      "Subjective narrative modeling",
      "Objective exam structures",
      "Assessed diagnostic mapping",
      "Consultation plan auto-drafts",
    ],
  },
  {
    name: "Single-Point EMR / Hospital API Integration",
    id: "api",
    desc: "Secure API gateway to integrate directly with internal EHR configurations.",
    icon: Zap,
    bullets: [
      "Direct FHIR / HL7 pipelines",
      "Robust JSON clinical payloads",
      "Strict OAuth client validations",
      "Low-latency hospital node syncing",
    ],
  },
];

const defaultIcons = [Clock, Users, Stethoscope, BookOpen, Zap];

export default function CapabilitiesSection({ data, wrapperClass }: { data?: ScribeCapabilitiesSection; wrapperClass?: string }) {
  const preheading = data?.preheading ?? "Frontier Capabilities";
  const title = data?.title ?? "Ambient Workspace Capabilities";
  const description = data?.description ?? "Explore the comprehensive clinical features on Scribe\u2019s native interface";

  const displayCapabilities = data?.capabilities?.length
    ? data.capabilities.map((cap, i) => ({
        name: cap.name,
        id: cap.capabilityId ?? cap.name,
        desc: cap.description ?? "",
        icon: defaultIcons[i % defaultIcons.length],
        bullets: cap.bullets?.map((b) => b.text) ?? [],
      }))
    : capabilities;

  return (
    <section className={cn("py-16 sm:py-24 bg-white border-t border-brand-subtle animate-fadeIn", wrapperClass)}>
      <div className="global-container text-center">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#6E9080] mb-2 block text-center font-mono animate-pulse">
            {preheading}
          </span>
          <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary text-center mb-4">
            {title}
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-sm font-medium text-center">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 justify-items-center text-left">
          {displayCapabilities.map((cap, i) => {
            const IconComp = cap.icon;
            const bullets = cap.bullets;

            return (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative cursor-pointer group select-none w-full max-w-[260px] active:scale-[0.98] transition-all duration-200 z-10 hover:z-50"
              >
                {/* Hover Floating Details Pop-out Tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[102%] w-[280px] bg-[#0c1020]/95 backdrop-blur-md border border-brand-blue/30 rounded-2xl p-4 shadow-[0_15px_40px_rgba(59,130,246,0.25)] opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:bottom-[108%] transition-all duration-300 z-50 flex flex-col gap-3">
                  <div className="flex items-center gap-2 border-b border-brand-blue/15 pb-2">
                    <div className="w-6 h-6 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue border border-brand-blue/20">
                      {React.createElement(IconComp, { size: 12 })}
                    </div>
                    <div className="text-left">
                      <h4 className="text-xs font-bold text-white leading-tight">
                        {cap.name}
                      </h4>
                      <span className="text-10 text-brand-blue font-mono uppercase tracking-wider font-semibold">
                        Active Capability
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    {bullets.map((bullet, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-1.5 text-11 text-slate-300 leading-normal"
                      >
                        <span className="text-brand-blue mt-0.5">&#x2726;</span>
                        <span className="font-sans font-semibold">{bullet}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-10 font-mono font-semibold text-emerald-400 text-center animate-pulse border-t border-white/5 pt-1.5">
                    &#x26A1; CLICK TO LAUNCH DESIGN WORKSPACE
                  </div>

                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0c1020] border-r border-b border-brand-blue/30 rotate-45" />
                </div>

                {/* Hardware Buttons */}
                <div className="absolute left-[-8px] top-20 w-[3px] h-8 bg-[#0a0f1d] rounded-l-md z-10" />
                <div className="absolute left-[-8px] top-32 w-[3px] h-12 bg-[#0a0f1d] rounded-l-md z-10" />
                <div className="absolute left-[-8px] top-48 w-[3px] h-12 bg-[#0a0f1d] rounded-l-md z-10" />
                <div className="absolute right-[-8px] top-36 w-[3px] h-16 bg-[#0a0f1d] rounded-r-md z-10" />

                {/* iPhone 14 Chassis */}
                <div className="w-full aspect-[9/18.5] rounded-[48px] border-[8px] md:border-[10px] border-[#181d2c] bg-slate-950 p-2.5 relative shadow-2xl transition-all duration-300 group-hover:shadow-[0_20px_50px_rgba(59,130,246,0.18)] group-hover:border-[#252c42] ring-1 ring-slate-800/10 flex flex-col justify-between overflow-hidden">
                  {/* Dynamic Island */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-30 flex items-center justify-between px-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#030712] border border-slate-900" />
                  </div>

                  {/* Screen Glass Reflection */}
                  <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none group-hover:left-3/4 transition-all duration-1000 z-20" />

                  {/* iOS Status Bar */}
                  <div className="absolute top-1 inset-x-4 h-6 flex justify-between items-center px-4 text-10 font-semibold text-white/95 group-hover:text-black/80 z-20 font-sans pointer-events-none transition-colors duration-300">
                    <span>09:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-2 bg-white/20 group-hover:bg-black/15 rounded-sm relative flex items-center transition-colors duration-300">
                        <div className="h-full bg-emerald-500 rounded-sm w-[75%]" />
                        <div className="absolute right-[-1.5px] w-[1.5px] h-1 bg-white/45 group-hover:bg-black/45 rounded-r-sm transition-colors duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Screen Content */}
                  <div className="w-full h-full rounded-[38px] overflow-hidden bg-gradient-to-b from-[#0f111e] via-[#0b0c16] to-[#04050a] group-hover:from-white group-hover:via-white group-hover:to-white p-4 pt-8 pb-4 flex flex-col justify-between relative transition-all duration-300">
                    <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none group-hover:opacity-[0.03] transition-opacity duration-300" />

                    {/* Screen App Header */}
                    <div className="flex items-center justify-between border-b border-white/5 group-hover:border-black/10 pb-2.5 mb-2 relative z-10 transition-colors duration-300">
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 rounded-full bg-brand-blue/20 flex items-center justify-center border border-brand-blue/30 text-brand-blue">
                          {React.createElement(IconComp, { size: 9 })}
                        </div>
                        <span className="text-10 font-sans font-semibold tracking-widest text-[#93c5fd] group-hover:text-brand-blue transition-colors duration-300">
                          OJAS SCRIBE
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-10 font-mono font-semibold text-emerald-400 group-hover:text-emerald-600 uppercase tracking-widest transition-colors duration-300">
                          PRO CONSOLE
                        </span>
                      </div>
                    </div>

                    {/* Central Visual */}
                    <div className="flex-grow flex flex-col justify-center py-4 relative z-10 text-center">
                      <div className="relative mx-auto w-12 h-12 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue mb-4 transition-all duration-300 group-hover:bg-brand-blue/20 group-hover:scale-105">
                        <div className="absolute inset-0 bg-brand-blue/10 rounded-2xl animate-ping opacity-25" />
                        <div className="absolute -inset-1 bg-brand-blue/5 rounded-2xl blur-md" />
                        {React.createElement(IconComp, { size: 20 })}
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="font-display font-black text-white group-hover:text-slate-900 text-xs sm:text-sm tracking-tight leading-snug uppercase px-1 line-clamp-2 transition-colors duration-300">
                          {cap.name}
                        </h3>
                        <p className="text-slate-400 group-hover:text-slate-600 text-11 leading-relaxed px-1 h-12 overflow-hidden line-clamp-3 font-semibold font-sans transition-colors duration-300">
                          {cap.desc}
                        </p>
                      </div>
                    </div>

                    {/* Footer Controls */}
                    <div className="space-y-2 mt-auto relative z-10">
                      <div className="bg-black/40 group-hover:bg-slate-100 group-hover:border-black/5 border border-white/5 rounded-xl p-2 flex flex-col gap-1.5 transition-colors duration-300">
                        <div className="flex justify-between items-center text-10 font-mono text-slate-500 group-hover:text-slate-600 transition-colors duration-300">
                          <span>AUDIO FREQUENCY</span>
                          <span className="text-brand-blue font-bold">
                            READY
                          </span>
                        </div>
                        <div className="flex gap-0.5 items-end justify-center h-4 py-0.5">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
                            (bar) => {
                              const heights = [
                                4, 10, 6, 14, 8, 12, 5, 11, 7, 13, 6, 9, 4, 8,
                              ];
                              return (
                                <div
                                  key={bar}
                                  style={{
                                    height: `${heights[bar % 14]}px`,
                                  }}
                                  className="w-[3px] bg-brand-blue/50 rounded-full transition-all duration-300 group-hover:bg-brand-blue group-hover:animate-pulse"
                                />
                              );
                            }
                          )}
                        </div>
                      </div>

                      <div className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl py-2 px-3 text-10 font-semibold uppercase tracking-widest text-center shadow-lg flex items-center justify-center gap-1.5 transition-all group-hover:bg-brand-hover">
                        <span>Use This</span>
                        <span className="text-xs transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </div>
                    </div>

                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/20 group-hover:bg-black/20 rounded-full transition-colors duration-300" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
