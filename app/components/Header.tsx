"use client";

import { useState, useRef, useCallback, useLayoutEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  ChevronRight,
  Activity,
  Brain,
  Users,
  Apple,
  Dna,
  Eye,
  ShieldAlert,
  Zap,
  Droplet,
  Heart,
  Microscope,
  TrendingUp,
  FileText,
  BookOpen,
  Newspaper,
  CheckCircle2,
  Briefcase,
  Mail,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type {
  HeaderData,
  HeaderNavLink,
  HeaderMenuBlock,
  HeaderMenuLink,
} from "@/app/lib/types";

/* ─── Icon resolver ─── */
const iconMap: Record<string, LucideIcon> = {
  Activity,
  Brain,
  Users,
  Apple,
  Dna,
  Eye,
  ShieldAlert,
  Zap,
  Droplet,
  Heart,
  Microscope,
  TrendingUp,
  FileText,
  BookOpen,
  Newspaper,
  CheckCircle2,
  Briefcase,
  Mail,
};

const getIcon = (name?: string): LucideIcon | null =>
  name ? iconMap[name] || null : null;

/* ─── Logo ─── */
const OjasLogo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 flex items-center justify-center shrink-0">
      <svg
        viewBox="0 0 40 40"
        className="w-8 h-8 text-brand-blue animate-[spin_40s_linear_infinite]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
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
    </div>
    <span className="font-display font-extrabold text-xl tracking-wider select-none flex items-center text-brand-blue animate-pulse">
      OJ<span>Λ</span>S
    </span>
  </div>
);

/* ─── Fallback data ─── */
const defaultHeaderData: HeaderData = {
  logo: { text: "OJAS", linkUrl: "/" },
  navLinks: [
    {
      id: 1,
      label: "Models",
      hasDropdown: true,
      viewAllLabel: "View all models",
      viewAllHref: "/models",
      menuBlocks: [
        {
          id: 1,
          heading: "Specialist Models",
          headingIcon: "Activity",
          links: [
            {
              id: 1,
              title: "Dermatology",
              href: "/models/dermatology",
              icon: "Activity",
              description: "Skin condition analysis",
            },
            {
              id: 2,
              title: "Scribe",
              href: "/models/scribe",
              icon: "Brain",
              description: "Ambient AI documentation",
            },
            {
              id: 3,
              title: "Gynecology",
              href: "/models/gynecology",
              icon: "Users",
              description: "Reproductive health AI",
            },
            {
              id: 4,
              title: "Nutrition",
              href: "/models/nutrition",
              icon: "Apple",
              description: "Dietary analysis",
            },
            {
              id: 5,
              title: "Oncology",
              href: "/models/oncology",
              icon: "Dna",
              description: "Cancer screening",
            },
            {
              id: 6,
              title: "Ophthalmology",
              href: "/models/ophthalmology",
              icon: "Eye",
              description: "Ocular diagnostics",
            },
          ],
        },
        {
          id: 2,
          heading: "More Models",
          headingIcon: "Heart",
          links: [
            {
              id: 7,
              title: "Cardiology",
              href: "/models/cardiology",
              icon: "Heart",
              description: "Cardiac analysis",
            },
            {
              id: 8,
              title: "Pathology",
              href: "/models/pathology",
              icon: "Microscope",
              description: "Lab diagnostics",
            },
            {
              id: 9,
              title: "Nephrology",
              href: "/models/nephrology",
              icon: "Droplet",
              description: "Kidney function AI",
            },
            {
              id: 10,
              title: "Endocrinology",
              href: "/models/endocrinology",
              icon: "Zap",
              description: "Metabolic analysis",
            },
            {
              id: 11,
              title: "Gastroenterology",
              href: "/models/gastroenterology",
              icon: "TrendingUp",
              description: "GI diagnostics",
            },
            {
              id: 12,
              title: "STDs",
              href: "/models/stds",
              icon: "ShieldAlert",
              description: "STI detection",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      label: "Developer API",
      href: "/developer-api",
    },
    {
      id: 3,
      label: "Use Cases",
      hasDropdown: true,
      viewAllLabel: "Explore all",
      viewAllHref: "/use-cases",
      menuBlocks: [
        {
          id: 1,
          heading: "Skin Health & Dermatology",
          headingIcon: "Activity",
          links: [
            {
              id: 1,
              title: "AI Skin Lesion Analysis",
              href: "/use-cases/lesion-analysis",
            },
            {
              id: 2,
              title: "Differential Diagnosis",
              href: "/use-cases/differential-diagnosis",
            },
            {
              id: 3,
              title: "Skin Cancer Triage",
              href: "/use-cases/skin-cancer-triage",
            },
            {
              id: 4,
              title: "Wound Assessment",
              href: "/use-cases/wound-assessment",
            },
            {
              id: 5,
              title: "Teledermatology",
              href: "/use-cases/teledermatology",
            },
          ],
        },
        {
          id: 2,
          heading: "Ambient AI & Scribing",
          headingIcon: "Brain",
          links: [
            {
              id: 6,
              title: "Real-Time Documentation",
              href: "/use-cases/realtime-doc",
            },
            { id: 7, title: "Ambient AI Scribe", href: "/use-cases/scribe" },
            {
              id: 8,
              title: "Automated Medical Coding",
              href: "/use-cases/coding",
            },
            { id: 9, title: "EHR-Integrated AI", href: "/use-cases/ehr" },
            { id: 10, title: "Voice Order Entry", href: "/use-cases/voice" },
          ],
        },
        {
          id: 3,
          heading: "Digital Care & Predictions",
          headingIcon: "TrendingUp",
          links: [
            { id: 11, title: "AI Prediction", href: "/use-cases/gynecology" },
            {
              id: 12,
              title: "Pregnancy Monitoring",
              href: "/use-cases/pregnancy",
            },
            { id: 13, title: "MMR Prediction", href: "/use-cases/mmr" },
            {
              id: 14,
              title: "Digital Front Door",
              href: "/use-cases/digital-front-door",
            },
            {
              id: 15,
              title: "Clinical API Gateway",
              href: "/use-cases/api-gateway",
            },
          ],
        },
      ],
    },
    {
      id: 4,
      label: "Pricing",
      href: "/pricing",
    },
    {
      id: 5,
      label: "Company",
      hasDropdown: true,
      menuBlocks: [
        {
          id: 1,
          links: [
            {
              id: 1,
              title: "About Us",
              href: "/about-us",
              icon: "Users",
              description: "Our mission & team",
            },
            {
              id: 2,
              title: "Careers",
              href: "/careers",
              icon: "Briefcase",
              description: "Join the team",
            },
            {
              id: 3,
              title: "Contact",
              href: "/contact-us",
              icon: "Mail",
              description: "Get in touch",
            },
          ],
        },
      ],
    },
    {
      id: 6,
      label: "Resources",
      hasDropdown: true,
      menuBlocks: [
        {
          id: 1,
          links: [
            {
              id: 1,
              title: "White Paper",
              href: "/white-paper",
              icon: "FileText",
              description: "Technical deep-dives",
            },
            {
              id: 2,
              title: "Research Papers",
              href: "/research-papers",
              icon: "BookOpen",
              description: "Peer-reviewed publications",
            },
            {
              id: 3,
              title: "Blogs",
              href: "/blogs",
              icon: "Newspaper",
              description: "Insights & updates",
            },
            {
              id: 4,
              title: "Case Studies",
              href: "/case-studies",
              icon: "CheckCircle2",
              description: "Real-world results",
            },
          ],
        },
      ],
    },
  ],
  loginCta: { title: "Login", url: "/login" },
  signupCta: { title: "Sign Up", url: "/signup" },
};

/* ─── Animation config ─── */
const panelTransition = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 4 },
  transition: {
    duration: 0.18,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  },
};

/* ─── Reusable MegaMenu ─── */
function MegaMenu({
  navLink,
  onMouseEnter,
  onMouseLeave,
  onLinkClick,
  positionStyle,
  dropdownRef,
}: {
  navLink: HeaderNavLink;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onLinkClick: () => void;
  positionStyle?: React.CSSProperties;
  dropdownRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const blocks = navLink.menuBlocks || [];
  if (!blocks.length) return null;

  // Single block with no heading = compact simple list
  const isSimple = blocks.length === 1 && !blocks[0].heading;
  // Multi-block = column layout
  const isMultiColumn = blocks.length > 1;

  return (
    <motion.div
      {...panelTransition}
      ref={dropdownRef}
      className={`hidden md:block absolute mt-3 z-50 rounded-2xl bg-slate-950/95 backdrop-blur-2xl border border-white/[0.06] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.7)] overflow-hidden ${
        isSimple ? "w-60" : "w-max max-w-[90vw]"
      }`}
      style={positionStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="p-3">
        {/* View all link header */}
        {navLink.viewAllHref && (
          <div className="flex items-center justify-between px-3 pb-2.5 mb-2 border-b border-white/[0.05]">
            <span className="text-10 uppercase font-semibold tracking-[0.18em] text-white/35">
              {navLink.label}
            </span>
            <Link
              href={navLink.viewAllHref}
              onClick={onLinkClick}
              className="text-10 uppercase font-semibold tracking-[0.12em] text-brand-blue/50 hover:text-brand-blue transition-colors flex items-center gap-1"
            >
              {navLink.viewAllLabel || "View all"} <ArrowRight size={9} />
            </Link>
          </div>
        )}

        {/* Blocks */}
        <div
          className={isMultiColumn ? "grid gap-0" : ""}
          style={
            isMultiColumn
              ? { gridTemplateColumns: `repeat(${blocks.length}, 1fr)` }
              : undefined
          }
        >
          {blocks.map((block, idx) => (
            <MenuBlock
              key={block.id}
              block={block}
              onLinkClick={onLinkClick}
              showDivider={isMultiColumn && idx < blocks.length - 1}
              compact={isSimple}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Menu Block (single column/group) ─── */
function MenuBlock({
  block,
  onLinkClick,
  showDivider,
  compact,
}: {
  block: HeaderMenuBlock;
  onLinkClick: () => void;
  showDivider?: boolean;
  compact?: boolean;
}) {
  const HeadingIcon = getIcon(block.headingIcon);

  return (
    <div
      className={`px-1 ${showDivider ? "border-r border-white/[0.04]" : ""}`}
    >
      {block.heading && (
        <div className="flex items-center gap-2 px-3 mb-1.5 mt-1">
          {HeadingIcon && (
            <HeadingIcon size={12} className="text-brand-blue/50" />
          )}
          <span className="text-10 uppercase font-semibold tracking-[0.15em] text-white/35">
            {block.heading}
          </span>
        </div>
      )}
      <div className="flex flex-col">
        {block.links?.map((link) => (
          <MenuItem
            key={link.id}
            link={link}
            onLinkClick={onLinkClick}
            compact={compact}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Single Menu Item ─── */
function MenuItem({
  link,
  onLinkClick,
  compact,
}: {
  link: HeaderMenuLink;
  onLinkClick: () => void;
  compact?: boolean;
}) {
  const Icon = getIcon(link.icon);

  return (
    <Link
      href={link.href}
      onClick={onLinkClick}
      className="group/item flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-brand-blue/[0.05] transition-all duration-150"
    >
      {Icon && (
        <div className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center shrink-0 group-hover/item:bg-brand-blue/10 transition-colors">
          <Icon
            size={15}
            className="text-white/35 group-hover/item:text-brand-blue transition-colors"
          />
        </div>
      )}
      {!Icon && !compact && (
        <span className="w-[5px] h-[5px] rounded-full border border-white/15 shrink-0 group-hover/item:border-brand-blue/50 group-hover/item:bg-brand-blue/30 transition-all" />
      )}
      <div className="min-w-0 flex-1">
        <div
          className={`font-medium text-white/75 group-hover/item:text-white truncate transition-colors ${Icon ? "text-13" : "text-12"}`}
        >
          {link.title}
        </div>
        {link.description && (
          <div className="text-11 text-white/25 group-hover/item:text-white/40 truncate transition-colors mt-0.5">
            {link.description}
          </div>
        )}
      </div>
      <ChevronRight
        size={11}
        className="text-white/0 group-hover/item:text-brand-blue/50 shrink-0 transition-all duration-150 -translate-x-1 group-hover/item:translate-x-0"
      />
    </Link>
  );
}

/* ─── Header ─── */
export default function Header({ data }: { data?: HeaderData | null }) {
  const headerData = data || defaultHeaderData;
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeBtnCenter, setActiveBtnCenter] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  // After dropdown renders, measure it and clamp within container
  useLayoutEffect(() => {
    const el = dropdownRef.current;
    const container = navRef.current;
    if (!el || !container || activeDropdown === null) return;

    const containerRect = container.getBoundingClientRect();
    const elWidth = el.offsetWidth;

    // Ideal left = center of button minus half the dropdown width
    let left = activeBtnCenter - elWidth / 2;

    // Clamp: don't overflow left or right of container
    const maxLeft = containerRect.width - elWidth;
    left = Math.max(0, Math.min(left, maxLeft));

    setDropdownStyle({ left });
  }, [activeDropdown, activeBtnCenter]);

  const open = useCallback((id: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(id);

    const btn = btnRefs.current.get(id);
    const container = navRef.current;
    if (btn && container) {
      const btnRect = btn.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setActiveBtnCenter(btnRect.left + btnRect.width / 2 - containerRect.left);
    }
  }, []);

  const close = useCallback(() => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  }, []);

  const closeNow = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(null);
  }, []);

  const navBtnClass = (id: number) =>
    `text-xs lg:text-sm font-medium transition-colors flex items-center gap-1 py-2 cursor-pointer ${
      activeDropdown === id ? "text-white" : "text-white/60 hover:text-white/90"
    }`;

  const chevronClass = (id: number) =>
    `transition-transform duration-200 ${activeDropdown === id ? "rotate-180 text-brand-blue" : ""}`;

  // Build mobile menu items
  const mobileItems: { label: string; href: string }[] = [];
  for (const link of headerData.navLinks) {
    if (!link.hasDropdown && link.href) {
      mobileItems.push({ label: link.label, href: link.href });
    } else if (link.menuBlocks) {
      for (const block of link.menuBlocks) {
        for (const item of block.links || []) {
          mobileItems.push({ label: item.title, href: item.href });
        }
      }
    }
  }

  const seenMobile = new Set<string>();
  const uniqueMobileItems = mobileItems.filter((item) => {
    const key = `${item.label}::${item.href}`;
    if (seenMobile.has(key)) return false;
    seenMobile.add(key);
    return true;
  });

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full">
      <div className="global-container">
        <div className="relative" ref={navRef}>
          <div className="glass-dark rounded-full py-3 px-6 md:px-8 flex items-center justify-between shadow-xl shadow-brand-dark/20 text-white">
            <Link href={headerData.logo.linkUrl} onClick={closeNow}>
              <OjasLogo />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center md:gap-3 lg:gap-5 xl:gap-7">
              {headerData.navLinks.map((link) => {
                if (!link.hasDropdown) {
                  return (
                    <Link
                      key={link.id}
                      href={link.href || "/"}
                      className="text-xs lg:text-sm font-medium text-white/60 hover:text-white/90 transition-colors py-2"
                    >
                      {link.label}
                    </Link>
                  );
                }

                return (
                  <button
                    key={link.id}
                    ref={(el) => {
                      if (el) btnRefs.current.set(link.id, el);
                    }}
                    onMouseEnter={() => open(link.id)}
                    onMouseLeave={close}
                    className={navBtnClass(link.id)}
                  >
                    {link.label}{" "}
                    <ChevronDown size={13} className={chevronClass(link.id)} />
                  </button>
                );
              })}
            </div>

            {/* Auth + Mobile toggle */}
            <div className="flex items-center gap-2">
              <Link
                href={headerData.loginCta?.url || "/login"}
                className="hidden md:inline-flex text-white/90 hover:text-white text-xs font-semibold transition-colors py-2 px-3"
              >
                {headerData.loginCta?.title || "Login"}
              </Link>
              <Link
                href={headerData.signupCta?.url || "/signup"}
                className="hidden md:inline-flex bg-brand-blue text-white text-xs font-bold py-2 px-4 rounded-full hover:bg-brand-hover active:bg-brand-pressed transition-all shadow-md shadow-brand-blue/20"
              >
                {headerData.signupCta?.title || "Sign Up"}
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-1.5 text-white/90 hover:text-white transition-colors"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mega menu panels */}
          <AnimatePresence>
            {headerData.navLinks.map((link) => {
              if (!link.hasDropdown || activeDropdown !== link.id) return null;
              return (
                <MegaMenu
                  key={link.id}
                  navLink={link}
                  onMouseEnter={() => open(link.id)}
                  onMouseLeave={close}
                  onLinkClick={closeNow}
                  positionStyle={dropdownStyle}
                  dropdownRef={dropdownRef}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2"
          >
            <div className="global-container">
              <div className="rounded-2xl glass-dark backdrop-blur-xl border border-white/8 shadow-2xl p-4 max-h-[80vh] overflow-y-auto">
                <div className="flex flex-col gap-1">
                  {uniqueMobileItems.map((item) => (
                    <Link
                      key={`${item.label}::${item.href}`}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-2.5 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/6 transition-all"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t border-white/6">
                  <Link
                    href={headerData.loginCta?.url || "/login"}
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold text-white/80 border border-white/10 hover:bg-white/5 transition-all"
                  >
                    {headerData.loginCta?.title || "Login"}
                  </Link>
                  <Link
                    href={headerData.signupCta?.url || "/signup"}
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center py-2.5 rounded-xl text-sm font-bold text-white bg-brand-blue hover:bg-brand-hover transition-all"
                  >
                    {headerData.signupCta?.title || "Sign Up"}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
