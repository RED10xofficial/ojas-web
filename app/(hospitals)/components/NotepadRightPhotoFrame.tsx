import { cn } from "@/app/lib/cn";

/** Taped-up polaroid pinned beside the proof notepad. */
export default function NotepadRightPhotoFrame({
  imageUrl,
  label = "Clinical Attachment",
  className,
}: {
  imageUrl: string;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative shrink-0 flex flex-col items-center justify-center",
        className,
      )}
    >
      <div className="relative bg-white/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 border-2 border-brand-dark/15 shadow-xl w-48 sm:w-56 md:w-64 transition-all duration-300 hover:shadow-2xl">
        {/* Decorative tape at the top */}
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-12 h-4 bg-[#E8DCD1] border border-[#C2B5A8] opacity-80 rounded-sm shadow-xs rotate-[-2deg]" />

        {/* Frame outer corner accents */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-brand-blue/50 rounded-tl-xs pointer-events-none" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-brand-blue/50 rounded-tr-xs pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-brand-blue/50 rounded-bl-xs pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-brand-blue/50 rounded-br-xs pointer-events-none" />

        <div className="relative group flex flex-col items-center">
          <div className="w-full h-44 sm:h-52 md:h-56 rounded-xl overflow-hidden bg-slate-100 border border-black/10 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={label}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="mt-2.5 text-center w-full">
            <span className="block text-11 font-mono font-bold uppercase tracking-widest text-text-secondary/60">
              {label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
