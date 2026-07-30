import { Target, Compass } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AboutMissionVisionSection } from "@/app/lib/types";
import { getStrapiMedia } from "@/app/lib/strapi";
import { cn } from "@/app/lib/cn";

/* Accent styling is a fixed palette so CMS values can't break the design. */
const ACCENTS = {
  brand: {
    hover: "hover:border-brand-blue",
    iconWrap: "bg-brand-blue/10 border-brand-blue/20",
    icon: "text-brand-blue",
    glow: "bg-brand-blue/5",
  },
  indigo: {
    hover: "hover:border-indigo-500",
    iconWrap: "bg-indigo-500/10 border-indigo-500/20",
    icon: "text-indigo-500",
    glow: "bg-indigo-500/5",
  },
  emerald: {
    hover: "hover:border-emerald-500",
    iconWrap: "bg-emerald-500/10 border-emerald-500/20",
    icon: "text-emerald-500",
    glow: "bg-emerald-500/5",
  },
  purple: {
    hover: "hover:border-purple-500",
    iconWrap: "bg-purple-500/10 border-purple-500/20",
    icon: "text-purple-500",
    glow: "bg-purple-500/5",
  },
  rose: {
    hover: "hover:border-rose-500",
    iconWrap: "bg-rose-500/10 border-rose-500/20",
    icon: "text-rose-500",
    glow: "bg-rose-500/5",
  },
  amber: {
    hover: "hover:border-amber-500",
    iconWrap: "bg-amber-500/10 border-amber-500/20",
    icon: "text-amber-500",
    glow: "bg-amber-500/5",
  },
} as const;

/* Fallback glyphs, used only when the CMS entry has no uploaded icon. */
const defaultCards: {
  title: string;
  description: string;
  icon: LucideIcon;
  accentColor: keyof typeof ACCENTS;
}[] = [
  {
    title: "Our Mission",
    description:
      "To empower clinicians worldwide with validated, privacy-centric AI interfaces that capture the somatic reality of patients, automate rigorous documentation, and uncover underlying root-cause dynamics with ultimate safety.",
    icon: Target,
    accentColor: "brand",
  },
  {
    title: "Our Vision",
    description:
      "We envision a synchronized medical architecture where diagnostic networks automatically translate standard raw inputs into structured longitudinal molecular timelines, returning medicine to its humane root-cause genesis.",
    icon: Compass,
    accentColor: "indigo",
  },
];

export default function AboutMissionVision({
  data,
  wrapperClass,
}: {
  data?: AboutMissionVisionSection;
  wrapperClass?: string;
}) {
  const badgeText = data?.badgeText ?? "Our Purpose";
  const title = data?.title ?? "Reinventing Clinical Bio-Intelligence";
  const description =
    data?.description ??
    "At OJAS, we build clinical-grade system software that operates at the cellular, diagnostic, and workflow layers. Our mission is to restore the sacred bond between physician and patient by eliminating systemic data burdens.";
  /* CMS cards carry an uploaded image; the defaults carry a lucide glyph. */
  const cards = data?.cards?.length
    ? data.cards.map((card) => ({
        title: card.title,
        description: card.description,
        accentColor: card.accentColor,
        iconUrl: getStrapiMedia(card.icon?.url),
        Icon: undefined,
      }))
    : defaultCards.map((card) => ({
        title: card.title,
        description: card.description,
        accentColor: card.accentColor,
        iconUrl: null,
        Icon: card.icon,
      }));

  return (
    <section className={cn("pb-16 sm:pb-24", wrapperClass)}>
      <div className="global-container mx-auto">
        <div className="text-left">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {cards.map((card, idx) => {
            const accent = ACCENTS[card.accentColor ?? "brand"] ?? ACCENTS.brand;
            const { Icon } = card;

            return (
              <div
                key={idx}
                className={cn(
                  "bg-white p-8 sm:p-10 rounded-3xl border border-brand-subtle shadow-md relative overflow-hidden text-left transition-colors duration-300",
                  accent.hover,
                )}
              >
                {(card.iconUrl || Icon) && (
                  <div
                    className={cn(
                      "w-12 h-12 rounded-2xl border flex items-center justify-center mb-6",
                      accent.iconWrap,
                    )}
                  >
                    {card.iconUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={card.iconUrl}
                        alt={card.title}
                        className="w-6 h-6 object-contain"
                      />
                    ) : (
                      Icon && <Icon className={cn("w-6 h-6", accent.icon)} />
                    )}
                  </div>
                )}
                <h3 className="text-lg sm:text-28 font-display font-medium text-text-primary mb-2">
                  {card.title}
                </h3>
                <p className="text-16 leading-relaxed text-text-secondary">
                  {card.description}
                </p>
                <div
                  className={cn(
                    "absolute top-0 right-0 w-24 h-24 rounded-bl-full pointer-events-none",
                    accent.glow,
                  )}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
