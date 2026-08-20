"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { HeaderCtaButton, HeaderNavLink } from "@/app/lib/types";

type MobileItem = { label: string; href: string };

/**
 * There are no dropdowns on mobile, so every nav link gets flattened into a single
 * de-duplicated list, whether it was top level or buried in a mega menu block.
 */
function flattenNavLinks(navLinks: HeaderNavLink[]): MobileItem[] {
  const items = navLinks.flatMap<MobileItem>((link) => {
    if (!link.hasDropdown && link.href) {
      return [{ label: link.label, href: link.href }];
    }
    return (link.menuBlocks ?? []).flatMap(
      (block) =>
        block.links?.map((item) => ({
          label: item.title,
          href: item.href,
        })) ?? [],
    );
  });

  const byKey = new Map(items.map((item) => [itemKey(item), item]));
  return [...byKey.values()];
}

const itemKey = (item: MobileItem) => `${item.label}::${item.href}`;

/* ─── Mobile menu panel ─── */
export default function MobileMenu({
  navLinks,
  loginCta,
  signupCta,
  onClose,
}: {
  navLinks: HeaderNavLink[];
  loginCta?: HeaderCtaButton;
  signupCta?: HeaderCtaButton;
  onClose: () => void;
}) {
  const items = flattenNavLinks(navLinks);

  return (
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
            {items.map((item) => (
              <Link
                key={itemKey(item)}
                href={item.href}
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/6 transition-all"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex gap-2 mt-4 pt-4 border-t border-white/6">
            <Link
              href={loginCta?.url || "/login"}
              onClick={onClose}
              className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold text-white/80 border border-white/10 hover:bg-white/5 transition-all"
            >
              {loginCta?.title || "Login"}
            </Link>
            <Link
              href={signupCta?.url || "/signup"}
              onClick={onClose}
              className="flex-1 text-center py-2.5 rounded-xl text-sm font-bold text-white bg-brand-blue hover:bg-brand-hover transition-all"
            >
              {signupCta?.title || "Sign Up"}
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
