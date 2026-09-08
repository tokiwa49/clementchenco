# Action Plan — clementchen.co SEO

Original mechanical/technical fixes from `FULL-AUDIT-REPORT.md` are all shipped — verified against a fresh `hugo --minify` build on 2026-08-26. Re-scoping this file around GSC performance now that the site is live and indexed.

## Done (verified in generated HTML, 2026-08-26)
- [x] `noindex` removed — site is indexable
- [x] Per-page meta description
- [x] Sitewide `og:image` (hero photo)
- [x] Twitter Card tags (`summary_large_image`)
- [x] `Person` + `WebSite` JSON-LD schema
- [x] `robots.txt` (points at sitemap, allows all crawlers including AI bots)
- [x] RSS discovery `<link>` tag
- [x] Canonical `<link>` tag
- [x] "digital asset" → "digital assets" typo fixed
- [x] "By Clement Chen" byline linked to `/about/` (via site-drawer author link)
- [x] Custom favicon (CC monogram, replaces theme default)
- [x] Homepage `<title>` rewritten from bare "Clement Chen" to "Clement Chen — Venture Builder & Investor in Deep Tech and Space" (via new `seoTitle` front-matter param on `content/_index.md`, wired through `themes/not-much/layouts/_partials/head.html`)

## Current focus — week 3 GSC read (2026-09-03)
Site is ~2 weeks old: 367 impressions, 5 clicks, 1.4% CTR, avg position 36.1. Same read as week 1: topic-matching is working (spacecraft bus, debris removal, orchestration clusters), ranking is still capped by domain authority. Full snapshot with per-query detail in `KEYWORDS.md`.

- [ ] Link clementchen.co from Satelyx's own site/bio, LinkedIn featured section, and X bio
- [ ] Get the Plug & Play Japan event post linked from Satelyx's own announcement/socials (easy relevant backlink)
- [ ] Request indexing via GSC URL Inspection right after each new post publishes
- [ ] Keep publishing cadence — domain authority + fresh content is what closes the ranking gap over the next 4–8 weeks
- [ ] Once there are enough posts, add internal links between related space posts (topic-cluster style)
- [ ] **Owner action needed:** enable Cloudflare dashboard → SSL/TLS → Edge Certificates → "Always Use HTTPS". `http://clementchen.co/` currently returns `200` instead of redirecting, so GSC has indexed the homepage as two separate URLs (http and https), splitting its ranking signal. This is a security-adjacent account setting — not something to fix from the repo/CLI.

## CTR audit — hero post + sitewide (2026-09-08)
Triggered by owner flagging low CTR with `/blog/space/flight-proven-spacecraft-bus-middle-ground/` as the current hero article. Ran the SEO skill's page-audit tooling (`parse_html.py`, `social_meta.py`, `security_headers.py`, `robots_checker.py`) against the live page, then checked whether the findings were page-specific or systemic by scanning all 35 posts' front matter.

**Root cause, sitewide, not just this post: the title template structure is eating the truncation budget.**
`themes/not-much/layouts/_partials/head.html` builds every non-home `<title>` as `"Clement Chen | " + seoTitle` (prefix, ~15 chars). Google's SERP title display truncates around ~60 characters. Checked all 35 posts' `seoTitle`/`title` lengths:
- **26 of 35 posts (74%) exceed 60 chars once the prefix is added** — this hero post included, at 71 chars (`Clement Chen | Flight-Proven Spacecraft Buses Are the New Middle Ground`).
- **34 of 35 would fit under 60 chars if the prefix were removed/reordered** — the headlines themselves are already sized correctly; the brand prefix is what's pushing them over.
- Truncation cuts off the actual hook (the specific, curiosity-driving part of the headline) while the low-information "Clement Chen |" survives, since Google truncates from the end — this is backwards for CTR on a personal blog where branded search already ranks independently (`clement chen` pos 6.4 on its own, per `KEYWORDS.md`).

Also found on this post specifically, both liable to make the SERP/social snippet look cut off or broken:
- Meta `description` is 181 chars (limit ~155-160) — confirmed sitewide too: **9 of 35 posts** exceed 160 chars.
- `og:title`/`twitter:title` both 76 chars against a 60/70-char soft limit (`social_meta.py` score 85/100) — same root cause as the `<title>` issue, since both pull from the same `seoTitle`.
- **No `BlogPosting`/`Article` JSON-LD on individual posts** — `schema.html` only emits sitewide `WebSite` + `Person` schema. No per-article `datePublished`, `author`, or `headline` structured data, which is both an E-E-A-T signal gap and a missed shot at richer SERP presentation (byline/date under the snippet).

Lower-priority, not CTR-related: security headers score 45/100 (missing CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy — a Cloudflare/hosting-level fix, not urgent for a personal blog but cheap to add via Cloudflare's Transform Rules or a `_headers` file). AI crawler policy is fully open (`*` allow, no per-bot rules) — fine as-is, just flagging since GEO visibility depends on it staying open.

### Fixes shipped (2026-09-08)
- [x] Reworked the title template (`themes/not-much/layouts/_partials/head.html`): headline now leads, brand trails (`{{ $pageTitle }} | Clement Chen`), so truncation clips the low-value brand suffix instead of the headline. Home page keeps its own branded title unchanged (`.IsHome` branch untouched). Verified in a clean `hugo --gc --cleanDestinationDir` build and in-browser: hero post's rendered `<title>` is now `Flight-Proven Spacecraft Buses Are the New Middle Ground | Clement Chen`.
- [x] Tightened all 9 over-160-char meta descriptions (hero post, plugandplay, ispark, both ivs2026 recaps, bnext, yorkshire webinar, debris, vibe-coding) to ≤160 chars. Also trimmed one `seoTitle` (vibe-coding post, was 69 chars) that was still too long even brand-suffix-adjusted.
- [x] Added `BlogPosting` JSON-LD to every individual blog post (`themes/not-much/layouts/_partials/schema.html`), scoped to `.IsPage` + `.Section == "blog"`: `headline`, `description`, `datePublished`, `dateModified`, `author`, `publisher`, `image`, `mainEntityOfPage`. All values pulled from existing front matter, no new content required. Previously only `WebSite`/`Person` schema existed, sitewide, nothing per-article.
- [x] Removed em dashes from outward-facing copy per owner request: homepage `seoTitle`/`description` (in both `content/_index.md` and the duplicate fallback in `hugo.toml`), the footer banner's image `alt` text, and 5 more instances across 4 blog posts' body copy/descriptions (ispark, space-hub-yorkshire, sovereign-space-flight-heritage-vleo, space-debris-disposal-governance-gap). Left one em dash untouched: a direct quote from Chiara Manfletti in `space-validation-is-becoming-the-price-of-entry.md` — changing punctuation inside a quotation would misquote her.

### Next
- [ ] Request re-indexing via GSC URL Inspection for every post touched above, then compare CTR at the next snapshot against baseline (1.4% sitewide as of 09-03). This is the first snapshot that will reflect the title/description fix rather than just the domain-authority ramp.
- [ ] Validate the `BlogPosting` schema with Google's Rich Results Test once deployed.
- [ ] Worth considering later: security headers via Cloudflare (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy — score 45/100, not urgent, no CTR/ranking impact for this site profile).

## Done (2026-09-03)
- [x] Category taxonomy fix: `/categories/` was rendering all ~106 tags instead of the site's 3 real categories (generic `layouts/taxonomy.html` is hardcoded to `.Site.Taxonomies.tags`). Added `layouts/categories/taxonomy.html` override + real per-category copy in `content/categories/*/_index.md`, written to naturally include the validated GSC query clusters (spacecraft bus, space debris removal, satellite orchestration).
- [x] Nav-alignment bug on `taxonomy.html`/`term.html`: stray Bootstrap `.row` class on the menu-partial wrapper was shifting the nav ~12px left of the page content. See CLAUDE.md gotcha.
- [x] Crawl-budget fix: Hugo was auto-generating an RSS feed per tag (`/tags/<term>/index.xml`, ~106 of them) — 28 were sitting in GSC's "Crawled - currently not indexed" bucket for no SEO benefit. Restricted `taxonomy`/`term` output formats to HTML-only in `hugo.toml` `[outputs]`; verified with a clean local build (`hugo --gc --cleanDestinationDir`) that the per-term `index.xml` count went from 111 → 0 while `/index.xml` and `/blog/index.xml` still render.
- [x] CTR-gap fix on `/blog/mentioned/plugandplay-new-space-business-2026/` (ranking pos 5.2, 0 clicks) — tightened `seoTitle`/`description`. Checked the page's actual GSC query breakdown first rather than assuming which phrase to target.
- [x] Extended the site's `/` slash motif (signal-red, JetBrains Mono — see CLAUDE.md "Design system") to breadcrumbs, the homepage focus-area numbers, and category badges, for visual consistency.

## Worth considering, not urgent
- [ ] Talks/press page or section (leverages the IVS2026 photo as an authority signal)
- [ ] Fuller portfolio/investments page beyond the homepage's compact Ventures list

## Re-audit
Re-check GSC in 2-3 weeks — position for the non-branded queries should start moving if the backlink/indexing steps above happen, and confirm the HTTP→HTTPS redirect collapsed the duplicate homepage entries once the owner flips the Cloudflare setting.
