"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { DermaBuiltForCliniciansSection, UseCaseCard } from "@/app/lib/types";
import { getStrapiMedia } from "@/app/lib/strapi";
import { cn } from "@/app/lib/cn";

function DeviceFrame({ useCase }: { useCase: UseCaseCard }) {
  const imageUrl = useCase.image?.url ? getStrapiMedia(useCase.image.url) : null;
  const videoUrl = useCase.video?.url ? getStrapiMedia(useCase.video.url) : null;

  return (
    <div className="relative w-full max-w-[260px] mx-auto group">
      {/* Hardware Buttons */}
      <div className="absolute left-[-8px] top-20 w-[3px] h-8 bg-[#0a0f1d] rounded-l-sm z-10" />
      <div className="absolute left-[-8px] top-32 w-[3px] h-12 bg-[#0a0f1d] rounded-l-sm z-10" />
      <div className="absolute left-[-8px] top-48 w-[3px] h-12 bg-[#0a0f1d] rounded-l-sm z-10" />
      <div className="absolute right-[-8px] top-36 w-[3px] h-16 bg-[#0a0f1d] rounded-r-sm z-10" />

      <div className="w-full aspect-[9/18.5] rounded-[48px] border-[8px] md:border-[10px] border-[#181d2c] bg-slate-950 relative shadow-2xl ring-1 ring-slate-800/10 overflow-hidden">
        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-30 flex items-center justify-between px-3">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-900/80" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#030712] border border-slate-900" />
        </div>

        {/* Screen Content */}
        <div className="absolute inset-0 rounded-[1.25rem] overflow-hidden bg-slate-900">
          {videoUrl ? (
            <video
              src={videoUrl}
              poster={imageUrl ?? undefined}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : imageUrl ? (
            <Image
              src={imageUrl}
              alt={useCase.image?.alternativeText ?? "Use case"}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-slate-600 text-xs">
              No media
            </div>
          )}
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/20 rounded-full z-20" />
      </div>
    </div>
  );
}

export default function BuiltForCliniciansSection({ data, wrapperClass }: { data?: DermaBuiltForCliniciansSection; wrapperClass?: string }) {
  const preheading = data?.preheading ?? "Integrated Platform Ecosystem";
  const sectionTitle = data?.title ?? "Built for Clinicians";
  const description = data?.description ?? "Five specialized clinical capabilities deployed locally or via cloud APIs. Engineered to enhance diagnostic precision and streamline medical workflows.";
  const useCases = data?.useCases ?? [];

  return (
    <section className={cn("py-16 sm:py-24 bg-bg-page/40 global-container mx-auto border-t border-brand-subtle", wrapperClass)}>
      <div className="text-center mb-12 sm:mb-16">
        <p className="text-brand-blue font-medium max-w-2xl mx-auto mb-2">{preheading}</p>
        <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium mb-4 text-text-primary">{sectionTitle}</h2>
        <p className="text-text-secondary max-w-160 mx-auto text-base mb-12 font-medium">
          {description}
        </p>
        <div className="w-10 h-0.5 bg-brand-blue mx-auto mt-5 rounded-full opacity-40" />
      </div>

      {useCases.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {useCases.map((useCase, idx) => (
            <motion.div
              key={useCase.id ?? idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="w-full relative"
            >
              <DeviceFrame useCase={useCase} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
