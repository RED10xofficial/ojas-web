"use client";

import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import type { IvfHeroSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";
import { getStrapiMedia } from "@/app/lib/strapi";
import PhotoFrame from "../components/PhotoFrame";
import { resolveCredentials } from "../components/credentials";
import { scrollToApplyForm } from "../components/scrollToApply";

export default function IvfHeroSection({
  data,
  wrapperClass,
}: {
  data?: IvfHeroSection;
  wrapperClass?: string;
}) {
  const title = data?.title ?? "We're Selecting";
  const titleSecondLine = data?.titleSecondLine ?? "20 IVF Centers to Pioneer";
  const titleAccent = data?.titleAccent ?? "AI-Powered Fertility Care.";
  const description =
    data?.description ??
    "Ojas AI improves IVF outcomes with continuous monitoring especially for metabolic patients.";
  const calloutText =
    data?.calloutText ?? "This is a partnership invitation, not a product demo.";
  const buttonText = data?.buttonText ?? "Apply for Early Access";
  const credentials = resolveCredentials(data?.credentials);
  const frameImageUrl = getStrapiMedia(data?.frameImage?.url);

  return (
    <section
      id="hero"
      /* Top padding clears the floating header. */
      className={cn(
        "relative pt-28 pb-12 sm:pt-32 md:pt-36 md:pb-20 overflow-hidden bg-bg-page",
        wrapperClass,
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <PhotoFrame imageUrl={frameImageUrl}>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-24 sm:text-36 md:text-48 lg:text-56 leading-[1.15] font-display font-medium text-text-primary max-w-4xl mx-auto flex flex-col items-center justify-center gap-1 sm:gap-2"
          >
            <span>{title}</span>
            {titleSecondLine && <span>{titleSecondLine}</span>}
            {titleAccent && (
              <span className="text-brand-blue">{titleAccent}</span>
            )}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 sm:mt-6 max-w-2xl mx-auto space-y-3"
          >
            <p className="text-16 sm:text-18 md:text-20 leading-relaxed text-text-secondary font-medium">
              {description}
            </p>
            {calloutText && (
              <p className="text-14 sm:text-16 md:text-18 font-bold leading-relaxed text-white bg-brand-blue px-5 py-2.5 rounded-2xl inline-block shadow-sm">
                {calloutText}
              </p>
            )}
          </motion.div>

          {/* Credential ticker */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 sm:mt-10 relative w-full overflow-hidden py-2"
          >
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-bg-surface to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-bg-surface to-transparent z-10 pointer-events-none" />

            <motion.div
              className="flex w-max items-center gap-3 sm:gap-4 whitespace-nowrap"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            >
              {credentials.map((credential, idx) => (
                <div
                  key={`${credential}-${idx}`}
                  className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white border border-brand-subtle shadow-2xs shrink-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                  <span className="text-12 sm:text-14 md:text-16 font-bold tracking-tight text-text-primary">
                    {credential}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 sm:mt-10 flex justify-center"
          >
            <button
              onClick={scrollToApplyForm}
              className="group w-full sm:w-auto sm:min-w-[380px] flex items-center justify-center gap-2.5 px-8 sm:px-12 py-4 rounded-lg bg-brand-blue hover:bg-brand-hover active:bg-brand-pressed text-white text-16 sm:text-18 font-semibold shadow-md shadow-brand-blue/20 hover:shadow-lg transition-all cursor-pointer"
            >
              <span>{buttonText}</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </PhotoFrame>
      </div>
    </section>
  );
}
