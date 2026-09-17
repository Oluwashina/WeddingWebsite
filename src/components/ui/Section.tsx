import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

interface SectionProps {
  id: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  align?: "center" | "left";
  tone?: "ivory" | "deep" | "sand";
}

const tones = {
  ivory: "bg-ivory text-ink",
  sand: "bg-ivory-deep text-ink",
  deep: "bg-forest text-ivory",
};

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
  headerClassName,
  align = "center",
  tone = "ivory",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 py-20 sm:py-24 lg:py-32", tones[tone], className)}
    >
      <div className="container-page">
        {(eyebrow || title || intro) && (
          <Reveal
            className={cn(
              "mx-auto mb-12 flex max-w-2xl flex-col gap-4 sm:mb-16",
              align === "center" ? "items-center text-center" : "items-start text-left",
              headerClassName,
            )}
          >
            {eyebrow ? (
              <p className={cn("eyebrow", tone === "deep" && "text-ivory")}>{eyebrow}</p>
            ) : null}
            {title ? (
              <h2
                className={cn(
                  "text-[2.15rem] leading-[1.08] sm:text-5xl lg:text-[3.4rem]",
                  tone === "deep" ? "text-ivory" : "text-ink",
                )}
              >
                {title}
              </h2>
            ) : null}
            {title ? (
              <span
                className={cn(
                  "block h-px w-16",
                  tone === "deep" ? "bg-gold-light/60" : "bg-gold/50",
                )}
                aria-hidden
              />
            ) : null}
            {intro ? (
              <p
                className={cn(
                  "text-pretty text-[0.98rem] leading-[1.85] sm:text-[1.05rem]",
                  tone === "deep" ? "text-ivory/75" : "text-ink-soft",
                )}
              >
                {intro}
              </p>
            ) : null}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
