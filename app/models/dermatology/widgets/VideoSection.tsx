"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, X } from "lucide-react";
import Image from "next/image";
import type { DermaVideoSection } from "@/app/lib/types";
import { getStrapiMedia } from "@/app/lib/strapi";
import { cn } from "@/app/lib/cn";

export default function VideoSection({ data, wrapperClass }: { data?: DermaVideoSection; wrapperClass?: string }) {
  const title = data?.title ?? "Clinical Live Simulation Environment";
  const videoTitle = data?.videoTitle ?? "Integrative Dermatology Demo";
  const videoDescription = data?.videoDescription ?? "Experience the OOM-1 cellular medical mapping transformer. Real-world dermoscopy image feeds translated to deep biological markers and SOAP notes.";
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

  return (
    <>
      <section className={cn("py-16 bg-bg-page/50 global-container mx-auto", wrapperClass)}>
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium mb-4 text-text-primary">{title}</h2>
          <div className="w-10 h-0.5 bg-brand-blue mx-auto mt-5 rounded-full opacity-40" />
        </div>
        <div
          className={cn(
            "w-full max-w-4xl mx-auto aspect-video rounded-3xl bg-brand-dark/95 border-4 border-brand-subtle shadow-xl relative overflow-hidden group flex flex-col justify-center items-center text-center p-8",
            videoUrl && "cursor-pointer",
          )}
          onClick={() => videoUrl && setOpen(true)}
        >
          {posterUrl && (
            <Image
              src={posterUrl}
              alt={data?.poster?.alternativeText ?? title}
              fill
              className="object-cover"
              unoptimized
            />
          )}
          <div className="absolute inset-0 bg-linear-to-tr from-brand-dark/60 via-brand-dark/50 to-slate-900/60 pointer-events-none" />
          <div className="p-8 relative z-10">
            <div className="w-20 h-20 rounded-full bg-brand-blue flex items-center justify-center text-white mb-6 animate-pulse hover:scale-110 active:scale-95 transition-all mx-auto shadow-lg shadow-brand-blue/40">
              <Play size={36} fill="currentColor" className="ml-1" />
            </div>
            <h3 className="text-white text-xl md:text-2xl font-display font-bold mb-3">{videoTitle}</h3>
            <p className="text-white/60 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
              {videoDescription}
            </p>
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
