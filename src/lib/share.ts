import type { WeddingMeta } from "@/lib/types";

export type ShareOutcome = "shared" | "fallback" | "cancelled";

/** Prefer the live page URL in the browser; fall back to content for SSR. */
export function getInvitationShareUrl(meta: WeddingMeta): string {
  if (typeof window !== "undefined") {
    return window.location.href.split("#")[0];
  }
  return meta.siteUrl.replace(/\/$/, "");
}

export function getInvitationShareText(meta: WeddingMeta, url?: string): string {
  return `${meta.shareMessage} ${url ?? getInvitationShareUrl(meta)}`;
}

export function getInvitationWhatsAppHref(meta: WeddingMeta, url?: string): string {
  return `https://wa.me/?text=${encodeURIComponent(getInvitationShareText(meta, url))}`;
}

export async function shareInvitation(meta: WeddingMeta, url?: string): Promise<ShareOutcome> {
  const shareUrl = url ?? getInvitationShareUrl(meta);
  const payload: ShareData = {
    title: "You're invited",
    text: meta.shareMessage,
    url: shareUrl,
  };

  if (typeof navigator === "undefined" || !navigator.share) {
    return "fallback";
  }

  try {
    if (navigator.canShare && !navigator.canShare(payload)) {
      return "fallback";
    }
    await navigator.share(payload);
    return "shared";
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return "cancelled";
    }
    return "fallback";
  }
}
