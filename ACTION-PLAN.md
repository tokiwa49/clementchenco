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

## Current focus — first-week GSC read (2026-08-26)
Site is ~1 week old: 64 impressions, 2 clicks total. This is normal for a brand-new domain, not a content or technical problem — see conversation for full read. Non-branded queries (spacecraft bus, satellite orchestration, etc.) are matching the right topics already but ranking page 5–9+ because the domain has no authority/backlink history yet.

- [ ] Link clementchen.co from Satelyx's own site/bio, LinkedIn featured section, and X bio
- [ ] Get the Plug & Play Japan event post linked from Satelyx's own announcement/socials (easy relevant backlink)
- [ ] Request indexing via GSC URL Inspection right after each new post publishes
- [ ] Keep publishing cadence — domain authority + fresh content is what closes the ranking gap over the next 4–8 weeks
- [ ] Once there are enough posts, add internal links between related space posts (topic-cluster style)

## Worth considering, not urgent
- [ ] Talks/press page or section (leverages the IVS2026 photo as an authority signal)
- [ ] Fuller portfolio/investments page beyond the homepage's compact Ventures list

## Re-audit
Re-check GSC in 2-3 weeks once the domain has more crawl/authority history — position for the non-branded queries should start moving if the backlink/indexing steps above happen.
