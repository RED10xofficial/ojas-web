"use client";

import { motion } from "motion/react";
import type { DeveloperHeroSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

export default function DeveloperHeroSection({
  data,
  wrapperClass,
}: {
  data?: DeveloperHeroSection;
  wrapperClass?: string;
}) {
  const badgeText = data?.badgeText ?? "Glass API";
  const title = data?.title ?? "Developer API";
  const description =
    data?.description ??
    "Build with the most advanced clinical artificial intelligence";
  const primaryText =
    data?.primaryButton?.title ?? "Sign up for a developer account";
  const primaryUrl = data?.primaryButton?.url;
  const separatorText = data?.separatorText ?? "or";
  const secondaryText = data?.secondaryButton?.title ?? "Book a demo";
  const secondaryUrl = data?.secondaryButton?.url;

  const primaryClass =
    "bg-brand-blue hover:bg-brand-hover text-white font-bold text-sm px-8 py-3.5 rounded-xl active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(26,111,196,0.18)]";
  const secondaryClass =
    "bg-white hover:bg-brand-subtle text-brand-blue border border-brand-blue/20 font-bold text-sm px-8 py-3.5 rounded-xl active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-sm";

  return (
    <section className={cn("pb-16 sm:pb-24 pt-35", wrapperClass)}>
      <div className="global-container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold text-brand-blue uppercase tracking-widest bg-brand-blue/10 border border-brand-blue/20 px-3 py-1 rounded-full mb-6 inline-block"
          >
            {badgeText}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-32 lg:text-48 leading-[1.15] font-display font-bold text-text-primary mb-6"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-16 leading-relaxed text-text-secondary font-medium max-w-2xl mx-auto mb-10"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            {primaryUrl ? (
              <a
                href={primaryUrl}
                target={data?.primaryButton?.newTab ? "_blank" : undefined}
                rel={data?.primaryButton?.newTab ? "noopener noreferrer" : undefined}
                className={primaryClass}
              >
                {primaryText}
              </a>
            ) : (
              <button className={primaryClass}>{primaryText}</button>
            )}

            <span className="text-text-secondary text-sm font-bold select-none opacity-50">
              {separatorText}
            </span>

            {secondaryUrl ? (
              <a
                href={secondaryUrl}
                target={data?.secondaryButton?.newTab ? "_blank" : undefined}
                rel={data?.secondaryButton?.newTab ? "noopener noreferrer" : undefined}
                className={secondaryClass}
              >
                {secondaryText}
              </a>
            ) : (
              <button className={secondaryClass}>{secondaryText}</button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
