import Link from "next/link";
import {
  MessageSquare,
  Activity,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { FooterData } from "@/app/lib/types";
import OjasLogo from "./header/OjasLogo";

const iconMap: Record<string, LucideIcon> = {
  MessageSquare,
  Activity,
};

const getIcon = (name?: string): LucideIcon =>
  name ? iconMap[name] || MessageSquare : MessageSquare;

const defaultFooterData: FooterData = {
  description:
    "The world's first bio-intelligent clinical operating system. Engineering the future of root-cause healing.",
  columns: [
    {
      id: 1,
      title: "Technology",
      links: [
        { id: 1, label: "Bio-Transformers", href: "#" },
        { id: 2, label: "OOM-1 Model", href: "#" },
        { id: 3, label: "Vedic Mapping", href: "#" },
        { id: 4, label: "Clinical API", href: "#" },
      ],
    },
    {
      id: 2,
      title: "Models",
      links: [
        { id: 1, label: "Dermatology", href: "/models/dermatology" },
        { id: 2, label: "Scribe", href: "/models/scribe" },
        { id: 3, label: "Gynecology", href: "/models/gynecology" },
        { id: 4, label: "Nutrition", href: "/models/nutrition" },
      ],
    },
    {
      id: 3,
      title: "Literature",
      links: [
        { id: 1, label: "White Paper", href: "/white-paper" },
        { id: 2, label: "Research Papers", href: "/research-papers" },
        { id: 3, label: "Case Studies", href: "/case-studies" },
      ],
    },
    {
      id: 4,
      title: "Compliance",
      links: [
        { id: 1, label: "HIPAA Secure", href: "#" },
        { id: 2, label: "SOC2 Type II", href: "#" },
        { id: 3, label: "ISO 27001", href: "#" },
        { id: 4, label: "Residency", href: "#" },
      ],
    },
    {
      id: 5,
      title: "Company",
      links: [
        { id: 1, label: "About us", href: "/about-us" },
        { id: 2, label: "Career", href: "/careers" },
        { id: 3, label: "Contact us", href: "/contact-us" },
      ],
    },
  ],
  socialLinks: [
    { id: 1, icon: "MessageSquare", href: "#", label: "Chat" },
    { id: 2, icon: "Activity", href: "#", label: "Status" },
  ],
  complianceTitle: "Data Storage & Ethics",
  complianceBadges: [
    { id: 1, text: "End-to-End Encrypted" },
    { id: 2, text: "Zero-Trust Architecture" },
  ],
  copyrightText: "© 2026 OJAS TECHNOLOGY",
  statusText: "System Online",
};

export default function Footer({ data: apiData }: { data?: FooterData | null }) {
  const data = apiData || defaultFooterData;

  const description = data.description ?? defaultFooterData.description;
  const columns = data.columns ?? defaultFooterData.columns ?? [];
  const socialLinks = data.socialLinks ?? defaultFooterData.socialLinks ?? [];
  const complianceTitle = data.complianceTitle ?? defaultFooterData.complianceTitle;
  const complianceBadges = data.complianceBadges ?? defaultFooterData.complianceBadges ?? [];
  const copyrightText = data.copyrightText ?? defaultFooterData.copyrightText;
  const statusText = data.statusText ?? defaultFooterData.statusText;

  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8">
      <div className="global-container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          <div className="lg:pr-4">
            <div className="mb-4">
              <OjasLogo />
            </div>
            <p className="text-slate-400 mb-6 text-xs leading-relaxed">
              {description}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = getIcon(social.icon);
                return (
                  <Link
                    key={social.id}
                    href={social.href}
                    aria-label={social.label}
                    className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 cursor-pointer transition-all"
                  >
                    <Icon size={14} />
                  </Link>
                );
              })}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.id}>
              <h4 className="font-bold mb-4 text-11 uppercase tracking-widest text-text-accent">
                {column.title}
              </h4>
              <ul className="space-y-2.5 text-12 text-white/70 opacity-60 font-medium">
                {column.links?.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className="hover:text-brand-blue hover:opacity-100"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Regulations & Compliance */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <p className="text-11 font-bold text-text-accent uppercase tracking-widest mb-6 opacity-60">
            {complianceTitle}
          </p>
          <div className="flex flex-wrap gap-6">
            {complianceBadges.map((badge) => (
              <div key={badge.id} className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-success" />
                <span className="text-xs font-bold text-white/80">
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-10 font-bold text-text-accent uppercase tracking-widest opacity-60">
            <span>{copyrightText}</span>
            <div className="w-0.5 h-0.5 rounded-full bg-text-accent opacity-30" />
            <span>PRIVACY FIRST</span>
          </div>
          <div className="px-3 py-1.5 rounded-md bg-brand-blue/10 text-brand-blue text-10 font-bold uppercase tracking-widest border border-brand-blue/20">
            {statusText}
          </div>
        </div>
      </div>
    </footer>
  );
}
