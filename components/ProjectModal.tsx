"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { X, Check, ArrowRight } from "lucide-react";

/**
 * Fire this from anywhere (nav CTA, hero CTA, case-study CTA) to open the
 * "Start a project" modal. Components stay decoupled — they just dispatch an
 * event and <ProjectModal/> (mounted once in the page) handles the rest.
 */
export const OPEN_EVENT = "devisine:open-project-modal";

export function openProjectModal() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

const PERKS = [
  "Free 30-minute discovery call",
  "Senior design & engineering leads",
  "A clear plan, no pressure",
];

export default function ProjectModal() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [brief, setBrief] = useState("");

  const close = useCallback(() => setOpen(false), []);

  // Listen for the global open event.
  useEffect(() => {
    const onOpen = () => {
      setSent(false);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  // Lock body scroll + Esc-to-close while open.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (!open) return null;

  return (
    <div className="pm-overlay" onClick={close} role="presentation">
      <div
        className="pm"
        role="dialog"
        aria-modal="true"
        aria-label="Start a project"
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT — dark pitch panel */}
        <aside className="pm-aside">
          <Image
            src="/assets/devisine-logo.png"
            alt="devisine"
            width={210}
            height={76}
            className="pm-logo"
          />
          <div className="pm-aside-body">
            <h2>Let&apos;s build something great together</h2>
            <p>
              Tell us about your product. We&apos;ll get back within one business
              day with next steps.
            </p>
            <ul className="pm-perks">
              {PERKS.map((perk) => (
                <li key={perk}>
                  <span className="pm-check">
                    <Check size={15} strokeWidth={3} />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
            <div className="pm-trust">
              <span className="pm-avs" aria-hidden>
                {[1, 2, 3].map((n) => (
                  <Image
                    key={n}
                    src={`/assets/avatar-${n}.png`}
                    alt=""
                    width={34}
                    height={34}
                    className="pm-av"
                  />
                ))}
              </span>
              <span className="pm-trust-tx">
                <b>100+ teams</b> trust devisine
                <em>4.8★ average rating</em>
              </span>
            </div>
          </div>
        </aside>

        {/* RIGHT — form panel */}
        <div className="pm-main">
          <button className="pm-close" onClick={close} aria-label="Close">
            <X size={20} strokeWidth={2.4} />
          </button>

          {sent ? (
            <div className="pm-success">
              <span className="pm-success-ic">
                <Check size={30} strokeWidth={3} />
              </span>
              <h3>Brief received{name ? `, ${name.split(" ")[0]}` : ""}!</h3>
              <p>
                Thanks for reaching out. We&apos;ll reply to{" "}
                <b>{email || "your inbox"}</b> within one business day with next
                steps.
              </p>
              <button type="button" className="pm-submit" onClick={close}>
                Done
              </button>
            </div>
          ) : (
            <>
              <h3 className="pm-title">Start a project</h3>
              <p className="pm-sub">A few details and we&apos;ll take it from here.</p>

              <form className="pm-form" onSubmit={submit}>
                <label className="pm-field">
                  <span>Your name</span>
                  <input
                    type="text"
                    placeholder="Jane Cooper"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>

                <label className="pm-field">
                  <span>Work email</span>
                  <input
                    type="email"
                    placeholder="jane@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>

                <label className="pm-field">
                  <span>About your project</span>
                  <textarea
                    rows={3}
                    placeholder="What are you building, and what's the goal?"
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                  />
                </label>

                <button type="submit" className="pm-submit">
                  Send project brief <ArrowRight size={18} strokeWidth={2.4} />
                </button>

                <p className="pm-note">
                  We reply within one business day. No spam, ever.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
