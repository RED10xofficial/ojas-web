"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { PublicationsSection as PublicationsSectionData } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

const defaultPublications = [
  {
    tag: "Technical Specification",
    id: "OJ-C-901",
    title: "The Bio-Intelligent Clinical Core",
    subtitle: "Engineering the Gut-Skin-Brain Axis Reversal",
    desc: "An in-depth systems architecture document detailing the computational rules and neural parsing models of our OOM-1 biological transformer core.",
    lead: "Dr. Anand, Lead AI Architect",
    date: "May 2026",
    accent: "border-brand-blue/35 bg-gradient-to-br from-slate-900 via-slate-900 to-brand-dark/95",
  },
  {
    tag: "Clinical Cohort Trial",
    id: "OJ-C-402",
    title: "Cohort Efficacy & Signal Accuracy",
    subtitle: "Evaluating Multi-Spectral Intelligence Layers",
    desc: "Rigorous clinical cohort results validating the precision of OJAS computer vision segmentation and biomarker mapping in randomized trials.",
    lead: "Cleveland Clinical Advisory Alliance",
    date: "April 2026",
    accent: "border-indigo-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/80",
  },
  {
    tag: "Longitudinal Reversal Study",
    id: "OJ-C-773",
    title: "Epigenetic Reversal Analysis",
    subtitle: "Cellular Remission of Chronic Atopic Pathologies",
    desc: "Longitudinal research following patient remission profiles, demonstrating permanent resolution of stubborn symptoms through system-wide guidance.",
    lead: "Department of Clinical Epigenetics",
    date: "March 2026",
    accent: "border-emerald-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40",
  },
];

const accentClasses = [
  "border-brand-blue/35 bg-gradient-to-br from-slate-900 via-slate-900 to-brand-dark/95",
  "border-indigo-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/80",
  "border-emerald-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40",
];

export default function PublicationsSection({ data, wrapperClass }: { data?: PublicationsSectionData; wrapperClass?: string }) {
  const sectionTitle = data?.title ?? "Clinical Publications & Research";
  const sectionSubtitle = data?.subtitle ?? "Evidence-Based Medicine";
  const sectionDescription = data?.description ?? "Explore our peer-reviewed literature, detailed technical white papers, and extensive clinical case studies outlining the multi-omic mechanisms of the OJAS platform.";

  const publications = data?.publications?.map((pub, idx) => ({
    tag: pub.tag ?? "",
    id: pub.publicationId ?? "",
    title: pub.title,
    subtitle: pub.subtitle ?? "",
    desc: pub.description ?? "",
    lead: pub.leadAuthor ?? "",
    date: pub.date ?? "",
    accent: accentClasses[idx % accentClasses.length],
  })) ?? defaultPublications;

  return (
    <section className={cn("py-16 sm:py-24 bg-bg-surface border-t border-brand-subtle relative overflow-hidden", wrapperClass)} id="publications">
      <div className="absolute top-1/4 right-[5%] w-[450px] h-[450px] bg-brand-blue/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-[5%] w-[350px] h-[350px] bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />
      <div className="global-container mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-brand-blue font-medium max-w-2xl mx-auto mb-2">{sectionSubtitle}</p>
          <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary mb-4">{sectionTitle}</h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-base font-medium mt-4">
            {sectionDescription}
          </p>
          <div className="w-10 h-0.5 bg-brand-blue mx-auto mt-6 rounded-full opacity-40" />
        </div>
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {publications.map((pub, idx) => (
            <motion.div
              key={pub.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(4, 8, 14, 0.15)" }}
              className={`flex flex-col justify-between p-6 sm:p-8 rounded-2xl border text-white relative group overflow-hidden ${pub.accent}`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full translate-x-12 -translate-y-12 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-12 font-medium uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-subtle">{pub.tag}</span>
                  <span className="text-12 font-mono text-slate-400 font-bold">{pub.id}</span>
                </div>
                <h3 className="text-xl font-display text-white! leading-tight mb-2 tracking-tight">{pub.title}</h3>
                <p className="text-14 text-brand-blue leading-[1.6] font-bold uppercase tracking-widest mb-2">{pub.subtitle}</p>
                <p className="text-14 text-slate-300 leading-relaxed mb-6 font-normal">{pub.desc}</p>
              </div>
              <div className="pt-6 border-t border-white/5">
                <div className="flex justify-between items-center text-12 text-slate-400 font-bold mb-5">
                  <span>{pub.lead}</span>
                  <span>{pub.date}</span>
                </div>
                <button className="w-full py-3.5 bg-brand-blue hover:bg-brand-hover active:bg-brand-pressed text-white text-xs font-black uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-brand-blue/20 flex items-center justify-center gap-2 group-hover:scale-[1.02]">
                  Read Document <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
