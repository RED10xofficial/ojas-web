"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, X } from "lucide-react";
import Image from "next/image";
import ScrollHighlightedText from "./ScrollHighlightedText";
import type { VideoUploadSection as VideoUploadSectionData } from "@/app/lib/types";
import { getStrapiMedia } from "@/app/lib/strapi";
import { cn } from "@/app/lib/cn";

export default function VideoUploadSection({ data, wrapperClass }: { data?: VideoUploadSectionData; wrapperClass?: string }) {
  const title = data?.title ?? "Watch our Clinical Bio-Intelligence in Action";
  const description = data?.description ?? "Upload your clinical consultation video to witness real-time multi-omic mapping and automated SOAP note generation.";
  const primaryLabel = data?.primaryCta?.title ?? "Upload Clinical Video";
  const secondaryLabel = data?.secondaryCta?.title ?? "View Sample Demo";

  const videoUrl = data?.video?.url ? getStrapiMedia(data.video.url) : null;
  const posterUrl = data?.poster?.url ? getStrapiMedia(data.poster.url) : null;

  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    videoRef.current?.pause();
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  const hasPoster = !!posterUrl;

  return (
    <>
      <section className={cn("relative overflow-hidden pb-16 sm:pb-24", wrapperClass)}>
        <div className="global-container mx-auto">
          <div className="pt-10 border-t border-slate-100 overflow-hidden relative">
            <div className="flex flex-col items-center">
              {hasPoster ? (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="w-full max-w-4xl mx-auto mt-12 bg-brand-subtle/40 border border-dashed border-brand-subtle rounded-2xl p-10 sm:p-16 transition-all hover:border-brand-blue/30 group relative overflow-hidden"
                  onClick={() => videoUrl && setOpen(true)}
                >
                  {/* Poster as background */}
                  <div className="relative aspect-video w-full">
                    {/* Dark overlay + play button */}
                    <div className="absolute inset-0 transition-colors flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white/90 shadow-xl flex items-center justify-center text-brand-blue group-hover:scale-110 transition-transform duration-300">
                        <Play size={36} fill="currentColor" className="ml-1" />
                      </div>
                    </div>
                  </div>
                  {/* Title + description below poster */}
                  <div className="mt-6 text-center">
                    <h3 className="text-2xl font-display font-bold text-text-primary mb-3">
                      {title}
                    </h3>
                    <div className="text-text-secondary text-base max-w-lg mx-auto font-medium">
                      <ScrollHighlightedText text={description} />
                    </div>
                  </div>
                </motion.div>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Video popup modal */}
      <AnimatePresence>
        {open && videoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={close}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={videoRef}
                src={videoUrl}
                poster={posterUrl ?? undefined}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-contain bg-black"
              />
              <button
                onClick={close}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
