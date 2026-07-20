"use client";

import { motion } from "motion/react";
import { Play } from "lucide-react";
import ScrollHighlightedText from "./ScrollHighlightedText";
import type { TestimonialSection as TestimonialSectionData } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

export default function TestimonialSection({
  data,
  wrapperClass,
}: {
  data?: TestimonialSectionData;
  wrapperClass?: string;
}) {
  const sectionTitle = data?.title;
  const quote =
    data?.quote ??
    "&quot;Patients and clinicians feel more connected, focused, and fully engaged during every OJAS-powered consultation.&quot;";
  const doctorName = data?.doctorName;
  const doctorTitleText = data?.doctorTitle;
  const videoTitle = data?.videoLabel ?? data?.videoTitle ?? "Patient Consultation";
  const videoSubtitle = data?.videoSubtitle ?? "Bio-Intelligence Interface";

  return (
    <section className={cn("py-16 sm:py-24 bg-white", wrapperClass)}>
      <div className="global-container mx-auto">
        {sectionTitle && (
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary">{sectionTitle}</h2>
            <div className="w-10 h-0.5 bg-brand-blue mx-auto mt-5 rounded-full opacity-40" />
          </div>
        )}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-250 mx-auto">
          <div className="w-full lg:w-75 flex justify-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="aspect-[9/16] w-full max-w-[300px] bg-brand-dark rounded-[2rem] overflow-hidden shadow-2xl relative group border-8 border-slate-50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-dark to-slate-900 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-brand-blue/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  <Play fill="currentColor" size={24} />
                </div>
                <p className="text-white font-bold text-lg mb-2">{videoTitle}</p>
                <p className="text-slate-400 text-xs uppercase tracking-widest">{videoSubtitle}</p>
              </div>

              <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                </div>
                <div className="px-2 py-1 bg-red-500 rounded text-8 font-bold text-white uppercase tracking-wider">
                  REC
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-10 font-bold text-white uppercase tracking-tight">
                      Active Analysis
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "30%" }}
                      animate={{ width: "85%" }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      className="h-full bg-brand-blue"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:flex-1 text-right">
            <div className="w-full max-w-140 mx-auto">
              <motion.h2
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-4xl lg:text-32 font-display font-medium text-text-primary mb-4 leading-tight italic"
              >
                <ScrollHighlightedText text={quote} />
              </motion.h2>
              {(doctorName || doctorTitleText) && (
                <div className="mt-6 text-right">
                  {doctorName && <h4 className="font-extrabold text-text-primary text-base">{doctorName}</h4>}
                  {doctorTitleText && <p className="text-xs text-text-accent font-medium">{doctorTitleText}</p>}
                </div>
              )}
              <div className="w-16 h-1 bg-brand-blue ml-auto mt-10 rounded-full opacity-30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
