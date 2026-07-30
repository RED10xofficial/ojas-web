import { Building } from "lucide-react";
import type { ContactOfficesSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

const defaultOffices = [
  {
    city: "Bengaluru, India",
    role: "Engineering & Operations",
    address:
      "OJAS Tech Block, Pre-Clinical Innovation Center, Koramangala, Bengaluru, KA 560034",
    phone: "+91 80 4992 0180",
  },
  {
    city: "Mumbai, India",
    role: "Clinical Steering HQ",
    address:
      "Scientific Advisory Suites, Apollo Hospitals Campus, Belapur, Navi Mumbai, MH 400614",
    phone: "+91 22 6698 2200",
  },
];

export default function ContactOffices({
  data,
  wrapperClass,
}: {
  data?: ContactOfficesSection;
  wrapperClass?: string;
}) {
  const badgeText = data?.badgeText ?? "PHYSICAL REGISTER";
  const title = data?.title ?? "Our Scientific Innovation Suites";
  const offices = data?.offices?.length ? data.offices : defaultOffices;

  return (
    <section className={cn("pb-16 sm:pb-24", wrapperClass)}>
      <div className="global-container mx-auto">
        <div className="space-y-8">
          <div>
            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest font-mono">
              {badgeText}
            </span>
            <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary mt-1">
              {title}
            </h2>
            {data?.description && (
              <p className="text-16 leading-relaxed text-text-secondary mt-2 max-w-2xl">
                {data.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offices.map((office, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm text-left relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-bl-full pointer-events-none" />
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue shrink-0">
                    <Building size={16} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg sm:text-28 font-display font-medium text-text-primary">
                      {office.city}
                    </h4>
                    {office.role && (
                      <span className="text-11 uppercase tracking-widest font-semibold text-brand-blue">
                        {office.role}
                      </span>
                    )}
                    {office.address && (
                      <p className="text-16 leading-relaxed text-text-secondary mt-2">
                        {office.address}
                      </p>
                    )}
                    {office.phone && (
                      <p className="text-sm text-slate-400 leading-relaxed mt-2">
                        {office.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
