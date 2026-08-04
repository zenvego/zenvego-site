"use client";

import { useEffect, useRef } from "react";
import { smoothScrollTo } from "./smoothScroll";
import { openProjectModal } from "./ProjectModal";
import ClientsStackMobile from "./ClientsStackMobile";

/**
 * Each card is a real project outcome (mirroring WorkGallery's PROJECTS) so
 * the wall says "here's what shipped" instead of inventing testimonials.
 * Edit this list as real client assets and quotes land.
 */
type Outcome = {
  project: string;
  client: string;
  metric: string;
  metricLabel: string;
  result: string;
  accent: string;
  photo: string;
};

const OUTCOMES: Outcome[] = [
  {
    project: "Student Teach",
    client: "EdTech, iOS and Android",
    metric: "4.8★",
    metricLabel: "App store rating",
    result:
      "One mobile interface replaced three disconnected tools for tutors, students and parents. Twelve thousand active learners six months after launch.",
    accent: "var(--green)",
    photo: "/assets/client-1.png",
  },
  {
    project: "Zenvego",
    client: "D2C food brand, subscription web",
    metric: "6/wk",
    metricLabel: "Fresh mornings delivered",
    result:
      "A calm brand and one-scroll site for plant-based breakfast bowls. Customers pick a plan, check nutrition in the Zen Planner, and subscribe with a single WhatsApp message.",
    accent: "var(--orange)",
    photo: "/assets/client-2.png",
  },
  {
    project: "ScorVault",
    client: "Sports tech, multi-sport web platform",
    metric: "850+",
    metricLabel: "Tournaments run",
    result:
      "Matchmaking, live ball-by-ball scoring and Volts rewards for cricket, badminton and pickleball. Local scenes moved off WhatsApp groups and paper scorecards.",
    accent: "var(--teal)",
    photo: "/assets/client-3.png",
  },
];

export default function Clients() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const host = stackRef.current;
    if (!track || !host) return;
    const cards = Array.from(host.querySelectorAll<HTMLElement>(".ccard"));
    const mix = (a: number, b: number, p: number) => a + (b - a) * p;
    let raf: number | null = null;

    function layout() {
      raf = null;
      const total = track!.offsetHeight - window.innerHeight;
      let p = total > 0 ? -track!.getBoundingClientRect().top / total : 0;
      p = Math.max(0, Math.min(1, p));
      const vgap = mix(28, -168, p);
      let y = 8;
      cards.forEach((c, i) => {
        c.style.transform = `translateY(${y}px)`;
        c.style.zIndex = String(i + 1);
        y += c.offsetHeight + vgap;
      });
    }
    function onScroll() {
      if (!raf) raf = requestAnimationFrame(layout);
    }
    layout();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="clients" id="testimonials">
      {/* Mobile (≤880px): motion-based fan/stack scroll animation */}
      <div className="clients-mobile">
        <ClientsStackMobile items={OUTCOMES} />
      </div>

      {/* Desktop: existing CSS scroll-stack */}
      <div className="clients-track clients-desktop" id="clientsTrack" ref={trackRef}>
        <div className="clients-sticky">
          <div className="clients-grid">
            <div className="cl-left reveal">
              <h3 className="cl-right-title">Happy clients</h3>
              <h2>
                Recent outcomes
                <br />
                from real launches
              </h2>
              <p className="cl-sub">
                Numbers and shipped work from the projects above. We&apos;ll add
                named client quotes here as their teams approve them.
              </p>
              <div className="cl-actions">
                <a href="#work" className="btn cl-ghost" onClick={(e) => smoothScrollTo(e, "#work")}>See all case studies</a>
                <button type="button" className="btn cl-light" onClick={openProjectModal}>Start a project</button>
              </div>
            </div>
            <div className="cl-right reveal">
              <div className="cstack" id="cstack" ref={stackRef}>
                {OUTCOMES.map((o, i) => (
                  <article className="ccard" key={i}>
                    <div className="cc-head">
                      <span
                        className="cc-av"
                        style={{
                          background: `linear-gradient(135deg, ${o.accent}, var(--green-deep))`,
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={o.photo} alt={`${o.project} client`} loading="lazy" />
                      </span>
                      <div>
                        <div className="cc-name">{o.project}</div>
                        <div className="cc-role">{o.client}</div>
                      </div>
                    </div>
                    <div className="cc-metric">
                      <span className="cc-metric-v">{o.metric}</span>
                      <span className="cc-metric-l">{o.metricLabel}</span>
                    </div>
                    <p className="cc-q">{o.result}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
