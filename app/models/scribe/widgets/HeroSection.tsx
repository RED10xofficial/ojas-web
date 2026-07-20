"use client";

import { motion } from "motion/react";
import type { ScribeHeroSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

export default function HeroSection({
  data,
  wrapperClass,
}: {
  data?: ScribeHeroSection;
  wrapperClass?: string;
}) {
  const statusBadge = data?.statusBadge ?? "Start now";
  const title = data?.title ?? "The Future of Medical AI";
  const subtitle = data?.subtitle;

  return (
    <section
      className={cn("relative pt-32 pb-16 sm:pb-24 overflow-hidden", wrapperClass)}
    >
      <div className="absolute inset-0 -z-10 bg-bg-page opacity-70" />

      <div className="global-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          <div className="mb-2 w-full flex flex-col items-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#6E9080] mb-2 block text-center font-mono animate-pulse">
              {statusBadge}
            </span>
            <h1 className="text-48 font-display font-bold text-text-primary max-w-3xl leading-[1.15] mb-12 text-center">
              {title} <br />
              <span className="text-brand-blue">{subtitle}</span>
            </h1>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
