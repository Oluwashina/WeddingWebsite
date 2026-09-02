"use client";

import Image from "next/image";
import { useState } from "react";
import type { Photo } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SmartImageProps {
  photo: Photo;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Slow ken-burns drift on hover; disabled automatically for reduced motion. */
  hoverZoom?: boolean;
  monogram?: string;
}

/**
 * Renders the couple's photo, and degrades to a designed placeholder when the
 * file has not been dropped in yet — so an unfinished gallery never looks broken.
 */
export function SmartImage({
  photo,
  className,
  imageClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
  hoverZoom = true,
  monogram = "A&T",
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-champagne/60", className)}>
      {failed ? (
        <PhotoPlaceholder caption={photo.caption ?? photo.alt} monogram={monogram} />
      ) : (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className={cn(
            "object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
            hoverZoom && "group-hover:scale-[1.045]",
            imageClassName,
          )}
        />
      )}
    </div>
  );
}

export function PhotoPlaceholder({
  caption,
  monogram = "A&T",
}: {
  caption?: string;
  monogram?: string;
}) {
  return (
    <div className="paper-grain absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[linear-gradient(140deg,#f4ede1_0%,#eaddc7_45%,#ddcdb4_100%)] px-6 text-center">
      <span
        className="font-display text-[2.6rem] leading-none text-gold/70"
        aria-hidden
      >
        {monogram}
      </span>
      <span className="h-px w-10 bg-gold/40" aria-hidden />
      {caption ? (
        <span className="max-w-[22ch] font-sans text-[0.62rem] uppercase tracking-[0.26em] text-ink-muted">
          {caption}
        </span>
      ) : null}
    </div>
  );
}
