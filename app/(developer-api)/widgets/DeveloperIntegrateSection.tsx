"use client";

import { motion } from "motion/react";
import type { DeveloperIntegrateSection } from "@/app/lib/types";
import MarkdownText from "@/app/(home)/components/MarkdownText";
import { cn } from "@/app/lib/cn";

export default function DeveloperIntegrateSection({
  data,
  wrapperClass,
}: {
  data?: DeveloperIntegrateSection;
  wrapperClass?: string;
}) {
  const title =
    data?.title ?? "Integrate Clinical-Grade, Evidence-Based Intelligence";
  const buttonText = data?.button?.title ?? "Get started instantly";
  const buttonUrl = data?.button?.url;

  const buttonClass =
    "bg-brand-dark hover:bg-brand-dark/90 text-white font-bold text-sm px-10 py-4 rounded-xl active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-lg";

  return (
    <section className={cn("pb-16 sm:pb-24", wrapperClass)}>
      <div className="global-container mx-auto">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary mb-6"
          >
            {title}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-16 leading-relaxed text-text-secondary font-medium max-w-3xl mb-10 [&_strong]:text-brand-blue [&_strong]:font-bold"
          >
            {data?.description ? (
              <MarkdownText markdown={data.description} />
            ) : (
              <p>
                With the Glass API, you can embed{" "}
                <strong className="text-brand-blue font-bold">
                  clinical-grade, evidence-based AI
                </strong>{" "}
                into your products like electronic health records, telehealth
                platforms, and clinical workflow apps — without the burden of
                building, evaluating, and updating your own clinical AI system.
                Unlock new clinical AI use cases in your workflows including
                triage, patient record summarization, diagnostic support,
                treatment planning, automated documentation, and ambient
                scribing.
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {buttonUrl ? (
              <a
                href={buttonUrl}
                target={data?.button?.newTab ? "_blank" : undefined}
                rel={data?.button?.newTab ? "noopener noreferrer" : undefined}
                className={cn("inline-block", buttonClass)}
              >
                {buttonText}
              </a>
            ) : (
              <button className={buttonClass}>{buttonText}</button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
