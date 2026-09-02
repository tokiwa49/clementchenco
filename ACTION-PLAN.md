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
