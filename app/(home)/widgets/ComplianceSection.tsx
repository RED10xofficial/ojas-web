import { ShieldCheck } from "lucide-react";
import type { ComplianceSection as ComplianceSectionData } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

const defaultItems = [
  "HIPAA", "DPDP Act", "GDPR", "FDA", "CDSCO", "MHRA", "EU AI Act",
  "NITI Aayog AI Guidelines", "ISO 27001", "SOC 2", "HL7 / FHIR",
  "ICMR Guidelines", "PCI DSS", "IEC 62304", "ISO 13485", "ISO 14971",
  "HITECH Act", "PIPEDA", "NHS DSPT", "DICOM Standards", "GxP Compliance",
  "SaMD (Software as a Medical Device)",
];

export default function ComplianceSection({ data, wrapperClass }: { data?: ComplianceSectionData; wrapperClass?: string }) {
  const title = data?.title ?? "Regulations and Compliances";
  const items = data?.complianceItems?.map((c) => c.name) ?? defaultItems;

  return (
    <section className={cn("py-16 sm:py-24 bg-bg-page/5 border-y border-brand-subtle overflow-hidden", wrapperClass)}>
      <div className="global-container mx-auto text-center mb-12">
        <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary">{title}</h2>
        <div className="w-10 h-0.5 bg-brand-blue mx-auto mt-5 rounded-full opacity-40" />
      </div>
      <div className="w-full relative flex overflow-hidden group mb-12">
        <div className="flex gap-16 items-center whitespace-nowrap animate-scroll py-2">
          {[...items, ...items].map((name, i) => (
            <div key={i} className="flex items-center gap-3 font-display font-bold text-brand-dark text-xl lg:text-2xl cursor-default opacity-80 hover:opacity-100 transition-opacity">
              <ShieldCheck size={24} className="text-brand-blue" />
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
