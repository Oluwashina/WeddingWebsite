"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Confetti } from "@/components/ui/Confetti";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ShareButton } from "@/components/layout/ShareButton";
import { CheckIcon, CopyIcon, WhatsAppIcon } from "@/components/ui/icons";
import { useCopyToClipboard } from "@/lib/hooks";
import { saveLocalRsvp, submitRsvp, useLocalRsvp } from "@/lib/rsvp-client";
import { validateRsvp, type FieldErrors } from "@/lib/rsvp-validation";
import type { AttendanceAnswer, Contact, Couple, WeddingMeta } from "@/lib/types";
import { cn, whatsappLink } from "@/lib/utils";

const silk = [0.22, 1, 0.36, 1] as const;

const fieldClass =
  "w-full rounded-xl border border-ink/12 bg-white/70 px-4 py-3.5 text-[0.95rem] text-ink placeholder:text-ink-muted/70 transition-colors duration-300 focus:border-gold focus:bg-white focus:outline-none";

function Label({ children, hint }: { children: string; hint?: string }) {
  return (
    <span className="mb-2 flex items-baseline justify-between gap-3">
      <span className="font-sans text-[0.6rem] uppercase tracking-[0.24em] text-ink-soft">
        {children}
      </span>
      {hint ? <span className="font-sans text-[0.62rem] text-ink-muted">{hint}</span> : null}
    </span>
  );
}

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message ? (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-1.5 font-sans text-[0.72rem] text-clay"
        >
          {message}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}

interface RsvpProps {
  couple: Couple;
  meta: WeddingMeta;
  contact: Contact;
}

export function Rsvp({ couple, meta, contact }: RsvpProps) {
  const existing = useLocalRsvp();
  const [fullName, setFullName] = useState("");
  const [contactValue, setContactValue] = useState("");
  const [attending, setAttending] = useState<AttendanceAnswer | null>(null);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<{
    reference: string;
    name: string;
    attending: AttendanceAnswer;
  } | null>(null);
  const [copied, copy] = useCopyToClipboard();
  const cardRef = useRef<HTMLDivElement | null>(null);

  const done = confirmed ?? (existing ? { reference: existing.reference, name: existing.fullName, attending: existing.attending } : null);

  /**
   * The confirmation card is far shorter than the form, so the swap pulls the
   * page out from under the guest. Re-centre it once the new card has mounted.
   */
  useEffect(() => {
    if (!confirmed) return;
    const id = window.setTimeout(() => {
      cardRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 620);
    return () => window.clearTimeout(id);
  }, [confirmed]);

  const handleSubmit = async (formEvent: FormEvent) => {
    formEvent.preventDefault();
    setFormError(null);

    const submission = {
      fullName,
      contact: contactValue,
      attending: attending ?? undefined,
      message,
    };

    const { errors: validationErrors, value } = validateRsvp(submission);
    setErrors(validationErrors);
    if (!value) {
      const firstKey = Object.keys(validationErrors)[0];
      document.getElementById(`rsvp-${firstKey}`)?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    setSubmitting(true);
    const result = await submitRsvp(value);
    setSubmitting(false);

    if (!result.ok || !result.reference) {
      setErrors(result.fieldErrors ?? {});
      setFormError(result.error ?? "Please check the highlighted fields and try again.");
      return;
    }

    const firstName = value.fullName.split(" ")[0];
    saveLocalRsvp({
      reference: result.reference,
      fullName: value.fullName,
      attending: value.attending,
    });
    setConfirmed({ reference: result.reference, name: firstName, attending: value.attending });
  };

  return (
    <section id="rsvp" className="relative scroll-mt-24 overflow-hidden bg-forest py-20 text-ivory sm:py-24 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_85%_0%,rgba(214,189,142,0.16),transparent_60%)]"
        aria-hidden
      />
      <Confetti active={Boolean(confirmed)} />

      <div className="container-page relative">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Invitation copy */}
          <Reveal className="flex flex-col">
            <p className="eyebrow text-gold-light">Répondez s&rsquo;il vous plaît</p>
            <h2 className="mt-4 text-[2.3rem] leading-[1.05] text-ivory sm:text-5xl lg:text-[3.5rem]">
              Will you celebrate with us?
            </h2>
            <span className="mt-6 block h-px w-16 bg-gold-light/50" aria-hidden />
            <p className="mt-6 max-w-md text-[0.98rem] leading-[1.9] text-ivory/75">
              Every seat at our table has a name on it. Let us know if yours will be filled by{" "}
              <span className="text-gold-light">{meta.rsvpDeadlineDisplay}</span>.
            </p>

            <div className="group mt-9 hidden overflow-hidden rounded-[1.25rem] lg:block">
              <SmartImage
                photo={couple.portraitPhoto}
                monogram={couple.monogram}
                sizes="40vw"
                className="aspect-[4/3] w-full"
              />
            </div>

            <div className="mt-8 rounded-[1.1rem] border border-ivory/12 bg-ivory/5 p-5">
              <p className="font-sans text-[0.6rem] uppercase tracking-[0.24em] text-gold-light/80">
                Need a hand?
              </p>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-ivory/70">
                {contact.name}, our {contact.role.toLowerCase()}, can RSVP on your behalf.
              </p>
              <a
                href={whatsappLink(
                  contact.whatsapp,
                  `Hello ${contact.name}, I'd like to RSVP for ${couple.shortNames}'s wedding.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-[44px] items-center gap-2 font-sans text-[0.66rem] uppercase tracking-[0.2em] text-gold-light transition-colors hover:text-ivory"
              >
                <WhatsAppIcon width={16} height={16} />
                Message on WhatsApp
              </a>
            </div>
          </Reveal>

          {/* Form / confirmation */}
          <Reveal delay={0.1}>
            <div
              ref={cardRef}
              className="relative rounded-[1.5rem] bg-ivory p-6 text-ink shadow-[0_40px_90px_-50px_rgba(0,0,0,0.8)] sm:p-9"
            >
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="confirmation"
                    data-rsvp-confirmation
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: silk }}
                    className="flex flex-col items-center py-4 text-center"
                  >
                    <motion.span
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-forest text-ivory"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.1, ease: silk }}
                    >
                      <CheckIcon width={26} height={26} />
                    </motion.span>

                    <h3 className="mt-7 text-[2rem] leading-tight sm:text-[2.4rem]">
                      Thank you, {done.name.split(" ")[0]}{" "}
                      <span className="text-gold" aria-hidden>
                        ♥
                      </span>
                    </h3>
                    <p className="mt-3 max-w-sm text-[1rem] leading-[1.85] text-ink-soft">
                      {done.attending === "yes"
                        ? "We can't wait to celebrate with you. Keep an eye on your phone. We'll send venue reminders a week before."
                        : "We'll miss you, truly. Thank you for letting us know. We'll make sure you get photos from the day."}
                    </p>

                    {done.attending === "yes" ? (
                      <>
                        <Ornament className="mt-7" />

                        <div className="mt-7 w-full rounded-xl border border-dashed border-gold/40 bg-champagne/25 px-5 py-4">
                          <p className="font-sans text-[0.55rem] uppercase tracking-[0.28em] text-ink-muted">
                            Your confirmation number
                          </p>
                          <div className="mt-2 flex items-center justify-center gap-3">
                            <span className="font-display text-[1.7rem] tracking-[0.12em] text-ink">
                              {done.reference}
                            </span>
                            <button
                              type="button"
                              onClick={() => copy(done.reference)}
                              aria-label="Copy confirmation number"
                              className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-ink/5 hover:text-gold"
                            >
                              {copied ? (
                                <CheckIcon width={16} height={16} />
                              ) : (
                                <CopyIcon width={16} height={16} />
                              )}
                            </button>
                          </div>
                          <p className="mt-2 font-sans text-[0.7rem] text-ink-muted">
                            Quote this at the door if we need to find your name.
                          </p>
                        </div>

                        <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row">
                          <ButtonLink
                            href={whatsappLink(
                              contact.whatsapp,
                              `Hi ${contact.name}, this is ${done.name}. My RSVP reference is ${done.reference}.`,
                            )}
                            variant="outline"
                            fullWidth
                          >
                            <WhatsAppIcon width={16} height={16} />
                            Message us
                          </ButtonLink>
                          <ShareButton meta={meta} variant="button" label="Share invite" fullWidth />
                        </div>
                      </>
                    ) : (
                      <>
                        <Ornament className="mt-7" />
                        <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row">
                        <ButtonLink
                          href={whatsappLink(
                            contact.whatsapp,
                            `Hi ${contact.name}, this is ${done.name}. I wanted to confirm I won't be able to make it. Thank you for understanding.`,
                          )}
                          variant="outline"
                          fullWidth
                        >
                          <WhatsAppIcon width={16} height={16} />
                          Message us
                        </ButtonLink>
                        <ShareButton meta={meta} variant="button" label="Share invite" fullWidth />
                        </div>
                      </>
                    )}

                    {existing && !confirmed ? (
                      <button
                        type="button"
                        onClick={() => {
                          setConfirmed(null);
                          window.localStorage.removeItem("ww:rsvp");
                          window.dispatchEvent(new CustomEvent("ww:rsvp-updated"));
                        }}
                        className="mt-6 font-sans text-[0.62rem] uppercase tracking-[0.22em] text-ink-muted underline-offset-4 transition-colors hover:text-gold hover:underline"
                      >
                        Submit another RSVP
                      </button>
                    ) : null}
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <p className="eyebrow">RSVP Now</p>
                      <h3 className="mt-2 text-[1.8rem] leading-tight">Reserve your seat</h3>
                      <p className="mt-2 text-[0.88rem] text-ink-muted">
                        Takes less than a minute.
                      </p>
                    </div>

                    <label className="block" htmlFor="rsvp-fullName">
                      <Label>Full name</Label>
                      <input
                        id="rsvp-fullName"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Chidera Okeke"
                        className={cn(fieldClass, errors.fullName && "border-clay/60")}
                        aria-invalid={Boolean(errors.fullName)}
                      />
                      <FieldError message={errors.fullName} />
                    </label>

                    <label className="block" htmlFor="rsvp-contact">
                      <Label hint="So we can reach you">Phone or email</Label>
                      <input
                        id="rsvp-contact"
                        name="contact"
                        type="text"
                        inputMode="email"
                        autoComplete="email"
                        value={contactValue}
                        onChange={(e) => setContactValue(e.target.value)}
                        placeholder="080 1234 5678"
                        className={cn(fieldClass, errors.contact && "border-clay/60")}
                        aria-invalid={Boolean(errors.contact)}
                      />
                      <FieldError message={errors.contact} />
                    </label>

                    <fieldset id="rsvp-attending">
                      <legend className="mb-2 font-sans text-[0.6rem] uppercase tracking-[0.24em] text-ink-soft">
                        Will you be attending?
                      </legend>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {(
                          [
                            { value: "yes", title: "Yes, I'll be there", sub: "Count me in" },
                            { value: "no", title: "No, I can't make it", sub: "Sending love" },
                          ] as const
                        ).map((option) => {
                          const selected = attending === option.value;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setAttending(option.value)}
                              aria-pressed={selected}
                              className={cn(
                                "flex min-h-[68px] flex-col items-start justify-center rounded-xl border px-4 py-3 text-left transition-all duration-300",
                                selected
                                  ? "border-forest bg-forest text-ivory shadow-[0_14px_30px_-18px_rgba(31,58,50,0.9)]"
                                  : "border-ink/12 bg-white/60 text-ink hover:border-gold/60",
                              )}
                            >
                              <span className="font-sans text-[0.85rem]">{option.title}</span>
                              <span
                                className={cn(
                                  "mt-0.5 font-sans text-[0.68rem]",
                                  selected ? "text-ivory/65" : "text-ink-muted",
                                )}
                              >
                                {option.sub}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <FieldError message={errors.attending} />
                    </fieldset>

                    <label className="block" htmlFor="rsvp-message">
                      <Label hint="Optional">A note for the couple</Label>
                      <textarea
                        id="rsvp-message"
                        name="message"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Say something they'll read on the morning of the wedding…"
                        className={cn(fieldClass, "resize-none", errors.message && "border-clay/60")}
                      />
                      <FieldError message={errors.message} />
                    </label>

                    {formError ? (
                      <p className="rounded-xl bg-clay/10 px-4 py-3 font-sans text-[0.82rem] text-clay">
                        {formError}
                      </p>
                    ) : null}

                    <Button type="submit" size="lg" fullWidth disabled={submitting}>
                      {submitting ? "Sending…" : "Send my RSVP"}
                    </Button>

                    <p className="text-center font-sans text-[0.7rem] leading-relaxed text-ink-muted">
                      Please respond by {meta.rsvpDeadlineDisplay}. You&rsquo;ll receive a
                      confirmation number instantly.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
