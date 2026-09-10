"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Envelope } from "@/components/experience/Envelope";
import {
  InvitationContext,
  type InvitationPhase,
} from "@/components/experience/InvitationContext";
import { Confetti } from "@/components/ui/Confetti";
import { Petals } from "@/components/ui/Petals";
import { Ornament } from "@/components/ui/Ornament";
import { useMusic } from "@/components/layout/MusicProvider";
import { useLockBodyScroll } from "@/lib/hooks";
import type { Couple, WeddingMeta } from "@/lib/types";

const STORAGE_KEY = "ww:invitation-opened";
const silk = [0.22, 1, 0.36, 1] as const;

interface InvitationGateProps {
  couple: Couple;
  meta: WeddingMeta;
  children: ReactNode;
}

export function InvitationGate({ couple, meta, children }: InvitationGateProps) {
  const [phase, setPhase] = useState<InvitationPhase>("sealed");
  const [justOpened, setJustOpened] = useState(false);
  const timers = useRef<number[]>([]);
  const reduceMotion = useReducedMotion();
  const music = useMusic();

  const isRevealed = phase === "revealed";
  useLockBodyScroll(!isRevealed);

  // Returning guests (refresh, back navigation) go straight to the site.
  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY) === "1") {
        setPhase("revealed");
      }
    } catch {
      /* private mode — just show the envelope */
    }
  }, []);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);

  const finish = useCallback((withCelebration: boolean) => {
    setJustOpened(withCelebration);
    setPhase("revealed");
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const open = useCallback(() => {
    void music?.playFromGesture();
    setPhase((current) => {
      if (current !== "sealed") return current;
      if (reduceMotion) {
        window.setTimeout(() => finish(false), 400);
        return "card";
      }
      timers.current.push(window.setTimeout(() => setPhase("card"), 820));
      timers.current.push(window.setTimeout(() => finish(true), 4200));
      return "opening";
    });
  }, [finish, music, reduceMotion]);

  const skip = useCallback(() => {
    void music?.playFromGesture();
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    finish(false);
  }, [finish, music]);

  const value = useMemo(
    () => ({ phase, isRevealed, open, skip, justOpened }),
    [phase, isRevealed, open, skip, justOpened],
  );

  const cardShowing = phase === "card";

  return (
    <InvitationContext.Provider value={value}>
      <AnimatePresence>
        {!isRevealed ? (
          <motion.div
            key="envelope-overlay"
            className="paper-grain fixed inset-0 z-[90] overflow-hidden bg-[radial-gradient(120%_100%_at_50%_0%,#e8a4ad_0%,#c97885_48%,#a85f6a_100%)]"
            initial={{ opacity: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0, transition: { duration: 0.4 } }
                : {
                    opacity: 0,
                    scale: 1.08,
                    filter: "blur(8px)",
                    transition: { duration: 1.05, ease: silk },
                  }
            }
          >
            <Petals count={10} opacity={0.28} palette={["#f5dde1", "#e8a4ad", "#d4b896"]} />

            <div className="relative flex h-[100svh] flex-col items-center justify-center px-6">
              <motion.div
                className="flex flex-col items-center text-center"
                animate={{
                  opacity: cardShowing ? 0 : 1,
                  y: cardShowing ? -16 : 0,
                }}
                transition={{ duration: 0.7, ease: silk }}
              >
                <motion.p
                  className="font-sans text-[0.6rem] uppercase tracking-[0.42em] text-ivory/85"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.15, ease: silk }}
                >
                  {couple.invitationEyebrow ?? "Tune in to"}
                </motion.p>
                <motion.h1
                  className="mt-4 font-display text-[2.8rem] leading-[1.02] text-ivory sm:text-[3.6rem]"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, delay: 0.3, ease: silk }}
                >
                  {couple.invitationHeadline ?? couple.hashtag}
                </motion.h1>
                <motion.p
                  className="mt-5 font-sans text-[0.68rem] uppercase tracking-[0.28em] text-ivory/75"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.45, ease: silk }}
                >
                  {couple.shortNames} {couple.tagline}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.55 }}
                  className="mt-5"
                >
                  <Ornament tone="light" className="opacity-70" />
                </motion.div>
              </motion.div>

              {/* The card rises high above the pocket, so once it is out the whole
                  stage slides down into the room the fading heading leaves behind. */}
              <motion.div
                className="w-full"
                animate={{ y: cardShowing ? "12vh" : "0vh" }}
                transition={{ duration: 1.2, ease: silk }}
              >
                <motion.div
                  className="mt-7 w-full"
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, delay: 0.5, ease: silk }}
                >
                  <Envelope
                    phase={phase}
                    monogram={couple.monogram}
                    seal={couple.seal}
                    names={couple.shortNames}
                    displayDate={meta.displayDate}
                    location={meta.displayLocation}
                    onOpen={open}
                  />
                </motion.div>

                <div className="mt-9 flex min-h-[6rem] flex-col items-center gap-4">
                  <AnimatePresence mode="wait">
                    {phase === "sealed" ? (
                      <motion.button
                        key="open-cta"
                        type="button"
                        onClick={open}
                        className="inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full border border-gold-light/45 bg-gold-light/10 px-9 font-sans text-[0.7rem] uppercase tracking-[0.28em] text-ivory backdrop-blur-sm transition-all duration-500 hover:border-gold-light hover:bg-gold-light/20 active:scale-[0.985]"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.7, delay: 0.7, ease: silk }}
                      >
                        Open Invitation
                      </motion.button>
                    ) : (
                      <motion.button
                        key="enter-cta"
                        type="button"
                        onClick={skip}
                        className="inline-flex min-h-[48px] items-center justify-center gap-2 px-6 font-sans text-[0.62rem] uppercase tracking-[0.3em] text-ivory/70 transition-colors hover:text-gold-light"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, delay: 1.8 }}
                      >
                        Enter our website
                      </motion.button>
                    )}
                  </AnimatePresence>

                  {phase === "sealed" ? (
                    <motion.button
                      type="button"
                      onClick={skip}
                      className="min-h-[40px] font-sans text-[0.6rem] uppercase tracking-[0.26em] text-ivory/45 underline-offset-8 transition-colors hover:text-ivory/80 hover:underline"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                    >
                      Skip intro
                    </motion.button>
                  ) : null}
                </div>
              </motion.div>
            </div>

            <Confetti active={cardShowing} particleCount={40} duration={3600} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ opacity: isRevealed ? 1 : 0 }}
        transition={{ duration: isRevealed ? 0.9 : 0, delay: isRevealed ? 0.1 : 0, ease: silk }}
        aria-hidden={!isRevealed}
      >
        {children}
      </motion.div>
    </InvitationContext.Provider>
  );
}
