"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
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

function EventCard({
  event,
  couple,
  step,
}: {
  event: WeddingEvent;
  couple: Couple;
  step: number;
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-ink/8 bg-ivory shadow-[0_20px_50px_-38px_rgba(29,25,22,0.55)] transition-shadow duration-700 hover:shadow-[0_34px_70px_-40px_rgba(29,25,22,0.6)]">
      <div className="relative">
        <SmartImage
          photo={event.photo ?? { src: "", alt: event.name }}
          monogram={couple.monogram}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="aspect-[16/10] w-full"
        />
        <span
          className="absolute inset-x-0 bottom-0 h-1"
          style={{ backgroundColor: event.accentColor }}
          aria-hidden
        />
        <span
          className="absolute left-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ivory/95 font-display text-[1rem] text-ink shadow-sm backdrop-blur-sm"
          aria-hidden
        >
          {step}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="eyebrow" style={{ color: event.accentColor }}>
              {event.subtitle}
            </p>
            <h3 className="mt-2 text-[1.7rem] leading-tight">{event.name}</h3>
          </div>
          <span
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ink/10 bg-champagne/40 px-3 py-1.5 font-sans text-[0.58rem] uppercase tracking-[0.18em] text-ink-soft"
            style={{ borderColor: `${event.accentColor}33` }}
          >
            <ClockIcon width={13} height={13} style={{ color: event.accentColor }} />
            {event.displayTime}
          </span>
        </div>

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
              <MapPinIcon width={16} height={16} />
              <span className="sr-only">Venue</span>
            </dt>
            <dd>
              <span className="block text-ink">{event.venue}</span>
              <span className="block text-ink-muted">{event.address}</span>
            </dd>
          </div>
          {event.dressCode ? (
            <div className="flex gap-3">
              <dt className="mt-0.5 shrink-0 text-gold">
                <SparkIcon width={16} height={16} />
                <span className="sr-only">Dress code</span>
              </dt>
              <dd className="text-ink-soft">{event.dressCode}</dd>
            </div>
          ) : null}
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
  const dayLabel = events[0]?.displayDate ?? "Wedding day";
  const locationLabel = events[0]?.address ?? "Lagos, Nigeria";

  return (
    <Section
      id="wedding"
      eyebrow="The Celebration"
      title="Wedding Details"
      intro="One beautiful day in Lagos, with a traditional ceremony in the morning and a beautiful reception following immediately after. Save both to your calendar or tap for directions."
    >
      <Reveal className="mx-auto mb-10 flex max-w-3xl justify-center sm:mb-12">
        <div className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-ink/10 bg-champagne/30 px-6 py-3 text-center">
          <span className="inline-flex items-center gap-2 font-sans text-[0.62rem] uppercase tracking-[0.2em] text-ink-soft">
            <CalendarIcon width={14} height={14} className="text-gold" />
            {dayLabel}
          </span>
          <span className="hidden h-3 w-px bg-ink/15 sm:block" aria-hidden />
          <span className="inline-flex items-center gap-2 font-sans text-[0.62rem] uppercase tracking-[0.2em] text-ink-soft">
            <MapPinIcon width={14} height={14} className="text-gold" />
            {locationLabel}
          </span>
        </div>
      </Reveal>

      <RevealGroup className="relative mx-auto max-w-5xl">
        <div
          className="pointer-events-none absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-gradient-to-b from-gold/10 via-gold/35 to-gold/10 lg:block"
          aria-hidden
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {events.map((event, index) => (
            <RevealItem key={event.id} className="relative h-full">
              {index === 0 ? (
                <span
                  className="pointer-events-none absolute -right-5 top-1/2 z-10 hidden h-3 w-3 -translate-y-1/2 rounded-full border-2 border-ivory bg-gold lg:block"
                  aria-hidden
                />
              ) : null}
              {index === 1 ? (
                <span
                  className="pointer-events-none absolute -left-5 top-1/2 z-10 hidden h-3 w-3 -translate-y-1/2 rounded-full border-2 border-ivory bg-gold lg:block"
                  aria-hidden
                />
              ) : null}

              <EventCard event={event} couple={couple} step={index + 1} />
            </RevealItem>
          ))}
        </div>
      </RevealGroup>
    </Section>
  );
}
