"use client";

import { motion, useReducedMotion } from "motion/react";
import { Countdown } from "@/components/sections/Countdown";
import { Button } from "@/components/ui/Button";
import { Ornament } from "@/components/ui/Ornament";
import { Petals } from "@/components/ui/Petals";
import { SmartImage } from "@/components/ui/SmartImage";
import { CalendarIcon, MapPinIcon } from "@/components/ui/icons";
import type { Couple, WeddingMeta } from "@/lib/types";

const silk = [0.22, 1, 0.36, 1] as const;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero({ couple, meta }: { couple: Couple; meta: WeddingMeta }) {
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease: silk },
  });

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-ivory pb-16 pt-[calc(var(--nav-height)+1.5rem)] sm:pb-20 lg:min-h-[100svh] lg:pt-[calc(var(--nav-height)+3rem)]"
    >
      {/* Warm light falling from the top-right, plus a whisper of petals. */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_78%_-5%,rgba(214,189,142,0.4),transparent_58%),radial-gradient(70%_55%_at_10%_100%,rgba(31,58,50,0.09),transparent_60%)]"
        aria-hidden
      />
      <Petals count={9} opacity={0.28} />

      <div className="container-page relative">
        <div className="grid items-center gap-9 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Text column */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.p className="eyebrow" {...rise(0.05)}>
              {couple.hashtag}
            </motion.p>

            <motion.h1
              className="mt-5 text-[3.1rem] leading-[0.95] tracking-[-0.02em] sm:text-[4.2rem] lg:text-[5.1rem]"
              {...rise(0.14)}
            >
              <span className="block">{couple.brideFirstName}</span>
              <span className="my-1 block font-display text-[1.9rem] italic text-gold sm:text-[2.4rem] lg:my-2">
                &amp;
              </span>
              <span className="block">{couple.groomFirstName}</span>
            </motion.h1>

            <motion.p
              className="mt-6 font-sans text-[0.68rem] uppercase tracking-[0.34em] text-ink-soft"
              {...rise(0.24)}
            >
              {couple.tagline}
            </motion.p>

            <motion.div className="mt-7 lg:self-start" {...rise(0.3)}>
              <Ornament className="mx-auto lg:mx-0" />
            </motion.div>

            <motion.div
              className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:gap-7 lg:items-start"
              {...rise(0.36)}
            >
              <span className="flex items-center gap-2.5 font-sans text-[0.78rem] tracking-[0.08em] text-ink-soft">
                <CalendarIcon width={17} height={17} className="text-gold" />
                {meta.displayDate}
              </span>
              <span className="hidden h-4 w-px bg-ink/15 sm:block" aria-hidden />
              <span className="flex items-center gap-2.5 font-sans text-[0.78rem] tracking-[0.08em] text-ink-soft">
                <MapPinIcon width={17} height={17} className="text-gold" />
                {meta.displayLocation}
              </span>
            </motion.div>

            {/* Side by side on phones: keeps both CTAs and the portrait above the
                fold instead of two stacked full-width slabs. */}
            <motion.div
              className="mt-8 flex w-full max-w-[21rem] justify-center gap-2.5 sm:max-w-none sm:gap-4 lg:mt-9 lg:justify-start"
              {...rise(0.44)}
            >
              <Button
                onClick={() => scrollTo("rsvp")}
                className="flex-1 px-4 text-[0.66rem] sm:flex-none sm:min-w-[10.5rem] sm:px-9 sm:text-[0.72rem]"
              >
                RSVP
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollTo("wedding")}
                className="flex-1 px-4 text-[0.66rem] sm:flex-none sm:px-8 sm:text-[0.72rem]"
              >
                View Details
              </Button>
            </motion.div>
          </div>

          {/* Arch portrait */}
          <motion.div
            className="relative mx-auto w-full max-w-[24rem] lg:max-w-none"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 34, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.2, ease: silk }}
          >
            <div
              className="absolute -inset-x-3 -top-4 bottom-8 rounded-t-[999px] rounded-b-[1.5rem] border border-gold/25"
              aria-hidden
            />
            <div className="group relative">
              <SmartImage
                photo={couple.heroPhoto}
                monogram={couple.monogram}
                priority
                sizes="(max-width: 1024px) 88vw, 42vw"
                className="aspect-[4/5] w-full rounded-t-[999px] rounded-b-[1.25rem] shadow-[0_40px_80px_-40px_rgba(29,25,22,0.55)] sm:aspect-[3/4]"
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-t-[999px] rounded-b-[1.25rem] bg-[linear-gradient(180deg,transparent_55%,rgba(29,25,22,0.18))]"
                aria-hidden
              />
            </div>
          </motion.div>
        </div>

        {/* Countdown */}
        <motion.div
          className="relative mx-auto mt-14 max-w-3xl rounded-[1.25rem] border border-ink/8 bg-white/60 px-4 py-6 shadow-[0_24px_60px_-40px_rgba(29,25,22,0.5)] backdrop-blur-sm sm:px-10 sm:py-8 lg:mt-16"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: silk }}
        >
          <p className="mb-5 text-center font-sans text-[0.56rem] uppercase tracking-[0.34em] text-ink-muted">
            Counting down to the celebration
          </p>
          <Countdown targetIso={meta.startsAt} />
        </motion.div>

        <motion.button
          type="button"
          onClick={() => scrollTo("story")}
          className="mx-auto mt-12 hidden flex-col items-center gap-2 font-sans text-[0.55rem] uppercase tracking-[0.3em] text-ink-muted transition-colors hover:text-gold lg:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Our story
          <motion.span
            className="block h-10 w-px bg-gradient-to-b from-gold/60 to-transparent"
            animate={reduceMotion ? {} : { scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </motion.button>
      </div>
    </section>
  );
}
