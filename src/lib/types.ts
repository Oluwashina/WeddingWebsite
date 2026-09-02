/**
 * Content model for the wedding site.
 *
 * Every section of the site reads from these types via `src/lib/content.ts`.
 * The shapes intentionally mirror the tables described in `supabase/schema.sql`
 * so the mock provider can be swapped for a Supabase provider without touching
 * a single component.
 */

export type Id = string;

export interface Photo {
  /** Path under /public or an absolute https URL. */
  src: string;
  alt: string;
  /** Rendered while the photo is missing, and as the lightbox caption. */
  caption?: string;
  width?: number;
  height?: number;
}

export interface Couple {
  id: Id;
  brideFirstName: string;
  brideFullName: string;
  groomFirstName: string;
  groomFullName: string;
  /** "Ada & Tobi" — used in nav, footer, share sheets. */
  shortNames: string;
  monogram: string;
  hashtag: string;
  tagline: string;
  introduction: string;
  heroPhoto: Photo;
  portraitPhoto: Photo;
}

export interface WeddingMeta {
  id: Id;
  /** ISO timestamp with timezone — drives the countdown. */
  startsAt: string;
  /** Human date shown in the hero, e.g. "11 & 12 December 2026". */
  displayDate: string;
  displayLocation: string;
  city: string;
  country: string;
  timezone: string;
  rsvpDeadline: string;
  rsvpDeadlineDisplay: string;
  siteUrl: string;
  shareMessage: string;
  musicTrack?: { src: string; title: string };
}

export type EventKind = "traditional" | "white" | "reception";

export interface WeddingEvent {
  id: Id;
  kind: EventKind;
  name: string;
  subtitle: string;
  description: string;
  /** ISO timestamps with timezone offsets. */
  startsAt: string;
  endsAt: string;
  displayDate: string;
  displayTime: string;
  venue: string;
  address: string;
  /** Used to build the Google/Apple Maps deep link. */
  mapsQuery: string;
  dressCode: string;
  accentColor: string;
  photo?: Photo;
  notes?: string[];
}

export interface StoryMilestone {
  id: Id;
  year: string;
  title: string;
  location: string;
  body: string;
  photo?: Photo;
}

export interface AsoEbiOption {
  id: Id;
  name: string;
  fabric: string;
  price: number;
  currency: string;
  colorway: string;
  swatches: string[];
  includes: string[];
  photo: Photo;
  sizeNote?: string;
}

export interface AsoEbi {
  id: Id;
  headline: string;
  intro: string;
  deadline: string;
  deadlineDisplay: string;
  howToPurchase: string[];
  coordinator: Contact;
  /** Set to a Paystack/Flutterwave link later to enable inline checkout. */
  checkoutUrl?: string;
  options: AsoEbiOption[];
}

export type RegistryCategory = "home" | "travel" | "experiences" | "cash" | "other";

export interface RegistryItem {
  id: Id;
  name: string;
  category: RegistryCategory;
  description: string;
  amount?: number;
  currency: string;
  photo: Photo;
  /** External store or registry link. */
  url?: string;
  claimed?: boolean;
  /** Cash-style gifts open the transfer panel instead of an external link. */
  isContribution?: boolean;
}

export interface BankAccount {
  bankName: string;
  accountName: string;
  accountNumber: string;
  currency: string;
  note?: string;
}

export interface Registry {
  id: Id;
  headline: string;
  intro: string;
  note: string;
  items: RegistryItem[];
  /** Bank details stay hidden until the couple explicitly enables them. */
  showBankDetails: boolean;
  bankAccounts: BankAccount[];
}

export interface FaqItem {
  id: Id;
  question: string;
  answer: string;
  /** Optional in-page anchor, e.g. "#aso-ebi". */
  link?: { label: string; href: string };
}

export interface DressCodeLook {
  id: Id;
  eventName: string;
  title: string;
  guidance: string;
  palette: { name: string; hex: string }[];
  avoid: string;
  photo?: Photo;
}

export interface Contact {
  id: Id;
  name: string;
  role: string;
  phone: string;
  /** Digits only, international format, for wa.me links. */
  whatsapp: string;
  email?: string;
}

export interface SocialLink {
  id: Id;
  label: string;
  href: string;
}

export interface WeddingContent {
  couple: Couple;
  meta: WeddingMeta;
  events: WeddingEvent[];
  story: StoryMilestone[];
  asoEbi: AsoEbi;
  registry: Registry;
  faqs: FaqItem[];
  gallery: Photo[];
  dressCode: DressCodeLook[];
  contacts: Contact[];
  socials: SocialLink[];
}

/* ------------------------------------------------------------------ */
/* RSVP                                                                */
/* ------------------------------------------------------------------ */

export type AttendanceAnswer = "yes" | "no";
export type MealPreference = "jollof" | "continental" | "vegetarian" | "no-preference";

export interface RsvpSubmission {
  fullName: string;
  contact: string;
  attending: AttendanceAnswer;
  guestCount: number;
  events: EventKind[];
  mealPreference?: MealPreference;
  message?: string;
}

export interface RsvpRecord extends RsvpSubmission {
  id: Id;
  reference: string;
  createdAt: string;
}

export interface RsvpResult {
  ok: boolean;
  reference?: string;
  record?: RsvpRecord;
  error?: string;
  /** Field-level validation messages keyed by form field name. */
  fieldErrors?: Partial<Record<keyof RsvpSubmission, string>>;
}
