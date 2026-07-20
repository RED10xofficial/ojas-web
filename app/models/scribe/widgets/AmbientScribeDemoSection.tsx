"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  RefreshCw,
  Brain,
  CheckCircle2,
} from "lucide-react";
import type { ScribeAmbientDemoSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

export default function AmbientScribeDemoSection({ data, wrapperClass }: { data?: ScribeAmbientDemoSection; wrapperClass?: string }) {
  const preheading = data?.preheading ?? "Ambient AI Scribe";
  const title = data?.title ?? "\u201cListen Once. Document Everything.\u201d";
  const description = data?.description ?? "Watch our Clinical Bio-Intelligence in action \u2014 from a raw, spoken multi-omic consultation dialogue straight to structured, production EHR documentation.";
  const statusBadge = data?.statusBadge ?? "Ambient Scribe Active";
  const patientDialogue = data?.patientDialogue ?? "I\u2019ve been experiencing headaches for the past week.";
  const doctorDialogue = data?.doctorDialogue ?? "Have you noticed any triggers?";
  const soapSubjective = data?.soapSubjective ?? "Patient reports headaches for 7 days.";
  const soapObjective = data?.soapObjective ?? "Vitals stable.";
  const soapAssessment = data?.soapAssessment ?? "Likely tension headache.";
  const soapPlan = data?.soapPlan ?? "Hydration, monitoring, follow-up.";
  const icdCode = data?.icdCode ?? "ICD-10: G44.209";
  const icdDescription = data?.icdDescription ?? "Tension-type headache, unspecified, not intractable";
  const ehrIntegrationText = data?.ehrIntegrationText ?? "EPIC & CERNER INTEGRATED";
  const ehrEncryptionText = data?.ehrEncryptionText ?? "TLS 1.3 Encryption Node Securely Transmitted via FHIR JSON";
  const [activeStep, setActiveStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev === 5 ? 1 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section
      className={cn("py-16 sm:py-24 bg-bg-page/40 border-t border-brand-subtle", wrapperClass)}
      id="live-consultation-demo"
    >
      <div className="global-container text-center">
        <div className="mb-12 sm:mb-16">
          <span className="text-11 font-semibold text-brand-blue uppercase tracking-widest bg-brand-blue/5 border border-brand-blue/15 px-3 py-1 rounded-full inline-block mb-4 font-display">
            {preheading}
          </span>
          <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary mb-4">
            {title}
          </h2>
          <p className="text-text-secondary max-w-120 mx-auto text-base font-medium">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Panel: Scribing Acoustic Stream */}
          <div className="lg:col-span-5 bg-bg-surface border border-brand-subtle rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Brain className="w-24 h-24 text-brand-blue" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-text-secondary uppercase tracking-tight">
                    Live Acoustic Stream
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-brand-blue/5 border border-brand-blue/10 text-10 font-semibold text-brand-blue uppercase tracking-wide">
                  {statusBadge}
                </span>
              </div>

              {/* Animated Audio Waves */}
              <div className="bg-brand-subtle/30 rounded-2xl p-6 mb-8 flex flex-col items-center justify-center min-h-[140px] relative border border-brand-subtle/50">
                <div className="flex items-end justify-center gap-1.5 h-16 mb-4">
                  {[...Array(18)].map((_, idx) => {
                    const delays = [0.1, 0.4, 0.2, 0.6, 0.3, 0.5, 0.2, 0.7, 0.4, 0.1, 0.3, 0.5, 0.2, 0.6, 0.3, 0.4, 0.1, 0.5];
                    const durations = [1.2, 0.9, 1.4, 0.8, 1.1, 1.3, 0.9, 1.5, 1.0, 1.2, 1.1, 1.3, 0.8, 1.4, 0.9, 1.1, 1.3, 1.0];
                    return (
                      <motion.div
                        key={idx}
                        initial={{ height: 4 }}
                        animate={{
                          height: isPlaying
                            ? [12, 54, 18, 42, 6, 32, 10, 48, 4]
                            : 8,
                        }}
                        transition={{
                          duration: durations[idx % durations.length],
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: delays[idx % delays.length],
                          ease: "easeInOut",
                        }}
                        className="w-1.5 rounded-full bg-brand-blue/80"
                      />
                    );
                  })}
                </div>
                <p className="text-11 font-mono font-semibold text-brand-blue uppercase tracking-wider animate-pulse">
                  {activeStep === 1 && "Isolating Voice Channels..."}
                  {activeStep === 2 && "Transcribing Clinical Discourse..."}
                  {activeStep === 3 && "Extracting SOAP Entities..."}
                  {activeStep === 4 && "Resolving ICD-10 Classifications..."}
                  {activeStep === 5 && "Publishing Encryption Node..."}
                </p>
              </div>

              {/* Dialogue stream box */}
              <div className="space-y-4">
                <div className="text-left">
                  <p className="text-11 font-semibold text-text-accent uppercase tracking-widest mb-3 font-display">
                    Consultation Dialogue
                  </p>
                  <div className="space-y-3">
                    <motion.div
                      animate={{
                        opacity: activeStep >= 1 ? 1 : 0.3,
                        scale: activeStep === 1 ? 1.01 : 1,
                      }}
                      className={`p-4 rounded-xl text-left transition-all border ${
                        activeStep === 1
                          ? "bg-brand-blue/5 border-brand-blue/20"
                          : "bg-bg-page/50 border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-11 font-semibold py-0.5 px-2 rounded-full bg-slate-200 text-text-secondary uppercase tracking-wider">
                          Patient
                        </span>
                        {activeStep === 1 && (
                          <span className="text-10 font-mono text-emerald-600 animate-pulse font-semibold">
                            ● SPEAKING
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-text-primary font-medium leading-relaxed">
                        &ldquo;{patientDialogue}&rdquo;
                      </p>
                    </motion.div>

                    <motion.div
                      animate={{
                        opacity: activeStep >= 1 ? 1 : 0.3,
                        scale: activeStep === 1 ? 1.01 : 1,
                      }}
                      className={`p-4 rounded-xl text-left transition-all border ${
                        activeStep === 1
                          ? "bg-brand-blue/5 border-brand-blue/20"
                          : "bg-bg-page/50 border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-11 font-semibold py-0.5 px-2 rounded-full bg-brand-blue/10 text-brand-blue uppercase tracking-wider">
                          Doctor
                        </span>
                        {activeStep === 1 && (
                          <span className="text-10 font-mono text-emerald-600 animate-pulse font-semibold">
                            ● SPEAKING
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-text-primary font-medium leading-relaxed">
                        &ldquo;{doctorDialogue}&rdquo;
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step Navigation Bar */}
            <div className="mt-8 pt-6 border-t border-brand-subtle">
              <div className="flex justify-between items-center mb-4">
                <span className="text-11 font-semibold text-text-accent uppercase tracking-wider">
                  Walkthrough Steps
                </span>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1 px-3 rounded-lg bg-brand-blue/5 hover:bg-brand-blue/10 border border-brand-blue/10 text-11 font-semibold text-brand-blue tracking-wide uppercase transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw
                    size={10}
                    className={`${isPlaying ? "animate-spin" : ""}`}
                  />
                  {isPlaying ? "Pause" : "Play Live"}
                </button>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {[1, 2, 3, 4, 5].map((step) => (
                  <button
                    key={step}
                    onClick={() => {
                      setActiveStep(step);
                      setIsPlaying(false);
                    }}
                    className={`py-2 rounded-lg font-mono text-center text-xs font-bold transition-all border cursor-pointer ${
                      activeStep === step
                        ? "bg-brand-blue border-brand-blue text-white shadow-sm"
                        : "bg-bg-page border-brand-subtle text-text-secondary hover:border-brand-blue/30"
                    }`}
                  >
                    S{step}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Auto-Generated SOAP Output */}
          <div className="lg:col-span-7 bg-bg-surface border border-brand-subtle rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm min-h-125 text-left">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-brand-subtle/80 mb-6">
                <div>
                  <h4 className="text-base font-bold font-display text-text-primary uppercase flex items-center gap-2">
                    <Sparkles
                      size={16}
                      className="text-brand-blue animate-pulse"
                    />
                    Live Consultation → SOAP Note Generation
                  </h4>
                  <p className="text-xs text-text-accent mt-1 font-semibold">
                    Passive multi-omic clinical AI mapping pipeline
                  </p>
                </div>
              </div>

              {/* Simulated Content Box */}
              <div className="min-h-[300px]">
                <AnimatePresence mode="wait">
                  {activeStep === 1 && (
                    <motion.div
                      key="active1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="px-4 py-2 bg-brand-blue/5 border border-brand-blue/10 rounded-xl flex items-center justify-between">
                        <span className="text-xs font-bold text-brand-blue uppercase tracking-wider font-mono">
                          Step 1: Consultation dialogue starts
                        </span>
                        <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                      </div>
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
                        OJAS begins monitoring client-practitioner communication.
                        The acoustic engines securely separate clinical speaker
                        nodes directly at the source.
                      </p>
                      <div className="p-4 bg-bg-page/50 border border-brand-subtle rounded-xl space-y-2">
                        <p className="text-11 font-semibold text-text-accent uppercase tracking-wider font-display">
                          Acoustic Signal Separation
                        </p>
                        <div className="flex justify-between items-center text-xs font-medium text-text-secondary">
                          <span>Acoustic Channel 1 (Patient Voice)</span>
                          <span className="text-emerald-600 font-bold font-mono">
                            CONNECTED
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-medium text-text-secondary">
                          <span>Acoustic Channel 2 (Doctor Voice)</span>
                          <span className="text-emerald-600 font-bold font-mono">
                            CONNECTED
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 2 && (
                    <motion.div
                      key="active2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="px-4 py-2 bg-brand-blue/5 border border-brand-blue/10 rounded-xl flex items-center justify-between">
                        <span className="text-xs font-bold text-brand-blue uppercase tracking-wider font-mono">
                          Step 2: Real-time transcription is processed
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-brand-blue/10 text-10 font-mono font-semibold text-brand-blue">
                          LATENCY ~95ms
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
                        Dialogues translate instantly into highly precise clinical
                        documentation transcripts, preparing to map to clinical
                        structures.
                      </p>
                      <div className="p-4 bg-bg-page/70 border border-brand-subtle rounded-xl space-y-3 font-mono text-xs text-text-secondary">
                        <div className="flex gap-2">
                          <span className="text-text-accent font-bold">
                            [00:01]
                          </span>
                          <span className="font-medium text-text-primary">
                            Patient: &ldquo;{patientDialogue}&rdquo;
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-brand-blue font-bold">
                            [00:07]
                          </span>
                          <span className="font-medium text-text-primary">
                            Doctor: &ldquo;{doctorDialogue}&rdquo;
                          </span>
                        </div>
                        <div className="border-t border-brand-subtle/50 pt-2 animate-pulse flex items-center gap-1.5 text-10 text-brand-blue font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-ping" />
                          Acoustic telemetry indexing stream actively ...
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeStep >= 3 && (
                    <motion.div
                      key="active3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="px-4 py-2 bg-brand-blue/5 border border-brand-blue/10 rounded-xl flex items-center justify-between">
                        <span className="text-xs font-bold text-brand-blue uppercase tracking-wider font-mono">
                          {activeStep === 3 &&
                            "Step 3: AI automatically generates SOAP notes"}
                          {activeStep === 4 &&
                            "Step 4: AI registers matching diagnostic codes"}
                          {activeStep === 5 &&
                            "Step 5: Electronic Health Records synced successfully"}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-10 font-mono font-semibold text-emerald-600">
                          SOAP ENGINE COMPLETE
                        </span>
                      </div>

                      {/* SOAP NOTE CONTAINER */}
                      <div className="bg-bg-page border border-brand-subtle rounded-2xl p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-brand-subtle pb-2.5">
                          <span className="text-11 font-semibold text-brand-blue uppercase tracking-wider font-display">
                            Structured SOAP Note Document
                          </span>
                          <div className="flex gap-1">
                            <span className="w-2 object-fill h-2 rounded-full bg-brand-blue" />
                            <span className="w-2 h-2 rounded-full bg-brand-blue/60" />
                            <span className="w-2 h-2 rounded-full bg-brand-blue/20" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="bg-white p-3 rounded-xl border border-brand-subtle/50">
                            <span className="text-10 font-semibold text-text-accent uppercase tracking-wider block mb-1">
                              Subjective
                            </span>
                            <p className="text-xs text-text-secondary font-semibold">
                              {soapSubjective}
                            </p>
                          </div>
                          <div className="bg-white p-3 rounded-xl border border-brand-subtle/50">
                            <span className="text-10 font-semibold text-text-accent uppercase tracking-wider block mb-1">
                              Objective
                            </span>
                            <p className="text-xs text-text-secondary font-semibold">
                              {soapObjective}
                            </p>
                          </div>
                          <div className="bg-white p-3 rounded-xl border border-brand-subtle/50">
                            <span className="text-10 font-semibold text-text-accent uppercase tracking-wider block mb-1">
                              Assessment
                            </span>
                            <p className="text-xs text-text-secondary font-semibold">
                              {soapAssessment}
                            </p>
                          </div>
                          <div className="bg-white p-3 rounded-xl border border-brand-subtle/50">
                            <span className="text-10 font-semibold text-text-accent uppercase tracking-wider block mb-1">
                              Plan
                            </span>
                            <p className="text-xs text-text-secondary font-semibold">
                              {soapPlan}
                            </p>
                          </div>
                        </div>

                        {/* Step 4: ICD Code */}
                        <AnimatePresence>
                          {activeStep >= 4 && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 5 }}
                              className="border-t border-brand-subtle/80 pt-3"
                            >
                              <span className="text-10 font-semibold text-[#6E9080] uppercase tracking-wider block mb-1">
                                Step 4: ICD Diagnostic Code Assignment
                              </span>
                              <div className="p-3 bg-[#6E9080]/5 border border-[#6E9080]/20 rounded-xl flex items-center justify-between">
                                <div className="font-mono">
                                  <span className="text-xs font-bold text-[#1A2E26]">
                                    {icdCode}
                                  </span>
                                  <p className="text-10 text-[#2C4A3E] font-medium mt-0.5">
                                    {icdDescription}
                                  </p>
                                </div>
                                <span className="bg-white text-[8px] border border-[#6E9080]/30 font-bold px-2 py-0.5 rounded-md text-[#2C4A3E] uppercase font-mono">
                                  Resolved
                                </span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Step 5: EHR Direct Sync */}
                        <AnimatePresence>
                          {activeStep >= 5 && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 5 }}
                              className="border-t border-brand-subtle/80 pt-3"
                            >
                              <span className="text-10 font-semibold text-brand-blue uppercase tracking-wider block mb-1">
                                Step 5: EHR Integration Sync Engine
                              </span>
                              <div className="p-3 bg-brand-blue/5 border border-brand-blue/20 rounded-xl flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center">
                                    <CheckCircle2
                                      size={12}
                                      className="text-brand-blue"
                                    />
                                  </div>
                                  <div>
                                    <span className="text-11 font-semibold text-text-primary uppercase tracking-wide block">
                                      {ehrIntegrationText}
                                    </span>
                                    <p className="text-[8px] text-text-secondary font-semibold font-mono">
                                      {ehrEncryptionText}
                                    </p>
                                  </div>
                                </div>
                                <span className="bg-brand-blue text-white text-[8px] font-black px-2 py-0.5 rounded-md uppercase font-mono tracking-wider animate-pulse">
                                  SYNCED
                                </span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Step info details */}
            <div className="mt-8 pt-6 border-t border-brand-subtle flex flex-col sm:flex-row items-center justify-between text-left gap-4">
              <div className="max-w-md">
                <span className="text-10 font-semibold text-brand-blue uppercase tracking-widest block">
                  Telemetry Phase
                </span>
                <h5 className="font-extrabold text-sm text-text-secondary mt-1">
                  {activeStep === 1 && "Dialogue Capture & Voice Extraction"}
                  {activeStep === 2 && "Acoustic Transcription Translate"}
                  {activeStep === 3 && "Autonomous SOAP Synthesizer Model"}
                  {activeStep === 4 && "Autonomous ICD Coding & Taxonomies"}
                  {activeStep === 5 && "Secured Clinical EHR Syncing Node"}
                </h5>
                <p className="text-xs text-text-secondary mt-1 font-medium leading-relaxed opacity-80">
                  {activeStep === 1 &&
                    "OJAS Isolates multiple conversations at the point of origin, filtering room acoustics to cleanly identify distinct streams."}
                  {activeStep === 2 &&
                    "The continuous speech data gets rendered under 95ms directly to an accurate, spelling-safe clinical ledger format."}
                  {activeStep === 3 &&
                    "The generative co-pilot structures the transcript to extract standard Subjective, Objective, Assessment and Plan blocks instantly."}
                  {activeStep === 4 &&
                    "Exact mapping of dialogue vocabulary to active clinical coding standards like ICD-10 occurs automatically without human burden."}
                  {activeStep === 5 &&
                    "Documentation is safely formatted into validated HL7/FHIR payloads and secured inside operational Epic, Cerner or custom EHR nodes."}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => {
                    setActiveStep((prev) => (prev === 1 ? 5 : prev - 1));
                    setIsPlaying(false);
                  }}
                  className="p-3 bg-bg-page hover:bg-brand-subtle border border-brand-subtle text-text-secondary rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Prev
                </button>
                <button
                  onClick={() => {
                    setActiveStep((prev) => (prev === 5 ? 1 : prev + 1));
                    setIsPlaying(false);
                  }}
                  className="p-3 bg-brand-blue text-white rounded-xl text-xs font-bold hover:bg-brand-hover shadow-md shadow-brand-blue/15 transition-all cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
