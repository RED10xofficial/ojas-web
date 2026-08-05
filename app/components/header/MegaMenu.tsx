"use client";

import type { CSSProperties, RefObject } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { HeaderNavLink } from "@/app/lib/types";
import MenuBlock from "./MenuBlock";

const panelTransition = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 4 },
  transition: {
    duration: 0.18,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  },
};

/* ─── Dropdown panel for one nav link ─── */
export default function MegaMenu({
  navLink,
  onMouseEnter,
  onMouseLeave,
  onLinkClick,
  positionStyle,
  panelRef,
}: {
  navLink: HeaderNavLink;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onLinkClick: () => void;
  positionStyle?: CSSProperties;
  panelRef?: RefObject<HTMLDivElement | null>;
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
      ref={panelRef}
      className={`hidden md:block absolute mt-3 z-50 rounded-2xl bg-slate-950/95 backdrop-blur-2xl border border-white/[0.06] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.7)] overflow-hidden ${
        isSimple ? "w-60" : "w-max max-w-[90vw]"
      }`}
      style={positionStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="p-3">
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
