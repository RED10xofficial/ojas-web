"use client";

import type { HeaderMenuBlock } from "@/app/lib/types";
import { Icon } from "./icons";
import MenuItem from "./MenuItem";

/* ─── Menu block (single column/group) ─── */
export default function MenuBlock({
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
  return (
    <div className={`px-1 ${showDivider ? "border-r border-white/[0.04]" : ""}`}>
      {block.heading && (
        <div className="flex items-center gap-2 px-3 mb-1.5 mt-1">
          <Icon
            name={block.headingIcon}
            size={12}
            className="text-brand-blue/50"
          />
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
