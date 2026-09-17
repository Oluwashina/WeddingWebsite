"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SmartImage } from "@/components/ui/SmartImage";
import type { Couple, StoryMilestone } from "@/lib/types";
import { cn } from "@/lib/utils";

const silk = [0.22, 1, 0.36, 1] as const;

function Milestone({
  milestone,
  index,
  monogram,
}: {
  milestone: StoryMilestone;
  index: number;
  monogram: string;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Gentle parallax drift on the photo as the milestone passes through view.
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const flip = index % 2 === 1;

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-[2.25rem_1fr] gap-x-4 pb-14 last:pb-0 sm:grid-cols-[3.5rem_1fr] sm:gap-x-6 lg:grid-cols-[1fr_5rem_1fr] lg:gap-x-0 lg:pb-24"
    >
      {/* Left column on desktop */}
      <div className={cn("hidden lg:block", flip ? "lg:order-3" : "lg:order-1")}>
        <motion.div
          className={cn("group", flip ? "lg:pl-14" : "lg:pr-14")}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: flip ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
          transition={{ duration: 0.95, ease: silk }}
        >
          <motion.div style={reduceMotion ? undefined : { y }}>
            <SmartImage
              photo={milestone.photo ?? { src: "", alt: milestone.title }}
              monogram={monogram}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="aspect-[5/4] w-full rounded-[1.1rem] shadow-[0_30px_60px_-40px_rgba(29,25,22,0.6)]"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Timeline rail */}
      <div className="relative flex justify-center lg:order-2">
        <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-ink/10" aria-hidden />
        <motion.span
          className="relative mt-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-ivory"
          initial={{ scale: 0.4, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
          transition={{ duration: 0.6, ease: silk }}
        >
          <span className="absolute inset-0 rounded-full border border-gold/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        </motion.span>
      </div>

      {/* Copy — body stays left-aligned; right-align on flip only broke long prose on desktop */}
      <div className={cn("min-w-0", flip ? "lg:order-1 lg:pr-14" : "lg:order-3 lg:pl-14")}>
        <Reveal y={22}>
          <div className={cn(flip && "lg:text-right")}>
            <p className="font-display text-[2.4rem] leading-none text-gold/85 sm:text-[3rem]">
              {milestone.year}
            </p>
            <h3 className="mt-3 text-[1.55rem] leading-tight sm:text-[1.9rem]">{milestone.title}</h3>
            <p className="mt-2 font-sans text-[0.6rem] uppercase tracking-[0.26em] text-ink-muted">
              {milestone.location}
            </p>
          </div>
          <p className="mt-4 text-left text-pretty text-[0.95rem] leading-[1.85] text-ink-soft sm:text-[1rem]">
            {milestone.body}
          </p>

          {/* Photo on mobile sits under the copy */}
          {milestone.photo ? (
            <div className="group mt-6 lg:hidden">
              <SmartImage
                photo={milestone.photo}
                monogram={monogram}
                sizes="100vw"
                className="aspect-[5/4] w-full rounded-[1rem] shadow-[0_24px_50px_-38px_rgba(29,25,22,0.6)]"
              />
            </div>
          ) : null}
        </Reveal>
      </div>
    </div>
  );
}

export function Story({ story, couple }: { story: StoryMilestone[]; couple: Couple }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  return (
    <Section
      id="story"
      tone="sand"
      eyebrow="Our Story"
      title="How We Met"
      intro={couple.introduction}
    >
      <div ref={containerRef} className="relative mx-auto max-w-5xl">
        {/* Gold thread that fills as the story is read */}
        <motion.span
          className="absolute inset-y-0 left-[1.125rem] w-px origin-top bg-gradient-to-b from-gold via-gold/70 to-transparent sm:left-[1.75rem] lg:left-1/2 lg:-translate-x-1/2"
          style={reduceMotion ? { scaleY: 1 } : { scaleY: progress }}
          aria-hidden
        />
        {story.map((milestone, index) => (
          <Milestone
            key={milestone.id}
            milestone={milestone}
            index={index}
            monogram={couple.monogram}
          />
        ))}
      </div>
    </Section>
  );
}
