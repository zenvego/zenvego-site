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

    layout();
    if (reduceMotion) return;

    let timer = window.setInterval(() => {
      order.unshift(order.pop() as number);
      layout();
    }, 2000);

    const pause = () => window.clearInterval(timer);
    const resume = () => {
      timer = window.setInterval(() => {
        order.unshift(order.pop() as number);
        layout();
      }, 2000);
    };

    stage.addEventListener("mouseenter", pause);
    stage.addEventListener("mouseleave", resume);

    return () => {
      window.clearInterval(timer);
      stage.removeEventListener("mouseenter", pause);
      stage.removeEventListener("mouseleave", resume);
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
