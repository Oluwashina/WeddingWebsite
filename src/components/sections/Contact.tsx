"use client";

import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import type { Contact as ContactType, Couple } from "@/lib/types";
import { whatsappLink } from "@/lib/utils";

export function Contact({ contacts, couple }: { contacts: ContactType[]; couple: Couple }) {
  return (
    <Section
      id="contact"
      eyebrow="Need Help?"
      title="We're Only A Message Away"
      intro="Lost, late, unsure what to wear, or need to change your RSVP? Reach out. No question is too small."
    >
      <RevealGroup
        className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2"
        stagger={0.12}
      >
        {contacts.map((contact) => (
          <RevealItem key={contact.id} className="h-full">
            <article className="flex h-full flex-col rounded-[1.25rem] border border-ink/8 bg-ivory-deep/50 p-6 sm:p-8">
              <p className="eyebrow">{contact.role}</p>
              <h3 className="mt-3 text-[1.6rem] leading-tight">{contact.name}</h3>

              <div className="mt-6 flex flex-col gap-3 border-t border-ink/8 pt-5 text-[0.9rem]">
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="flex min-h-[44px] items-center gap-3 text-ink-soft transition-colors hover:text-gold"
                >
                  <PhoneIcon width={16} height={16} className="text-gold" />
                  {contact.phone}
                </a>
                {contact.email ? (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex min-h-[44px] items-center gap-3 break-all text-ink-soft transition-colors hover:text-gold"
                  >
                    <MailIcon width={16} height={16} className="text-gold" />
                    {contact.email}
                  </a>
                ) : null}
              </div>

              <div className="mt-auto pt-6">
                <ButtonLink
                  href={whatsappLink(
                    contact.whatsapp,
                    `Hello ${contact.name}, I have a question about ${couple.shortNames}'s wedding.`,
                  )}
                  fullWidth
                >
                  <WhatsAppIcon width={17} height={17} />
                  Chat on WhatsApp
                </ButtonLink>
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
