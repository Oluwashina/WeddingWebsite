"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ChevronDownIcon } from "@/components/ui/icons";
import type { FaqItem } from "@/lib/types";
import { cn } from "@/lib/utils";

function FaqRow({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${item.id}`;
  const buttonId = `faq-button-${item.id}`;

  return (
    <Reveal delay={Math.min(index * 0.04, 0.24)} y={16}>
      <div className="border-b border-ink/10">
        <h3>
          <button
            id={buttonId}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
            className="flex w-full items-start gap-5 py-5 text-left transition-colors hover:text-gold sm:py-6"
          >
            <span className="mt-1 font-sans text-[0.62rem] tabular-nums tracking-[0.16em] text-gold/70">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className={cn(
                "flex-1 font-display text-[1.2rem] leading-snug transition-colors sm:text-[1.4rem]",
                open ? "text-gold" : "text-ink",
              )}
            >
              {item.question}
            </span>
            <motion.span
              className="mt-1 shrink-0 text-ink-muted"
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ChevronDownIcon width={20} height={20} />
            </motion.span>
          </button>
        </h3>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pb-6 pl-[2.6rem] pr-8 sm:pl-[3.1rem]">
                <p className="text-pretty text-[0.94rem] leading-[1.9] text-ink-soft">
                  {item.answer}
                </p>
                {item.link ? (
                  <a
                    href={item.link.href}
                    className="mt-4 inline-flex min-h-[40px] items-center gap-2 font-sans text-[0.62rem] uppercase tracking-[0.22em] text-gold transition-colors hover:text-ink"
                  >
                    {item.link.label}
                    <span aria-hidden>→</span>
                  </a>
                ) : null}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export function Faq({ faqs }: { faqs: FaqItem[] }) {
  return (
    <Section
      id="faq"
      tone="sand"
      eyebrow="Good To Know"
      title="Questions, Answered"
      intro="If something isn't covered here, message us — a real person replies."
    >
      <div className="mx-auto max-w-3xl border-t border-ink/10">
        {faqs.map((item, index) => (
          <FaqRow key={item.id} item={item} index={index} />
        ))}
      </div>
    </Section>
  );
}
