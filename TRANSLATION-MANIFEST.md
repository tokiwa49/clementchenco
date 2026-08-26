# Translation Manifest

This file indexes every Traditional Chinese (zh-TW) and Japanese (ja) translation of clementchen.co's English content. It exists as a single-file overview — for any individual translated file, the same source↔target mapping is also self-declared in that file's own front matter via a `translatedFrom` field (e.g. `translatedFrom: "content/blog/space/rocket-reusability-runs-on-iteration.md"`), so no file requires this manifest to be understood on its own.

File-naming convention: every translated file sits next to its English source with a language suffix — `foo.md` (English, default) → `foo.zh-tw.md` / `foo.ja.md`. Slugs are identical across all three languages by design.

**Scope note:** this manifest covers page *content* only. It does not cover the `not-much` theme's hardcoded UI chrome (nav labels, "Previous/Next," etc.), and no Hugo `hugo.toml` multilingual configuration or template `i18n` wiring has been done — the translated files exist on disk but are not yet routed/reachable on the live site. That's separate follow-up work.

| # | Source (EN) | Title | zh-TW | ja |
|---|---|---|---|---|
| 1 | `content/_index.md` | Homepage | `content/_index.zh-tw.md` | `content/_index.ja.md` |
| 2 | `content/about/_index.md` | About | `content/about/_index.zh-tw.md` | `content/about/_index.ja.md` |
| 3 | `content/blog/_index.md` | Blog (index) | `content/blog/_index.zh-tw.md` | `content/blog/_index.ja.md` |
| 4 | `content/blog/mentioned/ivs2026-bnext-trends.md` | Bnext's IVS2026 Trends Report Cites Satelyx Among Global Finalists | `content/blog/mentioned/ivs2026-bnext-trends.zh-tw.md` | `content/blog/mentioned/ivs2026-bnext-trends.ja.md` |
| 5 | `content/blog/mentioned/ivs2026-kepple-report.md` | IVS2026 Event Report Features Satelyx's Orbital Validation Pitch | `content/blog/mentioned/ivs2026-kepple-report.zh-tw.md` | `content/blog/mentioned/ivs2026-kepple-report.ja.md` |
| 6 | `content/blog/mentioned/ivs2026-launchpad-finalist.md` | Satelyx Named a LAUNCHPAD Finalist at IVS2026 | `content/blog/mentioned/ivs2026-launchpad-finalist.zh-tw.md` | `content/blog/mentioned/ivs2026-launchpad-finalist.ja.md` |
| 7 | `content/blog/mentioned/ivs2026-recap.md` | IVS2026 Wraps in Kyoto: 13,000 Attendees, Space Quarters Takes LAUNCHPAD | `content/blog/mentioned/ivs2026-recap.zh-tw.md` | `content/blog/mentioned/ivs2026-recap.ja.md` |
| 8 | `content/blog/mentioned/plugandplay-new-space-business-2026.md` | Satelyx to Present at Plug and Play Japan's New Space Business Event | `content/blog/mentioned/plugandplay-new-space-business-2026.zh-tw.md` | `content/blog/mentioned/plugandplay-new-space-business-2026.ja.md` |
| 9 | `content/blog/space/flight-proven-spacecraft-bus-middle-ground.md` | Space Doesn't Need You to Choose Between Buying a Satellite and Building One | `content/blog/space/flight-proven-spacecraft-bus-middle-ground.zh-tw.md` | `content/blog/space/flight-proven-spacecraft-bus-middle-ground.ja.md` |
| 10 | `content/blog/space/orbit-access-is-not-mission-capability.md` | Orbit Access Isn't the Same as Mission Capability | `content/blog/space/orbit-access-is-not-mission-capability.zh-tw.md` | `content/blog/space/orbit-access-is-not-mission-capability.ja.md` |
| 11 | `content/blog/space/orbital-capability-orchestration-not-ownership.md` | The Space Industry Is Swapping Satellite Ownership for Orchestration | `content/blog/space/orbital-capability-orchestration-not-ownership.zh-tw.md` | `content/blog/space/orbital-capability-orchestration-not-ownership.ja.md` |
| 12 | `content/blog/space/power-propulsion-orbital-compute-subsystem-bottleneck.md` | The Subsystem Bottleneck: Power, Propulsion, and the End of Bespoke Spacecraft | `content/blog/space/power-propulsion-orbital-compute-subsystem-bottleneck.zh-tw.md` | `content/blog/space/power-propulsion-orbital-compute-subsystem-bottleneck.ja.md` |
| 13 | `content/blog/space/prove-once-deploy-everywhere-flight-evidence.md` | Prove Once, Deploy Everywhere: Flight Evidence Is Becoming Space's New Currency | `content/blog/space/prove-once-deploy-everywhere-flight-evidence.zh-tw.md` | `content/blog/space/prove-once-deploy-everywhere-flight-evidence.ja.md` |
| 14 | `content/blog/space/reflect-orbital-vleo-validation-gap.md` | FCC Approval Isn't the Finish Line: What Reflect Orbital's Backlash Reveals About Space Validation | `content/blog/space/reflect-orbital-vleo-validation-gap.zh-tw.md` | `content/blog/space/reflect-orbital-vleo-validation-gap.ja.md` |
| 15 | `content/blog/space/rideshare-hosted-payloads-access-layer.md` | The Launch-Access Layer Is Becoming Its Own Business | `content/blog/space/rideshare-hosted-payloads-access-layer.zh-tw.md` | `content/blog/space/rideshare-hosted-payloads-access-layer.ja.md` |
| 16 | `content/blog/space/rocket-reusability-runs-on-iteration.md` | Reusable Rockets Don't Prove Themselves in One Flight, They Prove It in the Next One | `content/blog/space/rocket-reusability-runs-on-iteration.zh-tw.md` | `content/blog/space/rocket-reusability-runs-on-iteration.ja.md` |
| 17 | `content/blog/space/sovereign-space-flight-heritage-vleo.md` | The €15.6B Signal: Why Sovereign Space Programs Are Now Buying Flight Heritage, Not Just Satellites | `content/blog/space/sovereign-space-flight-heritage-vleo.zh-tw.md` | `content/blog/space/sovereign-space-flight-heritage-vleo.ja.md` |
| 18 | `content/blog/space/space-companies-assembling-not-inventing.md` | Nobody's Building From Scratch Anymore: Three Ways Space Companies Are Assembling Instead of Inventing | `content/blog/space/space-companies-assembling-not-inventing.zh-tw.md` | `content/blog/space/space-companies-assembling-not-inventing.ja.md` |
| 19 | `content/blog/space/space-debris-disposal-governance-gap.md` | Space Is Building Disposal Capability Faster Than It's Building Disposal Rules | `content/blog/space/space-debris-disposal-governance-gap.zh-tw.md` | `content/blog/space/space-debris-disposal-governance-gap.ja.md` |
| 20 | `content/blog/space/space-validation-is-becoming-the-price-of-entry.md` | Space Validation Is Becoming the Price of Entry | `content/blog/space/space-validation-is-becoming-the-price-of-entry.zh-tw.md` | `content/blog/space/space-validation-is-becoming-the-price-of-entry.ja.md` |
| 21 | `content/blog/space/standardization-eo-satellite-market-shift.md` | Standardization Is Winning: What the Earth-Observation Boom Says About Where Space Is Headed | `content/blog/space/standardization-eo-satellite-market-shift.zh-tw.md` | `content/blog/space/standardization-eo-satellite-market-shift.ja.md` |
| 22 | `content/blog/startups/vibe-coding-a-revenue-generating-app-nine-months-later.md` | Vibe Coding a Revenue-Generating App Got Easier. Keeping It Yours Didn't. | `content/blog/startups/vibe-coding-a-revenue-generating-app-nine-months-later.zh-tw.md` | `content/blog/startups/vibe-coding-a-revenue-generating-app-nine-months-later.ja.md` |

**Totals:** 22 source pages × 2 languages = 44 translated files, all present.

## Translation conventions applied

- **Front matter:** `title`, `seoTitle`, `description` (and `lead` on the homepage) are translated; `date`, `draft`, `author`, `toc`, `categories`, `tags`, `related_posts`, and image paths are copied byte-identical from the English source. `categories`/`tags` stay in English deliberately, so Hugo's per-language taxonomies don't fork.
- **`translatedFrom`:** appended as the last front-matter field on every translated file, pointing at the exact relative path of its English source.
- **Body:** full Markdown structure (headings, `<!--more-->`, links, code spans) preserved untouched; only the human-readable prose is translated. External link URLs are kept as-is; only anchor text is translated.
- **Register:** the `zh-tw` startups post and all `ja` space-category posts use a consistent house register — plain/blog-essay だ・である体 for Japanese analytical posts (not です・ます体), and casual first-person voice for the personal startups narrative, matching how the English originals read.
- **Domain terminology:** space/aerospace terms (VLEO, flight heritage vs. flight-proven, spacecraft bus, etc.) follow industry-standard renderings per language, kept consistent across all 13 `space/` posts.
