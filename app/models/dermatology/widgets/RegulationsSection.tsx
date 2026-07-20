import { ShieldCheck } from "lucide-react";
import type { ComplianceSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

const defaultTags = [
  "HIPAA", "DPDP Act", "GDPR", "FDA", "CDSCO", "MHRA", "EU AI Act", "ISO 27001", "ISO 13485", "ISO 14971", "SOC 2", "HL7 / FHIR", "DICOM Standards", "SaMD (Software as a Medical Device)", "HITECH Act", "PCI DSS", "GxP Compliance", "ICMR ethical AI and clinical research guidelines",
];

export default function RegulationsSection({ data, wrapperClass }: { data?: ComplianceSection; wrapperClass?: string }) {
  const sectionTitle = data?.title ?? "Regulations and Compliances";
  const tags = data?.complianceItems?.map((item) => item.name) ?? defaultTags;

  return (
    <section className={cn("py-16 sm:py-24 bg-bg-surface border-y border-brand-subtle overflow-hidden global-container mx-auto my-12 relative", wrapperClass)}>
      <div className="text-center mb-12 sm:mb-16">
        <p className="text-brand-blue font-medium max-w-2xl mx-auto mb-2">Global Medical-Grade Frameworks</p>
        <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium mb-4 text-text-primary text-center">{sectionTitle}</h2>
        <div className="w-10 h-0.5 bg-brand-blue mx-auto mt-5 rounded-full opacity-40" />
      </div>

      <div className="w-full relative flex overflow-hidden mt-10">
        <div className="flex gap-16 items-center whitespace-nowrap animate-scroll py-2 text-sm font-bold uppercase tracking-widest text-[#6A9080]">
          {[...tags, ...tags].map((tag, idx) => (
            <span key={idx} className="flex items-center gap-3 font-display text-text-primary bg-bg-page border border-brand-subtle py-2 px-5 rounded-xl hover:text-brand-blue transition-colors cursor-default">
              <ShieldCheck size={16} className="text-brand-blue" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
