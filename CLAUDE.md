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

### Gotcha: the nav must not be wrapped in an extra `mt-5` div

`home.html` puts the menu partial directly inside `<div class="shell pt-5">`
with no extra wrapper. Every other top-level template (`list.html`,
`single.html`, `taxonomy.html`, `term.html`, `categories/taxonomy.html`,
`about/list.html`) used to wrap it in an additional
`<div class="mt-5 pt-5">`, which pushed the nav noticeably lower than on
the home page (fixed 2026-09-03 — that wrapper was removed everywhere so
all six templates now call the menu partial the same way home.html does).
If a new template's nav looks vertically offset from home, check for this
wrapper before assuming it's a CSS problem.

### Profile card component (About page)

`themes/not-much/layouts/_partials/profile-card.html` +
`themes/not-much/assets/css/profile-card.css` +
`static/js/profile-card.js` are a hand-ported vanilla JS/CSS version of
React Bits' ProfileCard (pointer-tilt + holographic shine), recolored to
the broadsheet palette. There's no React/bundler in this Hugo stack, so
don't try to drop in a React Bits component's JSX directly — port the
CSS custom properties and pointer-math to plain JS/CSS the way this one
was. It sits next to the About page's intro text via `.about-layout`
(flex row past 1100px, stacked below that) — `--about-gap` is the single
source of truth for both the text-to-divider and divider-to-card gaps,
so change that one variable rather than editing padding and gap
separately if the spacing ever needs to move.

Two non-obvious traps if this card (or something like it) gets extended:
- `.pc-card *` sets `pointer-events: none` on every descendant so the
  decorative tilt/shine overlay layers don't eat clicks — any real
  interactive element added inside the card (the Contact link is the
  current example) needs its own explicit `pointer-events: auto` or it
  silently becomes unclickable while still looking normal.
- The site's global `a { color: var(--primary-variant) !important;
  text-decoration: underline !important; }` (main.css) beats any
  non-`!important` author override on an `<a>`, regardless of selector
  specificity. Any anchor that needs a different color/underline than
  the site default (like `.pc-contact-btn`) has to mark those
  declarations `!important` too, in both the base and `:hover` rules.

### Gotcha: don't default to the "N things happened this week, here's the one lesson" opener

Audited 2026-09-08: 14 of 26 real analysis posts (54%, scoped to `space/` +
`deeptech/`, excluding the short `mentioned/` announcement blurbs) open by
enumerating multiple news items inside a time window ("this week," "this
August") and forcing them into a single reconciled lesson — e.g. "Two
stories landed this week that, on the surface, have nothing to do with
each other... Read together, they make the same point." Nothing here
previously told a session not to do this, so it became the reflexive
default across separate content-generation sessions rather than an earned
editorial call each time. The other 12 posts open on a single concrete
fact or number, which reads stronger and is the pattern to default to.

When drafting a new post:
1. Default to opening on a single concrete fact or number from the most
   interesting story, not a roundup framing.
2. Only reach for a multi-item structure when the connection between
   items is genuinely non-obvious, not because there happen to be several
   news items to cover that week.
3. Avoid these exact phrase-slots even when the multi-item structure is
   earned: "on the surface," "read together / read separately," "same
   underlying [X]," "identical argument," "same lesson," "same process."
4. Don't force the resolution toward sameness. If comparing multiple
   items, it's fine for the honest conclusion to be that they're
   different bets, not the same one in disguise — see
   `deeptech/how-to-read-a-deeptech-funding-round.md` ("three different
   stories") for the healthy version of this device, versus
   `space/orbit-is-getting-more-crowded-and-more-volatile.md` for the
   forced-sameness pattern to not repeat verbatim.

Remediated 2026-09-08: 16 existing posts were rewritten to fix this
pattern (both in openers and instances buried in body text that only
turned up on a full re-read), verified against a clean `hugo --gc` build
afterward. Treat this as a standing check for every new post, not just
historical cleanup — the pattern will keep recurring on its own otherwise.

### Style checklist verified 2026-09-08 (apply to every new post)

A full pass against Clement's writing-style guide, beyond just the opener
pattern above, checked and fixed:

- **Banned AI vocabulary**: delve, crucial, pivotal, landscape (as an
  abstract noun), tapestry, testament, underscore/highlight (as verbs
  meaning "show"), showcase, foster, cultivate, robust, seamless,
  innovative, vibrant, intricate, interplay, garner, align with, enhance.
  Grep-verified clean across every post as of this date — keep it that way
  rather than letting it drift back in.
- **No hype language**: "unlock," "the next X," "game-changer,"
  "revolutionary," "disrupt" as a bare verb. Found and fixed two real
  instances, one in body prose and one in a search-facing `seoTitle` —
  frontmatter fields are exactly as subject to this rule as body prose,
  since `seoTitle`/`description` are what a reader sees in Google results.
- **Em dashes / curly quotes**: zero tolerance in Clement's own prose. The
  one exception found was inside a direct quote from a named source
  (a CEO's own words) — never edit a quote's wording or punctuation to
  match house style, even for something as small as an em dash.
- **Risk stated plainly, proof over adjective, hedged predictions**:
  already strong, consistent defaults across this corpus (heavy use of
  "What to watch" sections, explicit "hasn't been independently verified"
  framing). Don't lose these chasing the checks above.

Full guide: Clement's writing-style reference is maintained as a memory
file (`writing-style`), read automatically at the start of any session.
This file's entries are the project-specific instances of it — if the two
ever diverge, the memory file is the source of truth.

### Gotcha: fixing the opener phrase-slots does not fix whole-article comparison structure

Found later the same day (2026-09-08), running two mock drafts through the
fixed pipeline: even with a clean opener and zero banned phrase-slots, a
draft can still default to organizing the *entire piece* around comparing
2-3 items from the brief, because that's a compositional habit decided at
story-selection time, not a phrase-level tic. Confirmed against the live
repo, not hypothetically: all 5 of the most recently published posts at
that point used comparison as their primary skeleton. Comparison itself
isn't banned — plenty of it is genuinely earned — but an unnoticed run of
it is the actual problem, and a forced comparison is worse than a post
that runs short of the word-count target.

The full mechanics (three-mode `DECIDE POST COUNT`, the pre-draft
falsifiable-claim check, the evidence-not-company rule, the last-5-posts
structural-variety audit, and the closing peer-analyst gate with its
`status: failed-review` outcome) live in
`.claude/skills/staging-blog-drafts/SKILL.md` and in the two cloud routine
prompts (deeptech blog + SATELYX daily brief) — not duplicated here.
Read that skill file before staging any post; it's the actual
implementation, this note is just the pointer and the reason it exists.

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
