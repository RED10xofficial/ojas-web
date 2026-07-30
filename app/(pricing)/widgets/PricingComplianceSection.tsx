"use client";

import { ShieldCheck } from "lucide-react";
import type { PricingComplianceSection as PricingComplianceSectionData } from "@/app/lib/types";
import { getStrapiMedia } from "@/app/lib/strapi";
import { cn } from "@/app/lib/cn";

const defaultCertifications = [
  "HIPAA", "DPDP Act", "GDPR", "FDA Compatibility", "CDSCO Compliant", "MHRA",
  "EU AI Act Guardrails", "NITI Aayog AI", "ISO 27001", "SOC 2 Type II",
  "HL7 / FHIR Protocols", "ICMR Guidelines", "PCI DSS", "IEC 62304",
  "ISO 13485", "ISO 14971", "HITECH Act", "PIPEDA", "NHS DSPT",
  "DICOM Standard Format", "Clinical GxP", "SaMD Class II Certified",
];

export default function PricingComplianceSection({
  data,
  wrapperClass,
}: {
  data?: PricingComplianceSectionData;
  wrapperClass?: string;
}) {
  const title = data?.title ?? "System Regulations & Certifications";
  /* CMS entries may carry an uploaded icon; defaults fall back to a lucide glyph. */
  const certifications = data?.certifications?.length
    ? data.certifications.map((cert) => ({
        name: cert.name,
        iconUrl: getStrapiMedia(cert.icon?.url),
      }))
    : defaultCertifications.map((name) => ({ name, iconUrl: null }));

  return (
    <section className={cn("py-16 sm:py-24 border-b border-brand-subtle overflow-hidden", wrapperClass)}>
      <div className="global-container mx-auto text-center mb-10">
        <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary mb-3">
          {title}
        </h2>
        {data?.description && (
          <p className="text-16 leading-relaxed text-text-secondary font-medium max-w-2xl mx-auto mb-4">
            {data.description}
          </p>
        )}
        <div className="w-12 h-1 bg-brand-blue mx-auto rounded-full opacity-30" />
      </div>

      <div className="w-full relative flex overflow-hidden">
        <div className="flex gap-16 items-center whitespace-nowrap animate-scroll py-2">
          {[...certifications, ...certifications].map((cert, i) => (
            <div key={i} className="flex items-center gap-2.5 font-display font-bold text-brand-dark text-lg cursor-default opacity-75 hover:opacity-100 transition-opacity">
              {cert.iconUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={cert.iconUrl} alt={cert.name} className="w-5 h-5 object-contain shrink-0" />
              ) : (
                <ShieldCheck size={20} className="text-brand-blue shrink-0" />
              )}
              <span>{cert.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
