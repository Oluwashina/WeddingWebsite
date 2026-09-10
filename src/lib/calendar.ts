import type { WeddingEvent } from "@/lib/types";

function toUtcStamp(iso: string): string {
  return `${new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0]}Z`;
}

function escapeIcsText(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function eventDetails(event: WeddingEvent): string {
  if (!event.dressCode) return event.description;
  return `${event.description}\n\nDress code: ${event.dressCode}`;
}

export function googleCalendarUrl(event: WeddingEvent, coupleNames: string): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${coupleNames}: ${event.name}`,
    dates: `${toUtcStamp(event.startsAt)}/${toUtcStamp(event.endsAt)}`,
    details: eventDetails(event),
    location: `${event.venue}, ${event.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildIcs(event: WeddingEvent, coupleNames: string): string {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//adaandtobi//wedding//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${event.id}@adaandtobi.love`,
    `DTSTAMP:${toUtcStamp(new Date().toISOString())}`,
    `DTSTART:${toUtcStamp(event.startsAt)}`,
    `DTEND:${toUtcStamp(event.endsAt)}`,
    `SUMMARY:${escapeIcsText(`${coupleNames}: ${event.name}`)}`,
    `DESCRIPTION:${escapeIcsText(eventDetails(event))}`,
    `LOCATION:${escapeIcsText(`${event.venue}, ${event.address}`)}`,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeIcsText(`${event.name} is tomorrow`)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcs(event: WeddingEvent, coupleNames: string): void {
  const blob = new Blob([buildIcs(event, coupleNames)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${event.id}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
