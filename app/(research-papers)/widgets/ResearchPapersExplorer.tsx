"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Download,
  Loader2,
  Search,
} from "lucide-react";
import { getResearchPaperListing } from "@/app/lib/api";
import { getStrapiMedia } from "@/app/lib/strapi";
import { cn } from "@/app/lib/cn";
import type {
  ResearchExplorerSection,
  ResearchPaper,
  ResearchPaperCategory,
} from "@/app/lib/types";

interface Props {
  section: ResearchExplorerSection;
}

const DEFAULT_CATEGORIES: ResearchPaperCategory[] = [
  { name: "All Domains", slug: "all" },
];

const ResearchPapersExplorer = ({ section }: Props) => {
  const searchPlaceholder =
    section.searchPlaceholder ?? "Search manuscripts or authors...";
  const domainsTitle = section.domainsTitle ?? "CONCORDANCE DOMAINS";
  const indexTitle = section.indexTitle ?? "MANUSCRIPT INDEX";
  const emptyStateText =
    section.emptyStateText ?? "No medical articles matched the current criteria.";
  const reprintLabel = section.reprintLabel ?? "OJAS REPRINT MANUSCRIPT";
  const downloadButtonText = section.downloadButtonText ?? "Download Reprint PDF";
  const abstractHeading = section.abstractHeading ?? "1. CLINICAL ABSTRACT PREVIEW";
  const chartHeading =
    section.chartHeading ?? "2. EVIDENCE PERFORMANCE GRAPH MATRIX";
  const chartDescription =
    section.chartDescription ??
    "Multi-center audit displaying clinical triage velocity outcomes using the biological model comparison matrix.";
  const citationHeading = section.citationHeading ?? "3. ACADEMIC CITATION GENERATOR";
  const consensusNote =
    section.consensusNote ??
    "All computational results listed inside the OJAS neural networks are independently reproducible. For direct biopsy reviews, contact the registered clinical science office.";

  const pageSize = section.pageSize ?? 12;
  const categories = section.categories?.length
    ? section.categories
    : DEFAULT_CATEGORIES;

  /* Server-hydrated first page; filtering and search re-query the listing API. */
  const [papers, setPapers] = useState<ResearchPaper[]>(section.papers ?? []);
  const [isLoading, setIsLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(
    section.papers?.[0]?.slug ?? null,
  );
  const [citationType, setCitationType] = useState<"APA" | "AMA" | "BibTeX">("APA");
  const [copiedCitationText, setCopiedCitationText] = useState(false);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const loadPapers = useCallback(async () => {
    setIsLoading(true);
    const listing = await getResearchPaperListing({
      category: activeTab,
      page: 1,
      pageSize,
      search: searchQuery || undefined,
    });
    setIsLoading(false);

    if (!listing) return;

    setPapers(listing.papers);
    /* Keep the open manuscript if it survived the filter, else open the first. */
    setSelectedSlug((current) =>
      listing.papers.some((paper) => paper.slug === current)
        ? current
        : (listing.papers[0]?.slug ?? null),
    );
  }, [activeTab, pageSize, searchQuery]);

  /* Skip the fetch on mount — the first page already arrived with the page. */
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(loadPapers, 250);
    return () => clearTimeout(timer);
  }, [loadPapers]);

  const activePaper =
    papers.find((paper) => paper.slug === selectedSlug) ?? papers[0] ?? null;

  const handleCopyCitation = (paper: ResearchPaper) => {
    let text = paper.citationAPA;
    if (citationType === "AMA") text = paper.citationAMA;
    if (citationType === "BibTeX") text = paper.citationBibTeX;
    if (!text) return;

    navigator.clipboard.writeText(text);
    setCopiedCitationText(true);
    triggerToast("Citation text successfully copied!");
    setTimeout(() => setCopiedCitationText(false), 2000);
  };

  const activeCitation =
    activePaper &&
    (citationType === "APA"
      ? activePaper.citationAPA
      : citationType === "AMA"
        ? activePaper.citationAMA
        : activePaper.citationBibTeX);

  const reprintUrl = getStrapiMedia(activePaper?.reprintPdf?.url);

  return (
    <section className={cn("pb-16 sm:pb-24", section.wrapperClass)}>
      <div className="global-container mx-auto">
        {/* ACADEMIC WORKSPACE: TWO COLUMN LAYOUT */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: LIBRARY, SEARCH & SELECTION FILTERS */}
          <div className="lg:col-span-5 space-y-6">
            {/* Search Input */}
            <div className="bg-white border border-brand-blue/10 rounded-2xl p-4 shadow-sm flex items-center gap-3">
              <Search className="text-slate-400" size={18} />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm font-semibold text-slate-800 bg-transparent py-0 border-0 outline-none"
              />
              {isLoading && (
                <Loader2 size={16} className="text-brand-blue animate-spin shrink-0" />
              )}
            </div>

            {/* Filter pills */}
            <div className="bg-white border border-brand-blue/10 rounded-3xl p-5 shadow-sm space-y-2">
              <h4 className="text-xs font-bold text-brand-blue uppercase tracking-widest font-mono mb-3">
                {domainsTitle}
              </h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((domain) => (
                  <button
                    key={domain.slug}
                    onClick={() => setActiveTab(domain.slug)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border outline-none cursor-pointer ${
                      activeTab === domain.slug
                        ? "bg-brand-blue border-brand-blue text-white shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    {domain.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Publication list */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-brand-blue uppercase tracking-widest font-mono px-1">
                {indexTitle}
              </h4>

              {papers.length === 0 ? (
                <div className="p-8 bg-white border border-slate-200 rounded-3xl text-center text-xs font-bold text-slate-400">
                  {emptyStateText}
                </div>
              ) : (
                papers.map((paper) => {
                  const isSelected = activePaper?.slug === paper.slug;
                  return (
                    <div
                      key={paper.slug}
                      onClick={() => setSelectedSlug(paper.slug)}
                      onMouseEnter={() => setHoveredSlug(paper.slug)}
                      onMouseLeave={() => setHoveredSlug(null)}
                      className={`p-5 rounded-3xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden ${
                        isSelected
                          ? "bg-white border-brand-blue shadow-md"
                          : "bg-white/60 border-slate-200 hover:bg-white hover:border-slate-350"
                      }`}
                    >
                      {/* Hover abstract preview */}
                      <AnimatePresence>
                        {hoveredSlug === paper.slug && !isSelected && paper.abstract && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute inset-0 bg-brand-dark/95 p-5 text-[11px] leading-relaxed text-slate-300 overflow-hidden flex flex-col justify-between"
                          >
                            <p className="line-clamp-4 font-semibold italic">
                              &ldquo;{paper.abstract}&rdquo;
                            </p>
                            <span className="text-[9px] font-mono font-bold text-brand-blue uppercase tracking-widest self-end flex items-center gap-1">
                              Click to read active manuscript <ArrowRight size={10} />
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex justify-between items-start mb-3">
                        {paper.paperId && (
                          <span className="text-[9px] font-mono text-brand-blue font-bold tracking-widest px-2 py-0.5 bg-brand-blue/5 border border-brand-blue/20 rounded">
                            {paper.paperId}
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400 font-bold">
                          {paper.date}
                        </span>
                      </div>
                      <h3 className="font-display font-black text-sm uppercase text-slate-900 leading-snug line-clamp-2 hover:text-brand-blue transition-colors">
                        {paper.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 font-semibold mt-2 truncate">
                        {paper.authors}
                      </p>
                      <p className="text-[10px] text-brand-blue font-black tracking-wide mt-1 italic uppercase truncate">
                        {paper.journal}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* RIGHT: READING PANEL, DATA VIS & CITATIONS */}
          <div className="lg:col-span-7 bg-white border border-brand-blue/10 rounded-3xl p-8 sm:p-12 shadow-sm text-left">
            {!activePaper ? (
              <p className="text-center text-xs font-bold text-slate-400 py-12">
                {emptyStateText}
              </p>
            ) : (
              <>
                {/* Download action */}
                <div className="flex flex-wrap justify-between items-center gap-4 mb-8 pb-6 border-b border-brand-blue/10">
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-brand-blue animate-pulse" />
                    <span className="text-xs font-bold font-mono tracking-widest uppercase text-slate-500">
                      {reprintLabel}
                    </span>
                  </div>
                  {reprintUrl ? (
                    <a
                      href={reprintUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 bg-brand-dark hover:bg-brand-blue text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <Download size={14} />
                      {downloadButtonText}
                    </a>
                  ) : (
                    <button
                      onClick={() =>
                        triggerToast("Reprint PDF is not available for this manuscript.")
                      }
                      className="px-4 py-2.5 bg-brand-dark hover:bg-brand-blue text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <Download size={14} />
                      {downloadButtonText}
                    </button>
                  )}
                </div>

                <h1 className="text-lg sm:text-28 font-display font-medium text-text-primary uppercase tracking-tight leading-tight mb-4">
                  {activePaper.title}
                </h1>
                {activePaper.authors && (
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                    <strong>Authors:</strong> {activePaper.authors} <br />
                    <span className="text-[11px] italic opacity-85">
                      {activePaper.affiliations}
                    </span>
                  </p>
                )}
                <div className="flex flex-wrap gap-4 pb-6 border-b border-slate-100 text-[10px] text-slate-400 font-mono">
                  {activePaper.journal && (
                    <span>
                      JOURNAL:{" "}
                      <strong className="text-slate-700">{activePaper.journal}</strong>
                    </span>
                  )}
                  {activePaper.doi && (
                    <span>
                      DOI: <strong className="text-brand-blue">{activePaper.doi}</strong>
                    </span>
                  )}
                  {activePaper.volume && (
                    <span>
                      VOLUME:{" "}
                      <strong className="text-slate-700">{activePaper.volume}</strong>
                    </span>
                  )}
                </div>

                <div className="space-y-8 mt-8 leading-relaxed">
                  {/* Abstract */}
                  {activePaper.abstract && (
                    <section className="space-y-3">
                      <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-text-primary border-b border-slate-100 pb-2">
                        {abstractHeading}
                      </h3>
                      <p className="italic text-slate-600 bg-[#FAF9F5] p-5 rounded-2xl border-l-4 border-brand-blue text-16 leading-relaxed">
                        &ldquo;{activePaper.abstract}&rdquo;
                      </p>
                    </section>
                  )}

                  {/* Evidence Graph */}
                  {activePaper.concordanceChart &&
                    activePaper.concordanceChart.length > 0 && (
                      <section className="space-y-4">
                        <h3 className="font-bold text-xs uppercase tracking-widest text-text-primary border-b border-slate-100 pb-2">
                          {chartHeading}
                        </h3>
                        <p className="text-16 leading-relaxed text-text-secondary">
                          {chartDescription}
                        </p>
                        <div className="border border-brand-blue/10 bg-[#FAF9F5] p-5 rounded-2xl">
                          <div className="space-y-4">
                            {activePaper.concordanceChart.map((row, idx) => (
                              <div key={idx} className="space-y-1.5">
                                <div className="flex justify-between items-center text-xs font-bold">
                                  <span className="text-brand-blue truncate max-w-[200px] sm:max-w-xs">
                                    {row.condition}
                                  </span>
                                  <span className="text-brand-blue font-mono">
                                    {row.ojas} Concordance
                                  </span>
                                </div>
                                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex">
                                  <div
                                    className="bg-brand-blue h-full rounded-l"
                                    style={{ width: row.ojas }}
                                  />
                                  <div
                                    className="bg-slate-350 h-full"
                                    style={{ width: `calc(100% - ${row.ojas})` }}
                                  />
                                </div>
                                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                                  <span>Standard Diagnosis: {row.expert}</span>
                                  <span>Triage Velocity: {row.velocity}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </section>
                    )}

                  {/* Citations */}
                  {activeCitation && (
                    <section className="space-y-3 pt-6 border-t border-slate-100">
                      <h3 className="font-bold text-xs uppercase tracking-widest text-text-primary border-b border-slate-100 pb-2">
                        {citationHeading}
                      </h3>
                      <div className="bg-[#FAF9F5] border border-slate-200 p-5 rounded-2xl space-y-4">
                        <div className="flex justify-between items-center border-b border-slate-200/55 pb-2">
                          <div className="flex gap-2">
                            {(["APA", "AMA", "BibTeX"] as const).map((style) => (
                              <button
                                key={style}
                                onClick={() => setCitationType(style)}
                                className={`px-3 py-1 rounded-xl text-[10px] font-bold outline-none cursor-pointer transition-all ${
                                  citationType === style
                                    ? "bg-brand-blue text-white shadow-sm"
                                    : "text-slate-550 hover:bg-slate-100"
                                }`}
                              >
                                {style}
                              </button>
                            ))}
                          </div>
                          <button
                            onClick={() => handleCopyCitation(activePaper)}
                            className="text-[10px] font-bold text-brand-blue uppercase tracking-wider flex items-center gap-1 cursor-pointer hover:underline"
                          >
                            {copiedCitationText ? "Copied" : "Copy"}
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed font-serif italic">
                          {activeCitation}
                        </p>
                      </div>
                    </section>
                  )}

                  {/* Peer Statement */}
                  <div className="bg-neutral-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-500 leading-relaxed">
                    <strong>Vetted Protocol Consensus:</strong> {consensusNote}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
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

export default ResearchPapersExplorer;
