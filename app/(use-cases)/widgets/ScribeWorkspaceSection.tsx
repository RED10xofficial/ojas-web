"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { getStrapiMedia } from "@/app/lib/strapi";
import {
  ArrowLeft,
  Check,
  Copy,
  ArrowRight,
  Play,
  Cpu,
  ShieldCheck,
  Dna,
  Stethoscope,
  Award,
  BookOpen,
  Clock,
  MessageSquare,
  Users,
  CheckCircle2,
  Activity,
  type LucideIcon,
} from "lucide-react";
import type {
  ScribeExtractedField,
  ScribeWorkspaceSectionData,
} from "@/app/lib/types";

const iconMap: Record<string, LucideIcon> = {
  Stethoscope,
  BookOpen,
  Dna,
  ShieldCheck,
  Cpu,
  Users,
  Clock,
  Award,
  CheckCircle2,
  Activity,
};

interface Props {
  section: ScribeWorkspaceSectionData;
}

export default function ScribeWorkspaceSection({ section }: Props) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [hasSimulated, setHasSimulated] = useState(false);
  const [copied, setCopied] = useState(false);

  const capability = section.capability;
  const specialtyTabs = capability?.specialtyTabs ?? [];

  /* Tab index rather than a slug, so authors can rename tabs freely. */
  const [activeTab, setActiveTab] = useState(0);

  if (!capability) return null;

  const IconComp =
    (capability.iconName && iconMap[capability.iconName]) || Stethoscope;
  const iconUrl = getStrapiMedia(capability.icon?.url);
  const bullets = capability.bullets ?? [];

  /**
   * A capability with specialty tabs shows the active tab's output; everything
   * else shows its own extraction fields.
   */
  const activeFields: ScribeExtractedField[] =
    specialtyTabs.length > 0
      ? (specialtyTabs[activeTab]?.extractedFields ?? [])
      : (capability.extractedFields ?? []);

  const handleCopy = async () => {
    const payload = Object.fromEntries(activeFields.map((f) => [f.label, f.value]));
    try {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard unavailable (insecure context) — silently ignore. */
    }
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setHasSimulated(false);
    setTimeout(() => {
      setIsSimulating(false);
      setHasSimulated(true);
    }, 1800);
  };

  const backUrl = section.backLinkUrl || "/use-cases";

  return (
    <section className="pb-16 sm:pb-24">
      <div className="global-container mx-auto">
        {/* Visual background ambient lighting */}
        <div className="relative overflow-hidden flex flex-col justify-start">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(26,111,196,0.06),transparent_70%)] pointer-events-none -z-10" />

          <div className="w-full flex-grow flex flex-col items-center">
            {/* Navigation & Go Back */}
            {section.backLinkText && (
              <div className="mb-10 text-center w-full">
                <Link
                  href={backUrl}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-brand-blue/10 border border-brand-blue/20 hover:bg-brand-blue/15 text-brand-blue text-xs font-bold rounded-full transition-all focus:outline-none cursor-pointer tracking-wider uppercase font-mono"
                >
                  <ArrowLeft size={12} className="stroke-[3]" />
                  {section.backLinkText}
                </Link>
              </div>
            )}

            {/* Header Block */}
            <div className="text-center mb-16 max-w-4xl mx-auto">
              {capability.badge && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-[10px] font-bold uppercase tracking-wider mb-6">
                  {iconUrl ? (
                    <Image
                      src={iconUrl}
                      alt={capability.icon?.alternativeText || capability.title}
                      width={12}
                      height={12}
                      className="object-contain"
                    />
                  ) : (
                    <IconComp size={12} />
                  )}
                  <span>{capability.badge}</span>
                </div>
              )}

              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-32 lg:text-48 leading-[1.15] font-display font-medium tracking-tight mb-6 text-text-primary uppercase"
              >
                {capability.title}
              </motion.h2>

              {capability.description && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-base sm:text-lg font-medium text-text-secondary opacity-90 max-w-3xl mx-auto leading-relaxed"
                >
                  {capability.description}
                </motion.p>
              )}
            </div>

            {/* 2-Column Split: Bullet points & Clinical Terminal Simulator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full max-w-6xl items-start mb-20">
              {/* Column A: Left Detailed Features bullets */}
              <div className="lg:col-span-5 space-y-8 text-left bg-white border border-brand-subtle rounded-3xl p-8 shadow-sm">
                <div>
                  {capability.highlightsLabel && (
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#6E9080] mb-2 font-mono">
                      {capability.highlightsLabel}
                    </h3>
                  )}
                  {capability.highlightsTitle && (
                    <h4 className="text-lg sm:text-28 font-display font-medium text-text-primary uppercase leading-tight">
                      {capability.highlightsTitle}
                    </h4>
                  )}
                </div>

                <div className="space-y-4">
                  {bullets.map((bullet) => (
                    <div
                      key={bullet.id}
                      className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed font-semibold"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#EBF6F1] flex items-center justify-center text-[#2A6F51] shrink-0 mt-0.5">
                        <Check size={12} className="stroke-[3]" />
                      </span>
                      <span>{bullet.text}</span>
                    </div>
                  ))}
                </div>

                {/* Micro ROI counter snippet */}
                {capability.roiText && (
                  <div className="border-t border-brand-subtle/50 pt-6 mt-6">
                    <div className="bg-[#FAFBFB] border border-brand-subtle/40 rounded-2xl p-5 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue">
                        <Activity size={18} />
                      </div>
                      <div>
                        {capability.roiLabel && (
                          <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                            {capability.roiLabel}
                          </h5>
                        )}
                        <p className="text-sm font-black text-text-primary leading-tight">
                          {capability.roiText}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Column B: Right Clinical Terminal & Simulator Block */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[480px]">
                  {/* Terminal Title Bar */}
                  <div className="bg-slate-950 border-b border-slate-850 px-6 py-4 flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500/80" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <span className="w-3 h-3 rounded-full bg-green-500/80" />
                      <span className="text-[10px] font-mono text-slate-450 font-bold ml-2 uppercase tracking-widest bg-slate-900 px-2.5 py-1 rounded border border-white/5">
                        terminal://ojas-scribe-cln-4012
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[9px] font-mono font-extrabold text-emerald-400 uppercase tracking-widest">
                        ACTIVE PIPELINE
                      </span>
                    </div>
                  </div>

                  {/* Terminal Workspace Screen Area */}
                  <div className="flex-grow p-6 flex flex-col gap-6 font-mono text-left relative z-10 select-none">
                    {/* 1. Transcribed Consultation Input Box */}
                    {capability.transcript && (
                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                            <MessageSquare size={12} className="text-brand-blue" />
                            {section.transcriptLabel || "Patient Consultation Transcript"}
                          </label>
                          <span className="text-[9px] text-slate-500">
                            FORMAT: DIA_SPEAKER_STT
                          </span>
                        </div>
                        <div className="bg-slate-950 border border-slate-850 rounded-xl p-4.5 text-xs text-slate-300 leading-relaxed max-h-[140px] overflow-y-auto whitespace-pre-wrap font-sans font-semibold">
                          {capability.transcript}
                        </div>
                      </div>
                    )}

                    {/* Specialty switcher — only when the capability defines tabs */}
                    {specialtyTabs.length > 0 && (
                      <div className="flex flex-wrap gap-2 items-center bg-slate-950 p-2.5 border border-slate-850 rounded-xl">
                        <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest pl-2">
                          ACTIVE SPECIALTY:
                        </span>
                        {specialtyTabs.map((tab, idx) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(idx)}
                            className={`px-3 py-1 text-[9px] font-bold uppercase rounded-lg transition-colors border cursor-pointer ${
                              activeTab === idx
                                ? "bg-brand-blue text-white border-brand-blue"
                                : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white"
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* 2. Structured AI Clinical Extraction Outputs */}
                    <div className="flex-grow flex flex-col justify-center">
                      {!isSimulating && !hasSimulated ? (
                        <div className="py-12 flex flex-col items-center text-center justify-center border border-dashed border-slate-800 rounded-2xl bg-slate-950/20">
                          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 mb-4 border border-slate-750">
                            <Play
                              size={20}
                              fill="currentColor"
                              className="ml-0.5 text-brand-blue"
                            />
                          </div>
                          <p className="text-xs text-slate-400 font-sans font-semibold max-w-sm mb-1">
                            Click the trigger below to simulate raw audio
                            conversion to clinical structure.
                          </p>
                        </div>
                      ) : isSimulating ? (
                        <div className="py-12 flex flex-col items-center justify-center border border-slate-800 rounded-2xl bg-slate-950/50">
                          <div className="w-10 h-10 rounded-full border-2 border-brand-blue border-t-transparent animate-spin mb-4" />
                          <p className="text-xs font-mono font-bold text-brand-blue uppercase tracking-widest animate-pulse">
                            PARSING COGNITIVE CONTEXT PIPELINE...
                          </p>
                          <div className="w-48 h-1 bg-slate-850 rounded-full overflow-hidden mt-3">
                            <motion.div
                              className="h-full bg-brand-blue"
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 1.6 }}
                            />
                          </div>
                        </div>
                      ) : (
                        /* Simulation outputs */
                        <div className="space-y-3.5 animate-fadeIn">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-slate-450 font-bold uppercase tracking-widest flex items-center gap-1.5">
                              <Cpu size={12} className="text-emerald-400" />
                              STRUCTURED AI CLINICAL EXTRACTIONS
                            </span>
                            <button
                              onClick={handleCopy}
                              className="flex items-center gap-1 px-2.5 py-1 bg-slate-950 border border-slate-850 hover:border-slate-750 text-slate-400 hover:text-white text-[9px] rounded-lg transition-all focus:outline-none cursor-pointer font-bold"
                            >
                              {copied ? (
                                <>
                                  <Check
                                    size={10}
                                    className="text-emerald-400 stroke-[3]"
                                  />
                                  <span>COPIED CLIENT DRAFT</span>
                                </>
                              ) : (
                                <>
                                  <Copy size={10} />
                                  <span>COPY JSON DRAFT</span>
                                </>
                              )}
                            </button>
                          </div>

                          {/* Display key value nodes */}
                          <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4.5 space-y-3 max-h-[220px] overflow-y-auto">
                            {activeFields.map((field) => (
                              <div
                                key={field.id}
                                className="flex flex-col gap-1 text-[11px] border-b border-white/5 pb-2.5 last:border-0 last:pb-0 font-sans"
                              >
                                <span className="text-[10px] font-mono text-brand-blue uppercase tracking-wider font-extrabold">
                                  {field.label}:
                                </span>
                                <span className="text-slate-200 font-semibold leading-relaxed whitespace-pre-wrap">
                                  {field.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Trigger in Sandbox */}
                  <div className="bg-slate-950 border-t border-slate-850 px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
                    <div className="text-left">
                      <span className="text-[9px] font-mono text-slate-500 font-bold uppercase tracking-wider block">
                        CLINICAL SANDBOX
                      </span>
                      <p className="text-[11px] text-slate-400 font-sans font-semibold">
                        Test real-time extraction parameters.
                      </p>
                    </div>
                    <button
                      disabled={isSimulating}
                      onClick={runSimulation}
                      className="w-full sm:w-auto px-6 py-3 bg-brand-blue text-white font-extrabold text-xs uppercase tracking-widest rounded-xl hover:bg-brand-hover active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
                    >
                      <Play size={12} fill="currentColor" />
                      <span>
                        {hasSimulated
                          ? section.simulateAgainButtonText || "Simulate Again"
                          : section.simulateButtonText || "Simulate Consultation"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mini CTA Card */}
            {section.ctaTitle && (
              <div
                className="w-full max-w-4xl bg-brand-subtle/30 border border-brand-subtle rounded-[2rem] p-8 sm:p-10 mb-20 relative overflow-hidden"
                style={{ contentVisibility: "auto" }}
              >
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brand-blue to-emerald-500" />
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                  <div className="text-left space-y-2">
                    {section.ctaBadgeText && (
                      <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest font-mono">
                        {section.ctaBadgeText}
                      </span>
                    )}
                    <h3 className="text-lg sm:text-28 font-display font-medium text-text-primary uppercase leading-tight">
                      {section.ctaTitle}
                    </h3>
                    {section.ctaDescription && (
                      <p className="text-xs sm:text-sm text-text-secondary font-semibold max-w-xl">
                        {section.ctaDescription}
                      </p>
                    )}
                  </div>
                  {section.ctaButton && (
                    <Link
                      href={section.ctaButton.url}
                      target={section.ctaButton.newTab ? "_blank" : undefined}
                      rel={section.ctaButton.newTab ? "noopener noreferrer" : undefined}
                      className="px-6 py-4 bg-brand-blue text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-xl hover:bg-brand-hover active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer shrink-0"
                    >
                      <span>{section.ctaButton.title}</span>
                      <ArrowRight size={14} className="stroke-[3]" />
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
