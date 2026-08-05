"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Bookmark, CheckCircle2, Printer, Share2 } from "lucide-react";
import type { CaseStudiesMetricsSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

interface Props {
  section: CaseStudiesMetricsSection;
}

const CaseStudiesMetrics = ({ section }: Props) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      triggerToast("Case study share link copied to clipboard!");
    } catch {
      /* Clipboard unavailable (insecure context) — silently ignore. */
    }
  };

  const metrics = section.metrics ?? [];

  return (
    <section className={cn("pb-16 sm:pb-24", section.wrapperClass)}>
      <div className="global-container mx-auto space-y-12">
        {/* Hero */}
        <div className="text-center max-w-4xl mx-auto">
          {section.badgeText && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse" />
              <span className="text-xs font-bold text-brand-blue uppercase tracking-widest font-mono">
                {section.badgeText}
              </span>
            </div>
          )}
          <h1 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary tracking-tight mb-6">
            {section.title}
            {section.highlightedTitle && (
              <>
                {" "}
                <span className="text-brand-blue">{section.highlightedTitle}</span>
              </>
            )}
          </h1>
          {section.description && (
            <p className="text-16 leading-relaxed text-text-secondary max-w-2xl mx-auto">
              {section.description}
            </p>
          )}
        </div>

        {/* Bookmark / Share toolbar */}
        {section.showToolbar !== false && (
          <div className="flex flex-wrap justify-end items-center gap-3 pb-4 border-b border-text-secondary/10">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isBookmarked
                  ? "bg-brand-blue/10 border-brand-blue/30 text-brand-blue"
                  : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
              }`}
              title="Bookmark Case Studies"
            >
              <Bookmark size={15} className={isBookmarked ? "fill-current" : ""} />
            </button>
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl border bg-white border-slate-200 text-slate-700 hover:bg-slate-50 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
            >
              <Share2 size={15} className="text-brand-blue" />
              Share Link
            </button>
            <button
              onClick={() => window.print()}
              className="p-2.5 rounded-xl border bg-white border-slate-200 text-slate-700 hover:bg-slate-50 transition-all cursor-pointer hidden sm:flex items-center gap-1.5 text-xs font-bold"
            >
              <Printer size={15} className="text-brand-blue" />
              Print Portfolio
            </button>
          </div>
        )}

        {/* KEY IMPACT METRICS STRIP */}
        {metrics.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((m, idx) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-brand-blue transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-subtle/30 rounded-full blur-2xl pointer-events-none group-hover:bg-brand-blue/10 transition-colors" />
                <p className="text-3xl sm:text-4xl font-display font-black text-brand-blue mb-1">
                  {m.value}
                </p>
                <p className="text-xs font-bold text-text-primary uppercase tracking-wider mb-2">
                  {m.label}
                </p>
                {m.description && (
                  <p className="text-xs text-text-secondary opacity-75 leading-relaxed font-semibold">
                    {m.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Global Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-brand-dark text-white text-xs font-bold tracking-wide px-5 py-3 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-2">
          <CheckCircle2 className="text-emerald-400 shrink-0" size={16} />
          <span>{toastMessage}</span>
        </div>
      )}
    </section>
  );
};

export default CaseStudiesMetrics;
