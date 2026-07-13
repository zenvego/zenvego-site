# Product

## Register

brand

## Users

Founders and CEOs actively shopping for a design and development studio. They're typically comparing three to five studios for a real upcoming build (a new product, a redesign, a market move) and have a budget that justifies a senior team. They arrive skeptical: most studio sites look the same to them, so they read fast and bounce faster. Half are cold (paid, organic, social), half are warm (referrals from their network).

The job they're trying to get done: decide, in under two minutes of skimming, whether devisine is worth a 30-minute intro call. They're not buying services, they're buying confidence that the team they hire won't waste the next four months.

## Product Purpose

A single-page site that does two jobs at once: convert qualified cold visitors into "Start a project" calls, and reinforce credibility for warm referrals so they arrive at the call more sold than they were before clicking. The page is the studio's first deliverable. If it doesn't itself feel pixel-perfect, fast, and senior, the pitch contradicts itself.

Success is measurable: more intro calls booked, and referrals that say "I already knew you were good, but the site sealed it."

## Brand Personality

**Confident. Crafted. Quietly bold.**

Senior taste that doesn't need to shout. Type does most of the work. Color is committed but used sparingly. Motion is purposeful, never showy. The voice is specific and grown-up: what we actually do, for whom, with what result. No aphorisms, no marketing buzzwords, no "transform your business." The reader should feel like they're talking to a principal, not a sales page.

The emotional goal: a founder closes the tab and thinks "those people know what they're doing", not "wow, what a site."

## Anti-references

- **Generic agency template.** The Webflow agency look: big hero video loop, vague "we transform brands and build extraordinary products" copy, a flat row of stock client logos, three identical service cards with stock icons. Reads as interchangeable; we're trying to be the opposite.
- **Overdesigned portfolio.** Cursor effects, WebGL backgrounds, scroll-juggle showcases, and motion-for-its-own-sake with no real proof underneath. The studios doing this are usually compensating for thin work. We have real work; show it plainly.
- **Crypto/AI hype aesthetic.** Gradients-on-gradients, glow text, "next generation," dark mode by default as a vibe. Not our register.
- **Stuffy corporate consultancy.** Navy + serif + "transformation partner" tone. Senior doesn't mean stiff.

## Design Principles

1. **Show the work, don't describe it.** Visitors are comparing studios; specifics close, adjectives don't. Every claim earns its place with a concrete project, number, or screenshot. Replace any sentence that could appear unchanged on a competitor's site.

2. **Confidence without volume.** Quietly bold means unmistakable without shouting. Type carries hierarchy; motion serves comprehension; color is committed but rationed. If an element exists to be impressive rather than to communicate, cut it.

3. **The site IS the portfolio.** A studio's marketing is its first proof. Pixel precision, accessibility, performance, and copy quality are non-negotiable; every detail is a live demo of how the team works.

4. **Read like a senior team.** Specific, not aphoristic. Name what we actually do and for whom. No buzzwords, no contrarian one-liners, no copy that could be in a pitch deck for any agency.

5. **Cold and warm in one draft.** First-time visitors get convinced; referrals get reinforced. Hierarchy serves both without splitting into two pages or two voices.

## Accessibility & Inclusion

Target WCAG AAA where it doesn't compromise the design; AA is the absolute floor. Push harder where accessibility is itself a credibility signal:

- Body text contrast: aim for 7:1 against its background; never below 4.5:1. The mint page background needs verified contrast for muted/body text. That's the most likely failure mode in the current palette.
- Chips, badges, and labels on tinted backgrounds: verify contrast against the actual surface they sit on, not a generic white.
- Color is never the sole carrier of meaning. Status, category, and emphasis pair color with shape, weight, or text.
- Every animation has a `prefers-reduced-motion: reduce` alternative, typically a crossfade or instant state change. The hero, stat counter, and reveal animations all need explicit fallbacks.
- Focus states are visible against every surface (dark hero, mint page, white cards). No outline removal without a custom equivalent.
- Keyboard navigation reaches every CTA and modal trigger in a logical order; the Start-a-project modal traps focus and restores it on close.
