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
}

export default function UseCasesCategory({ category }: Props) {
  return (
    <section className="pb-16 sm:pb-24">
      <div className="global-container mx-auto space-y-8">
        {/* Category header */}
        <div className="border-b border-brand-subtle pb-6">
          <span
            className={`inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-lg border ${category.badgeColor} mb-4`}
          >
            {category.badge}
          </span>
          <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary mb-3">
            {category.title}
          </h2>
          <p className="text-16 leading-relaxed text-text-secondary max-w-2xl">
            {category.subtitle}
          </p>
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {category.items.map((item, index) => {
            const Icon = (item.iconName && iconMap[item.iconName]) || Activity;
            const iconUrl = getStrapiMedia(item.icon?.url);
            return (
              <motion.div
                key={item.slug}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 15 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  href={`/use-cases/${item.slug}`}
                  className="group flex flex-col gap-4 bg-white border border-brand-subtle rounded-[2rem] p-8 hover:border-brand-blue/30 shadow-sm hover:shadow-lg transition-all h-full"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden group-hover:bg-brand-blue transition-colors">
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
                          className="text-brand-blue group-hover:text-white transition-colors"
                        />
                      )}
                    </div>
                    <ChevronRight
                      size={18}
                      className="text-text-secondary group-hover:text-brand-blue transition-colors mt-1 shrink-0"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg sm:text-28 font-display font-medium text-text-primary leading-snug">
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
