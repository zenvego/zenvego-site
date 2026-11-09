"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { smoothScrollTo } from "./smoothScroll";

const DISMISS_KEY = "zenvego:announce-2026-services";

export default function AnnouncementBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY) === "1") setHidden(true);
    } catch {
      /* localStorage unavailable (Safari private mode, etc) — bar stays visible. */
    }
  }, []);

  const dismiss = () => {
    setHidden(true);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* no-op */
    }
  };

  if (hidden) return null;

  return (
    <div className="announce">
      <div className="wrap announce-inner">
        <span>
          We&apos;ve expanded our studio services for 2026: design, web and
          mobile under one roof.{" "}
          <a href="#contact" onClick={(e) => smoothScrollTo(e, "#contact")}>
            Learn more
          </a>
        </span>
        <button
          type="button"
          className="x"
          aria-label="Dismiss announcement"
          onClick={dismiss}
        >
          <X size={14} strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
}
