"use client";

import { Star } from "lucide-react";
import {
  CardTransformed,
  CardsContainer,
  ContainerScroll,
} from "@/components/ui/animated-cards-stack";
import { smoothScrollTo } from "./smoothScroll";
import { openProjectModal } from "./ProjectModal";

type Testimonial = { n: string; r: string; rate: number; q: string; img?: string };

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

export default function ClientsStackMobile({
  items,
  palette,
}: {
  items: Testimonial[];
  palette: string[];
}) {
  return (
    <div className="clm">
      <ContainerScroll className="clm-scroll">
        <div className="clm-sticky">
          <div className="clm-head reveal">
            <span className="cl-pill">
              <span className="gd" />
              Happy Clients
            </span>
            <h2>
              Clients love
              <br />
              building with us
            </h2>
            <p className="cl-sub">
              Trusted by 100+ happy teams, adding $250M+ in revenue.
            </p>
          </div>
          <CardsContainer className="clm-cards">
            {items.map((t, i) => {
              const initials = t.n
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")
                .toUpperCase();
              const c1 = palette[i % palette.length];
              const c2 = palette[(i + 2) % palette.length];
              return (
                <CardTransformed
                  key={t.n}
                  arrayLength={items.length}
                  index={i + 2}
                  incrementY={6}
                  variant="light"
                  className="clm-card"
                  role="article"
                >
                  <div className="clm-card-top">
                    <div className="cc-rate">
                      {t.rate.toFixed(1)} <Stars rate={t.rate} />
                    </div>
                    <p className="cc-q">&ldquo;{t.q}&rdquo;</p>
                  </div>
                  <div className="cc-head">
                    <span
                      className="cc-av"
                      style={{ background: `linear-gradient(135deg,${c1},${c2})` }}
                    >
                      {t.img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={t.img} alt={t.n} loading="lazy" />
                      ) : (
                        initials
                      )}
                    </span>
                    <div>
                      <div className="cc-name">{t.n}</div>
                      <div className="cc-role">{t.r}</div>
                    </div>
                  </div>
                </CardTransformed>
              );
            })}
          </CardsContainer>

          <div className="clm-actions">
            <a
              href="#work"
              className="btn cl-ghost"
              onClick={(e) => smoothScrollTo(e, "#work")}
            >
              See all projects
            </a>
            <button
              type="button"
              className="btn cl-light"
              onClick={openProjectModal}
            >
              Contact now
            </button>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
