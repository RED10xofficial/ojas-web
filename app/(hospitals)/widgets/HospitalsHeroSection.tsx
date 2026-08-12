"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import type { HospitalsHeroSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";
import DnaHelixBackground from "../components/DnaHelixBackground";
import { scrollToAssessmentForm } from "../components/scrollToAssessment";
import { resolveTrustBadges } from "../components/trustBadges";

export default function HospitalsHeroSection({
  data,
  wrapperClass,
}: {
  data?: HospitalsHeroSection;
  wrapperClass?: string;
}) {
  const [isPaused, setIsPaused] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const title = data?.title ?? "You Want Healthcare AI Products.";
  const titleAccent = data?.titleAccent ?? "We Build Them.";
  const description =
    data?.description ??
    "Custom clinical AI and medical hardware for healthcare.";
  const calloutText =
    data?.calloutText ??
    "You bring the problem. We deliver the validated solution.";
  const buttonText = data?.buttonText ?? "Get Your Free Assessment";
  const trustBadges = resolveTrustBadges(data?.trustBadges);

  /* Quadrupled so the ticker loops seamlessly at any viewport width. */
  const repeatedBadges = [
    ...trustBadges,
    ...trustBadges,
    ...trustBadges,
    ...trustBadges,
  ];

  return (
    <section
      id="hero"
      className={cn(
        "relative pt-35 pb-16 sm:pb-24 overflow-hidden bg-bg-page",
        wrapperClass,
      )}
    >
      <DnaHelixBackground />

      <div className="global-container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto flex flex-col items-center text-center"
        >
          <h1 className="text-32 sm:text-40 lg:text-48 leading-[1.15] font-display font-bold text-text-primary mb-6">
            <span className="block">{title}</span>
            {titleAccent && (
              <span className="block text-brand-blue mt-1 sm:mt-2">
                {titleAccent}
              </span>
            )}
          </h1>

          <p className="text-16 sm:text-18 leading-relaxed text-text-secondary font-medium max-w-2xl">
            {description}
          </p>

          <p className="mt-5 text-14 sm:text-16 font-bold leading-relaxed text-white bg-brand-blue px-5 py-2.5 rounded-2xl shadow-sm shadow-brand-blue/20">
            {calloutText}
          </p>

          {/* Interactive infinite ticker of credentials */}
          <div className="w-full mt-10 mb-10 overflow-hidden relative py-2">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-bg-page to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-bg-page to-transparent z-10 pointer-events-none" />

            <div
              className="flex whitespace-nowrap overflow-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <motion.div
                className="flex items-center gap-2.5 sm:gap-3 py-1"
                animate={{ x: isPaused ? undefined : [0, "-50%"] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 38,
                    ease: "linear",
                  },
                }}
              >
                {repeatedBadges.map((badge, idx) => {
                  const { Icon } = badge;
                  const isSelected = activeItem === badge.id;

                  return (
                    <motion.button
                      key={`${badge.id}-${idx}`}
                      type="button"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setActiveItem(isSelected ? null : badge.id)}
                      className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shadow-sm",
                        isSelected
                          ? "bg-brand-blue text-white border-brand-blue shadow-md ring-2 ring-brand-blue/20"
                          : "bg-white border-brand-subtle text-text-secondary hover:border-brand-blue/30 hover:text-brand-blue",
                      )}
                    >
                      {badge.iconUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={badge.iconUrl}
                          alt=""
                          className="w-4 h-4 object-contain shrink-0"
                        />
                      ) : (
                        <Icon
                          size={16}
                          className={cn(
                            "shrink-0 transition-colors",
                            isSelected ? "text-white" : "text-brand-blue",
                          )}
                        />
                      )}
                      <span>{badge.label}</span>
                      {isSelected && <Check size={14} className="text-white" />}
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>
          </div>

          <button
            onClick={scrollToAssessmentForm}
            className="w-full sm:w-auto bg-brand-blue hover:bg-brand-hover active:bg-brand-pressed text-white font-bold text-sm px-8 sm:px-12 py-4 rounded-xl flex items-center justify-center gap-2.5 shadow-lg shadow-brand-blue/20 hover:shadow-xl transition-all cursor-pointer group"
          >
            <span>{buttonText}</span>
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
