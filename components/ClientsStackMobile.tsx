"use client";

import {
  CardTransformed,
  CardsContainer,
  ContainerScroll,
} from "@/components/ui/animated-cards-stack";
import { smoothScrollTo } from "./smoothScroll";
import { openProjectModal } from "./ProjectModal";

type Outcome = {
  project: string;
  client: string;
  metric: string;
  metricLabel: string;
  result: string;
  accent: string;
  photo: string;
};

export default function ClientsStackMobile({ items }: { items: Outcome[] }) {
  return (
    <div className="clm">
      <ContainerScroll className="clm-scroll">
        <div className="clm-sticky">
          <div className="clm-head reveal">
            <h2>
              Recent outcomes
              <br />
              from real launches
            </h2>
            <p className="cl-sub">
              Numbers and shipped work from the projects above.
            </p>
          </div>
          <CardsContainer className="clm-cards">
            {items.map((o, i) => (
              <CardTransformed
                key={o.project}
                arrayLength={items.length}
                index={i + 2}
                incrementY={6}
                variant="light"
                className="clm-card"
                role="article"
              >
                <div className="clm-card-top">
                  <div className="cc-metric">
                    <span className="cc-metric-v">{o.metric}</span>
                    <span className="cc-metric-l">{o.metricLabel}</span>
                  </div>
                  <p className="cc-q">{o.result}</p>
                </div>
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
              </CardTransformed>
            ))}
          </CardsContainer>

          <div className="clm-actions">
            <a
              href="#work"
              className="btn cl-ghost"
              onClick={(e) => smoothScrollTo(e, "#work")}
            >
              See all case studies
            </a>
            <button
              type="button"
              className="btn cl-light"
              onClick={openProjectModal}
            >
              Start a project
            </button>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
