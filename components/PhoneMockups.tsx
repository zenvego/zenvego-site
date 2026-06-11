"use client";

import { useEffect, useRef } from "react";
import { DECK_CARDS } from "./DeviceCards";

/**
 * Fanned "hand" of device cards over a spinning orange disk.
 * Every 2.4s the whole hand rotates one step so a new card swings to the
 * front-and-centre while the previous one tucks back. Pauses on hover.
 * (Ported 1:1 from the handoff prototype's deck script.)
 */
export default function PhoneMockups() {
  const stageRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const deck = deckRef.current;
    const stage = stageRef.current;
    if (!deck || !stage) return;

    const cards = Array.from(deck.querySelectorAll<HTMLElement>(".appcard"));
    const n = cards.length;
    const mid = (n - 1) / 2;
    let order = cards.map((_, i) => i); // order[pos] = card index at fan position `pos`

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function layout() {
      order.forEach((cardIdx, pos) => {
        const c = cards[cardIdx];
        const t = pos - mid; // -mid..+mid, 0 = front centre
        const x = t * 124; // wide horizontal fan
        const y = Math.abs(t) * 44; // V-shape: centre highest, edges lower
        const rot = t * 6; // splay rotation
        const scale = 1 - Math.abs(t) * 0.05; // centre largest
        c.style.zIndex = String(Math.round(n - Math.abs(t) * 1.6));
        c.style.opacity = "1";
        c.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${scale})`;
      });
    }

    // First paint: drop the whole hand into its fanned positions instantly, with
    // no entrance transition, so every card is visible immediately instead of
    // animating in one-by-one after hydration.
    cards.forEach((c) => (c.style.transition = "none"));
    layout();
    void deck.offsetWidth; // commit the no-transition transforms before re-enabling
    cards.forEach((c) => (c.style.transition = ""));

    if (reduceMotion) return;

    let timer: number | null = null;
    let onScreen = true;

    function tick() {
      order.unshift(order.pop() as number);
      layout();
    }
    function start() {
      if (timer != null || !onScreen || document.hidden) return;
      timer = window.setInterval(tick, 2000);
    }
    function stop() {
      if (timer != null) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    stage.addEventListener("mouseenter", stop);
    stage.addEventListener("mouseleave", start);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    // Only spend frames rotating the deck while the hero is actually on screen.
    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0].isIntersecting;
        if (onScreen) start();
        else stop();
      },
      { threshold: 0.15 }
    );
    io.observe(stage);

    start();

    return () => {
      stop();
      stage.removeEventListener("mouseenter", stop);
      stage.removeEventListener("mouseleave", start);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
    };
  }, []);

  return (
    <div className="stage" ref={stageRef}>
      <div className="flame" aria-hidden />
      <div className="deck" ref={deckRef}>
        {DECK_CARDS.map((Card, i) => (
          <article className="appcard" key={i}>
            <Card />
          </article>
        ))}
      </div>
    </div>
  );
}
