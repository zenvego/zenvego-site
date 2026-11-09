"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { X, Check, ArrowRight } from "lucide-react";
import { sendForm } from "../lib/sendForm";

/**
 * Fire this from anywhere (nav CTA, hero CTA, case-study CTA) to open the
 * "Start a project" modal. Components stay decoupled — they just dispatch an
 * event and <ProjectModal/> (mounted once in the page) handles the rest.
 */
export const OPEN_EVENT = "zenvego:open-project-modal";

export function openProjectModal() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

const PERKS = [
  "Free 30-minute discovery call",
  "Senior design & engineering leads",
  "A clear plan, no pressure",
];

/**
 * Splits a string into per-letter <span>s so the "letters fall down" exit can
 * animate each glyph independently. `base` offsets the cascade so different
 * lines start raining at slightly different times (top-to-bottom wave).
 */
function Letters({ text, base = 0 }: { text: string; base?: number }) {
  return (
    <>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          className="pm-ltr"
          style={
            {
              animationDelay: `${base + i * 16}ms`,
              "--rot": `${((i * 53) % 44) - 22}deg`,
              "--dx": `${((i * 29) % 34) - 17}px`,
            } as React.CSSProperties
          }
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </>
  );
}

type Phase = "form" | "fall" | "message";

export default function ProjectModal() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [phase, setPhase] = useState<Phase>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [brief, setBrief] = useState("");

  // Graceful exit: play the fade-out, then unmount.
  const close = useCallback(() => {
    setClosing(true);
    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 320);
  }, []);

  // Listen for the global open event.
  useEffect(() => {
    const onOpen = () => {
      setPhase("form");
      setClosing(false);
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

  // Drive the submit choreography: letters fall → empty white card with the
  // message → auto-close.
  useEffect(() => {
    if (phase === "fall") {
      const t = window.setTimeout(() => setPhase("message"), 1600);
      return () => window.clearTimeout(t);
    }
    if (phase === "message") {
      const t = window.setTimeout(() => {
        // Flow complete — wipe the brief so the next open starts fresh.
        setName("");
        setEmail("");
        setBrief("");
        close();
      }, 2600);
      return () => window.clearTimeout(t);
    }
  }, [phase, close]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Deliver to the studio inbox in the background; the fall→message
    // choreography plays regardless so the UX stays snappy.
    void sendForm({
      subject: `New project enquiry from ${name.trim() || "the site"}`,
      email: email,
      fields: {
        name,
        message: brief || "(no project details provided)",
        source: "Start a project modal",
      },
    });
    setPhase("fall");
  };

  if (!open) return null;

  const cardClass =
    phase === "fall" ? "pm pm-fall" : phase === "message" ? "pm pm-empty" : "pm";

  return (
    <div
      className={`pm-overlay${closing ? " pm-closing" : ""}`}
      onClick={close}
      role="presentation"
    >
      <div
        className={cardClass}
        role="dialog"
        aria-modal="true"
        aria-label="Start a project"
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT — dark pitch panel (fades to white during the exit) */}
        {phase !== "message" && (
          <aside className="pm-aside">
            <Image
              src="/assets/zenvego-logo.svg"
              alt="Zenvego"
              width={244}
              height={72}
              unoptimized
              className="pm-logo"
            />
            <div className="pm-aside-body">
              <h2>Let&apos;s build something great together</h2>
              <p>
                Tell us about your product. We&apos;ll get back within one
                business day with next steps.
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
                  <b>100+ teams</b> trust Zenvego
                  <em>4.8★ average rating</em>
                </span>
              </div>
            </div>
          </aside>
        )}

        {/* RIGHT — form panel → empties to white → message */}
        <div className="pm-main">
          {phase !== "message" && (
            <button className="pm-close" onClick={close} aria-label="Close">
              <X size={20} strokeWidth={2.4} />
            </button>
          )}

          {phase === "message" ? (
            <div className="pm-final">
              <span className="pm-final-ic">
                <Check size={26} strokeWidth={3} />
              </span>
              <p className="pm-final-tx">
                Your project is in good hands. We&apos;ll reach out shortly.
              </p>
            </div>
          ) : (
            <>
              <h3 className="pm-title">
                <Letters text="Start a project" base={0} />
              </h3>
              <p className="pm-sub">
                <Letters
                  text="A few details and we'll take it from here."
                  base={120}
                />
              </p>

              <form className="pm-form" onSubmit={submit}>
                <label className="pm-field">
                  <span>
                    <Letters text="Your name" base={260} />
                  </span>
                  <input
                    type="text"
                    className="pm-fall-blk"
                    style={{ animationDelay: "320ms" }}
                    placeholder="Jane Cooper"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>

                <label className="pm-field">
                  <span>
                    <Letters text="Work email" base={360} />
                  </span>
                  <input
                    type="email"
                    className="pm-fall-blk"
                    style={{ animationDelay: "420ms" }}
                    placeholder="jane@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>

                <label className="pm-field">
                  <span>
                    <Letters text="About your project" base={460} />
                  </span>
                  <textarea
                    rows={3}
                    className="pm-fall-blk"
                    style={{ animationDelay: "520ms" }}
                    placeholder="What are you building, and what's the goal?"
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                  />
                </label>

                <button
                  type="submit"
                  className="pm-submit pm-fall-blk"
                  style={{ animationDelay: "600ms" }}
                >
                  Send project brief <ArrowRight size={18} strokeWidth={2.4} />
                </button>

                <p
                  className="pm-note pm-fall-blk"
                  style={{ animationDelay: "660ms" }}
                >
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
