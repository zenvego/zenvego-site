"use client";

import { useEffect, useRef } from "react";
import {
  LayoutTemplate,
  Code2,
  Smartphone,
  Compass,
  Cpu,
  ChevronRight,
  Boxes,
  Zap,
} from "lucide-react";
import { smoothScrollTo } from "./smoothScroll";
import { useReducedMotion } from "./useReducedMotion";

type Service = {
  accent: string;
  dwell: number;
  kicker: string;
  title: string;
  Icon: typeof LayoutTemplate;
  tileBg: string;
  tileColor: string;
  body: string;
  chips: string[];
};

const SERVICES: Service[] = [
  {
    accent: "var(--purple)",
    dwell: 6000,
    kicker: "Design",
    title: "Product Design",
    Icon: LayoutTemplate,
    tileBg: "var(--purple)",
    tileColor: "var(--purple-ink)",
    body: "Research-led UX and pixel-perfect UI for complex products. We design systems and ship the components alongside them.",
    chips: ["UX research", "Wireframes", "Design systems", "Prototyping"],
  },
  {
    accent: "var(--green)",
    dwell: 6000,
    kicker: "Build",
    title: "Web Development",
    Icon: Code2,
    tileBg: "var(--green)",
    tileColor: "var(--green-ink)",
    body: "Type-safe, accessible React and Next.js apps you can read. Clean code, documented, yours to keep.",
    chips: ["React & Next.js", "Headless CMS", "APIs", "Performance"],
  },
  {
    accent: "var(--orange)",
    dwell: 6000,
    kicker: "Ship",
    title: "Mobile Apps",
    Icon: Smartphone,
    tileBg: "var(--orange)",
    tileColor: "var(--orange-ink)",
    body: "iOS and Android apps in React Native that ship at native frame rates, from prototype to App Store launch.",
    chips: ["React Native", "Offline-first", "Push & auth", "seriously good UX"],
  },
  {
    accent: "var(--blue)",
    dwell: 6000,
    kicker: "Grow",
    title: "Brand & Strategy",
    Icon: Compass,
    tileBg: "var(--blue)",
    tileColor: "var(--blue-ink)",
    body: "Positioning, identity and a system that keeps every touchpoint coherent as the team grows.",
    chips: ["Positioning", "Identity", "Messaging", "Guidelines"],
  },
  {
    accent: "var(--teal)",
    dwell: 6000,
    kicker: "Intelligence",
    title: "AI Integration",
    Icon: Cpu,
    tileBg: "#bdeee7",
    tileColor: "var(--teal-ink)",
    body: "LLMs, copilots and automation wired into your product. Chat, search, content generation, all evaluated.",
    chips: ["LLM & RAG", "Copilots", "Smart search", "Automation"],
  },
];

/* ---- per-pane animated demos (no external images) ---- */
function Pane({ index }: { index: number }) {
  switch (index) {
    case 0:
      return (
        <>
          <span className="ptag"><span className="d" />Product Design</span>
          <h4>From blank canvas to a shippable system</h4>
          <p className="pdesc">We turn fuzzy ideas into clear flows, then into a polished, reusable UI library.</p>
          <div className="demo">
            <div className="d-ui">
              <div className="col">
                <div className="blk" style={{ height: 30, animationDelay: ".05s" }} />
                <div className="blk accent" style={{ flex: 1, animationDelay: ".15s" }} />
              </div>
              <div className="col">
                <div className="blk" style={{ flex: 1, animationDelay: ".25s" }} />
                <div className="blk" style={{ height: 46, animationDelay: ".4s" }} />
              </div>
              <div className="col">
                <div className="blk" style={{ height: 60, animationDelay: ".3s" }} />
                <div className="blk" style={{ height: 24, animationDelay: ".5s" }} />
                <div className="blk accent" style={{ flex: 1, animationDelay: ".6s" }} />
              </div>
            </div>
            <div className="pmetrics">
              <div className="pmetric"><div className="mv" data-count="120" data-suffix="+">120+</div><div className="ml">Screens designed</div></div>
              <div className="pmetric"><div className="mv" data-count="98" data-suffix="%">98%</div><div className="ml">Design-to-dev match</div></div>
            </div>
          </div>
        </>
      );
    case 1:
      return (
        <>
          <span className="ptag"><span className="d" />Web Development</span>
          <h4>Production code, shipped every sprint</h4>
          <p className="pdesc">Type-safe, accessible and fast — built to scale and easy to hand over.</p>
          <div className="demo">
            <div className="d-code">
              <span className="cl" style={{ animationDelay: ".1s" }}><span className="kw">export</span> <span className="kw">function</span> <span className="tg">Studio</span>() {"{"}</span>
              {"\n"}
              <span className="cl" style={{ animationDelay: ".4s" }}>{"  "}<span className="kw">return</span> <span className="tg">&lt;Product</span> <span className="at">craft</span>=<span className="st">&quot;pixel-perfect&quot;</span> <span className="tg">/&gt;</span>;</span>
              {"\n"}
              <span className="cl" style={{ animationDelay: ".8s" }}>{"}"}</span>
              {"\n"}
              <span className="cl" style={{ animationDelay: "1.1s" }}><span style={{ color: "#586059" }}>// deployed in 1.2s · 0 errors</span><span className="cur" /></span>
            </div>
            <div className="pmetrics">
              <div className="pmetric"><div className="mv" data-count="99" data-suffix="">99</div><div className="ml">Lighthouse score</div></div>
              <div className="pmetric"><div className="mv" data-count="40" data-suffix="ms">40ms</div><div className="ml">Avg. response</div></div>
            </div>
          </div>
        </>
      );
    case 2:
      return (
        <>
          <span className="ptag"><span className="d" />Mobile Apps</span>
          <h4>Apps that feel native on every device</h4>
          <p className="pdesc">One codebase, two platforms, zero compromise on speed or polish.</p>
          <div className="demo">
            <div className="d-phone">
              <div className="pr s" />
              <div className="ptile" style={{ animationDelay: ".15s" }} />
              <div className="ptile" style={{ animationDelay: ".3s", height: 26, background: "linear-gradient(135deg,rgba(255,255,255,.1),rgba(255,255,255,.03))", borderColor: "rgba(255,255,255,.1)" }} />
              <div className="ptile" style={{ animationDelay: ".45s", height: 26, background: "linear-gradient(135deg,rgba(255,255,255,.1),rgba(255,255,255,.03))", borderColor: "rgba(255,255,255,.1)" }} />
            </div>
            <div className="pmetrics">
              <div className="pmetric"><div className="mv" data-count="60" data-suffix="fps">60fps</div><div className="ml">Buttery smooth</div></div>
              <div className="pmetric"><div className="mv" data-count="4" data-suffix=".9★">4.9★</div><div className="ml">Avg. store rating</div></div>
            </div>
          </div>
        </>
      );
    case 3:
      return (
        <>
          <span className="ptag"><span className="d" />Brand &amp; Strategy</span>
          <h4>Positioning that compounds over time</h4>
          <p className="pdesc">A coherent system — voice, identity, rules — that scales with the product.</p>
          <div className="demo">
            <div className="d-ring">
              <svg width="118" height="118" viewBox="0 0 118 118">
                <circle cx="59" cy="59" r="54" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="9" />
                <g className="rt"><circle className="fg" cx="59" cy="59" r="54" fill="none" stroke="var(--accent-c)" strokeWidth="9" strokeLinecap="round" style={{ ["--off" as string]: "54" }} /></g>
              </svg>
              <div className="d-chart" style={{ flex: 1 }}>
                {[
                  { h: "46%", d: ".1s" },
                  { h: "64%", d: ".18s" },
                  { h: "52%", d: ".26s" },
                  { h: "80%", d: ".34s" },
                  { h: "70%", d: ".42s" },
                  { h: "100%", d: ".5s" },
                ].map((b, i) => (
                  <i key={i} style={{ ["--h" as string]: b.h, animationDelay: b.d }} />
                ))}
              </div>
            </div>
            <div className="pmetrics">
              <div className="pmetric"><div className="mv" data-count="3" data-suffix="x">3x</div><div className="ml">Avg. brand lift</div></div>
              <div className="pmetric"><div className="mv" data-count="40" data-suffix="+">40+</div><div className="ml">Brands shaped</div></div>
            </div>
          </div>
        </>
      );
    default:
      return (
        <>
          <span className="ptag"><span className="d" />AI Integration</span>
          <h4>Intelligence built into the product</h4>
          <p className="pdesc">Copilots, smart search and automation — wired into your app and shipped responsibly.</p>
          <div className="demo">
            <div className="d-ai">
              <div className="ai-msg user"><span className="ai-av u">You</span><span className="ai-bub">Summarise this quarter&apos;s churn drivers</span></div>
              <div className="ai-msg bot">
                <span className="ai-av b"><Cpu size={14} strokeWidth={2.2} /></span>
                <span className="ai-bub bot">
                  <span className="ai-ln" style={{ animationDelay: ".3s", width: "92%" }} />
                  <span className="ai-ln" style={{ animationDelay: ".5s", width: "80%" }} />
                  <span className="ai-ln" style={{ animationDelay: ".7s", width: "64%" }} />
                  <span className="ai-cursor" />
                </span>
              </div>
            </div>
            <div className="pmetrics">
              <div className="pmetric"><div className="mv" data-count="10" data-suffix="x">10x</div><div className="ml">Faster workflows</div></div>
              <div className="pmetric"><div className="mv" data-count="60" data-suffix="%">60%</div><div className="ml">Tasks automated</div></div>
            </div>
          </div>
        </>
      );
  }
}

export default function WhatWeDo() {
  const wwdRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const wwd = wwdRef.current;
    const stage = stageRef.current;
    if (!wwd || !stage) return;

    const rows = Array.from(wwd.querySelectorAll<HTMLElement>(".srow"));
    const panes = Array.from(stage.querySelectorAll<HTMLElement>(".pane"));
    // mobile-only inline dashboards, one per service row
    const mPanes = Array.from(wwd.querySelectorAll<HTMLElement>(".srow-stage .pane"));
    const accents = SERVICES.map((s) => s.accent);
    const mq = window.matchMedia("(max-width: 900px)");
    const DWELL = 6000;
    let cur = 0;
    let timer: number | null = null;
    let hovering = false;
    let started = false;

    function countUp(pane: HTMLElement) {
      pane.querySelectorAll<HTMLElement>(".mv").forEach((el) => {
        const target = parseFloat(el.dataset.count || "0");
        const suffix = el.dataset.suffix || "";
        const dur = 1000;
        const t0 = performance.now();
        const isFloat = target % 1 !== 0;
        function step(now: number) {
          const p = Math.min((now - t0) / dur, 1);
          const e = 1 - Math.pow(1 - p, 3);
          const val = target * e;
          el.textContent = (isFloat ? val.toFixed(1) : Math.round(val)) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }
    function restartPaneAnims(pane: HTMLElement) {
      pane
        .querySelectorAll<HTMLElement>(".d-ui .blk, .d-chart i, .d-code .cl, .d-phone .ptile, .d-ring .fg")
        .forEach((n) => {
          n.style.animation = "none";
          void n.offsetWidth;
          n.style.animation = "";
        });
    }
    function select(i: number, manual?: boolean) {
      cur = i;
      rows.forEach((r, idx) => r.classList.toggle("active", idx === i));
      panes.forEach((p, idx) => p.classList.toggle("show", idx === i));
      mPanes.forEach((p, idx) => p.classList.toggle("show", idx === i));
      stage!.style.setProperty("--accent-c", accents[i]);
      const pane = panes[i];
      restartPaneAnims(pane);
      countUp(pane);
      const mpane = mPanes[i];
      if (mpane) {
        restartPaneAnims(mpane);
        countUp(mpane);
      }
      if (manual) resetAuto();
    }
    function next() {
      select((cur + 1) % rows.length);
    }
    function resetAuto() {
      if (timer) clearInterval(timer);
      // mobile is scroll-driven; reduced-motion users get no auto-rotation (WCAG 2.2.2)
      if (hovering || mq.matches || reduced) return;
      timer = window.setInterval(() => {
        if (!hovering && !mq.matches) next();
      }, DWELL);
    }
    rows.forEach((r, idx) => {
      r.addEventListener("click", () => select(idx, true));
      r.addEventListener("mouseenter", () => {
        if (mq.matches) return;
        hovering = true;
        wwd.classList.add("paused");
        if (timer) clearInterval(timer);
        if (idx !== cur) select(idx, false);
      });
    });
    wwd.addEventListener("mouseleave", () => {
      if (mq.matches) return;
      hovering = false;
      wwd.classList.remove("paused");
      resetAuto();
    });
    function maybeStart() {
      if (started) return;
      const r = wwd!.getBoundingClientRect();
      if (r.top < (window.innerHeight || 800) * 0.8 && r.bottom > 0) {
        started = true;
        select(0, false);
        resetAuto();
      }
    }
    // Mobile: tap-to-open accordion. The first card is open by default and only
    // one is open at a time; tapping a card opens it (handled by the row click
    // listener above). Scrolling never changes which card is open — onScroll only
    // arms the initial state when the section enters the viewport.
    function onScroll() {
      maybeStart();
    }
    maybeStart();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    const t = window.setTimeout(maybeStart, 1200);

    return () => {
      if (timer) clearInterval(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(t);
    };
  }, [reduced]);

  return (
    <section className="block" id="services">
      <div className="wrap">
        <div className="wwd-head reveal">
          <div>
            <h2>
              Everything we make,{" "}
              <span className="grnk">across design and engineering</span>
            </h2>
            <p>
              Strategy, design and engineering under one roof. Pick a discipline
              to see how the work shows up in production.
            </p>
          </div>
        </div>

        <div className="wwd" id="wwd" ref={wwdRef}>
          <div className="wwd-list">
            {SERVICES.map((s, i) => {
              const Icon = s.Icon;
              return (
                <div className="sitem" key={i}>
                <div
                  className={`srow${i === 0 ? " active" : ""}`}
                  data-i={i}
                  style={{ ["--accent-c" as string]: s.accent, ["--dwell" as string]: `${s.dwell}ms` }}
                >
                  <div className="srow-top">
                    <div className="tile" style={{ background: s.tileBg, color: s.tileColor }}>
                      <Icon size={22} strokeWidth={2} />
                    </div>
                    <div className="stitle">
                      <div className="sk">{s.kicker}</div>
                      <h3>{s.title}</h3>
                    </div>
                    <div className="chev"><ChevronRight size={15} strokeWidth={2.4} /></div>
                  </div>
                  <div className="srow-body">
                    <p>{s.body}</p>
                    <div className="schips">
                      {s.chips.map((c) => (
                        <span className="schip" key={c}>{c}</span>
                      ))}
                    </div>
                  </div>
                  <div className="sprog"><i /></div>
                </div>
                {/* mobile-only: this card's dashboard, inline right beneath it */}
                <div className="srow-stage" aria-hidden style={{ ["--accent-c" as string]: s.accent }}>
                  <div className="mstage">
                    <div className="sgrid" />
                    <div className="sglow" />
                    <div className="pane">
                      <Pane index={i} />
                    </div>
                  </div>
                </div>
                </div>
              );
            })}
          </div>

          <div className="wwd-stage reveal" id="wwdStage" ref={stageRef} style={{ ["--accent-c" as string]: "var(--purple)" }}>
            <div className="sgrid" />
            <div className="sglow" />
            {SERVICES.map((_, i) => (
              <div className={`pane${i === 0 ? " show" : ""}`} data-pane={i} key={i}>
                <Pane index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* promo strip — the float/shine/grid/button-nudge hover card */}
        <div className="feat-bottom" style={{ marginTop: 30 }}>
          <div className="promo reveal">
            <div className="pgrid" aria-hidden />
            <h3>Let&apos;s talk about your product</h3>
            <p>
              Book a free 30-minute call with our design and engineering leads.
              We&apos;ll map the fastest path from idea to launch and flag what
              might slow you down — no pitch, no pressure.
            </p>
            <a href="#contact" className="btn btn-dark" onClick={(e) => smoothScrollTo(e, "#contact")}>
              Book a call
            </a>
          </div>
          <div className="pair">
            <div className="fcard reveal">
              <div className="tile green"><Boxes size={22} strokeWidth={2} /></div>
              <h3>One accountable team</h3>
              <p>No handoffs between agencies — design and engineering sit together.</p>
            </div>
            <div className="fcard reveal">
              <div className="tile orange"><Zap size={22} strokeWidth={2} /></div>
              <h3>Fast, in weeks</h3>
              <p>Tight sprints with clickable demos — you see progress every week.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
