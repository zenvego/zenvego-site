/**
 * Smooth-scroll to an in-page anchor. Used by the nav links and the
 * "Start a project" / "Get started today" placeholder buttons.
 */
export function smoothScrollTo(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string
) {
  if (!href.startsWith("#")) return;
  const id = href.slice(1);
  const el = document.getElementById(id);
  if (!el) return; // graceful no-op if the section isn't on the page
  e.preventDefault();
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", href);
}
