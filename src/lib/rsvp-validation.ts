import type { RsvpSubmission } from "@/lib/types";

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

  const message = (input.message ?? "").trim();
  if (message.length > 600) {
    errors.message = "Please keep your note under 600 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return {
    errors,
    value: {
      fullName,
      contact,
      attending: attending as "yes" | "no",
      message: message || undefined,
    },
  };
}
