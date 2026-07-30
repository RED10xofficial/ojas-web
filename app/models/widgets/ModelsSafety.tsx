import Image from "next/image";
import { ShieldCheck, Lock, Globe, Award, type LucideIcon } from "lucide-react";
import type { ModelsSafetySection } from "@/app/lib/types";
import { getStrapiMedia } from "@/app/lib/strapi";
import { cn } from "@/app/lib/cn";

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  Lock,
  Globe,
  Award,
};

const ACCENTS: Record<string, string> = {
  blue: "text-brand-blue",
  emerald: "text-emerald-500",
  purple: "text-purple-400",
  amber: "text-amber-400",
};

export default function ModelsSafety({
  section,
}: {
  section: ModelsSafetySection;
}) {
  const badges = section.badges ?? [];

  return (
    <section
      className={cn(
        "py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden",
        section.wrapperClass,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.1),transparent_70%)] pointer-events-none" />

      <div className="global-container mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          {section.badgeText && (
            <span className="text-11 uppercase tracking-widest font-semibold text-brand-blue font-mono block mb-4">
              {section.badgeText}
            </span>
          )}

          <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-white mb-6">
            {section.title}
          </h2>

          {section.description && (
            <p className="text-16 leading-relaxed text-slate-400 mb-10">
              {section.description}
            </p>
          )}
        </div>

        {badges.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {badges.map((badge) => {
              const Icon = (badge.iconName && iconMap[badge.iconName]) || ShieldCheck;
              const iconUrl = getStrapiMedia(badge.icon?.url);
              return (
                <div
                  key={badge.id}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-xs font-semibold text-slate-300"
                >
                  {iconUrl ? (
                    <Image
                      src={iconUrl}
                      alt={badge.icon?.alternativeText || badge.text}
                      width={16}
                      height={16}
                      className="object-contain shrink-0"
                    />
                  ) : (
                    <Icon size={16} className={ACCENTS[badge.accent ?? "blue"]} />
                  )}
                  {badge.text}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
