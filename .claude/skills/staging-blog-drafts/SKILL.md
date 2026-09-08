---
name: staging-blog-drafts
description: Use when a drafted blog post for clementchen.co (Hugo site) needs to be staged into the repo and validated before it's ready to push — regardless of where the draft came from (a generation routine, Drive, Desktop, pasted directly) or which category it belongs to.
---

# Staging Blog Drafts

## Overview

Takes a drafted blog post from wherever it landed and gets it into `content/blog/` as a correctly structured, validated file, ready for Clement to review and push himself. This skill never runs `git add`, `git commit`, or `git push` — staging and validating is the end of the job.

## When to use

- A draft exists (a file, a Drive link, a Desktop folder, or pasted text) and needs to become a real post in this repo
- Applies regardless of source or category. Don't assume the draft came from a known generation routine, and don't assume the category list is fixed — both should be discovered fresh each run, not hardcoded, so a new routine or a new category doesn't require editing this skill.

## Steps

Run these in order. Don't skip ahead or reorder one past another — a later step can depend on an earlier one having actually happened (placing the file before verifying links means there's no way to tell whether a `related_posts` entry is real).

1. **Locate the draft.** Accept it however it arrives: a file path, a Drive link, a Desktop folder, or text pasted directly into the conversation.

2. **Validate frontmatter** against the schema in this repo's `CLAUDE.md`:
   - Field names and types exactly as specified (`seoTitle` not `seo_title`, `description` not `meta_description`, etc.)
   - `date` has an explicit UTC offset — a bare date can silently drop the post from the build with no error
   - `draft: true` unless an actual publish decision has been made
   - `categories`: read the **live list** from `content/categories/*/_index.md` at run time, never a remembered or hardcoded list. If the draft's category isn't in that current set, stop and flag it for confirmation — don't create a new category folder silently.
   - No `slug` field (overrides Hugo's routing and breaks it)
   - `tags`: 3-5 items
   - `related_posts` entries are checked for real, not here — see step 7

3. **Validate body structure:**
   - No `# Title` heading and no duplicated byline/date/reading-time line in the body — the page template renders all of that from frontmatter automatically. A body `# Title` produces two H1s on the same page, which both duplicates the visible title and breaks the heading hierarchy the `seo` skill checks for.
   - `<!--more-->` immediately after the first paragraph, before the first `##`
   - Heading hierarchy is H2-only for section breaks — no H1 in the body, and no `###` without an H2 parent above it

4. **Run the `humanizer` skill** against the draft, in file mode: edit the file in place so it ends up containing only the humanized rewrite. Prose only — frontmatter fields, link targets, and every fact, name, number, date, and quote carry over unchanged. This is the generic AI-tell pass (filler phrases, hedging, rule-of-three, signposting, manufactured punchlines, etc.). Apply its PERSONALITY AND SOUL guidance, not just pattern removal.

5. **Run Clement's writing-style checklist.** This is the domain-specific layer on top of step 4 — things generic humanizing won't catch because they're specific to this site's own drift, not universal AI tells:
   - **The opener-tic pattern**: don't enumerate multiple items inside a time window and force them into one reconciled lesson. Retire these exact phrase-slots even when a multi-item opener is genuinely earned: "on the surface," "read together / read separately," "same underlying [X]," "identical argument," "same lesson," "same process."
   - **Banned vocabulary**: delve, crucial, pivotal, landscape (as an abstract noun), tapestry, testament, underscore/highlight (as verbs meaning "show"), showcase, foster, cultivate, robust, seamless, innovative, vibrant, intricate, interplay, garner, align with, enhance.
   - **No hype**: no "the next X," "X killer," "game-changer," "revolutionary," "unlock," "disrupt" as a bare verb. Every notable claim needs a number, a named example, or a citation behind it, not an adjective.
   - **Calibration**: don't over-smooth into uniform rhythm. Varied sentence length and some repetition of a point across nearby paragraphs is normal here, not a defect to correct.
   - **Apply all of the above to `seoTitle` and `description` too, not just body prose.** They're exactly as reader-facing as the opener — a past `seoTitle` read "Unlocks Funding" before this check existed.
   - **Critique the evidence, not the company.** If the draft is critical of a named company, check that every critical claim is grounded in a citation or named source, not the piece's own unattributed judgment stacked up, and that there's genuine credit given for what's actually been accomplished, not a single token "to be fair" line carrying the whole burden. If a different company's failure is used as a cautionary precedent, confirm it's explicitly framed as being about the standard applied, not a prediction about this company's outcome, and isn't stacked directly next to the subject's name without that framing. A piece can be fully sourced and accurate in every sentence and still read one-sided on the whole — check for that specifically, not just for unsupported claims.
   - Reference: the `writing-style` memory file is the canonical source. If this checklist and that file ever diverge, the memory file wins.

6. **Check structural variety against recent posts.** Read the last 5 published (`draft: false`) posts in `content/blog/` by date and note whether each one's primary structure is a comparison (2+ items treated as co-equal subjects) or single-subject with others subordinate at most. If 4 or more of the last 5 used comparison as the primary skeleton and this draft does too, flag it explicitly in the final report as a structural-variety concern — don't block staging over it, and don't rewrite the draft to force single-subject; comparison isn't banned, an unnoticed run of it is the actual problem. This check exists because fixing opener phrase-slots alone doesn't fix whole-article comparison structure — they're different layers of the same habit.

7. **Run the `seo` skill**, in content-only audit mode (no live URL yet, so skip PageSpeed, robots.txt, and other live-fetch checks). Run this every time, regardless of source. Checks: title/description length, heading order, keyword placement, duplicate anchor text, E-E-A-T signals (byline, sourced citations).

8. **Verify every link, internal and external:**
   - Internal (`related_posts` entries and in-body links to clementchen.co or satelyx.com): check against the actual current file tree, derived live — never trust what the draft claims exists.
   - External (citation links to outside sources): fetch each one and confirm it actually resolves. A dead or mismatched citation is worse than no citation at all — it's a claim presented as sourced when it isn't, which cuts directly against the no-fabrication rule.
   - Anything that can't be verified either way: flag it by name in the final report rather than silently leaving it in or silently dropping it.

9. **Place the file** at `content/blog/<category>/<kebab-case-slug>.md`, where `<category>` matches the frontmatter `categories` value exactly. The file's path is the URL — there's no separate slug field to keep in sync with it.

10. **Build check.** Run `hugo --gc` and confirm zero errors. Note: a new post is correctly created with `draft: true`, and Hugo excludes drafts from a default build — so the page count will *not* show a +1 delta for a newly staged draft; that's expected, not a failure. A page-count delta is only a meaningful signal when re-validating edits to an already-published (`draft: false`) post. To confirm a new draft actually renders without error, use `hugo server -D` (or the project's preview server) rather than expecting the plain build's page count to move.

11. **Peer-analyst gate.** Read the fully processed piece once more, in full, as a skeptical peer analyst seeing it for the first time — not as the process that produced it. Answer three questions directly and honestly, not performatively:
    - **Forced viewpoint:** does the piece's central claim actually follow from the specific facts cited, or does it reach for a stronger conclusion than the evidence supports? Would a knowledgeable peer, reading only the cited facts, plausibly land somewhere less dramatic?
    - **Too vague:** read the central claim and the "why this matters" reasoning in isolation from the rest of the piece. Is there a specific, checkable point being made, or does it gesture at significance without committing to something a reader could actually disagree with?
    - **Doesn't hold together:** does each section's point actually connect to the next, or are there gaps, non-sequiturs, or a closing synthesis that doesn't follow from what came before it?

    If the piece fails any of these, **it is not publish-ready, and that's a genuinely fine outcome, not a failure to hide or push through anyway.** Do not quietly rewrite it into passing and call it clean. Update the file's internal `status` field to `status: failed-review` (still `draft: true`, so Hugo never builds it regardless), leave the file in place, and in the final report say plainly which question it failed and why, in enough detail that a specific salvageable part (a stat, a framing, a paragraph) is identifiable for reuse later. Don't delete a failed draft — the value in a failed piece is in its reusable parts, not in pretending it never existed.

12. **Stop and report.** Give Clement: word count, reading time, category, any flagged or unverified links, the structural-variety note from step 6, the peer-gate verdict from step 11 (pass, or fail with specifics), and anything the humanizer pass or style checklist actually changed. Do **not** run `git add`, `git commit`, or `git push`.

## Common mistakes

- Hardcoding today's category list, or assuming the draft came from one of today's known source routines — both should be discovered fresh each run so a new category or a new draft source doesn't require editing this skill.
- Running the SEO check before the humanizer/style passes — SEO's readability suggestions can "fix" phrasing the later passes would have rewritten anyway, and unhumanized AI-toned prose can still pass structural SEO checks while reading as robotic.
- Editing the wording or punctuation of a direct quote to satisfy a style rule (e.g., removing an em dash from something a named source actually said in a quote). Never alter a quote — this includes stray em dashes.
- Trusting a citation link because the surrounding prose sounds confident. Verify it resolves before leaving it in.
- Skipping the `seoTitle`/`description` fields when running the style checklist, on the assumption that only body prose needs the voice check.
- Treating "no banned phrase-slots in the opener" as proof the comparison habit is fixed. It isn't — the habit lives at the whole-article structure level, not just the opening sentence, and a draft can be clean on every phrase-level check while still defaulting to comparison as its entire skeleton.
- Assuming a critical piece is fine because every fact in it is sourced. Accuracy and fairness are different checks — see step 5's evidence-not-company item.
