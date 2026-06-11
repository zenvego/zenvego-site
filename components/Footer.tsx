"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { smoothScrollTo } from "./smoothScroll";

const STUDIO = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Reach us", href: "#contact" },
];

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <a className="flex items-center" href="#top" onClick={(e) => smoothScrollTo(e, "#top")} aria-label="devisine home">
              <Image
                src="/assets/devisine-logo.png"
                alt="devisine"
                width={210}
                height={76}
                className="logo-img foot"
              />
            </a>
            <p>
              A studio of designers and design engineers, designing and building
              apps and sites end to end.
            </p>
            <a
              className="foot-email"
              href="mailto:studio@devisine.works"
            >
              studio@devisine.works
            </a>
          </div>

          <div>
            <h4>Studio</h4>
            {STUDIO.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => smoothScrollTo(e, l.href)}>
                {l.label}
              </a>
            ))}
          </div>

          <div className="foot-news">
            <h4>One studio dispatch a month</h4>
            <p className="foot-news-sub">
              Shipped work, behind-the-scenes notes, no spam.
            </p>
            <form className="news" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="news-email" className="sr-only">
                Email address
              </label>
              <input
                id="news-email"
                type="email"
                placeholder="you@company.com"
                required
              />
              <button type="submit" aria-label="Subscribe to dispatch">
                <span className="news-btn-label">Subscribe</span>
                <ArrowRight size={17} strokeWidth={2} aria-hidden />
              </button>
            </form>
          </div>
        </div>

        <div className="foot-bottom">
          <span>© 2026 devisine. All rights reserved.</span>
          <span>Privacy · Terms</span>
        </div>
      </div>
    </footer>
  );
}
