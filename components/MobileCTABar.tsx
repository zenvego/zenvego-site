"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { openProjectModal } from "./ProjectModal";

/**
 * Mobile-only sticky call-to-action. The site's job is booking discovery calls,
 * so on small screens the primary action follows the reader down the page.
 *
 * It reveals once the hero is scrolled past and hides again whenever the contact
 * form or footer is on screen, so it never sits on top of the form's own submit
 * button. Tapping it opens the shared "Start a project" modal. Hidden entirely
 * on ≥880px via CSS; non-focusable while off-screen.
 */
export default function MobileCTABar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let pastHero = false;
    let nearEnd = false;
    const update = () => setShow(pastHero && !nearEnd);

    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.7;
      update();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Track which "end" sections are currently visible.
    const visible = new Set<Element>();
    const targets = [
      document.getElementById("contact"),
      document.querySelector("footer"),
    ].filter(Boolean) as Element[];

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        });
        nearEnd = visible.size > 0;
        update();
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    targets.forEach((t) => io.observe(t));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <button
      type="button"
      className={`mcta${show ? " show" : ""}`}
      onClick={openProjectModal}
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
    >
      <span className="mcta-tx">
        <b>Start a project</b>
        <em>Free 30-minute discovery call</em>
      </span>
      <span className="mcta-ic" aria-hidden>
        <ArrowRight size={18} strokeWidth={2.4} />
      </span>
    </button>
  );
}
