"use client";

import { useEffect, useState } from "react";
import type { RsvpResult, RsvpSubmission } from "@/lib/types";

const STORAGE_KEY = "ww:rsvp";
const EVENT_NAME = "ww:rsvp-updated";

export interface LocalRsvp {
  reference: string;
  fullName: string;
  attending: "yes" | "no";
}

export function readLocalRsvp(): LocalRsvp | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LocalRsvp) : null;
  } catch {
    return null;
  }
}

export function saveLocalRsvp(value: LocalRsvp): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

/** Lets the sticky bar and the form stay in sync without a global store. */
export function useLocalRsvp(): LocalRsvp | null {
  const [value, setValue] = useState<LocalRsvp | null>(null);

  useEffect(() => {
    const sync = () => setValue(readLocalRsvp());
    sync();
    window.addEventListener(EVENT_NAME, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT_NAME, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return value;
}

export async function submitRsvp(submission: RsvpSubmission): Promise<RsvpResult> {
  try {
    const response = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
    });
    return (await response.json()) as RsvpResult;
  } catch {
    return {
      ok: false,
      error: "We couldn't reach the server. Check your connection and try again.",
    };
  }
}
