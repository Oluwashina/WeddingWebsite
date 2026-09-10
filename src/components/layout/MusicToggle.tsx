"use client";

import { AnimatePresence, motion } from "motion/react";
import { useInvitation } from "@/components/experience/InvitationContext";
import { useMusic } from "@/components/layout/MusicProvider";
import { MusicIcon, MusicOffIcon } from "@/components/ui/icons";
import type { WeddingMeta } from "@/lib/types";

/**
 * Starts automatically when the guest opens or skips the envelope (user gesture).
 * They can pause any time; that choice is remembered for the session.
 */
export function MusicToggle({ meta }: { meta: WeddingMeta }) {
  const { isRevealed } = useInvitation();
  const music = useMusic();

  if (!meta.musicTrack || !music || music.loadFailed) return null;

  const { playing, toggle, title } = music;

  return (
    <AnimatePresence>
      {isRevealed ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="fixed bottom-[calc(env(safe-area-inset-bottom)+5.75rem)] left-4 z-40 lg:bottom-7 lg:left-7"
        >
          <button
            type="button"
            onClick={() => void toggle()}
            aria-pressed={playing}
            aria-label={playing ? "Pause music" : `Play ${title ?? meta.musicTrack!.title}`}
            title={title ?? meta.musicTrack!.title}
            className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-ivory/95 text-ink-soft shadow-[0_12px_34px_-16px_rgba(29,25,22,0.7)] backdrop-blur-md transition-colors hover:border-gold/50 hover:text-gold"
          >
            {playing ? <MusicIcon /> : <MusicOffIcon />}
            {playing ? (
              <span
                className="absolute inset-0 rounded-full border border-gold/40"
                style={{ animation: "ww-pulse-ring 2.4s ease-out infinite" }}
                aria-hidden
              />
            ) : null}
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
