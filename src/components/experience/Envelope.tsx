"use client";

import { motion, useReducedMotion } from "motion/react";
import type { InvitationPhase } from "@/components/experience/InvitationContext";

interface EnvelopeProps {
  phase: InvitationPhase;
  monogram: string;
  names: string;
  displayDate: string;
  location: string;
  onOpen: () => void;
}

const silk = [0.22, 1, 0.36, 1] as const;

/**
 * A folded paper envelope built from layered panels:
 *   back → invitation card → front pocket → flap
 * The flap drops behind the card mid-rotation so the card can rise out of it.
 */
export function Envelope({
  phase,
  monogram,
  names,
  displayDate,
  location,
  onOpen,
}: EnvelopeProps) {
  const reduceMotion = useReducedMotion();
  const isOpening = phase !== "sealed";
  const cardOut = phase === "card" || phase === "revealed";

  return (
    <div
      className="relative mx-auto w-[min(21rem,84vw)]"
      style={{ perspective: "1400px" }}
    >
      <motion.div
        className="relative aspect-[3/2] w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={
          reduceMotion
            ? {}
            : { y: cardOut ? 22 : 0, rotateX: isOpening ? 6 : 0 }
        }
        transition={{ duration: 1.1, ease: silk }}
      >
        {/* Back panel + inner liner */}
        <div className="absolute inset-0 rounded-[0.55rem] bg-[linear-gradient(160deg,#efe4d2,#e3d4bd)] shadow-[0_30px_70px_-30px_rgba(20,16,12,0.75)]">
          <div className="absolute inset-[3px] rounded-[0.45rem] bg-[linear-gradient(180deg,#1f3a32,#16281f)] opacity-95" />
        </div>

        {/* Invitation card */}
        <motion.div
          className="absolute bottom-[7%] left-[5%] z-10 h-[145%] w-[90%] origin-bottom overflow-hidden rounded-[0.4rem] bg-[linear-gradient(170deg,#fdfaf5,#f4ede1)] shadow-[0_24px_50px_-28px_rgba(20,16,12,0.6)]"
          initial={{ scaleY: 0.56, y: 0 }}
          animate={
            reduceMotion
              ? { scaleY: 1, y: cardOut ? -40 : 0, opacity: cardOut ? 1 : 0 }
              : { scaleY: cardOut ? 1 : 0.56, y: cardOut ? "-36%" : "0%" }
          }
          transition={{ duration: 1.25, ease: silk, delay: cardOut ? 0.15 : 0 }}
        >
          <div className="paper-grain absolute inset-0" />
          <motion.div
            className="relative flex h-full flex-col items-center justify-center gap-3 px-6 py-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: cardOut ? 1 : 0 }}
            transition={{ duration: 0.75, delay: cardOut ? 0.35 : 0 }}
          >
            <span
              className="absolute inset-3 rounded-[0.25rem] border border-gold/25"
              aria-hidden
            />
            <p className="font-sans text-[0.55rem] uppercase tracking-[0.4em] text-gold">
              Together with their families
            </p>
            <h2 className="font-display text-[2rem] leading-[1.05] text-ink sm:text-[2.4rem]">
              {names}
            </h2>
            <span className="h-px w-10 bg-gold/50" aria-hidden />
            <p className="font-sans text-[0.6rem] uppercase tracking-[0.3em] text-ink-soft">
              {displayDate}
            </p>
            <p className="font-sans text-[0.6rem] uppercase tracking-[0.3em] text-ink-muted">
              {location}
            </p>
          </motion.div>
        </motion.div>

        {/* Front pocket with folded side seams */}
        <div className="absolute inset-0 z-20 overflow-hidden rounded-[0.55rem]">
          <div
            className="absolute inset-x-0 bottom-0 top-0 bg-[linear-gradient(165deg,#f6efe3,#e6d8c1)]"
            style={{ clipPath: "polygon(0 34%, 50% 72%, 100% 34%, 100% 100%, 0 100%)" }}
          />
          <div
            className="absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(120deg,#f2e9db,#e0d0b8)] opacity-90"
            style={{ clipPath: "polygon(0 0, 100% 71%, 100% 100%, 0 100%)" }}
          />
          <div
            className="absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(240deg,#f2e9db,#e0d0b8)] opacity-90"
            style={{ clipPath: "polygon(100% 0, 0 71%, 0 100%, 100% 100%)" }}
          />
          <div className="paper-grain absolute inset-0" />
          <div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(0deg,rgba(29,25,22,0.10),transparent)]"
            aria-hidden
          />
        </div>

        {/* Flap — folds up and drops behind the card */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[72%] origin-top"
          style={{
            transformStyle: "preserve-3d",
            zIndex: isOpening ? 5 : 30,
          }}
          initial={{ rotateX: 0 }}
          animate={{ rotateX: isOpening ? -174 : 0 }}
          transition={{ duration: reduceMotion ? 0.01 : 1, ease: [0.6, 0.02, 0.2, 1] }}
        >
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,#f7f0e4,#e9dbc4)]"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              backfaceVisibility: "hidden",
              filter: "drop-shadow(0 8px 12px rgba(29,25,22,0.18))",
            }}
          />
          {/* Reverse side (visible once the flap has swung open) */}
          <div
            className="absolute inset-0 bg-[linear-gradient(0deg,#26433a,#1a3129)]"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              transform: "rotateX(180deg)",
              backfaceVisibility: "hidden",
            }}
          />
        </motion.div>

        {/* Wax seal */}
        <motion.button
          type="button"
          onClick={onOpen}
          aria-label="Open the invitation"
          className="absolute left-1/2 top-[58%] z-40 flex h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-ivory"
          animate={
            isOpening
              ? { opacity: 0, scale: 0.6, rotate: -25 }
              : { opacity: 1, scale: 1, rotate: 0 }
          }
          transition={{ duration: 0.5, ease: silk }}
          style={{ pointerEvents: isOpening ? "none" : "auto" }}
        >
          <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_28%,#c9a86a,#9c6f36_55%,#7d5526)] shadow-[0_10px_22px_-8px_rgba(20,16,12,0.8),inset_0_1px_2px_rgba(255,255,255,0.45)]" />
          <span
            className="absolute inset-0 rounded-full opacity-70"
            style={{
              maskImage: "radial-gradient(circle, transparent 62%, black 63%)",
              WebkitMaskImage: "radial-gradient(circle, transparent 62%, black 63%)",
              background:
                "conic-gradient(from 0deg, #b8894c, #e0c48d, #a5763d, #d7b57e, #b8894c)",
            }}
            aria-hidden
          />
          {!isOpening && !reduceMotion ? (
            <span
              className="absolute inset-0 rounded-full border border-gold-light/60"
              style={{ animation: "ww-pulse-ring 2.8s ease-out infinite" }}
              aria-hidden
            />
          ) : null}
          <span className="relative font-display text-[1.35rem] tracking-tight text-[#fdf6e8] drop-shadow-[0_1px_1px_rgba(80,52,20,0.7)]">
            {monogram}
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}
