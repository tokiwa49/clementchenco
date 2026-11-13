# Contemporary editorial redesign

Implemented on `redesign/contemporary-editorial`, based on the approved four-page design and refined mixed-font spacing. Nothing has been pushed to `main`; main automatically deploys to Cloudflare.

## Preview and check

```sh
hugo server --disableFastRender
hugo --gc --minify
python3 scripts/check-site.py public
```

The check reports two pre-existing article links to the unpublished `exploration-company-series-c-nyx-return-proof` draft. It deliberately does not publish that draft or rewrite those articles. To check for regressions against a prior build:

```sh
python3 scripts/check-site.py public --baseline /path/to/prior-build
```

The implementation was checked against a clean build of commit `642df94`: all 371 HTML paths, the rendered bodies of all 74 published articles, original About paragraphs, title/description/canonical/OpenGraph metadata, 74 RSS entries and 362 sitemap URLs were retained. A taxonomy title was made explicit because two tag spellings otherwise produced inconsistent titles between builds.

Browser checks covered home, About, writing archive and article layouts at 320px, 390px and 1280px; mobile menu and Escape dismissal; archive pagination and category selection; logo motion controls; asset loading; matching contribution-image dimensions and logo gaps. Reduced-motion and no-JavaScript fallbacks are implemented in CSS; these were code-reviewed, not browser-emulated.

## Editing the design

- `themes/not-much/assets/css/editorial.css`: approved visual system, including optical spacing for mixed-font headings.
- `themes/not-much/assets/css/editorial-site.css`: production, Markdown, keyboard and responsive behavior.
- `themes/not-much/assets/js/editorial.js`: mobile navigation and the rolling investment strip. No framework or build dependencies.
- Shared header, footer, article title, cover and archive entries live under `layouts/_partials/editorial/`.
- All pages share the same horizontal gutter token: 24px on mobile, growing to 72px on desktop.
- `mixed-heading` separates the sans and serif line boxes. `mixed-descenders` adds clearance where the preceding line contains descenders. Article `titleAccent` is optional and must be an exact suffix of the existing title; other articles retain their complete title in sans.
- The nine-logo strip pauses on hover/focus, includes a pause button and wraps into a static layout for reduced-motion or no-JavaScript users. Duplicate logos are inert and hidden from assistive technology.
- Local previews exclude Google Analytics. Production keeps the original measurement ID.

## Content

Home is the publication; About is the person. Home uses published Hugo content, excludes mentions from its latest-essay selection and links to About for conversations/mentions. Archive pagination, subject links, taxonomy pages and article tables of contents are real routes and anchors.

The featured article is set in `[params.editorial]` in `hugo.toml`. About prose, approach, contribution cards and personal notes are editable in `content/about/_index.md`. All placeholder prose has been removed. Its original introduction, company paragraph, background and closing were retained. New copy is a draft based on Clement's instructions and can be adjusted independently of the layout.

New About copy sources:

- Clement's notes in this design chat: examine and iterate, seek proof; involvement in 50+ portfolio investments; cross-border partnerships and evaluation; grew up in Taipei; Tokyo network and SATELYX's cross U membership.
- Public post supporting the Japan relationship-building account: https://www.linkedin.com/posts/clementyccchen_satelyx-is-officially-a-special-member-of-activity-7489941895301931008-cRKi
- Cross U's own location information: https://www.crossu.org/en/about/outline/
- The full LinkedIn profile was not accessible. The investment count comes from Clement, not independent profile verification. Copy says “involved in”, not that every investment was led by him.

## Assets and fonts

All site assets are local. The mark is the approved quiet `/C` converted to SVG outlines. Favicons use that identity. Instrument Sans and Newsreader are self-hosted; OFL notices are included under `static/fonts/`. The JetBrains Mono notice covers the source of the outlined mark.

The company marks are the nine selected investment logos plus the approved SATELYX, SPIN, IVC and Headline Asia marks. These identify experience and do not imply endorsement.

Photo/illustration mapping from the existing approved design library:

| Site image | Original design file |
| --- | --- |
| `testing.jpg` | `scene-studies/16-technical-operations-v2.png` |
| `conversation.jpg` | `scene-studies/15-company-building-v2.png` |
| `lens.jpg` | `scene-studies/03-lens-detail.png` |
| `nihonbashi.jpg` | `scene-studies/11-tokyo-nihonbashi.png` |
| `taipei.jpg` | `scene-studies/10-taipei-101.png` |
| `ivs-stage.jpg` | `documentary-study/clement-stage-original.jpg` |
| `portrait.png` | Approved About preview portrait |

The scene and city images are editorial illustrations, not documentary evidence of the depicted activity. Clement's portrait and IVS stage photograph are real photos. Full-resolution sources were exported as optimized progressive JPEGs; visible captions follow the approved treatment.

## Before publishing

Review the new About copy, then merge the reviewed branch into main when ready to deploy. Preserve `/about/`, existing post paths and metadata during subsequent revisions. After deployment, check the live `/about/`, an existing article, mobile menu, RSS, sitemap and Cloudflare build result.
