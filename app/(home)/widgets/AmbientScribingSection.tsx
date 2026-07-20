"use client";

import { motion } from "motion/react";
import { Activity } from "lucide-react";
import ScrollHighlightedText from "./ScrollHighlightedText";
import MarkdownText from "../components/MarkdownText";
import type { AmbientScribingSection as AmbientScribingSectionData } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

const defaultDialogue = [
  { speaker: "Doctor", text: "Based on your latest multi-omic panel, I'm seeing a significant shift in your inflammatory markers." },
  { speaker: "Patient", text: "Is that why I'm feeling less brain fog in the mornings? I noticed a change about four days ago." },
  { speaker: "Doctor", text: "Precisely. Your biological clock is stabilizing. OJAS is suggesting we refine the micronutrient convergence." },
];

export default function AmbientScribingSection({ data, wrapperClass }: { data?: AmbientScribingSectionData; wrapperClass?: string }) {
  const title = data?.title ?? "Ambient AI Scribing";
  const description = data?.description ?? "Zero-distraction clinical documentation. OJAS listens, understands medical context, and drafts structured clinical notes from natural consultations in real-time.";
  const dialogue = data?.demoDialogue ?? defaultDialogue;
  const draftingStatus = data?.draftingStatus ?? "Drafting SOAP Note...";

  return (
    <section className={cn("py-16 sm:py-24 bg-slate-900 text-white overflow-hidden relative", wrapperClass)} id="use-cases">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent)]" />
      <div className="global-container mx-auto">
        <div className="text-center mb-12 relative">
          <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium mb-4 italic text-white *:text-brand-blue *:underline *:decoration-brand-blue/30 *:underline-offset-8 *:font-[inherit]">
            <MarkdownText markdown={title} />
          </h2>
          <div className="text-white/60 text-base leading-relaxed max-w-2xl mx-auto">
            <ScrollHighlightedText isDarkTheme text={description} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          <div className="w-full lg:w-4/5 bg-black/40 backdrop-blur-xl rounded-4xl border border-white/5 p-8 shadow-2xl relative">
            <div className="absolute top-0 right-10 -translate-y-1/2 px-4 py-1.5 bg-brand-blue rounded-full text-12 font-bold uppercase tracking-widest flex items-center gap-2">
              <Activity size={12} />
              Live Transcription
            </div>

            <div className="space-y-6 max-h-50 overflow-hidden">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {dialogue.map((line, i) => {
                  const isDoctor = line.speaker.toLowerCase() === "doctor";
                  return (
                    <div key={i} className={`space-y-2 ${!isDoctor ? "pl-6 border-l-2 border-white/5" : ""}`}>
                      <p className={`text-12 font-bold uppercase tracking-widest ${isDoctor ? "text-brand-blue" : "text-slate-500"}`}>{line.speaker}</p>
                      <p className={`text-sm leading-relaxed ${isDoctor ? "text-white/90 font-medium" : "text-white/60"}`}>{line.text}</p>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
              <div className="flex gap-1 items-end h-4">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [4, 16, 8, 12, 4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 }}
                    className="w-1 bg-brand-blue/60 rounded-full shadow-[0_0_8px_rgba(184,104,81,0.4)]"
                  />
                ))}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-12 font-bold text-slate-500 uppercase tracking-widest">{draftingStatus}</span>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
