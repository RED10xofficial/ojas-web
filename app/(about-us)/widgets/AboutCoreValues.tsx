"use client";

import { Award, ShieldCheck, Activity, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AboutCoreValuesSection } from "@/app/lib/types";
import { getStrapiMedia } from "@/app/lib/strapi";
import { cn } from "@/app/lib/cn";

/* Fallback glyphs, used only when the CMS entry has no uploaded icon. */
const defaultValues: {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
}[] = [
  {
    icon: Award,
    iconColor: "text-brand-blue",
    title: "Clinical Rigor First",
    description:
      "We do not believe in AI-generated advice unless it is deeply vetted against peer-reviewed medical journals and gold-standard trials.",
  },
  {
    icon: ShieldCheck,
    iconColor: "text-emerald-400",
    title: "Biomedical Sovereignty",
    description:
      "Sovereignty of patient data is our highest commitment. Every system operates on zero-retention policies with HIPAA, SOC2 compliance.",
  },
  {
    icon: Activity,
    iconColor: "text-purple-400",
    title: "Root-Cause Intelligence",
    description:
      "Going beyond superficial transcriptions. We analyze multi-omic, clinical, and physiological stress profiles to discover underlying core pathology.",
  },
  {
    icon: Heart,
    iconColor: "text-rose-400",
    title: "Humanistic Empathy",
    description:
      "AI is a partner to the clinician, not a replacement. We construct interfaces that minimize cognitive load so healers can relate better to patients.",
  },
];

export default function AboutCoreValues({
  data,
  wrapperClass,
}: {
  data?: AboutCoreValuesSection;
  wrapperClass?: string;
}) {
  const badgeText = data?.badgeText ?? "THE GUILD CODE";
  const title = data?.title ?? "Values That Command Safety";
  /* CMS values carry an uploaded image; the defaults carry a lucide glyph. */
  const values = data?.values?.length
    ? data.values.map((value) => ({
        title: value.title,
        description: value.description,
        iconUrl: getStrapiMedia(value.icon?.url),
        Icon: undefined,
        iconColor: undefined,
      }))
    : defaultValues.map((value) => ({
        title: value.title,
        description: value.description,
        iconUrl: null,
        Icon: value.icon,
        iconColor: value.iconColor,
      }));

  return (
    <section className={cn("pb-16 sm:pb-24", wrapperClass)}>
      <div className="global-container mx-auto">
        <div className="space-y-10">
          <div className="text-left">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest font-mono">
              {badgeText}
            </span>
            <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary mt-2">
              {title}
            </h2>
            {data?.description && (
              <p className="text-16 leading-relaxed text-text-secondary mt-2 max-w-2xl">
                {data.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {values.map((value, idx) => {
              const { Icon } = value;

              return (
                <div
                  key={idx}
                  className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-brand-blue transition-all"
                >
                  {value.iconUrl ? (
                    <div className="mb-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={value.iconUrl}
                        alt={value.title}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  ) : (
                    Icon && (
                      <div className="mb-4">
                        <Icon
                          className={cn(
                            "w-8 h-8",
                            value.iconColor ?? "text-brand-blue",
                          )}
                        />
                      </div>
                    )
                  )}
                  <h4 className="text-lg sm:text-28 font-display font-medium text-text-primary mb-2">
                    {value.title}
                  </h4>
                  <p className="text-16 leading-relaxed text-text-secondary">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
