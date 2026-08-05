"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { HeaderNavLink } from "@/app/lib/types";

/* ─── Desktop nav links + dropdown triggers ─── */
export default function DesktopNav({
  navLinks,
  activeId,
  onOpen,
  onClose,
  registerButton,
}: {
  navLinks: HeaderNavLink[];
  activeId: number | null;
  onOpen: (id: number) => void;
  onClose: () => void;
  registerButton: (id: number, el: HTMLButtonElement | null) => void;
}) {
  return (
    <div className="hidden md:flex items-center md:gap-3 lg:gap-5 xl:gap-7">
      {navLinks.map((link) =>
        link.hasDropdown ? (
          <button
            key={link.id}
            ref={(el) => registerButton(link.id, el)}
            onMouseEnter={() => onOpen(link.id)}
            onMouseLeave={onClose}
            className={`text-xs lg:text-sm font-medium transition-colors flex items-center gap-1 py-2 cursor-pointer ${
              activeId === link.id
                ? "text-white"
                : "text-white/60 hover:text-white/90"
            }`}
          >
            {link.label}{" "}
            <ChevronDown
              size={13}
              className={`transition-transform duration-200 ${
                activeId === link.id ? "rotate-180 text-brand-blue" : ""
              }`}
            />
          </button>
        ) : (
          <Link
            key={link.id}
            href={link.href || "/"}
            className="text-xs lg:text-sm font-medium text-white/60 hover:text-white/90 transition-colors py-2"
          >
            {link.label}
          </Link>
        ),
      )}
    </div>
  );
}
