"use client";

import { motion } from "motion/react";
import type { IvfMarqueeSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";
import { resolveCredentials } from "../components/credentials";

export default function IvfMarqueeSection({
  data,
  wrapperClass,
}: {
  data?: IvfMarqueeSection;
  wrapperClass?: string;
}) {
  const credentials = resolveCredentials(data?.credentials);

  return (
    <section
      className={cn(
        "py-10 sm:py-14 bg-bg-surface border-y border-brand-subtle overflow-hidden",
        wrapperClass,
      )}
    >
      <div className="relative w-full overflow-hidden py-2">
        {/* Gradient fades on the edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-bg-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-bg-surface to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex w-max items-center gap-4 sm:gap-6 whitespace-nowrap"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {credentials.map((credential, idx) => (
            <div
              key={`${credential}-${idx}`}
              className="flex items-center gap-3 px-5 py-2.5 sm:px-6 sm:py-3 bg-white border border-brand-subtle rounded-xl shadow-2xs hover:border-brand-blue transition-colors shrink-0"
            >
              <span className="w-2 h-2 rounded-full bg-brand-blue" />
              <span className="text-14 sm:text-16 md:text-18 font-bold tracking-tight text-text-primary">
                {credential}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
