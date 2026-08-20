"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Play } from "lucide-react";
import TestimonialSection from "@/app/(home)/widgets/TestimonialSection";
import type { UseCaseVideoSectionData } from "@/app/lib/types";

interface Props {
  section: UseCaseVideoSectionData;
}

export default function UseCaseVideoSection({ section }: Props) {
  return (
    <>
      {/* Section 1: Dashed border video placeholder */}
      <section className="pb-16 sm:pb-24">
        <div className="global-container mx-auto">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full max-w-4xl mx-auto bg-brand-subtle/40 border-2 border-dashed border-brand-subtle rounded-[2.5rem] p-16 transition-all hover:border-brand-blue/30 group relative overflow-hidden text-center"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(26,111,196,0.05),transparent)] pointer-events-none" />
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center text-brand-blue mb-8 group-hover:scale-110 transition-transform duration-500 mx-auto relative">
                  <div className="absolute inset-0 rounded-full border border-brand-blue/20 animate-ping opacity-20" />
                  <Play size={40} fill="currentColor" className="ml-1" />
                </div>
                <h3 className="text-lg sm:text-28 font-display font-medium text-text-primary mb-4">
                  {section.title}
                </h3>
                {section.description && (
                  <p className="text-16 leading-relaxed text-text-secondary max-w-lg mb-10">
                    {section.description}
                  </p>
                )}
                <div className="flex flex-wrap justify-center gap-4">
                  {section.primaryCta && (
                    <Link
                      href={section.primaryCta.url}
                      target={section.primaryCta.newTab ? "_blank" : undefined}
                      rel={section.primaryCta.newTab ? "noopener noreferrer" : undefined}
                      className="px-8 py-4 bg-brand-blue text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md shadow-brand-blue/20 hover:bg-brand-hover active:bg-brand-pressed transition-all flex items-center gap-2 cursor-pointer"
                    >
                      {section.primaryCta.title}
                    </Link>
                  )}
                  {section.secondaryCta && (
                    <Link
                      href={section.secondaryCta.url}
                      target={section.secondaryCta.newTab ? "_blank" : undefined}
                      rel={section.secondaryCta.newTab ? "noopener noreferrer" : undefined}
                      className="px-8 py-4 bg-white border border-brand-subtle text-text-primary rounded-xl text-xs font-bold uppercase tracking-wider hover:border-brand-blue/40 hover:bg-brand-subtle transition-all cursor-pointer"
                    >
                      {section.secondaryCta.title}
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reuses the home testimonial instead of keeping a second copy of the same
          phone-mockup and quote block. This one also actually plays the video, which
          the duplicate never did. */}
      {section.quote && (
        <TestimonialSection
          data={{
            __component: "home-page.home-testimonial-section",
            id: section.id,
            quote: section.quote,
            doctorName: section.quoteAuthor,
            doctorTitle: section.quoteAuthorTitle,
            video: section.video,
            poster: section.poster,
          }}
          wrapperClass="pt-0 pb-16 sm:pb-24 bg-transparent"
        />
      )}
    </>
  );
}
