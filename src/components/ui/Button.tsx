"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-sans uppercase tracking-[0.18em] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.985] disabled:pointer-events-none disabled:opacity-55 select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-ivory shadow-[0_10px_30px_-12px_rgba(29,25,22,0.6)] hover:bg-forest hover:shadow-[0_16px_38px_-14px_rgba(201,120,133,0.55)]",
  outline:
    "border border-ink/20 text-ink hover:border-gold hover:text-gold bg-transparent",
  ghost: "text-ink/70 hover:text-gold",
  light:
    "bg-ivory/95 text-ink backdrop-blur-sm border border-white/40 hover:bg-white shadow-[0_10px_30px_-14px_rgba(29,25,22,0.5)]",
};

const sizes: Record<Size, string> = {
  // 44px+ tall everywhere so touch targets stay comfortable on phones.
  sm: "min-h-[44px] px-5 text-[0.66rem]",
  md: "min-h-[52px] px-7 text-[0.7rem]",
  lg: "min-h-[56px] px-9 text-[0.74rem]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  children,
  ...props
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  children,
  href,
  external,
  ...props
}: CommonProps & { href: string; external?: boolean } & Omit<
    ComponentPropsWithoutRef<"a">,
    "href"
  >) {
  const classes = cn(base, variants[variant], sizes[size], fullWidth && "w-full", className);

  if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
