# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage (`home.html`) into the Framer-template-inspired
layout from `docs/superpowers/specs/2026-08-14-homepage-redesign-design.md`:
oversized hero type, an intro with a mailto CTA and socials, a "Where I
focus" numbered grid, a "Ventures & Investments" numbered list, and a
closing CTA — while leaving About/Posts pages untouched.

**Architecture:** Five small, single-purpose Hugo partials under
`layouts/_partials/home/` compose the homepage; `home.html` becomes a thin
list of partial calls. All homepage-only visual content (socials, focus
areas, ventures) is data in `hugo.toml`'s `[params]`, not hardcoded HTML.
New layout/typography CSS lives in its own `home.css`, scoped so it never
touches About/Posts styling.

**Tech Stack:** Hugo static site generator, Go templates, plain CSS (no
build step — Hugo's `resources.Get` + `minify`/`fingerprint` pipeline
already in use).

## Global Constraints

- Scope is the homepage only. Do not modify About or Posts pages/templates.
- No contact form — CTAs link `mailto:` only.
- No decorative background screenshot collage (explicitly excluded by the
  user).
- Keep the existing font stack: Space Grotesk (display), Inter (body),
  JetBrains Mono (technical/numerals). Do not introduce a new font family.
- The site-name heading ("CLEMENT CHEN") must keep its existing
  `.display-3` class — that class already carries a Baskerville Semibold
  font override in `main.css` from a prior request, and it must keep
  applying. New sizing/layout for that heading goes in `home.css` under a
  separate `.hero-title` class added alongside `.display-3`, not replacing
  it.
- Reuse existing CSS custom properties (`--bg-color`, `--font-color`,
  `--primary`, `--bg-variant`) for all new colors so dark/light palette
  switching keeps working with zero extra code.
- New homepage CSS goes in a new file, `themes/not-much/assets/css/home.css`
  — do not append to `main.css`.
- Content (socials, focus areas, ventures) is defined as `[params]` arrays
  in `hugo.toml`, not hardcoded in template HTML, so it can be edited
  later without touching templates.
- No automated test suite exists for this static site. "Testing" a task
  means: (a) `hugo --quiet` builds with no errors, and (b) the change is
  visually confirmed in the live preview at `http://localhost:1313/`
  (reload after each change — Hugo's dev server live-reloads automatically).

---

### Task 1: Homepage content data in `hugo.toml`

**Files:**
- Modify: `hugo.toml:6-14` (the `[params]` block)

**Interfaces:**
- Produces: `site.Params.email` (string), `site.Params.socials` (array of
  `{name, url}`), `site.Params.focusAreas` (array of
  `{number, title, description}`), `site.Params.ventures` (array of
  `{number, name, tags, url}`, where `url` may be an empty string).
  Consumed by Tasks 4, 5, and 6.

- [ ] **Step 1: Add the new params**

Replace lines 6-14 of `hugo.toml` (the existing `[params]` block through
the `copyright` line) with:

```toml
[params]
  noindex = true
  theme = "auto"
  palette = "default"
  showThemeNotice = true
  showFooterEverywhere = true
  showPostsSummary = true
  email = "chngln45@gmail.com"

[[params.socials]]
  name = "LinkedIn"
  url = "https://www.linkedin.com/in/clementyccchen/"

[[params.socials]]
  name = "Substack"
  url = "https://clementality.substack.com/"

[[params.focusAreas]]
  number = "01"
  title = "Venture Building"
  description = "Co-founding and operating companies from the ground up — currently Satelyx and Gray Label."

[[params.focusAreas]]
  number = "02"
  title = "Investing"
  description = "Backing early-stage companies across Web3, infrastructure, and deep tech."

[[params.focusAreas]]
  number = "03"
  title = "Advisory"
  description = "Working closely with early-stage teams on product positioning and go-to-market strategy."

[[params.ventures]]
  number = "01"
  name = "Satelyx"
  tags = "Space, Deep Tech"
  url = "https://satelyx.com/"

[[params.ventures]]
  number = "02"
  name = "Gray Label"
  tags = "Venture Building"
  url = ""

[[params.ventures]]
  number = "03"
  name = "SPIN"
  tags = "Advisor, Smart Products Infrastructure"
  url = ""

copyright = "© {year} Clement Chen"
```

Leave the `[[menu.main]]` blocks below unchanged.

- [ ] **Step 2: Verify the build**

Run: `cd ~/clementchenco && hugo --quiet`
Expected: exits 0, no `ERROR` lines in output.

- [ ] **Step 3: Commit**

```bash
cd ~/clementchenco
git add hugo.toml
git commit -m "Add homepage content data (socials, focus areas, ventures) to hugo.toml"
```

---

### Task 2: Homepage stylesheet foundation

**Files:**
- Create: `themes/not-much/assets/css/home.css`
- Modify: `themes/not-much/layouts/_partials/head/css.html:9-10` (insert a
  new block between the existing `main.css` block and the `palette` block)

**Interfaces:**
- Produces CSS classes consumed by Tasks 3-7's HTML:
  `.container-wide`, `.hero`, `.hero-title`, `.hero-subtitle`, `.intro`,
  `.intro-copy`, `.btn-pill`, `.btn-pill-dot`, `.intro-socials`,
  `.intro-socials-label`, `.intro-socials-list`, `.focus-areas`,
  `.focus-areas-heading`, `.focus-areas-grid`, `.focus-area`,
  `.focus-area-number`, `.focus-area-title`, `.focus-area-description`,
  `.ventures`, `.ventures-header`, `.ventures-heading`, `.ventures-count`,
  `.ventures-description`, `.ventures-list`, `.venture-row`,
  `.venture-name`, `.venture-tags`, `.venture-number`, `.closing-cta`,
  `.closing-cta-title`.

- [ ] **Step 1: Create `home.css`**

Create `themes/not-much/assets/css/home.css`:

```css
/* Homepage-only layout system for the Framer-template-inspired redesign.
   Scoped so it never affects About/Posts pages: those use the shared
   .container class from main.css, not .container-wide. */

.container-wide {
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 1400px) {
  .container-wide {
    max-width: 1200px;
  }
}

/* Nav, scoped to the homepage instance only */
.container-wide .navbar {
  margin-bottom: 1rem;
}

.container-wide .breadcrumb-item a {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* Hero */
.hero {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 3rem;
}

.hero-title {
  flex: 1 1 auto;
  font-size: clamp(3rem, 12vw, 7rem) !important;
  line-height: 0.95 !important;
  margin: 0 !important;
}

.hero-subtitle {
  flex: 0 1 20rem;
  font-size: 1.05rem;
  line-height: 1.5;
  opacity: 0.75;
  margin: 0;
  padding-bottom: 0.5rem;
}

/* Intro + CTA + socials */
.intro {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  margin-bottom: 5rem;
}

.intro-copy {
  flex: 2 1 26rem;
}

.intro-copy p {
  font-size: 1.15rem;
  line-height: 1.6;
  margin: 0;
}

.btn-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1.5rem;
  padding: 0.75rem 1.4rem;
  border-radius: 999px;
  background-color: var(--font-color);
  color: var(--bg-color) !important;
  text-decoration: none !important;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  transition: opacity 0.2s ease;
}

.btn-pill:hover {
  opacity: 0.8;
  color: var(--bg-color) !important;
  text-decoration: none !important;
}

.btn-pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--bg-color);
}

.intro-socials {
  flex: 1 1 12rem;
}

.intro-socials-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.6;
  border-bottom: 1px solid var(--bg-variant);
  padding-bottom: 0.75rem;
  margin-bottom: 0.75rem;
}

.intro-socials-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.intro-socials-list li {
  margin-bottom: 0.5rem;
}

.intro-socials-list a {
  color: var(--font-color) !important;
  text-decoration: none !important;
}

.intro-socials-list a:hover {
  color: var(--primary) !important;
}

/* Focus areas */
.focus-areas {
  margin-bottom: 5rem;
}

.focus-areas-heading {
  font-size: 1.5rem !important;
  margin: 0 0 2rem 0 !important;
}

.focus-areas-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

@media (max-width: 900px) {
  .focus-areas-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

.focus-area {
  border-top: 1px solid var(--bg-variant);
  padding-top: 1rem;
}

.focus-area-number {
  display: block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.5rem;
  opacity: 0.35;
  margin-bottom: 0.5rem;
}

.focus-area-title {
  font-size: 1.1rem !important;
  margin: 0 0 0.5rem 0 !important;
}

.focus-area-description {
  font-size: 0.9rem;
  opacity: 0.75;
  margin: 0;
}

/* Ventures & Investments */
.ventures {
  margin-bottom: 5rem;
}

.ventures-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  border-bottom: 1px solid var(--bg-variant);
  padding-bottom: 1.5rem;
}

.ventures-heading {
  font-size: 1.5rem !important;
  margin: 0 !important;
}

.ventures-count {
  opacity: 0.4;
  font-weight: normal;
  margin-left: 0.35rem;
}

.ventures-description {
  font-size: 0.9rem;
  opacity: 0.7;
  margin: 0;
}

.venture-row {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  padding: 1.75rem 0;
  border-bottom: 1px solid var(--bg-variant);
}

.venture-name {
  font-size: clamp(2rem, 6vw, 3.25rem) !important;
  font-weight: 600 !important;
  margin: 0 auto 0 0 !important;
}

.venture-name a {
  color: var(--font-color) !important;
  text-decoration: none !important;
}

.venture-name a:hover {
  color: var(--primary) !important;
}

.venture-tags {
  font-size: 0.85rem;
  opacity: 0.6;
}

.venture-number {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  opacity: 0.5;
}

/* Closing CTA */
.closing-cta {
  margin-bottom: 4rem;
}

.closing-cta-title {
  font-size: clamp(2rem, 7vw, 4rem) !important;
  line-height: 1.05 !important;
  max-width: 40rem;
  margin: 0 0 1.5rem 0 !important;
}
```

- [ ] **Step 2: Wire it into `head/css.html`**

In `themes/not-much/layouts/_partials/head/css.html`, insert this block
immediately after the existing `main.css` block (after line 9, `{{- end }}`)
and before the `{{- with .Site.Params.palette }}` line:

```go-html-template
{{- with resources.Get "css/home.css" }}
  {{- if eq hugo.Environment "development" }}
    <link rel="stylesheet" href="{{ .RelPermalink }}">
  {{- else }}
    {{- with . | minify | fingerprint }}
      <link rel="stylesheet" href="{{ .RelPermalink }}" integrity="{{ .Data.Integrity }}" crossorigin="anonymous">
    {{- end }}
  {{- end }}
{{- end }}
```

- [ ] **Step 3: Verify the build**

Run: `cd ~/clementchenco && hugo --quiet`
Expected: exits 0, no `ERROR` lines. (No visible page change yet — no HTML
references these classes until Task 3+.)

- [ ] **Step 4: Commit**

```bash
cd ~/clementchenco
git add themes/not-much/assets/css/home.css themes/not-much/layouts/_partials/head/css.html
git commit -m "Add homepage stylesheet foundation (home.css)"
```

---

### Task 3: Hero section

**Files:**
- Create: `themes/not-much/layouts/_partials/home/hero.html`
- Modify: `themes/not-much/layouts/home.html` (full rewrite)

**Interfaces:**
- Consumes: `site.Title` (string), `.Params.lead` (string, page front
  matter, already set in `content/_index.md`).
- Produces: renders a `<section class="hero">` — no data produced for
  later tasks.

- [ ] **Step 1: Create the hero partial**

Create `themes/not-much/layouts/_partials/home/hero.html`:

```go-html-template
{{- $page := . }}
<section class="hero">
  <h1 class="hero-title display-3 text-uppercase">{{ site.Title }}</h1>
  {{- with $page.Params.lead }}
  <p class="hero-subtitle">{{ . }}</p>
  {{- end }}
</section>
```

- [ ] **Step 2: Rewrite `home.html` to use it**

Replace the full contents of `themes/not-much/layouts/home.html` with:

```go-html-template
{{ define "main" }}
<div class="container-wide pt-5">
  {{ partial "menu.html" (dict "menuID" "main" "page" .) }}
  {{ partial "home/hero.html" . }}
</div>
{{ end }}
```

- [ ] **Step 3: Verify**

Run: `cd ~/clementchenco && hugo --quiet`
Expected: exits 0, no errors.

Then reload `http://localhost:1313/` in the browser preview. Expected: nav
renders, then "CLEMENT CHEN" in large Baskerville Semibold type with the
lead subtitle beside it (wraps below on narrow viewports). Intro
paragraph, focus areas, etc. are not present yet — that's expected.

- [ ] **Step 4: Commit**

```bash
cd ~/clementchenco
git add themes/not-much/layouts/_partials/home/hero.html themes/not-much/layouts/home.html
git commit -m "Add hero section to homepage redesign"
```

---

### Task 4: Intro + CTA + socials section

**Files:**
- Create: `themes/not-much/layouts/_partials/home/intro.html`
- Modify: `themes/not-much/layouts/home.html:4` (add one partial call line)
- Modify: `themes/not-much/layouts/_partials/footer.html` (add the socials
  list — this partial is shared site-wide via `showFooterEverywhere`, so
  this is the one intentional exception to "homepage only": it enriches
  the existing shared footer everywhere rather than redesigning
  About/Posts page content, per the spec's footer bullet)

**Interfaces:**
- Consumes: `.Content` (page body HTML, from `content/_index.md`),
  `site.Params.email` (string, from Task 1), `site.Params.socials`
  (array of `{name, url}`, from Task 1).
- Produces: renders `<section class="intro">`.

- [ ] **Step 1: Create the intro partial**

Create `themes/not-much/layouts/_partials/home/intro.html`:

```go-html-template
{{- $page := . }}
<section class="intro">
  <div class="intro-copy">
    {{ $page.Content }}
    {{- with site.Params.email }}
    <a class="btn-pill" href="mailto:{{ . }}">Get in touch<span class="btn-pill-dot"></span></a>
    {{- end }}
  </div>
  {{- with site.Params.socials }}
  <div class="intro-socials">
    <p class="intro-socials-label">Let's get connected</p>
    <ul class="intro-socials-list">
      {{- range . }}
      <li><a href="{{ .url }}" target="_blank" rel="noopener noreferrer">{{ .name }}</a></li>
      {{- end }}
    </ul>
  </div>
  {{- end }}
</section>
```

- [ ] **Step 2: Wire it into `home.html`**

Replace the full contents of `themes/not-much/layouts/home.html` with:

```go-html-template
{{ define "main" }}
<div class="container-wide pt-5">
  {{ partial "menu.html" (dict "menuID" "main" "page" .) }}
  {{ partial "home/hero.html" . }}
  {{ partial "home/intro.html" . }}
</div>
{{ end }}
```

- [ ] **Step 3: Add the socials list to the shared footer**

Read `themes/not-much/layouts/_partials/footer.html` first to confirm its
current exact contents, then replace the whole file with:

```go-html-template
<div class="container mt-4 pb-1">
    {{- with .Site.Params.socials }}
    <p class="small opacity-75 footer-socials">
        {{- range $i, $s := . }}{{ if $i }} &middot; {{ end }}<a href="{{ $s.url }}" target="_blank" rel="noopener noreferrer">{{ $s.name }}</a>{{- end }}
    </p>
    {{- end }}
    <p class="small opacity-75">
        {{ replace .Site.Copyright "{year}" now.Year }}
        {{ if .Site.Params.showThemeNotice }}
        // powered by <a href="https://gohugo.io/" target="_blank" rel="noopener noreferrer">hugo</a> and <a href="https://github.com/imgios/not-much" target="_blank" rel="noopener noreferrer">imgios/not-much</a>
        {{ end }}
    </p>
</div>
```

This reuses the exact same `site.Params.socials` data as the intro
section (Step 1) — no new data added. Because `showFooterEverywhere = true`,
this list will now appear in the footer on every page, not just the
homepage; that's intentional (see Files note above).

- [ ] **Step 4: Verify**

Run: `cd ~/clementchenco && hugo --quiet`
Expected: exits 0, no errors.

Reload `http://localhost:1313/`. Expected: below the hero, the "Welcome to
my corner..." paragraph appears with a black "Get in touch" pill button
under it, and a "Let's get connected" list with LinkedIn and Substack
links to its right (stacks below on narrow viewports). Click-check: the
socials links should open in a new tab. Scroll to the footer: confirm
"LinkedIn · Substack" now appears above the copyright line. Navigate to
`/about/` and confirm the footer there shows the same socials line too.

- [ ] **Step 5: Commit**

```bash
cd ~/clementchenco
git add themes/not-much/layouts/_partials/home/intro.html themes/not-much/layouts/home.html themes/not-much/layouts/_partials/footer.html
git commit -m "Add intro/CTA/socials section to homepage redesign; reuse socials list in footer"
```

---

### Task 5: Focus areas section

**Files:**
- Create: `themes/not-much/layouts/_partials/home/focus-areas.html`
- Modify: `themes/not-much/layouts/home.html:5` (add one partial call line)

**Interfaces:**
- Consumes: `site.Params.focusAreas` (array of
  `{number, title, description}`, from Task 1).
- Produces: renders `<section class="focus-areas">`.

- [ ] **Step 1: Create the focus-areas partial**

Create `themes/not-much/layouts/_partials/home/focus-areas.html`:

```go-html-template
{{- with site.Params.focusAreas }}
<section class="focus-areas">
  <h2 class="focus-areas-heading">Where I focus</h2>
  <div class="focus-areas-grid">
    {{- range . }}
    <div class="focus-area">
      <span class="focus-area-number">{{ .number }}</span>
      <h3 class="focus-area-title">{{ .title }}</h3>
      <p class="focus-area-description">{{ .description }}</p>
    </div>
    {{- end }}
  </div>
</section>
{{- end }}
```

- [ ] **Step 2: Wire it into `home.html`**

Replace the full contents of `themes/not-much/layouts/home.html` with:

```go-html-template
{{ define "main" }}
<div class="container-wide pt-5">
  {{ partial "menu.html" (dict "menuID" "main" "page" .) }}
  {{ partial "home/hero.html" . }}
  {{ partial "home/intro.html" . }}
  {{ partial "home/focus-areas.html" . }}
</div>
{{ end }}
```

- [ ] **Step 3: Verify**

Run: `cd ~/clementchenco && hugo --quiet`
Expected: exits 0, no errors.

Reload `http://localhost:1313/`. Expected: a "Where I focus" heading
followed by a 3-column grid (Venture Building / Investing / Advisory),
each with a large faint number, a bold title, and a short description.
Below ~900px viewport width, the grid stacks to a single column.

- [ ] **Step 4: Commit**

```bash
cd ~/clementchenco
git add themes/not-much/layouts/_partials/home/focus-areas.html themes/not-much/layouts/home.html
git commit -m "Add focus areas section to homepage redesign"
```

---

### Task 6: Ventures & Investments section

**Files:**
- Create: `themes/not-much/layouts/_partials/home/ventures.html`
- Modify: `themes/not-much/layouts/home.html:6` (add one partial call line)

**Interfaces:**
- Consumes: `site.Params.ventures` (array of
  `{number, name, tags, url}`, from Task 1; `url` may be `""`).
- Produces: renders `<section class="ventures">`.

- [ ] **Step 1: Create the ventures partial**

Create `themes/not-much/layouts/_partials/home/ventures.html`:

```go-html-template
{{- with site.Params.ventures }}
<section class="ventures">
  <div class="ventures-header">
    <h2 class="ventures-heading">Ventures &amp; Investments<span class="ventures-count">({{ len . }})</span></h2>
    <p class="ventures-description">Things I'm building and backing</p>
  </div>
  <div class="ventures-list">
    {{- range . }}
    <div class="venture-row">
      <h3 class="venture-name">
        {{- if .url }}<a href="{{ .url }}" target="_blank" rel="noopener noreferrer">{{ .name }}</a>{{- else }}{{ .name }}{{- end }}
      </h3>
      <span class="venture-tags">{{ .tags }}</span>
      <span class="venture-number">/{{ .number }}</span>
    </div>
    {{- end }}
  </div>
</section>
{{- end }}
```

- [ ] **Step 2: Wire it into `home.html`**

Replace the full contents of `themes/not-much/layouts/home.html` with:

```go-html-template
{{ define "main" }}
<div class="container-wide pt-5">
  {{ partial "menu.html" (dict "menuID" "main" "page" .) }}
  {{ partial "home/hero.html" . }}
  {{ partial "home/intro.html" . }}
  {{ partial "home/focus-areas.html" . }}
  {{ partial "home/ventures.html" . }}
</div>
{{ end }}
```

- [ ] **Step 3: Verify**

Run: `cd ~/clementchenco && hugo --quiet`
Expected: exits 0, no errors.

Reload `http://localhost:1313/`. Expected: a "Ventures & Investments (3)"
heading with "Things I'm building and backing" beside it, then three big
numbered rows — Satelyx (clickable, opens satelyx.com in a new tab), Gray
Label (plain text, no link), SPIN (plain text, no link) — each with tags
and a `/01` `/02` `/03` index, separated by horizontal rules.

- [ ] **Step 4: Commit**

```bash
cd ~/clementchenco
git add themes/not-much/layouts/_partials/home/ventures.html themes/not-much/layouts/home.html
git commit -m "Add ventures & investments section to homepage redesign"
```

---

### Task 7: Closing CTA section (final composition)

**Files:**
- Create: `themes/not-much/layouts/_partials/home/cta.html`
- Modify: `themes/not-much/layouts/home.html:7` (add one partial call line
  — this completes `home.html`)

**Interfaces:**
- Consumes: `site.Params.email` (string, from Task 1).
- Produces: renders `<section class="closing-cta">`. Final task — no
  further consumers.

- [ ] **Step 1: Create the closing CTA partial**

Create `themes/not-much/layouts/_partials/home/cta.html`:

```go-html-template
<section class="closing-cta">
  <h2 class="closing-cta-title">Let's talk about a venture, investment, or idea</h2>
  {{- with site.Params.email }}
  <a class="btn-pill" href="mailto:{{ . }}">Get in touch<span class="btn-pill-dot"></span></a>
  {{- end }}
</section>
```

- [ ] **Step 2: Wire it into `home.html` (final state)**

Replace the full contents of `themes/not-much/layouts/home.html` with:

```go-html-template
{{ define "main" }}
<div class="container-wide pt-5">
  {{ partial "menu.html" (dict "menuID" "main" "page" .) }}
  {{ partial "home/hero.html" . }}
  {{ partial "home/intro.html" . }}
  {{ partial "home/focus-areas.html" . }}
  {{ partial "home/ventures.html" . }}
  {{ partial "home/cta.html" . }}
</div>
{{ end }}
```

- [ ] **Step 3: Verify**

Run: `cd ~/clementchenco && hugo --quiet`
Expected: exits 0, no errors.

Reload `http://localhost:1313/`. Expected: below Ventures & Investments, a
large "Let's talk about a venture, investment, or idea" heading with a
"Get in touch" pill button beneath it, then the existing footer.

- [ ] **Step 4: Commit**

```bash
cd ~/clementchenco
git add themes/not-much/layouts/_partials/home/cta.html themes/not-much/layouts/home.html
git commit -m "Add closing CTA section, completing homepage redesign composition"
```

---

### Task 8: Cross-viewport and dark-mode QA pass

**Files:** None (verification only; fix-forward edits to files from Tasks
1-7 if issues are found, using the same files/classes already defined
above — no new files or classes).

**Interfaces:** None — this task consumes the fully composed homepage from
Task 7 and produces no new interfaces.

- [ ] **Step 1: Desktop, light mode**

In the browser preview, set viewport to desktop size, `colorScheme: light`,
reload `http://localhost:1313/`. Take a screenshot. Confirm: hero title
huge and readable, intro/socials side-by-side, focus-areas in 3 columns,
ventures rows legible with visible dividers, closing CTA readable, no
horizontal overflow/scrollbar.

- [ ] **Step 2: Desktop, dark mode**

Set `colorScheme: dark`, reload. Take a screenshot. Confirm: background
and text colors invert correctly (all new sections use `--bg-color` /
`--font-color` / `--primary` / `--bg-variant`, no hardcoded colors), pill
buttons still contrast against the page background, links still legible.

- [ ] **Step 3: Mobile viewport**

Resize to the mobile preset (375x812), reload. Take a screenshot. Confirm:
hero subtitle stacks below the title, intro/socials stack vertically,
focus-areas grid collapses to a single column, venture rows wrap cleanly,
nav hamburger still visible and functional (unaffected by this change —
menu.html itself wasn't modified).

- [ ] **Step 4: Confirm About/Posts pages are otherwise unaffected**

Navigate to `http://localhost:1313/about/` and
`http://localhost:1313/posts/`. Take screenshots. Confirm both still use
the narrow 720px reading-width container and unchanged page styling —
`.container` (not `.container-wide`) still governs them, and `home.css`
classes don't leak in. The one expected change on these pages is the
footer, which now shows the "LinkedIn · Substack" socials line (added
intentionally in Task 4, Step 3) — confirm that renders correctly there
too.

- [ ] **Step 5: Fix forward if needed, then final commit**

If any issue is found, fix it directly in the relevant file from Tasks
1-7 (e.g. a `home.css` rule, a partial's markup) and re-verify the
specific viewport/mode that showed the problem. If changes were made:

```bash
cd ~/clementchenco
git add -A
git status
git commit -m "Polish homepage redesign after cross-viewport QA"
```

If no changes were needed, no commit is required for this task.
