# CLAUDE.md

## Project

This is a GitHub Pages user site (`wuj.github.io`) built on the `minima` theme. The repo aims to stay small: commit only files needed for the site to render, for GitHub Pages compatibility, or for the local development toolchain. Visual customization is concentrated in `assets/main.scss` (typography scale, color palette, dark mode, Rouge syntax highlighting). No minima `_layouts/` or `_includes/` files are overridden.

The user handles commits and pushes. Do not run `git push`.

## Prose

Use plain language that is easy to understand. All generated prose and code comments must be ASCII-only UTF-8: straight quotes, no curly quotes, no em dashes, no en dashes, no ellipsis characters, and no emojis. Use hyphens only for real hyphenation, not as dash substitutes.

## Commands

Ruby is pinned by `.ruby-version` (`3.3.4`); if the local Ruby does not match, use the user's Ruby version manager instead of changing the project pin casually.

```bash
bundle install                                       # first-time setup or after Gemfile changes
bundle exec jekyll serve                             # local preview at http://127.0.0.1:4000
JEKYLL_ENV=production bundle exec github-pages build # closest local proxy for GitHub Pages
```

There are no tests, linters, or CI scripts. For content or config changes, run the production build when practical. For visual checks, run the local server.

## Constraints

- Keep the `github-pages "~> 232"` pin in `Gemfile`. Before changing it, check <https://pages.github.com/versions/> and update `.ruby-version` only if the GitHub Pages build Ruby has moved. Do not loosen the pin.
- Keep `webrick` in `Gemfile`; Ruby 3.0+ needs it for `bundle exec jekyll serve`.
- Keep both `jekyll-feed` and `jekyll-seo-tag` enabled in `_config.yml`; minima's head include calls their Liquid tags.
- `Gemfile.lock` is intentionally ignored. Do not add it unless the project policy changes.
- Do not add empty `about.md`, `404.html`, `_layouts/`, or `_includes/` files just to make the tree look complete. Minima supplies those theme files.

## Editing

Prefer minimal, targeted changes that preserve GitHub Pages compatibility. Use existing Jekyll and minima conventions before adding custom layouts or assets. If customizing a theme file is necessary, copy only the specific file from the installed `minima` gem and edit the smallest surface needed.

Avoid decorative dependencies, generated artifacts, local editor state, unrelated rewrites, and removal of user-created changes.
