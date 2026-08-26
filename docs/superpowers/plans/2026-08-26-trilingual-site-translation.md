# Trilingual Site Translation (Traditional Chinese + Japanese) Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to work this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Note on task type:** this is a content-translation + Hugo-config project, not a code feature with unit tests. Wherever the standard plan template would ask for a failing test, this plan substitutes the real verification step for that task (word-count sanity check, `hugo build` check, or a proofreading re-read) — there is no test suite to write.

**Goal:** Produce complete Traditional Chinese (zh-TW) and Japanese (ja) translations of every content page on clementchen.co, as markdown files that unambiguously self-identify which source page and field each translated block belongs to — so a future AI with zero conversation context can pick up any translated file (or the manifest) and know exactly what it is and where it came from, with no site-integration work bundled in.

**Architecture:** Hugo's native multilingual mode, content-file-suffix style (no directory split). Each existing English file `foo.md` gets two siblings, `foo.zh-tw.md` and `foo.ja.md`, living at the exact same path — this filename convention alone already makes the source/target correspondence unambiguous. On top of that, every translated file carries a one-line HTML-comment header stating its exact source path (invisible in the rendered site, immediately visible to any AI or human opening the raw file), and a single `TRANSLATION-MANIFEST.md` at the project root indexes all of them in one table. Site-chrome UI strings (nav, buttons, labels) hardcoded in the `not-much` theme templates are **out of scope** — this plan is content only, per the owner's direction.

**Tech Stack:** Hugo (static site), `not-much` theme (vendored, editable), Cloudflare Workers deploy. Translation work done via the `trilingual-translator` agent (English ⇄ 日本語 ⇄ 繁體中文), following the multi-stage initial-translation → proofread → refine workflow, informed by the `translation-expertise` and `document-writing` skills for register and formatting conventions per language.

**Spec:** none written separately — this plan doubles as the spec; scope and decisions are recorded in Global Constraints below.

## Global Constraints

- **Language codes:** `zh-tw` (Traditional Chinese, Taiwan) and `ja` (Japanese). English (`en`) stays the default/untouched.
- **File convention:** Hugo suffix style — `content/about/_index.zh-tw.md`, `content/about/_index.ja.md`, sitting next to the existing `content/about/_index.md`. No new top-level language directories.
- **Slugs stay identical across languages.** A translated post keeps the exact same filename/slug as its English source (e.g. `rocket-reusability-runs-on-iteration.zh-tw.md`). This is what lets Hugo's automatic translation-linking and hreflang machinery match language versions of "the same page" with zero extra front matter.
- **Source-identification field (the key change this revision adds):** every translated file gets one extra front-matter key, added as the **last** field so it never disturbs the diff of the translated fields above it:
  ```yaml
  translatedFrom: "content/blog/space/rocket-reusability-runs-on-iteration.md"
  ```
  A front-matter field, not a body comment — guaranteed invisible on the rendered page regardless of Goldmark HTML-rendering settings, and directly machine-parseable (an agent can `grep translatedFrom` across `content/` and get the full source↔target map without needing the manifest at all — the manifest in addition is just a convenience index).
- **Front matter translation rule**, applied to every content file:
  - Translate: `title`, `seoTitle`, `description`, `lead` (homepage only).
  - Do not translate, copy verbatim: `date`, `draft`, `author`, `toc`, `related_posts` (paths), image paths.
  - `categories` / `tags`: **keep the English taxonomy keys as-is** (e.g. `categories: ["space"]` stays `["space"]` in the zh-TW and ja files too), so the same taxonomy isn't silently forked per language.
  - Add `translatedFrom` (see above) as the last field.
- **Body content:** translate the full Markdown body, preserving all Markdown structure (headings, links, `<!--more-->`, code spans, image embeds) untouched — only the prose inside them changes. Inline links to English-only external sources (news articles, etc.) keep their URLs; only the anchor text is translated.
- **Manifest:** a `TRANSLATION-MANIFEST.md` at the project root (built in the final task, once all files exist) tables every triple of (source path, zh-tw path, ja path) plus the page title, so an agent can see the entire translation set at a glance without opening 44 files.
- **Out of scope for this plan (content only, per owner's direction):** `hugo.toml` `[languages]` config, theme template `i18n` wiring, language switcher UI, taxonomy display labels. Translation happens; site wiring doesn't.

---

## Content Inventory

| Path | Words (EN) | Notes |
|---|---|---|
| `content/_index.md` | 66 | Homepage lead/description/seoTitle + short body |
| `content/about/_index.md` | 212 | About page |
| `content/blog/_index.md` | ~15 | Blog listing page (front matter only, no body) |
| `content/blog/mentioned/*.md` (5 files) | 201–241 each | Short "mentioned in press" posts |
| `content/blog/space/*.md` (13 files) | 1,120–1,666 each | Core long-form posts |
| `content/blog/startups/vibe-coding-a-revenue-generating-app-nine-months-later.md` | 2,364 | Longest post |

Total: 22 content files × 2 target languages = **44 translated files** to produce.

---

## Task 1: Homepage + About + Blog index (pilot batch)

**Files:**
- Create: `content/_index.zh-tw.md`, `content/_index.ja.md`
- Create: `content/about/_index.zh-tw.md`, `content/about/_index.ja.md`
- Create: `content/blog/_index.zh-tw.md`, `content/blog/_index.ja.md`
- Read: `content/_index.md`, `content/about/_index.md`, `content/blog/_index.md`

**Interfaces:**
- Produces: the file-suffix pattern and front-matter-translation rule that every later task follows exactly. This is the pilot — get it right here before batching the blog.

- [ ] **Step 1: Dispatch trilingual-translator for the homepage**

  Use `Agent` with `subagent_type: "trilingual-translator"`. Prompt must state: source file `content/_index.md`, target files `content/_index.zh-tw.md` and `content/_index.ja.md`, front-matter rule (translate `lead`, `description`, `seoTitle`; keep everything else identical to source, including the `---` delimiters and field order; append `translatedFrom: "content/_index.md"` as the last front-matter field), run the full initial-translation → proofread → refine cycle for both languages, and write the finished files directly (not to a staging file).

- [ ] **Step 2: Dispatch trilingual-translator for the About page**

  Same pattern, source `content/about/_index.md`, targets `content/about/_index.zh-tw.md` / `.ja.md`. About pages read as personal/professional bio — tell the agent to keep the register consistent with how a founder/investor would describe themselves in zh-TW and ja business writing (this is exactly what `document-writing` skill's per-language conventions cover; the agent should already load it).

- [ ] **Step 3: Dispatch trilingual-translator for the blog index**

  Source `content/blog/_index.md` (front matter only, no body). Targets `content/blog/_index.zh-tw.md` / `.ja.md`.

- [ ] **Step 4: Verify — build check**

  ```bash
  cd ~/clementchenco && hugo --gc -D 2>&1 | tail -30
  ```
  Expected: build succeeds with no new errors (extra `.zh-tw.md`/`.ja.md` files are silently fine even before `hugo.toml` knows about the languages — Hugo just treats them as untranslated-language content it doesn't route anywhere yet).

- [ ] **Step 5: Verify — read-through**

  Read all 6 new files yourself. Confirm: front matter parses (valid TOML/YAML fence, matching quote style to the source), `translatedFrom` is present and points at the correct source path, no leftover English left untranslated, no placeholder text, Markdown structure intact.

- [ ] **Step 6: Commit**

  ```bash
  cd ~/clementchenco && git add content/_index.zh-tw.md content/_index.ja.md content/about/_index.zh-tw.md content/about/_index.ja.md content/blog/_index.zh-tw.md content/blog/_index.ja.md
  git commit -m "content: add zh-TW and ja translations of homepage, about, blog index"
  ```

---

## Task 2: "Mentioned" category posts (5 short posts)

**Files:**
- Create (10 files): for each of
  - `content/blog/mentioned/ivs2026-bnext-trends.md`
  - `content/blog/mentioned/ivs2026-kepple-report.md`
  - `content/blog/mentioned/ivs2026-launchpad-finalist.md`
  - `content/blog/mentioned/ivs2026-recap.md`
  - `content/blog/mentioned/plugandplay-new-space-business-2026.md`

  produce `<name>.zh-tw.md` and `<name>.ja.md` next to it.

**Interfaces:**
- Consumes: file-suffix + front-matter rule from Task 1.
- Produces: nothing new — same pattern, next batch.

- [ ] **Step 1: Dispatch one trilingual-translator agent per post (or one agent covering all 5 — they're short)**

  Since each source is only ~200–240 words, it's fine to hand one agent all 5 files in a single dispatch rather than 5 separate dispatches: list all 5 source paths and their 10 target paths in one prompt, same front-matter rule as Task 1, same run-the-full-cycle instruction.

- [ ] **Step 2: Verify — build check**

  ```bash
  cd ~/clementchenco && hugo --gc -D 2>&1 | tail -30
  ```

- [ ] **Step 3: Verify — spot-check 2 of the 10 files for register and terminology consistency** (these are press-mention recaps referencing IVS 2026, bnext, Kepple, Plug and Play — proper nouns and event names should stay in their original form, not be translated).

- [ ] **Step 4: Commit**

  ```bash
  cd ~/clementchenco && git add content/blog/mentioned/*.zh-tw.md content/blog/mentioned/*.ja.md
  git commit -m "content: add zh-TW and ja translations of mentioned/ posts"
  ```

---

## Task 3: "Space" category posts, batch 1 (7 posts)

**Files:** for each of the 7 shortest `space/` posts (by word count, to front-load the pilot-batch-adjacent ones):
- `rocket-reusability-runs-on-iteration.md` (1,120)
- `space-debris-disposal-governance-gap.md` (1,171)
- `space-companies-assembling-not-inventing.md` (1,179)
- `reflect-orbital-vleo-validation-gap.md` (1,325)
- `sovereign-space-flight-heritage-vleo.md` (1,372)
- `power-propulsion-orbital-compute-subsystem-bottleneck.md` (1,388)
- `standardization-eo-satellite-market-shift.md` (1,393)

produce `<name>.zh-tw.md` and `<name>.ja.md` for each (14 files).

**Interfaces:**
- Consumes: same pattern as Tasks 1–2.

- [ ] **Step 1: Dispatch trilingual-translator, 2–3 posts per agent call** (these are long enough — 1,100+ words — that batching all 7 into one call risks truncation or quality drop; split into e.g. 3 dispatches of 2–3 posts each). Prompt for each: list the specific source/target paths, front-matter rule, and add: these are technical space-industry analysis posts — domain terms (VLEO, flight heritage, EO satellite, launch vehicle names like Zhuque-3) should follow the engineering/space-industry terminology conventions the agent's `engineering-terminology` skill provides, not literal dictionary translation.

- [ ] **Step 2: Verify — build check**

  ```bash
  cd ~/clementchenco && hugo --gc -D 2>&1 | tail -30
  ```

- [ ] **Step 3: Verify — spot-check 3 of the 14 files**, specifically checking that inline links (`[text](url)`) kept their URLs and only translated the anchor text, and that `<!--more-->` markers survived untouched.

- [ ] **Step 4: Commit**

  ```bash
  cd ~/clementchenco && git add content/blog/space/rocket-reusability-runs-on-iteration.{zh-tw,ja}.md \
    content/blog/space/space-debris-disposal-governance-gap.{zh-tw,ja}.md \
    content/blog/space/space-companies-assembling-not-inventing.{zh-tw,ja}.md \
    content/blog/space/reflect-orbital-vleo-validation-gap.{zh-tw,ja}.md \
    content/blog/space/sovereign-space-flight-heritage-vleo.{zh-tw,ja}.md \
    content/blog/space/power-propulsion-orbital-compute-subsystem-bottleneck.{zh-tw,ja}.md \
    content/blog/space/standardization-eo-satellite-market-shift.{zh-tw,ja}.md
  git commit -m "content: add zh-TW and ja translations of space/ posts (batch 1)"
  ```

---

## Task 4: "Space" category posts, batch 2 (6 posts)

**Files:** the remaining 6 `space/` posts:
- `flight-proven-spacecraft-bus-middle-ground.md` (1,400)
- `prove-once-deploy-everywhere-flight-evidence.md` (1,410)
- `orbital-capability-orchestration-not-ownership.md` (1,463)
- `space-validation-is-becoming-the-price-of-entry.md` (1,463)
- `rideshare-hosted-payloads-access-layer.md` (1,520)
- `orbit-access-is-not-mission-capability.md` (1,666)

produce `<name>.zh-tw.md` and `<name>.ja.md` for each (12 files).

**Interfaces:**
- Consumes: same pattern as Task 3.

- [ ] **Step 1: Dispatch trilingual-translator, 2–3 posts per call**, same instructions as Task 3 Step 1.
- [ ] **Step 2: Verify — build check** (same command as Task 3 Step 2).
- [ ] **Step 3: Verify — spot-check 3 of the 12 files**, same checks as Task 3 Step 3. Additionally: `orbit-access-is-not-mission-capability.md` and `space-validation-is-becoming-the-price-of-entry.md` are cross-referenced by other posts' `related_posts` front matter — confirm the translated files kept those `related_posts` arrays byte-identical to the English source (per the Global Constraints rule).
- [ ] **Step 4: Commit**

  ```bash
  cd ~/clementchenco && git add content/blog/space/flight-proven-spacecraft-bus-middle-ground.{zh-tw,ja}.md \
    content/blog/space/prove-once-deploy-everywhere-flight-evidence.{zh-tw,ja}.md \
    content/blog/space/orbital-capability-orchestration-not-ownership.{zh-tw,ja}.md \
    content/blog/space/space-validation-is-becoming-the-price-of-entry.{zh-tw,ja}.md \
    content/blog/space/rideshare-hosted-payloads-access-layer.{zh-tw,ja}.md \
    content/blog/space/orbit-access-is-not-mission-capability.{zh-tw,ja}.md
  git commit -m "content: add zh-TW and ja translations of space/ posts (batch 2)"
  ```

---

## Task 5: "Startups" post (1 long post, 2,364 words)

**Files:**
- Create: `content/blog/startups/vibe-coding-a-revenue-generating-app-nine-months-later.zh-tw.md`, `.ja.md`

**Interfaces:**
- Consumes: same pattern as prior tasks.

- [ ] **Step 1: Dispatch trilingual-translator for this single post.** At 2,364 words this is the longest file in the site — call it out to the agent explicitly and tell it to still run the full initial → proofread → refine cycle rather than a single pass, since length is exactly where quality drifts. This post is personal/narrative (a builder's retrospective on shipping an app), tonally different from the space/ analysis posts — tell the agent to keep the casual, first-person voice rather than switching to the more formal register used for the space posts.
- [ ] **Step 2: Verify — build check.**
- [ ] **Step 3: Verify — full read-through** (not just spot-check, given the length and tonal risk).
- [ ] **Step 4: Commit**

  ```bash
  cd ~/clementchenco && git add content/blog/startups/vibe-coding-a-revenue-generating-app-nine-months-later.{zh-tw,ja}.md
  git commit -m "content: add zh-TW and ja translations of the vibe-coding startups post"
  ```

---

## Task 6: Build manifest + final verification pass

**Files:**
- Create: `TRANSLATION-MANIFEST.md` (project root)

**Interfaces:**
- Consumes: the `translatedFrom` field written into all 44 files by Tasks 1–5.
- Produces: the single-file index a future agent reads first.

- [ ] **Step 1: Generate the manifest.** For each of the 22 source files, add one row:

  ```markdown
  | Source (EN) | Title | zh-TW | ja |
  |---|---|---|---|
  | content/_index.md | Homepage | content/_index.zh-tw.md | content/_index.ja.md |
  | content/about/_index.md | About | content/about/_index.zh-tw.md | content/about/_index.ja.md |
  | content/blog/_index.md | Blog index | content/blog/_index.zh-tw.md | content/blog/_index.ja.md |
  | content/blog/mentioned/ivs2026-bnext-trends.md | (post title) | content/blog/mentioned/ivs2026-bnext-trends.zh-tw.md | content/blog/mentioned/ivs2026-bnext-trends.ja.md |
  ```
  ... one row per source file (22 rows total). Pull the "Title" column from each source file's front-matter `title` field — don't hand-type it, read it, so the manifest can't drift from the actual files. Precede the table with 2–3 sentences: what this file is, the file-suffix convention, and that every translated file also self-identifies via its own `translatedFrom` front-matter field (so the manifest is a convenience, not the only source of truth).

- [ ] **Step 2: Full build check**

  ```bash
  cd ~/clementchenco && hugo --gc -D 2>&1 | tail -50
  ```
  Expected: no errors. (No visible routing change on the live site yet — `hugo.toml` hasn't been told about the new languages, which is out of scope per Global Constraints.)

- [ ] **Step 3: File-count check** — confirm exactly 44 translated content files exist:

  ```bash
  find ~/clementchenco/content -name "*.zh-tw.md" | wc -l   # expect 22
  find ~/clementchenco/content -name "*.ja.md" | wc -l       # expect 22
  ```

- [ ] **Step 4: `translatedFrom` completeness check** — confirm every translated file has the field and it resolves to a real, existing source file:

  ```bash
  cd ~/clementchenco && for f in $(find content -name "*.zh-tw.md" -o -name "*.ja.md"); do
    grep -q "^translatedFrom:" "$f" || echo "MISSING translatedFrom: $f"
  done
  ```
  Expected: empty output.

- [ ] **Step 5: Commit**

  ```bash
  cd ~/clementchenco && git add TRANSLATION-MANIFEST.md
  git commit -m "docs: add translation manifest indexing all zh-TW/ja content pairs"
  ```

- [ ] **Step 6: Push and summarize** — push per the owner's usual workflow, and report back: total files produced, any posts that needed extra proofreading passes, and that `hugo.toml` multilingual config + theme `i18n` wiring remain as separate future work before translations are reachable on the live site.

---

## Self-Review

- **Coverage:** all 22 English content files have a matching pair of tasks (Tasks 1–5); Task 6 builds the manifest and verifies the whole batch.
- **No placeholders:** every task names exact source/target file paths and exact git commands.
- **Consistency:** the file-suffix convention (`.zh-tw.md` / `.ja.md`), the `translatedFrom` field, and the front-matter translation rule are defined once in Global Constraints and referenced, not restated differently, in every later task.
- **Gap check:** `related_posts` cross-links (Task 4) and taxonomy-key stability (Global Constraints) are the two places a naive per-file translation could silently break site structure — both are called out explicitly. The `translatedFrom` field plus the manifest are the two redundant, complementary answers to "which line is for what content": file-level self-description for anyone opening a single file cold, and a whole-site index for anyone wanting the overview first.
