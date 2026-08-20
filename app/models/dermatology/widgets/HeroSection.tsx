"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import type { DermaHeroSection } from "@/app/lib/types";
import { openChatWithQuery } from "@/app/lib/chat";
import { cn } from "@/app/lib/cn";

const defaultPrompts = [
  "What is this spot on my skin?",
  "Is this pigmentation concerning?",
  "Does this require urgent medical attention?",
  "Why is the texture becoming rough?",
];

const defaultTrustBadges = [
  "DPDP Compliances",
  "Build in Google",
  "Trained on AIIMS data",
  "ISO certified",
];
const defaultPartners = [
  "AIIMS",
  "Google",
  "Mayo clinic",
  "JJ hospital",
  "Medanta",
  "Kokilaben Dhirubhai Ambani Hospital",
  "jupiter hospital",
  "Fortis Hospitals",
];

export default function HeroSection({
  data,
  wrapperClass,
}: {
  data?: DermaHeroSection;
  wrapperClass?: string;
}) {
  const prompts = data?.prompts?.map((p) => p.text) ?? defaultPrompts;
  const title =
    data?.title ?? "India\u2019s Next-Gen Dermatology AI Foundation Model";
  const alternateTitle =
    data?.alternateTitle ?? "AI- Powered Skin Lesion Analysis";
  const inputPlaceholder =
    data?.inputPlaceholder ??
    "Type skin diagnostic question (e.g., \u2018atopic eczema\u2019, \u2018atypical mole\u2019)...";
  const analyzeButtonText = data?.analyzeButtonText ?? "Analyze";
  const trialText =
    data?.trialText ?? "Start a 14-Day Free Trial - No Credit Card Needed";
  const backLinkText = data?.backLinkText ?? "Back to Main Operating System";
  const backLinkUrl = data?.backLinkUrl ?? "/";
  const trustBadges =
    data?.trustBadges?.map((b) => b.title) ?? defaultTrustBadges;
  const partners = data?.partners?.map((p) => p.title) ?? defaultPartners;
  const [viewMode, setViewMode] = useState<"foundation" | "lesion">(
    "foundation",
  );
  const [promptText, setPromptText] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const [isUserTyping, setIsUserTyping] = useState(false);

  /** Hands the prompt to the chat product, matching the home hero. */
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promptText.trim()) return;
    openChatWithQuery(promptText);
  };

  useEffect(() => {
    if (isUserTyping) return;
    let timer: NodeJS.Timeout;

    const handleType = () => {
      const currentFullText = prompts[promptIndex];
      if (!isDeleting) {
        setPromptText(currentFullText.slice(0, promptText.length + 1));
        setTypingSpeed(30);

        if (promptText === currentFullText) {
          timer = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        setPromptText(currentFullText.slice(0, promptText.length - 1));
        setTypingSpeed(15);

        if (promptText === "") {
          setIsDeleting(false);
          setPromptIndex((prev) => (prev + 1) % prompts.length);
          setTypingSpeed(300);
          return;
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [promptText, isDeleting, promptIndex, typingSpeed, isUserTyping]);

  return (
    <section
      className={cn(
        "relative min-h-[90vh] overflow-hidden bg-bg-page flex flex-col items-center justify-center global-container mx-auto pt-40 pb-20 border-b border-brand-subtle",
        wrapperClass,
      )}
    >
      {/* Background Glow */}
      <div className="absolute -bottom-37.5 left-1/2 -translate-x-1/2 w-250 h-100 bg-brand-blue/15 blur-3xl rounded-full"></div>
      {/* Grid Lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-full w-px bg-text-accent/30"></div>
        <div className="absolute left-[20%] top-0 h-full w-px rotate-20 bg-text-accent/30"></div>
        <div className="absolute right-[20%] top-0 h-full w-px -rotate-20 bg-text-accent/30"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[30%] w-1.5 h-1.5 bg-brand-blue/50 rounded-full animate-pulse"></div>
        <div className="absolute top-[60%] left-[70%] w-1.5 h-1.5 bg-brand-blue/50 rounded-full animate-pulse"></div>
        <div className="absolute top-[80%] left-[40%] w-1.5 h-1.5 bg-brand-blue/50 rounded-full animate-pulse"></div>
        <div className="absolute top-[40%] left-[80%] w-1.5 h-1.5 bg-brand-blue/50 rounded-full animate-pulse"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-subtle text-brand-blue text-xs font-bold hover:bg-brand-blue/10 active:scale-95 transition-all border border-brand-subtle"
          >
            <ArrowLeft size={14} /> {backLinkText}
          </Link>
          {viewMode === "lesion" && (
            <button
              onClick={() => {
                setViewMode("foundation");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold hover:bg-brand-blue/20 active:scale-95 transition-all border border-brand-blue/25"
            >
              <Sparkles size={14} /> Back to Foundation Model
            </button>
          )}
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-3xl font-display font-black text-text-primary mb-10 tracking-tight uppercase min-h-16 flex items-center justify-center">
          {viewMode === "lesion" ? alternateTitle : title}
        </h1>

        {/* Search box */}
        <div className="w-full max-w-3xl mx-auto mb-8 relative group">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              className="w-full bg-white border border-brand-subtle rounded-3xl py-5 px-8 pr-32 text-md md:text-lg text-text-secondary focus:outline-none focus:ring-4 focus:ring-brand-blue/10 shadow-lg shadow-brand-dark/2 border-brand-blue/20 transition-all placeholder:text-text-secondary/60 cursor-text font-medium"
              value={promptText}
              onChange={(e) => {
                /* Derived, not latched: emptying the box resumes the demo
                   typing, which the removed results panel used to do. */
                setIsUserTyping(e.target.value.trim().length > 0);
                setPromptText(e.target.value);
              }}
              onFocus={() => setIsUserTyping(true)}
              placeholder={inputPlaceholder}
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 px-5 py-3.5 bg-brand-blue hover:bg-brand-blue/95 text-white font-bold rounded-2xl flex items-center gap-2 shadow-md hover:shadow-lg active:scale-95 transition-all text-sm cursor-pointer border-0"
            >
              <Sparkles size={16} />
              <span>{analyzeButtonText}</span>
            </button>
          </form>

        </div>

        <p className="text-text-primary text-14 font-semibold uppercase tracking-wide mb-16 select-none leading-none">
          {trialText}
        </p>

        {/* Trust Scrolling Animation */}
      </div>
      <div className="global-container">
        <div className="w-full border-t border-brand-subtle/50 pt-8 mt-8 overflow-hidden relative">
          <div className="w-full relative flex overflow-hidden">
            <div className="flex gap-20 items-center whitespace-nowrap animate-scroll-reverse py-2">
              {[...trustBadges, ...trustBadges, ...trustBadges].map(
                (name, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 font-display font-black text-brand-blue text-lg md:text-xl uppercase tracking-wider"
                  >
                    <ShieldCheck size={20} className="text-brand-blue" />
                    {name}
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="w-full relative flex overflow-hidden group mt-12">
            <div className="flex gap-16 items-center whitespace-nowrap animate-scroll py-2">
              {[...partners, ...partners].map((name, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 font-display font-extrabold text-text-primary opacity-85 hover:text-brand-blue transition-colors cursor-default text-lg md:text-xl"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-blue/30" />
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
