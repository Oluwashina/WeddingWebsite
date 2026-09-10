"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function diff(target: number): Countdown {
  const ms = target - Date.now();
  if (ms <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  const totalSeconds = Math.floor(ms / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isPast: false,
  };
}

/**
 * Ticks once per second. Starts at zero on the server and during hydration so
 * the markup matches, then fills in on mount.
 */
export function useCountdown(targetIso: string): { value: Countdown; ready: boolean } {
  const target = useMemo(() => new Date(targetIso).getTime(), [targetIso]);
  const [value, setValue] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setValue(diff(target));
    setReady(true);
    const id = window.setInterval(() => setValue(diff(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return { value, ready };
}

/**
 * Tracks which section is currently in view, for nav highlighting. Sections are
 * evaluated in **document order** so intermediate blocks (RSVP, dress code) do
 * not steal the highlight from later nav targets like Gallery or Registry.
 */
export function useScrollSpy(ids: string[], offset = 200): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    const handler = () => {
      const ordered = ids
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;
          return { id, top: el.offsetTop };
        })
        .filter((entry): entry is { id: string; top: number } => entry !== null)
        .sort((a, b) => a.top - b.top);

      let current: string | null = ordered[0]?.id ?? null;
      for (const { id } of ordered) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) {
          current = id;
        }
      }
      setActive(current);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [ids, offset]);

  return active;
}

/** True once the page has been scrolled past `threshold` pixels. */
export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);

  return scrolled;
}

export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}

/** Closes on Escape — used by the lightbox and modals. */
export function useEscapeKey(onEscape: () => void, active = true): void {
  const handler = useRef(onEscape);
  handler.current = onEscape;

  useEffect(() => {
    if (!active) return;
    const listener = (event: KeyboardEvent) => {
      if (event.key === "Escape") handler.current();
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [active]);
}

export function useCopyToClipboard(resetAfter = 2000): [boolean, (value: string) => void] {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    (value: string) => {
      const done = () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), resetAfter);
      };
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(value).then(done).catch(() => setCopied(false));
      } else {
        const input = document.createElement("textarea");
        input.value = value;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
        done();
      }
    },
    [resetAfter],
  );

  return [copied, copy];
}
