"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Star,
  ArrowRight,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { openProjectModal } from "./ProjectModal";

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
  study: CaseStudy;
};

const PROJECTS: Project[] = [
  {
    num: "01",
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
    num: "02",
    label: "NYRA Sales Dashboard",
    cat: "Enterprise Platform · Sales Operations · Web",
    title: "NYRA Sales Performance Dashboard",
    desc: "A centralized sales management platform with real-time visibility into team performance, pipeline health, quota attainment, and conversion metrics — helping leaders monitor KPIs, coach reps, and drive revenue.",
    tags: ["Product Design", "Dashboard Design", "SaaS Platform", "Data Visualization"],
    metric: (
      <>
        <Star size={14} fill="currentColor" stroke="none" />
        Enterprise CRM Dashboard
      </>
    ),
    bg: "radial-gradient(120% 120% at 80% 10%, #10303a 0%, #0c1a1e 45%, #070f11 100%)",
    mediaKind: "screens",
    images: ["/assets/nyra-1.png", "/assets/nyra-2.png"],
    study: {
      stats: [
        { value: "1", unit: "view", label: "Single source of truth" },
        { value: "−40", unit: "%", label: "Reporting time" },
        { value: "8", unit: "KPIs", label: "Tracked live" },
      ],
      challenge:
        "Sales leaders were stitching pipeline numbers together from spreadsheets and stale exports. Coaching was reactive and quota risk surfaced too late. They needed real-time visibility in one screen.",
      did: [
        "Real-time view of team performance and pipeline health",
        "Quota attainment and conversion metrics at a glance",
        "Drill-downs that let leaders coach individual reps",
        "A clean data-visualization system built to scale",
      ],
      quote:
        "We finally see the whole sales picture in real time — coaching is proactive now, not a post-mortem.",
      author: "Daniel Okafor",
      role: "VP of Sales",
      avatar: "linear-gradient(135deg, #8fd3f4, #34d6c3)",
    },
  },
  {
    num: "03",
    label: "Recruit",
    cat: "Recruitment Platform · Web · HR Tech",
    title: "Recruit",
    desc: "An AI-powered recruitment platform for managing hiring workflows end to end — post jobs, track applicants, manage pipelines, match candidates to roles, schedule interviews, and collaborate with hiring teams from one centralized dashboard.",
    tags: ["Product Design", "HR Tech", "Recruitment Platform", "AI Matching"],
    metric: (
      <>
        <Star size={14} fill="currentColor" stroke="none" />
        AI-Powered Hiring Platform
      </>
    ),
    bg: "radial-gradient(120% 120% at 50% 0%, #1c2440 0%, #0f1424 45%, #080b14 100%)",
    mediaKind: "screens",
    images: ["/assets/recruit-1.png", "/assets/recruit-2.png"],
    study: {
      stats: [
        { value: "126", unit: "+", label: "Candidates managed" },
        { value: "3.2", unit: "%", label: "Overall conversion" },
        { value: "AI", unit: "match", label: "Role-fit scoring" },
      ],
      challenge:
        "Recruiters were spread across job boards, spreadsheets, and inboxes — sourcing, tracking, and follow-ups all lived in different places. Pipelines went stale and great candidates slipped through the cracks.",
      did: [
        "End-to-end hiring workflow from sourcing to placement",
        "AI matching that scores candidates against each role",
        "Visual pipelines, interview scheduling, and follow-ups",
        "A centralized dashboard for the whole hiring team",
      ],
      quote:
        "Recruit put our entire hiring pipeline in one place — we place candidates faster and nothing falls through anymore.",
      author: "Nithish Kumar",
      role: "Lead Recruiter",
      avatar: "linear-gradient(135deg, #6b8bff, #3a52e6)",
    },
  },
];

export default function WorkGallery() {
  const galRef = useRef<HTMLDivElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

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
      if (hovering) return;
      timer = window.setInterval(() => {
        if (!hovering) setActive((active + 1) % N);
      }, 4200);
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
  }, []);

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
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="wscreen" src={src} alt="" key={idx} />
                    ))}
                  </div>
                ) : (
                  <div className="wphones" aria-hidden>
                    {p.images.map((src, idx) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="wphone" src={src} alt="" key={idx} />
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
