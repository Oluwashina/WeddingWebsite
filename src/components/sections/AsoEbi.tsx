"use client";

import { useState } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Sheet } from "@/components/ui/Sheet";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button, ButtonLink } from "@/components/ui/Button";
import { CheckIcon, ClockIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import type { AsoEbi as AsoEbiContent, AsoEbiOption, Couple } from "@/lib/types";
import { cn, formatMoney, whatsappLink } from "@/lib/utils";

interface AsoEbiProps {
  asoEbi: AsoEbiContent;
  couple: Couple;
}

export function AsoEbi({ asoEbi, couple }: AsoEbiProps) {
  const [activeOption, setActiveOption] = useState<AsoEbiOption | null>(null);
  const [quantity, setQuantity] = useState(1);

  const openFlow = (option: AsoEbiOption) => {
    setActiveOption(option);
    setQuantity(1);
  };

  const orderMessage = activeOption
    ? `Hello ${asoEbi.coordinator.name}, I'd like to order Aso Ebi for ${couple.shortNames}'s wedding.

Option: ${activeOption.name} (${activeOption.colorway})
Quantity: ${quantity}
Total: ${formatMoney(activeOption.price * quantity, activeOption.currency)}

My name is: `
    : "";

  return (
    <Section
      id="aso-ebi"
      tone="sand"
      eyebrow="Aso Ebi"
      title="Be Part of the Celebration"
      intro={asoEbi.intro}
    >
      <Reveal className="mx-auto mb-10 flex max-w-xl items-center justify-center gap-3 rounded-full border border-gold/30 bg-gold/8 px-5 py-3 text-center sm:mb-12">
        <ClockIcon width={16} height={16} className="shrink-0 text-gold" />
        <p className="font-sans text-[0.74rem] tracking-wide text-ink-soft">
          Orders close{" "}
          <span className="font-medium text-ink">{asoEbi.deadlineDisplay}</span> — the fabric is
          imported and cannot be reordered.
        </p>
      </Reveal>

      <RevealGroup className="grid gap-7 lg:grid-cols-2">
        {asoEbi.options.map((option) => (
          <RevealItem key={option.id} className="h-full">
            <article className="group flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-ink/8 bg-ivory shadow-[0_24px_60px_-45px_rgba(29,25,22,0.6)]">
              <div className="relative">
                <SmartImage
                  photo={option.photo}
                  monogram={couple.monogram}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="aspect-[4/3] w-full sm:aspect-[16/11]"
                />
                <div className="absolute bottom-4 left-4 flex gap-1.5">
                  {option.swatches.map((hex) => (
                    <span
                      key={hex}
                      className="h-7 w-7 rounded-full border-2 border-white/80 shadow-[0_4px_10px_-4px_rgba(0,0,0,0.6)]"
                      style={{ backgroundColor: hex }}
                      title={hex}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[1.65rem] leading-tight">{option.name}</h3>
                    <p className="mt-1.5 font-sans text-[0.6rem] uppercase tracking-[0.22em] text-gold">
                      {option.colorway}
                    </p>
                  </div>
                  <p className="shrink-0 font-display text-[1.6rem] text-ink">
                    {formatMoney(option.price, option.currency)}
                  </p>
                </div>

                <p className="mt-4 text-[0.92rem] leading-[1.8] text-ink-soft">{option.fabric}</p>

                <ul className="mt-6 space-y-2.5 border-t border-ink/8 pt-5">
                  {option.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.88rem] text-ink-soft">
                      <CheckIcon width={15} height={15} className="mt-1 shrink-0 text-gold" />
                      {item}
                    </li>
                  ))}
                </ul>

                {option.sizeNote ? (
                  <p className="mt-5 rounded-xl bg-champagne/35 px-4 py-3 text-[0.8rem] leading-relaxed text-ink-soft">
                    {option.sizeNote}
                  </p>
                ) : null}

                <div className="mt-auto pt-7">
                  <Button fullWidth size="lg" onClick={() => openFlow(option)}>
                    Get Aso Ebi
                  </Button>
                </div>
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mx-auto mt-12 max-w-3xl rounded-[1.25rem] border border-ink/8 bg-ivory p-6 sm:p-8">
        <h3 className="text-[1.4rem]">How to purchase</h3>
        <ol className="mt-5 space-y-4">
          {asoEbi.howToPurchase.map((step, index) => (
            <li key={step} className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/40 font-sans text-[0.7rem] text-gold">
                {index + 1}
              </span>
              <span className="pt-0.5 text-[0.92rem] leading-[1.75] text-ink-soft">{step}</span>
            </li>
          ))}
        </ol>

        <div className="mt-7 flex flex-col gap-4 border-t border-ink/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-sans text-[0.6rem] uppercase tracking-[0.24em] text-ink-muted">
              {asoEbi.coordinator.role}
            </p>
            <p className="mt-1 font-display text-[1.3rem]">{asoEbi.coordinator.name}</p>
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <ButtonLink href={`tel:${asoEbi.coordinator.phone.replace(/\s/g, "")}`} variant="outline" size="sm">
              <PhoneIcon width={15} height={15} />
              {asoEbi.coordinator.phone}
            </ButtonLink>
            <ButtonLink
              href={whatsappLink(
                asoEbi.coordinator.whatsapp,
                `Hello ${asoEbi.coordinator.name}, I have a question about the Aso Ebi for ${couple.shortNames}'s wedding.`,
              )}
              variant="outline"
              size="sm"
            >
              <WhatsAppIcon width={15} height={15} />
              WhatsApp
            </ButtonLink>
          </div>
        </div>
      </Reveal>

      {/* Purchase flow — swap the WhatsApp step for a payment provider later. */}
      <Sheet
        open={Boolean(activeOption)}
        onClose={() => setActiveOption(null)}
        eyebrow="Aso Ebi order"
        title={activeOption?.name ?? ""}
      >
        {activeOption ? (
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                <SmartImage
                  photo={activeOption.photo}
                  monogram={couple.monogram}
                  sizes="96px"
                  hoverZoom={false}
                  className="h-full w-full"
                />
              </div>
              <div className="min-w-0">
                <p className="font-sans text-[0.6rem] uppercase tracking-[0.22em] text-gold">
                  {activeOption.colorway}
                </p>
                <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-soft">
                  {activeOption.fabric}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-ink/10 bg-ivory-deep/50 px-4 py-3">
              <span className="font-sans text-[0.62rem] uppercase tracking-[0.22em] text-ink-soft">
                Quantity
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setQuantity((n) => Math.max(1, n - 1))}
                  aria-label="Fewer sets"
                  disabled={quantity <= 1}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-ink-soft transition-colors hover:bg-champagne/60 disabled:opacity-40"
                >
                  −
                </button>
                <span className="w-8 text-center font-display text-xl tabular-nums">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((n) => Math.min(10, n + 1))}
                  aria-label="More sets"
                  disabled={quantity >= 10}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-ink-soft transition-colors hover:bg-champagne/60 disabled:opacity-40"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-baseline justify-between border-y border-ink/8 py-4">
              <span className="font-sans text-[0.62rem] uppercase tracking-[0.22em] text-ink-muted">
                Total
              </span>
              <span className="font-display text-[1.8rem]">
                {formatMoney(activeOption.price * quantity, activeOption.currency)}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <ButtonLink
                href={whatsappLink(asoEbi.coordinator.whatsapp, orderMessage)}
                fullWidth
                size="lg"
              >
                <WhatsAppIcon width={17} height={17} />
                Continue on WhatsApp
              </ButtonLink>

              {asoEbi.checkoutUrl ? (
                <ButtonLink href={asoEbi.checkoutUrl} variant="outline" fullWidth>
                  Pay online
                </ButtonLink>
              ) : (
                <p className={cn("text-center font-sans text-[0.72rem] leading-relaxed text-ink-muted")}>
                  Payment is confirmed directly with {asoEbi.coordinator.name}. Card payment is
                  coming soon.
                </p>
              )}
            </div>

            <p className="rounded-xl bg-champagne/35 px-4 py-3 text-[0.78rem] leading-relaxed text-ink-soft">
              Orders close {asoEbi.deadlineDisplay}. Collection opens 20 November at the Ikeja
              pickup point, or request delivery within Lagos.
            </p>
          </div>
        ) : null}
      </Sheet>
    </Section>
  );
}
