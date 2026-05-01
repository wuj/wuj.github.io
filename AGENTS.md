# AGENTS.md

Instructions for Codex and other coding agents working in this repository.
These rules apply to the whole repo.

## Project

This is the GitHub Pages user site for `wuj.github.io`, served at
`https://jeffwu.com`. It is a small Jekyll site built on the default
`minima` theme.

Most structure comes from minima. The local customization surface is
deliberately narrow:

- `_config.yml` holds site metadata, GitHub Pages settings, plugin config,
  defaults, and excludes.
- `index.md` uses minima's `home` layout and contains a short intro above
  the post list.
- `_posts/` holds normal published posts.
- `tags.md` generates a simple tag index.
- `assets/main.scss` imports minima and layers site typography, colors,
  dark mode, and code highlighting on top.
- `docs/` contains repo notes and is excluded from the built site.
- `_unlisted/` is reserved for future non-post content that should not be
  listed with `site.posts`.

Keep the repo small. Commit only files needed for the site, GitHub Pages
compatibility, or local development. Do not run `git push`; the user handles
commits and pushes.

## Prose

Use plain language. Generated prose and code comments must be ASCII-only
UTF-8: straight quotes, no curly quotes, no em dashes, no en dashes, no
ellipsis characters, and no emojis.

## Commands

Run commands from the repository root. Ruby is pinned by `.ruby-version`
(`3.3.4`); if the local Ruby does not match, use the user's Ruby version
manager instead of changing the project pin.

```bash
bundle install
bundle exec jekyll serve
JEKYLL_ENV=production bundle exec github-pages build
```

There are no tests, linters, or CI scripts. For content or config changes,
run the production build when practical. For visual checks, run the local
server at `http://127.0.0.1:4000`.

## Constraints

- Keep `github-pages "~> 232"` pinned in `Gemfile`. Before changing it,
  check <https://pages.github.com/versions/> and update `.ruby-version`
  only if GitHub Pages has moved its Ruby version.
- Keep `webrick` in `Gemfile`; Ruby 3.0+ needs it for local serving.
- Keep `jekyll-feed`, `jekyll-seo-tag`, and `jekyll-sitemap` enabled in
  `_config.yml`.
- Keep `baseurl: ""` in `_config.yml` for this user/custom-domain site.
- Keep `email: hello@jeffwu.com` in `_config.yml`; this address is
  intentionally public.
- Keep `Gemfile.lock` ignored unless the project policy changes.
- Do not add empty `about.md`, `404.html`, `_layouts/`, `_includes/`, or
  asset files just to make the tree look complete.
- If overriding a minima theme file is necessary, copy only the specific
  file from the installed minima gem and edit the smallest useful surface.

## Editing

Prefer minimal, targeted changes that preserve GitHub Pages compatibility.
Use existing Jekyll, Liquid, SCSS, and minima conventions before adding new
structure.

Avoid decorative dependencies, generated artifacts, local editor state,
unrelated rewrites, and removal of user-created changes.
