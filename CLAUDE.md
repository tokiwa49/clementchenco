## clementchen.co — project context

Personal portfolio + blog site, built with Hugo, deployed to Cloudflare
Workers (static assets), live at https://clementchen.co.

- **Theme:** `not-much` (https://github.com/imgios/not-much), fully vendored
  into `themes/not-much/` as plain files (no submodule) — edit it directly.
- **GitHub repo:** https://github.com/tokiwa49/clementchenco (public).
  Pushing to `main` auto-triggers a Cloudflare deployment.
- **Cloudflare:** deployed as a Worker (not classic Pages) named
  `clementchenco`, using `wrangler.toml` with `[assets] directory = "./public"`.
  Custom domain `clementchen.co` is attached; DNS is on Cloudflare.
- **`noindex` is OFF** (`params.noindex = false` in `hugo.toml`) — the site
  is open to search engines.
- **Google Analytics (gtag.js)** is wired in at the top of `<head>` in
  `themes/not-much/layouts/baseof.html`, measurement ID `G-Q539L36Z59`.

### Gotcha: front matter dates need an explicit timezone

Hugo silently excludes future-dated content from the build with no error.
A bare `date: 2026-08-12` (no timezone) parses as UTC midnight, which can
be "in the future" relative to build time depending on local/build-server
clock offset — this caused the About page to vanish from every build
(local and Cloudflare CI) for a long debugging session. Always write dates
with an explicit offset, e.g. `date: 2026-08-12T00:00:00+08:00`, or use
`hugo new` to auto-generate a correctly-formatted date.

### Day-to-day workflow

1. Edit/add content in `content/` (e.g. `hugo new posts/my-post.md` for a
   new post).
2. Preview locally: `cd ~/clementchenco && hugo server -D`, check
   `localhost:1313`.
3. `git add`, `git commit`, `git push` — Cloudflare auto-builds
   (`hugo --gc --minify`) and deploys within ~1 minute. No dashboard visits
   needed for routine content changes.

### Owner background

Owner is a former quant/trading Python engineer, new to web dev, git, and
the terminal — explain steps clearly and don't assume familiarity with
git/GitHub/Cloudflare concepts.

### Gotcha: the menu-partial wrapper must not carry Bootstrap's `.row` class

Every top-level template wraps `{{ partial "menu.html" ... }}` in
`<div class="mt-5 pt-5">`. Bootstrap's `.row` class applies ~-12px negative
margins meant to offset child `.col` gutters — if it ends up on that
wrapper (`<div class="row mt-5 pt-5">`), the nav-brand ("/C CLEMENT CHEN")
renders ~12px left of where the rest of the page content (breadcrumb, h1)
starts, and it's easy to miss since it looks like a small optical
misalignment rather than a class typo. `taxonomy.html` and `term.html` both
had this bug (fixed 2026-09-03) before a matching correct wrapper existed
elsewhere in the codebase. If a new template's nav looks off by a few
pixels, check this first.

### Gotcha: taxonomies each need their own template if they diverge from tags

`themes/not-much/layouts/taxonomy.html` (the theme's stock template) is
hardcoded to `.Site.Taxonomies.tags` — it's built for the tags A-Z index,
which was the only taxonomy this site had originally. Adding a second
taxonomy (`categories`) without a dedicated `layouts/categories/taxonomy.html`
override caused `/categories/` to silently render all ~100 tags instead of
the 3 real categories — no error, just wrong data. Hugo's template lookup
also has a stale-cache quirk during local dev: after adding the override,
if it doesn't seem to take effect, a forced rebuild (e.g. touch any file
in that template's chain) usually resolves it — it's not a real bug.

### Note: taxonomy/term pages are HTML-only (no per-term RSS)

`hugo.toml` sets `[outputs]` so `taxonomy`/`term` page kinds only emit
HTML — Hugo's default would otherwise generate an RSS feed per tag
(`/tags/<term>/index.xml`, ~106 of them), which nobody subscribes to and
which Google was crawling for zero indexing benefit. `home` and `section`
still emit RSS (the feeds that matter: `/index.xml`, `/blog/index.xml`).
If you add a new taxonomy, it inherits this — don't remove the override
without a reason.

### Design system: the `/` slash motif

The site's recurring visual signature is a signal-red, JetBrains Mono
`/`-prefixed label — used for the nav/footer "/C" mark, breadcrumb
separators, the homepage's venture and focus-area numbers (`/01`, `/02`,
`/03`), and category badges (`/space`, `/mentioned`, rendered by
`_partials/terms.html` — categories only, not tags, since tags are often
multi-word phrases where a bare slash prefix reads awkwardly and the pill
treatment gives them useful visual separation from prose). **When adding
any new UI element that shows a count, index, label, or short identifier,
reach for this treatment first** (`.category-badge`-style: JetBrains Mono,
`var(--primary)`, no decoration, underline on hover) rather than inventing
a new visual language or falling back to a generic Bootstrap badge/pill.

### SEO workflow

Search Console query/page performance is tracked as dated snapshots in
`KEYWORDS.md` (append-only, instructions at the top of that file) —
technical/mechanical fixes and their status live in `ACTION-PLAN.md`.
When asked to look at SEO performance:
1. Pull fresh data from GSC (Performance → Queries and Pages tabs, with
   the Position column enabled) and GA (Traffic acquisition, Landing page)
   rather than relying on a prior snapshot — memory of past numbers goes
   stale fast on a young site.
2. Check GSC's **Indexing → Page indexing → "Why pages aren't indexed"**
   report too, not just Queries/Pages — that's where non-content technical
   issues show up (the RSS crawl-budget issue and the duplicate http/https
   homepage were both found there, not in the query data).
3. Before rewriting a specific page's title/description for CTR, filter
   GSC by that page to see its actual query breakdown first — don't guess
   which phrase to target from the page's topic alone.
4. On-page keyword edits should read as accurate, natural sentences (check
   density stays in the 1-3% range) — never force a phrase into a claim
   the content doesn't actually support.
5. Log the snapshot in `KEYWORDS.md` and any fixes shipped in
   `ACTION-PLAN.md`, in the same format as prior entries, so the trend
   across snapshots stays legible.
