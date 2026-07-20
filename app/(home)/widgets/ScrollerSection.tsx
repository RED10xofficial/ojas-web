import { ShieldCheck } from "lucide-react";
import type { ScrollerSection as ScrollerSectionData } from "@/app/lib/types";
import Image from "next/image";
import { getStrapiMedia } from "@/app/lib/strapi";
import { cn } from "@/app/lib/cn";

interface TrustBadge {
  title: string;
  icon?: { url: string } | null;
}

const defaultTrustBadges: TrustBadge[] = [
  { title: "DPDP Compliances" },
  { title: "Build in Google" },
  { title: "Trained on AIIMS data" },
  { title: "ISO certified" },
];

const defaultPartners: string[] = [
  "AIIMS",
  "Google",
  "Mayo Clinic",
  "JJ Hospital",
  "Medanta",
  "Kokilaben Dhirubhai Ambani Hospital",
  "Jupiter Hospital",
  "Fortis Hospitals",
];

export default function ScrollerSection({
  data,
  wrapperClass,
}: {
  data?: ScrollerSectionData;
  wrapperClass?: string;
}) {
  const trustBadges: TrustBadge[] =
  data?.trustBadges?.map((b) => ({
    title: b.title,
    icon: b.icon,
  })) ?? defaultTrustBadges;
  const partners: string[] =
  data?.partners?.map((p) => p.title) ?? defaultPartners;
  
  return (
    <section className={cn("relative overflow-hidden", wrapperClass)}>
      <div className="global-container mx-auto">
        <div className="w-full pt-10 border-t border-slate-100 relative">
          <span className="w-25 bg-linear-to-r from-[#f9f6f3] to-transparent absolute left-0 top-0 h-full z-1"></span>
          <span className="w-25 bg-linear-to-r from-[#f9f6f3] to-transparent absolute right-0 -scale-x-100 top-0 h-full z-1"></span>
          <div className="w-full relative flex overflow-hidden">
            <div className="flex gap-20 items-center whitespace-nowrap animate-scroll-reverse py-2">
              {[...trustBadges, ...trustBadges, ...trustBadges].map(
                (name, i) => (
                  <div
                    key={i}
                    className="flex w-max items-center font-display font-bold text-brand-blue/60 text-xl lg:text-2xl"
                  >
                    <Image
                      src={getStrapiMedia(name?.icon?.url) ?? ''}
                      unoptimized
                      width={24}
                      height={24}
                      alt={name?.title || "icon"}
                      className="w-6 h-auto mr-3"
                    />
                    <span className="flex-1 inline-flex">{name?.title}</span>
                  </div>
                ),
              )}
            </div>
          </div>
          <div className="w-full relative flex overflow-hidden group mt-10">
            <div className="flex gap-16 items-center whitespace-nowrap animate-scroll py-2">
              {[...partners, ...partners].map((name, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 font-display font-bold text-text-primary hover:text-brand-blue transition-colors cursor-default text-xl lg:text-2xl"
                >
                  <div className="w-2 h-2 rounded-full bg-brand-blue/40" />
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
