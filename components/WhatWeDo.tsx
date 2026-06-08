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

type Service = {
  accent: string;
  dwell: number;
  sk: string;
  title: string;
  Icon: typeof LayoutTemplate;
  tileBg: string;
  tileColor: string;
  body: string;
  chips: string[];
};

const SERVICES: Service[] = [
  {
    accent: "#7a5af0",
    dwell: 6000,
    sk: "01 · Design",
    title: "Product Design",
    Icon: LayoutTemplate,
    tileBg: "var(--purple)",
    tileColor: "#5b3fa8",
    body: "Research-led UX and pixel-perfect UI that make complex products feel effortless. We design systems, not just screens.",
    chips: ["UX research", "Wireframes", "Design systems", "Prototyping"],
  },
  {
    accent: "#4cc46a",
    dwell: 6000,
    sk: "02 · Build",
    title: "Web Development",
    Icon: Code2,
    tileBg: "var(--green)",
    tileColor: "#06210f",
    body: "Fast, accessible and scalable websites and web apps built on a modern React stack — clean, documented, yours to keep.",
    chips: ["React & Next.js", "Headless CMS", "APIs", "Performance"],
  },
  {
    accent: "#f6a623",
    dwell: 6000,
    sk: "03 · Ship",
    title: "Mobile Apps",
    Icon: Smartphone,
    tileBg: "var(--orange)",
    tileColor: "#5a3500",
    body: "Native-feeling iOS & Android apps that delight users and convert — from prototype to App Store launch.",
    chips: ["React Native", "Offline-first", "Push & auth", "Store launch"],
  },
  {
    accent: "#3aa0d8",
    dwell: 6000,
    sk: "04 · Grow",
    title: "Brand & Strategy",
    Icon: Compass,
    tileBg: "var(--blue)",
    tileColor: "#1d6c92",
    body: "Positioning, identity and design systems that scale with your product and keep every touchpoint coherent.",
    chips: ["Positioning", "Identity", "Messaging", "Guidelines"],
  },
  {
    accent: "#34d6c3",
    dwell: 6000,
    sk: "05 · Intelligence",
    title: "AI Integration",
    Icon: Cpu,
    tileBg: "#bdeee7",
    tileColor: "#0e6f63",
    body: "Embed LLMs, copilots and smart automation into your product — from chat assistants to AI search and content generation, built responsibly.",
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
      // mobile is scroll-driven — no auto-rotation there
      if (hovering || mq.matches) return;
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
    // Mobile: the active card follows scroll — we open the dashboard of whichever
    // card has scrolled up to a line near the top of the viewport. We DON'T move
    // the page (no scrollBy); the dashboard just opens where the card already is.
    // Choosing by header top (which doesn't move when its own dashboard opens
    // below it) keeps the pick monotonic, so neighbours can't flicker/fight.
    let sraf = 0;
    function onScroll() {
      maybeStart();
      if (!mq.matches) return;
      if (sraf) return;
      sraf = requestAnimationFrame(() => {
        sraf = 0;
        const line = (window.innerHeight || 800) * 0.32;
        let idx = 0;
        for (let k = 0; k < rows.length; k++) {
          if (rows[k].getBoundingClientRect().top <= line) idx = k;
          else break;
        }
        if (idx !== cur) select(idx, false);
      });
    }
    maybeStart();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    const t = window.setTimeout(maybeStart, 1200);

    return () => {
      if (timer) clearInterval(timer);
      if (sraf) cancelAnimationFrame(sraf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <section className="block" id="services">
      <div className="wrap">
        <div className="wwd-head reveal">
          <div>
            <span className="eyebrow">What we do</span>
            <h2 style={{ marginTop: 14 }}>
              Everything to design &amp; build{" "}
              <span className="grnk">products people love</span>
            </h2>
            <p>
              Strategy, design and engineering under one roof. Explore the five
              ways we help teams ship — hover or tap to dive in.
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
                      <div className="sk">{s.sk}</div>
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

          <div className="wwd-stage reveal" id="wwdStage" ref={stageRef} style={{ ["--accent-c" as string]: "#7a5af0" }}>
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
