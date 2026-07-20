import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { DermaFooterActionSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

export default function FooterActionSection({ data, wrapperClass }: { data?: DermaFooterActionSection; wrapperClass?: string }) {
  const ctaHref = data?.cta?.url ?? "/";
  const ctaLabel = data?.cta?.title ?? "Return to Main OS Menu";

  return (
    <section className={cn("py-16 text-center global-container mx-auto border-t border-brand-subtle", wrapperClass)}>
      <Link
        href={ctaHref}
        className="px-10 py-5 bg-brand-blue text-white rounded-2xl font-display font-black tracking-wider hover:bg-brand-hover active:bg-brand-pressed transition-all inline-flex items-center gap-3 mx-auto shadow-xl shadow-brand-blue/30 uppercase text-xs"
      >
        {ctaLabel}
        <ArrowRight size={16} />
      </Link>
    </section>
  );
}
