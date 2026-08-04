"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  Star,
  ArrowRight,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { openProjectModal } from "./ProjectModal";
import { useReducedMotion } from "./useReducedMotion";

type Stat = { value: string; unit: string; label: string };

type CaseStudy = {
  stats: Stat[];
  challenge: string;
  did: string[];
  quote: string;
  author: string;
  role: string;
  avatar: string;
};

type Project = {
  num: string;
  label: string;
  cat: string;
  title: string;
  desc: string;
  tags: string[];
  metric: React.ReactNode;
  bg: string;
  images?: string[];
  mediaKind?: "phones" | "screens";
  url?: string;
  study: CaseStudy;
};

const PROJECTS: Project[] = [
  {
    num: "01",
    label: "Zenvego",
    cat: "D2C Food Brand · Subscription · Web",
    title: "Zenvego",
    desc: "A brand and landing site for a plant-based breakfast bowl subscription in Gachibowli — fresh bowls cut every morning and delivered to your door, with a five-bowl menu, an interactive Zen Planner nutrition calculator, and WhatsApp-first ordering.",
    tags: ["Brand Design", "Web Design", "Landing Page", "Illustration"],
    metric: (
      <>
        <Star size={14} fill="currentColor" stroke="none" />
        Plant-Based D2C Brand
      </>
    ),
    bg: "radial-gradient(120% 120% at 80% 10%, #2d4a22 0%, #16260f 45%, #0a1206 100%)",
    mediaKind: "screens",
    images: ["/assets/zenvego-1.png", "/assets/zenvego-2.png"],
    url: "https://zenvego.com",
    study: {
      stats: [
        { value: "5", unit: "bowls", label: "Signature menu" },
        { value: "6", unit: "days", label: "Fresh mornings a week" },
        { value: "1", unit: "chat", label: "WhatsApp ordering" },
      ],
      challenge:
        "Zenvego needed to sell a daily breakfast ritual — not just food. The site had to feel as calm as the brand promise, explain weekly and monthly plans in seconds, and let customers subscribe with a single WhatsApp message instead of an app or account.",
      did: [
        "A warm, hand-crafted brand identity and illustration system",
        "A five-bowl menu with pricing, nutrition, and plan toggles",
        "The Zen Planner — an interactive protein, fibre, and calorie calculator",
        "A WhatsApp-first ordering flow with UPI payment, no app, no lock-in",
      ],
      quote:
        "The site feels exactly like our bowls — calm, fresh, and simple. Customers get it in one scroll and order in one message.",
      author: "Harsha Reddy",
      role: "Founder, Zenvego",
      avatar: "linear-gradient(135deg, #f0a04b, #4cc46a)",
    },
  },
  {
    num: "02",
    label: "Student Teach",
    cat: "EdTech · iOS & Android",
    title: "Student Teach",
    desc: "A collaborative learning platform that connects volunteer educators, students, and parents — with session management, progress tracking, achievement badges, and personalized learning in a simple, engaging mobile interface.",
    tags: ["Product Design", "Mobile App", "UI/UX Design", "React Native"],
    metric: (
      <>
        <Star size={14} fill="currentColor" stroke="none" />
        4.8 · User Rated
      </>
    ),
    bg: "radial-gradient(120% 120% at 20% 10%, #143a2a 0%, #0c1a14 45%, #07100c 100%)",
    images: [
      "/assets/student-teach-1.png",
      "/assets/student-teach-2.png",
      "/assets/student-teach-3.png",
    ],
    study: {
      stats: [
        { value: "4.8", unit: "★", label: "App store rating" },
        { value: "12k", unit: "+", label: "Active learners" },
        { value: "92", unit: "%", label: "Session completion" },
      ],
      challenge:
        "Volunteer educators, students, and parents were juggling three disconnected tools. Scheduling slipped, progress went untracked, and momentum fizzled. They needed one calm, engaging place to learn together.",
      did: [
        "Unified session management for tutors, students, and parents",
        "Progress tracking with achievement badges to drive motivation",
        "Personalized learning paths tuned to each student",
        "A friendly, accessible mobile interface in React Native",
      ],
      quote:
        "Student Teach turned scattered tutoring into a single, joyful daily habit for our families.",
      author: "Aisha Rahman",
      role: "Program Director",
      avatar: "linear-gradient(135deg, #6bdd86, #2c9a4c)",
    },
  },
  {
    num: "03",
    label: "ScorVault",
    cat: "Sports Platform · Matchmaking · Web",
    title: "ScorVault",
    desc: "A multi-sport platform for cricket, badminton, and pickleball — match with players near you, run tournaments with live ball-by-ball scoring and auto-generated brackets, climb ladder rankings, and earn Volts, a rewards currency you can cash in for gear and court time.",
    tags: ["Product Design", "Sports Tech", "Gamification", "Web Platform"],
    metric: (
      <>
        <Star size={14} fill="currentColor" stroke="none" />
        Multi-Sport Platform
      </>
    ),
    bg: "radial-gradient(120% 120% at 50% 0%, #0e2430 0%, #0a1520 45%, #060b12 100%)",
    mediaKind: "screens",
    images: ["/assets/score-1.png", "/assets/score-2.png"],
    study: {
      stats: [
        { value: "12.4k", unit: "+", label: "Players" },
        { value: "850", unit: "+", label: "Tournaments run" },
        { value: "3", unit: "sports", label: "One vault, every court" },
      ],
      challenge:
        "Local cricket, badminton, and pickleball scenes ran on WhatsApp groups and paper scorecards — no way to find opponents at your level, no official-feeling tournaments, and every close call turned into an argument. Players needed one platform that made every match count.",
      did: [
        "Skill-based matchmaking that finds verified players near you",
        "Tournaments with live ball-by-ball scoring and auto-generated brackets",
        "Volts — a rewards currency with tiers, redeemable for gear and court time",
        "Live ladders and weekly leaderboards across all three sports",
      ],
      quote:
        "Set up a 24-team box-cricket cup in ten minutes. The live scoring ended every 'was that a six?' argument for good.",
      author: "Rohan Kapoor",
      role: "Cricket · Mumbai",
      avatar: "linear-gradient(135deg, #a3ff3c, #2dd4bf)",
    },
  },
];

export default function WorkGallery() {
  const galRef = useRef<HTMLDivElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const reduced = useReducedMotion();

  const close = useCallback(() => setOpenIdx(null), []);
  const prev = useCallback(
    () => setOpenIdx((i) => (i === null ? i : (i - 1 + PROJECTS.length) % PROJECTS.length)),
    []
  );
  const next = useCallback(
    () => setOpenIdx((i) => (i === null ? i : (i + 1) % PROJECTS.length)),
    []
  );

  // Lock body scroll and wire keyboard nav while the modal is open.
  useEffect(() => {
    if (openIdx === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [openIdx, close, prev, next]);

  useEffect(() => {
    const gal = galRef.current;
    if (!gal) return;
    const panels = Array.from(gal.querySelectorAll<HTMLElement>(".wpanel"));
    const N = panels.length;
    let active = 0;
    let timer: number | null = null;
    let hovering = false;

    function setActive(i: number) {
      active = i;
      panels.forEach((p, idx) => {
        p.classList.toggle("active", idx === i);
        const pr = p.querySelector<HTMLElement>(".wprog");
        if (pr) {
          pr.style.animation = "none";
          void pr.offsetWidth;
          pr.style.animation = "";
        }
      });
    }
    function resetAuto() {
      if (timer) clearInterval(timer);
      /* WCAG 2.2.2: skip auto-advance for users who prefer reduced motion. */
      if (hovering || reduced) return;
      timer = window.setInterval(() => {
        if (!hovering) setActive((active + 1) % N);
      }, 6000);
    }
    panels.forEach((p, idx) => {
      p.addEventListener("mouseenter", () => {
        hovering = true;
        gal.classList.add("paused");
        if (timer) clearInterval(timer);
        if (idx !== active) setActive(idx);
      });
      p.addEventListener("click", () => {
        if (idx !== active) setActive(idx);
      });
    });
    gal.addEventListener("mouseleave", () => {
      hovering = false;
      gal.classList.remove("paused");
      setActive(active);
      resetAuto();
    });
    setActive(0);
    resetAuto();
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [reduced]);

  return (
    <section className="block cream" id="work">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow" style={{ justifyContent: "center" }}>Selected work</span>
          <h2>Products we&apos;ve designed &amp; built</h2>
          <p>Hover or tap a project to explore it.</p>
        </div>
        <div className="wgallery reveal" id="wgallery" ref={galRef}>
          {PROJECTS.map((p, i) => (
            <div
              className={`wpanel${i === 0 ? " active" : ""}${
                p.images ? ` wpanel--media wpanel--${p.mediaKind ?? "phones"}` : ""
              }`}
              data-w={i}
              key={i}
            >
              <div className="wbg" style={{ background: p.bg }} />
              {p.images &&
                (p.mediaKind === "screens" ? (
                  <div className="wscreens" aria-hidden>
                    {p.images.map((src, idx) => (
                      <Image
                        className="wscreen"
                        src={src}
                        alt=""
                        width={928}
                        height={494}
                        sizes="(max-width: 880px) 82vw, 464px"
                        priority={i === 0 && idx === 0}
                        loading={i === 0 && idx === 0 ? "eager" : "lazy"}
                        key={idx}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="wphones" aria-hidden>
                    {p.images.map((src, idx) => (
                      <Image
                        className="wphone"
                        src={src}
                        alt=""
                        width={364}
                        height={632}
                        sizes="(max-width: 880px) 34vw, 182px"
                        priority={i === 0 && idx === 0}
                        loading={i === 0 && idx === 0 ? "eager" : "lazy"}
                        key={idx}
                      />
                    ))}
                  </div>
                ))}
              <div className="wshade" />
              <div className="wtop">
                <span className="wnum">{p.num}</span>
                <span className="wmetric">{p.metric}</span>
              </div>
              <span className="wlabel">{p.label}</span>
              <div className="wcontent">
                <span className="wcat">{p.cat}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="wtags">
                  {p.tags.map((t) => (
                    <span className="wtag" key={t}>{t}</span>
                  ))}
                </div>
                <button
                  type="button"
                  className="wcta"
                  onClick={() => setOpenIdx(i)}
                >
                  View case study <ArrowRight size={15} strokeWidth={2.2} />
                </button>
                {p.url && (
                  <a
                    className="wcta wcta--live"
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {p.url.replace(/^https?:\/\//, "")}{" "}
                    <ExternalLink size={14} strokeWidth={2.2} />
                  </a>
                )}
              </div>
              <div className="wprog" />
            </div>
          ))}
        </div>
      </div>

      {openIdx !== null && (() => {
        const p = PROJECTS[openIdx];
        const s = p.study;
        return (
          <div className="csm-overlay" onClick={close} role="presentation">
            <div
              className="csm"
              role="dialog"
              aria-modal="true"
              aria-label={`${p.title} case study`}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="csm-close" onClick={close} aria-label="Close">
                <X size={20} strokeWidth={2.4} />
              </button>

              <div className="csm-head" style={{ background: p.bg }}>
                <span className="csm-eyebrow">
                  <i />
                  {p.cat}
                </span>
                <h2>{p.title}</h2>
                <div className="csm-pills">
                  <span className="csm-pill csm-pill--green">{p.metric}</span>
                  {p.tags.slice(0, 2).map((t) => (
                    <span className="csm-pill" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="csm-body">
                <div className="csm-stats">
                  {s.stats.map((st) => (
                    <div className="csm-stat" key={st.label}>
                      <div className="csm-stat-v">{st.value}</div>
                      <div className="csm-stat-u">{st.unit}</div>
                      <div className="csm-stat-l">{st.label}</div>
                    </div>
                  ))}
                </div>

                <h3 className="csm-sub">The Challenge</h3>
                <p className="csm-text">{s.challenge}</p>

                <h3 className="csm-sub">What we did</h3>
                <ul className="csm-list">
                  {s.did.map((d) => (
                    <li key={d}>
                      <Check size={18} strokeWidth={2.6} />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                <figure className="csm-quote">
                  <blockquote>&ldquo;{s.quote}&rdquo;</blockquote>
                  <figcaption className="csm-author">
                    <span className="csm-av" style={{ background: s.avatar }} />
                    <span>
                      <b>{s.author}</b>
                      <em>{s.role}</em>
                    </span>
                  </figcaption>
                </figure>

                <div className="csm-foot">
                  {p.url && (
                    <a
                      className="csm-live"
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit live site — {p.url.replace(/^https?:\/\//, "")}{" "}
                      <ExternalLink size={15} strokeWidth={2.4} />
                    </a>
                  )}
                  <div className="csm-nav">
                    <button type="button" onClick={prev}>
                      <ChevronLeft size={16} strokeWidth={2.4} /> Previous
                    </button>
                    <button type="button" onClick={next}>
                      Next <ChevronRight size={16} strokeWidth={2.4} />
                    </button>
                  </div>
                  <button
                    type="button"
                    className="csm-cta"
                    onClick={() => {
                      close();
                      openProjectModal();
                    }}
                  >
                    Start a similar project →
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
}
