"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { getStrapiMedia } from "@/app/lib/strapi";
import {
  Activity,
  Brain,
  Users,
  Apple,
  Dna,
  Eye,
  ShieldAlert,
  Zap,
  Droplet,
  Heart,
  Microscope,
  TrendingUp,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import type { ModelsGridSection, ModelAccent } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

const iconMap: Record<string, LucideIcon> = {
  Activity,
  Brain,
  Users,
  Apple,
  Dna,
  Eye,
  ShieldAlert,
  Zap,
  Droplet,
  Heart,
  Microscope,
  TrendingUp,
};

/** Accent tokens rather than raw gradients, so the CMS stores intent. */
const ACCENTS: Record<ModelAccent, string> = {
  blue: "from-blue-500/10 to-teal-500/10 text-blue-600",
  indigo: "from-indigo-500/10 to-purple-500/10 text-indigo-600",
  emerald: "from-emerald-500/10 to-teal-500/10 text-emerald-600",
  amber: "from-amber-500/10 to-orange-500/10 text-amber-600",
  rose: "from-rose-500/10 to-red-500/10 text-rose-600",
  purple: "from-purple-500/10 to-fuchsia-500/10 text-purple-600",
  teal: "from-teal-500/10 to-cyan-500/10 text-teal-600",
  slate: "from-slate-500/10 to-slate-400/10 text-slate-600",
};

export default function ModelsGrid({ section }: { section: ModelsGridSection }) {
  const models = section.models ?? [];

  if (models.length === 0) return null;

  return (
    <section className={cn("pb-16 sm:pb-24", section.wrapperClass)}>
      <div className="global-container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map((model, idx) => {
            const Icon = (model.iconName && iconMap[model.iconName]) || Activity;
            const accent = ACCENTS[model.accent ?? "blue"];
            const iconUrl = getStrapiMedia(model.icon?.url);

            return (
              <motion.div
                key={model.id}
                id={model.anchorId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.05 }}
                className="bg-white rounded-[2rem] border border-brand-subtle hover:border-brand-blue/30 shadow-sm hover:shadow-xl hover:shadow-brand-dark/5 p-8 transition-all duration-300 flex flex-col justify-between group scroll-mt-28"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden bg-gradient-to-br ${accent}`}
                    >
                      {iconUrl ? (
                        <Image
                          src={iconUrl}
                          alt={model.icon?.alternativeText || model.name}
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      ) : (
                        <Icon size={24} />
                      )}
                    </div>
                    {model.tag && (
                      <span className="text-11 font-bold uppercase tracking-widest text-text-secondary bg-slate-50 px-3 py-1 rounded-full border border-brand-subtle">
                        {model.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-28 font-display font-medium text-text-primary mb-5 leading-tight group-hover:text-brand-blue transition-colors">
                    {model.name}
                  </h3>

                  <div className="space-y-4 mb-8">
                    {model.science && (
                      <div>
                        <p className="text-11 uppercase tracking-widest font-semibold text-text-accent mb-1 font-mono">
                          {section.scienceLabel || "Hard Science"}
                        </p>
                        <p className="text-16 leading-relaxed text-text-secondary">
                          {model.science}
                        </p>
                      </div>
                    )}
                    {model.target && (
                      <div>
                        <p className="text-11 uppercase tracking-widest font-semibold text-text-accent mb-1 font-mono">
                          {section.targetLabel || "Clinical Target"}
                        </p>
                        <p className="text-16 leading-relaxed text-text-secondary">
                          {model.target}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {model.actionUrl ? (
                  <Link
                    href={model.actionUrl}
                    className="w-full py-3.5 px-4 bg-slate-50 hover:bg-brand-blue hover:text-white hover:border-brand-blue rounded-xl text-xs font-bold uppercase tracking-wider text-text-primary transition-all flex items-center justify-center gap-2 cursor-pointer border border-brand-subtle"
                  >
                    <span>{model.actionLabel || "Explore Model"}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  /* No destination yet — show the status rather than a dead link. */
                  <span className="w-full py-3.5 px-4 bg-slate-50/60 rounded-xl text-xs font-bold uppercase tracking-wider text-text-accent flex items-center justify-center gap-2 border border-brand-subtle/60 select-none">
                    {model.actionLabel || "Coming Soon"}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
