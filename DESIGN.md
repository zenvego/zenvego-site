---
name: devisine
description: Design system for devisine, a senior design and development studio. Mint-washed surfaces, a single saturated green voice, type-led hierarchy.
colors:
  ink: "#14181a"
  dark: "#0c0e0d"
  dark-2: "#15191a"
  green: "#4cc46a"
  green-bright: "#6bdd86"
  green-deep: "#2c9a4c"
  green-on-dark-ink: "#06210f"
  orange: "#f6a623"
  teal: "#34d6c3"
  purple: "#c8b6f6"
  blue: "#8fd3f4"
  pink: "#f7b8d2"
  body: "#5d666b"
  faint: "#8a938d"
  cream: "#f5f8f5"
  page-bg: "#e9f3ec"
  line-light: "#e9ede9"
  line-dark: "#1a1f1d"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "clamp(28px, 3.8vw, 46px)"
    fontWeight: 700
    lineHeight: 1.06
    letterSpacing: "-0.02em"
  hero:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "clamp(30px, 4.8vw, 60px)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  body-small:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "13.5px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  eyebrow:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.04em"
  caption:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "12.5px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  sm: "10px"
  md: "13px"
  card: "18px"
  card-lg: "26px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "14px"
  md: "20px"
  lg: "28px"
  xl: "40px"
  block: "96px"
  gutter: "28px"
  maxw: "1180px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.green-on-dark-ink}"
    rounded: "{rounded.pill}"
    padding: "13px 26px"
  button-primary-hover:
    backgroundColor: "{colors.green-bright}"
    textColor: "{colors.green-on-dark-ink}"
    rounded: "{rounded.pill}"
    padding: "13px 26px"
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "13px 26px"
  card-surface:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "26px 24px"
  chip:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  eyebrow-label:
    textColor: "{colors.green-deep}"
    typography: "{typography.eyebrow}"
  service-tile-icon:
    backgroundColor: "{colors.green}"
    textColor: "{colors.green-on-dark-ink}"
    rounded: "{rounded.md}"
    size: "48px"
  dark-surface:
    backgroundColor: "{colors.dark}"
    textColor: "{colors.white}"
    rounded: "{rounded.card-lg}"
    padding: "34px 36px"
---

# Design System: devisine

## 1. Overview

**Creative North Star: "The Senior Studio Floor"**

devisine reads like walking into a real working studio: confident on the surface, busy underneath, quiet over the top. The page does not pose for the camera. There's no stage set, no lobby art, no marketing veneer; what's pinned to the wall is the actual work, and what's said is what the studio actually does. A founder closing the tab should think "those people know what they're doing," not "wow, what a site."

The system is anchored by two surfaces and one voice. A near-black dark band (`#0c0e0d`) carries the nav, hero, and footer. A mint wash (`#e9f3ec`) with a faint emerald 48px grid carries everything else, unbroken across section seams. The brand speaks in mint and green: deep green (`#2c9a4c`) for type-as-accent, bright green (`#4cc46a`) for surfaces and CTAs. The other accent hues in the palette (orange, teal, purple, blue) are reserved for **illustration** (per-service identity in the service explorer, floating badges, code/UI demos). They never carry primary UI; that would dilute the voice.

This system explicitly rejects: the generic agency template (big stock hero video, vague "we transform brands" copy, identical icon-heading-paragraph cards in a flat row), the overdesigned portfolio (cursor effects, WebGL backgrounds, motion that's compensating for thin work), the crypto/AI hype aesthetic (gradient-on-gradient, glow text, dark-mode-as-vibe), and the stuffy corporate consultancy (navy serif, transformation-partner tone).

**Key Characteristics:**
- One color voice: green. Other hues are illustration only, never primary UI.
- Two structural surfaces: dark band (nav + hero + footer) and mint page wash everywhere else.
- Type does most of the work. Sora at 800 with -0.03em tracking carries hero hierarchy; the body holds at Manrope 400.
- Motion is tactile, not decorative: lift-on-hover, conic light sweeps, fanned phone floats. Every animation has a `prefers-reduced-motion` alternative.
- A faint emerald 48px grid runs the full page so section seams never crack the surface.
- Eyebrows ("The Studio", "Our Work", "How we work") are a deliberate, named brand pattern: not section grammar, not on every block.

## 2. Colors

A two-surface system: a deep, almost-black brand surface for the dark band, and a mint-washed cream-green for everything else. The brand voice is carried by a single saturated green family. Four illustration accents exist for per-service identity and should never bleed into primary UI roles.

### Primary
- **devisine Green** (`#4cc46a`): the brand. CTAs, primary buttons, the `.gpill` chips, active states, the active orbital node, the highlight in the studio "travelling-light" border, every signal that something is the **right** answer.
- **Deep Green** (`#2c9a4c`): green-as-type. Eyebrow labels, link colors, active nav state, the inline "engineers." accent in the studio headline. The version of green that has to sit on white and not vibrate.
- **Bright Green** (`#6bdd86`): hover and bloom. Button hover backgrounds, the brighter end of the conic sweep, the cursor blink in the code demo.
- **Ink on Green** (`#06210f`): the only foreground color allowed on a green surface. Hits 7.4:1 against `#4cc46a`. Don't use white text on green.

### Illustration (Tertiary)
Reserved for distinguishing per-service tiles, floating badges, and decorative panels inside the dark-surface stages. **Never** for primary buttons, links, or text.
- **Orange** (`#f6a623`): mobile-apps service, rating stars, the corner gold-disc behind the hero phones.
- **Teal** (`#34d6c3`): AI integration service, "user message" bubbles in the AI demo.
- **Purple** (`#c8b6f6`): product-design service tile.
- **Blue** (`#8fd3f4`): brand-strategy service tile.
- **Pink** (`#f7b8d2`): defined but currently unused. Available if a sixth service tile lands.

### Neutral
- **Dark** (`#0c0e0d`): the deep brand surface. Nav, hero, footer, dark stages inside service explorer.
- **Dark-2** (`#15191a`): the announcement bar; slightly raised from `--dark` so the seam reads.
- **Ink** (`#14181a`): primary text on light surfaces. Headings, body emphasis.
- **Body** (`#5d666b`): secondary body text on mint or white. Hits 4.6:1 on `#e9f3ec`, 6.5:1 on white.
- **Faint** (`#8a938d`): captions, metadata, the stat labels under counted numbers. Must NOT be used for body copy.
- **Cream** (`#f5f8f5`): chip backgrounds, the orbit-process surface, soft secondary surface. Distinct from `--page-bg`.
- **Page Wash** (`#e9f3ec`): the unbroken mint surface that runs the whole page. Carries the 48px emerald grid (5% opacity).
- **Line Light** (`#e9ede9`): card and chip borders on light surfaces.
- **Line Dark** (`rgba(255,255,255,0.09)`): vertical separators inside the dark hero, divider strokes on dark stages.

### Named Rules

**The One Voice Rule.** Green is the only brand color. Mint, cream, ink, white, and the dark band are structural; green is the **only** color that carries identity. The four illustration accents (orange/teal/purple/blue/pink) are reserved for per-service distinction and decorative imagery. They are never used for primary buttons, primary links, hover states, or text-as-emphasis. If a new surface needs an accent and green won't fit, the surface is wrong.

**The Two-Surface Rule.** Every section sits on one of exactly two backgrounds: the dark brand surface (`#0c0e0d`) or the mint page wash (`#e9f3ec`). Cards on top of the mint wash use white; cards on top of the dark surface use `rgba(255,255,255,0.06)`. New surfaces don't introduce new background hues.

**The Ink-on-Green Rule.** Any green surface that holds text uses `#06210f` for the text, not white. White on `#4cc46a` measures only 2.7:1 (fails AA); `#06210f` clears 7.4:1.

## 3. Typography

**Display font:** Sora (Google Fonts), weights 400-800, wired via `--font-display` from `next/font/google`.
**Body font:** Manrope (Google Fonts), weights 400-800, wired via `--font-body`.

**Character:** Sora is a geometric sans with a confident, modern stance; Manrope is a humanist sans with a softer optical center. Pairing geometric display + humanist body creates real contrast on a single axis: the headlines hold a hard structural rhythm, the body reads warmly. The pair is intentionally not editorial-serif; this is a studio that ships software, not a magazine.

### Hierarchy

- **Hero** (Sora 800, `clamp(30px, 4.8vw, 60px)`, line-height 1.04, tracking `-0.03em`): the single biggest type on the page. The h1 in `.hero h1` and the section openers like the WhatWeDo headline. White on dark, ink on light. `white-space: nowrap` at desktop ceiling; unlocks on mobile.
- **Display** (Sora 700-800, `clamp(28px, 3.8vw, 46px)`, line-height 1.04-1.06, tracking `-0.02em` to `-0.03em`): section h2s. Studio title, Process header, Work gallery header. Uses `.grnk` class to ink one phrase in green-deep (`#2c9a4c`) inside an otherwise ink-colored heading.
- **Title** (Sora 700, 18-22px, line-height 1.1-1.2, tracking `-0.01em`): card titles, panel headings, modal titles. Promo-card h3 sits at 26px.
- **Body** (Manrope 400, 16px, line-height 1.6): hero lead, section intros, Studio lead.
- **Body Small** (Manrope 400, 13.5-14px, line-height 1.55-1.6): card body copy, panel descriptions, work-gallery copy.
- **Eyebrow** (Sora 700, 13px, tracking `0.04em`, uppercase, color `green-deep`): the named kicker. Renders with a 20×2px green bar before the text via `::before`. Used at most once or twice per section, NOT above every block.
- **Caption** (Manrope 400, 11-12.5px, tracking `0.02em`): rating helper text, floating-badge subline, metadata.
- **Mono** (`ui-monospace`, 12-12.5px): the code demo inside the WhatWeDo development pane, the orbital `oc-date` field. The studio's only mono use; not a system-wide voice.

### Named Rules

**The Type-First Rule.** Hierarchy is carried by type, not by color or decoration. A heading is bigger and a different family from body copy; a label is uppercase and tracked; a caption is smaller and faint. Color is for surfaces; weight and size are for hierarchy.

**The `-0.03em` Floor.** Hero and display headings track at `-0.02em` to `-0.03em`. Never tighter than `-0.04em` (letters touch). The Sora 800 weight at large sizes carries the design; loosen tracking and the headline reads as a default browser h1.

**The Named-Eyebrow Rule.** The eyebrow is part of the brand voice; it's named (`The Studio`, `Our Work`, `How we work`). It is NOT scaffolding above every section. Use it once or twice per page, where the label itself is a brand artifact. Never use `01 / 02 / 03` numbered eyebrows; numbers only earn their place inside a real sequence (e.g. the orbital process diagram).

## 4. Elevation

The system uses **soft, directional shadows** on a single elevation tier: cards rest on the surface and lift on hover; that's the entire vocabulary. There is no fixed shadow scale; shadows are tuned per-component to the surface they sit on (dark surface shadows go heavier and warmer; mint-surface shadows stay cooler and shorter).

Depth on the **dark surface** is conveyed through tonal layering (white at 6-12% alpha) and faint emerald glow (the `wwd-stage .sglow` blur). Depth on the **mint surface** comes from the actual shadow plus a 1px line border. The grid background acts as a depth cue at the surface level; it gives the eye a baseline so floating cards register as floating.

### Shadow Vocabulary

- **Card resting** (`box-shadow: 0 24px 50px -24px rgba(20,24,26,0.22)`): the default card lift used by `.fcard:hover` and the studio grid. Diffuse, warm, just shy of visible at rest; firmer on hover.
- **Card high-lift** (`box-shadow: 0 44px 96px -38px rgba(20,24,26,0.6)`): the expanded work-gallery panel. Used when a card has been promoted to dominant.
- **Phone deep** (`box-shadow: 0 40px 84px -22px rgba(0,0,0,0.55), 0 10px 26px -10px rgba(0,0,0,0.32)`): the hero phone mockups against the dark surface. Two-layer to read against `#0c0e0d`.
- **Floating badge** (`box-shadow: 0 22px 46px -18px rgba(0,0,0,0.45)`): the hovering little badges in the hero. Fairly dramatic to register against the dark surface.
- **Green bloom** (`box-shadow: 0 10px 26px -10px var(--green)`): the green CTA's signature glow; the shadow inherits the button color so the lift reads as "green light spilling," not "drop shadow."
- **Studio sweep** (`0 30px 70px -40px rgba(20,24,26,0.35)`): the muted lift on the stat-grid card on the mint surface.

### Named Rules

**The Direction-Down Rule.** All resting shadows offset downward only. No `box-shadow: 0 -...` ambient glows on cards. Light comes from above; the studio shouldn't feel like a stage.

**The Color-Inherit Rule.** When a CTA is colored (the green button, the bottom-row `wmetric` pill on work cards), the shadow inherits the surface color at low opacity. The lift reads as light spilling from the button itself, not as a separate effect bolted on.

**The Hover-Lifts-2px Rule.** Cards translate up exactly 6px on hover (`translateY(-6px)`); buttons translate 2-3px. Larger displacements break the surface metaphor.

## 5. Components

### Buttons
- **Shape:** Full pill (`border-radius: 999px`). 13px vertical, 26px horizontal padding. 15px font-size, 700 weight, Manrope.
- **Primary (`.btn-green`):** Bright green (`#4cc46a`) background, ink-dark text (`#06210f`), 0 10px 26px -10px green-bloom shadow. Hover: brighter green (`#6bdd86`), translateY(-2px), shadow deepens to 0 16px 34px -10px.
- **Dark (`.btn-dark`):** Ink background, white text, no shadow at rest. Hover: pure black, translateY(-2px).
- **Hero CTA (the same `.btn-green` inside `.hero-cta`):** identical to primary. The arrow glyph (`→`) is part of the label, not an icon.
- **Transitions:** `cubic-bezier(0.2, 0.7, 0.3, 1)` for the lift and color change; 250ms total. This easing is shared across every interactive lift in the system.

### Chips
- **Background:** Cream (`#f5f8f5`) on light surfaces; `rgba(255,255,255,0.13)` on dark surfaces.
- **Border:** 1px line-light (`#e9ede9`) on light; `rgba(255,255,255,0.2)` on dark.
- **Shape:** Pill (`border-radius: 999px`). 6-9px vertical, 12-14px horizontal padding.
- **Type:** 11.5-12.5px, 600-700 weight, Manrope, ink-colored on light.
- **State:** Service-explorer chips fade in with a staggered `translateY(8px)` on the active row. Hover (work-gallery tags): no shift; chips are non-interactive labels there.

### Cards / Containers
- **Corner Style:** 18px (`--radius`) for body cards (`.fcard`, `.appcard`, ProjectModal), 26px (`--radius-lg`) for the larger feature surfaces (orbital cards, work-gallery panels, dark service stages, studio stat grid).
- **Background:** White on the mint page; `rgba(255,255,255,0.06)` overlays on the dark surface.
- **Shadow Strategy:** Card resting + lift on hover (see Elevation). The dark-surface variants substitute soft inset glow for the shadow.
- **Border:** 1px `line-light` on white cards. None on dark-surface cards (rely on tonal layering).
- **Internal Padding:** 24-26px for body cards, 34-36px for hero-scale dark cards. Studio cell uses 40px / 34px.
- **Hover:** `translateY(-6px)`, shadow deepens, border fades to transparent on `.fcard`. 300ms `cubic-bezier(0.2, 0.7, 0.3, 1)`.

### Inputs / Fields (ProjectModal)
- **Style:** White background, 1px `line-light` border, 13px radius. 14-15px Manrope 400. 14px / 16px padding.
- **Focus:** Border shifts to `--green`, box-shadow `0 0 0 4px rgba(76,196,106,0.16)`. No outline removal without this replacement.
- **Disabled:** 60% opacity; pointer disabled.

### Navigation
- **Style:** Dark band (`--dark`), 80px height, max-width 1180px, 28px gutters.
- **Logo:** 66px tall image, hard-left.
- **Links:** Manrope 600, 15px, color `#aeb4af`, hover/active `#fff`. 34px gap between links.
- **CTA:** `.btn-green` at standard size, hard-right.
- **Mobile:** Burger menu (lucide `Menu` / `X`), slide-down panel `.nav-mobile` with chevron-arrow link rows.

### Eyebrow (signature)
- **Style:** Sora 700, 13px, `0.04em` tracking, uppercase, color `green-deep` (`#2c9a4c`).
- **Decoration:** 20×2px green bar via `::before`, 9px gap before the label text.
- **Usage:** ONE per section, max two per page. Used on Studio ("The Studio") and elsewhere as a named brand artifact, not as section grammar. Never use it above every heading.

### Service Stage (signature, dark surface)
The right-hand pane in WhatWeDo: a 26px-radius dark stage with a faint white 40px grid masked to a radial ellipse, a colored radial `sglow` (the active service's accent color), and per-service inline demos (UI block grid, code editor, phone mockup, AI chat, dashboard chart+ring). The accent color (`--accent-c`) is the only place the four illustration hues bleed into UI; the rest of the page stays in green.

### Studio Stat Grid (signature)
A 2×2 grid built from `gap: 1px` so the grid background becomes the divider line. Each cell is a `linear-gradient(165deg, #f0f7f1, #e3efe7)` panel; numbers count up on scroll-in via `IntersectionObserver`. On first scroll-in (and on every hover), a conic gradient masked to a 1.5px frame sweeps the border with a green light pulse. `@property --studio-angle` registers the gradient angle so it animates smoothly.

### Orbital Process Diagram (signature)
A circular ring on the cream surface with four nodes at fixed angles. Each node is a 64px white circle with a 1px ink border; the active node fills green with a 7px green-tinted halo and scales 1.14×. The center card slides in with the active step's content. Single ring is dashed; second ring (smaller) is solid.

### Work Gallery Panel (signature)
A horizontal row of dark gradient panels that expand from `flex: 1` to `flex: 3.5` when active. Each panel has a fanned phone-mockup or stacked-screen visual that floats independently with bespoke per-mockup keyframes. A green metric pill drops in from above on activation. A 3px green progress bar runs across the bottom while active. Vertical writing-mode label on the left edge of inactive panels.

## 6. Do's and Don'ts

### Do:
- **Do** keep green as the only voice. Buttons, links, active states, hover blooms, eyebrow labels: green or its ramp. Orange/teal/purple/blue/pink are illustration only.
- **Do** sit every section on one of two surfaces: the dark band (`#0c0e0d`) or the mint page wash (`#e9f3ec`). White cards lift off the mint wash; tonal-overlay cards lift off the dark band.
- **Do** use `#06210f` for text on any green surface. White on green here measures 2.7:1 and fails contrast.
- **Do** carry the 48px emerald grid through every light section. Section seams don't crack; the grid runs unbroken from the announcement bar to the footer.
- **Do** use `text-wrap: balance` on h1-h3 and verify the hero copy fits at the mobile breakpoint (the hero h1 currently uses `white-space: nowrap`; copy that defeats that needs a media-query override, not a longer headline).
- **Do** give every animation a `prefers-reduced-motion: reduce` alternative. The hero flame, the studio sweep, the floating badges, the orbital transitions, the count-up: all already have it. New motion must too.
- **Do** use the eyebrow as a named brand artifact ("The Studio", "Our Work", "How we work"). One or two per page.
- **Do** ship at least one concrete proof per section: a real screenshot, a number, a named project. The page is the studio's first deliverable; every section answers a buyer's "show me, don't tell me."

### Don't:
- **Don't** introduce a new brand color. The system speaks in green. New accents are not a design solution; they're a reflex.
- **Don't** apply the eyebrow above every section. The kicker-eyebrow on every block is the saturated AI scaffolding pattern. One or two per page max; if every section gets one, retire it from the section.
- **Don't** apply `01 · / 02 · / 03 ·` numbered eyebrows. Numbers only earn their place inside a real ordered sequence (the orbital process diagram is one). Numbered scaffolding above unordered sections is AI grammar.
- **Don't** use white text on green. Use `#06210f`.
- **Don't** use `--body` (`#5d666b`) on a dark background, or `--faint-d` (`#8a938d`) for body copy on any surface. Body needs `--ink` on light, `#cdd3ce` or brighter on dark.
- **Don't** use side-stripe borders (`border-left: 3px solid green` as a callout). The service-explorer row uses one (`.srow::before`) as a deliberate active-state cue; do not generalize it.
- **Don't** use glassmorphism / backdrop-blur as decoration. The work-gallery `.wnum` badge uses `backdrop-filter: blur(6px)` for legibility against photographic backgrounds; that's the only allowed use.
- **Don't** use gradient text (`background-clip: text` with a gradient background). Emphasis is via color (`.grnk` → green-deep) or weight, never via gradient.
- **Don't** ship the generic agency template. No stock hero video loop, no row of stock client logos under "Trusted by," no identical icon-heading-paragraph card trio. Every claim earns its place with a concrete project, number, or screenshot.
- **Don't** ship the overdesigned-portfolio cliche. No cursor effects, no WebGL backgrounds, no scroll-juggle for its own sake. The phone-mockup float, the studio border sweep, and the work-gallery expansion already earn their place; we don't need more motion to look impressive.
- **Don't** ship the crypto/AI hype aesthetic. No gradient-on-gradient, no glow text, no dark-mode-as-vibe. The dark band exists because the hero needs a stage; it is not the brand's default mode.
- **Don't** drop below 4.5:1 for body text. Body (`#5d666b`) on the mint wash (`#e9f3ec`) measures 4.6:1; that is the floor. If a section tightens the background tint, re-check the body color before shipping.
