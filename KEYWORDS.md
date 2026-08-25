# Keyword Performance Tracking — clementchen.co

Log of Google Search Console query performance over time, so new post topics
can be chosen based on what's actually matching search intent rather than
guesswork. Append a new dated snapshot each time a fresh GSC export is
shared — don't overwrite old snapshots, since the trend across snapshots is
the useful signal (is a query's position improving? are new queries showing
up?).

## How to update this file
When given a new GSC export (Queries.csv, Pages.csv, Chart.csv, etc.):
1. Add a new `## Snapshot: YYYY-MM-DD` section below, newest last.
2. Record: total clicks/impressions/CTR, top performing queries, and
   queries with impressions but weak position (candidates that are
   topically matched but not yet ranking).
3. Map each notable query to the page it's matching, if identifiable.
4. Add a short "content implication" note — what this suggests for what to
   write next or reinforce.
5. Compare against the prior snapshot: which queries moved up, which are
   new, which dropped off.

---

## Snapshot: 2026-08-26 (week 1 — first data, site went live ~2026-08-19)

Totals: 64 impressions, 2 clicks, ~3% CTR (tiny sample, not yet meaningful on its own).

**Top performing:**
- `clement chen` (branded) — 2 clicks, 6 impr, 33.33% CTR, position 6.17. Branded search converting well from day one.

**Topically relevant, impressions but 0 clicks, position 50+ (not ranking yet, but matched):**
- `spacecraft bus` — 5 impr, pos 50.2 → matches `/blog/space/flight-proven-spacecraft-bus-middle-ground/`
- `space debris removal service market` — 5 impr, pos 70 → matches `/blog/space/space-debris-disposal-governance-gap/`
- `satellite orchestration system` / `satellite service orchestration` — pos 51 / 66 → matches `/blog/space/orbital-capability-orchestration-not-ownership/`
- `mobile access structure` — pos 79.5
- `skylab littering fine` — pos 68.5
- `satelyx` (secondary branded) — 1 impr, pos 6

**Read:** Google is already matching the right topical intent to these posts at one week old — the query-to-post mapping above is coherent, not random long-tail noise. Ranking is capped by domain authority/freshness, not topic mismatch.

**Content implication:** These clusters (spacecraft bus / subsystems, debris removal & governance, orbital/satellite orchestration) are validated as query-matchable. Worth deepening these same clusters with more posts rather than branching into unrelated topics — the domain is already being associated with them.

---

---

## Actions taken

### 2026-08-26 — optimized `/blog/space/space-debris-disposal-governance-gap/`
Chosen because it's the highest-impression blog post in the first snapshot (14 impr) and its query match (`space debris removal service market`) was clear. Followed the SEO skill's `seo-article` process (ran `article_seo.py` against the live page for TF-IDF + LSI extraction) rather than guessing at placement.

- Rewrote meta `description` to include "space debris removal market" naturally (was accurate to the content already — DIU/SDA procuring the capability *is* a market forming).
- Enriched the DIU/SDA paragraph with "three space debris removal companies" and "space debris removal service market" — exact target phrase, used once, in a sentence that's factually true to the story (not inserted for its own sake).
- Added `space debris removal market` as a tag.
- Deliberately did **not** try to work in `skylab littering fine` — different historical event (1979 Skylab reentry), not covered by this post. Forcing it in would trade accuracy for a keyword match. Better suited to its own short post later.
- Keyword density check: "debris removal" family appears ~3x across ~1,100 words (~0.3%), well inside the 1-3% natural range — not stuffed.
- Verified in browser: reads naturally, no regressions.

Re-check this post's position for `space debris removal service market` in the next GSC snapshot to see if the change had any effect (won't be conclusive on its own — domain-authority ramp is still the bigger factor at this stage).

### 2026-08-26 — optimized `/blog/space/flight-proven-spacecraft-bus-middle-ground/`
Second and last post optimized from this snapshot — the only other one with a clean, high-confidence query match: `spacecraft bus` (5 impr) against a post whose title is literally about spacecraft buses, and which has the second-highest impression count (11) in the export. Same script-first process as the debris post.

- Meta `description` now names FleXbus explicitly as "a flight-proven spacecraft bus" (accurate — that's exactly what Blue Canyon says it is).
- Opening paragraph (first ~100 words): "buy a complete bus" → "buy a complete spacecraft bus" — the exact phrase was in the seoTitle already but never in body copy or the lead paragraph, which is the actual on-page-SEO gap the article_seo.py script surfaced.
- FleXbus intro paragraph: "flight-proven subsystem foundation" → "flight-proven spacecraft bus foundation" — also just a clearer/more accurate description for readers unfamiliar with the jargon, not SEO-only.
- Tags already had good LSI coverage ("flight-proven spacecraft bus", "modular satellite bus", etc.) — no change needed.
- Density check: "spacecraft bus" appears 4x across ~1,350 words of article body (~0.3%) — natural, not stuffed.
- Aside, not acted on: the script flagged the `<title>` tag as 71 chars (SERP truncation risk at ~60). This is a site-wide template pattern (`Site.Title | seoTitle`), not specific to this post — flagging for awareness, not fixing unilaterally since it'd affect every post's title format, a call for the owner.

Stopped here — every other post in the current GSC export only has 1-3 impressions per query, not enough signal to know if a match is real or noise. Wait for the next snapshot before expanding further.

## Next update
Add the next GSC snapshot here — recommend waiting ~3-4 weeks so there's enough data to see real position movement, not just sample noise.
