"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { Section } from "@/components/ui/Section";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowRightIcon, CloseIcon } from "@/components/ui/icons";
import { useEscapeKey, useLockBodyScroll } from "@/lib/hooks";
import type { Couple, Photo } from "@/lib/types";
export function Gallery({ photos, couple }: { photos: Photo[]; couple: Couple }) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  useLockBodyScroll(open);
  useEscapeKey(() => setIndex(null), open);

  const step = useCallback(
    (delta: number) => {
      setIndex((current) => {
        if (current === null) return current;
        return (current + delta + photos.length) % photos.length;
      });
    },
    [photos.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  return (
    <Section
      id="gallery"
      eyebrow="The Gallery"
      title="Moments Before The Moment"
      intro="Engagement shoots, quiet afternoons and a few frames our photographer swears we didn't notice."
    >
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {photos.map((photo, i) => (
          <motion.button
            key={photo.src}
            type="button"
            onClick={() => setIndex(i)}
            className="group block w-full overflow-hidden rounded-[0.9rem]"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-6% 0px" }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            aria-label={`Open photo: ${photo.alt}`}
          >
            <div className="relative">
              <SmartImage
                photo={photo}
                monogram={couple.monogram}
                sizes="(max-width: 640px) 48vw, (max-width: 1024px) 45vw, 30vw"
                className="aspect-[4/5] w-full"
              />
              <span
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(29,25,22,0.45))] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden
              />
              {photo.caption ? (
                <span className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-2 text-left font-sans text-[0.62rem] uppercase tracking-[0.16em] text-ivory opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {photo.caption}
                </span>
              ) : null}
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[85] flex flex-col bg-ink/94 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span className="font-sans text-[0.62rem] uppercase tracking-[0.24em] text-ivory/55">
                {(index ?? 0) + 1} / {photos.length}
              </span>
              <button
                type="button"
                onClick={() => setIndex(null)}
                aria-label="Close photo viewer"
                className="flex h-11 w-11 items-center justify-center rounded-full text-ivory/80 transition-colors hover:bg-ivory/10 hover:text-ivory"
              >
                <CloseIcon width={22} height={22} />
              </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center px-4 pb-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={photos[index ?? 0].src}
                  className="relative h-full max-h-[72svh] w-full max-w-4xl"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.16}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -70) step(1);
                    if (info.offset.x > 70) step(-1);
                  }}
                >
                  <SmartImage
                    photo={photos[index ?? 0]}
                    monogram={couple.monogram}
                    sizes="100vw"
                    hoverZoom={false}
                    imageClassName="object-contain"
                    className="h-full w-full bg-transparent"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between gap-4 px-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)]">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition-colors hover:border-gold hover:text-gold"
              >
                <ArrowRightIcon width={20} height={20} className="rotate-180" />
              </button>
              <p className="flex-1 text-center font-sans text-[0.72rem] leading-relaxed text-ivory/65">
                {photos[index ?? 0].caption ?? photos[index ?? 0].alt}
              </p>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photo"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition-colors hover:border-gold hover:text-gold"
              >
                <ArrowRightIcon width={20} height={20} />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Section>
  );
}
