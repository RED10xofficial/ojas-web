"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ArrowRight } from "lucide-react";
import type { PricingFaqSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

const defaultFaqs = [
  {
    question: "How does OJAS ensure clinical accuracy?",
    answer: "OJAS uses a multi-modal biological transformer (OOM-1) trained on validated clinical datasets and millions of peer-reviewed medical papers. It cross-references symptoms with multi-omic biomarkers to provide root-cause analysis rather than simple pattern recognition.",
  },
  {
    question: "Is patient data secure and HIPAA compliant?",
    answer: "Security is non-negotiable. OJAS is built on enterprise-grade infrastructure with SOC2 Type II compliance and HIPAA-secure data vaults. All biological data is encrypted at rest and in transit, with strict residency controls.",
  },
  {
    question: "Can OJAS integrate with my existing EMR/EHR?",
    answer: "Yes, our Clinical Pro and Enterprise tiers support native integration with major EMR systems via secure APIs, allowing for seamless data sync and automated SOAP note drafting directly into your existing charts.",
  },
  {
    question: "What makes the 'Vedic Mapping' unique?",
    answer: "Vedic Mapping combines time-tested Ayurvedic principles of constitution/lifestyle with modern epigenomics. This allows OJAS to identify subtle physiological imbalances before they manifest as chronic clinical symptoms.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-brand-subtle last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group focus:outline-none cursor-pointer"
      >
        <span className="font-display font-medium text-text-primary group-hover:text-brand-blue transition-colors text-lg">
          {question}
        </span>
        <div className={`transform transition-transform duration-300 shrink-0 ml-4 ${isOpen ? "rotate-90 text-brand-blue" : "text-text-accent opacity-50"}`}>
          <ChevronRight size={18} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-16 leading-relaxed text-text-secondary pb-6 max-w-2xl font-medium">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PricingFAQSection({
  data,
  wrapperClass,
}: {
  data?: PricingFaqSection;
  wrapperClass?: string;
}) {
  const badgeText = data?.badgeText ?? "FAQ";
  const title = data?.title ?? "Pricing & Safety FAQ";
  const description =
    data?.description ??
    "Answers to questions regarding subscriptions, billing tiers, deployment protocols, and core data compliance.";
  const supportTitle = data?.supportTitle ?? "Custom deployment?";
  const supportDescription =
    data?.supportDescription ??
    "We offer custom server-side hosting, data localization, and dedicated hospital-wide EMR integrations.";
  const supportButtonText = data?.supportButtonText ?? "Contact Hospital Support";
  const supportButtonUrl = data?.supportButtonUrl;
  const faqs = data?.faqs?.length ? data.faqs : defaultFaqs;

  return (
    <section className={cn("py-16 sm:py-24", wrapperClass)}>
      <div className="global-container mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest bg-brand-blue/10 border border-brand-blue/20 px-3 py-1 rounded-full mb-4 inline-block">
              {badgeText}
            </span>
            <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary mt-2 mb-4">
              {title}
            </h2>
            <p className="text-16 leading-relaxed text-text-secondary font-medium mb-8">
              {description}
            </p>
            <div className="p-6 bg-brand-subtle/50 rounded-2xl border border-brand-subtle">
              <p className="text-sm font-bold text-text-primary mb-2">{supportTitle}</p>
              <p className="text-sm leading-relaxed text-text-secondary mb-4">
                {supportDescription}
              </p>
              {supportButtonUrl ? (
                <a
                  href={supportButtonUrl}
                  className="text-xs font-bold text-brand-blue hover:text-brand-hover flex items-center gap-1 transition-colors uppercase tracking-wider cursor-pointer"
                >
                  {supportButtonText} <ArrowRight size={12} />
                </a>
              ) : (
                <button className="text-xs font-bold text-brand-blue hover:text-brand-hover flex items-center gap-1 transition-colors uppercase tracking-wider cursor-pointer">
                  {supportButtonText} <ArrowRight size={12} />
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-3 divide-y divide-brand-subtle">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
