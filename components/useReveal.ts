"use client";

import { useEffect } from "react";

/**
 * Scroll-reveal: adds `.in` to every `.reveal` element when it scrolls into
 * view. Mirrors the prototype's rect-based approach (robust where the
 * IntersectionObserver / animation clock is unreliable), with a safety
 * fallback that reveals everything after ~1.1s.
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    els.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 3) * 70}ms`;
    });
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const run = () => {
      els.forEach((el) => {
        if (
          !el.classList.contains("in") &&
          el.getBoundingClientRect().top < vh * 0.9
        ) {
          el.classList.add("in");
        }
      });
    };
    run();
    window.addEventListener("scroll", run, { passive: true });
    window.addEventListener("resize", run);
    const t = window.setTimeout(
      () => els.forEach((el) => el.classList.add("in")),
      1100
    );
    return () => {
      window.removeEventListener("scroll", run);
      window.removeEventListener("resize", run);
      window.clearTimeout(t);
    };
  }, []);
}
