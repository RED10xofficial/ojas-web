import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { SymptomTrapSection as SymptomTrapSectionData } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

export default function SymptomTrapSection({
  data,
  wrapperClass,
}: {
  data?: SymptomTrapSectionData;
  wrapperClass?: string;
}) {
  if (!data) return null;

  const legacyPoints = data.legacyPoints ?? [];
  const ojasPoints = data.ojasPoints ?? [];

  return (
    <section
      className={cn(
        "py-16 bg-brand-subtle/30 text-left border-t border-brand-subtle",
        wrapperClass,
      )}
    >
      <div className="global-container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4 text-text-primary">
            {data.title}
          </h2>
          {data.description && (
            <p className="text-text-secondary max-w-2xl mx-auto text-sm font-medium opacity-70">
              {data.description}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Legacy treatment */}
          <div className="bg-white p-8 rounded-[2rem] border border-brand-subtle">
            <h3 className="text-xl font-display font-bold text-text-accent mb-6 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-brand-subtle flex items-center justify-center text-[10px] text-text-secondary">
                01
              </div>
              {data.legacyTitle || "Legacy Treatment"}
            </h3>
            <ul className="space-y-3">
              {legacyPoints.map((point) => (
                <li
                  key={point.id}
                  className="flex gap-3 items-start text-text-secondary opacity-60 text-xs"
                >
                  <div className="mt-1.5 p-0.5 rounded-full bg-red-100 text-red-500">
                    <ArrowRight size={12} className="rotate-45" />
                  </div>
                  {point.text}
                </li>
              ))}
            </ul>
          </div>

          {/* OJAS intelligence */}
          <div className="bg-brand-dark p-8 rounded-[2rem] text-white shadow-xl shadow-brand-dark/20 ring-2 ring-brand-blue/20">
            <h3 className="text-xl font-display font-bold text-brand-blue mb-6 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-brand-blue/20 flex items-center justify-center text-[10px] text-brand-blue">
                02
              </div>
              {data.ojasTitle || "OJAS Intelligence"}
            </h3>
            <ul className="space-y-3">
              {ojasPoints.map((point) => (
                <li key={point.id} className="flex gap-3 items-start text-xs">
                  <div className="mt-1.5 p-0.5 rounded-full bg-brand-blue/20 text-brand-blue">
                    <CheckCircle2 size={12} />
                  </div>
                  {point.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
