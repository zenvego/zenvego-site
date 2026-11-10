"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { motion } from "motion/react";
import {
  Zap,
  Phone,
  Users,
  PenLine,
  ChartNoAxesColumn,
  Search,
  Rocket,
  Pause,
  Play,
} from "lucide-react";
import { openProjectModal } from "./ProjectModal";
import { useReducedMotion } from "./useReducedMotion";

const STEP = 12;
const EASE = [0.22, 0.7, 0.3, 1] as const;

const SYSTEMS = [
  {
    tone: "green",
    kicker: "Sites",
    title: "Premium websites",
    body: "Modern, fast, and conversion-focused websites that build trust and generate leads.",
    Icon: Zap,
    art: "site" as const,
  },
  {
    tone: "purple",
    kicker: "Calling",
    title: "AI calling agents",
    body: "AI voice agents that answer customer queries, handle calls, and reduce missed opportunities.",
    Icon: Phone,
    art: "wave" as const,
  },
  {
    tone: "orange",
    kicker: "Automate",
    title: "Workflow automations",
    body: "Automate repetitive tasks like lead capture, follow-ups, reminders, form submissions, and CRM updates.",
    Icon: Users,
    art: "flow" as const,
  },
  {
    tone: "teal",
    kicker: "Design",
    title: "UI/UX design",
    body: "Clean, premium, user-friendly interfaces that make your brand look professional.",
    Icon: PenLine,
    art: "target" as const,
  },
  {
    tone: "pink",
    kicker: "Pipeline",
    title: "CRM & lead management",
    body: "Track every lead from first contact to conversion with proper pipeline systems.",
    Icon: ChartNoAxesColumn,
    art: "chart" as const,
  },
  {
    tone: "blue",
    kicker: "Search",
    title: "SEO & AEO",
    body: "Improve your visibility on Google and AI search platforms so customers can find you easily.",
    Icon: Search,
    art: "search" as const,
  },
];

function Art({ kind }: { kind: (typeof SYSTEMS)[number]["art"] }) {
  if (kind === "site") {
    return (
      <svg viewBox="0 0 140 100" aria-hidden>
        <rect x="8" y="16" width="124" height="68" rx="10" fill="none" stroke="currentColor" strokeWidth="2.6" />
        <rect x="22" y="36" width="28" height="20" rx="4" fill="currentColor" opacity="0.45" />
        <path d="M62 40h58M62 52h40" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "target") {
    return (
      <svg viewBox="0 0 120 120" aria-hidden>
        <circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" strokeWidth="2.6" />
        <path d="M60 16v88M16 60h88" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <rect x="46" y="46" width="28" height="28" rx="3" fill="currentColor" opacity="0.4" />
      </svg>
    );
  }
  if (kind === "wave") {
    return (
      <svg viewBox="0 0 140 80" aria-hidden>
        <path
          d="M8 40h16l8-22 12 44 10-32 10 22 8-12h60"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (kind === "flow") {
    return (
      <svg viewBox="0 0 140 80" aria-hidden>
        <circle cx="24" cy="40" r="10" fill="currentColor" />
        <circle cx="70" cy="22" r="10" fill="none" stroke="currentColor" strokeWidth="2.6" />
        <circle cx="70" cy="58" r="10" fill="none" stroke="currentColor" strokeWidth="2.6" />
        <circle cx="116" cy="40" r="10" fill="currentColor" opacity="0.45" />
        <path d="M34 40h22M80 22h22M80 58h22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "chart") {
    return (
      <svg viewBox="0 0 140 100" aria-hidden>
        <polyline
          points="14,78 40,70 62,46 84,54 122,16"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 120" aria-hidden>
      <circle cx="52" cy="52" r="26" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <path d="M72 72l22 22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function Systems() {
  const reduced = useReducedMotion();
  const count = SYSTEMS.length;
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hold, setHold] = useState(false);
  const [instant, setInstant] = useState<number | null>(null);

  useEffect(() => {
    if (instant === null) return;
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setInstant(null));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [instant]);

  useEffect(() => {
    if (!leaving) return;
    const id = window.setTimeout(() => {
      setActive((current) => {
        setInstant(current);
        return (current + 1) % count;
      });
      setLeaving(false);
    }, reduced ? 0 : 560);
    return () => window.clearTimeout(id);
  }, [leaving, reduced, count]);

  useEffect(() => {
    if (reduced || paused || hold || leaving) return;
    const id = window.setInterval(() => setLeaving(true), 4600);
    return () => window.clearInterval(id);
  }, [reduced, paused, hold, leaving, active]);

  function show(index: number) {
    if (index === active || leaving) return;
    setActive(index);
  }

  function next() {
    if (leaving) return;
    if (reduced) setActive((current) => (current + 1) % count);
    else setLeaving(true);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (!leaving) show((active - 1 + count) % count);
    } else if (event.key === "ArrowRight" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      next();
    }
  }

  return (
    <section className="block" id="systems">
      <div className="wrap">
        <div className="sys-head">
          <h2>
            Systems that run <span className="grnk">beside the product</span>
          </h2>
          <p>
            Websites, interface design, voice, automation, pipeline and search.
            Click the card to see the next one.
          </p>
          <div className="sys-tools">
            {!reduced && (
              <button
                type="button"
                className="orbit-pause"
                aria-label={paused ? "Resume auto-advance" : "Pause auto-advance"}
                aria-pressed={paused}
                onClick={() => setPaused((value) => !value)}
              >
                {paused ? <Play size={13} strokeWidth={2.4} /> : <Pause size={13} strokeWidth={2.4} />}
                <span>{paused ? "Paused" : "Auto-advancing"}</span>
              </button>
            )}
            <div className="sys-nav" role="tablist" aria-label="Systems">
              {SYSTEMS.map((system, index) => (
                <button
                  key={system.title}
                  type="button"
                  role="tab"
                  className={`sys-dot${index === active ? " on" : ""}`}
                  aria-label={`Show ${system.title}`}
                  aria-selected={index === active}
                  onClick={() => show(index)}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          className={`sys-stage${paused || hold ? " is-held" : ""}`}
          onMouseEnter={() => setHold(true)}
          onMouseLeave={() => setHold(false)}
        >
          <div
            className="sys-deck"
            role="region"
            aria-roledescription="carousel"
            aria-label="Studio systems"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onFocus={() => setHold(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) setHold(false);
            }}
          >
            {SYSTEMS.map((system, index) => {
              const Icon = system.Icon;
              const layer = (index - active + count) % count;
              const isFront = layer === 0;
              const parked = isFront && leaving;
              const visualLayer = leaving && !isFront ? Math.max(0, layer - 1) : layer;
              const shown = isFront && !leaving;
              return (
                <motion.article
                  key={system.title}
                  className={`sys-card sys-${system.tone}${shown && !reduced && !paused ? " is-live" : ""}`}
                  aria-hidden={!shown}
                  animate={{
                    y: parked ? 120 : -visualLayer * STEP,
                    opacity: parked ? 0 : 1,
                    scale: parked ? 0.97 : 1,
                    rotate: parked ? -1.5 : 0,
                  }}
                  transition={
                    instant === index || reduced
                      ? { duration: 0 }
                      : { duration: 0.56, ease: EASE }
                  }
                  style={{ zIndex: parked ? 40 : count - visualLayer }}
                  onClick={() => {
                    if (isFront) next();
                    else show(index);
                  }}
                >
                  <span className="sys-grid" aria-hidden />
                  <span className="sys-glow" aria-hidden />
                  <div className="sys-copy">
                    <div className="sys-top">
                      <span className="sys-ic" aria-hidden>
                        <Icon size={18} strokeWidth={2.2} />
                      </span>
                      <span className="sys-kicker">{system.kicker}</span>
                    </div>
                    <h3>{system.title}</h3>
                    <p>{system.body}</p>
                    <button
                      type="button"
                      className="btn btn-green sys-cta"
                      tabIndex={shown ? 0 : -1}
                      onClick={(event) => {
                        event.stopPropagation();
                        openProjectModal();
                      }}
                    >
                      Get started
                      <Rocket size={15} strokeWidth={2.2} aria-hidden />
                    </button>
                  </div>
                  <div className="sys-art" aria-hidden>
                    <Art kind={system.art} />
                  </div>
                  <span className="sys-prog" aria-hidden><i /></span>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
