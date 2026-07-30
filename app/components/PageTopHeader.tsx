"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const navLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact-us" },
];

const PageTopHeader = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <section className="w-full relative pt-35 pb-16">
      <div className="global-container">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-6 border-b border-black/10">
          <button
            type="button"
            onClick={() => router.back()}
            className="group flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-text-accent hover:text-brand-blue transition-colors focus:outline-none cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-white border border-brand-subtle flex items-center justify-center group-hover:bg-brand-blue/10 group-hover:border-brand-blue/20 transition-all shadow-sm">
              <ArrowLeft
                size={14}
                className="group-hover:-translate-x-0.5 transition-transform text-brand-blue"
              />
            </div>
            Back
          </button>

          <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-1.5 flex gap-1 w-full sm:w-auto">
            {navLinks.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 outline-none cursor-pointer text-center ${
                    isActive
                      ? "bg-brand-blue text-white shadow-md shadow-brand-blue/15"
                      : "text-text-secondary hover:bg-slate-50"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageTopHeader;
