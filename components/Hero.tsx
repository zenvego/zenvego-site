"use client";

import { smoothScrollTo } from "./smoothScroll";
import Rating from "./Rating";
import PhoneMockups from "./PhoneMockups";
import FloatingBadges from "./FloatingBadges";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="vlines" aria-hidden>
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

      <div className="wrap hero-copy">
        <h1>Reimagine how you ship products</h1>
        <p className="lead">
          <b>devisine</b> designs &amp; builds beautiful apps and websites for
          ambitious teams.
        </p>
        <div className="hero-cta">
          <a
            href="#contact"
            className="btn btn-green"
            onClick={(e) => smoothScrollTo(e, "#contact")}
          >
            Get started today →
          </a>
        </div>
        <Rating />
      </div>

      {/* stage + badges are positioned relative to .hero (full-bleed) */}
      <PhoneMockups />
      <FloatingBadges />

      <div className="hero-fade" aria-hidden />
    </section>
  );
}
