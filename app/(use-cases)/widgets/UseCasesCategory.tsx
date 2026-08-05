"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { getStrapiMedia } from "@/app/lib/strapi";
import {
  Activity,
  Microscope,
  ShieldAlert,
  ClipboardList,
  Stethoscope,
  MessageSquare,
  Dna,
  ShieldCheck,
  Sparkles,
  Eye,
  Brain,
  Ear,
  FileText,
  FileSpreadsheet,
  PlusCircle,
  Zap,
  Globe,
  UserCheck,
  TrendingUp,
  Users,
  Heart,
  Droplet,
  Apple,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import type { UseCaseCategoryGroup } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

const iconMap: Record<string, LucideIcon> = {
  Activity,
  Microscope,
  ShieldAlert,
  ClipboardList,
  Stethoscope,
  MessageSquare,
  Dna,
  ShieldCheck,
  Sparkles,
  Eye,
  Brain,
  Ear,
  FileText,
  FileSpreadsheet,
  PlusCircle,
  Zap,
  Globe,
  UserCheck,
  TrendingUp,
  Users,
  Heart,
  Droplet,
  Apple,
  ChevronRight,
};

interface Props {
  category: UseCaseCategoryGroup;
  wrapperClass?: string;
}

export default function UseCasesCategory({ category, wrapperClass }: Props) {
  return (
    <section className={cn("pb-16 sm:pb-24", wrapperClass)}>
      <div className="global-container mx-auto space-y-8 sm:space-y-10">
        {/* Category header */}
        <div className="flex flex-col items-start gap-3 sm:gap-4 border-b border-brand-subtle pb-6 sm:pb-8">
          {category.badge && (
            <span
              className={cn(
                "inline-flex items-center px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest",
                category.badgeColor ||
                  "bg-brand-blue/10 border-brand-blue/20 text-brand-blue",
              )}
            >
              {category.badge}
            </span>
          )}
          <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary">
            {category.title}
          </h2>
          {category.subtitle && (
            <p className="text-16 leading-relaxed text-text-secondary max-w-2xl">
              {category.subtitle}
            </p>
          )}
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {category.items.map((item, index) => {
            const Icon = (item.iconName && iconMap[item.iconName]) || Activity;
            const iconUrl = getStrapiMedia(item.icon?.url);
            return (
              <motion.div
                key={item.slug}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 15 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(index, 5) * 0.05 }}
              >
                <Link
                  href={`/use-cases/${item.slug}`}
                  className="group flex flex-col gap-5 h-full bg-white border border-brand-subtle rounded-[2rem] p-6 sm:p-8 shadow-sm transition-all hover:border-brand-blue/30 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden transition-colors group-hover:bg-brand-blue">
                      {iconUrl ? (
                        <Image
                          src={iconUrl}
                          alt={item.icon?.alternativeText || item.label}
                          width={22}
                          height={22}
                          className="object-contain"
                        />
                      ) : (
                        <Icon
                          size={22}
                          className="text-brand-blue transition-colors group-hover:text-white"
                        />
                      )}
                    </div>
                    <ChevronRight
                      size={18}
                      className="shrink-0 text-text-secondary transition-all group-hover:text-brand-blue group-hover:translate-x-0.5"
                    />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <h3 className="text-lg sm:text-28 font-display font-medium text-text-primary leading-tight">
                      {item.label}
                    </h3>
                    <p className="text-16 leading-relaxed text-text-secondary">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
