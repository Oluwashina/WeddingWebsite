"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInvitation } from "@/components/experience/InvitationContext";
import { MusicIcon, MusicOffIcon } from "@/components/ui/icons";
import type { WeddingMeta } from "@/lib/types";

const STORAGE_KEY = "ww:music-playing";

/**
 * Opt-in only: nothing plays until the guest taps this. The control stays visible
 * even if autoplay is blocked — only a missing or broken file hides it.
 */
export function MusicToggle({ meta }: { meta: WeddingMeta }) {
  const { isRevealed } = useInvitation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  const syncPlaying = useCallback((next: boolean) => {
    setPlaying(next);
    try {
      if (next) {
        window.sessionStorage.setItem(STORAGE_KEY, "1");
      } else {
        window.sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      /* private mode */
    }
  }, []);

  // The <audio> element only mounts once the invitation is revealed, so listeners
  // must attach then — not on the first mount while the ref is still null.
  useEffect(() => {
    if (!isRevealed) return;

    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => syncPlaying(true);
    const onPause = () => syncPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.pause();
    };
  }, [isRevealed, syncPlaying]);

  // Resume after refresh only if the guest had music on before.
  useEffect(() => {
    if (!isRevealed) return;
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY) !== "1") return;
    } catch {
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35;
    audio.play().catch(() => {
      /* Browser still needs a tap — leave the button visible. */
    });
  }, [isRevealed]);

  if (!meta.musicTrack || loadFailed) return null;

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Trust the element, not React state — listeners may not have fired yet.
    if (!audio.paused) {
      audio.pause();
      syncPlaying(false);
      return;
    }

    audio.volume = 0.35;
    try {
      await audio.play();
      syncPlaying(true);
    } catch {
      /* Gesture was rejected — button stays so they can try again. */
    }
  };

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
            onClick={toggle}
            aria-pressed={playing}
            aria-label={playing ? "Pause music" : `Play ${meta.musicTrack.title}`}
            title={meta.musicTrack.title}
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
          <audio
            ref={audioRef}
            src={meta.musicTrack.src}
            loop
            preload="metadata"
            onError={() => setLoadFailed(true)}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
