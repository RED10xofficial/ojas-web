"use client";

import { DollarSign, Heart, Coffee, Compass } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { CareersPerksSection } from "@/app/lib/types";
import { getStrapiMedia } from "@/app/lib/strapi";
import { cn } from "@/app/lib/cn";

/* Fallback glyphs, used only when the CMS entry has no uploaded icon. */
const defaultPerks: {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
}[] = [
  {
    icon: DollarSign,
    iconColor: "text-emerald-400",
    title: "Competitive Pay & Equity",
    description:
      "Top-tier base compensation coupled with stock options so you own a meaningful part of OJAS’s growth.",
  },
  {
    icon: Heart,
    iconColor: "text-rose-400",
    title: "Comprehensive Wellness",
    description:
      "Excellent global medical coverage, health checks, counseling credits, and fitness stipends for you & your loved ones.",
  },
  {
    icon: Coffee,
    iconColor: "text-amber-500",
    title: "Work Your Way",
    description:
      "Robust hybrid & remote schedules, ergonomic workspace setups allowances, and high-performance developer notebooks.",
  },
  {
    icon: Compass,
    iconColor: "text-indigo-400",
    title: "Growth & Learning",
    description:
      "Dedicated stipend for medical journal access, textbooks, research publications, global medical-AI conferences and events.",
  },
];

export default function CareersPerks({
  data,
  wrapperClass,
}: {
  data?: CareersPerksSection;
  wrapperClass?: string;
}) {
  const badgeText = data?.badgeText ?? "Build The Future";
  const title = data?.title ?? "Join Our Team To Build the Future";
  const description =
    data?.description ??
    "We seek builders, computational researchers, and physicians obsessed with systemic bio-intelligence metrics. Solve deep-computational challenges with strict privacy compliance and extreme engineering rigor.";
  /* CMS perks carry an uploaded image; the defaults carry a lucide glyph. */
  const perks = data?.perks?.length
    ? data.perks.map((perk) => ({
        title: perk.title,
        description: perk.description,
        iconUrl: getStrapiMedia(perk.icon?.url),
        Icon: undefined,
        iconColor: undefined,
      }))
    : defaultPerks.map((perk) => ({
        title: perk.title,
        description: perk.description,
        iconUrl: null,
        Icon: perk.icon,
        iconColor: perk.iconColor,
      }));

  return (
    <section className={cn("pb-16 sm:pb-24", wrapperClass)}>
      <div className="global-container mx-auto">
        <div className="w-full flex flex-col items-start">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-widest bg-brand-blue/10 border border-brand-blue/20 px-3 py-1 rounded-full mb-4 inline-block">
            {badgeText}
          </span>
          <h1 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary mb-6">
            {title}
          </h1>
          <p className="text-16 leading-relaxed text-text-secondary font-medium max-w-2xl">
            {description}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
          {perks.map((perk, idx) => {
            const { Icon } = perk;

            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-sm text-left hover:border-brand-blue transition-colors duration-200"
              >
                {perk.iconUrl ? (
                  <div className="mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={perk.iconUrl}
                      alt={perk.title}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                ) : (
                  Icon && (
                    <div className="mb-4">
                      <Icon
                        className={cn(
                          "w-5 h-5",
                          perk.iconColor ?? "text-brand-blue",
                        )}
                      />
                    </div>
                  )
                )}
                <h4 className="text-lg sm:text-28 font-display font-medium text-text-primary mb-2">
                  {perk.title}
                </h4>
                <p className="text-16 leading-relaxed text-text-secondary">
                  {perk.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
