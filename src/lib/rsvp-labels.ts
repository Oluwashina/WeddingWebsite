import type { EventKind, MealPreference } from "@/lib/types";

/** Celebrations guests can RSVP for (must match `wedding.ts` events). */
export const RSVP_EVENT_KINDS: EventKind[] = ["traditional", "reception"];

export const RSVP_EVENT_LABELS: Record<EventKind, string> = {
  traditional: "Traditional Wedding",
  reception: "Reception",
  white: "White Wedding",
};

export const RSVP_MEAL_OPTIONS: { value: MealPreference; label: string }[] = [
  { value: "jollof", label: "Jollof & grilled chicken" },
  { value: "continental", label: "Continental" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "no-preference", label: "No preference" },
];

export const RSVP_MEAL_LABELS = Object.fromEntries(
  RSVP_MEAL_OPTIONS.map((option) => [option.value, option.label]),
) as Record<MealPreference, string>;

export function formatRsvpEvents(kinds: EventKind[]): string {
  return kinds
    .filter((kind) => RSVP_EVENT_KINDS.includes(kind))
    .map((kind) => RSVP_EVENT_LABELS[kind])
    .join(", ");
}
