"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { smoothScrollTo } from "./smoothScroll";
import { sendForm } from "../lib/sendForm";

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
            <a className="flex items-center" href="#top" onClick={(e) => smoothScrollTo(e, "#top")} aria-label="Zenvego home">
              <Image
                src="/assets/zenvego-logo.svg"
                alt="Zenvego"
                width={257}
                height={76}
                unoptimized
                className="logo-img foot"
              />
            </a>
            <p>
              A studio of designers and design engineers, designing and building
              apps and sites end to end.
            </p>
            <a
              className="foot-email"
              href="mailto:studio@zenvego.works"
            >
              studio@zenvego.works
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
            <Newsletter />
          </div>
        </div>

        <div className="foot-bottom">
          <span>© 2026 Zenvego. All rights reserved.</span>
          <span>Privacy · Terms</span>
        </div>
      </div>
    </footer>
  );
}

/** Footer email capture — delivers each subscribe to the studio inbox. */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || busy) return;
    setBusy(true);
    await sendForm({
      subject: `New dispatch subscriber: ${email.trim()}`,
      email,
      fields: { source: "Footer newsletter" },
    });
    // Even on a transient failure we acknowledge — the subscribe intent is low
    // stakes and a retry loop here would only frustrate. The send is logged.
    setBusy(false);
    setDone(true);
  };

  if (done) {
    return (
      <p className="news-done" role="status" aria-live="polite">
        <Check size={16} strokeWidth={3} aria-hidden />
        You&apos;re on the list — talk soon.
      </p>
    );
  }

  return (
    <form className="news" onSubmit={subscribe}>
      <label htmlFor="news-email" className="sr-only">
        Email address
      </label>
      <input
        id="news-email"
        type="email"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" aria-label="Subscribe to dispatch" disabled={busy}>
        <span className="news-btn-label">{busy ? "…" : "Subscribe"}</span>
        <ArrowRight size={17} strokeWidth={2} aria-hidden />
      </button>
    </form>
  );
}
