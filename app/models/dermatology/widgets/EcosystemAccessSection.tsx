"use client";

import { useState } from "react";
import { Brain, Stethoscope, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AccessPointsSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

function SpecialtyCard({
  title,
  science,
  target,
  icon: Icon,
  active,
  onClick,
}: {
  title: string;
  science: string;
  target: string;
  icon: LucideIcon;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden p-6 sm:p-8 rounded-2xl transition-all duration-300 border text-left w-full ${
        active
          ? "bg-white border-brand-blue/30 text-brand-dark shadow-lg"
          : "bg-white border-brand-subtle hover:border-brand-blue/30 text-brand-dark cursor-pointer"
      } shadow-sm shadow-brand-dark/5`}
    >
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm bg-brand-subtle/50 text-icon-tertiary">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-display font-bold mb-4 text-text-primary">{title}</h3>
      <div className="space-y-4">
        <div>
          <p className="text-11 uppercase tracking-widest font-semibold mb-1 opacity-60">Hard Science</p>
          <p className="text-sm text-text-secondary">{science}</p>
        </div>
        <div>
          <p className="text-11 uppercase tracking-widest font-semibold mb-1 opacity-60">Clinical Target</p>
          <p className="text-sm text-text-secondary">{target}</p>
        </div>
      </div>
    </button>
  );
}

export default function EcosystemAccessSection({ data, wrapperClass }: { data?: AccessPointsSection; wrapperClass?: string }) {
  const sectionTitle = data?.title ?? "Ecosystem Access Points";

  const defaultAccessPoints = [
    { title: "For SAAS Companies", science: "API Call", target: "Datasets & Logic", icon: Brain, id: "Developers" },
    { title: "For Doctors", science: "Mobile App", target: "Clinical Workbench", icon: Stethoscope, id: "Doctors" },
    { title: "For Hospitals", science: "Browser Console", target: "Enterprise Integration", icon: Users, id: "Patients" },
  ];

  const [localActiveAccessPoint, setLocalActiveAccessPoint] = useState<string>("Doctors");

  return (
    <section className={cn("py-16 sm:py-24 bg-bg-page/40 border-t border-brand-subtle font-sans", wrapperClass)} id="developer-api">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 text-center">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium mb-4 text-text-primary text-center uppercase">{sectionTitle}</h2>
          <div className="w-10 h-0.5 bg-brand-blue mx-auto mt-5 rounded-full opacity-40" />
        </div>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          {defaultAccessPoints.map((ap) => (
            <SpecialtyCard
              key={ap.id}
              title={ap.title}
              science={ap.science}
              target={ap.target}
              icon={ap.icon}
              active={localActiveAccessPoint === ap.id}
              onClick={() => setLocalActiveAccessPoint(ap.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
