"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

interface ConfettiProps {
  /** Flip to true to fire a single burst. */
  active: boolean;
  duration?: number;
  particleCount?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  spin: number;
  color: string;
  shape: "petal" | "ribbon";
  life: number;
}

/* Champagne, gold and ivory only — coloured confetti reads as party-shop. */
const COLORS = ["#c9a86a", "#d6bd8e", "#eaddc7", "#f4ede1", "#b0894e"];

/**
 * A restrained confetti burst — slim gold ribbons and petals falling with
 * gravity and drag, rather than a novelty explosion.
 */
export function Confetti({ active, duration = 4200, particleCount = 48 }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!active || reduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    /**
     * Kept in sync every frame: the host section changes height while the burst
     * runs (the RSVP form is replaced by the shorter confirmation card), and a
     * stale backing store leaves uncleared bands of smeared particles.
     */
    const syncSize = () => {
      const w = Math.round(canvas.offsetWidth * dpr);
      const h = Math.round(canvas.offsetHeight * dpr);
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    syncSize();

    const width = () => canvas.offsetWidth;
    const height = () => canvas.offsetHeight;

    // Fire from the middle of the screen, not the middle of the host section —
    // the section can be far taller than the viewport.
    const rect = canvas.getBoundingClientRect();
    const originY = Math.min(
      Math.max(window.innerHeight * 0.55 - rect.top, height() * 0.08),
      height() * 0.92,
    );

    const particles: Particle[] = Array.from({ length: particleCount }, () => {
      const fromLeft = Math.random() > 0.5;
      return {
        x: fromLeft ? width() * 0.08 : width() * 0.92,
        y: originY + (Math.random() - 0.5) * window.innerHeight * 0.12,
        vx: (fromLeft ? 1 : -1) * (2.4 + Math.random() * 4.8),
        vy: -(4.6 + Math.random() * 6.4),
        size: 3.5 + Math.random() * 4,
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.18,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: Math.random() > 0.4 ? "petal" : "ribbon",
        life: 1,
      };
    });

    const started = performance.now();
    let frame = 0;

    const draw = (now: number) => {
      const elapsed = now - started;
      syncSize();
      ctx.clearRect(0, 0, width(), height());

      particles.forEach((p) => {
        p.vy += 0.16;
        p.vx *= 0.992;
        p.vy *= 0.995;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.spin;
        p.life = Math.max(0, 1 - elapsed / duration);

        ctx.save();
        ctx.globalAlpha = Math.min(0.85, p.life * 1.2);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        if (p.shape === "ribbon") {
          ctx.fillRect(-p.size / 2, -p.size / 8, p.size * 1.5, p.size / 4);
        } else {
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size / 2.6, p.size * 0.85, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      if (elapsed < duration) {
        frame = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, width(), height());
      }
    };

    frame = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(frame);
  }, [active, duration, particleCount, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
    />
  );
}
