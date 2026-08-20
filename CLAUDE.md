## clementchen.co — project context

Personal portfolio + blog site, built with Hugo, deployed to Cloudflare
Workers (static assets), live at https://clementchen.co.

- **Theme:** `not-much` (https://github.com/imgios/not-much), fully vendored
  into `themes/not-much/` as plain files (no submodule) — edit it directly.
- **GitHub repo:** https://github.com/tokiwa49/clementchenco (public).
  Pushing to `main` auto-triggers a Cloudflare deployment.
- **Cloudflare:** deployed as a Worker (not classic Pages) named
  `clementchenco`, using `wrangler.toml` with `[assets] directory = "./public"`.
  Custom domain `clementchen.co` is attached; DNS is on Cloudflare.
- **`noindex` is OFF** (`params.noindex = false` in `hugo.toml`) — the site
  is open to search engines.
- **Google Analytics (gtag.js)** is wired in at the top of `<head>` in
  `themes/not-much/layouts/baseof.html`, measurement ID `G-Q539L36Z59`.

### Gotcha: front matter dates need an explicit timezone

Hugo silently excludes future-dated content from the build with no error.
A bare `date: 2026-08-12` (no timezone) parses as UTC midnight, which can
be "in the future" relative to build time depending on local/build-server
clock offset — this caused the About page to vanish from every build
(local and Cloudflare CI) for a long debugging session. Always write dates
with an explicit offset, e.g. `date: 2026-08-12T00:00:00+08:00`, or use
`hugo new` to auto-generate a correctly-formatted date.

### Day-to-day workflow

1. Edit/add content in `content/` (e.g. `hugo new posts/my-post.md` for a
   new post).
2. Preview locally: `cd ~/clementchenco && hugo server -D`, check
   `localhost:1313`.
3. `git add`, `git commit`, `git push` — Cloudflare auto-builds
   (`hugo --gc --minify`) and deploys within ~1 minute. No dashboard visits
   needed for routine content changes.

### Owner background

Owner is a former quant/trading Python engineer, new to web dev, git, and
the terminal — explain steps clearly and don't assume familiarity with
git/GitHub/Cloudflare concepts.
