# SEO + Content Audit — clementchen.co (non-blog-post surfaces)

**Scope:** Home, About, nav/footer, and site-wide technical SEO (head tags, schema, robots/sitemap, favicon). Blog *posts* were explicitly excluded per request — this looks only at the pages and infrastructure around them.

**Method:** Ran a real production build (`hugo --minify`) and inspected the generated HTML/XML directly, rather than fetching the live site — the site isn't deployed with `noindex` off yet, so a live crawl would just confirm what a source-level check already shows more precisely. Confidence is `Confirmed` for anything below unless marked otherwise; nothing here is a guess.

---

## Critical

### 🔴 [P0] `noindex, nofollow` is on sitewide
- **Evidence:** every generated page includes `<meta name="robots" content="noindex, nofollow">`, driven by `params.noindex = true` in `hugo.toml`.
- **Impact:** nothing on the site can be indexed by any search engine while this is on. Everything else in this report is moot until it's flipped.
- **Note:** this looks intentional — per earlier project notes, it was turned on deliberately until the content felt launch-ready. Flagging it here as the literal blocker, not as something to change unilaterally. Confirm when you're ready and I'll remove it.

---

## High priority

### 🔴 [P1] No `<meta name="description">` anywhere
- **Evidence:** checked the generated `<head>` for `/`, `/about/`, and `/blog/` — none contain a `meta name="description"` tag. Only `og:description` exists (Open Graph, a different tag), and it's populated inconsistently (see next finding).
- **Impact:** this is the single biggest lever for how the site's snippet looks in Google search results. Without it, Google writes its own snippet by grabbing text from the page — usually the nav or the first paragraph it finds, which for `/blog/` would currently be empty since that page has no body copy at all.
- **Fix:** add a real `meta description`, per page, 150–160 characters, written for the searcher rather than pulled from body copy. Home and About need distinct ones — right now they'd say almost the same thing.

### 🔴 [P1] `og:description` on About is 731 characters — the entire page dumped in
- **Evidence:** Hugo's built-in Open Graph partial defaults to using `.Summary`/`.Content` when no explicit description param is set. On About, that means the *entire* bio (all four paragraphs, ~730 characters, newlines and all) gets stuffed into `og:description`.
- **Impact:** LinkedIn and Twitter/X truncate previews around 150–200 characters, so shared links currently cut off mid-sentence. Reads as unpolished exactly where first impressions matter — a link shared from a personal site is often the first thing a prospective co-investor or partner sees.
- **Fix:** set an explicit, short `description` param per page (this also fixes the meta-description gap above in one move — one field can drive both tags).

### 🔴 [P1] No `og:image` on any page
- **Evidence:** `og:url`, `og:site_name`, `og:title`, `og:description`, `og:locale`, `og:type` are present; `og:image` is not, on any page checked.
- **Impact:** every link to the site shared on LinkedIn, Twitter/X, Slack, or iMessage renders as a bare text card with no visual. The site now has a strong asset for this — the IVS2026 hero photo — that isn't being used here at all.
- **Fix:** set a site-wide default `og:image` (the hero photo works well — it's wide, high-contrast, and already has the name treatment on the home page). Blog posts can override per-post later if you add post-specific art.

### 🔴 [P1] No Twitter Card tags at all
- **Evidence:** no `twitter:card`, `twitter:title`, `twitter:image`, etc. anywhere in the generated head.
- **Impact:** Twitter/X falls back to whatever Open Graph tags exist, which — combined with the missing `og:image` above — means shares on X currently render as a plain link with no preview at all.
- **Fix:** add `twitter:card=summary_large_image` plus title/description/image, once `og:image` exists.

### ⚠️ [P1] No structured data (JSON-LD) anywhere
- **Evidence:** zero `<script type="application/ld+json">` blocks on any page.
- **Impact:** this is the concrete "type of content to add" answer to your second question. A `Person` schema for Clement — name, job title, employer, and a `sameAs` array linking to LinkedIn, Twitter, and Substack — is what lets Google (and increasingly, AI answer engines) connect "Clement Chen" the search query to a specific, verifiable entity rather than guessing from prose. This is one of the highest-leverage things a personal site can do for E-E-A-T, and it's pure markup — no new visible content required.
- **Fix:** add `Person` schema (home or About) and `WebSite` schema (sitewide). Templates for both exist in the SEO skill's schema library if useful as a starting point.

---

## Medium priority

### ⚠️ [P2] No `robots.txt`
- **Evidence:** `hugo --minify` produces no `robots.txt` in the output; `enableRobotsTXT` isn't set in `hugo.toml` and no static file exists.
- **Impact:** low urgency while `noindex` is on, but two things worth having ready before launch: a pointer to `sitemap.xml` (which *is* generated correctly — verified, 12 URLs, all present), and an explicit policy on AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.) — worth deciding deliberately rather than defaulting to "unset."
- **Fix:** generate one via `enableRobotsTXT = true` + a template, or a static file.

### ⚠️ [P2] Generic/default favicon
- **Evidence:** `themes/not-much/static/favicon.ico` is a plain gray circle — the theme's stock placeholder, 48×48, unrelated to the site's identity.
- **Impact:** shows up in every browser tab, bookmark, and (for some queries) the search results favicon slot. With the Broadsheet redesign now in place, this is the one remaining piece of visual identity still on defaults.
- **Fix:** simple mark in signal red / ink — even just "CC" in Space Grotesk on a paper or ink ground would match the system already built.

### ⚠️ [P2] No canonical URL tag
- **Evidence:** no `<link rel="canonical">` on any checked page.
- **Impact:** minor on a site this size with no duplicate-content risk today, but cheap to add and protects against future issues (query params, trailing-slash variants, etc. all resolving as separate URLs in Google's eyes).
- **Fix:** one line in the head partial: `<link rel="canonical" href="{{ .Permalink }}">`.

### ℹ️ [P2] RSS feed exists but isn't discoverable
- **Evidence:** Hugo generates `index.xml` for home, About, and the blog section (confirmed in build output), but no `<link rel="alternate" type="application/rss+xml">` tag advertises it anywhere in the head.
- **Impact:** feed readers and some AI/search tooling look for that link tag to find a feed automatically. Right now the feed only works if someone already knows the URL.
- **Fix:** one line in the head partial per Hugo's standard `alternative_outputs` pattern.

### ℹ️ [P2] Title tags are generic
- **Evidence:** Home = `Clement Chen`. About = `Clement Chen | About`. Blog = `Clement Chen | Blog`.
- **Impact:** not wrong, but a missed opportunity — none of them mention what the site is actually about. A search for "Clement Chen venture builder" or "Clement Chen Satelyx" currently has nothing in the title tag to match against.
- **Fix:** home could read `Clement Chen — Venture Builder & Investor in Deep Tech and Space` (or similar, your call on phrasing); About and Blog can stay closer to as-is since they're less likely to be a search entry point.

---

## Content quality (E-E-A-T) — humanizer + substance pass

Read the actual copy on Home and About against both the SEO content-quality checklist and a pass for AI-writing tells. Short version: **this is already good, human-sounding copy.** Specific findings:

- **No AI-writing patterns found.** No testament/legacy language, no rule-of-three padding, no "boasts/showcases/vibrant" filler, no vague "experts say" attributions, no hedging. The About page in particular reads like it was actually written by the person it's about — specific numbers ("300+ opportunities," "50+ portfolio investments"), a named school and named prior fund, and a genuinely unusual, hard-to-fabricate credential ("Taiwan CFA Research Challenge champion") that a generic bio generator wouldn't produce.
- **This is also good E-E-A-T evidence** in Google's terms — real, checkable specifics (named employer, named fund, named school) are exactly what "Experience" and "Expertise" signals are made of. Nothing to rewrite here; the fix is technical (get this content properly *described* to search engines via the tags above), not the writing itself.
- **One small, genuine copy issue, unrelated to AI-pattern detection:** the hero subtitle reads "Venture builder and investor in Deep Tech, Infrastructure & **digital asset**." — should be "digital **assets**" (also used correctly elsewhere, e.g. the About page and Focus Areas). Minor, but it's the second line on the homepage.
- **Home and About currently open with near-identical sentences** ("venture builder and investor... deep tech, infrastructure, digital assets" appears, almost verbatim, in both places). Not an AI tell, just a little redundant for anyone who reads both pages back to back — worth knowing, not urgent to fix.

---

## What's already working (keep doing this)

- Focus Areas and Ventures sections are specific and keyword-relevant without reading like keyword stuffing — "sovereign space infrastructure," "flight-proven," "digital assets" are terms someone actually searching for this space would use.
- `sitemap.xml` is correct and complete — all 12 real URLs present, no orphans, no junk.
- Blog post URLs are clean and descriptive (`/blog/editorial/sovereign-space-flight-heritage-vleo/`), which is good for both SEO and just being a readable link to share.
- The About page's specificity (named employer, named school, real numbers) is exactly the kind of content that's hard for competitors or AI-generated bios to replicate — that's a real moat, not just SEO decoration.

---

## Content to consider adding (your second question)

Beyond the technical fixes above, a few content types would genuinely extend the site's SEO/authority footprint — not urgent, but worth having on the list:

1. **`Person` schema** (see P1 above) — the highest-leverage single addition, and it's markup, not new writing.
2. **A talks/press page or section.** You now have a real, striking photo from IVS2026 — that's evidence of public speaking/industry standing that currently isn't referenced anywhere in text. Even a short list ("IVS 2026 — [talk title]") would give search engines (and human visitors) a concrete signal of external recognition, and gives the photo somewhere to live beyond the hero.
3. **A slightly fuller portfolio/investments page**, if you want it — the current Ventures list is intentionally compact for the homepage, but a dedicated page with a sentence or two per company (why it's interesting, your role, stage) would be genuinely indexable content that also ranks for company-name searches ("Clement Chen Satelyx," "Clement Chen Gray Label").
4. **Author bylines linked from blog posts to About.** Right now each post says "By Clement Chen" as plain text with no link. A link (or `author` schema referencing the `Person` entity) closes the loop between "who wrote this" and the credentialed bio — small, but it's free E-E-A-T.

None of these require changing the site's voice or scope — they're extensions of what's already there.
