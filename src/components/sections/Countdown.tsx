"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCountdown } from "@/lib/hooks";
import { cn } from "@/lib/utils";

interface CountdownProps {
  targetIso: string;
  className?: string;
  tone?: "light" | "dark";
}

function Unit({
  value,
  label,
  tone,
  ready,
}: {
  value: number;
  label: string;
  tone: "light" | "dark";
  ready: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const display = ready ? String(value).padStart(2, "0") : "--";

  return (
    <div className="flex flex-1 flex-col items-center gap-1.5">
      <div className="relative h-[2.6rem] overflow-hidden sm:h-[3.4rem]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={display}
            className={cn(
              "block font-display text-[2.15rem] leading-[1.2] tabular-nums sm:text-[2.9rem]",
              tone === "dark" ? "text-ivory" : "text-ink",
            )}
            initial={reduceMotion ? { opacity: 0 } : { y: "-70%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { y: "70%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span
        className={cn(
          "font-sans text-[0.53rem] uppercase tracking-[0.26em] sm:text-[0.58rem]",
          tone === "dark" ? "text-ivory/55" : "text-ink-muted",
        )}
      >
        {label}
      </span>
    </div>
  );
}

export function Countdown({ targetIso, className, tone = "light" }: CountdownProps) {
  const { value, ready } = useCountdown(targetIso);

  if (ready && value.isPast) {
    return (
      <p
        className={cn(
          "text-center font-display text-2xl",
          tone === "dark" ? "text-ivory" : "text-ink",
          className,
        )}
      >
        Today is the day.
      </p>
    );
  }

  const units = [
    { label: "Days", value: value.days },
    { label: "Hours", value: value.hours },
    { label: "Minutes", value: value.minutes },
    { label: "Seconds", value: value.seconds },
  ];

  return (
    <div
      className={cn("flex items-start", className)}
      aria-label={`${value.days} days, ${value.hours} hours, ${value.minutes} minutes and ${value.seconds} seconds until the celebration`}
      role="timer"
    >
      {units.map((unit, index) => (
        <div key={unit.label} className="flex flex-1 items-start">
          <Unit value={unit.value} label={unit.label} tone={tone} ready={ready} />
          {index < units.length - 1 ? (
            <span
              className={cn(
                "mt-1 h-9 w-px shrink-0 sm:h-11",
                tone === "dark" ? "bg-ivory/15" : "bg-ink/10",
              )}
              aria-hidden
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
