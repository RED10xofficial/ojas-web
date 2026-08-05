"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { HeaderMenuLink } from "@/app/lib/types";
import { Icon, hasIcon } from "./icons";

/* ─── Single menu item ─── */
export default function MenuItem({
  link,
  onLinkClick,
  compact,
}: {
  link: HeaderMenuLink;
  onLinkClick: () => void;
  compact?: boolean;
}) {
  const showIcon = hasIcon(link.icon);

  return (
    <Link
      href={link.href}
      onClick={onLinkClick}
      className="group/item flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-brand-blue/[0.05] transition-all duration-150"
    >
      {showIcon && (
        <div className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center shrink-0 group-hover/item:bg-brand-blue/10 transition-colors">
          <Icon
            name={link.icon}
            size={15}
            className="text-white/35 group-hover/item:text-brand-blue transition-colors"
          />
        </div>
      )}
      {!showIcon && !compact && (
        <span className="w-[5px] h-[5px] rounded-full border border-white/15 shrink-0 group-hover/item:border-brand-blue/50 group-hover/item:bg-brand-blue/30 transition-all" />
      )}
      <div className="min-w-0 flex-1">
        <div
          className={`font-medium text-white/75 group-hover/item:text-white truncate transition-colors ${showIcon ? "text-13" : "text-12"}`}
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
