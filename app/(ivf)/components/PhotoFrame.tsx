import type { ReactNode } from "react";
import { cn } from "@/app/lib/cn";

/**
 * The bracketed frame the IVF hero sits inside. The image is just a washed-out
 * backdrop, so it stays a CSS background instead of going through <Image>.
 */
export default function PhotoFrame({
  children,
  imageUrl,
  className,
  opacityClass = "opacity-15 sm:opacity-20",
}: {
  children: ReactNode;
  imageUrl?: string | null;
  className?: string;
  opacityClass?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-full mx-auto overflow-hidden rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-brand-subtle ring-1 ring-brand-blue/25 bg-bg-surface/95 shadow-xl p-5 sm:p-8 md:p-10",
        className,
      )}
    >
      {imageUrl && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl sm:rounded-3xl">
          <div
            className={cn(
              "absolute inset-0 bg-cover bg-center mix-blend-multiply",
              opacityClass,
            )}
            style={{ backgroundImage: `url('${imageUrl}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-surface/20 via-transparent to-bg-surface/40" />
        </div>
      )}

      {/* Decorative outer corner mounting brackets */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-brand-blue/60 rounded-tl-md pointer-events-none" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-brand-blue/60 rounded-tr-md pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-brand-blue/60 rounded-bl-md pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-brand-blue/60 rounded-br-md pointer-events-none" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
