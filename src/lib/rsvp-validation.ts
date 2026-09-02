import type { EventKind, RsvpSubmission } from "@/lib/types";

export const MAX_GUESTS = 6;

const EVENT_KINDS: EventKind[] = ["traditional", "white", "reception"];
const MEALS = ["jollof", "continental", "vegetarian", "no-preference"] as const;

export type FieldErrors = Partial<Record<keyof RsvpSubmission, string>>;

function looksLikeContact(value: string): boolean {
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phone = /^\+?[\d\s()-]{7,20}$/;
  return email.test(value) || phone.test(value);
}

/** Shared by the client form and the API route so both agree on the rules. */
export function validateRsvp(input: Partial<RsvpSubmission>): {
  errors: FieldErrors;
  value?: RsvpSubmission;
} {
  const errors: FieldErrors = {};

  const fullName = (input.fullName ?? "").trim();
  if (fullName.length < 2) {
    errors.fullName = "Please tell us your full name.";
  }

  const contact = (input.contact ?? "").trim();
  if (!contact) {
    errors.contact = "We need a phone number or email to reach you.";
  } else if (!looksLikeContact(contact)) {
    errors.contact = "That doesn't look like a valid phone number or email.";
  }

  const attending = input.attending;
  if (attending !== "yes" && attending !== "no") {
    errors.attending = "Let us know if you can make it.";
  }

  const guestCount = Number(input.guestCount ?? 1);
  if (attending === "yes") {
    if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > MAX_GUESTS) {
      errors.guestCount = `Choose between 1 and ${MAX_GUESTS} guests.`;
    }
  }

  const events = (input.events ?? []).filter((kind): kind is EventKind =>
    EVENT_KINDS.includes(kind),
  );
  if (attending === "yes" && events.length === 0) {
    errors.events = "Select at least one celebration you'll join.";
  }

  const message = (input.message ?? "").trim();
  if (message.length > 600) {
    errors.message = "Please keep your note under 600 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const meal = MEALS.includes(input.mealPreference as (typeof MEALS)[number])
    ? input.mealPreference
    : undefined;

  return {
    errors,
    value: {
      fullName,
      contact,
      attending: attending as "yes" | "no",
      guestCount: attending === "yes" ? guestCount : 0,
      events: attending === "yes" ? events : [],
      mealPreference: attending === "yes" ? meal : undefined,
      message: message || undefined,
    },
  };
}
