export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

const currencySymbols: Record<string, string> = {
  NGN: "₦",
  USD: "$",
  GBP: "£",
  EUR: "€",
};

export function formatMoney(amount: number, currency = "NGN"): string {
  const symbol = currencySymbols[currency] ?? `${currency} `;
  return `${symbol}${amount.toLocaleString("en-NG")}`;
}

export function whatsappLink(phoneDigits: string, message: string): string {
  return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;
}

export function mapsLink(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Human-friendly reference, e.g. "AT-7QK4M2". */
export function createReference(prefix = "AT"): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `${prefix}-${code}`;
}

export function initials(names: string): string {
  return names
    .split(/\s+/)
    .filter((part) => /[a-z]/i.test(part))
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
