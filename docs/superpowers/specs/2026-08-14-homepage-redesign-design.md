# Homepage redesign — design spec

## Reference

`Minimalist Portfolio Website / Framer Template (Community)` — a single-page
design-agency template: oversized display headlines, generous whitespace,
near-monochrome palette, black pill CTA buttons, and numbered list rows with
horizontal-rule dividers. We're borrowing the *visual language*, not the
agency copy or the decorative background screenshot collage in the
"Selected Work" section (explicitly excluded).

## Scope

Homepage (`content/_index.md` + `themes/not-much/layouts/home.html`) only.
About and Posts pages are untouched in this pass — a natural follow-up once
the homepage direction is confirmed live.

## Content decisions

- **"Selected Work" → "Ventures & Investments"**: static rows for Satelyx,
  Gray Label, and SPIN (advisor). Not a blog-post feed — keeps a clear line
  between "things built/backed" and "things written." `/posts/` stays a
  fully separate, unchanged section reachable from nav.
- **Process/accordion section dropped.** Agency/client-pitch flavored;
  doesn't map to a personal site. Cut for a leaner page (YAGNI).
- **Contact is a `mailto:` pill button**, not a contact form — avoids
  building form-submission handling for a static site.

## Section structure (top to bottom)

1. **Nav** — existing wordmark + `home / about / posts` breadcrumb-style
   nav, restyled to the new type scale. No structural change.
2. **Hero** — two-line oversized display heading ("Venture Builder" /
   "& Investor"), small subtitle beside it adapted from the current
   homepage lead text.
3. **Intro + CTA + socials** — condensed About paragraph, black pill
   "Get in touch" button (`mailto:chngln45@gmail.com`), and a "Let's get
   connected" list (LinkedIn, Substack) sourced from config, not hardcoded.
4. **Focus areas** (was "I can help you with") — numbered 01/02/03: Venture
   Building, Investing, Advisory, one line each, drawn from existing bio
   copy.
5. **Ventures & Investments** — big numbered rows (Satelyx /01, Gray Label
   /02, SPIN /03) with rule dividers, matching the reference's "Selected
   Work" row treatment. No decorative background imagery.
6. **Closing CTA** — large "Let's talk about a venture, investment, or
   idea" heading + the same pill button.
7. **Footer** — unchanged copyright + the same socials list, reused from
   the intro section's data.

## Visual system

- **Typography**: keep the existing Space Grotesk (display) / Inter (body)
  / JetBrains Mono (technical) stack rather than sourcing a new family — at
  the large display sizes this template uses, Space Grotesk reads close to
  the reference's geometric sans, and it avoids redoing font work already
  in place.
- **Color**: move toward the reference's minimal, high-whitespace,
  near-monochrome feel, but keep the existing `--primary` accent variable
  wired into links and small details rather than going fully grayscale —
  preserves site identity and keeps dark/light palette switching working
  for free, since everything already runs on CSS custom properties.
- **New components**: responsive display headings via `clamp()`, a pill
  button component, and a numbered-row-with-divider component (reusable
  across Focus Areas and Ventures & Investments).

## File organization (for maintainability)

- Each homepage section becomes its own partial:
  `themes/not-much/layouts/_partials/home/{hero,intro,focus-areas,ventures,cta}.html`.
  `home.html` composes them — editing one section doesn't touch others.
- Socials, focus areas, and ventures list live as data under `[params]` in
  `hugo.toml`, not hardcoded in templates, so adding/removing/reordering an
  entry later is a config edit, not a template edit.
- New homepage-specific CSS goes in a new `themes/not-much/assets/css/home.css`
  (loaded alongside `main.css`) rather than growing `main.css` further, and
  reuses existing `--bg-color` / `--font-color` / `--primary` variables so
  palettes and dark mode continue to work untouched.

## Out of scope (explicitly)

- About page and Posts (list + single) page redesign — later, separate pass.
- Contact form / backend — using `mailto:` instead.
- The decorative background screenshot collage from the reference.
- Any new social platforms beyond LinkedIn + Substack (can be added later
  via config since it's data-driven).
