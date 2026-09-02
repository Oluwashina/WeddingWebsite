"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SmartImage } from "@/components/ui/SmartImage";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  SparkIcon,
} from "@/components/ui/icons";
import { downloadIcs, googleCalendarUrl } from "@/lib/calendar";
import type { Couple, WeddingEvent } from "@/lib/types";
import { mapsLink } from "@/lib/utils";

function CalendarMenu({ event, coupleNames }: { event: WeddingEvent; coupleNames: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [open]);

  return (
    <div className="relative flex-1" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full border border-ink/15 px-4 font-sans text-[0.62rem] uppercase tracking-[0.18em] text-ink transition-colors hover:border-gold hover:text-gold"
      >
        <CalendarIcon width={15} height={15} />
        Add to calendar
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-[calc(100%+0.5rem)] left-0 z-30 w-full overflow-hidden rounded-xl border border-ink/10 bg-ivory shadow-[0_18px_44px_-20px_rgba(29,25,22,0.5)]"
          >
            <a
              href={googleCalendarUrl(event, coupleNames)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="block px-4 py-3 font-sans text-[0.72rem] tracking-wide text-ink-soft transition-colors hover:bg-champagne/40 hover:text-ink"
            >
              Google Calendar
            </a>
            <span className="block h-px bg-ink/8" aria-hidden />
            <button
              type="button"
              onClick={() => {
                downloadIcs(event, coupleNames);
                setOpen(false);
              }}
              className="block w-full px-4 py-3 text-left font-sans text-[0.72rem] tracking-wide text-ink-soft transition-colors hover:bg-champagne/40 hover:text-ink"
            >
              Apple / Outlook (.ics)
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function EventCard({ event, couple }: { event: WeddingEvent; couple: Couple }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-ink/8 bg-ivory shadow-[0_20px_50px_-38px_rgba(29,25,22,0.55)] transition-shadow duration-700 hover:shadow-[0_34px_70px_-40px_rgba(29,25,22,0.6)]">
      <div className="relative">
        <SmartImage
          photo={event.photo ?? { src: "", alt: event.name }}
          monogram={couple.monogram}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="aspect-[16/10] w-full"
        />
        <span
          className="absolute inset-x-0 bottom-0 h-1"
          style={{ backgroundColor: event.accentColor }}
          aria-hidden
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="eyebrow" style={{ color: event.accentColor }}>
          {event.subtitle}
        </p>
        <h3 className="mt-3 text-[1.7rem] leading-tight">{event.name}</h3>
        <p className="mt-3 text-[0.92rem] leading-[1.8] text-ink-soft">{event.description}</p>

        <dl className="mt-6 space-y-3.5 border-t border-ink/8 pt-5 text-[0.86rem]">
          <div className="flex gap-3">
            <dt className="mt-0.5 shrink-0 text-gold">
              <CalendarIcon width={16} height={16} />
              <span className="sr-only">Date</span>
            </dt>
            <dd className="text-ink">{event.displayDate}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="mt-0.5 shrink-0 text-gold">
              <ClockIcon width={16} height={16} />
              <span className="sr-only">Time</span>
            </dt>
            <dd className="text-ink">{event.displayTime}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="mt-0.5 shrink-0 text-gold">
              <MapPinIcon width={16} height={16} />
              <span className="sr-only">Venue</span>
            </dt>
            <dd>
              <span className="block text-ink">{event.venue}</span>
              <span className="block text-ink-muted">{event.address}</span>
            </dd>
          </div>
          <div className="flex gap-3">
            <dt className="mt-0.5 shrink-0 text-gold">
              <SparkIcon width={16} height={16} />
              <span className="sr-only">Dress code</span>
            </dt>
            <dd className="text-ink-soft">{event.dressCode}</dd>
          </div>
        </dl>

        {event.notes?.length ? (
          <ul className="mt-5 space-y-2 rounded-xl bg-champagne/35 p-4 text-[0.8rem] leading-relaxed text-ink-soft">
            {event.notes.map((note) => (
              <li key={note} className="flex gap-2.5">
                <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden />
                {note}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto flex flex-col gap-2.5 pt-7 sm:flex-row">
          <CalendarMenu event={event} coupleNames={couple.shortNames} />
          <a
            href={mapsLink(event.mapsQuery)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-full bg-ink px-4 font-sans text-[0.62rem] uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-forest"
          >
            <MapPinIcon width={15} height={15} />
            Get directions
          </a>
        </div>
      </div>
    </article>
  );
}

export function Events({ events, couple }: { events: WeddingEvent[]; couple: Couple }) {
  return (
    <Section
      id="wedding"
      eyebrow="The Celebration"
      title="Wedding Details"
      intro="Two days, three gatherings, one very happy family. Everything happens in Lagos — tap any card for directions or to save the date to your phone."
    >
      <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {events.map((event) => (
          <RevealItem key={event.id} className="h-full">
            <EventCard event={event} couple={couple} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
