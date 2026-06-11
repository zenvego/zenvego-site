"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

type Stat = {
  /** numeric target the counter animates up to */
  value: number;
  /** text rendered after the number (e.g. "%") */
  suffix?: string;
  label: string;
};

/* Replace these with real numbers as the studio publishes them. */
const STATS: Stat[] = [
  { value: 8, suffix: " yrs", label: "Building product studios" },
  { value: 60, suffix: "+", label: "Apps and sites shipped" },
  { value: 5, suffix: " wks", label: "Average kickoff to first user" },
  { value: 70, suffix: "%", label: "Work from returning or referred clients" },
];

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/* Choreography timing (kept in sync with .studio-fired keyframes in globals.css).
   Cells finish settling around 860ms after the section is armed; counting up
   starts a touch before that so the numbers feel like they were already mid-flight
   when the last cell lands. */
const COUNT_UP_DELAY_MS = 580;
const COUNT_UP_DURATION_MS = 1100;
const SWEEP_DELAY_MS = 820;

export default function Studio() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<number[]>(() => STATS.map(() => 0));
  const started = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const grid = gridRef.current;
    if (!wrap || !grid) return;

    const run = () => {
      if (started.current) return;
      started.current = true;

      // Arm the entrance keyframes (heading, body, cells).
      wrap.classList.add("studio-fired");

      if (reduced) {
        // Reduced motion: numbers land instantly; no sweep.
        setCounts(STATS.map((s) => s.value));
        return;
      }

      // Count-up starts just before the cells settle so the numbers feel "live"
      // as the last cell lands.
      const startCount = performance.now() + COUNT_UP_DELAY_MS;
      const tick = (now: number) => {
        const p = Math.min(1, Math.max(0, (now - startCount) / COUNT_UP_DURATION_MS));
        const e = easeOut(p);
        setCounts(STATS.map((s) => Math.round(s.value * e)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);

      // Conic-light border sweep follows the cells; long enough to read.
      window.setTimeout(() => grid.classList.add("run"), SWEEP_DELAY_MS);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run();
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <section className="block studio-sec" id="studio">
      <div className="wrap">
        <div className="studio-grid-wrap" ref={wrapRef}>
          {/* left — copy */}
          <div className="studio-copy">
            <span className="eyebrow studio-eyebrow">The Studio</span>
            <h2 className="studio-title">
              <span className="studio-line studio-line--a">
                Senior designers and engineers,
              </span>{" "}
              <span className="studio-line studio-line--b grnk">
                no middle layer.
              </span>
            </h2>
            <p className="studio-lead">
              A distributed crew of designers and design engineers. The people
              you meet on the intro call are the people who build it. No
              account managers, no offshore handoff, no pitch deck dressed up
              as a process.
            </p>
          </div>

          {/* right — animated stat grid */}
          <div
            className="studio-grid"
            ref={gridRef}
            onAnimationEnd={() => gridRef.current?.classList.remove("run")}
          >
            {STATS.map((s, i) => (
              <div
                className="studio-cell"
                style={{ ["--i" as string]: i } as React.CSSProperties}
                key={s.label}
              >
                <span className="studio-num">
                  {counts[i]}
                  {s.suffix}
                </span>
                <span className="studio-lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
