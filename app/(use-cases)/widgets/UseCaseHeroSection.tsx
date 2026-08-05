"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, RefreshCw } from "lucide-react";
import { cn } from "@/app/lib/cn";

interface UseCaseHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  phrases: string[];
  wrapperClass?: string;
}

interface AnalysisResult {
  query: string;
  concordance: string;
  differentialDiagnosis: { name: string; probability: string; risk: string }[];
  advice: string;
}

export default function UseCaseHeroSection({
  title,
  subtitle,
  description,
  phrases,
  wrapperClass,
}: UseCaseHeroProps) {
  const [inputValue, setInputValue] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  );

  // Typewriter state
  const [placeholderText, setPlaceholderText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(25);

  useEffect(() => {
    if (!phrases.length) return;
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setPlaceholderText(
        isDeleting
          ? fullText.substring(0, placeholderText.length - 1)
          : fullText.substring(0, placeholderText.length + 1),
      );

      setTypingSpeed(isDeleting ? 10 : 25);

      if (!isDeleting && placeholderText === fullText) {
        setTimeout(() => setIsDeleting(true), 1200);
      } else if (isDeleting && placeholderText === "") {
        setIsDeleting(false);
        setLoopNum((n) => n + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [placeholderText, isDeleting, loopNum, typingSpeed, phrases]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputValue.trim() || placeholderText;
    if (!query) return;

    setIsAnalyzing(true);
    setAnalysisResult(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        query,
        concordance: "94.7%",
        differentialDiagnosis: [
          {
            name: "Primary Clinical Match",
            probability: "87.3%",
            risk: "Low Risk",
          },
          {
            name: "Secondary Differential",
            probability: "10.2%",
            risk: "Benign",
          },
          {
            name: "Tertiary Consideration",
            probability: "2.5%",
            risk: "Monitor Periodic Changes",
          },
        ],
        advice:
          "The analyzed inquiry indicates structural patterns within clinical parameters. A comprehensive evaluation is recommended to extract precise diagnostic metrics and confirm findings against validated clinical datasets.",
      });
    }, 2000);
  };

  return (
    <section className={cn("relative pt-40 pb-24 overflow-hidden", wrapperClass)}>
      <div className="absolute inset-0 -z-10 bg-bg-page opacity-70" />

      <div className="global-container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          <div className="font-display font-bold text-text-primary">
            <h1 className="max-w-3xl mb-4 text-48 leading-[1.15] uppercase">
              {title}
            </h1>
          </div>
          {subtitle && (
            <div className="mb-10 flex items-center gap-2 px-4 rounded-full text-brand-blue text-lg font-medium">
              <span>{subtitle}</span>
            </div>
          )}

          {description && (
            <p className="text-16 leading-relaxed text-text-secondary max-w-xl mx-auto -mt-6 mb-10">
              {description}
            </p>
          )}

          {/* Query box */}
          <div className="w-full max-w-200 mx-auto">
            <form onSubmit={handleSubmit} className="relative group">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-white border border-brand-subtle rounded-full py-5 px-10 pr-20 text-xl text-text-secondary focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue/30 transition-all placeholder:text-text-accent/30 shadow-2xl shadow-brand-dark/5"
                placeholder={placeholderText}
                disabled={isAnalyzing}
              />
              <button
                type="submit"
                disabled={isAnalyzing}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-14 h-14 bg-text-primary text-white rounded-full flex items-center justify-center hover:bg-brand-hover active:bg-brand-pressed transition-all shadow-md disabled:opacity-50 cursor-pointer"
              >
                {isAnalyzing ? (
                  <RefreshCw size={24} className="animate-spin" />
                ) : (
                  <ArrowRight size={24} />
                )}
              </button>
            </form>

            {/* Preset chips */}
            <div className="flex flex-wrap justify-center gap-2.5 mt-8">
              {phrases.map((phrase, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setInputValue(phrase)}
                  className="px-4 py-2 rounded-xl text-xs font-medium transition-all shadow-sm border whitespace-nowrap bg-white text-text-secondary/50 border-brand-subtle hover:border-brand-blue/30 hover:text-brand-blue"
                >
                  {phrase}
                </button>
              ))}
            </div>

            <div className="text-center pt-10">
              <span className="text-text-primary font-black font-sans text-base sm:text-lg tracking-wide uppercase select-none">
                Start a 14-Day Free Trial - No Credit Card Needed
              </span>
            </div>
          </div>
        </motion.div>

        {/* Response simulator */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-2xl mx-auto my-8 p-6 bg-white border border-brand-subtle rounded-[2rem] text-center space-y-4 shadow-xl"
            >
              <div className="w-12 h-12 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center mx-auto animate-spin">
                <RefreshCw size={24} />
              </div>
              <h3 className="text-sm font-display font-black uppercase text-brand-blue">
                OJAS Bio-Transformer Active
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed max-w-sm mx-auto">
                De-tokenizing symptom profiles, cross-referencing multi-omic
                databases, and analyzing spectral alignment indexes...
              </p>
            </motion.div>
          )}

          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto my-8 bg-brand-dark text-white text-left p-8 rounded-[2rem] border border-white/5 shadow-2xl space-y-6"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-xs font-bold font-mono text-brand-blue uppercase tracking-widest flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-blue animate-pulse" />
                  Transformer Concordance: {analysisResult.concordance}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  ID: OOM-D991
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 font-mono tracking-wider uppercase">
                  Inquiry Received
                </h4>
                <p className="text-md font-sans text-slate-200 bg-white/5 p-4 rounded-xl border border-white/5 italic">
                  &ldquo;{analysisResult.query}&rdquo;
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 font-mono tracking-wider uppercase">
                  Differential Match Matrices
                </h4>
                <div className="space-y-2.5">
                  {analysisResult.differentialDiagnosis.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between"
                    >
                      <div>
                        <p className="text-xs font-bold text-white">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-semibold">
                          {item.risk}
                        </p>
                      </div>
                      <span className="text-brand-blue font-bold text-xs">
                        {item.probability}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 font-mono tracking-wider uppercase">
                  Clinical Interpretation
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-[#6A9080]/10 border border-[#6A9080]/20 p-4 rounded-xl">
                  {analysisResult.advice}
                </p>
              </div>

              <Link
                href="/pricing"
                className="w-full py-4 bg-brand-blue text-white hover:bg-brand-hover text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-brand-blue/20 flex items-center justify-center gap-2"
              >
                Activate Free Sandbox Access <ArrowRight size={14} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
