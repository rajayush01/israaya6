import Lenis from "lenis";
import { useEffect, useRef } from "react";

/** Set to false to use plain native scrolling everywhere (the most bulletproof option). */
const ENABLE_SMOOTH_SCROLL = true;

/** Returns a ref holding the Lenis instance, or null when native scrolling is being used. */
export default function useSmoothScroll() {
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!ENABLE_SMOOTH_SCROLL) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    // Wheel-smoothing runs on the main thread. On touch devices and weaker machines native
    // (compositor-driven) scrolling is smoother, so only enable it where it pays off.
    const cores = navigator.hardwareConcurrency ?? 4;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
    if (reduced || !finePointer || cores < 6 || memory < 4) return;

    const l = new Lenis({ lerp: 0.1, smoothWheel: true, autoRaf: false });
    lenis.current = l;

    // Drive Lenis only while a scroll is happening — no idle 60fps loop.
    let frameId = 0;
    let running = false;
    let idleFrames = 0;
    const tick = (time: number) => {
      l.raf(time);
      idleFrames = l.isScrolling ? 0 : idleFrames + 1;
      if (idleFrames > 12) {
        running = false;
        return;
      }
      frameId = requestAnimationFrame(tick);
    };
    const kick = () => {
      idleFrames = 0;
      if (running) return;
      running = true;
      frameId = requestAnimationFrame(tick);
    };

    const events = ["wheel", "keydown", "pointerdown", "scroll"] as const;
    events.forEach((e) => window.addEventListener(e, kick, { passive: true }));
    return () => {
      events.forEach((e) => window.removeEventListener(e, kick));
      cancelAnimationFrame(frameId);
      l.destroy();
      lenis.current = null;
    };
  }, []);

  return lenis;
}
