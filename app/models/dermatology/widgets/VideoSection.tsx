import { Play } from "lucide-react";
import type { DermaVideoSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

export default function VideoSection({ data, wrapperClass }: { data?: DermaVideoSection; wrapperClass?: string }) {
  const title = data?.title ?? "Clinical Live Simulation Environment";
  const videoTitle = data?.videoTitle ?? "Integrative Dermatology Demo";
  const videoDescription = data?.videoDescription ?? "Experience the OOM-1 cellular medical mapping transformer. Real-world dermoscopy image feeds translated to deep biological markers and SOAP notes.";
  return (
    <section className={cn("py-16 bg-bg-page/50 global-container mx-auto", wrapperClass)}>
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium mb-4 text-text-primary">{title}</h2>
        <div className="w-10 h-0.5 bg-brand-blue mx-auto mt-5 rounded-full opacity-40" />
      </div>
      <div className="w-full max-w-4xl mx-auto aspect-video rounded-3xl bg-brand-dark/95 border-4 border-brand-subtle shadow-xl relative overflow-hidden group flex flex-col justify-center items-center text-center p-8">
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark via-brand-dark/90 to-slate-900 pointer-events-none" />
        <div className="p-8 relative z-10">
          <div className="w-20 h-20 rounded-full bg-brand-blue flex items-center justify-center text-white mb-6 animate-pulse cursor-pointer hover:scale-110 active:scale-95 transition-all mx-auto shadow-lg shadow-brand-blue/40">
            <Play size={36} fill="currentColor" className="ml-1" />
          </div>
          <h3 className="text-white text-xl md:text-2xl font-display font-bold mb-3">{videoTitle}</h3>
          <p className="text-white/60 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
            {videoDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
