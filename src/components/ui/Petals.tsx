"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface PetalsProps {
  count?: number;
  className?: string;
  /** Petal fill colours, cycled through. */
  palette?: string[];
  opacity?: number;
}

/**
 * Slow, sparse petals drifting down the page. Purely decorative: rendered only
 * after mount (so markup stays deterministic) and skipped for reduced motion.
 */
export function Petals({
  count = 14,
  className,
  palette = ["#d6bd8e", "#eaddc7", "#c8a877", "#f0e3cd"],
  opacity = 0.5,
}: PetalsProps) {
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => setMounted(true), []);

  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 4 + Math.random() * 5,
        duration: 16 + Math.random() * 18,
        delay: -Math.random() * 26,
        drift: (Math.random() - 0.5) * 200,
        color: palette[i % palette.length],
        rotate: Math.random() * 360,
      })),
    [count, palette],
  );

  if (!mounted || reduceMotion) return null;

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="absolute top-0 block"
          style={{
            left: `${petal.left}%`,
            width: petal.size,
            height: petal.size * 2.2,
            animation: `ww-petal-fall ${petal.duration}s linear ${petal.delay}s infinite`,
            ["--petal-drift" as string]: `${petal.drift}px`,
            ["--petal-opacity" as string]: `${opacity}`,
            willChange: "transform, opacity",
          }}
        >
          {/* A slim almond petal — pointed at both ends so it still reads as a
              petal at 5px rather than a blob. */}
          <svg viewBox="0 0 14 31" width="100%" height="100%">
            <path
              d="M7 0C11.8 9.1 14 16.1 14 20.4 14 26.2 10.9 31 7 31 3.1 31 0 26.2 0 20.4 0 16.1 2.2 9.1 7 0Z"
              fill={petal.color}
              transform={`rotate(${petal.rotate} 7 15.5)`}
            />
          </svg>
        </span>
      ))}
    </div>
  );
}
