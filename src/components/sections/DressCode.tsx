"use client";

import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SmartImage } from "@/components/ui/SmartImage";
import type { Couple, DressCodeLook } from "@/lib/types";

export function DressCode({ looks, couple }: { looks: DressCodeLook[]; couple: Couple }) {
  return (
    <Section
      id="dress-code"
      tone="deep"
      eyebrow="Dress Code"
      title="What To Wear"
      intro="A gentle steer, not a rulebook. Come as yourself, just in these colours."
    >
      <RevealGroup className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        {looks.map((look) => (
          <RevealItem key={look.id} className="h-full">
            <article className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-ivory/12 bg-ivory/5">
              <SmartImage
                photo={look.photo ?? { src: "", alt: look.title }}
                monogram={couple.monogram}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-[16/11] w-full"
              />

              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <p className="eyebrow text-gold-light">{look.eventName}</p>
                <h3 className="mt-3 text-[1.75rem] leading-tight text-ivory">{look.title}</h3>
                <p className="mt-4 text-[0.94rem] leading-[1.85] text-ivory/72">{look.guidance}</p>

                <div className="mt-7">
                  <p className="font-sans text-[0.56rem] uppercase tracking-[0.28em] text-ivory/45">
                    The palette
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4">
                    {look.palette.map((swatch) => (
                      <div key={swatch.hex} className="flex flex-col items-center gap-2">
                        <span
                          className="h-14 w-14 rounded-full border border-ivory/25 shadow-[inset_0_2px_6px_rgba(255,255,255,0.18)] transition-transform duration-500 group-hover:scale-105"
                          style={{ backgroundColor: swatch.hex }}
                          aria-hidden
                        />
                        <span className="font-sans text-[0.58rem] uppercase tracking-[0.16em] text-ivory/55">
                          {swatch.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="mt-auto pt-7 text-[0.82rem] italic leading-relaxed text-gold-light/85">
                  {look.avoid}
                </p>
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
