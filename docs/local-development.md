---
layout: page
title: Local development notes
---

Notes on how this site is built and how to work on it locally.

## What this site is

A GitHub Pages user site at `https://jeffwu.com`, built with Jekyll using
the default `minima` theme. The repository is intentionally minimal: almost
everything that renders comes from the `minima` gem, not from files in this
repo.

## The files that matter

| File | Purpose |
| --- | --- |
| `_config.yml` | Site title, theme selection, plugins, and excluded files. |
| `Gemfile` | Pins `github-pages "~> 232"` and `webrick`. |
| `.ruby-version` | Pins Ruby to `3.3.4`, matching the GitHub Pages build. |
| `index.md` | Homepage source. Front matter only, body is empty. |
| `.gitignore` | Excludes `_site/`, `Gemfile.lock`, editor and OS cruft. |

There are no `_layouts/`, `_includes/`, `assets/`, `about.md`, or `404.html`
files because the `minima` gem already supplies them. Only override one by
copying that specific file from the gem into a matching path in this repo.

## How a page is rendered

Using the homepage as the example:

1. Jekyll reads `_config.yml`, loads the `minima` gem as the theme, and
   processes every content file in the repo root.
2. Jekyll sees `index.md` with front matter `layout: home`. The body is
   empty, so the rendered content is empty.
3. Jekyll wraps that empty content in the layout named `home`. There is no
   `_layouts/home.html` here, so it falls back to `minima/_layouts/home.html`
   from the gem.
4. `home.html` extends `minima/_layouts/default.html`, which pulls in
   `minima/_includes/head.html`, `header.html`, and `footer.html`.
5. `home.html` prints the page content (empty), then a list of posts from
   `site.posts`. There is no `_posts/` directory, so the post list is empty.
6. `jekyll-feed` generates `/feed.xml`. `jekyll-seo-tag` injects meta tags
   into `<head>`. Both are called from minima's `head.html`, which is why
   `_config.yml` must keep them in `plugins:`.
7. The final HTML is written to `_site/index.html`. On GitHub the same build
   runs server-side and is served at `https://jeffwu.com`.

So `index.md` is a stub. Its only job is to say "render the home layout
here." All visible HTML, CSS, header, and footer come from the theme.

## Local development workflow

Run commands from the repository root.

```bash
bundle install                # first-time setup, or after Gemfile changes
bundle exec jekyll serve      # start the local preview server
```

`bundle exec` runs the following command using the gem versions in this
project's `Gemfile.lock`, instead of whatever versions are installed
system-wide. Without it, you might pick up a different Jekyll than the one
GitHub Pages uses, and your local preview could diverge from production.

`jekyll serve` does three things:

1. Builds the site into `_site/`.
2. Starts a local web server at `http://127.0.0.1:4000`. This is why
   `webrick` is in the `Gemfile`: Ruby 3.0 and later removed it from the
   standard library.
3. Watches the source files and rebuilds automatically on save.

You run this command **once** at the start of an editing session and leave
it running in a terminal. Then:

1. Edit files in your editor and save.
2. The server detects the change, rebuilds in a second or two (you will see
   log lines in the terminal), and you reload the browser tab.
3. Press `Ctrl+C` in that terminal to stop the server when done.

### When you must restart manually

The watcher does not pick up everything. Restart the server after:

- Changing `_config.yml`. Jekyll only reads it at startup.
- Changing the `Gemfile`. Run `bundle install` first, then restart.

### Useful flags

- `--livereload` auto-refreshes the browser tab on rebuild, so you do not
  have to hit reload yourself.
- `--drafts` includes files in `_drafts/` so you can preview unpublished
  posts.

### Closest local proxy for the GitHub Pages build

```bash
JEKYLL_ENV=production bundle exec github-pages build
```

Useful as a final check before pushing.

## Checking if the server is already running

If you are not sure whether `jekyll serve` is still running from earlier:

```bash
pgrep -fl "jekyll serve"             # show the process if it exists
lsof -iTCP:4000 -sTCP:LISTEN         # show what is listening on port 4000
```

If a process is shown, open `http://127.0.0.1:4000` in the browser. To stop
it, either press `Ctrl+C` in the terminal that launched it, or
`kill <pid>` using the PID printed by `pgrep`.

## What happens when you push to `origin/main`

The chain that fires after `git push origin main`:

1. **GitHub receives the push.** Because the repo is named `wuj.github.io`
   (matching the username), GitHub Pages is enabled by default and watches
   the `main` branch at the repo root.
2. **A Pages build is queued.** GitHub spins up a sandboxed Jekyll build
   environment with the same Ruby and gem versions that the
   `github-pages "~> 232"` gem pins locally. This is the entire point of
   that pin: local builds and the Pages build use the same software.
3. **Jekyll runs server-side.** It reads `_config.yml`, applies the
   excludes, loads the `minima` theme, runs `jekyll-feed` and
   `jekyll-seo-tag`, and writes the output to an internal `_site/`
   equivalent. Files listed under `exclude:` (like `AGENTS.md`,
   `CLAUDE.md`, `docs/`, `Gemfile`) are skipped.
4. **Output is deployed to the Pages CDN.** GitHub uploads the built HTML,
   CSS, and assets to its Pages infrastructure and invalidates the cache.
   Usually 30 seconds to a couple of minutes.
5. **The site is live at `https://jeffwu.com`.** There is no separate
   `gh-pages` branch for user sites; the source branch (`main`) is built
   directly.

### Things to know

- **Build status.** On github.com, check the repo's **Actions** tab, or
  **Settings -> Pages**. Failed builds are shown there with logs. A failed
  build leaves the previously deployed version live.
- **First-time warm-up.** The very first push to a brand-new
  `<user>.github.io` repo can take up to 10 minutes before DNS and the
  TLS certificate are fully ready. Subsequent pushes deploy in under a
  minute.
- **No `gh-pages` branch needed.** That convention is for project sites
  (`https://<user>.github.io/<repo>`), not user sites.
- **No CI configured here.** This repo has no `.github/workflows/`. Pages
  handles the build itself with its built-in Jekyll runner. To use custom
  plugins outside the Pages allowlist or a different builder, add a
  workflow that runs `jekyll build` and deploys via `actions/deploy-pages`.
  Not needed for this minimal setup.
- **Cache.** Browsers and the Pages CDN cache aggressively. If a change
  does not appear, hard-refresh (`Cmd+Shift+R`) or wait a minute.

So the whole loop is: push, wait 30 to 90 seconds, refresh
`https://jeffwu.com`.

## Things not to do

- Do not commit `Gemfile.lock`. It is gitignored on purpose.
- Do not loosen the `github-pages "~> 232"` pin. Check
  `https://pages.github.com/versions/` before bumping it, and update
  `.ruby-version` only if the GitHub Pages build Ruby has actually moved.
- Do not remove `webrick` from the `Gemfile`. Ruby 3.0 and later need it.
- Do not remove `jekyll-feed` or `jekyll-seo-tag` from `_config.yml`.
  Minima's `head.html` calls both.
- Do not add empty stub files like `about.md`, `404.html`, `_layouts/`,
  `_includes/`, or `assets/` just to fill out the tree. The theme provides
  them.
