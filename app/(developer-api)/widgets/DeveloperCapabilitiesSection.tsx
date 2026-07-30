"use client";

import { motion } from "motion/react";
import type { DeveloperCapabilitiesSection } from "@/app/lib/types";
import { getStrapiMedia } from "@/app/lib/strapi";
import { cn } from "@/app/lib/cn";

const defaultCapabilities = [
  {
    title: "Evidence-Based Q&A",
    description:
      "Ask any clinical question and receive authoritative answers backed by the latest guidelines, trials, and medical resources in seconds.",
  },
  {
    title: "Patient Data Summarization",
    description:
      "Generate concise, structured summaries of EHR data — notes, labs, imaging, medications, and patient history.",
  },
  {
    title: "Differential Diagnosis Generator",
    description:
      "Expand diagnostic thinking with AI-ranked differentials and recommended diagnostic next steps.",
  },
  {
    title: "Treatment Plan Generator",
    description:
      "Craft guideline-aligned management plans tailored to individual patient context and comorbidities.",
  },
  {
    title: "Documentation Generation",
    description:
      "Create comprehensive clinical documentation — progress notes, discharge summaries, referrals, prior authorization letters, insurance appeals, and more.",
  },
  {
    title: "Ambient Scribing",
    description:
      "Generate diarized transcripts and structured clinical documentation from encounter audio through the Scribing API endpoint.",
  },
];

export default function DeveloperCapabilitiesSection({
  data,
  wrapperClass,
}: {
  data?: DeveloperCapabilitiesSection;
  wrapperClass?: string;
}) {
  const badgeText = data?.badgeText ?? "Core Capabilities";
  const title = data?.title ?? "Agentic AI Architecture";
  const description =
    data?.description ??
    "OJAS is a large language model-based AI agent powered by sophisticated medical knowledge retrieval to deliver trustworthy, accurate, evidence-based responses. Purpose-built for healthcare — processing clinical queries, analyzing patient data, and returning guideline-aligned recommendations with cited sources.";

  const capabilities = data?.capabilities?.length
    ? data.capabilities.map((cap) => ({
        title: cap.title,
        description: cap.description,
        iconUrl: getStrapiMedia(cap.icon?.url),
      }))
    : defaultCapabilities.map((cap) => ({ ...cap, iconUrl: null }));

  return (
    <section className={cn("pb-16 sm:pb-24", wrapperClass)}>
      <div className="global-container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-2 border-brand-blue bg-gradient-to-br from-brand-blue to-brand-pressed rounded-[2rem] p-8 sm:p-12 shadow-2xl text-left text-white relative overflow-hidden"
        >
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="relative z-10 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#9ec5f5] mb-4 inline-block">
              {badgeText}
            </span>
            <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-white">
              {title}
            </h2>
            <p className="text-16 leading-relaxed text-brand-subtle/90 max-w-3xl mt-4">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="border border-white/20 bg-white/5 backdrop-blur-sm rounded-[1.25rem] p-6 sm:p-7 hover:bg-white/10 transition-all duration-300 group"
              >
                {cap.iconUrl && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={cap.iconUrl}
                    alt={cap.title}
                    className="w-8 h-8 object-contain mb-3"
                  />
                )}
                <h4 className="text-lg sm:text-28 font-display font-medium text-white mb-2 group-hover:text-brand-subtle transition-colors">
                  {cap.title}
                </h4>
                <p className="text-16 leading-relaxed text-brand-subtle/80">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
