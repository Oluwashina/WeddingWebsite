"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { CloseIcon } from "@/components/ui/icons";
import { useEscapeKey, useLockBodyScroll } from "@/lib/hooks";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  children: ReactNode;
}

/**
 * Bottom sheet on phones, centred dialog from `sm` upwards. Traps focus loosely
 * (focuses the panel on open) and closes on Escape or backdrop press.
 */
export function Sheet({ open, onClose, title, eyebrow, children }: SheetProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useLockBodyScroll(open);
  useEscapeKey(onClose, open);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center">
          <motion.button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/55 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="relative max-h-[88svh] w-full overflow-y-auto rounded-t-[1.75rem] bg-ivory p-6 shadow-[0_-20px_60px_-24px_rgba(29,25,22,0.5)] outline-none sm:max-h-[86svh] sm:max-w-lg sm:rounded-[1.5rem] sm:p-8"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 48, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-ink/15 sm:hidden" aria-hidden />
            <div className="flex items-start justify-between gap-6">
              <div>
                {eyebrow ? <p className="eyebrow mb-2">{eyebrow}</p> : null}
                <h3 className="text-[1.7rem] leading-tight sm:text-[2rem]">{title}</h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="-mr-1 -mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-ink/5 hover:text-ink"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="mt-6">{children}</div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
