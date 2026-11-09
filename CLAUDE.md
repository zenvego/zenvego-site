# CLAUDE.md

## Design Context

This project ships a single-page marketing site for **Zenvego**, a senior design and development studio. The strategic and visual context for design work lives in two root files:

- [`PRODUCT.md`](./PRODUCT.md) — register, users, purpose, brand personality, anti-references, accessibility target.
- [`DESIGN.md`](./DESIGN.md) — visual system (palette, typography, components, do's and don'ts). Frontmatter is normative.

Read both before generating UI. PRODUCT.md wins on strategic/voice decisions; DESIGN.md wins on visual decisions.

### Quick reference

- **Register:** brand (design IS the product). Marketing landing page; first deliverable for a founder shopping a studio.
- **Brand voice:** confident, crafted, quietly bold. Sora display + Manrope body.
- **One color voice:** green (`#4cc46a`). Mint page wash (`#e9f3ec`) on every light section. Other accents (orange/teal/purple/blue/pink) are illustration only, never primary UI.
- **A11y target:** WCAG AAA where it doesn't compromise the design; AA is the floor.
- **Anti-references (do NOT drift toward):** generic agency template, overdesigned portfolio, crypto/AI hype aesthetic, stuffy corporate consultancy.

### Stack

Next.js 14 (App Router) · React 18 · Tailwind 3 (custom tokens mirror `globals.css`) · `motion` for animation · `lucide-react` for icons.

The visual system lives mainly in `app/globals.css` as CSS custom properties; Tailwind's `theme.extend.colors` mirrors them. Treat the CSS variables as canonical.
