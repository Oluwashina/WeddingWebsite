"use client";

import { useEffect, useState } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Sheet } from "@/components/ui/Sheet";
import { CheckIcon, CopyIcon, ShareIcon, WhatsAppIcon } from "@/components/ui/icons";
import { useCopyToClipboard } from "@/lib/hooks";
import {
  getInvitationShareText,
  getInvitationShareUrl,
  getInvitationWhatsAppHref,
  shareInvitation,
} from "@/lib/share";
import type { WeddingMeta } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  meta: WeddingMeta;
  className?: string;
  label?: string;
  variant?: "icon" | "button";
  fullWidth?: boolean;
}

/**
 * Uses the native share sheet where available (most phones), and falls back to
 * a WhatsApp deep link plus copy-to-clipboard everywhere else.
 */
export function ShareButton({
  meta,
  className,
  label = "Share",
  variant = "icon",
  fullWidth,
}: ShareButtonProps) {
  const [fallbackOpen, setFallbackOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState(meta.siteUrl);
  const [copiedLink, copyLink] = useCopyToClipboard();
  const [copiedText, copyText] = useCopyToClipboard();

  useEffect(() => {
    setShareUrl(getInvitationShareUrl(meta));
  }, [meta]);

  const shareText = getInvitationShareText(meta, shareUrl);
  const whatsappHref = getInvitationWhatsAppHref(meta, shareUrl);

  const handleShare = async () => {
    const outcome = await shareInvitation(meta, shareUrl);
    if (outcome === "fallback") {
      setFallbackOpen(true);
    }
  };

  return (
    <>
      {variant === "icon" ? (
        <button
          type="button"
          onClick={handleShare}
          aria-label="Share this invitation"
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full text-current transition-colors hover:text-gold",
            className,
          )}
        >
          <ShareIcon />
        </button>
      ) : (
        <Button
          variant="outline"
          size="md"
          onClick={handleShare}
          fullWidth={fullWidth}
          className={className}
        >
          <ShareIcon width={16} height={16} />
          {label}
        </Button>
      )}

      <Sheet
        open={fallbackOpen}
        onClose={() => setFallbackOpen(false)}
        eyebrow="Pass it on"
        title="Share the invitation"
      >
        <div className="flex flex-col gap-4">
          <p className="text-[0.95rem] leading-relaxed text-ink-soft">{meta.shareMessage}</p>
          <div className="rounded-xl border border-ink/10 bg-ivory-deep/60 px-4 py-3 font-sans text-sm text-ink-soft break-all">
            {shareUrl}
          </div>
          <ButtonLink href={whatsappHref} variant="primary" fullWidth target="_self">
            <WhatsAppIcon width={17} height={17} />
            Share on WhatsApp
          </ButtonLink>
          <Button variant="outline" fullWidth onClick={() => copyText(shareText)}>
            {copiedText ? <CheckIcon width={16} height={16} /> : <CopyIcon width={16} height={16} />}
            {copiedText ? "Message copied" : "Copy message"}
          </Button>
          <Button variant="outline" fullWidth onClick={() => copyLink(shareUrl)}>
            {copiedLink ? <CheckIcon width={16} height={16} /> : <CopyIcon width={16} height={16} />}
            {copiedLink ? "Link copied" : "Copy link"}
          </Button>
        </div>
      </Sheet>
    </>
  );
}
