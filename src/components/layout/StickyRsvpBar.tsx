"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useInvitation } from "@/components/experience/InvitationContext";
import { CheckIcon } from "@/components/ui/icons";
import { useLocalRsvp } from "@/lib/rsvp-client";
import { useCountdown } from "@/lib/hooks";
import type { WeddingMeta } from "@/lib/types";

/**
 * Mobile-only action bar. Appears once the guest scrolls past the hero and
 * steps aside while the RSVP section itself is on screen.
 */
export function StickyRsvpBar({ meta }: { meta: WeddingMeta }) {
  const { isRevealed } = useInvitation();
  const rsvp = useLocalRsvp();
  const { value: countdown, ready } = useCountdown(meta.startsAt);
  const [pastHero, setPastHero] = useState(false);
  const [rsvpInView, setRsvpInView] = useState(false);

  useEffect(() => {
    const handler = () => setPastHero(window.scrollY > window.innerHeight * 0.72);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const target = document.getElementById("rsvp");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setRsvpInView(entry.isIntersecting),
      { rootMargin: "-10% 0px -35% 0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const visible = isRevealed && pastHero && !rsvpInView;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
        >
          <div className="border-t border-ink/8 bg-ivory/92 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                {rsvp ? (
                  <>
                    <p className="truncate font-sans text-[0.6rem] uppercase tracking-[0.22em] text-gold">
                      You&rsquo;re on the list
                    </p>
                    <p className="truncate font-display text-lg leading-tight text-ink">
                      Ref {rsvp.reference}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="truncate font-sans text-[0.6rem] uppercase tracking-[0.22em] text-ink-muted">
                      {ready && !countdown.isPast
                        ? `${countdown.days} days to go`
                        : meta.displayDate}
                    </p>
                    <p className="truncate font-display text-lg leading-tight text-ink">
                      Will you be there?
                    </p>
                  </>
                )}
              </div>
              <a
                href="#rsvp"
                className="inline-flex min-h-[48px] shrink-0 items-center gap-2 rounded-full bg-ink px-7 font-sans text-[0.66rem] uppercase tracking-[0.22em] text-ivory transition-colors active:bg-forest"
              >
                {rsvp ? <CheckIcon width={15} height={15} /> : null}
                {rsvp ? "View" : "RSVP"}
              </a>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
