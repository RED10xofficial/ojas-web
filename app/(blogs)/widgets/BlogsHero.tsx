"use client";

import { motion } from "motion/react";
import type { BlogsHeroSection } from "@/app/lib/types";

interface Props {
  section: BlogsHeroSection;
}

const BlogsHero = ({ section }: Props) => {
  return (
    <section className="pb-16 sm:pb-24">
      <div className="global-container mx-auto">
        {/* Background radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(26,111,196,0.06),transparent_70%)] pointer-events-none -z-10" />

        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {section.badgeText && (
              <span className="text-xs font-bold text-brand-blue uppercase tracking-widest bg-brand-blue/10 border border-brand-blue/20 px-3 py-1 rounded-full mb-6 inline-block">
                {section.badgeText}
              </span>
            )}
            <h1 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary tracking-tight max-w-4xl mx-auto uppercase">
              {section.title}
            </h1>
            {section.description && (
              <p className="text-16 leading-relaxed text-text-secondary max-w-2xl mx-auto">
                {section.description}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlogsHero;
