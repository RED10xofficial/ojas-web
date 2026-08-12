"use client";

import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import type { HospitalsTrustBarSection } from "@/app/lib/types";
import MarkdownText from "@/app/(home)/components/MarkdownText";
import { cn } from "@/app/lib/cn";

const defaultPartners = [
  "TATA",
  "Google",
  "Mercedes-Benz",
  "Vedanta",
  "Indian Army",
  "Indian Navy",
  "Lenskart",
  "AIIMS Delhi",
];

export default function HospitalsTrustBarSection({
  data,
  wrapperClass,
}: {
  data?: HospitalsTrustBarSection;
  wrapperClass?: string;
}) {
  const title = data?.title ?? "Built For and Trusted By";
  const calloutText =
    data?.calloutText ??
    "AIIMS-validated AI models. Google clinical research partner. Fortune 500 clients. Defence deployments. 600+ institutions served with **90%+ retention.**";

  const partners = data?.partners?.length
    ? data.partners.map((partner) => partner.title)
    : defaultPartners;

  /* Doubled twice: the marquee shifts by -50%, so it needs an even multiple. */
  const marqueePartners = [...partners, ...partners, ...partners, ...partners];

  return (
    <section
      className={cn(
        "py-16 sm:py-24 bg-bg-surface border-y border-brand-subtle overflow-hidden",
        wrapperClass,
      )}
    >
      <div className="global-container mx-auto text-center mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary"
        >
          {title}
        </motion.h2>
      </div>

      {/* Marquee */}
      <div className="relative w-full overflow-hidden py-2">
        {/* Gradient fades on the edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-bg-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-bg-surface to-transparent z-10 pointer-events-none" />

        <div className="flex w-max items-center gap-4 sm:gap-6 animate-scroll hover:[animation-play-state:paused]">
          {marqueePartners.map((partner, idx) => (
            <div
              key={`${partner}-${idx}`}
              className="flex items-center gap-2.5 px-5 py-2.5 bg-white border border-brand-subtle rounded-xl whitespace-nowrap shadow-sm hover:border-brand-blue/30 transition-colors"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              <span className="text-sm sm:text-base font-bold tracking-tight text-text-primary">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Callout line */}
      <div className="global-container mx-auto mt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 16 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto bg-white border border-brand-subtle rounded-2xl p-6 sm:p-8 shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-11 h-11 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0">
              <CheckCircle2 size={20} className="text-brand-blue" />
            </div>
            <p className="text-16 sm:text-20 leading-[1.5] text-text-secondary font-semibold [&_strong]:text-brand-blue [&_strong]:font-bold">
              <MarkdownText markdown={calloutText} />
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
