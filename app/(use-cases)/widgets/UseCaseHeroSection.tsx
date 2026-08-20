"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { openChatWithQuery } from "@/app/lib/chat";
import { cn } from "@/app/lib/cn";

interface UseCaseHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  phrases: string[];
  wrapperClass?: string;
}

export default function UseCaseHeroSection({
  title,
  subtitle,
  description,
  phrases,
  wrapperClass,
}: UseCaseHeroProps) {
  const [inputValue, setInputValue] = useState("");

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

  /**
   * Hands the prompt to the chat product. Only the typed value is sent — the
   * animated placeholder is mid-cycle most of the time, so the old fallback to
   * it forwarded half-typed fragments like "Does this require urg".
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openChatWithQuery(inputValue);
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
              />
              <button
                type="submit"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-14 h-14 bg-text-primary text-white rounded-full flex items-center justify-center hover:bg-brand-hover active:bg-brand-pressed transition-all shadow-md cursor-pointer"
              >
                <ArrowRight size={24} />
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
      </div>
    </section>
  );
}
