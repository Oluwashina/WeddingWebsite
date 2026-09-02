import { cn } from "@/lib/utils";

/** Small engraved flourish used to separate blocks of content. */
export function Ornament({ className, tone = "gold" }: { className?: string; tone?: "gold" | "light" }) {
  const stroke = tone === "gold" ? "#b0894e" : "#d6bd8e";
  return (
    <svg
      viewBox="0 0 120 18"
      className={cn("h-[18px] w-[120px]", className)}
      fill="none"
      aria-hidden
    >
      <path d="M0 9h38" stroke={stroke} strokeOpacity="0.45" strokeWidth="0.9" />
      <path d="M82 9h38" stroke={stroke} strokeOpacity="0.45" strokeWidth="0.9" />
      <path
        d="M60 2c3.4 3.1 6.4 5.3 6.4 7.2 0 2.4-2.9 4.4-6.4 6.8-3.5-2.4-6.4-4.4-6.4-6.8C53.6 7.3 56.6 5.1 60 2Z"
        stroke={stroke}
        strokeWidth="0.9"
      />
      <circle cx="48" cy="9" r="1.5" fill={stroke} fillOpacity="0.6" />
      <circle cx="72" cy="9" r="1.5" fill={stroke} fillOpacity="0.6" />
    </svg>
  );
}

/** Wax-seal style monogram used on the envelope and in the footer. */
export function Monogram({
  text,
  className,
  size = 96,
}: {
  text: string;
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center rounded-full",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
        <circle cx="50" cy="50" r="47" stroke="currentColor" strokeOpacity="0.35" strokeWidth="0.8" />
        <circle
          cx="50"
          cy="50"
          r="41"
          stroke="currentColor"
          strokeOpacity="0.55"
          strokeWidth="0.6"
          strokeDasharray="1.5 4"
        />
      </svg>
      <span
        className="font-display leading-none tracking-tight"
        style={{ fontSize: size * 0.32 }}
      >
        {text}
      </span>
    </span>
  );
}
