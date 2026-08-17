# Action Plan — clementchen.co SEO

Prioritized fixes from `FULL-AUDIT-REPORT.md`. Grouped by what's safe to do now vs. what needs your input first.

## Blocking — needs your decision, not a fix
- [ ] **Remove `noindex` when ready to launch.** Everything below is inert until this flips. Not doing this now — just flagging it's the actual gate.

## Implementing now (mechanical, no content/voice decisions required)
- [ ] Add per-page `meta description` (also drives a trimmed `og:description`)
- [ ] Add sitewide default `og:image` using the hero photo
- [ ] Add Twitter Card tags (`summary_large_image`)
- [ ] Add `Person` + `WebSite` JSON-LD schema
- [ ] Add `robots.txt` (points at sitemap, sets an explicit AI-crawler policy)
- [ ] Add RSS discovery `<link>` tag
- [ ] Add canonical `<link>` tag
- [ ] Fix "digital asset" → "digital assets" on the homepage subtitle
- [ ] Link "By Clement Chen" byline on posts to `/about/`

## Your call — content/voice decisions
- [ ] Rewrite title tags to be more descriptive (home especially — currently just "Clement Chen")
- [ ] Custom favicon matching the Broadsheet identity (currently the theme's default gray circle)
- [ ] De-duplicate the near-identical opening line on Home vs. About
- [ ] Decide on AI-crawler policy specifics in `robots.txt` (allow/disallow GPTBot, ClaudeBot, PerplexityBot, etc.)

## Worth considering, not urgent
- [ ] Talks/press page or section (leverages the IVS2026 photo as an authority signal)
- [ ] Fuller portfolio/investments page beyond the homepage's compact Ventures list

## Re-audit
Once these land, re-run this check (or just ask) to confirm the fixes resolved cleanly and see if anything new surfaced.
