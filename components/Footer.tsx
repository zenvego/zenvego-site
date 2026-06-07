"use client";

import Image from "next/image";
import { Twitter, Linkedin, Dribbble, ArrowRight } from "lucide-react";
import { smoothScrollTo } from "./smoothScroll";

const STUDIO = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];
const COMPANY = ["About", "Careers", "Blog", "Partners"];

export default function Footer() {
  return (
    <footer id="contact">
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
            <p>A product studio designing &amp; building apps and websites people love to use.</p>
            <div className="socials">
              <a href="#" aria-label="X"><Twitter size={16} fill="currentColor" stroke="none" /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={16} fill="currentColor" stroke="none" /></a>
              <a href="#" aria-label="Dribbble"><Dribbble size={16} strokeWidth={2} /></a>
            </div>
          </div>

          <div>
            <h4>Studio</h4>
            {STUDIO.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => smoothScrollTo(e, l.href)}>
                {l.label}
              </a>
            ))}
          </div>

          <div>
            <h4>Company</h4>
            {COMPANY.map((l) => (
              <a key={l} href="#">{l}</a>
            ))}
          </div>

          <div>
            <h4>Get our work in your inbox</h4>
            <form className="news" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" aria-label="Email address" />
              <button type="submit" aria-label="Subscribe"><ArrowRight size={17} strokeWidth={2} /></button>
            </form>
          </div>
        </div>

        <div className="foot-bottom">
          <span>© 2026 devisine studio. All rights reserved.</span>
          <span>Crafted with care · Privacy · Terms</span>
        </div>
      </div>
    </footer>
  );
}
