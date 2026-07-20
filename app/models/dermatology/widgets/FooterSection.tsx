import Link from "next/link";
import type { DermaFooterSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

export default function FooterSection({ data, wrapperClass }: { data?: DermaFooterSection; wrapperClass?: string }) {
  const logoText = data?.logoText ?? "OJAS";
  const companyDescription = data?.companyDescription ?? "An advanced multi-modal diagnostic software framework engineered for clinical providers, medical centers, and professional wellness algorithms.";
  const copyrightText = data?.copyrightText ?? `© ${new Date().getFullYear()} OJAS Systems Core. All rights reserved.`;
  const bottomText = data?.bottomText ?? "Designed and vetted in collaboration with the Scientific Steering Board.";

  const defaultColumns = [
    {
      heading: "Specialist Verticals",
      links: [
        { label: "Dermatology Model", href: "/models/dermatology" },
        { label: "Ambient Scribe", href: "/" },
        { label: "Gynecology Hub", href: "/" },
        { label: "Nutrition Pathways", href: "/" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About us", href: "/about-us" },
        { label: "Career", href: "/careers" },
        { label: "Contact us", href: "/contact-us" },
      ],
    },
    {
      heading: "Institutional",
      links: [
        { label: "Technical white papers", href: "#" },
        { label: "Case studies", href: "#" },
        { label: "Security Certifications", href: "#" },
      ],
    },
  ];

  const columns = data?.columns?.map((col) => ({
    heading: col.heading,
    links: col.links?.map((l) => ({ label: l.label, href: l.href })) ?? [],
  })) ?? defaultColumns;

  const defaultBottomLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Use", href: "#" },
  ];
  const bottomLinks = data?.bottomLinks?.map((l) => ({ label: l.label, href: l.href })) ?? defaultBottomLinks;

  return (
    <footer className={cn("bg-brand-dark text-white pt-16 pb-8 border-t border-white/5 text-left", wrapperClass)}>
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2 lg:pr-8">
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 40 40" className="w-8 h-8 text-brand-blue animate-[spin_40s_linear_infinite]" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(20, 20)">
                  {[0, 72, 144, 216, 288].map((angle) => (
                    <path
                      key={angle}
                      transform={`rotate(${angle})`}
                      d="M 0,-4.5 C 2.5,-4.5 5,-6 6,-10 C 7,-14 4.5,-17.5 0,-16.5 C -4.5,-15.5 -5,-11 -4.5,-7.5 C -4,-4 -2,-4 0,-4.5 Z"
                      fill="currentColor"
                    />
                  ))}
                </g>
              </svg>
              <span className="font-display font-black text-xl tracking-widest text-[#5AB2FF] uppercase">{logoText}</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-6 font-medium">
              {companyDescription}
            </p>
            <p className="text-11 text-text-accent font-semibold opacity-50 uppercase tracking-widest leading-relaxed">
              {copyrightText}
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="font-semibold mb-4 text-11 uppercase tracking-widest text-[#B5C0D0]">{col.heading}</h4>
              <ul className="space-y-2 text-11 text-text-secondary opacity-60 font-semibold">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="hover:text-brand-blue transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-11 text-text-accent opacity-50 uppercase tracking-widest font-semibold flex flex-col sm:flex-row justify-between gap-4">
          <p>{bottomText}</p>
          <div className="flex gap-4 justify-center">
            {bottomLinks.map((link, idx) => (
              <>
                {idx > 0 && <span key={`sep-${idx}`}>&bull;</span>}
                <a key={link.href + link.label} href={link.href} className="hover:text-brand-blue">{link.label}</a>
              </>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
