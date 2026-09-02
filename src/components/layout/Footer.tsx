"use client";

import { ShareButton } from "@/components/layout/ShareButton";
import { Monogram, Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { Petals } from "@/components/ui/Petals";
import type { Couple, SocialLink, WeddingMeta } from "@/lib/types";

export function Footer({
  couple,
  meta,
  socials,
}: {
  couple: Couple;
  meta: WeddingMeta;
  socials: SocialLink[];
}) {
  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(180deg,#1a2f28,#12211b)] pb-[calc(env(safe-area-inset-bottom)+6.5rem)] pt-20 text-ivory lg:pb-16 lg:pt-28">
      <Petals count={8} opacity={0.22} palette={["#d6bd8e", "#b0894e"]} />

      <div className="container-page relative flex flex-col items-center text-center">
        <Reveal className="flex flex-col items-center">
          <Monogram text={couple.monogram} size={84} className="text-gold-light/70" />

          <h2 className="mt-8 font-display text-[2.5rem] leading-[1.05] sm:text-[3.2rem]">
            {couple.shortNames}
          </h2>

          <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-ivory/70">
            We can&rsquo;t wait to celebrate with you.
          </p>

          <div className="mt-8">
            <Ornament tone="light" className="opacity-60" />
          </div>

          <p className="mt-8 font-sans text-[0.66rem] uppercase tracking-[0.32em] text-gold-light/80">
            {meta.displayDate}
          </p>
          <p className="mt-2.5 font-sans text-[0.62rem] uppercase tracking-[0.26em] text-ivory/45">
            {meta.displayLocation}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <ShareButton
            meta={meta}
            variant="button"
            label="Share the invitation"
            className="border-ivory/25 text-ivory hover:border-gold-light hover:text-gold-light"
          />
        </Reveal>

        {socials.length ? (
          <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {socials.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[0.62rem] uppercase tracking-[0.24em] text-ivory/55 transition-colors hover:text-gold-light"
              >
                {social.label}
              </a>
            ))}
          </Reveal>
        ) : null}

        <div className="mt-14 w-full border-t border-ivory/10 pt-7">
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.22em] text-ivory/35">
            {couple.brideFullName} &amp; {couple.groomFullName}
          </p>
          <p className="mt-2 font-sans text-[0.58rem] tracking-[0.18em] text-ivory/25">
            Made with love in Lagos
          </p>
        </div>
      </div>
    </footer>
  );
}
