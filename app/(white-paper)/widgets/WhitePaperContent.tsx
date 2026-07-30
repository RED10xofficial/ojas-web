"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Download, Lock, Mail } from "lucide-react";
import { getStrapiMedia } from "@/app/lib/strapi";
import BlogContent from "@/app/(blogs)/widgets/BlogContent";
import type { WhitePaperContentSection } from "@/app/lib/types";

interface Props {
  section: WhitePaperContentSection;
}

const WhitePaperContent = ({ section }: Props) => {
  const trends = section.marketTrends ?? [];
  const tabs = section.tabs ?? [];

  const [emailInput, setEmailInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeTrend, setActiveTrend] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const pdfUrl = getStrapiMedia(section.reportPdf?.url);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUnlocked(true);
    triggerToast(
      section.gateSuccessMessage || "Access granted! Unlocking full executive report.",
    );
  };

  const currentTrend = trends[activeTrend];

  return (
    <section className="pb-16 sm:pb-24">
      <div className="global-container mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Trend Visualizer (4/12) */}
          <div className="lg:col-span-4 space-y-6">
            {trends.length > 0 && (
              <div className="bg-bg-page border border-slate-200 rounded-3xl p-6 shadow-sm">
                {section.trendsTitle && (
                  <h3 className="text-xs font-bold text-brand-blue uppercase tracking-widest font-mono mb-4">
                    {section.trendsTitle}
                  </h3>
                )}
                {section.trendsDescription && (
                  <p className="text-16 leading-relaxed text-text-secondary mb-6">
                    {section.trendsDescription}
                  </p>
                )}

                <div
                  className="grid gap-2 mb-6"
                  style={{
                    gridTemplateColumns: `repeat(${Math.min(trends.length, 4)}, minmax(0, 1fr))`,
                  }}
                >
                  {trends.map((trend, idx) => (
                    <button
                      key={trend.id}
                      onClick={() => setActiveTrend(idx)}
                      className={`py-2 rounded-xl text-xs font-black transition-all outline-none cursor-pointer ${
                        activeTrend === idx
                          ? "bg-brand-blue text-white shadow-sm"
                          : "bg-white text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      {trend.year}
                    </button>
                  ))}
                </div>

                {currentTrend && (
                  <motion.div
                    key={currentTrend.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-4 rounded-2xl space-y-2 border border-slate-200/60"
                  >
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                      {section.trendsMetricLabel || "Estimated Target Metric:"}
                    </p>
                    {currentTrend.stats && (
                      <p className="text-base font-display font-black text-brand-blue uppercase">
                        {currentTrend.stats}
                      </p>
                    )}
                    {currentTrend.text && (
                      <p className="text-16 leading-relaxed text-text-secondary">
                        {currentTrend.text}
                      </p>
                    )}
                  </motion.div>
                )}
              </div>
            )}

            {/* Executive quote */}
            {section.quote && (
              <div className="bg-brand-dark text-white rounded-3xl p-6 shadow-md relative overflow-hidden text-left">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/10 blur-2xl pointer-events-none" />
                {section.quoteBadgeText && (
                  <p className="text-11 uppercase tracking-widest font-semibold text-brand-blue mb-3">
                    {section.quoteBadgeText}
                  </p>
                )}
                <p className="text-xs leading-relaxed italic text-slate-350 font-serif">
                  &ldquo;{section.quote}&rdquo;
                </p>
                {(section.quoteAuthorName || section.quoteAuthorTitle) && (
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2.5">
                    {section.quoteAuthorInitials && (
                      <div className="w-8 h-8 rounded-full bg-brand-blue/20 flex items-center justify-center font-bold text-brand-blue text-xs">
                        {section.quoteAuthorInitials}
                      </div>
                    )}
                    <div>
                      {section.quoteAuthorName && (
                        <p className="text-xs font-black uppercase text-white">
                          {section.quoteAuthorName}
                        </p>
                      )}
                      {section.quoteAuthorTitle && (
                        <p className="text-[9px] font-mono text-slate-500 font-bold uppercase">
                          {section.quoteAuthorTitle}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Tabbed body + lead gate (8/12) */}
          <div className="lg:col-span-8 space-y-8 text-left">
            {tabs.length > 0 && (
              <>
                <div className="bg-bg-page border border-slate-200 rounded-3xl p-2.5 flex flex-wrap gap-2">
                  {tabs.map((tab, idx) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(idx)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold uppercase transition-all duration-300 outline-none cursor-pointer border-0 ${
                        activeTab === idx
                          ? "bg-brand-blue text-white shadow-sm"
                          : "text-text-secondary hover:bg-white/50"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm min-h-[250px]">
                  {tabs[activeTab] && (
                    <motion.div
                      key={tabs[activeTab].id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg sm:text-28 font-display font-medium text-text-primary uppercase">
                        {tabs[activeTab].title}
                      </h3>
                      {tabs[activeTab].content && (
                        <BlogContent markdown={tabs[activeTab].content as string} />
                      )}
                    </motion.div>
                  )}
                </div>
              </>
            )}

            {/* UNLOCK LEAD COMPONENT GATE */}
            {section.gateTitle && (
              <div className="bg-bg-page border border-slate-200/80 rounded-3xl p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/10 blur-2xl pointer-events-none" />

                <div className="max-w-xl mx-auto text-center space-y-6">
                  <Lock className="text-brand-blue mx-auto" size={24} />

                  <h3 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary uppercase tracking-tight">
                    {section.gateTitle}
                  </h3>

                  {section.gateDescription && (
                    <p className="text-16 leading-relaxed text-text-secondary max-w-md mx-auto">
                      {section.gateDescription}
                    </p>
                  )}

                  {isUnlocked ? (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-5 bg-white border border-brand-blue/20 rounded-2xl flex flex-col items-center space-y-3"
                    >
                      <CheckCircle2 className="text-emerald-500" size={32} />
                      <p className="text-xs font-black text-slate-900 uppercase">
                        {section.gateSuccessMessage || "Access Granted"}
                      </p>
                      {pdfUrl && (
                        <a
                          href={pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 bg-brand-blue hover:bg-brand-hover text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Download size={14} />
                          {section.gateDownloadButtonText || "Download Brief Package"}
                        </a>
                      )}
                    </motion.div>
                  ) : (
                    <form
                      onSubmit={handleLeadSubmit}
                      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                    >
                      <div className="flex-grow bg-white border border-slate-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
                        <Mail className="text-slate-400" size={16} />
                        <input
                          type="email"
                          required
                          placeholder={
                            section.gateInputPlaceholder || "Enter partner email"
                          }
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          className="w-full text-xs font-semibold text-slate-800 bg-transparent py-0 border-0 outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-5 py-3 bg-brand-dark hover:bg-brand-blue text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 shrink-0"
                      >
                        {section.gateButtonText || "Unlock PDF Brief"}
                      </button>
                    </form>
                  )}

                  {section.gateFootnote && (
                    <p className="text-[9.5px] text-slate-400 font-mono font-bold uppercase tracking-widest">
                      {section.gateFootnote}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Global alert toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-brand-dark text-white text-xs font-bold tracking-wide px-5 py-3 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-2">
          <CheckCircle2 className="text-emerald-400 shrink-0" size={16} />
          <span>{toastMessage}</span>
        </div>
      )}
    </section>
  );
};

export default WhitePaperContent;
