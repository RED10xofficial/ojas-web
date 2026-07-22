"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ArrowRight } from "lucide-react";
import type { FaqSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

function FAQItem({ question, answer, defaultOpen = false }: { question: string; answer: string; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-black/10">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-6 flex items-center justify-between text-left group">
        <span className="font-display font-semibold md:text-lg text-text-primary group-hover:text-brand-hover transition-colors">{question}</span>
        <div className={`transform transition-transform duration-300 ${isOpen ? "rotate-90 text-brand-blue" : "text-text-accent opacity-50"}`}>
          <ChevronRight size={20} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
            <p className="text-text-secondary pb-6 text-sm leading-relaxed max-w-2xl font-medium">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const defaultFaqs = [
  { question: "How does OJAS ensure clinical accuracy?", answer: "OJAS uses a multi-modal biological transformer (OOM-1) trained on validated clinical datasets and millions of peer-reviewed medical papers. It cross-references symptoms with multi-omic biomarkers to provide root-cause analysis rather than simple pattern recognition." },
  { question: "Is patient data secure and HIPAA compliant?", answer: "Security is non-negotiable. OJAS is built on enterprise-grade infrastructure with SOC2 Type II compliance and HIPAA-secure data vaults. All biological data is encrypted at rest and in transit, with strict residency controls." },
  { question: "Can OJAS integrate with my existing EMR/EHR?", answer: "Yes, our Clinical Pro and Enterprise tiers support native integration with major EMR systems via secure APIs, allowing for seamless data sync and automated SOAP note drafting directly into your existing charts." },
  { question: "What makes the 'Vedic Mapping' unique?", answer: "Vedic Mapping combines time-tested Ayurvedic principles of constitution/lifestyle with modern epigenomics. This allows OJAS to identify subtle physiological imbalances before they manifest as chronic clinical symptoms." },
];

export default function FAQSection({ data, wrapperClass }: { data?: FaqSection; wrapperClass?: string }) {
  const title = data?.title ?? "Frequently Asked Questions";
  const description = data?.description ?? "Everything you need to know about OJAS Bio-Intelligence, clinical data safety, and integration.";
  const supportTitle = data?.supportTitle ?? "Still have questions?";
  const supportDescription = data?.supportDescription ?? "Can't find the answer you're looking for? Please chat with our clinical support team.";
  const supportButtonText = data?.supportButtonText ?? "Contact Support";
  const faqs = data?.faqs ?? defaultFaqs;

  return (
    <section className={cn("py-16 sm:py-24 bg-bg-page", wrapperClass)}>
      <div className="global-container mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary mb-4">{title}</h2>
            <p className="text-text-secondary mb-8 font-medium">{description}</p>
            <div className="p-6 bg-brand-subtle/50 rounded-2xl border border-brand-subtle">
              <p className="text-sm font-bold text-text-primary mb-2">{supportTitle}</p>
              <p className="text-sm text-text-secondary mb-4">{supportDescription}</p>
              <button className="text-sm font-bold text-brand-blue hover:text-brand-hover flex items-center gap-1 transition-colors">{supportButtonText} <ArrowRight size={14} /></button>
            </div>
          </div>
          <div className="lg:col-span-3 border-t border-black/10">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} defaultOpen={idx === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
