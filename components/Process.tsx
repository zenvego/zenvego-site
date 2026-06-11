"use client";

import { useEffect, useRef, useState } from "react";
import { Search, FileText, Code2, ShieldCheck, Rocket, Zap, Link2, ArrowRight, Pause, Play } from "lucide-react";
import { useReducedMotion } from "./useReducedMotion";

const NODES = [Search, FileText, Code2, ShieldCheck, Rocket];
const DWELL_MS = 6000;

type Phase = {
  status: string;
  date: string;
  title: string;
  desc: string;
  barLabel: string;
  pct: number;
  links: number[];
  label: string;
};

const DATA: Phase[] = [
  { status: "COMPLETE", date: "Week 1", title: "Discovery", label: "Discovery", desc: "Goals, users and scope — aligned before a line of code is written.", barLabel: "Clarity", pct: 85, links: [1] },
  { status: "COMPLETE", date: "Week 2–3", title: "Design", label: "Design", desc: "UI/UX design and system architecture, validated with real prototypes.", barLabel: "Polish", pct: 90, links: [0, 2] },
  { status: "IN PROGRESS", date: "Week 3–6", title: "Development", label: "Development", desc: "Production build shipped in tight, demoable sprints.", barLabel: "Velocity", pct: 95, links: [1, 3] },
  { status: "QUEUED", date: "Week 6–7", title: "Testing", label: "Testing", desc: "QA, accessibility and performance hardening across devices.", barLabel: "Coverage", pct: 92, links: [2, 4] },
  { status: "QUEUED", date: "Week 8", title: "Release", label: "Release", desc: "Ship, measure and iterate — then grow as your product partner.", barLabel: "Momentum", pct: 88, links: [3] },
];

export default function Process() {
  const [active, setActive] = useState(1);
  const [shown, setShown] = useState(1);
  const [fade, setFade] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const currentRot = useRef(-72);
  const activeRef = useRef(1);
  const pausedRef = useRef(false);
  const reducedRef = useRef(false);
  const orbitRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | null>(null);

  const go = (i: number, manual?: boolean) => {
    activeRef.current = i;
    setActive(i);
    let target = -i * 72;
    while (target - currentRot.current > 180) target -= 360;
    while (target - currentRot.current < -180) target += 360;
    currentRot.current = target;
    orbitRef.current?.style.setProperty("--rot", `${target}deg`);
    setFade(true);
    window.setTimeout(() => {
      setShown(i);
      setFade(false);
    }, 180);
    if (manual) resetAuto();
  };

  const resetAuto = () => {
    if (timer.current) clearInterval(timer.current);
    /* Skip auto-rotation entirely for users who've opted into reduced motion
       (WCAG 2.2.2). For everyone else, allow pause via the manual toggle and
       use a dwell long enough to actually read the phase. */
    if (reducedRef.current || pausedRef.current) return;
    timer.current = window.setInterval(() => {
      if (!pausedRef.current) go((activeRef.current + 1) % NODES.length);
    }, DWELL_MS);
  };

  useEffect(() => {
    reducedRef.current = reduced;
    resetAuto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  useEffect(() => {
    pausedRef.current = paused;
    resetAuto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  useEffect(() => {
    orbitRef.current?.style.setProperty("--rot", `${currentRot.current}deg`);
    resetAuto();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const d = DATA[shown];
  const autoRotates = !reduced && !paused;

  return (
    <section className="block orbit-sec" id="process">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>A clear path from kickoff to launch</h2>
          <p>The process orbits around one shared goal: shipping. Click any phase to bring it into focus.</p>
          {!reduced && (
            <button
              type="button"
              className="orbit-pause"
              aria-label={paused ? "Resume auto-advance" : "Pause auto-advance"}
              aria-pressed={paused}
              onClick={() => setPaused((p) => !p)}
            >
              {paused ? <Play size={13} strokeWidth={2.4} /> : <Pause size={13} strokeWidth={2.4} />}
              <span>{paused ? "Paused" : "Auto-advancing"}</span>
            </button>
          )}
        </div>
        <div className="orbit-wrap reveal">
          <div className="orbit" id="orbit" ref={orbitRef}>
            <div className="orbit-ring" />
            <div className="orbit-ring r2" />

            {NODES.map((Icon, i) => (
              <button
                key={i}
                type="button"
                className={`onode${active === i ? " active" : ""}`}
                data-i={i}
                style={{ ["--a" as string]: `${i * 72}deg` }}
                onClick={() => go(i, true)}
                aria-label={DATA[i].label}
              >
                <span className="nbtn"><Icon size={24} strokeWidth={1.9} /></span>
                <span className="olabel">{DATA[i].label}</span>
              </button>
            ))}

            <div className="ocard" id="ocard" style={{ opacity: fade ? 0 : 1 }}>
              <div className="oc-conn" />
              <div className="oc-head">
                <span className="oc-badge"><span className="bd" /><span>{d.status}</span></span>
                <span className="oc-date">{d.date}</span>
              </div>
              <h3 className="oc-title">{d.title}</h3>
              <p className="oc-desc">{d.desc}</p>
              <div className="oc-rule" />
              <div className="oc-bar-row">
                <span className="lz"><Zap size={15} fill="currentColor" stroke="none" />{d.barLabel}</span>
                <span>{d.pct}%</span>
              </div>
              <div className="oc-bar"><i style={{ width: `${d.pct}%` }} /></div>
              <div className="oc-conn-label"><Link2 size={14} strokeWidth={2} />CONNECTED PHASES</div>
              <div className="oc-chips">
                {d.links.map((li) => (
                  <button
                    key={li}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      go(li, true);
                    }}
                  >
                    {DATA[li].title} <ArrowRight size={13} strokeWidth={2} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
