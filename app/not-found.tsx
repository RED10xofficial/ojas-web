import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import StatusPage, {
  ACTION_PRIMARY,
  ACTION_SECONDARY,
} from "@/app/components/StatusPage";

export const metadata: Metadata = {
  title: "Page not found | OJAS",
  description: "The page you were looking for doesn't exist.",
  robots: "noindex, follow",
};

/** The handful of destinations most 404s are actually reaching for. */
const SUGGESTED_LINKS = [
  { label: "Models", href: "/models" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blogs", href: "/blogs" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function NotFound() {
  return (
    <StatusPage
      code="404"
      badge="Page not found"
      title="This page has moved on."
      description="The link may be out of date, or the page might never have existed. Everything else is still where you left it."
      footer={
        <div className="mt-10 pt-6 border-t border-slate-200">
          <p className="text-xs font-bold text-text-secondary/70 uppercase tracking-widest font-mono">
            Popular destinations
          </p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {SUGGESTED_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-text-secondary hover:text-brand-blue transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      }
    >
      <Link href="/" className={ACTION_PRIMARY}>
        <ArrowLeft size={14} />
        Back to home
      </Link>
      <Link href="/search" className={ACTION_SECONDARY}>
        <Search size={14} />
        Search OJAS
      </Link>
    </StatusPage>
  );
}
