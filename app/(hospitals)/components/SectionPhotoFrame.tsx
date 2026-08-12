import type { ReactNode } from "react";
import { cn } from "@/app/lib/cn";

/**
 * Bracketed frame that the pinned hospitals sections sit inside. The image is
 * a washed-out backdrop, so it stays a CSS background rather than an <Image>.
 */
export default function SectionPhotoFrame({
  children,
  imageUrl,
  className,
}: {
  children: ReactNode;
  imageUrl?: string | null;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-full h-full rounded-3xl border-4 border-brand-dark/15 bg-bg-page shadow-xl overflow-hidden flex flex-col",
        className,
      )}
    >
      {imageUrl && (
        <div
          className="absolute inset-0 opacity-[0.12] bg-cover bg-center mix-blend-multiply pointer-events-none rounded-3xl"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
      )}

      {/* Decorative outer corner mounting brackets */}
      <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-brand-blue/60 rounded-tl-md pointer-events-none z-30" />
      <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-brand-blue/60 rounded-tr-md pointer-events-none z-30" />
      <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-brand-blue/60 rounded-bl-md pointer-events-none z-30" />
      <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-brand-blue/60 rounded-br-md pointer-events-none z-30" />

      <div className="relative z-10 w-full h-full min-h-0 flex flex-col justify-between gap-4 py-5 sm:py-8 px-3 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
