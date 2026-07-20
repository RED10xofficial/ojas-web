"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight } from "lucide-react";
import type { FaqSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

const defaultFaqs = [
  {
    q: "How does OJAS Derma achieve 97% diagnostic accuracy?",
    a: "It combines neural image classifiers trained on multi-center clinical trials and AIIMS datasets (exceeding 1.2M validated dermoscopic profiles) with epigenomic models that contextualize the cellular timeline of chronic skin conditions.",
  },
  {
    q: "Can I directly map patient photos and biopsy reports concurrently?",
    a: "Yes. OJAS uses a multimodal clinical core capable of combining high-resolution visual feeds (photos/dermoscopy) with raw histopathology and lab biomarkers sequentially for holistic symptom analysis.",
  },
  {
    q: "Is OJAS compliant with global medical software regulations?",
    a: "Absolutely. OJAS is an HIPAA compliant, SOC 2 Type II certified platform that adheres to the European EU AI Act guidelines, US FDA guidelines for medical diagnostic software frameworks, and Indian DPDP and ICMR standards.",
  },
  {
    q: "What training corpus was used for the OJAS Dermatology model?",
    a: "Our model is trained on deeply annotated medical registries including Mayo Clinic benchmarks, AIIMS, and premium dermatology databases matching diverse clinical phototypes across Fitzpatrick skin spectrum classes.",
  },
];

export default function FAQSection({ data, wrapperClass }: { data?: FaqSection; wrapperClass?: string }) {
  const sectionTitle = data?.title ?? "Dermatology FAQ";
  const sectionDescription = data?.description ?? "Get answers regarding custom clinical algorithms, diagnostic accuracies, compliant storage, and integration frameworks.";
  const faqs = data?.faqs?.map((f) => ({ q: f.question, a: f.answer })) ?? defaultFaqs;

  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-24 bg-bg-page global-container mx-auto">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium mb-4 text-text-primary">
          {sectionTitle}
        </h2>
        <p className="text-14 sm:text-base text-text-secondary max-w-2xl mx-auto font-semibold">
          {sectionDescription}
        </p>
        <div className="w-10 h-0.5 bg-brand-blue mx-auto mt-5 rounded-full opacity-40" />
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openFaqIdx === idx;
          return (
            <div key={idx} className={cn("border-b border-brand-subtle bg-bg-surface rounded-2xl p-5 shadow-sm transition-all", wrapperClass)}>
              <button
                onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-display font-extrabold text-[#1A3A58] text-[15px] hover:text-brand-blue transition-colors uppercase leading-snug">
                  {faq.q}
                </span>
                <ChevronRight size={18} className={`transform transition-transform text-brand-blue shrink-0 ${isOpen ? "rotate-90" : ""}`} />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden mt-4"
                  >
                    <p className="text-xs text-text-secondary leading-relaxed font-medium">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
