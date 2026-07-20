"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, Zap } from "lucide-react";
import type { HeroSection as HeroSectionData } from "@/app/lib/types";
import MarkdownText from "../components/MarkdownText";
import Image from "next/image";
import { getStrapiMedia } from "@/app/lib/strapi";
import { cn } from "@/app/lib/cn";

const defaultPhrases = [
  "What is the state of my maternal health?",
  "I had vada pav at 10am, is this meal appropriate now?",
  "I slept for 9 hours, still having a headache in the morning, why?",
  "i have pimple on forehead what does it indicate?",
  "give me solution for blackheads?",
];

const defaultShortcuts = [
  "Image Analysis",
  "AI note taking",
  "Predictive Diagnostics",
  "Medical Report Summarization",
  "Symptom Pattern Detection",
  "IMR prediction",
  "AI MMR prediction",
  "Diagnosis and Recommendation",
  "Clinical Note Taking",
  "AI Based Doctor Notes",
];

export default function HeroSection({ data, wrapperClass }: { data?: HeroSectionData; wrapperClass?: string }) {
  const phrases = data?.phrases?.map((p) => p.title) ?? defaultPhrases;
  const shortcuts = data?.shortcuts?.map((s) => s.title) ?? defaultShortcuts;

  const [placeholderText, setPlaceholderText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [activeShortcut, setActiveShortcut] = useState<string | null>(null);

  useEffect(() => {
    const i = loopNum % phrases.length;
    const fullText = phrases[i];

    const timer = setTimeout(() => {
      setPlaceholderText(
        isDeleting
          ? fullText.substring(0, placeholderText.length - 1)
          : fullText.substring(0, placeholderText.length + 1),
      );
      setTypingSpeed(isDeleting ? 15 : 40);

      if (!isDeleting && placeholderText === fullText) {
        setTimeout(() => setIsDeleting(true), 800);
      } else if (isDeleting && placeholderText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [placeholderText, isDeleting, loopNum, typingSpeed, phrases]);

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
          <div className="mb-8 flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold uppercase tracking-widest">
            {data?.subtitleIcon?.url && <Image src={getStrapiMedia(data?.subtitleIcon?.url) || ''} unoptimized width={14} height={14} alt={data?.subtitleTitle || 'icon'} />}
            {data?.subtitleTitle && <span>{data?.subtitleTitle}</span>}
          </div>
          {data?.title && (
            <div className="font-display font-bold text-text-primary">
              <h1 className="max-w-3xl mb-12 text-48 leading-[1.15] [&_strong]:text-brand-blue [&_strong]:font-[inherit]">
                {data?.title && <MarkdownText markdown={data?.title} />}
              </h1>
            </div>
          )}
          <div className="w-full max-w-200 mx-auto">
            <div className="relative group">
              <input
                type="text"
                className="w-full bg-white border border-brand-subtle rounded-full py-5 px-10 pr-20 text-xl text-text-secondary focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue/30 transition-all placeholder:text-text-accent/30 shadow-2xl shadow-brand-dark/5"
                placeholder={placeholderText}
              />
              <button className="absolute right-2.5 top-1/2 -translate-y-1/2 w-14 h-14 bg-text-primary text-white rounded-full flex items-center justify-center hover:bg-brand-hover active:bg-brand-pressed transition-all shadow-md">
                <ArrowRight size={24} />
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-2.5 mt-8">
              {shortcuts.map((shortcut) => (
                <button
                  key={shortcut}
                  onClick={() => setActiveShortcut(shortcut)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all shadow-sm border whitespace-nowrap ${
                    activeShortcut === shortcut
                      ? "bg-brand-blue text-white border-brand-blue scale-105"
                      : "bg-white text-text-secondary/50 border-brand-subtle hover:border-brand-blue/30 hover:text-brand-blue"
                  }`}
                >
                  {shortcut}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
