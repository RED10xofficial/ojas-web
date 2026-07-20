"use client";

import { motion } from "motion/react";
import { Play } from "lucide-react";
import ScrollHighlightedText from "./ScrollHighlightedText";
import type { VideoUploadSection as VideoUploadSectionData } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

export default function VideoUploadSection({ data, wrapperClass }: { data?: VideoUploadSectionData; wrapperClass?: string }) {
  const title = data?.title ?? "Watch our Clinical Bio-Intelligence in Action";
  const description = data?.description ?? "Upload your clinical consultation video to witness real-time multi-omic mapping and automated SOAP note generation.";
  const primaryLabel = data?.primaryCta?.title ?? "Upload Clinical Video";
  const secondaryLabel = data?.secondaryCta?.title ?? "View Sample Demo";

  return (
    <section className={cn("relative overflow-hidden pb-16 sm:pb-24", wrapperClass)}>
      <div className="global-container mx-auto">
        <div className="pt-10 border-t border-slate-100 overflow-hidden relative">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full max-w-4xl mx-auto mt-12 bg-brand-subtle/40 border border-dashed border-brand-subtle rounded-2xl p-10 sm:p-16 transition-all hover:border-brand-blue/30 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(26,111,196,0.05),transparent)] pointer-events-none" />
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center text-brand-blue mb-8 group-hover:scale-110 transition-transform duration-500">
                  <div className="absolute inset-0 rounded-full border border-brand-blue/20 animate-ping opacity-20" />
                  <Play size={40} fill="currentColor" className="ml-1" />
                </div>
                <h3 className="text-2xl font-display font-bold text-text-primary mb-4">
                  {title}
                </h3>
                <div className="text-text-secondary text-base max-w-lg mb-10 font-medium">
                  <ScrollHighlightedText text={description} />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="px-8 py-3.5 bg-brand-blue text-white rounded-xl font-bold text-sm shadow-xl shadow-brand-blue/20 hover:bg-brand-hover active:bg-brand-pressed transition-all flex items-center justify-center gap-3">
                    {primaryLabel}
                  </button>
                  <button className="px-8 py-3.5 bg-white border border-brand-subtle text-text-primary rounded-xl font-bold text-sm hover:bg-brand-subtle transition-all">
                    {secondaryLabel}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
