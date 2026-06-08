"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  /** numeric target the counter animates up to */
  value: number;
  /** text rendered after the number (e.g. "%") */
  suffix?: string;
  label: string;
};

const STATS: Stat[] = [
  { value: 2015, label: "Founded" },
  { value: 14, label: "Senior makers" },
  { value: 9, label: "Timezones" },
  { value: 100, suffix: "%", label: "In-house build" },
];

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export default function Studio() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<number[]>(() => STATS.map(() => 0));
  const started = useRef(false);

  // Count up + kick off the border-light sweep the first time the grid
  // scrolls into view.
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const run = () => {
      if (started.current) return;
      started.current = true;

      // travelling-light border sweep (one pass, then it fades out)
      el.classList.add("run");

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) {
        setCounts(STATS.map((s) => s.value));
        return;
      }

      const duration = 1700;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const e = easeOut(p);
        setCounts(STATS.map((s) => Math.round(s.value * e)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
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
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="block studio-sec" id="studio">
      <div className="wrap">
        <div className="studio-grid-wrap">
          {/* left — copy */}
          <div className="studio-copy reveal">
            <span className="eyebrow studio-eyebrow">The Studio</span>
            <h2 className="studio-title">
              A small, senior team that designs like artists and ships like{" "}
              <span className="grnk">engineers.</span>
            </h2>
            <p className="studio-lead">
              We&apos;re a distributed crew of designers and design engineers
              who&apos;d rather do a few things impossibly well than everything
              just okay. No middle layers, no handoff black holes — the people
              you meet are the people who build it.
            </p>
          </div>

          {/* right — animated stat grid */}
          <div
            className="studio-grid reveal"
            ref={gridRef}
            onAnimationEnd={() => gridRef.current?.classList.remove("run")}
          >
            {STATS.map((s, i) => (
              <div className="studio-cell" key={s.label}>
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
