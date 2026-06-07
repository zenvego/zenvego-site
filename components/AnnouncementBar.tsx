"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { smoothScrollTo } from "./smoothScroll";

export default function AnnouncementBar() {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;

  return (
    <div className="announce">
      <div className="wrap announce-inner">
        <span>
          ✨ We&apos;ve expanded our studio services for 2026 — design, web &amp;
          mobile under one roof.{" "}
          <a href="#contact" onClick={(e) => smoothScrollTo(e, "#contact")}>
            Learn more
          </a>
        </span>
        <button
          type="button"
          className="x"
          aria-label="Dismiss announcement"
          onClick={() => setHidden(true)}
        >
          <X size={13} strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
}
