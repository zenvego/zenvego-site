"use client";

import { useReveal } from "./useReveal";

/** Mounts the scroll-reveal behaviour for all `.reveal` elements. Renders nothing. */
export default function Reveal() {
  useReveal();
  return null;
}
