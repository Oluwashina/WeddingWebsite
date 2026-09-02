"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Sheet } from "@/components/ui/Sheet";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button, ButtonLink } from "@/components/ui/Button";
import {
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  GiftIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { useCopyToClipboard } from "@/lib/hooks";
import type { Contact, Couple, Registry as RegistryContent, RegistryItem, RegistryCategory } from "@/lib/types";
import { cn, formatMoney, whatsappLink } from "@/lib/utils";

const CATEGORY_LABELS: Record<RegistryCategory | "all", string> = {
  all: "Everything",
  home: "Home",
  travel: "Travel",
  experiences: "Experiences",
  cash: "Cash Gift",
  other: "Other",
};

interface RegistryProps {
  registry: RegistryContent;
  couple: Couple;
  contact: Contact;
}

export function Registry({ registry, couple, contact }: RegistryProps) {
  const [filter, setFilter] = useState<RegistryCategory | "all">("all");
  const [activeItem, setActiveItem] = useState<RegistryItem | null>(null);
  const [detailsRevealed, setDetailsRevealed] = useState(false);
  const [copied, copy] = useCopyToClipboard();

  const categories = useMemo(() => {
    const present = new Set(registry.items.map((item) => item.category));
    return (["all", "home", "travel", "experiences", "cash", "other"] as const).filter(
      (category) => category === "all" || present.has(category),
    );
  }, [registry.items]);

  const items = useMemo(
    () => (filter === "all" ? registry.items : registry.items.filter((i) => i.category === filter)),
    [filter, registry.items],
  );

  const openItem = (item: RegistryItem) => {
    setDetailsRevealed(false);
    setActiveItem(item);
  };

  const giftMessage = activeItem
    ? `Hello ${contact.name}, I'd like to gift "${activeItem.name}" to ${couple.shortNames}. Could you share the details please?`
    : "";

  return (
    <Section
      id="registry"
      eyebrow="Gift Registry"
      title="Your Presence Is Our Greatest Gift"
      intro={registry.intro}
    >
      <Reveal className="mb-9 flex flex-wrap justify-center gap-2 sm:mb-12">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            aria-pressed={filter === category}
            className={cn(
              "inline-flex min-h-[42px] items-center rounded-full border px-5 font-sans text-[0.66rem] uppercase tracking-[0.2em] transition-all duration-300",
              filter === category
                ? "border-ink bg-ink text-ivory"
                : "border-ink/12 text-ink-soft hover:border-gold hover:text-gold",
            )}
          >
            {CATEGORY_LABELS[category]}
          </button>
        ))}
      </Reveal>

      <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <RevealItem className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-[1.2rem] border border-ink/8 bg-ivory shadow-[0_20px_50px_-42px_rgba(29,25,22,0.6)] transition-shadow duration-700 hover:shadow-[0_30px_64px_-42px_rgba(29,25,22,0.6)]">
                  <div className="relative">
                    <SmartImage
                      photo={item.photo}
                      monogram={couple.monogram}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="aspect-[4/3] w-full"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-ivory/90 px-3 py-1 font-sans text-[0.55rem] uppercase tracking-[0.2em] text-ink-soft backdrop-blur-sm">
                      {CATEGORY_LABELS[item.category]}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="text-[1.35rem] leading-tight">{item.name}</h3>
                    <p className="mt-2.5 text-[0.88rem] leading-[1.75] text-ink-soft">
                      {item.description}
                    </p>
                    <div className="mt-5 flex items-center justify-between gap-4 pt-1">
                      <span className="font-display text-[1.35rem] text-ink">
                        {item.amount ? formatMoney(item.amount, item.currency) : "Any amount"}
                      </span>
                      <Button size="sm" variant="outline" onClick={() => openItem(item)}>
                        Gift this
                      </Button>
                    </div>
                  </div>
                </article>
              </RevealItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </RevealGroup>

      <Reveal className="mx-auto mt-12 max-w-2xl text-center">
        <p className="text-[0.9rem] leading-relaxed text-ink-muted">{registry.note}</p>
      </Reveal>

      <Sheet
        open={Boolean(activeItem)}
        onClose={() => setActiveItem(null)}
        eyebrow={activeItem ? CATEGORY_LABELS[activeItem.category] : undefined}
        title={activeItem?.name ?? ""}
      >
        {activeItem ? (
          <div className="flex flex-col gap-6">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
              <SmartImage
                photo={activeItem.photo}
                monogram={couple.monogram}
                sizes="(max-width: 640px) 100vw, 32rem"
                hoverZoom={false}
                className="h-full w-full"
              />
            </div>

            <p className="text-[0.95rem] leading-[1.8] text-ink-soft">{activeItem.description}</p>

            {activeItem.amount ? (
              <div className="flex items-baseline justify-between border-y border-ink/8 py-4">
                <span className="font-sans text-[0.62rem] uppercase tracking-[0.22em] text-ink-muted">
                  Suggested amount
                </span>
                <span className="font-display text-[1.7rem]">
                  {formatMoney(activeItem.amount, activeItem.currency)}
                </span>
              </div>
            ) : null}

            {activeItem.url ? (
              <ButtonLink href={activeItem.url} fullWidth size="lg">
                <ArrowUpRightIcon width={16} height={16} />
                Open the store
              </ButtonLink>
            ) : null}

            {activeItem.isContribution ? (
              <div className="flex flex-col gap-3">
                {registry.showBankDetails ? (
                  <>
                    {!detailsRevealed ? (
                      <Button fullWidth size="lg" onClick={() => setDetailsRevealed(true)}>
                        <GiftIcon width={16} height={16} />
                        Show transfer details
                      </Button>
                    ) : (
                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-col gap-3"
                        >
                          {registry.bankAccounts.map((account) => (
                            <div
                              key={account.accountNumber}
                              className="rounded-xl border border-gold/30 bg-champagne/30 p-4"
                            >
                              <p className="font-sans text-[0.6rem] uppercase tracking-[0.22em] text-ink-muted">
                                {account.bankName}
                              </p>
                              <p className="mt-2 font-display text-[1.5rem] tracking-[0.08em]">
                                {account.accountNumber}
                              </p>
                              <p className="mt-1 text-[0.85rem] text-ink-soft">
                                {account.accountName}
                              </p>
                              <button
                                type="button"
                                onClick={() => copy(account.accountNumber)}
                                className="mt-3 inline-flex min-h-[40px] items-center gap-2 font-sans text-[0.64rem] uppercase tracking-[0.2em] text-gold transition-colors hover:text-ink"
                              >
                                {copied ? <CheckIcon width={15} height={15} /> : <CopyIcon width={15} height={15} />}
                                {copied ? "Copied" : "Copy account number"}
                              </button>
                              {account.note ? (
                                <p className="mt-3 text-[0.78rem] leading-relaxed text-ink-muted">
                                  {account.note}
                                </p>
                              ) : null}
                            </div>
                          ))}
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </>
                ) : (
                  <>
                    <ButtonLink
                      href={whatsappLink(contact.whatsapp, giftMessage)}
                      fullWidth
                      size="lg"
                    >
                      <WhatsAppIcon width={17} height={17} />
                      Request gifting details
                    </ButtonLink>
                    <p className="text-center font-sans text-[0.74rem] leading-relaxed text-ink-muted">
                      For everyone&rsquo;s security, account details are shared privately by{" "}
                      {contact.name}, {couple.shortNames}&rsquo;s {contact.role.toLowerCase()}.
                    </p>
                  </>
                )}
              </div>
            ) : null}
          </div>
        ) : null}
      </Sheet>
    </Section>
  );
}
