"use client";

import { ShieldCheck } from "lucide-react";
import type { DeveloperMarqueeSection } from "@/app/lib/types";
import { getStrapiMedia } from "@/app/lib/strapi";
import { cn } from "@/app/lib/cn";

const defaultBadges = [
  "DPDP Compliances",
  "Build in Google",
  "Trained on AIIMS data",
  "ISO Certified",
];
const defaultPartners = [
  "AIIMS",
  "Google",
  "Mayo Clinic",
  "JJ Hospital",
  "Medanta",
  "Kokilaben Dhirubhai Ambani Hospital",
  "Jupiter Hospital",
  "Fortis Hospitals",
];

export default function DeveloperMarqueeSection({
  data,
  wrapperClass,
}: {
  data?: DeveloperMarqueeSection;
  wrapperClass?: string;
}) {
  /* CMS badges may carry an uploaded icon; defaults fall back to a lucide glyph. */
  const badges = data?.badges?.length
    ? data.badges.map((badge) => ({
        title: badge.title,
        iconUrl: getStrapiMedia(badge.icon?.url),
      }))
    : defaultBadges.map((title) => ({ title, iconUrl: null }));

  const partners = data?.partners?.length
    ? data.partners.map((partner) => partner.title)
    : defaultPartners;

  return (
    <section className={cn("pb-16 sm:pb-24 border-b border-brand-subtle/15", wrapperClass)}>
      <div className="global-container mx-auto overflow-hidden">
        {/* Compliance badges — reverse scroll */}
        <div className="w-full relative flex overflow-hidden mb-8">
          <div className="flex gap-20 items-center whitespace-nowrap animate-scroll-reverse py-2">
            {[...badges, ...badges, ...badges].map((badge, i) => (
              <div key={i} className="flex items-center gap-3 font-display font-bold text-brand-blue/60 text-lg sm:text-xl">
                {badge.iconUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={badge.iconUrl}
                    alt={badge.title}
                    className="w-5 h-5 object-contain shrink-0"
                  />
                ) : (
                  <ShieldCheck size={20} />
                )}
                {badge.title}
              </div>
            ))}
          </div>
        </div>

        {/* Partner names — forward scroll */}
        <div className="w-full relative flex overflow-hidden">
          <div className="flex gap-16 items-center whitespace-nowrap animate-scroll py-2">
            {[...partners, ...partners].map((name, i) => (
              <div key={i} className="flex items-center gap-2 font-display font-semibold text-text-primary text-lg sm:text-xl">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue/40 shrink-0" />
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
