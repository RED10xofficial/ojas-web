"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Zap, ArrowRight } from "lucide-react";
import type { ModelsSection as ModelsSectionData } from "@/app/lib/types";
import { getStrapiMedia } from "@/app/lib/strapi";
import { cn } from "@/app/lib/cn";

function SpecialtyCard({
  title,
  science,
  target,
  iconUrl,
  href,
  comingSoon = false,
}: {
  title: string;
  science: string;
  target: string;
  iconUrl?: string | null;
  href: string;
  comingSoon?: boolean;
}) {
  const content = (
    <motion.div
      whileHover={comingSoon ? {} : { y: -4 }}
      className={`relative overflow-hidden p-6 sm:p-8 rounded-2xl transition-all duration-300 border ${
        comingSoon
          ? "bg-slate-50/50 border-slate-100 opacity-80 cursor-not-allowed"
          : "bg-white border-brand-subtle hover:border-brand-blue/25 hover:shadow-md hover:shadow-brand-blue/5 text-brand-dark cursor-pointer"
      } shadow-sm shadow-brand-dark/5`}
    >
      {comingSoon && (
        <div className="absolute top-0 right-0 px-6 py-2.5 bg-brand-blue/10 text-brand-blue text-11 font-black uppercase tracking-widest rounded-bl-xl z-10 border-l border-b border-brand-blue/10">
          coming soon
        </div>
      )}
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-colors ${
          comingSoon
            ? "bg-brand-subtle text-icon-tertiary"
            : "bg-brand-subtle/50 text-icon-tertiary"
        }`}
      >
        {iconUrl ? (
          <img src={iconUrl} alt={title} className="w-5 h-5 object-contain" />
        ) : (
          <Zap size={20} />
        )}
      </div>
      <h3 className="text-lg sm:text-xl font-display font-bold mb-3 text-text-primary">
        {title}
      </h3>
      <div className="space-y-3">
        <div>
          <p className="text-11 uppercase tracking-widest font-semibold mb-1 text-text-secondary/60">
            Hard Science
          </p>
          <p className="text-sm leading-relaxed text-text-secondary">{science}</p>
        </div>
        <div>
          <p className="text-11 uppercase tracking-widest font-semibold mb-1 text-text-secondary/60">
            Clinical Target
          </p>
          {comingSoon ? (
            <span className="inline-block mt-1 px-4 py-1.5 bg-brand-blue text-white text-11 font-black uppercase tracking-widest rounded-lg shadow-md shadow-brand-blue/30">
              Join the early access
            </span>
          ) : (
            <p className="text-sm font-medium text-text-primary">{target}</p>
          )}
        </div>
      </div>
    </motion.div>
  );

  if (comingSoon) return content;
  return <Link href={href} className="w-full flex flex-col">{content}</Link>;
}

const defaultModels = [
  {
    title: "Dermatology",
    science: "Cellular Epigenomics",
    target: "Chronic Eczema, Psoriasis",
    href: "/models/dermatology",
  },
  {
    title: "Scribe",
    science: "Ambient Clinical Dictation",
    target: "Automated SOAP Notes Engine",
    href: "/models/scribe",
  },
  {
    title: "Gynecology",
    science: "Hormone Biomarkers",
    target: "PCOS, Endocrine Balance",
    href: "/models/gynecology",
  },
  {
    title: "Nutrition",
    science: "Microbiome Sequencing",
    target: "Disease Reversal Pathways",
    href: "/models/nutrition",
  },
  {
    title: "Oncology",
    science: "Genomic Instability",
    target: "Coming Soon",
    href: "#",
    comingSoon: true,
  },
  {
    title: "Ophthalmology",
    science: "Neural Mapping",
    target: "Coming Soon",
    href: "#",
    comingSoon: true,
  },
  {
    title: "STDs",
    science: "Viral Pathogenesis",
    target: "Coming Soon",
    href: "#",
    comingSoon: true,
  },
  {
    title: "Endocrinology",
    science: "Metabolic Signaling",
    target: "Coming Soon",
    href: "#",
    comingSoon: true,
  },
  {
    title: "Nephrology",
    science: "Renal Proteomics",
    target: "Coming Soon",
    href: "#",
    comingSoon: true,
  },
  {
    title: "Cardiology",
    science: "Cardiac Biomarkers",
    target: "Coming Soon",
    href: "#",
    comingSoon: true,
  },
  {
    title: "Pathology",
    science: "Cellular Morphology",
    target: "Coming Soon",
    href: "#",
    comingSoon: true,
  },
  {
    title: "Gastroenterology",
    science: "Gut Microbiome",
    target: "Coming Soon",
    href: "#",
    comingSoon: true,
  },
];

export default function ModelsSection({
  data,
  wrapperClass,
}: {
  data?: ModelsSectionData;
  wrapperClass?: string;
}) {
  const title = data?.title ?? "Expert Foundation Models";
  const description =
    data?.description ??
    "Select a vertical to activate the clinical transformer architecture";
  const ctaLabel = data?.cta?.title;

  const models =
    data?.models?.map((m) => ({
      title: m.title,
      science: m.science ?? "",
      target: m.target ?? "",
      iconUrl: getStrapiMedia(m.icon?.url ?? null),
      href: m.href ?? "#",
      comingSoon: m.comingSoon ?? false,
    })) ?? defaultModels;

  return (
    <section
      className={cn("py-16 sm:py-24 bg-bg-page/20", wrapperClass)}
      id="models"
    >
      <div className="global-container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium mb-4 text-text-primary">
            {title}
          </h2>
          <p className="text-14 sm:text-base text-text-secondary max-w-2xl mx-auto opacity-70">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap -m-2 justify-center">
          {models.map((m) => (
            <div key={m.title} className="w-full sm:w-1/2 lg:w-1/4 p-2">
              <SpecialtyCard {...m} />
            </div>
          ))}
        </div>
        {ctaLabel && (
          <div className="mt-16 text-center">
            <button className="bg-brand-blue text-white font-display font-bold px-10 py-4 rounded-2xl hover:bg-brand-hover active:bg-brand-pressed transition-all shadow-xl shadow-brand-blue/20 flex items-center gap-3 mx-auto">
              {ctaLabel}
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
