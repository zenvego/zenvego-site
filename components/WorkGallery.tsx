"use client";

import { useEffect, useRef } from "react";
import { Star, TrendingUp, ArrowUp, ArrowRight } from "lucide-react";
import { smoothScrollTo } from "./smoothScroll";

type Project = {
  num: string;
  label: string;
  cat: string;
  title: string;
  desc: string;
  tags: string[];
  metric: React.ReactNode;
  bg: string;
};

const PROJECTS: Project[] = [
  {
    num: "01",
    label: "Fintech Banking App",
    cat: "Mobile · iOS & Android",
    title: "Fintech Mobile Banking",
    desc: "A secure, delightful banking experience — designed and shipped to the App Store in ten weeks.",
    tags: ["Product Design", "React Native", "UX Research"],
    metric: (
      <>
        <Star size={14} fill="currentColor" stroke="none" />
        4.9 · App Store
      </>
    ),
    bg: "radial-gradient(120% 120% at 20% 10%, #143a2a 0%, #0c1a14 45%, #07100c 100%)",
  },
  {
    num: "02",
    label: "Analytics Dashboard",
    cat: "Web App · Next.js",
    title: "SaaS Analytics Dashboard",
    desc: "Real-time analytics that turn complex data into decisions teams actually trust.",
    tags: ["Dashboard", "Data Viz", "Next.js"],
    metric: (
      <>
        <TrendingUp size={14} strokeWidth={2.4} />
        3× faster insights
      </>
    ),
    bg: "radial-gradient(120% 120% at 80% 10%, #10303a 0%, #0c1a1e 45%, #070f11 100%)",
  },
  {
    num: "03",
    label: "E-commerce Storefront",
    cat: "Web · Headless commerce",
    title: "E-commerce Storefront",
    desc: "A blazing-fast storefront that lifted conversion by 38% in its first week live.",
    tags: ["Commerce", "Performance", "Brand"],
    metric: (
      <>
        <ArrowUp size={14} strokeWidth={2.4} />
        +38% conversion
      </>
    ),
    bg: "radial-gradient(120% 120% at 50% 0%, #2a2410 0%, #1a160c 45%, #100d07 100%)",
  },
];

export default function WorkGallery() {
  const galRef = useRef<HTMLDivElement>(null);

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
            <div className={`wpanel${i === 0 ? " active" : ""}`} data-w={i} key={i}>
              <div className="wbg" style={{ background: p.bg }} />
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
                <a href="#contact" className="wcta" onClick={(e) => smoothScrollTo(e, "#contact")}>
                  View case study <ArrowRight size={15} strokeWidth={2.2} />
                </a>
              </div>
              <div className="wprog" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
