"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SmartImage } from "@/components/ui/SmartImage";
import type { Couple, DressCodeContent } from "@/lib/types";

export function DressCode({
  dressCode,
  couple,
}: {
  dressCode: DressCodeContent;
  couple: Couple;
}) {
  return (
    <Section
      id="dress-code"
      tone="deep"
      eyebrow="Dress Code"
      title="What To Wear"
      intro={dressCode.intro}
    >
      <Reveal className="mx-auto max-w-4xl">
        <article className="overflow-hidden rounded-[1.35rem] border border-ivory/12 bg-ivory/5">
          <div className="grid lg:grid-cols-[1.05fr_1fr]">
            {dressCode.photo ? (
              <SmartImage
                photo={dressCode.photo}
                monogram={couple.monogram}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="aspect-[4/3] w-full lg:aspect-auto lg:min-h-full"
              />
            ) : null}

            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              <h3 className="font-display text-[2.15rem] leading-[1.12] text-ivory sm:text-[2.6rem]">
                {dressCode.colors}
              </h3>

              {dressCode.note ? (
                <p className="mt-5 max-w-md text-[0.94rem] leading-[1.85] text-ivory/72">
                  {dressCode.note}
                </p>
              ) : null}

              <div className="mt-9 flex flex-wrap gap-8 sm:gap-10">
                {dressCode.palette.map((swatch) => (
                  <div key={swatch.hex} className="flex flex-col items-center gap-3">
                    <span
                      className="h-[4.5rem] w-[4.5rem] rounded-full border-2 border-ivory/30 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.45)] sm:h-20 sm:w-20"
                      style={{ backgroundColor: swatch.hex }}
                      aria-hidden
                    />
                    <span className="font-sans text-[0.62rem] uppercase tracking-[0.2em] text-ivory/60">
                      {swatch.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      </Reveal>
    </Section>
  );
}
