"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { useInvitation } from "@/components/experience/InvitationContext";
import { ShareButton } from "@/components/layout/ShareButton";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { useLockBodyScroll, useScrollSpy, useScrolled } from "@/lib/hooks";
import type { Couple, WeddingMeta } from "@/lib/types";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "story", label: "Our Story" },
  { id: "wedding", label: "Wedding" },
  { id: "gallery", label: "Gallery" },
  { id: "aso-ebi", label: "Aso Ebi" },
  { id: "registry", label: "Registry" },
  { id: "faq", label: "FAQ" },
];

const DESKTOP_ITEMS = NAV_ITEMS.filter((item) => item.id !== "home");
const SPY_IDS = [...NAV_ITEMS.map((item) => item.id), "rsvp", "dress-code", "contact"];

export function Navbar({ couple, meta }: { couple: Couple; meta: WeddingMeta }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(40);
  const active = useScrollSpy(SPY_IDS);
  const { isRevealed } = useInvitation();

  useLockBodyScroll(menuOpen);

  useEffect(() => {
    if (!isRevealed) setMenuOpen(false);
  }, [isRevealed]);

  const go = useCallback((id: string) => {
    setMenuOpen(false);
    // Let the menu finish closing before scrolling so the transition reads well.
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 160);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? "border-b border-ink/8 bg-ivory/88 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
        style={{ height: "var(--nav-height)" }}
      >
        <nav className="container-page flex h-full items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => go("home")}
            className={cn(
              "flex items-baseline gap-2.5 transition-colors",
              scrolled ? "text-ink" : "text-ink",
            )}
            aria-label="Back to top"
          >
            <span className="font-display text-xl tracking-tight">{couple.monogram}</span>
            <span className="hidden font-sans text-[0.58rem] uppercase tracking-[0.32em] text-ink-muted sm:inline">
              {couple.shortNames}
            </span>
          </button>

          <div className="hidden items-center gap-7 lg:flex">
            {DESKTOP_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                className={cn(
                  "relative py-2 font-sans text-[0.63rem] uppercase tracking-[0.24em] transition-colors duration-300",
                  active === item.id ? "text-gold" : "text-ink-soft hover:text-ink",
                )}
              >
                {item.label}
                {active === item.id ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 h-px w-full bg-gold"
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                ) : null}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 text-ink-soft">
            <ShareButton meta={meta} />
            <button
              type="button"
              onClick={() => go("rsvp")}
              className="hidden min-h-[44px] items-center rounded-full bg-ink px-6 font-sans text-[0.63rem] uppercase tracking-[0.22em] text-ivory transition-colors hover:bg-forest lg:inline-flex"
            >
              RSVP
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:text-gold lg:hidden"
            >
              <MenuIcon width={22} height={22} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="fixed inset-0 z-[70] bg-[linear-gradient(170deg,#1f3a32,#14231d)] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="container-page flex h-[100svh] flex-col">
              <div className="flex h-[var(--nav-height)] items-center justify-between">
                <span className="font-display text-xl text-ivory">{couple.monogram}</span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="flex h-11 w-11 items-center justify-center rounded-full text-ivory/80 transition-colors hover:text-gold-light"
                >
                  <CloseIcon width={22} height={22} />
                </button>
              </div>

              <nav className="flex flex-1 flex-col justify-center gap-1 pb-16">
                {NAV_ITEMS.map((item, index) => (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={() => go(item.id)}
                    className="group flex items-baseline gap-4 py-3 text-left"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.06 * index, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="font-sans text-[0.6rem] tracking-[0.2em] text-gold-light/60">
                      0{index + 1}
                    </span>
                    <span className="font-display text-[2rem] leading-tight text-ivory transition-colors group-hover:text-gold-light">
                      {item.label}
                    </span>
                  </motion.button>
                ))}

                <motion.button
                  type="button"
                  onClick={() => go("rsvp")}
                  className="mt-8 inline-flex min-h-[54px] w-full items-center justify-center rounded-full bg-gold px-8 font-sans text-[0.7rem] uppercase tracking-[0.26em] text-ink"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  RSVP Now
                </motion.button>
              </nav>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
