"use client";

import { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import { smoothScrollTo } from "./smoothScroll";
import { openProjectModal } from "./ProjectModal";
import ClientsStackMobile from "./ClientsStackMobile";

type Testimonial = { n: string; r: string; rate: number; q: string; img?: string };

const T: Testimonial[] = [
  { n: "Will Smith", r: "Harper Education", rate: 5.0, q: "Collaborating on this project was seamless. The vision was clearly understood, and the designs genuinely reflect my brand identity.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=70&w=200&h=200&auto=format&fit=crop" },
  { n: "Ikta Sollork", r: "PARAL · CEO", rate: 4.7, q: "Working with this team was effortless. The vision was understood perfectly, and the designs truly represent my brand.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=70&w=200&h=200&auto=format&fit=crop" },
  { n: "Alex Johnson", r: "Innovate Tech", rate: 4.9, q: "A truly transformative partnership. The end result exceeded all of our expectations and set a new standard in our industry.", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=70&w=200&h=200&auto=format&fit=crop" },
];

const PALETTE = ["#4cc46a", "#34d6c3", "#f6a623", "#7a5af0", "#3aa0d8"];

function Stars({ rate }: { rate: number }) {
  return (
    <span className="stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={i < Math.round(rate) ? "on" : "off"}
          fill="currentColor"
          stroke="none"
        />
      ))}
    </span>
  );
}

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
        <ClientsStackMobile items={T} palette={PALETTE} />
      </div>

      {/* Desktop: existing CSS scroll-stack */}
      <div className="clients-track clients-desktop" id="clientsTrack" ref={trackRef}>
        <div className="clients-sticky">
          <div className="clients-grid">
            <div className="cl-left reveal">
              <span className="cl-pill"><span className="gd" />Happy Clients</span>
              <h2>
                Clients love
                <br />
                building with us
              </h2>
              <p className="cl-sub">Trusted by 100+ happy teams, adding $250M+ in revenue.</p>
              <div className="cl-stats">
                <div className="cl-stat"><b>100+</b><span>Happy clients</span></div>
                <div className="cl-stat"><b>$250M</b><span>Revenue added</span></div>
                <div className="cl-stat"><b>4.8</b><span>Average rating</span></div>
              </div>
              <div className="cl-actions">
                <a href="#work" className="btn cl-ghost" onClick={(e) => smoothScrollTo(e, "#work")}>See all projects</a>
                <button type="button" className="btn cl-light" onClick={openProjectModal}>Contact now</button>
              </div>
            </div>
            <div className="cl-right">
              <div className="cstack" id="cstack" ref={stackRef}>
                {T.map((t, i) => {
                  const initials = t.n
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase();
                  const c1 = PALETTE[i % PALETTE.length];
                  const c2 = PALETTE[(i + 2) % PALETTE.length];
                  return (
                    <article className="ccard" key={i}>
                      <div className="cc-head">
                        <span className="cc-av" style={{ background: `linear-gradient(135deg,${c1},${c2})` }}>
                          {initials}
                        </span>
                        <div>
                          <div className="cc-name">{t.n}</div>
                          <div className="cc-role">{t.r}</div>
                        </div>
                      </div>
                      <div className="cc-rate">
                        {t.rate.toFixed(1)} <Stars rate={t.rate} />
                      </div>
                      <p className="cc-q">&ldquo;{t.q}&rdquo;</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
