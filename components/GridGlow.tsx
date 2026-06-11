"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor-following spotlight that brightens the emerald grid squares around
 * the pointer. The visible layer is a fixed, viewport-sized div sitting behind
 * all content (z-index -1), so the glow only reads through the transparent mint
 * sections, never the dark hero/footer.
 *
 * The grid layers are scroll-compensated (`--gy`) so they stay locked to the
 * body's scrolling grid; the bloom + reveal mask track the pointer (`--mx`,
 * `--my`). Only a fine pointer gets the effect — touch and reduced-motion users
 * keep the plain static grid. Renders the layer it drives; no markup elsewhere.
 */
export default function GridGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    let mx = 0;
    let my = 0;
    let gy = -window.scrollY;
    let raf = 0;

    const paint = () => {
      raf = 0;
      el.style.setProperty("--mx", `${mx}px`);
      el.style.setProperty("--my", `${my}px`);
      el.style.setProperty("--gy", `${gy}px`);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx = e.clientX;
      my = e.clientY;
      el.classList.add("on");
      schedule();
    };
    const onScroll = () => {
      gy = -window.scrollY;
      schedule();
    };
    // Fade out when the pointer leaves the window or focus is lost.
    const onLeave = () => el.classList.remove("on");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div className="grid-glow" aria-hidden="true" ref={ref} />;
}
