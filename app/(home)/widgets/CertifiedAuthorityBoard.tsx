import React from "react";
import { ShieldCheck } from "lucide-react";
import type { CertifiedAuthorityBoardSection } from "@/app/lib/types";
import { getStrapiMedia } from "@/app/lib/strapi";
import { cn } from "@/app/lib/cn";

export interface Doctor {
  id: string;
  name: string;
  spec: string;
  hosp: string;
  image: string;
  desc: string;
}

export const doctorsList: Doctor[] = [
  {
    id: "OS-CORE-01",
    name: "Dr. Anand Verma",
    spec: "Integrative Derm MD",
    hosp: "Apollo Integrated Health",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80",
    desc: "Expertise in the cellular epigenomics of chronic skin lesions and micro-biome sequence mapping.",
  },
  {
    id: "OS-CORE-02",
    name: "Dr. Sarah Thompson",
    spec: "Clinical Dermatology PhD",
    hosp: "Mayo Medical Systems",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80",
    desc: "Focused on bio-intelligent models of autoimmune skin signaling and metabolic therapeutic reversal.",
  },
  {
    id: "OS-CORE-03",
    name: "Dr. Naresh Trehan",
    spec: "Cardiovascular MD",
    hosp: "Medanta - Heart Institute",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=150&q=80",
    desc: "Pivotal architect of advanced surgical therapeutics and cloud-integrated cardiovascular diagnostic models.",
  },
  {
    id: "OS-CORE-04",
    name: "Dr. Claire Dubois",
    spec: "Maternal-Fetal MD & OBGYN",
    hosp: "Saint-Louis Research Care",
    image:
      "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=150&q=80",
    desc: "Pioneering early-stage neonatal biomarker diagnostics and real-time intrapartum risk-prediction algorithms.",
  },
  {
    id: "OS-CORE-05",
    name: "Dr. Devi Shetty",
    spec: "Cardiothoracic Surgery",
    hosp: "Narayana Health",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=150&q=80",
    desc: "Scaling computational diagnostics and AI-driven clinical workflow models across multi-specialty hubs.",
  },
  {
    id: "OS-CORE-06",
    name: "Dr. Prathap C. Reddy",
    spec: "Preventive Care MD & Medicine",
    hosp: "Apollo General Systems",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80",
    desc: "Steering modern integration of Ayurvedic clinical lifestyle mapping engines into global enterprise health.",
  },
];

function mapCmsDoctors(data: CertifiedAuthorityBoardSection): Doctor[] {
  if (!data.doctors?.length) return doctorsList;
  return data.doctors.map((d) => ({
    id: d.doctorId ?? "",
    name: d.name,
    spec: d.specialty ?? "",
    hosp: d.hospital ?? "",
    image: getStrapiMedia(d.image?.url ?? null) ?? "",
    desc: d.description ?? "",
  }));
}

export const CertifiedAuthorityBoard: React.FC<{
  data?: CertifiedAuthorityBoardSection;
  className?: string;
  wrapperClass?: string;
}> = ({ data, className = "", wrapperClass }) => {
  const sectionTitle = data?.title ?? "Certified Authority Board";
  const sectionSubtitle =
    data?.subtitle ?? "Scientific Steering Core Vetted Platform Protocols";
  const doctors = data ? mapCmsDoctors(data) : doctorsList;
  const marqueeDoctors = [...doctors, ...doctors, ...doctors];

  return (
    <section
      className={cn(
        "py-16 sm:py-24 bg-bg-page border-t border-brand-subtle overflow-hidden",
        className,
        wrapperClass,
      )}
      id="certified-board"
    >
      <div className="global-container mx-auto text-center">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary mb-3">
            {sectionTitle}
          </h2>
          <h3 className="text-16 text-brand-blue font-medium tracking-wide">
            {sectionSubtitle}
          </h3>
          <div className="w-10 h-0.5 bg-brand-blue mx-auto mt-5 rounded-full opacity-40" />
        </div>

        <div className="w-full relative flex overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg-page to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg-page to-transparent z-10 pointer-events-none" />

          <div className="flex gap-5 items-stretch whitespace-nowrap animate-scroll py-8 text-left">
            {marqueeDoctors.map((board, idx) => (
              <div
                key={idx}
                className="w-[26rem] shrink-0 whitespace-normal bg-white p-6 sm:p-8 rounded-2xl border border-brand-subtle/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-8 font-sans">
                    <span className="text-xs font-mono text-text-accent font-bold px-3 py-1 bg-brand-subtle rounded-md">
                      ID: {board.id}
                    </span>
                    <ShieldCheck
                      className="text-brand-blue animate-pulse"
                      size={26}
                    />
                  </div>
                  <div className="flex items-center gap-6 mb-6">
                    <img
                      src={board.image}
                      referrerPolicy="no-referrer"
                      alt={board.name}
                      className="w-28 h-28 rounded-full object-cover border-4 border-brand-blue/20 shrink-0 shadow-md"
                    />
                    <div>
                      <h4 className="font-extrabold text-2xl text-text-primary mb-1.5 font-sans leading-tight">
                        {board.name}
                      </h4>
                      <p className="text-brand-blue text-sm font-black uppercase tracking-wider mb-1 font-sans">
                        {board.spec}
                      </p>
                      <p className="text-text-accent text-xs font-bold uppercase opacity-85 font-sans">
                        {board.hosp}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-brand-subtle pt-6 mt-4">
                  <p className="text-sm text-text-secondary leading-relaxed opacity-90 font-semibold font-sans">
                    {board.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
