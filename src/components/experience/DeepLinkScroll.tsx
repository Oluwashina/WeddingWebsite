"use client";

import { useEffect } from "react";
import { useInvitation } from "@/components/experience/InvitationContext";
import { scrollToSection, sectionIdFromHash } from "@/lib/section-hash";

/** After the site is revealed, honour `#section` in the URL (deep links & back/forward). */
export function DeepLinkScroll() {
  const { isRevealed } = useInvitation();

  useEffect(() => {
    if (!isRevealed) return;

    const scrollFromHash = (behavior: ScrollBehavior) => {
      const id = sectionIdFromHash(window.location.hash);
      if (id) scrollToSection(id, behavior);
    };

    const initial = window.setTimeout(() => scrollFromHash("auto"), 400);

    const onHashChange = () => scrollFromHash("smooth");
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.clearTimeout(initial);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [isRevealed]);

  return null;
}
