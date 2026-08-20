"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "motion/react";
import { Menu, X, Search } from "lucide-react";
import type { HeaderData } from "@/app/lib/types";
import { defaultHeaderData } from "@/app/lib/headerFallback";
import OjasLogo from "./header/OjasLogo";
import DesktopNav from "./header/DesktopNav";
import MegaMenu from "./header/MegaMenu";
import MobileMenu from "./header/MobileMenu";
import SearchOverlay from "./header/SearchOverlay";
import { useMegaMenu } from "./header/useMegaMenu";

export default function Header({ data }: { data?: HeaderData | null }) {
  const headerData = data || defaultHeaderData;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const {
    activeId,
    navRef,
    panelRef,
    panelStyle,
    registerButton,
    open,
    close,
    closeNow,
  } = useMegaMenu();

  const activeLink = headerData.navLinks.find(
    (link) => link.hasDropdown && link.id === activeId,
  );

  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full">
        <div className="global-container">
          <div className="relative" ref={navRef}>
            <div className="glass-dark rounded-full py-3 px-6 md:px-8 flex items-center justify-between shadow-xl shadow-brand-dark/20 text-white">
              <Link href={headerData.logo.linkUrl} onClick={closeNow}>
                <OjasLogo />
              </Link>

              <DesktopNav
                navLinks={headerData.navLinks}
                activeId={activeId}
                onOpen={open}
                onClose={close}
                registerButton={registerButton}
              />

              {/* Search + auth + mobile toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    closeNow();
                    setMobileOpen(false);
                    setSearchOpen(true);
                  }}
                  aria-label="Search"
                  className="p-1.5 text-white/90 hover:text-white transition-colors cursor-pointer"
                >
                  <Search size={18} />
                </button>
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

            <AnimatePresence>
              {activeLink && (
                <MegaMenu
                  key={activeLink.id}
                  navLink={activeLink}
                  onMouseEnter={() => open(activeLink.id)}
                  onMouseLeave={close}
                  onLinkClick={closeNow}
                  positionStyle={panelStyle}
                  panelRef={panelRef}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <MobileMenu
              navLinks={headerData.navLinks}
              loginCta={headerData.loginCta}
              signupCta={headerData.signupCta}
              onClose={() => setMobileOpen(false)}
            />
          )}
        </AnimatePresence>
      </nav>

      {/* Has to live outside <nav>: that -translate-x-1/2 would become the containing
          block for the overlay's `fixed` positioning and pin the backdrop to the header
          strip instead of the viewport. */}
      <AnimatePresence>
        {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
