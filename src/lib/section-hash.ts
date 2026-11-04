/** Section `id` values guests can link to (must match the page). */
export const LINKABLE_SECTION_IDS = [
  "home",
  "story",
  "wedding",
  "rsvp",
  "aso-ebi",
  "dress-code",
  "gallery",
  "registry",
  "faq",
  "contact",
] as const;

export type LinkableSectionId = (typeof LINKABLE_SECTION_IDS)[number];

const LINKABLE_SET = new Set<string>(LINKABLE_SECTION_IDS);

export function sectionIdFromHash(hash: string): LinkableSectionId | null {
  const id = hash.replace(/^#/, "").trim();
  return LINKABLE_SET.has(id) ? (id as LinkableSectionId) : null;
}

export function scrollToSection(id: string, behavior: ScrollBehavior = "smooth"): void {
  document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
}

export function writeSectionHash(id: string, mode: "push" | "replace" = "push"): void {
  const path = `${window.location.pathname}${window.location.search}#${id}`;
  if (mode === "replace") {
    window.history.replaceState(null, "", path);
  } else {
    window.history.pushState(null, "", path);
  }
}
