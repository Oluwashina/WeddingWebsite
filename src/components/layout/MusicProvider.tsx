"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const PAUSED_KEY = "ww:music-paused";

interface MusicContextValue {
  playing: boolean;
  loadFailed: boolean;
  playFromGesture: () => Promise<void>;
  toggle: () => Promise<void>;
  title?: string;
}

const MusicContext = createContext<MusicContextValue | null>(null);

export function useMusic(): MusicContextValue | null {
  return useContext(MusicContext);
}

function readPausedPreference(): boolean {
  try {
    return window.sessionStorage.getItem(PAUSED_KEY) === "1";
  } catch {
    return false;
  }
}

function writePausedPreference(paused: boolean): void {
  try {
    if (paused) {
      window.sessionStorage.setItem(PAUSED_KEY, "1");
    } else {
      window.sessionStorage.removeItem(PAUSED_KEY);
    }
  } catch {
    /* private mode */
  }
}

export function MusicProvider({
  track,
  children,
}: {
  track?: { src: string; title: string };
  children: ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  const playFromGesture = useCallback(async () => {
    if (!track || loadFailed || readPausedPreference()) return;

    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35;
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      /* Browser blocked autoplay without a recent gesture. */
    }
  }, [track, loadFailed]);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      setPlaying(false);
      writePausedPreference(true);
      return;
    }

    audio.volume = 0.35;
    try {
      await audio.play();
      setPlaying(true);
      writePausedPreference(false);
    } catch {
      /* Gesture rejected. */
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, [track?.src]);

  // Returning guests who haven't paused: try to resume quietly.
  useEffect(() => {
    if (!track || loadFailed || readPausedPreference()) return;

    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35;
    audio.play().catch(() => {
      /* Needs a tap on strict browsers. */
    });
  }, [track, loadFailed]);

  if (!track) {
    return <>{children}</>;
  }

  return (
    <MusicContext.Provider
      value={{ playing, loadFailed, playFromGesture, toggle, title: track.title }}
    >
      {children}
      <audio
        ref={audioRef}
        src={track.src}
        loop
        preload="auto"
        onError={() => setLoadFailed(true)}
        className="hidden"
        aria-hidden
      />
    </MusicContext.Provider>
  );
}
