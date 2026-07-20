"use client";

import { motion } from "motion/react";
import { Zap } from "lucide-react";
import type { AccessPointsSection as AccessPointsSectionData } from "@/app/lib/types";
import { getStrapiMedia } from "@/app/lib/strapi";
import { cn } from "@/app/lib/cn";

function AccessCard({ title, science, target, iconUrl }: { title: string; science: string; target: string; iconUrl?: string | null }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="relative overflow-hidden p-6 sm:p-8 rounded-2xl transition-all duration-300 border bg-white border-brand-subtle hover:border-brand-blue/25 hover:shadow-md hover:shadow-brand-blue/5 text-brand-dark cursor-pointer shadow-sm shadow-brand-dark/5"
    >
      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 bg-brand-subtle/50 text-icon-tertiary">
        {iconUrl ? (
          <img src={iconUrl} alt={title} className="w-5 h-5 object-contain" />
        ) : (
          <Zap size={20} />
        )}
      </div>
      <h3 className="text-lg sm:text-xl font-display font-bold mb-3 text-text-primary">{title}</h3>
      <div className="space-y-3">
        <div>
          <p className="text-11 uppercase tracking-widest font-semibold mb-1 text-text-secondary/60">Hard Science</p>
          <p className="text-sm leading-relaxed text-text-secondary">{science}</p>
        </div>
        <div>
          <p className="text-11 uppercase tracking-widest font-semibold mb-1 text-text-secondary/60">Clinical Target</p>
          <p className="text-sm font-medium leading-relaxed text-text-primary">{target}</p>
        </div>
      </div>
    </motion.div>
  );
}

const defaultAccessPoints = [
  { title: "For SAAS Companies", science: "API Call", target: "Datasets & Logic" },
  { title: "For Doctors", science: "Mobile App", target: "Clinical Workbench" },
  { title: "For Hospitals", science: "Browser Console", target: "Enterprise Integration" },
];

export default function AccessPointsSection({ data, wrapperClass }: { data?: AccessPointsSectionData; wrapperClass?: string }) {
  const title = data?.title ?? "Ecosystem Access Points";
  const accessPoints = data?.accessPoints?.map((ap) => ({
    title: ap.title,
    science: ap.science ?? "",
    target: ap.target ?? "",
    iconUrl: getStrapiMedia(ap.icon?.url ?? null),
  })) ?? defaultAccessPoints;

  return (
    <section className={cn("py-16 sm:py-24 bg-bg-page/40", wrapperClass)} id="developer-api">
      <div className="global-container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary">{title}</h2>
          <div className="w-10 h-0.5 bg-brand-blue mx-auto mt-5 rounded-full opacity-40" />
        </div>
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {accessPoints.map((ap) => (
            <AccessCard key={ap.title} {...ap} />
          ))}
        </div>
      </div>
    </section>
  );
}
