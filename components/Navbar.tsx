"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { smoothScrollTo } from "./smoothScroll";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handle = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    smoothScrollTo(e, href);
    setOpen(false);
  };

  return (
    <header className="relative z-40">
      <div className="wrap nav-inner">
        <a
          className="flex items-center gap-[11px]"
          href="#top"
          onClick={(e) => handle(e, "#top")}
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
              onClick={(e) => handle(e, l.href)}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="btn btn-green nav-cta"
          onClick={(e) => handle(e, "#contact")}
        >
          Start a project
        </a>

        <button
          type="button"
          className="nav-burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="nav-mobile">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => handle(e, l.href)}>
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn btn-green"
            onClick={(e) => handle(e, "#contact")}
          >
            Start a project
          </a>
        </div>
      )}
    </header>
  );
}
