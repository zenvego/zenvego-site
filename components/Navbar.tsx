"use client";

import Image from "next/image";
import { smoothScrollTo } from "./smoothScroll";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  return (
    <header className="relative z-40">
      <div className="wrap nav-inner">
        <a
          className="flex items-center gap-[11px]"
          href="#top"
          onClick={(e) => smoothScrollTo(e, "#top")}
          aria-label="devisine home"
        >
          <Image
            src="/assets/devisine-logo.png"
            alt="devisine"
            width={180}
            height={66}
            className="logo-img"
            priority
          />
        </a>

        <nav className="nav-links">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className={i === 0 ? "active" : undefined}
              onClick={(e) => smoothScrollTo(e, l.href)}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="btn btn-green"
          onClick={(e) => smoothScrollTo(e, "#contact")}
        >
          Start a project
        </a>
      </div>
    </header>
  );
}
