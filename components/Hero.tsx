"use client";

import { openProjectModal } from "./ProjectModal";
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
        <h1>Apps and sites, built like senior product work.</h1>
        <p className="lead">
          <b>devisine</b> is a small studio of designers and design engineers.
          We design and build the product, then hand it over.
        </p>
        <div className="hero-cta">
          <button
            type="button"
            className="btn btn-green"
            onClick={openProjectModal}
          >
            Get started today →
          </button>
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
